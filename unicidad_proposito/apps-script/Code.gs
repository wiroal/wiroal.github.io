/* =========================================================
   El Faro · Estadísticas de uso (Google Apps Script)
   Recibe los eventos del juego, los guarda en esta hoja de cálculo
   y entrega un resumen en JSON para estadisticas.html.
   ========================================================= */

const HOJA = "eventos";
const COLUMNAS = ["fecha","uid","sesion","evento","reto","nivel","porcentaje","estrellas","errores",
                  "ciudad","region","pais","codigo_pais","dispositivo","idioma","origen"];
const NIVELES = 24;   // 6 retos × (aprende, juega, reflexiona, completado)

// Clave opcional para leer el resumen: Configuración del proyecto → Propiedades de la secuencia de comandos → CLAVE
const clave_ = () => PropertiesService.getScriptProperties().getProperty("CLAVE") || "";

function hoja_(){
  const ss = SpreadsheetApp.getActive();
  let h = ss.getSheetByName(HOJA);
  if(!h){ h = ss.insertSheet(HOJA); h.appendRow(COLUMNAS); h.setFrozenRows(1); }
  return h;
}
const txt_ = (v, n=60) => String(v == null ? "" : v).slice(0, n);
const num_ = (v, min, max) => { const x = Math.round(Number(v)); return isFinite(x) ? Math.min(max, Math.max(min, x)) : ""; };

/* ---------- Registro de eventos ---------- */
function doPost(e){
  let d;
  try { d = JSON.parse(e.postData.contents); } catch(err){ return ContentService.createTextOutput("json inválido"); }
  const nivel = num_(d.nivel, 0, NIVELES) || 0;
  const fila = [new Date(), txt_(d.uid,32), txt_(d.sid,32), txt_(d.evento,20), num_(d.reto,1,6),
    nivel, Math.round(nivel / NIVELES * 100), num_(d.estrellas,1,3), num_(d.errores,0,999),
    txt_(d.ciudad), txt_(d.region), txt_(d.pais), txt_(d.codigo,4), txt_(d.dispositivo,12), txt_(d.idioma,12), txt_(d.origen,80)];
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try { hoja_().appendRow(fila); } finally { lock.releaseLock(); }
  return ContentService.createTextOutput("ok");
}

/* ---------- Resumen ---------- */
function calcular_(){
  const filas = hoja_().getDataRange().getValues().slice(1);
  const U = {}, sesiones = new Set(), porDia = {};
  filas.forEach(f => {
    const [fecha, uid, sid, evento, , nivel, , , , ciudad, region, pais] = f;
    if(!uid) return;
    sesiones.add(sid);
    const dia = Utilities.formatDate(new Date(fecha), "America/Bogota", "yyyy-MM-dd");
    (porDia[dia] = porDia[dia] || {visitas:new Set(), usuarios:new Set()});
    porDia[dia].visitas.add(sid); porDia[dia].usuarios.add(uid);
    const u = U[uid] = U[uid] || {nivel:0, ciudad:"", region:"", pais:"", primera:fecha, ultima:fecha, sesiones:new Set()};
    u.nivel = Math.max(u.nivel, Number(nivel) || 0);
    if(ciudad || pais){ u.ciudad = ciudad; u.region = region; u.pais = pais; }
    if(fecha > u.ultima) u.ultima = fecha;
    u.sesiones.add(sid);
  });
  const lista = Object.values(U), total = lista.length || 1;
  const pct = x => Math.round(x / total * 1000) / 10;

  // Embudo: % de usuarios que llegó al menos a cada nivel
  const embudo = [];
  for(let n = 1; n <= NIVELES; n++){
    const c = lista.filter(u => u.nivel >= n).length;
    embudo.push({nivel:n, reto:Math.ceil(n/4), fase:["aprende","juega","reflexiona","completado"][(n-1)%4], usuarios:c, porcentaje:pct(c)});
  }
  // Cuántos retos completó cada usuario (0..6)
  const retos = [0,1,2,3,4,5,6].map(k => {
    const c = lista.filter(u => Math.floor(u.nivel/4) === k).length;
    return {retos:k, usuarios:c, porcentaje:pct(c)};
  });
  const agrupar = clave => {
    const g = {};
    lista.forEach(u => { const k = clave(u) || "Desconocido"; (g[k] = g[k] || {lugar:k, usuarios:0, suma:0}); g[k].usuarios++; g[k].suma += u.nivel; });
    return Object.values(g).map(x => ({lugar:x.lugar, usuarios:x.usuarios, avance:Math.round(x.suma / x.usuarios / NIVELES * 100)}))
      .sort((a,b) => b.usuarios - a.usuarios);
  };
  return {
    actualizado: new Date().toISOString(),
    usuarios: lista.length,
    visitas: sesiones.size,
    recurrentes: lista.filter(u => u.sesiones.size > 1).length,
    avancePromedio: lista.length ? Math.round(lista.reduce((s,u) => s + u.nivel, 0) / lista.length / NIVELES * 100) : 0,
    terminaron: lista.filter(u => u.nivel >= NIVELES).length,
    embudo, retos,
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
      ["Avance promedio (%)", r.avancePromedio], ["Completaron los 6 retos", r.terminaron]],
    [["Nivel","Reto","Fase","Usuarios","% que llegó"], ...r.embudo.map(x => [x.nivel, x.reto, x.fase, x.usuarios, x.porcentaje])],
    [["Retos completados","Usuarios","%"], ...r.retos.map(x => [x.retos, x.usuarios, x.porcentaje])],
    [["País","Usuarios","Avance promedio (%)"], ...r.paises.map(x => [x.lugar, x.usuarios, x.avance])],
    [["Departamento (Colombia)","Usuarios","Avance promedio (%)"], ...r.colombia.map(x => [x.lugar, x.usuarios, x.avance])],
    [["Ciudad","Usuarios","Avance promedio (%)"], ...r.ciudades.map(x => [x.lugar, x.usuarios, x.avance])]
  ];
  let fila = 1;
  bloques.forEach(b => {
    h.getRange(fila, 1, b.length, b[0].length).setValues(b);
    h.getRange(fila, 1, 1, b[0].length).setFontWeight("bold").setBackground("#EDE9FE");
    fila += b.length + 2;
  });
  h.autoResizeColumns(1, 5);
}
