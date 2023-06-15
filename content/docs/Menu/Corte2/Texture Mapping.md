# Color Blending

## Introducción

El color es una percepción visual que resulta de la interacción de la luz con nuestros ojos y el cerebro. La luz blanca está compuesta por diferentes longitudes de onda que se descomponen en los colores del espectro visible. Estos colores se perciben cuando la luz es reflejada o absorbida por diferentes objetos.

Color blending, o mezcla de colores, se refiere a la combinación de dos o más colores para crear un nuevo color. Esta mezcla puede ocurrir de diferentes formas, dependiendo del sistema de color utilizado.

## Sistema Aditivo
Utilizado en pantallas de computadoras y televisores, se mezclan luces de diferentes colores primarios para crear otros colores. Los colores primarios en este sistema son el rojo, el verde y el azul (RGB, por sus siglas en inglés). Al combinar estas tres luces en diferentes intensidades, se pueden obtener una amplia gama de colores.

## Sistema sustractivo
Utilizado en la impresión y pintura, se mezclan pigmentos o tintas de colores primarios para crear otros colores. Los colores primarios en este sistema son el cian, el magenta y el amarillo (CMY, por sus siglas en inglés). Al mezclar estos pigmentos o tintas en diferentes proporciones, se obtienen colores secundarios, como el rojo, el verde y el azul.

Además de estos sistemas de color primarios, también existe el modelo de color HSL (matiz, saturación y luminosidad) y el modelo de color HSV (tono, saturación y valor), que también permiten mezclar colores y representar una amplia gama de tonalidades. Estos modelos son especialmente útiles en el diseño gráfico y la edición de imágenes.


### Basic Blend

{{< details title="Color Blending js" open=false >}}
{{< highlight js >}}

let colorShader;

function preload(){
  colorShader = readShader('ColorBlending.frag');
}

function setup() {
  createCanvas(100, 100, WEBGL);
  shader(colorShader);
  colorPicker1 = createColorPicker('#FF0000');
  colorPicker1.position(0, height + 10);
  colorPicker2 = createColorPicker('#0007FF');
  colorPicker2.position(50, height + 10);
}

function draw() {
  colorShader.setUniform('uMaterial1', colorPicker1.color()._array);
  colorShader.setUniform('uMaterial2', colorPicker2.color()._array);
  rect(20, 20, 60, 60)
}

{{< /highlight >}}
{{< /details >}}

{{< details title="Color Blending frag" open=false >}}
{{< highlight js >}}

precision mediump float;

// uniforms are emitted from the sketch
// https://p5js.org/reference/#/p5.Shader/setUniform
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  gl_FragColor = uMaterial1 * uMaterial2;
}

{{< /highlight >}}
{{< /details >}}


{{< p5-iframe sketch="/visualcomp/sketches/WavingFlag.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js" lib2="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="600" height="600" >}}


## Bibliography

- Barney Codes https://www.youtube.com/watch?v=r5YkU5Xu4_E
- @patriciogv - https://thebookofshaders.com/15/
