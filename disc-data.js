/*
 * Matriz DISC de 28 ítems procedente del PDF entregado por el usuario.
 *
 * Cada grupo mantiene sus cuatro adjetivos y la asignación a una dimensión.
 * Por grupo se registra una elección positiva (+, la que más describe) y una
 * negativa (-, la que menos describe).
 *
 * Nota de fidelidad: en la hoja de respuestas del documento, el ítem 13
 * repite "Considerado" en las columnas S y C. Se asigna "Sagaz" a C porque
 * es el único cuarto adjetivo sin asignar en ese ítem y conserva una opción
 * por dimensión. La nota se conserva también en mappingNotes.
 */
window.DISC_SOURCE = Object.freeze({
  mappingNotes: Object.freeze([
    Object.freeze({
      itemId: 13,
      sourceIssue: 'La hoja de respuestas repite “Considerado” en S y C.',
      implementation: '“Considerado” se mantiene en S y “Sagaz” se asigna a C.'
    })
  ]),
  items: Object.freeze([
    { id: 1, options: [{ label: 'Rápido', dimension: 'D' }, { label: 'Entusiasta', dimension: 'I' }, { label: 'Lógico', dimension: 'C' }, { label: 'Apacible', dimension: 'S' }] },
    { id: 2, options: [{ label: 'Receptivo', dimension: 'I' }, { label: 'Decidido', dimension: 'D' }, { label: 'Bondadoso', dimension: 'S' }, { label: 'Cauteloso', dimension: 'C' }] },
    { id: 3, options: [{ label: 'Tranquilo', dimension: 'S' }, { label: 'Franco', dimension: 'D' }, { label: 'Preciso', dimension: 'C' }, { label: 'Amigable', dimension: 'I' }] },
    { id: 4, options: [{ label: 'Decisivo', dimension: 'D' }, { label: 'Elocuente', dimension: 'I' }, { label: 'Controlado', dimension: 'C' }, { label: 'Tolerante', dimension: 'S' }] },
    { id: 5, options: [{ label: 'Minucioso', dimension: 'C' }, { label: 'Moderado', dimension: 'S' }, { label: 'Atrevido', dimension: 'D' }, { label: 'Comunicativo', dimension: 'I' }] },
    { id: 6, options: [{ label: 'Investigador', dimension: 'C' }, { label: 'Ameno', dimension: 'S' }, { label: 'Ingenioso', dimension: 'I' }, { label: 'Acepta riesgos', dimension: 'D' }] },
    { id: 7, options: [{ label: 'Expresivo', dimension: 'I' }, { label: 'Dominante', dimension: 'D' }, { label: 'Cuidadoso', dimension: 'C' }, { label: 'Sensible', dimension: 'S' }] },
    { id: 8, options: [{ label: 'Introvertido', dimension: 'S' }, { label: 'Extrovertido', dimension: 'I' }, { label: 'Precavido', dimension: 'C' }, { label: 'Impasible', dimension: 'D' }] },
    { id: 9, options: [{ label: 'Valeroso', dimension: 'S' }, { label: 'Insistente', dimension: 'D' }, { label: 'Discreto', dimension: 'C' }, { label: 'Encantador', dimension: 'I' }] },
    { id: 10, options: [{ label: 'Perfeccionista', dimension: 'C' }, { label: 'Anima a los demás', dimension: 'I' }, { label: 'Valeroso', dimension: 'D' }, { label: 'Pacífico', dimension: 'S' }] },
    { id: 11, options: [{ label: 'Osado', dimension: 'D' }, { label: 'Reservado', dimension: 'C' }, { label: 'Atento', dimension: 'S' }, { label: 'Alegre', dimension: 'I' }] },
    { id: 12, options: [{ label: 'Gentil', dimension: 'S' }, { label: 'Estimulante', dimension: 'I' }, { label: 'Independiente', dimension: 'D' }, { label: 'Perceptivo', dimension: 'C' }] },
    { id: 13, options: [{ label: 'Considerado', dimension: 'S' }, { label: 'Sagaz', dimension: 'C' }, { label: 'Contento', dimension: 'I' }, { label: 'Competitivo', dimension: 'D' }] },
    { id: 14, options: [{ label: 'Meticuloso', dimension: 'C' }, { label: 'Alentador', dimension: 'I' }, { label: 'Obediente', dimension: 'S' }, { label: 'Ideas firmes', dimension: 'D' }] },
    { id: 15, options: [{ label: 'Popular', dimension: 'I' }, { label: 'Calmado', dimension: 'S' }, { label: 'Tenaz', dimension: 'D' }, { label: 'Reflexivo', dimension: 'C' }] },
    { id: 16, options: [{ label: 'Audaz', dimension: 'D' }, { label: 'Leal', dimension: 'S' }, { label: 'Promotor', dimension: 'I' }, { label: 'Analítico', dimension: 'C' }] },
    { id: 17, options: [{ label: 'Autosuficiente', dimension: 'D' }, { label: 'Paciente', dimension: 'S' }, { label: 'Certero', dimension: 'C' }, { label: 'Sociable', dimension: 'I' }] },
    { id: 18, options: [{ label: 'Adaptable', dimension: 'S' }, { label: 'Vivaz', dimension: 'D' }, { label: 'Resuelto', dimension: 'I' }, { label: 'Prevenido', dimension: 'C' }] },
    { id: 19, options: [{ label: 'Discerniente', dimension: 'C' }, { label: 'Impetuoso', dimension: 'I' }, { label: 'Agresivo', dimension: 'D' }, { label: 'Amistoso', dimension: 'S' }] },
    { id: 20, options: [{ label: 'Compasivo', dimension: 'S' }, { label: 'De trato fácil', dimension: 'I' }, { label: 'Habla directo', dimension: 'D' }, { label: 'Cauto', dimension: 'C' }] },
    { id: 21, options: [{ label: 'Persistente', dimension: 'D' }, { label: 'Generoso', dimension: 'S' }, { label: 'Evaluador', dimension: 'C' }, { label: 'Animado', dimension: 'I' }] },
    { id: 22, options: [{ label: 'Impulsivo', dimension: 'I' }, { label: 'Enérgico', dimension: 'D' }, { label: 'Tranquilo', dimension: 'C' }, { label: 'Cuida los detalles', dimension: 'S' }] },
    { id: 23, options: [{ label: 'Sistemático', dimension: 'C' }, { label: 'Tolerante', dimension: 'S' }, { label: 'Sociable', dimension: 'I' }, { label: 'Vigoroso', dimension: 'D' }] },
    { id: 24, options: [{ label: 'Cautivador', dimension: 'I' }, { label: 'Exigente', dimension: 'D' }, { label: 'Contento', dimension: 'S' }, { label: 'Apegado a las normas', dimension: 'C' }] },
    { id: 25, options: [{ label: 'Le agrada discutir', dimension: 'D' }, { label: 'Comedido', dimension: 'S' }, { label: 'Metódico', dimension: 'C' }, { label: 'Desenvuelto', dimension: 'I' }] },
    { id: 26, options: [{ label: 'Ecuánime', dimension: 'S' }, { label: 'Jovial', dimension: 'I' }, { label: 'Directo', dimension: 'D' }, { label: 'Preciso', dimension: 'C' }] },
    { id: 27, options: [{ label: 'Cuidadoso', dimension: 'C' }, { label: 'Amable', dimension: 'S' }, { label: 'Inquieto', dimension: 'D' }, { label: 'Elocuente', dimension: 'I' }] },
    { id: 28, options: [{ label: 'Prudente', dimension: 'C' }, { label: 'Pionero', dimension: 'D' }, { label: 'Espontáneo', dimension: 'S' }, { label: 'Colaborador', dimension: 'I' }] }
  ]),
  profiles: Object.freeze({
    D: Object.freeze({
      name: 'Dominante',
      color: '#f4524d',
      label: 'D · Rojo',
      summary: 'Directo, orientado a objetivos y competitivo.',
      description: 'Sueles sentirte cómodo al tomar iniciativa, influir en el entorno y avanzar hacia resultados. En el afán por lograrlo, puedes pasar por alto otras opiniones o mostrar impaciencia.',
      communication: 'Para comunicarte con este estilo, ve al grano y plantea caminos concretos para lograr resultados.',
      development: 'Practica la escucha activa e incorpora ideas, opiniones y sentimientos ajenos para construir consenso.'
    }),
    I: Object.freeze({
      name: 'Influyente',
      color: '#ffc43d',
      label: 'I · Amarillo',
      summary: 'Entusiasta, sociable, optimista y persuasivo.',
      description: 'Te suelen motivar las experiencias, las personas y un ambiente dinámico. Puedes comunicarte con facilidad y contagiar optimismo, aunque a veces la espontaneidad puede desplazar la atención a los detalles.',
      communication: 'Para comunicarte con este estilo, crea una relación participativa, cuida el tono y transforma las conversaciones en acciones.',
      development: 'Antes de actuar por impulso, da espacio a la información y a la escucha.'
    }),
    S: Object.freeze({
      name: 'Sereno',
      color: '#42b989',
      label: 'S · Verde',
      summary: 'Tranquilo, paciente, leal y orientado a la armonía.',
      description: 'Sueles valorar la seguridad, la rutina y las relaciones de confianza. Eres un buen oyente y procuras entornos sin conflicto; evitarlo a toda costa puede dificultar expresar necesidades o adaptarte al cambio.',
      communication: 'Para comunicarte con este estilo, muestra interés genuino, paciencia y amabilidad.',
      development: 'Ensaya decir lo que necesitas, abrirte al cambio y establecer prioridades.'
    }),
    C: Object.freeze({
      name: 'Concienzudo',
      color: '#5f9ed1',
      label: 'C · Azul',
      summary: 'Analítico, preciso, cuidadoso y sistemático.',
      description: 'Sueles valorar la corrección, la lógica y los datos. Puedes resolver problemas con cuidado y profundidad; una atención excesiva al detalle puede frenar el avance o alejarte de la colaboración.',
      communication: 'Para comunicarte con este estilo, prepara el caso con antelación y presenta pros, contras y datos precisos.',
      development: 'Busca equilibrar los hechos con las personas, reducir la autocrítica y conectar con el equipo.'
    })
  })
});
