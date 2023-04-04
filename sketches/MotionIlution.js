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