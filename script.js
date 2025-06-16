// Bubble creation and management
class BubbleManager {
    constructor() {
        this.body = document.body;
        this.bubbles = [];
        this.init();
    }

    init() {
        // Create initial burst of bubbles
        this.createInitialBubbles();
        
        // Create different types of bubbles at intervals (increased intervals for slower creation)
        setInterval(() => this.createLargeBubble(), 2000); // was 1200
        setInterval(() => this.createSmallBubble(), 1000); // was 600
        
        // Add top-to-bottom flowing bubbles (increased intervals)
        setInterval(() => this.createTopFlowingBubble(), 1500); // was 900
        setInterval(() => this.createTopSmallBubble(), 750); // was 450
        
        // Clean up bubbles periodically
        setInterval(() => this.cleanupBubbles(), 1000);
        
        // Add dynamic CSS animations for new bubble types
        this.addCustomAnimations();
    }

    createInitialBubbles() {
        // Create a burst of bubbles immediately when page loads
        for (let i = 0; i < 12; i++) {
            setTimeout(() => this.createLargeBubble(), i * 150);
        }
        for (let i = 0; i < 15; i++) {
            setTimeout(() => this.createSmallBubble(), i * 80);
        }
        // Add some top-flowing bubbles to initial burst
        for (let i = 0; i < 8; i++) {
            setTimeout(() => this.createTopFlowingBubble(), i * 200);
        }
    }

    createLargeBubble() {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        
        // Randomly choose between pink and green for large bubbles
        const isPink = Math.random() > 0.5;
        bubble.classList.add(isPink ? "large-pink" : "large-green");
        
        // Large bubble size (100-250px)
        const size = 100 + Math.random() * 150;
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";
        
        // Random horizontal position
        bubble.style.left = Math.random() * (window.innerWidth - size) + "px";
        bubble.style.bottom = "-300px";
        
        // Add random animation delay for natural effect (increased delay range)
        const delay = Math.random() * 4; // was 2
        bubble.style.animationDelay = delay + "s";
        
        this.body.appendChild(bubble);
        this.bubbles.push({
            element: bubble,
            type: 'large',
            direction: 'up',
            createdAt: Date.now()
        });
    }

    createSmallBubble() {
        const bubble = document.createElement("div");
        bubble.className = "bubble small-orange";
        
        // Small bubble size (30-80px)
        const size = 30 + Math.random() * 50;
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";
        
        // Random starting position for diagonal movement
        bubble.style.left = -100 + Math.random() * 200 + "px";
        bubble.style.bottom = "-150px";
        
        // Add random animation delay (increased)
        const delay = Math.random() * 3; // was 1.5
        bubble.style.animationDelay = delay + "s";
        
        this.body.appendChild(bubble);
        this.bubbles.push({
            element: bubble,
            type: 'small',
            direction: 'up',
            createdAt: Date.now()
        });
    }

