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

  const filtered = filter === 'all' ? data : data.filter(e => e.status === filter);

  async function updateStatus(id: string, status: Exposant['status']) {
    setData(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    await fetch('/api/exposant/' + id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
  }

  return (
    <div>
      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {(['all', 'pending', 'confirmed', 'rejected'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 16px', borderRadius: 9999, border: 'none', cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600,
              background: filter === f ? '#69322d' : '#f3f1c7',
              color: filter === f ? 'white' : '#69322d',
            }}
          >
            {f === 'all' ? `Tous (${data.length})` : STATUS_LABELS[f] + ` (${data.filter(e => e.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px', color: '#69322d', opacity: .5, fontFamily: "'Poppins', sans-serif" }}>
          Aucun exposant pour l'instant.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(e => (
            <div key={e.id} style={{ background: 'white', borderRadius: 16, padding: '16px 20px', border: '1.5px solid #e8e5a8', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 16, color: '#69322d' }}>{e.structure}</div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: '#69322d', opacity: .7 }}>{e.responsable} · {e.ville}</div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: '#de6c49', marginTop: 2 }}>{e.pole}</div>
              </div>
              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: '#69322d', opacity: .7 }}>{e.email}</div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: '#69322d', opacity: .7 }}>{e.telephone}</div>
                {e.tailleStand && <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, color: '#69322d', opacity: .5, marginTop: 2 }}>Stand : {e.tailleStand}</div>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                <span style={{ padding: '3px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 600, fontFamily: "'Poppins', sans-serif", background: STATUS_COLORS[e.status], color: '#69322d' }}>
                  {STATUS_LABELS[e.status]}
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {e.status !== 'confirmed' && (
                    <button onClick={() => updateStatus(e.id, 'confirmed')} style={{ padding: '4px 10px', borderRadius: 8, border: 'none', background: '#26422b', color: 'white', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}>
                      ✅ Confirmer
                    </button>
                  )}
                  {e.status !== 'rejected' && (
                    <button onClick={() => updateStatus(e.id, 'rejected')} style={{ padding: '4px 10px', borderRadius: 8, border: 'none', background: '#fde8e8', color: '#c0392b', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}>
                      ❌ Refuser
                    </button>
                  )}
                </div>
                <div style={{ fontSize: 11, color: '#69322d', opacity: .4, fontFamily: "'Poppins', sans-serif" }}>{new Date(e.createdAt).toLocaleDateString('fr-FR')}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
