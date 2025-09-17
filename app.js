// Sakura Website Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initTypingAnimation();
    initBundleInteractions();
    initTestimonialCarousel();
    initMobileMenu();
    initScrollAnimations();
    initPlantCardInteractions();
    initNewsletterForm();
    initVideoPlaceholders();
    initFloatingElements();
    initHeaderScroll();
    
    console.log('🌸 Sakura website initialized successfully!');
});

// Smooth Scrolling Navigation - FIXED
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
                
                // Close mobile menu if open
                closeMobileMenu();
                
                // Visual feedback
                showNotification(`Navigating to ${targetId.replace('#', '')} section`);
            }
        });
    });
}

// Update Active Navigation Link
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Typing Animation for Hero Title - FIXED
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const fullText = typingText.textContent;
    typingText.textContent = '';
    typingText.style.borderRight = '3px solid white';
    
    let charIndex = 0;
    const typeSpeed = 120;
    
    function typeNextChar() {
        if (charIndex < fullText.length) {
            typingText.textContent += fullText.charAt(charIndex);
            charIndex++;
            setTimeout(typeNextChar, typeSpeed);
        } else {
            // Start blinking cursor after typing is complete
            startCursorBlink();
        }
    }
    
    function startCursorBlink() {
        setInterval(() => {
            typingText.style.borderRight = typingText.style.borderRight === '3px solid transparent' 
                ? '3px solid white' 
                : '3px solid transparent';
        }, 530);
    }
    
    // Start typing after initial delay
    setTimeout(typeNextChar, 1500);
}

// Bundle Card Interactions - FIXED
function initBundleInteractions() {
    // Toggle bundle details
    const detailsToggles = document.querySelectorAll('.bundle-card__details-toggle');
    
    detailsToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.bundle-card');
            const details = card.querySelector('.bundle-card__details');
            
            if (details) {
                const isShown = details.classList.contains('show');
                details.classList.toggle('show');
                this.textContent = details.classList.contains('show') ? 'Hide Details' : 'What\'s Included';
                
                // Add animation feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Show notification
                const bundleName = card.querySelector('.bundle-card__title').textContent;
                showNotification(isShown ? `${bundleName} details hidden` : `${bundleName} details shown`);
            }
        });
    });
    
    // Bundle customization buttons - FIXED
    const bundleButtons = document.querySelectorAll('.bundle-card__btn');
    
    bundleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.bundle-card');
            const bundleType = card.getAttribute('data-bundle');
            const bundleName = card.querySelector('.bundle-card__title').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            this.style.background = '#1f3f23';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.background = '';
            }, 200);
            
            // Change button text temporarily for feedback
            const originalText = this.textContent;
            this.textContent = bundleType === 'custom' ? 'Building...' : 'Customizing...';
            
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
            
            // Show notification
            showNotification(`${bundleName} customization started! 🎁`);
        });
    });
}

// Plant Card Interactions - FIXED
function initPlantCardInteractions() {
    const plantCards = document.querySelectorAll('.plant-card');
    
    plantCards.forEach(card => {
        // Hover effect for care icons - FIXED
        card.addEventListener('mouseenter', function() {
            const careIcons = this.querySelector('.plant-card__care-icons');
            const image = this.querySelector('.image-placeholder');
            
            if (careIcons) {
                careIcons.style.opacity = '1';
                careIcons.style.transform = 'translateY(0)';
            }
            
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const careIcons = this.querySelector('.plant-card__care-icons');
            const image = this.querySelector('.image-placeholder');
            
            if (careIcons) {
                careIcons.style.opacity = '0';
                careIcons.style.transform = 'translateY(10px)';
            }
            
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
        
        // Add to bundle button - FIXED
        const addButton = card.querySelector('.plant-card__btn');
        
        if (addButton) {
            addButton.addEventListener('click', function(e) {
                e.preventDefault();
                const plantName = card.querySelector('.plant-card__name').textContent;
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Change button appearance for confirmation
                const originalText = this.textContent;
                const originalBg = this.style.background;
                const originalColor = this.style.color;
                
                this.textContent = '✓ Added!';
                this.style.background = '#2d5d31';
                this.style.color = 'white';
                this.style.border = '1px solid #2d5d31';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = originalBg;
                    this.style.color = originalColor;
                    this.style.border = '';
                }, 2500);
                
                showNotification(`${plantName} added to your bundle! 🌱`);
            });
        }
    });
}

