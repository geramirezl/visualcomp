var cols, fils;
var escala;
var high1,high2;
var yep;

function setup() {
  createCanvas(400, 400, WEBGL);
  resizeCanvas(windowWidth, windowHeight);
  lado= 3000;
  fondo = 1000;
  escala = 50;
  cols = fondo/escala;
  fils = lado/escala;
  yep=0;
}

var avance2= 0.05;
function draw() {
  background(0);
  translate(-width/2-1100,-height/2,-300);
  rotate(PI/4, [1,0,0])
  stroke(255);
  noFill();
  high1 = deep(0,yep);
  planess(high1);
  yep=yep-avance2;
}


function planess(highh){
  
  for(var y=0; y< cols-1;y++){
    beginShape(TRIANGLE_STRIP);
    for(var x=0; x< fils;x++){
      vertex(x*escala,y*escala,highh[x][y]);
      vertex(x*escala,(y+1)*escala,highh[x][y+1]);
    }
    endShape();
  }
}

var avance = 0.3;
var distTerrain = 200;

function deep(xIn,yIn){
  higs = [];
  for(var x=0; x< fils;x++){
    higs[x] = [];
    for(var y=0; y< cols;y++){
      higs[x][y]= map(noise(xIn+x*avance,yIn+y*avance), 0,1,0, distTerrain);
    }
  }
  return higs;
}