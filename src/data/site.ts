// Single source of truth for facts shown on the site. Every number here must be defensible (checklist P-08).
export const SITE = {
  url: 'https://growrevenue.co',
  name: 'The Grow Revenue Company',
  short: 'Grow Revenue',
  legalName: 'The Grow Revenue Company Limited',
  companyNumber: '', // TODO decision 6: UK company number
  email: 'info@growrevenue.co',
  address: { street: '128 City Road', city: 'London', postcode: 'EC1V 2NX', country: 'GB' },
  founder: 'Kunal Arora',
  linkedin: '', // TODO: Kunal's LinkedIn URL
  bookingUrl: '/contact/', // TODO decision 7: Google Calendar appointment page
};

// Track record. Checklist P-08: only these headline numbers. No marketplace names on the site.
export const PROOF = [
  { value: '123', label: 'projects delivered' },
  { value: '8,700+', label: 'hours of client work' },
  { value: '11+', label: 'years in marketing' },
];

export type Tier = { name: string; price: number; days: number; items: string };
export type Service = {
  slug: string; nav: string; card: string; blurb: string; from: number | null; tiers: Tier[]; icon: string;
  group: 'Attract' | 'Capture' | 'Convert' | 'Scale'; query: string; isNew?: boolean;
};
export const GROUPS = [
  { name: 'Attract', line: 'Get in front of the right buyers' },
  { name: 'Capture', line: 'Turn attention into leads' },
  { name: 'Convert', line: 'Turn leads into revenue' },
  { name: 'Scale', line: 'Keep it growing without more headcount' },
] as const;

