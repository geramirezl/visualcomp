# 3D proyect transformacion espacial

## Introducción

El manejo de espacios 3d permite elaborar animaciones y diversos procesos complejos de manera mucho mas simple y detallada, con un mayor control del mismo

## Teoria y Transfondo

La teoria utilizada fue la mencionada en clase, sobre el picking de las librerias treegl, los arboles de posicionamiento utilizando push and pop para varias la posicion relativa,  los materiales utilizables, y las figuars disponibles dentro de p5.

### posicionamiento relativo

nos permite variar las posiciones y ubicaciones desde nuevos puntos de referencia, como todo lo que hay dentro del tren se mueve con el, el tren es un propio punto de referencia para ellos aunque desde afuera se ve que se afecta por mas cosas su ubicacion.

### materiales

los materiales que se llegaron a poner utilizar y sus mezclas son los ambientales, que trabajan con la teoria de color basica, dales luz blanca y rebotaran solo una cantidad especifica, mezclandose con la luz, los emissivos que no se ven afectados por esta, y los especulares que al ser atacados por luz directa y no global la reflejan.


## Codigo

El codigo esta dividido en varios archivos, pero aqui se agrupo en uno, dividiendo las clases, la basica con el setup y el draw, un controlador que manipula las interacciones con el mouse y la interfaz de usuario o HUD, la clase nivel que determina como es la estructura utilizada, o lo que se muestra y sus reglas, data para guardar todo lo realizado en el juego hasta ahora, yla clase item, con sus extensiones (n llegaron a implementarse) que es lo q ue permite la creacion facil y directa de los arboles y ramas del mismo objeto con el mundo y el usuario, con todos sus valores y materiales

{{< details title="codigo completo" open=false >}}
{{< highlight js >}}

class Datat{
  
  constructor(){
    this.items1=[]
    this.items2=[]
    this.items3=[]
    this.items4=[]
    this.levellist = [["mesaPlant",[["maceta",["plant"]],["caja fosforos"],[],["cuchara"],[]]],["reloj",[0,0]],[["telefono"]],[["chimenea",[]],["cuadro",[["hueco",[]],["foto"],["up",0]]],["radio",["pieza"]]],[["cortinas",1],["ventana",["pieza"]],["interruptor"],["jaula",["harvey",0],["comedero",0]]],[["arriba",["lavamos",["fregadero",0],["vaso",0],["estufa",0]],["puertadere",0,["olla"]],["puertadere",0,["alimento para aves"],["leño"]]]],[["luz",0],"pieza"]]
  }
  
}

class Item {
  
  constructor(position, rotation,size, object,father,ambi,emissiv,espec){
    this.position = position
    this.rotation = rotation
    this.object = object
    this.size = size
    this.father = father
    this.sons = []
    if(father != null){
      this.father.addSons([this])
    }
    this.ambi = ambi
    this.emissiv = emissiv
    this.espec = espec
    
  }
  
  draw(controler){
    push()
    translate(this.position)
    rotateX(this.rotation.x)
    rotateY(this.rotation.y)
    rotateZ(this.rotation.z)
    
    
    if(this.ambi != null){
      ambientMaterial(this.ambi)  
    }else{
      ambientMaterial(0)
    }
    
    if(this.emissiv != null){
      emissiveMaterial(this.emissiv)  
    }else{
      emissiveMaterial(0)
    }
    
    
    
    if(this.espec != null){
      specularMaterial(this.espec)  
    }else{
      specularMaterial(0)
    }
    
    switch(this.object){
      case "box":
        box(this.size[0],this.size[1],this.size[2])
        break;
      case "plane":
        plane(this.size[0],this.size[1])
        break;
      case "sphere":
        sphere(this.size[0])
        break;
      case "cylinder":
        cylinder(this.size[0],this.size[1])
        break;
      case "torus":
        torus(this.size[0],this.size[1])
        break;
      case "cone":
        cone(this.size[0],this.size[1])
        break;
      case "ellipsoid":
      ellipsoid(this.size[0],this.size[1],this.size[2])
        break;
      case "inBox":
        ambientMaterial(100,100,200)
        translate(0,0,-this.size[2]/2)
        plane(this.size[0],this.size[1])
        translate(0,0,this.size[2]/2)
        rotateY(PI/2)
        ambientMaterial(100,200,100)
        translate(0,0,-this.size[0]/2)
        plane(this.size[2],this.size[1])
        translate(0,0,this.size[0]/2)
        rotateY(PI/2)
        ambientMaterial(200,100,100)
        translate(0,0,-this.size[2]/2)
        plane(this.size[0],this.size[1])
        translate(0,0,this.size[2]/2)
        rotateY(PI/2)
        ambientMaterial(100,200,200)
        translate(0,0,-this.size[0]/2)
        plane(this.size[2],this.size[1])
        translate(0,0,this.size[0]/2)
        rotateY(PI/2)
        rotateX(PI/2)
        ambientMaterial(100)
        translate(0,0,-this.size[1]/2)
        plane(this.size[0],this.size[2])
        translate(0,0,this.size[1]/2)
        rotateX(PI)
        ambientMaterial(220)
        translate(0,0,-this.size[1]/2)
        plane(this.size[0],this.size[2])
        translate(0,0,this.size[1]/2)
        rotateX(PI/2)
        break;
      case "":
        
        break;
      default:
        scale(this.size)
        model(this.object)
        break;
        
    }
    this.sons.forEach(son => son.draw(controler) )
    pop()
  }
  
