import { useState } from 'react';

type Atelier = {
  id: string;
  titre: string;
  description?: string;
  type: 'atelier' | 'conference' | 'afterwork' | 'promenade' | 'autre';
  date?: string;
  heure?: string;
  lieu?: string;
  duree?: string;
  animateur?: string;
  capacite?: number;
  prix?: string;
  visible: boolean;
  inscriptionOuverte: boolean;
  inscriptionUrl?: string;
  notes?: string;
  displayOrder: number;
};

const TYPE_LABELS: Record<string, { label: string; emoji: string; color: string }> = {
  atelier:    { label: 'Atelier',      emoji: '🔧', color: '#26422b' },
  conference: { label: 'Conférence',   emoji: '🎙️', color: '#69322d' },
  afterwork:  { label: 'Afterwork',    emoji: '🍻', color: '#91acda' },
  promenade:  { label: 'Promenade',    emoji: '🐾', color: '#26422b' },
  autre:      { label: 'Autre',        emoji: '📌', color: '#de6c49' },
};

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #e8e5a8', borderRadius: 10,
  padding: '8px 12px', fontSize: 13, fontFamily: "'Poppins', sans-serif",
  color: '#69322d', outline: 'none', boxSizing: 'border-box',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4, opacity: .7,
};

const emptyAtelier: Partial<Atelier> = {
  titre: '', type: 'atelier', visible: false, inscriptionOuverte: false, displayOrder: 0,
};

