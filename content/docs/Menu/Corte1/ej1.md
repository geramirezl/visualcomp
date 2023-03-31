# Ejercicio 1

Study, implement and discuss possible applications of some known visual phenomena and optical illusions.

## Ilusiones Opticas

### Introduccion

Una ilusión optica es una ilusión causada por el sistema visual y caracterizada por una percepción visual que parece diferir de la realidad. Pueden llegar a ser implementaciones simples de formas y figuras tanto como pueden a llegar complejas

### Simple

Dibujando lineas que disminuyen a un ritmo constante en un eje y aumentan de la misma manera en otro eje en un plano bidimensional nos brinda la ilusion de circularidad donde no existe tal 

{{< details title="Código" open=false >}}
{{< highlight js >}}

function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background(220);
      
      line(0, 0, 50, 400);
      line(0, 50, 100, 400);
      line(0, 100, 150, 400);
    line(0, 150, 200, 400);
    line(0, 200, 250, 400);
    line(0, 250, 300, 400);
    line(0, 300, 350, 400);
    line(0, 350, 400, 400);
      
  }

{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/visualcomp/sketches/OpticalIllusion.js" width="400" height="400" >}}

### Complex

Dibujar triangulos a distintas alturas dentro de un volumen nos brinda la sensacion de movimiento y profundidad si le anadimos "sombras"

{{< p5-iframe sketch="/visualcomp/sketches/FlyingFive.js" width="725" height="425" >}}