let colorShader;

function preload(){
  colorShader = readShader('ColorBlending.frag', { varyings: Tree.color4 });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  shader(colorShader);
  colorPicker1 = createColorPicker('#ed225d');
  colorPicker1.position(0, height + 5);
  colorPicker2 = createColorPicker('#ed225d');
  colorPicker2.position(100, height + 5);
}



function draw() {
  print(colorPicker1.color()._array)
  colorShader.setUniform('uMaterial1', colorPicker1.color()._array);
  colorShader.setUniform('uMaterial2', colorPicker2.color()._array);
  rect(0,0,100,100)
}