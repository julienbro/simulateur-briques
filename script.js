const { jsPDF } = window.jspdf

// Constants
const BRICK_SIZES = {
  M50_entire: [0.19, 0.05, 0.09],
  M50_three_quarter: [0.14, 0.05, 0.09],
  M50_half: [0.09, 0.05, 0.09],
  M50_quarter: [0.04, 0.05, 0.09],
  M57_entire: [0.19, 0.057, 0.09],
  M57_three_quarter: [0.14, 0.057, 0.09],
  M57_half: [0.09, 0.057, 0.09],
  M57_quarter: [0.04, 0.057, 0.09],
  M65_entire: [0.19, 0.065, 0.09],
  M65_three_quarter: [0.14, 0.065, 0.09],
  M65_half: [0.09, 0.065, 0.09],
  M65_quarter: [0.04, 0.065, 0.09],
  M90_entire: [0.19, 0.09, 0.09],
  M90_three_quarter: [0.14, 0.09, 0.09],
  M90_half: [0.09, 0.09, 0.09],
  M90_quarter: [0.04, 0.09, 0.09],
  WF_entire: [0.21, 0.09, 0.09],
  WF_three_quarter: [0.15, 0.05, 0.09],
  WF_half: [0.1, 0.05, 0.09],
  WF_quarter: [0.05, 0.05, 0.09],
  WFD_entire: [0.21, 0.09, 0.09],
  WFD_three_quarter: [0.15, 0.05, 0.09],
  WFD_half: [0.1, 0.05, 0.09],
  WFD_quarter: [0.05, 0.05, 0.09],
  Bloc9_entire: [0.39, 0.19, 0.09],
  Bloc9_three_quarter: [0.29, 0.19, 0.09],
  Bloc9_half: [0.19, 0.19, 0.09],
  Bloc9_quarter: [0.14, 0.19, 0.09],
  Bloc14_entire: [0.39, 0.19, 0.14],
  Bloc14_three_quarter: [0.29, 0.19, 0.14],
  Bloc14_half: [0.19, 0.19, 0.14],
  Bloc14_quarter: [0.14, 0.19, 0.14],
  Bloc19_entire: [0.39, 0.19, 0.19],
  Bloc19_three_quarter: [0.29, 0.19, 0.19],
  Bloc19_half: [0.19, 0.19, 0.19],
  Bloc19_quarter: [0.14, 0.19, 0.19],
  Bloc29_entire: [0.39, 0.19, 0.29],
  Bloc29_three_quarter: [0.29, 0.19, 0.29],
  Bloc29_half: [0.19, 0.19, 0.29],
  Bloc29_quarter: [0.14, 0.19, 0.29],
  ElementVide_entire: [0.4, 0.19, 0.03],
  ElementVide_three_quarter: [0.3, 0.19, 0.03],
  ElementVide_half: [0.2, 0.19, 0.03],
  ElementVide_quarter: [0.15, 0.19, 0.03],
  ElementVide1_entire: [0.4, 0.19, 0.01],
  ElementVide1_three_quarter: [0.3, 0.19, 0.01],
  ElementVide1_half: [0.2, 0.19, 0.01],
  ElementVide1_quarter: [0.15, 0.19, 0.01],
  ElementVide2_entire: [0.4, 0.19, 0.02],
  ElementVide2_three_quarter: [0.3, 0.19, 0.02],
  ElementVide2_half: [0.2, 0.19, 0.02],
  ElementVide2_quarter: [0.15, 0.19, 0.02],
  ElementVide4_entire: [0.4, 0.19, 0.04],
  ElementVide4_three_quarter: [0.3, 0.19, 0.04],
  ElementVide4_half: [0.2, 0.19, 0.04],
  ElementVide4_quarter: [0.15, 0.19, 0.04],
  ElementVide5_entire: [0.4, 0.19, 0.05],
  ElementVide5_three_quarter: [0.3, 0.19, 0.05],
  ElementVide5_half: [0.2, 0.19, 0.05],
  ElementVide5_quarter: [0.15, 0.19, 0.05],
  Linteau120x19x14_entire: [1.20, 0.19, 0.14],
  Linteau140x19x14_entire: [1.40, 0.19, 0.14],
  Linteau160x19x14_entire: [1.60, 0.19, 0.14],
  Linteau180x19x14_entire: [1.80, 0.19, 0.14],
  Linteau200x19x14_entire: [2.00, 0.19, 0.14],
  Linteau220x19x14_entire: [2.20, 0.19, 0.14],
  Linteau240x19x14_entire: [2.40, 0.19, 0.14],
  Linteau260x19x14_entire: [2.60, 0.19, 0.14],
  Linteau280x19x14_entire: [2.80, 0.19, 0.14],
  Linteau300x19x14_entire: [3.00, 0.19, 0.14],
  Linteau100x19x9_entire: [1.00, 0.19, 0.09],
  Linteau120x19x9_entire: [1.20, 0.19, 0.09],
  Linteau160x19x9_entire: [1.60, 0.19, 0.09],
  Linteau180x19x9_entire: [1.80, 0.19, 0.09],
  Linteau200x19x9_entire: [2.00, 0.19, 0.09],
  Linteau220x19x9_entire: [2.20, 0.19, 0.09],
  Linteau240x19x9_entire: [2.40, 0.19, 0.09],
  Linteau260x19x9_entire: [2.60, 0.19, 0.09],
  Linteau280x19x9_entire: [2.80, 0.19, 0.09],
  Linteau300x19x9_entire: [3.00, 0.19, 0.09],
  Linteau100x19x19_entire: [1.00, 0.19, 0.19],
  Linteau120x19x19_entire: [1.20, 0.19, 0.19],
  Linteau160x19x19_entire: [1.60, 0.19, 0.19],
  Linteau180x19x19_entire: [1.80, 0.19, 0.19],
  Linteau200x19x19_entire: [2.00, 0.19, 0.19],
  Linteau220x19x19_entire: [2.20, 0.19, 0.19],
  Linteau240x19x19_entire: [2.40, 0.19, 0.19],
  Linteau260x19x19_entire: [2.60, 0.19, 0.19],
  Linteau280x19x19_entire: [2.80, 0.19, 0.19],
  Linteau300x19x19_entire: [3.00, 0.19, 0.19],
}

