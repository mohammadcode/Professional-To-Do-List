
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 100;

class Particle {
    constructor(x, y, size, color, velocity) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.size > 0.2) this.size -= 0.1;
    }
}

function init() {
    particlesArray.length = 0;
    for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 5 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = `rgba(255, 255, 255, ${Math.random()})`;
        const velocity = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
        };
        particlesArray.push(new Particle(x, y, size, color, velocity));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle) => {
        particle.draw();
        particle.update();
    });
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});