  addSons(sons){
    this.sons = this.sons.concat(sons)
    print(this.sons)
  }
  clicks(controller){
    if(controller.valid){
      if(pointerPicking(controler.mousyX,controler.mousyY,{size: this.size[0],
                     shape: Tree.CIRCLE}
                   )){
      }else{
      
      }
    }
  }
  
  
  
}


class Level{
  constructor(){
    this.level=0
    this.Room = null
    
    this.data = new Datat()
    this.levelinventory = []
    this.levelSetup = null
    this.initialitation(0)
  }
  
  initialitation(number){
    switch(this.level){
      case 0:
        
      break;
      case 1:
        this.data.items1 = this.levelinventory
      break;
      case 2:
        this.data.items2 = this.levelinventory
      break;
      case 3:
        this.data.items3 = this.levelinventory
      break;
      case 4:
        this.data.items4 = this.levelinventory
      break;
    }
    
    
    
    switch(number){
        case 0:
        
      break;
      case 1:
        this.levelinventory = this.data.items1
      break;
      case 2:
        this.levelinventory = this.data.items2
      break;
      case 3:
        this.levelinventory = this.data.items3
      break;
      case 4:
        this.levelinventory = this.data.items4
      break;
    }
    this.level = number
    
    this.loadCube();
    
    
  }
  
  loadCube(){
    this.Room = new Item(createVector(0,0,0), createVector(0,0,0),[400,250,400], "inBox",null,null,null,null)
    let bos = new Item(createVector(175,100,0), createVector(0,PI/360,0),[50,25,50], "",this.Room,null,null,null)
    
    let mesa = new Item(createVector(0,0,0), createVector(0,0,0),[50,25,50], "box",bos,color(150,100,100),null,null)
    
    let madera = new Item(createVector(0,-10,0), createVector(0,0,0),[75,15,75], "box",bos,color(200,200,100),null,null)
    
    let lamp = new Item(createVector(0,-25,0), createVector(0,0,0),[0,0,0], "",madera,null,null,null)
    
    let base = new Item(createVector(0,0,0), createVector(0,0,0),[15,25,15], "ellipsoid",lamp,color(0,255,0),null,null)
    
    let lit = new Item(createVector(0,-25,0), createVector(PI/2,PI/2,PI/2),[25,50,25], "cone",lamp,null,color(0,255,0),null)
    
  }
  



  draw(controler){
    if(this.Room != null){
      this.Room.draw(controler)
    }
    
    
  }
  
  clicks(controler){
    if(this.Room != null){
      this.Room.clicks(controler)
    }
    
    
  }
  
  
  
  
}


class SceneControl{
  constructor(){
    this.delay = 0
    this.changingScene = false
    this.actScene = 0
    this.nextScene = 0
    this.escenes = ['Start']
    this.escenesT = [[5]]
    this.cam1 = createCamera()
    this.mousyX = mouseX
    this.mousyY = mouseY
    this.xx = -0
    this.yy = -0
    this.zz = -10
    this.Levels= new Level()
    this.valid = false
    this.position = 0
    this.inventory = false
    
    setCamera(this.cam1)
    
    this.cam1.setPosition(-0,0,100)
    this.cam1.lookAt(0,0,0);
  }
  
  
  draw(){
    this.Levels.draw(this)
    //this.changeview();
    this.waiting()
    this.mouseControl();
    
    this.Levels.clicks(this)
  }
  
