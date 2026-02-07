// Navigation scroll effect
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Header tab highlighting on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('nav a');

function highlightNavOnScroll() {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNavOnScroll);

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.innerHTML = navLinks.classList.contains('active') 
    ? '<i class="fas fa-times"></i>' 
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
    navLinks.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('nav a, .hero-cta').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 100,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });
});

// Enhanced Hero Carousel with Image Info
class HeroCarousel {
  constructor() {
    this.slides = document.querySelectorAll('.carousel-slide');
    this.dots = document.querySelectorAll('.dot');
    this.currentIndex = 0;
    this.interval = null;
    this.autoPlayDelay = 6000;
    
    // Image info elements
    this.imageName = document.querySelector('.image-name');
    this.imageDescription = document.querySelector('.image-description');
    
    // Image data
    this.imageData = [
      {
        name: "Banaue Rice Terraces",
        description: "Ancient engineering marvel by Ifugao people, known as the 'Eighth Wonder of the World,' showcasing sustainable agricultural practices and community cooperation that prevented conflicts over land and water resources."
      },
      {
        name: "Tubbataha Reef",
        description: "UNESCO World Heritage Site and protected marine biodiversity sanctuary, demonstrating indigenous environmental stewardship and sustainable fishing practices that maintained ecological balance."
      },
      {
        name: "Batanes Stone Houses",
        description: "Traditional Ivatan typhoon-resistant architecture, built from limestone and coral, showing community adaptation to harsh climates through collective building techniques and shared resources."
      },
      {
        name: "Vigan Heritage Houses",
        description: "Spanish-Filipino colonial architecture blending European design with indigenous materials and techniques, representing cultural synthesis and adaptive preservation of architectural traditions."
      }
    ];
    
    this.init();
  }
  
