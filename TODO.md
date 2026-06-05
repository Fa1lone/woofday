# TODO — woofday.fr

Source de vérité : analyse comparative directe Cynofeel (`woofday-landing.tsx`, `woofday-exposant-landing.tsx`, `woofday-sponsor-landing.tsx`) — mise à jour le 2026-06-05.

---

## GAPS CRITIQUES — manque vs Cynofeel

### 1. Section PROS (Espace Professionnels) — MANQUANTE

Section présente dans Cynofeel (id="professionnels") mais absente du site standalone.

**À ajouter entre BÉNÉVOLAT et FAQ :**

- [ ] Fond sombre (`var(--truffe)` ou équivalent dark), border-radius xl, padding généreux
- [ ] Chip "Espace Professionnels" centré + H2 "Rejoignez l'aventure Woof Day" + sous-titre
- [ ] Grille 2 colonnes :
  - **Card Exposant** (fond truffe clair / accent terre-cuite) :
    - Icône stand + H3 "Devenir Exposant"
    - ✓ "Public cible de passionnés (800+ visiteurs)"
    - ✓ "Vendez et faites tester vos produits"
    - ✓ "Développez votre réseau local"
    - CTA → `/exposants`
  - **Card Sponsor** (fond crème / accent vert, badge "Impact RSE fort") :
    - Icône handshake + H3 "Devenir Sponsor"
    - ✓ "Logo sur affiches, flyers, site & réseaux"
    - ✓ "Image associée à un événement solidaire"
    - ✓ "Impact RSE local et concret"
    - CTA → `/sponsor`

### 2. Mode standby — MANQUANT

Cynofeel a un `isStandby` mode : quand la page WoofDay est désactivée en back-office, seul un teaser s'affiche (sans les sections exposants, programme, etc.).

- [ ] Ajouter un flag `WOOFDAY_ACTIVE=true` en variable d'env
- [ ] Si false : afficher uniquement HERO simplifié + compteur intéressés + formulaire "Tenir informé"
- [ ] Si true : page complète actuelle

### 3. Mobile sticky CTA bar — MANQUANT

Cynofeel a une barre fixe en bas sur mobile (z-index élevé) avec le CTA principal "Je participe 🐾".

- [ ] Ajouter `<div>` fixed bottom sur mobile uniquement
- [ ] Disparaît quand le hero est visible (IntersectionObserver sur `#btn-participe`)
- [ ] CTA : "Je participe 🐾" → scroll vers #contact

---

## PAGE ACCUEIL

### Sections manquantes

- [x] **1.3 Pourquoi venir** — 4 cards numérotées 01/02/03/04
  - 01 "Une vraie sortie du dimanche" — "Pas un événement figé. Une journée locale, joyeuse et vivante près d'Angoulême."
  - 02 "De quoi faire toute la journée" — "Plus de 50 stands, animations et concours pour découvrir, rire, flâner et profiter."
  - 03 "C'est accessible" — "Entrée gratuite, ambiance familiale, avec ou sans chien."
  - 04 "Ça a du sens" — "100% des bénéfices nets reversés au Refuge de l'Angoumois."
  - Callout jaune centré : "En gros : une sortie qui fait plaisir… et qui sert à quelque chose. 🐾"

- [x] **1.4 Programme** — "Une édition encore plus grande"
  - Description : "Après une première édition très appréciée, le Woof Day revient avec encore plus d'énergie, d'animations et de moments à vivre."
  - Liste 5 items :
    1. "Un grand village avec 50+ exposants et stands"
    2. "Des animations, démos & jeux concours toute la journée"
    3. "Des activités aquatiques pour les chiens"
    4. "Une grande tombola à gain immédiat (600+ lots !)"
    5. "De la convivialité, des rencontres et de belles surprises"
  - 4 micro-cards : ⛺ 50+ Stands / 🎁 Tombola 600+ lots / 🏆 Concours & Animations / 🐕 Activités Aquatiques

- [x] **1.5 Exposants teaser** — "Ils seront présents au Woof Day"
  - Afficher 3 exposants (sur 6 total), bouton "Voir tous les exposants →"
  - 6 exposants fictifs avec photos Unsplash + modal au clic

- [x] **1.6 Solidarité** — fond vert forêt
  - H2 : "Une journée fun… au profit d'une vraie cause"
  - "Le Woof Day soutient le Refuge de l'Angoumois. 100% des bénéfices nets lui sont reversés."
  - Callout blanc : "Vous passez une belle journée. Et en plus, vous aidez des animaux. 🐾"
  - Logo Refuge de l'Angoumois (placeholder texte pour MVP)

