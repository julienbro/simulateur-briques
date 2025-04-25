function saveState() {
  state.history = state.history.slice(0, state.historyIndex + 1);
  state.history.push({
    layers: JSON.parse(JSON.stringify(state.layers)),
    projectTitle: state.projectTitle,
  });
  state.historyIndex++;
}

function undo() {
  if (state.historyIndex <= 0) return;
  state.historyIndex--;
  state.layers = JSON.parse(JSON.stringify(state.history[state.historyIndex].layers));
  state.projectTitle = state.history[state.historyIndex].projectTitle;
  document.getElementById("project-title").value = state.projectTitle;
  updateLayerSelect();
  updateScene();
}

function redo() {
  if (state.historyIndex >= state.history.length - 1) return;
  state.historyIndex++;
  state.layers = JSON.parse(JSON.stringify(state.history[state.historyIndex].layers));
  state.projectTitle = state.history[state.historyIndex].projectTitle;
  document.getElementById("project-title").value = state.projectTitle;
  updateLayerSelect();
  updateScene();
}