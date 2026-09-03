const discQuestions = [
  ['Cuando surge un reto nuevo, normalmente…', ['tomo el control y busco una solución rápida', 'comparto la idea y animo a otros a sumarse', 'prefiero entender cómo afectará al grupo', 'reúno los datos antes de decidir'], ['D', 'I', 'S', 'C']],
  ['En una reunión de trabajo disfruto más…', ['llegar a una decisión concreta', 'intercambiar ideas con energía', 'escuchar y crear acuerdos', 'revisar los detalles importantes'], ['D', 'I', 'S', 'C']],
  ['Frente a un plazo ajustado, suelo…', ['priorizar y acelerar el ritmo', 'motivar al equipo para conseguirlo', 'mantener la calma y ayudar donde haga falta', 'organizar un plan preciso'], ['D', 'I', 'S', 'C']],
  ['Las personas suelen decir que soy…', ['decidido/a', 'cercano/a y expresivo/a', 'confiable y paciente', 'cuidadoso/a y riguroso/a'], ['D', 'I', 'S', 'C']],
  ['Al iniciar un proyecto, me importa primero…', ['el resultado que vamos a lograr', 'que el equipo se entusiasme', 'que todos sepan cómo aportar', 'definir el proceso correcto'], ['D', 'I', 'S', 'C']],
  ['Cuando no estoy de acuerdo, tiendo a…', ['decirlo de forma clara', 'conversarlo para encontrar puntos comunes', 'esperar el momento adecuado', 'presentar razones y evidencia'], ['D', 'I', 'S', 'C']],
  ['Me siento más cómodo/a en un entorno…', ['ágil, con metas ambiciosas', 'social, creativo y dinámico', 'predecible y colaborativo', 'ordenado, con estándares claros'], ['D', 'I', 'S', 'C']],
  ['Para recargar energía, prefiero…', ['cumplir un objetivo desafiante', 'ver gente y vivir algo nuevo', 'compartir un plan tranquilo', 'dedicar tiempo a algo que domino'], ['D', 'I', 'S', 'C']],
  ['Cuando explico una idea, normalmente…', ['voy directo al punto', 'cuento una historia que conecte', 'me adapto al ritmo de la otra persona', 'ordeno los argumentos paso a paso'], ['D', 'I', 'S', 'C']],
  ['Ante un cambio inesperado, mi primera reacción es…', ['pensar en la oportunidad que abre', 'buscar quién se anima a probarlo', 'preguntarme cómo cuidar la continuidad', 'evaluar riesgos y condiciones'], ['D', 'I', 'S', 'C']],
  ['Me motiva especialmente…', ['tener autonomía y lograr impacto', 'influir e inspirar a otras personas', 'ser útil y construir confianza', 'hacer las cosas bien hechas'], ['D', 'I', 'S', 'C']],
  ['En equipo suelo aportar…', ['dirección y decisión', 'optimismo y conexión', 'apoyo y constancia', 'análisis y precisión'], ['D', 'I', 'S', 'C']],
  ['Cuando recibo instrucciones, prefiero que sean…', ['breves y orientadas al resultado', 'conversadas y abiertas a ideas', 'claras y con tiempo para asimilarlas', 'completas y específicas'], ['D', 'I', 'S', 'C']],
  ['Mi forma de tomar decisiones es más bien…', ['rápida y pragmática', 'intuitiva y conversada', 'considerada y consensuada', 'racional y comparativa'], ['D', 'I', 'S', 'C']],
  ['Lo que más me frustra es…', ['la falta de avance', 'un ambiente frío o sin interacción', 'la tensión o los cambios bruscos', 'los errores evitables'], ['D', 'I', 'S', 'C']],
  ['Si aparece un conflicto, procuro…', ['resolverlo cuanto antes', 'bajar la tensión hablando', 'escuchar a cada parte con paciencia', 'aclarar hechos y expectativas'], ['D', 'I', 'S', 'C']],
  ['Me describiría como alguien que…', ['acepta retos con facilidad', 'conecta fácilmente con la gente', 'mantiene sus compromisos', 'cuestiona y mejora los procesos'], ['D', 'I', 'S', 'C']],
  ['Para aprender algo nuevo, me sirve más…', ['ponerlo en práctica de inmediato', 'conversarlo y hacerlo con otras personas', 'contar con una guía de apoyo', 'estudiar el método a fondo'], ['D', 'I', 'S', 'C']],
  ['En un día ideal, termino sintiéndome bien si…', ['superé una meta importante', 'tuve conversaciones inspiradoras', 'ayudé a que todo fluyera', 'entregué un trabajo impecable'], ['D', 'I', 'S', 'C']],
  ['Al pensar en el futuro, me atrae más…', ['conquistar una meta grande', 'abrir nuevas posibilidades', 'construir relaciones duraderas', 'tener un plan sólido'], ['D', 'I', 'S', 'C']]
];

