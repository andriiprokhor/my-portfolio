import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

//Choosing background

const colors = document.querySelectorAll(".color")
const container = document.querySelector("#container1")

colors.forEach(function (color) {
  color.addEventListener("click", function () {
    const imageUrl = color.getAttribute("data-image")
    container.style.backgroundImage = `url(${imageUrl})`
  })
})

//////////////////////////////////////////

const container1 = document.getElementById("container1")
const container2 = document.getElementById("container2")

const renderer1 = new THREE.WebGLRenderer()
const renderer2 = new THREE.WebGLRenderer()

renderer1.setSize(container1.clientWidth, container1.clientHeight)
renderer2.setSize(container2.clientWidth, container2.clientHeight)

container1.appendChild(renderer1.domElement)
container2.appendChild(renderer2.domElement)

const scene1 = new THREE.Scene()
const scene2 = new THREE.Scene()

const camera1 = new THREE.PerspectiveCamera(
  45,
  container1.clientWidth / container1.clientHeight,
  0.1,
  1000
)

const camera2 = new THREE.PerspectiveCamera(
  45,
  container2.clientWidth / container2.clientHeight,
  0.1,
  1000
)

camera1.position.set(0, 0, 5)
camera2.position.set(0, 3.5, 5)

const loader = new GLTFLoader()

loader.load(
  "/character.glb",
  function (glb) {
    scene1.add(glb.scene)
    const model = scene1.children[1]

    model.position.y -= 1.35
    model.scale.set(1.6, 1.6, 1.6)
  },

  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
  },

  function (error) {
    console.error("Failed to load GLTF model:", error)
  }
)

const loader2 = new GLTFLoader()

loader2.load(
  "/scene.glb",
  function (glb) {
    scene2.add(glb.scene)

    const model2 = scene2.children[1]

    model2.position.y -= 1.2
    model2.scale.set(1.7, 1.7, 1.7)
  },

  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
  },

  function (error) {
    console.error("Failed to load GLTF model:", error)
  }
)

const light1 = new THREE.AmbientLight(0xffffff)

light1.position.set(2, 2, 5)
const light2 = new THREE.AmbientLight(0xffffff)
light2.position.set(2, 2, 5)
scene1.add(light1)
scene2.add(light2)

const controls1 = new OrbitControls(camera1, renderer1.domElement)
controls1.enableDamping = true

const controls2 = new OrbitControls(camera2, renderer2.domElement)
controls2.enableDamping = true

function animate() {
  requestAnimationFrame(animate)
  controls1.update()
  controls2.update()

  if (scene1.children.length > 1) {
    scene1.children[1].rotation.y += 0.01
  }

  if (scene2.children.length > 1) {
    scene2.children[1].rotation.y += 0.007
  }

  renderer1.render(scene1, camera1)
  renderer2.render(scene2, camera2)
}

renderer1.setClearColor(new THREE.Color(0x000000), 0)
renderer2.setClearColor(new THREE.Color(0x000000), 0)

animate()
