# Muscu — notes pour Claude

PWA de musculation en JS vanilla (`index.html`, `app.js`, `i18n.js`, `i18n-desc.js`, `sw.js`), données 100 % locales.
Le français est la langue source ; l'anglais est un affichage traduit (voir `i18n.js`).

## Logo d'accueil — À CONSERVER

Le **Logo d'accueil** est l'écran affiché à chaque ouverture de l'app : une silhouette d'astronaute avec un engrenage doré qui tourne, et le texte **« Made by Vates Inc. »**. Il est voulu par le propriétaire pour la suite : **ne pas le retirer, le remplacer ni le modifier sans demande explicite.**

Où il est :
- `index.html` : le balisage `#splash` (juste après `<body>`), son CSS (section « ÉCRAN DE DÉMARRAGE ») et un petit script inline qui le ferme.
- `splash.webp` : l'astronaute, engrenage effacé (1012 × 880).
- `splash-gear.webp` : l'engrenage seul, fond transparent (410 × 410), qui tourne par-dessus.
- `sw.js` : les deux images doivent rester dans `APP_SHELL` (cache hors-ligne). `index.html` les précharge aussi.

Règles à respecter :
- **2 secondes** d'affichage, ou un tap pour fermer, puis sortie par **glissement vers le haut**.
- **Aucun fondu, aucune variation d'opacité** : le propriétaire est sensible au clignotement. Mouvement seul (translation, rotation).
- L'engrenage fait un tour en 3 s ; l'astronaute flotte légèrement.
- `prefers-reduced-motion` : image fixe, disparition sans transition.
- Le fond du logo est `#050505`, le même noir que l'image, pour qu'elle s'y fonde sans bord visible.
- Le texte « Made by Vates Inc. » reste identique en français et en anglais, sans autre logo ni mention.
- Le script de fermeture est inline et indépendant de `app.js` : le logo ne peut pas rester bloqué si `app.js` échoue.

Axe de rotation (ne pas y toucher sans recalculer) : l'illustration d'origine n'est pas parfaitement concentrique (le trou central et l'anneau extérieur sont décalés d'environ 3 px). L'axe est placé entre les deux, en (833,14 ; 739,81) dans l'image source de 1672 × 941. Le fond est recadré sur (330, 10) → (1342, 890), et le calque d'engrenage (centré sur l'axe) est positionné à `left: 29,460 %; top: 59,637 %; width: 40,514 %` de la figure. Si l'image change, refaire la découpe, recalculer l'axe et mesurer le balancement (objectif : moins de 1 px CSS).

## Versions

- Évolution notable : +0,1 (4.5 → 4.6). Correctif très mineur : au centième (4.51, 4.52…).
- Trois endroits toujours identiques : `APP_VERSION` (`app.js`), `CACHE_VERSION` (`sw.js`, préfixe `muscu-v`) et le titre du README.
- Un changement de numéro est nécessaire pour qu'une modification de `app.js` atteigne les appareils déjà installés (le JS est servi en cache-first par version).
- Une entrée « Nouveautés » dans le README à chaque version.

## Déroulé habituel

- Une fonctionnalité est proposée, confirmée par le propriétaire, puis codée, testée (Playwright/Chromium) et poussée sur `main`.
- Les animations sont désactivées avec `prefers-reduced-motion` et n'utilisent pas d'opacité.
