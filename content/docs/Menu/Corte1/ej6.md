# Ejercicio 6

Implement an animation with keyframes using the [nub library](https://github.com/VisualComputing/nub/blob/master/examples/basics/KeyFrames/KeyFrames.pde) for [Processing](https://processing.org) (Java).

Esta Es una previa de lo que realiza el codigo:
{{< p5-instance-div id="video" >}}
  let fingers;

  p5.setup = function() {
    //p5.createCanvas(808, 472);
    // specify multiple formats for different browsers
    animati = p5.createVideo(['/visualcomp/sketches/animation.mp4']);
    //animati.hide(); // by default video shows up in separate dom
    animati.loop();
    animati.start();
                    // element. hide it and draw it to the canvas instead    
  };

  /*p5.draw = function() {
    p5.background(150);
    p5.image(animati, 0, 0); // draw the video frame to canvas
  };*/
/*
  p5.mousePressed = function() {
    animati.loop(); // set the video to loop and start playing  
  }*/
{{< /p5-instance-div >}}

## Introduccion

La coherencia Temporal es un fenomeno visual presente en la naturalezapor el cual el color percibidoen un punto dado una region de interes tiende a variar mas acordemente a el tiempo pasado entre dos momentos dados.
En este ejercicio vamos a visualizar esta coherencia temporal en una animacion por medio de Fotogramas claves y transfomacion de un objeto.
Replicando en mayor medida lo que se puede realizar por medio de la libreria [nub](https://github.com/VisualComputing/nub/blob/master/examples/basics/KeyFrames/KeyFrames.pde).

Para el diseño de los botones para interactuar con la animacion, se tomo inspiracion en las diversas aplicaciones de modelado y creacion de animaciones o juegos o edicion de video, como son [Blender](https://www.blender.org) o [Unity](https://unity.com/es)

## Transfondo o Teoria

### Frames

 Refiriendonos al propio Canvas que trabajamos, un Frame o Fotograma Es cada instancia de tiempo donde dibujamos una imagen estatica en el mismo, cada variacion o cada vez que se llama a la funcion draw, se genera un Frame.
 En animacion es cada una de las imagenes que forman esta animacion al momento de recorrer todos los frames de forma rapida.

#### KeyFrames.
Los KeyFrames, o frames clave son puntos en la animacion que marcan el inicio y el final de una transicion.
La importancia de los mismos a la hora de animar, es que permiten dar una ligera percepcion de lo que se busca realizar en la transición, marcando cada Frame que determina un momento importante en la animación.

### Transición y transformación.

Una Transición es una accion o transformacion que realiza nuestro objeto dentro de la animacion a lo largo de un segmento de tiempo.

Las Transformacion son variaciones que se realizan a alguna variable del objeto, estas estan definidas variaciones se definen por medio de la [razón de cambio](https://definicion.de/razon-de-cambio/) de dicha variable entre el keyFrame inicial y final de dicha Transicion. Lo definimos segun la razon de cambio para calcular los valores de las variables a partir de los diferentes tiempos en el segmento de la Transición.

#### valores variables

Los diversos valores que se usaran como variables por medio de transformaciones seran:
- Su posicion, variando los valores X y Y.
- Su Escala, variando su largo y ancho.
- Su angulo de rotacion, o la inclinacion de la figura.

{{< hint info >}}
**Botones**  
Los primeros 3 botones Rot, Esc, Pos, permiten designar la variable a modificar por medio del arrastre del mouse.
(Tambien es posible alterar que figura se modifica con los botones "l+" y "l-" pero estos cambios son constantes durante toda la animación)
{{< /hint >}}

## Linea de Tiempo

En La animacion la linea de tiempo es una forma utilizada para visualizar y ubicar los diversos frames de la misma.
Esta nos ayudara a ver en que frame nos encontramos, donde se ubican los key, y movernos con mayor facilidad a travez de los mismos

{{< hint info >}}
**Linea de Tiempo**  
La linea de tiempo se escuentra justo encima de los botones, siendo los frames de colores KeyFrames, para desplazarse a travez de los mismos usar la linea que marca el frame actual.
{{< /hint >}}

## Codigo utilizado

{{< details title="Código Completo" open=false >}}
{{< highlight js >}}

var figi;
var Ation,modes;
var timeline,keyFrma,rot,esc,pos,del,addw,runn,lma,lme;
var xref,yref;
var fair,linee;
var divv;
function setup() {
  createCanvas(400, 600);
  fair=false;
  linee=0;
  
  figi = new Fig(50,50,75,75,PI/2,3);
  figi.keyFrames.push([25,200,200,100,50,0])
  figi.keyFrames.push([50,50,300,50,100,0])
  figi.keyFrames.push([75,300,50,50,100,2*PI])
  figi.keyFrames.push([100,50,50,75,75,PI/2])
  
  fill(255);
  Ation = false;
  divv = 1
  timeline = new Slider('',1,height-60,0,100,0,divv);
  timeline.colore = color(255,255,255)
  timeline.mousePressed(chaTime);
  timeline.w=width-2
  keyFrma = [0,25,50,75,100]
  rot = new Button('Rot',0,height-20);
  rot.mousePressed(rota)
  rot.w=width/7;
  esc= new Button('Esc',width/7,height-20);
  esc.mousePressed(esca)
  esc.w=width/7;
  pos= new Button('Pos',width/7*2,height-20);
  pos.mousePressed(posa)
  pos.w=width/7;
  del= new Button('Del',width/7*3,height-20);
  del.w=width/7;
  del.mousePressed(deleKF)
  addw= new Button('Add',width/7*4,height-20);
  addw.w=width/7;
  addw.mousePressed(addKF)
  runn= new Button('run',width/7*5,height-20);
  runn.mousePressed(runche)
  runn.w=width/7;
  
  lma= new Button('l+',width/7*6,height-20);
  lma.w=width/14;
  lma.mousePressed(lm)
  lme= new Button('l-',width/14*13,height-20);
  lme.w=width/14;
  lme.mousePressed(ln)
  modes = 'position'
  xref=0;
  yref=0;
  
}

function draw() {
  
  background(0);
  fill(255)
  figi.draw()
  //Timinggg()
  Mode()
  runni();
}

class Fig{

  constructor(x,y,w,h,rotation,sides){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.rotation=rotation;
    this.keyFrames=[[0,x,y,w,h,rotation]];
    //print(this.keyFrames[0])
    this.sides=sides
    this.escalats=0.5
    this.left=false
    this.up=false
    this.time=0
  }
  
  draw(){
    translate(this.x,this.y)
    let col = map(this.time,0,100,0,255);
    fill(255-col,255,col)
    rotate(this.rotation)
    noStroke()
    beginShape()
    //print(this.keyFrames)

    switch(this.sides){
      case 2:
        stroke(255);
        strokeWeight(this.w);
        line(0,-this.h/2,0,this.h/2);
        break;
      case 3:
        triangle(0,-this.h/2,-this.w/2,this.h/2,this.w/2,this.h/2);
        break;
      case 4:
        rect(-this.w/2,-this.h/2,this.w,this.h);
        break;
      default:
        ellipse(0,0,this.w,this.h)
        break;
        
    } 
    endShape(CLOSE)
    
    fill(255,0,0)
    strokeWeight(5);
    stroke(255,0,0)
    point(0,0)
    rotate(-this.rotation)
    translate(-this.x,-this.y)
    
  }
  
  keyss(timees){
    if(this.keyFrames.length==1){
      return this.keyFrames[0].slice(1);
    }else{
      let up, down;
      up= []
      down = this.keyFrames[0]
      if(this.keyFrames[0][0]>timees){
        return this.keyFrames[0].slice(1);
      }
      for(var i = 1; i<this.keyFrames.length;i++){
        if(this.keyFrames[i][0]==timees){
          return this.keyFrames[i].slice(1);
        }else if(this.keyFrames[i][0]<timees){
           down = this.keyFrames[i]
        }else{
           up = this.keyFrames[i]
          return this.middle(down,up,timees)
        }
      }
        return down.slice(1)
    }
  }
  
  kisy(times){
    for(var i = 0; i<this.keyFrames.length;i++){
      if(this.keyFrames[i][0]==times){
        return [i,this.keyFrames[i].slice(1)];
      }
    }
    
    return null
  }
  
  changeTime(Time){
    let keya = this.kisy(this.time)
    
    if(keya != null){
      this.keyFrames[keya[0]]=[this.time,this.x,this.y,this.w,this.h,this.rotation]
    }
    let key = this.keyss(Time)
    //print(key)
    this.x = key[0]
    this.y = key[1]
    this.w = key[2]
    this.h =key[3]
    this.rotation = key[4]
    this.time=Time
  }
  
  middle(down,up,timees){
    let difTim = up[0]-down[0];
    let dx = (up[1]-down[1])/difTim
    let dy = (up[2]-down[2])/difTim
    let dw = (up[3]-down[3])/difTim
    let dh = (up[4]-down[4])/difTim
    let dr = (up[5]-down[5])/difTim
    let timb=timees-down[0]
    return [down[1]+dx*timb,down[2]+dy*timb,down[3]+dw*timb,down[4]+dh*timb,down[5]+dr*timb]
  }
  
  changeFig(more){
    this.sides = this.sides+more
    
    if(this.sides>4){
      this.sides = 4
    }else if(this.sides<1){
      this.sides=1
    }
  }
  
  deleteKeyFram(time){
    let keya = this.kisy(time);
    if(keya!= null&& this.keyFrames.length>1){
      if(keya[0]==0){
        this.keyFrames = this.keyFrames.slice(1);
      }else if(keya[0]==this.keyFrames.length-1 ){
        this.keyFrames.pop()
      }else{
        let onw= this.keyFrames.slice(0,keya[0])
        let dow = this.keyFrames.slice(keya[0]+1,this.keyFrames.length)
        this.keyFrames= onw.concat(dow)
      }     
      return keya
    }
    return null
  }
  
  addKeyFram(time){
    let keya = this.kisy(time);
    if(keya == null){
      if(this.keyFrames.length<1){
        this.keyFrames.push([time,this.x,this.y,this.w,this.h,this.rotation])
      }else if(this.keyFrames.length==1){
        if(this.keyFrames[0][0]<time){
          this.keyFrames.push([time,this.x,this.y,this.w,this.h,this.rotation])
        }else{
          let we= this.keyFrames[0]
          this.keyFrames[0]=[time,this.x,this.y,this.w,this.h,this.rotation]
          this.keyFrames.push(we)
        }
      }else{
        var i = 0;
        for(i = 0; i<this.keyFrames.length;i++){
          if(this.keyFrames[i][0]>time){
            break;
          }
        }
        let onw= this.keyFrames.slice(0,i)
        onw.push([time,this.x,this.y,this.w,this.h,this.rotation])
        let dow = this.keyFrames.slice(i,this.keyFrames.length)
        this.keyFrames= onw.concat(dow)
      }
      
      return time
    }
    return null
  }
  
  presss(x,y){
    this.left =x<this.x
    
    this.up=y<this.y
  }
  
  move(x,y){
    this.x=this.x+x
    this.y=this.y+y
  }
  
  escalat(x,w,y,h){
    if(abs(w)<abs(h)){
      if(this.up){
      this.h=this.h-(h*this.escalats)
    }else{
      this.h=this.h+(h*this.escalats)
    }
    }else{
       if(this.left){
      this.w=this.w-(w*this.escalats)
    }else{
      this.w=this.w+(w*this.escalats)
    }
    
    }
      

   
    if(this.w<0){
      this.w=0
    }
    if(this.h<0){
      this.h=0
    }
  }
  
  rotate(x,y,xx,yy){
    
    var x1=x-this.x
    var y1=y-this.y
    
    var lent = letn(x1,y1)
    x1=x1/lent
    y1=y1/lent
    let m1 = y1/x1
    let b1 = -x1*m1+y1
    var x2=xx-this.x
    var y2=yy-this.y
    lent = letn(x2,y2)
    x2=x2/lent
    y2=y2/lent
    let m2 = y2/x2
    let m3 = -1/m1
    if(m1==0){
      if(m2==0){
        if(x1==x2){
          this.rotation=this.rotation
        }else{
          this.rotation=this.rotation+PI
        }
        return
      }else if(x2==0){
        if(y2>0){
          this.rotation=this.rotation+PI/2
        }else{
          this.rotation=this.rotation-PI/2
        }
        return
      }
    }
    if(m3==0){
      if(m2==0){
        if(x2>0){
          this.rotation=this.rotation+PI/2
        }else{
          this.rotation=this.rotation-PI/2
        }
        return
      }else if(x2==0){
        
        if(y1==y2){
          this.rotation=this.rotation
        }else{
          this.rotation=this.rotation+PI
        }
        return
      }
    }
    
    let b3 = -x2*m3+y2
    let x4 = (b1-b3)/(-m1+m3)
    let y4 = b3+m3*x4
    var angle= (m2-m1)*atan(letn(x2-x4,y2-y4)/letn(x4,y4))/abs(m2-m1)
    if(isNaN(angle)){
      return
    }
    this.rotation=this.rotation+angle
      
    if(this.rotation>=2*PI){
      this.rotation=this.rotation-2*PI
    }
    if(this.rotation<0){
      this.rotation=this.rotation+2*PI
    }
  }
}

function Mode(){
  timeline.draw();
  rot.draw();
  esc.draw();
  pos.draw();
  del.draw();
  addw.draw();
  runn.draw();
  lma.draw();
  lme.draw();
  //print(keyFrma)
  for(var i = 0; i<keyFrma.length;i++){
    let col = map(keyFrma[i],0,100,0,255)
    let xx = map(keyFrma[i],0,100,1,width-2)
    fill(255-col,255,col)
    rect(xx-divv/2,height-40,divv,20)
  }
  noStroke()
  fill(0,255,0)
  text(modes,0,15)
}

function mouseReleased(){
  timeline.released();
  //keyFrma.released();
  rot.released();
  esc.released();
  pos.released();
  del.released();
  addw.released();
  runn.released();
  lma.released();
  lme.released();
  Ation = false;
}

function mousePressed(){
  xref=mouseX
  yref=mouseY
  timeline.Pressed();
  rot.Pressed();
  esc.Pressed();
  pos.Pressed();
  del.Pressed();
  addw.Pressed();
  runn.Pressed();
  lma.Pressed();
  lme.Pressed();
  if(height-60>mouseY){
    Ation = true
    figi.presss(mouseX,mouseY)
  }
}


function mouseDragged(){
  timeline.Dragged()
  if(Ation){
    if(modes == 'rotation'){
      rotatew()
    }else if(modes == 'escalar'){
      escalat()
    }else{
      posat()
  }
  }
  
}

function rotatew(){
  figi.rotate(xref,yref,mouseX,mouseY)
  xref=mouseX
  yref=mouseY
}

function escalat(){
  figi.escalat(xref,mouseX-xref,yref,mouseY-yref)
  xref=mouseX
  yref=mouseY
}

function posat(){
  figi.move(mouseX-xref,mouseY-yref)
  xref=mouseX
  yref=mouseY
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

class Slider extends Button{
  constructor(label,x,y,ini,end,value,step){
   super(label,x,y)
    this.w= max(this.w,(end-ini)+2)
    //this.h= this.h/3*5
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
    var al = this.h;
    if(this.label.lenght>0){
      textSize(13);
      fill(255);
      text(this.label, this.x,this.y+this.h/5*2);
      fill(100);
      al = this.h/2;
    }    
    rect(this.x,this.y+(this.h-al),this.w-1,al)
    fill(this.colore);
    rect(this.x+this.valuee/(this.end-this.ini)*this.w-this.w*this.step/(this.end-this.ini)/2,this.y+(this.h-al),this.w*this.step/(this.end-this.ini),al)
  }
  
  value(){
    return this.valuee
  }
  
  setValue(val){
    this.valuee = map(val,this.x,this.x+this.w,0,(this.end-this.ini)/this.step,true)
    this.valuee = int((this.valuee*this.step+this.ini)/this.step)*this.step
      //print(this.valuee)
    this.alpha()
  }
  
  Pressed(){
    var al = this.h;
    if(this.label.lenght>0){
      al = this.h/2;
    } 
      if(mouseX>this.x && mouseX<this.x+this.w &&mouseY>this.y+(this.h-al) && mouseY<this.y+al){
        this.isPressed=true;
        
      }
      
    }
  
  Dragged(){
    if(this.isPressed){
      this.valuee = map(mouseX,this.x,this.x+this.w,0,(this.end-this.ini)/this.step,true)
      this.valuee = int((this.valuee*this.step+this.ini)/this.step)*this.step
      //print(this.valuee)
      this.alpha()
    }
  }
}

function rota(){
  modes='rotation';  
}

function esca(){
  modes='escalar';  
} 

function posa(){
  modes='position';  
}

function letn(x,y){
  len = sqrt(x*x+y*y)
  return len;
}

function chaTime(){
  figi.changeTime(timeline.value())
  if(!fair){
    linee=map(timeline.value(),0,100,0,width)
  }
}


function runni(){
  if(fair){
    linee++
    if(linee>width){
      linee=0
    }
    timeline.setValue(linee)
  }
}
      
function runche(){
  fair = !fair
}

function lm(){
  figi.changeFig(1)
}
      
function ln(){
  figi.changeFig(-1)
}
      
function deleKF(){
  let keya = figi.deleteKeyFram(timeline.value())
  if(keya!=null){
    let onw= keyFrma.slice(0,keya[0])
    let dow = keyFrma.slice(keya[0]+1,keyFrma.length)
    keyFrma= onw.concat(dow)
  }
  
}

function addKF(){
  let choice = figi.addKeyFram(timeline.value())
  if(choice!=null){
    if(keyFrma.length<1){
      keyFrma.push(choice)
    }else if(keyFrma.length==1){
      if(keyFrma[0]<choice){
        keyFrma.push(choice)
      }else{
        let we= keyFrma[0]
        keyFrma[0]=choice
        keyFrma.push(we)
      }
    }else{
      var i = 0;
      for(i = 0; i<keyFrma.length;i++){
        if(keyFrma[i]>choice){
          break;
        }
      }
      let onw= keyFrma.slice(0,i)
      onw.push(choice)
      let dow = keyFrma.slice(i,keyFrma.length)
      keyFrma= onw.concat(dow)
    }
  }
}

{{< /highlight >}}
{{< /details >}}

Todo el codigo gira en torno a la figura "figi", el objeto de la clase Fig.

{{< details title="Clase Fig" open=false >}}
{{< highlight js >}}

class Fig{

  constructor(x,y,w,h,rotation,sides){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.rotation=rotation;
    this.keyFrames=[[0,x,y,w,h,rotation]];
    //print(this.keyFrames[0])
    this.sides=sides
    this.escalats=0.5
    this.left=false
    this.up=false
    this.time=0
  }
  
  draw(){
    translate(this.x,this.y)
    let col = map(this.time,0,100,0,255);
    fill(255-col,255,col)
    rotate(this.rotation)
    noStroke()
    beginShape()
    //print(this.keyFrames)

    switch(this.sides){
      case 2:
        stroke(255);
        strokeWeight(this.w);
        line(0,-this.h/2,0,this.h/2);
        break;
      case 3:
        triangle(0,-this.h/2,-this.w/2,this.h/2,this.w/2,this.h/2);
        break;
      case 4:
        rect(-this.w/2,-this.h/2,this.w,this.h);
        break;
      default:
        ellipse(0,0,this.w,this.h)
        break;
        
    } 
    endShape(CLOSE)
    
    fill(255,0,0)
    strokeWeight(5);
    stroke(255,0,0)
    point(0,0)
    rotate(-this.rotation)
    translate(-this.x,-this.y)
    
  }
  
  keyss(timees){
    if(this.keyFrames.length==1){
      return this.keyFrames[0].slice(1);
    }else{
      let up, down;
      up= []
      down = this.keyFrames[0]
      if(this.keyFrames[0][0]>timees){
        return this.keyFrames[0].slice(1);
      }
      for(var i = 1; i<this.keyFrames.length;i++){
        if(this.keyFrames[i][0]==timees){
          return this.keyFrames[i].slice(1);
        }else if(this.keyFrames[i][0]<timees){
           down = this.keyFrames[i]
        }else{
           up = this.keyFrames[i]
          return this.middle(down,up,timees)
        }
      }
        return down.slice(1)
    }
  }
  
  kisy(times){
    for(var i = 0; i<this.keyFrames.length;i++){
      if(this.keyFrames[i][0]==times){
        return [i,this.keyFrames[i].slice(1)];
      }
    }
    
    return null
  }
  
  changeTime(Time){
    let keya = this.kisy(this.time)
    
    if(keya != null){
      this.keyFrames[keya[0]]=[this.time,this.x,this.y,this.w,this.h,this.rotation]
    }
    let key = this.keyss(Time)
    //print(key)
    this.x = key[0]
    this.y = key[1]
    this.w = key[2]
    this.h =key[3]
    this.rotation = key[4]
    this.time=Time
  }
  
  middle(down,up,timees){
    let difTim = up[0]-down[0];
    let dx = (up[1]-down[1])/difTim
    let dy = (up[2]-down[2])/difTim
    let dw = (up[3]-down[3])/difTim
    let dh = (up[4]-down[4])/difTim
    let dr = (up[5]-down[5])/difTim
    let timb=timees-down[0]
    return [down[1]+dx*timb,down[2]+dy*timb,down[3]+dw*timb,down[4]+dh*timb,down[5]+dr*timb]
  }
  
  changeFig(more){
    this.sides = this.sides+more
    
    if(this.sides>4){
      this.sides = 4
    }else if(this.sides<1){
      this.sides=1
    }
  }
  
  deleteKeyFram(time){
    let keya = this.kisy(time);
    if(keya!= null&& this.keyFrames.length>1){
      if(keya[0]==0){
        this.keyFrames = this.keyFrames.slice(1);
      }else if(keya[0]==this.keyFrames.length-1 ){
        this.keyFrames.pop()
      }else{
        let onw= this.keyFrames.slice(0,keya[0])
        let dow = this.keyFrames.slice(keya[0]+1,this.keyFrames.length)
        this.keyFrames= onw.concat(dow)
      }     
      return keya
    }
    return null
  }
  
  addKeyFram(time){
    let keya = this.kisy(time);
    if(keya == null){
      if(this.keyFrames.length<1){
        this.keyFrames.push([time,this.x,this.y,this.w,this.h,this.rotation])
      }else if(this.keyFrames.length==1){
        if(this.keyFrames[0][0]<time){
          this.keyFrames.push([time,this.x,this.y,this.w,this.h,this.rotation])
        }else{
          let we= this.keyFrames[0]
          this.keyFrames[0]=[time,this.x,this.y,this.w,this.h,this.rotation]
          this.keyFrames.push(we)
        }
      }else{
        var i = 0;
        for(i = 0; i<this.keyFrames.length;i++){
          if(this.keyFrames[i][0]>time){
            break;
          }
        }
        let onw= this.keyFrames.slice(0,i)
        onw.push([time,this.x,this.y,this.w,this.h,this.rotation])
        let dow = this.keyFrames.slice(i,this.keyFrames.length)
        this.keyFrames= onw.concat(dow)
      }
      
      return time
    }
    return null
  }
  
  presss(x,y){
    this.left =x<this.x
    
    this.up=y<this.y
  }
  
  move(x,y){
    this.x=this.x+x
    this.y=this.y+y
  }
  
  escalat(x,w,y,h){
    if(abs(w)<abs(h)){
      if(this.up){
      this.h=this.h-(h*this.escalats)
    }else{
      this.h=this.h+(h*this.escalats)
    }
    }else{
       if(this.left){
      this.w=this.w-(w*this.escalats)
    }else{
      this.w=this.w+(w*this.escalats)
    }
    
    }
      

   
    if(this.w<0){
      this.w=0
    }
    if(this.h<0){
      this.h=0
    }
  }
  
  rotate(x,y,xx,yy){
    
    var x1=x-this.x
    var y1=y-this.y
    
    var lent = letn(x1,y1)
    x1=x1/lent
    y1=y1/lent
    let m1 = y1/x1
    let b1 = -x1*m1+y1
    var x2=xx-this.x
    var y2=yy-this.y
    lent = letn(x2,y2)
    x2=x2/lent
    y2=y2/lent
    let m2 = y2/x2
    let m3 = -1/m1
    if(m1==0){
      if(m2==0){
        if(x1==x2){
          this.rotation=this.rotation
        }else{
          this.rotation=this.rotation+PI
        }
        return
      }else if(x2==0){
        if(y2>0){
          this.rotation=this.rotation+PI/2
        }else{
          this.rotation=this.rotation-PI/2
        }
        return
      }
    }
    if(m3==0){
      if(m2==0){
        if(x2>0){
          this.rotation=this.rotation+PI/2
        }else{
          this.rotation=this.rotation-PI/2
        }
        return
      }else if(x2==0){
        
        if(y1==y2){
          this.rotation=this.rotation
        }else{
          this.rotation=this.rotation+PI
        }
        return
      }
    }
    
    let b3 = -x2*m3+y2
    let x4 = (b1-b3)/(-m1+m3)
    let y4 = b3+m3*x4
    var angle= (m2-m1)*atan(letn(x2-x4,y2-y4)/letn(x4,y4))/abs(m2-m1)
    if(isNaN(angle)){
      return
    }
    this.rotation=this.rotation+angle
      
    if(this.rotation>=2*PI){
      this.rotation=this.rotation-2*PI
    }
    if(this.rotation<0){
      this.rotation=this.rotation+2*PI
    }
  }
}

{{< /highlight >}}
{{< /details >}}

La Clase Fig sirve para manipular todo lo que respecta a la figura mostrada, conteniendo los datos actuales de posiscion escalado rotacion y lados (que determina la forma de la figura). La funcion draw() dibuja la figura basandose en los valores actuales. la funcion kisy() revisa si nos encontramos en un Frame que es KeyFrame, y la funcion changeFig() es un get de la variable sides, que limita los valores posibles, por ultimo press() funciona para dar un apoyo a la posicion donde se presiono el mouse para ayudar a escalar.

Por otro lado tenemos las funciones que varian la informacion dentro del Frame que nos encontramos: move(), escalat(), rotate().
Cada una de estas varia una de las variables de la figura, su posicion escalado y rotacion respectivamente.

{{< details title="Move Escalat Rotate" open=true >}}
{{< highlight js >}}

move(x,y){
    this.x=this.x+x
    this.y=this.y+y
  }
  
  escalat(x,w,y,h){
    if(abs(w)<abs(h)){
      if(this.up){
      this.h=this.h-(h*this.escalats)
    }else{
      this.h=this.h+(h*this.escalats)
    }
    }else{
       if(this.left){
      this.w=this.w-(w*this.escalats)
    }else{
      this.w=this.w+(w*this.escalats)
    }
    
    }
      

   
    if(this.w<0){
      this.w=0
    }
    if(this.h<0){
      this.h=0
    }
  }
  
  rotate(x,y,xx,yy){
    
    var x1=x-this.x
    var y1=y-this.y
    
    var lent = letn(x1,y1)
    x1=x1/lent
    y1=y1/lent
    let m1 = y1/x1
    let b1 = -x1*m1+y1
    var x2=xx-this.x
    var y2=yy-this.y
    lent = letn(x2,y2)
    x2=x2/lent
    y2=y2/lent
    let m2 = y2/x2
    let m3 = -1/m1
    if(m1==0){
      if(m2==0){
        if(x1==x2){
          this.rotation=this.rotation
        }else{
          this.rotation=this.rotation+PI
        }
        return
      }else if(x2==0){
        if(y2>0){
          this.rotation=this.rotation+PI/2
        }else{
          this.rotation=this.rotation-PI/2
        }
        return
      }
    }
    if(m3==0){
      if(m2==0){
        if(x2>0){
          this.rotation=this.rotation+PI/2
        }else{
          this.rotation=this.rotation-PI/2
        }
        return
      }else if(x2==0){
        
        if(y1==y2){
          this.rotation=this.rotation
        }else{
          this.rotation=this.rotation+PI
        }
        return
      }
    }
    
    let b3 = -x2*m3+y2
    let x4 = (b1-b3)/(-m1+m3)
    let y4 = b3+m3*x4
    var angle= (m2-m1)*atan(letn(x2-x4,y2-y4)/letn(x4,y4))/abs(m2-m1)
    if(isNaN(angle)){
      return
    }
    this.rotation=this.rotation+angle
      
    if(this.rotation>=2*PI){
      this.rotation=this.rotation-2*PI
    }
    if(this.rotation<0){
      this.rotation=this.rotation+2*PI
    }
  }

{{< /highlight >}}
{{< /details >}}

- La funcion move es un movimiento relativo (desde donde se encuentra) de la figura segun los parametros que se le dan.
- La funcion escalat escala el ancho y alto de la figura, aumentandolo entre mas se aleja de la figura y reduciendolo entre mas se acerca, teniendo como referencia el punto inicial de escalado.
- La funcion rotate gira la figura segun los puntos inicial y final dados del mouse, funcionando como si la figura tuviera un disco alrededor.


Los Metodos addKeyFram() y deleteKeyFram() permiten agregar o eliminar respectivamente el KeyFrame actual, guardando las variables que tiene la figura actualmente y ordenando los keyFrames o eliminando el KeyFrame de existir en esa instancia de Tiempo.

La linea de tiempo interactua directamente con la funcion changeTime(), la cual utiliza el metodo keyss() como apoyo para conseguir los valores que debe tener la figura en esa instancia de tiempo, y la misma se apoya middle() que calcula los valores en un tiempo usando la razon de cambio de dos keyFrames.

{{< details title="changeTime" open=true >}}
{{< highlight js >}}

changeTime(Time){
    let keya = this.kisy(this.time)
    
    if(keya != null){
      this.keyFrames[keya[0]]=[this.time,this.x,this.y,this.w,this.h,this.rotation]
    }
    let key = this.keyss(Time)
    //print(key)
    this.x = key[0]
    this.y = key[1]
    this.w = key[2]
    this.h =key[3]
    this.rotation = key[4]
    this.time=Time
  }
{{< /highlight >}}
{{< /details >}}

Lo primero que realiza changeTime es revisar si estamos en un keyFrame, y de ser asi actualiza el keyFrame para que guarde las modificaciones hechas.
Luego le pide a keyss las variables para el tiempo que se va a pasar y reemplaza las variables de la figura con ellos, junto con la actualizacion del tiempo actual.

{{< details title="keyss" open=true >}}
{{< highlight js >}}
keyss(timees){
    if(this.keyFrames.length==1){
      return this.keyFrames[0].slice(1);
    }else{
      let up, down;
      up= []
      down = this.keyFrames[0]
      if(this.keyFrames[0][0]>timees){
        return this.keyFrames[0].slice(1);
      }
      for(var i = 1; i<this.keyFrames.length;i++){
        if(this.keyFrames[i][0]==timees){
          return this.keyFrames[i].slice(1);
        }else if(this.keyFrames[i][0]<timees){
           down = this.keyFrames[i]
        }else{
           up = this.keyFrames[i]
          return this.middle(down,up,timees)
        }
      }
        return down.slice(1)
    }
  }

{{< /highlight >}}
{{< /details >}}

keyss tiene un  caso especial ademas del utilizado en caso de que solo exista un keyFrame, que ocurre cuando el tiempo actual es menor a el primer keyFrame, en ese caso devuelve ese keyFrame, en cualquier otro caso simplemente encuentra los keyFrames que rodean esa zona de tiempo (o el keyFrame de ese frame de existir) y retorna su razon por medio de middle.


{{< details title="middle" open=true >}}
{{< highlight js >}}

  middle(down,up,timees){
    let difTim = up[0]-down[0];
    let dx = (up[1]-down[1])/difTim
    let dy = (up[2]-down[2])/difTim
    let dw = (up[3]-down[3])/difTim
    let dh = (up[4]-down[4])/difTim
    let dr = (up[5]-down[5])/difTim
    let timb=timees-down[0]
    return [down[1]+dx*timb,down[2]+dy*timb,down[3]+dw*timb,down[4]+dh*timb,down[5]+dr*timb]
  }
{{< /highlight >}}
{{< /details >}}

middle() es una funcion que recibe cada variable consigue su razon de cambio, y retorna el valor base (el del keyFrame de inicio) agregandole la razon sobre el tiempo extra entre el inicial y el actual.

El resto de codigo es la lectura del mouse y otraas variables globales para interactuar con la figura.

{{< hint danger >}}
**Valores Perdidos**  
Notece que cuando se realizan modificaciones en un frame que no es keyFrame y nos desplazamos a otro frame, estos cambios se pierden debido a que no hay ninguna transicion que ocurra con esos datos, si en cambio modificamos un keyFrame o creamos uno nuevo con los cambios, estas modificaciones seran notables con sus transiciones en la linea del tiempo
{{< /hint >}}


## Resultado

{{< p5-iframe sketch="/visualcomp/sketches/KeyFrames.js" width="440" height="640" >}}

## Conclusiones
- La coherencia temporal permite a una animacion tener la coherencia necesaria para sentirla como una unidad.
- Los keyFrames son muy utiles en casi cualquier animacion por que dan una perspectiva de lo que se busca conseguir.


## Trabajos Futuros

Aunque es bastante completa la interaccion de la figura, aun es posible agregarle diversas cosas, ya sea que permitan facilitar la interaccion como una mejor forma de seleccionar o ver los keyFrames, hasta la posibilidad de manipular varias figuras a la vez para crear animaciones mas complejas.

### Extra

La animacion de la gota del kinegram en esta apliacion


{{< p5-iframe sketch="/visualcomp/sketches/KeyFrames2.js" width="440" height="640" >}}

## Resources

- [Guia y Ejercicio](https://visualcomputing.github.io/docs/visual_illusions/temporal_coherence/)

- [Frame](https://es.wikipedia.org/wiki/Fotograma)

- [KeyFrames](https://en.wikipedia.org/wiki/Key_frame)

- [nub library](https://github.com/VisualComputing/nub/blob/master/examples/basics/KeyFrames/KeyFrames.pde)


