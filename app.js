const questions = [
['¿Cuál de estas actividades disfrutas más?',['Escuchar música','Ver películas','Bailar con buena música'],['A','V','K']],
['¿Qué programa de televisión prefieres?',['Reportajes de descubrimientos y lugares','Cómico y de entretenimiento','Noticias del mundo'],['V','K','A']],
['Cuando conversas con otra persona, tú…',['La escuchas atentamente','La observas','Tiendes a tocarla'],['A','V','K']],
['Si pudieras adquirir uno de estos artículos, ¿cuál elegirías?',['Un jacuzzi','Un estéreo','Un televisor'],['K','A','V']],
['¿Qué prefieres hacer un sábado por la tarde?',['Quedarte en casa','Ir a un concierto','Ir al cine'],['K','A','V']],
['¿Qué tipo de examen se te facilita más?',['Examen oral','Examen escrito','Examen de opción múltiple'],['A','V','K']],
['¿Cómo te orientas más fácilmente?',['Mediante el uso de un mapa','Pidiendo indicaciones','A través de la intuición'],['V','A','K']],
['¿En qué prefieres ocupar tu tiempo en un lugar de descanso?',['Pensar','Caminar por los alrededores','Descansar'],['A','V','K']],
['¿Qué te halaga más?',['Que te digan que tienes buen aspecto','Que te digan que tienes un trato muy agradable','Que te digan que tienes una conversación interesante'],['V','K','A']],
['¿Cuál de estos ambientes te atrae más?',['Uno en el que se sienta un clima agradable','Uno en el que se escuchen las olas del mar','Uno con una hermosa vista al océano'],['K','A','V']],
['¿De qué manera se te facilita aprender algo?',['Repitiendo en voz alta','Escribiéndolo varias veces','Relacionándolo con algo divertido'],['A','V','K']],
['¿A qué evento preferirías asistir?',['A una reunión social','A una exposición de arte','A una conferencia'],['K','V','A']],
['¿De qué manera te formas una opinión de otras personas?',['Por la sinceridad en su voz','Por la forma de estrecharte la mano','Por su aspecto'],['A','K','V']],
['¿Cómo te consideras?',['Atlético','Intelectual','Sociable'],['K','V','A']],
['¿Qué tipo de películas te gustan más?',['Clásicas','De acción','De amor'],['V','K','A']],
['¿Cómo prefieres mantenerte en contacto con otra persona?',['Por correo electrónico','Tomando un café juntos','Por teléfono'],['V','K','A']],
['¿Cuál frase se identifica más contigo?',['Me gusta que mi coche se sienta bien al conducirlo','Percibo hasta el más ligero ruido que hace mi coche','Es importante que mi coche esté limpio por fuera y por dentro'],['K','A','V']],
['¿Cómo prefieres pasar el tiempo con tu pareja?',['Conversando','Acariciándose','Mirando algo juntos'],['A','K','V']],
['Si no encuentras las llaves en una bolsa…',['La buscas mirando','Sacudes la bolsa para oír el ruido','Buscas al tacto'],['V','A','K']],
['Cuando tratas de recordar algo, ¿cómo lo haces?',['A través de imágenes','A través de emociones','A través de sonidos'],['V','K','A']],
['Si tuvieras dinero, ¿qué harías?',['Comprar una casa','Viajar y conocer el mundo','Adquirir un estudio de grabación'],['V','K','A']],
['¿Con qué frase te identificas más?',['Reconozco a las personas por su voz','No recuerdo el aspecto de la gente','Recuerdo el aspecto de alguien, pero no su nombre'],['A','K','V']],
['En una isla desierta, ¿qué preferirías llevar?',['Algunos buenos libros','Un radio portátil de alta frecuencia','Golosinas y comida enlatada'],['V','A','K']],
['¿Cuál entretenimiento prefieres?',['Tocar un instrumento musical','Sacar fotografías','Actividades manuales'],['A','V','K']],
['¿Cómo es tu forma de vestir?',['Impecable','Informal','Muy informal'],['V','A','K']],
['¿Qué te gusta más de una fogata nocturna?',['El calor del fuego y los bombones asados','El sonido del fuego quemando la leña','Mirar el fuego y las estrellas'],['K','A','V']],
['¿Cómo se te facilita entender algo?',['Cuando te lo explican verbalmente','Cuando utilizan medios visuales','Cuando se realiza a través de alguna actividad'],['A','V','K']],
['¿Por qué te distingues?',['Por tener una gran intuición','Por ser un buen conversador','Por ser un buen observador'],['K','A','V']],
['¿Qué disfrutas más de un amanecer?',['La emoción de vivir un nuevo día','Las tonalidades del cielo','El canto de las aves'],['K','V','A']],
['Si pudieras elegir, ¿qué preferirías ser?',['Un gran médico','Un gran músico','Un gran pintor'],['K','A','V']],
['Al elegir tu ropa, ¿qué es lo más importante?',['Que sea adecuada','Que luzca bien','Que sea cómoda'],['A','V','K']],
['¿Qué disfrutas más de una habitación?',['Que sea silenciosa','Que sea confortable','Que esté limpia y ordenada'],['A','K','V']],
['¿Qué es más sexy para ti?',['Una iluminación tenue','El perfume','Cierto tipo de música'],['V','K','A']],
['¿A qué espectáculo preferirías asistir?',['A un concierto de música','A un espectáculo de magia','A una muestra gastronómica'],['A','V','K']],
['¿Qué te atrae más de una persona?',['Su trato y forma de ser','Su aspecto físico','Su conversación'],['K','V','A']],
['Cuando vas de compras, ¿dónde pasas más tiempo?',['En una librería','En una perfumería','En una tienda de discos'],['V','K','A']],
['¿Cuál es tu idea de una noche romántica?',['A la luz de las velas','Con música romántica','Bailando tranquilamente'],['V','A','K']],
['¿Qué disfrutas más de viajar?',['Conocer personas y hacer nuevos amigos','Conocer lugares nuevos','Aprender sobre otras costumbres'],['K','V','A']],
['En la ciudad, ¿qué echas más de menos del campo?',['El aire limpio y refrescante','Los paisajes','La tranquilidad'],['K','V','A']],
['Si te ofrecieran estos empleos, ¿cuál elegirías?',['Director de una estación de radio','Director de un club deportivo','Director de una revista'],['A','K','V']]
];
const STORAGE_KEY = 'test-draft:vak:v1';
const DRAFT_VERSION = 1;
let current = -1;
let personName = '';
let lastResult = null;
let isComplete = false;
const answers = Array(questions.length).fill(null);
const content = document.querySelector('#quiz-content'), step = document.querySelector('#step-label'), fill = document.querySelector('#progress-fill'), restart = document.querySelector('#restart'), hero = document.querySelector('#hero'), quizTopline = document.querySelector('.quiz-topline'), progressTrack = document.querySelector('.progress-track'), quizCard = document.querySelector('#quiz-card'), nameInput = document.querySelector('#name'), startForm = document.querySelector('#start-form');
const channelNames = { V: 'Visual', A: 'Auditivo', K: 'Kinestésico' };

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]);
}

