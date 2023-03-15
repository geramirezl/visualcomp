---
title: Gabriel Ramirez
type: docs
---
# Gabriel Ramirez Leon


## Quien Soy
Soy un Estudiante de Ingeniería de Sistemas y Computación de la Universidad Nacional de Colombia. 
Tengo 24 años y practico artes marciales.

## Ilusion visual

La ilusion es un espiral que se crea al trasladar varios cuadrados con el mismo centro de masa y de diferente tamaño.


{{< details title="Código" open=false >}}
{{< highlight js >}}
function setup() {
    createCanvas(500,500);
    rectMode(CENTER);
    
    sliderX=30;
    sliderY=20;
  }
  
  function draw() {
    background(150);
  
    
    noFill();
    translate(width/2,height/2);
    for(let x=420; x>= 40; x = x/1.08 ){
      rotate(radians(frameCount/2));
      fill(sliderY,40);
      rect(0,0,x,x);
    }
  }
{{< /highlight >}}
{{< /details >}}
{{< p5-iframe sketch="/visualcomp/sketches/GRil.js" width="500" height="500" >}}

