// Cloudflare Pages Function: POST /api/lead
// Stores the lead in D1 (binding DB) and notifies Telegram (TG_TOKEN, TG_CHAT secrets).
// Optional Turnstile check when TURNSTILE_SECRET is set.
interface Env { DB: D1Database; TG_TOKEN: string; TG_CHAT: string; TURNSTILE_SECRET?: string }

const clip = (v: FormDataEntryValue | null, n: number) => String(v ?? '').trim().slice(0, n);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let fd: FormData;
  try { fd = await request.formData(); } catch { return json({ ok: false, error: 'bad_request' }, 400); }
  if (clip(fd.get('company_url'), 200)) return json({ ok: true }); // honeypot: pretend success
  const lead = {
    name: clip(fd.get('name'), 120), email: clip(fd.get('email'), 200).toLowerCase(), website: clip(fd.get('website'), 300),
    topic: clip(fd.get('topic'), 80), message: clip(fd.get('message'), 4000), volume: clip(fd.get('volume'), 80),
    consent: fd.get('consent') ? 1 : 0, synthetic: request.headers.get('x-synthetic-test') === '1' ? 1 : 0,
  };
  if (!lead.name || !EMAIL.test(lead.email) || !lead.topic || !lead.consent) return json({ ok: false, error: 'invalid' }, 422);

  if (env.TURNSTILE_SECRET) {
    const t = clip(fd.get('cf-turnstile-response'), 4000);
    const v = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: t, remoteip: request.headers.get('CF-Connecting-IP') ?? '' }) }).then((r) => r.json() as Promise<{ success: boolean }>).catch(() => ({ success: false }));
    if (!v.success) return json({ ok: false, error: 'challenge' }, 403);
  }

  const results: Record<string, boolean> = { db: false, telegram: false };
  try {
    await env.DB.prepare('INSERT INTO leads (created_at,name,email,website,topic,message,volume,consent,synthetic) VALUES (?,?,?,?,?,?,?,?,?)')
      .bind(new Date().toISOString(), lead.name, lead.email, lead.website, lead.topic, lead.message, lead.volume, lead.consent, lead.synthetic).run();
    results.db = true;
  } catch (e) { console.error('db', e); }
  try {
    const text = `${lead.synthetic ? '[SYNTHETIC TEST] ' : ''}NEW LEAD growrevenue.co\n${lead.name} <${lead.email}>\n${lead.website}\nTopic: ${lead.topic}\nVolume: ${lead.volume || '-'}\n\n${lead.message}`;
    const r = await fetch(`https://api.telegram.org/bot${env.TG_TOKEN}/sendMessage`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ chat_id: env.TG_CHAT, text: text.slice(0, 4000), disable_web_page_preview: true }) });
    results.telegram = r.ok;
  } catch (e) { console.error('tg', e); }
  // Success if at least one store worked; the lead is never lost silently.
  return results.db || results.telegram ? json({ ok: true, ...results }) : json({ ok: false, error: 'store_failed' }, 502);
};

const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
