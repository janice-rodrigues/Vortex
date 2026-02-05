// Copied from /script.js for Next public serving.
// Keep this file in sync if you update root script.js.

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Solutions dropdown (click to open/close)
const dropdowns = document.querySelectorAll('.dropdown');

function closeAllDropdowns() {
    dropdowns.forEach(d => {
        d.classList.remove('open');
        const toggle = d.querySelector('.dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
}

dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', (e) => {
        // Desktop uses hover. Only toggle on click for mobile / collapsed nav.
        const isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
        const isMobileNavOpen = navMenu && navMenu.classList.contains('active');
        if (!isMobile && !isMobileNavOpen) return;

        e.preventDefault();
        e.stopPropagation();

        const isOpen = dropdown.classList.contains('open');
        closeAllDropdowns();
        dropdown.classList.toggle('open', !isOpen);
        toggle.setAttribute('aria-expanded', String(!isOpen));
    });
});

document.addEventListener('click', (e) => {
    // Close dropdowns when clicking outside
    for (const dropdown of dropdowns) {
        if (dropdown.contains(e.target)) return;
    }
    closeAllDropdowns();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllDropdowns();
});

// Filter Tabs
const filterButtons = document.querySelectorAll('.filter-btn');
const updateCards = document.querySelectorAll('.update-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Filter update cards
        updateCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                const categories = (card.dataset.category || '')
                    .toLowerCase()
                    .split(/\s+/)
                    .filter(Boolean);

                card.style.display = categories.includes(filter) ? 'block' : 'none';
            }
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#' || href.length < 2) return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        // Dropdown closes on mouseout (handled by CSS)
    }
});

// Add animation on scroll
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
document.querySelectorAll('.feature-card, .update-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

