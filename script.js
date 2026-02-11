// ===== INITIALIZATION & CONFIGURATION =====
console.log('🎯 STUNNER V75 Website JavaScript Loading...');

// Initialize AOS with error handling
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    const scrollY = window.scrollY;
    if (scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== FAQs FUNCTIONALITY - GUARANTEED WORKING =====
function initFAQs() {
    console.log('🔧 Initializing FAQs...');
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) {
        console.log('ℹ️ No FAQ items found');
        return;
    }
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        question.addEventListener('click', function() {
            console.log(`📝 FAQ ${index + 1} clicked`);
            
            const isActive = item.classList.contains('active');
            
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.style.opacity = '0';
                    }
                }
            });
            
            // Toggle current FAQ
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
            }
        });
    });
    
    // Auto-open first FAQ
    setTimeout(() => {
        const firstFaq = document.querySelector('.faq-item');
        if (firstFaq && !firstFaq.classList.contains('active')) {
            const firstAnswer = firstFaq.querySelector('.faq-answer');
            if (firstAnswer) {
                firstFaq.classList.add('active');
                firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
                firstAnswer.style.opacity = '1';
            }
        }
    }, 1000);
}

// ===== TRADING GALLERY FUNCTIONALITY =====
function initTradingGallery() {
    const galleryTrack = document.querySelector('.gallery-track');
    if (!galleryTrack) return;
    
    const slides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const galleryDots = document.querySelector('.gallery-dots');
    const currentSlideEl = document.querySelector('.current-slide');
    const totalSlidesEl = document.querySelector('.total-slides');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Initialize gallery
    if (totalSlidesEl) totalSlidesEl.textContent = totalSlides;
    
    // Create dots
    if (galleryDots) {
        galleryDots.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = `gallery-dot ${i === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            galleryDots.appendChild(dot);
        }
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateGallery();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateGallery();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateGallery();
    }
    
    function updateGallery() {
        galleryTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        if (currentSlideEl) currentSlideEl.textContent = currentSlide + 1;
        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
    }
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    updateGallery();
}

// ===== LIGHTBOX FUNCTIONALITY =====
function initLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    if (!lightbox) return;
    
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const lightboxProfit = lightbox.querySelector('.lightbox-profit');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    
    const screenshotItems = document.querySelectorAll('.screenshot-item');
    if (!screenshotItems.length) return;
    
    let currentImageIndex = 0;
    const images = Array.from(screenshotItems).map(item => ({
        src: item.getAttribute('data-image'),
        profit: item.querySelector('.profit-badge')?.textContent || '+$0',
        alt: item.querySelector('img')?.getAttribute('alt') || 'Trade screenshot'
    }));
    
    screenshotItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox();
        });
    });
    
    function openLightbox() {
        const image = images[currentImageIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        if (lightboxProfit) lightboxProfit.textContent = image.profit + ' Profit';
        if (lightboxCounter) lightboxCounter.textContent = `Image ${currentImageIndex + 1} of ${images.length}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        openLightbox();
    }
    
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        openLightbox();
    }
    
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });
}

// ===== COUNTER ANIMATIONS =====
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

// ===== TELEGRAM BANNER FUNCTIONALITY =====
function initTelegramBanner() {
    const banner = document.querySelector('.telegram-banner');
    const closeBtn = document.querySelector('.banner-close');
    const bannerCta = document.querySelector('.banner-cta');
    
    if (!banner) return;
    
    // Check if user previously closed the banner
    const bannerClosed = localStorage.getItem('telegramBannerClosed');
    
    // Show banner after a delay (if not previously closed)
    if (!bannerClosed) {
        setTimeout(() => {
            banner.classList.add('show');
            console.log('📢 Telegram banner displayed');
        }, 3000); // Show after 3 seconds
    }
    
    // Close banner functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            banner.classList.remove('show');
            localStorage.setItem('telegramBannerClosed', 'true');
            console.log('📢 Telegram banner closed');
        });
    }
    
    // Track banner clicks
    if (bannerCta) {
        bannerCta.addEventListener('click', () => {
            console.log('📢 Telegram banner CTA clicked');
            // You can add analytics here later
        });
    }
    
    // Auto-hide banner after 15 seconds
    setTimeout(() => {
        if (banner.classList.contains('show')) {
            banner.classList.remove('show');
            console.log('📢 Telegram banner auto-hidden');
        }
    }, 15000);
    
    console.log('📢 Telegram banner initialized');
}

// ===== MAIN INITIALIZATION FUNCTION =====
function initializeAll() {
    console.log('🚀 Initializing all website features...');
    
    // Initialize all components
    initFAQs();
    initTradingGallery();
    initLightbox();
    initMobileMenu();
    initTelegramBanner();
    
    // Initialize counters
    const counters = document.querySelectorAll('.stat-value[data-target]');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        if (target) animateCounter(counter, 0, target, 2000);
    });

    // ===== HAMBURGER MENU FUNCTIONALITY =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!hamburger || !mobileOverlay) {
        console.log('📱 Mobile menu elements not found');
        return;
    }
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    mobileOverlay.addEventListener('click', (e) => {
        if (e.target === mobileOverlay) {
            hamburger.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    console.log('📱 Mobile menu initialized');
}
}

// ===== LOAD EVENT HANDLERS =====
// Single DOMContentLoaded listener to rule them all!
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM fully loaded - initializing everything');
    initializeAll();
});

// Fallback initialization
window.addEventListener('load', function() {
    console.log('📦 Window fully loaded');
    // Smooth page transition
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

console.log('🎉 STUNNER V75 JavaScript loaded successfully!');