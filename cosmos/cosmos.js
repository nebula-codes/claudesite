// Cosmic Calendar Interactive Features

// Starfield background
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        this.opacity = Math.random();
        this.twinkleSpeed = Math.random() * 0.02;
        this.color = this.randomColor();
    }

    randomColor() {
        const colors = [
            'rgba(255, 255, 255,',
            'rgba(236, 64, 122,',
            'rgba(123, 31, 162,',
            'rgba(74, 20, 140,',
            'rgba(0, 153, 255,'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Twinkle effect
        this.opacity += this.twinkleSpeed;
        if (this.opacity > 1 || this.opacity < 0) {
            this.twinkleSpeed = -this.twinkleSpeed;
        }
    }

    draw() {
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow for larger stars
        if (this.size > 1) {
            ctx.shadowBlur = 5;
            ctx.shadowColor = this.color + '0.5)';
        } else {
            ctx.shadowBlur = 0;
        }
    }
}

// Create stars
const stars = [];
for (let i = 0; i < 300; i++) {
    stars.push(new Star());
}

// Animate starfield
function animateStarfield() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animateStarfield);
}

animateStarfield();

// Resize handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Timeline navigation
const navButtons = document.querySelectorAll('.nav-btn');
const eventCards = document.querySelectorAll('.event-card');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const month = btn.dataset.month;
        const zoom = btn.dataset.zoom;

        if (zoom === 'final') {
            // Scroll to final hour
            const finalEvents = Array.from(eventCards).filter(card =>
                card.dataset.date.includes('Dec 31, 11:')
            );
            if (finalEvents.length > 0) {
                finalEvents[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else if (month !== undefined) {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const targetMonth = monthNames[parseInt(month)];

            const targetEvent = Array.from(eventCards).find(card =>
                card.dataset.date.startsWith(targetMonth)
            );

            if (targetEvent) {
                targetEvent.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
});

// Shooting stars
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * (window.innerHeight / 2) + 'px';
    document.body.appendChild(star);

    setTimeout(() => star.remove(), 2000);
}

// Create shooting stars periodically
setInterval(createShootingStar, 5000);

// Scroll-based animations for event cards
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

eventCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Event card hover effects
eventCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        const marker = this.querySelector('.event-marker');
        if (marker) {
            marker.style.transform = 'translateX(-50%) scale(1.3)';
        }
    });

    card.addEventListener('mouseleave', function () {
        const marker = this.querySelector('.event-marker');
        if (marker) {
            marker.style.transform = 'translateX(-50%) scale(1)';
        }
    });
});

// Nebula effect on hero section
const hero = document.querySelector('.hero');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function createNebulaParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: ${Math.random() * 100 + 50}px;
        height: ${Math.random() * 100 + 50}px;
        background: radial-gradient(circle,
            rgba(236, 64, 122, 0.1) 0%,
            rgba(123, 31, 162, 0.05) 50%,
            transparent 100%);
        border-radius: 50%;
        left: ${mouseX}px;
        top: ${mouseY}px;
        pointer-events: none;
        z-index: 0;
        animation: nebula-fade 3s ease-out forwards;
    `;
    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 3000);
}

// Add nebula CSS animation
const nebulaStyle = document.createElement('style');
nebulaStyle.textContent = `
    @keyframes nebula-fade {
        0% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(0);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2);
        }
    }
`;
document.head.appendChild(nebulaStyle);

// Create nebula effect on mouse move (throttled)
let lastNebulaTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastNebulaTime > 200) {
        const rect = hero.getBoundingClientRect();
        if (e.clientY < rect.bottom) {
            createNebulaParticle();
        }
        lastNebulaTime = now;
    }
});

// Progress indicator based on scroll
function updateProgress() {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const progressColor = `hsl(${300 + (scrollPercent * 60)}, 70%, 50%)`;

    // You could add a progress bar here if desired
}

window.addEventListener('scroll', updateProgress);

// Fun fact: Calculate how old user is in cosmic time
function calculateCosmicAge(ageInYears) {
    const yearsPerSecond = 438;
    const cosmicSeconds = ageInYears / yearsPerSecond;
    return cosmicSeconds.toFixed(3);
}

// Add interactive cosmic age calculator to console
console.log(`
╔══════════════════════════════════════════════════════════╗
║           THE COSMIC CALENDAR HAS LOADED                 ║
║                                                          ║
║  13.8 billion years compressed into one year             ║
║  Every second = 438 years                                ║
║                                                          ║
║  Try: calculateCosmicAge(25) to see your age in          ║
║  cosmic time!                                            ║
╚══════════════════════════════════════════════════════════╝
`);

// Make function available globally
window.calculateCosmicAge = calculateCosmicAge;

// Add sparkle effect to major events
document.querySelectorAll('.event-card.major').forEach(card => {
    setInterval(() => {
        const sparkle = document.createElement('div');
        const rect = card.getBoundingClientRect();
        sparkle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            pointer-events: none;
            z-index: 1000;
            animation: sparkle-fade 1s ease-out forwards;
        `;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }, 2000);
});

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle-fade {
        0% {
            opacity: 1;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(sparkleStyle);

console.log('✨ Cosmic Calendar loaded. Journey through 13.8 billion years...');
