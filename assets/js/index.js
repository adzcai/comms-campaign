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
  if ((elems.some((val) => ['P', 'LI', 'H1', 'H2', 'H3'].includes(val.tagName))) && (elems[0].tagName !== 'A')) {
    elems[0].classList.toggle('color-changed');
    system.burst(mouseX, mouseY, 25, 25, 50, 255);
  }
}

function draw() {
  clear();
  system.run();
}

function sortTable(n, byNumber) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("exam-schedule");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc"; 
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */

      if (byNumber) {
        if (dir === "asc" && (Number(x.innerHTML) > Number(y.innerHTML))) {
          shouldSwitch = true;
          break;
        } else if (dir === "desc" && (Number(x.innerHTML) < Number(y.innerHTML))) {
          shouldSwitch = true;
          break;
        }
      } else if (dir === "asc" && (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase())) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      } else if (dir === "desc" && (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++; 
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount === 0 && dir === "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function searchTable() {
  // Declare variables 
  let input = document.getElementById("search-exams");
  let filter = input.value.toUpperCase();
  let table = document.getElementById("exam-schedule");
  let rows = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (let i = 0; i < rows.length; i++) {
    let tds = rows[i].getElementsByTagName("td");
    for (let td of tds) {
      let txtValue = td.textContent || td.innerText;
      rows[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    } 
  }
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
