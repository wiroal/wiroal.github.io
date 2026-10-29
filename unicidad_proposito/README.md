# 🗼 El Faro: Una Sola Misión

Juego de estudio en **6 retos** para comprender la **unicidad de propósito** de Alcohólicos Anónimos.
Cada reto enciende un rayo del faro. Al terminar los seis se obtiene el reconocimiento de *Guardián del Faro*.

## Los 6 retos

| # | Reto | Tema | Tipo de juego |
|---|------|------|---------------|
| 1 | 💡 La luz del faro | ¿Qué es la unicidad de propósito? | Completar las Tradiciones + preguntas |
| 2 | 👞 Zapatero a tus zapatos | Quinta y Sexta Tradición | Clasificar: ¿misión o desvío? |
| 3 | 🚪 La puerta abierta | Tercera Tradición, reuniones abiertas y cerradas | Situaciones reales |
| 4 | 🧭 El camino de la historia | De 1935 a hoy | Línea del tiempo + preguntas |
| 5 | 🗣️ ¿Quién lo dijo? | Bill W., custodios, delegados | Adivinar al autor de la cita |
| 6 | ⚖️ El equilibrio del faro | Ni diluir ni endurecer | Dilemas del grupo |

Cada reto tiene tres pasos: **Aprende** (tarjetas con citas de la literatura), **Juega** y **Reflexiona** (preguntas para compartir).
También incluye un **plan de estudio** para usar en reuniones del grupo, una **biblioteca** con glosario y fuentes, y un **certificado** imprimible.

## Publicar en GitHub Pages

Copia esta carpeta en el repositorio `wiroal.github.io`:

```
wiroal.github.io/
└── unicidad_proposito/
    ├── index.html
    ├── estadisticas.html
    ├── apps-script/Code.gs   (se pega en Apps Script; no hace falta publicarlo)
    └── README.md
```

Después de hacer `git push`, queda disponible en:
**https://wiroal.github.io/unicidad_proposito/**

## Detalles técnicos

- Un solo archivo HTML, sin dependencias (solo las fuentes de Google Fonts, con respaldo del sistema).
- Funciona en celular, tableta y computador.
- El progreso, las notas y el nombre se guardan solo en el navegador de cada persona (`localStorage`).
- Estadísticas anónimas opcionales con Google Apps Script (ver abajo).
- Sonidos generados con Web Audio (se pueden silenciar).
- Respeta la preferencia de "reducir movimiento".

## Estadísticas de uso (opcional)

El juego puede registrar estadísticas **anónimas**: hasta qué paso llega cada visitante (24 pasos = 6 retos × Aprende, Juega, Reflexiona, Completó)
y su ciudad aproximada. La ciudad se calcula a partir de la IP con [geojs.io](https://www.geojs.io/), pero **la IP no se guarda**; tampoco el nombre ni las notas.
Cada navegador recibe un identificador aleatorio para contar usuarios únicos.

**Instalación (una sola vez, gratis):**

1. Crea una hoja de cálculo nueva en Google Sheets (por ejemplo, "El Faro – estadísticas").
2. En la hoja: **Extensiones → Apps Script**. Borra lo que haya y pega el contenido de `apps-script/Code.gs`. Guarda.
3. **Implementar → Nueva implementación → Tipo: Aplicación web.** Ejecutar como: *Yo*. Quién tiene acceso: *Cualquier usuario*. Autoriza los permisos.
4. Copia la URL que termina en `/exec` y pégala en `index.html`, en la línea `const ESTAD_URL = "";`.
5. (Opcional) Para que solo tú veas el resumen: en Apps Script, **Configuración del proyecto → Propiedades de la secuencia de comandos**, agrega `CLAVE` con la clave que quieras.

**Ver los datos:**

- Abre `estadisticas.html` (por ejemplo `https://wiroal.github.io/unicidad_proposito/estadisticas.html`), pega la URL `/exec` y la clave.
  Muestra usuarios, visitas, avance promedio, el % que llega a cada paso, y la distribución por país, departamento de Colombia y ciudad.
- O en la hoja de cálculo: menú **📊 Estadísticas → Actualizar resumen** crea la pestaña `resumen`. Los eventos crudos quedan en la pestaña `eventos`.

Si cambias `Code.gs` después, usa **Implementar → Administrar implementaciones → Editar → Nueva versión** para que la URL siga igual.

## Fuentes

Doce Pasos y Doce Tradiciones; Alcohólicos Anónimos (Libro Grande); A.A. Llega a su Mayoría de Edad;
El Lenguaje del Corazón ("Problemas diferentes del alcohol", 1958); Box 4-5-9 (1982, 1988, 1989, 1994, 2003, 2004);
Acerca de A.A. (verano 2001); Acciones Recomendables de la Conferencia de Colombia; Plan Nacional de Acción
(proyecto de recomendación, CSG Colombia).

> Material de estudio preparado a partir de literatura aprobada por la Conferencia y documentos de servicio.
> No es una publicación oficial de A.A.
