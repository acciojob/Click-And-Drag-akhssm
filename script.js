document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('drag-container');
    const cubes = document.querySelectorAll('.cube');

    let activeCube = null;
    let offsetX, offsetY;
    let containerRect;

    const dragStart = (e) => {
        if (e.button !== 0) return;

        activeCube = e.target;
        activeCube.classList.add('dragging');
        
        containerRect = container.getBoundingClientRect();

        offsetX = e.clientX - activeCube.getBoundingClientRect().left;
        offsetY = e.clientY - activeCube.getBoundingClientRect().top;
        
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);
    };

    const dragMove = (e) => {
        if (!activeCube) return;
        
        e.preventDefault();

        let newX = e.clientX - containerRect.left - offsetX;
        let newY = e.clientY - containerRect.top - offsetY;

        const cubeWidth = activeCube.offsetWidth;
        const cubeHeight = activeCube.offsetHeight;

        // Boundary constraint check
        newX = Math.max(0, Math.min(newX, containerRect.width - cubeWidth));
        newY = Math.max(0, Math.min(newY, containerRect.height - cubeHeight));

        activeCube.style.left = `${newX}px`;
        activeCube.style.top = `${newY}px`;
    };

    const dragEnd = () => {
        if (!activeCube) return;

        activeCube.classList.remove('dragging');
        
        activeCube = null;

        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', dragEnd);
    };

    cubes.forEach(cube => {
        cube.addEventListener('mousedown', dragStart);
    });
});