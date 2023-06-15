let screen;
let glitchShader;
let img;

function preload() {
  glitchShader = readShader('/visualcomp/sketches/WavingFlag.vert', '/visualcomp/sketches/WavingFlag.frag'); // maybe readShader tho
  img = loadImage('boat.jpg');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  
  
  screen = createGraphics(width, height);
  
  
  screen.background(50);
  screen.stroke(255);
  screen.strokeWeight(5);
  
  img.resize(width, height);
  shader(glitchShader);
}


function draw() {  
  drawScreen();
}


function drawScreen() {
  glitchShader.setUniform('resolution', [600,600]);
  glitchShader.setUniform('texture', img);
  glitchShader.setUniform('time', getNoiseValue());
  
  rect(-width/2, -height/2, width, height);
}

function getNoiseValue() { 
  return millis()/100;
}
