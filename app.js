
import * as THREE from 'https://cdn.skypack.dev/three@0.150.1';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;
let bricks = [];
const brickTypes = {
  full: { x: 20, y: 6.5, z: 10 },
  half: { x: 9, y: 6.5, z: 10 },
  quarter: { x: 4, y: 6.5, z: 10 },
  threeQuarter: { x: 14, y: 6.5, z: 10 }
};
let currentBrickType = 'full';
let selectedBrick = null;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let plane;
let isPlacing = false;

init();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(50, 50, 100);
  camera.lookAt(0, 0, 0);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);

  const grid = new THREE.GridHelper(200, 200, 0x888888, 0xcccccc);
  grid.rotation.x = Math.PI / 2;
  scene.add(grid);

  plane = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  renderer.domElement.addEventListener('pointerdown', onPointerDown);

  updateBrickCount();
  animate();
}

function addBrick() {
  const size = brickTypes[currentBrickType];
  const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
  const material = new THREE.MeshLambertMaterial({ color: 0xa52a2a });
  const brick = new THREE.Mesh(geometry, material);
  brick.userData.isBrick = true;
  brick.userData.size = size;

  brick.position.set(0, size.y / 2, 0);

  scene.add(brick);
  bricks.push(brick);
  selectedBrick = brick;
  isPlacing = true;
  updateBrickCount();
}

function onPointerDown(event) {
  if (!isPlacing) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(plane);
  if (intersects.length > 0) {
    let point = intersects[0].point;
    point.x = Math.round(point.x);
    point.z = Math.round(point.z);

    const inputHeight = document.getElementById('heightLevel');
    const heightValue = parseFloat(inputHeight.value);
    const snappedY = Math.round(heightValue);

    const height = selectedBrick.geometry.parameters.height;
    selectedBrick.position.set(point.x, snappedY + height / 2, point.z);
    selectedBrick = null;
    isPlacing = false;
  }
}

function rotateBrick() {
  if (selectedBrick) {
    selectedBrick.rotation.y += Math.PI / 2;
  }
}

function removeLastBrick() {
  if (bricks.length > 0) {
    const brick = bricks.pop();
    scene.remove(brick);
    updateBrickCount();
  }
}

function updateBrickCount() {
  const countDisplay = document.getElementById('brickCount');
  if (countDisplay) countDisplay.textContent = bricks.length;
}

function saveScene() {
  const brickData = bricks.map(b => ({
    x: b.position.x,
    y: b.position.y,
    z: b.position.z,
    rotationY: b.rotation.y,
    size: b.userData.size
  }));
  const blob = new Blob([JSON.stringify(brickData, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'scene_briques.json';
  a.click();
}

function setBrickType(type) {
  currentBrickType = type;
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

window.addBrick = addBrick;
window.rotateBrick = rotateBrick;
window.removeLastBrick = removeLastBrick;
window.saveScene = saveScene;
window.setBrickType = setBrickType;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
