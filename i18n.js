/* ==========================================================================
   Muscu — Traduction FR / EN
   Le français reste la langue source : tout le code et les données stockées
   (historique, ids, muscles, équipements) restent en français. Seul
   l'AFFICHAGE est traduit, via tr() / tf(), en cherchant la chaîne française
   exacte dans un dictionnaire. Une chaîne absente du dictionnaire (ex: nom
   saisi par l'utilisateur) est affichée telle quelle.
   ========================================================================== */

const LANG_KEY = 'muscu.lang';
let _lang = 'fr';
try {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved === 'en' || saved === 'fr') _lang = saved;
} catch (e) { /* stockage indisponible : on reste en français */ }

function getLang() { return _lang; }

function setLang(lang) {
  _lang = lang === 'en' ? 'en' : 'fr';
  try { localStorage.setItem(LANG_KEY, _lang); } catch (e) { /* ignore */ }
  document.documentElement.lang = _lang;
  applyStaticTranslations();
}

/* Textes du HTML statique (nav du bas) : le français d'origine est mémorisé
   dans data-fr au premier passage, puis on réécrit selon la langue. */
function applyStaticTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(node => {
    if (!node.dataset.fr) node.dataset.fr = node.textContent.trim();
    node.textContent = tr(node.dataset.fr);
  });
}

