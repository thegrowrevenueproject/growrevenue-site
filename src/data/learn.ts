// Education hub ("Learn"). Each entry is a page at /learn/<slug>/.
export type Lesson = { slug: string; title: string; blurb: string; tag: string; minutes: number };
export const LEARN: Lesson[] = [
  { slug: 'what-does-a-marketing-company-do', tag: 'Basics', minutes: 9, title: 'What does a marketing company do?', blurb: 'What a marketing company actually does, how it differs from an in-house team, and how to judge one by revenue instead of activity.' },
  { slug: 'does-cold-email-still-work', tag: 'Outreach', minutes: 10, title: 'Does cold emailing still work in 2026?', blurb: 'How cold email changed after the Gmail and Yahoo sender rules, what still gets replies, and what now gets you blocked.' },
  { slug: 'what-are-ai-agents', tag: 'AI', minutes: 10, title: 'What are AI agents, and what can they do in marketing?', blurb: 'A plain explanation of AI agents, how they differ from chatbots and automations, and where they earn their keep in sales and marketing.' },
  { slug: 'what-is-marketing-automation', tag: 'Automation', minutes: 9, title: 'What is marketing automation?', blurb: 'Triggers, workflows and the five automations every business should run first, with tools compared and the mistakes that cost revenue.' },
];
