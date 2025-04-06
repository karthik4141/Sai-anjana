window.onload = function () {
    setTimeout(function () {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("main-content").style.display = "block";
    }, 3000);
};

let slideIndex = 1;
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

const allSlides = document.querySelectorAll('.slide');
let slideWidth;

function updateSlideWidth() {
    slideWidth = document.querySelector('.slide').clientWidth;
    slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
}

window.addEventListener('resize', updateSlideWidth);
updateSlideWidth();

slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
allSlides[slideIndex].classList.add('active');

function moveSlide(index) {
    slideIndex = index;
    updateSlider();
}

function updateSlider() {
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;

    allSlides.forEach(slide => slide.classList.remove('active'));
    const currentSlide = allSlides[slideIndex];
    if (currentSlide) currentSlide.classList.add('active');

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

setInterval(() => {
    slideIndex++;
    updateSlider();
}, 3000);

updateDots();

function showServiceModal(serviceName) {
    document.getElementById("selectedService").innerText = serviceName;
    document.getElementById("serviceModal").style.display = "block";
}

function showContactModal() {
    document.getElementById("serviceModal").style.display = "none";
    document.getElementById("contactModal").style.display = "block";
}

function callUs() {
    window.location.href = "tel:+919908642393";
}

function whatsappUs() {
    window.location.href = "https://wa.me/919908642393";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId) || document.querySelector(`.${sectionId}`);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
    
    lightboxTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const img = this.querySelector('img');
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            lightboxCaption.innerHTML = img.alt;
        });
    });
    
    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    handleScrollAnimations();
});

function submitQuote(event) {
    event.preventDefault();
    const form = document.getElementById('quoteForm');
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('message')
    };
    
    const whatsappMessage = `New Enquiry from Website:%0AName: ${data.name}%0APhone: ${data.phone}%0AEmail: ${data.email}%0AService Required: ${data.service}%0AMessage: ${data.message}`;
    
    alert(`Thank you, ${data.name}! Your quote request has been submitted.\nDetails:\nService: ${data.service}\nEmail: ${data.email}\nPhone: ${data.phone}\nMessage: ${data.message}`);
    
    window.location.href = `https://wa.me/919908642393?text=${whatsappMessage}`;
    
    form.reset();
}

function handleScrollAnimations() {
    const elements = document.querySelectorAll('section, .container, .container-a, .container-b, .container-c, .footer-section');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 50) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimations);