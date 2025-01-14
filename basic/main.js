import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/js/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/js/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('viewer-container').appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10).normalize();
scene.add(light);

// Load 3D Model
const loader = new GLTFLoader();
loader.load('../models/balaswechalogo.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(1, 1, 1); // Adjust the scale
    model.position.set(0, 0, 0); // Center the model
    scene.add(model);
}, undefined, (error) => {
    console.error(error);
});

// OrbitControls for interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth movement
controls.dampingFactor = 0.05; // Adjust damping factor
controls.enableZoom = true; // Enable zooming
controls.enablePan = true; // Enable panning

// Responsive resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update OrbitControls
    renderer.render(scene, camera);
}
animate();
