import { useState } from 'react';

type CandidatureExposant = {
  id: string;
  structure: string;
  responsable: string;
  email: string;
  telephone: string;
  ville: string;
  pole: string;
  description: string;
  tailleStand?: string;
  barnum?: string;
  electricite?: string;
  tableBonus: boolean;
  animation?: string;
  sponsoringInteresse: boolean;
  lienWeb?: string;
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

export function ExposantsTable({ initialData }: { initialData: CandidatureExposant[] }) {
  const [items, setItems] = useState<CandidatureExposant[]>(initialData);
  const [expanded, setExpanded] = useState<string | null>(null);

  const updateStatut = async (id: string, statut: string) => {
    const res = await fetch(`/api/exposant/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut }),
    });
    if (res.ok) {
      setItems(items.map(i => i.id === id ? { ...i, statut: statut as CandidatureExposant['statut'] } : i));
      (window as Window & { showToast?: (msg: string) => void }).showToast?.('Statut mis à jour');
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Supprimer cette candidature ?')) return;
    const res = await fetch(`/api/exposant/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems(items.filter(i => i.id !== id));
      (window as Window & { showToast?: (msg: string) => void }).showToast?.('Candidature supprimée');
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 64, color: '#69322d', opacity: .4, fontFamily: "'Poppins', sans-serif" }}>
        Aucune candidature exposant pour l'instant.
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
                {item.structure}
              </div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: '#69322d', opacity: .6, marginTop: 2 }}>
                {item.pole} · {item.ville} · {item.responsable}
              </div>
            </div>
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
                <div><strong>Email :</strong> <a href={`mailto:${item.email}`} style={{ color: '#91acda' }}>{item.email}</a></div>
                <div><strong>Téléphone :</strong> {item.telephone}</div>
                <div><strong>Taille stand :</strong> {item.tailleStand || '—'}</div>
                <div><strong>Barnum :</strong> {item.barnum || '—'}</div>
                <div><strong>Électricité :</strong> {item.electricite || '—'}</div>
                <div><strong>Table bonus :</strong> {item.tableBonus ? 'Oui' : 'Non'}</div>
                <div><strong>Sponsoring :</strong> {item.sponsoringInteresse ? 'Intéressé' : 'Non'}</div>
                {item.lienWeb && <div><strong>Site :</strong> <a href={item.lienWeb} target="_blank" style={{ color: '#91acda' }}>{item.lienWeb}</a></div>}
                {item.animation && <div style={{ gridColumn: 'span 2' }}><strong>Animation :</strong> {item.animation}</div>}
              </div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, marginBottom: 14, padding: '10px 12px', background: 'white', borderRadius: 8, border: '1px solid #e8e5a8' }}>
                {item.description}
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
