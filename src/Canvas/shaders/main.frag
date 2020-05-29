precision mediump float;

varying vec3 vNormal;
varying vec3 vPosition;
uniform vec3 uLightPos;

void main() {
  vec3 materialColor = vec3(0.3, 0.3, 0.8);
  vec3 lightColor = vec3(1.0, 1.0, 1.0);

  //光源から面へのベクトルを正規化したもの
  vec3 LightDirection = normalize(-uLightPos);

  float lightness = 0.0;
  //ランバートシェーダー用（拡散照明モデル）
  lightness = max(0.0, dot(-vNormal, LightDirection) * 0.5);
  float offset = 0.5;
  lightness = clamp(lightness + offset, 0.0, 1.0);

  //フォンシェーダー用（鏡面反射モデル）
  //反射光のベクトルを正規化したもの
  vec3 ReflectLightDirection = normalize(
      LightDirection + 2.0 * vNormal * max(0.0, dot(-vNormal, LightDirection)));
  //カメラから面へのベクトルを正規化したもの
  vec3 ViewDirection = normalize(vPosition);

  float spec = max(0.0, dot(-ViewDirection, ReflectLightDirection));
  lightness = clamp(lightness + pow(spec, 20.0), 0.0, 1.0);

  //トゥーンシェーダー用
  float n = 8.0;
  lightness = floor(lightness * n) / n;

  vec3 monochrome = vec3(lightness);
  vec3 color = materialColor * lightColor * vec3(lightness);
  gl_FragColor = vec4(color, 1.0);
}
