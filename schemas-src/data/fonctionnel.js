// Fonctionnel (hors kettlebell swing, dans base.js)
const { E, box, slab, GREY, BENCH, mk, C, STAND, UP, bar, dbs, both, pose } = require('./common');

const FLOOR_HIP = { x: ['hip', 150], y: ['hip', 220] };
const RACK = { upper: -8, fore: 138 };                          // barre posée sur l'avant des épaules

const EXERCISES = [
  { id: 'fn-burpees', anchor: STAND, floor: 230, opt: { stance: 8, grip: 20, flare: 6 }, cams: { iso: { psi: 55, phi: 28 } },
    poses: [
      pose('Debout', { ...UP, upper: 92, fore: 92 }),
      pose('Accroupi, mains au sol', { torso: -22, thigh: 8, shin: 108, foot: 0, upper: 86, fore: 86, head: -32 }),
      pose('Position de pompe', { foot: 80, upper: 90, fore: 90 }, { anchor: { x: ['wrist', 150], y: ['wrist', 226] }, ground: ['wrist', 'toe'] }),
      pose('Saut, bras en l\'air', { ...UP, upper: -86, fore: -88 }, { anchor: { x: ['ankle', 100], y: ['ankle', 192] } }),
    ], equip: () => [], arrowRef: 'hip' },

  { id: 'fn-clean', anchor: STAND, floor: 230, opt: { stance: 10, grip: 24 },
    poses: [
      pose('Départ', { torso: -38, thigh: 12, shin: 100, foot: 0, upper: 96, fore: 96, head: -48 }),
      pose('Extension, sur la pointe des pieds', { ...UP, foot: 58, upper: 100, fore: 70 }, { anchor: { x: ['toe', 100], y: ['toe', 224] } }),
      pose('Réception, barre sur les épaules', { torso: -76, thigh: 20, shin: 100, foot: 0, ...RACK }),
    ], equip: bar(62), arrowRef: 'wrist' },

  { id: 'fn-snatch', anchor: STAND, floor: 230, opt: { stance: 22, grip: 42 },
    poses: [
      pose('Départ, prise large', { torso: -38, thigh: 12, shin: 100, foot: 0, upper: 96, fore: 96, head: -48 }),
      pose('Extension, sur la pointe des pieds', { ...UP, foot: 58, upper: 104, fore: 80 }, { anchor: { x: ['toe', 100], y: ['toe', 224] } }),
      pose('Réception, bras tendus au-dessus', { torso: -72, thigh: 12, shin: 104, foot: 0, upper: -84, fore: -86 }),
    ], equip: bar(70), arrowRef: 'wrist' },

  { id: 'fn-thruster', anchor: STAND, floor: 230, opt: { stance: 14, grip: 26, flare: -4 },
    poses: [
      pose('Squat, barre sur les épaules', { torso: -74, thigh: 8, shin: 108, foot: 0, ...RACK }),
      pose('Poussée, bras tendus', { ...UP, upper: -80, fore: -86 }),
    ], equip: ({ P }) => E.barbell([P.wrist[0], P.wrist[1] + 6], 64), arrowRef: 'wrist' },

  // marche du fermier : les deux jambes alternent, haltères aux mains
  { id: 'fn-farmer', anchor: STAND, floor: 230, opt: { stance: 14, grip: 24 }, cams: { iso: { psi: 55, phi: 26 } },
    poses: [
      pose('Pas avec la jambe proche devant', { torso: -90, foot: 0, upper: 92, fore: 92 }, { hip: [100, 144], ik: { n: { ankle: [122, 224] }, f: { ankle: [78, 224] } } }),
      pose('Pas avec la jambe éloignée devant', { torso: -90, foot: 0, upper: 92, fore: 92 }, { hip: [100, 144], ik: { n: { ankle: [78, 224] }, f: { ankle: [122, 224] } } }),
    ], equip: dbs('x'), arrowRef: 'hip' },

  // Turkish get-up : de l'allongé au debout, kettlebell tenue bras tendu
  { id: 'fn-tgu', anchor: FLOOR_HIP, floor: 230, opt: { stance: 12, grip: 14 }, cams: { iso: { psi: 55, phi: 30 } },
    poses: [
      pose('Allongé, kettlebell bras tendu', { torso: 180, head: 180 }, { hip: [150, 220],
        n: { thigh: -52, shin: 84, foot: 0, upper: -90, fore: -90 }, f: { thigh: -3, shin: -3, foot: -10, upper: 8, fore: 4 } }),
      pose('Sur le coude', { torso: -146, head: -150 }, { hip: [150, 220],
        n: { thigh: -52, shin: 84, foot: 0, upper: -90, fore: -90 }, f: { thigh: -3, shin: -3, foot: -10, upper: 50, fore: 20 } }),
      pose('Assis, appui sur la main', { torso: -118, head: -122 }, { hip: [150, 220],
        n: { thigh: -52, shin: 84, foot: 0, upper: -90, fore: -90 }, f: { thigh: -3, shin: -3, foot: -10, upper: 92, fore: 92 } }),
      pose('Debout, kettlebell au-dessus de la tête', { ...UP }, { hip: [150, 142], n: { upper: -90, fore: -90 }, f: { upper: 92, fore: 92 } }),
    ], equip: ({ S: sd }) => E.kettlebell([sd[1].wrist[0], sd[1].wrist[1], 0]), arrowRef: 'shoulder' },
];

module.exports = { EXERCISES };
