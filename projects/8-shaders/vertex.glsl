uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uFrequency;

attribute vec3 position;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * uFrequency) * 0.1;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}