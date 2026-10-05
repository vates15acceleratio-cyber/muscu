// Épaules (hors développé militaire barre debout et élévations latérales haltères, dans base.js)
const { E, box, slab, GREY, BENCH, mk, C, STAND, UP, bar, dbs, both, pose } = require('./common');

const seatedBack = ({ P }) => [
  ...E.seat(P.hip[0] - 26, P.hip[0] + 22, P.hip[1] - 6),
  ...slab([P.hip[0] - 20, P.hip[1] - 2], [P.hip[0] - 20, P.hip[1] + 95], 8, 17, BENCH, -39),
  ...box(P.hip[0] - 38, P.hip[0] - 30, 0, 150, -6, 6, GREY, -46, true),
];
const SEAT_ANCHOR = { x: ['hip', 100], y: ['hip', 185] };
const FRONT = { cams: { iso: { psi: 62, phi: 25 } } };

const EXERCISES = [
  { id: 'ep-dm-assis', anchor: SEAT_ANCHOR, floor: 230, opt: { stance: 8, grip: 26 },
    poses: [
      pose('Barre aux épaules', { torso: -90, thigh: 3, shin: 90, foot: 0, upper: 70, fore: -95 }),
      pose('Bras tendus au-dessus de la tête', { torso: -90, thigh: 3, shin: 90, foot: 0, upper: -80, fore: -85 }),
    ], equip: both(seatedBack, bar(62)), arrowRef: 'wrist' },

  { id: 'ep-dm-halt', anchor: STAND, floor: 230, opt: { stance: 8, grip: 28, flare: 10 },
    poses: [
      pose('Haltères aux épaules', { ...UP, upper: 62, fore: -82 }),
      pose('Bras tendus au-dessus de la tête', { ...UP, upper: -78, fore: -85 }),
    ], equip: dbs(), arrowRef: 'wrist' },

  { id: 'ep-arnold', anchor: STAND, floor: 230, opt: { stance: 8, grip: 24, flare: 6 },
    poses: [
      pose('Haltères devant le visage, paumes vers soi', { ...UP, upper: 74, fore: -112 }),
      pose('Rotation, coudes écartés', { ...UP, upper: 36, fore: -92 }, { abd: { u: 46, fo: 22 } }),
      pose('Bras tendus, paumes vers l\'avant', { ...UP, upper: -80, fore: -86 }, { abd: { u: 10, fo: 8 } }),
    ], equip: ({ S: sd, idx }) => [...E.dumbbell(sd[1].wrist, idx === 1 ? 'x' : 'z'), ...E.dumbbell(sd[-1].wrist, idx === 1 ? 'x' : 'z')], arrowRef: 'wrist' },

  { id: 'ep-elev-lat-poulie', anchor: STAND, floor: 230, opt: { stance: 8, grip: 22 }, iconCam: 'front', ...FRONT,
    poses: [
      pose('Bras le long du corps', { ...UP, upper: 90, fore: 90 }, { abd: { n: 6, f: 4 } }),
      pose('Bras à l\'horizontale', { ...UP, upper: 90, fore: 90 }, { abd: { n: 84, nf: 74, f: 4 } }),
    ],
    equip: ({ S: sd }) => {
      const w = sd[1].wrist, low = [0, 12, -56];
      return [...E.post(0, 40, { z: -60 }), ...E.pulley(low), ...E.cable(low, w), ...E.handle(w, 5)];
    }, arrowRef: 'wrist' },

  { id: 'ep-elev-front', anchor: STAND, floor: 230, opt: { stance: 8, grip: 22 },
    poses: [
      pose('Bras le long du corps', { ...UP, upper: 92, fore: 92 }),
      pose('Bras à l\'horizontale devant soi', { ...UP, upper: 4, fore: 2 }),
    ], equip: dbs('x'), arrowRef: 'wrist' },

  { id: 'ep-elev-front-barre', anchor: STAND, floor: 230, opt: { stance: 8, grip: 24 },
    poses: [
      pose('Bras le long du corps', { ...UP, upper: 92, fore: 92 }),
      pose('Bras à l\'horizontale devant soi', { ...UP, upper: 4, fore: 2 }),
    ], equip: bar(58), arrowRef: 'wrist' },

  { id: 'ep-oiseau', anchor: STAND, floor: 230, opt: { stance: 8, grip: 20 }, iconCam: 'front', cams: { iso: { psi: 62, phi: 28 } },
    poses: [
      pose('Buste penché, bras tendus', { torso: -30, thigh: 55, shin: 105, foot: 0, upper: 90, fore: 90, head: -40 }, { abd: { u: 4, fo: 4 } }),
      pose('Bras écartés à l\'horizontale', { torso: -30, thigh: 55, shin: 105, foot: 0, upper: 90, fore: 90, head: -40 }, { abd: { u: 82, fo: 68 } }),
    ], equip: dbs('x'), arrowRef: 'wrist' },

  { id: 'ep-oiseau-machine', anchor: SEAT_ANCHOR, floor: 230, opt: { stance: 10, grip: 20 }, iconCam: 'front', cams: { iso: { psi: 58, phi: 26 } },
    poses: [
      pose('Bras tendus devant la poitrine', { torso: -84, thigh: 3, shin: 90, foot: 0, upper: 2, fore: 0 }, { abd: { u: 12, fo: 8 } }),
      pose('Bras écartés vers l\'arrière', { torso: -84, thigh: 3, shin: 90, foot: 0, upper: 14, fore: 6 }, { abd: { u: 84, fo: 66 } }),
    ],
    equip: ({ P, S: sd }) => {
      const out = [...E.seat(P.hip[0] - 22, P.hip[0] + 24, P.hip[1] - 6)];
      out.push(...slab([P.shoulder[0] + 18, P.shoulder[1] - 30], [P.shoulder[0] + 18, P.shoulder[1] + 18], 8, 16, BENCH, -39));
      out.push(...box(P.hip[0] + 30, P.hip[0] + 38, 0, 150, -6, 6, GREY, -46, true), ...box(P.hip[0] - 36, P.hip[0] + 50, 0, 6, -26, 26, GREY, -47));
      for (const s of [-1, 1]) { const w = sd[s].wrist; out.push(mk.line([w[0], w[1] - 20, w[2]], [w[0], w[1] + 14, w[2]], 7, '#c9d2de', { bias: 0.7 })); }
      return out;
    }, arrowRef: 'wrist' },

  { id: 'ep-face-pull', anchor: STAND, floor: 230, opt: { stance: 8, grip: 10 }, cams: { iso: { psi: 55, phi: 24 } },
    poses: [
      pose('Bras tendus devant soi', { torso: -88, thigh: 90, shin: 90, foot: 0, upper: 2, fore: 2 }),
      pose('Corde au visage, coudes hauts', { torso: -88, thigh: 90, shin: 90, foot: 0, upper: 172, fore: -64 }, { abd: { u: 42, fo: 34 } }),
    ],
    equip: ({ S: sd }) => {
      const w = sd[1].wrist, pul = [112, 152, 0];
      return [...E.post(118, 200), ...box(108, 122, 146, 158, -5, 5, GREY, -29, true), ...E.pulley(pul), ...E.cable(pul, [w[0], w[1], 0], 2.2), ...E.rope([w[0], w[1], 0])];
    }, arrowRef: 'wrist' },

  { id: 'ep-rowing-menton', anchor: STAND, floor: 230, opt: { stance: 8, grip: 20 }, iconCam: 'front', cams: { iso: { psi: 55, phi: 24 } },
    poses: [
      pose('Barre aux cuisses, bras tendus', { ...UP, upper: 92, fore: 92 }),
      pose('Barre au menton, coudes hauts', { ...UP, upper: -22, fore: 104 }, { abd: { u: 56, fo: -38 } }),
    ], equip: bar(50), arrowRef: 'wrist' },

  // pike push-up : jambes fixes, le tronc s'ajuste pour que mains et pieds touchent le sol
  { id: 'ep-pike', anchor: { x: ['wrist', 120], y: ['wrist', 226] }, floor: 230, opt: { stance: 3, grip: 22, flare: 6 }, cams: { iso: { psi: 60, phi: 30 } },
    poses: [
      pose('Position haute en V', { thigh: 118, shin: 118, foot: 80, upper: 90, fore: 90 }, { ground: ['wrist', 'toe'], line: false, range: [2, 85] }),
      pose('Tête vers le sol', { thigh: 118, shin: 118, foot: 80, upper: 124, fore: 60 }, { ground: ['wrist', 'toe'], line: false, range: [2, 85] }),
    ], equip: () => [], arrowRef: 'head', icon: 0 },

  { id: 'ep-handstand', anchor: { x: ['wrist', 110], y: ['wrist', 226] }, floor: 230, opt: { stance: 3, grip: 20, flare: 6 }, cams: { iso: { psi: 55, phi: 24 } },
    poses: [
      pose('Équilibre contre le mur, bras tendus', { torso: 90, thigh: -90, shin: -90, foot: -10, upper: 90, fore: 90 }),
      pose('Tête vers le sol', { torso: 90, thigh: -90, shin: -90, foot: -10, upper: 126, fore: 54 }),
    ], equip: ({ P }) => E.wall(P.hip[0] + 16, 250), arrowRef: 'hip', icon: 0 },
];

module.exports = { EXERCISES };
