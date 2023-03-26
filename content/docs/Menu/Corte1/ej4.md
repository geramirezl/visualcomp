# Ejercicio 4

Develop a terrain visualization application. Check out the 3D terrain generation with Perlin noise coding train tutorial.

## Introducción

Las Bandas de Mach son una ilusion visual donde al colocar dos o mas tonalidades del mismo color con pequeño contraste, el ojo humano lo percibe con un constraste mayor del existente realmente mientras estas se encuentren en contacto.

En esta actividad se busca mostrar como funciona este efecto en un terreno generado, 2 practicas en 1.
## Transfondo o Teoria

En esta seccion solo se explicara la teoria respecto a las Bandas Mach debido que la explicacion del terreno y el funcionamiento del mismo, fue tomado del video tutorial dado en clase, se volvera a mencionar y detallar un poco en el proceso del codigo.

{{< hint info >}}
**Video Tutorial**  
Enlace al tutorial sobre Terreno con Perlin Noise: https://www.youtube.com/watch?v=IKB1hWWedMk
{{< /hint >}}

### Mach Bands
Las Bandas de Mach funcionan por asociacion, asi como el ojo tiende a agrupar los colores similares entre si, o los patrones para visualizar o percipir formas que no se encuentran hay, las bandas al agrupar colores de contrastes similares debido a que estan en contacto, la comparacion de tonalidades las realiza entre el propio grupo, percibiendo con mayor claridad el color mas "claro" del grupo, y mas oscuro aun el mas oscuro del mismo, esto lo podemos visualizar de manera bastante basica con la ilusion de "los 2 rectangulos grises" como se decidio presentar en este ejemplo, aunque sus variantes y ejemplos son muy extensas el concepto es el mencionado anteriormente, tendremos 2 fondos de contrastes altos, con dos rectangulos de un contraste medio entre ambos en cada uno de los fondos, viendolos por separado los rectangulos se perciben con diferentes contrastes entre si, pero como se puede comprobar usando el rectangulo interactivo ambos rectangulos tienen la misma tonalidad.

Para fines practicos se creo un programa que ejemplifica la ilusion.

{{< details title="Ilusion Bandas,Code" open=false >}}
## Codigo utilizado
{{< highlight js >}}
 function setup() {
    createCanvas(400, 400);
    noStroke();
  } 

  function draw() {
  rectMode(CORNER)
  fill(50);
  rect(0,0,width,height/2);
  fill(150);
  rect(0,height/2,width,height/2);
  fill(100);
  rectMode(CENTER);
  rect(width/2,height/4,width/5,height/5);
  rect(width/2,height/4*3,width/5,height/5);
  rect(mouseX,mouseY,width/10,height/10);
  }
{{< /highlight >}}
{{< /details >}}
{{< p5-global-iframe id="bands" width="440" height="440" >}}
  function setup() {
    createCanvas(400, 400);
    noStroke();
  } 

  function draw() {
  rectMode(CORNER)
  fill(50);
  rect(0,0,width,height/2);
  fill(150);
  rect(0,height/2,width,height/2);
  fill(100);
  rectMode(CENTER);
  rect(width/2,height/4,width/5,height/5);
  rect(width/2,height/4*3,width/5,height/5);
  rect(mouseX,mouseY,width/10,height/10);
  }
{{< /p5-global-iframe >}}

## Codigo.

{{< details title="Código Completo" open=false >}}
{{< highlight js >}}
let sliderGroup = [];
let X;
let Y;
let Z;
let centerX;
let centerY;
let centerZ;
let h = 1000;
var cols, fils;
var escala;
var high1,high2;
var yep;
var lenghtt;
var x,y;
function setup() {
  createCanvas(400, 400, WEBGL);
  checkbox = createCheckbox('Stroke', true);
  checkbox.style('color', 'yellow');
  resizeCanvas(windowWidth, windowHeight);
  
  
  lado= windowWidth*1.5;
  fondo = windowHeight*2;
  escala = 30;
  cols = lado/escala;
  fils = fondo/escala;
  x=0;
  y=0;
  colorMode(RGB,distTerrain)
  fill(100);
  
  checkbox.changed(myCheckedEvent);
  checkbox.position(0,0)
}

var avance2= 0.1
function draw() {
  background(0);
  
  translate(-width*(1/2+0.2),-height/2-10,-250)
  
  rotate(PI/4, [1,0,0])
  //noFill();
  
  //directionalLight(255, 255,255, -1, 0, -1);
  //noLights()
  Move();
  high1 = deep(x,y);
  planess(high1);
  fill(high1[0][0]);
  
}


function planess(highh){
  
  for(var y=0; y< cols-1;y++){
    beginShape(TRIANGLE_STRIP);
    for(var x=0; x< fils-1;x++){
      fill(highh[x][y])
      vertex(x*escala,y*escala,highh[x][y]);
      fill(highh[x][y+1])    
      vertex(x*escala,(y+1)*escala,highh[x][y+1]);


      
    }
    endShape();
  }
}

var avance = 0.3;
var distTerrain = 150;

function deep(xIn,yIn){
  higs = [];
  for(var x=0; x< fils;x++){
    higs[x] = [];
    for(var y=0; y< cols;y++){
      higs[x][y]= map(noise(xIn+x*avance,yIn+y*avance), 0,1,0, distTerrain);
    }
  }
  return higs;
}


