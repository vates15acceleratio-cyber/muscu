// Génère : apercu.html (icône de profil → clic = détail isométrique, avec filtre par groupe et recherche)
// et out/svg/*.svg (un fichier par vue, avec le poids total).   Usage : node build.js
const fs = require('fs'), path = require('path');
const S = require('./schemas-core');
const { EXERCISES } = require('./schemas-data');
const C = S.C;

const outDir = path.join(__dirname, 'out', 'svg');
fs.rmSync(path.join(__dirname, 'out'), { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

let total = 0, count = 0;
const save = (name, svg) => { fs.writeFileSync(path.join(outDir, name + '.svg'), svg); total += Buffer.byteLength(svg); count++; };
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

// groupes d'affichage = sections de la bibliothèque (préfixe d'id)
const GROUPS = [['pec', 'Pectoraux'], ['dos', 'Dos'], ['ep', 'Épaules'], ['bi', 'Biceps'], ['tri', 'Triceps'], ['q', 'Quadriceps'],
  ['is', 'Ischios / fessiers'], ['fess', 'Ischios / fessiers'], ['mol', 'Mollets'], ['ab', 'Abdos'], ['fn', 'Fonctionnel'], ['cal', 'Callisthénie']];
const groupOf = id => (GROUPS.find(([p]) => id.startsWith(p + '-')) || [0, 'Autres'])[1];
const groupNames = [...new Set(GROUPS.map(g => g[1]))];

const css = `
body{margin:0;background:${C.bg};color:${C.text};font-family:system-ui,-apple-system,Segoe UI,sans-serif;padding:18px 14px 40px}
h1{font-size:20px;margin:0 0 4px;color:${C.accent}} p.sub{margin:0 0 14px;color:${C.dim};font-size:14px;max-width:760px}
.bar{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:0 0 14px;max-width:1000px}
.bar input{background:${C.surface};border:1px solid ${C.border};color:${C.text};border-radius:8px;padding:7px 10px;font:inherit;min-width:180px}
.chip{background:${C.surface};border:1px solid ${C.border};color:${C.dim};border-radius:999px;padding:5px 11px;cursor:pointer;font:inherit;font-size:13px}
.chip.on{background:${C.accent};color:${C.bg};border-color:${C.accent}}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;max-width:1000px}
.tile{background:${C.surface};border:1px solid ${C.border};border-radius:12px;padding:6px 6px 8px;cursor:pointer;color:inherit;font:inherit;text-align:center}
.tile:hover,.tile:focus-visible{border-color:${C.accent};outline:none}.tile[hidden]{display:none}
.tile svg{width:100%;height:auto;display:block;background:${C.bg};border-radius:8px}
.tile .n{font-size:13px;margin-top:6px;line-height:1.2}.tile .m{font-size:11px;color:${C.dim};margin-top:2px}
.count{color:${C.dim};font-size:13px;margin:0 0 10px}
.modal{position:fixed;inset:0;background:rgba(0,0,0,.72);display:none;align-items:flex-start;justify-content:center;overflow:auto;padding:20px 10px;z-index:9}
.modal.open{display:flex}.sheet{background:${C.surface};border:1px solid ${C.border};border-radius:14px;padding:14px;max-width:820px;width:100%}
.sheet h2{margin:0;font-size:17px}.sheet .meta{color:${C.dim};font-size:13px;margin:2px 0 10px}
.close{float:right;background:${C.surface2};color:${C.text};border:1px solid ${C.border};border-radius:8px;padding:4px 10px;cursor:pointer;font:inherit}
.row{display:flex;gap:10px;flex-wrap:wrap}.pose{flex:1 1 150px;min-width:150px;max-width:260px;background:${C.bg};border:1px solid ${C.border};border-radius:10px;padding:6px 4px 4px;text-align:center}
.pose svg{width:100%;height:auto;display:block}.cap{font-size:12.5px;color:${C.dim};padding:2px 4px 4px}
`;

let tiles = '', tpls = '';
const stats = [];
for (const ex of EXERCISES) {
  let bytes = 0;
  const icon = S.renderIcon(ex);
  save(ex.id + '-icon', icon); bytes += Buffer.byteLength(icon);
  const grp = groupOf(ex.id);
  tiles += `<button class="tile" data-id="${ex.id}" data-g="${esc(grp)}" data-q="${esc((ex.name + ' ' + ex.meta).toLowerCase())}" aria-label="${esc(ex.name)} : voir les étapes"><div>${icon}</div><div class="n">${esc(ex.name)}</div><div class="m">${esc(ex.meta.split(' — ')[0])}</div></button>`;
  let row = '';
  ex.poses.forEach((p, i) => {
    const d = S.renderDetail(ex, i);
    save(`${ex.id}-iso-${i + 1}`, d); bytes += Buffer.byteLength(d);
    row += `<div class="pose">${d}<div class="cap">${i + 1} · ${esc(p.label)}</div></div>`;
  });
  tpls += `<template id="d-${ex.id}"><h2>${esc(ex.name)}</h2><div class="meta">${esc(ex.meta)}</div><div class="row">${row}</div></template>`;
  stats.push([ex.id, bytes]);
}

const chips = ['Tous', ...groupNames].map((g, i) => `<button class="chip${i ? '' : ' on'}" data-g="${i ? esc(g) : ''}">${esc(g)}</button>`).join('');
const script = `<div class="modal" id="m" role="dialog" aria-modal="true"><div class="sheet"><button class="close" id="x">Fermer</button><div id="c"></div></div></div><script>
const m=document.getElementById('m'),c=document.getElementById('c'),q=document.getElementById('q'),cnt=document.getElementById('cnt');
let grp='';
const tiles=[...document.querySelectorAll('.tile')];
function apply(){const t=q.value.trim().toLowerCase();let n=0;tiles.forEach(b=>{const ok=(!grp||b.dataset.g===grp)&&(!t||b.dataset.q.includes(t));b.hidden=!ok;if(ok)n++;});cnt.textContent=n+' exercice'+(n>1?'s':'');}
document.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{document.querySelectorAll('.chip').forEach(x=>x.classList.remove('on'));b.classList.add('on');grp=b.dataset.g;apply();});
q.oninput=apply;apply();
tiles.forEach(b=>b.onclick=()=>{c.innerHTML='';c.appendChild(document.getElementById('d-'+b.dataset.id).content.cloneNode(true));m.classList.add('open');});
const close=()=>m.classList.remove('open');document.getElementById('x').onclick=close;m.onclick=e=>{if(e.target===m)close()};addEventListener('keydown',e=>{if(e.key==='Escape')close()});
</script>`;

const body = `<h1>Schémas d'exercices — aperçu (${EXERCISES.length})</h1><p class="sub">Chaque exercice a une icône de profil. Un clic ouvre le détail en vue isométrique, pose par pose (numéro, flèche = sens du mouvement).</p>`
  + `<div class="bar"><input id="q" type="search" placeholder="Rechercher un exercice, un muscle…" aria-label="Rechercher">${chips}</div><div class="count" id="cnt"></div><div class="grid">${tiles}</div>${tpls}${script}`;
fs.writeFileSync(path.join(__dirname, 'apercu.html'), `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Schémas d'exercices — aperçu</title><style>${css}</style></head><body>${body}</body></html>`);

const kb = n => (n / 1024).toFixed(1) + ' Ko';
console.log(`${EXERCISES.length} exercices, ${count} SVG, ${kb(total)} au total (${kb(total / EXERCISES.length)} par exercice)`);
console.log('apercu.html :', kb(fs.statSync(path.join(__dirname, 'apercu.html')).size));
