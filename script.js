/**
 * LOZ BARBERSHOP - Main Script
 * Handles interactivity, scrolling, navigation, and configurations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Config-based URL binding ---
    const config = window.LOZ_CONFIG || {
        bookingUrl: '#',
        instagramUrl: '#',
        tiktokUrl: '#'
    };

    document.querySelectorAll('[data-booking-link]').forEach(el => {
        if (el.tagName === 'A') {
            el.href = config.bookingUrl;
            el.target = '_blank';
            el.rel = 'noopener';
        } else {
            el.addEventListener('click', () => {
                window.open(config.bookingUrl, '_blank', 'noopener');
            });
        }
    });

    document.querySelectorAll('[data-instagram-link]').forEach(el => {
        el.href = config.instagramUrl;
        el.target = '_blank';
        el.rel = 'noopener';
    });

    document.querySelectorAll('[data-tiktok-link]').forEach(el => {
        el.href = config.tiktokUrl;
        el.target = '_blank';
        el.rel = 'noopener';
    });

    // --- 2. Variables for UI Elements ---
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileBookingBar = document.querySelector('.mobile-booking-bar');
    const heroSection = document.querySelector('#hero') || document.querySelector('.hero');
    const copyrightYear = document.getElementById('copyright-year');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // --- 10. Copyright year ---
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // --- 4. Mobile menu toggle ---
    let isMenuOpen = false;

    const toggleMenu = (forceState) => {
        if (!hamburger || !mobileMenu) return;
        
        isMenuOpen = forceState !== undefined ? forceState : !isMenuOpen;
        
        if (isMenuOpen) {
            hamburger.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            hamburger.setAttribute('aria-label', 'Menü schließen');
            mobileMenu.classList.add('active');
            document.body.classList.add('mobile-menu-open');
        } else {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Menü öffnen');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        }
    };

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Close menu when mobile booking CTA is tapped
    if (mobileMenu) {
        mobileMenu.querySelectorAll('[data-booking-link]').forEach(cta => {
            cta.addEventListener('click', () => {
                toggleMenu(false);
            });
        });
    }

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu(false);
        }
    });

    // Reset menu on resize to desktop view
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && isMenuOpen) {
            toggleMenu(false);
        }
    }, { passive: true });

    // --- 2. Smooth scroll navigation ---
    const headerOffset = 72;
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                toggleMenu(false);
                
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3 & 5 & 11. Scroll Events (Sticky Header & Booking Bar) ---
    let ticking = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        // Sticky header
        if (header) {
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Mobile booking bar visibility
        if (mobileBookingBar) {
            const heroBottom = heroSection ? heroSection.offsetTop + heroSection.offsetHeight : 500;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            const distanceToBottom = scrollHeight - currentScrollY - clientHeight;
            
            if (currentScrollY > heroBottom && distanceToBottom > 200) {
                mobileBookingBar.classList.add('visible');
            } else {
                mobileBookingBar.classList.remove('visible');
            }
        }

        lastScrollY = currentScrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });

    // Initial check in case page is refreshed halfway down
    handleScroll();

    // --- 6. Scroll reveal animations ---
    const revealElements = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    // --- 7. Active navigation highlighting ---
    if ('IntersectionObserver' in window && sections.length > 0) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            root: null,
            rootMargin: `-${headerOffset}px 0px -60% 0px`, // Trigger when section passes header
            threshold: 0
        });

        sections.forEach(section => navObserver.observe(section));
    }

    // --- 9. Phone number click tracking ---
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Optional analytics hook: track telephone conversions
            console.log('Phone number clicked:', e.currentTarget.href);
        });
    });
});
