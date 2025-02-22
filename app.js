// Configuración básica de Three.js
let scene, camera, renderer;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Crear una esfera como ejemplo (puede ser un personaje o enemigo)
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x0077ff });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 20;

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Animación básica: rotar el objeto
    scene.children[0].rotation.x += 0.01;
    scene.children[0].rotation.y += 0.01;

    renderer.render(scene, camera);
}

init();