  changeScene(scene){
    var number = 0
    if(typeof scene == "string"){
      number = this.escenes.indexOf(scene)
    }else{
      number = scene
    }
    
  }
  
  waiting(){
    if(this.delay > 0){
      
    }
    //this.cam.pan(0.01)
    
    
  }
  
  
  
  mouseControl(){
    
    this.mousyX = this.mousyX + movedX
    this.mousyY = this.mousyY + movedY
    this.mousyX = this.mousyX>width-2?width:this.mousyX
    this.mousyY = this.mousyY>height-2?height:this.mousyY
    
    this.mousyX = this.mousyX<0?0:this.mousyX
    this.mousyY = this.mousyY<0?0:this.mousyY
    beginHUD();
    push()
    stroke(0);
    strokeWeight(2);
    fill(0)
    ambientMaterial(100);
    push()
    if(this.inventory){
      translate(-200,0)
    }
    rect(width-50,0,50,50);
    //triangle(width-50,0,50,50);
    
    
    fill(255);
    ambientMaterial(255);
    translate(this.mousyX,this.mousyY)
    beginShape();
    vertex(0,0)
    vertex(10,25)
    vertex(15,19)
    vertex(19,25)
    vertex(25,19)
    vertex(19,15)
    vertex(25,10)
    endShape(CLOSE);
    
    pop()
    noStroke();
    
    
    
    
    
    endHUD();
    noStroke();
    pointLight(250, 250, 250, this.mousyX,this.mousyY,0);
    
  }
  
  changeview(){
    let keye = 0
    if(keyIsDown(LEFT_ARROW)){
      keye = 1
    }else if(keyIsDown(RIGHT_ARROW)){
      keye = 3
      
    }else if(keyIsDown(UP_ARROW)){
      keye = 2
      
    }else if(keyIsDown(DOWN_ARROW)){
      keye = 0
      
    }else{
      return;
    }
    print(keye)
    if(this.position>4){
      if(this.position>=100){
        this.position = this.position-100;
      }else{
        let before = this.position-5;
        this.position = (before +4 - keye)%4
        
      }
    }else{
      switch(keye){
        case 1:
        this.position = this.position -2;
        if(this.position<0){
          this.position=this.position+4
        }
          
        case 3:
        this.position = this.position +1
        this.position = this.position % 4
        break;
        case 2:
        this.position = this.position +5
        break;
        
        
        
        }
    }
    
    print(this.position)
    
    switch(this.position){
      case 0:
        this.cam1.setPosition(-0,0,100)
        break;
      case 1:
        this.cam1.setPosition(-100,0,1)
        break;
      case 2:
        this.cam1.setPosition(0,0,-100)
        break;
      case 3:
        this.cam1.setPosition(100,0,1)
        break;
      default:
        this.cam1.setPosition(0,100,1)
        break;
    }
      
    print(this.position)
      
    this.cam1.lookAt(0,0,0);
    
    
    //this.cam1.setPosition(this.xx,this.yy,this.zz)
    
  }
  
}


let locked = false
function setup() {
  noStroke()
  createCanvas(700, 500, WEBGL);
  
  
  controler = new SceneControl()
  requestPointerLock();
}

function draw() {
  background(10);
  noStroke()
  lights();
  controler.draw()
  
  
}

function mouseClicked() {
  if (!locked) {
    locked = true;
    requestPointerLock();
  } else {
    exitPointerLock();
    locked = false;
  }
}
function mouseWheel() {
  //comment to enable page scrolling
  return false;
}


function keyPressed() {
  controler.changeview();
  return false;
}


{{< /highlight >}}
{{< /details >}}

## Resultado del codigo


en esta muestra del codigo se busca crear una habitacion cerrada con algunos items dentro, donde dependiendo de como se muevan con las teclas apunta a una pared, los items no fueron agregados por problemas con el modelador, pero se muestra como se manejan los colores desde la propia creacion del item, sin necesidad de configuracion extra.

cada objeto detecta cuando se le pone el mouse encima aunque no tienen actualmente una interaccion

{{< p5-iframe sketch="/visualcomp/sketches/CubeScape.js" width="740" height="540" >}}