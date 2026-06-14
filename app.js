/* ==========================================================================
   Muscu — Application de musculation
   Single-file vanilla JS app, localStorage persistence
   ========================================================================== */

/* === EXERCISE LIBRARY === */
const EXERCISE_LIBRARY = [
  // PECTORAUX
  { id: 'pec-dc-barre', name: 'Développé couché barre', type: 'loaded', primary: 'Pectoraux', secondary: ['Triceps', 'Épaules'], equipment: 'Barre' },
  { id: 'pec-dc-halt', name: 'Développé couché haltères', type: 'loaded', primary: 'Pectoraux', secondary: ['Triceps', 'Épaules'], equipment: 'Haltères' },
  { id: 'pec-di-barre', name: 'Développé incliné barre', type: 'loaded', primary: 'Pectoraux', secondary: ['Épaules', 'Triceps'], equipment: 'Barre' },
  { id: 'pec-di-halt', name: 'Développé incliné haltères', type: 'loaded', primary: 'Pectoraux', secondary: ['Épaules', 'Triceps'], equipment: 'Haltères' },
  { id: 'pec-dd-barre', name: 'Développé décliné barre', type: 'loaded', primary: 'Pectoraux', secondary: ['Triceps'], equipment: 'Barre' },
  { id: 'pec-dd-halt', name: 'Développé décliné haltères', type: 'loaded', primary: 'Pectoraux', secondary: ['Triceps'], equipment: 'Haltères' },
  { id: 'pec-ecart-plat', name: 'Écarté haltères plat', type: 'loaded', primary: 'Pectoraux', secondary: [], equipment: 'Haltères' },
  { id: 'pec-ecart-inc', name: 'Écarté haltères incliné', type: 'loaded', primary: 'Pectoraux', secondary: [], equipment: 'Haltères' },
  { id: 'pec-poulie-haute', name: 'Vis-à-vis poulie haute', type: 'loaded', primary: 'Pectoraux', secondary: [], equipment: 'Poulie' },
  { id: 'pec-poulie-basse', name: 'Vis-à-vis poulie basse', type: 'loaded', primary: 'Pectoraux', secondary: ['Épaules'], equipment: 'Poulie' },
  { id: 'pec-pec-deck', name: 'Pec deck (butterfly)', type: 'loaded', primary: 'Pectoraux', secondary: [], equipment: 'Machine' },
  { id: 'pec-pullover', name: 'Pull-over haltère', type: 'loaded', primary: 'Pectoraux', secondary: ['Dorsaux'], equipment: 'Haltère' },
  { id: 'pec-pompes', name: 'Pompes', type: 'bodyweight', primary: 'Pectoraux', secondary: ['Triceps', 'Épaules'], equipment: 'Aucun' },
  { id: 'pec-pompes-inc', name: 'Pompes inclinées (pieds en hauteur)', type: 'bodyweight', primary: 'Pectoraux', secondary: ['Épaules'], equipment: 'Aucun' },
  { id: 'pec-pompes-dec', name: 'Pompes déclinées (mains en hauteur)', type: 'bodyweight', primary: 'Pectoraux', secondary: ['Triceps'], equipment: 'Aucun' },
  { id: 'pec-pompes-dia', name: 'Pompes diamant', type: 'bodyweight', primary: 'Triceps', secondary: ['Pectoraux'], equipment: 'Aucun' },
  { id: 'pec-pompes-lest', name: 'Pompes lestées', type: 'weighted', primary: 'Pectoraux', secondary: ['Triceps'], equipment: 'Disques' },
  { id: 'pec-dips-pec', name: 'Dips orientés pectoraux', type: 'bodyweight', primary: 'Pectoraux', secondary: ['Triceps'], equipment: 'Barres parallèles' },
  { id: 'pec-dips-pec-lest', name: 'Dips pectoraux lestés', type: 'weighted', primary: 'Pectoraux', secondary: ['Triceps'], equipment: 'Ceinture lestée' },

  // DOS
  { id: 'dos-rowing-barre', name: 'Rowing barre buste penché', type: 'loaded', primary: 'Dorsaux', secondary: ['Biceps', 'Trapèzes'], equipment: 'Barre' },
  { id: 'dos-rowing-tbar', name: 'Rowing T-bar', type: 'loaded', primary: 'Dorsaux', secondary: ['Biceps'], equipment: 'Barre' },
  { id: 'dos-rowing-halt', name: 'Rowing haltère unilatéral', type: 'loaded', primary: 'Dorsaux', secondary: ['Biceps'], equipment: 'Haltère' },
  { id: 'dos-rowing-yates', name: 'Rowing Yates (prise supination)', type: 'loaded', primary: 'Dorsaux', secondary: ['Biceps'], equipment: 'Barre' },
  { id: 'dos-rowing-machine', name: 'Rowing machine assis', type: 'loaded', primary: 'Dorsaux', secondary: ['Biceps'], equipment: 'Machine' },
  { id: 'dos-tirage-h', name: 'Tirage horizontal poulie', type: 'loaded', primary: 'Dorsaux', secondary: ['Biceps'], equipment: 'Poulie' },
  { id: 'dos-tirage-v-large', name: 'Tirage vertical prise large', type: 'loaded', primary: 'Dorsaux', secondary: ['Biceps'], equipment: 'Poulie' },
  { id: 'dos-tirage-v-serre', name: 'Tirage vertical prise serrée', type: 'loaded', primary: 'Dorsaux', secondary: ['Biceps'], equipment: 'Poulie' },
  { id: 'dos-tirage-v-sup', name: 'Tirage vertical supination', type: 'loaded', primary: 'Dorsaux', secondary: ['Biceps'], equipment: 'Poulie' },
  { id: 'dos-tirage-v-neutre', name: 'Tirage vertical prise neutre', type: 'loaded', primary: 'Dorsaux', secondary: ['Biceps'], equipment: 'Poulie' },
  { id: 'dos-sdt', name: 'Soulevé de terre conventionnel', type: 'loaded', primary: 'Dorsaux', secondary: ['Ischios', 'Fessiers', 'Trapèzes'], equipment: 'Barre' },
  { id: 'dos-sdt-sumo', name: 'Soulevé de terre sumo', type: 'loaded', primary: 'Fessiers', secondary: ['Ischios', 'Dorsaux'], equipment: 'Barre' },
  { id: 'dos-sdt-roumain', name: 'Soulevé de terre roumain', type: 'loaded', primary: 'Ischios', secondary: ['Fessiers', 'Dorsaux'], equipment: 'Barre' },
  { id: 'dos-sdt-jt', name: 'Soulevé de terre jambes tendues', type: 'loaded', primary: 'Ischios', secondary: ['Fessiers', 'Dorsaux'], equipment: 'Barre' },
  { id: 'dos-sdt-trap', name: 'Soulevé de terre trap bar', type: 'loaded', primary: 'Dorsaux', secondary: ['Ischios', 'Quadriceps'], equipment: 'Trap bar' },
  { id: 'dos-shrugs-barre', name: 'Shrugs barre', type: 'loaded', primary: 'Trapèzes', secondary: [], equipment: 'Barre' },
  { id: 'dos-shrugs-halt', name: 'Shrugs haltères', type: 'loaded', primary: 'Trapèzes', secondary: [], equipment: 'Haltères' },
  { id: 'dos-pullover-p', name: 'Pull-over poulie', type: 'loaded', primary: 'Dorsaux', secondary: ['Triceps'], equipment: 'Poulie' },
  { id: 'dos-tractions', name: 'Tractions prise pronation', type: 'bodyweight', primary: 'Dorsaux', secondary: ['Biceps'], equipment: 'Barre fixe' },
  { id: 'dos-tractions-sup', name: 'Tractions supination (chin-up)', type: 'bodyweight', primary: 'Dorsaux', secondary: ['Biceps'], equipment: 'Barre fixe' },
  { id: 'dos-tractions-neutre', name: 'Tractions prise neutre', type: 'bodyweight', primary: 'Dorsaux', secondary: ['Biceps'], equipment: 'Barre fixe' },
  { id: 'dos-tractions-large', name: 'Tractions prise large', type: 'bodyweight', primary: 'Dorsaux', secondary: ['Biceps'], equipment: 'Barre fixe' },
  { id: 'dos-tractions-lest', name: 'Tractions lestées', type: 'weighted', primary: 'Dorsaux', secondary: ['Biceps'], equipment: 'Ceinture lestée' },
  { id: 'dos-tractions-ass', name: 'Tractions assistées machine', type: 'assisted', primary: 'Dorsaux', secondary: ['Biceps'], equipment: 'Machine' },
  { id: 'dos-tirage-v-ass', name: 'Tirage vertical assisté', type: 'assisted', primary: 'Dorsaux', secondary: ['Biceps'], equipment: 'Machine' },
  { id: 'dos-rowing-aus', name: 'Rowing australien (suspension)', type: 'bodyweight', primary: 'Dorsaux', secondary: ['Biceps'], equipment: 'Barre / TRX' },
  { id: 'dos-hyperext', name: 'Hyperextensions', type: 'bodyweight', primary: 'Lombaires', secondary: ['Fessiers', 'Ischios'], equipment: 'Banc à lombaires' },
  { id: 'dos-hyperext-lest', name: 'Hyperextensions lestées', type: 'weighted', primary: 'Lombaires', secondary: ['Fessiers', 'Ischios'], equipment: 'Banc + disque' },

  // ÉPAULES
  { id: 'ep-dm-barre', name: 'Développé militaire barre debout', type: 'loaded', primary: 'Épaules', secondary: ['Triceps'], equipment: 'Barre' },
  { id: 'ep-dm-assis', name: 'Développé militaire barre assis', type: 'loaded', primary: 'Épaules', secondary: ['Triceps'], equipment: 'Barre' },
  { id: 'ep-dm-halt', name: 'Développé militaire haltères', type: 'loaded', primary: 'Épaules', secondary: ['Triceps'], equipment: 'Haltères' },
  { id: 'ep-arnold', name: 'Développé Arnold', type: 'loaded', primary: 'Épaules', secondary: ['Triceps'], equipment: 'Haltères' },
  { id: 'ep-elev-lat', name: 'Élévations latérales haltères', type: 'loaded', primary: 'Épaules', secondary: [], equipment: 'Haltères' },
  { id: 'ep-elev-lat-poulie', name: 'Élévations latérales poulie', type: 'loaded', primary: 'Épaules', secondary: [], equipment: 'Poulie' },
  { id: 'ep-elev-front', name: 'Élévations frontales haltères', type: 'loaded', primary: 'Épaules', secondary: [], equipment: 'Haltères' },
  { id: 'ep-elev-front-barre', name: 'Élévations frontales barre', type: 'loaded', primary: 'Épaules', secondary: [], equipment: 'Barre' },
  { id: 'ep-oiseau', name: 'Oiseau haltères', type: 'loaded', primary: 'Épaules postérieures', secondary: ['Trapèzes'], equipment: 'Haltères' },
  { id: 'ep-oiseau-machine', name: 'Oiseau machine (reverse fly)', type: 'loaded', primary: 'Épaules postérieures', secondary: [], equipment: 'Machine' },
  { id: 'ep-face-pull', name: 'Face pull poulie', type: 'loaded', primary: 'Épaules postérieures', secondary: ['Trapèzes'], equipment: 'Poulie' },
  { id: 'ep-rowing-menton', name: 'Rowing menton', type: 'loaded', primary: 'Épaules', secondary: ['Trapèzes'], equipment: 'Barre' },
  { id: 'ep-pike', name: 'Pike push-up', type: 'bodyweight', primary: 'Épaules', secondary: ['Triceps'], equipment: 'Aucun' },
  { id: 'ep-handstand', name: 'Handstand push-up', type: 'bodyweight', primary: 'Épaules', secondary: ['Triceps'], equipment: 'Mur' },

  // BICEPS
  { id: 'bi-curl-barre', name: 'Curl barre droite', type: 'loaded', primary: 'Biceps', secondary: [], equipment: 'Barre' },
  { id: 'bi-curl-ez', name: 'Curl barre EZ', type: 'loaded', primary: 'Biceps', secondary: [], equipment: 'Barre EZ' },
  { id: 'bi-curl-halt-alt', name: 'Curl haltères alternés', type: 'loaded', primary: 'Biceps', secondary: [], equipment: 'Haltères' },
  { id: 'bi-curl-halt-sim', name: 'Curl haltères simultanés', type: 'loaded', primary: 'Biceps', secondary: [], equipment: 'Haltères' },
  { id: 'bi-curl-marteau', name: 'Curl marteau', type: 'loaded', primary: 'Biceps', secondary: ['Avant-bras'], equipment: 'Haltères' },
  { id: 'bi-curl-pupitre', name: 'Curl pupitre (Larry Scott)', type: 'loaded', primary: 'Biceps', secondary: [], equipment: 'Banc Larry Scott' },
  { id: 'bi-curl-incline', name: 'Curl incliné haltères', type: 'loaded', primary: 'Biceps', secondary: [], equipment: 'Haltères' },
  { id: 'bi-curl-poulie', name: 'Curl poulie basse barre', type: 'loaded', primary: 'Biceps', secondary: [], equipment: 'Poulie' },
  { id: 'bi-curl-poulie-corde', name: 'Curl poulie basse corde', type: 'loaded', primary: 'Biceps', secondary: ['Avant-bras'], equipment: 'Poulie' },
  { id: 'bi-curl-conc', name: 'Curl concentré', type: 'loaded', primary: 'Biceps', secondary: [], equipment: 'Haltère' },
  { id: 'bi-curl-zottman', name: 'Curl Zottman', type: 'loaded', primary: 'Biceps', secondary: ['Avant-bras'], equipment: 'Haltères' },
  { id: 'bi-curl-inv', name: 'Curl prise inversée', type: 'loaded', primary: 'Avant-bras', secondary: ['Biceps'], equipment: 'Barre' },

  // TRICEPS
  { id: 'tri-ext-poulie-barre', name: 'Extensions poulie barre', type: 'loaded', primary: 'Triceps', secondary: [], equipment: 'Poulie' },
  { id: 'tri-ext-poulie-corde', name: 'Extensions poulie corde', type: 'loaded', primary: 'Triceps', secondary: [], equipment: 'Poulie' },
  { id: 'tri-ext-halt-tete', name: 'Extensions haltère au-dessus de la tête', type: 'loaded', primary: 'Triceps', secondary: [], equipment: 'Haltère' },
  { id: 'tri-skull', name: 'Skullcrushers barre EZ', type: 'loaded', primary: 'Triceps', secondary: [], equipment: 'Barre EZ' },
  { id: 'tri-kickback', name: 'Kickback haltère', type: 'loaded', primary: 'Triceps', secondary: [], equipment: 'Haltère' },
  { id: 'tri-ext-uni-poulie', name: 'Extension unilatérale poulie', type: 'loaded', primary: 'Triceps', secondary: [], equipment: 'Poulie' },
  { id: 'tri-dc-serre', name: 'Développé couché serré', type: 'loaded', primary: 'Triceps', secondary: ['Pectoraux'], equipment: 'Barre' },
  { id: 'tri-dips', name: 'Dips parallèles', type: 'bodyweight', primary: 'Triceps', secondary: ['Pectoraux'], equipment: 'Barres parallèles' },
  { id: 'tri-dips-banc', name: 'Dips entre deux bancs', type: 'bodyweight', primary: 'Triceps', secondary: ['Pectoraux'], equipment: 'Bancs' },
  { id: 'tri-dips-lest', name: 'Dips lestés', type: 'weighted', primary: 'Triceps', secondary: ['Pectoraux'], equipment: 'Ceinture lestée' },
  { id: 'tri-dips-ass', name: 'Dips assistés machine', type: 'assisted', primary: 'Triceps', secondary: ['Pectoraux'], equipment: 'Machine' },

  // QUADRICEPS
  { id: 'q-squat', name: 'Squat barre dos', type: 'loaded', primary: 'Quadriceps', secondary: ['Fessiers', 'Ischios'], equipment: 'Barre' },
  { id: 'q-squat-front', name: 'Squat barre devant (front squat)', type: 'loaded', primary: 'Quadriceps', secondary: ['Fessiers'], equipment: 'Barre' },
  { id: 'q-squat-gob', name: 'Squat gobelet', type: 'loaded', primary: 'Quadriceps', secondary: ['Fessiers'], equipment: 'Haltère / Kettlebell' },
  { id: 'q-hack', name: 'Hack squat machine', type: 'loaded', primary: 'Quadriceps', secondary: ['Fessiers'], equipment: 'Machine' },
  { id: 'q-presse', name: 'Presse à cuisses', type: 'loaded', primary: 'Quadriceps', secondary: ['Fessiers', 'Ischios'], equipment: 'Machine' },
  { id: 'q-presse-h', name: 'Presse horizontale', type: 'loaded', primary: 'Quadriceps', secondary: ['Fessiers'], equipment: 'Machine' },
  { id: 'q-sissy', name: 'Sissy squat', type: 'bodyweight', primary: 'Quadriceps', secondary: [], equipment: 'Aucun' },
  { id: 'q-leg-ext', name: 'Leg extension machine', type: 'loaded', primary: 'Quadriceps', secondary: [], equipment: 'Machine' },
  { id: 'q-fentes-halt', name: 'Fentes haltères', type: 'loaded', primary: 'Quadriceps', secondary: ['Fessiers', 'Ischios'], equipment: 'Haltères' },
  { id: 'q-fentes-barre', name: 'Fentes barre', type: 'loaded', primary: 'Quadriceps', secondary: ['Fessiers'], equipment: 'Barre' },
  { id: 'q-fentes-march', name: 'Fentes marchées', type: 'loaded', primary: 'Quadriceps', secondary: ['Fessiers'], equipment: 'Haltères' },
  { id: 'q-fentes-bulg', name: 'Fentes bulgares', type: 'loaded', primary: 'Quadriceps', secondary: ['Fessiers'], equipment: 'Haltères' },
  { id: 'q-stepup', name: 'Step-up haltères', type: 'loaded', primary: 'Quadriceps', secondary: ['Fessiers'], equipment: 'Haltères + banc' },
  { id: 'q-squat-sumo', name: 'Squat sumo', type: 'loaded', primary: 'Quadriceps', secondary: ['Fessiers', 'Adducteurs'], equipment: 'Barre / Haltère' },
  { id: 'q-box', name: 'Box squat', type: 'loaded', primary: 'Quadriceps', secondary: ['Fessiers'], equipment: 'Barre + boîte' },

  // ISCHIOS / FESSIERS
  { id: 'is-leg-curl-a', name: 'Leg curl allongé', type: 'loaded', primary: 'Ischios', secondary: [], equipment: 'Machine' },
  { id: 'is-leg-curl-as', name: 'Leg curl assis', type: 'loaded', primary: 'Ischios', secondary: [], equipment: 'Machine' },
  { id: 'is-leg-curl-d', name: 'Leg curl debout', type: 'loaded', primary: 'Ischios', secondary: [], equipment: 'Machine' },
  { id: 'fess-hip-thrust', name: 'Hip thrust barre', type: 'loaded', primary: 'Fessiers', secondary: ['Ischios'], equipment: 'Barre' },
  { id: 'fess-glute-bridge', name: 'Glute bridge', type: 'loaded', primary: 'Fessiers', secondary: ['Ischios'], equipment: 'Barre / Haltère' },
  { id: 'fess-good-morning', name: 'Good morning', type: 'loaded', primary: 'Ischios', secondary: ['Fessiers', 'Lombaires'], equipment: 'Barre' },
  { id: 'is-nordic', name: 'Nordic curl', type: 'bodyweight', primary: 'Ischios', secondary: [], equipment: 'Aucun (partenaire)' },
  { id: 'fess-kickback-p', name: 'Cable kickback fessier', type: 'loaded', primary: 'Fessiers', secondary: [], equipment: 'Poulie' },
  { id: 'fess-abd', name: 'Abduction machine', type: 'loaded', primary: 'Fessiers', secondary: [], equipment: 'Machine' },
  { id: 'fess-add', name: 'Adduction machine', type: 'loaded', primary: 'Adducteurs', secondary: [], equipment: 'Machine' },

  // MOLLETS
  { id: 'mol-debout', name: 'Mollets debout machine', type: 'loaded', primary: 'Mollets', secondary: [], equipment: 'Machine' },
  { id: 'mol-assis', name: 'Mollets assis machine', type: 'loaded', primary: 'Mollets', secondary: [], equipment: 'Machine' },
  { id: 'mol-presse', name: 'Mollets à la presse', type: 'loaded', primary: 'Mollets', secondary: [], equipment: 'Presse' },
  { id: 'mol-uni-halt', name: 'Mollets unilatéral haltère', type: 'loaded', primary: 'Mollets', secondary: [], equipment: 'Haltère' },
  { id: 'mol-ane', name: 'Mollets âne (donkey calf)', type: 'loaded', primary: 'Mollets', secondary: [], equipment: 'Machine' },

  // ABDOS / CORE
  { id: 'ab-plank', name: 'Gainage frontal (planche)', type: 'time', primary: 'Abdos', secondary: ['Lombaires'], equipment: 'Aucun' },
  { id: 'ab-side-plank', name: 'Gainage latéral', type: 'time', primary: 'Obliques', secondary: ['Abdos'], equipment: 'Aucun' },
  { id: 'ab-hollow', name: 'Hollow body hold', type: 'time', primary: 'Abdos', secondary: [], equipment: 'Aucun' },
  { id: 'ab-crunch', name: 'Crunch', type: 'bodyweight', primary: 'Abdos', secondary: [], equipment: 'Aucun' },
  { id: 'ab-crunch-inv', name: 'Crunch inversé', type: 'bodyweight', primary: 'Abdos', secondary: [], equipment: 'Aucun' },
  { id: 'ab-leg-raise-susp', name: 'Relevé de jambes suspendu', type: 'bodyweight', primary: 'Abdos', secondary: [], equipment: 'Barre fixe' },
  { id: 'ab-leg-raise', name: 'Relevé de jambes allongé', type: 'bodyweight', primary: 'Abdos', secondary: [], equipment: 'Aucun' },
  { id: 'ab-russian', name: 'Russian twist', type: 'bodyweight', primary: 'Obliques', secondary: ['Abdos'], equipment: 'Aucun' },
  { id: 'ab-russian-lest', name: 'Russian twist lesté', type: 'weighted', primary: 'Obliques', secondary: ['Abdos'], equipment: 'Disque / Haltère' },
  { id: 'ab-mountain', name: 'Mountain climbers', type: 'bodyweight', primary: 'Abdos', secondary: [], equipment: 'Aucun' },
  { id: 'ab-wheel', name: 'Roue abdominale', type: 'bodyweight', primary: 'Abdos', secondary: ['Lombaires'], equipment: 'Roue' },
  { id: 'ab-dragon', name: 'Dragon flag', type: 'bodyweight', primary: 'Abdos', secondary: [], equipment: 'Banc' },
  { id: 'ab-crunch-poulie', name: 'Crunch poulie à genoux', type: 'loaded', primary: 'Abdos', secondary: [], equipment: 'Poulie' },
  { id: 'ab-side-bend', name: 'Side bend haltère', type: 'loaded', primary: 'Obliques', secondary: [], equipment: 'Haltère' },
  { id: 'ab-wood-chop', name: 'Wood chopper poulie', type: 'loaded', primary: 'Obliques', secondary: ['Abdos'], equipment: 'Poulie' },
  { id: 'ab-pallof', name: 'Pallof press', type: 'loaded', primary: 'Abdos', secondary: ['Obliques'], equipment: 'Poulie' },
  { id: 'ab-toes-bar', name: 'Toes to bar', type: 'bodyweight', primary: 'Abdos', secondary: [], equipment: 'Barre fixe' },

  // FONCTIONNEL
  { id: 'fn-burpees', name: 'Burpees', type: 'bodyweight', primary: 'Full body', secondary: [], equipment: 'Aucun' },
  { id: 'fn-kb-swing', name: 'Kettlebell swing', type: 'loaded', primary: 'Fessiers', secondary: ['Ischios', 'Dorsaux'], equipment: 'Kettlebell' },
  { id: 'fn-clean', name: 'Épaulé (clean)', type: 'loaded', primary: 'Full body', secondary: [], equipment: 'Barre' },
  { id: 'fn-snatch', name: 'Arraché (snatch)', type: 'loaded', primary: 'Full body', secondary: [], equipment: 'Barre' },
  { id: 'fn-thruster', name: 'Thruster', type: 'loaded', primary: 'Full body', secondary: [], equipment: 'Barre / Haltères' },
  { id: 'fn-farmer', name: 'Farmer\'s walk', type: 'loaded', primary: 'Trapèzes', secondary: ['Avant-bras', 'Full body'], equipment: 'Haltères' },
  { id: 'fn-tgu', name: 'Turkish get-up', type: 'loaded', primary: 'Full body', secondary: [], equipment: 'Kettlebell / Haltère' },
];

