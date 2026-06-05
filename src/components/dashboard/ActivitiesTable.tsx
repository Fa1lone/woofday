import { useState } from 'react';

type Activity = {
  id: string;
  emoji: string;
  nom: string;
  description: string;
  pole?: string;
  horaires?: string;
  imageUrl?: string;
  order: number;
};

export function ActivitiesTable({ initialData }: { initialData: Activity[] }) {
  const [data, setData] = useState(initialData.sort((a, b) => a.order - b.order));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Activity>>({});
  const [isAdding, setIsAdding] = useState(false);

  async function saveActivity(activity: Partial<Activity>) {
    const isNew = !activity.id;
    const method = isNew ? 'POST' : 'PATCH';
    const url = isNew ? '/api/activity' : '/api/activity/' + activity.id;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activity)
    });
    const result = await res.json();

    if (isNew) {
      setData(prev => [...prev, result].sort((a, b) => a.order - b.order));
    } else {
      setData(prev => prev.map(a => a.id === activity.id ? { ...a, ...activity } : a).sort((a, b) => a.order - b.order));
    }
  }

  async function deleteActivity(id: string) {
    if (!confirm('Supprimer cette activité ?')) return;
    setData(prev => prev.filter(a => a.id !== id));
    await fetch('/api/activity/' + id, { method: 'DELETE' });
  }

  const handleEdit = (a: Activity) => {
    setEditingId(a.id);
    setEditForm(a);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({ emoji: '🐾', nom: '', description: '', pole: '', horaires: '', order: data.length });
  };

  const handleSave = async () => {
    await saveActivity(editForm);
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <button onClick={handleAdd} style={{ marginBottom: 20, padding: '10px 20px', borderRadius: 12, border: 'none', background: '#de6c49', color: 'white', fontWeight: 700, cursor: 'pointer', fontFamily: "'Fredoka', sans-serif", fontSize: 16 }}>
        + Ajouter une activité
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {isAdding && (
          <div style={{ background: '#f3f1c7', borderRadius: 16, padding: '20px', border: '2px dashed #de6c49' }}>
            <ActivityForm form={editForm} onChange={setEditForm} onSave={handleSave} onCancel={() => setIsAdding(false)} />
          </div>
        )}
        
        {data.map(a => (
          <div key={a.id} style={{ background: 'white', borderRadius: 16, padding: '16px 20px', border: '1.5px solid #e8e5a8' }}>
            {editingId === a.id ? (
              <ActivityForm form={editForm} onChange={setEditForm} onSave={handleSave} onCancel={() => setEditingId(null)} />
            ) : (
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ fontSize: 32 }}>{a.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 18, color: '#69322d' }}>{a.nom}</div>
                  <div style={{ fontSize: 13, color: '#de6c49', fontWeight: 600 }}>{a.horaires} · {a.pole}</div>
                  <div style={{ fontSize: 13, opacity: .7, marginTop: 4 }}>{a.description}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => handleEdit(a)} style={btnStyle}>✏️</button>
                  <button onClick={() => deleteActivity(a.id)} style={{...btnStyle, background: '#fde8e8', color: '#c0392b'}}>🗑️</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityForm({ form, onChange, onSave, onCancel }: any) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 12 }}>
      <div>
        <label style={labelStyle}>EMOJI</label>
        <input style={inputStyle} value={form.emoji} onChange={e => onChange({...form, emoji: e.target.value})} />
      </div>
      <div>
        <label style={labelStyle}>NOM</label>
        <input style={inputStyle} value={form.nom} onChange={e => onChange({...form, nom: e.target.value})} />
      </div>
      <div>
        <label style={labelStyle}>PÔLE / ZONE</label>
        <input style={inputStyle} value={form.pole} onChange={e => onChange({...form, pole: e.target.value})} />
      </div>
      <div>
        <label style={labelStyle}>HORAIRES</label>
        <input style={inputStyle} value={form.horaires} onChange={e => onChange({...form, horaires: e.target.value})} placeholder="ex: 14:00 - 15:00" />
      </div>
      <div>
        <label style={labelStyle}>ORDRE</label>
        <input type="number" style={inputStyle} value={form.order} onChange={e => onChange({...form, order: parseInt(e.target.value)})} />
      </div>
      <div style={{ gridColumn: 'span 3' }}>
        <label style={labelStyle}>DESCRIPTION</label>
        <textarea style={{...inputStyle, minHeight: 60}} value={form.description} onChange={e => onChange({...form, description: e.target.value})} />
      </div>
      <div style={{ gridColumn: 'span 3', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button onClick={onCancel} style={{ padding: '8px 16px', borderRadius: 8, border: '1.5px solid #e8e5a8', background: 'white', cursor: 'pointer', fontWeight: 600 }}>Annuler</button>
        <button onClick={onSave} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#26422b', color: 'white', cursor: 'pointer', fontWeight: 600 }}>Enregistrer</button>
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4, color: '#69322d' };
const inputStyle = { width: '100%', border: '1.5px solid #e8e5a8', borderRadius: 10, padding: '8px 12px', fontSize: 14, fontFamily: "'Poppins', sans-serif", color: '#69322d', outline: 'none', boxSizing: 'border-box' as const };
const btnStyle = { padding: '8px', borderRadius: 10, border: '1.5px solid #e8e5a8', background: 'white', cursor: 'pointer', fontSize: 14 };
