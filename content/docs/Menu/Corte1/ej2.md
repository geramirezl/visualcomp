# Ejercicio 2

Implement a color mapping application that helps people who are color blind see the colors around them.

## Mapping Application


{{< details title="Código" open=false >}}
{{< highlight js >}}

/* 
  Code based in the following articles:

https://dl.acm.org/doi/10.1145/1240624.1240855
https://sci-hub.se/10.1145/1240624.1240855
https://www.irjet.net/archives/V7/i5/IRJET-V7I5687.pdf
http://vision.psychol.cam.ac.uk/jdmollon/papers/colourmaps.pdf
http://scien.stanford.edu/class/psych221/projects/05/ofidaner/project_report.pdf

*/


// https://dl.acm.org/doi/10.1145/1240624.1240855
// https://sci-hub.se/10.1145/1240624.1240855
// https://www.irjet.net/archives/V7/i5/IRJET-V7I5687.pdf
// http://vision.psychol.cam.ac.uk/jdmollon/papers/colourmaps.pdf

  /*
Color.Vision.Daltonize : v0.1
------------------------------
"Analysis of Color Blindness" by Onur Fidaner, Poliang Lin and Nevran Ozguven.
http://scien.stanford.edu/class/psych221/projects/05/ofidaner/project_report.pdf
"Digital Video Colourmaps for Checking the Legibility of Displays by Dichromats" by FranÃ§oise
ViÃ©not, Hans Brettel and John D. Mollon
http://vision.psychol.cam.ac.uk/jdmollon/papers/colourmaps.pdf
*/


let CVDMatrix;

let cvdi;
let cvdi_a;
let cvdi_b;
let cvdi_c;
let cvdi_d;
let cvdi_e;
let cvdi_f;
let cvdi_g;
let cvdi_h;
let cvdi_i;

let cvdd;
let cvdd_a;
let cvdd_b;
let cvdd_c;
let cvdd_d;
let cvdd_e;
let cvdd_f;
let cvdd_g;
let cvdd_h;
let cvdd_i;

let cvdt;
let cvdt_a;
let cvdt_b;
let cvdt_c;
let cvdt_d;
let cvdt_e;
let cvdt_f;
let cvdt_g;
let cvdt_h;
let cvdt_i;

let myImage;
let myImageD;
let myImageT;
let input;
let flag; // to verify if it already made the calculations

let L, M, S, l, m, s, R, G, B, RR, GG, BB;
let ld, md, sd, Rd, Gd, Bd, RRd, GGd, BBd;
let lt, mt, st, Rt, Gt, Bt, RRt, GGt, BBt;


function setup() {
  
  flag = false;
  
  CVDMatrix = {
  // Color Vision Deficiency
  "Protanope": [
    // reds are greatly reduced (1% men)
    0.0, 2.02344, -2.52581, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0,
  ],
  "Deuteranope": [
    // greens are greatly reduced (1% men)
    1.0, 0.0, 0.0, 0.494207, 0.0, 1.24827, 0.0, 0.0, 1.0,
  ],
  "Tritanope": [
    // blues are greatly reduced (0.003% population)
    1.0, 0.0, 0.0, 0.0, 1.0, 0.0, -0.395913, 0.801109, 0.0,
  ],
};

  cvdi = CVDMatrix.Protanope;
  cvdi_a = cvdi[0];
  cvdi_b = cvdi[1];
  cvdi_c = cvdi[2];
  cvdi_d = cvdi[3];
  cvdi_e = cvdi[4];
  cvdi_f = cvdi[5];
  cvdi_g = cvdi[6];
  cvdi_h = cvdi[7];
  cvdi_i = cvdi[8];
  
  cvdd = CVDMatrix.Deuteranope;
  cvdd_a = cvdd[0];
  cvdd_b = cvdd[1];
  cvdd_c = cvdd[2];
  cvdd_d = cvdd[3];
  cvdd_e = cvdd[4];
  cvdd_f = cvdd[5];
  cvdd_g = cvdd[6];
  cvdd_h = cvdd[7];
  cvdd_i = cvdd[8];
  
  cvdt = CVDMatrix.Tritanope;
  cvdt_a = cvdt[0];
  cvdt_b = cvdt[1];
  cvdt_c = cvdt[2];
  cvdt_d = cvdt[3];
  cvdt_e = cvdt[4];
  cvdt_f = cvdt[5];
  cvdt_g = cvdt[6];
  cvdt_h = cvdt[7];
  cvdt_i = cvdt[8];
  
  input = createFileInput(handleFile);
  input.position(0, 0);
  createCanvas(2000, 2000);
}

