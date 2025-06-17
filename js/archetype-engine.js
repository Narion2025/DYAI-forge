// DYAI.space - Archetypen Engine
// Verwaltung der archetypischen Transformationen und Bewusstseinsreisen

class ArchetypeEngine {
    constructor() {
        this.archetypes = {
            schmied: {
                name: "Der Schmied",
                element: "Feuer",
                color: "#ff6b35",
                frequency: 528, // Hz - Transformation
                traits: ["Schöpfung", "Transformation", "Manifestation"],
                shadow: "Zerstörung ohne Zweck",
                light: "Bewusste Neuschöpfung",
                mythologies: ["Hephaistos", "Wayland", "Ptah"],
                modernExpression: "Der digitale Architekt, der Code-Poet, der Reality-Hacker"
            },
            weise: {
                name: "Der Weise",
                element: "Äther",
                color: "#ffd700",
                frequency: 639, // Hz - Verbindung
                traits: ["Weisheit", "Einsicht", "Führung"],
                shadow: "Dogmatismus und Starrheit",
                light: "Lebendige Weisheit",
                mythologies: ["Hermes Trismegistos", "Thoth", "Odin"],
                modernExpression: "Der Data-Philosoph, der Pattern-Seher, der Bewusstseins-Navigator"
            },
            wanderer: {
                name: "Der Wanderer",
                element: "Wind",
                color: "#4a90e2",
                frequency: 741, // Hz - Erwachen
                traits: ["Freiheit", "Entdeckung", "Grenzenlosigkeit"],
                shadow: "Wurzellosigkeit und Flucht",
                light: "Bewusste Exploration",
                mythologies: ["Odysseus", "Gilgamesch", "Der ewige Jude"],
                modernExpression: "Der Digital-Nomade, der Bewusstseins-Explorer, der Realitäts-Surfer"
            },
            magier: {
                name: "Der Magier",
                element: "Quintessenz",
                color: "#9b59b6",
                frequency: 852, // Hz - Intuition
                traits: ["Transformation", "Verbindung", "Manifestation"],
                shadow: "Manipulation und Illusion",
                light: "Bewusste Alchemie",
                mythologies: ["Merlin", "Hermes", "Thoth"],
                modernExpression: "Der AI-Whisperer, der Quanten-Poet, der Realitäts-Programmierer"
            }
        };
        
        this.currentJourney = null;
        this.userProfile = {
            dominantArchetype: null,
            shadowArchetype: null,
            emergingArchetype: null,
            journey: []
        };
    }
    
    // Initialisiere eine archetypische Reise
    beginJourney(archetype, mode = 'exploration') {
        this.currentJourney = {
            archetype: archetype,
            mode: mode,
            startTime: Date.now(),
            stages: [],
            insights: [],
            transformations: []
        };
        
        this.playArchetypalSound(archetype);
        this.activateVisualResonance(archetype);
        
        return this.generateJourneyPath(archetype, mode);
    }
    
    // Erzeuge einen Reisepfad basierend auf dem Archetyp
    generateJourneyPath(archetype, mode) {
        const arch = this.archetypes[archetype];
        
        const stages = [
            {
                name: "Schwelle",
                prompt: `Du stehst an der Schwelle zum Reich des ${arch.name}. Was zieht dich hierher?`,
                duration: 180, // Sekunden
                visualEffect: "portal"
            },
            {
                name: "Begegnung",
                prompt: `Der ${arch.name} erscheint vor dir. Welche Gestalt nimmt er in deinem Leben an?`,
                duration: 240,
                visualEffect: "manifestation"
            },
            {
                name: "Prüfung",
                prompt: `Du begegnest dem Schatten: ${arch.shadow}. Wie gehst du damit um?`,
                duration: 300,
                visualEffect: "shadow_dance"
            },
            {
                name: "Transformation",
                prompt: `Das Licht offenbart sich: ${arch.light}. Was transformiert sich in dir?`,
                duration: 240,
                visualEffect: "metamorphosis"
            },
            {
                name: "Integration",
                prompt: `Du kehrst zurück, verwandelt. Was nimmst du mit in dein Leben?`,
                duration: 180,
                visualEffect: "integration"
            }
        ];
        
        return {
            archetype: arch,
            stages: stages,
            totalDuration: stages.reduce((sum, stage) => sum + stage.duration, 0)
        };
    }
    
