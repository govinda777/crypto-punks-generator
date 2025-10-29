// Color palette
const COLORS = {
  skin: {
    Light: '#F0D0B0',
    Medium: '#D0A080',
    Dark: '#906050',
    Albino: '#E0E0E0',
    Green: '#70A080',
    Brown: '#8B6540',
    Blue: '#7090C0'
  },
  hair: {
    Black: '#202020',
    Brown: '#604030',
    Blonde: '#E0C080',
    Red: '#C04040',
    White: '#E0E0E0',
    Purple: '#8040A0',
    Green: '#40A060'
  },
  accessory: {
    Gold: '#FFD700',
    Silver: '#C0C0C0',
    Black: '#202020',
    Red: '#C04040',
    Blue: '#4060C0',
    White: '#FFFFFF',
    Brown: '#604030'
  }
};

// Rarity levels
const RARITY_LEVELS = {
  0: 'Ultra Rare',
  1: 'Very Rare',
  2: 'Common',
  3: 'Common',
  4: 'Rare',
  5: 'Very Rare',
  6: 'Ultra Rare',
  7: 'Legendary'
};

// State management
let generationCount = 0;
let collection = [];

// Canvas setup
const canvas = document.getElementById('characterCanvas');
const ctx = canvas.getContext('2d');
const PIXEL_SIZE = 20; // Each pixel is 20x20px on the display canvas
const GRID_SIZE = 24; // 24x24 pixel grid

// Initialize
function init() {
  // Add event listeners to all selects
  document.querySelectorAll('.layer-select').forEach(select => {
    select.addEventListener('change', updateCharacter);
  });

  // Action buttons
  document.getElementById('generateRandomBtn').addEventListener('click', generateRandom);
  document.getElementById('clearAllBtn').addEventListener('click', clearAll);
  document.getElementById('downloadPngBtn').addEventListener('click', downloadPNG);
  document.getElementById('saveCollectionBtn').addEventListener('click', saveToCollection);

  // Initial render
  updateCharacter();
}

// Draw a pixel on the canvas
function drawPixel(x, y, color) {
  if (!color || color === 'transparent') return;
  ctx.fillStyle = color;
  ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
}

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw base character (head shape)
function drawBase(baseType, skinTone) {
  const color = COLORS.skin[skinTone];
  
  // Draw basic head shape (simplified)
  for (let y = 6; y < 18; y++) {
    for (let x = 8; x < 16; x++) {
      drawPixel(x, y, color);
    }
  }
  
  // Draw ears
  drawPixel(7, 10, color);
  drawPixel(7, 11, color);
  drawPixel(16, 10, color);
  drawPixel(16, 11, color);
  
  // Draw eyes
  const eyeColor = '#000000';
  drawPixel(10, 11, eyeColor);
  drawPixel(13, 11, eyeColor);
  
  // Draw nose
  drawPixel(11, 13, COLORS.accessory.Brown);
  drawPixel(12, 13, COLORS.accessory.Brown);
  
  // Draw mouth
  drawPixel(10, 15, '#400000');
  drawPixel(11, 15, '#400000');
  drawPixel(12, 15, '#400000');
  drawPixel(13, 15, '#400000');
}

