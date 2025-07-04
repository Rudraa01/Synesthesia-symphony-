const TRANSLATIONS = {
    "en-US": {
        "instructions": "Type to create colors and sounds • Click anywhere for musical bursts",
        "inputPlaceholder": "Type anything...",
        "cosmicMode": "Cosmic mode",
        "minimalMode": "Minimal mode",
        "explosiveMode": "Explosive mode"
    },
    /* LOCALE_PLACEHOLDER_START */
    "es-ES": {
        "instructions": "Escribe para crear colores y sonidos • Haz clic en cualquier lugar para ráfagas musicales",
        "inputPlaceholder": "Escribe cualquier cosa...",
        "cosmicMode": "Modo cósmico",
        "minimalMode": "Modo minimalista",
        "explosiveMode": "Modo explosivo"
    }
    /* LOCALE_PLACEHOLDER_END */
};

const appLocale = '{{APP_LOCALE}}';
const browserLocale = navigator.languages?.[0] || navigator.language || 'en-US';
const findMatchingLocale = (locale) => {
    if (TRANSLATIONS[locale]) return locale;
    const lang = locale.split('-')[0];
    const match = Object.keys(TRANSLATIONS).find(key => key.startsWith(lang + '-'));
    return match || 'en-US';
};
const locale = (appLocale !== '{{APP_LOCALE}}') ? findMatchingLocale(appLocale) : findMatchingLocale(browserLocale);
const t = (key) => TRANSLATIONS[locale]?.[key] || TRANSLATIONS['en-US'][key] || key;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const textInput = document.getElementById('textInput');
const modeBtn = document.getElementById('modeBtn');
const instructions = document.getElementById('instructions');

// Set localized content
instructions.textContent = t('instructions');
textInput.placeholder = t('inputPlaceholder');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

// Visualization modes
const modes = ['cosmic', 'minimal', 'explosive'];
let currentMode = 0;
const modeSymbols = ['◐', '○', '◉'];

// Enhanced color mappings with warmer, more vibrant colors
const letterColors = {
    'a': '#ff6b6b', 'b': '#4ecdc4', 'c': '#ffe66d', 'd': '#6c5ce7',
    'e': '#a8e6cf', 'f': '#ff8b94', 'g': '#ffd93d', 'h': '#6bcf7e',
    'i': '#95e1d3', 'j': '#f38181', 'k': '#aa96da', 'l': '#fcbad3',
    'm': '#a8d8ea', 'n': '#eaffd0', 'o': '#ff7675', 'p': '#fd79a8',
    'q': '#fdcb6e', 'r': '#e17055', 's': '#00b894', 't': '#00cec9',
    'u': '#a29bfe', 'v': '#ffeaa7', 'w': '#fab1a0', 'x': '#74b9ff',
    'y': '#81ecec', 'z': '#dfe6e9',
    ' ': '#ffffff', // space creates white
    '0': '#ff6348', '1': '#5f27cd', '2': '#00d2d3', '3': '#ff9ff3',
    '4': '#54a0ff', '5': '#48dbfb', '6': '#feca57', '7': '#ff6b9d',
    '8': '#c44569', '9': '#f8b500'
};

// Letter to frequency mapping for musical notes
const letterFrequencies = {
    'a': 440.00, 'b': 493.88, 'c': 261.63, 'd': 293.66,
    'e': 329.63, 'f': 349.23, 'g': 392.00, 'h': 415.30,
    'i': 466.16, 'j': 523.25, 'k': 554.37, 'l': 587.33,
    'm': 622.25, 'n': 659.25, 'o': 698.46, 'p': 739.99,
    'q': 783.99, 'r': 830.61, 's': 880.00, 't': 932.33,
    'u': 987.77, 'v': 1046.50, 'w': 1108.73, 'x': 1174.66,
    'y': 1244.51, 'z': 1318.51,
    ' ': 0, // space = silence
    '0': 1396.91, '1': 1479.98, '2': 1567.98, '3': 1661.22,
    '4': 1760.00, '5': 1864.66, '6': 1975.53, '7': 2093.00,
    '8': 2217.46, '9': 2349.32
};

let particles = [];
let ripples = [];
let audioContext = null;
let letterPositions = {};

class Particle {
    constructor(x, y, color, size = 5) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = (Math.random() - 0.5) * 3;
        this.life = 1;
        this.decay = 0.008;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        this.size *= 0.995;
        this.vy += 0.05; // slight gravity
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class Ripple {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 0;
        this.maxRadius = 300;
        this.speed = 4;
        this.life = 1;
    }

