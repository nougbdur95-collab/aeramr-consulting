document.addEventListener('DOMContentLoaded', function() {

    // --- Header Shadow on Scroll ---
    const header = document.querySelector('.main-header');
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Animate sections on scroll ---
    const sections = document.querySelectorAll('.fade-in-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });


    // --- Slider Logic ---
    const slider = document.querySelector('.slider');
    if (slider) {
        const slides = document.querySelectorAll('.slide');
        const nextBtn = document.querySelector('.next-slide');
        const prevBtn = document.querySelector('.prev-slide');
        let currentIndex = 0;
        const slideCount = slides.length;

        function goToSlide(index) {
            if (index < 0) {
                index = slideCount - 1;
            } else if (index >= slideCount) {
                index = 0;
            }
            slider.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
        }

        if(nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
            prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        }

        // Auto-slide
        setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000); // Change slide every 5 seconds
    }

    // --- Contact Form Logic (for Formspree) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // The validation is handled by the browser (required attribute)
            // and the submission is handled by Formspree's action URL.
            // We can add a thank you message logic here if needed,
            // but Formspree handles it by default.
        });
    }

});