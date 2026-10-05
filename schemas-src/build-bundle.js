// Génère ../schemas.js : moteur + poses des exercices en UN fichier navigateur (rendu SVG à la volée).
// Usage : node schemas-src/build-bundle.js     (à relancer après toute modification de schemas-core.js ou data/*.js)
const fs = require('fs'), path = require('path');
const root = __dirname;
const read = f => fs.readFileSync(path.join(root, f), 'utf8').replace(/\r\n/g, '\n');   // sortie déterministe (LF)

const families = fs.readdirSync(path.join(root, 'data')).filter(f => f.endsWith('.js') && f !== 'common.js').map(f => f.replace(/\.js$/, ''));
// base d'abord (ordre stable), puis le reste par ordre alphabétique
families.sort((a, b) => (a === 'base' ? -1 : b === 'base' ? 1 : a.localeCompare(b)));

let out = `/* ==========================================================================
   Muscu — Schémas d'exercices (rendu SVG à la volée)
   FICHIER GÉNÉRÉ par schemas-src/build-bundle.js : ne pas le modifier à la main.
   Sources : schemas-src/schemas-core.js (moteur) et schemas-src/data/*.js (poses, matériel).
   Les ids sont ceux de EXERCISE_LIBRARY (app.js) ; les libellés de pose sont en français
   (traduits à l'affichage par tr(), voir i18n-poses.js).
   API : MuscuSchemas.has(id) · .icon(id) · .poses(id) -> [{ label, svg }] · .labels()
   ========================================================================== */
(function () {
  'use strict';
  var __m = {};
  function __req(p) { return __m[p.replace(/^.*\\//, '').replace(/\\.js$/, '')]; }
  function __def(name, src) { var module = { exports: {} }; src(module, __req); __m[name] = module.exports; }

`;
const wrap = (name, code) => `  __def(${JSON.stringify(name)}, function (module, require) {\n${code.split('\n').map(l => '    ' + l).join('\n')}\n  });\n\n`;

out += wrap('schemas-core', read('schemas-core.js'));
out += wrap('common', read('data/common.js'));
for (const f of families) out += wrap(f, read(`data/${f}.js`));

out += `  var S = __m['schemas-core'], EX = {}, cache = { icon: {}, poses: {} };
  ${JSON.stringify(families)}.forEach(function (f) { __m[f].EXERCISES.forEach(function (e) { EX[e.id] = e; }); });

  window.MuscuSchemas = {
    has: function (id) { return Object.prototype.hasOwnProperty.call(EX, id); },
    /** Icône de profil (SVG décoratif, mis en cache). */
    icon: function (id) {
      if (!this.has(id)) return '';
      return cache.icon[id] || (cache.icon[id] = S.renderIcon(EX[id], { decorative: true }));
    },
    /** Détail pose par pose en vue isométrique. label(i, poseLabel) -> texte d'accessibilité (déjà traduit). */
    poses: function (id, label) {
      if (!this.has(id)) return [];
      var ex = EX[id];
      return ex.poses.map(function (p, i) {
        var key = id + ':' + i + ':' + (label ? label(i, p.label) : '');
        return { label: p.label, svg: cache.poses[key] || (cache.poses[key] = S.renderDetail(ex, i, { label: label ? label(i, p.label) : p.label })) };
      });
    },
    /** Tous les libellés de pose (français), pour la vérification des traductions. */
    labels: function () { var o = {}; Object.keys(EX).forEach(function (id) { EX[id].poses.forEach(function (p) { o[p.label] = 1; }); }); return Object.keys(o); },
    count: Object.keys(EX).length
  };
})();
`;

const target = path.join(root, '..', 'schemas.js');
fs.writeFileSync(target, out);
console.log(`schemas.js : ${(Buffer.byteLength(out) / 1024).toFixed(0)} Ko, ${families.length} familles`);