const COLOR_MAP = {
  M50: "#e07b39",
  M57: "#c0392b",
  M65: "#8e44ad",
  M90: "#2980b9",
  WF: "#27ae60",
  WFD: "#16a085",
  // Set Bloc colors to light grey
  Bloc9: "#D3D3D3",
  Bloc14: "#D3D3D3",
  Bloc19: "#D3D3D3",
  Bloc29: "#D3D3D3",
  ElementVide: "#ADD8E6",
  ElementVide1: "#ADD8E6",
  ElementVide2: "#ADD8E6",
  ElementVide4: "#ADD8E6",
  ElementVide5: "#ADD8E6",
  // Set all Linteau colors to medium grey (concrete color)
  Linteau120x19x14: "#989898",
  Linteau140x19x14: "#989898",
  Linteau160x19x14: "#989898",
  Linteau180x19x14: "#989898",
  Linteau200x19x14: "#989898",
  Linteau220x19x14: "#989898",
  Linteau240x19x14: "#989898",
  Linteau260x19x14: "#989898",
  Linteau280x19x14: "#989898",
  Linteau300x19x14: "#989898",
  Linteau100x19x9: "#989898",
  Linteau120x19x9: "#989898",
  Linteau160x19x9: "#989898",
  Linteau180x19x9: "#989898",
  Linteau200x19x9: "#989898",
  Linteau220x19x9: "#989898",
  Linteau240x19x9: "#989898",
  Linteau260x19x9: "#989898",
  Linteau280x19x9: "#989898",
  Linteau300x19x9: "#989898",
  Linteau100x19x19: "#989898",
  Linteau120x19x19: "#989898",
  Linteau160x19x19: "#989898",
  Linteau180x19x19: "#989898",
  Linteau200x19x19: "#989898",
  Linteau220x19x19: "#989898",
  Linteau240x19x19: "#989898",
  Linteau260x19x19: "#989898",
  Linteau280x19x19: "#989898",
  Linteau300x19x19: "#989898",
}

const SIZE_COLOR_MAP = {
  entire: "#ff0000",
  three_quarter: "#00ff00",
  half: "#0000ff",
  quarter: "#ffff00",
}

const BRICK_TYPES = [
  "M50",
  "M57",
  "M65",
  "M90",
  "WF",
  "WFD",
  "Bloc9",
  "Bloc14",
  "Bloc19",
  "Bloc29",
  "ElementVide",
  "ElementVide1",
  "ElementVide2",
  "ElementVide4",
  "ElementVide5",
  "Linteau120x19x14",
  "Linteau140x19x14",
  "Linteau160x19x14",
  "Linteau180x19x14",
  "Linteau200x19x14",
  "Linteau220x19x14",
  "Linteau240x19x14",
  "Linteau260x19x14",
  "Linteau280x19x14",
  "Linteau300x19x14",
  "Linteau100x19x9",
  "Linteau120x19x9",
  "Linteau160x19x9",
  "Linteau180x19x9",
  "Linteau200x19x9",
  "Linteau220x19x9",
  "Linteau240x19x9",
  "Linteau260x19x9",
  "Linteau280x19x9",
  "Linteau300x19x9",
  "Linteau100x19x19",
  "Linteau120x19x19",
  "Linteau160x19x19",
  "Linteau180x19x19",
  "Linteau200x19x19",
  "Linteau220x19x19",
  "Linteau240x19x19",
  "Linteau260x19x19",
  "Linteau280x19x19",
  "Linteau300x19x19",
]
const SIZE_VARIANTS = ["entire", "three_quarter", "half", "quarter"]
const VERSION = "1.0.0"

// State
let state = {
  layers: [
    [
      /* assise 0 */
    ],
  ],
  currentLayer: 0,
  selectedSize: "M50_entire",
  hoverPoint: null,
  jointThickness: 0.012,
  rotationY: 0,
  whiteBricks: false,
  deleteMode: false,
  moveMode: false,
  rotateMode: false,
  projectTitle: "",
  layerboxPos: { x: 60, y: 360 },
  titleInputPos: { x: window.innerWidth / 2 - 150, y: 50 },
  history: [
    {
      layers: [
        [
          /* assise 0 */
        ],
      ],
      projectTitle: "",
    },
  ],
  historyIndex: 0,
  selectedBrick: null,
  ghostBrick: null,
}

// Three.js Setup
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
)
camera.position.set(0.5, 0.5, 1)
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  preserveDrawingBuffer: true,
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.shadowMap.autoUpdate = false

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.position.set(1, 2, 2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(2048, 2048)
directionalLight.shadow.camera.left = -2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.near = 0.1
directionalLight.shadow.camera.far = 10

const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enablePan = true
controls.enableZoom = true
controls.enableRotate = true

const planeGeometry = new THREE.PlaneGeometry(4, 4)
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xf0f0f0,
  visible: true,
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -Math.PI / 2

const shadowMaterial = new THREE.ShadowMaterial({ opacity: 0.5 })
const shadowPlane = new THREE.Mesh(planeGeometry, shadowMaterial)
shadowPlane.rotation.x = -Math.PI / 2
shadowPlane.receiveShadow = true

const gridHelper = new THREE.GridHelper(4, 400, 0x000000, 0x000000)
gridHelper.material.opacity = 0.2
gridHelper.material.transparent = true
gridHelper.visible = false

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

// Sky Texture
function createSkyTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 512
  const context = canvas.getContext("2d")
  const gradient = context.createLinearGradient(0, 0, 0, 512)
  gradient.addColorStop(0, "#87CEEB")
  gradient.addColorStop(1, "#FFFFFF")
  context.fillStyle = gradient
  context.fillRect(0, 0, 512, 512)
  return new THREE.CanvasTexture(canvas)
}

// Initialization
function initThreeJS() {
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.getElementById("app").appendChild(renderer.domElement)
  scene.background = createSkyTexture()
  scene.add(ambientLight, directionalLight, plane, shadowPlane, gridHelper)
  updateBrickSizeOptions(); // Call this to initialize size options
}

