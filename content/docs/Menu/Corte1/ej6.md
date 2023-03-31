# Ejercicio 6

Implement an animation with keyframes.


## Introducción

## Transfondo o Teoria

### Kineograph or flipbook



{{< p5-global-iframe id="bands" width="440" height="440" >}}

let vid;
function setup() {
  noCanvas();

  vid = createVideo(
    ['sketches/animation.mkv'],
    vidLoad
  );

  vid.size(400, 400);
}

// This function is called when the video loads
function vidLoad() {
  vid.loop();
  vid.volume(0);
}
{{< /p5-global-iframe >}}

## Temporal Coherence 

Temporal coherence is the visual phenomenon present all across nature whereby the perceived color of a given point within a region of interest tend to vary more according to the elapsed time passed between two given moments.
{{< hint info >}}
**KeyFrames**  
Los KeyFrames, o frames clave son puntos en la animacion que marcan el inicio y el final de una transicion, siendo la transicion que vera el espectador la variacion de un key frame a otro, llenando de pormedio la transicion con frames conocidos como "inbetweens".
{{< /hint >}}


### Descripcion de la animacion

teniendo una figura que comienza en el keyFrame 0, se movera a travez de la linea del tiempo variando sus caracteristicas para igualar las determinadas en los keyframes siguientes. Utilizar el boton Run permite mostrar como se ve las transiciones permanentemente

{{< hint warning >}}
**Run y Botones l**  
No se recomienda realizar cambios a la figura mientras la animacion esta corriendo, debido a que no sera facil de controlar o percibir los mismos
tambien se a de mencionar los botones l+ y l- varian la figura que se esta animando, siendo constante durante toda la animacion.
{{< /hint >}}

{{< hint danger >}}
**Valores Perdidos**  
Notece que cuando se realizan modificaciones en un frame que no es keyFrame y nos desplazamos a otro frame, estos cambios se pierden debido a que no hay ninguna transicion que ocurra con esos datos, si en cambio modificamos un keyFrame o creamos uno nuevo con los cambios, estas modificaciones seran notables con sus transiciones en la linea del tiempo
{{< /hint >}}

### valores variables

la posicion de la figura en el plano x,y; su tamaño en ancho y largo; su angulo de rotacion; estas son las variables que pueden variar entre un y otro keyFrame

{{< hint info >}}
**Botones**  
Los primeros 3 botones Rot, Esc, Pos, permiten designar la variable a modificar al arrastrar el mouse
{{< /hint >}}

### Manipulacion de KeyFrames

Para modificar un KeyFrame debemos ubicarnos sobre el mismo, toda modificacion que se realice sobre un keyframe quedara guardada en el mismo, tambien es posible guardar cambios en un no keyFrame volviendolo un keyFrame sinn mover la linea del tiempo. Por ultimo es posible eliminar los keyFrames existentes utilizando el mismo concepto, eliminaras solamente el keyFrame existente en el mismo punto donde esta la linea del tiempo

{{< hint info >}}
**Botones**  
Los  botones del y add permiten borrar y añadir keyFrames respectivamente
{{< /hint >}}

{{< details title="Código" open=false >}}
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
  divv = 0.5
  timeline = new Slider('',0,height-60,0,100,0,divv);
  timeline.colore = color(255,255,255)
  timeline.mousePressed(chaTime);
  timeline.w=width
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
    fill(255)
    rotate(this.rotation)
    noStroke()
    beginShape()
    

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
      //print(this.keyFrames[0])
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
      this.keyFrames.push([time,this.x,this.y,this.w,this.h,this.rotation])
      this.keyFrames.sort()
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
    print(this.rotation,angle)
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
  for(var i = 0; i<keyFrma.length;i++){
    let col = map(keyFrma[i],0,100,0,255)
    let xx = map(keyFrma[i],0,100,0,width)
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
      var bart = 255
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
    keyFrma.push(choice)
    keyFrma.sort()
  }
}


{{< /highlight >}}
{{< /details >}}
{{< p5-iframe sketch="/visualcomp/sketches/KeyFrames.js" width="420" height="620" >}}