// Fixed package prices (checklist C-02). Order = the revenue engine, left to right.
export const SERVICES: Service[] = [
  {
    slug: 'paid-advertising', icon: 'ads', group: 'Attract', query: 'ppc management services', isNew: true, nav: 'Paid advertising', card: 'Paid ads on Google and Meta',
    blurb: 'Google, Meta, YouTube and LinkedIn campaigns built around the cost of a customer, not the cost of a click, with landing pages and follow-up that turn the spend into revenue.',
    from: null, tiers: [],
  },
  {
    slug: 'social-media-marketing', icon: 'social', group: 'Attract', query: 'social media marketing services', nav: 'Social media marketing', card: 'Social media marketing',
    blurb: 'Strategy, short-form video, posting and community for Instagram, TikTok, LinkedIn, Facebook and YouTube, connected to email so followers become subscribers and buyers.',
    from: null, tiers: [],
  },
  {
    slug: 'content-creation', icon: 'content', group: 'Attract', query: 'content creation company', isNew: true, nav: 'Content creation', card: 'Content creation',
    blurb: 'Short-form video, motion graphics, carousels, articles and email content produced every month from one plan, built to earn attention and lead to a sale.',
    from: null, tiers: [],
  },
  {
    slug: 'lead-generation', icon: 'magnet', group: 'Capture', query: 'lead generation company', isNew: true, nav: 'Lead generation', card: 'B2B lead generation',
    blurb: 'Cold email, LinkedIn outreach, lead magnets and paid search working as one system, so your sales calendar fills with qualified buyers every week.',
    from: null, tiers: [],
  },
  {
    slug: 'cold-email-infrastructure', icon: 'plane', group: 'Capture', query: 'cold email services', nav: 'Cold email', card: 'Cold email outreach',
    blurb: 'Separate sending domains, mailboxes, authentication and warmup set up properly, then sequences written and launched that start real conversations.',
    from: 600,
    tiers: [
      { name: 'Starter', price: 600, days: 5, items: '2 domains, 4 mailboxes, authentication, warmup started, sending tool connected' },
      { name: 'Standard', price: 1400, days: 10, items: '4 domains, 10 mailboxes, plus a 3-step sequence written and loaded' },
      { name: 'Advanced', price: 2800, days: 14, items: '8 domains, 20 mailboxes, sequence, lead list review, 30 days of monitoring' },
    ],
  },
  {
    slug: 'funnel-audit', icon: 'funnel', group: 'Convert', query: 'funnel audit', nav: 'Funnels and conversion', card: 'Funnels and conversion',
    blurb: 'We measure drop-off at every step from first click to purchase, then rebuild the pages, forms, follow-up and automation that leak revenue.',
    from: 500,
    tiers: [
      { name: 'Audit', price: 500, days: 5, items: '1 funnel audited, written leak report with ranked fixes, 30 minute walkthrough' },
      { name: 'Audit and fix', price: 1500, days: 10, items: 'Audit plus the top 5 fixes built: pages, forms, sequences, automation' },
      { name: 'Rebuild', price: 3500, days: 21, items: 'The weakest stages rebuilt, a new nurture sequence, 2 weeks of post-launch tuning' },
    ],
  },
  {
    slug: 'email-marketing', icon: 'loop', group: 'Convert', query: 'email marketing services', nav: 'Email marketing', card: 'Email marketing',
    blurb: 'Welcome, abandoned cart, post-purchase and win-back flows plus campaigns in Klaviyo, HubSpot or ActiveCampaign, measured by the revenue they bring in.',
    from: null, tiers: [],
  },
  {
    slug: 'ai-automation', icon: 'ai', group: 'Scale', query: 'ai automation services', isNew: true, nav: 'AI automation', card: 'AI automation',
    blurb: 'AI agents and workflows in n8n, Make and Zapier that research leads, sort replies, publish content, update the CRM and report, with a person approving what goes out.',
    from: null, tiers: [],
  },
  {
    slug: 'email-deliverability', icon: 'shield', group: 'Scale', query: 'email deliverability consultant', nav: 'Email deliverability', card: 'Email deliverability',
    blurb: 'If your email lands in spam, every other channel loses money. We test SPF, DKIM, DMARC, blacklists and reputation, fix what fails and re-test inbox placement.',
    from: 350,
    tiers: [
      { name: 'Audit', price: 350, days: 3, items: 'Full audit of 1 domain, inbox placement test, written fix list in priority order' },
      { name: 'Audit and fix', price: 900, days: 7, items: 'Everything in Audit, all DNS and ESP fixes done, blacklist delisting requests, re-test' },
      { name: 'Fix and monitor', price: 1800, days: 14, items: 'Up to 3 domains, warmup plan, 30 days of monitoring, a second placement test' },
    ],
  },
];

// Revenue results from published case studies (each links to its case page).
export const REVENUE_PROOF = [
  { value: 40, pre: '', suf: '%', label: 'growth in online revenue', client: 'Synaps Dx', slug: 'synaps-dx' },
  { value: 500, pre: '$', suf: 'K', label: 'new annual revenue from enrollments', client: 'Soulful Evolution', slug: 'soulful-evolution' },
  { value: 3.5, pre: '', suf: 'x', label: 'return on ad spend', client: 'Austere', slug: 'austere' },
  { value: 3, pre: '', suf: 'x', label: 'lead volume at 40% lower cost per acquisition', client: 'Dimov Associates', slug: 'dimov-associates' },
];

export type Case = {
  slug: string; client: string; seoTitle: string; industry: string; headline: string; period: string;
  results: { metric: string; value: string }[]; service: string; quote?: { text: string; who: string };
};

