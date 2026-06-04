// === Sound Effects (Web Audio API — no external files needed) ===

(function () {
    'use strict';

    let audioCtx = null;
    let soundEnabled = false;
    let ambientOsc = null;
    let ambientGain = null;

    const soundToggle = document.getElementById('sound-toggle');
    const soundOnIcon = document.getElementById('sound-on-icon');
    const soundOffIcon = document.getElementById('sound-off-icon');

    function initAudio() {
        if (audioCtx) return;
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    // === Toggle Sound ===
    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundOnIcon.style.display = soundEnabled ? 'block' : 'none';
        soundOffIcon.style.display = soundEnabled ? 'none' : 'block';

        if (soundEnabled) {
            initAudio();
            startAmbient();
        } else {
            stopAmbient();
        }
    });

    // === Ambient Space Hum ===
    function startAmbient() {
        if (!audioCtx || ambientOsc) return;

        // Deep space drone — very subtle
        ambientGain = audioCtx.createGain();
        ambientGain.gain.setValueAtTime(0, audioCtx.currentTime);
        ambientGain.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 2);
        ambientGain.connect(audioCtx.destination);

        // Base drone
        ambientOsc = audioCtx.createOscillator();
        ambientOsc.type = 'sine';
        ambientOsc.frequency.setValueAtTime(55, audioCtx.currentTime); // Low A
        ambientOsc.connect(ambientGain);
        ambientOsc.start();

        // Second harmonic
        const osc2 = audioCtx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(82.5, audioCtx.currentTime); // Fifth above
        const gain2 = audioCtx.createGain();
        gain2.gain.setValueAtTime(0.008, audioCtx.currentTime);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start();

        // Slow LFO for movement
        const lfo = audioCtx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.1, audioCtx.currentTime);
        const lfoGain = audioCtx.createGain();
        lfoGain.gain.setValueAtTime(3, audioCtx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(ambientOsc.frequency);
        lfo.start();
    }

    function stopAmbient() {
        if (ambientGain) {
            ambientGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);
            setTimeout(() => {
                if (ambientOsc) { ambientOsc.stop(); ambientOsc = null; }
                ambientGain = null;
            }, 1200);
        }
    }

    // === Woosh Sound (planet click) ===
    window.playWoosh = function () {
        if (!soundEnabled || !audioCtx) return;

        const duration = 0.4;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + duration);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, audioCtx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + duration);

        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + duration);
    };

    // === Click/Select Sound (moon click) ===
    window.playClick = function () {
        if (!soundEnabled || !audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.15);
    };

    // === Back/Navigate Sound ===
    window.playBack = function () {
        if (!soundEnabled || !audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.2);

        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.25);
    };

})();