function formatPersonName(value) {
  return value.trim().toLocaleLowerCase('es-ES').replace(/(^|[\s'-])(\p{L})/gu, (_, separator, letter) => `${separator}${letter.toLocaleUpperCase('es-ES')}`);
}

function updateStartGlow() {
  const letters = nameInput.value.match(/\p{L}/gu) || [];
  startForm.classList?.toggle('is-ready-to-start', letters.length >= 4);
}

function allAnswersComplete() {
  return answers.every(answer => Number.isInteger(answer) && answer >= 0 && answer < 3);
}

function clearDraft() {
  try { window.localStorage.removeItem(STORAGE_KEY); } catch (_) { /* El test sigue funcionando si el almacenamiento no está disponible. */ }
}

function saveDraft() {
  const status = isComplete ? 'complete' : current === -1 ? 'intro' : 'in_progress';
  const draft = { version: DRAFT_VERSION, questionCount: questions.length, status, personName, current, answers: [...answers], updatedAt: Date.now() };
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft)); } catch (_) { /* El test sigue funcionando si el almacenamiento no está disponible. */ }
}

function loadDraft() {
  let draft;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    draft = JSON.parse(saved);
  } catch (_) {
    return;
  }

  const isValidStatus = draft && ['intro', 'in_progress', 'complete'].includes(draft.status);
  const hasValidName = typeof draft?.personName === 'string' && draft.personName.length <= 120;
  const hasValidAnswers = Array.isArray(draft?.answers) && draft.answers.length === questions.length && draft.answers.every(answer => answer === null || (Number.isInteger(answer) && answer >= 0 && answer < 3));
  const hasValidBase = draft?.version === DRAFT_VERSION && draft.questionCount === questions.length && isValidStatus && hasValidName && hasValidAnswers;
  if (!hasValidBase) { clearDraft(); return; }

  const normalizedName = formatPersonName(draft.personName);
  const isIntro = draft.status === 'intro' && draft.current === -1 && draft.answers.every(answer => answer === null);
  const isInProgress = draft.status === 'in_progress' && normalizedName && Number.isInteger(draft.current) && draft.current >= 0 && draft.current < questions.length;
  const isFinished = draft.status === 'complete' && normalizedName && draft.current === questions.length - 1 && draft.answers.every(answer => answer !== null);
  if (!isIntro && !isInProgress && !isFinished) { clearDraft(); return; }

  personName = normalizedName;
  answers.splice(0, answers.length, ...draft.answers);
  current = draft.current;
  isComplete = isFinished;
}

