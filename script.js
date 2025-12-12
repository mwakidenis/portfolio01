// Random floating emojis
class FloatingEmojis {
    constructor() {
        this.emojis = ["💻", "😁", "🙈", "🌐", "🤝", "🚀", "🤖", "🧩"];
        this.intervalId = null;
        this.init();
    }

    init() {
        // Start emojis only on the home page
        this.checkPage();
        window.addEventListener('hashchange', () => this.checkPage());
    }

    checkPage() {
        // Stop existing interval
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        // Only run on home page
        if (window.location.hash.slice(1) === 'home' || !window.location.hash) {
            this.intervalId = setInterval(() => this.createEmoji(), 1000); // every 1 second
        }
    }

    createEmoji() {
        const emoji = document.createElement('div');
        emoji.textContent = this.emojis[Math.floor(Math.random() * this.emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.fontSize = `${Math.random() * 24 + 16}px`; // random size 16-40px
        emoji.style.left = `${Math.random() * 90}%`; // random horizontal position
        emoji.style.top = `${Math.random() * 80}%`; // random vertical position
        emoji.style.pointerEvents = 'none';
        emoji.style.zIndex = 9999;
        emoji.style.opacity = 1;
        emoji.style.transition = 'transform 2s linear, opacity 2s linear';

        document.body.appendChild(emoji);

        // Animate upward movement and fade out
        requestAnimationFrame(() => {
            emoji.style.transform = `translateY(-100px)`;
            emoji.style.opacity = 0;
        });

        // Remove after animation
        setTimeout(() => emoji.remove(), 2000);
    }
}

// Initialize floating emojis
document.addEventListener('DOMContentLoaded', () => {
    new FloatingEmojis();
});