/* === MUSCLE GROUPS for filters === */
const MUSCLE_GROUPS = [
  'Pectoraux', 'Dorsaux', 'Épaules', 'Épaules postérieures', 'Biceps', 'Triceps',
  'Quadriceps', 'Ischios', 'Fessiers', 'Adducteurs', 'Mollets',
  'Abdos', 'Obliques', 'Lombaires', 'Trapèzes', 'Avant-bras', 'Full body'
];

const EQUIPMENT = [
  'Barre', 'Barre EZ', 'Haltères', 'Haltère', 'Machine', 'Poulie',
  'Aucun', 'Barre fixe', 'Barres parallèles', 'Ceinture lestée',
  'Banc à lombaires', 'Kettlebell', 'Trap bar', 'Disques', 'Roue', 'Banc',
  'Banc Larry Scott', 'Mur', 'Bancs', 'Haltère / Kettlebell', 'Barre / Haltère',
  'Barre + boîte', 'Barre + disque', 'Banc + disque', 'Haltères + banc',
  'Disque / Haltère', 'Haltère / Haltère', 'Kettlebell / Haltère',
  'Barre / TRX', 'Barre / Haltères', 'Aucun (partenaire)'
];

/* === DEFAULT TEMPLATES === */
const DEFAULT_TEMPLATES = [
  {
    id: 'tpl-a',
    name: 'Séance A',
    letter: 'A',
    exercises: [
      { exerciseId: 'q-squat', sets: 4, reps: '8', notes: '' },
      { exerciseId: 'pec-dc-barre', sets: 4, reps: '8', notes: '' },
      { exerciseId: 'dos-tirage-h', sets: 4, reps: '10', notes: '' },
      { exerciseId: 'ep-elev-lat', sets: 3, reps: '12-15', notes: '' },
      { exerciseId: 'bi-curl-halt-alt', sets: 3, reps: '10-12', notes: '' },
      { exerciseId: 'ab-plank', sets: 3, reps: '60s', notes: '' },
    ],
  },
  {
    id: 'tpl-b',
    name: 'Séance B',
    letter: 'B',
    exercises: [
      { exerciseId: 'dos-sdt-roumain', sets: 3, reps: '10', notes: '' },
      { exerciseId: 'ep-dm-halt', sets: 4, reps: '8-10', notes: '' },
      { exerciseId: 'dos-tractions', sets: 4, reps: '8-10', notes: '' },
      { exerciseId: 'q-fentes-halt', sets: 3, reps: '10/jambe', notes: '' },
      { exerciseId: 'pec-pompes', sets: 3, reps: 'max', notes: '' },
      { exerciseId: 'mol-debout', sets: 4, reps: '15', notes: '' },
    ],
  },
  {
    id: 'tpl-c',
    name: 'Séance C',
    letter: 'C',
    exercises: [
      { exerciseId: 'q-presse', sets: 4, reps: '10-12', notes: '' },
      { exerciseId: 'pec-di-halt', sets: 4, reps: '10', notes: '' },
      { exerciseId: 'dos-rowing-barre', sets: 4, reps: '8-10', notes: '' },
      { exerciseId: 'is-leg-curl-a', sets: 3, reps: '12', notes: '' },
      { exerciseId: 'ep-elev-lat', sets: 3, reps: '12-15', notes: '' },
      { exerciseId: 'tri-ext-poulie-corde', sets: 3, reps: '12', notes: '' },
    ],
  },
];

