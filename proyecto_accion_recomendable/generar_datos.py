"""Genera datos_acciones.js a partir de fuentes_AA_md/Acciones_Recomendables_1965-2026.md.
Uso, desde la raíz del repositorio: python3 proyecto_accion_recomendable/generar_datos.py .
Se vuelve a correr cuando haya una edición nueva de las Recomendaciones Vigentes;
revise el resumen que imprime y la lista OMITIR (nombres propios)."""
import re,json,collections,sys,unicodedata
R=sys.argv[1]
L=open(R+'/fuentes_AA_md/Acciones_Recomendables_1965-2026.md',encoding='utf-8').read().split('\n')
TIT={'Comité de Agenda y Políticas':'Agenda y Políticas','Comité de Finanzas':'Finanzas','Comité de Cooperación con la Comunidad Profesional':'Cooperación con la Comunidad Profesional','Comité de Información al Público':'Información al Público','Comité de Instituciones':'Instituciones','Comité de Literatura':'Literatura','Comité de Política y Admisiones':'Política y Admisiones','Comité de Congresos, Eventos y Foros Nacionales':'Congresos, Eventos y Foros','Comité sobre Custodios - Nominaciones':'Custodios y Nominaciones','Comité de Informe y Carta':'Informe y Carta','Comité Revista AA El Mensaje':'Revista AA El Mensaje','Comité de Archivo Histórico':'Archivo Histórico'}
INI=re.compile(r'^(Se [Rr]ecomienda|SE RECOMIENDA|Recomiendan?\b|Recomendaci[oó]n:|Recomendamos|Moci[oó]n|Sugerencia|Sugerimos|Se [Ss]ugiere|Se recuerda|Lema\b)')
def tipo(t):
    if re.match(r'(?i)moci',t): return 'Moción'
    if re.match(r'(?i)(sugerencia|sugerimos|se sugiere)',t): return 'Sugerencia'
    if re.match(r'(?i)lema',t): return 'Lema'
    if re.match(r'(?i)se recuerda',t): return 'Recordatorio'
    if re.match(r'(?i)(se recomienda|recomienda|recomendaci[oó]n:|recomendamos)',t): return 'Recomendación'
    return 'Nota'
OMITIR={'[nombre omitido]':'[nombre omitido]','[nombre omitido]':'[nombre omitido]'}
recs=[];com=None;an=None;pag=None;cur=None;fin=None
def cerrar():
    global cur
    if cur:
        t=re.sub(r'\s+',' ',cur['t']).strip()
        t=re.sub(r'(\w)- (\w)',lambda m:m.group(1)+m.group(2) if m.group(2).islower() else m.group(0),t)
        for a,b in OMITIR.items(): t=t.replace(a,b)
        if len(t)>12 and not (t.upper()==t and len(t)<80): recs.append({'c':cur['c'],'a':cur['a'],'k':tipo(t),'t':t,'p':cur['p']-1})
    cur=None
for i,l in enumerate(L):
    x=l.strip()
    m=re.match(r'### Pág\. PDF (\d+)',x)
    if m: pag=int(m.group(1)); continue
    if i<343: continue
    if re.fullmatch(r'(FUENTES DE CONSULTA|LEMAS.*|ANEXO.*|AÑO)',x) or re.match(r'^(LEMAS|Lemas de las|LISTADO)',x): fin=i+1; cerrar(); break
    if not x or re.match(r'^(Pág\. \d+ - Recomendaciones|Recomendaciones 1965 - \d{4} - Pág)',x) or re.fullmatch(r'\d{1,2}',x): continue
    if x in TIT: cerrar(); com=TIT[x]; an=None; continue
    if re.fullmatch(r'(19|20)\d\d',x): cerrar(); an=int(x); continue
    if an is None: continue
    if INI.match(x): cerrar(); cur={'c':com,'a':an,'p':pag,'t':x}; continue
    if cur is None: cur={'c':com,'a':an,'p':pag,'t':x}
    else: cur['t']+=' '+x
cerrar()
print('fin en linea',fin,'registros',len(recs))
print(collections.Counter(r['k'] for r in recs)); print(collections.Counter(r['c'] for r in recs).most_common()); print('años',min(r['a'] for r in recs),max(r['a'] for r in recs))
print('fuente Se Recomienda aprox', sum(1 for l in L[343:(fin or len(L))] if re.match(r'^\s*Se [Rr]ecomienda',l)),'| indexadas tipo Recomendación',sum(r['k']=='Recomendación' for r in recs))
lg=sorted(recs,key=lambda r:-len(r['t']))[:3]
for r in lg: print('LARGO',len(r['t']),r['c'],r['a'],r['t'][:90],'...',r['t'][-70:])
for r in [x for x in recs if x['k']=='Nota'][:8]: print('NOTA',r['c'],r['a'],r['p'],r['t'][:110])
for q in ('primera quincena de febrero','antes del 31 de enero','razones por las cuales fueron rechazados'):
    hit=[(r['c'],r['a'],r['p']) for r in recs if q in r['t']]; print(q,hit)
print('nombres residuales',[r['a'] for r in recs if re.search(r'nombre_omitido',r['t'])], 'omitidos',sum('[nombre omitido]' in r['t'] for r in recs))
js="/* Generado a partir de “Recomendaciones Vigentes 1965-2026”, Oficina de Servicios Generales de AA Colombia.\n   c = comité · a = año · k = tipo · t = texto · p = página impresa del documento. */\nconst ACCIONES = "+json.dumps(recs,ensure_ascii=False,separators=(',',':'))+";\n"
open(R+'/proyecto_accion_recomendable/datos_acciones.js','w',encoding='utf-8').write(js); print('bytes',len(js.encode()))
