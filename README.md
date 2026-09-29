# Muscu — v4.3

App perso de musculation. Single-file PWA, données 100% locales (localStorage), pas de serveur, pas de tracker.

## Nouveautés v4.3

- **Fix : plus de clignotement de l'écran.** Jusqu'ici, chaque re-rendu (valider un set, lier / défaire / inverser un superset, changer d'onglet) rejouait un fondu qui faisait tomber toute la page à l'opacité 0 avant de la ré-afficher. Le fondu d'entrée n'est plus joué qu'à un vrai changement d'écran, et il est remplacé par un léger glissement **sans variation de luminosité**. L'écran de repos plein écran apparaît lui aussi sans fondu, et les animations de superset n'utilisent plus que du mouvement (aucun changement d'opacité)

## Nouveautés v4.2

- **Supersets** : entre deux exercices adjacents, un bouton chaîne **« Superset ? »** les lie d'un tap. Un superset compte **2 exercices maximum** : un exercice déjà lié n'est plus proposé pour un autre lien. Le lien se **fait et se défait à volonté**, rien n'est jamais verrouillé
  - **Dans la séance en cours** (onglet Exercices) **et dans l'éditeur de template** : un superset enregistré dans un template revient à chaque nouvelle séance. Les templates par défaut (Haut/Bas/Core) n'en contiennent aucun
  - Les deux cartes sont reliées par une chaîne, avec les pastilles **A** et **B** et une barre dorée sur le côté. Le bouton **Défaire** (chaîne cassée) supprime le lien
  - **Timer** : l'exercice **B dirige le repos**. Valider un set de A ne lance aucun timer ; valider un set de B lance le timer avec **le temps de repos de B** (sauf sur son dernier set). Le bouton **Inverser** échange A et B pour changer celui qui dirige
  - **Autant de sets pour A et B** : au moment du lien, le plus petit est complété. **+ Ajouter un set** sur l'un l'ajoute aux deux ; supprimer un set vierge retire aussi celui du même rang chez l'autre
  - L'alternance A → B → A → B n'est pas imposée par l'écran : tu coches les sets dans l'ordre que tu veux
  - **Monter / Descendre** déplace la paire d'un bloc. **Supprimer ou remplacer** un exercice lié défait le lien (l'autre exercice reste seul)
  - **Animations** à la création (les cartes se rapprochent, la chaîne se referme), à la rupture (la chaîne se brise, les cartes s'écartent) et à l'inversion. Elles sont désactivées si le téléphone est réglé sur « réduire les animations »

## Nouveautés v4.1

- **Traduction complète en anglais** : un petit drapeau (🇫🇷 / 🇬🇧) en haut de l'écran principal « Séances », à côté de l'engrenage, bascule toute l'app entre français et anglais. Le choix est mémorisé sur l'appareil (clé `muscu.lang`) et le français reste la langue par défaut
- **Tout est traduit** : interface, messages, bibliothèque (noms, muscles, équipements et descriptions des exercices), templates Haut/Bas/Core avec leurs échauffements et étirements, recommandations du coach, dates, export texte
- **Tes données ne changent pas** : l'historique, les identifiants et les exercices personnalisés restent tels quels. Seul l'affichage est traduit, donc tu peux changer de langue à tout moment sans rien perdre. Les textes que tu as saisis toi-même (nom d'un template renommé, exercice perso, ligne d'échauffement modifiée, notes) restent dans ta langue de saisie
- **Timer de repos en plein écran** : valider un set ouvre un écran de repos (nom de l'exercice, gros décompte, barre de progression, −15 s / pause / +30 s, Skip). Il se ferme tout seul à la fin du repos (bip + vibration). **Sur le dernier set d'un exercice, aucun timer ne se lance**
- Nouveaux fichiers `i18n.js` (moteur + interface) et `i18n-desc.js` (descriptions d'exercices en anglais), mis en cache hors-ligne comme le reste

## Nouveautés v4

- **Parcours de séance en écrans distincts** : au lieu d'une longue page à faire défiler, la séance active s'ouvre maintenant sur un écran "Conditions de récup", puis 3 onglets librement navigables — **Échauffement**, **Exercices**, **Étirements** — chacun avec sa progression affichée (ex: 3/6). Bandeau d'onglets collé sous l'en-tête pendant le scroll. Le bouton "Continuer"/"Passer aux..." avance dans l'ordre, mais tu peux taper n'importe quel onglet à tout moment. Les conditions restent modifiables via l'icône crayon en haut de l'onglet Échauffement
- **Icône ⚙️** à la place des "..." pour accéder aux Réglages
- **Moins de saisie au clavier** : "Repas avant" (Non/Léger/Oui) et "Équipement" + "Muscles secondaires" en création d'exercice perso sont maintenant des choix à taper au lieu de champs texte libres
- **Passe graphique** : même palette (fond sombre, accent doré), mais plus de relief — ombres sur les cartes, dégradés sur les badges/boutons/pastilles actives, glow doré sur les CTA et la barre de progression du timer, pastille pleine derrière l'onglet actif de la nav du bas, transition douce à chaque changement d'écran. Le graphique de Progression a maintenant un remplissage dégradé sous la courbe et un point mis en valeur sur la dernière valeur
- **Callisthénie** : 25 nouveaux mouvements skills (muscle-up, front lever, back lever, planche, pistol squat, L-sit / V-sit, human flag, archer pull-up/push-up, handstand, skin the cat...) avec description technique complète
- **Filtre "Callisthénie"** dans la bibliothèque : regroupe les nouveaux skills + les mouvements poids du corps déjà présents qui sont des classiques de la callisthénie (tractions, dips, pompes, gainages, nordic curl...). Combinable avec la recherche et les filtres par groupe musculaire
- **Templates par défaut simplifiés** : les anciennes Séances A/B/C/D sont remplacées par 3 templates organisés en split — **Haut du corps**, **Bas du corps** et **Core** — chacun avec échauffement et étirements dédiés. Si tu avais déjà des séances sauvegardées, les nouveaux templates s'ajoutent et les anciens A/B/C/D sont retirés automatiquement (ton historique de séances déjà enregistrées n'est jamais touché). Comme tout template, ils restent 100% éditables : ajoute, retire ou remplace des exercices, y compris des mouvements de callisthénie, pour les adapter à ta pratique
- **Fix** : la position de scroll ne saute plus en haut de l'écran à chaque fois que tu coches un set pendant une séance
- **Fix** : l'écran reste allumé pendant une séance active (Wake Lock), pour que le bip de fin de repos sonne à l'heure même si tu ne touches pas le téléphone
- **Dead bug** ajouté à la bibliothèque (Abdos / Callisthénie)
- **Créer un exercice personnalisé directement depuis le sélecteur** (dans une séance ou un template), sans avoir à repasser par l'onglet Bibliothèque. Le muscle et le filtre "Callisthénie" actifs sont pré-remplis, et tu peux marquer un exo perso comme callisthénie pour qu'il ressorte dans ce filtre
- **Étirements guidés : choix du premier côté** (Gauche/Droite) dans Réglages → Étirements
- **Sauvegarde de secours automatique** : une copie de l'état précédent est gardée à chaque sauvegarde. Si le stockage local est corrompu, l'app restaure automatiquement cette copie au lieu de perdre tout l'historique
- **Fix UI** : le graphique de Progression n'affiche plus deux dates superposées et illisibles quand il n'y a qu'une seule séance enregistrée
- **Fix UI** : le titre de la séance dans l'en-tête ne passe plus sur 2 lignes (ellipsis) — l'en-tête sticky ne mange plus d'espace en permanence pendant le scroll
- **Fix UI** : un fondu indique désormais qu'il y a d'autres filtres à scroller horizontalement dans la Bibliothèque
- **Fix UI** : les icônes emoji des écrans vides (Séances / Historique / Progression) remplacées par des icônes SVG cohérentes avec le reste de l'app

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
├── i18n.js                 # Traduction FR / EN (moteur + interface + noms d'exercices)
├── i18n-desc.js            # Descriptions d'exercices en anglais
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
3. **Tes données sont préservées** (templates, séances, exos custom). La migration s'applique automatiquement : repos par défaut, échauffements et étirements sont ajoutés à tes templates existants. Depuis la v4, les anciennes séances A/B/C/D par défaut sont remplacées par **Haut du corps**, **Bas du corps** et **Core** ; ton historique de séances enregistrées n'est jamais touché.

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

Depuis la v4, dès qu'une mise à jour est détectée, l'app se recharge automatiquement une fois pour l'appliquer (plus besoin de fermer/rouvrir manuellement). Si l'app semble bloquée sur une ancienne version malgré tout (ex: juste après avoir déployé une mise à jour), ferme-la complètement (swipe depuis les apps récentes) puis rouvre-la — l'auto-reload prendra le relais pour toutes les mises à jour suivantes.

## Utilisation

### Pendant la séance

- La séance s'ouvre sur un écran **Conditions de récup** (sommeil, énergie, repas avant : Non / Léger / Oui), puis **Continuer**
- Ensuite 3 onglets librement navigables, chacun avec sa progression (ex: 3/6) : **Échauffement**, **Exercices**, **Étirements**. Le bouton **Continuer** / **Passer aux…** avance dans l'ordre, mais tu peux taper n'importe quel onglet à tout moment
- Les conditions restent modifiables via la ligne « Conditions de récup » en haut de l'onglet Échauffement
- Onglet **Échauffement** : coche les items au fur et à mesure (**Éditer la liste** pour les modifier sans quitter la séance)
- Onglet **Exercices** : pour chaque exo, remplis reps + kg, clique le **✓** (case verte). Maintenir le **✓** appuyé supprime le set
- À la validation d'un set, le **timer de repos** s'ouvre automatiquement en plein écran (sauf sur le dernier set de l'exercice, où rien ne se lance)
- Contrôles du timer : −15 s · pause/play · +30 s · Skip (ferme l'écran de repos pour revenir à la saisie)
- Le bip + vibration signalent la fin du repos
- Onglet **Étirements** : **Démarrer le mode guidé** fait défiler les positions avec timer auto ; tes notes / ressenti se saisissent au même endroit
- L'écran reste allumé pendant la séance pour que le bip de fin de repos sonne à l'heure
- **Terminer la séance** quand c'est fait

### Personnaliser un template

- Onglet **Séances** → **⋯** sur la carte d'une séance → **Modifier le template** (ou **Dupliquer** / **Supprimer**)
- Tu peux ajouter / réordonner / supprimer des exercices
- Pour chaque exo : séries × reps et **temps de repos**
- Tu peux éditer la liste d'échauffement et la liste d'étirements

### Réglages timer

- Onglet **Séances** → icône **⚙️** en haut à droite → écran Réglages
- **Démarrage auto** : si off, le timer ne se lance plus automatiquement
- **Bip de fin** / **Vibration** : on/off
- **Durée par défaut** : par défaut, dépend du type d'exo. Tu peux forcer une durée globale unique.
- **Étirements → Premier côté** : Gauche ou Droite, pour le côté par lequel démarre le mode guidé des étirements « par côté »

### Supersets

- Onglet **Exercices** (ou éditeur de template) : appuie sur **Superset ?** entre deux exercices pour les lier en **A** et **B**
- Enchaîne un set de A puis un set de B ; le timer de repos ne part qu'à la validation d'un set de B
- **Inverser** change quel exercice dirige le repos ; **Défaire** supprime le lien

### Bibliothèque

- Onglet **Biblio** : recherche + filtres par groupe muscu, plus le filtre **Callisthénie**
- Tape un exercice pour voir sa **description** technique et ouvrir une **démo YouTube**
- **+ Custom** crée un exercice perso (nom, type, muscles, équipement). Depuis le sélecteur d'une séance ou d'un template, **Créer un exercice personnalisé** pré-remplit le muscle et le filtre actifs

### Langue

- Le drapeau 🇫🇷 / 🇬🇧 en haut de l'écran **Séances** bascule l'app entre français et anglais (choix mémorisé)

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
- **Filet de sécurité** : une copie de l'état précédent est gardée dans `muscu.v1.bak` à chaque sauvegarde. Si `muscu.v1` devient illisible, l'app restaure automatiquement cette copie au démarrage.
- **Sauvegarde** : Réglages → **Exporter mes données (JSON)**.
- **Restauration** : Réglages → **Importer un JSON**.
- **Analyse externe** : Réglages → **Export pour analyse Claude** — texte formaté à coller dans une conversation Claude.

## Licence

Code perso, fais-en ce que tu veux.