/* === STORAGE === */
const STORAGE_KEY = 'muscu.v1';

const Storage = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.error('Storage load error', e);
      return null;
    }
  },
  save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Storage save error', e);
      toast('Erreur de sauvegarde');
    }
  },
};

/* === STATE === */
const State = {
  templates: [],
  sessions: [],
  customExercises: [],
  activeSession: null,
  settings: { theme: 'dark' },
  ui: {
    currentScreen: 'sessions',
    historyDetailId: null,
    templateEditId: null,
    progressionExerciseId: null,
    libraryFilter: { search: '', muscle: null, equipment: null },
  },

  init() {
    const data = Storage.load();
    if (data) {
      this.templates = data.templates || JSON.parse(JSON.stringify(DEFAULT_TEMPLATES));
      this.sessions = data.sessions || [];
      this.customExercises = data.customExercises || [];
      this.activeSession = data.activeSession || null;
      this.settings = data.settings || { theme: 'dark' };
    } else {
      this.templates = JSON.parse(JSON.stringify(DEFAULT_TEMPLATES));
      this.sessions = [];
      this.customExercises = [];
      this.activeSession = null;
      this.save();
    }
  },

  save() {
    Storage.save({
      templates: this.templates,
      sessions: this.sessions,
      customExercises: this.customExercises,
      activeSession: this.activeSession,
      settings: this.settings,
    });
  },

  allExercises() {
    return [...EXERCISE_LIBRARY, ...this.customExercises];
  },

  exerciseById(id) {
    return this.allExercises().find(e => e.id === id);
  },

  templateById(id) {
    return this.templates.find(t => t.id === id);
  },
};

/* === HELPERS === */
function uid(prefix = 'id') {
  return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
}

function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function fmtDate(ts) {
  const d = new Date(ts);
  const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const months = ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}

function fmtDateShort(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

function fmtDateLong(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function relTime(ts) {
  const now = Date.now();
  const diff = now - ts;
  const day = 86400000;
  if (diff < day) return 'Aujourd\'hui';
  if (diff < 2 * day) return 'Hier';
  if (diff < 7 * day) return `Il y a ${Math.floor(diff / day)} jours`;
  return fmtDateShort(ts);
}

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (k === 'class') node.className = v;
    else if (k === 'style') node.style.cssText = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'html') node.innerHTML = v;
    else if (v !== false && v != null) node.setAttribute(k, v);
  }
  for (const child of children.flat(Infinity)) {
    if (child == null || child === false) continue;
    node.appendChild(typeof child === 'string' || typeof child === 'number' ? document.createTextNode(String(child)) : child);
  }
  return node;
}

function icon(name) {
  const ICONS = {
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    more: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.12 2.12 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
  };
  const s = document.createElement('span');
  s.innerHTML = ICONS[name] || '';
  s.style.display = 'inline-flex';
  s.style.alignItems = 'center';
  s.style.justifyContent = 'center';
  const svg = s.firstElementChild;
  if (svg) {
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
  }
  return s;
}

function typeLabel(type) {
  return { loaded: 'Chargé', bodyweight: 'Poids du corps', weighted: 'Lesté', assisted: 'Assisté', time: 'Temps' }[type] || type;
}

function typeBadgeShort(type) {
  return { loaded: 'KG', bodyweight: 'PdC', weighted: '+KG', assisted: '−KG', time: 'TIME' }[type] || type;
}

function toast(msg, duration = 2000) {
  const root = document.getElementById('toast-root');
  const t = el('div', { class: 'toast' }, msg);
  root.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.2s'; }, duration - 200);
  setTimeout(() => t.remove(), duration);
}

/* === MODALS === */
function openModal(opts) {
  closeModal();
  const root = document.getElementById('modal-root');
  const sheet = el('div', { class: 'modal-sheet' + (opts.full ? ' full' : '') });

  const header = el('div', { class: 'modal-header' },
    el('h2', {}, opts.title || ''),
    el('button', { class: 'modal-close', onclick: closeModal, 'aria-label': 'Fermer' }, icon('close'))
  );
  sheet.appendChild(header);

  const body = el('div', { class: 'modal-body' });
  if (typeof opts.body === 'string') body.innerHTML = opts.body;
  else if (opts.body) body.appendChild(opts.body);
  sheet.appendChild(body);

  if (opts.footer) {
    const footer = el('div', { class: 'modal-footer' });
    if (Array.isArray(opts.footer)) opts.footer.forEach(b => footer.appendChild(b));
    else footer.appendChild(opts.footer);
    sheet.appendChild(footer);
  }

  const backdrop = el('div', { class: 'modal-backdrop' }, sheet);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
  root.appendChild(backdrop);

  return { body, sheet, backdrop };
}

function closeModal() {
  const root = document.getElementById('modal-root');
  root.innerHTML = '';
}

function openConfirm(msg, onConfirm, opts = {}) {
  const body = el('div', {}, el('p', { style: 'padding: 12px 0; font-size: 15px; line-height: 1.5;' }, msg));
  const cancel = el('button', { class: 'btn btn-secondary', onclick: closeModal }, 'Annuler');
  const ok = el('button', {
    class: 'btn ' + (opts.danger ? 'btn-danger' : 'btn-primary'),
    onclick: () => { closeModal(); onConfirm(); }
  }, opts.okLabel || 'Confirmer');
  openModal({ title: opts.title || 'Confirmation', body, footer: [cancel, ok] });
}

function openActionMenu(title, actions) {
  const menu = el('div', { class: 'action-menu' });
  actions.forEach(a => {
    if (!a) return;
    const btn = el('button', {
      class: 'action-menu-item' + (a.danger ? ' danger' : ''),
      onclick: () => { closeModal(); a.handler(); },
    }, a.label);
    menu.appendChild(btn);
  });
  openModal({ title, body: menu });
}

/* === ROUTER === */
function showScreen(name, params = {}) {
  State.ui.currentScreen = name;
  Object.assign(State.ui, params);
  render();
  // Update nav
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.screen === name);
  });
}

document.addEventListener('click', e => {
  const navBtn = e.target.closest('.nav-btn');
  if (navBtn) {
    const screen = navBtn.dataset.screen;
    showScreen(screen);
  }
});

/* === MAIN RENDER === */
function render() {
  const root = document.getElementById('screens');
  root.innerHTML = '';

  const screenName = State.ui.currentScreen;
  let screen;
  switch (screenName) {
    case 'sessions': screen = renderSessionsScreen(); break;
    case 'active-session': screen = renderActiveSessionScreen(); break;
    case 'history': screen = renderHistoryScreen(); break;
    case 'history-detail': screen = renderHistoryDetailScreen(); break;
    case 'progression': screen = renderProgressionScreen(); break;
    case 'library': screen = renderLibraryScreen(); break;
    case 'template-edit': screen = renderTemplateEditScreen(); break;
    case 'summary': screen = renderSummaryScreen(); break;
    case 'settings': screen = renderSettingsScreen(); break;
    default: screen = renderSessionsScreen();
  }
  screen.classList.add('active');
  root.appendChild(screen);
  window.scrollTo(0, 0);
}

/* === SESSIONS SCREEN === */
function renderSessionsScreen() {
  const screen = el('section', { class: 'screen' });

  const header = el('header', { class: 'screen-header' },
    el('h1', {}, 'Séances'),
    el('button', { class: 'h-action', onclick: () => showScreen('settings'), 'aria-label': 'Réglages' }, '⋯')
  );
  screen.appendChild(header);

  const body = el('div', { class: 'screen-body' });

  // Active session resume banner
  if (State.activeSession) {
    const tpl = State.templateById(State.activeSession.templateId);
    const resume = el('div', {
      class: 'card',
      style: 'background: var(--accent-soft); border-color: var(--accent-dim); margin-bottom: 16px; cursor: pointer;',
      onclick: () => showScreen('active-session'),
    },
      el('div', { class: 'section-title', style: 'margin: 0 0 4px; color: var(--accent);' }, 'Séance en cours'),
      el('div', { style: 'font-weight: 600; font-size: 16px;' }, tpl ? tpl.name : 'Séance personnalisée'),
      el('div', { style: 'font-size: 13px; color: var(--text-dim); margin-top: 4px;' },
        `Reprendre · démarrée ${relTime(State.activeSession.startedAt).toLowerCase()}`)
    );
    body.appendChild(resume);
  }

  // Templates
  if (State.templates.length === 0) {
    body.appendChild(el('div', { class: 'empty' },
      el('div', { class: 'icon' }, '🏋️'),
      el('div', {}, 'Aucune séance configurée.'),
    ));
  } else {
    State.templates.forEach(tpl => body.appendChild(renderSessionCard(tpl)));
  }

  // New session button
  const addBtn = el('button', { class: 'btn-add', onclick: () => createNewTemplate() },
    icon('plus'), 'Nouvelle séance'
  );
  body.appendChild(addBtn);

  screen.appendChild(body);
  return screen;
}

function renderSessionCard(tpl) {
  // Find last session for this template
  const lastSession = State.sessions
    .filter(s => s.templateId === tpl.id)
    .sort((a, b) => b.startedAt - a.startedAt)[0];

  const meta = lastSession
    ? `Dernière fois : ${relTime(lastSession.startedAt).toLowerCase()} · ${tpl.exercises.length} exos`
    : `${tpl.exercises.length} exercices`;

  const card = el('div', { class: 'session-card' },
    el('div', { class: 'session-letter' }, tpl.letter || tpl.name.charAt(0)),
    el('div', { class: 'session-info' },
      el('div', { class: 'name' }, tpl.name),
      el('div', { class: 'meta' }, meta)
    ),
    el('button', {
      class: 'btn-edit',
      'aria-label': 'Options',
      onclick: e => { e.stopPropagation(); openTemplateMenu(tpl); }
    }, icon('more'))
  );

  card.addEventListener('click', () => startSession(tpl));
  return card;
}

function openTemplateMenu(tpl) {
  openActionMenu(tpl.name, [
    { label: 'Démarrer la séance', handler: () => startSession(tpl) },
    { label: 'Modifier le template', handler: () => showScreen('template-edit', { templateEditId: tpl.id }) },
    { label: 'Dupliquer', handler: () => duplicateTemplate(tpl.id) },
    { label: 'Supprimer', danger: true, handler: () => deleteTemplate(tpl.id) },
  ]);
}

