function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function init() {
  setupEventListeners();
  document.getElementById("app").style.display = "none";
  animate();
}

init();