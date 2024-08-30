uniform sampler2D tBackground;

varying vec2 vUv;

void main()
{   
    //vec4 ambient = texture(tBackground, vUv);
    //vec3 col = vec3(0.1, 0.1, 0.1) * getShadowMask();
    //gl_FragColor = vec4(col,1.0)+ambient  ;
    vec4 backgroundColor = texture(tBackground, vUv);
    gl_FragColor = backgroundColor ;
}
