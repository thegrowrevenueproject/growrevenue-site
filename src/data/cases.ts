// Case study bodies. Facts only from the previously published case studies on growrevenue.co.
// Client quotes are shown only where the same wording appears consistently (checklist K-04); others await confirmation.
export const CASE_BODY: Record<string, { summary: string; before: string[]; changes: { h: string; p: string }[]; details: [string, string][] }> = {
  'synaps-dx': {
    summary: 'Synaps Dx sold online, but email was an afterthought: a few promotional blasts, no automation, and open rates below the 20% benchmark. We rebuilt the program around lifecycle flows and segmented campaigns.',
    before: ['Email drove under 5% of total online revenue, almost all from sporadic promotions.', 'Open rate was 18% and click-through rate 1.5%.', 'There were no automated flows to welcome subscribers, recover carts or bring buyers back.'],
    changes: [
      { h: 'Audit and roadmap', p: 'We reviewed every existing email and list, found the gaps, and built a roadmap that put automation and personalization first.' },
      { h: 'Four lifecycle flows', p: 'A welcome series to educate new subscribers, abandoned cart reminders with offers, post-purchase emails for reviews and upsells, and a win-back flow for inactive customers.' },
      { h: 'Segmented campaigns and testing', p: 'Four to five campaigns a month, segmented by behavior and purchase history, on new on-brand templates, with A/B tests on subject lines and offers.' },
      { h: 'List growth and reactivation', p: 'Rebuilt sign-up forms to grow the list, and a targeted reactivation sequence for dormant subscribers.' },
    ],
    details: [['Automated flows share of online revenue, first 3 months', 'over 20%, up from under 5%'], ['Best campaign month', '45% of total monthly revenue'], ['Open rate', '18% to 35%'], ['Click-through rate', '1.5% to 3.2%'], ['Dormant subscribers re-engaged, first quarter', '25,000'], ['New leads from rebuilt sign-up forms', '10,000'], ['Growth in online revenue', '40%'], ['Email share of online revenue', 'under 5% to 38%+'], ['Email ROI', 'up 5x']],
  },
  scalability: {
    summary: 'Scalability, a B2B services firm, needed a steady flow of qualified meetings with decision-makers. Their outreach ran in separate channels with no shared message. We joined cold email, LinkedIn and paid search into one system.',
    before: ['Lead generation did not produce the volume or quality needed to grow.', 'Prospects did not understand what Scalability did or why it mattered.', 'Channels ran separately, so results were inconsistent and hard to read.'],
    changes: [
      { h: 'Segmented cold email', p: 'Sequences written per segment, each with a relevant case study and a single clear ask, sent from infrastructure set up for outreach.' },
      { h: 'LinkedIn outreach', p: 'Personalized connection requests and follow-up messages to the same decision-makers, so prospects met the same message twice.' },
      { h: 'Search ads into matched landing pages', p: 'Google Ads campaigns pointing to landing pages that matched each ad, to capture people already searching.' },
    ],
    details: [['Qualified leads per month, all channels', '150+'], ['Lead to meeting conversion', '40%'], ['Cold email open rate', '45%'], ['Cold email click-through rate', '18%'], ['LinkedIn connection acceptance', '38%'], ['LinkedIn message response rate', '15%'], ['Google Ads click-through rate', '6.5%'], ['Cost per click', '20% lower'], ['Consultations booked, first 3 months', '50+']],
  },
  maestro: {
    summary: 'Maestro lets creators run live streams and keep all of their ticketing and subscription revenue, but the streaming market is crowded and most creators had never heard of it. We built outreach that spoke to each type of creator separately.',
    before: ['A crowded market made the platform hard to tell apart from the big names.', 'Creators did not know Maestro let them keep 100% of ticketing and subscription revenue.', 'Interest was not turning into sign-ups.'],
    changes: [
      { h: 'Cold email by creator segment', p: 'Separate campaigns for musicians, fitness instructors, educators and influencers, each leading with the revenue argument that mattered to that group, backed by case studies and testimonials.' },
      { h: 'LinkedIn campaigns', p: 'Personalized outreach to professionals in creative, education and entertainment, focused on analytics, branded channels and revenue streams.' },
      { h: 'Social campaigns', p: 'Feature demos and user stories on Facebook, Instagram and Twitter, plus targeted ads for reach.' },
    ],
    details: [['Sign-ups from cold email and LinkedIn', '+65%'], ['Email open rate', '42%'], ['Potential users reached through social campaigns', '200,000+'], ['Engagement versus previous outreach', '+50%']],
  },
  'soulful-evolution': {
    summary: 'Soulful Evolution runs personal growth coaching programs. People knew the brand, but too few enrolled. We connected LinkedIn, Google Ads and email nurture into one path from first touch to sign-up.',
    before: ['Marketing was not reaching high-intent prospects.', 'People knew the brand but did not engage with the programs.', 'Program sign-up rates stayed below target despite steady traffic.'],
    changes: [
      { h: 'LinkedIn outreach', p: 'Personalized connection requests to wellness professionals and personal growth audiences, with thought leadership content and testimonial ads.' },
      { h: 'Google Ads and landing pages', p: 'Campaigns on personal growth and mindset coaching searches, sending traffic to landing pages built for conversion with clear calls to action and testimonials.' },
      { h: 'Segmented email nurture', p: 'Lists segmented for professionals and wellness communities, with automated nurture sequences guiding leads to a decision.' },
    ],
    details: [['New annual revenue from additional enrollments', '$500,000'], ['Leads per month across channels', '300+'], ['Lead to sign-up conversion', '+35%'], ['LinkedIn acceptance rate', '42%'], ['LinkedIn response rate', '16%'], ['Google Ads click-through rate', '7.2%'], ['Cold email open rate', '46%'], ['Cold email click-through rate', '22%'], ['Consultations and enrollments, first quarter', '70+'], ['Program sign-ups within 3 months', '+60%']],
  },
  'dimov-associates': {
    summary: 'Dimov Associates, a law firm, wanted predictable, sustainable lead flow without chasing every inquiry by hand. We built one connected system: paid ads, conversion funnels and email nurture sequences that run without manual intervention.',
    before: ['Lead flow was not predictable enough to plan growth on.', 'Previous marketing partners had not addressed the firm\'s specific pain points.'],
    changes: [
      { h: 'Conversion funnels', p: 'Funnels built for a legal practice, taking a visitor from the first click to a booked inquiry.' },
      { h: 'Email nurture sequences', p: 'Automated sequences that keep in touch with inquiries that do not book straight away.' },
      { h: 'Paid ads feeding the funnel', p: 'Ad campaigns sending traffic into the new funnels, managed together with the rest of the system.' },
    ],
    details: [['Lead volume', '3x'], ['Cost per acquisition', '40% lower'], ['Time to scale the system', '90 days']],
  },
  austere: {
    summary: 'Austere is a social media marketing firm for artists. Thousands of people searched for Instagram growth every month, but few turned into leads on its microsites, and paid campaigns were not paying back. We matched ads to pages and tested our way up.',
    before: ['Search traffic did not match what visitors found on the microsites.', 'Visitors rarely became leads despite consistent traffic.', 'Paid campaigns were not returning their cost.'],
    changes: [
      { h: 'Behavior segmentation', p: 'Visitor behavior analysis to sharpen the audience personas and the motivations behind each search.' },
      { h: 'Dynamic landing content', p: 'Landing page headlines that change to match the search keyword, so each visitor sees the promise from the ad.' },
      { h: 'Paid campaigns and testing', p: 'Google, Facebook and TikTok campaigns on high-intent keywords, with continuous A/B tests on creative, headlines and calls to action.' },
    ],
    details: [['Lead conversion versus pre-test baseline', '+380%'], ['Return on ad spend', '3.5x'], ['Qualified leads, first quarter', '450+'], ['Cost per click', '18% lower'], ['Click-through rate', '+22%'], ['Bounce rate', '28% lower'], ['Visitors engaging with microsite elements', '20% to 62%']],
  },
};