function beginTest() {
  const name = formatPersonName(nameInput.value);
  if (!name) {
    nameInput.setCustomValidity('Escribe tu nombre para comenzar.');
    nameInput.reportValidity();
    nameInput.focus();
    return;
  }
  nameInput.value = name;
  nameInput.setCustomValidity('');
  personName = name;
  current = 0;
  isComplete = false;
  saveDraft();
  render();
}

nameInput.addEventListener('input', () => {
  nameInput.setCustomValidity('');
  personName = formatPersonName(nameInput.value);
  updateStartGlow();
  if (current === -1 && !isComplete) saveDraft();
});
nameInput.addEventListener('blur', () => {
  nameInput.value = formatPersonName(nameInput.value);
  personName = nameInput.value;
  updateStartGlow();
  if (current === -1 && !isComplete) saveDraft();
});
startForm.addEventListener('submit', event => { event.preventDefault(); beginTest(); });

function render() {
  if (isComplete) { renderResults(); return; }
  if (current === -1) {
    hero.hidden = false;
    quizCard.hidden = true;
    quizTopline.hidden = true;
    progressTrack.hidden = true;
    restart.hidden = true;
    step.textContent = '';
    fill.style.width = '0%';
    nameInput.value = personName;
    updateStartGlow();
    return;
  }

  quizCard.hidden = false;
  quizTopline.hidden = false;
  progressTrack.hidden = false;
  restart.hidden = false;
  hero.hidden = true;
  const [title, options] = questions[current];
  step.textContent = `PREGUNTA ${String(current + 1).padStart(2, '0')} DE ${questions.length}`;
  fill.style.width = `${((current + 1) / questions.length) * 100}%`;
  content.innerHTML = `<h2 class="question">${title}</h2><div class="answers">${options.map((option, index) => `<button class="answer ${answers[current] === index ? 'selected' : ''}" data-index="${index}" type="button"><span class="letter">${'ABC'[index]}</span><span>${option}</span></button>`).join('')}</div><div class="nav"><button class="back" type="button" ${current === 0 ? 'disabled' : ''}>← Anterior</button><span></span><button class="next" type="button" ${answers[current] === null ? 'disabled' : ''}>${current === questions.length - 1 ? 'Ver resultado →' : 'Siguiente →'}</button></div>`;
  document.querySelectorAll('.answer').forEach(button => {
    button.onclick = () => {
      answers[current] = Number(button.dataset.index);
      saveDraft();
      render();
    };
  });
  document.querySelector('.back').onclick = () => {
    if (current === 0) return;
    current -= 1;
    saveDraft();
    render();
  };
  document.querySelector('.next').onclick = () => {
    if (current === questions.length - 1) completeTest();
    else {
      current += 1;
      saveDraft();
      render();
    }
  };
}

function completeTest() {
  if (!allAnswersComplete()) return;
  current = questions.length - 1;
  isComplete = true;
  saveDraft();
  render();
}

