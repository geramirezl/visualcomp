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
  
  figi = new Fig(200,0,150,25,0,1);
  figi.keyFrames.push([25,200,50,50,100,0])
  figi.keyFrames.push([65,200,500,50,100,0])
  figi.keyFrames.push([70,200,535,200,25,0])
  figi.keyFrames.push([80,200,500,75,75,0])
  
  fill(255);
  Ation = false;
  divv = 1
  timeline = new Slider('',1,height-60,0,100,0,divv);
  timeline.colore = color(255,255,255)
  timeline.mousePressed(chaTime);
  timeline.w=width-2
  keyFrma = [0,25,65,70,80]
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
