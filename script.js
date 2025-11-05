const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.cube');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// When mouse is pressed down on a cube
cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;
    cube.style.position = 'absolute';
    cube.style.zIndex = 1000;
    cube.style.cursor = 'grabbing';

    // Calculate offset between cursor and cube position
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });
});

// Track mouse movement
document.addEventListener('mousemove', (e) => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = selectedCube.getBoundingClientRect();

  // New cube coordinates (centered at mouse)
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Constrain movement inside container boundaries
  newLeft = Math.max(0, Math.min(newLeft, containerRect.width - cubeRect.width));
  newTop = Math.max(0, Math.min(newTop, containerRect.height - cubeRect.height));

  // Apply new position
  selectedCube.style.left = `${newLeft}px`;
  selectedCube.style.top = `${newTop}px`;
});

// When mouse is released
document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.style.cursor = 'grab';
    selectedCube.style.zIndex = '';
    selectedCube = null;
  }
});
