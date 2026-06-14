# Muscu

App perso de musculation. Single-file PWA, données 100% locales (localStorage), pas de serveur, pas de tracker.

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

## Déploiement sur GitHub Pages

### 1. Créer le repo

1. Créer un compte sur https://github.com (si pas déjà fait).
2. Cliquer sur **New repository**, nom au choix (ex: `muscu`).
3. Cocher **Public** (obligatoire pour Pages gratuit).
4. Cliquer **Create repository**.

### 2. Uploader les fichiers

Soit en glisser-déposer dans l'interface web :
- Sur la page du repo, cliquer sur **uploading an existing file**.
- Glisser tous les fichiers du dossier `muscu/` (index.html, app.js, sw.js, manifest.webmanifest, icon-192.svg, icon-512.svg).
- Cliquer **Commit changes**.

Soit en CLI git si tu préfères.

### 3. Activer Pages

1. Repo → **Settings** → **Pages** (menu de gauche).
2. Source : **Deploy from a branch**.
3. Branch : **main**, dossier : **/(root)**, cliquer **Save**.
4. Attendre 1-2 min, l'URL apparaît en haut : `https://<pseudo>.github.io/muscu/`.

## Installer sur ton téléphone

Une fois l'app accessible via l'URL GitHub Pages :

### iPhone (Safari)

1. Ouvrir l'URL dans **Safari** (pas Chrome — iOS bloque l'install PWA hors Safari).
2. Appuyer sur le bouton **Partager** (carré avec flèche vers le haut).
3. Faire défiler et choisir **Sur l'écran d'accueil**.
4. Confirmer **Ajouter**.

### Android (Chrome)

1. Ouvrir l'URL dans **Chrome**.
2. Menu **⋮** en haut à droite.
3. Choisir **Installer l'application** (ou **Ajouter à l'écran d'accueil**).
4. Confirmer.

L'icône apparaît sur l'écran d'accueil et lance l'app en plein écran, comme une vraie app native.

## Offline

Le service worker met l'app en cache à la première ouverture. Une fois installée, elle fonctionne complètement hors-ligne en salle, même sans réseau. Les données sont sauvegardées au fil de l'eau dans le localStorage du navigateur.

## Données

- **Stockage** : `localStorage`, clé `muscu.v1`. Tout en local sur ton appareil.
- **Sauvegarde** : Réglages → **Exporter mes données (JSON)** pour télécharger un backup.
- **Restauration** : Réglages → **Importer un JSON**.
- **Analyse externe** : Réglages → **Export pour analyse Claude** copie un résumé texte de toutes tes séances, à coller dans une conversation avec Claude pour analyse approfondie.

## Mise à jour de l'app

Quand tu pousses une nouvelle version sur GitHub :
1. Modifie les fichiers, commit.
2. Pour invalider le cache offline, bumper `CACHE_VERSION` dans `sw.js` (ex: `muscu-v1` → `muscu-v2`).
3. À la prochaine ouverture connectée, l'app se met à jour. **Tes données restent intactes** (elles sont dans localStorage, indépendamment du code).

## Données pré-chargées

Trois templates sont fournis par défaut au premier lancement :
- **Séance A** : Squat / DC barre / Tirage horizontal / Élévations lat / Curl haltères / Gainage 60s
- **Séance B** : SDT roumain / DM haltères / Tractions / Fentes / Pompes / Mollets
- **Séance C** : Presse / DC incliné haltères / Rowing barre / Leg curl / Élévations lat / Triceps poulie

Tu peux modifier, dupliquer, supprimer, et créer de nouveaux templates depuis l'écran Séances.

## Bibliothèque d'exercices

~135 exercices pré-listés, filtrables par muscle. Tu peux ajouter des exercices custom depuis l'onglet Biblio (bouton **+ Custom** en haut à droite).

## Types d'exercices

- **Chargé** : reps × kg (la plupart des barres/haltères/machines)
- **Poids du corps** : reps seules (pompes, tractions strictes…)
- **Lesté** : reps × +kg (dips lestés, tractions lestées…)
- **Assisté** : reps × −kg (assistance, tractions assistées…)
- **Temps** : durée en secondes (gainage)

Quand un exercice peut être fait dans plusieurs modes (ex: tractions strictes + assistées dans la même séance), tu peux changer le mode par défaut des sets vides via le menu **⋯** de l'exo, ou le détailler set par set en éditant l'historique.

## Coach automatique

À la fin de chaque séance, l'écran de bilan propose des cibles pour la prochaine fois selon une logique simple :

| Type | Cibles atteintes | Sinon |
|---|---|---|
| Chargé compound (squat/DC/SDT/DM/rowing) | +5 kg | Garder la charge |
| Chargé isolation | +2,5 kg | Garder la charge |
| Poids du corps | +1 rep / set | Garder la cible |
| Lesté | +2,5 kg | Garder la charge |
| Assisté | −2,5 kg d'assistance | Garder l'assistance |
| Temps (gainage) | +10 s | Garder le temps |

Si sommeil < 6 h ou énergie < 5/10 cette séance, les suggestions deviennent **Maintenir** même si les cibles ont été atteintes (la perf est probablement un faux positif lié à un état trop bon ou trop mauvais).

Si chute marquée entre les sets (>35 % par rapport au premier set), suggestion **−5 %** pour rétablir une exécution propre.

## Licence

Code perso, fais-en ce que tu veux.
