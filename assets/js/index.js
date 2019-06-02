/// <reference path="../../global.d.ts" />

function toggleVisibility(hiddenId) {
  const div = document.getElementById(hiddenId);
  div.style.display = (div.style.display === "none") ? "block" : "none";
}

let cnv, system, congrats, sparkleLeft, sparkleRight;

function windowResized() {
  // We change back to the default window settings first, so that
  // if the window's height shrunk, it doesn't take the previous
  // canvas's height into account
  resizeCanvas(windowWidth, windowHeight); 
  resizeCanvas(windowWidth, $(document).height()); 
}

function setup() {
  cnv = createCanvas(windowWidth, $(document).height());
  cnv.position(0, 0);
  cnv.style('pointer-events', 'none');
  system = new ParticleSystem();
}

function mouseClicked() {
  const elems = document.elementsFromPoint(mouseX - window.scrollX, mouseY - window.scrollY);
  if ((elems.some((val) => ['P', 'LI', 'H1', 'H2', 'H3'].includes(val.tagName))) && (elems[0].tagName !== 'A')) {
    elems[0].classList.toggle('color-changed');
    system.burst(mouseX, mouseY, 25, 25, 50, 255);
  }
}

function draw() {
  clear();
  if (congrats) {
    system.burst(sparkleLeft.x, sparkleLeft.y, 3, random(255), random(255), random(255));
    system.burst(sparkleRight.x, sparkleRight.y, 3, random(255), random(255), random(255));
  }
  system.run();
}

function toggleDarkMode() {
  localStorage.setItem('mode', (localStorage.getItem('mode') || 'light') === 'dark' ? 'light' : 'dark');
  document.querySelector('body').classList.toggle('dark')
}

document.addEventListener('DOMContentLoaded', (event) => {
  if ((localStorage.getItem('mode') || 'light') === 'dark')
    document.querySelector('body').classList.add('dark')
  else
    document.querySelector('body').classList.remove('dark');
});

window.onload = (event) => {  
  congrats = document.getElementById("congrats");
  if (congrats) {
    const parentRect = document.querySelector('.home').getBoundingClientRect();
    const rect = congrats.getBoundingClientRect();
    const y = rect.y + rect.height / 2 + window.scrollY;
    sparkleLeft = { x: rect.x - (rect.x - parentRect.x) / 2 + window.scrollX, y };
    sparkleRight = { x: rect.x + rect.width + (rect.x - parentRect.x) / 2 + window.scrollX, y };
  }
}
