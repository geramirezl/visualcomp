# Texture Mapping

## Introducción

Es una técnica fundamental en gráficos por computadora que permite agregar detalles visuales realistas.

Cuando creamos objetos en entornos virtuales, como videojuegos o películas animadas, a menudo queremos que estos objetos se vean más detallados y con superficies más realistas. Es aquí donde el mapeo de texturas juega un papel crucial.

El mapeo de texturas consiste en proyectar una imagen bidimensional, llamada textura, sobre la superficie de un objeto tridimensional. Esta textura actúa como una especie de "pegatina" que se adhiere al objeto y le proporciona información visual detallada. Puede contener colores, patrones, texturas naturales, como la piel de un animal o la textura rugosa de una pared, e incluso puede simular efectos de iluminación.

La aplicación de la textura sobre el objeto se realiza mediante un proceso de asignación de coordenadas. Cada punto en la superficie del objeto tiene coordenadas en el espacio tridimensional (x, y, z), y estas coordenadas se corresponden con las coordenadas de la textura en el plano bidimensional (u, v). Al asociar cada punto de la superficie con un punto correspondiente en la textura, podemos transferir la información visual de la textura al objeto y lograr que se vea más realista y detallado.


### Mapeo de textura para simular movimiento

{{< details title="Waving Boat js" open=false >}}
{{< highlight js >}}

let screen;
let glitchShader;
let img;

function preload() {
  glitchShader = loadShader('/visualcomp/sketches/WavingFlag.vert', '/visualcomp/sketches/WavingFlag.frag');
  img = loadImage('./boat.jpg');
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


{{< /highlight >}}
{{< /details >}}

{{< details title="Waving Boat frag" open=false >}}
{{< highlight js >}}

// taken from https://thebookofshaders.com/15/
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
uniform sampler2D texture;
uniform float time;
uniform vec2 resolution;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {  
  vec2 st = vTexCoord;
  st.y = 1.0 - st.y;
  // vec2 st = gl_FragCoord.xy/resolution.xy;
  
  float scale = 2.0;
  float radius = 0.5;
  float angle = noise( st + time * 0.1 ) * 3.14159265359;
  
  st *= scale;
  st += radius * vec2(cos(angle),sin(angle));
  
  vec4 color = texture2D(texture, st);
  gl_FragColor = color;
}

{{< /highlight >}}
{{< /details >}}

If it's not loading, you can check the sketch [here](https://editor.p5js.org/jgsierraa/sketches/qZJ1qYrlX)

{{< p5-iframe sketch="/visualcomp/sketches/WavingFlag.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js" lib2="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="600" height="600" >}}


## Bibliography

- Barney Codes https://www.youtube.com/watch?v=r5YkU5Xu4_E
- @patriciogv - https://thebookofshaders.com/15/
