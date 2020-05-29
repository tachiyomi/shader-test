varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  //面の法線ベクトルを正規化したもの
  vNormal = normalize(normalMatrix * normal);
  //面の座標（ワールド座標系）
  vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
