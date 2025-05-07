document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    // Unobserve after animation is triggered once
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        animatedElements.forEach(element => {
            element.classList.add('aos-animate');
        });
    }
    
    // Apply staggered delay to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Apply staggered delay to team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Apply staggered delay to project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Parallax scroll effect for hero section
    const heroSection = document.querySelector('.section-home');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            let scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }
    
    // Animate counter numbers
    function animateCounter(element, target, duration) {
        let start = 0;
        const step = timestamp => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            element.textContent = Math.floor(progress * target);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = target;
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Apply counter animations to numerical stats if they exist
    const counterElements = document.querySelectorAll('.counter');
    if (counterElements.length > 0 && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target, 2000);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counterElements.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Animate skill bars if they exist
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length > 0 && 'IntersectionObserver' in window) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    const targetWidth = entry.target.getAttribute('data-progress');
                    setTimeout(() => {
                        progressBar.style.width = `${targetWidth}%`;
                    }, 200);
                    skillObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillBars.forEach(skill => {
            skillObserver.observe(skill);
        });
    }
    
    // Tilt effect for cards on mouse hover
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `perspective(1000px) rotateX(${deltaY * -5}deg) rotateY(${deltaX * 5}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // Typed.js effect for hero headline if it exists
    const typedElement = document.querySelector('.typed-text');
    if (typedElement && typeof Typed === 'function') {
        new Typed(typedElement, {
            strings: [
                'Precision Mechanics.',
                'Honest Service.',
                'Expert Diagnostics.',
                'Performance Tuning.'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            startDelay: 500,
            loop: true
        });
    }
});