function AtelierForm({ form, onChange, onSave, onCancel }: {
  form: Partial<Atelier>;
  onChange: (f: Partial<Atelier>) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const set = (key: keyof Atelier, val: unknown) => onChange({ ...form, [key]: val });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 20, background: '#faf9f6', borderTop: '1px solid #e8e5a8' }}>
      {/* Titre */}
      <div style={{ gridColumn: 'span 2' }}>
        <label style={labelStyle}>TITRE *</label>
        <input style={inputStyle} value={form.titre ?? ''} onChange={e => set('titre', e.target.value)} placeholder="Ex : Atelier premiers secours chien" />
      </div>

      {/* Type */}
      <div>
        <label style={labelStyle}>TYPE</label>
        <select style={inputStyle} value={form.type ?? 'atelier'} onChange={e => set('type', e.target.value)}>
          {Object.entries(TYPE_LABELS).map(([val, { label, emoji }]) => (
            <option key={val} value={val}>{emoji} {label}</option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label style={labelStyle}>DATE</label>
        <input style={inputStyle} type="date" value={form.date ?? ''} onChange={e => set('date', e.target.value)} />
      </div>

      {/* Heure */}
      <div>
        <label style={labelStyle}>HEURE</label>
        <input style={inputStyle} value={form.heure ?? ''} onChange={e => set('heure', e.target.value)} placeholder="Ex : 14h00" />
      </div>

      {/* Durée */}
      <div>
        <label style={labelStyle}>DURÉE</label>
        <input style={inputStyle} value={form.duree ?? ''} onChange={e => set('duree', e.target.value)} placeholder="Ex : 2h30" />
      </div>

      {/* Lieu */}
      <div style={{ gridColumn: 'span 2' }}>
        <label style={labelStyle}>LIEU</label>
        <input style={inputStyle} value={form.lieu ?? ''} onChange={e => set('lieu', e.target.value)} placeholder="Ex : Salle des fêtes, Gensac-la-Pallue (16)" />
      </div>

      {/* Animateur */}
      <div>
        <label style={labelStyle}>ANIMATEUR / INTERVENANT</label>
        <input style={inputStyle} value={form.animateur ?? ''} onChange={e => set('animateur', e.target.value)} placeholder="Ex : Méline — Cynofeel" />
      </div>

      {/* Prix */}
      <div>
        <label style={labelStyle}>PRIX</label>
        <input style={inputStyle} value={form.prix ?? ''} onChange={e => set('prix', e.target.value)} placeholder="Ex : 15 € ou Gratuit" />
      </div>

      {/* Capacité */}
      <div>
        <label style={labelStyle}>CAPACITÉ (nb de places)</label>
        <input style={inputStyle} type="number" min={0} value={form.capacite ?? ''} onChange={e => set('capacite', e.target.value ? Number(e.target.value) : undefined)} placeholder="Ex : 15" />
      </div>

      {/* URL inscription */}
      <div>
        <label style={labelStyle}>LIEN D'INSCRIPTION</label>
        <input style={inputStyle} value={form.inscriptionUrl ?? ''} onChange={e => set('inscriptionUrl', e.target.value)} placeholder="https://..." />
      </div>

      {/* Description */}
      <div style={{ gridColumn: 'span 2' }}>
        <label style={labelStyle}>DESCRIPTION</label>
        <textarea style={{ ...inputStyle, minHeight: 72, resize: 'vertical' }} value={form.description ?? ''} onChange={e => set('description', e.target.value)} placeholder="Description publique (visible sur le site quand l'événement sera publié)" />
      </div>

      {/* Notes internes */}
      <div style={{ gridColumn: 'span 2' }}>
        <label style={labelStyle}>NOTES INTERNES (non visibles)</label>
        <textarea style={{ ...inputStyle, minHeight: 48, resize: 'vertical', background: '#fefdf0' }} value={form.notes ?? ''} onChange={e => set('notes', e.target.value)} placeholder="Notes d'organisation, contacts, idées..." />
      </div>

      {/* Toggles */}
      <div style={{ gridColumn: 'span 2', display: 'flex', gap: 20, flexWrap: 'wrap', paddingTop: 4 }}>
        {[
          { key: 'visible',           label: '👁 Visible sur le site' },
          { key: 'inscriptionOuverte', label: '✅ Inscriptions ouvertes' },
        ].map(({ key, label }) => (
          <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Poppins', sans-serif", fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={Boolean((form as Record<string, unknown>)[key])} onChange={e => set(key as keyof Atelier, e.target.checked)} />
            {label}
          </label>
        ))}
      </div>

      {/* Boutons */}
      <div style={{ gridColumn: 'span 2', display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 8 }}>
        <button onClick={onCancel} style={{ background: 'white', border: '1.5px solid #e8e5a8', borderRadius: 8, padding: '9px 18px', fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600, color: '#69322d', cursor: 'pointer' }}>
          Annuler
        </button>
        <button onClick={onSave} style={{ background: '#26422b', color: 'white', border: 'none', borderRadius: 8, padding: '9px 22px', fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          Enregistrer
        </button>
      </div>
    </div>
  );
}

function toast(msg: string) {
  (window as Window & { showToast?: (msg: string) => void }).showToast?.(msg);
}

export function AteliersTable({ initialData }: { initialData: Atelier[] }) {
  const [items, setItems] = useState<Atelier[]>(initialData);
  const [creating, setCreating] = useState(false);
  const [newForm, setNewForm] = useState<Partial<Atelier>>(emptyAtelier);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Atelier>>({});

  const createItem = async () => {
    const res = await fetch('/api/atelier', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newForm),
    });
    if (res.ok) {
      const item = await res.json();
      setItems([item, ...items]);
      setCreating(false);
      setNewForm(emptyAtelier);
      toast('Événement créé ✓');
    }
  };

  const saveEdit = async (id: string) => {
    const res = await fetch(`/api/atelier/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      setItems(items.map(i => i.id === id ? { ...i, ...editForm } as Atelier : i));
      setEditing(null);
      toast('Événement mis à jour ✓');
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Supprimer cet événement ?')) return;
    const res = await fetch(`/api/atelier/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems(items.filter(i => i.id !== id));
      toast('Événement supprimé');
    }
  };

  const toggleField = async (id: string, field: 'visible' | 'inscriptionOuverte', val: boolean) => {
    const res = await fetch(`/api/atelier/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: val }),
    });
    if (res.ok) setItems(items.map(i => i.id === id ? { ...i, [field]: val } : i));
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setCreating(!creating)}
          style={{ background: '#26422b', color: 'white', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          + Nouvel événement
        </button>
      </div>

      {creating && (
        <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid #e8e5a8', marginBottom: 16, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', fontFamily: "'Fredoka', sans-serif", fontSize: 16, fontWeight: 700 }}>Nouvel atelier / événement</div>
          <AtelierForm form={newForm} onChange={setNewForm} onSave={createItem} onCancel={() => setCreating(false)} />
        </div>
      )}

      {items.length === 0 && !creating && (
        <div style={{ textAlign: 'center', padding: 64, color: '#69322d', opacity: .4, fontFamily: "'Poppins', sans-serif" }}>
          Aucun événement pour l'instant. Cliquez sur "+ Nouvel événement" pour commencer.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(item => {
          const t = TYPE_LABELS[item.type] ?? TYPE_LABELS.autre;
          return (
            <div key={item.id} style={{ background: 'white', borderRadius: 16, border: '1.5px solid #e8e5a8', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', flexWrap: 'wrap' }}>
                {/* Type badge */}
                <div style={{ width: 40, height: 40, borderRadius: 10, background: t.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                  {t.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 15, color: '#69322d' }}>
                    {item.titre}
                  </div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, color: '#69322d', opacity: .6, display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 2 }}>
                    <span style={{ fontWeight: 700, color: t.color }}>{t.label}</span>
                    {item.date && <span>📅 {new Date(item.date + 'T00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
                    {item.heure && <span>🕐 {item.heure}</span>}
                    {item.lieu && <span>📍 {item.lieu}</span>}
                    {item.animateur && <span>👤 {item.animateur}</span>}
                    {item.capacite && <span>👥 {item.capacite} places</span>}
                    {item.prix && <span>💰 {item.prix}</span>}
                  </div>
                  {item.notes && (
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, color: '#de6c49', marginTop: 3, fontStyle: 'italic' }}>
                      📝 {item.notes}
                    </div>
                  )}
                </div>
                {/* Toggles */}
                <button
                  onClick={() => toggleField(item.id, 'visible', !item.visible)}
                  style={{ background: item.visible ? '#26422b22' : '#e8e5a8', color: item.visible ? '#26422b' : '#69322d', border: 'none', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  {item.visible ? '👁 Visible' : '🙈 Caché'}
                </button>
                <button
                  onClick={() => toggleField(item.id, 'inscriptionOuverte', !item.inscriptionOuverte)}
                  style={{ background: item.inscriptionOuverte ? '#de6c4922' : '#e8e5a8', color: item.inscriptionOuverte ? '#de6c49' : '#69322d', border: 'none', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  {item.inscriptionOuverte ? '✅ Inscriptions' : '🔒 Fermé'}
                </button>
                <button
                  onClick={() => { setEditing(editing === item.id ? null : item.id); setEditForm(item); }}
                  style={{ background: '#91acda22', color: '#5a80c0', border: 'none', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer' }}
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  style={{ background: '#cc444422', color: '#cc4444', border: 'none', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer' }}
                >
                  🗑
                </button>
              </div>
              {editing === item.id && (
                <AtelierForm form={editForm} onChange={setEditForm} onSave={() => saveEdit(item.id)} onCancel={() => setEditing(null)} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
