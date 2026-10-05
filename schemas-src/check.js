// Contrôles automatiques : ids couverts, valeurs invalides, corps enfoncé dans le sol, figure trop petite.
const fs = require('fs'), path = require('path'), vm = require('vm');
const S = require('./schemas-core');
const { EXERCISES, MISSING, LIBRARY } = require('./schemas-data');
let bad = 0;
const warn = (...a) => { bad++; console.log('  ⚠', ...a); };
for (const ex of EXERCISES) {
  ex.poses.forEach((p, i) => {
    let pose;
    try { pose = S.buildPose(ex, p); } catch (e) { return warn(ex.id, 'pose', i + 1, 'ERREUR', e.message); }
    const pts = [];
    for (const s of [1, -1]) for (const j of ['hip', 'knee', 'ankle', 'toe', 'shoulder', 'elbow', 'wrist']) pts.push([`${s > 0 ? 'n' : 'f'}.${j}`, pose.sides[s][j]]);
    pts.push(['head', pose.mid.head]);
    for (const [n, q] of pts) if (q.some(v => !Number.isFinite(v))) warn(ex.id, 'pose', i + 1, 'NaN', n);
    const low = pts.reduce((m, [n, q]) => (q[1] < m[1] ? [n, q[1]] : m), ['', 1e9]);
    if (low[1] < -4) warn(ex.id, `pose ${i + 1}: ${low[0]} sous le sol (${low[1].toFixed(1)})`);
    for (const [n, q] of pts) if (n !== 'head' && Math.abs(q[2]) > 120) warn(ex.id, 'pose', i + 1, n, 'très loin en z', q[2].toFixed(0));
  });
  try { S.renderIcon(ex); ex.poses.forEach((_, i) => S.renderDetail(ex, i)); } catch (e) { warn(ex.id, 'rendu', e.message); }
}

// libellés de pose : chacun doit avoir sa traduction anglaise (i18n-poses.js)
const poseFile = path.join(__dirname, '..', 'i18n-poses.js');
const POSES_EN = vm.runInNewContext(fs.readFileSync(poseFile, 'utf8') + '\nI18N_POSES;');
const labels = new Set();
for (const ex of EXERCISES) for (const p of ex.poses) labels.add(p.label);
for (const l of labels) if (!POSES_EN[l]) warn('libellé de pose sans traduction anglaise :', JSON.stringify(l));
for (const k of Object.keys(POSES_EN)) if (!labels.has(k)) warn('traduction orpheline (libellé disparu) :', JSON.stringify(k));
console.log(`${EXERCISES.length}/${LIBRARY.length} exercices définis ; manquants : ${MISSING.length}${MISSING.length ? ' → ' + MISSING.slice(0, 12).join(', ') + (MISSING.length > 12 ? '…' : '') : ''} ; alertes : ${bad}`);
process.exit(bad ? 1 : 0);
