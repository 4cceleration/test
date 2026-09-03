const { items, profiles } = window.DISC_SOURCE;
const dimensions = ['D', 'I', 'S', 'C'];
const STORAGE_KEY = 'test-draft:disc:v1';
const DRAFT_VERSION = 1;
let current = -1;
let personName = '';
let lastResult = null;
let isComplete = false;
let isAutoAdvancing = false;
let autoAdvanceTimer = null;
let autoAdvanceToken = 0;
let pendingAutoAdvance = false;
const answers = items.map(() => ({ positive: null, negative: null }));

const content = document.querySelector('#quiz-content');
const step = document.querySelector('#step-label');
const fill = document.querySelector('#progress-fill');
const restart = document.querySelector('#restart');
const hero = document.querySelector('#hero');
const quizTopline = document.querySelector('.quiz-topline');
const progressTrack = document.querySelector('.progress-track');
const quizCard = document.querySelector('#quiz-card');
const nameInput = document.querySelector('#name');
const startForm = document.querySelector('#start-form');

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[character]);
}

function formatNames(keys) {
  const names = keys.map(key => profiles[key].name);
  if (names.length < 2) return names[0];
  if (names.length === 2) return names.join(' y ');
  return `${names.slice(0, -1).join(', ')} y ${names[names.length - 1]}`;
}

function selectedLabel(item, selectedIndex) {
  return item.options[selectedIndex].label;
}

