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


