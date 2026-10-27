// Cut-out figures (background removed). ratio = width / height of the trimmed image.
// chips use only numbers from published case studies.
export type CutDef = { name: string; ratio: number; alt: string; chips: { v: string; l: string; p?: 'tl' | 'tr' | 'bl' | 'br' | 'ml' | 'mr' }[] };
export const CUTS: Record<string, CutDef> = {
  'paid-advertising': { name: 'ads', ratio: 0.642, alt: 'Woman shouting into a green megaphone, our ppc management services cut through', chips: [{ v: '3.5x', l: 'return on ad spend, Austere', p: 'tr' }, { v: '450+', l: 'qualified leads in a quarter', p: 'bl' }] },
  'lead-generation': { name: 'leads', ratio: 0.876, alt: 'Man pulling a giant green magnet, the pull of a lead generation company', chips: [{ v: '150+', l: 'qualified leads a month', p: 'tl' }, { v: '40%', l: 'lead to meeting, Scalability', p: 'br' }] },
};
export const cutFor = (slug: string) => CUTS[slug];
