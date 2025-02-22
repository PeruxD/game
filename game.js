// Importamos Three.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

// Configuración básica de la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear el suelo
const geometry = new THREE.PlaneGeometry(100, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x228B22, side: THREE.DoubleSide });
const ground = new THREE.Mesh(geometry, material);
ground.rotation.x = Math.PI / 2;
scene.add(ground);

// Crear el jugador
const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.set(0, 1, 0);
scene.add(player);

// Posición inicial de la cámara
camera.position.set(0, 2, 5);
camera.lookAt(player.position);

// Controles de movimiento
const keys = {};
document.addEventListener('keydown', (event) => keys[event.code] = true);
document.addEventListener('keyup', (event) => keys[event.code] = false);

let playerDirection = 0;
document.addEventListener('mousemove', (event) => {
    playerDirection -= event.movementX * 0.002;
    camera.rotation.y = playerDirection;
});

document.addEventListener('click', () => {
    document.body.requestPointerLock();
});

function updatePlayerMovement() {
    const speed = 0.1;
    if (keys['KeyW']) {
        player.position.x -= Math.sin(playerDirection) * speed;
        player.position.z -= Math.cos(playerDirection) * speed;
    }
    if (keys['KeyS']) {
        player.position.x += Math.sin(playerDirection) * speed;
        player.position.z += Math.cos(playerDirection) * speed;
    }
    if (keys['KeyA']) {
        player.position.x -= Math.cos(playerDirection) * speed;
        player.position.z += Math.sin(playerDirection) * speed;
    }
    if (keys['KeyD']) {
        player.position.x += Math.cos(playerDirection) * speed;
        player.position.z -= Math.sin(playerDirection) * speed;
    }
    camera.position.set(player.position.x, player.position.y + 1.5, player.position.z);
    camera.lookAt(player.position.x, player.position.y + 1.5, player.position.z - 1);
}

// Animación
function animate() {
    requestAnimationFrame(animate);
    updatePlayerMovement();
    renderer.render(scene, camera);
}
animate();
