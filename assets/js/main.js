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
   HOME PAGE COMMENT & REVIEW SUBMISSION SYSTEM
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function () {
  const reviewForm = document.getElementById("reviewForm");
  const reviewsGrid = document.getElementById("reviewsGrid");

  if (reviewForm && reviewsGrid) {
    // Load existing reviews from localStorage
    loadLocalReviews();

    reviewForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("reviewerName").value.trim();
      const ratingVal = parseInt(document.getElementById("reviewerRating").value);
      const comment = document.getElementById("reviewerComment").value.trim();

      if (!name || !comment) return;

      const starsText = "⭐".repeat(ratingVal);

      const newReview = {
        name: name,
        stars: starsText,
        comment: comment,
      
      };

      // Save to local storage array
      saveReviewLocally(newReview);

      // Prepend review to UI
      renderReviewCard(newReview, true);

      // Reset form
      reviewForm.reset();

      // Alert user
      if (typeof Swal !== "undefined") {
        Swal.fire({
          title: "Thank You!",
          text: "Your review has been published on our homepage.",
          icon: "success",
          confirmButtonColor: "#d4af37",
          background: "#0b0e14",
          color: "#ffffff"
        });
      } else {
        alert("Thank you! Your review has been published.");
      }
    });
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
   
    `;

    if (isNew) {
      reviewsGrid.prepend(card);
    } else {
      reviewsGrid.appendChild(card);
    }
  }

  function saveReviewLocally(review) {
    let reviews = JSON.parse(localStorage.getItem("nuraan_reviews") || "[]");
    reviews.unshift(review);
    localStorage.setItem("nuraan_reviews", JSON.stringify(reviews));
  }

  function loadLocalReviews() {
    let reviews = JSON.parse(localStorage.getItem("nuraan_reviews") || "[]");
    reviews.forEach((rev) => renderReviewCard(rev, false));
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
});