// Draw hair
function drawHair(hairStyle) {
  if (hairStyle === 'None') return;
  
  let color = COLORS.hair.Brown;
  
  if (hairStyle.includes('Blonde')) color = COLORS.hair.Blonde;
  else if (hairStyle.includes('Red')) color = COLORS.hair.Red;
  else if (hairStyle.includes('Purple')) color = COLORS.hair.Purple;
  else if (hairStyle.includes('White')) color = COLORS.hair.White;
  else if (hairStyle.includes('Wild')) color = COLORS.hair.Black;
  
  switch (hairStyle) {
    case 'Mohawk':
    case 'Red Mohawk':
      // Center mohawk
      for (let y = 3; y < 8; y++) {
        drawPixel(11, y, color);
        drawPixel(12, y, color);
      }
      break;
      
    case 'Wild Hair':
    case 'Crazy Hair':
      // Messy all over
      for (let x = 7; x < 17; x++) {
        for (let y = 4; y < 7; y++) {
          if (Math.random() > 0.3) drawPixel(x, y, color);
        }
      }
      break;
      
    case 'Messy Hair':
    case 'Frumpy Hair':
      // Top and sides
      for (let x = 8; x < 16; x++) {
        drawPixel(x, 5, color);
        drawPixel(x, 6, color);
      }
      break;
      
    case 'Blonde Bob':
      // Short bob
      for (let x = 8; x < 16; x++) {
        drawPixel(x, 5, color);
        drawPixel(x, 6, color);
      }
      drawPixel(7, 7, color);
      drawPixel(7, 8, color);
      drawPixel(16, 7, color);
      drawPixel(16, 8, color);
      break;
      
    case 'Purple Hair':
    case 'Vampire Hair':
      // Slicked back
      for (let x = 9; x < 15; x++) {
        drawPixel(x, 4, color);
        drawPixel(x, 5, color);
        drawPixel(x, 6, color);
      }
      break;
      
    case 'Wild White Hair':
      // Spiky
      for (let x = 7; x < 17; x++) {
        if (x % 2 === 0) {
          drawPixel(x, 3, color);
          drawPixel(x, 4, color);
          drawPixel(x, 5, color);
        }
        drawPixel(x, 6, color);
      }
      break;
  }
}

// Draw eye accessories
function drawEyeAccessories(accessory) {
  if (accessory === 'None') return;
  
  let color = COLORS.accessory.Black;
  
  switch (accessory) {
    case '3D Glasses':
      color = COLORS.accessory.Red;
      // Red and blue glasses
      drawPixel(9, 10, COLORS.accessory.Red);
      drawPixel(10, 10, COLORS.accessory.Red);
      drawPixel(11, 10, COLORS.accessory.Blue);
      drawPixel(13, 10, COLORS.accessory.Blue);
      drawPixel(14, 10, COLORS.accessory.Red);
      break;
      
    case 'VR Headset':
      // Futuristic VR
      color = COLORS.accessory.Silver;
      for (let x = 8; x < 16; x++) {
        drawPixel(x, 10, color);
        drawPixel(x, 11, color);
      }
      break;
      
    case 'Regular Shades':
    case 'Classic Shades':
    case 'Big Shades':
    case 'Small Shades':
      // Dark sunglasses
      for (let x = 9; x < 11; x++) {
        drawPixel(x, 10, color);
        drawPixel(x, 11, color);
      }
      for (let x = 13; x < 15; x++) {
        drawPixel(x, 10, color);
        drawPixel(x, 11, color);
      }
      drawPixel(11, 10, color);
      drawPixel(12, 10, color);
      break;
      
    case 'Nerd Glasses':
      // Thick frame glasses
      drawPixel(9, 10, color);
      drawPixel(9, 11, color);
      drawPixel(10, 10, color);
      drawPixel(10, 11, color);
      drawPixel(13, 10, color);
      drawPixel(13, 11, color);
      drawPixel(14, 10, color);
      drawPixel(14, 11, color);
      drawPixel(11, 10, color);
      drawPixel(12, 10, color);
      break;
      
    case 'Eye Patch':
      // Pirate eye patch
      drawPixel(9, 10, color);
      drawPixel(10, 10, color);
      drawPixel(9, 11, color);
      drawPixel(10, 11, color);
      break;
  }
}

