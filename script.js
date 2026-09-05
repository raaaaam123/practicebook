/* ========================================
   BookNest — JavaScript
   ======================================== */

// Payment redirect URL
const PAYMENT_URL = "https://payments.cashfree.com/forms?code=computeroperator";

// ========== BUY BOOK FUNCTION ==========
function buyBook() {
    window.location.href = PAYMENT_URL;
}

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById("navbar");

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", handleNavbarScroll, { passive: true });

// ========== MOBILE MENU TOGGLE ==========
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("open");
});

// Close mobile menu on link click
document.querySelectorAll(".mobile-nav-link, #mobileMenu a").forEach((link) => {
    link.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        mobileMenu.classList.remove("open");
    });
});

// ========== SCROLL REVEAL ANIMATION ==========
function initScrollReveal() {
    const elements = document.querySelectorAll("[data-animate]");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.style.animationDelay || "0s";
                    const delayMs = parseFloat(delay) * 1000;

                    setTimeout(() => {
                        entry.target.classList.add("visible");
                    }, delayMs);

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px",
        }
    );

    elements.forEach((el) => observer.observe(el));
}

// ========== CURSOR GLOW EFFECT ==========
function initCursorGlow() {
    if (window.matchMedia("(pointer: fine)").matches) {
        const glow = document.createElement("div");
        glow.classList.add("cursor-glow");
        document.body.appendChild(glow);

        let mouseX = 0;
        let mouseY = 0;
        let glowX = 0;
        let glowY = 0;

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateGlow() {
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            glow.style.left = glowX + "px";
            glow.style.top = glowY + "px";
            requestAnimationFrame(animateGlow);
        }

        animateGlow();
    }
}

// ========== CONTACT FORM HANDLER ==========
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("Message sent! We'll get back to you soon.");
        contactForm.reset();
    });
}

// ========== TOAST NOTIFICATION ==========
function showToast(message) {
    // Remove existing toast
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerHTML = `
        <div class="toast-icon">
            <svg width="16" height="16" fill="none" stroke="#d946ef" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
        </div>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// ========== ACTIVE NAV LINK HIGHLIGHT ==========
function initActiveNavLinks() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveLink() {
        const scrollPos = window.scrollY + 150;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach((link) => {
                    link.classList.remove("text-white", "bg-white/5");
                    link.classList.add("text-dark-300");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("text-white", "bg-white/5");
                        link.classList.remove("text-dark-300");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink, { passive: true });
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// ========== COUNTER ANIMATION ==========
function animateCounters() {
    const counters = document.querySelectorAll("[data-count]");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.count);
                    const suffix = entry.target.dataset.suffix || "";
                    let current = 0;
                    const increment = target / 60;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        entry.target.textContent = Math.floor(current) + suffix;
                    }, 16);

                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
}

// ========== PARALLAX ON HERO (SUBTLE) ==========
function initHeroParallax() {
    const heroBook = document.querySelector(".hero-book-card");
    if (!heroBook || window.innerWidth < 1024) return;

    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        heroBook.style.transform = `perspective(1000px) rotateY(${-5 + x * 0.5}deg) rotateX(${2 - y * 0.5}deg)`;
    });
}

// ========== INITIALIZE ==========
document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initCursorGlow();
    initActiveNavLinks();
    animateCounters();
    initHeroParallax();
    handleNavbarScroll();
});