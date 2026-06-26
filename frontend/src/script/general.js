// --- 3. HIRE ME BUTTON INTERACTION ---
        const hireBtn = document.querySelector(".hire-btn");
        const contactSection = document.querySelector("#contact");

        if (hireBtn && contactSection) {
          hireBtn.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Get header height to offset scroll position perfectly
            const headerHeight = document.querySelector(".header").offsetHeight;
            const targetPosition = contactSection.offsetTop - headerHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth"
            });

            // Visually activate the "Contact" link in the navbar
            navItems.forEach((nav) => nav.classList.remove("active"));
            const contactNavLink = document.querySelector('.nav-links a[href="#contact"]');
            if (contactNavLink) {
              contactNavLink.classList.add("active");
            }

            // Update URL hash smoothly
            history.pushState(null, null, "#contact");
          });
        }


document.addEventListener("DOMContentLoaded", () => {
        const sections = document.querySelectorAll("main section");
        const navItems = document.querySelectorAll(".nav-links .nav-item");

        // --- 1. HANDLE ACTIVE LINK ON SCROLL (Intersection Observer) ---
        const observerOptions = {
          root: null, // uses the viewport
          rootMargin: "-30% 0px -60% 0px", // triggers when a section occupies the main viewing area
          threshold: 0
        };

        const observerCallback = (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const activeId = entry.target.getAttribute("id");
              
              // Remove active class from all items, add to current visible section link
              navItems.forEach((item) => {
                item.classList.remove("active");
                if (item.getAttribute("href") === `#${activeId}`) {
                  item.classList.add("active");
                }
              });
            }
          });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach((section) => observer.observe(section));


        // --- 2. SMOOTH CLICK NAVIGATION CORRECTION ---
        navItems.forEach((item) => {
          item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = item.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
              // Get header height to offset scroll position perfectly
              const headerHeight = document.querySelector(".header").offsetHeight;
              const targetPosition = targetSection.offsetTop - headerHeight;

              window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
              });

              // Instantly update active class on click manually
              navItems.forEach((nav) => nav.classList.remove("active"));
              item.classList.add("active");

              // Optional: Update URL hash smoothly without breaking page snap
              history.pushState(null, null, targetId);
            }
          });
        });
      });