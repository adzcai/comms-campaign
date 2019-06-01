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
  constructor() {
    this.particles = [];
  }

  burst(x, y, n, r, g, b) {
    for (let i = 0; i < n; i++) {
      this.particles.push(new Particle(createVector(x, y), r, g, b))
    }
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
