// === Solar System Orbital Portfolio ===
// Features: Orbiting planets with Saturn rings, enhanced nebula, frequent shooting stars

(function () {
    'use strict';

    const svg = document.getElementById('orbital-svg');
    const starsCanvas = document.getElementById('stars-canvas');
    const backBtn = document.getElementById('back-btn');
    const detailPanel = document.getElementById('detail-panel');
    const panelClose = document.getElementById('panel-close');
    const hintText = document.getElementById('hint-text');

    let currentLevel = 'root';
    let svgWidth, svgHeight, centerX, centerY;
    let orbitRadius;
    let animationId;
    let planets = [];
    let isPaused = false;

    const timelineContainer = document.getElementById('timeline-container');
    const orbitalContainer = document.getElementById('orbital-container');

    // Categories that use timeline view instead of orbital
    const TIMELINE_CATEGORIES = ['work', 'education'];
    // Categories that use constellation view
    const CONSTELLATION_CATEGORIES = ['skill'];

    // === Space Background (Stars + Brighter Nebula + More Shooting Stars) ===
    function initStars() {
        const ctx = starsCanvas.getContext('2d');
        let W = starsCanvas.width = window.innerWidth;
        let H = starsCanvas.height = window.innerHeight;

        // Multi-layer stars for depth
        const starLayers = [
            { count: 350, maxR: 0.8, maxAlpha: 0.35, speed: 0.003 },
            { count: 180, maxR: 1.4, maxAlpha: 0.6, speed: 0.008 },
            { count: 70,  maxR: 2.2, maxAlpha: 0.9, speed: 0.015 },
        ];

        const allStars = [];
        starLayers.forEach(layer => {
            for (let i = 0; i < layer.count; i++) {
                allStars.push({
                    x: Math.random() * W,
                    y: Math.random() * H,
                    r: Math.random() * layer.maxR + 0.2,
                    alpha: Math.random() * layer.maxAlpha + 0.1,
                    twinkleSpeed: Math.random() * layer.speed + 0.002,
                    twinkleOffset: Math.random() * Math.PI * 2,
                    // Some stars have a faint color
                    color: Math.random() > 0.85
                        ? ['200,220,255', '255,220,200', '200,255,220'][Math.floor(Math.random() * 3)]
                        : '255,255,255'
                });
            }
        });

        // BRIGHTER Nebula clouds
        const nebulae = [
            { x: W * 0.12, y: H * 0.18, rx: W * 0.22, ry: H * 0.18, color: '100, 60, 220', alpha: 0.045 },
            { x: W * 0.82, y: H * 0.25, rx: W * 0.18, ry: H * 0.22, color: '60, 200, 190', alpha: 0.035 },
            { x: W * 0.5,  y: H * 0.82, rx: W * 0.28, ry: H * 0.14, color: '255, 90, 90', alpha: 0.03 },
            { x: W * 0.25, y: H * 0.65, rx: W * 0.15, ry: H * 0.2, color: '150, 120, 255', alpha: 0.04 },
            { x: W * 0.78, y: H * 0.7, rx: W * 0.2, ry: H * 0.12, color: '255, 200, 50', alpha: 0.025 },
            { x: W * 0.5,  y: H * 0.4, rx: W * 0.3, ry: H * 0.25, color: '80, 50, 150', alpha: 0.02 },
        ];

        // Shooting stars
        const shootingStars = [];
        function spawnShootingStar() {
            shootingStars.push({
                x: Math.random() * W * 0.8,
                y: Math.random() * H * 0.4,
                length: 80 + Math.random() * 140,
                speed: 5 + Math.random() * 8,
                angle: Math.PI * 0.15 + Math.random() * 0.35,
                alpha: 1,
                decay: 0.012 + Math.random() * 0.008,
                width: 1 + Math.random() * 1.5
            });
        }

        // MORE FREQUENT shooting stars — every 1.5-2.5 seconds
        setInterval(() => {
            spawnShootingStar();
            // Sometimes spawn 2 at once
            if (Math.random() > 0.6) spawnShootingStar();
        }, 1800);

        // Initial few
        setTimeout(spawnShootingStar, 500);
        setTimeout(spawnShootingStar, 1200);

        // Draw nebula (static layer, cached)
        const nebulaCanvas = document.createElement('canvas');
        nebulaCanvas.width = W;
        nebulaCanvas.height = H;
        const nebulaCtx = nebulaCanvas.getContext('2d');

        nebulae.forEach(n => {
            const grad = nebulaCtx.createRadialGradient(n.x, n.y, 0, n.x, n.y, Math.max(n.rx, n.ry));
            grad.addColorStop(0, `rgba(${n.color}, ${n.alpha * 2.5})`);
            grad.addColorStop(0.3, `rgba(${n.color}, ${n.alpha * 1.5})`);
            grad.addColorStop(0.6, `rgba(${n.color}, ${n.alpha * 0.6})`);
            grad.addColorStop(1, `rgba(${n.color}, 0)`);
            nebulaCtx.fillStyle = grad;
            nebulaCtx.beginPath();
            nebulaCtx.ellipse(n.x, n.y, n.rx, n.ry, 0, 0, Math.PI * 2);
            nebulaCtx.fill();
        });

        function drawFrame() {
            ctx.clearRect(0, 0, W, H);
            const time = Date.now() * 0.001;

            // Draw nebula
            ctx.drawImage(nebulaCanvas, 0, 0);

            // Draw stars
            allStars.forEach(star => {
                const flicker = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.4 + 0.6;
                const a = star.alpha * flicker;

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${star.color}, ${a})`;
                ctx.fill();

                // Bigger stars get glow halo
                if (star.r > 1.5) {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.r * 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${star.color}, ${a * 0.12})`;
                    ctx.fill();
                }
            });

            // Draw shooting stars
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const s = shootingStars[i];
                s.x += Math.cos(s.angle) * s.speed;
                s.y += Math.sin(s.angle) * s.speed;
                s.alpha -= s.decay;

                if (s.alpha <= 0) {
                    shootingStars.splice(i, 1);
                    continue;
                }

                const tailX = s.x - Math.cos(s.angle) * s.length;
                const tailY = s.y - Math.sin(s.angle) * s.length;

                const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
                grad.addColorStop(0, `rgba(255, 255, 255, 0)`);
                grad.addColorStop(0.7, `rgba(200, 230, 255, ${s.alpha * 0.4})`);
                grad.addColorStop(1, `rgba(255, 255, 255, ${s.alpha})`);

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(s.x, s.y);
                ctx.strokeStyle = grad;
                ctx.lineWidth = s.width;
                ctx.lineCap = 'round';
                ctx.stroke();

                // Bright head
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.width + 1, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha * 0.9})`;
                ctx.fill();

                // Head glow
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.width + 4, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 220, 255, ${s.alpha * 0.2})`;
                ctx.fill();
            }

            requestAnimationFrame(drawFrame);
        }

        drawFrame();

        window.addEventListener('resize', () => {
            W = starsCanvas.width = window.innerWidth;
            H = starsCanvas.height = window.innerHeight;
        });
    }

    // === Init ===
    function init() {
        updateDimensions();
        initStars();
        renderRoot();
        setupEvents();

        // Dismiss loader
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 600);
            }, 800);
        }

        window.addEventListener('resize', () => {
            updateDimensions();
            if (currentLevel === 'root') renderRoot();
            else if (!TIMELINE_CATEGORIES.includes(currentLevel)) renderCategory(currentLevel);
        });
    }

    function updateDimensions() {
        svgWidth = window.innerWidth;
        svgHeight = window.innerHeight;
        centerX = svgWidth / 2;
        centerY = svgHeight / 2;
        // Responsive orbit radius
        if (svgWidth < 480) {
            orbitRadius = Math.min(svgWidth, svgHeight) * 0.25;
        } else if (svgWidth < 768) {
            orbitRadius = Math.min(svgWidth, svgHeight) * 0.27;
        } else {
            orbitRadius = Math.min(svgWidth, svgHeight) * 0.3;
        }
        svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
    }

    // === Render Root (Solar System with Saturn Rings) ===
    function renderRoot() {
        currentLevel = 'root';
        backBtn.classList.add('hidden');
        hintText.textContent = 'Click the sun for about me • Click a planet to explore • Space to pause';
        hintText.classList.remove('hidden');
        hidePanel();
        hideTimeline();
        stopAnimation();

        svg.innerHTML = '';
        planets = [];

        const categories = portfolioData.categories;

        // Defs
        const defs = createSVG('defs');
        defs.innerHTML = `
            <filter id="sun-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"/>
                <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            <radialGradient id="sun-gradient">
                <stop offset="0%" stop-color="#fffde0"/>
                <stop offset="30%" stop-color="#ffd93d"/>
                <stop offset="70%" stop-color="#ff8c00"/>
                <stop offset="100%" stop-color="#cc5500"/>
            </radialGradient>
            <filter id="ring-blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
            </filter>
        `;
        svg.appendChild(defs);

        // Orbit paths
        categories.forEach((cat, i) => {
            const radius = getOrbitRadius(i, categories.length);
            const orbit = createSVG('circle', {
                cx: centerX,
                cy: centerY,
                r: radius,
                class: 'orbit-path'
            });
            svg.appendChild(orbit);
            gsap.fromTo(orbit, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.1 + i * 0.12 });
        });

        // Sun
        const sunGroup = createSVG('g', { class: 'center-sun' });

        // Sun corona (outer glow)
        const corona = createSVG('circle', {
            cx: centerX,
            cy: centerY,
            r: 75,
            fill: 'rgba(255, 180, 30, 0.06)'
        });
        sunGroup.appendChild(corona);

        // Sun pulse glow
        const sunGlow = createSVG('circle', {
            cx: centerX,
            cy: centerY,
            r: 60,
            fill: 'rgba(255, 200, 50, 0.12)',
            class: 'glow'
        });
        sunGroup.appendChild(sunGlow);

        // Sun body
        const sunBody = createSVG('circle', {
            cx: centerX,
            cy: centerY,
            r: 50,
            fill: 'url(#sun-gradient)',
            filter: 'url(#sun-glow)'
        });
        sunGroup.appendChild(sunBody);

        // Sun inner highlight
        const sunHighlight = createSVG('circle', {
            cx: centerX - 12,
            cy: centerY - 12,
            r: 18,
            fill: 'rgba(255, 255, 240, 0.2)'
        });
        sunGroup.appendChild(sunHighlight);

        // Sun text
        const sunName = createSVG('text', { x: centerX, y: centerY - 6 });
        sunName.textContent = portfolioData.center.name;
        sunName.style.cssText = 'fill: #1a1000; font-size: 13px; font-weight: 700; text-anchor: middle;';
        sunGroup.appendChild(sunName);

        const sunSub = createSVG('text', { x: centerX, y: centerY + 10 });
        sunSub.textContent = portfolioData.center.subtitle;
        sunSub.style.cssText = 'fill: #4a3000; font-size: 9px; font-weight: 500; text-anchor: middle;';
        sunGroup.appendChild(sunSub);

        svg.appendChild(sunGroup);

        // Make sun clickable
        sunGroup.style.cursor = 'pointer';
        sunGroup.addEventListener('click', () => {
            if (window.playClick) window.playClick();
            showAboutPanel();
        });

        gsap.fromTo(sunGroup,
            { opacity: 0, scale: 0.3, transformOrigin: `${centerX}px ${centerY}px` },
            { opacity: 1, scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' }
        );

        // Planets with rings
        categories.forEach((cat, i) => {
            const radius = getOrbitRadius(i, categories.length);
            // Slower, more graceful orbit
            const speed = 0.0004 + (categories.length - i) * 0.00012;
            const startAngle = (Math.PI * 2 / categories.length) * i - Math.PI / 2;

            const planetGroup = createSVG('g', {
                class: 'planet-node',
                'data-category': cat.id
            });

            // Planet size — bigger overall
            const planetSize = 32 - i * 2;

            // === SATURN RING (on every planet!) ===
            const ringGroup = createSVG('g', { class: 'planet-ring' });
            
            // Ring ellipse (tilted)
            const ringOuter = createSVG('ellipse', {
                cx: 0,
                cy: 0,
                rx: planetSize + 14,
                ry: (planetSize + 14) * 0.3,
                fill: 'none',
                stroke: cat.color,
                'stroke-width': '3',
                'stroke-opacity': '0.3',
                filter: 'url(#ring-blur)'
            });
            ringGroup.appendChild(ringOuter);

            const ringInner = createSVG('ellipse', {
                cx: 0,
                cy: 0,
                rx: planetSize + 8,
                ry: (planetSize + 8) * 0.3,
                fill: 'none',
                stroke: cat.color,
                'stroke-width': '2',
                'stroke-opacity': '0.5'
            });
            ringGroup.appendChild(ringInner);

            // Ring particles (small dots along the ring)
            for (let p = 0; p < 12; p++) {
                const pAngle = (Math.PI * 2 / 12) * p;
                const px = (planetSize + 11) * Math.cos(pAngle);
                const py = (planetSize + 11) * 0.3 * Math.sin(pAngle);
                const particle = createSVG('circle', {
                    cx: px,
                    cy: py,
                    r: 1.2,
                    fill: cat.color,
                    opacity: 0.4 + Math.random() * 0.3
                });
                ringGroup.appendChild(particle);
            }

            planetGroup.appendChild(ringGroup);

            // Planet body
            const body = createSVG('circle', {
                cx: 0,
                cy: 0,
                r: planetSize,
                fill: cat.color + '25',
                stroke: cat.color,
                'stroke-width': '2.5',
                class: 'planet-body'
            });
            body.style.color = cat.color;
            planetGroup.appendChild(body);

            // Planet inner core
            const core = createSVG('circle', {
                cx: 0,
                cy: 0,
                r: planetSize * 0.55,
                fill: cat.color + '50'
            });
            planetGroup.appendChild(core);

            // Planet highlight (3D effect)
            const highlight = createSVG('circle', {
                cx: -planetSize * 0.25,
                cy: -planetSize * 0.25,
                r: planetSize * 0.3,
                fill: 'rgba(255, 255, 255, 0.1)'
            });
            planetGroup.appendChild(highlight);

            // Icon
            const icon = createSVG('text', { x: 0, y: 2 });
            icon.textContent = cat.icon;
            icon.style.cssText = `font-size: ${planetSize * 0.65}px; text-anchor: middle; dominant-baseline: middle; pointer-events: none;`;
            planetGroup.appendChild(icon);

            // Label
            const label = createSVG('text', { x: 0, y: planetSize + 20 });
            label.textContent = cat.label;
            label.style.cssText = `font-size: 12px; font-weight: 600; fill: ${cat.color}; text-anchor: middle; pointer-events: none;`;
            planetGroup.appendChild(label);

            // Count
            const count = createSVG('text', { x: 0, y: planetSize + 33 });
            count.textContent = `${cat.items.length} items`;
            count.style.cssText = 'font-size: 9px; fill: var(--text-muted); text-anchor: middle; pointer-events: none;';
            planetGroup.appendChild(count);

            // Click
            planetGroup.addEventListener('click', () => {
                isPaused = true;
                if (window.playWoosh) window.playWoosh();
                gsap.to(svg.querySelectorAll('.planet-node, .center-sun, .orbit-path'), {
                    opacity: 0,
                    duration: 0.35,
                    ease: 'power2.in',
                    onComplete: () => {
                        if (TIMELINE_CATEGORIES.includes(cat.id)) {
                            renderTimeline(cat.id);
                        } else if (CONSTELLATION_CATEGORIES.includes(cat.id)) {
                            renderConstellation(cat.id);
                        } else {
                            renderCategory(cat.id);
                        }
                    }
                });
            });

            svg.appendChild(planetGroup);

            planets.push({
                element: planetGroup,
                radius: radius,
                angle: startAngle,
                speed: speed,
                // Ring rotation (slight tilt change over time)
                ringGroup: ringGroup,
                ringAngle: 0,
                ringSpeed: 0.001 + Math.random() * 0.001
            });

            gsap.fromTo(planetGroup,
                { opacity: 0, scale: 0, transformOrigin: 'center center' },
                { opacity: 1, scale: 1, duration: 0.7, delay: 0.25 + i * 0.18, ease: 'back.out(1.7)' }
            );
        });

        isPaused = false;
        startAnimation();
    }

    // === Animation Loop (with ring rotation) ===
    function startAnimation() {
        function animate() {
            if (isPaused) return;

            planets.forEach(p => {
                p.angle += p.speed;
                const x = centerX + p.radius * Math.cos(p.angle);
                const y = centerY + p.radius * Math.sin(p.angle);
                p.element.setAttribute('transform', `translate(${x}, ${y})`);

                // Subtle ring tilt animation
                if (p.ringGroup) {
                    p.ringAngle += p.ringSpeed;
                    const tilt = Math.sin(p.ringAngle) * 5;
                    p.ringGroup.setAttribute('transform', `rotate(${tilt})`);
                }
            });

            animationId = requestAnimationFrame(animate);
        }
        animate();
    }

    function stopAnimation() {
        isPaused = true;
        if (animationId) cancelAnimationFrame(animationId);
    }

    // === Get Orbit Radius ===
    function getOrbitRadius(index, total) {
        const minR = orbitRadius * 0.55;
        const maxR = orbitRadius * 1.3;
        const step = (maxR - minR) / (total - 1 || 1);
        return minR + step * index;
    }

    // === Render Timeline (Facebook-style for Work & Education) ===
    function renderTimeline(categoryId) {
        currentLevel = categoryId;
        const category = portfolioData.categories.find(c => c.id === categoryId);
        if (!category) return;

        backBtn.classList.remove('hidden');
        hintText.classList.add('hidden');
        hidePanel();
        stopAnimation();

        // Hide orbital, show timeline
        orbitalContainer.style.display = 'none';
        timelineContainer.classList.add('visible');

        // Build timeline HTML
        const items = [...category.items]; // chronological (latest first in data)

        let html = `
            <div class="timeline-header">
                <h2 style="color: ${category.color}">${category.icon} ${category.label}</h2>
                <p>Click on any card to expand details</p>
            </div>
            <div class="timeline-wrapper">
        `;

        items.forEach((item, i) => {
            const descHtml = Array.isArray(item.description)
                ? '<ul class="tl-bullets">' + item.description.map(d => `<li>${d}</li>`).join('') + '</ul>'
                : `<p>${item.description}</p>`;

            html += `
                <div class="timeline-item ${category.id}" data-index="${i}" style="transition-delay: ${i * 0.08}s;">
                    <div class="tl-date">${item.date}</div>
                    <div class="tl-title">${item.title}</div>
                    <div class="tl-subtitle">${item.subtitle}</div>
                    <div class="tl-desc">${descHtml}</div>
                    <div class="tl-tags">
                        ${item.tags.map(tag => `<span class="tl-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        timelineContainer.innerHTML = html;
        timelineContainer.scrollTop = 0;

        // Animate items in with GSAP
        setTimeout(() => {
            const timelineItems = timelineContainer.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, i) => {
                const isLeft = i % 2 === 0;
                gsap.fromTo(item,
                    { opacity: 0, x: isLeft ? -30 : 30, y: 20 },
                    { opacity: 1, x: 0, y: 0, duration: 0.5, delay: i * 0.1, ease: 'power2.out' }
                );
            });

            // Click to expand/collapse
            timelineItems.forEach(item => {
                item.addEventListener('click', () => {
                    const wasActive = item.classList.contains('active');
                    timelineItems.forEach(el => el.classList.remove('active'));
                    if (!wasActive) {
                        item.classList.add('active');
                        // Smooth scroll to item
                        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                });
            });
        }, 50);
    }

    // === Hide Timeline (used when going back) ===
    function hideTimeline() {
        timelineContainer.classList.remove('visible');
        timelineContainer.innerHTML = '';
        orbitalContainer.style.display = '';
    }

    // === Render Constellation (for Skills) ===
    function renderConstellation(categoryId) {
        currentLevel = categoryId;
        const category = portfolioData.categories.find(c => c.id === categoryId);
        if (!category || !category.constellation) return;

        backBtn.classList.remove('hidden');
        hintText.textContent = 'Click a star for details';
        hidePanel();
        stopAnimation();

        svg.innerHTML = '';
        planets = [];

        const stars = category.stars;
        const connections = category.connections;
        const clusters = category.clusters;

        // Draw connections first (behind stars)
        const linesGroup = createSVG('g', { class: 'constellation-lines' });
        connections.forEach((conn, i) => {
            const starA = stars.find(s => s.id === conn[0]);
            const starB = stars.find(s => s.id === conn[1]);
            if (!starA || !starB) return;

            const x1 = starA.x * svgWidth;
            const y1 = starA.y * svgHeight;
            const x2 = starB.x * svgWidth;
            const y2 = starB.y * svgHeight;

            const line = createSVG('line', {
                x1: x1, y1: y1,
                x2: x2, y2: y2,
                stroke: 'rgba(167, 139, 250, 0.12)',
                'stroke-width': '1',
                'stroke-dasharray': '4 3'
            });
            linesGroup.appendChild(line);

            gsap.fromTo(line,
                { opacity: 0 },
                { opacity: 1, duration: 0.6, delay: 0.3 + i * 0.02 }
            );
        });
        svg.appendChild(linesGroup);

        // Cluster labels
        const clusterPositions = {};
        Object.keys(clusters).forEach(clusterId => {
            const clusterStars = stars.filter(s => s.cluster === clusterId);
            if (clusterStars.length === 0) return;
            const avgX = clusterStars.reduce((sum, s) => sum + s.x, 0) / clusterStars.length * svgWidth;
            const avgY = clusterStars.reduce((sum, s) => sum + s.y, 0) / clusterStars.length * svgHeight;
            clusterPositions[clusterId] = { x: avgX, y: avgY };

            const label = createSVG('text', {
                x: avgX,
                y: avgY - 35
            });
            label.textContent = clusters[clusterId].label;
            label.style.cssText = `font-size: 10px; fill: ${clusters[clusterId].color}; text-anchor: middle; opacity: 0.5; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;`;
            svg.appendChild(label);

            gsap.fromTo(label, { opacity: 0 }, { opacity: 0.5, duration: 0.5, delay: 0.5 });
        });

        // Draw stars
        stars.forEach((star, i) => {
            const x = star.x * svgWidth;
            const y = star.y * svgHeight;
            const cluster = clusters[star.cluster];
            const color = cluster ? cluster.color : '#a78bfa';

            const group = createSVG('g', {
                class: 'constellation-star',
                'data-id': star.id
            });
            group.style.cursor = 'pointer';

            // Star glow
            const glow = createSVG('circle', {
                cx: x, cy: y, r: 12,
                fill: color,
                opacity: '0.08'
            });
            group.appendChild(glow);

            // Star body
            const body = createSVG('circle', {
                cx: x, cy: y, r: 5,
                fill: color,
                opacity: '0.9'
            });
            group.appendChild(body);

            // Star core (bright center)
            const core = createSVG('circle', {
                cx: x, cy: y, r: 2,
                fill: '#ffffff',
                opacity: '0.8'
            });
            group.appendChild(core);

            // Label
            const label = createSVG('text', {
                x: x, y: y + 18
            });
            label.textContent = star.label;
            label.style.cssText = `font-size: 9px; fill: var(--text-secondary); text-anchor: middle; pointer-events: none;`;
            group.appendChild(label);

            // Hover effect
            group.addEventListener('mouseenter', () => {
                gsap.to(glow, { r: 20, opacity: 0.2, duration: 0.3 });
                gsap.to(body, { r: 7, duration: 0.3 });
                // Highlight connected lines
                connections.forEach((conn, ci) => {
                    if (conn[0] === star.id || conn[1] === star.id) {
                        const line = linesGroup.children[ci];
                        if (line) gsap.to(line, { attr: { stroke: color, 'stroke-width': 2 }, opacity: 0.6, duration: 0.3 });
                    }
                });
            });

            group.addEventListener('mouseleave', () => {
                gsap.to(glow, { r: 12, opacity: 0.08, duration: 0.3 });
                gsap.to(body, { r: 5, duration: 0.3 });
                connections.forEach((conn, ci) => {
                    const line = linesGroup.children[ci];
                    if (line) gsap.to(line, { attr: { stroke: 'rgba(167,139,250,0.12)', 'stroke-width': 1 }, opacity: 1, duration: 0.3 });
                });
            });

            // Click — show cluster info in panel
            group.addEventListener('click', () => {
                if (window.playClick) window.playClick();
                const clusterInfo = category.items.find(item =>
                    item.tags.some(tag => tag.toLowerCase().includes(star.label.toLowerCase().split(' ')[0]))
                ) || {
                    title: star.label,
                    subtitle: cluster ? cluster.label : 'Skill',
                    date: '',
                    description: `Part of the ${cluster ? cluster.label : ''} skill set.`,
                    tags: [star.label]
                };

                showItemDetail({
                    title: star.label,
                    subtitle: cluster ? cluster.label : 'Skill',
                    date: clusterInfo.date || '',
                    description: clusterInfo.description,
                    tags: clusterInfo.tags
                }, category);
            });

            svg.appendChild(group);

            // Entry animation — twinkle in
            gsap.fromTo(group,
                { opacity: 0, scale: 0, transformOrigin: `${x}px ${y}px` },
                { opacity: 1, scale: 1, duration: 0.4, delay: 0.1 + i * 0.04, ease: 'back.out(2)' }
            );
        });

        // Subtle twinkle animation loop
        stars.forEach((star, i) => {
            const x = star.x * svgWidth;
            const y = star.y * svgHeight;
            const group = svg.querySelectorAll('.constellation-star')[i];
            if (!group) return;
            const core = group.querySelector('circle:nth-child(3)');
            if (core) {
                gsap.to(core, {
                    opacity: 0.4,
                    duration: 1 + Math.random() * 2,
                    repeat: -1,
                    yoyo: true,
                    delay: Math.random() * 2,
                    ease: 'sine.inOut'
                });
            }
        });
    }

    // === Render Category (Moons orbiting planet — for Projects & Skills) ===
    function renderCategory(categoryId) {
        currentLevel = categoryId;
        const category = portfolioData.categories.find(c => c.id === categoryId);
        if (!category) return;

        backBtn.classList.remove('hidden');
        hintText.textContent = 'Click a moon for details • Space to pause';
        hidePanel();
        stopAnimation();

        svg.innerHTML = '';
        planets = [];

        const moonOrbitRadius = orbitRadius * 0.9;

        // Defs
        const defs = createSVG('defs');
        defs.innerHTML = `<filter id="ring-blur"><feGaussianBlur in="SourceGraphic" stdDeviation="1"/></filter>`;
        svg.appendChild(defs);

        // Orbit ring
        const orbit = createSVG('circle', {
            cx: centerX,
            cy: centerY,
            r: moonOrbitRadius,
            class: 'orbit-path'
        });
        svg.appendChild(orbit);

        // Center planet (enlarged)
        const centerGroup = createSVG('g', { class: 'center-sun' });

        const centerGlow = createSVG('circle', {
            cx: centerX,
            cy: centerY,
            r: 65,
            fill: category.color + '10',
            class: 'glow'
        });
        centerGroup.appendChild(centerGlow);

        // Ring on center planet
        const centerRingOuter = createSVG('ellipse', {
            cx: centerX,
            cy: centerY,
            rx: 62,
            ry: 18,
            fill: 'none',
            stroke: category.color,
            'stroke-width': '3',
            'stroke-opacity': '0.25',
            filter: 'url(#ring-blur)'
        });
        centerGroup.appendChild(centerRingOuter);

        const centerBody = createSVG('circle', {
            cx: centerX,
            cy: centerY,
            r: 48,
            fill: category.color + '25',
            stroke: category.color,
            'stroke-width': '2.5'
        });
        centerGroup.appendChild(centerBody);

        const centerCore = createSVG('circle', {
            cx: centerX,
            cy: centerY,
            r: 30,
            fill: category.color + '45'
        });
        centerGroup.appendChild(centerCore);

        const centerIcon = createSVG('text', { x: centerX, y: centerY - 4 });
        centerIcon.textContent = category.icon;
        centerIcon.style.cssText = 'font-size: 26px; text-anchor: middle; dominant-baseline: middle;';
        centerGroup.appendChild(centerIcon);

        const centerLabel = createSVG('text', { x: centerX, y: centerY + 24 });
        centerLabel.textContent = category.label;
        centerLabel.style.cssText = `font-size: 13px; font-weight: 600; fill: ${category.color}; text-anchor: middle;`;
        centerGroup.appendChild(centerLabel);

        svg.appendChild(centerGroup);

        gsap.fromTo(centerGroup,
            { opacity: 0, scale: 0.3, transformOrigin: `${centerX}px ${centerY}px` },
            { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }
        );

        // Moons
        const items = category.items;
        items.forEach((item, i) => {
            const speed = 0.0005 + (items.length - i) * 0.00012;
            const startAngle = (Math.PI * 2 / items.length) * i - Math.PI / 2;

            const moonGroup = createSVG('g', {
                class: 'moon-node',
                'data-id': item.id
            });

            const moonSize = 32;

            // Small ring on moons too
            const moonRing = createSVG('ellipse', {
                cx: 0,
                cy: 0,
                rx: moonSize + 6,
                ry: (moonSize + 6) * 0.25,
                fill: 'none',
                stroke: category.color,
                'stroke-width': '1.5',
                'stroke-opacity': '0.2'
            });
            moonGroup.appendChild(moonRing);

            const body = createSVG('circle', {
                cx: 0,
                cy: 0,
                r: moonSize,
                fill: category.color + '10',
                stroke: category.color,
                'stroke-width': '1.5',
                'stroke-opacity': '0.5',
                class: 'moon-body'
            });
            body.style.color = category.color;
            moonGroup.appendChild(body);

            // Inner
            const inner = createSVG('circle', {
                cx: 0,
                cy: 0,
                r: moonSize * 0.6,
                fill: category.color + '18'
            });
            moonGroup.appendChild(inner);

            // Title
            const title = item.title.length > 18
                ? item.title.substring(0, 18) + '…'
                : item.title;
            const titleText = createSVG('text', { x: 0, y: -4 });
            titleText.textContent = title;
            titleText.style.cssText = 'font-size: 9.5px; fill: var(--text-primary); font-weight: 500; text-anchor: middle; pointer-events: none;';
            moonGroup.appendChild(titleText);

            // Subtitle
            const subText = createSVG('text', { x: 0, y: 10 });
            subText.textContent = item.subtitle.length > 20
                ? item.subtitle.substring(0, 20) + '…'
                : item.subtitle;
            subText.style.cssText = 'font-size: 7.5px; fill: var(--text-muted); text-anchor: middle; pointer-events: none;';
            moonGroup.appendChild(subText);

            moonGroup.addEventListener('click', () => {
                if (window.playClick) window.playClick();
                showItemDetail(item, category);
                svg.querySelectorAll('.moon-node .moon-body').forEach(c => {
                    c.setAttribute('stroke-opacity', '0.3');
                    c.setAttribute('stroke-width', '1.5');
                });
                body.setAttribute('stroke-opacity', '1');
                body.setAttribute('stroke-width', '2.5');
            });

            svg.appendChild(moonGroup);

            planets.push({
                element: moonGroup,
                radius: moonOrbitRadius,
                angle: startAngle,
                speed: speed
            });

            gsap.fromTo(moonGroup,
                { opacity: 0, scale: 0, transformOrigin: 'center center' },
                { opacity: 1, scale: 1, duration: 0.5, delay: 0.1 + i * 0.09, ease: 'back.out(1.3)' }
            );
        });

        gsap.fromTo(orbit, { opacity: 0 }, { opacity: 1, duration: 0.5 });

        isPaused = false;
        startAnimation();
    }

    // === About Panel (Sun Click) ===
    const aboutPanel = document.getElementById('about-panel');

    function showAboutPanel() {
        // Fill content
        aboutPanel.querySelector('.about-name').textContent = portfolioData.center.name;
        aboutPanel.querySelector('.about-title').textContent = portfolioData.center.subtitle;
        aboutPanel.querySelector('.about-bio').textContent = portfolioData.center.bio;

        aboutPanel.classList.add('visible');

        gsap.fromTo(aboutPanel,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.3)' }
        );
    }

    function hideAboutPanel() {
        gsap.to(aboutPanel, {
            opacity: 0, scale: 0.9, duration: 0.25, ease: 'power2.in',
            onComplete: () => aboutPanel.classList.remove('visible')
        });
    }

    // === Show Item Detail ===
    function showItemDetail(item, category) {
        // If item has a link, open it directly
        if (item.link && (category.id === 'contact' || category.id === 'github')) {
            window.open(item.link, '_blank');
        }

        const panel = detailPanel;
        const catEl = panel.querySelector('.panel-category');
        catEl.textContent = category.label;
        catEl.className = 'panel-category ' + category.id;

        panel.querySelector('.panel-title').textContent = item.title;
        panel.querySelector('.panel-date').textContent = `${item.subtitle} • ${item.date}`;
        
        // Support both string and array descriptions
        const descEl = panel.querySelector('.panel-description');
        if (Array.isArray(item.description)) {
            descEl.innerHTML = '<ul style="padding-left:1.2rem;margin:0;">' + 
                item.description.map(d => `<li style="margin-bottom:0.4rem;">${d}</li>`).join('') + 
                '</ul>';
        } else {
            descEl.textContent = item.description;
        }

        const tagsContainer = panel.querySelector('.panel-tags');
        let tagsHtml = item.tags.map(tag => `<span class="panel-tag">${tag}</span>`).join('');
        
        // Add link button if available
        if (item.link) {
            tagsHtml += `<a href="${item.link}" target="_blank" rel="noopener" class="panel-tag" style="color: ${category.color}; border-color: ${category.color}40; text-decoration: none;">Open ↗</a>`;
        }
        tagsContainer.innerHTML = tagsHtml;

        panel.classList.remove('hidden');
        panel.classList.add('visible');

        // Kill any ongoing panel animations first
        gsap.killTweensOf(panel);
        gsap.killTweensOf('#panel-content > *');
        panel.removeAttribute('style');

        gsap.fromTo(panel,
            { opacity: 0, x: 25 },
            { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }
        );
        gsap.fromTo('#panel-content > *',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, stagger: 0.05, duration: 0.3, delay: 0.1, ease: 'power2.out' }
        );
    }

    // === Hide Panel ===
    function hidePanel() {
        // Force clear all inline styles GSAP may have set
        gsap.killTweensOf(detailPanel);
        gsap.killTweensOf('#panel-content > *');
        detailPanel.classList.add('hidden');
        detailPanel.classList.remove('visible');
        detailPanel.removeAttribute('style');
    }

    // === Events ===
    function setupEvents() {
        backBtn.addEventListener('click', () => {
            stopAnimation();
            if (window.playBack) window.playBack();
            // If we're in timeline view, hide it and go back to root
            if (TIMELINE_CATEGORIES.includes(currentLevel)) {
                gsap.to(timelineContainer, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        hideTimeline();
                        gsap.set(timelineContainer, { opacity: 1 });
                        renderRoot();
                    }
                });
            } else if (CONSTELLATION_CATEGORIES.includes(currentLevel)) {
                gsap.to(svg.children, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: renderRoot
                });
            } else {
                gsap.to(svg.children, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: renderRoot
                });
            }
        });

        panelClose.addEventListener('click', () => {
            gsap.killTweensOf(detailPanel);
            gsap.killTweensOf('#panel-content > *');
            detailPanel.classList.add('hidden');
            detailPanel.classList.remove('visible');
            detailPanel.removeAttribute('style');
            svg.querySelectorAll('.moon-node .moon-body').forEach(c => {
                c.setAttribute('stroke-opacity', '0.5');
                c.setAttribute('stroke-width', '1.5');
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (aboutPanel.classList.contains('visible')) hideAboutPanel();
                else if (detailPanel.classList.contains('visible')) panelClose.click();
                else if (currentLevel !== 'root') backBtn.click();
            }
            if (e.key === ' ') {
                e.preventDefault();
                if (isPaused) { isPaused = false; startAnimation(); }
                else { isPaused = true; }
            }
        });

        // About panel close
        aboutPanel.querySelector('.about-close').addEventListener('click', hideAboutPanel);
    }

    // === Helpers ===
    function createSVG(tag, attrs = {}) {
        const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        Object.entries(attrs).forEach(([key, val]) => el.setAttribute(key, val));
        return el;
    }

    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
