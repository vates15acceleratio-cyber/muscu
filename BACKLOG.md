# Muscu — idées à faire (backlog)

Idées notées pour plus tard. **Ce ne sont pas des engagements** : rien n'est codé sans que le propriétaire l'ait confirmé (proposer, faire confirmer, puis coder, tester et pousser).

## 1. Filtrer les exercices par équipement

Pouvoir filtrer la Bibliothèque (et le sélecteur d'exercices d'une séance ou d'un template) selon l'équipement : **Machine / Haltères / Barre / Rien**.

Points à traiter :
- Aujourd'hui, l'équipement est un texte libre avec environ 35 valeurs composées (ex. « Barre / Haltère », « Haltères + banc », « Aucun (partenaire) », « Barre + boîte »). Il faudra les **regrouper en catégories** et gérer les exercices qui relèvent de plusieurs équipements.
- Le filtre doit se **combiner** avec les filtres existants (groupe musculaire, Callisthénie) et la recherche.
- Les exercices perso ont leur propre liste d'équipements (`CUSTOM_EQUIPMENT_OPTIONS`) : la faire correspondre aux mêmes catégories.
- Ne pas modifier les valeurs d'équipement stockées (elles sont dans les données existantes) : ajouter une correspondance à l'affichage, comme pour la traduction.
- Prévoir la traduction anglaise des libellés du filtre (`i18n.js`).

## 2. Un schéma ou une image pour chaque exercice

Illustrer les exercices (aujourd'hui : texte de description et lien de démo YouTube).

À faire d'abord : **rechercher une base de données existante** d'images ou de schémas d'exercices, puis vérifier :
- la **licence** : peut-on l'utiliser et la redistribuer dans l'app ?
- la **couverture** : combien des 164 exercices actuels sont couverts, avec un plan B (dessins réalisés pour l'app) pour les manquants ?
- le **poids** : l'app est une PWA hors-ligne, les images seraient mises en cache par `sw.js` (contraintes de taille, format léger type WebP, éventuellement chargement à la demande).
- le **style** : cohérent avec l'app (fond sombre, or), sinon prévoir un traitement.
- la **correspondance** avec les ids d'exercices existants, sans changer ces ids (ils sont dans l'historique des utilisateurs).

Rappels : toute version qui touche aux données passe par le test du sandbox (voir `CLAUDE.md`), et l'écran de démarrage (Logo d'accueil) ne se modifie pas.
