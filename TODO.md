# TODO — woofday.fr

Source de vérité : analyse comparative directe Cynofeel (`woofday-landing.tsx`, `woofday-exposant-landing.tsx`, `woofday-sponsor-landing.tsx`) — mise à jour le 2026-06-05.

---

## 🔴 GAPS CRITIQUES — manque vs Cynofeel (à faire avant launch)

### 1. Section PROS (Espace Professionnels) — HOME — MANQUANTE

Section présente dans Cynofeel (id="professionnels") mais absente du site standalone.

**À insérer entre BÉNÉVOLAT et FAQ dans `index.astro` :**

- [ ] Fond sombre `var(--truffe)`, border-radius xl, padding généreux, overflow hidden
- [ ] Watermark patte en fond (opacity .05)
- [ ] Chip "Espace Professionnels" + H2 "Rejoignez l'aventure Woof Day" + sous-titre "Visibilité locale exceptionnelle au service d'une belle cause."
- [ ] Grille 2 colonnes responsive :
  - **Card Exposant** (bg `rgba(truffe,.12)`, border terre, accent terre) :
    - Icône Stand + H3 "Devenir Exposant"
    - ✓ "Public cible de passionnés (800+ visiteurs)"
    - ✓ "Vendez et faites tester vos produits"
    - ✓ "Développez votre réseau local"
    - CTA btn → `/exposants`
  - **Card Sponsor** (bg `rgba(creme,.08)`, border creme, badge "Impact RSE fort" en coin) :
    - Icône Handshake + H3 "Devenir Sponsor"
    - ✓ "Logo sur affiches, flyers, site & réseaux"
    - ✓ "Image associée à un événement solidaire"
    - ✓ "Impact RSE local et concret"
    - CTA btn → `/sponsor`

### 2. Formulaire contact multi-étapes — HOME — MANQUANT

Le formulaire actuel est un simple `<form>` (select + nom + email + message).
Cynofeel a un formulaire React 2 étapes avec champs contextuels selon la raison.

**À remplacer dans `index.astro` section #contact :**

- [ ] **Étape 1 — Raison** : 6 boutons sélectionnables (style pill) :
  - "Venir à l'événement"
  - "Être bénévole"
  - "Proposer une idée"
  - "Être tenu informé"
  - "Affiches (voiture / commerce)"
  - "Devenir Exposant / Sponsor"
- [ ] **Étape 2 — Champs contextuels selon raison** :
  - **"venir"** → pills radio : seul / en famille / entre amis / avec mon chien
  - **"benevole"** → checkboxes : accueil / installation / animation / buvette / logistique / autre
  - **"idee"** → textarea "Ton idée / animation" (required)
  - **"affiche"** → bloc info : "Précisez si voiture ou commerce dans le message"
  - **"pro"** → bloc violet : "Précisez si exposant ou sponsor + nom de votre structure"
  - Tous : nom, email, message optionnel, checkbox RGPD
- [ ] Barre de progression 2 étapes visuelles (barres colorées)
- [ ] Bouton "← Revenir" à l'étape 2
- [ ] État de succès (overlay vert avec CheckCircle)
- [ ] API `/api/contact` doit sauvegarder les champs `vienne`, `aideType`, `idee` (actuellement ignorés)

### 3. Mobile sticky CTA bar — HOME — MANQUANTE

- [ ] `<div>` `position:fixed; bottom:0; left:0; right:0` visible seulement sur mobile (`display:none` sur desktop)
- [ ] Visible après scroll > 350px (JS scroll listener)
- [ ] Contenu : bouton Instagram (lien @woofday_charente) + bouton Share + bouton "Je suis intéressé" plein
- [ ] Disparaît quand le hero est visible (IntersectionObserver sur `#btn-participe`)

### 4. Partage natif mobile (Web Share API) — HOME — MANQUANT

- [ ] Bouton "Partager" en hero qui appelle `navigator.share({ title, text, url })`
- [ ] Fallback : `navigator.clipboard.writeText(url)` + toast "Lien copié !"
- [ ] Identique à la sticky CTA bar share button

### 5. Mode standby — MANQUANT

- [ ] Variable d'env `WOOFDAY_ACTIVE=true` (ajouter dans `.env.example`)
- [ ] Dans `index.astro` : si `false`, afficher teaser uniquement (hero simplifié + countdown + compteur intéressés)
- [ ] Si `true` : page complète actuelle

### 6. Infos pratiques — 2 cards manquantes

La section `#infos` dans `index.astro` a 4 cards. Cynofeel en a 6.

- [ ] Ajouter card **"Chiens"** : "Bienvenus, en laisse" (icône 🐾 ou PawPrint)
- [ ] Ajouter card **"Stands"** : "50+ exposants" (icône ⛺ ou Tent)

### 7. Contact API — champs contextuels non sauvegardés

- [ ] Ajouter `vienne?: string`, `aideType?: string`, `idee?: string` dans le type `Contact` (`data.ts`)
- [ ] Mettre à jour `addContact()` pour accepter ces champs optionnels
- [ ] Mettre à jour `/api/contact.ts` pour les passer à `addContact()`

