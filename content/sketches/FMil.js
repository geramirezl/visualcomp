var angs,lines,xx,yy,len,cLen,moves,speeds,alphass,figse,figso;

function setup() {
  createCanvas(400, 400);
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
  figui = createCheckbox('Figure', false);
  
  figui.changed(Figs);
  figui.position(0,height-figui.size().height);
  figui.style('color','white');
  
  figguis = createCheckbox('Fondo', true);
  figguis.changed(Figso);
  figguis.position(0,height-figui.size().height*2);
  figguis.style('color','white');
  
  alphass=createSlider(0, 100, 0,2);
  alphass.position(width-alphass.size().width,height-alphass.size().height);
  
  lineU = createButton('+line') ;
  lineD = createButton('-line') ;
  
  lineU.position(0,0);
  lineD.position(width-lineD.size().width,0);
  lineU.mousePressed(LineUp);
  lineD.mousePressed(LineDown);
  stroke(100);
  noFill();
  colorMode(RGB,100)
  
}

function draw() {
  background(0);
  beginShape();
  texti();
  if(figso){
    stroke(100);
  }else{
    noStroke()
  }
  noFill();
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

function texti(){
  noStroke()
  fill(50);
  rect(width-alphass.size().width,height- alphass.size().height*2,alphass.size().width,alphass.size().height*3)
  textSize(13);
  fill(255);
  text('Color', width-alphass.size().width,height- alphass.size().height*2);
}