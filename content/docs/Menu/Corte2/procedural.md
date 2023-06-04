# Procedural

## Introducción

La texturización procedural es una técnica utilizada en gráficos por computadora y diseño de juegos para crear texturas de manera algorítmica en lugar de utilizar imágenes o mapas de texturas predefinidos. En lugar de pintar o dibujar una textura manualmente, se utilizan algoritmos y procedimientos matemáticos para generar y definir las características de una textura.

Se crean algoritmos que definen las propiedades y características de una textura, como el color, el patrón, la rugosidad, el relieve, entre otros. Estos algoritmos pueden utilizar parámetros controlables, como la escala, la dirección de la luz, la densidad, etc., para generar diferentes variaciones de una textura.

Permite la generación de texturas de alta resolución sin necesidad de almacenar grandes cantidades de datos de imagen. Además, las texturas procedurales son escalables, lo que significa que se pueden ajustar fácilmente a diferentes tamaños y resoluciones sin perder calidad, pueden ser modificadas en tiempo real lo que las hace especialmente útiles en entornos de juegos y aplicaciones interactivas.

Algunos ejemplos de uso de la texturización procedural incluyen la creación de paisajes generados por computadora, la generación de patrones para superficies detalladas, como rocas o madera y la simulación de materiales realistas, como metal o piel.


{{< details title="Código Completo, Ilusion 1" open=false >}}
{{< highlight js >}}

var speedr, bar,piece;
var StepFetP,StepFetD;
var PidNeckP;
var cMOde;
var grids;
function setup() {
  createCanvas(500, 500);
  speedr=0.5;
  bar = 7;
  piece=10;
  StepFetP=0;
  StepFetD=1;
  cMOde=0;
  grids=true;
  grid= new Button(' GRID ',0,0);
  grid.colore=color(200,100,100);
  grid.mousePressed(grisdy);
  PidNeckP = [['l',0,150],['l',350,470],['p',-piece,250],['p',150,350],['p',300,150]]
  
  colors = new Button(' COLOR ',100,0);
  
  colors.colore=color(100,100,200);
  
  colors.mousePressed(cModer);
  
  
  
  noStroke();
}

function draw() {
  background(255);
  if(grids){
    backi();
  }
  SteppingFeet();
  PigeonNeck();
  grid.draw();
  colors.draw();
}

function mousePressed(){
  colors.Pressed();
  grid.Pressed();
}

function mouseReleased(){
  colors.released();
  grid.released();
}

function backi(){
  fill(0)
  for(let i = 0;i<width;i=i+2*bar){
    rect(i,0,bar,height);
  }
}

function SteppingFeet(){
  switch(cMOde){
    case 0:
      fill(0,0,255);
      break;
    case 1:
      fill(76,0,0);
      break;
    case 2:
      fill(0);
      break;
  }
  rect(StepFetP,25,piece*bar,25);
  
  switch(cMOde){
    case 0:
      fill(255,255,0);
      break;
    case 1:
      fill(0,229,0) ;
      break;
    case 2:
      fill(255);
      break;
  }
  rect(StepFetP,75,piece*bar,25);
  
  StepFetP=StepFetP+StepFetD*speedr
  if(StepFetD>0&&StepFetP+piece>width){
    StepFetD=-1;
  }else if(StepFetD<0&&StepFetP<0){
    StepFetD=1;
  }
}

function PigeonNeck(){
  switch(cMOde){
    case 0:
      fill(0,0,255);
      break;
    case 1:
      fill(255,51,0) ;
      break;
    case 2:
      fill(170);
      break;
  }
  for(let i=0;i<PidNeckP.length;i++){
    if('l'==PidNeckP[i][0]){
      rect(PidNeckP[i][1],PidNeckP[i][2],bar*20,25);
    }else{
      Pidgeon(PidNeckP[i][1],PidNeckP[i][2]);
    }
    PidNeckP[i][1]=PidNeckP[i][1]+speedr
    if(PidNeckP[i][1]>width){
      PidNeckP[i][1]=0
    }
  }
  
}

function Pidgeon(x,y){  
  translate(x,y);
  rect(9*bar,0,6*bar,6*bar)
  rect(15*bar,4*bar,2*bar,2*bar)
  rect(8*bar,6*bar,6*bar,10*bar)
  rect(6*bar,8*bar,6*bar,8*bar)
  rect(4*bar,10*bar,6*bar,6*bar)
  rect(2*bar,12*bar,6*bar,4*bar)
  rect(0,14*bar,6*bar,2*bar)
  rect(8*bar,14*bar,2*bar,6*bar)
  rect(8*bar,20*bar,4*bar,1*bar)
  
  
  translate(-x,-y);
  
  
}

class Button{
    constructor(label,x,y){
	this.x=x
	this.y=y
    this.w=10*label.length;
    this.h=20;
	this.label=label
    this.colore = color(200, 200, 200);
    this.isPressed= false
    this.alpha= function() {}
    }
	draw(){
      noStroke()
      var bart = this.colore
      if(this.isPressed){
        bart = lerpColor(bart, color(0,0,0), 0.5);
      }
      fill(bart)
      rect(this.x,this.y,this.w,this.h)
      fill(0)
      textWidth(1)
      text(this.label,this.x+this.w/10,this.y+this.h/3*2)
    }
  
    mousePressed(alpha = null){
      this.alpha=alpha
    }
  
    Pressed(){
      if(mouseX>this.x && mouseX<this.x+this.w &&mouseY>this.y && mouseY<this.y+this.h){
        this.isPressed=true;
        this.alpha()  
      }
      
    }
  
    released(){
      this.isPressed=false;
    }
    color(colos){
      this.colore= colos
    }
}

