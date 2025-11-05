// Select the scrollable container
const slider = document.querySelector('.items');

let isDown = false;
let startX;
let scrollLeft;

// Mouse down: Start dragging
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.clientX;
  scrollLeft = slider.scrollLeft;
});

// Mouse leave: Stop dragging if mouse leaves the area
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

// Mouse up: Stop dragging
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

// Mouse move: Scroll when dragging
slider.addEventListener('mousemove', (e) => {
  if (!isDown) return; // Stop if mouse isn't pressed
  e.preventDefault();
  const x = e.clientX;
  const walk = (x - startX) * 2; // Speed multiplier
  slider.scrollLeft = scrollLeft - walk;
});
