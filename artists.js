// Artists Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initCategoryTabs();
    initArtistCards();
    initModal();
    initParticleEffects();
    initScrollAnimations();
    initMouseEffects();
});

// Category Tab Functionality
function initCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tab');
    const categories = document.querySelectorAll('.artist-category');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Remove active class from all tabs and categories
            tabs.forEach(t => t.classList.remove('active'));
            categories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and target category
            this.classList.add('active');
            document.getElementById(targetCategory).classList.add('active');
        });
    });
}

// 3D Card Interactions
function initArtistCards() {
    const cards = document.querySelectorAll('.artist-card');
    
    cards.forEach(card => {
        const wrapper = card.querySelector('.card-3d-wrapper');
        
        // Mouse move effect for 3D rotation
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            wrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', function() {
            wrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
        
        // Mobile tap-to-flip for artist cards
        card.addEventListener('click', function(e) {
            // Prevent modal from opening if we're just flipping
            if (window.innerWidth <= 768) {
                e.stopPropagation();
                this.classList.toggle('is-flipped');
            }
        });
        
        // Add entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Modal Functionality
function initModal() {
    const modal = document.getElementById('artist-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    document.querySelectorAll('.artist-card').forEach(card => {
        card.addEventListener('dblclick', function() {
            if (window.innerWidth <= 768) {
                const artistName = this.getAttribute('data-artist');
                openArtistModal(artistName);
            }
        });
    });
    
    // Close modal when clicking close button
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

function openArtistModal(artistName) {
    const modal = document.getElementById('artist-modal');
    const modalImage = document.getElementById('modal-artist-image');
    const modalName = document.getElementById('modal-artist-name');
    const modalOrigin = document.getElementById('modal-artist-origin');
    const modalDescription = document.getElementById('modal-artist-description');
    const modalSpecialty = document.getElementById('modal-artist-specialty');
    const modalExperience = document.getElementById('modal-artist-experience');
    
    // Artist data
    const artistData = {
        'ataca': {
            name: 'Ataca',
            origin: 'Dominican Republic',
            description: 'Legendary bachata artist known for his smooth style and innovative choreography. Multiple world champion and international instructor.',
            specialty: 'Sensual Bachata',
            experience: '15+ Years',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face'
        },
        'la-alegria': {
            name: 'La Alegría',
            origin: 'Spain',
            description: 'Dynamic duo bringing passion and energy to every performance. Known for their innovative fusion of traditional and modern bachata.',
            specialty: 'Fusion Bachata',
            experience: '12+ Years',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop&crop=face'
        },
        'korke': {
            name: 'Korke',
            origin: 'Spain',
            description: 'Innovative choreographer and instructor known for his unique style and creative approach to bachata movement.',
            specialty: 'Urban Bachata',
            experience: '10+ Years',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face'
        },
        'jorge-burgos': {
            name: 'Jorge Burgos',
            origin: 'USA',
            description: 'Renowned instructor and performer specializing in sensual bachata and body movement techniques.',
            specialty: 'Body Movement',
            experience: '8+ Years',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face'
        },
        'maria-mendez': {
            name: 'Maria Mendez',
            origin: 'Colombia',
            description: 'Passionate dancer and instructor bringing the authentic Colombian bachata style to the world stage.',
            specialty: 'Traditional Bachata',
            experience: '6+ Years',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face'
        },
        'ahmed-tazi': {
            name: 'Ahmed Tazi',
            origin: 'Morocco',
            description: 'Moroccan bachata pioneer and local favorite, blending traditional Moroccan rhythms with modern bachata.',
            specialty: 'Fusion Style',
            experience: '5+ Years',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face'
        },
        'fatima-aziz': {
            name: 'Fatima Aziz',
            origin: 'Morocco',
            description: 'Rising star in the Moroccan dance scene, known for her graceful style and innovative choreography.',
            specialty: 'Modern Bachata',
            experience: '3+ Years',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop&crop=face'
        },
        'carlos-rodriguez': {
            name: 'Carlos Rodriguez',
            origin: 'Dominican Republic',
            description: 'Master instructor specializing in traditional Dominican bachata techniques and cultural education.',
            specialty: 'Traditional Dominican',
            experience: '20+ Years',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face'
        }
    };
    
    const artist = artistData[artistName];
    if (artist) {
        modalImage.src = artist.image;
        modalImage.alt = artist.name;
        modalName.textContent = artist.name;
        modalOrigin.textContent = artist.origin;
        modalDescription.textContent = artist.description;
        modalSpecialty.textContent = artist.specialty;
        modalExperience.textContent = artist.experience;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.transform = 'scale(0.8)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transition = 'all 0.3s ease';
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        }, 10);
    }
}

function closeModal() {
    const modal = document.getElementById('artist-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.style.transform = 'scale(0.8)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Particle Effects
function initParticleEffects() {
    const hero = document.querySelector('#artists-hero');
    if (!hero) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position and size
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = particle.style.height = Math.random() * 6 + 2 + 'px';
        particle.style.animationDuration = Math.random() * 4 + 4 + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        hero.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }
    
    // Create initial particles
    for (let i = 0; i < 15; i++) {
        setTimeout(createParticle, i * 300);
    }
    
    // Continue creating particles
    setInterval(createParticle, 2000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const elementsToAnimate = document.querySelectorAll('.artist-card, .category-tab');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Mouse Effects
function initMouseEffects() {
    const cards = document.querySelectorAll('.artist-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add glow effect
            this.style.boxShadow = '0 0 30px rgba(216, 91, 54, 0.4)';
            
            // Add subtle scale
            this.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove effects
            this.style.boxShadow = '';
            this.style.transform = 'scale(1)';
        });
    });
}

// Floating Elements Animation
function initFloatingElements() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 1.5}s`;
    });
}

// Initialize floating elements
initFloatingElements();

// Add smooth scrolling for category tabs
document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const artistsGrid = document.querySelector('#artists-grid');
        artistsGrid.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('artist-modal');
    
    if (e.key === 'ArrowLeft' && modal.style.display === 'block') {
        // Navigate to previous artist (if implemented)
    } else if (e.key === 'ArrowRight' && modal.style.display === 'block') {
        // Navigate to next artist (if implemented)
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate stats counters
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            stat.textContent = Math.floor(current) + '+';
            
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            }
        }, 16);
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.category-tab').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}); 