  init() {
    // Show first slide
    this.showSlide(this.currentIndex);
    
    // Start autoplay
    this.startAutoPlay();
    
    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.stopAutoPlay();
        this.showSlide(index);
        this.startAutoPlay();
      });
    });
    
    // Heritage card click to show corresponding slide
    const heritageCards = document.querySelectorAll('.heritage-card-vertical');
    heritageCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        this.stopAutoPlay();
        this.showSlide(index);
        this.expandCard(card, index);
        this.startAutoPlay();
      });
    });
    
    // Pause autoplay on hover
    this.slides.forEach(slide => {
      slide.addEventListener('mouseenter', () => this.stopAutoPlay());
      slide.addEventListener('mouseleave', () => this.startAutoPlay());
    });
  }
  
  showSlide(index) {
    // Update current index
    this.currentIndex = (index + this.slides.length) % this.slides.length;

    // Hide all slides
    this.slides.forEach(slide => {
      slide.classList.remove('active');
      slide.style.opacity = '0';
    });

    this.dots.forEach(dot => dot.classList.remove('active'));

    // Show current slide
    setTimeout(() => {
      this.slides[this.currentIndex].classList.add('active');
      this.slides[this.currentIndex].style.opacity = '1';

      // Update image info
      this.updateImageInfo(this.currentIndex);

      this.dots[this.currentIndex].classList.add('active');

      // Update card states based on current slide
      this.updateCardStates();
    }, 100);
  }

  expandCard(card, index) {
    // Remove expanded class from all cards
    const allCards = document.querySelectorAll('.heritage-card-vertical');
    allCards.forEach(c => c.classList.remove('expanded'));

    // Add expanded class to clicked card
    card.classList.add('expanded');

    // Auto-collapse after 3 seconds
    setTimeout(() => {
      card.classList.remove('expanded');
    }, 3000);
  }

  updateCardStates() {
    const heritageCards = document.querySelectorAll('.heritage-card-vertical');
    heritageCards.forEach((card, index) => {
      if (index === this.currentIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
        card.classList.remove('expanded');
      }
    });
  }
  
  updateImageInfo(index) {
    // Add fade out effect
    this.imageName.style.opacity = '0';
    this.imageDescription.style.opacity = '0';
    this.imageName.style.transform = 'translateY(-20px)';
    this.imageDescription.style.transform = 'translateY(-20px)';
    
    // Update content after fade out
    setTimeout(() => {
      this.imageName.textContent = this.imageData[index].name;
      this.imageDescription.textContent = this.imageData[index].description;
      
      // Fade in new content
      setTimeout(() => {
        this.imageName.style.opacity = '1';
        this.imageDescription.style.opacity = '1';
        this.imageName.style.transform = 'translateY(0)';
        this.imageDescription.style.transform = 'translateY(0)';
      }, 100);
    }, 300);
  }
  
  nextSlide() {
    this.showSlide(this.currentIndex + 1);
  }
  
  startAutoPlay() {
    this.stopAutoPlay();
    this.interval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
  }
  
  stopAutoPlay() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize carousel
  const carousel = new HeroCarousel();
  
  // Scroll reveal animation
  const revealElements = document.querySelectorAll('.section');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px 0px 0px'
  };
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // Check initially visible sections
  revealElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      element.classList.add('active');
    }
  
  // Heritage cards hover effect
  const heritageCards = document.querySelectorAll('.heritage-card-vertical');
  heritageCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!card.classList.contains('expanded')) {
        card.style.transform = 'translateY(-8px) scale(1.05)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('expanded')) {
        card.style.transform = 'translateY(0) scale(1)';
      }
    });
  });
  
  // Add scroll progress indicator
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);
  
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    scrollProgress.style.width = scrolled + "%";
  });
  
  // Back to top button
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  // Click effect for CTA buttons with actual links
  document.getElementById('watchPresentation').addEventListener('click', function(e) {
    // Create ripple effect
    createRippleEffect(this, e);

    // Open Google Drive presentation in new tab
    setTimeout(() => {
      window.open('https://drive.google.com/drive/folders/1l_RDLehwKeD-JzEdDFp5PjqnIkJFUamk?usp=drive_link', '_blank');
    }, 300);
  });

  document.getElementById('accessResources').addEventListener('click', function(e) {
    // Create ripple effect
    createRippleEffect(this, e);
    
    // Open GitHub repository in new tab
    setTimeout(() => {
      window.open('https://github.com/melody-sheep/group3_PICPE_blog_resources', '_blank');
    }, 300);
  });

  document.getElementById('downloadPaper').addEventListener('click', function(e) {
    // Create ripple effect
    createRippleEffect(this, e);
    
    // Open PDF in new tab or download
    setTimeout(() => {
      // This opens the PDF in a new tab
      window.open('./assets/images/topic 3 BLOG.pdf', '_blank');
    }, 300);
  });

  // Add this helper function for ripple effect
  function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.className = 'ripple';
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${y}px;
      left: ${x}px;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Update QR code if needed (or keep the hardcoded one in HTML)
  const qrCode = document.querySelector('.qr-code');
  if (qrCode) {
    // Uncomment this line if you want to dynamically set the QR code
    // qrCode.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://melody-sheep.github.io/group3_PICPE_blog';
  }
  
  // Image lazy loading enhancement
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });
  
  images.forEach(img => {
    if (!img.complete) {
      img.dataset.src = img.src;
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
      imageObserver.observe(img);
    }
  });
  
  // Add keyboard navigation for carousel
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      carousel.stopAutoPlay();
      carousel.showSlide(carousel.currentIndex - 1);
      carousel.startAutoPlay();
    } else if (e.key === 'ArrowRight') {
      carousel.stopAutoPlay();
      carousel.showSlide(carousel.currentIndex + 1);
      carousel.startAutoPlay();
    }
  });
  
  // Add touch swipe for mobile carousel
  let touchStartX = 0;
  let touchEndX = 0;
  
  const carouselContainer = document.querySelector('.hero-carousel');
  
  carouselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  carouselContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - next slide
      carousel.stopAutoPlay();
      carousel.nextSlide();
      carousel.startAutoPlay();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - previous slide
      carousel.stopAutoPlay();
      carousel.showSlide(carousel.currentIndex - 1);
      carousel.startAutoPlay();
    }
  }
  
  // Add loading animation for images
  const sectionImages = document.querySelectorAll('.section-image');
  sectionImages.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
      this.style.transition = 'opacity 0.5s ease';
    });
    
    // Set initial opacity to 0 for fade-in effect
    img.style.opacity = '0';
  });
  
  // Add print functionality
  const printButton = document.createElement('button');
  printButton.className = 'print-btn glass-card';
  printButton.innerHTML = '<i class="fas fa-print"></i> Print Article';
  printButton.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    padding: 0.8rem 1.5rem;
    background: var(--gradient);
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    z-index: 998;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    transition: var(--transition);
  `;
  
  printButton.addEventListener('mouseenter', () => {
    printButton.style.transform = 'translateY(-3px)';
    printButton.style.boxShadow = '0 8px 20px rgba(0,0,0,0.4)';
  });
  
  printButton.addEventListener('mouseleave', () => {
    printButton.style.transform = 'translateY(0)';
    printButton.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
  });
  
  printButton.addEventListener('click', () => {
    window.print();
  });
  
  document.body.appendChild(printButton);
  
  // Responsive adjustments
  function handleResize() {
    if (window.innerWidth < 992) {
      // Adjust hero content for mobile
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.paddingTop = '80px';
      }
    }
  }
  
  window.addEventListener('resize', handleResize);
  handleResize(); // Initial call
  
  // Add accessibility improvements
  document.querySelectorAll('img').forEach(img => {
    if (!img.alt) {
      img.alt = 'Indigenous cultural image';
    }
  });
  
  // Add focus styles for keyboard navigation
  document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('focus', () => {
      element.style.outline = '2px solid var(--secondary)';
      element.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', () => {
      element.style.outline = 'none';
    });
  });
});

// Header navigation highlighting on scroll
function highlightNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}

// Initialize navigation highlighting
highlightNavOnScroll();

  // Add focus styles for keyboard navigation
  document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('focus', () => {
      element.style.outline = '2px solid var(--secondary)';
      element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
      element.style.outline = 'none';
    });
  });

  // Update QR code if needed (or keep the hardcoded one in HTML)
  const qrCode = document.querySelector('.qr-code');
  if (qrCode) {
    // Uncomment this line if you want to dynamically set the QR code
    // qrCode.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://melody-sheep.github.io/group3_PICPE_blog';
  }

  // Image lazy loading enhancement
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  images.forEach(img => {
    if (!img.complete) {
      img.dataset.src = img.src;
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
      imageObserver.observe(img);
    }
  });

  // Add keyboard navigation for carousel
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      carousel.stopAutoPlay();
      carousel.showSlide(carousel.currentIndex - 1);
      carousel.startAutoPlay();
    } else if (e.key === 'ArrowRight') {
      carousel.stopAutoPlay();
      carousel.showSlide(carousel.currentIndex + 1);
      carousel.startAutoPlay();
    }
  });

  // Add touch swipe for mobile carousel
  let touchStartX = 0;
  let touchEndX = 0;

  const carouselContainer = document.querySelector('.hero-carousel');

  carouselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carouselContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - next slide
      carousel.stopAutoPlay();
      carousel.nextSlide();
      carousel.startAutoPlay();
    }

    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - previous slide
      carousel.stopAutoPlay();
      carousel.showSlide(carousel.currentIndex - 1);
      carousel.startAutoPlay();
    }
  }

  // Add loading animation for images
  const sectionImages = document.querySelectorAll('.section-image');
  sectionImages.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
      this.style.transition = 'opacity 0.5s ease';
    });

    // Set initial opacity to 0 for fade-in effect
    img.style.opacity = '0';
  });

  // Add print functionality
  const printButton = document.createElement('button');
  printButton.className = 'print-btn glass-card';
  printButton.innerHTML = '<i class="fas fa-print"></i> Print Article';
  printButton.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    padding: 0.8rem 1.5rem;
    background: var(--gradient);
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    z-index: 998;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    transition: var(--transition);
  `;

  printButton.addEventListener('mouseenter', () => {
    printButton.style.transform = 'translateY(-3px)';
    printButton.style.boxShadow = '0 8px 20px rgba(0,0,0,0.4)';
  });

  printButton.addEventListener('mouseleave', () => {
    printButton.style.transform = 'translateY(0)';
    printButton.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
  });

  printButton.addEventListener('click', () => {
    window.print();
  });

  document.body.appendChild(printButton);

  // Responsive adjustments
  function handleResize() {
    if (window.innerWidth < 992) {
      // Adjust hero content for mobile
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.paddingTop = '80px';
      }
    }
  }

  window.addEventListener('resize', handleResize);
  handleResize(); // Initial call

  // Add accessibility improvements
  document.querySelectorAll('img').forEach(img => {
    if (!img.alt) {
      img.alt = 'Indigenous cultural image';
    }
  });

  // Add focus styles for keyboard navigation
  document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('focus', () => {
      element.style.outline = '2px solid var(--secondary)';
      element.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', () => {
      element.style.outline = 'none';
    });
  });
});
