// Biceps et triceps (hors curl barre droite et dips parallèles, dans base.js)
const { E, box, slab, GREY, BENCH, mk, C, STAND, UP, LIE, LIE_ANCHOR, bar, dbs, both, pose } = require('./common');

const ARM3 = [['Bras tendus', 92], ['Mi-course', 10], ['Contraction', -62]];
const curl3 = (extra = {}) => ARM3.map(([l, f]) => pose(l, { ...UP, upper: 92, fore: f }, extra));
const SEAT = { x: ['hip', 100], y: ['hip', 185] };
const highPulley = (x = 18, h = 205) => [...E.post(x + 24, h + 6), ...box(x - 8, x + 28, h, h + 6, -4, 4, GREY, -29, true), ...E.pulley([x, h + 3, 0])];
const pushdown = (handle) => ({ S: sd }) => {
  const w = sd[1].wrist, out = highPulley(18, 205);
  out.push(...E.cable([18, 208, 0], [w[0], w[1], 0], 2.4), ...handle([w[0], w[1], 0]));
  return out;
};
const lowPulley = (handle) => ({ S: sd }) => {
  const w = sd[1].wrist, low = [64, 12, 0];
  return [...E.post(70, 36), ...E.pulley(low), ...E.cable(low, [w[0], w[1], 0], 2.4), ...handle([w[0], w[1], 0])];
};
const beltPlate = ({ P }) => [...E.cable([P.hip[0], P.hip[1] - 2, 0], [P.hip[0] + 4, P.hip[1] - 30, 0], 2), ...E.plateHeld([P.hip[0] + 4, P.hip[1] - 44, 0], 15)];
const TRI_FLAT = ({ P }) => E.bench(P.shoulder[0] - 34, P.hip[0] + 36, P.hip[1] - 12);

