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