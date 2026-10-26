// Single source of truth for facts shown on the site. Every number here must be defensible (checklist P-08).
export const SITE = {
  url: 'https://growrevenue.co',
  name: 'The Grow Revenue Company',
  short: 'Grow Revenue',
  legalName: 'The Grow Revenue Company Limited',
  companyNumber: '', // TODO decision 6: UK company number
  email: 'kunal@growrevenue.co',
  address: { street: '128 City Road', city: 'London', postcode: 'EC1V 2NX', country: 'GB' },
  founder: 'Kunal Arora',
  upwork: '', // TODO: Kunal's public Upwork profile URL
  linkedin: '', // TODO: Kunal's LinkedIn URL
  bookingUrl: '/contact/', // TODO decision 7: Google Calendar appointment page
};

// Public record (Upwork profile). Checklist P-08: only these headline numbers.
export const PROOF = [
  { value: '123', label: 'Upwork jobs completed' },
  { value: '$300K+', label: 'earned on Upwork' },
  { value: '8,700+', label: 'hours billed' },
  { value: '100%', label: 'Job Success' },
];

export type Tier = { name: string; price: number; days: number; items: string };
export type Service = {
  slug: string; nav: string; card: string; blurb: string; from: number | null; tiers: Tier[]; icon: string; isNew?: boolean;
};

// Prices match the Upwork project catalog (checklist C-02).
export const SERVICES: Service[] = [
  {
    slug: 'email-deliverability', icon: 'shield', nav: 'Email deliverability', card: 'Email deliverability',
    blurb: 'Your email goes to spam or Promotions and you do not know why. We test SPF, DKIM, DMARC, BIMI, blacklists, reputation and the Google and Yahoo sender rules, fix what fails, and re-test inbox placement.',
    from: 350,
    tiers: [
      { name: 'Audit', price: 350, days: 3, items: 'Full audit of 1 domain, inbox placement test, written fix list in priority order' },
      { name: 'Audit and fix', price: 900, days: 7, items: 'Everything in Audit, all DNS and ESP fixes done, blacklist delisting requests, re-test' },
      { name: 'Fix and monitor', price: 1800, days: 14, items: 'Up to 3 domains, warmup plan, 30 days of monitoring, a second placement test' },
    ],
  },
  {
    slug: 'cold-email-infrastructure', icon: 'plane', nav: 'Cold email infrastructure', card: 'Cold email infrastructure',
    blurb: 'Separate sending domains, Google Workspace or Microsoft 365 mailboxes, authentication, warmup and safe daily limits in Instantly or Smartlead. Then a sequence written and launched.',
    from: 600,
    tiers: [
      { name: 'Starter', price: 600, days: 5, items: '2 domains, 4 mailboxes, authentication, warmup started, sending tool connected' },
      { name: 'Standard', price: 1400, days: 10, items: '4 domains, 10 mailboxes, plus a 3-step sequence written and loaded' },
      { name: 'Advanced', price: 2800, days: 14, items: '8 domains, 20 mailboxes, sequence, lead list review, 30 days of monitoring' },
    ],
  },
  {
    slug: 'lifecycle-email-marketing', icon: 'loop', nav: 'Lifecycle email marketing', card: 'Lifecycle email',
    blurb: 'Welcome, abandoned cart, post-purchase and win-back flows in Klaviyo, HubSpot or ActiveCampaign, segmented by behavior and measured by revenue, not opens.',
    from: null, tiers: [],
  },
  {
    slug: 'funnel-audit', icon: 'funnel', nav: 'Funnel audit and automation', card: 'Funnel audit and automation',
    blurb: 'We measure drop-off at every step from first click to purchase and fix the biggest leaks in pages, forms, CRM routing and follow-up automation.',
    from: 500,
    tiers: [
      { name: 'Audit', price: 500, days: 5, items: '1 funnel audited, written leak report with ranked fixes, 30 minute walkthrough' },
      { name: 'Audit and fix', price: 1500, days: 10, items: 'Audit plus the top 5 fixes built: pages, forms, sequences, automation' },
      { name: 'Rebuild', price: 3500, days: 21, items: 'The weakest stages rebuilt, a new nurture sequence, 2 weeks of post-launch tuning' },
    ],
  },
  {
    slug: 'social-media-marketing', icon: 'social', isNew: true, nav: 'Social media marketing', card: 'Social media marketing',
    blurb: 'Content strategy, short-form video, scheduled posting and paid social for Instagram, TikTok, LinkedIn, Facebook and YouTube, connected to email so followers become subscribers and buyers.',
    from: null, tiers: [],
  },
  {
    slug: 'ai-automation', icon: 'ai', isNew: true, nav: 'AI automation', card: 'AI automation',
    blurb: 'AI agents and workflows in n8n, Make and Zapier with OpenAI and Claude: lead research, inbox triage, content pipelines, CRM updates and reporting that run without manual work.',
    from: null, tiers: [],
  },
];

