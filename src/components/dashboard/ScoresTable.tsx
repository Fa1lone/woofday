import { useState } from 'react';

type ZoneStand = {
  id: string;
  nom: string;
  type: 'zone' | 'stand';
  description?: string;
  exemple?: string;
  emoji?: string;
  visible: boolean;
  statut: 'libre' | 'reserve';
  ficheId?: string;
  fiche?: { nom: string } | null;
  displayOrder: number;
};

const emptyZone: Partial<ZoneStand> = {
  nom: '', type: 'stand', visible: true, statut: 'libre', displayOrder: 0,
};

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #e8e5a8', borderRadius: 10,
  padding: '8px 12px', fontSize: 13, fontFamily: "'Poppins', sans-serif",
  color: '#69322d', outline: 'none', boxSizing: 'border-box',
};

function ZoneForm({ form, onChange, onSave, onCancel }: {
  form: Partial<ZoneStand>;
  onChange: (f: Partial<ZoneStand>) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const set = (key: keyof ZoneStand, val: unknown) => onChange({ ...form, [key]: val });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 16, background: '#faf9f6', borderTop: '1px solid #e8e5a8' }}>
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>NOM *</label>
        <input style={inputStyle} value={form.nom ?? ''} onChange={e => set('nom', e.target.value)} placeholder="Zone Alimentation..." />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>TYPE</label>
        <select style={inputStyle} value={form.type ?? 'stand'} onChange={e => set('type', e.target.value)}>
          <option value="zone">Zone</option>
          <option value="stand">Stand</option>
        </select>
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>EMOJI</label>
        <input style={inputStyle} value={form.emoji ?? ''} onChange={e => set('emoji', e.target.value)} placeholder="🐾" />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>STATUT</label>
        <select style={inputStyle} value={form.statut ?? 'libre'} onChange={e => set('statut', e.target.value)}>
          <option value="libre">🟢 Libre</option>
          <option value="reserve">🔴 Réservé</option>
        </select>
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>DESCRIPTION</label>
        <input style={inputStyle} value={form.description ?? ''} onChange={e => set('description', e.target.value)} placeholder="Description courte" />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>EXEMPLE</label>
        <input style={inputStyle} value={form.exemple ?? ''} onChange={e => set('exemple', e.target.value)} placeholder="ex: Croquettes, Friandises..." />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>ID FICHE SPONSOR (FK)</label>
        <input style={inputStyle} value={form.ficheId ?? ''} onChange={e => set('ficheId', e.target.value || undefined)} placeholder="UUID de la fiche..." />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>ORDRE</label>
        <input type="number" style={inputStyle} value={form.displayOrder ?? 0} onChange={e => set('displayOrder', Number(e.target.value))} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="checkbox" id="zs-visible" checked={form.visible ?? true} onChange={e => set('visible', e.target.checked)} />
        <label htmlFor="zs-visible" style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, cursor: 'pointer' }}>Visible sur le site</label>
      </div>
      <div style={{ gridColumn: 'span 2', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <button onClick={onCancel} style={{ background: 'white', border: '1.5px solid #e8e5a8', borderRadius: 8, padding: '8px 16px', fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600, color: '#69322d', cursor: 'pointer' }}>
          Annuler
        </button>
        <button onClick={onSave} style={{ background: '#26422b', color: 'white', border: 'none', borderRadius: 8, padding: '8px 20px', fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          Enregistrer
        </button>
      </div>
    </div>
  );
}

export function ScoresTable({ initialData }: { initialData: ZoneStand[] }) {
  const [items, setItems] = useState<ZoneStand[]>(initialData);
  const [creating, setCreating] = useState(false);
  const [newForm, setNewForm] = useState<Partial<ZoneStand>>(emptyZone);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ZoneStand>>({});

  const createItem = async () => {
    const res = await fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newForm),
    });
    if (res.ok) {
      const item = await res.json();
      setItems([...items, item]);
      setCreating(false);
      setNewForm(emptyZone);
      (window as Window & { showToast?: (msg: string) => void }).showToast?.('Zone/stand créé');
    }
  };

  const saveEdit = async (id: string) => {
    const res = await fetch(`/api/score/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      setItems(items.map(i => i.id === id ? { ...i, ...editForm } as ZoneStand : i));
      setEditing(null);
      (window as Window & { showToast?: (msg: string) => void }).showToast?.('Zone/stand mis à jour');
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Supprimer cette zone/stand ?')) return;
    const res = await fetch(`/api/score/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems(items.filter(i => i.id !== id));
      (window as Window & { showToast?: (msg: string) => void }).showToast?.('Supprimé');
    }
  };

  const toggleStatut = async (id: string, current: 'libre' | 'reserve') => {
    const next = current === 'libre' ? 'reserve' : 'libre';
    const res = await fetch(`/api/score/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut: next }),
    });
    if (res.ok) {
      setItems(items.map(i => i.id === id ? { ...i, statut: next } : i));
    }
  };

  const zones = items.filter(i => i.type === 'zone');
  const stands = items.filter(i => i.type === 'stand');

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setCreating(!creating)}
          style={{ background: '#26422b', color: 'white', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          + Ajouter une zone/stand
        </button>
      </div>

      {creating && (
        <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid #e8e5a8', marginBottom: 16, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', fontFamily: "'Fredoka', sans-serif", fontSize: 16, fontWeight: 700 }}>Nouvelle zone / stand</div>
          <ZoneForm form={newForm} onChange={setNewForm} onSave={createItem} onCancel={() => setCreating(false)} />
        </div>
      )}

      {[{ label: 'Zones', list: zones }, { label: 'Stands', list: stands }].map(({ label, list }) => list.length > 0 && (
        <div key={label} style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 18, color: '#69322d', margin: '0 0 12px' }}>{label}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {list.map(item => (
              <div key={item.id} style={{ background: 'white', borderRadius: 14, border: '1.5px solid #e8e5a8', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
                  {item.emoji && <span style={{ fontSize: 22 }}>{item.emoji}</span>}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 15, color: '#69322d' }}>
                      {item.nom}
                    </div>
                    {(item.description || item.fiche) && (
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, color: '#69322d', opacity: .6 }}>
                        {item.description}{item.fiche ? ` · Sponsor : ${item.fiche.nom}` : ''}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => toggleStatut(item.id, item.statut)}
                    style={{
                      background: item.statut === 'libre' ? '#26422b22' : '#de6c4922',
                      color: item.statut === 'libre' ? '#26422b' : '#de6c49',
                      border: 'none', borderRadius: 8, padding: '4px 12px',
                      fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    }}
                  >
                    {item.statut === 'libre' ? '🟢 Libre' : '🔴 Réservé'}
                  </button>
                  <button
                    onClick={() => { setEditing(editing === item.id ? null : item.id); setEditForm(item); }}
                    style={{ background: '#91acda22', color: '#91acda', border: 'none', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer' }}
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
                  <ZoneForm form={editForm} onChange={setEditForm} onSave={() => saveEdit(item.id)} onCancel={() => setEditing(null)} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {items.length === 0 && !creating && (
        <div style={{ textAlign: 'center', padding: 64, color: '#69322d', opacity: .4, fontFamily: "'Poppins', sans-serif" }}>
          Aucune zone/stand. Créez-en un ci-dessus.
        </div>
      )}
    </div>
  );
}