// Testimonial Carousel
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    
    if (testimonials.length === 0) return;
    
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === index) {
                testimonial.classList.add('active');
            }
        });
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }
    
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    }
    
    if (nextButton && prevButton) {
        nextButton.addEventListener('click', function(e) {
            e.preventDefault();
            nextTestimonial();
            this.style.transform = 'scale(0.9)';
            setTimeout(() => { this.style.transform = ''; }, 100);
        });
        
        prevButton.addEventListener('click', function(e) {
            e.preventDefault();
            prevTestimonial();
            this.style.transform = 'scale(0.9)';
            setTimeout(() => { this.style.transform = ''; }, 100);
        });
        
        // Auto-rotate testimonials
        setInterval(nextTestimonial, 6000);
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            nav.classList.toggle('nav--open');
            this.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (this.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
    }
}

function closeMobileMenu() {
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (nav && nav.classList.contains('nav--open')) {
        nav.classList.remove('nav--open');
        menuToggle.classList.remove('active');
        
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
    }
}

// Scroll Animations - ENHANCED
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special staggered animation for care pillars
                if (entry.target.classList.contains('care-pillar')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, index * 200);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll(
        '.bundle-card, .plant-card, .care-pillar, .section__header, .founder__text, .founder__video'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterButton = document.querySelector('.newsletter-btn');
    
    if (newsletterButton) {
        newsletterButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = newsletterInput ? newsletterInput.value.trim() : '';
            
            if (email && validateEmail(email)) {
                // Simulate form submission
                this.textContent = 'Subscribing...';
                this.disabled = true;
                this.style.background = '#1f3f23';
                
                setTimeout(() => {
                    this.textContent = '✓ Subscribed!';
                    if (newsletterInput) newsletterInput.value = '';
                    showNotification('Thank you for subscribing to our newsletter! 📧');
                    
                    setTimeout(() => {
                        this.textContent = 'Subscribe';
                        this.disabled = false;
                        this.style.background = '';
                    }, 3000);
                }, 1500);
            } else if (email) {
                showNotification('Please enter a valid email address.', 'error');
                newsletterInput.style.borderColor = '#ff5459';
                setTimeout(() => {
                    if (newsletterInput) newsletterInput.style.borderColor = '';
                }, 2000);
            } else {
                showNotification('Please enter your email address.', 'error');
            }
        });
    }
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Video Placeholder Interactions - ENHANCED
function initVideoPlaceholders() {
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    const allVideos = document.querySelectorAll('.video-placeholder__video');
    // Initialize default volume to 40% and enable looping
    allVideos.forEach(v => {
        v.volume = 0.4;
        // Safety: if loop is ignored, restart on ended
        v.addEventListener('ended', () => {
            try {
                v.currentTime = 0;
                v.play().catch(() => {});
            } catch (_) {}
        });
    });

    // Initial state for auto-playing videos
    videoPlaceholders.forEach(placeholder => {
        const videoEl = placeholder.querySelector('.video-placeholder__video');
        const playButton = placeholder.querySelector('.play-button');
        if (videoEl && playButton) {
            // Check if video is already playing (due to autoplay in HTML)
            if (!videoEl.paused) {
                playButton.textContent = '⏸';
                placeholder.classList.add('video-playing'); // Add class if autoplaying
            } else {
                playButton.textContent = '▶';
                placeholder.classList.remove('video-playing'); // Ensure class is not present
            }
        }
    });

    // Generate poster thumbnails from 5s frame (robust: brief muted play to ensure frame renders)
    allVideos.forEach((videoEl) => {
        if (videoEl.dataset.posterGenerated === 'true' || videoEl.hasAttribute('autoplay')) return;

        const ensureMetadata = () => new Promise((resolve) => {
            if (videoEl.readyState >= 1 && videoEl.videoWidth > 0) {
                resolve();
            } else {
                videoEl.addEventListener('loadedmetadata', resolve, { once: true });
            }
        });

        const generatePoster = async () => {
            try {
                // Make sure metadata and dimensions exist
                await ensureMetadata();
                const duration = Math.max(0, videoEl.duration || 0);
                const target = Math.min(5, Math.max(0.5, duration > 0 ? duration - 0.1 : 5));

                // Prepare video for programmatic playback
                videoEl.muted = true;
                videoEl.playsInline = true;
                // Start from beginning
                try { videoEl.currentTime = 0; } catch (_) {}

                // Play until we reach the target time, then capture
                await videoEl.play().catch(() => {});

                const captureFrame = () => {
                    const width = Math.max(1, videoEl.videoWidth || 640);
                    const height = Math.max(1, videoEl.videoHeight || 360);
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return false;
                    ctx.drawImage(videoEl, 0, 0, width, height);
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
                    if (dataUrl) {
                        videoEl.setAttribute('poster', dataUrl);
                        videoEl.dataset.posterGenerated = 'true';
                        return true;
                    }
                    return false;
                };

                await new Promise((resolve) => {
                    const onTimeUpdate = () => {
                        if (videoEl.currentTime >= target) {
                            videoEl.removeEventListener('timeupdate', onTimeUpdate);
                            // Capture on next frame to avoid black frame
                            requestAnimationFrame(() => {
                                captureFrame();
                                videoEl.pause();
                                try { videoEl.currentTime = 0; } catch (_) {}
                                resolve();
                            });
                        }
                    };
                    videoEl.addEventListener('timeupdate', onTimeUpdate);
                });
            } catch (err) {
                console.warn('Poster generation failed:', err);
            } finally {
                // Ensure video is paused at start
                try { videoEl.pause(); } catch (_) {}
                try { videoEl.currentTime = 0; } catch (_) {}
            }
        };

        // Defer a tick so layout is ready
        setTimeout(generatePoster, 0);
    });
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function(e) {
            e.preventDefault();
            const label = this.querySelector('.video-placeholder__label')?.textContent || 'Video';
            const playButton = this.querySelector('.play-button');
            const videoEl = this.querySelector('.video-placeholder__video');

            if (videoEl) {
                if (videoEl.preload === 'metadata' && videoEl.readyState < 2) {
                    videoEl.load();
                }
                const isPlaying = !!(videoEl.currentTime > 0 && !videoEl.paused && !videoEl.ended && videoEl.readyState > 2);
                if (isPlaying) {
                    videoEl.pause();
                    if (playButton) playButton.textContent = '▶';
                    placeholder.classList.remove('video-playing'); // Remove class on pause
                    showNotification(`${label} paused`);
                } else {
                    // Set volume to 40% and unmute when user clicks play
                    videoEl.volume = 0.4;
                    videoEl.muted = false;
                    // Pause other videos
                    allVideos.forEach(v => { if (v !== videoEl) v.pause(); });
                    videoEl.play().then(() => {
                        if (playButton) playButton.textContent = '⏸';
                        placeholder.classList.add('video-playing'); // Add class on play
                    }).catch(() => {
                        showNotification(`Unable to play ${label}.`, 'error');
                    });
                }
                return;
            }

            // Fallback effect if no video in placeholder
            this.style.transform = 'scale(0.98)';
            if (playButton) {
                playButton.style.transform = 'scale(1.2)';
                playButton.textContent = '⏸';
            }
            setTimeout(() => {
                this.style.transform = '';
                if (playButton) {
                    playButton.style.transform = '';
                    playButton.textContent = '▶';
                }
            }, 300);
            showNotification(`${label} video will be available soon! 🎬`);
        });
    });
}

