const blobVertexShader = `
uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;


void main() {
  vUv = uv;
  
  vec3 newPosition = position + normal * (u_intensity * vDisplacement);
  vDisplacement = length(newPosition - position);
  gl_position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

export default blobVertexShader;