// Draw facial hair
function drawFacialHair(facialHair) {
  if (facialHair === 'None') return;
  
  const color = COLORS.hair.Brown;
  
  switch (facialHair) {
    case 'Big Beard':
    case 'Luxurious Beard':
      // Full beard
      for (let y = 14; y < 18; y++) {
        for (let x = 8; x < 16; x++) {
          drawPixel(x, y, color);
        }
      }
      break;
      
    case 'Normal Beard':
    case 'Shadow Beard':
      // Medium beard
      for (let y = 15; y < 18; y++) {
        for (let x = 9; x < 15; x++) {
          drawPixel(x, y, color);
        }
      }
      break;
      
    case 'Mustache':
      // Mustache only
      for (let x = 9; x < 15; x++) {
        drawPixel(x, 14, color);
      }
      break;
      
    case 'Goat':
      // Goatee
      for (let x = 11; x < 13; x++) {
        drawPixel(x, 16, color);
        drawPixel(x, 17, color);
      }
      break;
      
    case 'Muttonchops':
      // Side burns
      drawPixel(8, 13, color);
      drawPixel(8, 14, color);
      drawPixel(8, 15, color);
      drawPixel(15, 13, color);
      drawPixel(15, 14, color);
      drawPixel(15, 15, color);
      break;
      
    case 'Chinstrap':
      // Chin line
      for (let x = 9; x < 15; x++) {
        drawPixel(x, 17, color);
      }
      break;
  }
}

// Draw mouth items
function drawMouthItems(item) {
  if (item === 'None') return;
  
  switch (item) {
    case 'Cigarette':
      drawPixel(14, 15, COLORS.accessory.White);
      drawPixel(15, 15, COLORS.accessory.White);
      drawPixel(16, 15, COLORS.accessory.White);
      drawPixel(17, 15, COLORS.accessory.Red);
      break;
      
    case 'Pipe':
      drawPixel(14, 15, COLORS.accessory.Brown);
      drawPixel(15, 15, COLORS.accessory.Brown);
      drawPixel(16, 15, COLORS.accessory.Brown);
      drawPixel(16, 14, COLORS.accessory.Brown);
      break;
      
    case 'Smile':
      // Wider smile
      for (let x = 9; x < 15; x++) {
        drawPixel(x, 15, '#FF0000');
      }
      break;
      
    case 'Frown':
      // Frown
      for (let x = 9; x < 15; x++) {
        drawPixel(x, 16, '#400000');
      }
      break;
      
    case 'Medical Mask':
      // Face mask
      for (let y = 13; y < 16; y++) {
        for (let x = 9; x < 15; x++) {
          drawPixel(x, y, COLORS.accessory.White);
        }
      }
      break;
      
    case 'Vape':
      drawPixel(14, 15, COLORS.accessory.Silver);
      drawPixel(15, 15, COLORS.accessory.Silver);
      drawPixel(16, 15, COLORS.accessory.Blue);
      break;
  }
}

// Draw head accessories
function drawHeadAccessories(accessory) {
  if (accessory === 'None') return;
  
  let color = COLORS.accessory.Red;
  
  switch (accessory) {
    case 'Beanie':
    case 'Knitted Cap':
      // Knit cap
      for (let x = 8; x < 16; x++) {
        drawPixel(x, 4, color);
        drawPixel(x, 5, color);
        drawPixel(x, 6, color);
      }
      break;
      
    case 'Top Hat':
      // Tall hat
      color = COLORS.accessory.Black;
      for (let x = 9; x < 15; x++) {
        drawPixel(x, 2, color);
        drawPixel(x, 3, color);
        drawPixel(x, 4, color);
      }
      for (let x = 8; x < 16; x++) {
        drawPixel(x, 5, color);
      }
      break;
      
    case 'Cowboy Hat':
      // Wide brim hat
      color = COLORS.accessory.Brown;
      for (let x = 7; x < 17; x++) {
        drawPixel(x, 5, color);
      }
      for (let x = 9; x < 15; x++) {
        drawPixel(x, 3, color);
        drawPixel(x, 4, color);
      }
      break;
      
    case 'Cap':
      // Baseball cap
      color = COLORS.accessory.Blue;
      for (let x = 8; x < 16; x++) {
        drawPixel(x, 5, color);
      }
      for (let x = 7; x < 10; x++) {
        drawPixel(x, 6, color);
      }
      break;
      
    case 'Hoodie':
      // Hood
      color = COLORS.accessory.Black;
      for (let x = 7; x < 17; x++) {
        drawPixel(x, 5, color);
      }
      drawPixel(7, 6, color);
      drawPixel(16, 6, color);
      break;
      
    case 'Headband':
      // Simple band
      color = COLORS.accessory.Red;
      for (let x = 8; x < 16; x++) {
        drawPixel(x, 7, color);
      }
      break;
      
    case 'Tiara':
      // Crown
      color = COLORS.accessory.Gold;
      for (let x = 9; x < 15; x++) {
        drawPixel(x, 5, color);
      }
      drawPixel(10, 4, color);
      drawPixel(12, 4, color);
      drawPixel(14, 4, color);
      break;
      
    case 'Bandana':
      // Head wrap
      for (let x = 8; x < 16; x++) {
        drawPixel(x, 6, color);
      }
      break;
  }
}

