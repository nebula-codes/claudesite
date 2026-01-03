// Depth tracking and effects for Deep Ocean Mysteries

// Get elements
const depthValue = document.getElementById('depth-value');
const pressureValue = document.getElementById('pressure-value');
const depthMarker = document.getElementById('depth-marker');
const zones = document.querySelectorAll('.zone');

// Particle system
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        // Wrap around
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
    }

    draw() {
        ctx.fillStyle = `rgba(0, 255, 204, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particles
const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

// Animate particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

// Depth calculation based on scroll
function updateDepth() {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const maxDepth = 11000; // Mariana Trench depth
    const currentDepth = Math.floor(scrollPercent * maxDepth);

    // Update depth display
    depthValue.textContent = currentDepth.toLocaleString();

    // Calculate pressure (approximately 1 atm per 10m)
    const pressure = Math.floor(1 + (currentDepth / 10));
    pressureValue.textContent = pressure.toLocaleString();

    // Update depth marker position
    const markerPercent = Math.min(scrollPercent * 100, 100);
    depthMarker.style.top = markerPercent + '%';

    // Update particle color based on depth
    particles.forEach(particle => {
        const depthRatio = scrollPercent;
        if (depthRatio < 0.2) {
            // Sunlight zone - blue particles
            particle.color = `rgba(0, 153, 255, ${particle.opacity})`;
        } else if (depthRatio < 0.5) {
            // Twilight/Midnight - cyan particles
            particle.color = `rgba(0, 255, 204, ${particle.opacity})`;
        } else {
            // Deep zones - dim cyan particles
            particle.color = `rgba(0, 255, 204, ${particle.opacity * 0.5})`;
        }
    });
}

// Smooth scroll spy
let ticking = false;

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateDepth();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll);

// Initial update
updateDepth();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Add parallax effect to zones
window.addEventListener('scroll', () => {
    zones.forEach((zone, index) => {
        const rect = zone.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
        const content = zone.querySelector('.zone-content');

        if (content && scrollPercent > 0 && scrollPercent < 1) {
            content.style.transform = `translateY(${scrollPercent * 20}px)`;
            content.style.opacity = Math.min(scrollPercent * 1.5, 1);
        }
    });
});

// Create floating bioluminescent organisms
function createBioOrganisms() {
    const organism = document.createElement('div');
    organism.className = 'bio-organism';
    organism.style.cssText = `
        position: fixed;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: radial-gradient(circle, rgba(0, 255, 204, 0.8), transparent);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        z-index: 1;
        animation: float ${Math.random() * 10 + 5}s infinite ease-in-out;
    `;
    document.body.appendChild(organism);

    setTimeout(() => organism.remove(), 15000);
}

// Add CSS animation for floating
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translate(20px, -30px) scale(1.2);
            opacity: 0.6;
        }
        50% {
            transform: translate(-15px, -50px) scale(0.8);
            opacity: 0.8;
        }
        75% {
            transform: translate(30px, -20px) scale(1.1);
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// Create organisms periodically in deeper zones
setInterval(() => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    if (scrollPercent > 0.3) { // Only in twilight and deeper
        createBioOrganisms();
    }
}, 2000);

// Creature card interactions
const creatureCards = document.querySelectorAll('.creature-card');

creatureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ambient sound effect on scroll (visual feedback)
let lastScrollTime = Date.now();

window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScrollTime > 100) {
        lastScrollTime = now;

        // Create a brief flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 255, 204, 0.02);
            pointer-events: none;
            z-index: 999;
            animation: flashFade 0.3s ease-out;
        `;
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 300);
    }
});

// Flash animation
const flashStyle = document.createElement('style');
flashStyle.textContent = `
    @keyframes flashFade {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(flashStyle);

console.log('🌊 Deep Ocean Mysteries loaded. Scroll to descend into the depths...');
