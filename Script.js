document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- Nav gets a shadow/blur once the page is scrolled ---- */
    if (nav) {
        const onScroll = () => {
            if (window.scrollY > 12) {
                nav.classList.add('is-scrolled');
            } else {
                nav.classList.remove('is-scrolled');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---- Scroll-reveal for cards, section heading, and CTA ---- */
    const revealTargets = document.querySelectorAll('.Wonder-card, .feature-heading, .CTA-card');

    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('is-visible'), i * 60);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealTargets.forEach((el) => observer.observe(el));
    } else {
        // No IntersectionObserver support, or user prefers reduced motion:
        // show everything immediately, no animation.
        revealTargets.forEach((el) => el.classList.add('is-visible'));
    }

    /* ---- Subtle parallax drift on the CTA image ---- */
    if (!prefersReducedMotion) {
        const ctaImg = document.querySelector('.cta-img');
        if (ctaImg) {
            const onCtaScroll = () => {
                const rect = ctaImg.getBoundingClientRect();
                const viewportCenter = window.innerHeight / 2;
                const distance = (rect.top + rect.height / 2) - viewportCenter;
                const offset = Math.max(-24, Math.min(24, distance * 0.06));
                ctaImg.style.transform = `translateY(${offset}px)`;
            };
            window.addEventListener('scroll', onCtaScroll, { passive: true });
            onCtaScroll();
        }
    }
});