// Brick Creation
function createBrick(
  position,
  size,
  type,
  transparent = false,
  highlight = false,
  rotation = [0, 0, 0],
  isJointAligned = false,
) {
  const geometry = new THREE.BoxGeometry(...size)
  const brickType = type.split("_")[0]
  const brickSize = type.split("_")[1]
  const isElementVide = brickType.startsWith("ElementVide")
  const color = transparent
    ? isJointAligned
      ? "#0000ff"
      : "#00ff00"
    : state.whiteBricks
      ? "#ffffff"
      : highlight
        ? "#00ffff"
        : SIZE_COLOR_MAP[brickSize] || COLOR_MAP[brickType] || "orange"
  const material = new THREE.MeshStandardMaterial({
    color,
    transparent: isElementVide || transparent,
    opacity: isElementVide ? 0.3 : transparent ? 0.3 : 1,
    wireframe: transparent && !isElementVide,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(...position)
  mesh.rotation.set(...rotation)
  mesh.castShadow = !transparent && !isElementVide
  mesh.receiveShadow = true
  mesh.userData.type = type

  if (!transparent && !isElementVide) {
    const edges = new THREE.EdgesGeometry(geometry)
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 1,
    })
    const edgeLines = new THREE.LineSegments(edges, edgeMaterial)
    edgeLines.position.set(...position)
    edgeLines.rotation.set(...rotation)
    mesh.userData.edges = edgeLines
  }

  return mesh
}

// Scene Update
function updateScene() {
  scene.children = scene.children.filter(
    (child) =>
      (!child.isMesh && !child.isLineSegments) ||
      child === plane ||
      child === shadowPlane ||
      child === gridHelper,
  )
  let hoveredBrick = null

  if (state.deleteMode || state.moveMode || state.rotateMode) {
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(
      scene.children.filter(
        (child) => child.isMesh && child !== plane && child !== shadowPlane,
      ),
    )
    if (intersects.length > 0) {
      hoveredBrick = intersects[0].object
    }
  }

  state.layers.flat().forEach(([x, y, z, type, rotY], index) => {
    const isHovered =
      (state.deleteMode || state.moveMode || state.rotateMode) &&
      hoveredBrick &&
      Math.abs(hoveredBrick.position.x - x) < 0.001 &&
      Math.abs(hoveredBrick.position.y - y) < 0.001 &&
      Math.abs(hoveredBrick.position.z - z) < 0.001
    const brick = createBrick(
      [x, y, z],
      BRICK_SIZES[type],
      type,
      false,
      isHovered,
      [0, rotY || 0, 0],
    )
    brick.userData.index = index
    brick.userData.layerIndex = state.layers.findIndex((layer) =>
      layer.some((b) => b[0] === x && b[1] === y && b[2] === z),
    )
    scene.add(brick)
    if (brick.userData.edges) scene.add(brick.userData.edges)
  })

  if (
    state.hoverPoint &&
    !state.deleteMode &&
    !state.moveMode &&
    !state.rotateMode
  ) {
    const { snapX, snapZ, isJointAligned } = snapToGrid(
      state.hoverPoint,
      state.selectedSize,
    )
    const y = getBrickY(BRICK_SIZES[state.selectedSize])
    const hoverBrick = createBrick(
      [snapX, y, snapZ],
      BRICK_SIZES[state.selectedSize],
      state.selectedSize,
      true,
      false,
      [0, state.rotationY, 0],
      isJointAligned,
    )
    scene.add(hoverBrick)
  }

  if (state.moveMode && state.selectedBrick && state.hoverPoint) {
    const { snapX, snapZ, isJointAligned } = snapToGrid(
      state.hoverPoint,
      state.selectedBrick[3],
    )
    const y = state.selectedBrick[1]
    state.ghostBrick = createBrick(
      [snapX, y, snapZ],
      BRICK_SIZES[state.selectedBrick[3]],
      state.selectedBrick[3],
      true,
      false,
      [0, state.selectedBrick[4] || 0, 0],
      isJointAligned,
    )
    scene.add(state.ghostBrick)
  }

  if (state.rotateMode && state.selectedBrick) {
    const [x, y, z, type] = state.selectedBrick
    const rotation = [
      (document.getElementById("rotate-slider").value * Math.PI) / 180,
    ]
    state.ghostBrick = createBrick(
      [x, y, z],
      BRICK_SIZES[type],
      type,
      true,
      false,
      [0, rotation, 0],
    )
    scene.add(state.ghostBrick)
  }

  updateBrickCount()
  renderer.shadowMap.needsUpdate = true
  updateInstructions()
}

// Snap to Grid
function snapToGrid(point, sizeType, excludeBrick = null) {
  let snapX = Math.round(point.x * 100) / 100
  let snapZ = Math.round(point.z * 100) / 100
  const threshold = state.jointThickness + 0.001
  const allPositions = state.layers
    .flat()
    .filter(
      (b) =>
        !excludeBrick ||
        !(
          Math.abs(b[0] - excludeBrick[0]) < 0.001 &&
          Math.abs(b[1] - excludeBrick[1]) < 0.001 &&
          Math.abs(b[2] - excludeBrick[2]) < 0.001
        ),
    )

  for (const [x, , z] of allPositions) {
    if (Math.abs(snapX - x) <= threshold) snapX = x
    if (Math.abs(snapZ - z) <= threshold) snapZ = z
  }

  const size = BRICK_SIZES[sizeType]
  const rotationY = state.rotationY
  let offsetX = 0,
    offsetZ = 0

  if (!state.deleteMode && !state.moveMode && !state.rotateMode) {
    const cosRY = Math.cos(rotationY)
    const sinRY = Math.sin(rotationY)
    const halfWidth = size[0] / 2
    const halfDepth = size[2] / 2

    offsetX = halfWidth * cosRY + halfDepth * sinRY
    offsetZ = halfWidth * sinRY - halfDepth * cosRY

    snapX += offsetX
    snapZ += offsetZ
  }

  const y = excludeBrick ? excludeBrick[1] : getBrickY(size)

  const isJointAligned = state.layers[state.currentLayer].some(([x, y2, z]) => {
    if (y !== y2) return false
    const dx = Math.abs(snapX - offsetX - x)
    const dz = Math.abs(snapZ - offsetZ - z)
    return (
      (Math.abs(dx - state.jointThickness) < 0.001 && dz < 0.001) ||
      (Math.abs(dz - state.jointThickness) < 0.001 && dx < 0.001)
    )
  })

  return { snapX, snapZ, isJointAligned }
}

// Instructions Update
function updateInstructions() {
  const instructionBar = document.getElementById("instruction-bar")
  if (state.deleteMode) {
    instructionBar.textContent = "Cliquez sur une brique pour la supprimer"
  } else if (state.moveMode) {
    instructionBar.textContent = state.selectedBrick
      ? "Déplacez la brique et cliquez pour confirmer la position"
      : "Sélectionnez une brique à déplacer"
  } else if (state.rotateMode) {
    instructionBar.textContent = state.selectedBrick
      ? "Ajustez la rotation et confirmez"
      : "Sélectionnez une brique à tourner"
  } else {
    instructionBar.textContent = "Double-cliquez pour placer une brique"
  }
}