    update() {
        this.radius += this.speed;
        this.life = 1 - (this.radius / this.maxRadius);
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life * 0.3;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playNote(frequency, duration = 0.3) {
    if (!audioContext || frequency === 0) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

function getPositionForLetter(letter) {
    // Create a unique position for each letter based on its character code
    const code = letter.charCodeAt(0);
    const angle = (code * 137.5) % 360; // Golden angle for better distribution
    const radius = 200 + (code % 5) * 50;
    
    const centerX = width / 2;
    const centerY = height / 2 - 100; // Offset up to avoid input area
    
    const x = centerX + Math.cos(angle * Math.PI / 180) * radius;
    const y = centerY + Math.sin(angle * Math.PI / 180) * radius;
    
    return { x, y };
}

function createLetterEffect(letter) {
    const char = letter.toLowerCase();
    const color = letterColors[char] || '#ffffff';
    const frequency = letterFrequencies[char] || 440;
    const position = getPositionForLetter(char);
    
    // Play the letter's sound
    playNote(frequency);
    
    // Visual effects vary by mode
    const mode = modes[currentMode];
    
    if (mode !== 'minimal') {
        // Create visual letter for cosmic and explosive modes
        const letterEl = document.createElement('div');
        letterEl.className = 'letter-display';
        letterEl.textContent = letter;
        letterEl.style.color = color;
        letterEl.style.left = position.x + 'px';
        letterEl.style.top = position.y + 'px';
        document.body.appendChild(letterEl);
        
        // Remove letter element after animation
        setTimeout(() => letterEl.remove(), 4000);
    }
    
    // Create particles based on mode
    let particleCount = mode === 'minimal' ? 10 : mode === 'cosmic' ? 30 : 60;
    let particleSpread = mode === 'minimal' ? 20 : mode === 'cosmic' ? 40 : 80;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = new Particle(
            position.x + (Math.random() - 0.5) * particleSpread,
            position.y + (Math.random() - 0.5) * particleSpread,
            color,
            mode === 'explosive' ? Math.random() * 15 + 5 : Math.random() * 10 + 5
        );
        
        if (mode === 'explosive') {
            particle.vx *= 2;
            particle.vy *= 2;
        }
        
        particles.push(particle);
    }
    
    // Create ripple (not in minimal mode)
    if (mode !== 'minimal') {
        ripples.push(new Ripple(position.x, position.y, color));
    }
}

function createClickEffect(x, y) {
    // Generate random note and color
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const note = notes[Math.floor(Math.random() * notes.length)];
    const frequencies = {
        'C': 523.25, 'D': 587.33, 'E': 659.25, 'F': 698.46,
        'G': 783.99, 'A': 880.00, 'B': 987.77
    };
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#6c5ce7', '#a8e6cf', '#ff8b94', '#ffd93d'];
    const color = colors[notes.indexOf(note)];
    
    playNote(frequencies[note], 0.5);
    
    // Create larger burst for clicks
    for (let i = 0; i < 50; i++) {
        const particle = new Particle(
            x + (Math.random() - 0.5) * 60,
            y + (Math.random() - 0.5) * 60,
            color,
            Math.random() * 15 + 5
        );
        particles.push(particle);
    }
    
    ripples.push(new Ripple(x, y, color));
}

function animate() {
    // Fade effect varies by mode
    const fadeAmount = modes[currentMode] === 'minimal' ? 0.08 : 0.05;
    ctx.fillStyle = `rgba(0, 0, 0, ${fadeAmount})`;
    ctx.fillRect(0, 0, width, height);
    
    // Update and draw particles
    particles = particles.filter(particle => {
        particle.update();
        if (particle.life > 0) {
            particle.draw();
            return true;
        }
        return false;
    });
    
    // Update and draw ripples
    ripples = ripples.filter(ripple => {
        ripple.update();
        if (ripple.life > 0) {
            ripple.draw();
            return true;
        }
        return false;
    });
    
    requestAnimationFrame(animate);
}

// Mode button click
modeBtn.addEventListener('click', () => {
    currentMode = (currentMode + 1) % modes.length;
    modeBtn.textContent = modeSymbols[currentMode];
    
    // Update tooltip
    const modeKeys = ['cosmicMode', 'minimalMode', 'explosiveMode'];
    modeBtn.title = t(modeKeys[currentMode]);
});

// Event listeners
window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});

canvas.addEventListener('click', (e) => {
    initAudio();
    createClickEffect(e.clientX, e.clientY);
});

let lastText = '';
textInput.addEventListener('input', (e) => {
    initAudio();
    const currentText = e.target.value;
    
    // Find newly typed character
    if (currentText.length > lastText.length) {
        const newChar = currentText[currentText.length - 1];
        createLetterEffect(newChar);
    }
    
    lastText = currentText;
});

// Clear input periodically for continuous typing
textInput.addEventListener('keydown', (e) => {
    if (textInput.value.length > 30) {
        textInput.value = '';
        lastText = '';
    }
});

// Initialize mode button tooltip
modeBtn.title = t('cosmicMode');

// Start animation
animate();

// Focus input on load
textInput.focus();