function startSession(tpl) {
  if (State.activeSession) {
    openConfirm(
      'Une séance est déjà en cours. La remplacer par celle-ci ? Les données non sauvegardées seront perdues.',
      () => doStartSession(tpl),
      { danger: true, okLabel: 'Remplacer' }
    );
    return;
  }
  doStartSession(tpl);
}

function doStartSession(tpl) {
  const session = {
    id: uid('ses'),
    templateId: tpl.id,
    templateName: tpl.name,
    startedAt: Date.now(),
    conditions: { sleep: '', energy: '', meal: '' },
    exercises: tpl.exercises.map(e => {
      const n = Number(e.sets) || 3;
      const sets = [];
      for (let i = 0; i < n; i++) {
        sets.push({ reps: null, weight: null, done: false, setType: null });
      }
      return {
        exerciseId: e.exerciseId,
        targetSets: n,
        targetReps: e.reps,
        sets,
      };
    }),
    notes: '',
  };
  State.activeSession = session;
  State.save();
  showScreen('active-session');
}

function createNewTemplate() {
  const tpl = {
    id: uid('tpl'),
    name: 'Nouvelle séance',
    letter: '+',
    exercises: [],
  };
  State.templates.push(tpl);
  State.save();
  showScreen('template-edit', { templateEditId: tpl.id });
}

function duplicateTemplate(id) {
  const tpl = State.templateById(id);
  if (!tpl) return;
  const copy = JSON.parse(JSON.stringify(tpl));
  copy.id = uid('tpl');
  copy.name = tpl.name + ' (copie)';
  State.templates.push(copy);
  State.save();
  render();
  toast('Séance dupliquée');
}

function deleteTemplate(id) {
  openConfirm(
    'Supprimer ce template ? Les séances déjà enregistrées dans l\'historique sont conservées.',
    () => {
      State.templates = State.templates.filter(t => t.id !== id);
      State.save();
      render();
      toast('Supprimé');
    },
    { danger: true, okLabel: 'Supprimer' }
  );
}

function openSettingsMenu() {
  openActionMenu('Réglages', [
    { label: 'Exporter mes données (JSON)', handler: exportAllData },
    { label: 'Importer un JSON', handler: importDataPrompt },
    { label: 'Exporter pour analyse Claude', handler: exportForClaude },
    { label: 'Tout effacer', danger: true, handler: confirmWipe },
  ]);
}

/* === ACTIVE SESSION SCREEN === */
function renderActiveSessionScreen() {
  const screen = el('section', { class: 'screen' });
  const session = State.activeSession;

  if (!session) {
    setTimeout(() => showScreen('sessions'), 0);
    return screen;
  }

  const header = el('header', { class: 'screen-header' },
    el('button', { class: 'h-back', onclick: () => showScreen('sessions'), 'aria-label': 'Retour' }, icon('back')),
    el('h1', {}, session.templateName || 'Séance'),
    el('button', { class: 'h-action', onclick: () => abandonSession() }, 'Abandonner')
  );
  screen.appendChild(header);

  const body = el('div', { class: 'screen-body' });

  // Conditions block
  body.appendChild(renderConditionsBlock(session));

  // Exercises
  session.exercises.forEach((exo, idx) => {
    body.appendChild(renderActiveExerciseCard(exo, idx));
  });

  // Add exercise button
  body.appendChild(el('button', {
    class: 'btn-add',
    onclick: () => openExercisePicker(exerciseId => addExerciseToActive(exerciseId)),
  }, icon('plus'), 'Ajouter un exercice'));

  // Session notes
  body.appendChild(el('label', { class: 'label-row' }, 'Notes / ressenti'));
  const notesInput = el('textarea', {
    placeholder: 'Sensations, observations, douleurs...',
    onchange: e => { session.notes = e.target.value; State.save(); },
    oninput: e => { session.notes = e.target.value; },
  });
  notesInput.value = session.notes || '';
  notesInput.addEventListener('blur', () => State.save());
  body.appendChild(notesInput);

  // Finish button
  body.appendChild(el('div', { style: 'height: 12px;' }));
  body.appendChild(el('button', {
    class: 'btn btn-primary btn-block',
    onclick: finishSession,
    style: 'padding: 16px;',
  }, 'Terminer la séance'));

  screen.appendChild(body);
  return screen;
}

function renderConditionsBlock(session) {
  const block = el('div', { class: 'conditions' });
  block.appendChild(el('h3', {}, 'Conditions de récup'));
  const row = el('div', { class: 'cond-row' });

  const sleepWrap = el('div', {});
  sleepWrap.appendChild(el('label', {}, 'Sommeil (h)'));
  const sleepInput = el('input', {
    type: 'number', inputmode: 'decimal', step: '0.5', min: '0', max: '24',
    placeholder: '7',
    onchange: e => { session.conditions.sleep = e.target.value; State.save(); },
  });
  sleepInput.value = session.conditions.sleep || '';
  sleepWrap.appendChild(sleepInput);

  const energyWrap = el('div', {});
  energyWrap.appendChild(el('label', {}, 'Énergie /10'));
  const energyInput = el('input', {
    type: 'number', inputmode: 'numeric', min: '1', max: '10',
    placeholder: '7',
    onchange: e => { session.conditions.energy = e.target.value; State.save(); },
  });
  energyInput.value = session.conditions.energy || '';
  energyWrap.appendChild(energyInput);

  const mealWrap = el('div', {});
  mealWrap.appendChild(el('label', {}, 'Repas avant'));
  const mealInput = el('input', {
    type: 'text', placeholder: 'oui / léger / non',
    onchange: e => { session.conditions.meal = e.target.value; State.save(); },
  });
  mealInput.value = session.conditions.meal || '';
  mealWrap.appendChild(mealInput);

  row.appendChild(sleepWrap);
  row.appendChild(energyWrap);
  row.appendChild(mealWrap);
  block.appendChild(row);
  return block;
}

function renderActiveExerciseCard(exo, idx) {
  const exDef = State.exerciseById(exo.exerciseId);
  const card = el('div', { class: 'exo-card' });

  const header = el('div', { class: 'exo-header' });
  const nameWrap = el('div', { class: 'exo-name' });
  nameWrap.appendChild(el('span', {}, exDef ? exDef.name : 'Exercice'));
  if (exDef) {
    nameWrap.appendChild(el('span', { class: 'exo-type-badge ' + exDef.type }, typeBadgeShort(exDef.type)));
  }
  const targetText = el('div', { class: 'exo-target' }, `Cible : ${exo.targetSets || '—'} × ${exo.targetReps || '—'}`);

  const titleBlock = el('div', { style: 'flex: 1; min-width: 0;' }, nameWrap, targetText);
  header.appendChild(titleBlock);
  header.appendChild(el('button', {
    class: 'exo-menu-btn',
    'aria-label': 'Options',
    onclick: () => openActiveExoMenu(idx),
  }, icon('more')));
  card.appendChild(header);

  const setList = el('div', { class: 'set-list' });
  exo.sets.forEach((set, sidx) => setList.appendChild(renderSetRow(exo, set, sidx, exDef)));

  setList.appendChild(el('button', {
    class: 'set-add',
    onclick: () => addSet(idx),
  }, '+ Ajouter un set'));

  card.appendChild(setList);
  return card;
}

function renderSetRow(exo, set, sidx, exDef) {
  // Determine effective type for this set (set.setType overrides exDef.type)
  const type = set.setType || (exDef ? exDef.type : 'loaded');

  const row = el('div', { class: 'set-row' + (set.done ? ' done' : '') + (type === 'bodyweight' ? ' bodyweight' : '') });
  row.appendChild(el('div', { class: 'set-num' }, sidx + 1));

  const repsInput = el('input', {
    type: 'number', inputmode: 'numeric', min: '0',
    placeholder: type === 'time' ? 'sec' : 'reps',
    onchange: e => { set.reps = e.target.value === '' ? null : Number(e.target.value); State.save(); },
  });
  repsInput.value = set.reps != null ? set.reps : '';
  const repsWrap = el('div', { class: 'set-input-wrap' }, repsInput,
    el('span', { class: 'set-input-label' }, type === 'time' ? 's' : '×')
  );
  row.appendChild(repsWrap);

  if (type !== 'bodyweight' && type !== 'time') {
    const weightInput = el('input', {
      type: 'number', inputmode: 'decimal', step: '0.5', min: '0',
      placeholder: type === 'assisted' ? 'assist' : 'kg',
      onchange: e => { set.weight = e.target.value === '' ? null : Number(e.target.value); State.save(); },
    });
    weightInput.value = set.weight != null ? set.weight : '';
    const labelText = type === 'assisted' ? 'kg' : (type === 'weighted' ? '+kg' : 'kg');
    const weightWrap = el('div', { class: 'set-input-wrap' }, weightInput,
      el('span', { class: 'set-input-label' }, labelText)
    );
    row.appendChild(weightWrap);
  }

  const checkBtn = el('button', {
    class: 'set-check' + (set.done ? ' done' : ''),
    'aria-label': set.done ? 'Marquer non fait' : 'Marquer fait',
    onclick: () => toggleSetDone(exo, set, sidx),
  }, icon('check'));
  // Long-press to delete
  let pressTimer;
  checkBtn.addEventListener('contextmenu', e => e.preventDefault());
  const onPress = () => { pressTimer = setTimeout(() => promptDeleteSet(exo, sidx), 700); };
  const onRelease = () => clearTimeout(pressTimer);
  checkBtn.addEventListener('touchstart', onPress, { passive: true });
  checkBtn.addEventListener('touchend', onRelease);
  checkBtn.addEventListener('touchcancel', onRelease);
  checkBtn.addEventListener('mousedown', onPress);
  checkBtn.addEventListener('mouseup', onRelease);
  checkBtn.addEventListener('mouseleave', onRelease);

  row.appendChild(checkBtn);
  return row;
}

function toggleSetDone(exo, set, sidx) {
  set.done = !set.done;
  if (set.done && set.reps == null && State.activeSession) {
    // Try to autofill from previous set
    const prev = exo.sets[sidx - 1];
    if (prev && prev.reps != null) {
      set.reps = prev.reps;
      if (prev.weight != null) set.weight = prev.weight;
    }
  }
  State.save();
  render();
}

function promptDeleteSet(exo, sidx) {
  exo.sets.splice(sidx, 1);
  State.save();
  render();
  toast('Set supprimé');
}

function addSet(exoIdx) {
  const session = State.activeSession;
  const exo = session.exercises[exoIdx];
  const lastSet = exo.sets[exo.sets.length - 1];
  const newSet = {
    reps: null,
    weight: null,
    done: false,
    setType: lastSet ? lastSet.setType : (exo.setTypeOverride || null),
  };
  if (lastSet) {
    // pre-fill from last set as a guess
    newSet.reps = null; // user fills
    newSet.weight = lastSet.weight;
  }
  exo.sets.push(newSet);
  State.save();
  render();
}

function openActiveExoMenu(idx) {
  const session = State.activeSession;
  const exo = session.exercises[idx];
  const exDef = State.exerciseById(exo.exerciseId);

  const actions = [
    { label: 'Changer la cible', handler: () => editExoTarget(idx) },
    { label: 'Remplacer l\'exercice', handler: () => openExercisePicker(id => { exo.exerciseId = id; State.save(); render(); }) },
  ];

  // Allow set type override for current sets
  if (exDef && (exDef.type === 'bodyweight' || exDef.type === 'weighted' || exDef.type === 'assisted')) {
    actions.push({ label: 'Mode de saisie des sets...', handler: () => openSetTypeOverride(idx) });
  }

  if (idx > 0) actions.push({ label: 'Monter', handler: () => { [session.exercises[idx-1], session.exercises[idx]] = [session.exercises[idx], session.exercises[idx-1]]; State.save(); render(); } });
  if (idx < session.exercises.length - 1) actions.push({ label: 'Descendre', handler: () => { [session.exercises[idx+1], session.exercises[idx]] = [session.exercises[idx], session.exercises[idx+1]]; State.save(); render(); } });

  actions.push({ label: 'Supprimer l\'exercice', danger: true, handler: () => {
    openConfirm('Supprimer cet exercice de la séance ?', () => {
      session.exercises.splice(idx, 1);
      State.save();
      render();
    }, { danger: true, okLabel: 'Supprimer' });
  }});

  openActionMenu(exDef ? exDef.name : 'Exercice', actions);
}