function grisdy(){
  grids=!grids;
}

function cModer(){
  cMOde++;
  if(cMOde>2){
    cMOde=0;
  }
}

{{< /highlight >}}
{{< /details >}}

La ilusion se basa en la semejanza de contrastes entre las figuras y alguno de los colores del fondo de la malla, permitiendo dar la ilusion de pasos con la ilusion de arriba, y la percepcion de alargue o movimiento en las figuras de abajo, esto por los principios de figura fondo, semejanza y continuidad, lo que nos hace percibir que las figuras se detienen en el avance cuando el fondo tiene un contraste similar.

Por parte del codigo solo se dibujaron las figuras y se les dio movimiento, ademas de dibujar la malla en el fondo, el cambio de color se tomo de la pagina con la ilusion para mostrar diversos opciones con el mismo efecto.

### La segunda implementacion:

{{< details title="Código Completo, Ilusion 2" open=false >}}
{{< highlight js >}}

let table,car,backgro;
let refy,refA;
let backy;
let backx;
let mode,visu;
function preload() {
  table = loadImage('tables.png');
  car = loadImage('car1.png');
  backgro = loadImage('car2.png');
  
}
function setup() {
  createCanvas(630,403)
  refy=0;
  refA=0;
  backy=0;
  backx=0;
  fill(200)
  mode=true;
  vise=0;
  EXAMPLES = new Button(' EXAMPLE ',0,0);
  EXAMPLES.mousePressed(moder)
  moders = new Button(' PARTS ',95,0);
  moders.mousePressed(visual)
  
}

function draw(){
  background(255);
  if(mode){
    if(vise<2){
      image(table, 0, 0, width, height);
    }
    if(vise%2==0){
      tabler();
    }
  }else{
    if(vise==2){
      vise=0;
    }
    if(vise==0){
      image(car, 0, 0, width, height);
    }
    if(vise==1){
      image(backgro, 0, 0, width, height);
    }
    
  }
  EXAMPLES.draw()
  moders.draw()
}

function tabler(){
  fill(200,200,100)
  translate(100,470+refy);
  rotate(refA);
  beginShape();
  vertex(-54,-205);
  vertex(72,-199);
  vertex(132,-463);
  vertex(10,-460);  
  endShape(CLOSE);
  rotate(-refA);
  translate(-100,-470-refy);
}

function mousePressed(){
  if(mode){
    backy=mouseY;
    backx=mouseX;
  }
  EXAMPLES.Pressed()
  moders.Pressed()
}

function mouseReleased(){
  EXAMPLES.released()
  moders.released()
}

function mouseDragged(){
  if(mode&&vise%2==0){
    refy=refy-backy+mouseY;
    backy=mouseY;
    refA=refA-(backx-mouseX)*PI/width*2
    backx=mouseX;
  }
}

class Button{
    constructor(label,x,y){
	this.x=x
	this.y=y
    this.w=10*label.length;
    this.h=20;
	this.label=label
    this.colore = color(200, 200, 200);
    this.isPressed= false
    this.alpha= function() {}
    }
	draw(){
      noStroke()
      var bart = this.colore
      if(this.isPressed){
        bart = lerpColor(bart, color(0,0,0), 0.5);
      }
      fill(bart)
      rect(this.x,this.y,this.w,this.h)
      fill(0)
      textWidth(1)
      text(this.label,this.x+this.w/10,this.y+this.h/3*2)
    }
  
    mousePressed(alpha = null){
      this.alpha=alpha
    }
  
    Pressed(){
      if(mouseX>this.x && mouseX<this.x+this.w &&mouseY>this.y && mouseY<this.y+this.h){
        this.isPressed=true;
        this.alpha()  
      }
      
    }
  
    released(){
      this.isPressed=false;
    }
    color(colos){
      this.colore= colos
    }
}

function moder(){
  mode=!mode
  vise=0
}

function visual(){
  vise++
  if(vise>2){
    vise=0;
  }
}

{{< /highlight >}}
{{< /details >}}

La ilusion muestra 2 casos de la imagen las mesas rotadas de Shepard y el concepto de tamaño constante, como se menciono ambos varian la percerpcion por el principio de orden, debido a que el fondo es una imagen de tres dimensiones, percibimos toda la imagen con esas dimensiones, haciendonos percibir figuras iguales como distintas por como se ven en el fondo.

El codigo solo exporta las imagenes utilizadas, y permite rotar la figura que muestra la igualdad de tamaño en las mesas.

## Resultados

Ilusion de movimientos.

{{< p5-iframe sketch="/visualcomp/sketches/MotionIlution.js" width="540" height="540" >}}
{{< p5-iframe sketch="/visualcomp/sketches/PerceptionIlusion.js" width="670" height="443" >}}

## Conclusiones 

- las ilusiones visuales son utiles a la hora de notar los conceptos que existen en todas las imagenes que existen, entender como usando una imagen plana podemos percibir todo un universo que sentimos vivo con profundidad.

## Trabajos Futuros

Se podria realizar una implementacion con ilusiones que muestren de forma mas especifica cada principio de Gestalt, aunque algunos de los tratados ya existen.

## Resources

- [Leyes Gestalt](https://imborrable.com/blog/teoria-de-la-gestalt/)

- [ilusiones Visuales](https://michaelbach.de/ot/index.html)

- [Pigeon Neck](https://michaelbach.de/ot/mot-pigeonNeck/index.html)

- [Size Constancy](https://michaelbach.de/ot/sze-sizeConstancy/index.html)

- [Stepping feet](https://michaelbach.de/ot/mot-feetLin/index.html)

- [Shepard’s Rotated Tables](https://michaelbach.de/ot/sze-ShepardTables/index.html)