function renderResults() {
  if (!allAnswersComplete()) {
    isComplete = false;
    saveDraft();
    render();
    return;
  }
  hero.hidden = true;
  quizCard.hidden = false;
  quizTopline.hidden = true;
  progressTrack.hidden = true;
  const score = { V: 0, A: 0, K: 0 };
  answers.forEach((answer, index) => { score[questions[index][2][answer]] += 1; });
  const winner = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
  const copy = { V: 'Procesas mejor lo que ves: imágenes, esquemas, colores y demostraciones visuales te ayudan a conectar ideas.', A: 'Procesas mejor lo que escuchas: las conversaciones, explicaciones y sonidos te dan las pistas más claras.', K: 'Procesas mejor mediante la experiencia: movimiento, práctica y sensaciones son claves para aprender y decidir.' };
  const pct = key => Math.round(score[key] / questions.length * 100);
  lastResult = { score, winner, pct, copy: copy[winner] };
  restart.hidden = true;
  content.innerHTML = `<h2 class="result-title">${escapeHtml(personName)}</h2><p class="result-copy">Tu forma más natural de percibir la información aparece destacada aquí.</p><section class="result-hero"><div><p class="winner-overline">CANAL PERCEPTUAL PREDOMINANTE</p><p class="winner-name">${channelNames[winner]}</p></div><div class="winner-score"><strong>${pct(winner)}%</strong><span>${score[winner]} RESPUESTAS</span></div></section><section class="bar-chart" aria-label="Gráfica de resultados por canal">${['V', 'A', 'K'].map(key => `<div class="chart-row ${key === winner ? 'is-winner' : ''}"><span class="chart-label">${channelNames[key]}</span><div class="chart-track"><div class="chart-value bar-${key.toLowerCase()}" style="width:${pct(key)}%">${pct(key)}%</div></div><div><div class="chart-total">${score[key]}</div><span class="chart-percent">DE 40</span></div></div>`).join('')}</section><p class="result-message">${copy[winner]} Recuerda: los tres canales forman parte de ti; este resultado solo indica cuál aparece con mayor frecuencia en este cuestionario.</p><button class="download-result" id="download-result" type="button">↓ Descargar mi resultado</button><button class="restart-result" id="restart-result" type="button">↺ Reiniciar test</button>`;
  document.querySelector('#download-result').onclick = downloadResult;
  document.querySelector('#restart-result').onclick = resetTest;
}
function roundedRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();ctx.stroke();}
function downloadResult() {
  if (!lastResult) return;

  const { score, winner, pct, copy } = lastResult;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const W = 1600;
  const H = 2680;
  const margin = 56;
  const ink = '#151515';
  const cream = '#FFFCF7';
  const sand = '#F4E4CF';
  const cyan = '#27B5D7';
  const colors = { V: '#27B5D7', A: '#FB4141', K: '#22A75C' };
  const keys = ['V', 'A', 'K'];

  canvas.width = W;
  canvas.height = H;
  ctx.fillStyle = cream;
  ctx.fillRect(0, 0, W, H);

  const path = (x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
  };
  const card = (x, y, width, height, radius, fill, shadow = 0) => {
    ctx.save();
    if (shadow) {
      ctx.shadowColor = 'rgba(21, 21, 21, .94)';
      ctx.shadowOffsetY = shadow;
      ctx.shadowBlur = 0;
    }
    path(x, y, width, height, radius);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = ink;
    ctx.lineWidth = 3.5;
    ctx.stroke();
    ctx.restore();
  };
  const wrapText = (text, maxWidth) => {
    const lines = [];
    let line = '';
    text.split(/\s+/).forEach(word => {
      const next = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(next).width > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    });
    if (line) lines.push(line);
    return lines;
  };
  const drawLines = (lines, x, baseline, lineHeight) => {
    lines.forEach((line, index) => ctx.fillText(line, x, baseline + index * lineHeight));
  };
  const drawSparkle = (x, y, radius) => {
    ctx.save();
    ctx.fillStyle = sand;
    ctx.strokeStyle = ink;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(x, y - radius);
    ctx.bezierCurveTo(x + radius * .14, y - radius * .27, x + radius * .28, y - radius * .14, x + radius, y);
    ctx.bezierCurveTo(x + radius * .28, y + radius * .14, x + radius * .14, y + radius * .27, x, y + radius);
    ctx.bezierCurveTo(x - radius * .14, y + radius * .27, x - radius * .28, y + radius * .14, x - radius, y);
    ctx.bezierCurveTo(x - radius * .28, y - radius * .14, x - radius * .14, y - radius * .27, x, y - radius);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };
  const drawTrack = (x, y, width, height, value, color) => {
    path(x, y, width, height, height / 2);
    ctx.fillStyle = sand;
    ctx.fill();
    ctx.save();
    path(x, y, width, height, height / 2);
    ctx.clip();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, Math.max(0, Math.min(width, width * value / 100)), height);
    ctx.restore();
    path(x, y, width, height, height / 2);
    ctx.strokeStyle = ink;
    ctx.lineWidth = 2.5;
    ctx.stroke();
  };

  let nameSize = 102;
  let nameLines = [];
  while (nameSize >= 62) {
    ctx.font = `900 ${nameSize}px "Archivo Black", sans-serif`;
    nameLines = wrapText(personName || 'Tu resultado', W - margin * 2);
    if (nameLines.length <= 2) break;
    nameSize -= 2;
  }
  ctx.fillStyle = ink;
  ctx.font = `900 ${nameSize}px "Archivo Black", sans-serif`;
  const nameLineHeight = Math.round(nameSize * 1.18);
  const nameBaseline = 178;
  drawLines(nameLines, margin, nameBaseline, nameLineHeight);

  ctx.fillStyle = ink;
  ctx.font = '600 44px "Space Grotesk", sans-serif';
  const introLines = wrapText('Tu forma más natural de percibir la información aparece destacada aquí.', W - margin * 2 - 70);
  const introBaseline = nameBaseline + (nameLines.length - 1) * nameLineHeight + 102;
  drawLines(introLines, margin, introBaseline, 60);

  const heroY = introBaseline + (introLines.length - 1) * 60 + 150;
  const heroH = 645;
  card(margin, heroY, W - margin * 2, heroH, 54, cyan, 12);
  drawSparkle(1240, heroY + 220, 165);
  ctx.save();
  ctx.globalAlpha = .15;
  ctx.fillStyle = cream;
  ctx.font = '900 390px "Archivo Black", sans-serif';
  ctx.fillText('?', 1300, heroY + 560);
  ctx.restore();
  ctx.fillStyle = ink;
  ctx.font = '500 30px "DM Mono", monospace';
  ctx.fillText('CANAL PERCEPTUAL PREDOMINANTE', margin + 76, heroY + 145);
  let winnerSize = 142;
  const winnerName = channelNames[winner].toLocaleUpperCase('es-ES');
  while (winnerSize > 76) {
    ctx.font = `900 ${winnerSize}px "Archivo Black", sans-serif`;
    if (ctx.measureText(winnerName).width <= W - margin * 2 - 150) break;
    winnerSize -= 2;
  }
  ctx.font = `900 ${winnerSize}px "Archivo Black", sans-serif`;
  ctx.fillStyle = sand;
  ctx.fillText(winnerName, margin + 88, heroY + 370);
  ctx.fillStyle = ink;
  ctx.fillText(winnerName, margin + 74, heroY + 354);
  ctx.fillStyle = ink;
  ctx.font = '600 36px "Space Grotesk", sans-serif';
  ctx.fillText(`${pct(winner)}% de tus respuestas`, margin + 78, heroY + 455);

  const rowsY = heroY + heroH + 75;
  const rowH = 214;
  const rowGap = 44;
  keys.forEach((key, index) => {
    const y = rowsY + index * (rowH + rowGap);
    card(margin, y, W - margin * 2, rowH, 34, '#FFFFFF', index === 2 ? 10 : 0);
    ctx.fillStyle = ink;
    ctx.font = '700 39px "Space Grotesk", sans-serif';
    ctx.fillText(channelNames[key], margin + 42, y + 127);
    const trackX = 420;
    const trackY = y + 73;
    const trackW = 810;
    const trackH = 68;
    drawTrack(trackX, trackY, trackW, trackH, pct(key), colors[key]);
    const fillWidth = trackW * pct(key) / 100;
    ctx.font = '700 29px "Space Grotesk", sans-serif';
    if (fillWidth > 112) {
      ctx.fillStyle = key === 'V' ? ink : '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.fillText(`${pct(key)}%`, trackX + fillWidth / 2, trackY + 45);
    } else {
      ctx.fillStyle = ink;
      ctx.textAlign = 'left';
      ctx.fillText(`${pct(key)}%`, trackX + fillWidth + 18, trackY + 45);
    }
    ctx.textAlign = 'right';
    ctx.fillStyle = ink;
    ctx.font = '900 68px "Archivo Black", sans-serif';
    ctx.fillText(String(score[key]), W - margin - 38, y + 108);
    ctx.font = '500 25px "DM Mono", monospace';
    ctx.fillText(`DE ${questions.length}`, W - margin - 38, y + 151);
    ctx.textAlign = 'left';
  });

  const message = `${copy || ''} Recuerda: los tres canales forman parte de ti; este resultado solo indica cuál aparece con mayor frecuencia en este cuestionario.`.trim();
  ctx.font = '600 43px "Space Grotesk", sans-serif';
  const messageLines = wrapText(message, W - margin * 2 - 92);
  const messageY = rowsY + rowH * 3 + rowGap * 2 + 90;
  const messageH = Math.max(520, 126 + messageLines.length * 61);
  card(margin, messageY, W - margin * 2, messageH, 36, sand);
  ctx.fillStyle = ink;
  ctx.font = '600 43px "Space Grotesk", sans-serif';
  drawLines(messageLines, margin + 46, messageY + 82, 61);

  canvas.toBlob(blob => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `resultado-perceptual-${personName.toLowerCase().replace(/[^a-z0-9]+/gi, '-') || 'test'}.png`;
    link.click();
    URL.revokeObjectURL(link.href);
  }, 'image/png');
}
function resetTest() {
  answers.fill(null);
  current = -1;
  personName = '';
  lastResult = null;
  isComplete = false;
  restart.hidden = true;
  clearDraft();
  render();
}

restart.onclick = resetTest;
loadDraft();
render();
