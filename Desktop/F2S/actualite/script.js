// Navigation
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (barPosition < screenPosition) {
            bar.style.width = `${progress}%`;
        }
    });
};

window.addEventListener('scroll', animateSkills);
animateSkills(); // Initial call

// Contact form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Création du lien mailto
            const mailtoLink = `mailto:msdiallo263@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Ouvrir le client email
    window.location.href = mailtoLink;
    
    // Réinitialiser le formulaire
    contactForm.reset();
    
    // Message de confirmation
    alert('Votre client email va s\'ouvrir. Merci pour votre message !');
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Actualités - Gestion du stockage en mémoire
let actualites = [
    {
        id: 1,
        title: "Lancement du nouveau site ESEM AFRIQUE",
        description: "Refonte complète du site web avec une nouvelle interface moderne et des fonctionnalités améliorées pour les étudiants.",
        date: "2025-01-15",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
    },
    {
        id: 2,
        title: "Formation en développement web",
        description: "Animation d'une session de formation sur les dernières tendances du développement web moderne.",
        date: "2024-12-10",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
    },
    {
        id: 3,
        title: "Projet Gold Académie achevé avec succès",
        description: "Finalisation et mise en ligne de la plateforme éducative avec toutes les fonctionnalités demandées.",
        date: "2024-11-20",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800"
    }
];

// Fonction pour afficher les actualités
function displayActualites() {
    const actualitesGrid = document.getElementById('actualitesGrid');
    
    if (actualites.length === 0) {
        actualitesGrid.innerHTML = '<p style="text-align: center; color: var(--text-gray); grid-column: 1/-1;">Aucune actualité pour le moment.</p>';
        return;
    }
    
    actualitesGrid.innerHTML = actualites.map(actualite => `
        <div class="actualite-card">
            <img src="${actualite.image}" alt="${actualite.title}" class="actualite-image" onerror="this.src='https://via.placeholder.com/800x400/0a0e27/00d9ff?text=MD-TECH'">
            <div class="actualite-content">
                <div class="actualite-date">
                    <i class="fas fa-calendar"></i> ${formatDate(actualite.date)}
                </div>
                <h3>${actualite.title}</h3>
                <p>${actualite.description}</p>
            </div>
        </div>
    `).join('');
}

// Fonction pour formater la date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Charger les actualités au démarrage
displayActualites();

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer tous les cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card, .timeline-item, .competence-category, .actualite-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Smooth scroll pour tous les liens
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});