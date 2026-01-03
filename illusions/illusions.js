// Optical Illusions Lab - Interactive Implementations

// State management
const state = {
    waterfallActive: false,
    waterfallStartTime: null,
    penroseRotating: false
};

// Initialize all illusions
document.addEventListener('DOMContentLoaded', () => {
    console.log('🧠 Initializing Optical Illusions Lab...');

    try {
        initHermannGrid();
        initRotatingSnakes();
        initCheckerShadow();
        initCafeWall();
        initEbbinghaus();
        initWaterfall();
        initPenrose();
        initColorConstancy();
        setupToggleButtons();
        console.log('✅ All illusions loaded successfully!');
    } catch (error) {
        console.error('❌ Error loading illusions:', error);
    }
});

// Hermann Grid Illusion
function initHermannGrid() {
    const grid = document.getElementById('hermann-grid');
    if (!grid) {
        console.error('hermann-grid element not found');
        return;
    }

    const squareSize = 60;
    const gap = 15;
    const rows = 5;
    const cols = 5;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', col * (squareSize + gap));
            rect.setAttribute('y', row * (squareSize + gap));
            rect.setAttribute('width', squareSize);
            rect.setAttribute('height', squareSize);
            rect.setAttribute('fill', 'black');
            grid.appendChild(rect);
        }
    }
}

// Rotating Snakes Illusion
function initRotatingSnakes() {
    const pattern = document.getElementById('snakes-pattern');
    if (!pattern) {
        console.error('snakes-pattern element not found');
        return;
    }

    const colors = ['#000000', '#333333', '#CCCCCC', '#FFFFFF'];

    function createCircle(cx, cy, radius) {
        const segments = 12;
        const segmentAngle = (Math.PI * 2) / segments;

        for (let i = 0; i < segments; i++) {
            const startAngle = i * segmentAngle;
            const endAngle = (i + 1) * segmentAngle;

            const x1 = cx + radius * Math.cos(startAngle);
            const y1 = cy + radius * Math.sin(startAngle);
            const x2 = cx + radius * Math.cos(endAngle);
            const y2 = cy + radius * Math.sin(endAngle);

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
            path.setAttribute('d', d);
            path.setAttribute('fill', colors[i % colors.length]);
            pattern.appendChild(path);
        }
    }

    createCircle(100, 100, 60);
    createCircle(300, 100, 60);
    createCircle(100, 300, 60);
    createCircle(300, 300, 60);
}

// Checker Shadow Illusion
function initCheckerShadow() {
    const canvas = document.getElementById('checker-canvas');
    if (!canvas) {
        console.error('checker-canvas element not found');
        return;
    }

    const ctx = canvas.getContext('2d');
    const squareSize = 50;

    // Draw checkerboard
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const isLight = (row + col) % 2 === 0;
            ctx.fillStyle = isLight ? '#CCCCCC' : '#666666';
            ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
        }
    }

    // Draw shadow (simplified)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.moveTo(200, 50);
    ctx.lineTo(350, 150);
    ctx.lineTo(350, 350);
    ctx.lineTo(150, 350);
    ctx.closePath();
    ctx.fill();

    // Redraw B square in shadow with same color as A
    const sharedColor = '#666666';
    ctx.fillStyle = sharedColor;
    ctx.fillRect(4 * squareSize, 4 * squareSize, squareSize, squareSize);

    // Label squares
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('A', 1 * squareSize + 15, 2 * squareSize + 35);
    ctx.fillText('B', 4 * squareSize + 15, 4 * squareSize + 35);

    // Store original state
    canvas.originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.revealed = false;
}

// Café Wall Illusion
function initCafeWall() {
    const canvas = document.getElementById('cafe-canvas');
    if (!canvas) {
        console.error('cafe-canvas element not found');
        return;
    }

    const ctx = canvas.getContext('2d');
    const tileWidth = 40;
    const tileHeight = 60;
    const offset = tileWidth / 2;
    const grayLineHeight = 4;

    for (let row = 0; row < 6; row++) {
        const xOffset = row % 2 === 0 ? 0 : offset;
        const y = row * (tileHeight + grayLineHeight);

        for (let col = 0; col < 11; col++) {
            const x = col * tileWidth + xOffset;

            ctx.fillStyle = col % 2 === 0 ? 'black' : 'white';
            ctx.fillRect(x, y, tileWidth, tileHeight);
        }

        // Gray mortar line
        ctx.fillStyle = '#888';
        ctx.fillRect(0, y + tileHeight, canvas.width, grayLineHeight);
    }

    canvas.hasGridLines = false;
}

