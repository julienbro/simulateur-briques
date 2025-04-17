// Initialisation de la scène, caméra et rendu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('sceneCanvas') });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sol en béton
const solGeometry = new THREE.PlaneGeometry(50, 50);
const solMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide });
const sol = new THREE.Mesh(solGeometry, solMaterial);
sol.rotation.x = Math.PI / 2;
scene.add(sol);

// Caméra positionnée
camera.position.set(10, 10, 20);
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Ajouter une brique
function createBrique(type) {
    const geometry = new THREE.BoxGeometry(1.9, 0.9, 0.7); // Dimensions en mètre
    const material = new THREE.MeshBasicMaterial({ color: type === 'transparent' ? 0x888888 : 0xff5733, transparent: type === 'transparent', opacity: 0.5 });
    const brique = new THREE.Mesh(geometry, material);
    brique.position.y = 0.35; // Posée sur le sol
    scene.add(brique);
}

// Supprimer la brique sélectionnée
function deleteSelected() {
    // Logique de sélection et suppression à ajouter
}

// Animation de la scène
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