function Move(){
  W = mouseX-windowWidth/2;
  H = mouseY-windowHeight/2; 
  if(abs(W)<windowWidth/4){
    angle = 0;
  }else{
    if(H>1){
      angle = map(-W,-windowWidth/2,windowWidth/2,-PI/4,PI/4, true);
    }else{
      angle = map(W,-windowWidth/2,windowWidth/2,-PI/4,PI/4, true);
    }
    
  }
  
  
  if(abs(H)<windowWidth/4){
    move = 0.00;
  }else{
    move= map(H,-windowHeight/2,windowHeight/2,-0.2,0.2, true);
  }
  
  
  
  x = x + move*sin(angle);
  y = y - move*cos(angle);
  
}

function myCheckedEvent() {
  if (checkbox.checked()) {
    stroke(0);
  } else {
    noStroke();
  }
}

{{< /highlight >}}
{{< /details >}}

El codigo realizado inspirado en el tutorial ya mencionado contiene unos metodos mayores ademas de los 2 basicos del propio p5: planess, deep y Move.
{{< details title="Metodo planess" open=true >}}
{{< highlight js >}}
function planess(highh){
  
  for(var y=0; y< cols-1;y++){
    beginShape(TRIANGLE_STRIP);
    for(var x=0; x< fils-1;x++){
      fill(highh[x][y])
      vertex(x*escala,y*escala,highh[x][y]);
      fill(highh[x][y+1])    
      vertex(x*escala,(y+1)*escala,highh[x][y+1]);


      
    }
    endShape();
  }
}
{{< /highlight >}}
{{< /details >}}
El Metodo planess recibe la matriz de valores adquiridos usando el Perlin Noise, que se explicara mas a fondo en el metodo deep, y por junto con esta  crea la malla de terreno con sus respectivas alturas en la matrix, al mismo tiempo le da a cada vector su respectiva tonalidad segun su altura, esto para generar el efecto de las bandas Mach que nos permite percibir profundidad en la malla sin necesidad de detallar los bordes o limites de la misma. 
Un pequeño detalle a mencionar es la Relacion entre la altura y el color, debido al colorMode utilizado en el setup, el color esta modificado para que su rango sea el mismo que la maxima altura posible de la matriz, con ello no es necesario mapear los valores adquiridos en sus respectivos colores.

{{< details title="Metodo deep" open=true >}}
{{< highlight js >}}
function deep(xIn,yIn){
  higs = [];
  for(var x=0; x< fils;x++){
    higs[x] = [];
    for(var y=0; y< cols;y++){
      higs[x][y]= map(noise(xIn+x*avance,yIn+y*avance), 0,1,0, distTerrain);
    }
  }
  return higs;
}
{{< /highlight >}}
{{< /details >}}

El metodo deep genera la matriz de alturas dado una posicion inicial en los ejes xy, utilizando la funcion noise, que utiliza el Perlin Noise para darnos una mayor "cercania" entre los puntos que se toman los valores aleatorios, mapeandolo respecto a la variable de distancia de terreno que marca la altura maxima del mismo.

{{< details title="Metodo Move" open=true >}}
{{< highlight js >}}
function Move(){
  W = mouseX-windowWidth/2;
  H = mouseY-windowHeight/2; 
  if(abs(W)<windowWidth/4){
    angle = 0;
  }else{
    if(H>1){
      angle = map(-W,-windowWidth/2,windowWidth/2,-PI/4,PI/4, true);
    }else{
      angle = map(W,-windowWidth/2,windowWidth/2,-PI/4,PI/4, true);
    }
    
  }
  
  
  if(abs(H)<windowWidth/4){
    move = 0.00;
  }else{
    move= map(H,-windowHeight/2,windowHeight/2,-0.2,0.2, true);
  }
  
  
  
  x = x + move*sin(angle);
  y = y - move*cos(angle);
  
}
{{< /highlight >}}
{{< /details >}}
Por ultimo la funcion move mueve los puntos iniciales o de referencia sobre los que se mapea la malla, utilizando el mouse para calcular los movimientos, buscando polalizar la ubicacion del mouse para darle una direccion al movimiento de la malla.

Tambien se implemento un boton, para mostrar como cambia la percepcion cuando la malla tiene y no tiene bordes, la configuracion del boton viene de la biblioteca de referencia de p5.

## Resultado
Esta es el programa resultante del ejercicio.
{{< p5-iframe sketch="/visualcomp/sketches/FlyingFive.js" width="425" height="425" >}}

## Conclusiones

- Aunque las bandas de Mach es un efecto tan comun que practicamente pasa desapercibido, es muy util para simplificar la forma de mostrar o agrupar diversas zonas.

- Debido a la fluides del Perlin Noise, a la hora de visualisar algo random, es muchisimo mas agradable y facil de controlar usar un noise que un random base.

- los controles de movimiento sin restriccion por medio del mouse gastan demasiado trabajo conseguiendo un control que sea equilibrado para mostrar el trabajo y poder interactuar con la pagina tranquilamente a la vez

## Trabajos Futuros

- empezando con lo utilizado en el tutorial, La forma de realizacion de mallas es muy util para cualquier trabajo no solo en terrenos, sino a la hora de poligomizar cualquier figura

- el Perlin Noise permite transcisiones fluidas aun cuando genera cosas aleatorias, asi que es util en cualquier control que llame a lo aleatorio pero deba mostrarse

- Aunque las bandas en si no son muy utilizadas, es bueno entenderlas para poder notar cuando ocurren y poder evitarlas o utilizarlas de manera apropiada.
