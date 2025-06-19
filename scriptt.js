// JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            body.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Language Selection
    const languageSelect = document.getElementById('languageSelect');
    
    // Translations object (simplified example)
    const translations = {
        en: {
            heroTitle: 'Download Anything, Anywhere',
            heroSubtitle: 'Professional-grade downloader with advanced features, privacy protection, and multi-format support',
            downloadFree: 'Download Free',
            watchDemo: 'Watch Demo',
            powerfulFeatures: 'Powerful Features',
            smartHome: 'Smart Home Tab',
            webBrowser: 'Built-in Web Browser',
            privacyProtected: 'Privacy Protected',
            formatConverter: 'Format Converter',
            multilingual: 'Multilingual Support',
            themes: 'Dark & Light Themes'
        },
        fr: {
            heroTitle: 'Téléchargez Tout, Partout',
            heroSubtitle: 'Téléchargeur professionnel avec fonctionnalités avancées, protection de la vie privée et support multi-format',
            downloadFree: 'Télécharger Gratuit',
            watchDemo: 'Voir la Démo',
            powerfulFeatures: 'Fonctionnalités Puissantes',
            smartHome: 'Onglet Accueil Intelligent',
            webBrowser: 'Navigateur Web Intégré',
            privacyProtected: 'Confidentialité Protégée',
            formatConverter: 'Convertisseur de Format',
            multilingual: 'Support Multilingue',
            themes: 'Thèmes Sombre et Clair'
        },
        es: {
            heroTitle: 'Descarga Todo, En Cualquier Lugar',
            heroSubtitle: 'Descargador de grado profesional con características avanzadas, protección de privacidad y soporte multiformato',
            downloadFree: 'Descargar Gratis',
            watchDemo: 'Ver Demo',
            powerfulFeatures: 'Características Poderosas',
            smartHome: 'Pestaña de Inicio Inteligente',
            webBrowser: 'Navegador Web Integrado',
            privacyProtected: 'Privacidad Protegida',
            formatConverter: 'Convertidor de Formato',
            multilingual: 'Soporte Multiidioma',
            themes: 'Temas Oscuro y Claro'
        }
    };
    
    languageSelect.addEventListener('change', function() {
        const selectedLang = this.value;
        updateLanguage(selectedLang);
    });
    
    function updateLanguage(lang) {
        if (translations[lang]) {
            const elements = document.querySelectorAll('[data-translate]');
            elements.forEach(element => {
                const key = element.getAttribute('data-translate');
                if (translations[lang][key]) {
                    element.textContent = translations[lang][key];
                }
            });
        }
    }
    
    // Interface Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab + '-tab').classList.add('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
    
    // Download button interactions
    const downloadButtons = document.querySelectorAll('.download-btn, .btn-primary');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Simulate download start
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Ready!';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-download"></i> Download';
                    this.disabled = false;
                }, 2000);
            }, 3000);
        });
    });
    
    // Video card interactions
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        const playButton = card.querySelector('.btn-icon:nth-child(3)');
        const shareButton = card.querySelector('.btn-icon:nth-child(2)');
        const downloadButton = card.querySelector('.download-btn');
        
        if (playButton) {
            playButton.addEventListener('click', function() {
                // Simulate video play
                const thumbnail = card.querySelector('.thumbnail-placeholder i');
                if (thumbnail) {
                    thumbnail.className = 'fas fa-pause';
                    setTimeout(() => {
                        thumbnail.className = 'fas fa-play';
                    }, 3000);
                }
            });
        }
        
        if (shareButton) {
            shareButton.addEventListener('click', function() {
                // Simulate share functionality
                if (navigator.share) {
                    navigator.share({
                        title: 'Check out this video',
                        url: window.location.href
                    });
                } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        this.innerHTML = '<i class="fas fa-check"></i>';
                        setTimeout(() => {
                            this.innerHTML = '<i class="fas fa-share"></i>';
                        }, 2000);
                    });
                }
            });
        }
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-btn');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                // Simulate search
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = 'Search';
                    this.disabled = false;
                    // Here you would normally update the results
                }, 2000);
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
    
    // Browser controls simulation
    const browserControls = document.querySelectorAll('.browser-controls button');
    browserControls.forEach(button => {
        button.addEventListener('click', function() {
            // Simulate browser action
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Feature buttons in browser
    const featureButtons = document.querySelectorAll('.feature-btn');
    featureButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Add background blur when scrolled
        if (scrollTop > 50) {
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.background = navbar.getAttribute('data-theme') === 'dark' 
                ? 'rgba(17, 24, 39, 0.9)' 
                : 'rgba(255, 255, 255, 0.9)';
        } else {
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.background = navbar.getAttribute('data-theme') === 'dark' 
                ? 'rgba(17, 24, 39, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
        }
    });
    
    // Progress animation for downloads
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe feature cards for staggered animation
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
    
    // Mobile menu toggle (if you want to add mobile menu later)
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav-menu');
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-toggle';
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-active');
            const icon = mobileToggle.querySelector('i');
            icon.className = nav.classList.contains('mobile-active') 
                ? 'fas fa-times' 
                : 'fas fa-bars';
        });
        
        document.querySelector('.nav-container').appendChild(mobileToggle);
    };
    
    // Initialize mobile menu on smaller screens
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-toggle')) {
            createMobileMenu();
        }
    });
    
    console.log('4All-Downloader website initialized successfully!');
});