const discProfiles = {
  D: { name: 'Dominancia', color: '#f4524d', trait: 'IMPULSO PARA AVANZAR', text: 'Te energizan los retos, la autonomía y la posibilidad de lograr resultados. Sueles ir directo a lo importante y tomar decisiones con determinación.', strength: 'Convertir intención en acción.' },
  I: { name: 'Influencia', color: '#ffc43d', trait: 'CONEXIÓN QUE MOVILIZA', text: 'Te energizan las ideas, las conversaciones y la conexión con otras personas. Tu entusiasmo puede abrir puertas y hacer que los equipos se muevan.', strength: 'Inspirar y generar cercanía.' },
  S: { name: 'Estabilidad', color: '#42b989', trait: 'CALMA QUE SOSTIENE', text: 'Te energizan la confianza, la colaboración y los vínculos consistentes. Aportas paciencia y una mirada atenta al bienestar del grupo.', strength: 'Crear entornos confiables.' },
  C: { name: 'Conciencia', color: '#c4bfff', trait: 'CRITERIO QUE MEJORA', text: 'Te energizan la precisión, la lógica y los estándares altos. Observas matices y buscas que las decisiones tengan una base sólida.', strength: 'Elevar la calidad de lo que se hace.' }
};

let current = -1;
let personName = '';
const answers = Array(discQuestions.length).fill(null);
const content = document.querySelector('#quiz-content');
const step = document.querySelector('#step-label');
const fill = document.querySelector('#progress-fill');
const restart = document.querySelector('#restart');
const hero = document.querySelector('#hero');

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]);
}

function render() {
  if (current === -1) {
    hero.hidden = false;
    step.textContent = 'ANTES DE EMPEZAR';
    fill.style.width = '0%';
    content.innerHTML = `<section class="welcome"><h2>Primero, cuéntame<br />¿cómo te llamas?</h2><input class="name-input" id="name" autocomplete="name" placeholder="Escribe tu nombre" value="${escapeHtml(personName)}" /><div class="nav"><span></span><button class="next" type="button">Comenzar →</button></div></section>`;
    const input = document.querySelector('#name');
    const begin = () => {
      personName = input.value.trim() || 'explorador/a';
      current = 0;
      render();
    };
    document.querySelector('.next').onclick = begin;
    input.onkeydown = event => {
      if (event.key === 'Enter') begin();
    };
    input.focus();
    return;
  }

  hero.hidden = true;
  const [title, options] = discQuestions[current];
  step.textContent = `PREGUNTA ${String(current + 1).padStart(2, '0')} DE ${discQuestions.length}`;
  fill.style.width = `${((current + 1) / discQuestions.length) * 100}%`;
  content.innerHTML = `<p class="question-kicker">ELIGE LA FRASE MÁS PARECIDA A TI</p><h2 class="question">${title}</h2><div class="answers">${options.map((option, index) => `<button class="answer ${answers[current] === index ? 'selected' : ''}" data-index="${index}" type="button"><span class="letter">${'ABCD'[index]}</span><span>${option}</span></button>`).join('')}</div><div class="nav"><button class="back" type="button">← Anterior</button><span></span><button class="next" type="button" ${answers[current] === null ? 'disabled' : ''}>${current === discQuestions.length - 1 ? 'Ver resultado →' : 'Siguiente →'}</button></div>`;
  document.querySelectorAll('.answer').forEach(button => {
    button.onclick = () => {
      answers[current] = Number(button.dataset.index);
      render();
    };
  });
  document.querySelector('.back').onclick = () => {
    current -= 1;
    render();
  };
  document.querySelector('.next').onclick = () => {
    if (current === discQuestions.length - 1) results();
    else {
      current += 1;
      render();
    }
  };
}

function results() {
  const score = { D: 0, I: 0, S: 0, C: 0 };
  answers.forEach((answer, index) => {
    score[discQuestions[index][2][answer]] += 1;
  });
  const ranking = Object.entries(score).sort((a, b) => b[1] - a[1]);
  const highScore = ranking[0][1];
  const winners = ranking.filter(([, value]) => value === highScore).map(([key]) => key);
  const winner = winners[0];
  const profile = discProfiles[winner];
  const percentage = key => Math.round((score[key] / discQuestions.length) * 100);
  const tiedNames = winners.map(key => discProfiles[key].name).join(' y ');
  const tieCopy = winners.length > 1 ? `Tu resultado muestra un empate entre ${tiedNames}. Te mostramos ${profile.name} primero; ambos estilos aparecen igual de marcados en tus respuestas.` : profile.text;

  step.textContent = 'RESULTADO FINAL';
  fill.style.width = '100%';
  restart.hidden = false;
  content.innerHTML = `<h2 class="result-title">¡Listo, ${escapeHtml(personName)}!</h2><p class="result-copy">Tu estilo de comportamiento más destacado aparece aquí.</p><section class="result-hero" style="--winner:${profile.color}"><div><p class="winner-overline">${profile.trait}</p><p class="winner-name">${profile.name}</p></div><div class="winner-score"><strong>${percentage(winner)}%</strong><span>${score[winner]} RESPUESTAS</span></div></section><section class="bar-chart" aria-label="Distribución de estilos DISC">${['D', 'I', 'S', 'C'].map(key => `<div class="chart-row ${key === winner ? 'is-winner' : ''}"><span class="chart-label"><b class="${key.toLowerCase()}">${key}</b>${discProfiles[key].name}</span><div class="chart-track"><div class="chart-value" style="width:${percentage(key)}%;background:${discProfiles[key].color}"></div></div><span class="chart-total">${percentage(key)}%</span></div>`).join('')}</section><p class="result-message">${tieCopy} <strong>Tu fortaleza natural:</strong> ${profile.strength} Recuerda: los cuatro estilos forman parte de ti; este resultado solo refleja las tendencias que más elegiste hoy.</p>`;
}

restart.onclick = () => {
  answers.fill(null);
  current = -1;
  personName = '';
  restart.hidden = true;
  render();
};

render();
