let colorShader;

function preload(){
  colorShader = readShader('shader.frag', { varyings: Tree.color4 });
}

function setup() {
  createCanvas(100, 100, WEBGL);
  shader(colorShader);
  colorPicker1 = createColorPicker('#FF0000');
  colorPicker1.position(0, height + 10);
  colorPicker2 = createColorPicker('#0007FF');
  colorPicker2.position(50, height + 10);
}

function draw() {
  colorShader.setUniform('uMaterial1', colorPicker1.color()._array);
  colorShader.setUniform('uMaterial2', colorPicker2.color()._array);
  rect(20, 20, 60, 60)
}