let table,car,backgro;
let refy,refA;
let backy;
let backx;
let mode,visu;
function preload() {
  table = loadImage('/tables.png');
  car = loadImage('/car1.png');
  backgro = loadImage('/car2.png');
  
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
