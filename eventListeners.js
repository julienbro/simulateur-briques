function setupEventListeners() {
  // Global Event Listeners
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    state.titleInputPos.x = window.innerWidth / 2 - 150;
    document.getElementById("title-input").style.left = `${state.titleInputPos.x}px`;
  });

  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "z") {
      e.preventDefault();
      undo();
    } else if (e.ctrlKey && e.key === "y") {
      e.preventDefault();
      redo();
    }
  });

  renderer.domElement.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([plane]);
    state.hoverPoint = intersects.length > 0 ? intersects[0].point : null;
    updateScene();
  });

  renderer.domElement.addEventListener("dblclick", (e) => {
    if (!state.deleteMode && !state.moveMode && !state.rotateMode) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([plane]);
      if (intersects.length > 0) addBrick(intersects[0].point);
    }
  });

  renderer.domElement.addEventListener("click", (e) => {
    if (state.deleteMode) {
      deleteBrick();
    } else if (state.moveMode) {
      if (!state.selectedBrick) {
        selectBrickForMove();
      } else {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects([plane]);
        if (intersects.length > 0) confirmMove(intersects[0].point);
      }
    } else if (state.rotateMode && !state.selectedBrick) {
      selectBrickForRotate();
    }
  });

  // UI Event Listeners
  document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("homepage").style.display = "none";
    document.getElementById("app").style.display = "block";
    initThreeJS();
    updateScene();
    updateLayerSelect();
  });

  document.getElementById("brick-type").addEventListener("change", (e) => {
    state.selectedSize = `${e.target.value}_${state.selectedSize.split('_')[1] || 'entire'}`;
    updateScene();
  });

  // Brick Size Buttons
  document.querySelectorAll(".brick-size-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const size = button.dataset.size;
      state.selectedSize = `${document.getElementById("brick-type").value}_${size}`;
      document.querySelectorAll(".brick-size-btn").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      updateScene();
    });
  });

  // Set initial active button
  document.querySelector(`.brick-size-btn[data-size="entire"]`).classList.add("active");

  document.getElementById("rotation-y").addEventListener("input", (e) => {
    state.rotationY = (e.target.value * Math.PI) / 180;
    document.getElementById("rotation-value").textContent = `${e.target.value}°`;
    updateScene();
  });

  document.getElementById("joint-thickness").addEventListener("input", (e) => {
    state.jointThickness = parseFloat(e.target.value) / 100;
    updateScene();
  });

  document.getElementById("layer-select").addEventListener("change", (e) => {
    state.currentLayer = parseInt(e.target.value);
    updateScene();
  });

  document.getElementById("layer-select-duplicate").addEventListener("change", (e) => {
    state.currentLayer = parseInt(e.target.value);
    updateScene();
  });

  document.getElementById("add-layer-btn").addEventListener("click", addLayer);

  document.getElementById("project-title").addEventListener("input", (e) => {
    state.projectTitle = e.target.value;
    saveState();
  });

  document.getElementById("toggle-white-bricks").addEventListener("click", (e) => {
    e.preventDefault();
    state.whiteBricks = !state.whiteBricks;
    updateScene();
  });

  document.getElementById("toggle-grid").addEventListener("click", (e) => {
    e.preventDefault();
    gridHelper.visible = !gridHelper.visible;
    updateScene();
  });

  document.getElementById("reset-camera").addEventListener("click", (e) => {
    e.preventDefault();
    resetCamera();
  });

  document.getElementById("view-front").addEventListener("click", setFrontView);
  document.getElementById("view-left").addEventListener("click", setLeftView);
  document.getElementById("view-right").addEventListener("click", setRightView);
  document.getElementById("view-oblique").addEventListener("click", setObliqueView);

  document.getElementById("save-file").addEventListener("click", (e) => {
    e.preventDefault();
    saveFile();
  });

  document.getElementById("open-file").addEventListener("click", (e) => {
    e.preventDefault();
    openFile();
  });

  document.getElementById("export-pdf").addEventListener("click", (e) => {
    e.preventDefault();
    exportPDF();
  });

  document.getElementById("export-png").addEventListener("click", (e) => {
    e.preventDefault();
    exportPNG();
  });

  document.getElementById("file-input").addEventListener("change", handleFileInput);

  document.getElementById("select-mode").addEventListener("click", () => {
    state.deleteMode = false;
    state.moveMode = false;
    state.rotateMode = false;
    state.selectedBrick = null;
    document.getElementById("rotate-overlay").style.display = "none";
    document.querySelectorAll("#delete-mode").forEach((btn) => btn.classList.remove("delete-active"));
    document.querySelectorAll("#move-mode").forEach((btn) => btn.classList.remove("move-active"));
    document.querySelectorAll("#rotate-mode").forEach((btn) => btn.classList.remove("rotate-active"));
    updateScene();
  });

  document.getElementById("place-mode").addEventListener("click", () => {
    state.deleteMode = false;
    state.moveMode = false;
    state.rotateMode = false;
    state.selectedBrick = null;
    document.getElementById("rotate-overlay").style.display = "none";
    document.querySelectorAll("#delete-mode").forEach((btn) => btn.classList.remove("delete-active"));
    document.querySelectorAll("#move-mode").forEach((btn) => btn.classList.remove("move-active"));
    document.querySelectorAll("#rotate-mode").forEach((btn) => btn.classList.remove("rotate-active"));
    updateScene();
  });

  document.getElementById("delete-mode").addEventListener("click", () => {
    state.deleteMode = !state.deleteMode;
    state.moveMode = false;
    state.rotateMode = false;
    state.selectedBrick = null;
    document.getElementById("rotate-overlay").style.display = "none";
    document.querySelectorAll("#delete-mode").forEach((btn) => btn.classList.toggle("delete-active"));
    document.querySelectorAll("#move-mode").forEach((btn) => btn.classList.remove("move-active"));
    document.querySelectorAll("#rotate-mode").forEach((btn) => btn.classList.remove("rotate-active"));
    updateScene();
  });

  document.getElementById("move-mode").addEventListener("click", () => {
    state.moveMode = !state.moveMode;
    state.deleteMode = false;
    state.rotateMode = false;
    state.selectedBrick = null;
    document.getElementById("rotate-overlay").style.display = "none";
    document.querySelectorAll("#move-mode").forEach((btn) => btn.classList.toggle("move-active"));
    document.querySelectorAll("#delete-mode").forEach((btn) => btn.classList.remove("delete-active"));
    document.querySelectorAll("#rotate-mode").forEach((btn) => btn.classList.remove("rotate-active"));
    updateScene();
  });

  document.getElementById("rotate-mode").addEventListener("click", () => {
    state.rotateMode = !state.rotateMode;
    state.deleteMode = false;
    state.moveMode = false;
    state.selectedBrick = null;
    document.getElementById("rotate-overlay").style.display = "none";
    document.querySelectorAll("#rotate-mode").forEach((btn) => btn.classList.toggle("rotate-active"));
    document.querySelectorAll("#delete-mode").forEach((btn) => btn.classList.remove("delete-active"));
    document.querySelectorAll("#move-mode").forEach((btn) => btn.classList.remove("move-active"));
    updateScene();
  });

  document.getElementById("rotate-slider").addEventListener("input", (e) => {
    document.getElementById("rotate-value").textContent = `${e.target.value}°`;
    updateScene();
  });

  document.getElementById("confirm-rotation").addEventListener("click", confirmRotation);

  document.getElementById("undo").addEventListener("click", undo);
  document.getElementById("redo").addEventListener("click", redo);

  document.getElementById("keyboard-shortcuts").addEventListener("click", (e) => {
    e.preventDefault();
    showNotification("Raccourcis : Ctrl+Z (Annuler), Ctrl+Y (Refaire)");
  });

  document.getElementById("about").addEventListener("click", (e) => {
    e.preventDefault();
    showNotification("Mur Simulateur 3D v1.0.0 par Julien Brohez");
  });

  // Draggable Layerbox
  let isDraggingLayerbox = false;
  let currentXLayerbox, currentYLayerbox, xOffsetLayerbox = 0, yOffsetLayerbox = 0;
  const layerbox = document.getElementById("layerbox");

  layerbox.addEventListener("mousedown", (e) => {
    isDraggingLayerbox = true;
    currentXLayerbox = e.clientX - xOffsetLayerbox;
    currentYLayerbox = e.clientY - yOffsetLayerbox;
    layerbox.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (isDraggingLayerbox) {
      e.preventDefault();
      xOffsetLayerbox = e.clientX - currentXLayerbox;
      yOffsetLayerbox = e.clientY - currentYLayerbox;
      state.layerboxPos.x = xOffsetLayerbox;
      state.layerboxPos.y = yOffsetLayerbox;
      layerbox.style.left = `${state.layerboxPos.x}px`;
      layerbox.style.top = `${state.layerboxPos.y}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDraggingLayerbox = false;
    layerbox.style.cursor = "grab";
  });

  // Draggable Title Input
  let isDraggingTitle = false;
  let currentXTitle, currentYTitle, xOffsetTitle = 0, yOffsetTitle = 0;
  const titleInput = document.getElementById("title-input");

  titleInput.addEventListener("mousedown", (e) => {
    isDraggingTitle = true;
    currentXTitle = e.clientX - xOffsetTitle;
    currentYTitle = e.clientY - yOffsetTitle;
    titleInput.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (isDraggingTitle) {
      e.preventDefault();
      xOffsetTitle = e.clientX - currentXTitle;
      yOffsetTitle = e.clientY - currentYTitle;
      state.titleInputPos.x = xOffsetTitle;
      state.titleInputPos.y = yOffsetTitle;
      titleInput.style.left = `${state.titleInputPos.x}px`;
      titleInput.style.top = `${state.titleInputPos.y}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDraggingTitle = false;
    titleInput.style.cursor = "grab";
  });
}