// Draw accessories
function drawAccessories(accessory) {
  if (accessory === 'None') return;
  
  switch (accessory) {
    case 'Earring':
      drawPixel(7, 12, COLORS.accessory.Gold);
      drawPixel(16, 12, COLORS.accessory.Gold);
      break;
      
    case 'Gold Chain':
      // Necklace
      for (let x = 10; x < 14; x++) {
        drawPixel(x, 18, COLORS.accessory.Gold);
      }
      break;
      
    case 'Silver Chain':
      // Silver necklace
      for (let x = 10; x < 14; x++) {
        drawPixel(x, 18, COLORS.accessory.Silver);
      }
      break;
      
    case 'Choker':
      // Tight necklace
      for (let x = 9; x < 15; x++) {
        drawPixel(x, 18, COLORS.accessory.Black);
      }
      break;
  }
}

// Update character display
function updateCharacter() {
  const baseType = document.getElementById('baseType').value;
  const skinTone = document.getElementById('skinTone').value;
  const hairStyle = document.getElementById('hairStyle').value;
  const eyeAccessories = document.getElementById('eyeAccessories').value;
  const facialHair = document.getElementById('facialHair').value;
  const mouthItems = document.getElementById('mouthItems').value;
  const headAccessories = document.getElementById('headAccessories').value;
  const accessories = document.getElementById('accessories').value;

  // Clear and redraw
  clearCanvas();
  
  // Draw layers in order
  drawBase(baseType, skinTone);
  drawAccessories(accessories);
  drawFacialHair(facialHair);
  drawMouthItems(mouthItems);
  drawEyeAccessories(eyeAccessories);
  drawHair(hairStyle);
  drawHeadAccessories(headAccessories);
  
  // Update attributes display
  updateAttributesDisplay();
}

// Update attributes display
function updateAttributesDisplay() {
  const attributes = [];
  
  const selections = {
    'Base Type': document.getElementById('baseType').value,
    'Skin Tone': document.getElementById('skinTone').value,
    'Hair': document.getElementById('hairStyle').value,
    'Eyes': document.getElementById('eyeAccessories').value,
    'Facial Hair': document.getElementById('facialHair').value,
    'Mouth': document.getElementById('mouthItems').value,
    'Head': document.getElementById('headAccessories').value,
    'Accessories': document.getElementById('accessories').value
  };
  
  let attrCount = 0;
  const listHtml = [];
  
  for (const [key, value] of Object.entries(selections)) {
    if (value !== 'None') {
      attributes.push(`${key}: ${value}`);
      listHtml.push(`<div class="attribute-item">${key}: ${value}</div>`);
      if (key !== 'Base Type' && key !== 'Skin Tone') {
        attrCount++;
      }
    }
  }
  
  document.getElementById('attributeList').innerHTML = listHtml.join('');
  document.getElementById('rarityValue').textContent = RARITY_LEVELS[attrCount] || 'Common';
}

// Generate random character
function generateRandom() {
  const baseTypes = ['Male', 'Female', 'Zombie', 'Ape', 'Alien'];
  const skinTones = ['Light', 'Medium', 'Dark', 'Albino', 'Green', 'Brown', 'Blue'];
  
  // Set random values
  document.getElementById('baseType').value = baseTypes[Math.floor(Math.random() * baseTypes.length)];
  document.getElementById('skinTone').value = skinTones[Math.floor(Math.random() * skinTones.length)];
  
  // Randomly select or skip optional items (higher chance to skip)
  randomSelect('hairStyle', 0.6);
  randomSelect('eyeAccessories', 0.4);
  randomSelect('facialHair', 0.3);
  randomSelect('mouthItems', 0.4);
  randomSelect('headAccessories', 0.4);
  randomSelect('accessories', 0.3);
  
  generationCount++;
  document.getElementById('generationCounter').textContent = generationCount;
  
  updateCharacter();
}

