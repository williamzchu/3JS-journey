console.log("javascript running")

import * as THREE from "three"

console.log(THREE)

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25

scene.add(mesh)

const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.lookAt(new THREE.Vector3(0, - 1, 0))
scene.add(camera)

console.log(mesh.position.length())

console.log(mesh.position.distanceTo(camera.position))

console.log(mesh.position.normalize())


const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// Canvas
const canvas = document.querySelector('canvas.webgl')


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)
