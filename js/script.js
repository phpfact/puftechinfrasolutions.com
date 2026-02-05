document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Hero Swiper Initialization
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Sticky Navbar Transition
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md', 'bg-primary/95');
            navbar.classList.remove('bg-primary/0');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });

    // Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-navy', 'text-white');
                b.classList.add('text-gray-500', 'border-gray-300');
            });
            // Add active class to clicked button
            btn.classList.add('active', 'bg-navy', 'text-white');
            btn.classList.remove('text-gray-500', 'border-gray-300');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.remove('opacity-0', 'scale-95');
                        item.classList.add('opacity-100', 'scale-100');
                    }, 10);
                } else {
                    item.classList.remove('opacity-100', 'scale-100');
                    item.classList.add('opacity-0', 'scale-95');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    if (lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightbox.classList.remove('hidden');
                    // Small delay for fade in
                    setTimeout(() => {
                        lightbox.classList.remove('opacity-0');
                    }, 10);
                }
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.add('opacity-0');
            setTimeout(() => {
                lightbox.classList.add('hidden');
            }, 300);
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.add('opacity-0');
                setTimeout(() => {
                    lightbox.classList.add('hidden');
                }, 300);
            }
        });
    }

    // Testimonial Swiper
    const testimonialSwiper = new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const button = item.querySelector('button');
        const content = item.querySelector('.max-h-0');
        const icon = item.querySelector('.fa-chevron-down');

        button.addEventListener('click', () => {
            const isOpen = content.style.maxHeight;

            // Close all others
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.max-h-0').style.maxHeight = null;
                    otherItem.querySelector('.fa-chevron-down').classList.remove('rotate-180');
                }
            });

            // Toggle current
            if (isOpen) {
                content.style.maxHeight = null;
                icon.classList.remove('rotate-180');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.classList.add('rotate-180');
            }
        });
    });
});
