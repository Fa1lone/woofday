import { useState } from 'react';

type Sponsor = {
  id: string;
  entreprise: string;
  contact: string;
  email: string;
  telephone?: string;
  pack?: string;
  objectif?: string;
  imageUrl?: string;
  lienWeb?: string;
  instagram?: string;
  status: 'pending' | 'confirmed' | 'rejected';
  createdAt: string;
};

const PACK_LABELS: Record<string, string> = {
  platine: '🥇 Platine', or: '🟡 Or', argent: '⚪ Argent', bronze: '🟤 Bronze', custom: '✨ Sur mesure',
};

const STATUS_LABELS = { pending: '⏳ En attente', confirmed: '✅ Confirmé', rejected: '❌ Refusé' };
const STATUS_COLORS = { pending: '#f3f1c7', confirmed: '#d4edda', rejected: '#fde8e8' };

export function SponsorsTable({ initialData }: { initialData: Sponsor[] }) {
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Sponsor>>({});
  const [isAdding, setIsAdding] = useState(false);

  async function saveSponsor(sponsor: Partial<Sponsor>) {
    const isNew = !sponsor.id;
    const method = isNew ? 'POST' : 'PATCH';
    const url = isNew ? '/api/sponsor/create' : '/api/sponsor/' + sponsor.id;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sponsor)
    });
    const result = await res.json();

    if (isNew) {
      setData(prev => [result, ...prev]);
    } else {
      setData(prev => prev.map(s => s.id === sponsor.id ? { ...s, ...sponsor } : s));
    }
  }

  async function updateSponsor(id: string, updates: Partial<Sponsor>) {
    await saveSponsor({ ...updates, id });
  }

  async function deleteSponsor(id: string) {
    if (!confirm('Supprimer ce sponsor ?')) return;
    setData(prev => prev.filter(s => s.id !== id));
    await fetch('/api/sponsor/' + id, { method: 'DELETE' });
  }

  const handleEdit = (s: Sponsor) => {
    setEditingId(s.id);
    setEditForm(s);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({ entreprise: '', contact: '', email: '', pack: 'bronze', status: 'confirmed' });
  };

  const handleSave = async () => {
    await saveSponsor(editForm);
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <button onClick={handleAdd} style={{ padding: '10px 20px', borderRadius: 12, border: 'none', background: '#de6c49', color: 'white', fontWeight: 700, cursor: 'pointer', fontFamily: "'Fredoka', sans-serif" }}>
          + Ajouter un sponsor
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {isAdding && (
          <div style={{ background: '#f3f1c7', borderRadius: 16, padding: '20px', border: '2px dashed #de6c49' }}>
            <SponsorForm form={editForm} onChange={setEditForm} onSave={handleSave} onCancel={() => setIsAdding(false)} />
          </div>
        )}

        {data.length === 0 && !isAdding ? (
          <div style={{ textAlign: 'center', padding: '64px', color: '#69322d', opacity: .4 }}>
            Aucun sponsor pour l'instant.
          </div>
        ) : (
          data.slice().reverse().map(s => (
            <div key={s.id} style={{ background: 'white', borderRadius: 16, padding: '16px 20px', border: '1.5px solid #e8e5a8' }}>
              {editingId === s.id ? (
                <SponsorForm form={editForm} onChange={setEditForm} onSave={handleSave} onCancel={() => setEditingId(null)} />
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
                  {s.imageUrl && (
                    <img src={s.imageUrl} style={{ width: 60, height: 60, borderRadius: 12, objectFit: 'contain', border: '1px solid #e8e5a8', padding: 4 }} alt="" />
                  )}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 16, color: '#69322d' }}>{s.entreprise}</div>
                    <div style={{ fontSize: 13, color: '#69322d', opacity: .7 }}>{s.contact}</div>
                    {s.pack && <div style={{ fontSize: 12, color: '#26422b', fontWeight: 600, marginTop: 4 }}>{PACK_LABELS[s.pack] ?? s.pack}</div>}
                    <div style={{ fontSize: 12, color: '#de6c49', marginTop: 4 }}>
                        {s.zone && <span>📍 {s.zone}</span>}
                        {s.stand && <span> · 🏠 {s.stand}</span>}
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                      {s.lienWeb && <a href={s.lienWeb} target="_blank" style={{ fontSize: 11, color: '#de6c49', textDecoration: 'none', fontWeight: 600 }}>🌐 Site Web</a>}
                      {s.instagram && <a href={`https://instagram.com/${s.instagram.replace('@','')}`} target="_blank" style={{ fontSize: 11, color: '#de6c49', textDecoration: 'none', fontWeight: 600 }}>📸 Instagram</a>}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 600, background: STATUS_COLORS[s.status], color: '#69322d', display: 'inline-block', marginBottom: 8 }}>
                      {STATUS_LABELS[s.status]}
                    </span>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <button onClick={() => handleEdit(s)} style={{ padding: '4px 10px', borderRadius: 8, border: '1.5px solid #e8e5a8', background: 'white', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                        ✏️ Éditer
                      </button>
                      {s.status !== 'confirmed' && (
                        <button onClick={() => updateSponsor(s.id, { status: 'confirmed' })} style={{ padding: '4px 10px', borderRadius: 8, border: 'none', background: '#26422b', color: 'white', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                          ✅ Confirmer
                        </button>
                      )}
                      <button onClick={() => deleteSponsor(s.id)} style={{ padding: '4px 10px', borderRadius: 8, border: 'none', background: '#fde8e8', color: '#c0392b', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                        🗑️
                      </button>
                    </div>
                    <div style={{ fontSize: 11, color: '#69322d', opacity: .4, marginTop: 4 }}>{new Date(s.createdAt).toLocaleDateString('fr-FR')}</div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function SponsorForm({ form, onChange, onSave, onCancel }: any) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div style={{ gridColumn: 'span 2' }}>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>ENTREPRISE</label>
        <input style={inputStyle} value={form.entreprise} onChange={ev => onChange({...form, entreprise: ev.target.value})} />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>SITE WEB</label>
        <input style={inputStyle} value={form.lienWeb || ''} onChange={ev => onChange({...form, lienWeb: ev.target.value})} placeholder="https://..." />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>INSTAGRAM</label>
        <input style={inputStyle} value={form.instagram || ''} onChange={ev => onChange({...form, instagram: ev.target.value})} placeholder="@compte" />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>ZONE</label>
        <input style={inputStyle} value={form.zone || ''} onChange={ev => onChange({...form, zone: ev.target.value})} placeholder="ex: Scène Centrale" />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>STAND</label>
        <input style={inputStyle} value={form.stand || ''} onChange={ev => onChange({...form, stand: ev.target.value})} placeholder="ex: Stand A1" />
      </div>
      <div style={{ gridColumn: 'span 2' }}>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>IMAGE URL (LOGO)</label>
        <input style={inputStyle} value={form.imageUrl || ''} onChange={ev => onChange({...form, imageUrl: ev.target.value})} placeholder="https://..." />
      </div>
      <div style={{ gridColumn: 'span 2', display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
        <button onClick={onCancel} style={{ padding: '8px 16px', borderRadius: 8, border: '1.5px solid #e8e5a8', background: 'white', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Annuler</button>
        <button onClick={onSave} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#26422b', color: 'white', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Enregistrer</button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  border: '1.5px solid #e8e5a8',
  borderRadius: 10,
  padding: '8px 12px',
  fontSize: 14,
  fontFamily: "'Poppins', sans-serif",
  color: '#69322d',
  outline: 'none',
  boxSizing: 'border-box' as const,
};
