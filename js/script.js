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
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        const slider = sliderContainer.querySelector('.slider');
        const slides = sliderContainer.querySelectorAll('.slide');
        const nextBtn = sliderContainer.querySelector('.next-slide');
        const prevBtn = sliderContainer.querySelector('.prev-slide');
        const pagination = sliderContainer.querySelector('.slide-pagination');
        let currentIndex = 0;
        const slideCount = slides.length;

        if (pagination) {
            // Create pagination dots
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.dataset.index = i;
                pagination.appendChild(dot);
            }

            const dots = pagination.querySelectorAll('.dot');
            if (dots.length > 0) {
                dots[0].classList.add('active');
            }

            function updatePagination() {
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[currentIndex]) {
                    dots[currentIndex].classList.add('active');
                }
            }

            dots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    goToSlide(parseInt(e.target.dataset.index));
                });
            });
        }


        function goToSlide(index) {
            if (index < 0) {
                index = slideCount - 1;
            } else if (index >= slideCount) {
                index = 0;
            }
            slider.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
            if (pagination) {
                updatePagination();
            }
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

    // --- Project Filter Logic ---
    const filterContainer = document.getElementById('project-filters');
    if (filterContainer) {
        const projectGrid = document.getElementById('project-grid');
        const projects = projectGrid.querySelectorAll('.card');

        filterContainer.addEventListener('click', function(e) {
            if (e.target.tagName !== 'BUTTON') return;

            // Active button style
            const activeBtn = filterContainer.querySelector('.btn-primary');
            if(activeBtn) {
                activeBtn.classList.remove('btn-primary');
            }
            e.target.classList.add('btn-primary');

            const filter = e.target.dataset.filter;

            projects.forEach(project => {
                if (filter === 'tous' || project.dataset.category === filter) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    }

    // --- Back to Top Button ---
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Mobile Navigation ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.getElementById('primary-navigation');

    if (mobileNavToggle && primaryNav) {
        mobileNavToggle.addEventListener('click', () => {
            const isVisible = primaryNav.getAttribute('data-visible');

            if (isVisible === 'true') {
                primaryNav.setAttribute('data-visible', 'false');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            } else {
                primaryNav.setAttribute('data-visible', 'true');
                mobileNavToggle.setAttribute('aria-expanded', 'true');
            }
        });
    }

});