    createTopFlowingBubble() {
        const bubble = document.createElement("div");
        bubble.className = "bubble top-flowing";
        
        // Randomly choose colors for top-flowing bubbles
        const colors = ['large-pink', 'large-green'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        bubble.classList.add(randomColor);
        
        // Medium to large bubble size (70-180px)
        const size = 70 + Math.random() * 110;
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";
        
        // Random horizontal position
        bubble.style.left = Math.random() * (window.innerWidth - size) + "px";
        bubble.style.top = "-300px";
        bubble.style.bottom = "auto";
        
        // Add custom animation for top-to-bottom flow (adjustable speed)
        const duration = 8 + Math.random() * 4; // 8-12 seconds (faster than before)
        bubble.style.animation = `floatDown ${duration}s linear forwards`;
        
        this.body.appendChild(bubble);
        this.bubbles.push({
            element: bubble,
            type: 'top-large',
            direction: 'down',
            createdAt: Date.now()
        });
    }

    createTopSmallBubble() {
        const bubble = document.createElement("div");
        bubble.className = "bubble small-orange top-flowing";
        
        // Small bubble size (25-70px)
        const size = 25 + Math.random() * 45;
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";
        
        // Random starting position
        bubble.style.left = Math.random() * (window.innerWidth - size) + "px";
        bubble.style.top = "-200px";
        bubble.style.bottom = "auto";
        
        // Add custom animation for top-to-bottom flow (adjustable speed)
        const duration = 6 + Math.random() * 3; // 6-9 seconds (faster than before)
        bubble.style.animation = `floatDownSmall ${duration}s linear forwards`;
        
        this.body.appendChild(bubble);
        this.bubbles.push({
            element: bubble,
            type: 'top-small',
            direction: 'down',
            createdAt: Date.now()
        });
    }

    addCustomAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatDown {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                    opacity: 0.7;
                }
                25% {
                    opacity: 0.8;
                    transform: translateY(25vh) translateX(30px) rotate(90deg);
                }
                50% {
                    transform: translateY(50vh) translateX(-20px) rotate(180deg);
                }
                75% {
                    transform: translateY(75vh) translateX(25px) rotate(270deg);
                }
                100% {
                    transform: translateY(110vh) translateX(0px) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes floatDownSmall {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                    opacity: 0.8;
                }
                30% {
                    opacity: 0.9;
                    transform: translateY(30vh) translateX(-20px) rotate(120deg);
                }
                60% {
                    transform: translateY(60vh) translateX(35px) rotate(240deg);
                }
                100% {
                    transform: translateY(110vh) translateX(-10px) rotate(360deg);
                    opacity: 0;
                }
            }
            
            .bubble.top-flowing {
                position: fixed;
                z-index: -1;
            }
        `;
        document.head.appendChild(style);
    }

    cleanupBubbles() {
        const now = Date.now();
        this.bubbles = this.bubbles.filter(bubble => {
            const age = now - bubble.createdAt;
            let maxAge;
            
            // Significantly increased bubble lifespans
            switch(bubble.type) {
                case 'large':
                    maxAge = 25000; // was 8000 (25 seconds)
                    break;
                case 'small':
                    maxAge = 20000; // was 6000 (20 seconds)
                    break;
                case 'top-large':
                    maxAge = 25000; // was 8000 (25 seconds)
                    break;
                case 'top-small':
                    maxAge = 20000; // was 6000 (20 seconds)
                    break;
                default:
                    maxAge = 22000; // was 7000 (22 seconds)
            }
            
            if (age > maxAge || !bubble.element.parentNode) {
                if (bubble.element.parentNode) {
                    bubble.element.parentNode.removeChild(bubble.element);
                }
                return false;
            }
            return true;
        });
    }
}

// Site functionality
class SiteManager {
    constructor() {
        this.init();
    }

    init() {
        this.initTheme();
        this.initNavigation();
        this.initDownloadButtons();
        this.initHeaderScroll();
        this.initFAQ();
        this.initResponsiveness();
    }

    // Theme Toggle Management
    initTheme() {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);

        // Theme toggle function
        window.toggleTheme = () => {
            const body = document.body;
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        };
    }

    // Navigation and smooth scrolling
    initNavigation() {
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Download button functionality
    initDownloadButtons() {
        document.querySelectorAll('.download-button').forEach(button => {
            button.addEventListener('click', function() {
                const platform = this.closest('.download-card').classList[1] || 'unknown';
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Simulate download
                console.log(`Starting download for ${platform}...`);
                // In a real application, this would trigger the actual download
            });
        });
    }

    // Header scroll effect with theme awareness
    initHeaderScroll() {
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            
            if (window.scrollY > 100) {
                if (isDark) {
                    header.style.background = 'rgba(45, 45, 45, 0.95)';
                } else {
                    header.style.background = 'rgba(248, 249, 250, 0.95)';
                }
                header.style.backdropFilter = 'blur(15px)';
            } else {
                header.style.background = '';
                header.style.backdropFilter = '';
            }
        });
    }

    // FAQ Toggle functionality
    initFAQ() {
        window.toggleFAQ = (element) => {
            const answer = element.nextElementSibling;
            const icon = element.querySelector('span:last-child');
            
            if (answer && icon) {
                answer.classList.toggle('active');
                icon.textContent = answer.classList.contains('active') ? '−' : '+';
            }
        };
    }

    // Responsive behavior
    initResponsiveness() {
        // Handle window resize for bubbles
        window.addEventListener('resize', () => {
            const bubbles = document.querySelectorAll('.bubble');
            bubbles.forEach(bubble => {
                const currentLeft = parseInt(bubble.style.left);
                const bubbleWidth = parseInt(bubble.style.width);
                if (currentLeft + bubbleWidth > window.innerWidth) {
                    bubble.style.left = Math.max(0, window.innerWidth - bubbleWidth) + "px";
                }
            });
        });
    }
}

// Enhanced bubble interactions
class BubbleInteractions {
    constructor() {
        this.init();
    }

    init() {
        // Subtle collision detection (less aggressive)
        setInterval(() => this.detectCollisions(), 100);
        
        // Mouse interaction with bubbles
        this.initMouseInteraction();
    }

    detectCollisions() {
        const allBubbles = document.querySelectorAll('.bubble');
        
        for (let i = 0; i < allBubbles.length; i++) {
            for (let j = i + 1; j < allBubbles.length; j++) {
                const bubble1 = allBubbles[i];
                const bubble2 = allBubbles[j];
                
                const rect1 = bubble1.getBoundingClientRect();
                const rect2 = bubble2.getBoundingClientRect();
                
                const distance = Math.sqrt(
                    Math.pow(rect1.left + rect1.width/2 - rect2.left - rect2.width/2, 2) + 
                    Math.pow(rect1.top + rect1.height/2 - rect2.top - rect2.height/2, 2)
                );
                
                const minDistance = (rect1.width + rect2.width) / 2;
                
                if (distance < minDistance * 0.7) {
                    // Gentle collision effect
                    bubble1.style.filter = 'brightness(1.2)';
                    bubble2.style.filter = 'brightness(1.2)';
                    
                    setTimeout(() => {
                        bubble1.style.filter = '';
                        bubble2.style.filter = '';
                    }, 300);
                }
            }
        }
    }

    initMouseInteraction() {
        document.addEventListener('mousemove', (e) => {
            const bubbles = document.querySelectorAll('.bubble');
            
            bubbles.forEach(bubble => {
                const rect = bubble.getBoundingClientRect();
                const bubbleCenterX = rect.left + rect.width / 2;
                const bubbleCenterY = rect.top + rect.height / 2;
                
                const distance = Math.sqrt(
                    Math.pow(e.clientX - bubbleCenterX, 2) + 
                    Math.pow(e.clientY - bubbleCenterY, 2)
                );
                
                // If mouse is near bubble (within 100px), add subtle glow
                if (distance < 100) {
                    const intensity = 1 - (distance / 100);
                    bubble.style.filter = `brightness(${1 + intensity * 0.3}) drop-shadow(0 0 ${intensity * 10}px rgba(255, 255, 255, 0.3))`;
                } else {
                    bubble.style.filter = '';
                }
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    new BubbleManager();
    new SiteManager();
    new BubbleInteractions();
    
    // Add some loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    const bubbles = document.querySelectorAll('.bubble');
    
    if (document.hidden) {
        bubbles.forEach(bubble => {
            bubble.style.animationPlayState = 'paused';
        });
    } else {
        bubbles.forEach(bubble => {
            bubble.style.animationPlayState = 'running';
        });
    }
});
