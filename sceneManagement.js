function updateScene() {
  scene.children = scene.children.filter(
    (child) => (!child.isMesh && !child.isLineSegments) || child === plane || child === shadowPlane || child === gridHelper
  );
  let hoveredBrick = null;

  if (state.deleteMode || state.moveMode || state.rotateMode) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(
      scene.children.filter((child) => child.isMesh && child !== plane && child !== shadowPlane)
    );
    if (intersects.length > 0) {
      hoveredBrick = intersects[0].object;
    }
  }

  state.layers.flat().forEach(([x, y, z, type, rotY], index) => {
    const isHovered =
      (state.deleteMode || state.moveMode || state.rotateMode) &&
      hoveredBrick &&
      Math.abs(hoveredBrick.position.x - x) < 0.001 &&
      Math.abs(hoveredBrick.position.y - y) < 0.001 &&
      Math.abs(hoveredBrick.position.z - z) < 0.001;
    const brick = createBrick([x, y, z], BRICK_SIZES[type], type, false, isHovered, [0, rotY || 0, 0]);
    brick.userData.index = index;
    brick.userData.layerIndex = state.layers.findIndex((layer) =>
      layer.some((b) => b[0] === x && b[1] === y && b[2] === z)
    );
    scene.add(brick);
    if (brick.userData.edges) scene.add(brick.userData.edges);
  });

  if (state.hoverPoint && !state.deleteMode && !state.moveMode && !state.rotateMode) {
    const { snapX, snapZ, isJointAligned } = snapToGrid(state.hoverPoint, state.selectedSize);
    const y = getBrickY(BRICK_SIZES[state.selectedSize]);
    const hoverBrick = createBrick(
      [snapX, y, snapZ],
      BRICK_SIZES[state.selectedSize],
      state.selectedSize,
      true,
      false,
      [0, state.rotationY, 0],
      isJointAligned
    );
    scene.add(hoverBrick);
  }

  if (state.moveMode && state.selectedBrick && state.hoverPoint) {
    const { snapX, snapZ, isJointAligned } = snapToGrid(state.hoverPoint, state.selectedBrick[3]);
    const y = state.selectedBrick[1];
    state.ghostBrick = createBrick(
      [snapX, y, snapZ],
      BRICK_SIZES[state.selectedBrick[3]],
      state.selectedBrick[3],
      true,
      false,
      [0, state.selectedBrick[4] || 0, 0],
      isJointAligned
    );
    scene.add(state.ghostBrick);
  }

  if (state.rotateMode && state.selectedBrick) {
    const [x, y, z, type] = state.selectedBrick;
    const rotation = [(document.getElementById("rotate-slider").value * Math.PI) / 180];
    state.ghostBrick = createBrick([x, y, z], BRICK_SIZES[type], type, true, false, [0, rotation, 0]);
    scene.add(state.ghostBrick);
  }

  updateBrickCount();
  renderer.shadowMap.needsUpdate = true;
  updateInstructions();
}

function snapToGrid(point, sizeType, excludeBrick = null) {
  let snapX = Math.round(point.x * 100) / 100;
  let snapZ = Math.round(point.z * 100) / 100;
  const threshold = state.jointThickness + 0.001;
  const allPositions = state.layers
    .flat()
    .filter(
      (b) =>
        !excludeBrick ||
        !(Math.abs(b[0] - excludeBrick[0]) < 0.001 &&
          Math.abs(b[1] - excludeBrick[1]) < 0.001 &&
          Math.abs(b[2] - excludeBrick[2]) < 0.001)
    );

  for (const [x, , z] of allPositions) {
    if (Math.abs(snapX - x) <= threshold) snapX = x;
    if (Math.abs(snapZ - z) <= threshold) snapZ = z;
  }

  const size = BRICK_SIZES[sizeType];
  const rotationY = state.rotationY;
  let offsetX = 0, offsetZ = 0;

  if (!state.deleteMode && !state.moveMode && !state.rotateMode) {
    const cosRY = Math.cos(rotationY);
    const sinRY = Math.sin(rotationY);
    const halfWidth = size[0] / 2;
    const halfDepth = size[2] / 2;

    offsetX = halfWidth * cosRY + halfDepth * sinRY;
    offsetZ = halfWidth * sinRY - halfDepth * cosRY;

    snapX += offsetX;
    snapZ += offsetZ;
  }

  const y = excludeBrick ? excludeBrick[1] : getBrickY(size);

  const isJointAligned = state.layers[state.currentLayer].some(([x, y2, z]) => {
    if (y !== y2) return false;
    const dx = Math.abs(snapX - offsetX - x);
    const dz = Math.abs(snapZ - offsetZ - z);
    return (
      (Math.abs(dx - state.jointThickness) < 0.001 && dz < 0.001) ||
      (Math.abs(dz - state.jointThickness) < 0.001 && dx < 0.001)
    );
  });

  return { snapX, snapZ, isJointAligned };
}