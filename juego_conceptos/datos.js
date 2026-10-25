/* Juego de los Doce Conceptos — banco de preguntas y nombres.
   Fuente de preguntas: El Manual de Servicio de AA y Doce Conceptos para el Servicio Mundial,
   edición 2025-2027 (Corporación Nacional de Servicios Generales de AA Colombia).
   "pág. PDF N" = página del archivo PDF; cuando existe, se indica también la página impresa. */

const SALA_PREFIJO = 'aa-conceptos-wiroal-';
const FUENTE_MANUAL = 'Manual de Servicio de AA 2025-2027';

/* Nombres que aparecen en la literatura de AA cargada en el proyecto */
const NOMBRES = [
  { n: 'Bill W.', d: 'Cofundador de AA.', f: 'Manual de Servicio de AA 2025-2027' },
  { n: 'Dr. Bob', d: 'Cofundador de AA.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'Anne S.', d: 'Esposa del Dr. Bob.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'Lois W.', d: 'Esposa de Bill W.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'Ebby T.', d: 'Amigo de infancia de Bill que le llevó el mensaje.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'Bill D.', d: 'Con él hubo tres recuperaciones.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'Ernie G.', d: 'El cuarto miembro, a finales de julio de 1935.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'Henrietta Seiberling', d: 'Reunió a Bill W. y al Dr. Bob.', f: 'AA llega a su mayoría de edad' },
  { n: 'Hermana Ignacia', d: 'Hospital Santo Tomás, Akron.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'Clarence S.', d: 'Veterano de Akron/Cleveland.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'Rev. Walter Tunks', d: 'Le dio a Bill la lista de diez nombres en Akron.', f: 'AA llega a su mayoría de edad' },
  { n: 'Norman Sheppard', d: 'Le dijo a Bill que llamara a Henrietta.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'Delphine Weber', d: 'Amiga de Henrietta preocupada por Bob Smith.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'T. Henry', d: 'Del Grupo Oxford; prestó su casa para reuniones.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'Clarace W.', d: 'Del Grupo Oxford; esposa de T. Henry.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'Elgie', d: 'Veterana de Akron.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'John R.', d: 'Veterano de Akron.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'Lloyd T.', d: 'Padrino de Clarence.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'Rollie H.', d: 'El jugador de béisbol.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'Eddie', d: 'La primera “falla”, luego sobrio.', f: 'AA llega a su mayoría de edad' },
  { n: 'Mark Whalon', d: 'Amigo íntimo de Bill en Vermont.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'Bernard Smith', d: 'Custodio no alcohólico, arquitecto de la estructura de la Conferencia.', f: 'Manual de Servicio de AA 2025-2027' },
  { n: 'Jack Alexander', d: 'Periodista que se interesó en AA.', f: 'Manual de Servicio de AA 2025-2027' },
  { n: 'Dr. Tom Scuderi', d: 'Joven médico del Santo Tomás.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'Sue Windows', d: 'Amiga de la familia Smith.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'Smitty', d: 'De la familia Smith, Akron.', f: 'El Dr. Bob y los Buenos Veteranos' },
  { n: 'Bill J.', d: 'Veterano de Akron.', f: 'El Dr. Bob y los Buenos Veteranos' }
];

/* correcta = índice (0-3) de la opción correcta.
   cita = texto literal de la fuente; pag = ubicación exacta. */
const TESTS = {
  entrada: {
    titulo: 'Test de entrada',
    subtitulo: 'Lo que traemos antes de la charla',
    preguntas: [
      { c: 'I', texto: '¿Dónde deben residir siempre la responsabilidad final y la autoridad fundamental de los servicios mundiales de AA?',
        op: ['En la Junta de Servicios Generales', 'En la Oficina de Servicios Generales', 'En la conciencia colectiva de toda nuestra Comunidad', 'En los Delegados de Área'],
        correcta: 2,
        cita: 'La responsabilidad final y la autoridad fundamental de los servicios mundiales de AA deben siempre residir en la conciencia colectiva de toda nuestra Comunidad.',
        pag: 'Los Doce Conceptos (forma corta), pág. PDF 152' },
      { c: 'II', texto: 'Según el Concepto II, la Conferencia de Servicios Generales se ha convertido, en casi todos los aspectos, en…',
        op: ['el gobierno de AA en Colombia', 'la voz activa y la conciencia efectiva de toda nuestra Comunidad en sus asuntos mundiales', 'la autoridad legal sobre la Junta de Custodios', 'la administradora directa de la OSG'],
        correcta: 1,
        cita: 'La Conferencia de Servicios Generales se ha convertido, en casi todos los aspectos, en la voz activa y la conciencia efectiva de toda nuestra Comunidad en sus asuntos mundiales.',
        pag: 'Los Doce Conceptos (forma corta), pág. PDF 152' },
      { c: 'III', texto: '¿Qué derecho tradicional dota el Concepto III a cada elemento de AA para asegurar su dirección eficaz?',
        op: ['Derecho de Apelación', 'Derecho de Participación', 'Derecho de Petición', 'Derecho de Decisión'],
        correcta: 3,
        cita: 'Para asegurar su dirección eficaz, debemos dotar a cada elemento de AA —la Conferencia, la Junta de Servicios Generales, y sus distintas corporaciones de servicio, personal directivo, Comités y ejecutivos— de un “Derecho de Decisión” tradicional.',
        pag: 'Los Doce Conceptos (forma corta), pág. PDF 152' },
      { c: 'IV', texto: 'El “Derecho de Participación” busca que cada clasificación o grupo de servidores mundiales tenga…',
        op: ['una representación con voto, en proporción razonable a la responsabilidad que cada uno tenga que desempeñar', 'el mismo número de votos que los Delegados', 'voz, pero nunca voto', 'derecho de veto sobre la Conferencia'],
        correcta: 0,
        cita: 'Nosotros debemos mantener, a todos los niveles de responsabilidad, un “Derecho de Participación” tradicional, ocupándonos de que a cada clasificación o grupo de nuestros Servidores mundiales les sea permitida una representación con voto, en proporción razonable a la responsabilidad que cada uno tenga que desempeñar.',
        pag: 'Los Doce Conceptos (forma corta), pág. PDF 152' },
      { c: 'V', texto: '¿Qué asegura el “Derecho de Apelación” tradicional del Concepto V?',
        op: ['Que los Custodios puedan anular a la Conferencia', 'Que se escuche la opinión de la minoría y que las peticiones de rectificación de agravios personales sean consideradas cuidadosamente', 'Que los grupos puedan expulsar a un servidor', 'Que la mayoría simple decida todos los asuntos'],
        correcta: 1,
        cita: 'En toda nuestra estructura de Servicio Mundial, un “Derecho de Apelación” tradicional debe prevalecer, asegurándonos así que se escuche la opinión de la minoría, y que las peticiones de rectificación de los agravios personales sean consideradas cuidadosamente.',
        pag: 'Los Doce Conceptos (forma corta), pág. PDF 152' },
      { c: 'VI', texto: 'Según el Concepto VI, ¿quiénes ejercen en primer lugar la principal iniciativa y la responsabilidad activa en la mayoría de los asuntos?',
        op: ['Los Delegados, reunidos en la RAC', 'El personal de la OSG', 'Los Custodios, cuando actúan como la Junta de Servicios Generales', 'Los Comités de Área'],
        correcta: 2,
        cita: 'La Conferencia reconoce también que la principal iniciativa y la responsabilidad activa en la mayoría de estos asuntos, debe ser ejercida en primer lugar por los miembros Custodios de la Conferencia, cuando ellos actúan como la Junta de Servicios Generales de Alcohólicos Anónimos.',
        pag: 'Los Doce Conceptos (forma corta), pág. PDF 152' },
      { c: 'VII', texto: 'Según el Concepto VII, la Carta de la Conferencia…',
        op: ['es un instrumento legal registrado ante el Estado', 'no es un instrumento legal; se apoya en la fuerza de la tradición y en las finanzas de AA para su eficacia', 'tiene más fuerza legal que los Estatutos de la Junta', 'solo rige para los Delegados'],
        correcta: 1,
        cita: 'La Carta de la Conferencia en sí misma no es un instrumento legal; se apoya en la fuerza de la tradición y en las finanzas de AA para su eficacia.',
        pag: 'Los Doce Conceptos (forma corta), pág. PDF 152' },
      { c: 'VIII', texto: '¿Cómo ejercen los Custodios su supervisión sobre los servicios constantemente activos e incorporados separadamente?',
        op: ['Administrándolos directamente día a día', 'Mediante su facultad de elegir a todos los directores de estas entidades', 'Por votación de los grupos', 'Mediante auditorías de los Delegados'],
        correcta: 1,
        cita: 'Tienen una función de supervisión fiduciaria sobre nuestros servicios constantemente activos e incorporados separadamente, ejercida mediante su facultad de elegir a todos los directores de estas entidades.',
        pag: 'Los Doce Conceptos (forma corta), pág. PDF 152' },
      { c: 'IX', texto: 'Según el Concepto IX, la dirección básica del Servicio Mundial que una vez ejercieron los fundadores tiene necesariamente que ser asumida por…',
        op: ['los Custodios', 'los Delegados más antiguos', 'el gerente de la OSG', 'los intergrupos'],
        correcta: 0,
        cita: 'La dirección básica del Servicio Mundial que una vez ejercieron los fundadores de Alcohólicos Anónimos, tiene necesariamente que ser asumida por los Custodios.',
        pag: 'Los Doce Conceptos (forma corta), pág. PDF 152' },
      { c: 'X', texto: 'Completa el Concepto X: “A cada responsabilidad de servicio, le debe corresponder…”',
        op: ['…un servidor suplente”', '…un informe trimestral”', '…una autoridad de servicio equivalente, y el alcance de tal autoridad debe estar siempre bien definido”', '…una votación de la Asamblea”'],
        correcta: 2,
        cita: 'A cada responsabilidad de servicio, le debe corresponder una autoridad de servicio equivalente, y el alcance de tal autoridad debe estar siempre bien definido.',
        pag: 'Los Doce Conceptos (forma corta), pág. PDF 152' },
      { c: 'XI', texto: 'Según el Concepto XI, los Custodios deben siempre contar con…',
        op: ['los mejores Comités permanentes y con directores de las corporaciones de servicio, ejecutivos, personal de oficina y consejeros bien capacitados', 'una mayoría de Custodios no alcohólicos', 'el aval previo de cada Área', 'un fondo de reserva ilimitado'],
        correcta: 0,
        cita: 'Los Custodios deben siempre contar con los mejores Comités permanentes y con directores de las corporaciones de servicio, ejecutivos, personal de oficina y consejeros bien capacitados.',
        pag: 'Los Doce Conceptos (forma corta), pág. PDF 152' },
      { c: 'XII', texto: '¿Cuál de estas es una de las Garantías del Concepto XII?',
        op: ['Que la Conferencia sancione a los grupos que violen las Tradiciones', 'Que las decisiones importantes se tomen por mayoría simple', 'Que la Conferencia nunca realice ninguna acción de gobierno', 'Que la Conferencia acumule el mayor capital posible'],
        correcta: 2,
        cita: 'que ninguna actuación de la Conferencia sea personalmente punitiva, o una incitación a controversia pública, que la Conferencia nunca realice ninguna acción de gobierno',
        pag: 'Los Doce Conceptos (forma corta), Concepto XII, pág. PDF 152' }
    ]
  },
  salida: {
    titulo: 'Test de salida',
    subtitulo: 'Lo que nos llevamos después del curso',
    preguntas: [
      { c: 'I', texto: '¿Dónde y cuándo se hicieron cargo los grupos de la responsabilidad del servicio mundial?',
        op: ['En la primera Conferencia de Colombia, en 1965', 'En la Convención Internacional de St. Louis, en 1955', 'En Akron, en 1935', 'En Nueva York, en 1950'],
        correcta: 1,
        cita: 'Los grupos se hicieron cargo de esta responsabilidad en la Convención Internacional de St. Louis, en 1955.',
        pag: 'Concepto I, pág. PDF 158' },
      { c: 'II', texto: 'En la forma larga del Concepto II, la Conferencia recibe autoridad total para el mantenimiento de los servicios mundiales, excepto en lo concerniente a…',
        op: ['el presupuesto anual de la OSG', 'la elección de Custodios clase A', 'cualquier cambio en las Doce Tradiciones o en el Artículo 12 de la Carta de la Conferencia', 'la literatura aprobada'],
        correcta: 2,
        cita: '—excepto en lo concerniente a cualquier cambio en las Doce Tradiciones o en el Artículo 12 de la Carta de la Conferencia—.',
        pag: 'Los Doce Conceptos (forma larga), Concepto II, pág. PDF 153' },
      { c: 'III', texto: 'Según el Concepto III (citado en las preguntas frecuentes del capítulo del Delegado), los Delegados al actuar en la Conferencia son primordialmente…',
        op: ['mensajeros que votan exactamente lo que ordena su Área', 'representantes de su Región ante los Custodios', 'los Servidores mundiales de AA como un todo; solo en sentido secundario representan a sus Áreas', 'asesores sin voto de la Junta'],
        correcta: 2,
        cita: '…nuestros Delegados al actuar en la Conferencia son primordialmente los Servidores mundiales de AA como un todo y que, solo en sentido secundario, representan a sus Áreas respectivas.',
        pag: 'Capítulo 5, Preguntas frecuentes, pág. 37 (PDF 52)' },
      { c: 'IV', texto: 'Según el título que lleva el Concepto IV en el índice de los Doce Conceptos, ¿qué es la clave de la armonía?',
        op: ['La unanimidad', 'La “participación”', 'La rotación', 'El anonimato'],
        correcta: 1,
        cita: 'La “participación” es la clave de la armonía',
        pag: 'Índice de los Doce Conceptos, pág. PDF 155' },
      { c: 'V', texto: 'Como deferencia a la minoría (Concepto V), salvo que sea absolutamente inevitable, la Conferencia generalmente ha rehusado tomar decisiones importantes basadas en votaciones…',
        op: ['menores de las dos terceras (⅔) partes', 'menores de la mitad más uno', 'menores de tres cuartas partes', 'sin presencia de los Custodios'],
        correcta: 0,
        cita: 'A menos que haya sido absolutamente inevitable, la Conferencia ha rehusado, generalmente, tomar decisiones importantes basadas en votaciones menores de las dos terceras (⅔) partes.',
        pag: 'Capítulo 6, Opinión de la Minoría, pág. 40 (PDF 55)' },
      { c: 'VI', texto: 'En la forma larga del Concepto VI, ¿quién tradicionalmente tiene la decisión final respecto a grandes asuntos de política general y finanzas?',
        op: ['La Junta de Servicios Generales', 'El Custodio de Servicios Generales', 'La Conferencia de Servicios Generales', 'Las Asambleas de Área'],
        correcta: 2,
        cita: 'En nombre de AA como un todo, nuestra Conferencia de Servicios Generales tiene la responsabilidad principal del mantenimiento de nuestros servicios mundiales y tradicionalmente tiene la decisión final respecto a grandes asuntos de política general y finanzas.',
        pag: 'Los Doce Conceptos (forma larga), Concepto VI, pág. PDF 153' },
      { c: 'VII', texto: 'Según el Concepto VII (citado en el capítulo de la RAC), ¿por qué no se incorporó legalmente a la Conferencia?',
        op: ['Porque la ley colombiana lo prohíbe', 'Porque hubiera implicado también la incorporación real de toda nuestra Asociación, idea que la Conferencia misma repudió', 'Porque los Custodios se opusieron', 'Porque costaba demasiado'],
        correcta: 1,
        cita: 'Esto hubiera sido demasiado complicado, ya que hubiera implicado también la incorporación real de toda nuestra Asociación, una idea que la Conferencia misma repudió posteriormente.',
        pag: 'Capítulo 6, Preguntas frecuentes, pág. 42 (PDF 57)' },
      { c: 'VIII', texto: 'Según el título del Concepto VIII, frente a las corporaciones de servicio activas los Custodios funcionan como…',
        op: ['sus administradores directos', 'los guardianes, pero no como los administradores directos', 'sus empleados', 'simples observadores sin autoridad'],
        correcta: 1,
        cita: 'Los Custodios funcionan como los gestores directos de las finanzas y la política generales; también como los guardianes pero no como los administradores directos de las corporaciones de servicio activas',
        pag: 'Índice de los Doce Conceptos, pág. PDF 155' },
      { c: 'IX', texto: 'Del artículo de Bill W. sobre liderazgo (Concepto IX): si un servidor, con exagerada docilidad, se convierte en un mero recadero sin nunca ejercer su propio criterio…',
        op: ['…es un servidor ejemplar', '…no es en realidad un líder', '…cumple la Tradición Dos', '…debe ser rotado de inmediato'],
        correcta: 1,
        cita: 'pero si con exagerada docilidad se convierte en un mero recadero, sin nunca ejercer su propio criterio, pues, no es en realidad un líder.',
        pag: 'Capítulo 5, El liderazgo en AA, pág. 36 (PDF 51)' },
      { c: 'X', texto: 'Según el título del Concepto X, ¿qué se debe evitar cuidadosamente?',
        op: ['Que un miembro sirva en más de un grupo', 'La “gestión bicéfala”', 'La rotación de servidores', 'Que los Comités deleguen tareas'],
        correcta: 1,
        cita: 'A cada responsabilidad de servicio le debe corresponder una autoridad ejecutiva de servicio equivalente: se debe evitar cuidadosamente la “gestión bicéfala”',
        pag: 'Índice de los Doce Conceptos, pág. PDF 155' },
      { c: 'XI', texto: 'Según el título del Concepto XI, este Concepto ofrece…',
        op: ['una descripción de los principales Comités y corporaciones de servicio de la Junta, y el estatus personal de directores, ejecutivos y personal', 'el procedimiento del Tercer Legado', 'las reglas para formar nuevas Áreas', 'la historia de la Fundación Alcohólica'],
        correcta: 0,
        cita: 'Una descripción de los principales Comités y corporaciones de servicio de la Junta de Servicios Generales: Estatus personal de los directores corporativos, ejecutivos y miembros del personal',
        pag: 'Índice de los Doce Conceptos, pág. PDF 155' },
      { c: 'XII', texto: 'Bill W. escribió en la primera edición del Manual, en línea con las Garantías del Concepto XII: “La Conferencia…”',
        op: ['…nos gobierna con amor”', '…nos representa, nunca nos gobierna”', '…administra a los grupos”', '…obedece a los Custodios”'],
        correcta: 1,
        cita: 'La Conferencia nos representa, nunca nos gobierna',
        pag: 'Capítulo 6, La RAC, pág. 38 (PDF 53)' }
    ]
  }
};

/* Reparte las respuestas correctas entre A, B, C y D (3 de cada una por test)
   para que no se pueda adivinar por posición. Intercambia la opción correcta
   con la que ocupa la posición destino; el contenido de cada pregunta no cambia. */
(function equilibrar(){
  const destino = {
    entrada: [2, 1, 3, 0, 1, 2, 3, 1, 0, 2, 3, 0],
    salida:  [1, 3, 2, 0, 0, 2, 1, 3, 1, 3, 0, 2]
  };
  for (const k in destino) TESTS[k].preguntas.forEach((p, i) => {
    const d = destino[k][i];
    if (d === p.correcta) return;
    const tmp = p.op[d]; p.op[d] = p.op[p.correcta]; p.op[p.correcta] = tmp; p.correcta = d;
  });
})();
