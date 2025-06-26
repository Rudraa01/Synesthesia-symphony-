# 🌈 Interactive Synesthesia Symphony

<div align="center">

![Synesthesia Banner](https://img.shields.io/badge/Experience-Synesthesia-blueviolet?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPHN2Zz4K)
![Version](https://img.shields.io/badge/Version-2.0-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)

**Transform letters into colors, sounds, and visual poetry**

[🚀 Live Demo](https://rudraa01.github.io/Synesthesia-symphony-/) • [📖 Documentation](#features) • [🎨 Gallery](#visual-modes) • [🤝 Contribute](#contributing)

</div>

---

## ✨ What is Synesthesia?

Synesthesia is a fascinating neurological phenomenon where stimulation of one sensory pathway leads to involuntary experiences in a second sensory pathway. This interactive experience simulates **chromesthesia** (sound-to-color synesthesia) and **lexical-gustatory synesthesia** (letter-to-color associations), creating a magical bridge between typography, music, and visual art.

## 🎯 Features

### 🎵 **Audio-Visual Harmony**
- **Real-time Sound Generation**: Each letter maps to specific musical frequencies
- **Dynamic Color Mapping**: Every character has its unique color signature
- **Spatial Audio**: Letters appear in consistent spatial positions based on their character codes

### 🎨 **Three Distinct Visual Modes**

| Mode | Symbol | Description | Particle Count | Effects |
|------|--------|-------------|----------------|---------|
| **Cosmic** | ◐ | Ethereal space-like experience | 30 particles | Floating letters + ripples |
| **Minimal** | ○ | Clean, focused visualization | 10 particles | Subtle, elegant |
| **Explosive** | ◉ | High-energy burst effects | 60 particles | Dynamic explosions |

### 🖱️ **Interactive Elements**
- **Type-to-Create**: Letters instantly generate visual and audio feedback
- **Click Harmonics**: Mouse clicks create musical bursts with random notes
- **Responsive Design**: Adapts beautifully to any screen size
- **Multi-language Support**: Internationalization ready

## 🛠️ Technical Architecture

### **Core Technologies**
```
HTML5 Canvas API    → High-performance rendering
Web Audio API       → Real-time sound synthesis
Vanilla JavaScript  → Lightweight, dependency-free
CSS3 Animations     → Smooth visual transitions
```

### **Performance Optimizations**
- **Particle System**: Efficient object pooling and lifecycle management
- **Frame Rate**: Optimized at 60fps with `requestAnimationFrame`
- **Memory Management**: Automatic cleanup of expired visual elements
- **Audio Context**: Lazy initialization to comply with browser policies

## 🎨 Visual Modes

<details>
<summary><strong>🌌 Cosmic Mode (Default)</strong></summary>

- **Particles**: 30 per keystroke
- **Effects**: Floating letters with ethereal glow
- **Ripples**: Expanding color waves
- **Best for**: Meditation, creative writing, ambient experiences

</details>

<details>
<summary><strong>⚪ Minimal Mode</strong></summary>

- **Particles**: 10 per keystroke  
- **Effects**: Clean, focused bursts
- **Ripples**: Disabled for clarity
- **Best for**: Professional presentations, focused work

</details>

<details>
<summary><strong>💥 Explosive Mode</strong></summary>

- **Particles**: 60 per keystroke
- **Effects**: High-energy explosions with larger particles
- **Velocity**: 2x particle speed
- **Best for**: Gaming, high-energy creative sessions

</details>

## 🎼 Sound Design

### **Letter-to-Frequency Mapping**
Each letter corresponds to a specific musical frequency, creating a unique auditory signature:

```javascript
const letterFrequencies = {
    'a': 440.00,  // A4 (Concert pitch)
    'b': 493.88,  // B4
    'c': 261.63,  // C4 (Middle C)
    // ... and so on
};
```

### **Audio Features**
- **Sine Wave Oscillators**: Pure, clean tones
- **ADSR Envelope**: Natural attack and decay
- **Polyphonic**: Multiple notes can play simultaneously
- **Click Harmonics**: Random musical bursts on mouse interaction

## 🚀 Quick Start

### **Option 1: Direct Use**
1. Download the HTML file
2. Open in any modern web browser
3. Start typing and clicking!

### **Option 2: Web Server**
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

### **Option 3: Integration**
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Synesthesia App</title>
</head>
<body>
    <!-- Embed the synesthesia experience -->
    <iframe src="synesthesia.html" width="100%" height="600px"></iframe>
</body>
</html>
```

## 🎯 Use Cases

### **🎓 Educational**
- **Neuropsychology**: Demonstrate synesthesia concepts
- **Music Theory**: Visualize note relationships
- **Typography**: Explore letter-color associations

### **🎨 Creative**
- **Digital Art**: Generate unique visual compositions
- **Music Composition**: Use as inspiration for melodies
- **Interactive Installations**: Perfect for exhibitions

### **💼 Professional**
- **Presentations**: Engaging visual backgrounds
- **Team Building**: Interactive workshop activities  
- **UX Research**: Study user interaction patterns

## 🌐 Browser Compatibility

| Browser | Version | Audio Support | Canvas Support | Status |
|---------|---------|---------------|----------------|--------|
| Chrome | 60+ | ✅ | ✅ | Full Support |
| Firefox | 55+ | ✅ | ✅ | Full Support |
| Safari | 11+ | ✅ | ✅ | Full Support |
| Edge | 79+ | ✅ | ✅ | Full Support |

## 📱 Responsive Design

- **Desktop**: Full feature experience with mouse interactions
- **Tablet**: Touch-optimized with larger input areas
- **Mobile**: Simplified interface, optimized performance

## 🔧 Customization Guide

### **Color Palette**
Modify the `letterColors` object to create your own color scheme:

```javascript
const letterColors = {
    'a': '#your-color-here',
    'b': '#another-color',
    // ... customize all letters
};
```

### **Audio Frequencies**
Adjust the `letterFrequencies` to create different musical scales:

```javascript
const letterFrequencies = {
    'a': 432.00,  // A4 (Alternative tuning)
    // ... your custom frequencies
};
```

### **Particle Effects**
Fine-tune particle behavior in the `Particle` class:

```javascript
class Particle {
    constructor(x, y, color, size = 5) {
        this.decay = 0.008;  // Adjust fade speed
        // ... other customizations
    }
}
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### **🐛 Bug Reports**
- Use the issue tracker
- Include browser version and steps to reproduce
- Add screenshots or recordings if possible

### **✨ Feature Requests**
- Describe the feature and use case
- Consider backward compatibility
- Provide mockups if applicable

### **🔨 Development**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### **Code Style**
- Use descriptive variable names
- Comment complex algorithms
- Follow existing indentation patterns
- Test across multiple browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Rudra Vishwakarma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

## 🙏 Acknowledgments

- **Synesthesia Research**: Inspired by neurological studies on cross-modal perception
- **Color Theory**: Based on chromesthetic research and user studies
- **Audio Design**: Influenced by Just Intonation and Equal Temperament systems
- **Visual Effects**: Inspired by particle systems in game engines

## 📬 Connect with the Creator

<div align="center">

**Rudra Vishwakarma**

[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/_rudra.aaaaa)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/rudravishwakarma)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rudraa01)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/rudracavin)

*"Creating digital experiences that blur the boundaries between senses"*

</div>

---

<div align="center">

**⭐ Star this project if you found it interesting!**

**🔗 Share it with friends who love interactive art**

**🤝 Contribute to make it even better**

</div>

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/rudra-vishwakarma/Synesthesia-symphony?style=social)
![GitHub forks](https://img.shields.io/github/forks/rudra-vishwakarma/Synesthesia-symphony?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/rudra-vishwakarma/Synesthesia-symphony?style=social)

---

*Last updated: June 2025*
