// =========================
// SCROLL GLOBAL SUAVE
// =========================

const prefersReducedMotion =
window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const hasSmoothTools =
window.Lenis && window.gsap && window.ScrollTrigger && !prefersReducedMotion;

let lenis;

if (hasSmoothTools) {
    gsap.registerPlugin(ScrollTrigger);

    lenis = new Lenis({
        lerp:.075,
        smoothWheel:true,
        wheelMultiplier:.85,
        touchMultiplier:1.15,
        anchors:false
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });
}

// =========================
// MENU MOBILE
// =========================

const hamburger =
document.querySelector(".hamburger");

const navLinks =
document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// =========================
// MODAL
// =========================

const modal =
document.querySelector(".modal");

const openModal =
document.querySelector(".open-modal");

const closeModal =
document.querySelector(".close-modal");

openModal.addEventListener("click", () => {
    modal.classList.add("active");
});

closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});

// =========================
// HERO DÍA / NOCHE
// =========================

const hero = document.getElementById("hero");
const heroToggle = document.getElementById("heroToggle");

if (hero && heroToggle) {
    heroToggle.addEventListener("change", function () {

        hero.classList.toggle("hero-night", this.checked);

    });
}


// =========================
// ETIQUETAS INTERACTIVAS
// =========================

const roomTags =
document.querySelectorAll(".room-tag");

roomTags.forEach((tag) => {

    tag.addEventListener("click", () => {

        const isOpen =
        tag.classList.contains("is-open");

        roomTags.forEach((item) => {
            item.classList.remove("is-open");
            item.setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
            tag.classList.add("is-open");
            tag.setAttribute("aria-expanded", "true");
        }

    });

});

// =========================
// TESTIMONIOS DE CURSOS
// =========================

const courseTestimonials = [
    {
        text:"Aprendí que restaurar no era solamente lijar, sino diseñar.",
        name:"@María Paz",
        avatar:"assets/avatar-martina.svg",
        avatarAlt:"María"
    },
    {
        text:"Me animé a intervenir un mueble familiar y quedó mejor de lo que imaginaba.",
        name:"@Tomás López",
        avatar:"assets/avatar-tomas.svg",
        avatarAlt:"Tomás"
    },
    {
        text:"El curso me dio técnica, criterio y confianza para empezar mis propios proyectos.",
        name:"@Lucia Rodriguez",
        avatar:"assets/avatar-lucia.svg",
        avatarAlt:"Lucía"
    }
];

const courseTestimonialCard =
document.querySelector(".course-testimonial-card");

const courseTestimonialText =
document.querySelector("#courseTestimonialText");

const courseTestimonialName =
document.querySelector("#courseTestimonialName");

const courseTestimonialAvatar =
document.querySelector("#courseTestimonialAvatar");

const courseDots =
document.querySelectorAll(".course-dot");

let currentCourseTestimonial = 0;
let courseTestimonialTimer;

const showCourseTestimonial = (index) => {

    if (!courseTestimonialCard) return;

    currentCourseTestimonial =
    (index + courseTestimonials.length) % courseTestimonials.length;

    courseTestimonialCard.classList.add("is-changing");

    window.setTimeout(() => {

        const testimonial =
        courseTestimonials[currentCourseTestimonial];

        courseTestimonialText.textContent = testimonial.text;
        courseTestimonialName.textContent = testimonial.name;
        courseTestimonialAvatar.src = testimonial.avatar;
        courseTestimonialAvatar.alt = testimonial.avatarAlt;

        courseDots.forEach((dot, dotIndex) => {
            dot.classList.toggle(
                "active",
                dotIndex === currentCourseTestimonial
            );
        });

        courseTestimonialCard.classList.remove("is-changing");
        courseTestimonialCard.classList.add("is-entering");

        requestAnimationFrame(() => {
            courseTestimonialCard.classList.remove("is-entering");
        });

    }, 460);

};

const startCourseTestimonials = () => {

    if (!courseTestimonialCard) return;

    window.clearInterval(courseTestimonialTimer);

    courseTestimonialTimer =
    window.setInterval(() => {
        showCourseTestimonial(currentCourseTestimonial + 1);
    }, 5200);

};

courseDots.forEach((dot) => {

    dot.addEventListener("click", () => {
        showCourseTestimonial(Number(dot.dataset.courseTestimonial));
        startCourseTestimonials();
    });

});

startCourseTestimonials();

// =========================
// FADE IN ON SCROLL
// =========================

const observer =
new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

});

