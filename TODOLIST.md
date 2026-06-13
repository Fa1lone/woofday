# Woofday — TODO

## Priorité haute

### Infra
- [ ] **Exécuter `schema-ateliers.sql` dans la console Neon** — sans ça, le dashboard Ateliers plante en prod
  ```sql
  -- Copier-coller le contenu de schema-ateliers.sql dans Neon SQL Editor
  ```
- [ ] **Merger la PR** `feat/blog-evenements-cynofeel` → main

### Contenu & SEO
- [ ] **Stop-slop pass** sur les 5 articles SEO (retirer les tics IA : "il est crucial de", "n'hésitez pas à", etc.)
  - mentrailing-charente.md
  - quest-ce-que-le-mentrailing.md
  - activites-chien-charente.md
  - educateur-canin-charente.md
  - chien-anxieux-activites.md
- [ ] **Ajouter backlinks vers mon-chien-reactif.fr** dans les articles woofday qui mentionnent chien réactif/anxieux
  - `chien-anxieux-activites.md` → lien vers mon-chien-reactif.fr en section "Pour aller plus loin"
  - `mentrailing-charente.md` → mention dans la partie "chien anxieux"
- [ ] **Packs de diffusion** pour les 5 articles SEO
  - LinkedIn : opinion + takeaway + lien
  - Google Business Profile : post local résumé
  - Instagram : carrousel checklist/tips (5 slides)
  - Newsletter : bloc problème → réponse → lien

## Priorité moyenne

### Blog — 15 articles restants (phase Growth)

Cluster mentrailing :
- [ ] Mon chien tire en laisse — solutions et activités
- [ ] Rappel du chien : pourquoi ça ne fonctionne pas (et comment corriger)
- [ ] Premiers secours pour chien : les gestes qui sauvent

Cluster événement :
- [ ] Woof Day 2026 — programme complet (à publier début sept.)
- [ ] Exposants Woof Day 2026 — qui sera là ?
- [ ] Tombola Woof Day 2026 — lots et comment participer

Cluster stimulation mentale :
- [ ] Stimulation mentale chien : 10 idées pour la maison
- [ ] Enrichissement environnemental pour chien d'appartement
- [ ] Tapis de fouille, Kong, jeux d'odorat : guide complet

Cluster local Charente :
- [ ] Forêt de la Braconne — guide complet pour les chiens
- [ ] Bords de Charente dog-friendly — les meilleurs spots
- [ ] Angoulême avec son chien : tout ce qu'il faut savoir

Cluster Refuge :
- [ ] Pourquoi soutenir le Refuge de l'Angoumois
- [ ] Adopter un chien en Charente — guide complet
- [ ] Bénévolat au Refuge de l'Angoumois — comment s'impliquer

## Audit SEO — 2026-06-13 (score actuel : 42/100 → cible : 100)

### Technique SEO
- [x] Ajouter `<link rel="canonical">` sur les 7 pages sans canonical *(Layout.astro — auto sur toutes les pages)*
- [x] Corriger le sitemap : URLs sans www → `www.woofday.fr`, `/blog` ajouté
- [ ] Corriger les 4 redirections sur les pages auditées → à régler côté hébergement/DNS (www → non-www)
- [x] Corriger le lien interne `/dashboard` → `/dashboard/login`
- [x] Ajouter `noindex` sur `/dashboard/login` (page auth)
- [ ] Ajouter `noindex` sur `/woofday-2026.ics` (fichier calendrier, non HTML) → à faire via robots.txt ou header
- [x] Créer une page 404 personnalisée avec liens retour accueil, blog, exposants

### Sécurité — headers HTTP manquants
- [x] Ajouter `Content-Security-Policy` *(vercel.json)*
- [x] Ajouter `X-Content-Type-Options: nosniff` *(vercel.json)*
- [x] Ajouter `Referrer-Policy: strict-origin-when-cross-origin` *(vercel.json)*
- [x] Ajouter `Permissions-Policy` *(vercel.json)*
- [x] Ajouter `X-Frame-Options: SAMEORIGIN` *(vercel.json)*
- [x] Renforcer HSTS : `includeSubDomains` ajouté *(vercel.json)*
- [ ] Publier un enregistrement DMARC dans le DNS *(à faire côté OVH DNS)*
- [x] Créer `/.well-known/security.txt`

