
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

let type;
let amount;

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

let myImage;
let input;
let flag; // to verify if it already made the calculations

let L, M, S, Si, l, m, s, R, G, B, RR, GG, BB;


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
  
  type = 'Protanope';
  amount = 1.0;
  
  cvdi = CVDMatrix[type];
  cvdi_a = cvdi[0];
  cvdi_b = cvdi[1];
  cvdi_c = cvdi[2];
  cvdi_d = cvdi[3];
  cvdi_e = cvdi[4];
  cvdi_f = cvdi[5];
  cvdi_g = cvdi[6];
  cvdi_h = cvdi[7];
  cvdi_i = cvdi[8];
  
  input = createFileInput(handleFile);
  input.position(0, 0);
  createCanvas(600, 800);
}

function draw(){
  if(myImage && !flag){
     background(255)
     myImage.loadPixels();
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

        // LMS to RGB matrix conversion
        R = 0.0809444479 * l + -0.130504409 * m + 0.116721066 * s;
        G = -0.0102485335 * l + 0.0540193266 * m + -0.113614708 * s;
        B = -0.000365296938 * l + -0.00412161469 * m + 0.693511405 * s;

        // Isolate invisible colors to color vision deficiency (calculate error matrix)
        R = r - R;
        G = g - G;
        B = b - B;

        // Shift colors towards visible spectrum (apply error modification)
        RR = 0.0 * R + 0.0 * G + 0.0 * B;
        GG = 0.7 * R + 1.0 * G + 0.0 * B;
        BB = 0.7 * R + 0.0 * G + 1.0 * B;

        // Add compensation to original values
        R = RR + r;
        G = GG + g;
        B = BB + b;

        // Clamp values
        if (R < 0) R = 0;
        if (R > 255) R = 255;
        if (G < 0) G = 0;
        if (G > 255) G = 255;
        if (B < 0) B = 0;
        if (B > 255) B = 255;

        // Record color wtf
        myImage.pixels[i] = R >> 0;
        myImage.pixels[i + 1] = G >> 0;
        myImage.pixels[i + 2] = B >> 0;  
    }
    myImage.updatePixels();
    image(myImage, 0, 400);
    flag = true;
  }
}

function handleFile(file) {
  if (file.type === 'image') {
    myImage = loadImage(file.data);
  } else {
    myImage = null;
  }
  flag = false;
}


