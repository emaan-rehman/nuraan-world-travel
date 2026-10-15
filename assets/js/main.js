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
/* ==========================================================================
   GLOBAL CLOUDFLARE D1 COMMENT & REVIEW SYSTEM
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function () {
  const WORKER_API_URL = "https://nuraan-reviews-api.fly2worldtravels.workers.dev/"; 
  const reviewForm = document.getElementById("reviewForm");
  const reviewsGrid = document.getElementById("reviewsGrid");

  if (reviewForm && reviewsGrid) {
    // Fetch global reviews from Cloudflare D1
    loadGlobalReviews();

    reviewForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("reviewerName").value.trim();
      const ratingVal = parseInt(document.getElementById("reviewerRating").value);
      const comment = document.getElementById("reviewerComment").value.trim();

      if (!name || !comment) return;

      const starsText = "⭐".repeat(ratingVal);
      const currentDate = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      const newReview = {
        name: name,
        stars: starsText,
        comment: comment,
        date: currentDate
      };

      try {
        const response = await fetch(WORKER_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReview)
        });

        if (response.ok) {
          renderReviewCard(newReview, true);
          reviewForm.reset();

          if (typeof Swal !== "undefined") {
            Swal.fire({
              title: "Thank You!",
              text: "Your review has been published globally on our homepage.",
              icon: "success",
              confirmButtonColor: "#d4af37",
              background: "#0b0e14",
              color: "#ffffff"
            });
          }
        }
      } catch (err) {
        console.error("Failed to post review:", err);
      }
    });
  }

  async function loadGlobalReviews() {
    try {
      const response = await fetch(WORKER_API_URL);
      if (!response.ok) return;

      const reviews = await response.json();
      reviewsGrid.innerHTML = ""; // Clear loader/defaults

      reviews.forEach((rev) => renderReviewCard(rev, false));
    } catch (err) {
      console.error("Failed to load reviews:", err);
    }
  }

  function renderReviewCard(review, isNew = false) {
    const card = document.createElement("div");
    card.className = "step-card review-card";
    card.innerHTML = `
      <div class="review-header">
        <span class="reviewer-author">${escapeHtml(review.name)}</span>
        <span class="review-stars">${review.stars}</span>
      </div>
      <p class="step-desc">"${escapeHtml(review.comment)}"</p>
      <span class="review-date">${review.date}</span>
    `;

    if (isNew) {
      reviewsGrid.prepend(card);
    } else {
      reviewsGrid.appendChild(card);
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
});