import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'data');

function read<T>(file: string): T {
  try {
    return JSON.parse(readFileSync(join(DATA_DIR, file), 'utf-8')) as T;
  } catch {
    return (file.endsWith('json') && file !== 'interest.json' ? [] : { count: 412 }) as T;
  }
}

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

export function updateExposantStatus(id: string, status: Exposant['status']) {
  const list = getExposants().map(e => e.id === id ? { ...e, status } : e);
  write('exposants.json', list);
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
