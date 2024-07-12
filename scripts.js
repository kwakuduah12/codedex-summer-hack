import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas') });

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // enable damping
// Select the canvas element
renderer.setClearColor(new THREE.Color(0xffffff)); // hex for white
const loader = new GLTFLoader();

let drink;
loader.load(
    './assets/coffee.glb',
    function (gltf) {
        drink = gltf.scene;
        scene.add(drink);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update controls with damping
  renderer.render(scene, camera);
}

animate();