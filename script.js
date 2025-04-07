window.onload = function () {
    // Show preloader for 3 seconds then reveal main content
    setTimeout(function () {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("main-content").style.display = "block";
        // Initialize slider immediately after content is visible
        initializeSlider();
    }, 3000);
};

// Improved slider functionality with better responsiveness
function initializeSlider() {
    let slideIndex = 1;
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!slider || slides.length === 0) return;

    // Clone first and last slides for infinite loop effect
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    const allSlides = document.querySelectorAll('.slide');
    let slideWidth;
    let autoSlideInterval;

    function updateSlideWidth() {
        // Get container width rather than slide width for more reliable sizing
        const container = document.querySelector('.slider-container');
        slideWidth = container ? container.clientWidth : document.querySelector('.slide').clientWidth;
        
        // Update slider position
        slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
        
        // Ensure each slide has the correct width
        allSlides.forEach(slide => {
            slide.style.minWidth = `${slideWidth}px`;
        });
    }

    // Update slide width on window resize with debounce
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            updateSlideWidth();
        }, 250);
    });

    // Initialize slider position and active slide
    updateSlideWidth();
    allSlides[slideIndex].classList.add('active');

    function moveSlide(index) {
        // Ensure index is within correct range
        if (index < 0) index = 0;
        if (index >= dots.length) index = dots.length - 1;
        
        slideIndex = index + 1; // +1 because of the cloned slide at beginning
        updateSlider();
        resetAutoSlide();
    }

    function updateSlider() {
        slider.style.transition = 'transform 0.5s ease-in-out';
        slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;

        // Handle active slide visuals
        allSlides.forEach(slide => slide.classList.remove('active'));
        const currentSlide = allSlides[slideIndex];
        if (currentSlide) currentSlide.classList.add('active');

        // Handle looping back to beginning/end
        setTimeout(() => {
            if (slideIndex >= allSlides.length - 1) {
                slider.style.transition = 'none';
                slideIndex = 1;
                slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
                allSlides[slideIndex].classList.add('active');
            } else if (slideIndex <= 0) {
                slider.style.transition = 'none';
                slideIndex = allSlides.length - 2;
                slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
                allSlides[slideIndex].classList.add('active');
            }
            updateDots();
        }, 500);
    }

    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        let activeIndex = slideIndex - 1;
        if (activeIndex >= dots.length) activeIndex = 0;
        if (activeIndex < 0) activeIndex = dots.length - 1;
        dots[activeIndex].classList.add('active');
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            slideIndex++;
            updateSlider();
        }, 5000); // Increased to 5 seconds for better UX
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Initialize the dots
    updateDots();
    
    // Start auto sliding
    startAutoSlide();

    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoSlideInterval); // Pause auto-sliding during touch
    }, { passive: true });
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        resetAutoSlide(); // Resume auto-sliding after touch
    }, { passive: true });
    
    function handleSwipe() {
        const diffX = touchStartX - touchEndX;
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
            if (diffX > 0) {
                // Swipe left
                slideIndex++;
            } else {
                // Swipe right
                slideIndex--;
            }
            updateSlider();
        }
    }
}

// Modal functions with improved UX
function showServiceModal(serviceName) {
    document.getElementById("selectedService").innerText = serviceName;
    document.getElementById("serviceModal").style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function showContactModal() {
    document.getElementById("serviceModal").style.display = "none";
    document.getElementById("contactModal").style.display = "block";
}

function callUs() {
    window.location.href = "tel:+919908642393";
}

function whatsappUs() {
    // Format message for better readability on WhatsApp
    const message = "Hello, I'm interested in your services!";
    window.location.href = `https://wa.me/919908642393?text=${encodeURIComponent(message)}`;
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
}

// Smooth scrolling with better mobile support
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId) || document.querySelector(`.${sectionId}`);
    if (section) {
        // Calculate offset for header height
        const headerHeight = document.querySelector('header').offsetHeight;
        const mobileNavHeight = document.querySelector('.mobile-nav')?.offsetHeight || 0;
        
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = sectionTop - headerHeight - 10; // Additional 10px buffer
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Close any mobile menu if it exists
        const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuButton && mobileMenuButton.classList.contains('active')) {
            mobileMenuButton.click();
        }
    }
}

// Initialize lightbox and other interactive elements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Lightbox functionality
    initializeLightbox();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Make sure navigation works on mobile
    initializeMobileNav();
    
    // Enhance form submission
    initializeFormHandling();
});

function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
    
    if (!lightbox || !lightboxImg || !lightboxTriggers.length) return;
    
    lightboxTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (!img) return;
            
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            lightboxCaption.innerHTML = img.alt;
            document.body.style.overflow = "hidden"; // Prevent background scrolling
        });
    });
    
    if (closeLightbox) {
        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = "auto"; // Re-enable scrolling
        });
    }
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = "auto"; // Re-enable scrolling
        }
    });
}

function initializeScrollAnimations() {
    const elements = document.querySelectorAll('section, .container, .container-a, .container-b, .container-c, .footer-section');
    
    function handleScrollAnimations() {
        const windowHeight = window.innerHeight;
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150; // Show when element is 150px from viewport bottom
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
                element.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    }
    
    // Initialize element styles
    elements.forEach(element => {
        if (!element.classList.contains('visible')) {
            element.style.opacity = "0";
            element.style.transform = "translateY(20px)";
        }
    });
    
    // Check elements on load
    handleScrollAnimations();
    
    // Check elements on scroll with throttling for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                handleScrollAnimations();
                scrollTimeout = null;
            }, 100);
        }
    });
}

function initializeMobileNav() {
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    
    if (!mobileNav) return;
    
    // Make mobile nav fixed at bottom
    mobileNav.style.position = 'fixed';
    mobileNav.style.bottom = '0';
    mobileNav.style.width = '100%';
    mobileNav.style.zIndex = '999';
    
    // Handle clicks on mobile nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Already handled in scrollToSection
        });
    });
}

function initializeFormHandling() {
    const form = document.getElementById('quoteForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
        submitQuote(event);
    });
}

function submitQuote(event) {
    event.preventDefault();
    const form = document.getElementById('quoteForm');
    
    if (!form) return;
    
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('message')
    };
    
    // Validate data
    if (!data.name || !data.email || !data.phone || !data.service) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Format message for WhatsApp
    const whatsappMessage = `New Enquiry from Website:%0AName: ${data.name}%0APhone: ${data.phone}%0AEmail: ${data.email}%0AService Required: ${data.service}%0AMessage: ${data.message}`;
    
    // Show success message
    alert(`Thank you, ${data.name}! Your quote request has been submitted.`);
    
    // Send to WhatsApp
    window.location.href = `https://wa.me/919908642393?text=${whatsappMessage}`;
    
    // Reset form
    form.reset();
}

// Add a class to show active nav link based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section, .slider-container, .container-b, .container-c, .contact-us-section');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id') || 
                             (section.classList.contains('slider-container') ? 'home' : 
                             (section.classList.contains('container-b') ? 'services' : 
                             (section.classList.contains('container-c') ? 'portfolio' : 
                             (section.classList.contains('contact-us-section') ? 'contact' : ''))));
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Make sure the page starts at the top when refreshed
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};