const EXERCISES = [
  // ---------------------------------------------------------------- biceps
  { id: 'bi-curl-ez', anchor: STAND, floor: 230, opt: { stance: 8, grip: 14 },
    poses: curl3(), equip: ({ P }) => E.ezbar([P.wrist[0], P.wrist[1]], 40), arrowRef: 'wrist' },

  { id: 'bi-curl-halt-alt', anchor: STAND, floor: 230, opt: { stance: 8, grip: 22 },
    poses: [
      pose('Bras proche monté', { ...UP, upper: 92, fore: 92 }, { n: { upper: 92, fore: -62 }, f: { upper: 92, fore: 92 } }),
      pose('Bras éloigné monté', { ...UP, upper: 92, fore: 92 }, { n: { upper: 92, fore: 92 }, f: { upper: 92, fore: -62 } }),
    ], equip: dbs(), arrowRef: 'wrist' },

  { id: 'bi-curl-halt-sim', anchor: STAND, floor: 230, opt: { stance: 8, grip: 22 },
    poses: curl3(), equip: dbs(), arrowRef: 'wrist' },

  { id: 'bi-curl-marteau', anchor: STAND, floor: 230, opt: { stance: 8, grip: 20 },
    poses: curl3(), equip: dbs('x'), arrowRef: 'wrist' },

  { id: 'bi-curl-pupitre', anchor: SEAT, floor: 230, opt: { stance: 10, grip: 14 },
    poses: [
      pose('Bras tendus sur le pupitre', { torso: -92, thigh: 3, shin: 90, foot: 0, upper: 42, fore: 40 }),
      pose('Contraction', { torso: -92, thigh: 3, shin: 90, foot: 0, upper: 42, fore: -108 }),
    ],
    equip: ({ P, S: sd }) => {
      const out = [...E.seat(P.hip[0] - 22, P.hip[0] + 20, P.hip[1] - 6), ...E.ezbar([sd[1].wrist[0], sd[1].wrist[1]], 34)];
      out.push(...slab([P.shoulder[0] + 6, P.shoulder[1] - 14], [P.shoulder[0] + 58, P.shoulder[1] - 52], 9, 18, BENCH, -38));
      out.push(...box(P.shoulder[0] + 4, P.shoulder[0] + 12, 0, P.shoulder[1] - 20, -8, 8, BENCH, -45));
      return out;
    }, arrowRef: 'wrist' },

  { id: 'bi-curl-incline', anchor: LIE_ANCHOR, floor: 230, opt: { stance: 16, grip: 22 },
    poses: [
      pose('Bras tendus derrière le buste', { torso: -120, thigh: 5, shin: 100, foot: 0, upper: 94, fore: 94 }),
      pose('Contraction', { torso: -120, thigh: 5, shin: 100, foot: 0, upper: 94, fore: -42 }),
    ],
    equip: both(({ P }) => E.adjBench(P.hip[0], P.hip[1] - 8, 60, { back: 84 }), dbs()), arrowRef: 'wrist' },

  { id: 'bi-curl-poulie', anchor: STAND, floor: 230, opt: { stance: 8, grip: 20 },
    poses: curl3().filter((_, i) => i !== 1), equip: lowPulley(c => E.handle(c, 18)), arrowRef: 'wrist' },
  { id: 'bi-curl-poulie-corde', anchor: STAND, floor: 230, opt: { stance: 8, grip: 10 },
    poses: curl3().filter((_, i) => i !== 1), equip: lowPulley(E.rope), arrowRef: 'wrist' },

  // curl concentré : assis penché en avant, coude calé contre la cuisse
  { id: 'bi-curl-conc', anchor: { x: ['ankle', 100], y: ['ankle', 224] }, floor: 230, opt: { stance: 22, grip: 16 }, cams: { iso: { psi: 55, phi: 28 } },
    poses: [
      pose('Bras tendu, coude contre la cuisse', { torso: -42, thigh: 6, shin: 90, foot: 0, head: -52 }, { n: { upper: 80, fore: 90 }, f: { upper: 60, fore: 40 } }),
      pose('Contraction', { torso: -42, thigh: 6, shin: 90, foot: 0, head: -52 }, { n: { upper: 80, fore: -72 }, f: { upper: 60, fore: 40 } }),
    ],
    equip: ({ P, S: sd }) => [...E.seat(P.hip[0] - 24, P.hip[0] + 16, P.hip[1] - 8), ...E.dumbbell(sd[1].wrist)], arrowRef: 'wrist' },

  { id: 'bi-curl-zottman', anchor: STAND, floor: 230, opt: { stance: 8, grip: 20 },
    poses: [
      pose('Montée, paumes vers le haut', { ...UP, upper: 92, fore: 20 }),
      pose('En haut : rotation des poignets', { ...UP, upper: 92, fore: -62 }),
      pose('Descente, paumes vers le bas', { ...UP, upper: 92, fore: 20 }),
    ], equip: ({ S: sd, idx }) => [...E.dumbbell(sd[1].wrist, idx === 0 ? 'z' : 'x'), ...E.dumbbell(sd[-1].wrist, idx === 0 ? 'z' : 'x')], arrowRef: 'wrist' },

  { id: 'bi-curl-inv', anchor: STAND, floor: 230, opt: { stance: 8, grip: 24 },
    poses: curl3(), equip: bar(56), arrowRef: 'wrist' },

  // ---------------------------------------------------------------- triceps
  { id: 'tri-ext-poulie-barre', anchor: STAND, floor: 230, opt: { stance: 8, grip: 20 },
    poses: [
      pose('Mains à hauteur de poitrine', { ...UP, torso: -86, upper: 94, fore: -8 }),
      pose('Bras tendus vers le bas', { ...UP, torso: -86, upper: 94, fore: 88 }),
    ], equip: pushdown(c => E.handle(c, 18)), arrowRef: 'wrist' },

  { id: 'tri-ext-poulie-corde', anchor: STAND, floor: 230, opt: { stance: 8, grip: 10 },
    poses: [
      pose('Mains à hauteur de poitrine', { ...UP, torso: -86, upper: 94, fore: -8 }),
      pose('Bras tendus, corde écartée', { ...UP, torso: -86, upper: 94, fore: 88 }),
    ], equip: pushdown(E.rope), arrowRef: 'wrist' },

  { id: 'tri-ext-halt-tete', anchor: STAND, floor: 230, opt: { stance: 8, grip: 5 },
    poses: [
      pose('Haltère derrière la tête', { ...UP, upper: -88, fore: 152 }),
      pose('Bras tendus au-dessus de la tête', { ...UP, upper: -88, fore: -90 }),
    ], equip: ({ S: sd }) => E.dumbbell([sd[1].wrist[0], sd[1].wrist[1] - 11, 0], 'y'), arrowRef: 'wrist' },

  { id: 'tri-skull', anchor: LIE_ANCHOR, floor: 230, opt: { stance: 18, grip: 14 },
    poses: [
      pose('Barre au-dessus de la poitrine', { ...LIE, upper: -90, fore: -90 }),
      pose('Barre près du front', { ...LIE, upper: -90, fore: 168 }),
    ], equip: both(TRI_FLAT, ({ P }) => E.ezbar([P.wrist[0], P.wrist[1]], 38)), arrowRef: 'wrist' },

  { id: 'tri-kickback', anchor: STAND, floor: 230, opt: { stance: 16, grip: 18 },
    poses: [
      pose('Coude fixe, avant-bras vers le bas', { torso: -26, thigh: 62, shin: 104, foot: 0, head: -36 }, { n: { upper: 158, fore: 84 }, f: { upper: 62, fore: 70 } }),
      pose('Bras tendu vers l\'arrière', { torso: -26, thigh: 62, shin: 104, foot: 0, head: -36 }, { n: { upper: 158, fore: 160 }, f: { upper: 62, fore: 70 } }),
    ], equip: ({ S: sd }) => E.dumbbell(sd[1].wrist), arrowRef: 'wrist' },

  { id: 'tri-ext-uni-poulie', anchor: STAND, floor: 230, opt: { stance: 8, grip: 16 },
    poses: [
      pose('Main à hauteur de poitrine', { ...UP, torso: -86 }, { n: { upper: 94, fore: -8 }, f: { upper: 92, fore: 92 } }),
      pose('Bras tendu vers le bas', { ...UP, torso: -86 }, { n: { upper: 94, fore: 88 }, f: { upper: 92, fore: 92 } }),
    ], equip: pushdown(c => E.handle(c, 5)), arrowRef: 'wrist' },

  { id: 'tri-dc-serre', anchor: LIE_ANCHOR, floor: 230, opt: { stance: 18, grip: 13, flare: -6 },
    poses: [
      pose('Barre tendue, mains rapprochées', { ...LIE, upper: -82, fore: -90 }),
      pose('Barre à la poitrine, coudes serrés', { ...LIE, upper: 18, fore: -98 }),
    ], equip: both(TRI_FLAT, bar(60)), arrowRef: 'wrist' },

  // dips entre deux bancs : mains sur un banc derrière, pieds sur un banc devant
  { id: 'tri-dips-banc', anchor: { x: ['wrist', 100], y: ['wrist', 187] }, floor: 230, opt: { stance: 8, grip: 22 }, cams: { iso: { psi: 52, phi: 30 } },
    poses: [
      pose('Bras tendus', { torso: -90, thigh: 0, shin: 0, foot: -50, upper: 90, fore: 90 }),
      pose('Coudes fléchis', { torso: -90, thigh: -17, shin: -17, foot: -50, upper: 90, fore: 172 }),
    ],
    equip: ({ P }) => [...E.crate(P.wrist[0] - 36, P.wrist[0] + 6, 40, 20), ...E.crate(88, 142, 41, 20)], arrowRef: 'shoulder' },

  { id: 'tri-dips-lest', anchor: { x: ['wrist', 120], y: ['wrist', 120] }, floor: 230, opt: { stance: 4, grip: 24 }, cams: { iso: { psi: 50, phi: 32 } },
    poses: [
      pose('Bras tendus, ceinture lestée', { torso: -84, thigh: 100, shin: 160, foot: 90, upper: 90, fore: 90 }),
      pose('Coudes fléchis, ceinture lestée', { torso: -72, thigh: 105, shin: 165, foot: 90, upper: 140, fore: 45 }),
    ], equip: both(({ P }) => E.parallelBars(P.wrist[0], P.wrist[1], 80, 24), beltPlate), arrowRef: 'shoulder' },

  { id: 'tri-dips-ass', anchor: { x: ['wrist', 120], y: ['wrist', 120] }, floor: 230, opt: { stance: 4, grip: 24 }, cams: { iso: { psi: 50, phi: 32 } },
    poses: [
      pose('Bras tendus, genoux sur le plateau', { torso: -84, thigh: 92, shin: 168, foot: 90, upper: 90, fore: 90 }),
      pose('Coudes fléchis', { torso: -72, thigh: 96, shin: 168, foot: 90, upper: 140, fore: 45 }),
    ],
    equip: ({ P }) => [...E.parallelBars(P.wrist[0], P.wrist[1], 80, 24), ...E.crate(P.knee[0] - 18, P.knee[0] + 18, Math.max(8, P.knee[1] - 5), 17), ...box(P.hip[0] - 80, P.hip[0] - 56, 0, 130, -16, 16, GREY, -46, true)], arrowRef: 'shoulder' },
];

module.exports = { EXERCISES };
