// Agrège toutes les familles d'exercices et complète nom / muscles / matériel depuis EXERCISE_LIBRARY (app.js),
// pour que les ids et libellés restent exactement ceux de la bibliothèque (jamais recopiés à la main).
const fs = require('fs'), path = require('path'), vm = require('vm');

function loadLibrary() {
  const src = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
  const m = src.match(/const EXERCISE_LIBRARY = (\[[\s\S]*?\n\]);/);
  if (!m) throw new Error('EXERCISE_LIBRARY introuvable dans app.js');
  return vm.runInNewContext(m[1]);
}
const LIBRARY = loadLibrary();
const byId = Object.fromEntries(LIBRARY.map(e => [e.id, e]));

const FAMILIES = ['base', 'pec', 'dos', 'epaules', 'bras', 'jambes', 'abdos', 'fonctionnel', 'calli'];
const defs = [];
for (const f of FAMILIES) {
  const file = path.join(__dirname, 'data', f + '.js');
  if (fs.existsSync(file)) defs.push(...require(file).EXERCISES);
}

const EXERCISES = [];
const seen = new Set();
for (const d of defs) {
  const lib = byId[d.id];
  if (!lib) throw new Error(`id inconnu dans la bibliothèque : ${d.id}`);
  if (seen.has(d.id)) throw new Error(`id défini deux fois : ${d.id}`);
  seen.add(d.id);
  EXERCISES.push({ ...d, name: lib.name, meta: [lib.primary, ...lib.secondary].join(' · ') + ' — ' + lib.equipment, library: lib });
}
// ordre de la bibliothèque
const order = Object.fromEntries(LIBRARY.map((e, i) => [e.id, i]));
EXERCISES.sort((a, b) => order[a.id] - order[b.id]);

const MISSING = LIBRARY.filter(e => !seen.has(e.id)).map(e => e.id);
module.exports = { EXERCISES, LIBRARY, MISSING };
