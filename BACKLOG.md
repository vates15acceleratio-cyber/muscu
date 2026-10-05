# Muscu — idées à faire (backlog)

Idées notées pour plus tard. **Ce ne sont pas des engagements** : rien n'est codé sans que le propriétaire l'ait confirmé (proposer, faire confirmer, puis coder, tester et pousser).

## Demandées par le propriétaire

### 1. Filtrer les exercices par équipement

Pouvoir filtrer la Bibliothèque (et le sélecteur d'exercices d'une séance ou d'un template) selon l'équipement : **Machine / Haltères / Barre / Rien**.

Points à traiter :
- Aujourd'hui, l'équipement est un texte libre avec environ 35 valeurs composées (ex. « Barre / Haltère », « Haltères + banc », « Aucun (partenaire) », « Barre + boîte »). Il faudra les **regrouper en catégories** et gérer les exercices qui relèvent de plusieurs équipements.
- Le filtre doit se **combiner** avec les filtres existants (groupe musculaire, Callisthénie) et la recherche.
- Les exercices perso ont leur propre liste d'équipements (`CUSTOM_EQUIPMENT_OPTIONS`) : la faire correspondre aux mêmes catégories.
- Ne pas modifier les valeurs d'équipement stockées (elles sont dans les données existantes) : ajouter une correspondance à l'affichage, comme pour la traduction.
- Prévoir la traduction anglaise des libellés du filtre (`i18n.js`).

### 2. ~~Un schéma ou une image pour chaque exercice~~ — **FAIT en 5.0.0**

Réalisé avec des schémas **générés par l'app** (moteur SVG `schemas.js`, poses dans `schemas-src/`) plutôt qu'une base d'images externe : aucune question de licence, ~124 Ko pour les 164 exercices, hors ligne, style sombre et or, ids d'exercices inchangés. Icône de profil dans les listes, détail isométrique pose par pose dans la fiche. Voir `CLAUDE.md` (section « Schémas d'exercices »).

Notes de départ (conservées) :

Illustrer les exercices (aujourd'hui : texte de description et lien de démo YouTube).

À faire d'abord : **rechercher une base de données existante** d'images ou de schémas d'exercices, puis vérifier :
- la **licence** : peut-on l'utiliser et la redistribuer dans l'app ?
- la **couverture** : combien des 164 exercices actuels sont couverts, avec un plan B (dessins réalisés pour l'app) pour les manquants ?
- le **poids** : l'app est une PWA hors-ligne, les images seraient mises en cache par `sw.js` (contraintes de taille, format léger type WebP, éventuellement chargement à la demande).
- le **style** : cohérent avec l'app (fond sombre, or), sinon prévoir un traitement.
- la **correspondance** avec les ids d'exercices existants, sans changer ces ids (ils sont dans l'historique des utilisateurs).

Rappels : toute version qui touche aux données passe par le test du sandbox (voir `CLAUDE.md`), et l'écran de démarrage (Logo d'accueil) ne se modifie pas.

## Brainstorming — à trier plus tard

Idées proposées par Claude, toutes gardées pour l'instant. Le propriétaire fera le tri ; aucune n'est priorisée ni validée.

### Pendant la séance
3. **Voir la dernière performance** : afficher, à côté de chaque exercice, ce qui avait été fait la dernière fois (charge × reps). Aujourd'hui l'app n'affiche que la cible.
4. **Préremplir avec les suggestions du coach** : le bilan de fin de séance propose la charge suivante (`suggestNextTargets`), mais la séance suivante ne la reprend pas. Elle pourrait préremplir les champs.
5. **Calculateur de disques** : pour une charge donnée à la barre, indiquer les disques à mettre de chaque côté.
6. **Note ou RPE par exercice** : un ressenti noté exercice par exercice, en plus des notes de la séance.

### Suivi
7. **Volume par groupe musculaire** : tonnage ou nombre de séries par semaine et par muscle, pour repérer ce qui est sous-travaillé.
8. **Suivi du poids de corps** avec une courbe, dans l'écran Progression.
9. **Calendrier de l'historique** : vue mensuelle des jours entraînés, avec le nombre de séances par semaine.
10. **Estimation du 1RM** (charge maximale pour une répétition) à partir des séries, avec sa courbe.

### Données
11. **Rappel d'export** : une bannière après N séances sans sauvegarde, puisque l'historique n'existe que dans le navigateur.
12. **Export CSV** de l'historique, pour un tableur.
13. **Inclure la langue dans l'export JSON** : elle est aujourd'hui dans une clé séparée (`muscu.lang`) et n'est pas sauvegardée. Petit correctif de données : à passer par le test du sandbox.

### Apparence
14. ~~**Thème clair**~~ — **REFUSÉ par le propriétaire (2026-10-05) : ne pas le reproposer.** Le réglage `theme` reste dans les données (ne pas le supprimer) mais seul le thème sombre existe.