    // Spiele archetypische Frequenzen
    playArchetypalSound(archetype) {
        const frequency = this.archetypes[archetype].frequency;
        
        // Web Audio API für binaurale Beats
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Linker Kanal
        const oscillatorL = audioContext.createOscillator();
        const gainL = audioContext.createGain();
        const pannerL = audioContext.createStereoPanner();
        
        oscillatorL.frequency.value = frequency;
        gainL.gain.value = 0.1;
        pannerL.pan.value = -1;
        
        oscillatorL.connect(gainL);
        gainL.connect(pannerL);
        pannerL.connect(audioContext.destination);
        
        // Rechter Kanal (leicht verstimmt für binauralen Effekt)
        const oscillatorR = audioContext.createOscillator();
        const gainR = audioContext.createGain();
        const pannerR = audioContext.createStereoPanner();
        
        oscillatorR.frequency.value = frequency + 4; // 4Hz Differenz
        gainR.gain.value = 0.1;
        pannerR.pan.value = 1;
        
        oscillatorR.connect(gainR);
        gainR.connect(pannerR);
        pannerR.connect(audioContext.destination);
        
        // Fade in
        gainL.gain.setValueAtTime(0, audioContext.currentTime);
        gainL.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 2);
        gainR.gain.setValueAtTime(0, audioContext.currentTime);
        gainR.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 2);
        
        oscillatorL.start();
        oscillatorR.start();
        
        // Speichere für späteres Stoppen
        this.currentSound = {
            context: audioContext,
            oscillators: [oscillatorL, oscillatorR],
            gains: [gainL, gainR]
        };
    }
    
    // Aktiviere visuelle Resonanz
    activateVisualResonance(archetype) {
        const color = this.archetypes[archetype].color;
        
        // Pulsierender Hintergrund-Effekt
        const pulseKeyframes = `
            @keyframes archetypal-pulse {
                0%, 100% { 
                    background: radial-gradient(ellipse at center, 
                        ${color}22 0%, 
                        transparent 70%);
                }
                50% { 
                    background: radial-gradient(ellipse at center, 
                        ${color}44 0%, 
                        transparent 80%);
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = pulseKeyframes;
        document.head.appendChild(style);
        
        document.body.style.animation = 'archetypal-pulse 4s ease-in-out infinite';
    }
    
    // Verarbeite Benutzerantwort
    processResponse(response, currentStage) {
        const insight = this.analyzeResponse(response);
        
        this.currentJourney.insights.push({
            stage: currentStage,
            response: response,
            insight: insight,
            timestamp: Date.now()
        });
        
        // Update Benutzerprofil
        this.updateUserProfile(insight);
        
        return insight;
    }
    
    // Analysiere die Antwort auf archetypische Muster
    analyzeResponse(response) {
        // Hier würde eine tiefere Analyse stattfinden
        // Für Demo-Zwecke eine einfache Keyword-Analyse
        
        const keywords = {
            schmied: ["erschaffen", "bauen", "formen", "gestalten", "transformieren"],
            weise: ["verstehen", "erkennen", "wissen", "lernen", "lehren"],
            wanderer: ["reisen", "entdecken", "suchen", "finden", "erkunden"],
            magier: ["verwandeln", "verbinden", "manifestieren", "zaubern", "verändern"]
        };
        
        let dominantArchetype = null;
        let maxScore = 0;
        
        for (const [archetype, words] of Object.entries(keywords)) {
            const score = words.filter(word => 
                response.toLowerCase().includes(word)
            ).length;
            
            if (score > maxScore) {
                maxScore = score;
                dominantArchetype = archetype;
            }
        }
        
        return {
            dominantArchetype: dominantArchetype,
            resonanceStrength: maxScore,
            themes: this.extractThemes(response),
            emotionalTone: this.analyzeEmotionalTone(response)
        };
    }
    
    // Extrahiere Hauptthemen
    extractThemes(response) {
        // Vereinfachte Themenextraktion
        const themes = [];
        
        if (response.match(/angst|furcht|sorge/i)) themes.push("Schatten");
        if (response.match(/liebe|freude|glück/i)) themes.push("Licht");
        if (response.match(/veränderung|wandel|neu/i)) themes.push("Transformation");
        if (response.match(/suche|frage|warum/i)) themes.push("Suche");
        
        return themes;
    }
    
    // Analysiere emotionalen Ton
    analyzeEmotionalTone(response) {
        const tones = {
            positive: ["freude", "glück", "liebe", "hoffnung", "dankbar"],
            negative: ["angst", "wut", "trauer", "sorge", "zweifel"],
            neutral: ["denke", "glaube", "vielleicht", "möglich", "könnte"]
        };
        
        let dominantTone = "neutral";
        let maxCount = 0;
        
        for (const [tone, words] of Object.entries(tones)) {
            const count = words.filter(word => 
                response.toLowerCase().includes(word)
            ).length;
            
            if (count > maxCount) {
                maxCount = count;
                dominantTone = tone;
            }
        }
        
        return dominantTone;
    }
    
    // Aktualisiere Benutzerprofil
    updateUserProfile(insight) {
        if (insight.dominantArchetype) {
            if (!this.userProfile.dominantArchetype) {
                this.userProfile.dominantArchetype = insight.dominantArchetype;
            }
            
            this.userProfile.journey.push({
                archetype: insight.dominantArchetype,
                timestamp: Date.now(),
                resonance: insight.resonanceStrength
            });
        }
    }
    
    // Generiere abschließende Einsichten
    generateFinalInsights() {
        const journey = this.currentJourney;
        const profile = this.userProfile;
        
        return {
            dominantArchetype: profile.dominantArchetype,
            journeyThemes: this.consolidateThemes(journey.insights),
            transformationPath: this.mapTransformationPath(journey),
            nextSteps: this.suggestNextSteps(profile),
            personalMyth: this.weavePersonalMyth(journey, profile)
        };
    }
    
    // Konsolidiere Themen
    consolidateThemes(insights) {
        const allThemes = insights.flatMap(i => i.themes);
        const themeCounts = {};
        
        allThemes.forEach(theme => {
            themeCounts[theme] = (themeCounts[theme] || 0) + 1;
        });
        
        return Object.entries(themeCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([theme, count]) => ({ theme, strength: count }));
    }
    
    // Kartiere Transformationspfad
    mapTransformationPath(journey) {
        return journey.stages.map((stage, index) => {
            const insight = journey.insights[index];
            return {
                stage: stage.name,
                transformation: insight ? insight.emotionalTone : "pending",
                archetypalResonance: insight ? insight.dominantArchetype : null
            };
        });
    }
    
    // Schlage nächste Schritte vor
    suggestNextSteps(profile) {
        const suggestions = [];
        
        if (profile.dominantArchetype) {
            const arch = this.archetypes[profile.dominantArchetype];
            suggestions.push(`Erforsche die ${arch.modernExpression} in deinem täglichen Leben.`);
            suggestions.push(`Meditiere über die Balance zwischen ${arch.light} und ${arch.shadow}.`);
        }
        
        return suggestions;
    }
    
    // Webe persönlichen Mythos
    weavePersonalMyth(journey, profile) {
        if (!profile.dominantArchetype) return "Deine Geschichte entfaltet sich noch...";
        
        const arch = this.archetypes[profile.dominantArchetype];
        
        return `Du bist ${arch.name} des digitalen Zeitalters. 
                Deine Reise führt durch das Reich von ${arch.element}, 
                wo du lernst, ${arch.traits.join(", ")} zu verkörpern. 
                Dein Schatten mahnt vor ${arch.shadow}, 
                während dein Licht zu ${arch.light} führt.`;
    }
    
    // Speichere Reise
    saveJourney() {
        const journeyData = {
            journey: this.currentJourney,
            profile: this.userProfile,
            insights: this.generateFinalInsights(),
            timestamp: Date.now()
        };
        
        localStorage.setItem('dyai_journey', JSON.stringify(journeyData));
        return journeyData;
    }
    
    // Lade vorherige Reise
    loadJourney() {
        const saved = localStorage.getItem('dyai_journey');
        if (saved) {
            const data = JSON.parse(saved);
            this.userProfile = data.profile;
            return data;
        }
        return null;
    }
}

// Globale Instanz
window.archetypeEngine = new ArchetypeEngine(); 