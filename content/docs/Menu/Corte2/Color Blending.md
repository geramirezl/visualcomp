# Color Blending

## Introducción

El color es una percepción visual que resulta de la interacción de la luz con nuestros ojos y el cerebro. La luz blanca está compuesta por diferentes longitudes de onda que se descomponen en los colores del espectro visible. Estos colores se perciben cuando la luz es reflejada o absorbida por diferentes objetos.

Color blending, o mezcla de colores, se refiere a la combinación de dos o más colores para crear un nuevo color. Esta mezcla puede ocurrir de diferentes formas, dependiendo del sistema de color utilizado.

## Sistema Aditivo
Utilizado en pantallas de computadoras y televisores, se mezclan luces de diferentes colores primarios para crear otros colores. Los colores primarios en este sistema son el rojo, el verde y el azul (RGB, por sus siglas en inglés). Al combinar estas tres luces en diferentes intensidades, se pueden obtener una amplia gama de colores.

## Sistema sustractivo
Utilizado en la impresión y pintura, se mezclan pigmentos o tintas de colores primarios para crear otros colores. Los colores primarios en este sistema son el cian, el magenta y el amarillo (CMY, por sus siglas en inglés). Al mezclar estos pigmentos o tintas en diferentes proporciones, se obtienen colores secundarios, como el rojo, el verde y el azul.

Además de estos sistemas de color primarios, también existe el modelo de color HSL (matiz, saturación y luminosidad) y el modelo de color HSV (tono, saturación y valor), que también permiten mezclar colores y representar una amplia gama de tonalidades. Estos modelos son especialmente útiles en el diseño gráfico y la edición de imágenes.


### Basic Blend:

{{< details title="Color Blending" open=false >}}
{{< highlight js >}}

let colorShader;

function preload(){
  colorShader = readShader('shader.frag', { varyings: Tree.color4 });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  shader(colorShader);
  colorPicker1 = createColorPicker('#ed225d');
  colorPicker1.position(0, height + 5);
  colorPicker2 = createColorPicker('#ed225d');
  colorPicker2.position(100, height + 5);
}



function draw() {
  print(colorPicker1.color()._array)
  colorShader.setUniform('uMaterial1', colorPicker1.color()._array);
  colorShader.setUniform('uMaterial2', colorPicker2.color()._array);
  rect(0,0,100,100)
}

{{< /highlight >}}
{{< /details >}}

Ilusion de movimientos.

{{< p5-iframe sketch="/visualcomp/sketches/ColorBlending.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="540" height="540" >}}
