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
var pager;
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
  pager=5;
}



function draw() {
  background(220);
  if(pager>0){
    fill(200);
    rect(0,0,width,height)
    pager--;
    return;
  }
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
  pager=2
  page++
  if(page==4){
    page =0;
  }
}
{{< /highlight >}}
{{< /details >}}

{{< p5-global-iframe id="bands" width="440" height="440" >}}
 var buto,rund;
var page,moves;
var milprev, delayer;
var pager;
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
  pager=5;
}



function draw() {
  background(220);
  if(pager>0){
    fill(200);
    rect(0,0,width,height)
    pager--;
    return;
  }
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
  pager=2
  page++
  if(page==4){
    page =0;
  }
}
{{< /p5-global-iframe >}}

### Moiré pattern

Un patron de moiré es un patron que se forma cuando se superponen 2 renjillas de lineas, con cierto diferencia entre ellas, ya sea el angulo o los tamaños varian lijeramente. de forma basica los patrones de moiré  generan el efecto de bandas oscuras y claras las cuales son perperndiculares al angulo de las renjillas.
Cosa que podemos ver en el patron de moire en la esquina superior derecha del programa.

### Scanimation o Kinegram

Kinegram o imagenes en movimiento, es una ilusion basada en el movimiento de una renjilla que restringue la vista de cierta parte de la imagen, al desplazar esta se genera el mismo efecto que del folioscopio, una animacion primitiva, en el caso del Kinegram lo unico que varia es la ubicacion de la renjilla visual, mientras que la imagen es totalmente fija.

La forma de mostrar los movimientos generados en un Kinegram varian dependiendo de la propia rendija utilizada, estas variaciones permiten mostrar la animacion de forma mas fluida entre movimientos o incluso acelerar la animacion variando dos valores de la misma, los Frames y el Gap o brecha

### Frames and Gap

{{< hint info >}}
**KeyFrames**  
Los KeyFrames, o frames clave son puntos en la animacion que marcan el inicio y el final de una transicion, siendo la transicion que vera el espectador la variacion de un key frame a otro, llenando de pormedio la transicion con frames conocidos como "inbetweens".
Para una descripcion y aplicacion mas profunda ir al [Ejercio 6]({{< relref "/docs/Menu/Corte1/ej6" >}})
{{< /hint >}}
Un frame o fotograma en animacion es cada imagen dentro de la animacion siendo esta la secuencia de fotogramas, en el caso del Kinegram sus frames son todas las posiciones donde la rendija muestra una posicion diferente.

El Gap o brecha de la rendija sera la cantidad de fotogramas que pasaran entre un KeyFrame y otro, notese que cuando esta brecha es de uno como en el mostrado en la esquina inferior derecha de la animacion, cada frame del Kinegram es un KeyFrame a la vez.

Al momento de hacer un Kinegram los Frames que se dibujan realmente son tan anchos como el Gap de la rendija, dibujando solo los KeyFrames, al hacer esto entre menor sea el Gap mas rigido se siente el movimiento del dibujo, lo que es util para mensajes en especifico, pero con animaciones o movimientos mas fluidos y complejos en vez de tener que dibujar 20 frames conun gap de 1 para visualizar de forma fluida el dibujo, o podemos darle un Gap mayor para reducir la cantidad de KeyFrames necesarios por dibujar.

El Gap no solo ayuda a que la imagen se sienta mas fluida, tambien hace variar la velocidad del kinegram, debido a que entre mas grande es el mismo, la velocidad con la que se transiciona de un frame a otro es menor, lo que nos muestra que un equilibrio entre ambos Frames y Gap es muy util para conseguir la percepcion deseada.

## Codigo utilizado

{{< details title="Código Completo" open=false >}}
{{< highlight js >}}
var refY, refX,one,two,tree,four;
var Gap1,frames1;
var Gap2,frames2;
var Gap3,frames3;
var Gap4,frames4;
var prevmil,prevmil2;
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
  Gap3 = 5;
  frames3 = 2;
  Gap4 = 3;
  frames4 = 3;
  one = 0;
  two = 0;
  tree = 0;
  four = 0;
  button = new Button(' snap ',0,0);
  button.mousePressed(changeBG);
  checkbox = new Button(' run ',width/2,0);
  checkbox.mousePressed(myCheckedEvent);
  sliders = new Button(' shade ',width/6*5,0);
  sliders.mousePressed(myCheckedEvent2);
  noStroke();
  prevmil2=prevmil=frameCount;
  
}

var delayss= 3;
var delayss3= 30;

