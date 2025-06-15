document.addEventListener('DOMContentLoaded', () => {
    console.log('JS attached');

    // Mobile menu functionality
    const mobileMenu = document.querySelector('.mobile_menu');
    const navbarMenu = document.querySelector('.navbar_menu');

    mobileMenu.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
            }
        });
    });

    // Add animation to cards on scroll
    const cards = document.querySelectorAll('.services_card, .project_card, .client_card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));


    window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    });

    const projectCards = document.querySelectorAll('.project-card');
    const viewButtons = document.querySelectorAll('.view-btn');

    // Add click handlers for project cards
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the button
            if (e.target.classList.contains('view-btn')) return;
            
            const project = this.dataset.project;
            console.log(`Clicked on project: ${project}`);
            
            // Add subtle click animation
            this.style.transform = 'scale(0.98) translateY(-8px)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px)';
            }, 150);
        });

        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add specific handlers for view buttons
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectCard = this.closest('.project-card');
            const project = projectCard.dataset.project;
            
            // Add button click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 150);
            
            // Here you would typically open a modal or navigate to project details
            console.log(`View details clicked for: ${project}`);
            // Replace with your navigation logic
            // window.location.href = `/projects/${project}`;
        });
    });

    // Intersection Observer for scroll animations
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    projectCards.forEach(card => {
        scrollObserver.observe(card);
    });

    // Add mouse move effect for subtle interactivity
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px)';
        });
    });

});
