# Procedural

## Introducción

La texturización procedural es una técnica utilizada en gráficos por computadora y diseño de juegos para crear texturas de manera algorítmica en lugar de utilizar imágenes o mapas de texturas predefinidos. En lugar de pintar o dibujar una textura manualmente, se utilizan algoritmos y procedimientos matemáticos para generar y definir las características de una textura.

Se crean algoritmos que definen las propiedades y características de una textura, como el color, el patrón, la rugosidad, el relieve, entre otros. Estos algoritmos pueden utilizar parámetros controlables, como la escala, la dirección de la luz, la densidad, etc., para generar diferentes variaciones de una textura.

Permite la generación de texturas de alta resolución sin necesidad de almacenar grandes cantidades de datos de imagen. Además, las texturas procedurales son escalables, lo que significa que se pueden ajustar fácilmente a diferentes tamaños y resoluciones sin perder calidad, pueden ser modificadas en tiempo real lo que las hace especialmente útiles en entornos de juegos y aplicaciones interactivas.

Algunos ejemplos de uso de la texturización procedural incluyen la creación de paisajes generados por computadora, la generación de patrones para superficies detalladas, como rocas o madera y la simulación de materiales realistas, como metal o piel.

{{< details title="Procedural js" open=false >}}
{{< highlight js >}}

let pg;
let truchetShader;
let frames=0;
let frames2=0.5;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader('Procedural.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  // noStroke();
  // pg.noStroke();
  pg.textureMode(NORMAL);
  // use truchetShader to render onto pg
  pg.shader(truchetShader);
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#macros
  pg.emitResolution(truchetShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', 5);
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-4, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
}

function draw() {
  background(33);
  
  orbitControl();
  rotateZ(frames * 0.0005);
  rotateX(frames * 0.0005);
  rotateY(frames * 0.0005);

  truchetShader.setUniform('u_zoom', int(map(frames2, 0, width, 1, 30)));
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  frames++;
  frames2 = frames2 + 0.5;
  
  box(150,150);
}

function keyPressed() {
  if (key) {
    frames2=0.5
  }
}

{{< /highlight >}}
{{< /details >}}

{{< details title="Procedural frag" open=false >}}
{{< highlight js >}}

// Author @patriciogv ( patriciogonzalezvivo.com )

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_zoom;

vec2 brickTile(vec2 _st, float _zoom) {

    _st *= u_zoom;

    // Here is where the offset is happening
    _st.x += step(1., mod(_st.y,2.0)) * 0.5;

    return fract(_st);
}

float box(vec2 _st, vec2 _size){

    _size = vec2(0.5)-_size*0.5;
    vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);
    uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
    return uv.x*uv.y;
}

void main(void){

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Modern metric brick of 215mm x 102.5mm x 65mm
    // http://www.jaharrison.me.uk/Brickwork/Sizes.html
    st /= vec2(2.15,0.65)/1.5;

    // Apply the brick tiling
    st = brickTile(st,5.0);

    color = vec3(box(st,vec2(0.9)));

    gl_FragColor = vec4(color,1.0);
}


{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/visualcomp/sketches/Procedural.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js" lib2="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="440" height="440" >}}