// Random select helper
function randomSelect(elementId, probability) {
  const select = document.getElementById(elementId);
  const options = Array.from(select.options);
  
  if (Math.random() > probability) {
    select.value = 'None';
  } else {
    const nonNoneOptions = options.filter(opt => opt.value !== 'None');
    select.value = nonNoneOptions[Math.floor(Math.random() * nonNoneOptions.length)].value;
  }
}

// Clear all selections
function clearAll() {
  document.querySelectorAll('.layer-select').forEach(select => {
    if (select.id !== 'baseType' && select.id !== 'skinTone') {
      select.value = 'None';
    }
  });
  updateCharacter();
}

// Download PNG
function downloadPNG() {
  const link = document.createElement('a');
  link.download = `cryptopunk-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Save to collection
function saveToCollection() {
  if (collection.length >= 10) {
    alert('Collection is full! Maximum 10 characters.');
    return;
  }
  
  // Create a mini canvas for thumbnail
  const miniCanvas = document.createElement('canvas');
  miniCanvas.width = 120;
  miniCanvas.height = 120;
  const miniCtx = miniCanvas.getContext('2d');
  miniCtx.imageSmoothingEnabled = false;
  miniCtx.drawImage(canvas, 0, 0, 120, 120);
  
  const character = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    dataUrl: miniCanvas.toDataURL('image/png'),
    selections: {
      baseType: document.getElementById('baseType').value,
      skinTone: document.getElementById('skinTone').value,
      hairStyle: document.getElementById('hairStyle').value,
      eyeAccessories: document.getElementById('eyeAccessories').value,
      facialHair: document.getElementById('facialHair').value,
      mouthItems: document.getElementById('mouthItems').value,
      headAccessories: document.getElementById('headAccessories').value,
      accessories: document.getElementById('accessories').value
    }
  };
  
  collection.push(character);
  updateGallery();
}

// Update gallery display
function updateGallery() {
  const galleryGrid = document.getElementById('galleryGrid');
  document.getElementById('collectionCount').textContent = `(${collection.length}/10)`;
  
  if (collection.length === 0) {
    galleryGrid.innerHTML = '<div class="empty-gallery">No characters saved yet. Create and save your first character!</div>';
    return;
  }
  
  galleryGrid.innerHTML = collection.map((char, index) => `
    <div class="gallery-item" onclick="loadFromCollection(${index})">
      <img src="${char.dataUrl}" alt="Character ${index + 1}" style="width: 100%; height: auto; image-rendering: pixelated;" />
      <button class="gallery-item-delete" onclick="deleteFromCollection(event, ${index})" title="Delete">×</button>
    </div>
  `).join('');
}

// Load character from collection
function loadFromCollection(index) {
  const char = collection[index];
  const selections = char.selections;
  
  document.getElementById('baseType').value = selections.baseType;
  document.getElementById('skinTone').value = selections.skinTone;
  document.getElementById('hairStyle').value = selections.hairStyle;
  document.getElementById('eyeAccessories').value = selections.eyeAccessories;
  document.getElementById('facialHair').value = selections.facialHair;
  document.getElementById('mouthItems').value = selections.mouthItems;
  document.getElementById('headAccessories').value = selections.headAccessories;
  document.getElementById('accessories').value = selections.accessories;
  
  updateCharacter();
}

// Delete character from collection
function deleteFromCollection(event, index) {
  event.stopPropagation();
  collection.splice(index, 1);
  updateGallery();
}

// Make functions globally accessible
window.loadFromCollection = loadFromCollection;
window.deleteFromCollection = deleteFromCollection;

// Initialize on load
init();