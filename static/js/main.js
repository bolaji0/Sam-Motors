// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.getElementById('header');
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // Initialize slider
    if (testimonialSlides.length > 0) {
        showSlide(currentSlide);
        
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        });
        
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        });
        
        // Auto-slide every 5 seconds
        setInterval(function() {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Google Map Initialization
    window.initMap = function() {
        // Replace with actual coordinates
        const shopLocation = { lat: 40.7128, lng: -74.0060 };
        
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: shopLocation,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry.fill",
                    "stylers": [{"weight": "2.00"}]
                },
                {
                    "featureType": "all",
                    "elementType": "geometry.stroke",
                    "stylers": [{"color": "#9c9c9c"}]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text",
                    "stylers": [{"visibility": "on"}]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [{"color": "#f2f2f2"}]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#f5f5f5"}]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [{"visibility": "off"}]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [{"saturation": -100}, {"lightness": 45}]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [{"visibility": "simplified"}]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [{"visibility": "off"}]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [{"visibility": "off"}]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [{"color": "#002B5B"}, {"visibility": "on"}]
                }
            ]
        });
        
        // Add a marker
        const marker = new google.maps.Marker({
            position: shopLocation,
            map: map,
            title: 'Sam Motors Ltd',
            animation: google.maps.Animation.DROP,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#FF8C00',
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: '#002B5B'
            }
        });
        
        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="map-info-window">
                    <h3>Sam Motors Ltd</h3>
                    <p>123 Auto Drive, Mechanic City</p>
                    <p>Mon-Fri: 8AM-6PM, Sat: 9AM-4PM</p>
                    <a href="tel:+15551234567">+1-555-123-4567</a>
                </div>
            `
        });
        
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    };
    
    // Callback Modal
    const callbackBtn = document.getElementById('callback-btn');
    const callbackModal = document.getElementById('callback-modal');
    const closeModal = document.querySelector('.close-modal');
    
    callbackBtn.addEventListener('click', function() {
        callbackModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    closeModal.addEventListener('click', function() {
        callbackModal.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === callbackModal) {
            callbackModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Callback Form Submission
    const callbackForm = document.getElementById('callback-form');
    if (callbackForm) {
        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('callback-name').value;
            const phone = document.getElementById('callback-phone').value;
            
            if (!name || !phone) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simple phone validation
            const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            // Here you would normally send the data to the server
            // For demo purposes, we'll just show a success message
            alert('Thank you! We will call you back shortly.');
            callbackModal.classList.remove('show');
            document.body.style.overflow = '';
            callbackForm.reset();
        });
    }
    
    // Cookie Consent
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookies = document.getElementById('accept-cookies');
    
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (!cookiesAccepted) {
        setTimeout(function() {
            cookieConsent.classList.add('show');
        }, 2000);
    }
    
    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.classList.remove('show');
    });
    
    // Flash message auto-hide
    const flashMessages = document.querySelectorAll('.alert');
    const closeAlerts = document.querySelectorAll('.close-alert');
    
    flashMessages.forEach(message => {
        setTimeout(function() {
            message.style.opacity = '0';
            setTimeout(function() {
                message.style.display = 'none';
            }, 300);
        }, 5000);
    });
    
    closeAlerts.forEach(button => {
        button.addEventListener('click', function() {
            const alert = this.parentElement;
            alert.style.opacity = '0';
            setTimeout(function() {
                alert.style.display = 'none';
            }, 300);
        });
    });
    
    // Add Mobile Contact Banner
    if (window.innerWidth <= 768) {
        const mobileContactBanner = document.createElement('div');
        mobileContactBanner.className = 'mobile-contact-banner';
        mobileContactBanner.innerHTML = `
            <a href="tel:+15551234567">
                <i class="fas fa-phone-alt"></i>
                Call Now
            </a>
            <a href="#contact">
                <i class="fas fa-calendar-alt"></i>
                Book Service
            </a>
            <a href="mailto:service@sammotors.com">
                <i class="fas fa-envelope"></i>
                Email Us
            </a>
        `;
        document.body.appendChild(mobileContactBanner);
    }
});
