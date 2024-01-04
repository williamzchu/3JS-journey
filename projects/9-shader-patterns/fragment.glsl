precision mediump float;

varying float vRandom;
varying vec2 vUv;

void main()
{
    float s = mod(vUv.y * 10.0, 1.0);
    s = step(0.5, s);
    gl_FragColor = vec4(s, s, s,  1.0);
}