import { useState } from 'react';

type Fiche = {
  id: string;
  nom: string;
  estExposant: boolean;
  estSponsor: boolean;
  visuelUrl?: string;
  descriptionCourte?: string;
  descriptionLongue?: string;
  quiIlsSont?: string;
  ceQuIlsFont?: string;
  siteWeb?: string;
  instagram?: string;
  visible: boolean;
  miseEnAvant: boolean;
  archive: boolean;
  displayOrder: number;
};

const emptyFiche: Partial<Fiche> = {
  nom: '', estExposant: false, estSponsor: false,
  visible: false, miseEnAvant: false, archive: false, displayOrder: 0,
};

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #e8e5a8', borderRadius: 10,
  padding: '8px 12px', fontSize: 13, fontFamily: "'Poppins', sans-serif",
  color: '#69322d', outline: 'none', boxSizing: 'border-box',
};

function FicheForm({ form, onChange, onSave, onCancel }: {
  form: Partial<Fiche>;
  onChange: (f: Partial<Fiche>) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const set = (key: keyof Fiche, val: unknown) => onChange({ ...form, [key]: val });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 16, background: '#faf9f6', borderTop: '1px solid #e8e5a8' }}>
      <div style={{ gridColumn: 'span 2' }}>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>NOM *</label>
        <input style={inputStyle} value={form.nom ?? ''} onChange={e => set('nom', e.target.value)} placeholder="Nom de la structure" />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>DESCRIPTION COURTE</label>
        <input style={inputStyle} value={form.descriptionCourte ?? ''} onChange={e => set('descriptionCourte', e.target.value)} placeholder="Tagline / accroche" />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>SITE WEB</label>
        <input style={inputStyle} value={form.siteWeb ?? ''} onChange={e => set('siteWeb', e.target.value)} placeholder="https://..." />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>INSTAGRAM</label>
        <input style={inputStyle} value={form.instagram ?? ''} onChange={e => set('instagram', e.target.value)} placeholder="@compte" />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>IMAGE (URL)</label>
        <input style={inputStyle} value={form.visuelUrl ?? ''} onChange={e => set('visuelUrl', e.target.value)} placeholder="https://..." />
      </div>
      <div style={{ gridColumn: 'span 2' }}>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>DESCRIPTION LONGUE</label>
        <textarea style={{ ...inputStyle, minHeight: 64, resize: 'vertical' }} value={form.descriptionLongue ?? ''} onChange={e => set('descriptionLongue', e.target.value)} />
      </div>
      <div style={{ gridColumn: 'span 2', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {[
          { key: 'estExposant', label: 'Exposant' },
          { key: 'estSponsor', label: 'Sponsor' },
          { key: 'visible', label: 'Visible' },
          { key: 'miseEnAvant', label: 'Mis en avant' },
        ].map(({ key, label }) => (
          <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Poppins', sans-serif", fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={Boolean((form as Record<string, unknown>)[key])} onChange={e => set(key as keyof Fiche, e.target.checked)} />
            {label}
          </label>
        ))}
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

export function ActivitiesTable({ initialData }: { initialData: Fiche[] }) {
  const [items, setItems] = useState<Fiche[]>(initialData);
  const [creating, setCreating] = useState(false);
  const [newForm, setNewForm] = useState<Partial<Fiche>>(emptyFiche);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Fiche>>({});

  const createItem = async () => {
    const res = await fetch('/api/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newForm),
    });
    if (res.ok) {
      const item = await res.json();
      setItems([item, ...items]);
      setCreating(false);
      setNewForm(emptyFiche);
      (window as Window & { showToast?: (msg: string) => void }).showToast?.('Fiche créée');
    }
  };

  const saveEdit = async (id: string) => {
    const res = await fetch(`/api/activity/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      setItems(items.map(i => i.id === id ? { ...i, ...editForm } as Fiche : i));
      setEditing(null);
      (window as Window & { showToast?: (msg: string) => void }).showToast?.('Fiche mise à jour');
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Supprimer cette fiche ?')) return;
    const res = await fetch(`/api/activity/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems(items.filter(i => i.id !== id));
      (window as Window & { showToast?: (msg: string) => void }).showToast?.('Fiche supprimée');
    }
  };

  const toggleField = async (id: string, field: 'visible' | 'miseEnAvant', val: boolean) => {
    const res = await fetch(`/api/activity/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: val }),
    });
    if (res.ok) {
      setItems(items.map(i => i.id === id ? { ...i, [field]: val } : i));
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setCreating(!creating)}
          style={{ background: '#26422b', color: 'white', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          + Nouvelle fiche
        </button>
      </div>

      {creating && (
        <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid #e8e5a8', marginBottom: 16, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', fontFamily: "'Fredoka', sans-serif", fontSize: 16, fontWeight: 700 }}>Nouvelle fiche publique</div>
          <FicheForm form={newForm} onChange={setNewForm} onSave={createItem} onCancel={() => setCreating(false)} />
        </div>
      )}

      {items.length === 0 && !creating && (
        <div style={{ textAlign: 'center', padding: 64, color: '#69322d', opacity: .4, fontFamily: "'Poppins', sans-serif" }}>
          Aucune fiche publique. Créez-en une ci-dessus.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(item => (
          <div key={item.id} style={{ background: 'white', borderRadius: 16, border: '1.5px solid #e8e5a8', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
              {item.visuelUrl && (
                <img src={item.visuelUrl} alt={item.nom} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 15, color: '#69322d' }}>
                  {item.nom}
                </div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, color: '#69322d', opacity: .6, display: 'flex', gap: 8 }}>
                  {item.estExposant && <span>🏪 Exposant</span>}
                  {item.estSponsor && <span>🤝 Sponsor</span>}
                  {item.descriptionCourte && <span>· {item.descriptionCourte}</span>}
                </div>
              </div>
              <button
                onClick={() => toggleField(item.id, 'visible', !item.visible)}
                title={item.visible ? 'Cacher' : 'Afficher'}
                style={{ background: item.visible ? '#26422b22' : '#e8e5a8', color: item.visible ? '#26422b' : '#69322d', border: 'none', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer' }}
              >
                {item.visible ? '👁 Visible' : '🙈 Caché'}
              </button>
              <button
                onClick={() => toggleField(item.id, 'miseEnAvant', !item.miseEnAvant)}
                title={item.miseEnAvant ? 'Retirer mise en avant' : 'Mettre en avant'}
                style={{ background: item.miseEnAvant ? '#de6c4922' : '#e8e5a8', color: item.miseEnAvant ? '#de6c49' : '#69322d', border: 'none', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer' }}
              >
                {item.miseEnAvant ? '⭐ Avant' : '☆ Normal'}
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
              <FicheForm form={editForm} onChange={setEditForm} onSave={() => saveEdit(item.id)} onCancel={() => setEditing(null)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
