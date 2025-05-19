document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('span');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Light Mode';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Dark Mode';
        }
    }
    
    // Modal functionality
    const boxes = document.querySelectorAll('.box');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');
    
    boxes.forEach(box => {
        box.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            document.getElementById(modalId).style.display = "block";
            document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = "none";
            document.body.style.overflow = "auto";
        });
    });
    
    window.addEventListener('click', function(event) {
        if (event.target.className === 'modal') {
            event.target.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
    
    // View More Services functionality
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const additionalServices = document.getElementById('additionalServices');
    
    const extraServices = [
        {
            icon: 'fas fa-users',
            title: 'Arbitration & Mediation',
            desc: 'Alternative dispute resolution methods for faster settlements.'
        },
        {
            icon: 'fas fa-briefcase',
            title: 'Service Matters',
            desc: 'Employment and service-related disputes and appeals.'
        },
        {
            icon: 'fas fa-shopping-cart',
            title: 'Consumer Court',
            desc: 'Protection of consumer rights and grievance redressal.'
        },
        {
            icon: 'fas fa-building',
            title: 'RERA Matters',
            desc: 'Real estate regulatory authority cases and disputes.'
        },
        {
            icon: 'fas fa-user-tie',
            title: 'CAT Cases',
            desc: 'Central Administrative Tribunal matters for government employees.'
        },
        {
            icon: 'fas fa-train',
            title: 'Railway Claims Tribunal',
            desc: 'Compensation claims related to railway accidents.'
        }
    ];
    
    viewMoreBtn.addEventListener('click', function() {
        if (additionalServices.style.display === 'none' || !additionalServices.style.display) {
            // Load additional services if not already loaded
            if (additionalServices.children.length === 0) {
                extraServices.forEach(service => {
                    const serviceBox = document.createElement('div');
                    serviceBox.className = 'service-box';
                    serviceBox.innerHTML = `
                        <i class="${service.icon}"></i>
                        <h3>${service.title}</h3>
                        <p>${service.desc}</p>
                    `;
                    additionalServices.appendChild(serviceBox);
                });
            }
            
            additionalServices.style.display = 'grid';
            additionalServices.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
            additionalServices.style.gap = '25px';
            additionalServices.style.marginTop = '30px';
            viewMoreBtn.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
        } else {
            additionalServices.style.display = 'none';
            viewMoreBtn.innerHTML = 'View All Services <i class="fas fa-chevron-down"></i>';
        }
    });
    
    // Smooth scrolling for anchor links
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
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    // Add mobile menu close logic if you add a mobile menu
                }
            }
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 150)) {
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
    
    // Add active class to current section in mobile view
    if (window.innerWidth <= 768) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
});