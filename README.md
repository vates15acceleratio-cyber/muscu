# Muscu — v3

App perso de musculation. Single-file PWA, données 100% locales (localStorage), pas de serveur, pas de tracker.

## Nouveautés v3

- **Édition échauffement / étirements depuis la séance en cours** : bouton "Éditer la liste" dans chaque bloc → modal qui permet d'ajouter / modifier / réordonner / supprimer sans sortir de la séance
- **Noms d'exercices complets** partout (plus de "DC", "SDT", "DM", "KB", "PdC") — on dit maintenant "Développé couché", "Soulevé de terre", "Développé militaire", "kettlebell", "poids du corps"
- Badge type d'exo : "CORPS" au lieu de "PdC", "TEMPS" au lieu de "TIME"

## Nouveautés v2 (rappel)

- **Descriptions textuelles** pour les 138 exercices (position, mouvement, point technique clé)
- **Bouton "Voir une démo"** sur chaque exo qui ouvre une recherche YouTube
- **Timer de repos** auto-démarré à la validation d'un set, bandeau fixe en bas, contrôles ±15/30 s, pause, skip, bip + vibration en fin
- **Échauffement** : checklist en début de séance, items définis par template
- **Étirements guidés** : mode plein écran qui enchaîne les positions avec timer auto et gestion gauche/droite
- **Repos par défaut intelligent** selon le type d'exercice :
  - Compound chargé (squat, développé couché, soulevé de terre, développé militaire, rowing) : 2 min
  - Isolation chargée : 90 s
  - Poids du corps / lesté / assisté : 3 min
  - Abdos / gainage : 1 min
- **Réglages timer** : démarrage auto on/off, son, vibration, override global de la durée
- **Migration auto** des données v1 (rien à refaire côté utilisateur)

## Contenu du dossier

```
muscu/
├── index.html              # UI + CSS
├── app.js                  # Logique de l'app
├── sw.js                   # Service worker (cache offline)
├── manifest.webmanifest    # Manifest PWA
├── icon-192.svg            # Icône 192×192
├── icon-512.svg            # Icône 512×512
└── README.md               # Ce fichier
```

## Mise à jour depuis la v1

Si tu avais déjà la v1 déployée sur GitHub Pages :

1. Sur GitHub, va sur ton repo, supprime les anciens fichiers et upload les nouveaux d'un coup (ou édite chaque fichier individuellement).
2. Sur ton téléphone, ouvre l'app, **ferme-la complètement** (swipe depuis les apps récentes), puis rouvre. Le service worker détecte la nouvelle version et met l'app à jour.
3. **Tes données sont préservées** (templates, séances, exos custom). La migration s'applique automatiquement : repos par défaut, échauffements et étirements sont ajoutés aux templates A/B/C existants.

Pour forcer un refresh si l'app semble bloquée en v1 : désinstalle l'app du tel → relance depuis l'URL en mode navigateur → ré-installe via "Ajouter à l'écran d'accueil".

## Déploiement sur GitHub Pages (première fois)

### 1. Créer le repo

1. Crée un compte sur https://github.com (si pas déjà fait).
2. **New repository**, nom au choix (ex: `muscu`).
3. Coche **Public** (obligatoire pour Pages gratuit).
4. **Create repository**.

### 2. Uploader les fichiers

- Sur la page du repo, **uploading an existing file**.
- **Ouvre le dossier `muscu` sur ton PC**, sélectionne tous les **fichiers à l'intérieur** (Ctrl+A) — pas le dossier lui-même.
- Glisse les fichiers dans la fenêtre GitHub.
- **Commit changes**.

### 3. Activer Pages

1. **Settings** → **Pages**.
2. Source : **Deploy from a branch**.
3. Branch : **main**, dossier : **/(root)**, **Save**.
4. Attendre 1-2 min, l'URL apparaît : `https://<pseudo>.github.io/muscu/`.

## Installer sur ton téléphone

Une fois l'app accessible via l'URL GitHub Pages :

**iPhone (Safari)** : bouton **Partager** → **Sur l'écran d'accueil**.

**Android (Chrome / Vanadium)** : menu **⋮** → **Installer l'application** (ou **Ajouter à l'écran d'accueil**).

L'icône apparaît sur l'écran d'accueil et lance l'app en plein écran.

## Offline

Le service worker met l'app en cache à la première ouverture. Une fois installée, elle fonctionne complètement hors-ligne en salle.

## Utilisation

### Pendant la séance

- L'écran s'ouvre avec le bloc **échauffement** en haut (checklist), les exos au milieu, le bloc **étirements** en bas
- Coche les items d'échauffement au fur et à mesure
- Pour chaque exo : remplis reps + kg, clique le **✓** (case verte)
- À la validation, le **timer de repos** démarre automatiquement dans un bandeau fixe au-dessus de la nav
- Contrôles du timer : −15 s · pause/play · +30 s · Skip
- Le bip + vibration signalent la fin du repos
- En fin de séance, clique **Démarrer le mode guidé** dans le bloc étirements pour faire défiler les positions avec timer auto
- **Terminer la séance** quand c'est fait

### Personnaliser un template

- Onglet **Séances** → **⋮** sur une séance → **Modifier le template**
- Tu peux ajouter / réordonner / supprimer des exercices
- Pour chaque exo : séries × reps et **temps de repos**
- Tu peux éditer la liste d'échauffement et la liste d'étirements

### Réglages timer

- Onglet **Séances** → **⋯** en haut à droite → écran Réglages
- **Démarrage auto** : si off, le timer ne se lance plus automatiquement
- **Bip de fin** / **Vibration** : on/off
- **Durée par défaut** : par défaut, dépend du type d'exo. Tu peux forcer une durée globale unique.

### Coach automatique

À la fin de chaque séance, l'écran de bilan propose des cibles pour la prochaine fois :

| Type | Cibles atteintes | Sinon |
|---|---|---|
| Chargé compound | +5 kg | Garder la charge |
| Chargé isolation | +2,5 kg | Garder la charge |
| Poids du corps | +1 rep / set | Garder la cible |
| Lesté | +2,5 kg | Garder la charge |
| Assisté | −2,5 kg d'assistance | Garder l'assistance |
| Temps (gainage) | +10 s | Garder le temps |

Si sommeil < 6 h ou énergie < 5/10, suggestions deviennent **Maintenir** même si cibles atteintes.

Si chute marquée entre les sets (>35 %), suggestion **−5 %**.

## Données

- **Stockage** : `localStorage`, clé `muscu.v1` (compatible v1 et v2). Tout en local.
- **Sauvegarde** : Réglages → **Exporter mes données (JSON)**.
- **Restauration** : Réglages → **Importer un JSON**.
- **Analyse externe** : Réglages → **Export pour analyse Claude** — texte formaté à coller dans une conversation Claude.

## Licence

Code perso, fais-en ce que tu veux.
