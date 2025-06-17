// DYAI.space - WebGL Kosmos Engine
// Erschaffe einen mystischen Sternenhimmel mit archetypischen Schmiedefeuern

class CosmicScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById('cosmos-canvas'),
            antialias: true,
            alpha: true 
        });
        
        this.stars = [];
        this.nebulae = [];
        this.archetypalSuns = [];
        this.particles = null;
        this.time = 0;
        
        this.init();
        this.animate();
    }
    
    init() {
        // Renderer Setup
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        
        // Camera Position
        this.camera.position.z = 50;
        
        // Ambient Light
        const ambientLight = new THREE.AmbientLight(0x0a0a0a);
        this.scene.add(ambientLight);
        
        // Create Star Field
        this.createStarField();
        
        // Create Nebula Background
        this.createNebula();
        
        // Create Archetypal Suns
        this.createArchetypalSuns();
        
        // Particle System for Cosmic Dust
        this.createCosmicDust();
        
        // Mouse Movement
        this.setupMouseMovement();
        
        // Window Resize
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }
    
    createStarField() {
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.7,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        const starsVertices = [];
        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starsVertices.push(x, y, z);
        }
        
        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
        const starField = new THREE.Points(starsGeometry, starsMaterial);
        this.stars.push(starField);
        this.scene.add(starField);
    }
    
    createNebula() {
        const nebulaGeometry = new THREE.PlaneGeometry(200, 200);
        const nebulaMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec2 resolution;
                varying vec2 vUv;
                
                vec3 nebula(vec2 p) {
                    float t = time * 0.1;
                    vec3 col = vec3(0.0);
                    
                    for(float i = 0.0; i < 4.0; i++) {
                        vec2 q = p + vec2(cos(t + i * 0.5), sin(t + i * 0.3)) * 0.2;
                        col += vec3(0.1, 0.0, 0.2) / length(q - vec2(0.5));
                    }
                    
                    return col * 0.3;
                }
                
                void main() {
                    vec2 p = vUv;
                    vec3 color = nebula(p);
                    gl_FragColor = vec4(color, 0.5);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        
        const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
        nebula.position.z = -100;
        this.nebulae.push({ mesh: nebula, material: nebulaMaterial });
        this.scene.add(nebula);
    }
    
    createArchetypalSuns() {
        const sunPositions = [
            { x: -30, y: 20, z: -50, archetype: 'schmied' },
            { x: 40, y: -10, z: -60, archetype: 'weise' },
            { x: 0, y: -30, z: -40, archetype: 'wanderer' }
        ];
        
        sunPositions.forEach((pos, index) => {
            // Core Sun
            const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
            const sunMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    color1: { value: new THREE.Color(0xff6b35) },
                    color2: { value: new THREE.Color(0xffd700) }
                },
                vertexShader: `
                    varying vec3 vNormal;
                    varying vec3 vPosition;
                    void main() {
                        vNormal = normalize(normalMatrix * normal);
                        vPosition = position;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform float time;
                    uniform vec3 color1;
                    uniform vec3 color2;
                    varying vec3 vNormal;
                    varying vec3 vPosition;
                    
                    void main() {
                        float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
                        vec3 color = mix(color1, color2, sin(time + length(vPosition)) * 0.5 + 0.5);
                        gl_FragColor = vec4(color, 1.0) * intensity * 2.0;
                    }
                `,
                blending: THREE.AdditiveBlending,
                side: THREE.BackSide
            });
            
            const sun = new THREE.Mesh(sunGeometry, sunMaterial);
            sun.position.set(pos.x, pos.y, pos.z);
            
            // Corona
            const coronaGeometry = new THREE.SphereGeometry(8, 32, 32);
            const coronaMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 }
                },
                vertexShader: `
                    varying vec3 vNormal;
                    void main() {
                        vNormal = normalize(normalMatrix * normal);
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform float time;
                    varying vec3 vNormal;
                    
                    void main() {
                        float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
                        vec3 color = vec3(1.0, 0.4, 0.2) * intensity;
                        float pulse = sin(time * 2.0) * 0.1 + 0.9;
                        gl_FragColor = vec4(color * pulse, intensity * 0.5);
                    }
                `,
                transparent: true,
                blending: THREE.AdditiveBlending,
                side: THREE.BackSide
            });
            
            const corona = new THREE.Mesh(coronaGeometry, coronaMaterial);
            corona.position.copy(sun.position);
            
            this.archetypalSuns.push({
                sun: sun,
                corona: corona,
                sunMaterial: sunMaterial,
                coronaMaterial: coronaMaterial,
                archetype: pos.archetype,
                basePosition: pos,
                phase: index * Math.PI * 2 / 3
            });
            
            this.scene.add(sun);
            this.scene.add(corona);
        });
    }
    
    createCosmicDust() {
        const particleCount = 5000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 100;
            positions[i + 1] = (Math.random() - 0.5) * 100;
            positions[i + 2] = (Math.random() - 0.5) * 100;
            
            const color = new THREE.Color();
            color.setHSL(Math.random() * 0.1 + 0.05, 0.7, 0.5);
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.2,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }
    
    setupMouseMovement() {
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        
        document.addEventListener('click', (event) => {
            this.checkArchetypeInteraction();
        });
    }
    
    checkArchetypeInteraction() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        const sunMeshes = this.archetypalSuns.map(s => s.sun);
        const intersects = this.raycaster.intersectObjects(sunMeshes);
        
        if (intersects.length > 0) {
            const clickedSun = this.archetypalSuns.find(s => s.sun === intersects[0].object);
            if (clickedSun) {
                this.activateArchetype(clickedSun.archetype);
            }
        }
    }
    
    activateArchetype(archetype) {
        console.log(`Aktiviere Archetyp: ${archetype}`);
        // Hier könnte die Verbindung zur Schmiede oder zum Test erfolgen
        
        // Visueller Effekt
        const flash = new THREE.PointLight(0xffffff, 5, 50);
        flash.position.set(0, 0, 0);
        this.scene.add(flash);
        
        gsap.to(flash, {
            intensity: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                this.scene.remove(flash);
            }
        });
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.time += 0.01;
        
        // Rotate Stars
        this.stars.forEach(starField => {
            starField.rotation.y += 0.0001;
            starField.rotation.x += 0.0001;
        });
        
        // Update Nebula
        this.nebulae.forEach(nebula => {
            nebula.material.uniforms.time.value = this.time;
        });
        
        // Animate Archetypal Suns
        this.archetypalSuns.forEach(sunData => {
            sunData.sunMaterial.uniforms.time.value = this.time;
            sunData.coronaMaterial.uniforms.time.value = this.time;
            
            // Gentle floating motion
            const floatY = Math.sin(this.time + sunData.phase) * 0.5;
            const floatX = Math.cos(this.time * 0.7 + sunData.phase) * 0.3;
            
            sunData.sun.position.y = sunData.basePosition.y + floatY;
            sunData.sun.position.x = sunData.basePosition.x + floatX;
            sunData.corona.position.copy(sunData.sun.position);
            
            // Rotate
            sunData.sun.rotation.y += 0.005;
            sunData.corona.rotation.y -= 0.003;
        });
        
        // Animate Particles
        if (this.particles) {
            this.particles.rotation.y += 0.0002;
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(this.time + i) * 0.01;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }
        
        // Camera subtle movement
        this.camera.position.x = this.mouse.x * 5;
        this.camera.position.y = this.mouse.y * 5;
        this.camera.lookAt(this.scene.position);
        
        this.renderer.render(this.scene, this.camera);
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CosmicScene();
}); 