// Brick Count Update
function updateBrickCount() {
  const counts = BRICK_TYPES.reduce((acc, type) => {
    // Exclude ElementVide types from counting
    if (type.startsWith("ElementVide")) {
      return acc;
    }
    acc[type] = {
      entire: state.layers.flat().filter((b) => b[3] === `${type}_entire`)
        .length,
      three_quarter: state.layers
        .flat()
        .filter((b) => b[3] === `${type}_three_quarter`).length,
      half: state.layers.flat().filter((b) => b[3] === `${type}_half`).length,
      quarter: state.layers.flat().filter((b) => b[3] === `${type}_quarter`)
        .length,
    }
    return acc
  }, {})

  let html =
    '<table class="border-collapse border border-gray-400 w-full text-sm">'
  html += '<thead><tr class="bg-gray-200">'
  html += '<th class="border border-gray-400 p-2">Type</th>'
  html += '<th class="border border-gray-400 p-2">Entière</th>'
  html += `<th class="border border-gray-400 p-2">Trois quarts</th>`
  html += `<th class="border border-gray-400 p-2">Demi</th>`
  html += `<th class="border border-gray-400 p-2">Quart</th>`
  html += "</tr></thead><tbody>"

  let hasNonZero = false
  BRICK_TYPES.forEach((type) => {
     // Also exclude ElementVide types from displaying in the table
    if (type.startsWith("ElementVide")) {
      return;
    }
    const typeCounts = counts[type]
    if (typeCounts && Object.values(typeCounts).some((count) => count > 0)) {
      hasNonZero = true
      html += `<tr><td class="border border-gray-400 p-2">${type}</td>`
      html += `<td class="border border-gray-400 p-2">${typeCounts.entire}</td>`
      // Only display columns for three_quarter, half, and quarter if they exist for the type
      if (!type.startsWith("Linteau")) {
         html += `<td class="border border-gray-400 p-2">${typeCounts.three_quarter}</td>`
         html += `<td class="border border-gray-400 p-2">${typeCounts.half}</td>`
         html += `<td class="border border-gray-400 p-2">${typeCounts.quarter}</td></tr>`
      } else {
         html += `<td class="border border-gray-400 p-2">0</td>`
         html += `<td class="border border-gray-400 p-2">0</td>`
         html += `<td class="border border-gray-400 p-2">0</td></tr>`
      }
    }
  })

  html += "</tbody></table>"
  document.getElementById("brick-type-counts").innerHTML = hasNonZero
    ? html
    : "Aucun élément placé"
}

// Utility Functions
function getBrickY(size) {
  return (
    size[1] / 2 +
    state.jointThickness +
    state.currentLayer * (size[1] + state.jointThickness)
  )
}

function saveState() {
  state.history = state.history.slice(0, state.historyIndex + 1)
  state.history.push({
    layers: JSON.parse(JSON.stringify(state.layers)),
    projectTitle: state.projectTitle,
  })
  state.historyIndex++
}

// Camera View Functions
function getSceneCenter() {
  const bounds = state.layers.flat().reduce(
    (acc, [x, y, z, type]) => {
      const size = BRICK_SIZES[type]
      return {
        minX: Math.min(acc.minX, x - size[0] / 2),
        maxX: Math.max(acc.maxX, x + size[0] / 2),
        minZ: Math.min(acc.minZ, z - size[2] / 2),
        maxZ: Math.max(acc.maxZ, z + size[2] / 2),
        maxY: Math.max(acc.maxY, y + size[1] / 2),
      }
    },
    { minX: 0, maxX: 0, minZ: 0, maxZ: 0, maxY: 0 },
  )
  return {
    x: (bounds.minX + bounds.maxX) / 2,
    y: bounds.maxY / 2,
    z: (bounds.minZ + bounds.maxZ) / 2,
  }
}

function setFrontView() {
  const center = getSceneCenter()
  camera.position.set(center.x, center.y, center.z + 1)
  controls.target.set(center.x, center.y, center.z)
  controls.update()
  renderer.render(scene, camera)
}

function setLeftView() {
  const center = getSceneCenter()
  camera.position.set(center.x - 1, center.y, center.z)
  controls.target.set(center.x, center.y, center.z)
  controls.update()
  renderer.render(scene, camera)
}

function setRightView() {
  const center = getSceneCenter()
  camera.position.set(center.x + 1, center.y, center.z)
  controls.target.set(center.x, center.y, center.z)
  controls.update()
  renderer.render(scene, camera)
}

function setObliqueView() {
  const center = getSceneCenter()
  camera.position.set(center.x + 0.5, center.y + 0.5, center.z + 0.5)
  controls.target.set(center.x, center.y, center.z)
  controls.update()
  renderer.render(scene, camera)
}

// Brick Operations
function addBrick(point) {
  if (!point || point.x === undefined || point.z === undefined) return
  const { snapX, snapZ } = snapToGrid(point, state.selectedSize)
  const y = getBrickY(BRICK_SIZES[state.selectedSize])
  saveState()
  state.layers[state.currentLayer].push([
    snapX,
    y,
    snapZ,
    state.selectedSize,
    state.rotationY,
  ])
  updateScene()
}

function deleteBrick() {
  const intersects = raycaster.intersectObjects(
    scene.children.filter(
      (child) => child.isMesh && child !== plane && child !== shadowPlane,
    ),
  )
  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object
    const position = clickedMesh.position
    saveState()
    state.layers = state.layers.map((layer) =>
      layer.filter(
        ([x, y, z]) =>
          !(
            Math.abs(x - position.x) < 0.001 &&
            Math.abs(y - position.y) < 0.001 &&
            Math.abs(z - position.z) < 0.001
          ),
      ),
    )
    state.deleteMode = false
    document
      .querySelectorAll("#delete-mode")
      .forEach((btn) => btn.classList.remove("delete-active"))
    updateScene()
  }
}

function selectBrickForMove() {
  const intersects = raycaster.intersectObjects(
    scene.children.filter(
      (child) => child.isMesh && child !== plane && child !== shadowPlane,
    ),
  )
  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object
    const layerIndex = clickedMesh.userData.layerIndex
    const brickIndex = state.layers[layerIndex].findIndex(
      ([x, y, z]) =>
        Math.abs(x - clickedMesh.position.x) < 0.001 &&
        Math.abs(y - clickedMesh.position.y) < 0.001 &&
        Math.abs(z - clickedMesh.position.z) < 0.001,
    )
    state.selectedBrick = [
      ...state.layers[layerIndex][brickIndex],
      layerIndex,
      brickIndex,
    ]
    updateScene()
  }
}