function draw() {
  background(255);
  //scale(2)
  //translate(0,-height/2)
  
  Circkless(0,0,width/2,height,Gap1,frames1,false, one);
  Seconds(width/2,height/2,width/2,height/2,Gap2,frames2,true, two);
  Lane(width/2+width/60,height/20,width/2-width/60*2,height/2-height/30*2,Gap3,frames3,true, tree,5*PI/180);
  Lane(width/2+width/60,height/20,width/2-width/60*2,height/2-height/30*2,Gap4,frames4,true,0,0);
  
  if(run && frameCount-prevmil>=delayss){
    prevmil = frameCount;
    twos= two;
    changeBG();
    if(frameCount-prevmil2>=delayss3){
      prevmil2 = frameCount;
    }else{
      two=twos
    }
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
  
  Lane(x,y,lenx,leny,gap,frames,horizon,timing,0);
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
  
  Lane(x,y,lenx,leny,gap,frames,horizon,timing,0);
}



function Lane(x,y,lenx,leny,gap,frames,horizon,timing,rotation){
  times = 100;
  ones = 1;
  twos = 1;
  espace = frames*gap;
  lenxx=lenx;
  lenyy=leny;
  if(horizon){
    times = Math.ceil(lenx/espace)
    lenxx = frames*gap-gap;
    ones = 0;
  }else{
    times = Math.ceil(leny/espace)
    lenyy = frames*gap-gap;
    twos = 0;
  }
  lena=1
  if(timing-gap<0)
    lena= 0
  translate(x+lenx/2,y+leny/2)
  rotate(rotation)
  fill(0,shade*255)
  rect(-lenx/2,-leny/2,lenxx*ones*lena+twos*(timing-gap),twos*lenyy*lena+(timing - gap)*ones);
  for(var i = 0; i< times-1;i++){
    rect(-lenx/2+twos*(espace*i+timing),-leny/2+ones*(espace*i+timing),lenxx,lenyy);
  }
  
  if(lenxx-timing*twos>0 && lenyy-timing*ones>0){
    rect(-lenx/2+((times-1)*espace+timing)*twos,-leny/2+((times-1)*espace+timing)*ones,lenxx-timing*twos,lenyy-timing*ones);
  }
  
  //rect(lenx/2-lenxx+gap*twos,leny/2-lenyy+(timing+gap)*ones,100,100);
  rotate(-rotation)
  translate(-x-lenx/2,-y-leny/2)
  
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
  run = !run
}
var shade=1;
function myCheckedEvent2() {
  if(shade==1){
     shade=0;
  }else{
    shade=1;
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

{{< /highlight >}}
{{< /details >}}

Las Partes ah resaltar del codigo serian las previas mencionadas, primero la funcion lane, la cual sirve para general rendijas lineas de todo tipo, recibiendo primero las cuatro valores que determinan su posicion, ancho y alto (x,y,lenx,leny), su Gap y frames, si la rendija es horizontal (o vertical en caso contrario), la posicion actual o el frame actual en el que se encuentra, y su rotacion. utilizando esto se crea una rendija con los valores especificados.

Esta es la funcion utilizada para todas las rendijas en el programa.

{{< details title="lane" open=true >}}
{{< highlight js >}}
function Lane(x,y,lenx,leny,gap,frames,horizon,timing,rotation){
  times = 100;
  ones = 1;
  twos = 1;
  espace = frames*gap;
  lenxx=lenx;
  lenyy=leny;
  if(horizon){
    times = Math.ceil(lenx/espace)
    lenxx = frames*gap-gap;
    ones = 0;
  }else{
    times = Math.ceil(leny/espace)
    lenyy = frames*gap-gap;
    twos = 0;
  }
  lena=1
  if(timing-gap<0)
    lena= 0
  translate(x+lenx/2,y+leny/2)
  rotate(rotation)
  fill(0,shade*255)
  rect(-lenx/2,-leny/2,lenxx*ones*lena+twos*(timing-gap),twos*lenyy*lena+(timing - gap)*ones);
  for(var i = 0; i< times-1;i++){
    rect(-lenx/2+twos*(espace*i+timing),-leny/2+ones*(espace*i+timing),lenxx,lenyy);
  }
  
  if(lenxx-timing*twos>0 && lenyy-timing*ones>0){
    rect(-lenx/2+((times-1)*espace+timing)*twos,-leny/2+((times-1)*espace+timing)*ones,lenxx-timing*twos,lenyy-timing*ones);
  }
  
  //rect(lenx/2-lenxx+gap*twos,leny/2-lenyy+(timing+gap)*ones,100,100);
  rotate(-rotation)
  translate(-x-lenx/2,-y-leny/2)
  
}
{{< /highlight >}}
{{< /details >}}

Para generar las imagenes fijas de los diferentes Kinegram se usaron las funciones Circkle y Letters, utilizadas en las funciones Circkless y Seconds respectivamente, Circkless y Seconds recorren toda la zona a pintar y dibujan cada linea llamada segun como se deseaba animar, en el caso de circkless usa circkle para dibujar diversas elipses en las posiciones indicadas, mientras que seconds hace lo mismo con Letters. Cada cual con su respectiva rendija.

{{< details title="Circkless and Seconds" open=true >}}
{{< highlight js >}}
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
  
  Lane(x,y,lenx,leny,gap,frames,horizon,timing,0);
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
  
  Lane(x,y,lenx,leny,gap,frames,horizon,timing,0);
}


{{< /highlight >}}
{{< /details >}}

Algo a notar de las funciones Letters y Circkle es que no podian ser dibujados con anda mas complejo que una linea (o un rectangulo de ancho Gap), debido a que entre cada uno de las partes de la imagen van todos los demas frames asi que tocaba cortarla en lineas.

{{< details title="Circkle & Letters" open=false >}}
{{< highlight js >}}

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
{{< /highlight >}}
{{< /details >}}

## Resultado
{{< hint info >}}
**Botones y movimientos**  
Para interactuar con el programa se puede arrastrar el mouse para mover las renjillas, o usar los botones: snap para moverte un solo fotograma, run para mantener corriendo las rendijas constantemente y shade para quitar las rendijas.
{{< /hint >}}

Esta es el programa resultante del ejercicio.
{{< p5-iframe sketch="/visualcomp/sketches/MaskKineGram.js" width="540" height="540" >}}

## Conclusiones

- 

- 

- 

## Trabajos Futuros