function formatPersonName(value) {
  return value.trim().toLocaleLowerCase('es-ES').replace(/(^|[\s'-])(\p{L})/gu, (_, separator, letter) => `${separator}${letter.toLocaleUpperCase('es-ES')}`);
}

function isValidOption(value) {
  return Number.isInteger(value) && value >= 0 && value < 4;
}

function isCompleteAnswer(answer) {
  return isValidOption(answer.positive) && isValidOption(answer.negative) && answer.positive !== answer.negative;
}

function allAnswersComplete() {
  return answers.every(isCompleteAnswer);
}

function clearDraft() {
  try { window.localStorage.removeItem(STORAGE_KEY); } catch (_) { /* El test sigue funcionando si el almacenamiento no está disponible. */ }
}

function saveDraft() {
  const status = isComplete ? 'complete' : current === -1 ? 'intro' : 'in_progress';
  const draft = {
    version: DRAFT_VERSION,
    questionCount: items.length,
    status,
    personName,
    current,
    answers: answers.map(answer => ({ positive: answer.positive, negative: answer.negative })),
    pendingAutoAdvance,
    updatedAt: Date.now()
  };
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
  const hasValidAnswers = Array.isArray(draft?.answers) && draft.answers.length === items.length && draft.answers.every(answer => answer && (answer.positive === null || isValidOption(answer.positive)) && (answer.negative === null || isValidOption(answer.negative)) && !(answer.positive !== null && answer.negative !== null && answer.positive === answer.negative));
  const hasValidBase = draft?.version === DRAFT_VERSION && draft.questionCount === items.length && isValidStatus && hasValidName && hasValidAnswers && typeof draft.pendingAutoAdvance === 'boolean';
  if (!hasValidBase) { clearDraft(); return; }

  const normalizedName = formatPersonName(draft.personName);
  const isIntro = draft.status === 'intro' && draft.current === -1 && !draft.pendingAutoAdvance && draft.answers.every(answer => answer.positive === null && answer.negative === null);
  const isInProgress = draft.status === 'in_progress' && normalizedName && Number.isInteger(draft.current) && draft.current >= 0 && draft.current < items.length;
  const isFinished = draft.status === 'complete' && normalizedName && draft.current === items.length - 1 && !draft.pendingAutoAdvance && draft.answers.every(isCompleteAnswer);
  if (!isIntro && !isInProgress && !isFinished) { clearDraft(); return; }

  personName = normalizedName;
  answers.forEach((answer, index) => Object.assign(answer, draft.answers[index]));
  current = draft.current;
  isComplete = isFinished;
  pendingAutoAdvance = draft.pendingAutoAdvance;

  if (pendingAutoAdvance) {
    const hasCompletedPath = answers.slice(0, current + 1).every(isCompleteAnswer);
    if (!hasCompletedPath) {
      clearDraft();
      current = -1;
      personName = '';
      answers.forEach(answer => { answer.positive = null; answer.negative = null; });
      pendingAutoAdvance = false;
      return;
    }
    pendingAutoAdvance = false;
    if (current === items.length - 1) isComplete = allAnswersComplete();
    else current += 1;
    saveDraft();
  }
}

function cancelAutoAdvance() {
  clearTimeout(autoAdvanceTimer);
  autoAdvanceTimer = null;
  autoAdvanceToken += 1;
  isAutoAdvancing = false;
  pendingAutoAdvance = false;
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
  pendingAutoAdvance = false;
  saveDraft();
  render();
}

nameInput.addEventListener('input', () => {
  nameInput.setCustomValidity('');
  personName = formatPersonName(nameInput.value);
  if (current === -1 && !isComplete) saveDraft();
});
nameInput.addEventListener('blur', () => {
  nameInput.value = formatPersonName(nameInput.value);
  personName = nameInput.value;
  if (current === -1 && !isComplete) saveDraft();
});

startForm.addEventListener('submit', event => {
  event.preventDefault();
  beginTest();
});

function render() {
  if (isComplete) {
    renderResults();
    return;
  }
  if (current === -1) {
    hero.hidden = false;
    quizCard.hidden = true;
    quizTopline.hidden = true;
    progressTrack.hidden = true;
    restart.hidden = true;
    step.textContent = '';
    fill.style.width = '0%';
    nameInput.value = personName;
    return;
  }

  hero.hidden = true;
  quizCard.hidden = false;
  quizTopline.hidden = false;
  progressTrack.hidden = false;
  restart.hidden = false;
  const item = items[current];
  const answer = answers[current];
  const hasBothChoices = answer.positive !== null && answer.negative !== null;
  const positiveSelection = answer.positive === null ? '' : `<strong>${selectedLabel(item, answer.positive)}</strong>`;
  const negativeSelection = answer.negative === null ? '' : `<strong>${selectedLabel(item, answer.negative)}</strong>`;
  step.textContent = `GRUPO ${String(item.id).padStart(2, '0')} DE ${items.length}`;
  fill.style.width = `${((current + 1) / items.length) * 100}%`;
  const nextControl = isAutoAdvancing ? '<span class="auto-advance">Continuando…</span>' : `<button class="next" type="button" ${hasBothChoices ? '' : 'disabled'}>${current === items.length - 1 ? 'Ver resultado →' : 'Siguiente →'}</button>`;
  content.innerHTML = `<section class="disc-question"><h2 class="question">¿Cuáles se parecen más y menos a ti?</h2><div class="selection-status" aria-live="polite"><span><b>+</b><em>Más</em>${positiveSelection}</span><span><b>−</b><em>Menos</em>${negativeSelection}</span></div><div class="word-options">${item.options.map((option, index) => `<article class="word-option ${answer.positive === index ? 'is-positive' : ''} ${answer.negative === index ? 'is-negative' : ''}"><p>${option.label}</p><div class="word-actions"><button class="marker-action marker-positive" data-kind="positive" data-index="${index}" type="button" aria-pressed="${answer.positive === index}" ${isAutoAdvancing ? 'disabled' : ''}><span>+</span> Más</button><button class="marker-action marker-negative" data-kind="negative" data-index="${index}" type="button" aria-pressed="${answer.negative === index}" ${isAutoAdvancing ? 'disabled' : ''}><span>−</span> Menos</button></div></article>`).join('')}</div><div class="nav"><button class="back" type="button" ${current === 0 || isAutoAdvancing ? 'disabled' : ''}>← Anterior</button><span></span>${nextControl}</div></section>`;

  document.querySelectorAll('.marker-action').forEach(button => {
    button.onclick = () => {
      if (isAutoAdvancing) return;
      const kind = button.dataset.kind;
      const optionIndex = Number(button.dataset.index);
      const otherKind = kind === 'positive' ? 'negative' : 'positive';
      if (answers[current][otherKind] === optionIndex) answers[current][otherKind] = null;
      answers[current][kind] = optionIndex;
      const questionIndex = current;
      const hasBothChoices = answers[current].positive !== null && answers[current].negative !== null;
      if (!hasBothChoices) {
        pendingAutoAdvance = false;
        saveDraft();
        render();
        return;
      }
      isAutoAdvancing = true;
      pendingAutoAdvance = true;
      saveDraft();
      render();
      clearTimeout(autoAdvanceTimer);
      const token = ++autoAdvanceToken;
      autoAdvanceTimer = setTimeout(() => {
        if (token !== autoAdvanceToken || current !== questionIndex || !pendingAutoAdvance) return;
        isAutoAdvancing = false;
        pendingAutoAdvance = false;
        if (current === items.length - 1) completeTest();
        else {
          current += 1;
          saveDraft();
          render();
        }
      }, 350);
    };
  });
  document.querySelector('.back').onclick = () => {
    if (current === 0 || isAutoAdvancing) return;
    cancelAutoAdvance();
    current -= 1;
    saveDraft();
    render();
  };
  const nextButton = document.querySelector('.next');
  if (nextButton) nextButton.onclick = () => {
    if (current === items.length - 1) completeTest();
    else {
      current += 1;
      saveDraft();
      render();
    }
  };
}

function completeTest() {
  if (!allAnswersComplete()) return;
  cancelAutoAdvance();
  current = items.length - 1;
  isComplete = true;
  saveDraft();
  render();
}

function createScore() {
  return Object.fromEntries(dimensions.map(key => [key, { positive: 0, negative: 0, net: 0 }]));
}

function topDimensions(score, property) {
  const highest = Math.max(...dimensions.map(key => score[key][property]));
  return dimensions.filter(key => score[key][property] === highest);
}

function renderResults() {
  if (!allAnswersComplete()) {
    isComplete = false;
    pendingAutoAdvance = false;
    saveDraft();
    render();
    return;
  }
  hero.hidden = true;
  quizCard.hidden = false;
  quizTopline.hidden = true;
  progressTrack.hidden = true;
  const score = createScore();
  answers.forEach((answer, itemIndex) => {
    const item = items[itemIndex];
    score[item.options[answer.positive].dimension].positive += 1;
    score[item.options[answer.negative].dimension].negative += 1;
  });
  dimensions.forEach(key => {
    score[key].net = score[key].positive - score[key].negative;
  });

  const positiveWinners = topDimensions(score, 'positive');
  const negativeWinners = topDimensions(score, 'negative');
  const primary = positiveWinners[0];
  const profile = profiles[primary];
  const maxPositiveText = formatNames(positiveWinners);
  const maxNegativeText = formatNames(negativeWinners);
  const isPositiveTie = positiveWinners.length > 1;
  const resultColor = isPositiveTie ? '#f1eadb' : profile.color;
  const resultOverline = isPositiveTie ? 'EMPATE EN MÁXIMOS POSITIVOS' : profile.label;
  const resultName = isPositiveTie ? 'Empate' : profile.name;
  const summary = isPositiveTie ? `Tus máximos positivos se reparten entre ${maxPositiveText}. No hay un único estilo predominante en esta respuesta; revisa las guías de los estilos destacados.` : profile.description;
  lastResult = { score, positiveWinners, negativeWinners, primary, maxPositiveText, maxNegativeText, summary };

  restart.hidden = true;
  content.innerHTML = `<section class="disc-result"><h2 class="result-title">${escapeHtml(personName)}</h2><section class="result-overview"><article class="overview-card overview-positive"><p>MÁXIMO POSITIVO</p><strong>${maxPositiveText}</strong><span>${isPositiveTie ? 'Tus estilos predominantes' : 'Tu estilo predominante'}</span></article><article class="overview-card overview-negative"><p>MÁXIMO NEGATIVO</p><strong>${maxNegativeText}</strong><span>El estilo que menos elegiste</span></article></section><section class="result-hero" style="--winner:${resultColor}"><div><p class="winner-overline">${resultOverline}</p><p class="winner-name">${resultName}</p></div><div class="winner-score"><strong>+${score[primary].positive}</strong><span>MÁXIMO POSITIVO</span></div></section><p class="profile-summary">${summary}</p><section class="score-table" aria-label="Resultados DISC por dimensión"><div class="score-heading"><span>DIMENSIÓN</span><span>+</span><span>−</span><span>TOTAL</span></div>${dimensions.map(key => `<div class="score-row ${positiveWinners.includes(key) ? 'is-primary' : ''}"><span class="score-name"><b style="background:${profiles[key].color}">${key}</b>${profiles[key].name}</span><span>+${score[key].positive}</span><span>−${score[key].negative}</span><strong>${score[key].net > 0 ? '+' : ''}${score[key].net}</strong></div>`).join('')}</section><section class="profile-guide"><h3>Cómo interpretar tus estilos</h3><p>La dimensión con más “+” refleja tu personalidad predominante. La que acumula más “−” es la que menos elegiste en esta respuesta.</p>${dimensions.map(key => `<details class="profile-detail" ${positiveWinners.includes(key) ? 'open' : ''}><summary><b style="background:${profiles[key].color}">${key}</b><span><strong>${profiles[key].name}</strong><small>${profiles[key].summary}</small></span><i>+</i></summary><div><p>${profiles[key].description}</p><p><strong>Para comunicarte:</strong> ${profiles[key].communication}</p><p><strong>Para desarrollar:</strong> ${profiles[key].development}</p></div></details>`).join('')}</section><p class="result-message">Todos los estilos DISC están presentes en diferentes grados. Este resultado es orientativo y describe las tendencias que seleccionaste hoy.</p><button class="download-result" id="download-result" type="button">↓ Descargar mi resultado</button><button class="restart-result" id="restart-result" type="button">↺ Reiniciar test</button></section>`;
  document.querySelector('#download-result').onclick = downloadResult;
  document.querySelector('#restart-result').onclick = resetTest;
}

function roundedRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.fill();
  context.stroke();
}

function setFittedFont(context, text, maxWidth, startSize, minimumSize, weight = '900') {
  for (let size = startSize; size >= minimumSize; size -= 2) {
    context.font = `${weight} ${size}px "Arial Black", "Arial", sans-serif`;
    if (context.measureText(text).width <= maxWidth) return size;
  }
  context.font = `${weight} ${minimumSize}px "Arial Black", "Arial", sans-serif`;
  return minimumSize;
}

function wrappedLines(context, text, maxWidth) {
  const lines = [];
  let line = '';
  text.split(/\s+/).forEach(word => {
    const candidate = line ? `${line} ${word}` : word;
    if (line && context.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function drawWrappedText(context, lines, x, y, lineHeight) {
  lines.forEach((line, index) => context.fillText(line, x, y + index * lineHeight));
}

function drawSparkle(context, x, y, size, color) {
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(x, y - size);
  context.bezierCurveTo(x + size * .1, y - size * .18, x + size * .18, y - size * .1, x + size, y);
  context.bezierCurveTo(x + size * .18, y + size * .1, x + size * .1, y + size * .18, x, y + size);
  context.bezierCurveTo(x - size * .1, y + size * .18, x - size * .18, y + size * .1, x - size, y);
  context.bezierCurveTo(x - size * .18, y - size * .1, x - size * .1, y - size * .18, x, y - size);
  context.fill();
}

function downloadResult() {
  if (!lastResult) return;
  const { score, primary, maxPositiveText, maxNegativeText, positiveWinners, summary } = lastResult;
  const profile = profiles[primary];
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const width = 1400;
  const height = 2160;
  canvas.width = width;
  canvas.height = height;

  const ink = '#171717';
  const paper = '#fffdf8';
  const cream = '#f2eadb';
  const margin = 56;
  const cardWidth = width - margin * 2;
  const winnerColor = positiveWinners.length > 1 ? '#c4bfff' : profile.color;
  context.fillStyle = cream;
  context.fillRect(0, 0, width, height);

  context.fillStyle = ink;
  const nameSize = setFittedFont(context, personName, cardWidth, 78, 42);
  context.fillText(personName, margin, 112);
  context.font = '600 38px Arial, sans-serif';
  const introLines = wrappedLines(context, 'Tu estilo predominante aparece destacado aquí.', cardWidth - 30);
  drawWrappedText(context, introLines, margin, 180, 52);

  const heroY = 180 + introLines.length * 52 + 44;
  const heroHeight = 410;
  context.fillStyle = winnerColor;
  context.strokeStyle = ink;
  context.lineWidth = 4;
  roundedRect(context, margin, heroY, cardWidth, heroHeight, 48);
  drawSparkle(context, width - 245, heroY + 128, 145, '#f2eadbcc');
  context.fillStyle = ink;
  context.font = '500 26px monospace';
  context.fillText(positiveWinners.length > 1 ? 'ESTILOS DESTACADOS' : 'ESTILO PREDOMINANTE', margin + 58, heroY + 92);
  const resultName = positiveWinners.length > 1 ? maxPositiveText : profile.name;
  setFittedFont(context, resultName.toUpperCase(), cardWidth - 120, 112, 58);
  context.fillText(resultName.toUpperCase(), margin + 58, heroY + 222);
  context.fillStyle = ink;
  context.strokeStyle = ink;
  context.lineWidth = 4;
  roundedRect(context, width - 287, heroY + 250, 175, 110, 55);
  context.fillStyle = paper;
  context.font = '900 52px "Arial Black", Arial, sans-serif';
  context.textAlign = 'center';
  context.fillText(`+${score[primary].positive}`, width - 199, heroY + 296);
  context.font = '500 15px monospace';
  context.fillText('MÁS ELEGIDO', width - 199, heroY + 328);
  context.textAlign = 'left';

  const overviewY = heroY + heroHeight + 48;
  const overviewGap = 24;
  const overviewWidth = (cardWidth - overviewGap) / 2;
  [[margin, 'MÁXIMO POSITIVO', maxPositiveText, 'Tu estilo predominante', '#dff6ea'], [margin + overviewWidth + overviewGap, 'MÁXIMO NEGATIVO', maxNegativeText, 'El estilo que menos elegiste', '#eeebff']].forEach(([x, label, value, detail, color]) => {
    context.fillStyle = color;
    context.strokeStyle = ink;
    context.lineWidth = 4;
    roundedRect(context, x, overviewY, overviewWidth, 175, 30);
    context.fillStyle = ink;
    context.font = '500 19px monospace';
    context.fillText(label, x + 30, overviewY + 45);
    setFittedFont(context, value.toUpperCase(), overviewWidth - 60, 45, 27);
    context.fillText(value.toUpperCase(), x + 30, overviewY + 103);
    context.font = '600 22px Arial, sans-serif';
    context.fillText(detail, x + 30, overviewY + 143);
  });

  const scoreTitleY = overviewY + 240;
  context.fillStyle = ink;
  context.font = '500 25px monospace';
  context.fillText('TU MAPA DISC', margin, scoreTitleY);
  const rowStart = scoreTitleY + 35;
  const rowHeight = 118;
  const rowGap = 18;
  dimensions.forEach((key, index) => {
    const rowY = rowStart + index * (rowHeight + rowGap);
    context.fillStyle = paper;
    context.strokeStyle = ink;
    context.lineWidth = 3;
    roundedRect(context, margin, rowY, cardWidth, rowHeight, 28);
    context.fillStyle = profiles[key].color;
    context.beginPath();
    context.arc(margin + 58, rowY + rowHeight / 2, 31, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.fillStyle = ink;
    context.textAlign = 'center';
    context.font = '900 30px "Arial Black", Arial, sans-serif';
    context.fillText(key, margin + 58, rowY + 71);
    context.textAlign = 'left';
    context.font = '800 28px Arial, sans-serif';
    context.fillText(profiles[key].name, margin + 108, rowY + 52);
    context.font = '600 20px Arial, sans-serif';
    context.fillText(`${score[key].positive} más · ${score[key].negative} menos`, margin + 108, rowY + 83);
    const barX = margin + 480;
    const barWidth = 390;
    context.fillStyle = cream;
    context.strokeStyle = ink;
    context.lineWidth = 2;
    roundedRect(context, barX, rowY + 43, barWidth, 31, 16);
    context.fillStyle = profiles[key].color;
    context.strokeStyle = profiles[key].color;
    context.lineWidth = 1;
    roundedRect(context, barX + 2, rowY + 45, Math.max(16, (barWidth - 4) * score[key].positive / items.length), 27, 14);
    context.fillStyle = ink;
    context.textAlign = 'right';
    context.font = '900 42px "Arial Black", Arial, sans-serif';
    context.fillText(`${score[key].net > 0 ? '+' : ''}${score[key].net}`, width - margin - 38, rowY + 70);
    context.font = '500 15px monospace';
    context.fillText('TOTAL', width - margin - 38, rowY + 94);
    context.textAlign = 'left';
  });

  const messageY = rowStart + dimensions.length * (rowHeight + rowGap) + 34;
  context.font = '700 32px Arial, sans-serif';
  const summaryLines = wrappedLines(context, summary, cardWidth - 92);
  const messageHeight = Math.max(220, 74 + summaryLines.length * 45);
  context.fillStyle = '#f3e2c9';
  context.strokeStyle = ink;
  context.lineWidth = 3;
  roundedRect(context, margin, messageY, cardWidth, messageHeight, 32);
  context.fillStyle = ink;
  drawWrappedText(context, summaryLines, margin + 46, messageY + 65, 45);
  context.font = '500 18px monospace';
  context.fillText('RESULTADO ORIENTATIVO · TEST DISC', margin, height - 58);
  canvas.toBlob(blob => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `resultado-disc-${personName.toLowerCase().replace(/[^a-z0-9]+/gi, '-') || 'test'}.png`;
    link.click();
    URL.revokeObjectURL(link.href);
  }, 'image/png');
}

function resetTest() {
  cancelAutoAdvance();
  answers.forEach(answer => {
    answer.positive = null;
    answer.negative = null;
  });
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