// Floating Elements Animation Enhancement
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Enhanced random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 30;
            const randomY = (Math.random() - 0.5) * 30;
            const randomRotate = (Math.random() - 0.5) * 15;
            
            element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        }, 4000 + (index * 1500));
    });
}

// Notification System - ENHANCED
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    const bgColor = type === 'error' ? '#ff5459' : type === 'warning' ? '#f59e0b' : '#2d5d31';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        max-width: 320px;
        font-size: 14px;
        line-height: 1.4;
        font-weight: 500;
        border: 2px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 4000);
}

// Scroll-based Navigation Highlighting - ENHANCED
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
            updateActiveNavLink(`#${sectionId}`);
        }
    });
});

// Enhanced Button Interactions with Ripple Effect
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const btn = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        `;
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
});

// Care Guide Download
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('care-guide__cta')) {
        e.preventDefault();
        
        e.target.textContent = 'Preparing...';
        setTimeout(() => {
            e.target.textContent = 'Download Care Guide';
            showNotification('Care guide download will be available soon! 📋');
        }, 1000);
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .image-placeholder {
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .plant-card__care-icons {
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    @media (max-width: 768px) {
        .nav {
            position: fixed;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
            transition: top 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 999;
            border-top: 1px solid #e5e7eb;
        }
        
        .nav--open {
            top: 80px;
        }
        
        .nav__link {
            padding: 12px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .notification {
            right: 10px !important;
            max-width: calc(100vw - 20px) !important;
        }
    }
`;

document.head.appendChild(style);

// Initialize performance optimizations
function initPerformanceOptimizations() {
    // Smooth scrolling polyfill for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
        document.head.appendChild(script);
    }
    
    // Preconnect to external resources
    const preconnectLinks = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
    ];
    
    preconnectLinks.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
initPerformanceOptimizations();

// Console welcome message
console.log('🌸 Welcome to Sakura - Gifts That Grow! 🌱');
console.log('Website successfully loaded with all interactive features!');
console.log('All navigation, animations, and interactive elements are now working.');

// Error handling for critical functions
window.addEventListener('error', function(e) {
    console.error('Sakura Website Error:', e.error);
    showNotification('Something went wrong, but we\'re working on it!', 'error');
});

// Ensure all elements are ready
setTimeout(() => {
    const criticalElements = [
        '.typing-text',
        '.nav__link',
        '.bundle-card__details-toggle',
        '.plant-card__btn'
    ];
    
    criticalElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
            console.warn(`Missing elements: ${selector}`);
        }
    });
}, 1000);