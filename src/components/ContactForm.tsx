import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

type Reason = 'venir' | 'benevole' | 'idee' | 'info' | 'affiche' | 'pro';

const REASONS: { id: Reason; label: string; icon: string }[] = [
  { id: 'venir', label: 'Venir à l\'événement', icon: '🎉' },
  { id: 'benevole', label: 'Être bénévole', icon: '🙋' },
  { id: 'idee', label: 'Proposer une idée', icon: '💡' },
  { id: 'info', label: 'Être tenu informé', icon: '📬' },
  { id: 'affiche', label: 'Affiches (voiture / commerce)', icon: '📌' },
  { id: 'pro', label: 'Devenir Exposant / Sponsor', icon: '🤝' },
];

const AVEC_OPTIONS = ['Seul(e)', 'En famille', 'Entre amis', 'Avec mon chien'];
const AIDE_OPTIONS = ['Accueil', 'Installation', 'Animation', 'Buvette', 'Logistique', 'Autre'];

export function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [reason, setReason] = useState<Reason | null>(null);
  const [vienne, setVienne] = useState('');
  const [aideType, setAideType] = useState<string[]>([]);
  const [idee, setIdee] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rgpd, setRgpd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function handleReasonSelect(r: Reason) {
    setReason(r);
    setStep(2);
  }

  function toggleAide(opt: string) {
    setAideType(prev =>
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rgpd || !nom || !email || !reason) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason,
          nom,
          email,
          message,
          vienne: reason === 'venir' ? vienne : undefined,
          aideType: reason === 'benevole' ? aideType.join(', ') : undefined,
          idee: reason === 'idee' ? idee : undefined,
        }),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      setSuccess(true);
    } catch {
      setError('Une erreur est survenue. Réessaie dans un instant.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 24px' }}>
        <CheckCircle size={56} color="#26422b" style={{ margin: '0 auto 16px' }} />
        <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '24px', color: '#26422b', margin: '0 0 8px' }}>
          Message envoyé !
        </p>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: '#69322d', opacity: .7 }}>
          On te répond très vite 🐾
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '520px', margin: '0 auto' }}>
      {/* Progress bar */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '28px' }}>
        <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: '#de6c49' }} />
        <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: step === 2 ? '#de6c49' : 'rgba(222,108,73,.25)' }} />
      </div>

      {step === 1 && (
        <div>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', marginBottom: '16px', color: '#69322d', opacity: .8 }}>
            Quel est le sujet de ton message ?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {REASONS.map(r => (
              <button
                key={r.id}
                onClick={() => handleReasonSelect(r.id)}
                style={{
                  padding: '14px 12px',
                  borderRadius: '14px',
                  border: '2px solid rgba(222,108,73,.25)',
                  background: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '13px',
                  color: '#69322d',
                  transition: 'border-color .15s, background .15s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#de6c49';
                  (e.currentTarget as HTMLButtonElement).style.background = '#fdf9f0';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(222,108,73,.25)';
                  (e.currentTarget as HTMLButtonElement).style.background = 'white';
                }}
              >
                <span style={{ display: 'block', fontSize: '20px', marginBottom: '4px' }}>{r.icon}</span>
                {r.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && reason && (
        <form onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={() => setStep(1)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif", fontSize: '13px',
              color: '#de6c49', marginBottom: '16px', padding: '0',
            }}
          >
            ← Revenir
          </button>

          <div style={{
            background: 'rgba(222,108,73,.08)', borderRadius: '10px',
            padding: '10px 14px', marginBottom: '20px',
            fontFamily: "'Poppins', sans-serif", fontSize: '13px', color: '#69322d',
          }}>
            {REASONS.find(r => r.id === reason)?.icon} {REASONS.find(r => r.id === reason)?.label}
          </div>

          {/* Contextual fields */}
          {reason === 'venir' && (
            <div style={{ marginBottom: '18px' }}>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '13px', marginBottom: '10px', color: '#69322d', opacity: .8 }}>
                Tu viens comment ?
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {AVEC_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setVienne(opt)}
                    style={{
                      padding: '8px 14px', borderRadius: '999px',
                      border: `2px solid ${vienne === opt ? '#de6c49' : 'rgba(222,108,73,.25)'}`,
                      background: vienne === opt ? '#de6c49' : 'white',
                      color: vienne === opt ? 'white' : '#69322d',
                      cursor: 'pointer', fontFamily: "'Poppins', sans-serif", fontSize: '13px',
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {reason === 'benevole' && (
            <div style={{ marginBottom: '18px' }}>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '13px', marginBottom: '10px', color: '#69322d', opacity: .8 }}>
                Sur quoi tu voudrais aider ? (plusieurs choix possibles)
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {AIDE_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleAide(opt)}
                    style={{
                      padding: '8px 14px', borderRadius: '999px',
                      border: `2px solid ${aideType.includes(opt) ? '#26422b' : 'rgba(38,66,43,.25)'}`,
                      background: aideType.includes(opt) ? '#26422b' : 'white',
                      color: aideType.includes(opt) ? 'white' : '#26422b',
                      cursor: 'pointer', fontFamily: "'Poppins', sans-serif", fontSize: '13px',
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {reason === 'idee' && (
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontFamily: "'Poppins', sans-serif", fontSize: '13px', marginBottom: '6px', color: '#69322d' }}>
                Ton idée / animation *
              </label>
              <textarea
                required
                value={idee}
                onChange={e => setIdee(e.target.value)}
                rows={4}
                placeholder="Décris ton idée..."
                style={{
                  width: '100%', padding: '12px', borderRadius: '12px',
                  border: '2px solid rgba(222,108,73,.25)', fontFamily: "'Poppins', sans-serif",
                  fontSize: '14px', resize: 'vertical', boxSizing: 'border-box',
                }}
              />
            </div>
          )}

          {reason === 'affiche' && (
            <div style={{
              background: 'rgba(145,172,218,.12)', borderRadius: '12px',
              padding: '14px', marginBottom: '18px',
              fontFamily: "'Poppins', sans-serif", fontSize: '13px', color: '#2d4a6e',
            }}>
              📌 Précise dans le message si tu souhaites une affiche pour ta <strong>voiture</strong> ou ton <strong>commerce</strong>.
            </div>
          )}

          {reason === 'pro' && (
            <div style={{
              background: 'rgba(91,27,143,.08)', border: '1.5px solid rgba(91,27,143,.2)',
              borderRadius: '12px', padding: '14px', marginBottom: '18px',
              fontFamily: "'Poppins', sans-serif", fontSize: '13px', color: '#5b1b8f',
            }}>
              🤝 Tu peux candidater directement via{' '}
              <a href="/exposants" style={{ color: '#5b1b8f', fontWeight: 600 }}>la page Exposants</a>
              {' '}ou{' '}
              <a href="/sponsor" style={{ color: '#5b1b8f', fontWeight: 600 }}>la page Sponsor</a>.
              <br />
              Sinon, précise dans le message si tu es <strong>exposant</strong> ou <strong>sponsor</strong> + le nom de ta structure.
            </div>
          )}

          {/* Common fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: "'Poppins', sans-serif", fontSize: '13px', marginBottom: '5px', color: '#69322d' }}>
                Prénom & Nom *
              </label>
              <input
                type="text"
                required
                value={nom}
                onChange={e => setNom(e.target.value)}
                placeholder="Marie Dupont"
                style={{
                  width: '100%', padding: '11px 12px', borderRadius: '10px',
                  border: '2px solid rgba(222,108,73,.25)', fontFamily: "'Poppins', sans-serif",
                  fontSize: '14px', boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: "'Poppins', sans-serif", fontSize: '13px', marginBottom: '5px', color: '#69322d' }}>
                Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="marie@email.fr"
                style={{
                  width: '100%', padding: '11px 12px', borderRadius: '10px',
                  border: '2px solid rgba(222,108,73,.25)', fontFamily: "'Poppins', sans-serif",
                  fontSize: '14px', boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontFamily: "'Poppins', sans-serif", fontSize: '13px', marginBottom: '5px', color: '#69322d' }}>
              Message (optionnel)
            </label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={3}
              placeholder="Un mot à ajouter ?"
              style={{
                width: '100%', padding: '11px 12px', borderRadius: '10px',
                border: '2px solid rgba(222,108,73,.25)', fontFamily: "'Poppins', sans-serif",
                fontSize: '14px', resize: 'vertical', boxSizing: 'border-box',
              }}
            />
          </div>

          <label style={{
            display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer',
            marginBottom: '20px', fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: '#69322d', opacity: .8,
          }}>
            <input
              type="checkbox"
              checked={rgpd}
              onChange={e => setRgpd(e.target.checked)}
              style={{ marginTop: '2px', accentColor: '#de6c49' }}
            />
            J'accepte que mes informations soient utilisées pour répondre à ma demande. Aucun démarchage, aucun partage avec des tiers.
          </label>

          {error && (
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '13px', color: '#c0392b', marginBottom: '12px' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !rgpd}
            style={{
              width: '100%', padding: '14px', borderRadius: '14px',
              background: loading || !rgpd ? 'rgba(222,108,73,.4)' : '#de6c49',
              border: 'none', color: 'white', cursor: loading || !rgpd ? 'not-allowed' : 'pointer',
              fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: 600,
              transition: 'background .15s',
            }}
          >
            {loading ? 'Envoi...' : 'Envoyer 🐾'}
          </button>
        </form>
      )}
    </div>
  );
}
