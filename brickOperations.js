function addBrick(point) {
  if (!point || point.x === undefined || point.z === undefined) return;
  const { snapX, snapZ } = snapToGrid(point, state.selectedSize);
  const y = getBrickY(BRICK_SIZES[state.selectedSize]);
  saveState();
  state.layers[state.currentLayer].push([snapX, y, snapZ, state.selectedSize, state.rotationY]);
  updateScene();
}

function deleteBrick() {
  const intersects = raycaster.intersectObjects(
    scene.children.filter((child) => child.isMesh && child !== plane && child !== shadowPlane)
  );
  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object;
    const position = clickedMesh.position;
    saveState();
    state.layers = state.layers.map((layer) =>
      layer.filter(
        ([x, y, z]) =>
          !(Math.abs(x - position.x) < 0.001 &&
            Math.abs(y - position.y) < 0.001 &&
            Math.abs(z - position.z) < 0.001)
      )
    );
    state.deleteMode = false;
    document.querySelectorAll("#delete-mode").forEach((btn) => btn.classList.remove("delete-active"));
    updateScene();
  }
}

function selectBrickForMove() {
  const intersects = raycaster.intersectObjects(
    scene.children.filter((child) => child.isMesh && child !== plane && child !== shadowPlane)
  );
  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object;
    const layerIndex = clickedMesh.userData.layerIndex;
    const brickIndex = state.layers[layerIndex].findIndex(
      ([x, y, z]) =>
        Math.abs(x - clickedMesh.position.x) < 0.001 &&
        Math.abs(y - clickedMesh.position.y) < 0.001 &&
        Math.abs(z - clickedMesh.position.z) < 0.001
    );
    state.selectedBrick = [...state.layers[layerIndex][brickIndex], layerIndex, brickIndex];
    updateScene();
  }
}

function confirmMove(point) {
  if (!point || point.x === undefined || point.z === undefined || !state.selectedBrick) return;
  const { snapX, snapZ } = snapToGrid(point, state.selectedBrick[3]);
  saveState();
  state.layers[state.selectedBrick[5]][state.selectedBrick[6]] = [
    snapX,
    state.selectedBrick[1],
    snapZ,
    state.selectedBrick[3],
    state.selectedBrick[4],
  ];
  state.selectedBrick = null;
  state.moveMode = false;
  document.querySelectorAll("#move-mode").forEach((btn) => btn.classList.remove("move-active"));
  updateScene();
}

function selectBrickForRotate() {
  const intersects = raycaster.intersectObjects(
    scene.children.filter((child) => child.isMesh && child !== plane && child !== shadowPlane)
  );
  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object;
    const layerIndex = clickedMesh.userData.layerIndex;
    const brickIndex = state.layers[layerIndex].findIndex(
      ([x, y, z]) =>
        Math.abs(x - clickedMesh.position.x) < 0.001 &&
        Math.abs(y - clickedMesh.position.y) <  aun0.001 &&
        Math.abs(z - clickedMesh.position.z) < 0.001
    );
    state.selectedBrick = [...state.layers[layerIndex][brickIndex], layerIndex, brickIndex];
    const overlay = document.getElementById("rotate-overlay");
    overlay.style.display = "block";
    document.getElementById("rotate-slider").value = ((state.selectedBrick[4] || 0) * 180) / Math.PI;
    document.getElementById("rotate-value").textContent = `${Math.round(((state.selectedBrick[4] || 0) * 180) / Math.PI)}°`;
    updateScene();
  }
}

function confirmRotation() {
  const newRotation = (document.getElementById("rotate-slider").value * Math.PI) / 180;
  saveState();
  state.layers[state.selectedBrick[5]][state.selectedBrick[6]][4] = newRotation;
  state.selectedBrick = null;
  state.rotateMode = false;
  document.querySelectorAll("#rotate-mode").forEach((btn) => btn.classList.remove("rotate-active"));
  document.getElementById("rotate-overlay").style.display = "none";
  updateScene();
}