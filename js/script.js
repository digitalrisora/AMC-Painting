document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = mobileBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Active Link Highlighting
    const currentLocation = location.pathname;
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
        if(link.getAttribute('href') !== '#' && currentLocation.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && link.getAttribute('href') === 'index.html') {
            link.classList.add('active');
        }
    });

    // Simple Form Validation (Contact Page)
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = 'var(--border)';
                }
            });

            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;
                
                submitBtn.innerText = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    contactForm.innerHTML = '<div class="success-message" style="text-align: center; padding: 2rem; background: #e6f4ea; color: #1e8e3e; border-radius: 4px;"><h3>Thank you for reaching out!</h3><p>We have received your request and will contact you shortly.</p></div>';
                }, 1500);
            }
        });
    }
});