function editExoTarget(idx) {
  const exo = State.activeSession.exercises[idx];
  const setsInput = el('input', { type: 'number', min: '1', value: exo.targetSets || '' });
  const repsInput = el('input', { type: 'text', value: exo.targetReps || '', placeholder: 'ex: 8 ou 8-10' });

  const body = el('div', {},
    el('label', { class: 'label-row' }, 'Séries cibles'),
    setsInput,
    el('label', { class: 'label-row' }, 'Reps cibles'),
    repsInput
  );
  const save = el('button', { class: 'btn btn-primary', onclick: () => {
    exo.targetSets = Number(setsInput.value) || exo.targetSets;
    exo.targetReps = repsInput.value;
    State.save();
    closeModal();
    render();
  }}, 'Enregistrer');
  const cancel = el('button', { class: 'btn btn-secondary', onclick: closeModal }, 'Annuler');
  openModal({ title: 'Modifier la cible', body, footer: [cancel, save] });
}

function openSetTypeOverride(exoIdx) {
  const exo = State.activeSession.exercises[exoIdx];
  const exDef = State.exerciseById(exo.exerciseId);
  const body = el('div', {});
  body.appendChild(el('p', { style: 'color: var(--text-dim); font-size: 13px; margin-bottom: 12px;' },
    'Définit le mode par défaut pour les nouveaux sets ajoutés. Les sets existants ne sont pas modifiés.'));

  ['bodyweight', 'weighted', 'assisted'].forEach(type => {
    const btn = el('button', {
      class: 'action-menu-item',
      onclick: () => {
        exo.setTypeOverride = type;
        // Apply to empty sets
        exo.sets.forEach(s => { if (!s.done && (s.reps == null && s.weight == null)) s.setType = type; });
        State.save();
        closeModal();
        render();
      }
    }, typeLabel(type));
    body.appendChild(btn);
  });
  openModal({ title: 'Mode de saisie', body });
}

function abandonSession() {
  openConfirm(
    'Abandonner cette séance ? Les données saisies seront perdues.',
    () => {
      State.activeSession = null;
      State.save();
      showScreen('sessions');
      toast('Séance abandonnée');
    },
    { danger: true, okLabel: 'Abandonner' }
  );
}

function addExerciseToActive(exerciseId) {
  const exDef = State.exerciseById(exerciseId);
  if (!exDef) return;
  const sets = [];
  for (let i = 0; i < 3; i++) sets.push({ reps: null, weight: null, done: false, setType: null });
  State.activeSession.exercises.push({
    exerciseId,
    targetSets: 3,
    targetReps: '10',
    sets,
  });
  State.save();
  render();
}

function finishSession() {
  const session = State.activeSession;
  if (!session) return;

  // Check if any sets logged
  const totalDone = session.exercises.reduce((s, e) => s + e.sets.filter(x => x.done).length, 0);
  if (totalDone === 0) {
    openConfirm(
      'Aucun set validé. Terminer quand même ?',
      () => doFinishSession(),
      { danger: false, okLabel: 'Terminer' }
    );
    return;
  }

  doFinishSession();
}

function doFinishSession() {
  const session = State.activeSession;
  session.endedAt = Date.now();
  // Persist to sessions
  State.sessions.push(session);
  const finishedSessionId = session.id;
  State.activeSession = null;
  State.save();
  showScreen('summary', { historyDetailId: finishedSessionId });
}

/* === LIBRARY SCREEN === */
function renderLibraryScreen() {
  const screen = el('section', { class: 'screen' });
  const header = el('header', { class: 'screen-header' },
    el('h1', {}, 'Bibliothèque'),
    el('button', { class: 'h-action', onclick: openCreateCustomExercise }, '+ Custom')
  );
  screen.appendChild(header);
  screen.appendChild(renderLibraryBody({ pickerMode: false }));
  return screen;
}

function renderLibraryBody(opts = {}) {
  const body = el('div', { class: 'screen-body' });
  const filter = State.ui.libraryFilter;

  // Search
  const searchInput = el('input', {
    type: 'search', placeholder: 'Rechercher un exercice...',
    autocomplete: 'off',
    oninput: e => {
      filter.search = e.target.value;
      updateLibList();
    },
  });
  searchInput.value = filter.search || '';
  body.appendChild(el('div', { class: 'search-bar' }, searchInput));

  // Filter chips
  const allChip = el('button', { class: 'chip' + (!filter.muscle ? ' active' : ''), onclick: () => { filter.muscle = null; updateLibList(); renderChips(); } }, 'Tous');
  const chipsRow = el('div', { class: 'filter-chips' }, allChip);
  MUSCLE_GROUPS.forEach(m => {
    const c = el('button', { class: 'chip' + (filter.muscle === m ? ' active' : ''), onclick: () => { filter.muscle = filter.muscle === m ? null : m; updateLibList(); renderChips(); } }, m);
    chipsRow.appendChild(c);
  });
  body.appendChild(chipsRow);

  function renderChips() {
    chipsRow.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    if (!filter.muscle) allChip.classList.add('active');
    else {
      [...chipsRow.querySelectorAll('.chip')].find(c => c.textContent === filter.muscle)?.classList.add('active');
    }
  }

  // List container
  const list = el('div', { id: 'lib-list' });
  body.appendChild(list);

  function updateLibList() {
    list.innerHTML = '';
    const q = (filter.search || '').toLowerCase().trim();
    const items = State.allExercises().filter(e => {
      if (filter.muscle && e.primary !== filter.muscle && !(e.secondary || []).includes(filter.muscle)) return false;
      if (q && !e.name.toLowerCase().includes(q) && !e.primary.toLowerCase().includes(q)) return false;
      return true;
    });
    if (items.length === 0) {
      list.appendChild(el('div', { class: 'empty' }, el('div', {}, 'Aucun exercice trouvé.')));
      return;
    }
    items.forEach(ex => {
      const item = el('div', { class: 'lib-item', onclick: () => opts.pickerMode ? opts.onPick(ex.id) : openExerciseDetail(ex.id) },
        el('div', { class: 'grow' },
          el('div', { class: 'name' }, ex.name,
            el('span', { class: 'exo-type-badge ' + ex.type }, typeBadgeShort(ex.type))
          ),
          el('div', { class: 'meta' }, ex.primary + ' · ' + ex.equipment)
        )
      );
      if (opts.pickerMode) {
        item.appendChild(el('div', { style: 'color: var(--accent);' }, icon('plus')));
      }
      list.appendChild(item);
    });
  }
  updateLibList();

  return body;
}

function openExercisePicker(onPick) {
  const body = renderLibraryBody({
    pickerMode: true,
    onPick: id => {
      closeModal();
      onPick(id);
    },
  });
  openModal({ title: 'Choisir un exercice', body, full: true });
}

function openExerciseDetail(id) {
  const ex = State.exerciseById(id);
  if (!ex) return;
  const body = el('div', {});
  body.appendChild(el('div', { class: 'card' },
    el('div', { style: 'font-size: 18px; font-weight: 600; margin-bottom: 12px;' }, ex.name),
    el('div', { class: 'label-row' }, 'Type'),
    el('div', {}, typeLabel(ex.type)),
    el('div', { class: 'label-row' }, 'Muscle principal'),
    el('div', {}, ex.primary),
    ex.secondary && ex.secondary.length ? el('div', {},
      el('div', { class: 'label-row' }, 'Muscles secondaires'),
      el('div', {}, ex.secondary.join(', '))
    ) : null,
    el('div', { class: 'label-row' }, 'Équipement'),
    el('div', {}, ex.equipment),
  ));

  const actions = [];
  if (ex.isCustom) {
    actions.push(el('button', { class: 'btn btn-danger', onclick: () => {
      openConfirm('Supprimer cet exercice custom ?', () => {
        State.customExercises = State.customExercises.filter(c => c.id !== ex.id);
        State.save();
        closeModal();
        render();
      }, { danger: true, okLabel: 'Supprimer' });
    }}, 'Supprimer'));
  }
  actions.push(el('button', { class: 'btn btn-secondary', onclick: closeModal }, 'Fermer'));
  openModal({ title: 'Exercice', body, footer: actions });
}

function openCreateCustomExercise() {
  const nameI = el('input', { type: 'text', placeholder: 'Nom de l\'exercice' });
  const typeI = el('select', {});
  ['loaded', 'bodyweight', 'weighted', 'assisted', 'time'].forEach(t => {
    typeI.appendChild(el('option', { value: t }, typeLabel(t)));
  });
  const primaryI = el('select', {});
  MUSCLE_GROUPS.forEach(m => primaryI.appendChild(el('option', { value: m }, m)));
  const equipI = el('input', { type: 'text', placeholder: 'Équipement (ex: Haltères)' });
  const secI = el('input', { type: 'text', placeholder: 'Muscles secondaires (séparés par virgule)' });

  const body = el('div', {},
    el('label', { class: 'label-row' }, 'Nom'),
    nameI,
    el('label', { class: 'label-row' }, 'Type'),
    typeI,
    el('label', { class: 'label-row' }, 'Muscle principal'),
    primaryI,
    el('label', { class: 'label-row' }, 'Muscles secondaires'),
    secI,
    el('label', { class: 'label-row' }, 'Équipement'),
    equipI,
  );

  const save = el('button', { class: 'btn btn-primary', onclick: () => {
    if (!nameI.value.trim()) { toast('Nom requis'); return; }
    const ex = {
      id: uid('cust'),
      name: nameI.value.trim(),
      type: typeI.value,
      primary: primaryI.value,
      secondary: secI.value ? secI.value.split(',').map(s => s.trim()).filter(Boolean) : [],
      equipment: equipI.value.trim() || 'Aucun',
      isCustom: true,
    };
    State.customExercises.push(ex);
    State.save();
    closeModal();
    render();
    toast('Exercice ajouté');
  }}, 'Créer');
  const cancel = el('button', { class: 'btn btn-secondary', onclick: closeModal }, 'Annuler');

  openModal({ title: 'Nouvel exercice', body, footer: [cancel, save] });
}

/* === HISTORY SCREEN === */
function renderHistoryScreen() {
  const screen = el('section', { class: 'screen' });
  screen.appendChild(el('header', { class: 'screen-header' }, el('h1', {}, 'Historique')));
  const body = el('div', { class: 'screen-body' });

  if (State.sessions.length === 0) {
    body.appendChild(el('div', { class: 'empty' },
      el('div', { class: 'icon' }, '📜'),
      el('div', {}, 'Aucune séance enregistrée.'),
      el('div', { style: 'margin-top: 8px; font-size: 13px;' }, 'Termine une séance pour la voir ici.'),
    ));
  } else {
    const sorted = [...State.sessions].sort((a, b) => b.startedAt - a.startedAt);
    sorted.forEach(s => {
      const setCount = s.exercises.reduce((sum, e) => sum + e.sets.filter(x => x.done).length, 0);
      const item = el('div', { class: 'hist-item', onclick: () => showScreen('history-detail', { historyDetailId: s.id }) },
        el('div', { class: 'date' }, fmtDate(s.startedAt)),
        el('div', { class: 'session-name' }, s.templateName || 'Séance'),
        el('div', { class: 'summary' }, `${s.exercises.length} exos · ${setCount} sets validés`)
      );
      body.appendChild(item);
    });
  }

  screen.appendChild(body);
  return screen;
}

