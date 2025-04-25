function updateInstructions() {
  const instructionBar = document.getElementById("instruction-bar");
  if (state.deleteMode) {
    instructionBar.textContent = "Cliquez sur une brique pour la supprimer";
  } else if (state.moveMode) {
    instructionBar.textContent = state.selectedBrick
      ? "Déplacez la brique et cliquez pour confirmer la position"
      : "Sélectionnez une brique à déplacer";
  } else if (state.rotateMode) {
    instructionBar.textContent = state.selectedBrick
      ? "Ajustez la rotation et confirmez"
      : "Sélectionnez une brique à tourner";
  } else {
    instructionBar.textContent = "Double-cliquez pour placer une brique";
  }
}

function updateBrickCount() {
  const counts = BRICK_TYPES.reduce((acc, type) => {
    acc[type] = {
      entire: state.layers.flat().filter((b) => b[3] === `${type}_entire`).length,
      three_quarter: state.layers.flat().filter((b) => b[3] === `${type}_three_quarter`).length,
      half: state.layers.flat().filter((b) => b[3] === `${type}_half`).length,
      quarter: state.layers.flat().filter((b) => b[3] === `${type}_quarter`).length,
    };
    return acc;
  }, {});

  let html = '<table class="border-collapse border border-gray-400 w-full text-sm">';
  html += '<thead><tr class="bg-gray-200">';
  html += '<th class="border border-gray-400 p-2">Type</th>';
  html += '<th class="border border-gray-400 p-2">Entière</th>';
  html += '<th class="border border-gray-400 p-2">Trois quarts</th>';
  html += '<th class="border border-gray-400 p-2">Demi</th>';
  html += '<th class="border border-gray-400 p-2">Quart</th>';
  html += "</tr></thead><tbody>";

  let hasNonZero = false;
  BRICK_TYPES.forEach((type) => {
    const typeCounts = counts[type];
    if (Object.values(typeCounts).some((count) => count > 0)) {
      hasNonZero = true;
      html += `<tr><td class="border border-gray-400 p-2">${type}</td>`;
      html += `<td class="border border-gray-400 p-2">${typeCounts.entire}</td>`;
      html += `<td class="border border-gray-400 p-2">${typeCounts.three_quarter}</td>`;
      html += `<td class="border border-gray-400 p-2">${typeCounts.half}</td>`;
      html += `<td class="border border-gray-400 p-2">${typeCounts.quarter}</td></tr>`;
    }
  });

  html += "</tbody></table>";
  document.getElementById("brick-type-counts").innerHTML = hasNonZero ? html : "Aucun élément placé";
}

function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.display = "block";
  notification.style.left = "50%";
  notification.style.top = "10px";
  notification.style.transform = "translateX(-50%)";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}