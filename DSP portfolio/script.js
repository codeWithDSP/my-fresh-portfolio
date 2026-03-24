document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector("#menu-icon");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar a");
  const sections = document.querySelectorAll("main section[id]");
  const header = document.querySelector(".header");

  // Mobile Menu Toggle
  const toggleMenu = () => {
    menuButton?.classList.toggle("active");
    navbar?.classList.toggle("active");
  };

  const closeMenu = () => {
    menuButton?.classList.remove("active");
    navbar?.classList.remove("active");
  };

  menuButton?.addEventListener("click", toggleMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  // Handle Scroll Events (Active Link & Header Style)
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Header styling on scroll
    if (scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Active link highlighting
    let currentId = "";
    sections.forEach((sec) => {
      const offsetTop = sec.offsetTop - 120;
      const offsetHeight = sec.offsetHeight;
      if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
        currentId = sec.id;
      }
    });

    if (currentId) {
      navLinks.forEach((a) => a.classList.remove("active"));
      document
        .querySelector(`.navbar a[href="#${currentId}"]`)
        ?.classList.add("active");
    }
  };

  handleScroll(); // Init on load
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        
        // Handle skill bars animation
        const skillBars = entry.target.querySelectorAll('.skill-fill');
        skillBars.forEach(bar => {
          const progress = bar.getAttribute('data-progress');
          if(progress) {
            bar.style.width = progress;
          }
        });

        // Unobserve after animating once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const hiddenElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right, .reveal-scale");
  hiddenElements.forEach((el) => observer.observe(el));

  // --- Contact Form Handling ---
  // Currently allowing native HTML form submission to ensure formsubmit.co completes its initial activation redirect.
});