document
.querySelectorAll(".fade-in")
.forEach((el) => observer.observe(el));

// =========================
// SMOOTH SCROLL
// =========================

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener(
        "click",
        function(e){

            e.preventDefault();

            const target =
            document.querySelector(this.getAttribute("href"));

            if (!target) return;

            if (lenis) {
                lenis.scrollTo(target, {
                    offset:-70,
                    duration:1.35,
                    easing:(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            } else {
                target.scrollIntoView({
                    behavior:prefersReducedMotion ? "auto" : "smooth"
                });
            }

        }
    );

});

// =========================
// MOVIMIENTO GLOBAL DE LA WEB
// =========================

if (hasSmoothTools) {
    gsap.utils.toArray(".fade-in").forEach((el) => {
        gsap.fromTo(
            el,
            {
                y:70,
                opacity:0,
                scale:.97
            },
            {
                y:0,
                opacity:1,
                scale:1,
                ease:"power3.out",
                scrollTrigger:{
                    trigger:el,
                    start:"top 88%",
                    end:"top 50%",
                    scrub:.55
                }
            }
        );
    });

    gsap.utils.toArray(".features, .process .container, .reviews, .cta .container").forEach((el, index) => {
        gsap.to(el, {
            yPercent:index % 2 === 0 ? -5 : -3,
            ease:"none",
            scrollTrigger:{
                trigger:el,
                start:"top bottom",
                end:"bottom top",
                scrub:true
            }
        });
    });

    gsap.to(".hero-content", {
        yPercent:18,
        opacity:.45,
        ease:"none",
        scrollTrigger:{
            trigger:".hero",
            start:"top top",
            end:"bottom top",
            scrub:true
        }
    });

    gsap.utils.toArray("section").forEach((section) => {
        gsap.fromTo(
            section,
            { "--section-soft-light":0 },
            {
                "--section-soft-light":1,
                ease:"none",
                scrollTrigger:{
                    trigger:section,
                    start:"top bottom",
                    end:"top center",
                    scrub:true
                }
            }
        );
    });
}

// =========================
// CÍRCULOS EN MOVIMIENTO
// =========================

const audience = document.querySelector(".audience");

if (audience) {
    let animationFrame;

    const moveOrbit = () => {
        const bounds = audience.getBoundingClientRect();
        const availableScroll = audience.offsetHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -bounds.top / availableScroll));
        const leftStart = 140;
        const leftEnd = -50;
        const rightStart = -140;
        const rightEnd = 50;

        audience.style.setProperty(
            "--orbit-spin-left",
            `${leftStart + progress * (leftEnd - leftStart)}deg`
        );
        audience.style.setProperty(
            "--orbit-spin-right",
            `${rightStart + progress * (rightEnd - rightStart)}deg`
        );
        audience.style.setProperty(
            "--orbit-text-opacity",
            Math.min(1, Math.max(0, (progress - .10) / .12))
        );
        audience.style.setProperty(
            "--audience-heading-opacity",
            Math.max(0, 1 - progress * 3.2)
        );
        audience.style.setProperty(
            "--bubble-rise",
            `${progress * -180}px`
        );
        audience.style.setProperty(
            "--bubble-opacity",
            Math.max(0, 1 - progress * 1.35)
        );
        animationFrame = undefined;
    };

    window.addEventListener("scroll", () => {
        if (!animationFrame) animationFrame = requestAnimationFrame(moveOrbit);
    }, { passive:true });

    window.addEventListener("resize", moveOrbit);
    moveOrbit();
}

// =========================
// BENEFICIOS ANIMADOS
// =========================

