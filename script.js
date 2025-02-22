// Variables globales
let scene, camera, renderer, controls, world, physicsMaterial, playerBody;

// Inicializar la escena
function init() {
    // Escena
    scene = new THREE.Scene();

    // Cámara
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 20);

    // Renderizador
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('game-container').appendChild(renderer.domElement);

    // Luz
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 10).normalize();
    scene.add(light);

    // Física (Cannon.js)
    world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);

    // Material físico
    physicsMaterial = new CANNON.Material();

    // Crear el suelo
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ mass: 0 });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.addBody(groundBody);

    // Crear el jugador
    const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
    const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
    scene.add(playerMesh);

    playerBody = new CANNON.Body({ mass: 1 });
    playerBody.addShape(new CANNON.Box(new CANNON.Vec3(0.5, 1, 0.5)));
    playerBody.position.set(0, 5, 0);
    world.addBody(playerBody);

    // Controles
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // Animación
    animate();
}

// Manejar teclas presionadas
function onKeyDown(event) {
    if (event.key === 'w') playerBody.velocity.z = -5;
    if (event.key === 's') playerBody.velocity.z = 5;
    if (event.key === 'a') playerBody.velocity.x = -5;
    if (event.key === 'd') playerBody.velocity.x = 5;
}

// Manejar teclas liberadas
function onKeyUp(event) {
    if (event.key === 'w' || event.key === 's') playerBody.velocity.z = 0;
    if (event.key === 'a' || event.key === 'd') playerBody.velocity.x = 0;
}

// Bucle de animación
function animate() {
    requestAnimationFrame(animate);

    // Actualizar física
    world.step(1 / 60);

    // Sincronizar la posición del jugador
    const playerMesh = scene.children.find(child => child instanceof THREE.Mesh);
    playerMesh.position.copy(playerBody.position);
    playerMesh.quaternion.copy(playerBody.quaternion);

    // Renderizar
    renderer.render(scene, camera);
}

// Iniciar el juego
init();
