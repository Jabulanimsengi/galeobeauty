/* ===================================
   GALEO BEAUTY - JAVASCRIPT
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // === Mobile Menu Toggle ===
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a nav link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // === Header Scroll Effect ===
    const header = document.getElementById('header');
    
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // === Active Nav Link on Scroll ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveLink() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // === Back to Top Button ===
    const backToTop = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // === Smooth Scroll for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // === Testimonials Slider (Simple Version) ===
    const testimonialsSlider = document.getElementById('testimonialsSlider');
    const testimonialCards = testimonialsSlider ? testimonialsSlider.querySelectorAll('.testimonial-card') : [];
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('testimonialDots');
    
    let currentSlide = 0;
    
    function createDots() {
        if (!dotsContainer || testimonialCards.length === 0) return;
        
        // Only create dots for mobile view
        const isMobile = window.innerWidth < 1024;
        dotsContainer.innerHTML = '';
        
        if (isMobile) {
            testimonialCards.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                if (index === currentSlide) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }
    }
    
    function updateSlider() {
        if (window.innerWidth < 1024) {
            testimonialCards.forEach((card, index) => {
                card.style.display = index === currentSlide ? 'block' : 'none';
            });
            
            // Update dots
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        } else {
            testimonialCards.forEach(card => {
                card.style.display = 'block';
            });
        }
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        updateSlider();
    }
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Auto-advance slider every 5 seconds on mobile
    let autoSlide;
    function startAutoSlide() {
        if (window.innerWidth < 1024) {
            autoSlide = setInterval(nextSlide, 5000);
        }
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlide);
    }
    
    if (testimonialsSlider) {
        testimonialsSlider.addEventListener('mouseenter', stopAutoSlide);
        testimonialsSlider.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Initialize slider
    createDots();
    updateSlider();
    startAutoSlide();
    
    // Handle resize
    window.addEventListener('resize', function() {
        createDots();
        updateSlider();
        stopAutoSlide();
        startAutoSlide();
    });
    
    // === Contact Form Handling ===
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // === Newsletter Form Handling ===
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            // Simulate subscription
            alert('Thank you for subscribing! You will receive our latest updates.');
            emailInput.value = '';
        });
    }
    
    // === Intersection Observer for Animations ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .why-us-card, .testimonial-card, .stat-item');
    animateElements.forEach(el => observer.observe(el));
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .why-us-card, .testimonial-card, .stat-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate-in, .why-us-card.animate-in, 
        .testimonial-card.animate-in, .stat-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Stagger animation for grid items */
        .service-card:nth-child(1) { transition-delay: 0s; }
        .service-card:nth-child(2) { transition-delay: 0.1s; }
        .service-card:nth-child(3) { transition-delay: 0.2s; }
        .service-card:nth-child(4) { transition-delay: 0.3s; }
        .service-card:nth-child(5) { transition-delay: 0.4s; }
        .service-card:nth-child(6) { transition-delay: 0.5s; }
        
        .why-us-card:nth-child(1) { transition-delay: 0s; }
        .why-us-card:nth-child(2) { transition-delay: 0.15s; }
        .why-us-card:nth-child(3) { transition-delay: 0.3s; }
        .why-us-card:nth-child(4) { transition-delay: 0.45s; }
        
        .stat-item:nth-child(1) { transition-delay: 0s; }
        .stat-item:nth-child(2) { transition-delay: 0.1s; }
        .stat-item:nth-child(3) { transition-delay: 0.2s; }
        .stat-item:nth-child(4) { transition-delay: 0.3s; }
        
        /* Dot styles for testimonial slider */
        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #ccc;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .dot.active {
            background: #D4AF37;
            transform: scale(1.2);
        }
    `;
    document.head.appendChild(style);
    
});