export type Case = {
  slug: string; client: string; seoTitle: string; industry: string; headline: string; period: string;
  results: { metric: string; value: string }[]; service: string; quote?: { text: string; who: string };
};

// Numbers from the published case studies on the previous growrevenue.co. Each needs client sign-off logged (K-01).
export const CASES: Case[] = [
  { slug: 'synaps-dx', seoTitle: 'Synaps Dx Case Study: Email to 38% of Revenue', client: 'Synaps Dx', industry: 'Ecommerce', service: 'lifecycle-email-marketing',
    headline: 'Email went from under 5% to 38%+ of online revenue', period: 'first quarter',
    results: [ { metric: 'Email share of online revenue', value: 'under 5% to 38%+' }, { metric: 'Open rate', value: '18% to 35%' }, { metric: 'Click-through rate', value: '1.5% to 3.2%' }, { metric: 'Dormant subscribers re-engaged', value: '25,000' }, { metric: 'New leads from rebuilt sign-up forms', value: '10,000' } ],
    quote: { text: 'We knew our community was filled with potential, but we needed a fresh strategy to rekindle that connection and motivate our audience to take the next step with us.', who: 'Erin and Sarit, Founders, Synaps Dx' } },
  { slug: 'scalability', seoTitle: 'Scalability Case Study: 50+ B2B Meetings', client: 'Scalability', industry: 'B2B services', service: 'cold-email-infrastructure',
    headline: '50+ consultations booked in 3 months from cold email and LinkedIn', period: 'first 3 months',
    results: [ { metric: 'Qualified leads per month', value: '150+' }, { metric: 'Lead to meeting', value: '40%' }, { metric: 'Cold email open rate', value: '45%' }, { metric: 'LinkedIn acceptance rate', value: '38%' }, { metric: 'Consultations booked', value: '50+' } ],
    quote: { text: 'We needed a scalable and effective way to connect with decision-makers and demonstrate the value of our services. This partnership gave us the tools to achieve that.', who: 'Natalia Odrinskaya, The Scalability Team' } },
  { slug: 'maestro', seoTitle: 'Maestro Case Study: 65% More Creator Sign-Ups', client: 'Maestro', industry: 'Creator platform', service: 'cold-email-infrastructure',
    headline: '65% more sign-ups from segmented cold email', period: 'campaign period',
    results: [ { metric: 'Sign-ups from cold email and LinkedIn', value: '+65%' }, { metric: 'Open rate', value: '42%' }, { metric: 'Potential users reached', value: '200,000+' }, { metric: 'Engagement versus previous outreach', value: '+50%' } ] },
  { slug: 'soulful-evolution', seoTitle: 'Soulful Evolution Case Study: Sign-Ups Up 60%', client: 'Soulful Evolution', industry: 'Coaching', service: 'funnel-audit',
    headline: 'Program sign-ups up 60% in 3 months', period: 'first quarter',
    results: [ { metric: 'Program sign-ups', value: '+60%' }, { metric: 'Leads per month across channels', value: '300+' }, { metric: 'Cold email open rate', value: '46%' }, { metric: 'Lead to sign-up conversion', value: '+35%' } ] },
  { slug: 'dimov-associates', seoTitle: 'Dimov Associates Case Study: 3x Leads', client: 'Dimov Associates', industry: 'Legal', service: 'funnel-audit',
    headline: '3x lead volume at 40% lower cost per acquisition', period: '90 days',
    results: [ { metric: 'Lead volume', value: '3x' }, { metric: 'Cost per acquisition', value: '40% lower' }, { metric: 'Time to scale the system', value: '90 days' } ],
    quote: { text: 'We knew marketing was powerful, but we struggled to find a partner who could address our unique pain points and help us scale sustainably. Both Barbara and Kunal simply nailed it.', who: 'Debra Becker, Founder and CEO, Dimov Associates' } },
  { slug: 'austere', seoTitle: 'Austere Case Study: 450+ Leads in a Quarter', client: 'Austere', industry: 'Agency', service: 'funnel-audit',
    headline: '450+ qualified leads in one quarter', period: 'one quarter',
    results: [ { metric: 'Qualified leads', value: '450+' }, { metric: 'Lead conversion growth', value: '380%' }, { metric: 'Return on ad spend', value: '3.5x' } ] },
];

export const svc = (slug: string) => SERVICES.find((s) => s.slug === slug)!;
export const usd = (n: number) => '$' + n.toLocaleString('en-US');