// Ebbinghaus Illusion
function initEbbinghaus() {
    const pattern = document.getElementById('ebbinghaus-pattern');
    if (!pattern) {
        console.error('ebbinghaus-pattern element not found');
        return;
    }

    const centerCircleRadius = 25;
    const leftCenterX = 100;
    const rightCenterX = 300;
    const centerY = 100;

    // Left side - center circle surrounded by LARGE circles
    const largeCircleRadius = 35;
    const largeDistance = 80;

    for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI * 2) / 6;
        const cx = leftCenterX + Math.cos(angle) * largeDistance;
        const cy = centerY + Math.sin(angle) * largeDistance;

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', largeCircleRadius);
        circle.setAttribute('fill', '#666');
        pattern.appendChild(circle);
    }

    // Right side - center circle surrounded by SMALL circles
    const smallCircleRadius = 12;
    const smallDistance = 50;

    for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI * 2) / 6;
        const cx = rightCenterX + Math.cos(angle) * smallDistance;
        const cy = centerY + Math.sin(angle) * smallDistance;

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', smallCircleRadius);
        circle.setAttribute('fill', '#666');
        pattern.appendChild(circle);
    }

    // Center circles (SAME SIZE!)
    const leftCenter = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    leftCenter.setAttribute('cx', leftCenterX);
    leftCenter.setAttribute('cy', centerY);
    leftCenter.setAttribute('r', centerCircleRadius);
    leftCenter.setAttribute('fill', '#FF6B35');
    leftCenter.setAttribute('id', 'left-center');
    pattern.appendChild(leftCenter);

    const rightCenter = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    rightCenter.setAttribute('cx', rightCenterX);
    rightCenter.setAttribute('cy', centerY);
    rightCenter.setAttribute('r', centerCircleRadius);
    rightCenter.setAttribute('fill', '#FF6B35');
    rightCenter.setAttribute('id', 'right-center');
    pattern.appendChild(rightCenter);
}

