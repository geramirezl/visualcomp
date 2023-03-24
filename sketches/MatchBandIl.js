function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  rectMode(CORNER)
  fill(50);
  rect(0,0,width,height/2);
  fill(150);
  rect(0,height/2,width,height/2);
  fill(100);
  rectMode(CENTER);
  rect(width/2,height/4,width/5,height/5);
  rect(width/2,height/4*3,width/5,height/5);
  rect(mouseX,mouseY,width/10,height/10);
}