function renderHistoryDetailScreen() {
  const screen = el('section', { class: 'screen' });
  const id = State.ui.historyDetailId;
  const session = State.sessions.find(s => s.id === id);
  if (!session) {
    setTimeout(() => showScreen('history'), 0);
    return screen;
  }

  const header = el('header', { class: 'screen-header' },
    el('button', { class: 'h-back', onclick: () => showScreen('history'), 'aria-label': 'Retour' }, icon('back')),
    el('h1', {}, session.templateName || 'Séance'),
    el('button', { class: 'h-action', onclick: () => openHistoryDetailMenu(session) }, '⋯')
  );
  screen.appendChild(header);

  const body = el('div', { class: 'screen-body' });
  body.appendChild(el('div', { style: 'color: var(--text-dim); font-size: 14px; margin-bottom: 16px;' }, fmtDateLong(session.startedAt)));

  // Conditions
  const c = session.conditions || {};
  if (c.sleep || c.energy || c.meal) {
    body.appendChild(el('div', { class: 'card' },
      el('h3', { style: 'font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: 8px;' }, 'Conditions'),
      el('div', { class: 'cond-row', style: 'display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;' },
        el('div', {}, el('div', { style: 'font-size: 11px; color: var(--text-muted);' }, 'SOMMEIL'), el('div', { style: 'font-family: var(--font-mono);' }, c.sleep ? c.sleep + 'h' : '—')),
        el('div', {}, el('div', { style: 'font-size: 11px; color: var(--text-muted);' }, 'ÉNERGIE'), el('div', { style: 'font-family: var(--font-mono);' }, c.energy ? c.energy + '/10' : '—')),
        el('div', {}, el('div', { style: 'font-size: 11px; color: var(--text-muted);' }, 'REPAS'), el('div', { style: 'font-size: 13px;' }, c.meal || '—')),
      )
    ));
  }

  // Exercises
  session.exercises.forEach(exo => {
    const exDef = State.exerciseById(exo.exerciseId);
    const card = el('div', { class: 'card' });
    card.appendChild(el('div', { style: 'font-weight: 600; font-size: 16px; margin-bottom: 4px;' },
      exDef ? exDef.name : 'Exercice',
      exDef ? el('span', { class: 'exo-type-badge ' + exDef.type }, typeBadgeShort(exDef.type)) : null
    ));
    card.appendChild(el('div', { class: 'exo-target', style: 'margin-bottom: 8px;' }, `Cible : ${exo.targetSets || '—'} × ${exo.targetReps || '—'}`));

    if (exo.sets.length === 0) {
      card.appendChild(el('div', { style: 'color: var(--text-muted); font-size: 13px;' }, 'Aucun set logué'));
    } else {
      exo.sets.forEach((set, i) => {
        const t = set.setType || (exDef ? exDef.type : 'loaded');
        let line;
        if (t === 'bodyweight') line = `${set.reps != null ? set.reps : '—'} reps`;
        else if (t === 'time') line = `${set.reps != null ? set.reps + 's' : '—'}`;
        else if (t === 'assisted') line = `${set.reps != null ? set.reps : '—'} reps × −${set.weight != null ? set.weight : '—'} kg`;
        else if (t === 'weighted') line = `${set.reps != null ? set.reps : '—'} reps × +${set.weight != null ? set.weight : '—'} kg`;
        else line = `${set.reps != null ? set.reps : '—'} reps × ${set.weight != null ? set.weight : '—'} kg`;
        const setRow = el('div', { style: 'display: flex; align-items: center; gap: 10px; padding: 4px 0; border-top: 1px solid var(--border); font-family: var(--font-mono); font-size: 14px;' },
          el('span', { style: 'color: var(--text-muted); width: 24px;' }, i + 1),
          el('span', { style: 'flex: 1;' }, line),
          el('span', { style: 'color: ' + (set.done ? 'var(--accent)' : 'var(--text-muted)') + ';' }, set.done ? '✓' : '—')
        );
        card.appendChild(setRow);
      });
    }
    body.appendChild(card);
  });

  if (session.notes) {
    body.appendChild(el('label', { class: 'label-row' }, 'Notes'));
    body.appendChild(el('div', { class: 'card', style: 'white-space: pre-wrap;' }, session.notes));
  }

  screen.appendChild(body);
  return screen;
}

function openHistoryDetailMenu(session) {
  openActionMenu(session.templateName || 'Séance', [
    { label: 'Modifier cette séance', handler: () => editHistorySession(session) },
    { label: 'Supprimer cette séance', danger: true, handler: () => deleteHistorySession(session.id) },
  ]);
}

function editHistorySession(session) {
  // Convert to active session for editing
  openConfirm(
    'Remettre cette séance en édition ? Elle redeviendra la séance en cours.',
    () => {
      if (State.activeSession) {
        toast('Une séance est déjà en cours, termine-la d\'abord.');
        return;
      }
      State.sessions = State.sessions.filter(s => s.id !== session.id);
      State.activeSession = session;
      delete State.activeSession.endedAt;
      State.save();
      showScreen('active-session');
    },
    { okLabel: 'Éditer' }
  );
}

function deleteHistorySession(id) {
  openConfirm(
    'Supprimer cette séance de l\'historique ? Cette action est irréversible.',
    () => {
      State.sessions = State.sessions.filter(s => s.id !== id);
      State.save();
      showScreen('history');
      toast('Séance supprimée');
    },
    { danger: true, okLabel: 'Supprimer' }
  );
}

/* === PROGRESSION SCREEN === */
function renderProgressionScreen() {
  const screen = el('section', { class: 'screen' });
  screen.appendChild(el('header', { class: 'screen-header' }, el('h1', {}, 'Progression')));
  const body = el('div', { class: 'screen-body' });

  // Exercise selector — list exos used in sessions
  const usedIds = new Set();
  State.sessions.forEach(s => s.exercises.forEach(e => { if (e.sets.some(x => x.done)) usedIds.add(e.exerciseId); }));
  const usedExos = [...usedIds].map(id => State.exerciseById(id)).filter(Boolean);

  if (usedExos.length === 0) {
    body.appendChild(el('div', { class: 'empty' },
      el('div', { class: 'icon' }, '📈'),
      el('div', {}, 'Pas encore de données.'),
      el('div', { style: 'margin-top: 8px; font-size: 13px;' }, 'Termine quelques séances pour voir ta progression.'),
    ));
    screen.appendChild(body);
    return screen;
  }

  // Default selection
  if (!State.ui.progressionExerciseId || !usedIds.has(State.ui.progressionExerciseId)) {
    State.ui.progressionExerciseId = usedExos[0].id;
  }

  const selector = el('select', { onchange: e => { State.ui.progressionExerciseId = e.target.value; render(); } });
  usedExos.forEach(ex => {
    const opt = el('option', { value: ex.id }, ex.name);
    if (ex.id === State.ui.progressionExerciseId) opt.selected = true;
    selector.appendChild(opt);
  });
  body.appendChild(el('label', { class: 'label-row' }, 'Exercice'));
  body.appendChild(selector);
  body.appendChild(el('div', { style: 'height: 16px;' }));

  // Build data for selected exercise
  const exId = State.ui.progressionExerciseId;
  const ex = State.exerciseById(exId);
  const data = [];
  [...State.sessions].sort((a, b) => a.startedAt - b.startedAt).forEach(s => {
    const exo = s.exercises.find(e => e.exerciseId === exId);
    if (!exo) return;
    const validSets = exo.sets.filter(x => x.done && x.reps != null);
    if (validSets.length === 0) return;
    const maxWeight = Math.max(...validSets.map(x => Number(x.weight) || 0));
    const maxAssist = validSets.filter(x => (x.setType || ex.type) === 'assisted').reduce((min, x) => Math.min(min, Number(x.weight) || Infinity), Infinity);
    const totalVolume = validSets.reduce((sum, x) => sum + (Number(x.reps) || 0) * (Number(x.weight) || 1), 0);
    const totalReps = validSets.reduce((sum, x) => sum + (Number(x.reps) || 0), 0);
    data.push({
      date: s.startedAt,
      maxWeight,
      minAssist: isFinite(maxAssist) ? maxAssist : null,
      totalVolume,
      totalReps,
      sets: validSets.length,
    });
  });

  if (data.length === 0) {
    body.appendChild(el('div', { class: 'empty' }, 'Pas encore de données pour cet exercice.'));
    screen.appendChild(body);
    return screen;
  }

  // PR cards
  const type = ex.type;
  const prGrid = el('div', { class: 'pr-grid' });
  if (type === 'bodyweight' || type === 'time') {
    const maxReps = Math.max(...data.map(d => Math.max(...State.sessions.find(s => s.startedAt === d.date).exercises.find(e => e.exerciseId === exId).sets.filter(x => x.done && x.reps != null).map(x => Number(x.reps)))));
    prGrid.appendChild(el('div', { class: 'pr-cell' }, el('div', { class: 'label' }, type === 'time' ? 'Meilleur temps' : 'PR Reps'), el('div', { class: 'value' }, maxReps + (type === 'time' ? 's' : ''))));
    const maxTotalReps = Math.max(...data.map(d => d.totalReps));
    prGrid.appendChild(el('div', { class: 'pr-cell' }, el('div', { class: 'label' }, 'Reps totales max'), el('div', { class: 'value' }, maxTotalReps)));
  } else if (type === 'assisted') {
    const minAssist = Math.min(...data.filter(d => d.minAssist != null).map(d => d.minAssist));
    prGrid.appendChild(el('div', { class: 'pr-cell' }, el('div', { class: 'label' }, 'Assistance min'), el('div', { class: 'value' }, '−' + minAssist + ' kg')));
    const maxReps = Math.max(...data.map(d => d.totalReps));
    prGrid.appendChild(el('div', { class: 'pr-cell' }, el('div', { class: 'label' }, 'Reps max (séance)'), el('div', { class: 'value' }, maxReps)));
  } else {
    const maxWeight = Math.max(...data.map(d => d.maxWeight));
    prGrid.appendChild(el('div', { class: 'pr-cell' }, el('div', { class: 'label' }, type === 'weighted' ? 'PR Lest' : 'PR Charge'), el('div', { class: 'value' }, (type === 'weighted' ? '+' : '') + maxWeight + ' kg')));
    const maxVol = Math.max(...data.map(d => d.totalVolume));
    prGrid.appendChild(el('div', { class: 'pr-cell' }, el('div', { class: 'label' }, 'Volume max'), el('div', { class: 'value' }, Math.round(maxVol) + ' kg')));
  }
  body.appendChild(prGrid);
  body.appendChild(el('div', { style: 'height: 12px;' }));

  // Charts
  if (type === 'bodyweight' || type === 'time') {
    body.appendChild(makeChartContainer(type === 'time' ? 'Temps max par séance' : 'Reps max par séance', data.map(d => ({
      x: d.date,
      y: Math.max(...State.sessions.find(s => s.startedAt === d.date).exercises.find(e => e.exerciseId === exId).sets.filter(x => x.done && x.reps != null).map(x => Number(x.reps)))
    })), type === 'time' ? 's' : ''));
    body.appendChild(makeChartContainer('Reps totales', data.map(d => ({ x: d.date, y: d.totalReps })), ''));
  } else if (type === 'assisted') {
    body.appendChild(makeChartContainer('Assistance minimale (kg)', data.filter(d => d.minAssist != null).map(d => ({ x: d.date, y: d.minAssist })), 'kg', { invert: true }));
    body.appendChild(makeChartContainer('Reps totales', data.map(d => ({ x: d.date, y: d.totalReps })), ''));
  } else {
    body.appendChild(makeChartContainer((type === 'weighted' ? 'Lest max' : 'Charge max') + ' (kg)', data.map(d => ({ x: d.date, y: d.maxWeight })), 'kg'));
    body.appendChild(makeChartContainer('Volume total (kg)', data.map(d => ({ x: d.date, y: Math.round(d.totalVolume) })), 'kg'));
  }

  screen.appendChild(body);
  return screen;
}

function makeChartContainer(title, points, unit, opts = {}) {
  const container = el('div', { class: 'chart-container' });
  container.appendChild(el('h3', {}, title));
  container.appendChild(renderLineChart(points, unit, opts));
  return container;
}

function renderLineChart(points, unit = '', opts = {}) {
  const W = 320, H = 160, P = 28;
  if (points.length === 0) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('class', 'chart-svg');
    return svg;
  }
  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys, opts.invert ? Math.max(...ys) * 1.2 : 0);
  const maxY = Math.max(...ys, minY + 1);
  const xRange = maxX - minX || 1;
  const yRange = maxY - minY || 1;
  const xScale = x => P + (x - minX) / xRange * (W - 2 * P);
  const yScale = y => H - P - (y - minY) / yRange * (H - 2 * P);

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('class', 'chart-svg');

  // Grid lines
  for (let i = 0; i <= 3; i++) {
    const y = P + i * (H - 2 * P) / 3;
    const l = document.createElementNS(svgNS, 'line');
    l.setAttribute('x1', P); l.setAttribute('x2', W - P);
    l.setAttribute('y1', y); l.setAttribute('y2', y);
    l.setAttribute('stroke', '#2d3744');
    l.setAttribute('stroke-width', '1');
    if (i > 0 && i < 3) l.setAttribute('stroke-dasharray', '2 4');
    svg.appendChild(l);
    // Y axis labels
    const yVal = maxY - i * yRange / 3;
    const t = document.createElementNS(svgNS, 'text');
    t.setAttribute('x', P - 4); t.setAttribute('y', y + 3);
    t.setAttribute('text-anchor', 'end');
    t.setAttribute('fill', '#6a7480');
    t.setAttribute('font-size', '10');
    t.setAttribute('font-family', 'ui-monospace, monospace');
    t.textContent = Math.round(yVal * 10) / 10;
    svg.appendChild(t);
  }

  // Line path
  if (points.length > 1) {
    let d = '';
    points.forEach((p, i) => {
      d += (i === 0 ? 'M' : 'L') + xScale(p.x) + ',' + yScale(p.y);
    });
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#f5d76e');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);
  }

  // Points
  points.forEach((p, i) => {
    const c = document.createElementNS(svgNS, 'circle');
    c.setAttribute('cx', xScale(p.x));
    c.setAttribute('cy', yScale(p.y));
    c.setAttribute('r', '3.5');
    c.setAttribute('fill', '#f5d76e');
    svg.appendChild(c);
    // Value above last point
    if (i === points.length - 1) {
      const t = document.createElementNS(svgNS, 'text');
      t.setAttribute('x', xScale(p.x));
      t.setAttribute('y', yScale(p.y) - 8);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('fill', '#f5d76e');
      t.setAttribute('font-size', '11');
      t.setAttribute('font-family', 'ui-monospace, monospace');
      t.setAttribute('font-weight', '600');
      t.textContent = p.y + (unit ? ' ' + unit : '');
      svg.appendChild(t);
    }
  });

  // X axis date labels: first and last
  if (points.length > 0) {
    const labels = [points[0], points[points.length - 1]];
    labels.forEach((p, i) => {
      const t = document.createElementNS(svgNS, 'text');
      t.setAttribute('x', xScale(p.x));
      t.setAttribute('y', H - 8);
      t.setAttribute('text-anchor', i === 0 ? 'start' : 'end');
      t.setAttribute('fill', '#6a7480');
      t.setAttribute('font-size', '10');
      t.setAttribute('font-family', 'ui-monospace, monospace');
      t.textContent = fmtDateShort(p.x);
      svg.appendChild(t);
    });
  }

  return svg;
}

