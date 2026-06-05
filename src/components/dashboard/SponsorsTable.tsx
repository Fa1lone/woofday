import { useState } from 'react';

type CandidatureSponsor = {
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
  lienWeb?: string;
  instagram?: string;
  statut: 'nouveau' | 'vu' | 'accepte' | 'refuse';
  createdAt: string;
};

const statutColors: Record<string, string> = {
  nouveau: '#de6c49',
  vu: '#91acda',
  accepte: '#26422b',
  refuse: '#9a9a9a',
};
const statutLabels: Record<string, string> = {
  nouveau: '🆕 Nouveau',
  vu: '👀 Vu',
  accepte: '✅ Accepté',
  refuse: '❌ Refusé',
};
const packColors: Record<string, string> = {
  platine: '#8B7355',
  gold: '#c9a846',
  silver: '#9a9a9a',
  bronze: '#cd7f32',
  'zone-premium': '#5b1b8f',
  stand: '#26422b',
  panneau: '#91acda',
};

export function SponsorsTable({ initialData }: { initialData: CandidatureSponsor[] }) {
  const [items, setItems] = useState<CandidatureSponsor[]>(initialData);
  const [expanded, setExpanded] = useState<string | null>(null);

  const updateStatut = async (id: string, statut: string) => {
    const res = await fetch(`/api/sponsor/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut }),
    });
    if (res.ok) {
      setItems(items.map(i => i.id === id ? { ...i, statut: statut as CandidatureSponsor['statut'] } : i));
      (window as Window & { showToast?: (msg: string) => void }).showToast?.('Statut mis à jour');
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Supprimer cette candidature sponsor ?')) return;
    const res = await fetch(`/api/sponsor/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems(items.filter(i => i.id !== id));
      (window as Window & { showToast?: (msg: string) => void }).showToast?.('Candidature supprimée');
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 64, color: '#69322d', opacity: .4, fontFamily: "'Poppins', sans-serif" }}>
        Aucune candidature sponsor pour l'instant.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map(item => (
        <div key={item.id} style={{ background: 'white', borderRadius: 16, border: '1.5px solid #e8e5a8', overflow: 'hidden' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', cursor: 'pointer' }}
            onClick={() => setExpanded(expanded === item.id ? null : item.id)}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 16, color: '#69322d' }}>
                {item.entreprise}
              </div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: '#69322d', opacity: .6, marginTop: 2 }}>
                {item.contact} · {item.email}
              </div>
            </div>
            {item.pack && (
              <span style={{
                background: (packColors[item.pack] ?? '#de6c49') + '22',
                color: packColors[item.pack] ?? '#de6c49',
                borderRadius: 20, padding: '3px 10px',
                fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 700,
              }}>
                {item.pack.toUpperCase()}
              </span>
            )}
            <span style={{
              background: statutColors[item.statut] + '22',
              color: statutColors[item.statut],
              borderRadius: 20, padding: '3px 10px',
              fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
            }}>
              {statutLabels[item.statut]}
            </span>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, color: '#69322d', opacity: .4, whiteSpace: 'nowrap' }}>
              {new Date(item.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
            </div>
            <span style={{ fontSize: 12, color: '#69322d', opacity: .4 }}>{expanded === item.id ? '▲' : '▼'}</span>
          </div>

          {expanded === item.id && (
            <div style={{ borderTop: '1px solid #f0ede5', padding: '14px 18px', background: '#faf9f6' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12, fontFamily: "'Poppins', sans-serif", fontSize: 13 }}>
                {item.telephone && <div><strong>Téléphone :</strong> {item.telephone}</div>}
                {item.zone && <div><strong>Zone souhaitée :</strong> {item.zone}</div>}
                {item.stand && <div><strong>Stand :</strong> {item.stand}</div>}
                {item.lot && <div><strong>Lot :</strong> {item.lot}</div>}
                {item.panelCount && <div><strong>Nb panneaux :</strong> {item.panelCount}</div>}
                {item.lienWeb && <div><strong>Site :</strong> <a href={item.lienWeb} target="_blank" style={{ color: '#91acda' }}>{item.lienWeb}</a></div>}
                {item.instagram && <div><strong>Instagram :</strong> @{item.instagram.replace('@', '')}</div>}
                {item.objectif && <div style={{ gridColumn: 'span 2' }}><strong>Objectif :</strong> {item.objectif}</div>}
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {(['nouveau', 'vu', 'accepte', 'refuse'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => updateStatut(item.id, s)}
                    style={{
                      background: item.statut === s ? statutColors[s] : 'white',
                      color: item.statut === s ? 'white' : statutColors[s],
                      border: `1.5px solid ${statutColors[s]}`,
                      borderRadius: 8, padding: '5px 12px',
                      fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    {statutLabels[s]}
                  </button>
                ))}
                <button
                  onClick={() => deleteItem(item.id)}
                  style={{ marginLeft: 'auto', background: 'white', color: '#cc4444', border: '1.5px solid #cc4444', borderRadius: 8, padding: '5px 12px', fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                >
                  🗑 Supprimer
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
