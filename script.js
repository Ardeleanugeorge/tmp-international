// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Header scroll effect - stays transparent
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        // Header rămâne transparent, doar se fixează la scroll
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Video-ul rămâne fix ca background - nu mai e nevoie de parallax
// Video-ul este deja fixed în CSS

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Disable button și arată loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Se trimite...';
        submitBtn.style.opacity = '0.7';
        
        // Get form data
        const formData = {
            nume: document.getElementById('nume').value,
            telefon: document.getElementById('telefon').value,
            email: document.getElementById('email').value,
            mesaj: document.getElementById('mesaj').value
        };

        // Opțiunea 1: Folosește EmailJS (necesită cont gratuit la emailjs.com)
        // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        //     from_name: formData.nume,
        //     from_email: formData.email,
        //     phone: formData.telefon,
        //     message: formData.mesaj,
        //     to_email: 'contact@tmp-international.ro'
        // })
        // .then(function() {
        //     showSuccessMessage();
        //     contactForm.reset();
        // }, function(error) {
        //     showErrorMessage();
        // });

        // Opțiunea 2: Folosește mailto (metoda actuală - funcționează imediat)
        const subject = encodeURIComponent('Contact de pe tmp-international.ro');
        const body = encodeURIComponent(
            `Nume: ${formData.nume}\n` +
            `Telefon: ${formData.telefon}\n` +
            `Email: ${formData.email}\n\n` +
            `Mesaj:\n${formData.mesaj}`
        );
        
        // Simulează trimiterea (pentru UX mai bun)
        setTimeout(() => {
            // Open email client
            window.location.href = `mailto:contact@tmp-international.ro?subject=${subject}&body=${body}`;
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            contactForm.reset();
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.opacity = '1';
        }, 500);
    });
}

// Funcție pentru mesaj de succes
function showSuccessMessage() {
    // Creează un mesaj de succes frumos
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success-message';
    successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Mesajul a fost trimis cu succes! Veți primi un răspuns în cel mai scurt timp.';
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(successDiv, form);
    
    // Animație fade in
    setTimeout(() => {
        successDiv.style.opacity = '1';
        successDiv.style.transform = 'translateY(0)';
    }, 10);
    
    // Șterge mesajul după 5 secunde
    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 5000);
}

// Funcție pentru mesaj de eroare
function showErrorMessage() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message';
    errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> A apărut o eroare. Te rugăm să încerci din nou sau să ne contactezi direct la telefon.';
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(errorDiv, form);
    
    setTimeout(() => {
        errorDiv.style.opacity = '1';
        errorDiv.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
        errorDiv.style.opacity = '0';
        errorDiv.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            errorDiv.remove();
        }, 300);
    }, 5000);
}

// Statistics Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString('ro-RO');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString('ro-RO');
        }
    };

    updateCounter();
}

// Observe statistics for animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                animateCounter(statNumber);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-box').forEach(box => {
    statsObserver.observe(box);
});

// Add animation on scroll for other elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.serviciu-card, .feature-box, .ruta-group, .contact-info, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Handle window resize for mobile menu
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (window.innerWidth > 768) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});

// Phone number click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        // Track phone clicks if needed
        console.log('Phone number clicked:', this.href);
    });
});

// Video autoplay handling for mobile
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    // Ensure video plays on mobile
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('muted', '');
    
    // Try to play video
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Video autoplay prevented:', error);
        });
    }
}

// Prevent default touch behaviors that might interfere
document.addEventListener('touchstart', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        // Allow touch on interactive elements
    }
}, { passive: true });

// Console message
console.log('%cTMP International - Transport Auto', 'color: #1a73e8; font-size: 20px; font-weight: bold;');
console.log('%cWebsite creat cu succes!', 'color: #34a853; font-size: 14px;');