---

## 🟡 NOTIFICATIONS EMAIL — MANQUANTES (exposant + sponsor)

Actuellement seul `/api/contact.ts` envoie un email via Resend. Les candidatures exposant et sponsor n'envoient rien.

- [ ] `/api/exposant.ts` : envoyer email Resend à `CONTACT_EMAIL` quand nouvelle candidature (nom structure, pôle, email, téléphone)
- [ ] `/api/sponsor.ts` : envoyer email Resend à `CONTACT_EMAIL` quand nouveau sponsor (entreprise, pack choisi, contact)
- [ ] Template HTML simple (pas besoin de React Email pour MVP)
- [ ] Dépend de `RESEND_API_KEY` défini

---

## 🟡 TECHNIQUE

- [x] Créer `.env.example` avec : `DASHBOARD_PASSWORD`, `SESSION_SECRET`, `RESEND_API_KEY`, `CONTACT_EMAIL`, `WOOFDAY_ACTIVE` ✅
- [ ] Google Analytics (G-XXXXXX) ou Plausible script dans `Layout.astro`
- [ ] Passer `data/*.json` en vraie DB (SQLite/Drizzle ou Postgres/Prisma) avant prod
- [ ] Variables Vercel à configurer : `DASHBOARD_PASSWORD`, `SESSION_SECRET`, `RESEND_API_KEY`

---

## 🟡 IMAGES / ASSETS

- [ ] **Photos ambiance Édition 1** (4 photos réelles) — à demander aux organisateurs
  - Foule (grande, pour col-span-2) / Enfant + chien / Stand exposant / Animation
  - Remplacer `woofday-ambiance-01/02/04.webp` si ce sont des placeholders
- [ ] **Meta OG image** (1200×630px) — logo Woof Day + date + lieu + fond terre cuite

---

## ✅ DÉJÀ FAIT

- [x] Repo GitHub : https://github.com/Fa1lone/woofday
- [x] Astro 6.4 SSR + Node adapter + Tailwind 4 + React islands
- [x] DA complète : palette brandboard (#69322d / #de6c49 / #26422b / #91acda / #f3f1c7), Fredoka + Kalam + Poppins
- [x] Favicon tête de chien (TETECHIENV1.svg)
- [x] SVG logos officiels dans public/logos/
- [x] Landing : hero terre cuite, countdown, compteur intéressés, FAQ, contact
- [x] Confettis au clic "Je participe" + animation compteur
- [x] Page /exposants avec formulaire 4 étapes complet
- [x] Page /sponsor avec 6 packs et zones/stands
- [x] Dashboard /dashboard avec login + protection middleware
- [x] API routes : interest, exposant, sponsor, contact, auth, logout, export
- [x] Stockage JSON local (data/*.json)
- [x] Dashboard : liste exposants (React island) avec confirmation/refus, contacts, sponsors
- [x] Export CSV avec BOM Excel pour exposants/sponsors/contacts
- [x] Toast global window.showToast() dans Layout.astro
- [x] Agenda dropdown (Google Cal + .ics) dans hero
- [x] Modal exposants avec photo Unsplash + fallback emoji
- [x] Floating paw animations avec CSS translate (sans conflit transform)
- [x] Dashboard accessible via lien Admin ↗ dans footer public
- [x] Section POURQUOI VENIR — 3 piliers + 4 cards numérotées + callout
- [x] Section PROGRAMME — texte + 4 micro-cards (50+ / 600+ / Animations / Aqua)
- [x] Section EXPOSANTS TEASER — grid 3 cards + CTA Exposant + Sponsor
- [x] Section SOLIDARITÉ — photo Méline/Ulysse + logo refuge + stats + callout vert
- [x] Section ZONES — 6 zones dynamiques depuis data/activities.json
- [x] Section BÉNÉVOLAT — 2 colonnes, 3 modes d'aide
- [x] Section INFOS PRATIQUES — 4 cards + carte Google Maps
- [x] Section FAQ — 8 questions, accordion JS
- [x] Footer complet — nav + pros + Instagram
- [x] Banderole logos défilants (LogoTicker)
- [x] Annotations hand-drawn (DoodleMark SVG, Rough Notation)
- [x] Bouton "Ajouter à l'agenda" (Google Cal + .ics)
- [x] Bouton partage WhatsApp
- [x] Robots.txt + sitemap.xml
- [x] data/activities.json créé (6 zones par défaut)
- [x] API exposant : champ instagram sauvegardé ✅ (fix 2026-06-05)
- [x] API sponsor : champs lienWeb + instagram sauvegardés ✅ (fix 2026-06-05)
- [x] API contact : email destination via CONTACT_EMAIL env ✅ (fix 2026-06-05)
- [x] Dashboard login : mot de passe par défaut retiré du HTML ✅ (fix 2026-06-05)
- [x] exposant/create.ts + sponsor/create.ts : dynamic imports nettoyés ✅ (fix 2026-06-05)
