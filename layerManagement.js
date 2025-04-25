function addLayer() {
  saveState();
  state.layers.push([]);
  state.currentLayer = state.layers.length - 1;
  updateLayerSelect();
  updateScene();
}

function updateLayerSelect() {
  const select = document.getElementById("layer-select");
  select.innerHTML = state.layers
    .map((_, i) => `<option value="${i}" ${i === state.currentLayer ? "selected" : ""}>Assise ${i + 1}</option>`)
    .join("");
  const selectDuplicate = document.getElementById("layer-select-duplicate");
  selectDuplicate.innerHTML = select.innerHTML;
}