/* --- Dictionnaire FR -> EN (interface) --- */
const I18N_UI = {
  // Types d'exercice
  'Chargé': 'Loaded', 'Poids du corps': 'Bodyweight', 'Lesté': 'Weighted', 'Assisté': 'Assisted', 'Temps': 'Time',
  'CORPS': 'BODY', 'TEMPS': 'TIME',

  // Navigation & écrans
  'Séances': 'Workouts', 'Historique': 'History', 'Progression': 'Progress', 'Biblio': 'Library',
  'Bibliothèque': 'Library', 'Réglages': 'Settings', 'Séance': 'Workout', 'Retour': 'Back',

  // Génériques
  'Fermer': 'Close', 'Annuler': 'Cancel', 'Confirmer': 'Confirm', 'Confirmation': 'Confirmation',
  'Enregistrer': 'Save', 'Enregistré': 'Saved', 'Supprimer': 'Delete', 'Supprimé': 'Deleted',
  'Modifier': 'Edit', 'Éditer': 'Edit', 'Dupliquer': 'Duplicate', 'Options': 'Options',
  'Monter': 'Move up', 'Descendre': 'Move down', 'Continuer': 'Continue', 'Terminer': 'Finish',
  'Créer': 'Create', 'Remplacer': 'Replace', 'Nom': 'Name', 'Nom requis': 'Name required',
  'Vide': 'Empty', 'vide': 'empty', 'Ligne': 'Line', 'Exercice': 'Exercise', 'Type': 'Type',
  'Minutes': 'Minutes', 'Secondes': 'Seconds', 'Skip': 'Skip', 'Arrêter': 'Stop',
  'Gauche': 'Left', 'Droite': 'Right', 'Tous': 'All', 'Notes': 'Notes', 'Détail': 'Details',
  'Durée': 'Duration', 'Sets': 'Sets', 'Séries': 'Sets', 'Reps': 'Reps', 'Cible': 'Target', 'Repos': 'Rest',
  'Tonnage': 'Tonnage', 'Conditions': 'Conditions', 'Stats': 'Stats', 'Données': 'Data',
  'Erreur de sauvegarde': 'Save error',
  'Données restaurées depuis une sauvegarde de secours — vérifie tes séances et exporte-les (Réglages).':
    'Data restored from a backup copy — check your workouts and export them (Settings).',

  // Écran Séances
  'Séance en cours': 'Workout in progress', 'Séance personnalisée': 'Custom workout',
  'Aucune séance configurée.': 'No workouts set up.', 'Nouvelle séance': 'New workout',
  'Démarrer la séance': 'Start workout', 'Modifier le template': 'Edit template',
  'Une séance est déjà en cours. La remplacer par celle-ci ? Les données non sauvegardées seront perdues.':
    'A workout is already in progress. Replace it with this one? Unsaved data will be lost.',
  'Séance dupliquée': 'Workout duplicated',
  'Supprimer ce template ? Les séances déjà enregistrées dans l\'historique sont conservées.':
    'Delete this template? Workouts already saved in your history are kept.',
  'Exporter mes données (JSON)': 'Export my data (JSON)', 'Importer un JSON': 'Import a JSON',
  'Exporter pour analyse Claude': 'Export for Claude analysis', 'Tout effacer': 'Erase everything',
  'Aujourd\'hui': 'Today', 'Hier': 'Yesterday',

  // Séance active
  'Abandonner': 'Discard',
  'Avant de commencer': 'Before you start',
  'Quelques infos rapides pour calibrer les recommandations de fin de séance.':
    'A few quick details to calibrate the end-of-workout recommendations.',
  'Échauffement': 'Warm-up', 'Exercices': 'Exercises', 'Étirements': 'Stretching',
  'Non renseigné': 'Not filled in', 'Conditions de récup': 'Recovery conditions',
  'Aucun item. Clique sur Éditer pour en ajouter.': 'No items. Tap Edit to add some.',
  'Éditer la liste': 'Edit list', 'Passer aux exercices': 'Go to exercises',
  'Ajouter un exercice': 'Add an exercise', 'Passer aux étirements': 'Go to stretching',
  'Étirements de fin': 'Cool-down stretches', '✓ fait': '✓ done',
  'Aucun étirement. Clique sur Éditer pour en ajouter.': 'No stretches. Tap Edit to add some.',
  ' /côté': ' /side', 'Refaire les étirements': 'Redo the stretches',
  'Démarrer le mode guidé': 'Start guided mode', 'Notes / ressenti': 'Notes / how it felt',
  'Sensations, observations, douleurs...': 'Sensations, observations, pain...',
  'Terminer la séance': 'Finish workout',
  'Aucune ligne.': 'No lines.', 'Ajouter une ligne': 'Add a line',
  'ex: Vélo 5 min': 'e.g. Bike 5 min', 'Modifier ligne': 'Edit line', 'Nouvelle ligne': 'New line',
  'Aucun étirement.': 'No stretches.', 'Ajouter un étirement': 'Add a stretch', 'Étirement': 'Stretch',
  'ex: Ischio-jambiers': 'e.g. Hamstrings', 'Durée (secondes)': 'Duration (seconds)',
  'Gauche + droite': 'Left + right', 'Le timer fait deux passages': 'The timer runs two passes',
  'Modifier étirement': 'Edit stretch', 'Nouvel étirement': 'New stretch',
  'Sommeil (h)': 'Sleep (h)', 'Énergie /10': 'Energy /10', 'Repas avant': 'Meal before',
  'Non': 'No', 'Léger': 'Light', 'Oui': 'Yes', 'non': 'no', 'léger': 'light', 'oui': 'yes',
  '+ Ajouter un set': '+ Add a set', 'Marquer non fait': 'Mark as not done', 'Marquer fait': 'Mark as done',
  'Set supprimé': 'Set deleted',
  'Voir la description / démo': 'View description / demo', 'Changer la cible': 'Change target',
  'Changer le repos': 'Change rest', 'Remplacer l\'exercice': 'Replace exercise',
  'Mode de saisie des sets...': 'Set entry mode...', 'Supprimer l\'exercice': 'Delete exercise',
  'Supprimer cet exercice de la séance ?': 'Delete this exercise from the workout?',
  'Repos entre les sets': 'Rest between sets', 'Temps de repos': 'Rest time',
  'Séries cibles': 'Target sets', 'Reps cibles': 'Target reps', 'ex: 8 ou 8-10': 'e.g. 8 or 8-10',
  'Modifier la cible': 'Edit target',
  'Définit le mode par défaut pour les nouveaux sets ajoutés. Les sets existants ne sont pas modifiés.':
    'Sets the default mode for newly added sets. Existing sets are not changed.',
  'Mode de saisie': 'Entry mode',
  'Abandonner cette séance ? Les données saisies seront perdues.': 'Discard this workout? Entered data will be lost.',
  'Séance abandonnée': 'Workout discarded',
  'Aucun set validé. Terminer quand même ?': 'No sets completed. Finish anyway?',
  'Repos terminé': 'Rest over',
  'Reprendre': 'Resume', 'Pause': 'Pause',
  'Superset ?': 'Superset?', 'Défaire': 'Undo', 'Inverser': 'Swap',
  'Lier les deux exercices en superset': 'Link the two exercises as a superset',
  'Inverser l\'ordre A ↔ B': 'Swap the A ↔ B order', 'Défaire le superset': 'Break the superset',

  // Bibliothèque
  '+ Custom': '+ Custom', 'Rechercher un exercice...': 'Search for an exercise...', 'Callisthénie': 'Calisthenics',
  'Créer un exercice personnalisé': 'Create a custom exercise', 'Aucun exercice trouvé.': 'No exercises found.',
  'Choisir un exercice': 'Choose an exercise', 'Pas de description.': 'No description.',
  '▶  Voir une démo (YouTube)': '▶  Watch a demo (YouTube)', ' technique musculation': ' exercise form tutorial',
  'Muscle principal': 'Primary muscle', 'Muscles secondaires': 'Secondary muscles',
  'Équipement': 'Equipment', 'Repos par défaut': 'Default rest',
  'Supprimer cet exercice custom ?': 'Delete this custom exercise?',
  'Nom de l\'exercice': 'Exercise name', 'Précise l\'équipement': 'Specify the equipment',
  'Exercice de callisthénie (apparaît dans le filtre "Callisthénie")':
    'Calisthenics exercise (shows up in the "Calisthenics" filter)',
  'Exercice ajouté': 'Exercise added', 'Nouvel exercice': 'New exercise',

  // Historique
  'Aucune séance enregistrée.': 'No workouts recorded.', 'Termine une séance pour la voir ici.': 'Finish a workout to see it here.',
  'SOMMEIL': 'SLEEP', 'ÉNERGIE': 'ENERGY', 'REPAS': 'MEAL', 'Aucun set logué': 'No sets logged',
  'Modifier cette séance': 'Edit this workout', 'Supprimer cette séance': 'Delete this workout',
  'Remettre cette séance en édition ? Elle redeviendra la séance en cours.':
    'Reopen this workout for editing? It will become the workout in progress again.',
  'Une séance est déjà en cours, termine-la d\'abord.': 'A workout is already in progress, finish it first.',
  'Supprimer cette séance de l\'historique ? Cette action est irréversible.':
    'Delete this workout from your history? This cannot be undone.',
  'Séance supprimée': 'Workout deleted',

  // Progression
  'Pas encore de données.': 'No data yet.', 'Termine quelques séances pour voir ta progression.': 'Finish a few workouts to see your progress.',
  'Pas encore de données pour cet exercice.': 'No data yet for this exercise.',
  'Meilleur temps': 'Best time', 'PR Reps': 'PR Reps', 'Reps totales max': 'Max total reps',
  'Assistance min': 'Min assistance', 'Reps max (séance)': 'Max reps (workout)',
  'PR Lest': 'PR Added weight', 'PR Charge': 'PR Weight', 'Volume max': 'Max volume',
  'Temps max par séance': 'Max time per workout', 'Reps max par séance': 'Max reps per workout',
  'Reps totales': 'Total reps', 'Assistance minimale (kg)': 'Minimum assistance (kg)',
  'Lest max': 'Max added weight', 'Charge max': 'Max weight', 'Volume total (kg)': 'Total volume (kg)',

  // Édition template
  'Édition séance': 'Edit workout', 'Nom de la séance': 'Workout name', 'Lettre / icône (1 char)': 'Letter / icon (1 char)',
  'Aucun exercice. Ajoute-en avec le bouton ci-dessous.': 'No exercises. Add some with the button below.',
  'Aucune ligne. Ajoute des cases à cocher.': 'No lines. Add some checklist items.',
  'Modifier séries × reps': 'Edit sets × reps', 'Modifier repos': 'Edit rest', 'Ligne échauffement': 'Warm-up line',
  ' · repos ': ' · rest ',

  // Bilan de séance
  'Séance terminée': 'Workout complete',
  'Récup limitée cette séance — suggestions ajustées en conséquence.':
    'Limited recovery this workout — suggestions adjusted accordingly.',
  'Voir / Éditer': 'View / Edit', 'Retour aux séances': 'Back to workouts',

  // Coach
  'Skippé': 'Skipped', 'Maintenir': 'Maintain', 'Assistance ↓': 'Assistance ↓',
  'Aucun set complété. Garde la même cible la prochaine fois.': 'No sets completed. Keep the same target next time.',
  'Cibles atteintes mais récup limitée — confirme à charge égale avant de monter.':
    'Targets hit but limited recovery — confirm at the same weight before increasing.',
  'Tous les sets dans la cible. Vise +1 rep par set la prochaine fois.': 'All sets on target. Aim for +1 rep per set next time.',

  // Réglages
  'Timer de repos': 'Rest timer', 'Démarrage auto': 'Auto-start',
  'Lance le timer dès qu\'un set est validé.': 'Starts the timer as soon as a set is completed.',
  'Bip de fin': 'End beep', 'Signal sonore quand le repos est terminé.': 'Sound signal when rest is over.',
  'Vibration': 'Vibration', 'Vibrations à la fin du repos (si supporté).': 'Vibrates when rest ends (if supported).',
  'Exporter mes données': 'Export my data',
  'Sauvegarde JSON complète (templates, séances, exos custom).': 'Full JSON backup (templates, workouts, custom exercises).',
  'Exporter': 'Export', 'Importer': 'Import',
  'Remplace les données actuelles. Fais un export d\'abord.': 'Replaces current data. Export first.',
  'Export pour analyse Claude': 'Export for Claude analysis',
  'Format texte lisible à coller dans une conversation avec Claude.': 'Readable text format to paste into a conversation with Claude.',
  'Copier': 'Copy', 'Templates': 'Templates', 'Exos custom': 'Custom exercises',
  'Zone dangereuse': 'Danger zone', 'Supprime toutes les données locales. Irréversible.': 'Deletes all local data. Cannot be undone.',
  'Effacer': 'Erase',
  'App locale, aucune donnée envoyée à un serveur.': 'Local app, no data sent to a server.',
  'Toutes tes données sont dans le localStorage de ce navigateur.': 'All your data is stored in this browser\'s localStorage.',
  'Premier côté': 'First side',
  'Côté par lequel démarrer le mode guidé pour les étirements "par côté".':
    'Side to start the guided mode on for "per side" stretches.',
  'Durée par défaut': 'Default duration',
  'Selon le type d\'exo (compound 2 min, isolation 90 s, poids du corps 3 min, gainage 1 min)':
    'Depends on the exercise type (compound 2 min, isolation 90 s, bodyweight 3 min, core holds 1 min)',
  'Repos selon type d\'exo': 'Rest based on exercise type', 'Utiliser les valeurs par type': 'Use per-type values',
  'Override global : applique la même durée de repos à tous les nouveaux exos, peu importe le type. Ne change pas les exos déjà ajoutés à un template.':
    'Global override: applies the same rest duration to all new exercises, whatever the type. Does not change exercises already added to a template.',
  'Durée invalide': 'Invalid duration', 'Override appliqué': 'Override applied',
  'Mises à jour': 'Updates', 'Vérifier les mises à jour': 'Check for updates',
  'Prévient quand une nouvelle version est prête et qu\'il faut relancer l\'app.': 'Tells you when a new version is ready and the app needs to be relaunched.',
  'Version de l\'app': 'App version', 'Vérifier': 'Check', 'Relancer': 'Relaunch', 'Plus tard': 'Later',
  'Mise à jour disponible. Relance l\'app pour l\'installer.': 'Update available. Relaunch the app to install it.',
  'Une nouvelle version est prête : relance l\'app.': 'A new version is ready: relaunch the app.',
  'Mises à jour indisponibles dans ce navigateur.': 'Updates are not available in this browser.',
  'Recherche en cours…': 'Checking…', 'Tu as la dernière version.': 'You have the latest version.',
  'Export téléchargé': 'Export downloaded', 'Fichier invalide': 'Invalid file', 'JSON invalide': 'Invalid JSON',
  'Import OK': 'Import OK', 'Copier tout': 'Copy all',
  'Copié dans le presse-papiers': 'Copied to clipboard', 'Copié': 'Copied',
  'Copie ce texte et colle-le dans une conversation avec Claude pour analyse.':
    'Copy this text and paste it into a conversation with Claude for analysis.',
  'Effacer TOUTES les données ? Cette action est irréversible. Pense à exporter d\'abord.':
    'Erase ALL data? This cannot be undone. Remember to export first.',
  'Vraiment sûr ? Toutes tes séances, templates et exos custom seront perdus.':
    'Really sure? All your workouts, templates and custom exercises will be lost.',
  'Données effacées': 'Data erased',

  // Étirements guidés
  'Pas d\'étirements définis pour cette séance': 'No stretches defined for this workout',
  'Étirements terminés ✓': 'Stretching done ✓', 'Côté gauche': 'Left side', 'Côté droit': 'Right side',

  // Templates par défaut
  'Haut du corps': 'Upper body', 'Bas du corps': 'Lower body', 'Core': 'Core', 'HC': 'UB', 'BC': 'LB',

  // Échauffements par défaut
  'Vélo / rameur 5 min': 'Bike / rower 5 min',
  'Cercles d\'épaules avant/arrière — 10 de chaque': 'Shoulder circles forward/backward — 10 each',
  'Rotations de hanches — 10 par côté': 'Hip rotations — 10 per side',
  'Squats à vide lents — 10 reps': 'Slow bodyweight squats — 10 reps',
  'Band pull-apart ou rotations bras tendus — 15 reps': 'Band pull-aparts or straight-arm rotations — 15 reps',
  'Développé couché : 1×10 barre à vide, 1×5 à ~50%': 'Bench press: 1×10 empty bar, 1×5 at ~50%',
  'Rowing : 1×12 charge légère': 'Row: 1×12 light weight',
  'Développé militaire : 1×10 très léger': 'Overhead press: 1×10 very light',
  'Squat : 1×10 barre à vide, 1×5 à ~50%, 1×3 à ~75%': 'Squat: 1×10 empty bar, 1×5 at ~50%, 1×3 at ~75%',
  'Soulevé de terre roumain : 1×10 barre à vide (charnière de hanche), 1×5 à ~50%':
    'Romanian deadlift: 1×10 empty bar (hip hinge), 1×5 at ~50%',
  'Cat-cow — 10 reps': 'Cat-cow — 10 reps', 'Bird-dog — 8 par côté': 'Bird-dog — 8 per side',
  'Gainage : 1×20s planche pour activer': 'Core: 1×20s plank to activate',

  // Étirements par défaut
  'Pectoraux (bras contre mur)': 'Chest (arm against wall)',
  'Dorsaux (position de l\'enfant)': 'Lats (child\'s pose)',
  'Épaules (bras en travers)': 'Shoulders (cross-body arm)',
  'Biceps / avant-bras': 'Biceps / forearms',
  'Triceps (coude au-dessus tête)': 'Triceps (elbow overhead)',
  'Ischio-jambiers': 'Hamstrings', 'Fléchisseurs de hanche': 'Hip flexors',
  'Mollets (jambe arrière tendue)': 'Calves (back leg straight)',
  'Lombaires (position de l\'enfant)': 'Lower back (child\'s pose)',
  'Obliques (flexion latérale debout)': 'Obliques (standing side bend)',
  'Dorsaux (torsion allongée)': 'Lats (lying twist)',

  // Groupes musculaires
  'Pectoraux': 'Chest', 'Dorsaux': 'Back', 'Épaules': 'Shoulders', 'Épaules postérieures': 'Rear delts',
  'Ischios': 'Hamstrings', 'Fessiers': 'Glutes', 'Adducteurs': 'Adductors', 'Mollets': 'Calves',
  'Abdos': 'Abs', 'Lombaires': 'Lower back', 'Trapèzes': 'Traps', 'Avant-bras': 'Forearms',

  // Équipements
  'Barre': 'Barbell', 'Haltères': 'Dumbbells', 'Haltère': 'Dumbbell', 'Poulie': 'Cable', 'Aucun': 'None',
  'Disques': 'Weight plates', 'Barres parallèles': 'Parallel bars', 'Ceinture lestée': 'Weight belt',
  'Barre fixe': 'Pull-up bar', 'Barre / TRX': 'Bar / TRX', 'Banc à lombaires': 'Back extension bench',
  'Banc + disque': 'Bench + plate', 'Mur': 'Wall', 'Barre EZ': 'EZ bar', 'Banc Larry Scott': 'Preacher bench',
  'Bancs': 'Benches', 'Haltère / Kettlebell': 'Dumbbell / Kettlebell', 'Haltères + banc': 'Dumbbells + bench',
  'Barre / Haltère': 'Barbell / Dumbbell', 'Barre + boîte': 'Barbell + box', 'Aucun (partenaire)': 'None (partner)',
  'Presse': 'Leg press', 'Disque / Haltère': 'Plate / Dumbbell', 'Roue': 'Ab wheel', 'Banc': 'Bench',
  'Barre / Haltères': 'Barbell / Dumbbells', 'Kettlebell / Haltère': 'Kettlebell / Dumbbell', 'Anneaux': 'Rings',
  'Aucun (sol / parallettes)': 'None (floor / parallettes)', 'Box / TRX / anneaux': 'Box / TRX / rings',
  'Parallettes / sol': 'Parallettes / floor', 'Barre verticale': 'Vertical pole',
  'Élastique': 'Resistance band', 'Autre': 'Other',

  // Export texte
  '=== MUSCU — Export pour analyse ===': '=== MUSCU — Export for analysis ===',
  '--- TEMPLATES ---': '--- TEMPLATES ---',
  '--- HISTORIQUE (du plus récent au plus ancien) ---': '--- HISTORY (most recent first) ---',
  'Nombre de séances : {n}': 'Number of workouts: {n}', 'Exporté le : {d}': 'Exported on: {d}',
  'sommeil {n}h': 'sleep {n}h', 'énergie {n}/10': 'energy {n}/10', 'repas {v}': 'meal {v}',
  'Conditions : {c}': 'Conditions: {c}', 'Durée : {n} min': 'Duration: {n} min', 'Notes : {t}': 'Notes: {t}',

  // Chaînes avec variables ({x})
  'Il y a {n} jours': '{n} days ago',
  'Reprendre · démarrée {t}': 'Resume · started {t}',
  'Dernière fois : {t} · {n} exos': 'Last time: {t} · {n} exercises',
  '{n} exercices': '{n} exercises',
  'Sommeil {n}h': 'Sleep {n}h', 'Énergie {n}/10': 'Energy {n}/10', 'Repas {v}': 'Meal {v}',
  '{n} positions · ~{m} min': '{n} stretches · ~{m} min',
  'Cible : {s} × {r}': 'Target: {s} × {r}',
  '{n} exos · {m} sets validés': '{n} exercises · {m} sets completed',
  'Pour la prochaine {name}': 'Next time: {name}',
  'Override global : {t} pour tous les exos': 'Global override: {t} for all exercises',
  'Importer {s} séances et {t} templates ? Les données actuelles seront remplacées.':
    'Import {s} workouts and {t} templates? Current data will be replaced.',
  'Tous les sets cibles atteints. Monte à {w} kg la prochaine fois ({s}×{r}).':
    'All target sets hit. Go up to {w} kg next time ({s}×{r}).',
  'Chute marquée entre les sets. Redescends à {w} kg pour stabiliser la technique.':
    'Big drop-off between sets. Go back down to {w} kg to stabilise your technique.',
  'Garde {w} kg jusqu\'à boucler proprement tous les sets de la cible.':
    'Stay at {w} kg until you cleanly complete all target sets.',
  'Moy. {n} reps. Continue avec cette cible jusqu\'à boucler tous les sets.':
    'Avg. {n} reps. Keep this target until you complete all sets.',
  'Cibles atteintes lesté. Monte à +{w} kg.': 'Targets hit with added weight. Go up to +{w} kg.',
  'Reste à +{w} kg jusqu\'à boucler tous les sets.': 'Stay at +{w} kg until you complete all sets.',
  'Tous les sets cibles atteints. Réduis l\'assistance à -{w} kg.': 'All target sets hit. Reduce the assistance to -{w} kg.',
  'Garde -{w} kg d\'assistance jusqu\'à boucler tous les sets.': 'Keep -{w} kg of assistance until you complete all sets.',
  'Cibles tenues. Vise {n}s la prochaine fois.': 'Targets held. Aim for {n}s next time.',
  'Reste à {n}s.': 'Stay at {n}s.',
};

