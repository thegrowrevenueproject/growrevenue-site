// Cut-out figures (background removed). ratio = width / height of the trimmed image.
// Chips use only numbers from published case studies; positions keep faces and props clear.
type Pos = 'tl' | 'tr' | 'bl' | 'br' | 'ml' | 'mr';
export type CutDef = { name: string; ratio: number; alt: string; chips: { v: string; l: string; p?: Pos }[] };
export const CUTS: Record<string, CutDef> = {
  'paid-advertising': { name: 'ads', ratio: 0.642, alt: 'Woman shouting into a green megaphone, our ppc management services cut through', chips: [{ v: '3.5x', l: 'return on ad spend, Austere', p: 'tr' }, { v: '450+', l: 'qualified leads in a quarter', p: 'bl' }] },
  'social-media-marketing': { name: 'social', ratio: 0.649, alt: 'Woman leaping with a green phone, the energy of social media marketing services', chips: [{ v: '200,000+', l: 'potential users reached, Maestro', p: 'tr' }, { v: '+50%', l: 'engagement versus previous outreach', p: 'br' }] },
  'content-creation': { name: 'content', ratio: 0.405, alt: 'Man pointing at camera holding a green clapperboard for a content creation company', chips: [] },
  'lead-generation': { name: 'leads', ratio: 0.876, alt: 'Man pulling a giant green magnet, the pull of a lead generation company', chips: [{ v: '150+', l: 'qualified leads a month', p: 'tl' }, { v: '40%', l: 'lead to meeting, Scalability', p: 'br' }] },
  'cold-email-infrastructure': { name: 'coldemail', ratio: 0.727, alt: 'Woman launching a green paper plane, cold email services that reach inboxes', chips: [{ v: '45%', l: 'cold email open rate, Scalability', p: 'br' }] },
  'funnel-audit': { name: 'funnel', ratio: 0.374, alt: 'Man holding a green funnel overhead, conversion rate optimization services at work', chips: [{ v: '3x', l: 'lead volume, Dimov Associates', p: 'ml' }, { v: '40%', l: 'lower cost per acquisition', p: 'mr' }] },
  'email-marketing': { name: 'email', ratio: 0.922, alt: 'Laughing woman sitting on a giant green envelope, email marketing services that sell', chips: [{ v: '38%+', l: 'of online revenue from email, Synaps Dx', p: 'tl' }, { v: '5x', l: 'email ROI', p: 'tr' }] },
  'ai-automation': { name: 'ai', ratio: 0.632, alt: 'Man shaking hands with a green robot arm, ai automation services with people', chips: [] },
  'email-deliverability': { name: 'shield', ratio: 0.402, alt: 'Woman raising a green shield, an email deliverability consultant guarding your inbox', chips: [] },
  // Learn guides (not hero priority images, so no query needed in alt)
  'learn:what-does-a-marketing-company-do': { name: 'arrow', ratio: 0.848, alt: 'Two people carrying a giant green arrow pointing upward together', chips: [] },
  'learn:does-cold-email-still-work': { name: 'relay', ratio: 0.424, alt: 'Runner sprinting forward holding a green envelope like a relay baton', chips: [] },
  'learn:what-are-ai-agents': { name: 'conductor', ratio: 0.449, alt: 'Woman conducting with a green baton, directing work like an orchestra', chips: [] },
  'learn:what-is-marketing-automation': { name: 'button', ratio: 0.556, alt: 'Excited man pressing a giant green button that sets everything running', chips: [] },
};
export const cutFor = (key: string) => CUTS[key];