function confirmMove(point) {
  if (
    !point ||
    point.x === undefined ||
    point.z === undefined ||
    !state.selectedBrick
  )
    return
  const { snapX, snapZ } = snapToGrid(point, state.selectedBrick[3])
  saveState()
  state.layers[state.selectedBrick[5]][state.selectedBrick[6]] = [
    snapX,
    state.selectedBrick[1],
    snapZ,
    state.selectedBrick[3],
    state.selectedBrick[4],
  ]
  state.selectedBrick = null
  state.moveMode = false
  document
    .querySelectorAll("#move-mode")
    .forEach((btn) => btn.classList.remove("move-active"))
  updateScene()
}

function selectBrickForRotate() {
  const intersects = raycaster.intersectObjects(
    scene.children.filter(
      (child) => child.isMesh && child !== plane && child !== shadowPlane,
    ),
  )
  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object
    const layerIndex = clickedMesh.userData.layerIndex
    const brickIndex = state.layers[layerIndex].findIndex(
      ([x, y, z]) =>
        Math.abs(x - clickedMesh.position.x) < 0.001 &&
        Math.abs(y - clickedMesh.position.y) < 0.001 &&
        Math.abs(z - clickedMesh.position.z) < 0.001,
    )
    state.selectedBrick = [
      ...state.layers[layerIndex][brickIndex],
      layerIndex,
      brickIndex,
    ]
    const overlay = document.getElementById("rotate-overlay")
    overlay.style.display = "block"
    document.getElementById("rotate-slider").value =
      ((state.selectedBrick[4] || 0) * 180) / Math.PI
    document.getElementById("rotate-value").textContent =
      `${Math.round(((state.selectedBrick[4] || 0) * 180) / Math.PI)}°`
    updateScene()
  }
}

function confirmRotation() {
  const newRotation =
    (document.getElementById("rotate-slider").value * Math.PI) / 180
  saveState()
  state.layers[state.selectedBrick[5]][state.selectedBrick[6]][4] = newRotation
  state.selectedBrick = null
  state.rotateMode = false
  document
    .querySelectorAll("#rotate-mode")
    .forEach((btn) => btn.classList.remove("rotate-active"))
  document.getElementById("rotate-overlay").style.display = "none"
  updateScene()
}

// Layer Management
function addLayer() {
  saveState()
  state.layers.push([])
  state.currentLayer = state.layers.length - 1
  updateLayerSelect()
  updateScene()
}

function updateLayerSelect() {
  const select = document.getElementById("layer-select")
  select.innerHTML = state.layers
    .map(
      (_, i) =>
        `<option value="${i}" ${i === state.currentLayer ? "selected" : ""}>Assise ${i + 1}</option>`,
    )
    .join("")
}

// History Management
function undo() {
  if (state.historyIndex <= 0) return
  state.historyIndex--
  state.layers = JSON.parse(
    JSON.stringify(state.history[state.historyIndex].layers),
  )
  state.projectTitle = state.history[state.historyIndex].projectTitle
  document.getElementById("project-title").value = state.projectTitle
  updateLayerSelect()
  updateScene()
}

function redo() {
  if (state.historyIndex >= state.history.length - 1) return
  state.historyIndex++
  state.layers = JSON.parse(
    JSON.stringify(state.history[state.historyIndex].layers),
  )
  state.projectTitle = state.history[state.historyIndex].projectTitle
  document.getElementById("project-title").value = state.projectTitle
  updateLayerSelect()
  updateScene()
}

// Camera Control
function resetCamera() {
  camera.position.set(0.5, 0.5, 1)
  controls.target.set(0, 0, 0)
  controls.update()
  renderer.render(scene, camera)
}

