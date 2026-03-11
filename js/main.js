// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
        // Mobilde menüyü kapat
        nav.classList.remove('open');
        hamburger.classList.remove('active');
    });
});

// ===== Hamburger Menü =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
});

// Menü dışına tıklayınca kapat
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('open');
        hamburger.classList.remove('active');
    }
});

// ===== Scroll Animasyonları (Intersection Observer) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ===== Aktif Navigasyon Linki =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const headerHeight = document.querySelector('.header').offsetHeight;
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== İletişim Formu Validasyonu =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(inputId + 'Error');
    input.classList.add('invalid');
    error.textContent = message;
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(inputId + 'Error');
    input.classList.remove('invalid');
    error.textContent = '';
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    if (!phone) return true; // Telefon opsiyonel
    return /^[0-9\s\+\-\(\)]{7,15}$/.test(phone);
}

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    // Ad Soyad
    const name = document.getElementById('name').value.trim();
    if (!name) {
        showError('name', 'Ad Soyad alanı zorunludur.');
        isValid = false;
    } else if (name.length < 2) {
        showError('name', 'Ad Soyad en az 2 karakter olmalıdır.');
        isValid = false;
    } else {
        clearError('name');
    }

    // E-posta
    const email = document.getElementById('email').value.trim();
    if (!email) {
        showError('email', 'E-posta alanı zorunludur.');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Geçerli bir e-posta adresi giriniz.');
        isValid = false;
    } else {
        clearError('email');
    }

    // Telefon
    const phone = document.getElementById('phone').value.trim();
    if (!validatePhone(phone)) {
        showError('phone', 'Geçerli bir telefon numarası giriniz.');
        isValid = false;
    } else {
        clearError('phone');
    }

    // Mesaj
    const message = document.getElementById('message').value.trim();
    if (!message) {
        showError('message', 'Mesaj alanı zorunludur.');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Mesajınız en az 10 karakter olmalıdır.');
        isValid = false;
    } else {
        clearError('message');
    }

    if (isValid) {
        formSuccess.classList.add('show');
        contactForm.reset();
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
    }
});

// Girdi alanlarında hata durumunu temizle
document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
    input.addEventListener('input', () => {
        clearError(input.id);
    });
});