/* --- Noms d'exercices (par id) --- */
const I18N_EX_NAMES = {
  'pec-dc-barre': 'Barbell bench press', 'pec-dc-halt': 'Dumbbell bench press', 'pec-di-barre': 'Incline barbell press',
  'pec-di-halt': 'Incline dumbbell press', 'pec-dd-barre': 'Decline barbell press', 'pec-dd-halt': 'Decline dumbbell press',
  'pec-ecart-plat': 'Flat dumbbell fly', 'pec-ecart-inc': 'Incline dumbbell fly', 'pec-poulie-haute': 'High cable crossover',
  'pec-poulie-basse': 'Low cable crossover', 'pec-pec-deck': 'Pec deck (butterfly)', 'pec-pullover': 'Dumbbell pullover',
  'pec-pompes': 'Push-ups', 'pec-pompes-inc': 'Decline push-ups (feet elevated)', 'pec-pompes-dec': 'Incline push-ups (hands elevated)',
  'pec-pompes-dia': 'Diamond push-ups', 'pec-pompes-lest': 'Weighted push-ups', 'pec-dips-pec': 'Chest dips',
  'pec-dips-pec-lest': 'Weighted chest dips',

  'dos-rowing-barre': 'Bent-over barbell row', 'dos-rowing-tbar': 'T-bar row', 'dos-rowing-halt': 'One-arm dumbbell row',
  'dos-rowing-yates': 'Yates row (underhand grip)', 'dos-rowing-machine': 'Seated machine row', 'dos-tirage-h': 'Seated cable row',
  'dos-tirage-v-large': 'Wide-grip lat pulldown', 'dos-tirage-v-serre': 'Close-grip lat pulldown',
  'dos-tirage-v-sup': 'Underhand lat pulldown', 'dos-tirage-v-neutre': 'Neutral-grip lat pulldown',
  'dos-sdt': 'Conventional deadlift', 'dos-sdt-sumo': 'Sumo deadlift', 'dos-sdt-roumain': 'Romanian deadlift',
  'dos-sdt-jt': 'Stiff-leg deadlift', 'dos-sdt-trap': 'Trap bar deadlift', 'dos-shrugs-barre': 'Barbell shrugs',
  'dos-shrugs-halt': 'Dumbbell shrugs', 'dos-pullover-p': 'Cable pullover (straight-arm pulldown)',
  'dos-tractions': 'Pull-ups (overhand grip)', 'dos-tractions-sup': 'Chin-ups (underhand grip)',
  'dos-tractions-neutre': 'Neutral-grip pull-ups', 'dos-tractions-large': 'Wide-grip pull-ups',
  'dos-tractions-lest': 'Weighted pull-ups', 'dos-tractions-ass': 'Assisted pull-ups (machine)',
  'dos-tirage-v-ass': 'Assisted lat pulldown', 'dos-rowing-aus': 'Australian row (inverted row)',
  'dos-hyperext': 'Back extensions', 'dos-hyperext-lest': 'Weighted back extensions',

  'ep-dm-barre': 'Standing barbell overhead press', 'ep-dm-assis': 'Seated barbell overhead press',
  'ep-dm-halt': 'Dumbbell shoulder press', 'ep-arnold': 'Arnold press', 'ep-elev-lat': 'Dumbbell lateral raises',
  'ep-elev-lat-poulie': 'Cable lateral raises', 'ep-elev-front': 'Dumbbell front raises', 'ep-elev-front-barre': 'Barbell front raises',
  'ep-oiseau': 'Bent-over dumbbell rear delt fly', 'ep-oiseau-machine': 'Machine rear delt fly (reverse fly)',
  'ep-face-pull': 'Cable face pull', 'ep-rowing-menton': 'Upright row', 'ep-pike': 'Pike push-up', 'ep-handstand': 'Handstand push-up',

  'bi-curl-barre': 'Straight bar curl', 'bi-curl-ez': 'EZ bar curl', 'bi-curl-halt-alt': 'Alternating dumbbell curl',
  'bi-curl-halt-sim': 'Simultaneous dumbbell curl', 'bi-curl-marteau': 'Hammer curl', 'bi-curl-pupitre': 'Preacher curl (Larry Scott)',
  'bi-curl-incline': 'Incline dumbbell curl', 'bi-curl-poulie': 'Low cable bar curl', 'bi-curl-poulie-corde': 'Low cable rope curl',
  'bi-curl-conc': 'Concentration curl', 'bi-curl-zottman': 'Zottman curl', 'bi-curl-inv': 'Reverse-grip curl',

  'tri-ext-poulie-barre': 'Cable pushdown (bar)', 'tri-ext-poulie-corde': 'Cable pushdown (rope)',
  'tri-ext-halt-tete': 'Overhead dumbbell extension', 'tri-skull': 'EZ bar skullcrushers', 'tri-kickback': 'Dumbbell kickback',
  'tri-ext-uni-poulie': 'Single-arm cable extension', 'tri-dc-serre': 'Close-grip bench press', 'tri-dips': 'Parallel bar dips',
  'tri-dips-banc': 'Bench dips', 'tri-dips-lest': 'Weighted dips', 'tri-dips-ass': 'Assisted dips (machine)',

  'q-squat': 'Barbell back squat', 'q-squat-front': 'Front squat', 'q-squat-gob': 'Goblet squat', 'q-hack': 'Hack squat (machine)',
  'q-presse': 'Leg press', 'q-presse-h': 'Horizontal leg press', 'q-sissy': 'Sissy squat', 'q-leg-ext': 'Leg extension (machine)',
  'q-fentes-halt': 'Dumbbell lunges', 'q-fentes-barre': 'Barbell lunges', 'q-fentes-march': 'Walking lunges',
  'q-fentes-bulg': 'Bulgarian split squats', 'q-stepup': 'Dumbbell step-ups', 'q-squat-sumo': 'Sumo squat', 'q-box': 'Box squat',

  'is-leg-curl-a': 'Lying leg curl', 'is-leg-curl-as': 'Seated leg curl', 'is-leg-curl-d': 'Standing leg curl',
  'fess-hip-thrust': 'Barbell hip thrust', 'fess-glute-bridge': 'Glute bridge', 'fess-good-morning': 'Good morning',
  'is-nordic': 'Nordic curl', 'fess-kickback-p': 'Cable glute kickback', 'fess-abd': 'Hip abduction (machine)',
  'fess-add': 'Hip adduction (machine)',

  'mol-debout': 'Standing calf raise (machine)', 'mol-assis': 'Seated calf raise (machine)', 'mol-presse': 'Calf press on leg press',
  'mol-uni-halt': 'Single-leg dumbbell calf raise', 'mol-ane': 'Donkey calf raise',

  'ab-plank': 'Front plank', 'ab-side-plank': 'Side plank', 'ab-hollow': 'Hollow body hold', 'ab-crunch': 'Crunch',
  'ab-crunch-inv': 'Reverse crunch', 'ab-leg-raise-susp': 'Hanging leg raise', 'ab-leg-raise': 'Lying leg raise',
  'ab-russian': 'Russian twist', 'ab-russian-lest': 'Weighted Russian twist', 'ab-mountain': 'Mountain climbers',
  'ab-wheel': 'Ab wheel rollout', 'ab-dragon': 'Dragon flag', 'ab-crunch-poulie': 'Kneeling cable crunch',
  'ab-side-bend': 'Dumbbell side bend', 'ab-wood-chop': 'Cable wood chop', 'ab-pallof': 'Pallof press',
  'ab-toes-bar': 'Toes to bar', 'ab-deadbug': 'Dead bug',

  'fn-burpees': 'Burpees', 'fn-kb-swing': 'Kettlebell swing', 'fn-clean': 'Clean', 'fn-snatch': 'Snatch',
  'fn-thruster': 'Thruster', 'fn-farmer': 'Farmer\'s walk', 'fn-tgu': 'Turkish get-up',

  'cal-mu-barre': 'Bar muscle-up', 'cal-mu-anneaux': 'Ring muscle-up', 'cal-fl-tuck': 'Tuck front lever',
  'cal-fl-adv-tuck': 'Advanced tuck front lever', 'cal-fl-straddle': 'Straddle front lever', 'cal-fl-full': 'Full front lever',
  'cal-bl-tuck': 'Tuck back lever', 'cal-bl-full': 'Full back lever', 'cal-planche-tuck': 'Tuck planche',
  'cal-planche-straddle': 'Straddle planche', 'cal-planche-full': 'Full planche', 'cal-pseudo-planche-pompe': 'Pseudo planche push-ups',
  'cal-pistol': 'Pistol squat', 'cal-pistol-assiste': 'Assisted pistol squat', 'cal-shrimp': 'Shrimp squat',
  'cal-lsit': 'L-sit', 'cal-vsit': 'V-sit', 'cal-flag-tuck': 'Tuck human flag', 'cal-flag-full': 'Full human flag',
  'cal-archer-traction': 'Archer pull-ups', 'cal-archer-pompe': 'Archer push-ups', 'cal-oap-neg': 'One-arm push-up negatives',
  'cal-skin-cat': 'Skin the cat', 'cal-hs-mur': 'Wall handstand (static hold)', 'cal-hs-libre': 'Freestanding handstand',
};

