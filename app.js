'use strict';

const scene = document.querySelector('#scene');
const compare = document.querySelector('#compare');
const splitButtons = document.querySelectorAll('[data-split]');
const designs = document.querySelectorAll('[data-design]');
const styleNote = document.querySelector('#style-note');
const contact = document.querySelector('#design-contact');
const styles = {
  botanico: { label: 'Botánico oliva', note: 'Hojas en verde oliva para darle profundidad al ambiente.' },
  textil: { label: 'Textil lino', note: 'Una trama cálida de lino con un dibujo discreto.' },
  arcos: { label: 'Arcos arcilla', note: 'Arcos sobre un fondo arcilla para una pared protagonista.' },
  relieve: { label: 'Relieve perla', note: 'Un motivo claro con sombras suaves y apariencia de relieve.' }
};

function showSplit(value) {
  compare.value = value;
  scene.style.setProperty('--split', `${value}%`);
  scene.classList.toggle('before-only', value === 0);
  scene.classList.toggle('after-only', value === 100);
  compare.setAttribute('aria-valuetext', `${value}% con empapelado`);
  for (const button of splitButtons) {
    button.setAttribute('aria-pressed', String(Number(button.dataset.split) === value));
  }
}

function showDesign(key) {
  const design = styles[key];
  scene.dataset.style = key;
  styleNote.textContent = design.note;
  const message = `Hola, Badesa. Probé el estilo ${design.label} en la muestra web. ¿Tienen empapelados de este estilo que pueda ver?`;
  contact.href = `https://wa.me/595983347830?text=${encodeURIComponent(message)}`;
  for (const button of designs) {
    button.setAttribute('aria-pressed', String(button.dataset.design === key));
  }
  if (compare.valueAsNumber < 20) showSplit(62);
}

compare.addEventListener('input', () => showSplit(compare.valueAsNumber));
for (const button of splitButtons) {
  button.addEventListener('click', () => showSplit(Number(button.dataset.split)));
}
for (const button of designs) {
  button.addEventListener('click', () => showDesign(button.dataset.design));
}
document.querySelector('#try-textile').addEventListener('click', () => showDesign('textil'));

showDesign('botanico');
showSplit(compare.valueAsNumber);
