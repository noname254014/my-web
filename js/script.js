// DOM Elements
const loader = document.querySelector('.loader-container');
const themeToggle = document.querySelector('.theme-toggle');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const sidebar = document.querySelector('.sidebar');
const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');
const voteButtons = document.querySelectorAll('.vote-btn');
const wikiTreeLinks = document.querySelectorAll('.wiki-tree a');
const tabs = document.querySelectorAll('.tabs button');
const forms = document.querySelectorAll('form');

// Theme Management
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.toggle('dark-mode', currentTheme === 'dark');
themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// Mobile Menu
mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Sidebar Toggle
if (window.innerWidth < 992) {
    sidebar.classList.add('collapsed');
}

// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);
});

// Page Transitions
document.querySelectorAll('a').forEach(link => {
    if (link.hostname === window.location.hostname) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loader.classList.remove('hidden');
            setTimeout(() => {
                window.location.href = link.href;
            }, 500);
        });
    }
});

// Search Functionality
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const query = e.target.value.trim();
        if (query.length >= 2) {
            // Implement search logic here
            console.log('Searching for:', query);
        }
    }, 300);
});

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        // Implement search logic here
        console.log('Searching for:', query);
    }
});

// Vote System
voteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const countElement = button.querySelector('.vote-count');
        const currentCount = parseInt(countElement.textContent);
        const isUpvote = button.classList.contains('upvote');
        
        if (button.classList.contains('voted')) {
            countElement.textContent = currentCount + (isUpvote ? -1 : 1);
            button.classList.remove('voted');
        } else {
            countElement.textContent = currentCount + (isUpvote ? 1 : -1);
            button.classList.add('voted');
        }
    });
});

// Wiki Tree Navigation
wikiTreeLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Tab Switching
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-tab');
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show target content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
    });
});

// Animations on Scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Implement error handling logic here
});

// Performance Optimization
document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
});

// Form Validation
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            // Show error message
            const errorMessage = form.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.textContent = 'Vui lòng điền đầy đủ thông tin bắt buộc';
                errorMessage.style.display = 'block';
            }
        }
    });
});

// Local Storage Functions
const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    },
    
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return null;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    }
}; 