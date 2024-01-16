import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);
const camera = new THREE.PerspectiveCamera(1, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.y = 45 / 180 + Math.PI;
camera.position.x = 800;
camera.position.y = 100;
camera.position.z = 1000;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const hlight = new THREE.AmbientLight(0x404040, 100);
scene.add(hlight);

const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();
let truck, rotationSpeed;
loader.load('./assets/scene.gltf', function (gltf) {
  truck = gltf.scene.children[0];
  truck.scale.set(5, 5, 5);
  scene.add(gltf.scene);
  rotationSpeed = 0.001;
  truck.rotation.y = 0;

  animate();
});

controls.addEventListener('change', renderer);

function animate() {
  requestAnimationFrame(animate);
  if (truck) {
    truck.rotation.z += rotationSpeed;
  }
  renderer.render(scene, camera);
}

animate();
