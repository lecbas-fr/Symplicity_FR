# PRD — Site Symplicity (symplicity.fr)

## Problème initial
Cloner le site www.symplicity.fr en version moderne et classieuse, en conservant le nom
« Symplicity », en récupérant les contenus/bannières/logos d'origine. Inclure les pages
légales, un formulaire de contact fonctionnel, une optimisation SEO et Google Analytics.
**Langue de travail et d'interaction : FRANÇAIS.**

Demandes ultérieures :
- Suppression totale de MongoDB (envoi d'email uniquement)
- Intégration du CAPTCHA Cloudflare Turnstile sur le formulaire de contact
- (30/08/2026) Intégration des vrais actifs de marque + contenus officiels fournis via GitHub

## Architecture
- **Frontend** : React (CRA + craco), TailwindCSS + CSS modules, react-router-dom,
  react-helmet-async (SEO), react-turnstile, lucide-react, shadcn/ui
- **Backend** : FastAPI, `aiosmtplib` (envoi SMTP), `httpx` (validation Turnstile)
- **Base de données** : AUCUNE (MongoDB retiré volontairement)
- **Assets** : 100 % locaux dans `/app/frontend/public/assets/`
  (`logo/`, `symbol/`, `clients/`, `certifications/`, `photos/`, `pictos/`, `social/`, `img/`)

### Fichiers clés
- `src/data/mockData.js` — infos société, nav, clients, certifications, témoignages
- `src/data/siteContent.js` — textes officiels de toutes les pages + les 3 articles
- `src/components/Logo.jsx` — logo officiel (symbole dégradé + SYMPLICITY + baseline)
- `src/components/RichText.jsx` — rendu des blocs de contenu (h2/h3/p/ul/quote, gras `**`)
- `src/components/CtaSection.jsx` — bandeau CTA réutilisable
- `src/pages/News.jsx` + `Article.jsx` — page Actualités et article détaillé
- `backend/routes/contact.py` — validation Turnstile puis envoi email

### Charte graphique (v2 — 30/08/2026, thème clair sobre)
- Fonds : `--bg #fbfaf8` (ivoire), `--bg-alt #f3f0ea`, `--surface #ffffff`
- Texte : `--ink #17141f`, `--body #5c5866`, `--muted #8e8a96`
- Accent : `--accent #0e6e7a` (teal profond) — le dégradé vert/cyan de la charte
  est réservé au symbole du logo (plus de dégradés flashy dans l'interface)
- Bordures fines `--border #e7e2d9`, rayons 4 px, aucune ombre portée, aucun effet
  de verre, aucune particule animée
- Typo : Poppins 600 (titres, casse normale) / Inter (texte), interlignes généreux

### Routes
`/`, `/rgpd`, `/cybersecurite`, `/infogerance`, `/actualites`, `/actualites/:slug`,
`/contact`, `/qui-sommes-nous`, `/nos-engagements`, `/mentions-legales`,
`/politique-de-confidentialite`, `/rgpd-vos-donnees`

### API
- `POST /api/contact` — valide le token Turnstile auprès de Cloudflare puis envoie l'email.
  400 si token manquant/invalide (clé secrète configurée), 503 si Cloudflare indisponible.

## Réalisé
### Itérations précédentes
- Clone complet du site, design « Tech Elegant », pages légales, formulaire de contact
- SEO dynamique (react-helmet-async) + Google Analytics
- Suppression de MongoDB (motor/pymongo retirés, aucune persistance)
- Intégration Cloudflare Turnstile (front + validation back)

### 30/08/2026 — Intégration de la marque et des contenus officiels
- Récupération du dépôt GitHub `lecbas-fr/Symplicity_FR` (logos/médias, export HTML des
  14 pages, PDF des captures) ; sources conservées dans `/app/memory/source/`
- Tous les visuels hébergés en local → **plus aucune dépendance à Wix / customer-assets**
- Nouveau logo officiel Symplicity (header, footer, favicon, image Open Graph générée)
- Palette officielle appliquée à l'ensemble du site via variables CSS
- Textes officiels repris à l'identique : RGPD, Cybersécurité, Infogérance,
  Nos engagements, Qui sommes-nous, Contact (+ horaires), Mentions légales,
  Politique de confidentialité, RGPD/vos données
- Nouvelle page **Actualités** + 3 articles complets (IA & cybersécurité,
  Starware devient Symplicity, Conformité RGPD en Essonne)
- Vrais logos clients (Eiffage, Ballainvilliers, Guignes, Clinique de Grosbois,
  Fontenay-lès-Briis, Groupe BTL, MLO) et certifications (Microsoft, ExpertCyber, ITIL,
  ISO 27001, ISO 27005, CNIL, Cybermalveillance)
- Mentions légales mises à jour (Symplicity, 38 rue des Processions, hébergeur Emergent),
  téléphone unifié 01 85 450 300
- JSON-LD `LocalBusiness` ajouté pour le SEO local
- Images compressées (assets ≈ 4,4 Mo au total)
- Backend : token Turnstile désormais **obligatoire** quand la clé secrète est configurée
- Tests : rapport `/app/test_reports/iteration_1.json` — 7/7 backend, 14/14 routes,
  0 image cassée, overflow mobile corrigé

### 30/08/2026 (2) — Allègement du style + demandes complémentaires
- **Refonte en thème clair sobre** (demande : « le style est lourd, trop flashy et pas
  classe ») : tous les fichiers CSS réécrits, suppression de `ParticleBackground` de
  toutes les pages, plus d'effets de verre / lueurs / dégradés d'arrière-plan
- Hero éditorial en deux colonnes (texte + photo), titres en casse normale
- `sitemap.xml` (14 URLs) + `robots.txt` ajoutés dans `frontend/public/`
- Formulaire de contact repris à l'identique de l'original : Prénom, Nom de famille,
  E-mail, Téléphone, Société, Fonction, Message (le champ « Sujet » a disparu).
  Backend aligné : `first_name` / `last_name` / `position`, e-mail HTML mis à jour
- Page Contact : horaires d'ouverture et adresse e-mail retirés du bloc coordonnées
  (l'e-mail reste dans le footer)
- Carrousel de témoignages (flèches + puces, défilement auto 7 s) avec logo client,
  fonction et société. ⚠️ Les témoignages 2 et 3 sont **FICTIFS** (Claire Fontaine /
  Commune de Guignes, Marc Delaunay / Clinique de Grosbois) — à valider ou remplacer
- Tests : `/app/test_reports/iteration_2.json` — 9/9 backend, 14/14 routes,
  0 image cassée, 0 débordement responsive (390 px et 768 px)

## Points d'attention
- **Turnstile en preview** : le widget affiche « Unable to connect » car le domaine preview
  n'est pas whitelisté dans le dashboard Cloudflare. Comportement ATTENDU.
  → Ajouter le domaine dans Cloudflare ou tester en production.
- La clé `REACT_APP_TURNSTILE_SITE_KEY` doit être présente dans les Custom Keys Emergent
  pour la production.

## Backlog
### P1
- Bannière de consentement cookies (présente sur le site d'origine)
- `sitemap.xml` + `robots.txt`
- Google Analytics : vérifier l'ID de mesure réel (GA4)

### P2
- Page « Nos clients » détaillée avec témoignages multiples
- Formulaire de contact : champs Prénom / Nom / Fonction séparés comme sur l'original
- Version anglaise du site