- [x] **1.8 Bénévolat & implication** — "Le Woof Day grandit, on a besoin de vous !"
  - 3 formes d'aide : Venir bénévole le jour J / Coller des affiches / Partager sur les réseaux
  - CTA : form contact avec raison "benevole"

### Améliorations hero

- [x] Badge preuves (5 pills) : ✓ Entrée gratuite / 🐕 Avec ou sans chien / ⛺ 50+ stands / 👥 1200+ visiteurs / ❤️ Solidaire
- [x] Bouton **"Ajouter à l'agenda"** (Google Calendar URL + fichier .ics téléchargeable Apple/Outlook)
- [x] Bouton **partage WhatsApp** : "Woof Day 2026 — 13 sept à Ambérac ! Entrée gratuite 🐾"
- [x] Animations pattes flottantes (5 paw prints, positions et durées variées, CSS keyframes)

---

## PAGE EXPOSANTS

- [x] **Hero enrichi**
  - Stat pills : "Éd.1 : 800 visiteurs ✅" / "Éd.2 : 1200+ visés 🚀"
  - Badge : "Places limitées par catégorie · Réponse sous 72h"
  - Image hero : chien heureux (Unsplash)

- [x] **Charte éthique expandable**
  - Toggle "Voir ce qui est interdit"
  - Contenu : colliers étrangleurs, électriques, méthodes coercitives, produits dangereux

- [x] **Galerie Édition 1** — preuve sociale
  - 3 stats : 800 visiteurs / 1200+ projetés / 30+ exposants pionniers
  - Photos ambiance Unsplash (placeholders MVP)

- [x] **Nouveautés 2026** — 4 features
  - Organisation Fluide / Village Lisible / Zone Fraîcheur / Jeux & Concours

- [x] **"Le Hack visibilité"** — mega-card orange
  - Jeu concours Instagram : lot exposant → abonnés avant l'événement
  - Tombola : gain immédiat, visiteur VIENT sur le stand pour récupérer le lot

- [x] **6 Pôles** — cards avec descriptions
  - Éducation & Relation / Santé & Bien-être / Nutrition & Alimentation / Activités & Fun / Artisanat & Accessoires / Associations & Solidarité

- [x] **Logistique complète**
  - Horaires installation : Veille 16h–19h / Jour J 7h–9h (tout prêt à 9h)
  - Formats stands : Petit (artisanat/asso) / Standard (pro) / Grand (marque)
  - Checklist : lestage barnum, TPE, sacs poubelle, eau pour chien

- [x] **Kit média offert**
  - 1 visuel "J'y serai" Story / 1 visuel Post carré / Affiche PDF / Bannière email

- [x] **Formulaire 4 étapes** (remplace formulaire actuel)
  - Étape 1 — Identité : structure, responsable, email, téléphone, ville
  - Étape 2 — Activité : description courte, pôle, Instagram/site
  - Étape 3 — Stand : taille (Petit/Standard/Grand), barnum (mien/louer), électricité (non/standard/forte)
  - Étape 4 — Impact : lot tombola/concours, option panneaux co-brandés (35€, limité 10 places), checkbox sponsor officiel
  - Submit : "Bloquer mon emplacement maintenant →"
  - Success : "Candidature envoyée ! Nous revenons vers vous sous 72h."

---

## PAGE SPONSOR

- [x] **Hero enrichi**
  - H1 : "CÉLÉBREZ LE CHIEN et les humains qui l'aiment."
  - Stats pills : 800 visiteurs Éd.1 / 1200+ Éd.2 / 50-60 exposants

- [x] **Manifeste expandable**
  - Historique Éd.1 : "Pluie battante. Zéro expérience. 800 visiteurs. La preuve qu'il y a une demande."
  - Éd.2 : "Nouveau site, activités aquatiques, campagne structurée. Objectif 1200+."
  - Charte éthique : éducation positive uniquement

- [x] **Budget transparent** — section fond sombre
  - Objectif sponsoring : 4 000€
  - Dépenses : Panneaux & affiches 800€ / Pub réseaux 400€ / Lieu & tivolis 850€ / Tenues 450€ / Site web 150€ / Achats 1000€ / Assurances 650€ = **4 300€**
  - Recettes événement : Exposants 1500€ / Tombola 1200€ / Buvette 1000€ = **3 700€**

- [x] **4 leviers psychologiques**
  - Effet Halo / Preuve Sociale / Mémorisation / Réciprocité

