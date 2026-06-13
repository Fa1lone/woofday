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
- [ ] Ajouter `<link rel="canonical">` sur les 7 pages sans canonical
- [ ] Corriger le sitemap : les 3 URLs (`/`, `/exposants`, `/sponsor`) redirigent → remplacer par `www.woofday.fr/...`
- [ ] Corriger les 4 redirections sur les pages auditées (répondre directement sur l'URL canonique)
- [ ] Corriger le lien interne `/dashboard` → pointer directement sur `/dashboard/login`
- [ ] Ajouter `noindex` sur `/dashboard/login` (page auth)
- [ ] Ajouter `noindex` sur `/woofday-2026.ics` (fichier calendrier, non HTML)
- [ ] Créer une page 404 personnalisée avec lien retour accueil

### Sécurité — headers HTTP manquants
- [ ] Ajouter `Content-Security-Policy`
- [ ] Ajouter `X-Content-Type-Options: nosniff`
- [ ] Ajouter `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] Ajouter `Permissions-Policy`
- [ ] Ajouter `X-Frame-Options: SAMEORIGIN`
- [ ] Renforcer HSTS : ajouter `includeSubDomains`
- [ ] Publier un enregistrement DMARC dans le DNS (SPF ok, DMARC manquant)
- [ ] Créer `/.well-known/security.txt`

### Contenu & On-Page
- [ ] Écrire les meta descriptions manquantes (2 pages sans meta dont `/dashboard/login`)
- [ ] Retravailler les meta descriptions trop courtes/longues sur 7 pages (cible 140–160 car.)
- [ ] Retravailler les titles sur 9 pages (cible 50–60 car. avec mot-clé)
- [ ] Enrichir `/blog` : 412 mots seulement, H2 insuffisants
- [ ] Différencier les structures `/exposants` et `/sponsor` (templates trop proches → cannibalisation)
- [ ] Ajouter des H2 sur les 2 pages qui en sont dépourvues
- [ ] Remplacer les photos Unsplash par des photos originales de l'événement

### Données structurées (Schema.org)
- [ ] Ajouter JSON-LD `Event` sur la homepage (date 13 sept, lieu Ambérac, entrée gratuite)
- [ ] Ajouter JSON-LD `LocalBusiness` / `Organization` (nom, adresse, tél, zone Charente)
- [ ] Ajouter JSON-LD `FAQPage` sur `/exposants` et `/sponsor`

### Open Graph / Social
- [ ] Ajouter `og:image` sur les 9 pages (aucune n'en a)
- [ ] Ajouter `og:description` sur les 2 pages manquantes
- [ ] Ajouter `og:title` sur les 2 pages manquantes
- [ ] Ajouter `twitter:card` sur les 9 pages

### Performance / Images
- [ ] Optimiser les PNG lourds en WebP (dog-vizsla-debout-bleu.png = 2,7 Mo, dog-border-collie-sit-orange.png = 2,4 Mo, dog-border-collie-portrait-terre.png = 1,8 Mo, dog-terrier-assis-truffe.png = 1,6 Mo, dog-golden-assis2-vert.png = 1,4 Mo…)
- [ ] Réduire le JS inutilisé (35 KiB d'économie selon PSI)
- [ ] Améliorer le LCP mobile : actuellement 3 139 ms → cible < 2 500 ms

### Maillage interne & Conversion
- [ ] Mailler `/dashboard/login` (actuellement orpheline)
- [ ] Ajouter des CTA visibles (0 CTA de conversion détecté sur le site)
- [ ] Ajouter un lien Google Maps / itinéraire vers Ambérac
- [ ] Ajouter un lien vers la fiche Google Business Profile

### E-E-A-T & Entité de marque
- [ ] Créer une page "À propos" (événement, équipe, association, historique)
- [ ] Ajouter des preuves terrain : photos édition précédente, témoignages exposants
- [ ] Ajouter des profils sociaux : LinkedIn et/ou YouTube (seul Instagram détecté)
- [ ] Ajouter des données propriétaires : nb exposants, visiteurs, superficie…

### LLMO (IA)
- [ ] Corriger `llms.txt` : 0 URL citée alors que les sections sont présentes → ajouter les URLs des pages clés

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
