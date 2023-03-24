var angs,lines,xx,yy,len,cLen,moves,speeds,figse,figso,alphass,figui,figguis,lineU,lineD;

function setup() {
   createCanvas(500-50, 500);
  
  moves=0;
  way=false;
  angs=0;
  lines=1;
  updateAng();
  xx=width/2;
  yy=height/2;
  len=min(height,width)/10*4;
  cLen=len/10;
  speeds=2;
  figse = false;
  figso = true;
  figui = new CheckBox('Figure',0,height-20, false);
  
  figui.changed(Figs);
  figui.color(color(255,255,255));
  
  figguis = new CheckBox('Fondo',0,height-40, true);
  figguis.changed(Figso);
  figguis.color(color(255,255,255));
  
  alphass=new Slider('Color',width-100,height-50,0, 100, 0,2);
  lineU = new   Button('+line',0,0) ;
  lineD = new Button('-line',0,20)
  
  lineU.mousePressed(LineUp);
  lineD.mousePressed(LineDown);
  stroke(100);
  noFill();
  colorMode(RGB,100)
  
}

function draw() {
  background(0);
  beginShape();
  if(figso){
    stroke(100);
  }else{
    noStroke()
  }
  noFill()
  for(var i=0;i<lines*2;i++){
    if(lines==1){
      break;
    }
    xy=rectar(angs*i,len);
    strokeWeight(4);
    vertex(xx+xy[0],yy+xy[1]);
  }
  endShape(CLOSE);
  for(var i=0;i<lines;i++){
    xy=rectar(angs*i,len);
    strokeWeight(1);
    liner(xy);
  }
  if(figse){
     beginShape()
    if(figso){
      stroke(100,100,100,50);
    }else{
      noStroke()
    }
    strokeWeight(1);
    
    fill(100,100,100,50);
    for(var i=0;i<lines;i++){
      xy=rectar(angs*i,len);

      Fig(xy,PI/2+(i)/lines*PI);
    }
    endShape(CLOSE);
  }
  
  strokeWeight(3);
  stroke(100);
  for(var i=0;i<lines;i++){
    xy=rectar(angs*i,len);
    ciclers(xy,PI/2+(i)/lines*PI);
  }
  
  
  cicles()
  buttons()
}


function buttons(){
  alphass.draw();
  figui.draw();
  figguis.draw();
  lineU.draw();
  lineD.draw();
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

function mouseReleased(){
  alphass.released();
  figui.released();
  figguis.released();
  lineU.released();
  lineD.released();
}

function mousePressed(){
  alphass.Pressed();
  figui.Pressed();
  figguis.Pressed();
  lineU.Pressed();
  lineD.Pressed();
  
}

function mouseDragged(){
  alphass.Dragged()
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
    text('Color', this.x,this.y+this.h/5*2);
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


