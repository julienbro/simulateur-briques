function createBrick(position, size, type, transparent = false, highlight = false, rotation = [0, 0, 0], isJointAligned = false) {
  const geometry = new THREE.BoxGeometry(...size);
  const brickType = type.split("_")[0];
  const brickSize = type.split("_")[1];
  const isElementVide = brickType.startsWith("ElementVide");
  const color = transparent
    ? isJointAligned
      ? "#0000ff"
      : "#00ff00"
    : state.whiteBricks
      ? "#ffffff"
      : highlight
        ? "#00ffff"
        : SIZE_COLOR_MAP[brickSize] || COLOR_MAP[brickType] || "orange";
  const material = new THREE.MeshStandardMaterial({
    color,
    transparent: isElementVide || transparent,
    opacity: isElementVide ? 0.3 : transparent ? 0.3 : 1,
    wireframe: transparent && !isElementVide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.castShadow = !transparent && !isElementVide;
  mesh.receiveShadow = true;
  mesh.userData.type = type;

  if (!transparent && !isElementVide) {
    const edges = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 });
    const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
    edgeLines.position.set(...position);
    edgeLines.rotation.set(...rotation);
    mesh.userData.edges = edgeLines;
  }

  return mesh;
}

function getBrickY(size) {
  return size[1] / 2 + state.jointThickness + state.currentLayer * (size[1] + state.jointThickness);
}