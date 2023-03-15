let video;
let mode = 'colorAvg';
let stepSize = 50;
let smallStep = stepSize /10;

function setup() {
  
  
  
  
  createCanvas(640, 640);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  
  let modeButton = createButton('Cambiar Modo');
  modeButton.size(150, 50);
  modeButton.position( modeButton.width/2, height - modeButton.height/2);
  modeButton.mousePressed(changeMode);
  
   modeText = createP('Modo actual: ' + mode);
  modeText.position(width/2 - modeText.width/2.4, modeButton.y + modeButton.height + 10);
  
  let stepSizeButton = createButton('Cambiar tamaño de píxel');
  stepSizeButton.size(150, 50);
  stepSizeButton.position(width - stepSizeButton.width, height - stepSizeButton.height/2);
  stepSizeButton.mousePressed(changeStepSize);
  
  stepSizeText = createP('Tamaño de píxel actual: ' + stepSize);
  stepSizeText.position(width / 2 - stepSizeText.width / 2.4, modeText.height+ stepSizeButton.y + stepSizeButton.height + 10);

  
 
}


function draw() {
  background(0);
  video.loadPixels();
  
  if (mode === 'colorAvg') {
    colorAvgMode();
  } else if (mode === 'spatialCoherence') {
    spatialCoherenceMode();
  }
    
  }
  
function changeMode() {
  if (mode === 'colorAvg') {
    mode = 'spatialCoherence';
  } else if (mode === 'spatialCoherence') {
    mode = 'colorAvg';
  }
   modeText.html('Modo actual: ' + mode);
}

function changeStepSize() {
  if (stepSize === 50) {
    stepSize = 20;
  } else if (stepSize === 20) {
    stepSize = 10;
  } else if (stepSize === 10) {
    stepSize = 50;
  }
  stepSizeText.html('Tamaño de píxel actual: ' + stepSize);
  
}

function colorAvgMode() {
  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {
      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < stepSize; i++) {
        for (let j = 0; j < stepSize; j++) {
          let px = (x + i + (y + j) * width) * 4;
          r += video.pixels[px];
          g += video.pixels[px + 1];
          b += video.pixels[px + 2];
          count++;
        }
      }
      r /= count;
      g /= count;
      b /= count;
      noStroke();
      fill(r, g, b);
      rect(x, y, stepSize, stepSize);
    }
  }
}

function spatialCoherenceMode() {
  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {
      let r = 0, g = 0, b = 0, count = 0;
      for (let i = -smallStep; i < stepSize; i += smallStep) {
        for (let j = -smallStep; j < stepSize; j += smallStep) {
          let px = (x + i + (y + j) * width) * 4;
          r += video.pixels[px];
          g += video.pixels[px + 1];
          b += video.pixels[px + 2];
          count++;
        }
      }
      r /= count;
      g /= count;
      b /= count;
      noStroke();
      fill(r, g, b);
      rect(x, y, stepSize, stepSize);
    }
  }
}

