import { useState } from 'react';

type Exposant = {
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
  status: 'pending' | 'confirmed' | 'rejected';
  createdAt: string;
};

const STATUS_LABELS: Record<Exposant['status'], string> = {
  pending:   '⏳ En attente',
  confirmed: '✅ Confirmé',
  rejected:  '❌ Refusé',
};

const STATUS_COLORS: Record<Exposant['status'], string> = {
  pending:   '#f3f1c7',
  confirmed: '#d4edda',
  rejected:  '#fde8e8',
};

export function ExposantsTable({ initialData }: { initialData: Exposant[] }) {
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState<'all' | Exposant['status']>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Exposant>>({});
  const [isAdding, setIsAdding] = useState(false);

  const filtered = filter === 'all' ? data : data.filter(e => e.status === filter);

  async function saveExposant(exposant: Partial<Exposant>) {
    const isNew = !exposant.id;
    const method = isNew ? 'POST' : 'PATCH';
    const url = isNew ? '/api/exposant/create' : '/api/exposant/' + exposant.id;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exposant)
    });
    const result = await res.json();

    if (isNew) {
      setData(prev => [result, ...prev]);
    } else {
      setData(prev => prev.map(e => e.id === exposant.id ? { ...e, ...exposant } : e));
    }
  }

  async function updateExposant(id: string, updates: Partial<Exposant>) {
    await saveExposant({ ...updates, id });
  }

  async function deleteExposant(id: string) {
    if (!confirm('Supprimer cet exposant ?')) return;
    setData(prev => prev.filter(e => e.id !== id));
    await fetch('/api/exposant/' + id, { method: 'DELETE' });
  }

  const handleEdit = (e: Exposant) => {
    setEditingId(e.id);
    setEditForm(e);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({ structure: '', responsable: '', email: '', telephone: '', ville: '', pole: '', description: '', status: 'confirmed' });
  };

  const handleSave = async () => {
    await saveExposant(editForm);
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['all', 'pending', 'confirmed', 'rejected'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 16px', borderRadius: 9999, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600,
                background: filter === f ? '#69322d' : '#f3f1c7',
                color: filter === f ? 'white' : '#69322d',
              }}
            >
              {f === 'all' ? `Tous (${data.length})` : STATUS_LABELS[f] + ` (${data.filter(e => e.status === f).length})`}
            </button>
          ))}
        </div>

        <button onClick={handleAdd} style={{ padding: '10px 20px', borderRadius: 12, border: 'none', background: '#de6c49', color: 'white', fontWeight: 700, cursor: 'pointer', fontFamily: "'Fredoka', sans-serif" }}>
          + Ajouter un exposant
        </button>
      </div>

      {/* Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {isAdding && (
          <div style={{ background: '#f3f1c7', borderRadius: 16, padding: '20px', border: '2px dashed #de6c49' }}>
            <ExposantForm form={editForm} onChange={setEditForm} onSave={handleSave} onCancel={() => setIsAdding(false)} />
          </div>
        )}
        
        {filtered.length === 0 && !isAdding ? (
          <div style={{ textAlign: 'center', padding: '48px', color: '#69322d', opacity: .5 }}>
            Aucun exposant pour l'instant.
          </div>
        ) : (
          filtered.map(e => (
            <div key={e.id} style={{ background: 'white', borderRadius: 16, padding: '16px 20px', border: '1.5px solid #e8e5a8' }}>
              {editingId === e.id ? (
                <ExposantForm form={editForm} onChange={setEditForm} onSave={handleSave} onCancel={() => setEditingId(null)} />
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
                  {e.imageUrl && (
                    <img src={e.imageUrl} style={{ width: 60, height: 60, borderRadius: 12, objectFit: 'cover', border: '1px solid #e8e5a8' }} alt="" />
                  )}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 16, color: '#69322d' }}>{e.structure}</div>
                    <div style={{ fontSize: 13, color: '#69322d', opacity: .7 }}>{e.responsable} · {e.ville}</div>
                    <div style={{ fontSize: 12, color: '#de6c49', marginTop: 2 }}>{e.pole}</div>
                    {e.description && <div style={{ fontSize: 12, color: '#69322d', opacity: .6, marginTop: 6, lineHeight: 1.4 }}>{e.description}</div>}
                    <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                      {e.lienWeb && <a href={e.lienWeb} target="_blank" style={{ fontSize: 11, color: '#de6c49', textDecoration: 'none', fontWeight: 600 }}>🌐 Site Web</a>}
                      {e.instagram && <a href={`https://instagram.com/${e.instagram.replace('@','')}`} target="_blank" style={{ fontSize: 11, color: '#de6c49', textDecoration: 'none', fontWeight: 600 }}>📸 Instagram</a>}
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <div style={{ fontSize: 12, color: '#69322d', opacity: .7 }}>{e.email}</div>
                    <div style={{ fontSize: 12, color: '#69322d', opacity: .7 }}>{e.telephone}</div>
                    {e.tailleStand && <div style={{ fontSize: 11, color: '#69322d', opacity: .5, marginTop: 2 }}>Stand : {e.tailleStand}</div>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 600, background: STATUS_COLORS[e.status], color: '#69322d' }}>
                      {STATUS_LABELS[e.status]}
                    </span>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => handleEdit(e)} style={{ padding: '4px 10px', borderRadius: 8, border: '1.5px solid #e8e5a8', background: 'white', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                        ✏️ Éditer
                      </button>
                      {e.status !== 'confirmed' && (
                        <button onClick={() => updateExposant(e.id, { status: 'confirmed' })} style={{ padding: '4px 10px', borderRadius: 8, border: 'none', background: '#26422b', color: 'white', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                          ✅ Confirmer
                        </button>
                      )}
                      <button onClick={() => deleteExposant(e.id)} style={{ padding: '4px 10px', borderRadius: 8, border: 'none', background: '#fde8e8', color: '#c0392b', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                        🗑️
                      </button>
                    </div>
                    <div style={{ fontSize: 11, color: '#69322d', opacity: .4 }}>{new Date(e.createdAt).toLocaleDateString('fr-FR')}</div>
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

function ExposantForm({ form, onChange, onSave, onCancel }: any) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div style={{ gridColumn: 'span 2' }}>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>STRUCTURE</label>
        <input style={inputStyle} value={form.structure} onChange={ev => onChange({...form, structure: ev.target.value})} />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>SITE WEB</label>
        <input style={inputStyle} value={form.lienWeb || ''} onChange={ev => onChange({...form, lienWeb: ev.target.value})} placeholder="https://..." />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>INSTAGRAM</label>
        <input style={inputStyle} value={form.instagram || ''} onChange={ev => onChange({...form, instagram: ev.target.value})} placeholder="@compte" />
      </div>
      <div style={{ gridColumn: 'span 2' }}>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>IMAGE URL</label>
        <input style={inputStyle} value={form.imageUrl || ''} onChange={ev => onChange({...form, imageUrl: ev.target.value})} placeholder="https://..." />
      </div>
      <div style={{ gridColumn: 'span 2' }}>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>DESCRIPTION</label>
        <textarea style={{...inputStyle, minHeight: 80}} value={form.description} onChange={ev => onChange({...form, description: ev.target.value})} />
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