### Contenu & On-Page
- [x] Écrire les meta descriptions manquantes *(toutes les pages ont maintenant une meta)*
- [x] Retravailler les meta descriptions sur les pages clés (/, /exposants, /sponsor, /blog)
- [x] Retravailler les titles sur les pages clés (50–60 car. avec mot-clé)
- [x] Enrichir `/blog` : section "Ce qu'on explore ici" + H2 "Tous les articles" + CTA événement *(blog/index.astro)*
- [x] Différencier les structures `/exposants` et `/sponsor` : bandeau comparatif H2 croisé sur chaque page
- [x] Ajouter des H2 sur les 2 pages qui en sont dépourvues *(blog + section articles)*
- [ ] Remplacer les photos Unsplash par des photos originales de l'événement

### Données structurées (Schema.org)
- [x] Ajouter JSON-LD `Event` sur la homepage
- [x] Ajouter JSON-LD `Organization` (nom, url, logo, Instagram)
- [x] Ajouter JSON-LD `FAQPage` sur `/` (5 questions), `/exposants` (4 questions), `/sponsor` (2 questions)

### Open Graph / Social
- [x] Ajouter `og:image` sur toutes les pages *(Layout.astro — constante OG_IMAGE)*
- [x] Ajouter `og:description` sur toutes les pages *(Layout.astro)*
- [x] Ajouter `og:title` sur toutes les pages *(Layout.astro)*
- [x] Ajouter `twitter:card` sur toutes les pages *(Layout.astro)*
- [ ] Créer l'image OG réelle `/images/og-woofday.jpg` (1200×630px)

### Performance / Images
- [ ] Optimiser les PNG lourds en WebP (dog-vizsla-debout-bleu.png = 2,7 Mo, dog-border-collie-sit-orange.png = 2,4 Mo, dog-border-collie-portrait-terre.png = 1,8 Mo, dog-terrier-assis-truffe.png = 1,6 Mo, dog-golden-assis2-vert.png = 1,4 Mo…)
- [ ] Réduire le JS inutilisé (35 KiB d'économie selon PSI)
- [ ] Améliorer le LCP mobile : actuellement 3 139 ms → cible < 2 500 ms

### Maillage interne & Conversion
- [x] Corriger le lien interne `/dashboard` → `/dashboard/login`
- [ ] Mailler `/dashboard/login` avec d'autres pages *(noindex ajouté — moins prioritaire)*
- [x] Ajouter des CTA visibles *(blog : CTA "Voir le programme" + "Devenir exposant" en bas de page)*
- [x] Ajouter un lien Google Maps / itinéraire vers Ambérac *(lien texte "Obtenir l'itinéraire →" sur la carte)*
- [ ] Ajouter un lien vers la fiche Google Business Profile

### E-E-A-T & Entité de marque
- [ ] Créer une page "À propos" (événement, équipe, association, historique)
- [ ] Ajouter des preuves terrain : photos édition précédente, témoignages exposants
- [ ] Ajouter des profils sociaux : LinkedIn et/ou YouTube (seul Instagram détecté)
- [ ] Ajouter des données propriétaires : nb exposants, visiteurs, superficie…

### LLMO (IA)
- [x] Corriger `llms.txt` : URLs complètes `https://www.woofday.fr/...` ajoutées (4 pages citées)

---

## Priorité basse

### Dashboard cleanup
- [ ] Supprimer les fichiers JSON orphelins dans `data/` (remplacés par Neon)
- [ ] Supprimer `src/pages/api/exposant/create.ts` (endpoint mort)
- [ ] Supprimer `src/pages/api/sponsor/create.ts` (endpoint mort)
- [ ] Vider ou supprimer `src/pages/dashboard/settings.astro` (page vide)

### Tech
- [ ] Migrer la gestion des articles blog vers Neon (pour éditer depuis le dashboard)
  — actuellement les .md ne sont éditables que via git (filesystem read-only sur Vercel)
- [ ] Ajouter Open Graph image dynamique par article (og:image avec titre + image)
- [ ] Ajouter sitemap.xml automatique pour les articles blog
- [ ] Corriger l'erreur TypeScript `p.slug` dans `[slug].astro:9` (utiliser seulement `p.id`)

### SEO suivi
- [ ] J+7 après mise en ligne : vérifier indexation GSC
- [ ] J+30 : analyser impressions / CTR / position moyenne par article
- [ ] Soumettre sitemap dans Google Search Console
