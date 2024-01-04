import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

const scene = new THREE.Scene()

const gui = new GUI()


const geometry = new THREE.OctahedronGeometry(1,0)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true, side: THREE.DoubleSide })
const mesh = new THREE.Mesh(geometry, material)
gui.add(material, 'wireframe')
gui.add(mesh.geometry.parameters, 'detail', 0, 50, 1).onFinishChange(
    (value) => {
        mesh.geometry.dispose()
        mesh.geometry = new THREE.OctahedronGeometry(1, value)
    }
)
gui.add(mesh.position, 'y', -1, 1, 0.001)
console.log(mesh.geometry.parameters)
scene.add(mesh)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)


camera.position.z = 3
camera.lookAt(mesh.position)
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
