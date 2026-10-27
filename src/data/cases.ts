// Case study bodies. Facts only from the previously published case studies on growrevenue.co.
// Client quotes are shown only where the same wording appears consistently (checklist K-04); others await confirmation.
// Everything beyond the facts (market, how, why, lessons) is methodology or general context, never a new claim about the client.
export type Stat = { value: number; pre?: string; suf?: string; label: string; sub?: string };
export type BarRow = { label: string; before: number; after: number; showBefore?: string; showAfter?: string; max?: number };
export type CaseBody = {
  summary: string;
  industryNoun: string; // used in "What can other ___ businesses learn from this?"
  market: string[];
  start: string[];
  before: string[];
  changes: { h: string; p: string; more: string }[];
  flowTitle: string;
  flow: { t: string; p: string; tag?: string }[];
  details: [string, string][];
  statsTitle: string;
  stats: Stat[];
  bars?: { title: string; sub: string; unit?: string; rows: BarRow[] };
  versus?: { title: string; a: string; b: string; caption: string; rows: [string, string, string][]; win?: 'a' | 'b' };
  why: string[];
  lessons: { h: string; p: string }[];
  faq: [string, string][];
};

export const CASE_BODY: Record<string, CaseBody> = {
  'synaps-dx': {
    summary: 'Synaps Dx sold online, but email was an afterthought: a few promotional blasts, no automation, and open rates below the 20% benchmark. We rebuilt the program around lifecycle flows and segmented campaigns.',
    industryNoun: 'ecommerce',
    market: [
      'Synaps Dx is an ecommerce business that sells online to a community of customers and subscribers. Like most online stores, it can grow revenue in two ways: pay to bring in new visitors, or sell again to people who already know the brand.',
      'Email sits firmly on the second side. A subscriber list is an audience the business owns, so every sale it produces carries no extra media cost. In ecommerce email marketing the real question is not whether to send email, but whether the program is built to sell or only to announce.',
    ],
    start: [
      'When we started, email at Synaps Dx was an afterthought. The list existed, but it was used for occasional promotional blasts and little else.',
      'There was no automation at all. A new subscriber heard nothing until the next promotion. A shopper who left a full cart was never reminded. A customer who bought once was not asked for a review or shown a second product, and a customer who drifted away was never invited back.',
      'The numbers showed it. Open rate sat at 18%, under the commonly quoted 20% benchmark, and click-through rate was 1.5%. Email produced under 5% of online revenue, almost all of it from those sporadic promotions.',
    ],
    before: ['Email drove under 5% of total online revenue, almost all from sporadic promotions.', 'Open rate was 18% and click-through rate 1.5%.', 'There were no automated flows to welcome subscribers, recover carts or bring buyers back.'],
    changes: [
      { h: 'Audit and roadmap', p: 'We reviewed every existing email and list, found the gaps, and built a roadmap that put automation and personalization first.',
        more: 'The audit looked at the program from the subscriber\'s side: what a new subscriber receives, what a cart abandoner receives, what a first-time buyer receives. At Synaps Dx the honest answer to each was nothing until the next promotion, which made the order of work obvious. Automation came first because it earns on every sign-up and every order without anyone pressing send.' },
      { h: 'Four lifecycle flows', p: 'A welcome series to educate new subscribers, abandoned cart reminders with offers, post-purchase emails for reviews and upsells, and a win-back flow for inactive customers.',
        more: 'Flows work because they are triggered by what a person just did, so they arrive when interest is highest. A welcome email lands minutes after sign-up, while the brand is still front of mind. A cart reminder reaches a shopper who was one click from buying. Post-purchase emails reach someone who has just trusted the brand with money, the best moment to ask for a review or suggest the next product. Win-back gives lapsed customers a reason to return before they are gone for good.' },
      { h: 'Segmented campaigns and testing', p: 'Four to five campaigns a month, segmented by behavior and purchase history, on new on-brand templates, with A/B tests on subject lines and offers.',
        more: 'Segmentation means each message goes to fewer people, but fits each of them better. A repeat buyer and someone who has never bought should not get the same email. Splitting campaigns by behavior and purchase history makes each email more relevant, which is what lifts opens and clicks. The A/B tests then showed which subject lines and offers to keep, so every month started from what had already worked.' },
      { h: 'List growth and reactivation', p: 'Rebuilt sign-up forms to grow the list, and a targeted reactivation sequence for dormant subscribers.',
        more: 'A list loses value as people stop opening. Rebuilt sign-up forms brought in 10,000 new leads, and the reactivation sequence re-engaged 25,000 dormant subscribers in the first quarter. Waking up existing subscribers usually costs far less than finding new ones, and engaged readers also support sender reputation, which helps every other email reach the inbox.' },
    ],
    flowTitle: 'How the email program was rebuilt',
    flow: [
      { tag: 'Audit', t: 'Read every email and list', p: 'Map what each type of subscriber actually receives, and where they hear nothing.' },
      { tag: 'Automate', t: 'Build four lifecycle flows', p: 'Welcome, abandoned cart, post-purchase and win-back, each triggered by behavior.' },
      { tag: 'Segment', t: 'Send fewer, better campaigns', p: 'Four to five a month, split by behavior and purchase history, on new templates.' },
      { tag: 'Test', t: 'Keep what wins', p: 'A/B tests on subject lines and offers decide the next send.' },
      { tag: 'Grow', t: 'Refill and wake the list', p: 'Rebuilt sign-up forms plus a reactivation sequence for dormant subscribers.' },
    ],
    details: [['Automated flows share of online revenue, first 3 months', 'over 20%, up from under 5%'], ['Best campaign month', '45% of total monthly revenue'], ['Open rate', '18% to 35%'], ['Click-through rate', '1.5% to 3.2%'], ['Dormant subscribers re-engaged, first quarter', '25,000'], ['New leads from rebuilt sign-up forms', '10,000'], ['Growth in online revenue', '40%'], ['Email share of online revenue', 'under 5% to 38%+'], ['Email ROI', 'up 5x']],
    statsTitle: 'What one quarter of rebuilt email produced',
    stats: [
      { value: 40, suf: '%', label: 'growth in online revenue', sub: 'Measured over the first quarter' },
      { value: 5, suf: 'x', label: 'increase in email ROI' },
      { value: 25000, label: 'dormant subscribers re-engaged', sub: 'First quarter' },
      { value: 10000, label: 'new leads from rebuilt sign-up forms' },
    ],
    bars: { title: 'Before and after the rebuild', sub: 'Every bar is a measured value from the Synaps Dx program. Email went from an afterthought to a top revenue channel.', unit: '%', rows: [
      { label: 'Open rate', before: 18, after: 35 },
      { label: 'Click-through rate', before: 1.5, after: 3.2 },
      { label: 'Automated flows share of online revenue', before: 5, after: 20, showBefore: 'under 5%', showAfter: 'over 20%' },
      { label: 'Email share of online revenue', before: 5, after: 38, showBefore: 'under 5%', showAfter: '38%+' },
    ] },
    why: [
      'Three things did most of the work. First, automation filled the silence. Every sign-up, abandoned cart, order and lapse now triggered a relevant email, so revenue no longer depended on someone remembering to send a promotion.',
      'Second, relevance went up. Segmented campaigns and tested subject lines explain why open rate nearly doubled and click-through rate more than doubled. People open what feels written for them.',
      'Third, the list itself got healthier. New subscribers came in through better forms and dormant ones were woken up, so each campaign reached more engaged readers. Together, these took email from under 5% to over 38% of online revenue.',
    ],
    lessons: [
      { h: 'Build the flows before the next campaign', p: 'If your store sends promotions but has no welcome, abandoned cart, post-purchase or win-back flows, those four are usually the fastest revenue to add. Once built, they run every day without new work.' },
      { h: 'Judge email by revenue, not by opens', p: 'Privacy features in some mail apps now inflate open rates, so opens are a weak signal on their own. Track the share of online revenue that email produces, as we did here.' },
      { h: 'Treat dormant subscribers as an asset', p: 'A reactivation sequence costs little to run. It either brings people back or tells you who to remove, and removing them protects deliverability for everyone else.' },
    ],
    faq: [
      ['How long did the Synaps Dx results take?', 'The results on this page were measured over the first quarter. Automated flows reached over 20% of online revenue within the first three months, and the 40% growth in online revenue was measured over the same quarter.'],
      ['Which email flows made the biggest difference?', 'The four core flows worked together, so we report them as one number: automated flows grew from under 5% to over 20% of online revenue in the first three months. Welcome, abandoned cart, post-purchase and win-back each cover a different moment in the customer journey.'],
      ['Would this work for a smaller online store?', 'Usually, yes. Flows earn from every new subscriber and every order, so they pay off on lists of a few thousand. Results depend on your offer, list and market, which is why every project starts with an audit.'],
    ],
  },

  scalability: {
    summary: 'Scalability, a B2B services firm, needed a steady flow of qualified meetings with decision-makers. Their outreach ran in separate channels with no shared message. We joined cold email, LinkedIn and paid search into one system.',
    industryNoun: 'B2B services',
    market: [
      'Scalability is a B2B services firm. It sells to business decision-makers, which in B2B services usually means a small number of high-value buyers, a considered decision, and a sale that starts with a conversation rather than a checkout.',
      'In B2B lead generation, volume alone is not the goal. One meeting with the right decision-maker is worth more than a hundred clicks from the wrong audience. The numbers that matter are qualified leads and booked consultations, and those are the numbers this project was measured on.',
    ],
    start: [
      'Scalability came to us because lead generation was not producing the volume or the quality of leads needed to grow. Without a steady pipeline of qualified meetings, growth was hard to plan.',
      'Part of the problem was the message. Prospects did not clearly understand what Scalability did or why it mattered to them, so even interested people had no strong reason to book a call.',
      'The other part was structure. Outreach ran in separate channels with no shared message, so results were inconsistent and hard to read. When a month went well, nobody could say which channel had earned it.',
    ],
    before: ['Lead generation did not produce the volume or quality needed to grow.', 'Prospects did not understand what Scalability did or why it mattered.', 'Channels ran separately, so results were inconsistent and hard to read.'],
    changes: [
      { h: 'Segmented cold email', p: 'Sequences written per segment, each with a relevant case study and a single clear ask, sent from infrastructure set up for outreach.',
        more: 'Segmenting the market first solves the message problem. A sequence written for one type of buyer can name that buyer\'s situation and show a result from a similar company, which answers "why should I care" before it is asked. A single clear ask keeps the decision small. Sending from infrastructure built for outreach protects the main company domain and supports inbox placement. Cold email reached a 45% open rate.' },
      { h: 'LinkedIn outreach', p: 'Personalized connection requests and follow-up messages to the same decision-makers, so prospects met the same message twice.',
        more: 'The same message in two places is more credible than either alone. A prospect who has read the email and then sees a connection request from the same team recognizes the name, which is why 38% accepted and 15% replied to messages. LinkedIn also reaches people whose inbox is crowded, so it catches decision-makers that email alone would miss.' },
      { h: 'Search ads into matched landing pages', p: 'Google Ads campaigns pointing to landing pages that matched each ad, to capture people already searching.',
        more: 'Outbound reaches people who are not yet looking. Search ads catch the ones who already are. Matching each landing page to the ad that sent the visitor keeps the promise consistent from click to page, which tends to lift click-through rate and lower wasted spend. Here the ads reached a 6.5% click-through rate with cost per click 20% lower.' },
    ],
    flowTitle: 'One system instead of three separate channels',
    flow: [
      { tag: 'Segment', t: 'Split the market', p: 'Group decision-makers by situation so each message can be specific.' },
      { tag: 'Email', t: 'Lead with a matching case study', p: 'One relevant proof point and one clear ask per sequence.' },
      { tag: 'LinkedIn', t: 'Repeat the same message', p: 'Personal connection requests and follow-ups to the same people.' },
      { tag: 'Search', t: 'Catch active searchers', p: 'Google Ads into landing pages that match each ad.' },
      { tag: 'Measure', t: 'Count meetings, not clicks', p: 'Qualified leads per month and lead to meeting conversion.' },
    ],
    details: [['Qualified leads per month, all channels', '150+'], ['Lead to meeting conversion', '40%'], ['Cold email open rate', '45%'], ['Cold email click-through rate', '18%'], ['LinkedIn connection acceptance', '38%'], ['LinkedIn message response rate', '15%'], ['Google Ads click-through rate', '6.5%'], ['Cost per click', '20% lower'], ['Consultations booked, first 3 months', '50+']],
    statsTitle: 'What the joined-up system produced',
    stats: [
      { value: 150, suf: '+', label: 'qualified leads a month', sub: 'Across all channels' },
      { value: 40, suf: '%', label: 'lead to meeting conversion' },
      { value: 50, suf: '+', label: 'consultations booked', sub: 'First 3 months' },
      { value: 45, suf: '%', label: 'cold email open rate' },
    ],
    versus: { title: 'What changed in the outreach', a: 'Before', b: 'After', caption: 'Scalability outreach before and after the project', rows: [
      ['Channels', 'Run separately', 'One system with one message'],
      ['Message', 'Prospects unsure what Scalability did', 'Written per segment with a relevant case study'],
      ['Ask', 'Not consistent', 'One clear ask per sequence'],
      ['People already searching', 'Not matched to pages', 'Search ads into matching landing pages'],
      ['Reading the results', 'Inconsistent and hard to read', 'Qualified leads and meetings per month'],
    ] },
    why: [
      'The biggest change was not a new channel. It was one message, carried by every channel. Each prospect met the same clear explanation of what Scalability did and a result from a company like theirs, by email, on LinkedIn and on the landing page.',
      'Segmentation made that message specific enough to answer. That shows in the engagement: a 45% open rate and an 18% click-through rate on cold email are signs that the right people received something relevant to them.',
      'Finally, measuring meetings instead of activity kept the work honest. A 40% lead to meeting conversion means the leads were real conversations, which is how 150+ qualified leads a month turned into 50+ booked consultations in three months.',
    ],
    lessons: [
      { h: 'Fix the message before adding channels', p: 'If prospects cannot say what you do in one sentence, more outreach just spreads the confusion. Write the message per segment first, then send it.' },
      { h: 'Use LinkedIn and email together', p: 'Reaching the same decision-maker in two places, with the same message, builds recognition. Each channel makes the other one work better.' },
      { h: 'Report on meetings booked', p: 'Opens and clicks are useful for tuning, but the number a B2B services firm can plan around is qualified meetings per month.' },
    ],
    faq: [
      ['How many leads did Scalability get?', 'Over 150 qualified leads a month across cold email, LinkedIn and Google Ads, with 40% of leads converting to a meeting and more than 50 consultations booked in the first three months.'],
      ['Why combine cold email, LinkedIn and search ads?', 'Each reaches buyers at a different stage. Cold email and LinkedIn start conversations with people who are not yet looking, and search ads catch people who already are. Sharing one message across all three made each channel more effective.'],
      ['Does outbound lead generation still work for B2B services?', 'It does when it is targeted and technically sound: segmented lists, a relevant proof point, a single ask, and sending infrastructure that keeps email in the inbox. Results depend on your offer and market.'],
    ],
  },

  maestro: {
    summary: 'Maestro lets creators run live streams and keep all of their ticketing and subscription revenue, but the streaming market is crowded and most creators had never heard of it. We built outreach that spoke to each type of creator separately.',
    industryNoun: 'creator platform',
    market: [
      'Maestro is a creator platform. Creators use it to run live streams and keep 100% of their ticketing and subscription revenue, which is a strong offer for anyone who earns from an audience.',
      'The challenge is the market around it. Live streaming is crowded with large, well-known platforms, and creators already have habits and audiences elsewhere. A newer platform has to earn attention before it can explain its offer, and a generic message is easy to ignore.',
    ],
    start: [
      'The streaming market made Maestro hard to tell apart from the big names. To a creator scrolling past, it could look like one more option among many.',
      'The strongest part of the offer was also the least known. Many creators did not know that Maestro let them keep 100% of ticketing and subscription revenue, which is the reason most of them would care.',
      'Where interest did exist, it was not turning into sign-ups. People who heard about Maestro did not have a clear enough reason, specific to their own work, to create an account.',
    ],
    before: ['A crowded market made the platform hard to tell apart from the big names.', 'Creators did not know Maestro let them keep 100% of ticketing and subscription revenue.', 'Interest was not turning into sign-ups.'],
    changes: [
      { h: 'Cold email by creator segment', p: 'Separate campaigns for musicians, fitness instructors, educators and influencers, each leading with the revenue argument that mattered to that group, backed by case studies and testimonials.',
        more: 'A musician, a fitness instructor, an educator and an influencer all earn from an audience, but in different ways. Writing a separate campaign for each let us open with the way that group actually makes money, then show how keeping all of the ticketing and subscription revenue changes it. Case studies and testimonials from similar creators answered the question every busy creator asks: has this worked for someone like me?' },
      { h: 'LinkedIn campaigns', p: 'Personalized outreach to professionals in creative, education and entertainment, focused on analytics, branded channels and revenue streams.',
        more: 'LinkedIn reaches the professional side of the creator economy: people who run creative, education and entertainment work as a business. For them the conversation shifted from fan reach to business tools, so the outreach focused on analytics, branded channels and revenue streams.' },
      { h: 'Social campaigns', p: 'Feature demos and user stories on Facebook, Instagram and Twitter, plus targeted ads for reach.',
        more: 'Creators judge a platform by seeing it in use. Feature demos showed what Maestro does, and user stories showed who already uses it. Targeted ads put that content in front of a wider pool of potential users, reaching more than 200,000 of them, so cold email and LinkedIn messages landed with people who had often already seen the product.' },
    ],
    flowTitle: 'How the segmented outreach was built',
    flow: [
      { tag: 'Segment', t: 'Split creators by how they earn', p: 'Musicians, fitness instructors, educators and influencers.' },
      { tag: 'Message', t: 'Lead with the revenue argument', p: 'Keep 100% of ticketing and subscription revenue, framed for each group.' },
      { tag: 'Proof', t: 'Show similar creators', p: 'Case studies and testimonials matched to the segment.' },
      { tag: 'Reach', t: 'Email, LinkedIn and social', p: 'Each channel carries the same argument in its own format.' },
      { tag: 'Convert', t: 'Measure sign-ups', p: 'Track sign-ups from cold email and LinkedIn against earlier outreach.' },
    ],
    details: [['Sign-ups from cold email and LinkedIn', '+65%'], ['Email open rate', '42%'], ['Potential users reached through social campaigns', '200,000+'], ['Engagement versus previous outreach', '+50%']],
    statsTitle: 'What segmented outreach produced for Maestro',
    stats: [
      { value: 65, pre: '+', suf: '%', label: 'sign-ups from cold email and LinkedIn' },
      { value: 42, suf: '%', label: 'email open rate' },
      { value: 200000, suf: '+', label: 'potential users reached', sub: 'Through social campaigns' },
      { value: 50, pre: '+', suf: '%', label: 'engagement versus previous outreach' },
    ],
    versus: { title: 'One message for everyone versus one per segment', a: 'Generic outreach', b: 'Segmented outreach', caption: 'Why segmenting creators changes the response', rows: [
      ['Opening line', 'Describes the platform', 'Describes how this creator earns'],
      ['Main argument', 'Feature list', 'Keep 100% of ticketing and subscription revenue'],
      ['Proof', 'General claims', 'Case studies and testimonials from similar creators'],
      ['Channels', 'One at a time', 'Email, LinkedIn and social carrying the same argument'],
    ] },
    why: [
      'The offer was always strong. What changed was who heard it and how. Splitting creators into segments meant each person read a message about their own way of earning, not a general pitch about a streaming platform.',
      'Leading with revenue gave creators a reason to stop and read. In a crowded market, "you keep all of your ticketing and subscription revenue" is a clearer difference than any feature.',
      'Proof did the rest. Case studies and testimonials from similar creators lowered the risk of trying something new, which is why sign-ups from cold email and LinkedIn rose 65% and engagement was 50% higher than previous outreach.',
    ],
    lessons: [
      { h: 'Segment by how the customer earns', p: 'Platforms that serve several kinds of user should write to each kind separately. The same product solves a different problem for each.' },
      { h: 'Lead with your sharpest difference', p: 'In a crowded market, open with the one thing competitors cannot say. For Maestro that was keeping 100% of the revenue.' },
      { h: 'Let social prove what outreach promises', p: 'Demos and user stories on social make cold outreach more believable, because the prospect can see the product working before they reply.' },
    ],
    faq: [
      ['How much did sign-ups grow for Maestro?', 'Sign-ups from cold email and LinkedIn rose 65% over the campaign period, with a 42% email open rate and 50% more engagement than previous outreach.'],
      ['Can cold email work for a consumer or creator product?', 'Yes, when the audience can be segmented and reached professionally. Creators who earn from their work behave like small businesses, so a specific, revenue-focused message works the way it does in B2B.'],
      ['What was the role of social media?', 'Social campaigns showed feature demos and user stories and reached more than 200,000 potential users, which gave the cold email and LinkedIn outreach visible proof behind it.'],
    ],
  },

  'soulful-evolution': {
    summary: 'Soulful Evolution runs personal growth coaching programs. People knew the brand, but too few enrolled. We connected LinkedIn, Google Ads and email nurture into one path from first touch to sign-up.',
    industryNoun: 'coaching',
    market: [
      'Soulful Evolution runs personal growth coaching programs. Coaching is a trust purchase: people buy from someone they believe can help them, and they usually need time and proof before they commit.',
      'That makes coaching business marketing different from selling a product. Awareness is not enough. A coaching brand needs a path that takes a person from first hearing the name, to believing the program fits them, to signing up, and most of that path happens after the first click.',
    ],
    start: [
      'Soulful Evolution did not have an awareness problem. People knew the brand. The problem was that they did not engage with the programs or enroll.',
      'Marketing was not reaching high-intent prospects, the people actively looking for coaching and ready to act. Steady traffic arrived, but program sign-up rates stayed below target.',
      'There was also no connected path between the channels. Someone could find the brand on one channel and never be followed up on another, so interest faded before it turned into a decision.',
    ],
    before: ['Marketing was not reaching high-intent prospects.', 'People knew the brand but did not engage with the programs.', 'Program sign-up rates stayed below target despite steady traffic.'],
    changes: [
      { h: 'LinkedIn outreach', p: 'Personalized connection requests to wellness professionals and personal growth audiences, with thought leadership content and testimonial ads.',
        more: 'LinkedIn reaches people who think about their own growth professionally. Personal connection requests opened the conversation, thought leadership content showed how the coaching works, and testimonial ads let past clients do the persuading. That mix answers the two questions every coaching prospect has: does this person know what they are talking about, and has it worked for someone like me? Acceptance reached 42% and responses 16%.' },
      { h: 'Google Ads and landing pages', p: 'Campaigns on personal growth and mindset coaching searches, sending traffic to landing pages built for conversion with clear calls to action and testimonials.',
        more: 'Search is where high-intent prospects show themselves. Someone searching for mindset coaching is already looking for what Soulful Evolution offers. Sending that traffic to landing pages built for one action, with clear calls to action and testimonials close to the button, turns a search into a sign-up or a consultation. The ads reached a 7.2% click-through rate.' },
      { h: 'Segmented email nurture', p: 'Lists segmented for professionals and wellness communities, with automated nurture sequences guiding leads to a decision.',
        more: 'Most coaching leads are not ready on day one. Nurture sequences keep in touch while they decide, with content that answers doubts and shows results. Segmenting professionals and wellness communities meant each group heard examples that matched their situation. Cold email reached a 46% open rate and a 22% click-through rate, and lead to sign-up conversion rose 35%.' },
    ],
    flowTitle: 'One path from first touch to enrollment',
    flow: [
      { tag: 'Reach', t: 'Find high-intent prospects', p: 'LinkedIn outreach and Google Ads on personal growth and mindset coaching searches.' },
      { tag: 'Trust', t: 'Show the coaching works', p: 'Thought leadership content and testimonial ads.' },
      { tag: 'Capture', t: 'Land on a page built to convert', p: 'One clear call to action, with testimonials beside it.' },
      { tag: 'Nurture', t: 'Follow up by segment', p: 'Automated sequences for professionals and wellness communities.' },
      { tag: 'Enroll', t: 'Book and sign up', p: 'Consultations and program enrollments, measured monthly.' },
    ],
    details: [['New annual revenue from additional enrollments', '$500,000'], ['Leads per month across channels', '300+'], ['Lead to sign-up conversion', '+35%'], ['LinkedIn acceptance rate', '42%'], ['LinkedIn response rate', '16%'], ['Google Ads click-through rate', '7.2%'], ['Cold email open rate', '46%'], ['Cold email click-through rate', '22%'], ['Consultations and enrollments, first quarter', '70+'], ['Program sign-ups within 3 months', '+60%']],
    statsTitle: 'What the connected path produced',
    stats: [
      { value: 500, pre: '$', suf: 'K', label: 'new annual revenue from additional enrollments' },
      { value: 60, pre: '+', suf: '%', label: 'program sign-ups', sub: 'Within 3 months' },
      { value: 300, suf: '+', label: 'leads a month across channels' },
      { value: 70, suf: '+', label: 'consultations and enrollments', sub: 'First quarter' },
    ],
    versus: { title: 'Channel by channel, what each one did', a: 'What we ran', b: 'Measured result', caption: 'Soulful Evolution channel results', win: 'b', rows: [
      ['LinkedIn outreach', 'Connection requests, thought leadership, testimonial ads', '42% acceptance, 16% response'],
      ['Google Ads', 'Personal growth and mindset coaching searches', '7.2% click-through rate'],
      ['Email', 'Segmented outreach and automated nurture', '46% open rate, 22% click-through'],
      ['The whole path', 'All channels into one route to enrollment', '+35% lead to sign-up conversion'],
    ] },
    why: [
      'The project worked because it treated enrollment as a path, not a single click. Each channel had one job: LinkedIn and search found high-intent people, landing pages captured them, and email nurture carried them to a decision.',
      'Trust was built into every step. Thought leadership showed expertise, testimonials showed results, and segmented emails used examples that matched the reader. For a coaching purchase, that proof is often what turns interest into a sign-up.',
      'Because the channels were connected, interest no longer faded between them. That is how 300+ leads a month became 70+ consultations and enrollments in the first quarter, a 60% rise in program sign-ups, and $500,000 in new annual revenue.',
    ],
    lessons: [
      { h: 'Build the path after the click', p: 'Most coaching businesses spend on getting attention and too little on what happens next. A landing page built for one action and an email nurture sequence often matter more than more traffic.' },
      { h: 'Let clients sell the program', p: 'Testimonials near the call to action and in ads answer the question of whether coaching works for someone like the reader. That is often the main objection.' },
      { h: 'Find people who are already looking', p: 'Search ads on coaching terms and targeted LinkedIn outreach reach people with intent. That is one of the most direct ways to get coaching clients who are ready to act.' },
    ],
    faq: [
      ['How did Soulful Evolution add $500K in revenue?', 'Additional enrollments from the new marketing path added $500,000 in new annual revenue. Program sign-ups rose 60% within three months, and lead to sign-up conversion improved by 35%.'],
      ['What marketing works best for coaches?', 'There is no single channel. What worked here was a connected path: reach high-intent prospects through search and LinkedIn, send them to a focused landing page with testimonials, then follow up with segmented email nurture.'],
      ['How long did it take to see results?', 'The results were measured in the first quarter: 70+ consultations and enrollments, and a 60% rise in program sign-ups within three months.'],
    ],
  },

  'dimov-associates': {
    summary: 'Dimov Associates, a law firm, wanted predictable, sustainable lead flow without chasing every inquiry by hand. We built one connected system: paid ads, conversion funnels and email nurture sequences that run without manual intervention.',
    industryNoun: 'law firm',
    market: [
      'Dimov Associates is a law firm. In law firm marketing, every inquiry is valuable, because one client can be worth a great deal of fee income, but the path to an inquiry is fragile. People often look for a lawyer under stress, compare several firms quickly, and contact the one that makes the next step easy.',
      'Legal marketing also carries extra care. Advertising by law firms is regulated, and the rules differ by country and state, so claims and calls to action need to be accurate and measured. A good system makes the next step easy without overpromising.',
    ],
    start: [
      'Dimov Associates came to us wanting predictable, sustainable lead flow. Lead flow was not predictable enough to plan growth on, and the firm did not want to chase every inquiry by hand.',
      'Previous marketing partners had not addressed the firm\'s specific pain points. As the founder put it, the firm knew marketing was powerful but struggled to find a partner who could help it scale sustainably.',
      'The goal was clear: a system that brings in inquiries, follows up on the ones that do not book straight away, and keeps running without someone chasing every lead by hand.',
    ],
    before: ['Lead flow was not predictable enough to plan growth on.', 'Previous marketing partners had not addressed the firm\'s specific pain points.'],
    changes: [
      { h: 'Conversion funnels', p: 'Funnels built for a legal practice, taking a visitor from the first click to a booked inquiry.',
        more: 'A conversion funnel for a law firm has one job: make it easy for a worried visitor to take the next step. That means a page focused on one type of legal problem, a clear explanation of how the firm helps, and a simple way to book an inquiry. Every extra field or unclear button loses people who were ready to call, so the funnel is built to remove friction between the first click and the booked inquiry.' },
      { h: 'Email nurture sequences', p: 'Automated sequences that keep in touch with inquiries that do not book straight away.',
        more: 'Not everyone who contacts a law firm is ready to book that day. Some are still comparing firms, some are waiting on events in their case. Automated nurture sequences keep the firm in front of them with useful information until they are ready, without a lawyer writing each follow-up. This is where a lot of otherwise lost inquiries come back.' },
      { h: 'Paid ads feeding the funnel', p: 'Ad campaigns sending traffic into the new funnels, managed together with the rest of the system.',
        more: 'Ads only pay back if the page they land on converts and the follow-up catches the people who do not. Managing the ads together with the funnels and the nurture sequences meant budget could be judged by booked inquiries and cost per acquisition, not by clicks alone. That is how lead volume tripled while cost per acquisition fell by 40%.' },
    ],
    flowTitle: 'The connected system, from first click to consultation',
    flow: [
      { tag: 'Ads', t: 'Reach people looking for help', p: 'Paid campaigns sending traffic into the new funnels.' },
      { tag: 'Funnel', t: 'Make the next step easy', p: 'A page built for a legal practice, from first click to booked inquiry.' },
      { tag: 'Inquiry', t: 'Capture the contact', p: 'A simple way to book, with no extra friction.' },
      { tag: 'Nurture', t: 'Follow up automatically', p: 'Sequences that keep in touch with inquiries that do not book straight away.' },
      { tag: 'Scale', t: 'Run without manual chasing', p: 'Judge spend by cost per acquisition and grow what works.' },
    ],
    details: [['Lead volume', '3x'], ['Cost per acquisition', '40% lower'], ['Time to scale the system', '90 days']],
    statsTitle: 'What the system produced in 90 days',
    stats: [
      { value: 3, suf: 'x', label: 'lead volume' },
      { value: 40, suf: '%', label: 'lower cost per acquisition' },
      { value: 90, label: 'days to scale the system' },
    ],
    versus: { title: 'Ads alone versus a connected system', a: 'Ads on their own', b: 'Ads, funnel and nurture together', caption: 'Why the connected system lowers cost per acquisition', rows: [
      ['Where the click lands', 'A general page', 'A funnel built for one legal need'],
      ['Visitors not ready today', 'Lost', 'Followed up by automated email'],
      ['Who chases leads', 'Lawyers, by hand', 'The system, without manual work'],
      ['How spend is judged', 'Clicks and impressions', 'Booked inquiries and cost per acquisition'],
    ] },
    why: [
      'The result came from connecting three parts that usually run separately. Ads brought people in, the funnel turned them into inquiries, and nurture caught the ones who were not ready yet. Each part made the others cheaper.',
      'Because more visitors became inquiries and fewer inquiries were lost, the same spend produced more leads. That is why lead volume could triple while cost per acquisition fell by 40%.',
      'And because the follow-up was automated, the system kept running without the firm chasing every inquiry by hand, which was the original goal. It was scaled within 90 days.',
    ],
    lessons: [
      { h: 'Fix the page before raising the budget', p: 'For most law firms the cheapest new lead comes from converting more of the traffic they already pay for. A focused funnel often does more than a bigger ad budget.' },
      { h: 'Follow up on every inquiry automatically', p: 'People who contact a firm and do not book are rarely lost for good. An automated nurture sequence brings many of them back without taking lawyers\' time.' },
      { h: 'Judge spend by cost per acquisition', p: 'Clicks are cheap to buy and easy to misread. For small law firm marketing in particular, the number that matters is what each new client inquiry costs.' },
    ],
    faq: [
      ['How did Dimov Associates triple its leads?', 'By connecting paid ads, conversion funnels built for a legal practice and automated email nurture into one system. Lead volume tripled and cost per acquisition fell by 40%, and the system was scaled within 90 days.'],
      ['What law firm marketing strategies work best?', 'Strategies that reduce friction and lost inquiries tend to pay back fastest: a landing page focused on one legal need, a simple way to book, and automated follow-up for people who are not ready yet. Advertising rules for lawyers vary by jurisdiction, so claims must stay accurate.'],
      ['Does this work for a small law firm?', 'The same structure works at small scale, because it saves the time a small firm has least of: chasing inquiries by hand. Results depend on the practice area, location and budget.'],
    ],
  },

  austere: {
    summary: 'Austere is a social media marketing firm for artists. Thousands of people searched for Instagram growth every month, but few turned into leads on its microsites, and paid campaigns were not paying back. We matched ads to pages and tested our way up.',
    industryNoun: 'marketing services',
    market: [
      'Austere is a social media marketing firm for artists. It serves people who want their work seen, and the demand is real: thousands of people search for Instagram growth every month.',
      'Demand from search is only valuable if the page a searcher lands on matches what they were looking for. When it does not, paid traffic leaks away and every click costs more than it returns. That gap between search and page was the core of this project, and landing page optimization was the main tool.',
    ],
    start: [
      'Austere had traffic. The problem was what happened after the click. Search traffic did not match what visitors found on the microsites, so a person who searched for one thing landed on a page that talked about something more general.',
      'As a result, visitors rarely became leads despite consistent traffic. Only about 20% of visitors engaged with elements on the microsites at all.',
      'Paid campaigns were not returning their cost. Every month of ad spend that did not convert made the next month harder to justify.',
    ],
    before: ['Search traffic did not match what visitors found on the microsites.', 'Visitors rarely became leads despite consistent traffic.', 'Paid campaigns were not returning their cost.'],
    changes: [
      { h: 'Behavior segmentation', p: 'Visitor behavior analysis to sharpen the audience personas and the motivations behind each search.',
        more: 'Before changing pages, we studied how visitors behaved on them. Which searches brought which people, what they clicked, and where they left. That turned vague personas into clear groups with clear motivations, so every later test had a reason behind it instead of a guess.' },
      { h: 'Dynamic landing content', p: 'Landing page headlines that change to match the search keyword, so each visitor sees the promise from the ad.',
        more: 'Dynamic landing pages change the headline to match the keyword the visitor searched. A person who searched for a specific kind of Instagram growth sees that exact promise at the top of the page, so they know straight away they are in the right place. This is one of the most direct forms of landing page optimization, and it is why bounce rate fell by 28% and engagement with microsite elements rose from 20% to 62%.' },
      { h: 'Paid campaigns and testing', p: 'Google, Facebook and TikTok campaigns on high-intent keywords, with continuous A/B tests on creative, headlines and calls to action.',
        more: 'With the pages matched, paid campaigns could focus on high-intent keywords and audiences on Google, Facebook and TikTok. Continuous A/B tests on creative, headlines and calls to action kept the winners running and cut the losers. Better relevance lifted click-through rate by 22% and lowered cost per click by 18%, and conversions rose 380% against the pre-test baseline.' },
    ],
    flowTitle: 'From search to lead, matched at every step',
    flow: [
      { tag: 'Study', t: 'Segment visitor behavior', p: 'Sharpen personas and the motivation behind each search.' },
      { tag: 'Match', t: 'Change the headline to the keyword', p: 'Each visitor sees the promise from the ad.' },
      { tag: 'Target', t: 'Buy high-intent traffic', p: 'Google, Facebook and TikTok campaigns on the right keywords.' },
      { tag: 'Test', t: 'A/B test continuously', p: 'Creative, headlines and calls to action.' },
      { tag: 'Scale', t: 'Fund what returns', p: 'Budget follows return on ad spend.' },
    ],
    details: [['Lead conversion versus pre-test baseline', '+380%'], ['Return on ad spend', '3.5x'], ['Qualified leads, first quarter', '450+'], ['Cost per click', '18% lower'], ['Click-through rate', '+22%'], ['Bounce rate', '28% lower'], ['Visitors engaging with microsite elements', '20% to 62%']],
    statsTitle: 'What matched pages and testing produced',
    stats: [
      { value: 3.5, suf: 'x', label: 'return on ad spend' },
      { value: 450, suf: '+', label: 'qualified leads', sub: 'First quarter' },
      { value: 380, pre: '+', suf: '%', label: 'lead conversion versus the pre-test baseline' },
      { value: 18, suf: '%', label: 'lower cost per click' },
    ],
    bars: { title: 'Visitors who engaged with the microsites', sub: 'Share of visitors engaging with microsite elements, before and after dynamic landing content and testing.', unit: '%', rows: [
      { label: 'Visitors engaging with microsite elements', before: 20, after: 62, max: 100 },
    ] },
    why: [
      'The turning point was relevance. When the headline on the page matched the search that brought the visitor, people stayed and engaged. Engagement with microsite elements rose from 20% to 62% and bounce rate fell by 28%.',
      'Relevance also made the ads cheaper. Ad platforms reward ads that people click and pages that satisfy them, so click-through rate rose 22% and cost per click fell 18%.',
      'Testing compounded both. Every A/B test on creative, headlines and calls to action kept the better version, which is how lead conversion rose 380% against the baseline and paid campaigns moved from not returning their cost to a 3.5x return on ad spend.',
    ],
    lessons: [
      { h: 'Match the page to the search', p: 'If your ads send people with different needs to the same general page, you are paying for clicks the page cannot convert. Matching the headline to the keyword is often the quickest fix.' },
      { h: 'Study behavior before you test', p: 'Tests built on real visitor behavior win more often than tests built on opinions. Segment first, then test.' },
      { h: 'Never stop testing the ads', p: 'Creative, headlines and calls to action wear out. Continuous A/B tests keep return on ad spend from sliding back.' },
    ],
    faq: [
      ['What return on ad spend did Austere get?', 'Paid campaigns reached a 3.5x return on ad spend and produced more than 450 qualified leads in the first quarter, with lead conversion up 380% against the pre-test baseline.'],
      ['What are dynamic landing pages?', 'Landing pages whose headline changes to match the keyword a visitor searched. The visitor sees the promise from the ad, which reduces bounce and raises conversion. For Austere, engagement rose from 20% to 62% of visitors.'],
      ['Which ad platforms were used?', 'Google, Facebook and TikTok, all focused on high-intent keywords and audiences, with continuous A/B tests on creative, headlines and calls to action.'],
    ],
  },
};
