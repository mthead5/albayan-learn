let drawing = [];
let currentPath = [];
let binaryPixels = [];
let loadedImagePixels = [];
let num = 0;
let img;
let green = false;
let den = 1;
let w = 300;
let h = 300;
function preload() {
  img = loadImage("./baa.png");
}

function setup() {
  canvas = createCanvas(w, h);
  canvas.parent("canvas_container");
  canvas.mousePressed(startPath);
  canvas.mouseReleased(endPath);
  canvas.touchStarted(startPath);
  canvas.touchEnded(endPath);
  frameRate(25);

  let button = select("#clear-button");

  button.touchStarted(clearCanvas);
  button.mousePressed(clearCanvas);

  img.resize(w * den, h * den);

  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    loadedImagePixels.push(img.pixels[i] < 50);
  }
}

function clearCanvas() {
  drawing = [];
  green = false;
  document.querySelector(".good").classList.remove("show");
}
function startPath(e) {
  if (e && typeof e.preventDefault === "function") e.preventDefault();
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {}

function draw() {
  pixelDensity(1);
  background(220);

  if (mouseIsPressed) {
    let point = {
      x: mouseX,
      y: mouseY,
    };
    currentPath.push(point);
  }
  if (green) {
    stroke(60, 200, 60);
  } else {
    stroke(0);
  }
  strokeWeight(w / 8);
  noFill();

  for (let i = 0; i < drawing.length; i++) {
    let path = drawing[i];
    beginShape();
    for (let j = 0; j < path.length; j++) {
      vertex(path[j].x, path[j].y);
    }
    endShape();
  }

  loadPixels();
  let d = pixelDensity();
  let jump = 4;
  num = 0;
  for (let i = 0; i < pixels.length; i += jump) {
    let currentPixel = pixels[i] < 50;
    if (currentPixel === loadedImagePixels[i / jump]) {
      // pixels[i] = 50;
      num++;
    }
  }

  if ((num / (w * h)) * 100 > 92) {
    green = true;
    document.querySelector(".good").classList.add("show");
  }
  updatePixels();
}