/* === TEMPLATE EDIT SCREEN === */
function renderTemplateEditScreen() {
  const screen = el('section', { class: 'screen' });
  const tpl = State.templateById(State.ui.templateEditId);
  if (!tpl) {
    setTimeout(() => showScreen('sessions'), 0);
    return screen;
  }

  const header = el('header', { class: 'screen-header' },
    el('button', { class: 'h-back', onclick: () => showScreen('sessions'), 'aria-label': 'Retour' }, icon('back')),
    el('h1', {}, 'Édition séance'),
    el('button', { class: 'h-action', onclick: () => { State.save(); showScreen('sessions'); toast('Enregistré'); } }, 'OK')
  );
  screen.appendChild(header);

  const body = el('div', { class: 'screen-body' });

  body.appendChild(el('label', { class: 'label-row' }, 'Nom de la séance'));
  const nameI = el('input', { type: 'text', onchange: e => { tpl.name = e.target.value; State.save(); } });
  nameI.value = tpl.name;
  body.appendChild(nameI);

  body.appendChild(el('label', { class: 'label-row' }, 'Lettre / icône (1 char)'));
  const letterI = el('input', { type: 'text', maxlength: '2', onchange: e => { tpl.letter = e.target.value || tpl.name.charAt(0); State.save(); } });
  letterI.value = tpl.letter || tpl.name.charAt(0);
  body.appendChild(letterI);

  body.appendChild(el('label', { class: 'label-row' }, 'Exercices'));

  if (tpl.exercises.length === 0) {
    body.appendChild(el('div', { class: 'empty' }, 'Aucun exercice. Ajoute-en avec le bouton ci-dessous.'));
  } else {
    tpl.exercises.forEach((e, i) => {
      const exDef = State.exerciseById(e.exerciseId);
      const row = el('div', { class: 'template-exo-row' },
        el('div', { class: 'grow' },
          el('div', { class: 'name' }, exDef ? exDef.name : 'Exercice'),
          el('div', { class: 'target' }, `${e.sets} × ${e.reps}`)
        ),
        el('button', { class: 'exo-menu-btn', onclick: () => openTplExoMenu(tpl, i) }, icon('more'))
      );
      body.appendChild(row);
    });
  }

  body.appendChild(el('button', {
    class: 'btn-add',
    onclick: () => openExercisePicker(id => {
      tpl.exercises.push({ exerciseId: id, sets: 3, reps: '10' });
      State.save();
      render();
    }),
  }, icon('plus'), 'Ajouter un exercice'));

  screen.appendChild(body);
  return screen;
}

function openTplExoMenu(tpl, idx) {
  const e = tpl.exercises[idx];
  const exDef = State.exerciseById(e.exerciseId);

  const actions = [
    { label: 'Modifier séries × reps', handler: () => editTplExoTarget(tpl, idx) },
    { label: 'Remplacer l\'exercice', handler: () => openExercisePicker(id => { e.exerciseId = id; State.save(); render(); }) },
  ];
  if (idx > 0) actions.push({ label: 'Monter', handler: () => { [tpl.exercises[idx-1], tpl.exercises[idx]] = [tpl.exercises[idx], tpl.exercises[idx-1]]; State.save(); render(); } });
  if (idx < tpl.exercises.length - 1) actions.push({ label: 'Descendre', handler: () => { [tpl.exercises[idx+1], tpl.exercises[idx]] = [tpl.exercises[idx], tpl.exercises[idx+1]]; State.save(); render(); } });
  actions.push({ label: 'Supprimer', danger: true, handler: () => {
    tpl.exercises.splice(idx, 1);
    State.save();
    render();
  } });
  openActionMenu(exDef ? exDef.name : 'Exercice', actions);
}

function editTplExoTarget(tpl, idx) {
  const e = tpl.exercises[idx];
  const setsI = el('input', { type: 'number', min: '1', value: e.sets });
  const repsI = el('input', { type: 'text', value: e.reps, placeholder: '8, 8-10, 60s...' });
  const body = el('div', {},
    el('label', { class: 'label-row' }, 'Séries'),
    setsI,
    el('label', { class: 'label-row' }, 'Reps'),
    repsI,
  );
  const save = el('button', { class: 'btn btn-primary', onclick: () => {
    e.sets = Number(setsI.value) || e.sets;
    e.reps = repsI.value || e.reps;
    State.save();
    closeModal();
    render();
  }}, 'Enregistrer');
  const cancel = el('button', { class: 'btn btn-secondary', onclick: closeModal }, 'Annuler');
  openModal({ title: 'Cible', body, footer: [cancel, save] });
}

/* === SUMMARY SCREEN (post-séance) === */
function renderSummaryScreen() {
  const screen = el('section', { class: 'screen' });
  const session = State.sessions.find(s => s.id === State.ui.historyDetailId);

  if (!session) {
    setTimeout(() => showScreen('sessions'), 0);
    return screen;
  }

  const header = el('header', { class: 'screen-header' },
    el('h1', {}, 'Séance terminée'),
    el('button', { class: 'h-action', onclick: () => showScreen('sessions') }, 'OK')
  );
  screen.appendChild(header);

  const body = el('div', { class: 'screen-body' });

  // Récap stats
  const totalSets = session.exercises.reduce((s, e) => s + e.sets.length, 0);
  const doneSets = session.exercises.reduce((s, e) => s + e.sets.filter(x => x.done).length, 0);
  const tonnage = session.exercises.reduce((s, e) => {
    const exDef = State.exerciseById(e.exerciseId);
    const defType = exDef ? exDef.type : 'loaded';
    return s + e.sets.filter(x => x.done).reduce((acc, x) => {
      const w = Number(x.weight) || 0;
      const reps = Number(x.reps) || 0;
      const t = x.setType || defType;
      // Tonnage simple : on compte uniquement les sets chargés et lestés (+kg)
      if (t === 'loaded') return acc + w * reps;
      if (t === 'weighted') return acc + w * reps;
      return acc;
    }, 0);
  }, 0);

  const duration = session.endedAt - session.startedAt;
  const durStr = Math.floor(duration / 60000) + ' min';

  const statsCard = el('div', { class: 'summary-stats' },
    el('div', { class: 'summary-stat' }, el('div', { class: 'sv' }, durStr), el('div', { class: 'sl' }, 'Durée')),
    el('div', { class: 'summary-stat' }, el('div', { class: 'sv' }, `${doneSets}/${totalSets}`), el('div', { class: 'sl' }, 'Sets')),
    el('div', { class: 'summary-stat' }, el('div', { class: 'sv' }, Math.round(tonnage) + ' kg'), el('div', { class: 'sl' }, 'Tonnage')),
  );
  body.appendChild(statsCard);

  // Coach — suggestions pour la prochaine fois
  const tpl = State.templateById(session.templateId);
  if (tpl) {
    const suggestions = suggestNextTargets(session, tpl);

    if (suggestions.length > 0) {
      body.appendChild(el('h2', { class: 'section-title' }, 'Pour la prochaine ' + tpl.name));

      const cs = session.conditions || {};
      const cSleep = cs.sleep !== '' && cs.sleep != null ? Number(cs.sleep) : null;
      const cEnergy = cs.energy !== '' && cs.energy != null ? Number(cs.energy) : null;
      const conditionsNote = (cSleep != null && !isNaN(cSleep) && cSleep < 6)
                           || (cEnergy != null && !isNaN(cEnergy) && cEnergy < 5);
      if (conditionsNote) {
        body.appendChild(el('div', { class: 'coach-note' },
          icon('info'),
          el('span', {}, 'Récup limitée cette séance — suggestions ajustées en conséquence.')
        ));
      }

      suggestions.forEach(s => {
        const row = el('div', { class: 'coach-row ' + s.severity },
          el('div', { class: 'coach-row-head' },
            el('div', { class: 'coach-exo-name' }, s.name),
            el('div', { class: 'coach-tag ' + s.severity }, s.tag)
          ),
          el('div', { class: 'coach-row-reco' }, s.reco),
        );
        body.appendChild(row);
      });
    }
  }

  // Détail séance
  body.appendChild(el('h2', { class: 'section-title' }, 'Détail'));

  session.exercises.forEach(exo => {
    const exDef = State.exerciseById(exo.exerciseId);
    const defType = exDef ? exDef.type : 'loaded';
    const card = el('div', { class: 'history-exo-card' },
      el('div', { class: 'history-exo-name' }, exDef ? exDef.name : 'Exercice'),
    );
    exo.sets.forEach((s, i) => {
      if (!s.done) return;
      const t = s.setType || defType;
      const repsTxt = t === 'time' ? `${s.reps}s` : `${s.reps} reps`;
      let wTxt = '';
      if (t === 'loaded') wTxt = ` × ${s.weight} kg`;
      else if (t === 'weighted') wTxt = ` × +${s.weight} kg`;
      else if (t === 'assisted') wTxt = ` × -${s.weight} kg`;
      card.appendChild(el('div', { class: 'history-set' },
        el('span', { class: 'h-set-idx' }, `S${i+1}`),
        el('span', { class: 'h-set-val' }, repsTxt + wTxt)
      ));
    });
    body.appendChild(card);
  });

  body.appendChild(el('div', { class: 'summary-actions' },
    el('button', { class: 'btn btn-secondary', onclick: () => showScreen('history-detail', { historyDetailId: session.id }) }, 'Voir / Éditer'),
    el('button', { class: 'btn btn-primary', onclick: () => showScreen('sessions') }, 'Retour aux séances')
  ));

  screen.appendChild(body);
  return screen;
}

