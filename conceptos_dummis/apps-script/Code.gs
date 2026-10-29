/* =========================================================
   Doce Conceptos en Juego · Estadísticas de uso (Google Apps Script)
   Recibe los eventos del juego, los guarda en esta hoja de cálculo
   y entrega un resumen en JSON para estadisticas.html.
   ========================================================= */

const HOJA = "eventos";
const COLUMNAS = ["fecha","uid","sesion","evento","nivel","paso","porcentaje","puntaje","estrellas","errores","ficha","fichas","xp",
                  "ciudad","region","pais","codigo_pais","dispositivo","idioma","origen"];
const NIVELES = 8;            // niveles 0..7
const PASOS = NIVELES * 3;    // 8 niveles × (abrió, intentó, aprobó)
const FASES = ["abrio","intento","aprobo"];
const FICHAS = ["L0a","L0b","L0c","L0d","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","L6a","L6b","L6c"];

// Clave opcional para leer el resumen: Configuración del proyecto → Propiedades de la secuencia de comandos → CLAVE
const clave_ = () => PropertiesService.getScriptProperties().getProperty("CLAVE") || "";

function hoja_(){
  const ss = SpreadsheetApp.getActive();
  let h = ss.getSheetByName(HOJA);
  if(!h){ h = ss.insertSheet(HOJA); h.appendRow(COLUMNAS); h.setFrozenRows(1); }
  return h;
}
const txt_ = (v, n=60) => String(v == null ? "" : v).slice(0, n);
const num_ = (v, min, max) => { if(v === "" || v == null) return ""; const x = Math.round(Number(v)); return isFinite(x) ? Math.min(max, Math.max(min, x)) : ""; };

/* ---------- Registro de eventos ---------- */
function doPost(e){
  let d;
  try { d = JSON.parse(e.postData.contents); } catch(err){ return ContentService.createTextOutput("json inválido"); }
  const paso = num_(d.paso, 0, PASOS) || 0;
  const nivel = d.nivel === "diario" ? "diario" : num_(d.nivel, 0, NIVELES - 1);
  const ficha = FICHAS.includes(d.ficha) ? d.ficha : "";
  const fila = [new Date(), txt_(d.uid,32), txt_(d.sid,32), txt_(d.evento,20), nivel,
    paso, Math.round(paso / PASOS * 100), num_(d.puntaje,0,100), num_(d.estrellas,0,3), num_(d.errores,0,99),
    ficha, num_(d.fichas,0,FICHAS.length), num_(d.xp,0,1e6),
    txt_(d.ciudad), txt_(d.region), txt_(d.pais), txt_(d.codigo,4), txt_(d.dispositivo,12), txt_(d.idioma,12), txt_(d.origen,80)];
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try { hoja_().appendRow(fila); } finally { lock.releaseLock(); }
  return ContentService.createTextOutput("ok");
}

