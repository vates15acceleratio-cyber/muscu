# Muscu — notes pour Claude

PWA de musculation en JS vanilla (`index.html`, `app.js`, `i18n.js`, `i18n-desc.js`, `sw.js`), données 100 % locales.
Le français est la langue source ; l'anglais est un affichage traduit (voir `i18n.js`).

## Logo d'accueil — À CONSERVER

Le **Logo d'accueil** est l'écran affiché à chaque ouverture de l'app : une silhouette d'astronaute portant un engrenage doré, sur un ciel étoilé avec la devise **« PER ASPERA AD ASTRA »** (intégrée à l'image), et le texte **« Made by Vates Inc. »** en petit dessous. Il est voulu par le propriétaire pour la suite : **ne pas le retirer, le remplacer ni le modifier sans demande explicite.** (Il a déjà été remplacé deux fois, à la demande du propriétaire : dessin SVG, puis silhouette sur fond noir, puis la version actuelle avec ciel étoilé, en 4.52.)

Où il est :
- `index.html` : le balisage `#splash` (juste après `<body>`), son CSS (section « ÉCRAN DE DÉMARRAGE (Logo d'accueil) ») et un petit script inline qui le ferme.
- `splash.webp` : l'illustration recadrée, **engrenage effacé** (1340 × 1030).
- `splash-gear.webp` : l'engrenage seul, fond transparent (410 × 410), centré sur son axe de rotation.
- `splash-stars.webp` : atlas horizontal de 8 éclats d'étoiles (tuiles de 96 × 96) qui scintillent.
- `sw.js` : les trois images doivent rester dans `APP_SHELL` (cache hors-ligne). `index.html` les précharge aussi.

Règles à respecter :
- **2 secondes** d'affichage, ou un tap pour fermer, puis sortie par **glissement vers le haut**.
- **Aucun clignotement d'ensemble** : le propriétaire y est sensible. L'écran lui-même ne varie jamais en opacité ni en luminosité (pas de fondu d'entrée ni de sortie). Seuls de petits éléments locaux bougent : l'engrenage (rotation), les étincelles et 8 étoiles (scintillement doux, demandé par le propriétaire).
- **Engrenage** : un tour complet, dépasse de 5° (365°), puis revient à 360° (= sa position d'origine) en projetant des étincelles. 1,5 s au total, démarrage à 0,1 s, retour vers 1,03 s, étincelles jusqu'à environ 1,8 s : tout est fini avant la sortie à 2 s.
- **Étoiles** : un éclat additif (`mix-blend-mode: screen`) s'ajoute par-dessus l'étoile de l'image, l'étoile de l'image n'est pas effacée. Pas de flottement de la figure (le fond étoilé bougerait avec).
- Bords de l'image fondus vers le noir par un **masque fixe** (`mask-image`), sans animation. Le fond de l'écran est `#000`, le noir de l'image.
- `prefers-reduced-motion` : image fixe, sans étincelles ni scintillement, disparition sans transition.
- Le texte « Made by Vates Inc. » reste identique en français et en anglais, en petit (12 px), sans autre logo ni mention.
- Le script de fermeture est inline et indépendant de `app.js` : le logo ne peut pas rester bloqué si `app.js` échoue.

Réglages de la découpe (à recalculer si l'image change) : image source 2000 × 1126, recadrage (330, 20) → (1670, 1050). L'illustration d'origine n'est pas parfaitement concentrique (le trou central, l'anneau extérieur et le corps de l'engrenage ne partagent pas exactement le même centre). L'axe de rotation est la moyenne des trois, en (1001,79 ; 797,58) dans l'image source. Le calque d'engrenage est positionné à `left: 34,835 %; top: 55,590 %; width: 30,597 %` de la figure. La découpe n'a jamais touché à la devise (ne rien extraire sous y = 935 dans l'image source). Balancement mesuré : moins de 1,5 px CSS (objectif : moins de 1 px pour le trou et l'anneau). L'image source et le script de découpe ne sont pas dans ce dépôt (public) mais dans le dépôt privé `vates15acceleratio-cyber/general`, dossier `muscu-sandbox/logo/` (branche `claude/wizardly-carson-2bv49j`), avec un README qui décrit la méthode et la régénération : les scripts y redonnent exactement les images déployées. Pour changer l'image, refaire la découpe (séparer l'engrenage par transparence, effacer l'engrenage du fond, recalculer l'axe par ajustement de cercles, mesurer le balancement sur 8 angles).

## Versions

- Évolution notable : +0,1 (4.5 → 4.6). Correctif très mineur : au centième (4.51, 4.52…).
- Trois endroits toujours identiques : `APP_VERSION` (`app.js`), `CACHE_VERSION` (`sw.js`, préfixe `muscu-v`) et le titre du README.
- Un changement de numéro est nécessaire pour qu'une modification de `app.js` atteigne les appareils déjà installés (le JS est servi en cache-first par version).
- Une entrée « Nouveautés » dans le README à chaque version.

## Données de l'utilisateur — ne jamais les perdre

Historique, templates, exercices perso et réglages sont dans `localStorage` (clé `muscu.v1`). Ils doivent survivre à **toutes** les versions, et rester exportables / importables.

Règles :
- Tout changement de structure des données (séances, templates, exercices perso, réglages) s'accompagne de sa **migration** dans l'app (`State.migrate()`), **sans supprimer de champ existant**.
- L'export JSON (Réglages → Exporter mes données) doit toujours contenir l'historique, les templates, les exercices perso et les réglages.
- **Avant de pousser une version qui touche aux données, lancer le test du sandbox** (ci-dessous) et le corriger jusqu'à ce qu'il passe.
- **Prévenir le propriétaire** dans le message qui annonce la version : « cette version touche aux données, exporte avant de mettre à jour ».
- Le README dit, pour chaque version, si le format des données a changé.

Sandbox de test (données 100 % fictives, séparées de l'app) : dossier `muscu-sandbox/` du dépôt privé `vates15acceleratio-cyber/general` (branche `claude/wizardly-carson-2bv49j`). Il contient 24 séances d'historique en trois formats de sauvegarde (v1, v3, actuel avec supersets) et le script de test. Commande :

```bash
node muscu-sandbox/run-migration-test.js /chemin/vers/muscu   # code 0 = tout passe
```

Si le dépôt `general` n'est pas attaché à la session, l'ajouter d'abord (`add_repo`). Le fonctionnement, les fixtures et la façon de les mettre à jour sont décrits dans `muscu-sandbox/README.md`. Ne pas modifier les fixtures v1 et v3 ; pour un nouveau champ de données, compléter `current()` dans `generate-fixtures.js`. Ces données ne doivent jamais être ajoutées au dépôt `muscu` (public, publié sur Pages).

## Idées à faire

Les idées notées pour plus tard sont dans `BACKLOG.md` (à lire quand le propriétaire parle de « la prochaine fois » ou demande ce qui reste à faire). Ce ne sont pas des engagements.

## Déroulé habituel

- Une fonctionnalité est proposée, confirmée par le propriétaire, puis codée, testée (Playwright/Chromium) et poussée sur `main`.
- Les animations sont désactivées avec `prefers-reduced-motion` et n'utilisent pas d'opacité.
