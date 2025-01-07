import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
renderer.setClearColor(0x101820); // Dark Charcoal background
document.getElementById('viewer-container').appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(ambientLight, directionalLight);

// Load 3D Model
const loader = new GLTFLoader();
let model;
loader.load('./models/robo.glb', (gltf) => {
    model = gltf.scene;
    model.scale.set(1.5, 1.5, 1.5);
    model.position.set(0, 0, 0);
    scene.add(model);
}, undefined, (error) => {
    console.error('An error occurred while loading the model:', error);
});

// Mouse position tracker
const mouse = new THREE.Vector2();
document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // Normalize mouse X (-1 to 1)
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize mouse Y (-1 to 1)
});

// Variables for right-click movement
let isRightClickPressed = false;
let moveInterval;

// Detect right-click long press
document.addEventListener('mousedown', (event) => {
    if (event.button === 2) { // Right mouse button
        isRightClickPressed = true;

        // Start moving the model on long press
        moveInterval = setInterval(() => {
            if (model) {
                // Move model based on mouse coordinates
                model.position.x = mouse.x * 5; // Adjust multiplier for sensitivity
                model.position.y = mouse.y * 5; // Adjust multiplier for sensitivity
            }
        }, 50); // Adjust interval for smoother movement
    }
});

document.addEventListener('mouseup', (event) => {
    if (event.button === 2) { // Right mouse button
        isRightClickPressed = false;
        clearInterval(moveInterval); // Stop moving the model
    }
});

// Prevent context menu from appearing on right-click
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (model) {
        // Rotate the model to face the cursor
        const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);
        const direction = vector.sub(model.position).normalize();
        const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            direction
        );
        model.quaternion.slerp(targetQuaternion, 0.1); // Smooth rotation
    }

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
});
