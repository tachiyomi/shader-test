precision mediump float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform float uTime;

void main() {
  vec2 uv = vUv;

  //モザイク用
  /*
  float n = 150.0;
  uv = uv * n;
  uv.x = floor(uv.x) + 0.5;
  uv.y = floor(uv.y) + 0.5;
  uv = uv / n;
  vec4 texColor = texture2D(uTex, uv);
  */

  vec4 texColor = texture2D(uTex, vUv);
  gl_FragColor = texColor;
}