/* === COACH LOGIC === */
function suggestNextTargets(session, tpl) {
  const out = [];
  const conditions = session.conditions || {};
  const sleepNum = conditions.sleep !== '' && conditions.sleep != null ? Number(conditions.sleep) : null;
  const energyNum = conditions.energy !== '' && conditions.energy != null ? Number(conditions.energy) : null;
  const poorRecov = (sleepNum != null && !isNaN(sleepNum) && sleepNum < 6)
                 || (energyNum != null && !isNaN(energyNum) && energyNum < 5);

  session.exercises.forEach(exo => {
    const exDef = State.exerciseById(exo.exerciseId);
    if (!exDef) return;

    const doneSets = exo.sets.filter(s => s.done);
    if (doneSets.length === 0) {
      out.push({
        exerciseId: exo.exerciseId,
        name: exDef.name,
        severity: 'skip',
        tag: 'Skippé',
        reco: 'Aucun set complété. Garde la même cible la prochaine fois.',
      });
      return;
    }

    const targetSets = exo.targetSets || exo.sets.length;
    const targetReps = parseTargetReps(exo.targetReps);
    const setType = doneSets[0].setType || exDef.type;
    const isCompound = isCompoundLift(exDef);

    // Pour chaque type, on évalue : tous les sets cibles atteints ?
    const allHit = doneSets.length >= targetSets && doneSets.every(s => {
      const r = Number(s.reps) || 0;
      return r >= targetReps.min;
    });

    const partialMiss = doneSets.length < targetSets || doneSets.some(s => {
      const r = Number(s.reps) || 0;
      return r < targetReps.min;
    });

    const bigDrop = doneSets.some((s, i) => {
      if (i === 0) return false;
      const r = Number(s.reps) || 0;
      const r0 = Number(doneSets[0].reps) || 0;
      return r0 > 0 && r / r0 < 0.65;
    });

    if (poorRecov && allHit) {
      out.push({
        exerciseId: exo.exerciseId,
        name: exDef.name,
        severity: 'keep',
        tag: 'Maintenir',
        reco: 'Cibles atteintes mais récup limitée — confirme à charge égale avant de monter.',
      });
      return;
    }

    if (setType === 'loaded') {
      const w = Number(doneSets[doneSets.length - 1].weight) || 0;
      if (allHit) {
        const incr = isCompound ? 5 : 2.5;
        out.push({
          exerciseId: exo.exerciseId,
          name: exDef.name,
          severity: 'up',
          tag: '+' + incr + ' kg',
          reco: `Tous les sets cibles atteints. Monte à ${w + incr} kg la prochaine fois (${exo.targetSets || ''}×${exo.targetReps || ''}).`,
        });
      } else if (bigDrop) {
        const newW = Math.round((w * 0.95) / 2.5) * 2.5;
        out.push({
          exerciseId: exo.exerciseId,
          name: exDef.name,
          severity: 'down',
          tag: '-5%',
          reco: `Chute marquée entre les sets. Redescends à ${newW} kg pour stabiliser la technique.`,
        });
      } else {
        out.push({
          exerciseId: exo.exerciseId,
          name: exDef.name,
          severity: 'keep',
          tag: 'Maintenir',
          reco: `Garde ${w} kg jusqu'à boucler proprement tous les sets de la cible.`,
        });
      }
    } else if (setType === 'bodyweight') {
      const avgReps = doneSets.reduce((s, x) => s + (Number(x.reps) || 0), 0) / doneSets.length;
      if (allHit) {
        out.push({
          exerciseId: exo.exerciseId,
          name: exDef.name,
          severity: 'up',
          tag: '+1 rep',
          reco: `Tous les sets dans la cible. Vise +1 rep par set la prochaine fois.`,
        });
      } else {
        out.push({
          exerciseId: exo.exerciseId,
          name: exDef.name,
          severity: 'keep',
          tag: 'Maintenir',
          reco: `Moy. ${Math.round(avgReps)} reps. Continue avec cette cible jusqu'à boucler tous les sets.`,
        });
      }
    } else if (setType === 'weighted') {
      const w = Number(doneSets[doneSets.length - 1].weight) || 0;
      if (allHit) {
        const incr = 2.5;
        out.push({
          exerciseId: exo.exerciseId,
          name: exDef.name,
          severity: 'up',
          tag: '+' + incr + ' kg',
          reco: `Cibles atteintes lesté. Monte à +${w + incr} kg.`,
        });
      } else {
        out.push({
          exerciseId: exo.exerciseId,
          name: exDef.name,
          severity: 'keep',
          tag: 'Maintenir',
          reco: `Reste à +${w} kg jusqu'à boucler tous les sets.`,
        });
      }
    } else if (setType === 'assisted') {
      const w = Number(doneSets[doneSets.length - 1].weight) || 0;
      if (allHit) {
        const newW = Math.max(0, w - 2.5);
        out.push({
          exerciseId: exo.exerciseId,
          name: exDef.name,
          severity: 'up',
          tag: 'Assistance ↓',
          reco: `Tous les sets cibles atteints. Réduis l'assistance à -${newW} kg.`,
        });
      } else {
        out.push({
          exerciseId: exo.exerciseId,
          name: exDef.name,
          severity: 'keep',
          tag: 'Maintenir',
          reco: `Garde -${w} kg d'assistance jusqu'à boucler tous les sets.`,
        });
      }
    } else if (setType === 'time') {
      const tgtTime = targetReps.min;
      const allOk = doneSets.every(s => (Number(s.reps) || 0) >= tgtTime);
      if (allOk) {
        out.push({
          exerciseId: exo.exerciseId,
          name: exDef.name,
          severity: 'up',
          tag: '+10s',
          reco: `Cibles tenues. Vise ${tgtTime + 10}s la prochaine fois.`,
        });
      } else {
        out.push({
          exerciseId: exo.exerciseId,
          name: exDef.name,
          severity: 'keep',
          tag: 'Maintenir',
          reco: `Reste à ${tgtTime}s.`,
        });
      }
    }
  });

  return out;
}

function parseTargetReps(reps) {
  if (!reps) return { min: 0, max: 0 };
  const s = String(reps).trim().replace('s', '');
  const m = s.match(/^(\d+)\s*-\s*(\d+)$/);
  if (m) return { min: Number(m[1]), max: Number(m[2]) };
  const n = Number(s);
  if (!isNaN(n)) return { min: n, max: n };
  return { min: 0, max: 0 };
}

function isCompoundLift(exDef) {
  if (!exDef) return false;
  const compoundIds = new Set([
    // Pectoraux compound
    'pec-dc-barre','pec-dc-halt','pec-di-barre','pec-di-halt','pec-dd-barre','pec-dd-halt',
    // Dos compound
    'dos-rowing-barre','dos-rowing-tbar','dos-rowing-halt','dos-rowing-yates','dos-rowing-machine',
    'dos-sdt','dos-sdt-sumo','dos-sdt-roumain','dos-sdt-jt','dos-sdt-trap',
    // Épaules compound
    'ep-dm-barre','ep-dm-assis','ep-dm-halt','ep-arnold',
    // Quadriceps/jambes compound
    'q-squat','q-squat-front','q-squat-gob','q-hack','q-presse','q-presse-h','q-squat-sumo','q-box',
    'q-fentes-halt','q-fentes-barre','q-fentes-march','q-fentes-bulg',
    // Fessiers/ischios compound
    'fess-hip-thrust','fess-good-morning',
    // Triceps compound
    'tri-dc-serre',
    // Fonctionnel compound
    'fn-clean','fn-snatch','fn-thruster',
  ]);
  return compoundIds.has(exDef.id);
}

/* === SETTINGS SCREEN === */
function renderSettingsScreen() {
  const screen = el('section', { class: 'screen' });
  const header = el('header', { class: 'screen-header' },
    el('button', { class: 'h-back', onclick: () => showScreen('sessions'), 'aria-label': 'Retour' }, icon('back')),
    el('h1', {}, 'Réglages'),
  );
  screen.appendChild(header);

  const body = el('div', { class: 'screen-body' });

  body.appendChild(el('h2', { class: 'section-title' }, 'Données'));

  body.appendChild(makeSettingsRow('Exporter mes données', 'Sauvegarde JSON complète (templates, séances, exos custom).', 'Exporter', exportAllData));
  body.appendChild(makeSettingsRow('Importer un JSON', 'Remplace les données actuelles. Fais un export d\'abord.', 'Importer', importDataPrompt));
  body.appendChild(makeSettingsRow('Export pour analyse Claude', 'Format texte lisible à coller dans une conversation avec Claude.', 'Copier', exportForClaude));

  body.appendChild(el('h2', { class: 'section-title' }, 'Stats'));

  const stats = el('div', { class: 'settings-stats' },
    el('div', { class: 'sst' }, el('div', { class: 'v' }, State.sessions.length), el('div', { class: 'l' }, 'Séances')),
    el('div', { class: 'sst' }, el('div', { class: 'v' }, State.templates.length), el('div', { class: 'l' }, 'Templates')),
    el('div', { class: 'sst' }, el('div', { class: 'v' }, State.customExercises.length), el('div', { class: 'l' }, 'Exos custom')),
  );
  body.appendChild(stats);

  body.appendChild(el('h2', { class: 'section-title' }, 'Zone dangereuse'));

  body.appendChild(makeSettingsRow('Tout effacer', 'Supprime toutes les données locales. Irréversible.', 'Effacer', confirmWipe, true));

  body.appendChild(el('div', { class: 'about-block' },
    el('div', { class: 'about-title' }, 'Muscu — v1'),
    el('div', { class: 'about-line' }, 'App locale, aucune donnée envoyée à un serveur.'),
    el('div', { class: 'about-line' }, 'Toutes tes données sont dans le localStorage de ce navigateur.'),
  ));

  screen.appendChild(body);
  return screen;
}

function makeSettingsRow(title, desc, btnLabel, handler, danger) {
  return el('div', { class: 'settings-row' },
    el('div', { class: 'grow' },
      el('div', { class: 'sr-title' }, title),
      el('div', { class: 'sr-desc' }, desc),
    ),
    el('button', { class: 'btn ' + (danger ? 'btn-danger' : 'btn-secondary'), onclick: handler }, btnLabel)
  );
}

/* === EXPORT / IMPORT === */
function exportAllData() {
  const data = {
    version: 1,
    exportedAt: Date.now(),
    templates: State.templates,
    sessions: State.sessions,
    customExercises: State.customExercises,
    settings: State.settings,
  };
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `muscu-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('Export téléchargé');
}

function importDataPrompt() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!data.templates || !Array.isArray(data.sessions)) {
          toast('Fichier invalide');
          return;
        }
        openConfirm(
          `Importer ${data.sessions.length} séances et ${data.templates.length} templates ? Les données actuelles seront remplacées.`,
          () => {
            State.templates = data.templates;
            State.sessions = data.sessions;
            State.customExercises = data.customExercises || [];
            if (data.settings) State.settings = data.settings;
            State.save();
            render();
            toast('Import OK');
          },
          { danger: true, okLabel: 'Importer' }
        );
      } catch (err) {
        toast('JSON invalide');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function exportForClaude() {
  // Format texte lisible pour analyse
  const lines = [];
  lines.push('=== MUSCU — Export pour analyse ===');
  lines.push(`Exporté le : ${fmtDateLong(Date.now())}`);
  lines.push(`Nombre de séances : ${State.sessions.length}`);
  lines.push('');

  lines.push('--- TEMPLATES ---');
  State.templates.forEach(tpl => {
    lines.push(`\n# ${tpl.name}`);
    tpl.exercises.forEach(e => {
      const exDef = State.exerciseById(e.exerciseId);
      lines.push(`  - ${exDef ? exDef.name : '???'} : ${e.sets}×${e.reps}`);
    });
  });

  lines.push('\n--- HISTORIQUE (du plus récent au plus ancien) ---');
  const sorted = [...State.sessions].sort((a, b) => b.startedAt - a.startedAt);
  sorted.forEach(s => {
    const tpl = State.templateById(s.templateId);
    lines.push(`\n## ${tpl ? tpl.name : s.templateName || 'Séance'} — ${fmtDateLong(s.startedAt)}`);
    if (s.conditions) {
      const c = s.conditions;
      const parts = [];
      if (c.sleep) parts.push(`sommeil ${c.sleep}h`);
      if (c.energy) parts.push(`énergie ${c.energy}/10`);
      if (c.meal) parts.push(`repas ${c.meal}`);
      if (parts.length) lines.push(`  Conditions : ${parts.join(', ')}`);
    }
    const duration = s.endedAt ? Math.floor((s.endedAt - s.startedAt) / 60000) : null;
    if (duration) lines.push(`  Durée : ${duration} min`);
    s.exercises.forEach(exo => {
      const exDef = State.exerciseById(exo.exerciseId);
      const defType = exDef ? exDef.type : 'loaded';
      const done = exo.sets.filter(x => x.done);
      if (done.length === 0) return;
      const setsTxt = done.map(x => {
        const t = x.setType || defType;
        const reps = x.reps + (t === 'time' ? 's' : '');
        if (t === 'loaded') return `${reps}×${x.weight}kg`;
        if (t === 'weighted') return `${reps}@+${x.weight}kg`;
        if (t === 'assisted') return `${reps}@-${x.weight}kg`;
        return reps;
      }).join(', ');
      lines.push(`  - ${exDef ? exDef.name : '???'} : ${setsTxt}`);
    });
    if (s.notes) lines.push(`  Notes : ${s.notes}`);
  });

  const text = lines.join('\n');

  // Tentative de copie + affichage modal pour fallback
  const textarea = el('textarea', { class: 'export-textarea', readonly: true });
  textarea.value = text;

  const copyBtn = el('button', { class: 'btn btn-primary', onclick: () => {
    textarea.select();
    try {
      navigator.clipboard.writeText(text).then(() => {
        toast('Copié dans le presse-papiers');
      }).catch(() => {
        document.execCommand('copy');
        toast('Copié');
      });
    } catch (e) {
      document.execCommand('copy');
      toast('Copié');
    }
  }}, 'Copier tout');

  const closeBtn = el('button', { class: 'btn btn-secondary', onclick: closeModal }, 'Fermer');

  openModal({
    title: 'Export pour analyse Claude',
    body: el('div', {},
      el('div', { class: 'export-hint' }, 'Copie ce texte et colle-le dans une conversation avec Claude pour analyse.'),
      textarea,
    ),
    footer: [closeBtn, copyBtn]
  });
}

function confirmWipe() {
  openConfirm(
    'Effacer TOUTES les données ? Cette action est irréversible. Pense à exporter d\'abord.',
    () => {
      openConfirm(
        'Vraiment sûr ? Toutes tes séances, templates et exos custom seront perdus.',
        () => {
          localStorage.removeItem(STORAGE_KEY);
          State.templates = JSON.parse(JSON.stringify(DEFAULT_TEMPLATES));
          State.sessions = [];
          State.customExercises = [];
          State.activeSession = null;
          State.save();
          render();
          toast('Données effacées');
        },
        { danger: true, okLabel: 'Tout effacer' }
      );
    },
    { danger: true, okLabel: 'Continuer' }
  );
}

/* === INIT === */
function init() {
  State.init();
  showScreen('sessions');

  // Service worker (PWA offline)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        // Silently fail — l'app marche sans
        console.warn('SW registration failed:', err);
      });
    });
  }
}

// Lance l'app quand le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
