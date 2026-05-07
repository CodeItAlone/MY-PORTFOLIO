document.addEventListener('DOMContentLoaded', () => {
    initTerminalReveal();
    initHeroMetrics();
    initTypingEffect();
    initSmoothScroll();
    init3DGestures();
    initCustomCursor();
    initSystemHUD();
});

/**
 * 3D Interactive Gestures
 * Tracks mouse position to rotate elements and update dynamic effects
 */
function init3DGestures() {
    const heroMetrics = document.getElementById('hero-metrics');
    const projectCards = document.querySelectorAll('.project-card');

    // Track mouse for Hero Metrics
    if (heroMetrics) {
        window.addEventListener('mousemove', (e) => {
            const rect = heroMetrics.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update mouse position CSS variables for radial gradient
            heroMetrics.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            heroMetrics.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

            // Calculate rotation (subtle)
            const rotateX = (y / rect.height - 0.5) * -10; // Max 5deg
            const rotateY = (x / rect.width - 0.5) * 10;

            heroMetrics.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        heroMetrics.addEventListener('mouseleave', () => {
            heroMetrics.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    }

    // Track mouse for Project Cards
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = (y / rect.height - 0.5) * -15; // Max 7.5deg
            const rotateY = (x / rect.width - 0.5) * 15;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Apply slight translate to child elements for parallax
            const children = card.querySelectorAll('.project-title, .project-desc, .project-tags');
            children.forEach(child => {
                const depth = child.classList.contains('project-title') ? 5 : 2;
                const tx = (x / rect.width - 0.5) * depth;
                const ty = (y / rect.height - 0.5) * depth;
                child.style.transform = `translateZ(${depth * 10}px) translateX(${tx}px) translateY(${ty}px)`;
            });
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg)`;
            const children = card.querySelectorAll('.project-title, .project-desc, .project-tags');
            children.forEach(child => {
                const depth = child.classList.contains('project-title') ? 50 : 20;
                child.style.transform = `translateZ(${depth}px) translateX(0) translateY(0)`;
            });
        });
    });
}

/**
 * Custom Terminal Cursor
 */
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;

    window.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`;
    });

    // Add active state on hoverable elements
    const hoverables = document.querySelectorAll('a, button, .project-card, .btn');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
}

/**
 * System HUD Status Tracker
 */
function initSystemHUD() {
    const currentDir = document.getElementById('current-dir');
    const scrollProgress = document.getElementById('scroll-progress');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Calculate scroll percentage
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = Math.round((winScroll / height) * 100);
        if (scrollProgress) scrollProgress.textContent = `${scrolled}%`;

        // Update current directory (active section)
        let current = 'ROOT';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id').toUpperCase();
            }
        });
        if (currentDir) currentDir.textContent = current;
    });
}

/**
 * Terminal Reveal Effect
 * Uses Intersection Observer to trigger staggered entrance animations
 */
function initTerminalReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('terminal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to observe
    const revealElements = document.querySelectorAll('.project-card, .skill-category, .about-text, .about-visual, .roadmap-item, .contact-grid');
    
    revealElements.forEach((el, index) => {
        el.classList.add('terminal-hidden');
        // Add staggered delay via inline style
        el.style.transitionDelay = `${(index % 3) * 100}ms`;
        observer.observe(el);
    });
}

/**
 * Hero Metrics Engine
 * Simulates live system activity in the background
 */
function initHeroMetrics() {
    const metricsContainer = document.getElementById('hero-metrics');
    if (!metricsContainer) return;

    const logs = [
        '[SYSTEM: KERNEL_LOADED]',
        '[USER: SUBRATO_KUNDU]',
        '[IP: 127.0.0.1]',
        '[MEM: 16GB_READY]',
        '[STK: JAVA/SPRING_BOOT]',
        '[DEV: FULL_STACK_ASPIRANT]',
        '[LOG: PROJECT_DEPLOYED]',
        '[ERR: NONE]',
        '[PING: 15ms]',
        '[ARCH: x64_SYSTEM]',
        '[SEC: ENCRYPTED]',
        '[DB: SQL_CONNECTED]'
    ];

    setInterval(() => {
        const line = document.createElement('div');
        line.className = 'metric-line mono text-muted';
        line.textContent = logs[Math.floor(Math.random() * logs.length)];
        
        metricsContainer.appendChild(line);
        
        // Remove old lines to keep container clean
        if (metricsContainer.children.length > 8) {
            metricsContainer.removeChild(metricsContainer.children[0]);
        }
        
        // Auto-scroll or just let it stack
    }, 2000);
}

/**
 * Simple Typing Effect for Subtitle
 */
function initTypingEffect() {
    const textEl = document.querySelector('.typing-text');
    if (!textEl) return;

    const text = textEl.textContent;
    textEl.textContent = '';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            textEl.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    
    type();
}

/**
 * Smooth Scrolling with Offset
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
