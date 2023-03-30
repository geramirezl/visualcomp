# Ejercicio 3
Implement a pixelator video application and perform a benchmark of the results (color avg vs spatial coherence). How would you assess the visual quality of the results?

## Spatial Coherence


En este ejemplo, implementamos una aplicación de pixelator para video, usando la captura de la videocamara.
Para pixelar se usaron las dos diferentes formas o técnicas que se planteaban (promedio de color y coherencia espacial).
### Color AVG
Cada color pixelado se calcula con el promedio de los colores en el grupo de la imagen original.
### Coherencia espacial
Cada color pixelado se toma de un color único arbitrario encontrado en cada grupo de la imagen original.
Se buscan agrupar pixeles que tengan que ver entre ellos (cercanía y características visuales similares).

### Ejercicio
Como explicamos antes, se planea usar la videocamara y el pixelator en los dos modos. 
Primero toca dar permiso a la aplicación para utilizar la videocamara.
Luego se utiliza el modo de promedio de colores por defecto y con los botones respectivos se puede cambiar el tamaño de los cuadros que se van tomando y el modo (promedio de colores o de coherencia espacial).
Con respecto al código, se define el modo promedio de colores tomando el promedio de cada valor rgb tomado en el cuadro definido por el step.
El otro modo de coherencia espacial, se toma de una forma similar, pero se tiene en cuenta un pequeño paso o valor de los otros cuadros, es decir, el promedio no es solo del cuadro tomado sino teniendo en cuenta los cuadros adyacentes.


{{< details title="Código" open=false >}}
{{< highlight js >}}
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


{{< /highlight >}}
{{< /details >}}
{{< p5-iframe sketch="/visualcomp/sketches/pixelator.js" width="700" height="700" >}}

### Diferencia
La principal diferencia entre ambas técnicas es que la técnica de coherencia espacial genera bloques de píxeles que son visualmente más coherentes que los bloques generados por la técnica de promedio de color, lo que puede resultar en una imagen más nítida y definida. Sin embargo, la técnica de coherencia espacial puede ser más compleja y computacionalmente mayor que la técnica de promedio de color, por lo que puede requerir más tiempo de procesamiento.

### Trabajos Futuros 

Para tomar un ejemplo más exacto y diferenciar los modos de promedio y coherencia espacial, para el modo de coherencia espacial se puede utilizar el algoritmo de k-means. Se pueden agrupar pixeles que tienen valores rgb similares y en teoría llegar a una coherencia más acertada con respecto a los colores de los pixeles.