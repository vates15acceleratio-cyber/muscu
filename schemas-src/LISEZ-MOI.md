# Schémas d'exercices — prototype (164 exercices)

Sources des schémas d'exercices de l'app (intégrés depuis la 5.0.0). `schemas.js` (à la racine) en est le fichier **généré** : `node schemas-src/build-bundle.js`.
Icône = vue de profil ; clic = détail isométrique pose par pose (numéro + flèche de mouvement). Pas de silhouettes transparentes.

## Voir le résultat

- `schemas-src/apercu.html` (généré par `node schemas-src/build.js`, non versionné) : grille des 164 icônes, filtre par groupe, recherche, clic = détail isométrique.
- `schemas-src/out/svg/` (généré, non versionné) : un SVG par vue (`<id>-icon.svg`, `<id>-iso-<n>.svg`).

## Commandes

```bash
node schemas-src/build-bundle.js        # régénère schemas.js (à la racine) : à lancer après toute modification
node schemas-src/check.js               # 164/164 ids couverts, pas de NaN, pas de corps sous le sol, légendes EN complètes
node schemas-src/build.js               # aperçu local : apercu.html + out/svg
node schemas-src/sheet.js '^pec-' f.html  # planche de contrôle (icône + toutes les poses + profil) pour un groupe d'ids
```

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `schemas-core.js` | Moteur : squelette 3D articulé → SVG. Tourne dans Node **et** dans le navigateur (`MuscuSchemas`). Caméras `profile`, `iso`, `front`, `three`. |
| `schemas-data.js` | Charge les familles et complète nom / muscles / matériel **depuis `EXERCISE_LIBRARY` (app.js)** : ids et libellés ne sont jamais recopiés. |
| `build-bundle.js` | Assemble moteur + poses en un fichier navigateur unique : `../schemas.js`. |
| `data/*.js` | Poses et matériel par famille : `base` (20 premiers), `pec`, `dos`, `epaules`, `bras`, `jambes`, `abdos`, `fonctionnel`, `calli`. |
| `data/common.js` | Constantes et aides partagées (debout, allongé, appareil de tirage, etc.). |

## Ajouter ou corriger un exercice

Une entrée de `data/*.js` (l'`id` doit exister dans `EXERCISE_LIBRARY`) :

```js
{ id: 'q-squat', anchor: { x: ['ankle', 100], y: ['ankle', 224] }, floor: 230, opt: { stance: 14, grip: 30 },
  poses: [ pose('Debout', { torso: -88, thigh: 92, shin: 90, upper: 100, fore: -80 }),
           pose('Bas', { torso: -52, thigh: 8, shin: 108, upper: 110, fore: -70 }) ],
  equip: ({ P }) => E.barbell([P.shoulder[0] - 3, P.shoulder[1] + 2], 64), arrowRef: 'shoulder' }
```

- **Angles** en degrés, repère écran : `0` = vers l'avant, `90` = vers le bas, `-90` = vers le haut. Segments : `torso, thigh, shin, foot, upper, fore, head`.
- **Côtés** : `n:{…}` / `f:{…}` surchargent un côté (proche / éloigné de la caméra) pour les mouvements asymétriques.
- **Options de pose** : `abd` (bras écartés hors du plan), `lsp` (jambes écartées), `ik` (pieds posés à une position), `ground` (le tronc s'ajuste pour que deux points touchent le sol), `roll` (corps couché sur le côté), `lean` (inclinaison latérale), `shr` (haussement d'épaules), `rest` (recale sur le sol), `hip` (hanche absolue).
- **Matériel** : `E.barbell, dumbbell, ezbar, kettlebell, bench, adjBench, seat, crate, pullupBar, parallelBars, rings, wheel, wall, post, pulley, cable, rope, handle…`
- **Caméras** : `iconCam` (par défaut `profile`), `cams: { iso: { psi, phi } }` pour tourner la vue isométrique d'un exercice.

## Poids

| | Taille |
| --- | --- |
| SVG pré-rendus (493 fichiers) | 2,33 Mo bruts, environ 0,55 Mo compressés |
| Moteur + poses des 164 exercices (rendu à la volée dans l'app) | 115 Ko bruts, environ 24 Ko compressés |

L'app utilise le rendu à la volée (`schemas.js`, 124 Ko).

## Limites connues

- Les variantes de prise (pronation / supination / neutre) et certains détails (orientation des paumes) ne se voient pas : le schéma montre le mouvement, pas la position exacte des mains.
- Corps rigide : pas de flexion de la colonne (le crunch tourne le tronc d'un bloc), pas de rotation du buste (le Russian twist se montre par la direction des bras).
- Les poses ont été tracées à la main puis contrôlées visuellement ; les plus complexes (Turkish get-up, skin the cat, planches, drapeau) sont des approximations lisibles, pas des illustrations anatomiques.