- [x] **6 Packs détaillés** (remplace packs actuels)
  | Pack | Prix | Points clés |
  |------|------|-------------|
  | Bronze | 50€ | Remerciements, nom sur site, jeu concours |
  | Argent | 150€ | + Logo site (lien actif), mention sur place, Stories dédiées |
  | Or ⭐ | 300€ | + Logo affiches & flyers, naming d'un stand bénévole |
  | Platine | 600€ | + Post dédié, Kakémono sur site, naming d'une zone |
  | VIP 🔒×2 | 1000€ | + 5 Stories, logo tenues bénévoles, roll-up |
  | Sponsor Principal ⭐×1 | 2000€ | "Présenté par…", naming zone majeure, 2 posts + 8-10 stories |
  - Option panneaux co-brandés Vediaux : 65€/unité

- [x] **Zones & stands à nommer** — état Disponible/Réservé
  - 6 zones : Aquatique / Agility / Détente / Famille / Scène / Village
  - 7 stands : Tombola / Buvette / Escape Game / Peinture / Photo / Spectacle / Accueil Refuge

- [x] **Partenariat en nature**
  - Dons de lots tombola / Compétences & matériel

- [x] **Co-branding goodies**
  - Gobelet 5€ / Tote bag 20€ / Bandana chien 8€ / Sacs 6€ / Pochette friandises 12€ / Jouet 10€

- [x] **Formulaire enrichi** (remplace formulaire actuel)
  - Sélecteur de pack (boutons visuels)
  - Compteur panneaux ±1 (quantité × 65€)
  - Select zone souhaitée, select stand souhaité
  - Input lot jeu concours + textarea objectif

---

## FEATURES TRANSVERSALES

- [x] **Banderole logos Woof Day sous les héros**
  - Composant partagé sur accueil, exposants et sponsor
  - Une seule ligne horizontale, logos variants qui défilent

- [x] **Annotations visuelles façon posts Instagram**
  - Cercles manuscrits, petits traits d'attention et flèches SVG locales
  - Utilisées pour souligner les CTA/messages importants sans masquer le texte

- [x] **Bouton "Ajouter à l'agenda"**
  - Google Calendar : URL avec paramètres date/lieu/titre
  - Apple / Outlook : fichier `.ics` téléchargeable

- [x] **Partage WhatsApp**
  - URL : `https://wa.me/?text=Woof+Day+2026+—+13+sept+à+Ambérac+!+Entrée+gratuite+🐾`
  - Bouton présent en hero + section infos

- [x] **Animations pattes flottantes** — hero
  - 5 paw prints SVG, positions absolues variées
  - CSS keyframes float (translate + rotate), durées 6s-10s

- [x] **Toast notifications** — remplacer success states inline
  - "Message envoyé ✅", "Candidature reçue ✅", etc.

- [x] **Modal galerie exposants** — page accueil section 1.5
  - Photo, nom, pôle, description longue, lien Instagram

- [ ] **Partage natif mobile**
  - Web Share API avec fallback clipboard

---

## DASHBOARD ADMIN

- [x] Vue sponsors enrichie (statut, pack choisi, zone/stand nommés)
- [x] Bouton export CSV (exposants + sponsors + contacts)
- [x] Bouton déconnexion dans sidebar
- [x] Compteur intéressés visible en grand sur la home dashboard
- [x] Lien "← Voir le site public" dans sidebar
- [x] Lien "Admin ↗" discret dans le footer du site public

---

## IMAGES À CRÉER / SOURCER

- [x] **Photos chiens Unsplash** — 6 portraits pour fiches exposants (Unsplash CDN)
- [ ] **Photos ambiance Édition 1** (4 photos) — à demander aux organisateurs
  - Foule (col-span-2) / Enfant + chien / Stand exposant / Animation
- [ ] **Logo Refuge de l'Angoumois** — à récupérer auprès du refuge
- [ ] **Meta OG image** (1200×630px avec logo + date + lieu) — à créer

---

## TECHNIQUE

- [ ] Passer `data/*.json` en vraie DB (SQLite/Drizzle ou Postgres/Prisma) avant mise en prod
- [ ] Intégrer Resend pour emails de confirmation (exposant, sponsor, contact)
- [ ] Variables Vercel : `DASHBOARD_PASSWORD`, `SESSION_SECRET`, `RESEND_API_KEY`
- [ ] Changer le mot de passe dashboard par défaut avant mise en prod
- [ ] Google Analytics ou Plausible
- [x] Robots.txt + sitemap.xml
- [x] Fichier `.ics` calendrier dans `/public/`

---

## DÉJÀ FAIT ✅

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
