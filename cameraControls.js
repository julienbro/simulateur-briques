function getSceneCenter() {
  const bounds = state.layers.flat().reduce(
    (acc, [x, y, z, type]) => {
      const size = BRICK_SIZES[type];
      return {
        minX: Math.min(acc.minX, x - size[0] / 2),
        maxX: Math.max(acc.maxX, x + size[0] / 2),
        minZ: Math.min(acc.minZ, z - size[2] / 2),
        maxZ: Math.max(acc.maxZ, z + size[2] / 2),
        maxY: Math.max(acc.maxY, y + size[1] / 2),
      };
    },
    { minX: 0, maxX: 0, minZ: 0, maxZ: 0, maxY: 0 }
  );
  return {
    x: (bounds.minX + bounds.maxX) / 2,
    y: bounds.maxY / 2,
    z: (bounds.minZ + bounds.maxZ) / 2,
  };
}

function setFrontView() {
  const center = getSceneCenter();
  camera.position.set(center.x, center.y, center.z + 1);
  controls.target.set(center.x, center.y, center.z);
  controls.update();
  renderer.render(scene, camera);
}

function setLeftView() {
  const center = getSceneCenter();
  camera.position.set(center.x - 1, center.y, center.z);
  controls.target.set(center.x, center.y, center.z);
  controls.update();
  renderer.render(scene, camera);
}

function setRightView() {
  const center = getSceneCenter();
  camera.position.set(center.x + 1, center.y, center.z);
  controls.target.set(center.x, center.y, center.z);
  controls.listeners.update();
  renderer.render(scene, camera);
}

function setObliqueView() {
  const center = getSceneCenter();
  camera.position.set(center.x + 0.5, center.y + 0.5, center.z + 0.5);
  controls.target.set(center.x, center.y, center.z);
  controls.update();
  renderer.render(scene, camera);
}

function resetCamera() {
  camera.position.set(0.5, 0.5, 1);
  controls.target.set(0, 0, 0);
  controls.update();
  renderer.render(scene, camera);
}