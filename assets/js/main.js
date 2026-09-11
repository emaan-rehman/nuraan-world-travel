document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const menuIcon = document.getElementById("menuIcon");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      navMenu.classList.toggle("active");

      // Toggle icon between bars and X
      if (menuIcon) {
        if (navMenu.classList.contains("active")) {
          menuIcon.classList.remove("fa-bars");
          menuIcon.classList.add("fa-xmark");
        } else {
          menuIcon.classList.remove("fa-xmark");
          menuIcon.classList.add("fa-bars");
        }
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove("active");
        if (menuIcon) {
          menuIcon.classList.remove("fa-xmark");
          menuIcon.classList.add("fa-bars");
        }
      }
    });

    // Close menu when clicking a navigation link
    const navLinks = navMenu.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        if (menuIcon) {
          menuIcon.classList.remove("fa-xmark");
          menuIcon.classList.add("fa-bars");
        }
      });
    });
  }
});