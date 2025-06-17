// DYAI.space - Hauptinteraktionen und Archetypen-System

document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen
    const loadingScreen = document.querySelector('.loading-cosmos');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            initializeAmbientSound();
        }, 2000);
    });
    
    // Ambient Sound
    function initializeAmbientSound() {
        const ambientAudio = document.getElementById('cosmic-ambience');
        
        // Auto-play mit User-Interaction
        document.addEventListener('click', function initSound() {
            ambientAudio.volume = 0.3;
            ambientAudio.play().catch(e => console.log('Audio play failed:', e));
            document.removeEventListener('click', initSound);
        }, { once: true });
    }
    
    // Smooth Scrolling für Navigation
    document.querySelectorAll('.nav-star').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Sphere Interactions
    const spheres = document.querySelectorAll('.sphere');
    
    spheres.forEach(sphere => {
        sphere.addEventListener('mouseenter', () => {
            const archetype = sphere.dataset.archetype;
            animateSphereHover(sphere, archetype);
        });
        
        sphere.addEventListener('click', () => {
            const archetype = sphere.dataset.archetype;
            activateArchetypeInterface(archetype);
        });
    });
    
    function animateSphereHover(sphere, archetype) {
        gsap.to(sphere.querySelector('.sphere-core'), {
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out"
        });
    }
    
    // Archetypen-Aktivierung
    function activateArchetypeInterface(archetype) {
        const forgeSound = document.getElementById('forge-sound');
        forgeSound.play();
        
        // Zeige Archetyp-spezifische Inhalte
        displayArchetypeContent(archetype);
        
        // Scrolle zur Schmiede
        document.querySelector('#schmiede').scrollIntoView({
            behavior: 'smooth'
        });
    }
    
    // Archetypen-Content-System
    const archetypeData = {
        schmied: {
            title: "Der Schmied",
            description: "Erschaffer und Former digitaler Realitäten",
            prompt: "Du bist der archetypische Schmied des digitalen Zeitalters...",
            color: "#ff6b35",
            questions: [
                "Was möchtest du in deinem Leben erschaffen?",
                "Welche Werkzeuge brauchst du für deine Vision?",
                "Was muss transformiert werden?"
            ]
        },
        weise: {
            title: "Der Weise",
            description: "Hüter des Wissens und der tiefen Einsicht",
            prompt: "Du verkörperst die zeitlose Weisheit...",
            color: "#ffd700",
            questions: [
                "Welche Wahrheit suchst du?",
                "Was lehrt dich deine Intuition?",
                "Wo findest du Stille?"
            ]
        },
        wanderer: {
            title: "Der Wanderer",
            description: "Erforscher unbekannter Bewusstseinsräume",
            prompt: "Du bist der ewige Reisende zwischen den Welten...",
            color: "#4a90e2",
            questions: [
                "Wohin führt dich deine Reise?",
                "Was lässt du hinter dir?",
                "Was erwartet dich am Horizont?"
            ]
        }
    };
    
    function displayArchetypeContent(archetype) {
        const data = archetypeData[archetype];
        const forgeInterface = document.querySelector('.forge-interface');
        
        // Dynamischer Content
        const archetypeHTML = `
            <div class="archetype-activation">
                <h3 class="archetype-title" style="color: ${data.color}">${data.title}</h3>
                <p class="archetype-description">${data.description}</p>
                <div class="archetype-questions">
                    ${data.questions.map(q => `<p class="question">${q}</p>`).join('')}
                </div>
                <button class="begin-journey-btn" data-archetype="${archetype}">
                    Beginne deine Reise
                </button>
            </div>
        `;
        
        forgeInterface.innerHTML += archetypeHTML;
        
        // Animate appearance
        gsap.from('.archetype-activation', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out"
        });
    }
    
    // Forge Button Interaction
    const forgeBtn = document.getElementById('start-forging');
    
    forgeBtn.addEventListener('click', () => {
        initializeForge();
    });
    
    function initializeForge() {
        // Verbindung zum Archetypen-Schmied
        const schmiedInterface = `
            <div class="schmied-portal">
                <h3>Portal zur Archetypen-Schmiede</h3>
                <p>Wähle deinen Pfad der Transformation</p>
                <div class="portal-options">
                    <button class="portal-btn" data-mode="voice">
                        <span class="icon">🎙️</span>
                        <span>Sprachgeführte Reise</span>
                    </button>
                    <button class="portal-btn" data-mode="text">
                        <span class="icon">✍️</span>
                        <span>Schriftliche Erkundung</span>
                    </button>
                </div>
            </div>
        `;
        
        const forgeVisualization = document.querySelector('.forge-visualization');
        forgeVisualization.innerHTML = schmiedInterface;
        
        // Portal Button Events
        document.querySelectorAll('.portal-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                launchArchetypeJourney(mode);
            });
        });
    }
    
    function launchArchetypeJourney(mode) {
        if (mode === 'voice') {
            // Integration mit ElevenLabs Widget
            console.log('Starte Voice-Journey mit ElevenLabs');
            // Hier würde das ElevenLabs Widget geladen
        } else {
            // Text-basierte Journey
            console.log('Starte Text-Journey');
            // Hier würde die Text-Interface geladen
        }
    }
    
    // Parallax Scrolling Effect
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Intersection Observer für Scroll-Animationen
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Spezielle Animationen für verschiedene Elemente
                if (entry.target.classList.contains('archetype-grid')) {
                    animateArchetypeGrid();
                }
            }
        });
    }, observerOptions);
    
    // Beobachte alle animierbaren Elemente
    document.querySelectorAll('section, .stellar-title, .archetype-grid').forEach(el => {
        observer.observe(el);
    });
    
    function animateArchetypeGrid() {
        // Dynamisches Laden der Archetypen
        const archetypes = [
            { name: 'Der Schöpfer', symbol: '✨' },
            { name: 'Der Herrscher', symbol: '👑' },
            { name: 'Der Magier', symbol: '🔮' },
            { name: 'Der Held', symbol: '⚔️' },
            { name: 'Der Liebende', symbol: '❤️' },
            { name: 'Der Narr', symbol: '🃏' }
        ];
        
        const grid = document.querySelector('.archetype-grid');
        
        archetypes.forEach((archetype, index) => {
            const card = document.createElement('div');
            card.className = 'archetype-card';
            card.innerHTML = `
                <div class="archetype-symbol">${archetype.symbol}</div>
                <h4 class="archetype-name">${archetype.name}</h4>
            `;
            
            grid.appendChild(card);
            
            // Gestaffelte Animation
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power3.out"
            });
        });
    }
    
    // Cursor Trail Effect
    const cursorTrail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        dot.style.width = dot.style.height = `${(trailLength - i) / 2}px`;
        document.body.appendChild(dot);
        cursorTrail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursorTrail() {
        let x = mouseX;
        let y = mouseY;
        
        cursorTrail.forEach((dot, index) => {
            const nextDot = cursorTrail[index + 1] || cursorTrail[0];
            
            x += (nextDot.offsetLeft - x) * 0.3;
            y += (nextDot.offsetTop - y) * 0.3;
            
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
        });
        
        requestAnimationFrame(animateCursorTrail);
    }
    
    animateCursorTrail();
}); 