# Ejercicio 5

Implement a kinegram and some moiré patterns which are close related visual phenomena to masking.


## Introducción

Para entender el funcionamiento de las mascaras visuales o Visual Masking, Usaremos el kinegram o Scanimation, donde usando una rendija uniforme como mascara crearemos una imagen en movimiento a partir de una imagen de diversas franjas o frames moviendo la mascara sobre la misma.

## Transfondo o Teoria

### Kineograph or flipbook

El folioscopio, es un libro o una secuencia de imagenes que varian ligeramente unas de otras, que cambiando las paginas rapidamente o recorriendo la secuencia generan la percepcion de movimiento o transicion entre una y otra, generando una animacion.

Inicialmente el concepto de estos son dibujos en libros o notas, siendo una forma primitiva de la animacion, en el ejemplo tenemos un movimiento de molino donde tenemos 4 paginas, las cuales cuando se empieza a cambiar rapidamente muestran como rueda el molino.

{{< details title="Molino, Code" open=false >}}
## Codigo utilizado
{{< highlight js >}}
 var buto,rund;
var page,moves;
var milprev, delayer;

function setup() {
  createCanvas(400, 400);
  noStroke();
  buto= new Button('nextPage',width/3,height-20);
  rund= new Button('Move',width/5*3,height-20);
  rund.mousePressed(changings);
  buto.mousePressed(change);
  page= 0;
  moves=false;
  milprev=frameCount;
  delayer=5;
}



function draw() {
  background(220);
  fill(0);
  switch(page){
    case 0:
      frame0();
      break;
    case 1:
      frame1();
      break;
    case 2:
      frame2();
      break;
    case 3:
      frame3();
      break;
  }
  
  if(moves && frameCount-milprev>=delayer){
    milprev=frameCount;
    change();
  }
  
  buto.draw()
  rund.draw()
}

function frame0(){
  base(0,0,width,height);
  translate(width/2,height/3);
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  translate(-width/2,-height/3);
}

function frame1(){
  base(0,0,width,height);
  translate(width/2,height/3);
  rotate(PI/8)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(-PI/8)
  translate(-width/2,-height/3);
}

function frame2(){
  base(0,0,width,height);
  translate(width/2,height/3);
  rotate(PI/4)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(-PI/4)
  translate(-width/2,-height/3);
}

function frame3(){
  base(0,0,width,height);
  translate(width/2,height/3);
  rotate(PI/8*3)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(-PI/8*3)
  translate(-width/2,-height/3);
}

