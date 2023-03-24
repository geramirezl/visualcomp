# Ejercicio 4

Develop a terrain visualization application. Check out the 3D terrain generation with Perlin noise coding train tutorial.

## Introducción Y Transfondo

## Antecedentes

## Trabajo previo

{{< p5-global-iframe id="breath" width="440" height="440" >}}
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

## Conclusiones y trabajos futuros 


## Mach bands

En el ejercicio que vamos a utilizar usamos la ilusion de contraste para la percepcion de la profundidad.

## Terrain with Perlin noise

Siguiendo el tutorial, creamos una malla de triangulos, y darle diversas alturas usando el Perlin noise, el cual es una lista aleatoria de numeros manteniendo una relacion entre los numeros cercanos, lo que hace que el terreno parezca realista y al mismo tiempo sea parcialmente infinito.

{{< details title="Código" open=false >}}
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
    move = 0.01;
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
{{< p5-iframe sketch="/visualcomp/sketches/FlyingFive.js" width="725" height="425" >}}