/* --- Index FR -> EN, construit paresseusement (la bibliothèque est dans app.js) --- */
let _enIndex = null;

function buildEnIndex() {
  const idx = Object.assign({}, I18N_UI);
  if (typeof EXERCISE_LIBRARY !== 'undefined') {
    EXERCISE_LIBRARY.forEach(ex => {
      if (I18N_EX_NAMES[ex.id]) idx[ex.name] = I18N_EX_NAMES[ex.id];
    });
  }
  if (typeof EXERCISE_DESCRIPTIONS !== 'undefined' && typeof I18N_EX_DESC !== 'undefined') {
    Object.keys(EXERCISE_DESCRIPTIONS).forEach(id => {
      if (I18N_EX_DESC[id]) idx[EXERCISE_DESCRIPTIONS[id]] = I18N_EX_DESC[id];
    });
  }
  return idx;
}

/* Traduit une chaîne française exacte ; renvoie la chaîne telle quelle sinon. */
function tr(s) {
  if (_lang !== 'en' || typeof s !== 'string' || s === '') return s;
  if (!_enIndex) _enIndex = buildEnIndex();
  return Object.prototype.hasOwnProperty.call(_enIndex, s) ? _enIndex[s] : s;
}

/* Traduit un gabarit avec variables {x} puis les remplace. */
function tf(template, vars = {}) {
  return tr(template).replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
}
