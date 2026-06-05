import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), "data");
function read(file) {
  try {
    return JSON.parse(readFileSync(join(DATA_DIR, file), "utf-8"));
  } catch {
    if (file === "interest.json") return { count: 412 };
    if (file === "activities.json") return DEFAULT_ACTIVITIES;
    if (file === "exposants.json") return [];
    return [];
  }
}
const DEFAULT_ACTIVITIES = [
  { id: "1", emoji: "🌊", nom: "Zone Aquatique", description: "Baignade & jeux d'eau", order: 1 },
  { id: "2", emoji: "🏆", nom: "Agility & Sport", description: "Parcours, démonstrations", order: 2 },
  { id: "3", emoji: "🌿", nom: "Détente & Zen", description: "Massages canins, relaxation", order: 3 },
  { id: "4", emoji: "👶", nom: "Famille & Kids", description: "Ateliers, animations enfants", order: 4 },
  { id: "5", emoji: "🎤", nom: "Scène Centrale", description: "Spectacles, concours, remises", order: 5 },
  { id: "6", emoji: "🌱", nom: "Village Bien-Être", description: "Santé naturelle & alimentation", order: 6 }
];
function write(file, data) {
  writeFileSync(join(DATA_DIR, file), JSON.stringify(data, null, 2));
}
function getInterestCount() {
  return read("interest.json").count;
}
function incrementInterest() {
  const current = getInterestCount();
  const next = current + 1;
  write("interest.json", { count: next });
  return next;
}
function getExposants() {
  return read("exposants.json");
}
function addExposant(data) {
  const list = getExposants();
  const item = { ...data, id: crypto.randomUUID(), status: "pending", createdAt: (/* @__PURE__ */ new Date()).toISOString() };
  write("exposants.json", [...list, item]);
  return item;
}
function updateExposant(id, data) {
  const list = getExposants().map((e) => e.id === id ? { ...e, ...data } : e);
  write("exposants.json", list);
}
function deleteExposant(id) {
  const list = getExposants().filter((e) => e.id !== id);
  write("exposants.json", list);
}
function updateExposantStatus(id, status) {
  updateExposant(id, { status });
}
function getSponsors() {
  return read("sponsors.json");
}
function addSponsor(data) {
  const list = getSponsors();
  const item = { ...data, id: crypto.randomUUID(), status: "pending", createdAt: (/* @__PURE__ */ new Date()).toISOString() };
  write("sponsors.json", [...list, item]);
  return item;
}
function updateSponsor(id, data) {
  const list = getSponsors().map((s) => s.id === id ? { ...s, ...data } : s);
  write("sponsors.json", list);
}
function deleteSponsor(id) {
  const list = getSponsors().filter((s) => s.id !== id);
  write("sponsors.json", list);
}
function getActivities() {
  return read("activities.json");
}
function addActivity(data) {
  const list = getActivities();
  const item = { ...data, id: crypto.randomUUID() };
  write("activities.json", [...list, item]);
  return item;
}
function updateActivity(id, data) {
  const list = getActivities().map((a) => a.id === id ? { ...a, ...data } : a);
  write("activities.json", list);
}
function deleteActivity(id) {
  const list = getActivities().filter((a) => a.id !== id);
  write("activities.json", list);
}
function getContacts() {
  return read("contacts.json");
}
function addContact(data) {
  const list = getContacts();
  const item = { ...data, id: crypto.randomUUID(), createdAt: (/* @__PURE__ */ new Date()).toISOString() };
  write("contacts.json", [...list, item]);
  return item;
}

export { addActivity, addContact, addExposant, addSponsor, deleteActivity, deleteExposant, deleteSponsor, getActivities, getContacts, getExposants, getInterestCount, getSponsors, incrementInterest, updateActivity, updateExposant, updateExposantStatus, updateSponsor };
