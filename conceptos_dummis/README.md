# conceptos_dummis

Cuaderno de estudio para los **Doce Conceptos para el Servicio Mundial de A.A.**, pensado para una RSG que está fundando un grupo en el **Distrito 2, Área C.3 (Bogotá D.C.)**.

**Página publicada:** https://wiroal.github.io/conceptos_dummis/

## Qué contiene

- `index.html` — **Doce Conceptos en Juego** (versión 2026). Juego de aprendizaje autónomo para quien empieza desde cero:
  - 8 niveles (0 a 7): Primeros pasos, La fuente, Los tres derechos, El motor, Liderazgo, Personas y garantías, El gran tejido y el Reto de Excelencia (20 preguntas, 3 vidas);
  - fichas por Concepto: en una frase, Forma corta textual, imagen sencilla, explicación a fondo, cita de Bill con página, dinámica de grupo, puente con los Pasos y con las Tradiciones, trampa y micro-reto;
  - 99 retos de seis tipos (opción múltiple, verdadero/falso, casos, completar la Forma corta, emparejar y ordenar), con explicación y fuente;
  - XP, rachas, estrellas (★ 80 % · ★★ 90 % · ★★★ 100 %), rangos, insignias, metas y reto diario;
  - mapa de puentes Conceptos–Pasos–Tradiciones, glosario y exportación/importación del progreso (localStorage).
- `estadisticas.html` — panel de estadísticas anónimas de uso (ver abajo).
- `apps-script/Code.gs` — código para Google Apps Script que recibe y resume las estadísticas.
- `cuaderno.html` — el cuaderno de 8 semanas anterior (ruta, bitácora, tarjetas y casos).
- `vault/` — vault de Obsidian con notas enlazadas, plantillas, casos, glosario y MOC.
- `README.md` — este archivo.

Todas las citas fueron cotejadas con el *Manual de Servicio de AA 2025-2027* (OSG Colombia) y *Doce Pasos y Doce Tradiciones*; las páginas “C” son de la sección de los Doce Conceptos. Los “puentes” son material de estudio, no literatura aprobada.

## Cómo usarlo

### En el navegador

Abre la página publicada o `index.html` y empieza por el **Nivel 0**: lee las fichas y luego haz los retos. Con 80 % se abre el siguiente nivel. El progreso se guarda en tu navegador; usa **Exportar** (en “Fuentes y progreso”) para respaldarlo. Si prefieres el plan de 8 semanas con bitácora, abre `cuaderno.html`.

### En Obsidian

1. Descarga o clona el repositorio.
2. En Obsidian: **Abrir carpeta como vault** → `conceptos_dummis/vault`.
3. Empieza en `00 Inicio/MOC - Doce Conceptos`.
4. Abre el gráfico para ver las conexiones entre Conceptos, semanas y tensiones.

## Estructura

```
conceptos_dummis/
├── index.html
├── estadisticas.html
├── apps-script/Code.gs   (se pega en Apps Script)
├── README.md
└── vault/
    ├── 00 Inicio/          MOC, guía de uso y canvas
    ├── 01 Plan/            Plan de 8 semanas y semanas 0–8
    ├── 02 Conceptos/       Los 12 Conceptos
    ├── 03 Práctica/        Bitácora, casos, tensiones, glosario, kit
    ├── 04 Plantillas/      Plantillas de concepto, semana y diario
    └── .obsidian/          Configuración mínima del vault
```

## Enfoque

No es un curso para memorizar. Es una práctica de cuatro preguntas:

1. **¿Qué dice?** La Forma corta y el ensayo de Bill.
2. **¿Por qué existe?** El problema que resolvía y el que resuelve hoy.
3. **¿Dónde lo vivo?** Un caso real del grupo, del Distrito 2 o del Área C.3.
4. **¿Qué hago distinto?** Una micro-acción por semana.

La sesión base dura 35 minutos y tiene cinco tramos: llegada, lectura, traducción, ubicación y micro-acción. La constancia vale más que la cantidad.

## Privacidad y anonimato

- La página no incluye apellidos ni el nombre del grupo.
- Está marcada con `noindex` para no aparecer en buscadores.
- No hay cuentas: el progreso vive en `localStorage`.
- Las estadísticas de uso son anónimas y opcionales (solo se activan si `ESTAD_URL` tiene valor). La IP se usa en el navegador para calcular la ciudad aproximada y **no se guarda**.
- Por la Tradición 11, comparte el enlace con discreción; no lo publiques en redes abiertas.

## Estadísticas de uso (opcional)

El juego puede registrar estadísticas **anónimas**:

- hasta qué paso llega cada visitante (24 pasos = 8 niveles × *abrió*, *intentó el reto*, *aprobó*);
- el resultado de cada reto (puntaje, estrellas, errores), incluido el reto diario;
- qué fichas se marcan como leídas;
- ciudad, departamento y país aproximados, calculados a partir de la IP con [geojs.io](https://www.geojs.io/). **La IP no se guarda**; tampoco nombres ni el archivo de progreso.

Cada navegador recibe un identificador aleatorio para contar usuarios únicos y visitas que regresan.

**Instalación (una sola vez, gratis):**

1. Crea una hoja de cálculo nueva en Google Sheets (por ejemplo, "Doce Conceptos – estadísticas").
2. En la hoja: **Extensiones → Apps Script**. Borra lo que haya y pega el contenido de `apps-script/Code.gs`. Guarda.
3. **Implementar → Nueva implementación → Tipo: Aplicación web.** Ejecutar como: *Yo*. Quién tiene acceso: *Cualquier usuario*. Autoriza los permisos.
4. Copia la URL que termina en `/exec` y pégala en `index.html`, en la línea `const ESTAD_URL = "";`.
5. (Opcional) Para que solo tú veas el resumen: en Apps Script, **Configuración del proyecto → Propiedades de la secuencia de comandos**, agrega `CLAVE` con la clave que quieras.

**Ver los datos:**

- Abre `https://wiroal.github.io/conceptos_dummis/estadisticas.html`, pega la URL `/exec` y la clave.
  Muestra usuarios, visitas, avance promedio, el embudo por nivel, los resultados de los retos, las fichas más leídas y la distribución por país, departamento de Colombia y ciudad.
- O en la hoja de cálculo: menú **📊 Estadísticas → Actualizar resumen** crea la pestaña `resumen`. Los eventos crudos quedan en la pestaña `eventos`.

Si cambias `Code.gs` después, usa **Implementar → Administrar implementaciones → Editar → Nueva versión** para que la URL siga igual.

## Fuentes y derechos

Fuente principal: *El Manual de Servicio de A.A. y Doce Conceptos para el Servicio Mundial, 2025–2027*, Oficina de Servicios Generales de A.A. Colombia.

Este es un material de estudio **no oficial**. No reproduce los ensayos completos ni la Forma larga. Incluye la Forma corta y citas breves con fines educativos, con atribución. La literatura de A.A. está protegida por derechos de autor de A.A. World Services, Inc. y de la OSG de A.A. Colombia. Para el texto completo, consulta la literatura aprobada.

## Créditos

Hecho como cuaderno de estudio para una RSG del Distrito 2, Área C.3, Bogotá. El método, las explicaciones y los casos son material de apoyo; no son literatura aprobada por la Conferencia.