const scrollBenefits = document.querySelector(".scroll-benefits");

if (scrollBenefits) {
    let benefitsFrame;

    const clamp = (value, min = 0, max = 1) => {
        return Math.min(max, Math.max(min, value));
    };

    const stepProgress = (progress, start, end) => {
        return clamp((progress - start) / (end - start));
    };

    const smoothStep = (value) => {
        const progress = clamp(value);
        return progress * progress * progress * (progress * (progress * 6 - 15) + 10);
    };

    const setCardMotion = (name, progress) => {
        const easedProgress = smoothStep(progress);
        const centerWeight = Math.sin(easedProgress * Math.PI);
        let x = 82 - (easedProgress * 164);
if (name === "one") x += 49;
if (name === "three") x -= 49;
        const y = centerWeight * -38;
        const rotate = 10 - (easedProgress * 20);
        const scale = .92 + (centerWeight * .08);
        const opacity = Math.min(
            clamp(progress / .18),
            clamp((1 - progress) / .22)
        );

        scrollBenefits.style.setProperty(`--card-${name}-x`, `${x}vw`);
        scrollBenefits.style.setProperty(`--card-${name}-y`, `calc(-50% + ${y}px)`);
        scrollBenefits.style.setProperty(`--card-${name}-rotate`, `${rotate}deg`);
        scrollBenefits.style.setProperty(`--card-${name}-scale`, scale);
        scrollBenefits.style.setProperty(`--card-${name}-opacity`, opacity);
    };

    const moveBenefits = () => {
        const bounds = scrollBenefits.getBoundingClientRect();
        const availableScroll = scrollBenefits.offsetHeight - window.innerHeight;
        const progress = clamp(-bounds.top / availableScroll);
        const introExit = smoothStep(stepProgress(progress, .02, .18));
        const cardOne = stepProgress(progress, .055, .43);
        const cardTwo = stepProgress(progress, .205, .58);
        const cardThree = stepProgress(progress, .355, .73);
        const outroEnter = smoothStep(stepProgress(progress, .70, .92));

        scrollBenefits.style.setProperty("--benefit-progress", progress);
        scrollBenefits.style.setProperty("--intro-x", `${introExit * -88}vw`);
        scrollBenefits.style.setProperty("--intro-y", `${introExit * 14}px`);
        scrollBenefits.style.setProperty("--intro-rotate", `${introExit * -6}deg`);
        scrollBenefits.style.setProperty("--intro-opacity", clamp(1 - (introExit * 1.25)));
        scrollBenefits.style.setProperty("--outro-x", `${100 - (outroEnter * 100)}vw`);
        scrollBenefits.style.setProperty("--outro-y", `calc(-50% + ${outroEnter * -18}px)`);
        scrollBenefits.style.setProperty("--outro-rotate", `${7 - (outroEnter * 10)}deg`);
        scrollBenefits.style.setProperty("--outro-scale", 1);
        scrollBenefits.style.setProperty("--outro-opacity", clamp(outroEnter * 1.35));
        scrollBenefits.style.setProperty("--bubbles-y", `${80 - (outroEnter * 120)}px`);
        scrollBenefits.style.setProperty("--bubbles-opacity", clamp(outroEnter * 1.15));

        setCardMotion("one", cardOne);
        setCardMotion("two", cardTwo);
        setCardMotion("three", cardThree);

        benefitsFrame = undefined;
    };

    window.addEventListener("scroll", () => {
        if (!benefitsFrame) benefitsFrame = requestAnimationFrame(moveBenefits);
    }, { passive:true });

    window.addEventListener("resize", moveBenefits);
    moveBenefits();
}

/*====================================================
=            CURSOS
====================================================*/
document
.querySelectorAll(".course-card")
.forEach(card=>{

    const openBtn =
    card.querySelector(".course-card-toggle");

    const closeBtn =
    card.querySelector(".course-card-close");

    if (openBtn) {
        openBtn.addEventListener("click",(e)=>{

            e.stopPropagation();

            card.classList.add("flipped");

        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click",(e)=>{

            e.stopPropagation();

            card.classList.remove("flipped");

        });
    }

});

