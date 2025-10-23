// Navegación móvil
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navegación activa según scroll (throttled para mejor performance)
let ticking = false;
function setActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(setActiveNav);
        ticking = true;
    }
});

// Efecto de parallax suave en el hero (throttled)
let parallaxTicking = false;
window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-background');
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            parallaxTicking = false;
        });
        parallaxTicking = true;
    }
});

// Animación de entrada para elementos (optimizado)
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Dejar de observar una vez animado
        }
    });
}, observerOptions);

// Observar elementos para animación (carga inicial más rápida)
window.addEventListener('load', () => {
    const animatedElements = document.querySelectorAll(
        '.about-card, .skill-category, .timeline-item, .project-card, .course-card, .info-item'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.4s ease ${index * 0.05}s`;
        observer.observe(el);
    });
});

// Animación de las barras de progreso (optimizado)
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.level-bar');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 50);
                });
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// Smooth scroll mejorado
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') {
            e.preventDefault();
            return;
        }
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto navbar al hacer scroll (throttled)
let navbarTicking = false;
window.addEventListener('scroll', () => {
    if (!navbarTicking) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            const navbar = document.querySelector('.navbar');
            
            if (currentScroll <= 0) {
                navbar.style.boxShadow = 'none';
            } else {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            }
            navbarTicking = false;
        });
        navbarTicking = true;
    }
});

// Efecto hover 3D solo en desktop (mejor performance)
if (window.innerWidth > 768) {
    const cards = document.querySelectorAll('.project-card, .about-card, .course-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.3s ease';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Manejo del link de LinkedIn - Ya no es necesario, está configurado directamente en HTML

// Log de bienvenida en consola
console.log('%c¡Hola! 👋', 'color: #0ecb81; font-size: 20px; font-weight: bold;');
console.log('%cGracias por revisar mi portfolio', 'color: #848e9c; font-size: 12px;');

// Inicialización final (optimizado)
document.addEventListener('DOMContentLoaded', () => {
    // Forzar scroll al inicio
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
});