// Export Functions
function exportPDF() {
  const originalWidth = window.innerWidth
  const originalHeight = window.innerHeight
  const exportWidth = 1920
  const exportHeight = Math.round(exportWidth * (27.7 / 21))
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "cm",
    format: [29.7, 21],
  })
  const width = pdf.internal.pageSize.getWidth()
  const height = pdf.internal.pageSize.getHeight()
  const appTitle = state.projectTitle || "Mur Simulateur 3d"
  let page = 1

  // Define elements to hide from inventory count in PDF
  const hiddenElementTypes = [
    "ElementVide",
    "ElementVide1",
    "ElementVide2",
    "ElementVide4",
    "ElementVide5",
  ]

  // Create filtered layers excluding hidden elements
  const originalLayers = JSON.parse(JSON.stringify(state.layers))
  const filteredLayers = state.layers.map((layer) =>
    layer.filter(
      (brick) => !hiddenElementTypes.some((type) => brick[3].startsWith(type)),
    ),
  )
  state.layers = filteredLayers

  renderer.setSize(exportWidth, exportHeight)
  renderer.setClearColor(0xffffff, 1)

  // Update scene with filtered layers
  updateScene()

  const bounds = filteredLayers.flat().reduce(
    (acc, [x, y, z, type]) => {
      const size = BRICK_SIZES[type] || [0, 0, 0] // Fallback for empty layers
      return {
        minX: Math.min(acc.minX, x - size[0] / 2),
        maxX: Math.max(acc.maxX, x + size[0] / 2),
        minZ: Math.min(acc.minZ, z - size[2] / 2),
        maxZ: Math.max(acc.maxZ, z + size[2] / 2),
        maxY: Math.max(acc.maxY, y + size[1] / 2),
      }
    },
    { minX: 0, maxX: 0, minZ: 0, maxZ: 0, maxY: 0 },
  )

  const centerX = (bounds.minX + bounds.maxX) / 2
  const centerZ = (bounds.minZ + bounds.maxZ) / 2
  const centerY = bounds.maxY / 2

  function addCommonElements(viewName, isFourthPage = false) {
    pdf.setLineWidth(0.05)
    pdf.line(1, height - 2, 1 + 1, height - 2)
    pdf.setFontSize(8)
    pdf.text("10 cm", 1, height - 1.5)
    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(16)
    pdf.text(appTitle, width / 2, isFourthPage ? 3.5 : 0.5, { align: "center" })
    pdf.setFontSize(12)
    pdf.text(viewName, width / 2, isFourthPage ? height - 3.5 : height - 1, {
      align: "center",
    })
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(8)
    pdf.text(
      appTitle,
      width - (isFourthPage ? 1.5 : 3),
      height - (isFourthPage ? 4.5 : 1.5),
      { align: "right" },
    )
    pdf.text(
      "Conçu par Julien BROHEZ",
      width - (isFourthPage ? 1.5 : 3),
      height - (isFourthPage ? 4 : 1),
      { align: "right" },
    )
    pdf.text(
      VERSION,
      width - (isFourthPage ? 1.5 : 3),
      height - (isFourthPage ? 3.5 : 0.5),
      { align: "right" },
    )
    pdf.text(`${page} sur 5`, 1.5, height - (isFourthPage ? 3.5 : 0.5))
  }

  function addMarginMarks() {
    pdf.setLineWidth(0.02)
    pdf.line(1, 10, 1, 11)
    pdf.line(28.7, 10, 28.7, 11)
    pdf.line(14.35, 1, 15.35, 1)
    pdf.line(14.35, 20, 15.35, 20)
  }

  // Top View
  renderer.shadowMap.enabled = false
  const originalPlaneVisible = plane.visible
  const originalShadowPlaneVisible = shadowPlane.visible
  plane.visible = false
  shadowPlane.visible = false
  scene.background = null
  const topCamera = new THREE.OrthographicCamera(
    -0.722,
    0.722,
    0.95,
    -0.95,
    0.1,
    100,
  )
  topCamera.position.set(centerX, 1, centerZ)
  topCamera.lookAt(centerX, 0, centerZ)
  renderer.render(scene, topCamera)
  pdf.addImage(
    renderer.domElement.toDataURL("image/png"),
    "PNG",
    7.63,
    1,
    14.44,
    19,
  )
  plane.visible = originalPlaneVisible
  shadowPlane.visible = originalShadowPlaneVisible
  addMarginMarks()
  addCommonElements("Vue de dessus")
  pdf.text("Échelle : 1/10", 1, height - 1)
  page++

  // Front View
  pdf.addPage()
  const frontLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-0.722, 0, 0),
      new THREE.Vector3(0.722, 0, 0),
    ]),
    new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 5 }),
  )
  scene.add(frontLine)
  renderer.shadowMap.enabled = true
  const frontCamera = new THREE.OrthographicCamera(
    -0.722,
    0.722,
    0.95,
    -0.95,
    0.1,
    100,
  )
  frontCamera.position.set(centerX, centerY, 0.722)
  frontCamera.lookAt(centerX, centerY, 0)
  renderer.render(scene, frontCamera)
  pdf.addImage(
    renderer.domElement.toDataURL("image/png"),
    "PNG",
    7.63,
    1,
    14.44,
    19,
  )
  addMarginMarks()
  addCommonElements("Vue de face")
  pdf.text("Échelle : 1/10", 1, height - 1)
  scene.remove(frontLine)
  page++

  // Side View
  pdf.addPage()
  const sideLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, -0.95),
      new THREE.Vector3(0, 0, 0.95)],
    ),
    new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 5 }),
  )
  scene.add(sideLine)
  const sideCamera = new THREE.OrthographicCamera(
    -0.722,
    0.722,
    0.95,
    -0.95,
    0.1,
    100,
  )
  sideCamera.position.set(0.722, centerY, centerZ)
  sideCamera.lookAt(0, centerY, centerZ)
  renderer.render(scene, sideCamera)
  pdf.addImage(
    renderer.domElement.toDataURL("image/png"),
    "PNG",
    7.63,
    1,
    14.44,
    19,
  )
  addMarginMarks()
  addCommonElements("Vue de côté")
  pdf.text("Échelle : 1/10", 1, height - 1)
  scene.remove(sideLine)
  page++

  // 3D View
  pdf.addPage()
  renderer.shadowMap.enabled = true
  scene.background = createSkyTexture()
  camera.aspect = exportWidth / exportHeight
  camera.updateProjectionMatrix()
  camera.lookAt(controls.target)
  renderer.render(scene, camera)
  pdf.addImage(
    renderer.domElement.toDataURL("image/png"),
    "PNG",
    7.63,
    1,
    14.44,
    19,
  )
  addMarginMarks()
  addCommonElements("Vue 3D", true)
  page++

  // Inventory Page
  pdf.addPage()
  pdf.setFont("helvetica", "bold")
  pdf.setFontSize(16)
  pdf.text(appTitle, width / 2, 0.5, { align: "center" })
  pdf.setFontSize(12)
  pdf.text("Inventaire des éléments", width / 2, 1, { align: "center" })
  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(10)
  let y = 2
  BRICK_TYPES.forEach((type) => {
    if (hiddenElementTypes.includes(type)) return // Skip hidden elements
    // For lintels, only count the 'entire' size
    if (type.startsWith("Linteau")) {
      const count = filteredLayers.flat().filter((b) => b[3] === `${type}_entire`).length;
      if (count > 0) {
        pdf.text(`${type} (Entière): ${count} éléments`, 1, y);
        y += 1;
      }
    } else {
      // For other brick types, count all size variants
      SIZE_VARIANTS.forEach((variant) => {
        const count = filteredLayers
          .flat()
          .filter((b) => b[3] === `${type}_${variant}`).length
        if (count > 0) {
          pdf.text(`${type} (${variant}): ${count} éléments`, 1, y)
          y += 1
        }
      })
    }
  })
  pdf.setFontSize(8)
  pdf.text(appTitle, width - 3, height - 1.5, { align: "right" })
  pdf.text("Conçu par Julien BROHEZ", width - 3, height - 1, { align: "right" })
  pdf.text(VERSION, width - 3, height - 0.5, { align: "right" })
  pdf.text(`${page} sur 5`, 1, height - 0.5)

  // Restore original layers and scene
  state.layers = originalLayers
  renderer.setSize(originalWidth, originalHeight)
  camera.aspect = originalWidth / originalHeight
  camera.updateProjectionMatrix()
  renderer.shadowMap.enabled = true
  scene.background = createSkyTexture()
  renderer.setClearColor(0x000000, 0)
  updateScene()

  pdf.save("vue-elements.pdf")
}

function exportPNG() {
  renderer.render(scene, camera)
  const canvas = state.projectTitle ? createTitledCanvas() : renderer.domElement
  const link = document.createElement("a")
  link.download = "vue-elements.png"
  link.href = canvas.toDataURL("image/png")
  link.click()
}

function createTitledCanvas() {
  const canvas = document.createElement("canvas")
  canvas.width = renderer.domElement.width
  canvas.height = renderer.domElement.height
  const ctx = canvas.getContext("2d")
  ctx.drawImage(renderer.domElement, 0, 0)
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, canvas.width, 50)
  ctx.fillStyle = "#000000"
  ctx.font = "bold 30px Helvetica"
  ctx.textAlign = "center"
  ctx.fillText(state.projectTitle, canvas.width / 2, 40)
  return canvas
}