/*====================================================
=            PROFESORES
====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".teacher-card");

    if (!cards.length) return;

    // Primera abierta
    cards[0].classList.add("active");

    cards.forEach(card => {

        card.addEventListener("click", () => {

            cards.forEach(c => c.classList.remove("active"));

            card.classList.add("active");

        });

    });

});

/*====================================================
=            TARJETAS INTERACTIVAS (CONCEPTOS)
====================================================*/

document.querySelectorAll(".concept-card").forEach(card => {

    card.addEventListener("click", () => {
        card.classList.toggle("active");
    });

});

document.querySelectorAll(".teacher-card").forEach(card=>{

    const image = card.querySelector(".teacher-image");

    if(!image) return;

    card.addEventListener("mousemove",(e)=>{

        if(!card.classList.contains("active")) return;

        const rect = card.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        image.style.transform =
            `scale(1.05) translate(${(x-.5)*20}px, ${(y-.5)*20}px)`;

    });

    card.addEventListener("mouseleave",()=>{

        image.style.transform="scale(1)";

    });

});



/* ============================================
   CARRUSEL TESTIMONIOS
============================================ */

const track = document.querySelector(".slider-track");
const cards = document.querySelectorAll(".testimonial-card");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;

let cardsVisible = getCardsVisible();

let autoplay;


/* ============================================
   RESPONSIVE
============================================ */

function getCardsVisible(){

    if(window.innerWidth <= 768){

        return 1;

    }

    if(window.innerWidth <= 1100){

        return 2;

    }

    return 3;

}


/* ============================================
   CALCULAR ANCHO
============================================ */

function getCardWidth(){

    const card = document.querySelector(".testimonial-card");

    const style = window.getComputedStyle(track);

    const gap = parseFloat(style.columnGap || style.gap);

    return card.offsetWidth + gap;

}


/* ============================================
   MOVER
============================================ */

function updateSlider(){

    cardsVisible = getCardsVisible();

    const maxIndex = cards.length - cardsVisible;

    if(currentIndex > maxIndex){

        currentIndex = maxIndex;

    }

    if(currentIndex < 0){

        currentIndex = 0;

    }

    const move = currentIndex * getCardWidth();

    track.style.transform = `translateX(-${move}px)`;

}


/* ============================================
   SIGUIENTE
============================================ */

function nextSlide(){

    cardsVisible = getCardsVisible();

    const maxIndex = cards.length - cardsVisible;

    currentIndex++;

    if(currentIndex > maxIndex){

        currentIndex = 0;

    }

    updateSlider();

}


/* ============================================
   ANTERIOR
============================================ */

function prevSlide(){

    cardsVisible = getCardsVisible();

    const maxIndex = cards.length - cardsVisible;

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = maxIndex;

    }

    updateSlider();

}


/* ============================================
   BOTONES
============================================ */

nextBtn.addEventListener("click", nextSlide);

prevBtn.addEventListener("click", prevSlide);


/* ============================================
   AUTOPLAY
============================================ */

function startAutoplay(){

    autoplay = setInterval(nextSlide,4000);

}

function stopAutoplay(){

    clearInterval(autoplay);

}

startAutoplay();

document.querySelector(".testimonios").addEventListener("mouseenter",stopAutoplay);

document.querySelector(".testimonios").addEventListener("mouseleave",startAutoplay);


/* ============================================
   SWIPE MOBILE
============================================ */

let startX = 0;

let endX = 0;

const slider = document.querySelector(".slider-container");


slider.addEventListener("touchstart",(e)=>{

    startX = e.touches[0].clientX;

});


slider.addEventListener("touchmove",(e)=>{

    endX = e.touches[0].clientX;

});


slider.addEventListener("touchend",()=>{

    if(startX - endX > 60){

        nextSlide();

    }

    if(endX - startX > 60){

        prevSlide();

    }

});


/* ============================================
   RESIZE
============================================ */

window.addEventListener("resize",updateSlider);


/* ============================================
   INICIO
============================================ */

updateSlider();
