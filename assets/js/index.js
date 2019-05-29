function toggleVisibility(hiddenId) {
  const div = document.getElementById(hiddenId);
  div.style.display = (div.style.display === "none") ? "block" : "none";
}

let cnv, system;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// A simple Particle class
class Particle {
  constructor(position, r=127, g=127, b=127) {
    this.acceleration = createVector(0, 0.1);
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.position = position.copy();
    this.lifespan = 200;
    this.color = { r, g, b };
  }
  
  run() {
    this.update();
    this.display();
  }
  
  // Method to update position
  update(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }
  
  // Method to display
  display() {
    stroke(200, this.lifespan);
    strokeWeight(2);
    fill(this.color.r, this.color.g, this.color.b, this.lifespan);
    ellipse(this.position.x, this.position.y, 12 * this.lifespan / 255, 12 * this.lifespan / 255);
  }
  
  // Is the particle still useful?
  isDead(){
    return this.lifespan < 0;
  }
}

class ParticleSystem {
  constructor(position) {
    this.origin = position.copy();
    this.particles = [];
  }

  burst(x, y, n, r, g, b) {
    for (let i = 0; i < n; i++) {
      this.particles.push(new Particle(createVector(x, y), r, g, b))
    }
  }
  
  addParticle() {
    this.particles.push(new Particle(this.origin));
  }
  
  run() {
    for (let i = this.particles.length-1; i >= 0; i--) {
      let p = this.particles[i];
      p.run();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  cnv.style('position', 'fixed');
  cnv.style('pointer-events', 'none');
  system = new ParticleSystem(createVector(width / 2, 50));
}

function mouseClicked() {
  const elems = document.elementsFromPoint(mouseX, mouseY);
  console.log(elems);
  if ((elems.some((val) => ['P', 'LI', 'H1', 'H2', 'H3'].includes(val.tagName))) && (elems[0].tagName !== 'A')) {
    elems[0].classList.toggle('color-changed');
    system.burst(mouseX, mouseY, 25, 25, 50, 255);
  }
}

function draw() {
  clear();
  system.run();
}
