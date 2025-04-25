function saveFile() {
  const data = JSON.stringify({ layers: state.layers, projectTitle: state.projectTitle });
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "wall-design.json";
  link.click();
  URL.revokeObjectURL(url);
}

function openFile() {
  document.getElementById("file-input").click();
}

function validateLayers(data) {
  if (!data || typeof data !== "object") return false;
  if (!Array.isArray(data.layers)) return false;
  return data.layers.every(
    (layer) =>
      Array.isArray(layer) &&
      layer.every(
        (brick) =>
          Array.isArray(brick) &&
          brick.length >= 4 &&
          typeof brick[0] === "number" &&
          typeof brick[1] === "number" &&
          typeof brick[2] === "number" &&
          typeof brick[3] === "string" &&
          BRICK_SIZES[brick[3]]
      )
  );
}

function handleFileInput(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (validateLayers(data)) {
          saveState();
          state.layers = data.layers;
          state.projectTitle = data.projectTitle || "";
          state.currentLayer = 0;
          document.getElementById("project-title").value = state.projectTitle;
          updateLayerSelect();
          updateScene();
        } else {
          showNotification("Fichier invalide ou corrompu.");
        }
      } catch (err) {
        showNotification("Erreur lors de la lecture du fichier.");
      }
    };
    reader.readAsText(file);
  }
}