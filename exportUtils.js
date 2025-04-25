function exportPDF() {
  const originalWidth = window.innerWidth;
  const originalHeight = window.innerHeight;
  const exportWidth = 1920;
  const exportHeight = Math.round(exportWidth * (27.7 / 21));
  const pdf = new jsPDF({ orientation: "landscape", unit: "cm", format: [29.7, 21] });
  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();
  const appTitle = state.projectTitle || "Mur Simulateur 3d";
  let page = 1;

  const hiddenElementTypes = ["ElementVide", "ElementVide1", "ElementVide2", "ElementVide4", "ElementVide5"];
  const originalLayers = JSON.parse(JSON.stringify(state.layers));
  const filteredLayers = state.layers.map((layer) =>
    layer.filter((brick) => !hiddenElementTypes.some((type) => brick[3].startsWith(type)))
  );
  state.layers = filteredLayers;

  renderer.setSize(exportWidth, exportHeight);
  renderer.setClearColor(0xffffff, 1);
  updateScene();

  const bounds = filteredLayers.flat().reduce(
    (acc, [x, y, z, type]) => {
      const size = BRICK_SIZES[type] || [0, 0, 0];
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

  const centerX = (bounds.minX + bounds.maxX) / 2;
  const centerZ = (bounds.minZ + bounds.maxZ) / 2;
  const centerY = bounds.maxY / 2;

  function addCommonElements(viewName, isFourthPage = false) {
    pdf.setLineWidth(0.05);
    pdf.line(1, height - 2, 1 + 1, height - 2);
    pdf.setFontSize(8);
    pdf.text("10 cm", 1, height - 1.5);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text(appTitle, width / 2, isFourthPage ? 3.5 : 0.5, { align: "center" });
    pdf.setFontSize(12);
    pdf.text(viewName, width / 2, isFourthPage ? height - 3.5 : height - 1, { align: "center" });
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.text(appTitle, width - (isFourthPage ? 1.5 : 3), height - (isFourthPage ? 4.5 : 1.5), { align: "right" });
    pdf.text("Conçu par Julien BROHEZ", width - (isFourthPage ? 1.5 : 3), height - (isFourthPage ? 4 : 1), { align: "right" });
    pdf.text(VERSION, width - (isFourthPage ? 1.5 : 3), height - (isFourthPage ? 3.5 : 0.5), { align: "right" });
    pdf.text(`${page} sur 5`, 1.5, height - (isFourthPage ? 3.5 : 0.5));
  }

  function addMarginMarks() {
    pdf.setLineWidth(0.02);
    pdf.line(1, 10, 1, 11);
    pdf.line(28.7, 10, 28.7, 11);
    pdf.line(14.35, 1, 15.35, 1);
    pdf.line(14.35, 20, 15.35, 20);
  }

  // Top View
  renderer.shadowMap.enabled = false;
  const originalPlaneVisible = plane.visible;
  const originalShadowPlaneVisible = shadowPlane.visible;
  plane.visible = false;
  shadowPlane.visible = false;
  scene.background = null;
  const topCamera = new THREE.OrthographicCamera(-0.722, 0.722, 0.95, -0.95, 0.1, 100);
  topCamera.position.set(centerX, 1, centerZ);
  topCamera.lookAt(centerX, 0, centerZ);
  renderer.render(scene, topCamera);
  pdf.addImage(renderer.domElement.toDataURL("image/png"), "PNG", 7.63, 1, 14.44, 19);
  plane.visible = originalPlaneVisible;
  shadowPlane.visible = originalShadowPlaneVisible;
  addMarginMarks();
  addCommonElements("Vue de dessus");
  pdf.text("Échelle : 1/10", 1, height - 1);
  page++;

  // Front View
  pdf.addPage();
  const frontLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.722, 0, 0), new THREE.Vector3(0.722, 0, 0)]),
    new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 5 })
  );
  scene.add(frontLine);
  renderer.shadowMap.enabled = true;
  const frontCamera = new THREE.OrthographicCamera(-0.722, 0.722, 0.95, -0.95, 0.1, 100);
  frontCamera.position.set(centerX, centerY, 0.722);
  frontCamera.lookAt(centerX, centerY, 0);
  renderer.render(scene, frontCamera);
  pdf.addImage(renderer.domElement.toDataURL("image/png"), "PNG", 7.63, 1, 14.44, 19);
  addMarginMarks();
  addCommonElements("Vue de face");
  pdf.text("Échelle : 1/10", 1, height - 1);
  scene.remove(frontLine);
  page++;

  // Side View
  pdf.addPage();
  const sideLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, -0.95), new THREE.Vector3(0, 0, 0.95)]),
    new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 5 })
  );
  scene.add(sideLine);
  const sideCamera = new THREE.OrthographicCamera(-0.722, 0.722, 0.95, -0.95, 0.1, 100);
  sideCamera.position.set(0.722, centerY, centerZ);
  sideCamera.lookAt(0, centerY, centerZ);
  renderer.render(scene, sideCamera);
  pdf.addImage(renderer.domElement.toDataURL("image/png"), "PNG", 7.63, 1, 14.44, 19);
  addMarginMarks();
  addCommonElements("Vue de côté");
  pdf.text("Échelle : 1/10", 1, height - 1);
  scene.remove(sideLine);
  page++;

  // 3D View
  pdf.addPage();
  renderer.shadowMap.enabled = true;
  scene.background = createSkyTexture();
  camera.aspect = exportWidth / exportHeight;
  camera.updateProjectionMatrix();
  camera.lookAt(controls.target);
  renderer.render(scene, camera);
  pdf.addImage(renderer.domElement.toDataURL("image/png"), "PNG", 7.63, 1, 14.44, 19);
  addMarginMarks();
  addCommonElements("Vue 3D", true);
  page++;

  // Inventory Page
  pdf.addPage();
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text(appTitle, width / 2, 0.5, { align: "center" });
  pdf.setFontSize(12);
  pdf.text("Inventaire des éléments", width / 2, 1, { align: "center" });
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  let y = 2;
  BRICK_TYPES.forEach((type) => {
    if (hiddenElementTypes.includes(type)) return;
    SIZE_VARIANTS.forEach((variant) => {
      const count = filteredLayers.flat().filter((b) => b[3] === `${type}_${variant}`).length;
      if (count > 0) {
        pdf.text(`${type} (${variant}): ${count} éléments`, 1, y);
        y += 1;
      }
    });
  });
  pdf.setFontSize(8);
  pdf.text(appTitle, width - 3, height - 1.5, { align: "right" });
  pdf.text("Conçu par Julien BROHEZ", width - 3, height - 1, { align: "right" });
  pdf.text(VERSION, width - 3, height - 0.5, { align: "right" });
  pdf.text(`${page} sur 5`, 1, height - 0.5);

  state.layers = originalLayers;
  renderer.setSize(originalWidth, originalHeight);
  camera.aspect = originalWidth / originalHeight;
  camera.updateProjectionMatrix();
  renderer.shadowMap.enabled = true;
  scene.background = createSkyTexture();
  renderer.setClearColor(0x000000, 0);
  updateScene();

  pdf.save("vue-elements.pdf");
}

function exportPNG() {
  renderer.render(scene, camera);
  const canvas = state.projectTitle ? createTitledCanvas() : renderer.domElement;
  const link = document.createElement("a");
  link.download = "vue-elements.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function createTitledCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = renderer.domElement.width;
  canvas.height = renderer.domElement.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(renderer.domElement, 0, 0);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, 50);
  ctx.fillStyle = "#000000";
  ctx.font = "bold 30px Helvetica";
  ctx.textAlign = "center";
  ctx.fillText(state.projectTitle, canvas.width / 2, 40);
  return canvas;
}