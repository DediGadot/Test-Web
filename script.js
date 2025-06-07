// Public Key Group LTD - JavaScript Functionality

// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active navigation link
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Counter animation for hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                
                // Format the number based on the target
                if (target === 99.99) {
                    counter.textContent = current.toFixed(2);
                } else if (target === 500) {
                    counter.textContent = Math.floor(current);
                } else {
                    counter.textContent = Math.floor(current);
                }
                
                setTimeout(updateCounter, 50);
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .benefit, .security-dashboard, .hero-stats, .contact-method');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const company = formData.get('company');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('[ERROR] Missing required data fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('[ERROR] Invalid email format detected.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '> ENCRYPTING... <span class="btn-arrow">⟳</span>';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('[SUCCESS] Encrypted transmission complete. Expect secure contact within 24 hours.', 'success');
                contactForm.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '⚠' : 'ℹ'}
            </span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 255, 136, 0.1)' : type === 'error' ? 'rgba(255, 100, 100, 0.1)' : 'rgba(0, 245, 255, 0.1)'};
        border: 1px solid ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff6464' : '#00f5ff'};
        border-radius: 12px;
        padding: 15px 20px;
        color: white;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        max-width: 350px;
        z-index: 10000;
        backdrop-filter: blur(20px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to the document
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-icon {
        font-weight: bold;
        font-size: 16px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.2s ease;
        margin-left: auto;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Floating particles enhancement
function createFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 245, 255, 0.6);
            border-radius: 50%;
            animation: floatRandom ${5 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add floating particles animation
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes floatRandom {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(180deg);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(particleStyles);

// Initialize floating particles on load
document.addEventListener('DOMContentLoaded', createFloatingParticles);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Close any notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notif => notif.remove());
    }
});

// Performance optimization - lazy loading for heavy elements
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load heavy animations
    const lazyElements = document.querySelectorAll('.service-card, .security-dashboard');
    
    const lazyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                lazyObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px 0px'
    });
    
    lazyElements.forEach(el => {
        lazyObserver.observe(el);
    });
});

// Console easter egg for developers
console.log(`
₿ PUBLIC KEY GROUP LTD - UNDERGROUND TERMINAL
============================================

[CLASSIFIED] Interested in our code? We need elite hackers!
Security protocols:
- Zero-knowledge architecture
- Air-gapped development
- Quantum-resistant encryption
- No logs, no traces

Contact: secure@publickeygroup.com [PGP REQUIRED]

Remember: Don't trust, verify. Stay paranoid. ₿
`);

// Add some console styling
console.log('%c₿ UNDERGROUND CONNECTION ESTABLISHED', 'color: #d4af37; font-weight: bold; font-size: 16px;');
console.log('%cPublic Key Group LTD - Your Bitcoin security specialists', 'color: #b8860b; font-size: 12px;'); 