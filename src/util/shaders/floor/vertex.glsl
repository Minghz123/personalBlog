//varying vec2 vUv;
//varying vec3 vWorldPosition;
//void main()
//{
    vUv = uv;    
    vec3 newPosition = position;
    newPosition.z = 1.0;
  //  vWorldPosition = worldPosition.xyz;
    gl_Position = vec4(newPosition, 1.0);
//}
