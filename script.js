document.addEventListener('DOMContentLoaded', () => {
    initTerminalReveal();
    initHeroMetrics();
    initTypingEffect();
    initSmoothScroll();
});

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
