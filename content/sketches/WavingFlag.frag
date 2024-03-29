// taken from https://thebookofshaders.com/15/
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
uniform sampler2D texture;
uniform float time;
uniform vec2 resolution;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {  
  vec2 st = vTexCoord;
  st.y = 1.0 - st.y;
  // vec2 st = gl_FragCoord.xy/resolution.xy;
  
  float scale = 2.0;
  float radius = 0.5;
  float angle = noise( st + time * 0.1 ) * 3.14159265359;
  
  st *= scale;
  st += radius * vec2(cos(angle),sin(angle));
  
  vec4 color = texture2D(texture, st);
  gl_FragColor = color;
}