function draw(){
  if(myImage && !flag){
    background(255)
     // resizeCanvas(myImage.width, myImage.height * 2, false);
     myImage.loadPixels();
     myImageD.loadPixels();
     myImageT.loadPixels();
     image(myImage, 0, 0);
    
     for (var i = 0; i < myImage.pixels.length; i += 4) {
    
        var r = myImage.pixels[i];
        var g = myImage.pixels[i + 1];
        var b = myImage.pixels[i + 2];

        // RGB to LMS matrix conversion
        L = (17.8824 * r) + (43.5161 * g) + (4.11935 * b); 
        M = 3.45565 * r + 27.1554 * g + 3.86714 * b;
        S = 0.0299566 * r + 0.184309 * g + 1.46709 * b;
       
        l = cvdi_a * L + cvdi_b * M + cvdi_c * S;
        m = cvdi_d * L + cvdi_e * M + cvdi_f * S;
        s = cvdi_g * L + cvdi_h * M + cvdi_i * S;
        
        ld = cvdd_a * L + cvdd_b * M + cvdd_c * S;
        md = cvdd_d * L + cvdd_e * M + cvdd_f * S;
        sd = cvdd_g * L + cvdd_h * M + cvdd_i * S;
       
        lt = cvdt_a * L + cvdt_b * M + cvdt_c * S;
        mt = cvdt_d * L + cvdt_e * M + cvdt_f * S;
        st = cvdt_g * L + cvdt_h * M + cvdt_i * S;

        // LMS to RGB matrix conversion
        R = 0.0809444479 * l + -0.130504409 * m + 0.116721066 * s;
        G = -0.0102485335 * l + 0.0540193266 * m + -0.113614708 * s;
        B = -0.000365296938 * l + -0.00412161469 * m + 0.693511405 * s;
       
        Rd = 0.0809444479 * ld + -0.130504409 * md + 0.116721066 * sd;
        Gd = -0.0102485335 * ld + 0.0540193266 * md + -0.113614708 * sd;
        Bd = -0.000365296938 * ld + -0.00412161469 * md + 0.693511405 * sd;
       
        Rt = 0.0809444479 * lt + -0.130504409 * mt + 0.116721066 * st;
        Gt = -0.0102485335 * lt + 0.0540193266 * mt + -0.113614708 * st;
        Bt = -0.000365296938 * lt + -0.00412161469 * mt + 0.693511405 * st;
       
       

        // Isolate invisible colors to color vision deficiency (calculate error matrix)
        R = r - R;
        G = g - G;
        B = b - B;
       
        Rd = r - Rd;
        Gd = g - Gd;
        Bd = b - Bd;
       
       
        Rt = r - Rt;
        Gt = g - Gt;
        Bt = b - Bt;

        // Shift colors towards visible spectrum (apply error modification)
        RR = 0.0 * R + 0.0 * G + 0.0 * B;
        GG = 0.7 * R + 1.0 * G + 0.0 * B;
        BB = 0.7 * R + 0.0 * G + 1.0 * B;
       
        RRd = 0.0 * Rd + 0.0 * Gd + 0.0 * Bd;
        GGd = 0.7 * Rd + 1.0 * Gd + 0.0 * Bd;
        BBd = 0.7 * Rd + 0.0 * Gd + 1.0 * Bd;
       
        RRt = 0.0 * Rt + 0.0 * Gt + 0.0 * Bt;
        GGt = 0.7 * Rt + 1.0 * Gt + 0.0 * Bt;
        BBt = 0.7 * Rt + 0.0 * Gt + 1.0 * Bt;

        // Add compensation to original values
        R = RR + r;
        G = GG + g;
        B = BB + b;
       
        Rd = RRd + r;
        Gd = GGd + g;
        Bd = BBd + b;
      
       
        Rt = RRt + r;
        Gt = GGt + g;
        Bt = BBt + b;
      
        // Clamp values
        if (R < 0) R = 0;
        if (R > 255) R = 255;
        if (G < 0) G = 0;
        if (G > 255) G = 255;
        if (B < 0) B = 0;
        if (B > 255) B = 255;
       
        if (Rd < 0) Rd = 0;
        if (Rd > 255) Rd = 255;
        if (Gd < 0) Gd = 0;
        if (Gd > 255) Gd = 255;
        if (Bd < 0) Bd = 0;
        if (Bd > 255) Bd = 255;
        
        if (Rt < 0) Rt = 0;
        if (Rt > 255) Rt = 255;
        if (Gt < 0) Gt = 0;
        if (Gt > 255) Gt = 255;
        if (Bt < 0) Bt = 0;
        if (Bt > 255) Bt = 255;

        
        myImage.pixels[i] = R >> 0;
        myImage.pixels[i + 1] = G >> 0;
        myImage.pixels[i + 2] = B >> 0;  
       
         
        myImageD.pixels[i] = Rd >> 0;
        myImageD.pixels[i + 1] = Gd >> 0;
        myImageD.pixels[i + 2] = Bd >> 0;  
       
        myImageT.pixels[i] = Rt >> 0;
        myImageT.pixels[i + 1] = Gt >> 0;
        myImageT.pixels[i + 2] = Bt >> 0;  
    }
    
    myImage.updatePixels();
    myImageD.updatePixels();
    myImageT.updatePixels();
    
    image(myImage, myImage.width, 0);
    image(myImageD, myImage.width, myImage.height);
    image(myImageT, myImage.width, myImage.height * 2);
    flag = true;
  }
}

function handleFile(file) {
  if (file.type === 'image') {
    myImage = loadImage(file.data);
    myImageD = loadImage(file.data);
    myImageT = loadImage(file.data);
  } else {
    myImage = null;
  }
  flag = false;
  
}





{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/visualcomp/sketches/ColorBlindness.js" width="2000" height="2000" >}}