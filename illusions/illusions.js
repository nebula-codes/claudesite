// Optical Illusions Lab - FIXED VERSION

console.log('🧠 Illusions script loading...');

// Wait for DOM to be fully loaded
window.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM loaded, initializing illusions...');

    // Initialize all illusions
    initAllIllusions();

    // Setup button listeners
    setupButtons();
});

// Initialize all illusions
function initAllIllusions() {
    console.log('Initializing all illusions...');

    // Hermann Grid
    const hermannGrid = document.getElementById('hermann-grid');
    if (hermannGrid) {
        const squareSize = 60;
        const gap = 15;
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', col * (squareSize + gap));
                rect.setAttribute('y', row * (squareSize + gap));
                rect.setAttribute('width', squareSize);
                rect.setAttribute('height', squareSize);
                rect.setAttribute('fill', 'black');
                hermannGrid.appendChild(rect);
            }
        }
        console.log('✅ Hermann Grid initialized');
    }

    // Rotating Snakes
    const snakesPattern = document.getElementById('snakes-pattern');
    if (snakesPattern) {
        const colors = ['#000000', '#333333', '#CCCCCC', '#FFFFFF'];
        function makeCircle(cx, cy, r) {
            for (let i = 0; i < 12; i++) {
                const a1 = (i * Math.PI * 2) / 12;
                const a2 = ((i + 1) * Math.PI * 2) / 12;
                const x1 = cx + r * Math.cos(a1);
                const y1 = cy + r * Math.sin(a1);
                const x2 = cx + r * Math.cos(a2);
                const y2 = cy + r * Math.sin(a2);
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`);
                path.setAttribute('fill', colors[i % 4]);
                snakesPattern.appendChild(path);
            }
        }
        makeCircle(100, 100, 60);
        makeCircle(300, 100, 60);
        makeCircle(100, 300, 60);
        makeCircle(300, 300, 60);
        console.log('✅ Snakes initialized');
    }

    // Checker Shadow
    const checkerCanvas = document.getElementById('checker-canvas');
    if (checkerCanvas) {
        const ctx = checkerCanvas.getContext('2d');
        // Draw checkerboard
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                ctx.fillStyle = (r + c) % 2 === 0 ? '#CCC' : '#666';
                ctx.fillRect(c * 50, r * 50, 50, 50);
            }
        }
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.beginPath();
        ctx.moveTo(200, 50);
        ctx.lineTo(350, 150);
        ctx.lineTo(350, 350);
        ctx.lineTo(150, 350);
        ctx.closePath();
        ctx.fill();
        // Square B (same color as A)
        ctx.fillStyle = '#666';
        ctx.fillRect(200, 200, 50, 50);
        // Labels
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('A', 65, 135);
        ctx.fillText('B', 215, 235);
        // Save
        checkerCanvas.originalData = ctx.getImageData(0, 0, 400, 400);
        console.log('✅ Checker initialized');
    }

    // Cafe Wall
    const cafeCanvas = document.getElementById('cafe-canvas');
    if (cafeCanvas) {
        drawCafeWall(cafeCanvas);
        console.log('✅ Cafe wall initialized');
    }

    // Ebbinghaus
    const ebbPattern = document.getElementById('ebbinghaus-pattern');
    if (ebbPattern) {
        // Left: big surrounding circles
        for (let i = 0; i < 6; i++) {
            const a = (i * Math.PI * 2) / 6;
            const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            c.setAttribute('cx', 100 + Math.cos(a) * 80);
            c.setAttribute('cy', 100 + Math.sin(a) * 80);
            c.setAttribute('r', 35);
            c.setAttribute('fill', '#666');
            ebbPattern.appendChild(c);
        }
        // Right: small surrounding circles
        for (let i = 0; i < 6; i++) {
            const a = (i * Math.PI * 2) / 6;
            const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            c.setAttribute('cx', 300 + Math.cos(a) * 50);
            c.setAttribute('cy', 100 + Math.sin(a) * 50);
            c.setAttribute('r', 12);
            c.setAttribute('fill', '#666');
            ebbPattern.appendChild(c);
        }
        // Center circles (SAME SIZE)
        const c1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c1.setAttribute('cx', 100);
        c1.setAttribute('cy', 100);
        c1.setAttribute('r', 25);
        c1.setAttribute('fill', '#FF6B35');
        c1.id = 'left-center';
        ebbPattern.appendChild(c1);

        const c2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c2.setAttribute('cx', 300);
        c2.setAttribute('cy', 100);
        c2.setAttribute('r', 25);
        c2.setAttribute('fill', '#FF6B35');
        c2.id = 'right-center';
        ebbPattern.appendChild(c2);
        console.log('✅ Ebbinghaus initialized');
    }

    // Waterfall
    const waterfallCanvas = document.getElementById('waterfall-canvas');
    if (waterfallCanvas) {
        waterfallCanvas.isAnimating = false;
        waterfallCanvas.angle = 0;
        drawSpiral(waterfallCanvas);
        console.log('✅ Waterfall initialized');
    }

    // Penrose
    const penrosePattern = document.getElementById('penrose-pattern');
    if (penrosePattern) {
        const p1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        p1.setAttribute('d', 'M 0,-80 L -70,40 L -50,50 L 20,-70 Z');
        p1.setAttribute('fill', '#666');
        p1.setAttribute('stroke', '#333');
        p1.setAttribute('stroke-width', '2');
        penrosePattern.appendChild(p1);

        const p2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        p2.setAttribute('d', 'M -70,40 L 70,40 L 60,50 L -50,50 Z');
        p2.setAttribute('fill', '#999');
        p2.setAttribute('stroke', '#333');
        p2.setAttribute('stroke-width', '2');
        penrosePattern.appendChild(p2);

        const p3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        p3.setAttribute('d', 'M 70,40 L 0,-80 L 20,-70 L 60,30 Z');
        p3.setAttribute('fill', '#CCC');
        p3.setAttribute('stroke', '#333');
        p3.setAttribute('stroke-width', '2');
        penrosePattern.appendChild(p3);
        console.log('✅ Penrose initialized');
    }

    // Color Constancy
    const colorCanvas = document.getElementById('color-canvas');
    if (colorCanvas) {
        drawStrawberries(colorCanvas);
        console.log('✅ Color constancy initialized');
    }
}

// Helper: Draw cafe wall
function drawCafeWall(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 400, 400);
    for (let r = 0; r < 6; r++) {
        const offset = r % 2 === 0 ? 0 : 20;
        const y = r * 64;
        for (let c = 0; c < 11; c++) {
            ctx.fillStyle = c % 2 === 0 ? 'black' : 'white';
            ctx.fillRect(c * 40 + offset, y, 40, 60);
        }
        ctx.fillStyle = '#888';
        ctx.fillRect(0, y + 60, 400, 4);
    }
}

// Helper: Draw spiral
function drawSpiral(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 400, 400);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    const cx = 200, cy = 200;
    for (let r = 0; r < 180; r += 10) {
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 4; a += 0.1) {
            const rad = r + (a / (Math.PI * 4)) * 10;
            const x = cx + rad * Math.cos(a + canvas.angle);
            const y = cy + rad * Math.sin(a + canvas.angle);
            if (a === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
}

// Helper: Draw strawberries
function drawStrawberries(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 400, 300);
    // Strawberries
    ctx.fillStyle = '#006B3F';
    ctx.beginPath(); ctx.arc(150, 150, 50, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(250, 150, 50, 0, Math.PI * 2); ctx.fill();
    // Stems
    ctx.fillStyle = '#004D2C';
    ctx.fillRect(145, 100, 10, 30);
    ctx.fillRect(245, 100, 10, 30);
    // Seeds
    ctx.fillStyle = '#004020';
    for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI * 2) / 8;
        ctx.beginPath(); ctx.arc(150 + Math.cos(a) * 30, 150 + Math.sin(a) * 30, 3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(250 + Math.cos(a) * 30, 150 + Math.sin(a) * 30, 3, 0, Math.PI * 2); ctx.fill();
    }
    // Cyan filter
    ctx.fillStyle = 'rgba(0,255,255,0.3)';
    ctx.fillRect(0, 0, 400, 300);
    ctx.fillStyle = '#333';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('These strawberries contain NO red pixels!', 200, 250);
}

// Setup all button listeners
function setupButtons() {
    const buttons = document.querySelectorAll('.toggle-btn');
    console.log(`Found ${buttons.length} buttons`);

    buttons.forEach(btn => {
        const type = btn.getAttribute('data-illusion');
        console.log(`Setting up button: ${type}`);

        btn.onclick = function() {
            console.log(`🔘 Clicked: ${type}`);

            if (type === 'hermann') {
                const g = document.getElementById('hermann-grid');
                g.style.opacity = g.style.opacity === '0.3' ? '1' : '0.3';
            }
            else if (type === 'snakes') {
                const p = document.getElementById('snakes-pattern');
                p.classList.toggle('rotate-animation');
            }
            else if (type === 'checker') {
                const c = document.getElementById('checker-canvas');
                const ctx = c.getContext('2d');
                if (!c.revealed) {
                    ctx.fillStyle = '#666';
                    ctx.fillRect(60, 100, 190, 150);
                    c.revealed = true;
                } else {
                    ctx.putImageData(c.originalData, 0, 0);
                    c.revealed = false;
                }
            }
            else if (type === 'cafe') {
                const c = document.getElementById('cafe-canvas');
                const ctx = c.getContext('2d');
                if (!c.hasLines) {
                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 2;
                    for (let i = 0; i < 7; i++) {
                        ctx.beginPath();
                        ctx.moveTo(0, i * 64);
                        ctx.lineTo(400, i * 64);
                        ctx.stroke();
                    }
                    c.hasLines = true;
                } else {
                    drawCafeWall(c);
                    c.hasLines = false;
                }
            }
            else if (type === 'ebbinghaus') {
                const svg = document.querySelector('#ebbinghaus-illusion svg');
                const circles = svg.querySelectorAll('circle:not(#left-center):not(#right-center)');
                circles.forEach(c => {
                    const op = c.getAttribute('opacity') || '1';
                    c.setAttribute('opacity', op === '1' ? '0.1' : '1');
                });
            }
            else if (type === 'waterfall') {
                const c = document.getElementById('waterfall-canvas');
                c.isAnimating = !c.isAnimating;
                if (c.isAnimating) {
                    c.startTime = Date.now();
                    animateWaterfall(c);
                } else {
                    c.angle = 0;
                    drawSpiral(c);
                }
            }
            else if (type === 'penrose') {
                const p = document.getElementById('penrose-pattern');
                p.classList.toggle('rotate-animation');
            }
            else if (type === 'color') {
                const c = document.getElementById('color-canvas');
                const ctx = c.getContext('2d');
                if (!c.revealed) {
                    const temp = document.createElement('canvas');
                    temp.width = 400; temp.height = 300;
                    temp.getContext('2d').drawImage(c, 0, 0);
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, 400, 300);
                    ctx.drawImage(temp, 140, 140, 20, 20, 180, 130, 40, 40);
                    ctx.fillStyle = '#333';
                    ctx.font = '16px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('Isolated patch - see the real color!', 200, 250);
                    c.revealed = true;
                } else {
                    drawStrawberries(c);
                    c.revealed = false;
                }
            }
        };
    });

    console.log('✅ All buttons set up!');
}

// Waterfall animation
function animateWaterfall(canvas) {
    if (!canvas.isAnimating) return;
    canvas.angle += 0.05;
    drawSpiral(canvas);
    if (Date.now() - canvas.startTime > 30000) {
        canvas.isAnimating = false;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#333';
        ctx.fillRect(0, 0, 400, 400);
        ctx.fillStyle = 'white';
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Now look at some text!', 200, 200);
    } else {
        requestAnimationFrame(() => animateWaterfall(canvas));
    }
}

console.log('🚀 Script loaded, waiting for DOM...');
