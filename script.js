document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    // Cookie Banner
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookies = document.getElementById('acceptCookies');
    const declineCookies = document.getElementById('declineCookies');
    
    // Check if user has already made a cookie choice
    if (!localStorage.getItem('cookieChoice')) {
        cookieBanner.style.display = 'block';
    }
    
    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookieChoice', 'accepted');
        cookieBanner.style.display = 'none';
    });
    
    declineCookies.addEventListener('click', function() {
        localStorage.setItem('cookieChoice', 'declined');
        cookieBanner.style.display = 'none';
    });
    
    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavContent = document.querySelector('.mobile-nav-content');
    
    // Clone desktop menu for mobile
    const navLinks = document.querySelector('.nav-links').cloneNode(true);
    const loginBtn = document.querySelector('.login-btn').cloneNode(true);
    
    // Clear existing content before appending
    mobileNavContent.innerHTML = '';
    mobileNavContent.appendChild(navLinks);
    mobileNavContent.appendChild(loginBtn);
    
    mobileMenuBtn.addEventListener('click', function() {
        if (mobileNav.style.display === 'block') {
            mobileNav.style.display = 'none';
        } else {
            mobileNav.style.display = 'block';
        }
    });
    
    // Handle mobile dropdowns
    const mobileDropdowns = mobileNav.querySelectorAll('.dropdown');
    mobileDropdowns.forEach(dropdown => {
        const dropBtn = dropdown.querySelector('.dropbtn');
        dropBtn.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    });
    
    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(timer);
                    // Format with appropriate decimal places for numbers like 99.9
                    if (target % 1 !== 0) {
                        stat.textContent = target.toFixed(1);
                    } else {
                        stat.textContent = target.toLocaleString();
                    }
                } else {
                    if (target % 1 !== 0) {
                        stat.textContent = current.toFixed(1);
                    } else {
                        stat.textContent = Math.floor(current).toLocaleString();
                    }
                }
            }, 16);
        });
    }
    
    // Trigger animation when stats section is in view
    const statsSection = document.querySelector('.stats-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when at least 10% of the element is visible
    });
    
    observer.observe(statsSection);
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.textContent = 'Sending...';
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = 'Send';
            }, 1500);
        });
    }
});
