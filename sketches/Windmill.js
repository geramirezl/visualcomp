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