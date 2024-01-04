import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import vShader from './vertex.glsl'
import fShader from './fragment.glsl'

const scene = new THREE.Scene()
const gui = new GUI();

//set up shaders
const geometry = new THREE.PlaneGeometry(3, 3, 30, 30)

const c = geometry.attributes.position.count

const material = new THREE.RawShaderMaterial({
    vertexShader: vShader,
    fragmentShader: fShader,
    wireframe: false,
    uniforms:
    {
        uFrequency: {value: 0}
    }
})
gui.add(material.uniforms.uFrequency, 'value').min(0).max(20).step(0.01).name('freq')
gui.add(material, 'wireframe')

const mesh = new THREE.Mesh(geometry, material)
mesh.material.side = THREE.DoubleSide
mesh.rotateY(-Math.PI/2)
scene.add(mesh)


//basic camera functions===================================================================================================
//window size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)


camera.position.z = 3
scene.add(camera)
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -event.clientY / sizes.height + 0.5

    //console.log(cursor.x, cursor.y)
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
})

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
})

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getDelta()/10
    const old_x = camera.position.x
    const old_z = camera.position.z
    camera.position.x = Math.cos(elapsedTime) * old_x - Math.sin(elapsedTime) * old_z
    camera.position.z = Math.sin(elapsedTime) * old_x + Math.cos(elapsedTime) * old_z
    // Update camera
    /*
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    camera.position.y = cursor.y * 3
    camera.lookAt(mesh.position)
    */
    controls.update()
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    //console.log(mesh.geometry.parameters)
}
tick()
