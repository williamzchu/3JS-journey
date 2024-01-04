precision mediump float;

uniform vec3 uDColor;
uniform vec3 uSColor;

varying float vElevation;

void main()
{
    gl_FragColor = vec4(mix(uDColor, uSColor, 2.0 * (vElevation + 0.25)),  1.0);

    #include <colorspace_fragment>
}