function base(x,y,w,h){  
  fill(0,150)
  triangle(x+w/2,y+h/3,x+w/4,y+h,x+w/4*3,y+h);
  ellipse(x+w/2,y+h/3,w/5,h/5);
  fill(0)
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
function mouseReleased(){
  buto.released()
  rund.released()
}


function mousePressed(){
  buto.Pressed()
  rund.Pressed()
}

function changings(){
  moves = !moves
}

function change(){
  page++
  if(page==4){
    page =0;
  }
} 
{{< /highlight >}}
{{< /details >}}
{{< /details >}}
{{< p5-global-iframe id="bands" width="440" height="440" >}}
   var buto,rund;
var page,moves;
var milprev, delayer;

function setup() {
  createCanvas(400, 400);
  noStroke();
  buto= new Button('nextPage',width/3,height-20);
  rund= new Button('Move',width/5*3,height-20);
  rund.mousePressed(changings);
  buto.mousePressed(change);
  page= 0;
  moves=false;
  milprev=frameCount;
  delayer=5;
}



function draw() {
  background(220);
  fill(0);
  switch(page){
    case 0:
      frame0();
      break;
    case 1:
      frame1();
      break;
    case 2:
      frame2();
      break;
    case 3:
      frame3();
      break;
  }
  
  if(moves && frameCount-milprev>=delayer){
    milprev=frameCount;
    change();
  }
  
  buto.draw()
  rund.draw()
}

function frame0(){
  base(0,0,width,height);
  translate(width/2,height/3);
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  translate(-width/2,-height/3);
}

function frame1(){
  base(0,0,width,height);
  translate(width/2,height/3);
  rotate(PI/8)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(-PI/8)
  translate(-width/2,-height/3);
}

function frame2(){
  base(0,0,width,height);
  translate(width/2,height/3);
  rotate(PI/4)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(-PI/4)
  translate(-width/2,-height/3);
}

function frame3(){
  base(0,0,width,height);
  translate(width/2,height/3);
  rotate(PI/8*3)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(PI/2)
  triangle(0,0,width/5*2,-height/12,width/5*2,height/12)
  rotate(-PI/8*3)
  translate(-width/2,-height/3);
}

function base(x,y,w,h){  
  fill(0,150)
  triangle(x+w/2,y+h/3,x+w/4,y+h,x+w/4*3,y+h);
  ellipse(x+w/2,y+h/3,w/5,h/5);
  fill(0)
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
function mouseReleased(){
  buto.released()
  rund.released()
}


function mousePressed(){
  buto.Pressed()
  rund.Pressed()
}

function changings(){
  moves = !moves
}

function change(){
  page++
  if(page==4){
    page =0;
  }
} 
{{< /p5-global-iframe >}}

### Scanimation

### Moiré pattern

### Frames and frames

## Codigo utilizado



## Resultado
Esta es el programa resultante del ejercicio.
{{< p5-iframe sketch="/visualcomp/sketches/FlyingFive.js" width="425" height="425" >}}

## Conclusiones

- Aunque las bandas de Mach es un efecto tan comun que practicamente pasa desapercibido, es muy util para simplificar la forma de mostrar o agrupar diversas zonas.

- Debido a la fluides del Perlin Noise, a la hora de visualisar algo random, es muchisimo mas agradable y facil de controlar usar un noise que un random base.

- los controles de movimiento sin restriccion por medio del mouse gastan demasiado trabajo conseguiendo un control que sea equilibrado para mostrar el trabajo y poder interactuar con la pagina tranquilamente a la vez

## Trabajos Futuros

## Visual masking

Un Kinegram es un fenomeno visual, donde utilizando una banda de mascara, al moverla sobre una imagen fija de fondo se crea una animacion de movimiento o diferencia entre ambos frames.

En el ejercicio que implementamos tenemos 4 ejemplos de como funcionan estas mascaras.

### Mascara movimiento

En la esquina superior derecha tenemos 2 mascaras de diversos tamaños y direcciones cruzando entre si, lo que genera un patron que se repite.

### Frames unicos

Cuando la mascara tiene solo un espacio vacio entre lo que cubre, las imagenes entre frames y frames no se traspasan en ningun momento, generando una transicion completa entre ellos, como en la esquina inferior derecha, con el mensaje WELCOME.

### Animacion/ movimientos

Con las mascaras podemos generar movimiento cuando la imagen que se muestra entre frames es diferente, ademas si el espacio vacio es mayor, se genera un efecto de transicion entre los mismos, como el movimiento de la mascara de la izquierda.

## movimientos
La animacion responde al drag mouse, o con los botones puedes alterar para ver mejor ciertas mascaras.

{{< details title="Código" open=false >}}
{{< highlight js >}}
var refY, refX,one,two,tree,four;
var Gap1,frames1;
var Gap2,frames2;
var Gap3,frames3;
var Gap4,frames4;
var prevmil;
var darkness;
var run = false;
let slider;
var button;
var checkbox;
var sliders;
function setup() {
  createCanvas(500, 500);
  refY=mouseY
  refX=mouseX
  Gap1 = 2;
  frames1 = 6;
  Gap2 = 1;
  frames2 = 7;
  Gap3 = 20;
  frames3 = 5;
  Gap4 = 5;
  frames4 = 6;
  one = 0;
  two = 0;
  tree = 0;
  four = 0;
  button = new Button('snap',0,0);
  button.mousePressed(changeBG);
  
  checkbox = new CheckBox('run',width/2,0, false);
  checkbox.changed(myCheckedEvent);
  sliders = new Slider('shade',width/6*5, 0,0,255, 255, 1);
  
  noStroke();
  prevmil=frameCount;
  
}

var delayss= 3;

function draw() {
  background(255);
  //scale(2)
  //translate(0,-height/2)
  
  Circkless(0,0,width/2,height,Gap1,frames1,false, one);
  Seconds(width/2,height/2,width/2,height/2,Gap2,frames2,true, two);
  Lane(width/3*2,0,width/6,height*(+1/3),Gap3,frames3,false, tree);
  Lane(width/2,width/6,width/2,height/6,Gap4,frames4,true,four);
  
  if(run && frameCount-prevmil>=delayss){
    prevmil = frameCount;
    changeBG()
  }  
  buttons();
}

function Circkless(x,y,lenx,leny,gap,frames,horizon,timing){
  fill(0)
  for(var i = 0;i<leny;i=i+frames*gap){
    Circkle(x+lenx/2,round(y),lenx/24*20,leny/7,i+gap*0,1/4,1/4,gap);
    Circkle(x+lenx/2,round(y+leny/14),lenx/24*18,leny/28*4,i+gap*1,1/4,1/4,gap);
    Circkle(x+lenx/2,round(y+leny/14*2),lenx/24*17,leny/28*5,i+gap*2,1/4,1/4,gap);
    Circkle(x+lenx/2,round(y+leny/14*3),lenx/24*16,leny/28*6,i+gap*3,1/4,1/4,gap);
    Circkle(x+lenx/2,round(y+leny/14*4),lenx/24*15,leny/28*7,i+gap*4,1/4,1/4,gap);
    Circkle(x+lenx/2,round(y+leny/14*5),lenx/24*14,leny/28*8,i+gap*5,1/4,1/4,gap);
    Circkle(x+lenx/2,round(y+leny/14*6),lenx/24*12,leny/28*9,i+gap*0,1/4,1/4,gap);
    Circkle(x+lenx/2,round(y+leny/14*7),lenx/24*10,leny/28*10,i+gap*1,1/4,1/4,gap);
    Circkle(x+lenx/2,round(y+leny/14*8),lenx/24*9,leny/28*11,i+gap*2,1/4,1/4,gap);
    Circkle(x+lenx/2,round(y+leny/14*9),lenx/24*8,leny/28*12,i+gap*3,1/4,1/4,gap);
    Circkle(x+lenx/2,round(y+leny/14*10),lenx/24*7,leny/28*13,i+gap*4,1/4,1/4,gap);
    //
    Circkle(x+lenx/2,round(y+leny/14*11),lenx/12*3,leny/28*12,i+gap*5,1/4,1/4,gap);
    Circkle(x+lenx/2,round(y+leny/14*12),lenx/12*5,leny/28*8,i+gap*0,1/4,1/4,gap);
    Circkle(x+lenx/2,round(y+leny/14*13),lenx/12*7,leny/7,i+gap*1,1/5,1/4,gap);
    Circkle(x+lenx/2,round(y+leny/28*27),lenx/12*9,leny/14,i+gap*2,1/5,1/4,gap);
    
  }
  
  Lane(x,y,lenx,leny,gap,frames,horizon,timing);
}



function Seconds(x,y,lenx,leny,gap,frames,horizon,timing){
  fill(0)
  for(var i = 0;i<lenx;i=i+frames*gap){
    Letters(x,y,i,lenx,leny,'w',gap)
    Letters(x,y,i+gap,lenx,leny,'e',gap)
    Letters(x,y,i+2*gap,lenx,leny,'l',gap)
    Letters(x,y,i+3*gap,lenx,leny,'c',gap)
    Letters(x,y,i+4*gap,lenx,leny,'o',gap)
    Letters(x,y,i+5*gap,lenx,leny,'m',gap)
    Letters(x,y,i+6*gap,lenx,leny,'e',gap)
    
  }
  
  Lane(x,y,lenx,leny,gap,frames,horizon,timing);
}



function Lane(x,y,lenx,leny,gap,frames,horizon,timing){
  times = 100;
  ones = 1;
  twos = 1;
  espace = frames*gap;
  if(horizon){
    times = Math.ceil(lenx/espace)
    lenx = frames*gap-gap;
    ones = 0;
  }else{
    times = Math.ceil(leny/espace)
    leny = frames*gap-gap;
    twos = 0;
  }
  lena=1
  if(timing-gap<0)
    lena= 0
  
  fill(0,sliders.value())
  rect(x,y,lenx*ones*lena+twos*(timing-gap),twos*leny*lena+(timing - gap)*ones);
  for(var i = 0; i< times;i++){
    rect(x+twos*(espace*i+timing),y+ones*(espace*i+timing),lenx,leny);
  }
  
}



function mouseReleased(){
  sliders.released();
  button.released();
  checkbox.released();
}

function mousePressed(){
  sliders.Pressed();
  button.Pressed();
  checkbox.Pressed();
}

function mouseDragged() {
  if(refY>mouseY){
    if(one==0){
      one=frames1*Gap1-1;
    }else{
      one--
    }
    if(tree==0){
      tree=frames3*Gap3-1;
    }else{
      tree--
    }
  }else{
    if(one==frames1*Gap1-1){
      one=0;
    }else{
      one++
    }
    if(tree==frames3*Gap3-1){
      tree=0;
    }else{
      tree++
    }
  }
  if(refX>mouseX){
    if(two==0){
      two=frames2*Gap2-1;
    }else{
      two--
    }
    if(four==0){
      four=frames4*Gap4-1;
    }else{
      four--
    }
  }else{
    if(two==frames2*Gap2-1){
      two=0;
    }else{
      two++
    }
    if(four==frames4*Gap4-1){
      four=0;
    }else{
      four++
    }
  }
  refY=mouseY
  refX=mouseX
  sliders.Dragged()
}

function changeBG() {
  if(two==(frames2*Gap2-1)){
      two=0;
    }else{
      two++
    }
  if(one==frames1*Gap1-1){
      one=0;
    }else{
      one++
    }
    if(tree==frames3*Gap3-1){
      tree=0;
    }else{
      tree++
    }
    if(four==frames4*Gap4-1){
      four=0;
    }else{
      four++
    }
}

function myCheckedEvent() {
  if (checkbox.check) {
    run = true
  } else {
    run = false
  }
}

function Letters(x,y,i,max,up,letter,gap){
  porct = i/max;
  switch(letter){
    case 'w':
      if(porct>2/3){
        rect(x+i,y+up-(porct-2/3)*2*up-up/3,gap,up/3)
      }else if(porct>1/2){
        rect(x+i,y+1/2*up+(porct-1/2)*up,gap,up/3)
      }else if(porct>1/3){
        rect(x+i,y+2/3*up-(porct-1/3)*up,gap,up/3)
      }else{
        rect(x+i,y+(porct)*2*up,gap,up/3)
      }
      break;
    case 'e':
      if(porct>1/5){
        rect(x+i,y+up*4/5,gap,up/5)
        rect(x+i,y,gap,up/5)
        if(porct<3/5){
          rect(x+i,y+up*2/5,gap,up/5)
        }
      }else{
        rect(x+i,y,gap,up)
      }
      break;
    case 'l':
      if(porct>1/5){
        rect(x+i,y+up*4/5,gap,up/5)
      }else{
        rect(x+i,y,gap,up)
      }
      break;
    case 'o':
      if(porct>12/16){
         rect(x+i, y+up*pow((porct-3/4)*4,2)/4, gap,up-up*pow((porct-3/4)*4,2)/2)
        
      }else if(porct>5/8){
         rect(x+i,y,gap,up*pow((porct-5/8)*8,2)/8+up/4)
          rect(x+i, y+up*3/4-up*pow((porct-5/8)*8,2)/8, gap, up*3/8+up*pow((porct-5/8)*8,2)/8)
      }else if(porct>3/8){
          rect(x+i,y,gap,up/4)
        rect(x+i,y+up*3/4,gap,up/4)
      }else if(porct>1/4){
          rect(x+i,y,gap,-up*sqrt((porct-1/4)*8)/8+up/8*3)
          rect(x+i, y+up*5/8+up*sqrt((porct-1/4)*8)/8, gap, up*3/8-up*sqrt((porct-1/4)*8)/8)
      }else{
        rect(x+i, y+up/4-up*sqrt(porct*4)/4, gap, up/2+up*sqrt(porct*4)/2)
      }
      break;
    case 'c':
      if(porct>=3/4){
         rect(x+i, y+up*pow((porct-3/4)*4,2)/4, gap, up*3/8-up*pow((porct-3/4)*4,2)/4)
        rect(x+i, y+up*5/8, gap, up*3/8-up*pow((porct-3/4)*4,2)/4)
      }else if(porct>5/8){
         rect(x+i,y,gap,up*pow((porct-5/8)*8,2)/8+up/4)
          rect(x+i, y+up*3/4-up*pow((porct-5/8)*8,2)/8, gap, up*3/8+up*pow((porct-5/8)*8,2)/8)
      }else if(porct>3/8){
          rect(x+i,y,gap,up/4)
        rect(x+i,y+up*3/4,gap,up/4)
      }else if(porct>1/4){
          rect(x+i,y,gap,-up*sqrt((porct-1/4)*8)/8+up/8*3)
          rect(x+i, y+up*5/8+up*sqrt((porct-1/4)*8)/8, gap, up*3/8-up*sqrt((porct-1/4)*8)/8)
      }else{
        rect(x+i, y+up/4-up*sqrt(porct*4)/4, gap, up/2+up*sqrt(porct*4)/2)
      }
      break;
    case 'm':
      if(porct<3/4&&porct>1/4){
        di = 1;
        if(porct>1/2){
          di = -1;
        }
        rect(x+i,y+up*1/4+up*di*(porct-1/2),gap,up/4)
      }else{
        rect(x+i,y,gap,up)
      }
      break;
  }
  
}

function Circkle(x,y,max,up,i,porcx,porcy,gap){
  x=x-max/2
  y=y-up/2
  if(i<y||i>y+up){
    return
  }
  i=i-y
  porct=i/up;
  lporcx=(1-porcx)/2;
  lporcy=(1-porcy)/2;
  if(porct>lporcy+porcy){
    rect(x+pow((porct-lporcy-porcy)/lporcy,2)*max*lporcx, y+i, max - pow((porct-lporcy-porcy)/lporcy,2)*max*lporcx*2,gap);
  }else if(porct>lporcy){
    rect(x, y+i, max,gap);
  }else{
    rect(x+pow((lporcy-porct)/lporcy,2)*max*lporcx, y+i, max-pow((lporcy-porct)/lporcy,2)*max*lporcx*2,gap);
  }
  
}

  
  
function buttons(){
  button.draw();
  sliders.draw();
  checkbox.draw();
}

function cicles(){
  moves=moves+PI/180*speeds;
  if(moves>=2*PI){
    moves=0;
  }
}

function Fig(xy,dif){
  
  porct=sin(moves+dif);
  vertex(xx+porct*xy[0],yy+porct*xy[1]);
}

function ciclers(xy,dif){
  
  porct=sin(moves+dif);
  pint=(dif-PI/2)/PI
  fill(pint*alphass.value(),pint*(100-alphass.value()),100-pint*alphass.value());
  circle(xx+porct*xy[0],yy+porct*xy[1],cLen);
  noFill();
}

function liner(xy,dif){
  line(xx-xy[0],yy-xy[1],xx+xy[0],yy+xy[1]);
}

function rectar(ang,len){
  x1 = len*sin(ang);
  y1 =len*cos(ang);
  return [x1,y1];
}

function LineUp(){
  lines++;
  updateAng();
}

function LineDown(){
  lines--;
  if(lines<1){
    lines=1;
  }
  updateAng();
}

function updateAng(){
  angs=PI/lines;
}

function Figs(){
  
  figse = !figse
}

function Figso(){
  figso = !figso
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

class CheckBox extends Button{
   constructor(label,x,y,ini){
    super(label,x,y)
    this.w=this.w*4/3
    this.check=ini
    }
  
    changed(alpha = null){
      this.alpha=alpha
    }
  
    draw(){
      noStroke()
      var bart = 200
      if(this.check){
        bart = 10
      }
      fill(bart)
      rect(this.x,this.y,this.w/4,this.h)
      fill(this.colore)
      textWidth(1)
      text(this.label,this.x+this.w/3,this.y+this.h/3*2)
    }
    Pressed(){
      if(mouseX>this.x && mouseX<this.x+this.h &&mouseY>this.y && mouseY<this.y+this.h){
        this.isPressed=true;
      }
    }
    released(){
      if(this.isPressed){
        this.isPressed=false;
        this.check=!this.check
          this.alpha()
      }
    }
}

class Slider extends Button{
  constructor(label,x,y,ini,end,value,step){
   super(label,x,y)
    this.w= max(this.w,(end-ini)+2)
    this.h= this.h/3*5
    this.ini = ini
    this.end = end
    this.step = step
    this.valuee = value
    this.colore = color(50, 50, 50);
    this.alpha= function() {}
  }
  draw(){
    noStroke()
    fill(50);
    rect(this.x,this.y,this.w,this.h)
    textSize(13);
    fill(255);
    text(this.label, this.x,this.y+this.h/5*2);
    fill(100);
    rect(this.x,this.y+this.h/2,this.w-1,this.h/2)
    fill(this.colore);
    rect(this.x+this.valuee/(this.end-this.ini)*this.w,this.y+this.h/2,this.w*this.step/(this.end-this.ini),this.h/2)
  }
  
  value(){
    return this.valuee
  }
  
  Pressed(){
      if(mouseX>this.x && mouseX<this.x+this.w &&mouseY>this.y+this.h/2 && mouseY<this.y+this.h){
        this.isPressed=true;
        
      }
      
    }
  
  Dragged(){
    if(this.isPressed){
      this.valuee = map(mouseX,this.x,this.x+this.w,0,(this.end-this.ini)/this.step,true)
      this.valuee = int(this.valuee*this.step+this.ini)
      print(this.valuee)
      
    }
  }
}

{{< /highlight >}}
{{< /details >}}
{{< p5-iframe sketch="/visualcomp/sketches/MaskKineGram.js" width="500" height="500" >}}