// File Operations
function saveFile() {
  const data = JSON.stringify({
    layers: state.layers,
    projectTitle: state.projectTitle,
  })
  const blob = new Blob([data], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "wall-design.json"
  link.click()
  URL.revokeObjectURL(url)
}

function openFile() {
  document.getElementById("file-input").click()
}

function validateLayers(data) {
  if (!data || typeof data !== "object") return false
  if (!Array.isArray(data.layers)) return false
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
          BRICK_SIZES[brick[3]],
      ),
  )
}

// Notification
function showNotification(message) {
  const notification = document.getElementById("notification")
  notification.textContent = message
  notification.style.display = "block"
  notification.style.left = "50%"
  notification.style.top = "10px"
  notification.style.transform = "translateX(-50%)"
  setTimeout(() => {
    notification.style.display = "none"
  }, 3000)
}

// Function to update brick size options based on type
function updateBrickSizeOptions() {
  const brickTypeSelect = document.getElementById("brick-type");
  const brickSizeSelect = document.getElementById("brick-size");
  const selectedBrickType = brickTypeSelect.value;

  // Clear existing options
  brickSizeSelect.innerHTML = "";

  // Add size options based on selected brick type
  if (selectedBrickType.startsWith("Linteau")) {
    const option = document.createElement("option");
    option.value = "entire";
    option.textContent = "Entière";
    brickSizeSelect.appendChild(option);
  } else {
    SIZE_VARIANTS.forEach(variant => {
      const option = document.createElement("option");
      option.value = variant;
      option.textContent = {
        entire: "Entière",
        three_quarter: "Trois quarts",
        half: "Demi",
        quarter: "Quart"
      }[variant];
      brickSizeSelect.appendChild(option);
    });
  }
   // Set the selected size based on the first available option
   state.selectedSize = `${selectedBrickType}_${brickSizeSelect.value}`;
   updateScene();
}


