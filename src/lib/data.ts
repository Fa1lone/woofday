import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'data');

function read<T>(file: string): T {
  try {
    return JSON.parse(readFileSync(join(DATA_DIR, file), 'utf-8')) as T;
  } catch {
    if (file === 'interest.json') return { count: 412 } as T;
    if (file === 'activities.json') return DEFAULT_ACTIVITIES as T;
    if (file === 'exposants.json') return [] as T;
    return [] as T;
  }
}

const DEFAULT_ACTIVITIES = [
  { id: '1', emoji: '🌊', nom: 'Zone Aquatique', description: 'Baignade & jeux d\'eau', order: 1 },
  { id: '2', emoji: '🏆', nom: 'Agility & Sport', description: 'Parcours, démonstrations', order: 2 },
  { id: '3', emoji: '🌿', nom: 'Détente & Zen', description: 'Massages canins, relaxation', order: 3 },
  { id: '4', emoji: '👶', nom: 'Famille & Kids', description: 'Ateliers, animations enfants', order: 4 },
  { id: '5', emoji: '🎤', nom: 'Scène Centrale', description: 'Spectacles, concours, remises', order: 5 },
  { id: '6', emoji: '🌱', nom: 'Village Bien-Être', description: 'Santé naturelle & alimentation', order: 6 },
];

function write(file: string, data: unknown) {
  writeFileSync(join(DATA_DIR, file), JSON.stringify(data, null, 2));
}

// ── Interest counter ──────────────────────────────────────────────────────────

export function getInterestCount(): number {
  return read<{ count: number }>('interest.json').count;
}

export function incrementInterest(): number {
  const current = getInterestCount();
  const next = current + 1;
  write('interest.json', { count: next });
  return next;
}

// ── Exposants ─────────────────────────────────────────────────────────────────

export type Exposant = {
  id: string;
  structure: string;
  responsable: string;
  email: string;
  telephone: string;
  ville: string;
  pole: string;
  description: string;
  tailleStand?: string;
  lienWeb?: string;
  instagram?: string;
  imageUrl?: string;
  barnum?: string;
  electricite?: string;
  status: 'pending' | 'confirmed' | 'rejected';
  createdAt: string;
};

export function getExposants(): Exposant[] {
  return read<Exposant[]>('exposants.json');
}

export function addExposant(data: Omit<Exposant, 'id' | 'status' | 'createdAt'>): Exposant {
  const list = getExposants();
  const item: Exposant = { ...data, id: crypto.randomUUID(), status: 'pending', createdAt: new Date().toISOString() };
  write('exposants.json', [...list, item]);
  return item;
}

export function updateExposant(id: string, data: Partial<Exposant>) {
  const list = getExposants().map(e => e.id === id ? { ...e, ...data } : e);
  write('exposants.json', list);
}

export function deleteExposant(id: string) {
  const list = getExposants().filter(e => e.id !== id);
  write('exposants.json', list);
}

export function updateExposantStatus(id: string, status: Exposant['status']) {
  updateExposant(id, { status });
}

// ── Sponsors ──────────────────────────────────────────────────────────────────

export type Sponsor = {
  id: string;
  entreprise: string;
  contact: string;
  email: string;
  telephone?: string;
  pack?: string;
  objectif?: string;
  zone?: string;
  stand?: string;
  lot?: string;
  panelCount?: number;
  imageUrl?: string;
  lienWeb?: string;
  instagram?: string;
  status: 'pending' | 'confirmed' | 'rejected';
  createdAt: string;
};

export function getSponsors(): Sponsor[] {
  return read<Sponsor[]>('sponsors.json');
}

export function addSponsor(data: Omit<Sponsor, 'id' | 'status' | 'createdAt'>): Sponsor {
  const list = getSponsors();
  const item: Sponsor = { ...data, id: crypto.randomUUID(), status: 'pending', createdAt: new Date().toISOString() };
  write('sponsors.json', [...list, item]);
  return item;
}

export function updateSponsor(id: string, data: Partial<Sponsor>) {
  const list = getSponsors().map(s => s.id === id ? { ...s, ...data } : s);
  write('sponsors.json', list);
}

export function deleteSponsor(id: string) {
  const list = getSponsors().filter(s => s.id !== id);
  write('sponsors.json', list);
}

// ── Activities ────────────────────────────────────────────────────────────────

export type Activity = {
  id: string;
  emoji: string;
  nom: string;
  description: string;
  pole?: string;
  horaires?: string;
  imageUrl?: string;
  order: number;
};

export function getActivities(): Activity[] {
  return read<Activity[]>('activities.json');
}

export function addActivity(data: Omit<Activity, 'id'>): Activity {
  const list = getActivities();
  const item: Activity = { ...data, id: crypto.randomUUID() };
  write('activities.json', [...list, item]);
  return item;
}

export function updateActivity(id: string, data: Partial<Activity>) {
  const list = getActivities().map(a => a.id === id ? { ...a, ...data } : a);
  write('activities.json', list);
}

export function deleteActivity(id: string) {
  const list = getActivities().filter(a => a.id !== id);
  write('activities.json', list);
}

// ── Contacts ──────────────────────────────────────────────────────────────────

export type Contact = {
  id: string;
  reason: string;
  nom: string;
  email: string;
  message?: string;
  createdAt: string;
};

export function getContacts(): Contact[] {
  return read<Contact[]>('contacts.json');
}

export function addContact(data: Omit<Contact, 'id' | 'createdAt'>): Contact {
  const list = getContacts();
  const item: Contact = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  write('contacts.json', [...list, item]);
  return item;
}