// Waterfall Illusion (Motion Aftereffect)
function initWaterfall() {
    const canvas = document.getElementById('waterfall-canvas');
    if (!canvas) {
        console.error('waterfall-canvas element not found');
        return;
    }

    const ctx = canvas.getContext('2d');
    let angle = 0;

    function drawSpiral() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.min(centerX, centerY) * 0.9;

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;

        for (let radius = 0; radius < maxRadius; radius += 10) {
            ctx.beginPath();
            for (let a = 0; a < Math.PI * 4; a += 0.1) {
                const r = radius + (a / (Math.PI * 4)) * 10;
                const x = centerX + r * Math.cos(a + angle);
                const y = centerY + r * Math.sin(a + angle);

                if (a === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
    }

    function animate() {
        if (state.waterfallActive) {
            angle += 0.05;
            drawSpiral();
            requestAnimationFrame(animate);

            // Check if 30 seconds elapsed
            if (Date.now() - state.waterfallStartTime > 30000) {
                state.waterfallActive = false;
                ctx.fillStyle = '#333';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'white';
                ctx.font = '20px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Now look at some text!', canvas.width / 2, canvas.height / 2);
            }
        }
    }

    canvas.animateSpiral = () => {
        state.waterfallActive = !state.waterfallActive;
        if (state.waterfallActive) {
            state.waterfallStartTime = Date.now();
            animate();
        } else {
            angle = 0;
            drawSpiral();
        }
    };

    drawSpiral();
}

// Penrose Triangle
function initPenrose() {
    const pattern = document.getElementById('penrose-pattern');
    if (!pattern) {
        console.error('penrose-pattern element not found');
        return;
    }

    // Draw three bars forming impossible triangle
    const bar1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    bar1.setAttribute('d', 'M 0,-80 L -70,40 L -50,50 L 20,-70 Z');
    bar1.setAttribute('fill', '#666');
    bar1.setAttribute('stroke', '#333');
    bar1.setAttribute('stroke-width', '2');
    pattern.appendChild(bar1);

    const bar2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    bar2.setAttribute('d', 'M -70,40 L 70,40 L 60,50 L -50,50 Z');
    bar2.setAttribute('fill', '#999');
    bar2.setAttribute('stroke', '#333');
    bar2.setAttribute('stroke-width', '2');
    pattern.appendChild(bar2);

    const bar3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    bar3.setAttribute('d', 'M 70,40 L 0,-80 L 20,-70 L 60,30 Z');
    bar3.setAttribute('fill', '#CCC');
    bar3.setAttribute('stroke', '#333');
    bar3.setAttribute('stroke-width', '2');
    pattern.appendChild(bar3);
}

// Color Constancy
function initColorConstancy() {
    const canvas = document.getElementById('color-canvas');
    if (!canvas) {
        console.error('color-canvas element not found');
        return;
    }

    const ctx = canvas.getContext('2d');

    // Draw strawberries (simplified)
    ctx.fillStyle = '#006B3F'; // Cyan-ish green instead of red
    ctx.beginPath();
    ctx.arc(150, 150, 50, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(250, 150, 50, 0, Math.PI * 2);
    ctx.fill();

    // Add stem details
    ctx.fillStyle = '#004D2C';
    ctx.fillRect(145, 100, 10, 30);
    ctx.fillRect(245, 100, 10, 30);

    // Add seeds
    ctx.fillStyle = '#004020';
    for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8;
        ctx.beginPath();
        ctx.arc(150 + Math.cos(angle) * 30, 150 + Math.sin(angle) * 30, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(250 + Math.cos(angle) * 30, 150 + Math.sin(angle) * 30, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    // Apply cyan filter over everything
    ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#333';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('These strawberries contain NO red pixels!', canvas.width / 2, 250);

    canvas.revealed = false;
}

// Toggle button functionality
function setupToggleButtons() {
    const buttons = document.querySelectorAll('.toggle-btn');
    console.log(`Found ${buttons.length} toggle buttons`);

    buttons.forEach((button, index) => {
        const illusion = button.dataset.illusion;
        console.log(`Setting up button ${index + 1}: ${illusion}`);

        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`Button clicked: ${illusion}`);

            switch (illusion) {
                case 'hermann':
                    toggleHermann();
                    break;
                case 'snakes':
                    toggleSnakes();
                    break;
                case 'checker':
                    toggleChecker();
                    break;
                case 'cafe':
                    toggleCafe();
                    break;
                case 'ebbinghaus':
                    toggleEbbinghaus();
                    break;
                case 'waterfall':
                    toggleWaterfall();
                    break;
                case 'penrose':
                    togglePenrose();
                    break;
                case 'color':
                    toggleColor();
                    break;
                default:
                    console.warn(`Unknown illusion type: ${illusion}`);
            }
        });
    });
}

// Toggle functions
function toggleHermann() {
    const grid = document.getElementById('hermann-grid');
    if (!grid) return;

    const currentOpacity = grid.style.opacity || '1';
    grid.style.opacity = currentOpacity === '0.3' ? '1' : '0.3';
    console.log('Hermann toggled, opacity:', grid.style.opacity);
}

function toggleSnakes() {
    const pattern = document.getElementById('snakes-pattern');
    if (!pattern) return;

    pattern.classList.toggle('rotate-animation');
    console.log('Snakes toggled, rotating:', pattern.classList.contains('rotate-animation'));
}

function toggleChecker() {
    const canvas = document.getElementById('checker-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!canvas.revealed) {
        // Draw connecting bar to show same color
        ctx.fillStyle = '#666666';
        ctx.fillRect(50 + 10, 100, 200 - 10, 150);
        canvas.revealed = true;
        console.log('Checker revealed');
    } else {
        // Reset to original
        if (canvas.originalImage) {
            ctx.putImageData(canvas.originalImage, 0, 0);
        }
        canvas.revealed = false;
        console.log('Checker reset');
    }
}

function toggleCafe() {
    const canvas = document.getElementById('cafe-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!canvas.hasGridLines) {
        // Draw horizontal guide lines
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        for (let i = 0; i < 7; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * 64);
            ctx.lineTo(canvas.width, i * 64);
            ctx.stroke();
        }
        canvas.hasGridLines = true;
        console.log('Cafe grid lines shown');
    } else {
        // Redraw without lines
        initCafeWall();
        console.log('Cafe grid lines hidden');
    }
}

function toggleEbbinghaus() {
    const svg = document.querySelector('#ebbinghaus-illusion svg');
    if (!svg) return;

    const circles = svg.querySelectorAll('circle:not(#left-center):not(#right-center)');

    circles.forEach(circle => {
        const currentOpacity = circle.getAttribute('opacity') || '1';
        circle.setAttribute('opacity', currentOpacity === '1' ? '0.1' : '1');
    });
    console.log('Ebbinghaus toggled');
}

function toggleWaterfall() {
    const canvas = document.getElementById('waterfall-canvas');
    if (!canvas || !canvas.animateSpiral) return;

    canvas.animateSpiral();
    console.log('Waterfall toggled, active:', state.waterfallActive);
}

function togglePenrose() {
    const pattern = document.getElementById('penrose-pattern');
    if (!pattern) return;

    pattern.classList.toggle('rotate-animation');
    console.log('Penrose toggled, rotating:', pattern.classList.contains('rotate-animation'));
}

function toggleColor() {
    const canvas = document.getElementById('color-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!canvas.revealed) {
        // Show just a small patch without context
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(canvas, 0, 0);

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw small isolated patches
        ctx.drawImage(tempCanvas, 140, 140, 20, 20, 180, 130, 40, 40);
        ctx.fillStyle = '#333';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Isolated patch - now you see the real color!', canvas.width / 2, 250);

        canvas.revealed = true;
        console.log('Color revealed');
    } else {
        initColorConstancy();
        console.log('Color reset');
    }
}

console.log('🧠 Optical Illusions Lab script loaded!');