// Event Listeners
const eventListeners = {
  global: () => {
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      state.titleInputPos.x = window.innerWidth / 2 - 150
      document.getElementById("title-input").style.left =
        `${state.titleInputPos.x}px`
    })

    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault()
        undo()
      } else if (e.ctrlKey && e.key === "y") {
        e.preventDefault()
        redo()
      }
    })

    renderer.domElement.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects([plane])
      state.hoverPoint = intersects.length > 0 ? intersects[0].point : null
      updateScene()
    })

    renderer.domElement.addEventListener("dblclick", (e) => {
      if (!state.deleteMode && !state.moveMode && !state.rotateMode) {
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects([plane])
        if (intersects.length > 0) addBrick(intersects[0].point)
      }
    })

    renderer.domElement.addEventListener("click", (e) => {
      if (state.deleteMode) {
        deleteBrick()
      } else if (state.moveMode) {
        if (!state.selectedBrick) {
          selectBrickForMove()
        } else {
          raycaster.setFromCamera(mouse, camera)
          const intersects = raycaster.intersectObjects([plane])
          if (intersects.length > 0) confirmMove(intersects[0].point)
        }
      } else if (state.rotateMode && !state.selectedBrick) {
        selectBrickForRotate()
      }
    })
  },
  ui: () => {
    document.getElementById("start-button").addEventListener("click", () => {
      document.getElementById("homepage").style.display = "none"
      document.getElementById("app").style.display = "block"
      initThreeJS()
      updateScene()
      updateLayerSelect()
    })

    document.getElementById("brick-type").addEventListener("change", (e) => {
      updateBrickSizeOptions(); // Call this to update size options
    })

    document.getElementById("brick-size").addEventListener("change", (e) => {
      state.selectedSize = `${document.getElementById("brick-type").value}_${e.target.value}`
      updateScene()
    })

    document.getElementById("rotation-y").addEventListener("input", (e) => {
      state.rotationY = (e.target.value * Math.PI) / 180
      document.getElementById("rotation-value").textContent =
        `${e.target.value}°`
      updateScene()
    })

    document
      .getElementById("joint-thickness")
      .addEventListener("input", (e) => {
        state.jointThickness = parseFloat(e.target.value) / 100
        updateScene()
      })

    document.getElementById("layer-select").addEventListener("change", (e) => {
      state.currentLayer = parseInt(e.target.value)
      updateScene()
    })

    document.getElementById("add-layer-btn").addEventListener("click", addLayer)

    document.getElementById("project-title").addEventListener("input", (e) => {
      state.projectTitle = e.target.value
      saveState()
    })

    document
      .getElementById("toggle-white-bricks")
      .addEventListener("click", (e) => {
        e.preventDefault()
        state.whiteBricks = !state.whiteBricks
        updateScene()
      })

    document.getElementById("toggle-grid").addEventListener("click", (e) => {
      e.preventDefault()
      gridHelper.visible = !gridHelper.visible
      updateScene()
    })

    document.getElementById("reset-camera").addEventListener("click", (e) => {
      e.preventDefault()
      resetCamera()
    })

    document
      .getElementById("view-front")
      .addEventListener("click", setFrontView)
    document.getElementById("view-left").addEventListener("click", setLeftView)
    document
      .getElementById("view-right")
      .addEventListener("click", setRightView)
    document
      .getElementById("view-oblique")
      .addEventListener("click", setObliqueView)

    document.getElementById("save-file").addEventListener("click", (e) => {
      e.preventDefault()
      saveFile()
    })

    document.getElementById("open-file").addEventListener("click", (e) => {
      e.preventDefault()
      openFile()
    })

    document.getElementById("export-pdf").addEventListener("click", (e) => {
      e.preventDefault()
      exportPDF()
    })

    document.getElementById("export-png").addEventListener("click", (e) => {
      e.preventDefault()
      exportPNG()
    })

    document.getElementById("file-input").addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result)
            if (validateLayers(data)) {
              saveState()
              state.layers = data.layers
              state.projectTitle = data.projectTitle || ""
              state.currentLayer = 0
              document.getElementById("project-title").value =
                state.projectTitle
              updateLayerSelect()
              updateScene()
            } else {
              showNotification("Fichier invalide ou corrompu.")
            }
          } catch (err) {
            showNotification("Erreur lors de la lecture du fichier.")
          }
        }
        reader.readAsText(file)
      }
    })

    document.getElementById("select-mode").addEventListener("click", () => {
      state.deleteMode = false
      state.moveMode = false
      state.rotateMode = false
      state.selectedBrick = null
      document.getElementById("rotate-overlay").style.display = "none"
      document
        .querySelectorAll("#delete-mode")
        .forEach((btn) => btn.classList.remove("delete-active"))
      document
        .querySelectorAll("#move-mode")
        .forEach((btn) => btn.classList.remove("move-active"))
      document
        .querySelectorAll("#rotate-mode")
        .forEach((btn) => btn.classList.remove("rotate-active"))
      updateScene()
    })

    document.getElementById("place-mode").addEventListener("click", () => {
      state.deleteMode = false
      state.moveMode = false
      state.rotateMode = false
      state.selectedBrick = null
      document.getElementById("rotate-overlay").style.display = "none"
      document
        .querySelectorAll("#delete-mode")
        .forEach((btn) => btn.classList.remove("delete-active"))
      document
        .querySelectorAll("#move-mode")
        .forEach((btn) => btn.classList.remove("move-active"))
      document
        .querySelectorAll("#rotate-mode")
        .forEach((btn) => btn.classList.remove("rotate-active"))
      updateScene()
    })

    document.getElementById("delete-mode").addEventListener("click", () => {
      state.deleteMode = !state.deleteMode
      state.moveMode = false
      state.rotateMode = false
      state.selectedBrick = null
      document.getElementById("rotate-overlay").style.display = "none"
      document
        .querySelectorAll("#delete-mode")
        .forEach((btn) => btn.classList.toggle("delete-active"))
      document
        .querySelectorAll("#move-mode")
        .forEach((btn) => btn.classList.remove("move-active"))
      document
        .querySelectorAll("#rotate-mode")
        .forEach((btn) => btn.classList.remove("rotate-active"))
      updateScene()
    })

    document.getElementById("move-mode").addEventListener("click", () => {
      state.moveMode = !state.moveMode
      state.deleteMode = false
      state.rotateMode = false
      state.selectedBrick = null
      document.getElementById("rotate-overlay").style.display = "none"
      document
        .querySelectorAll("#move-mode")
        .forEach((btn) => btn.classList.toggle("move-active"))
      document
        .querySelectorAll("#delete-mode")
        .forEach((btn) => btn.classList.remove("delete-active"))
      document
        .querySelectorAll("#rotate-mode")
        .forEach((btn) => btn.classList.remove("rotate-active"))
      updateScene()
    })

    document.getElementById("rotate-mode").addEventListener("click", () => {
      state.rotateMode = !state.rotateMode
      state.deleteMode = false
      state.moveMode = false
      state.selectedBrick = null
      document.getElementById("rotate-overlay").style.display = "none"
      document
        .querySelectorAll("#rotate-mode")
        .forEach((btn) => btn.classList.toggle("rotate-active"))
      document
        .querySelectorAll("#delete-mode")
        .forEach((btn) => btn.classList.remove("delete-active"))
      document
        .querySelectorAll("#move-mode")
        .forEach((btn) => btn.classList.remove("move-active"))
      updateScene()
    })

    document.getElementById("rotate-slider").addEventListener("input", (e) => {
      document.getElementById("rotate-value").textContent = `${e.target.value}°`
      updateScene()
    })

    document
      .getElementById("confirm-rotation")
      .addEventListener("click", confirmRotation)

    document.getElementById("undo").addEventListener("click", undo)
    document.getElementById("redo").addEventListener("click", redo)

    document
      .getElementById("keyboard-shortcuts")
      .addEventListener("click", (e) => {
        e.preventDefault()
        showNotification("Raccourcis : Ctrl+Z (Annuler), Ctrl+Y (Refaire)")
      })

    document.getElementById("about").addEventListener("click", (e) => {
      e.preventDefault()
      showNotification("Mur Simulateur 3D v1.0.0 par Julien Brohez")
    })

    // Draggable Layerbox
    let isDraggingLayerbox = false
    let currentXLayerbox,
      currentYLayerbox,
      xOffsetLayerbox = 0,
      yOffsetLayerbox = 0
    const layerbox = document.getElementById("layerbox")

    layerbox.addEventListener("mousedown", (e) => {
      isDraggingLayerbox = true
      currentXLayerbox = e.clientX - xOffsetLayerbox
      currentYLayerbox = e.clientY - yOffsetLayerbox
      layerbox.style.cursor = "grabbing"
    })

    document.addEventListener("mousemove", (e) => {
      if (isDraggingLayerbox) {
        xOffsetLayerbox = e.clientX - currentXLayerbox
        yOffsetLayerbox = e.clientY - currentYLayerbox
        layerbox.style.left = `${state.layerboxPos.x + xOffsetLayerbox}px`
        layerbox.style.top = `${state.layerboxPos.y + yOffsetLayerbox}px`
      }
    })

    document.addEventListener("mouseup", () => {
      if (isDraggingLayerbox) {
        state.layerboxPos.x += xOffsetLayerbox
        state.layerboxPos.y += yOffsetLayerbox
        xOffsetLayerbox = 0
        yOffsetLayerbox = 0
        isDraggingLayerbox = false
        layerbox.style.cursor = "move"
      }
    })

    // Draggable Title Input
    let isDraggingTitle = false
    let currentXTitle,
      currentYTitle,
      xOffsetTitle = 0,
      yOffsetTitle = 0
    const titleInput = document.getElementById("title-input")

    titleInput.addEventListener("mousedown", (e) => {
      isDraggingTitle = true
      currentXTitle = e.clientX - xOffsetTitle
      currentYTitle = e.clientY - yOffsetTitle
      titleInput.style.cursor = "grabbing"
    })

    document.addEventListener("mousemove", (e) => {
      if (isDraggingTitle) {
        xOffsetTitle = e.clientX - currentXTitle
        yOffsetTitle = e.clientY - currentYTitle
        titleInput.style.left = `${state.titleInputPos.x + xOffsetTitle}px`
        titleInput.style.top = `${state.titleInputPos.y + yOffsetTitle}px`
        titleInput.style.transform = "none"
      }
    })

    document.addEventListener("mouseup", () => {
      if (isDraggingTitle) {
        state.titleInputPos.x += xOffsetTitle
        state.titleInputPos.y += yOffsetTitle
        xOffsetTitle = 0
        yOffsetTitle = 0
        isDraggingTitle = false
        titleInput.style.cursor = "move"
      }
    })
  },
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

// Initialize
eventListeners.global()
eventListeners.ui()
animate()