/* ---------- Resumen ---------- */
function calcular_(){
  const filas = hoja_().getDataRange().getValues().slice(1);
  const U = {}, sesiones = new Set(), porDia = {}, R = {}, F = {};
  filas.forEach(f => {
    const [fecha, uid, sid, evento, nivel, paso, , puntaje, , , ficha, , xp, ciudad, region, pais] = f;
    if(!uid) return;
    sesiones.add(sid);
    const dia = Utilities.formatDate(new Date(fecha), "America/Bogota", "yyyy-MM-dd");
    (porDia[dia] = porDia[dia] || {visitas:new Set(), usuarios:new Set()});
    porDia[dia].visitas.add(sid); porDia[dia].usuarios.add(uid);
    const u = U[uid] = U[uid] || {paso:0, xp:0, ciudad:"", region:"", pais:"", ultima:fecha, sesiones:new Set()};
    u.paso = Math.max(u.paso, Number(paso) || 0);
    u.xp = Math.max(u.xp, Number(xp) || 0);
    if(ciudad || pais){ u.ciudad = ciudad; u.region = region; u.pais = pais; }
    if(fecha > u.ultima) u.ultima = fecha;
    u.sesiones.add(sid);
    if(evento === "reto" && puntaje !== ""){
      const k = String(nivel);
      const r = R[k] = R[k] || {intentos:0, suma:0, aprobados:0, usuarios:new Set()};
      r.intentos++; r.suma += Number(puntaje); r.usuarios.add(uid);
      if(Number(puntaje) >= 80) r.aprobados++;
    }
    if(evento === "ficha" && ficha) (F[ficha] = F[ficha] || new Set()).add(uid);
  });
  const lista = Object.values(U), total = lista.length || 1;
  const pct = x => Math.round(x / total * 1000) / 10;

  // Embudo: % de usuarios que llegó al menos a cada paso
  const embudo = [];
  for(let n = 1; n <= PASOS; n++){
    const c = lista.filter(u => u.paso >= n).length;
    embudo.push({paso:n, nivel:Math.ceil(n/3) - 1, fase:FASES[(n-1)%3], usuarios:c, porcentaje:pct(c)});
  }
  // Cuántos niveles aprobó cada usuario (0..8)
  const aprobados = [...Array(NIVELES + 1).keys()].map(k => {
    const c = lista.filter(u => Math.floor(u.paso/3) === k).length;
    return {niveles:k, usuarios:c, porcentaje:pct(c)};
  });
  // Resultados de los retos por nivel (todos los intentos, incluido el reto diario)
  const retos = [...[...Array(NIVELES).keys()].map(String), "diario"].map(k => {
    const r = R[k] || {intentos:0, suma:0, aprobados:0, usuarios:new Set()};
    return {nivel:k, intentos:r.intentos, usuarios:r.usuarios.size,
      promedio: r.intentos ? Math.round(r.suma / r.intentos) : 0,
      aprobacion: r.intentos ? Math.round(r.aprobados / r.intentos * 100) : 0};
  });
  const fichas = FICHAS.map(k => ({ficha:k, usuarios:F[k] ? F[k].size : 0, porcentaje:pct(F[k] ? F[k].size : 0)}));
  const agrupar = clave => {
    const g = {};
    lista.forEach(u => { const k = clave(u) || "Desconocido"; (g[k] = g[k] || {lugar:k, usuarios:0, suma:0}); g[k].usuarios++; g[k].suma += u.paso; });
    return Object.values(g).map(x => ({lugar:x.lugar, usuarios:x.usuarios, avance:Math.round(x.suma / x.usuarios / PASOS * 100)}))
      .sort((a,b) => b.usuarios - a.usuarios);
  };
  return {
    actualizado: new Date().toISOString(),
    usuarios: lista.length,
    visitas: sesiones.size,
    recurrentes: lista.filter(u => u.sesiones.size > 1).length,
    avancePromedio: lista.length ? Math.round(lista.reduce((s,u) => s + u.paso, 0) / lista.length / PASOS * 100) : 0,
    terminaron: lista.filter(u => u.paso >= PASOS).length,
    xpPromedio: lista.length ? Math.round(lista.reduce((s,u) => s + u.xp, 0) / lista.length) : 0,
    embudo, aprobados, retos, fichas,
    paises: agrupar(u => u.pais),
    ciudades: agrupar(u => u.ciudad ? `${u.ciudad}, ${u.region} (${u.pais})` : ""),
    colombia: agrupar(u => u.pais === "Colombia" ? u.region : null).filter(x => x.lugar !== "Desconocido"),
    dias: Object.keys(porDia).sort().slice(-60).map(d => ({dia:d, visitas:porDia[d].visitas.size, usuarios:porDia[d].usuarios.size}))
  };
}

function doGet(e){
  const k = clave_();
  const salida = (k && e.parameter.clave !== k) ? {error:"clave incorrecta"} : calcular_();
  return ContentService.createTextOutput(JSON.stringify(salida)).setMimeType(ContentService.MimeType.JSON);
}

/* ---------- Resumen dentro de la hoja de cálculo ---------- */
function onOpen(){
  SpreadsheetApp.getUi().createMenu("📊 Estadísticas").addItem("Actualizar resumen", "actualizarResumen").addToUi();
}
function actualizarResumen(){
  const r = calcular_(), ss = SpreadsheetApp.getActive();
  const h = ss.getSheetByName("resumen") || ss.insertSheet("resumen");
  h.clear();
  const bloques = [
    [["Indicador","Valor"], ["Usuarios únicos", r.usuarios], ["Visitas (sesiones)", r.visitas], ["Usuarios que regresaron", r.recurrentes],
      ["Avance promedio (%)", r.avancePromedio], ["Aprobaron los 8 niveles", r.terminaron], ["XP promedio", r.xpPromedio]],
    [["Paso","Nivel","Fase","Usuarios","% que llegó"], ...r.embudo.map(x => [x.paso, x.nivel, x.fase, x.usuarios, x.porcentaje])],
    [["Niveles aprobados","Usuarios","%"], ...r.aprobados.map(x => [x.niveles, x.usuarios, x.porcentaje])],
    [["Nivel del reto","Intentos","Usuarios","Puntaje promedio (%)","% de intentos aprobados"], ...r.retos.map(x => [x.nivel, x.intentos, x.usuarios, x.promedio, x.aprobacion])],
    [["Ficha","Usuarios que la leyeron","%"], ...r.fichas.map(x => [x.ficha, x.usuarios, x.porcentaje])],
    [["País","Usuarios","Avance promedio (%)"], ...r.paises.map(x => [x.lugar, x.usuarios, x.avance])],
    [["Departamento (Colombia)","Usuarios","Avance promedio (%)"], ...r.colombia.map(x => [x.lugar, x.usuarios, x.avance])],
    [["Ciudad","Usuarios","Avance promedio (%)"], ...r.ciudades.map(x => [x.lugar, x.usuarios, x.avance])]
  ];
  let fila = 1;
  bloques.forEach(b => {
    h.getRange(fila, 1, b.length, b[0].length).setValues(b);
    h.getRange(fila, 1, 1, b[0].length).setFontWeight("bold").setBackground("#FFE4EC");
    fila += b.length + 2;
  });
  h.autoResizeColumns(1, 5);
}