// Numbers from the case studies published on growrevenue.co since 2025. Each needs client sign-off logged (K-01).
export const CASES: Case[] = [
  { slug: 'synaps-dx', seoTitle: 'Synaps Dx Case Study: 40% Revenue Growth', client: 'Synaps Dx', industry: 'Ecommerce', service: 'email-marketing',
    headline: '40% growth in online revenue, with email driving 38%+ of it', period: 'first quarter',
    results: [ { metric: 'Growth in online revenue', value: '40%' }, { metric: 'Email ROI', value: '5x' }, { metric: 'Email share of online revenue', value: 'under 5% to 38%+' }, { metric: 'Open rate', value: '18% to 35%' }, { metric: 'Click-through rate', value: '1.5% to 3.2%' }, { metric: 'Dormant subscribers re-engaged', value: '25,000' }, { metric: 'New leads from rebuilt sign-up forms', value: '10,000' } ],
    quote: { text: 'We knew our community was filled with potential, but we needed a fresh strategy to rekindle that connection and motivate our audience to take the next step with us.', who: 'Erin and Sarit, Founders, Synaps Dx' } },
  { slug: 'scalability', seoTitle: 'Scalability Case Study: 50+ B2B Meetings', client: 'Scalability', industry: 'B2B services', service: 'lead-generation',
    headline: '150+ qualified leads a month and 50+ sales consultations in 3 months', period: 'first 3 months',
    results: [ { metric: 'Qualified leads per month', value: '150+' }, { metric: 'Lead to meeting', value: '40%' }, { metric: 'Cold email open rate', value: '45%' }, { metric: 'LinkedIn acceptance rate', value: '38%' }, { metric: 'Consultations booked', value: '50+' } ],
    quote: { text: 'We needed a scalable and effective way to connect with decision-makers and demonstrate the value of our services. This partnership gave us the tools to achieve that.', who: 'Natalia Odrinskaya, The Scalability Team' } },
  { slug: 'maestro', seoTitle: 'Maestro Case Study: 65% More Creator Sign-Ups', client: 'Maestro', industry: 'Creator platform', service: 'cold-email-infrastructure',
    headline: '65% more sign-ups from segmented cold email', period: 'campaign period',
    results: [ { metric: 'Sign-ups from cold email and LinkedIn', value: '+65%' }, { metric: 'Open rate', value: '42%' }, { metric: 'Potential users reached', value: '200,000+' }, { metric: 'Engagement versus previous outreach', value: '+50%' } ] },
  { slug: 'soulful-evolution', seoTitle: 'Soulful Evolution Case Study: $500K Revenue', client: 'Soulful Evolution', industry: 'Coaching', service: 'lead-generation',
    headline: '$500K in new annual revenue from a 60% jump in program sign-ups', period: 'first quarter',
    results: [ { metric: 'New annual revenue from enrollments', value: '$500K' }, { metric: 'Program sign-ups', value: '+60%' }, { metric: 'Leads per month across channels', value: '300+' }, { metric: 'Cold email open rate', value: '46%' }, { metric: 'Lead to sign-up conversion', value: '+35%' } ] },
  { slug: 'dimov-associates', seoTitle: 'Dimov Associates Case Study: 3x Leads', client: 'Dimov Associates', industry: 'Legal', service: 'funnel-audit',
    headline: '3x lead volume for a law firm at 40% lower cost per acquisition', period: '90 days',
    results: [ { metric: 'Lead volume', value: '3x' }, { metric: 'Cost per acquisition', value: '40% lower' }, { metric: 'Time to scale the system', value: '90 days' } ],
    quote: { text: 'We knew marketing was powerful, but we struggled to find a partner who could address our unique pain points and help us scale sustainably. Both Barbara and Kunal simply nailed it.', who: 'Debra Becker, Founder and CEO, Dimov Associates' } },
  { slug: 'austere', seoTitle: 'Austere Case Study: 3.5x Return on Ad Spend', client: 'Austere', industry: 'Marketing services', service: 'paid-advertising',
    headline: '3.5x return on ad spend and 450+ qualified leads in a quarter', period: 'one quarter',
    results: [ { metric: 'Return on ad spend', value: '3.5x' }, { metric: 'Qualified leads', value: '450+' }, { metric: 'Lead conversion growth', value: '380%' } ] },
];

export const svc = (slug: string) => SERVICES.find((s) => s.slug === slug)!;
export const usd = (n: number) => '$' + n.toLocaleString('en-US');
