document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none";
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Sticky Navbar
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(0, 0, 0, 0.9)";
    } else {
      navbar.style.background = "rgba(0, 0, 0, 0.8)";
    }
  });


  // Hamburger Menu Functionality
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');

  hamburgerMenu.addEventListener('click', () => {
      hamburgerMenu.classList.toggle('active');
      navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
          hamburgerMenu.classList.remove('active');
          navLinks.classList.remove('active');
      });
  });
  

  // Menu Filter
  const menuItems = [
    {
      name: "Dish 1",
      category: "sides",
      price: "$10",
      image: "./images/dish-1.jpeg",
      alt: "dish 1 of Noir Cuisine",
    },
    {
      name: "Dish 2",
      category: "sides",
      price: "$20",
      image: "./images/dish-2.jpg",
      alt: "dish 1 of Noir Cuisine ",
    },
    {
      name: "Dish 3",
      category: "sides",
      price: "$8",
      image: "./images/dish-3.jpeg",
      alt: "dish 1 of Noir Cuisine ",
    },
    // Add more menu items here
  ];

  function displayMenuItems(category = "all") {
    const menuContainer = document.querySelector(".menu-items");
    menuContainer.innerHTML = "";

    menuItems.forEach((item) => {
      if (category === "all" || item.category === category) {
        const itemElement = document.createElement("div");
        itemElement.classList.add("menu-item", "fade-in");
        itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.alt}">
                    <h3>${item.name}</h3>
                    <p>${item.price}</p>
                `;
        menuContainer.appendChild(itemElement);
      }
    });
  }

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter-btn.active").classList.remove("active");
      btn.classList.add("active");
      displayMenuItems(btn.dataset.filter);
    });
  });

  // Initialize menu
  displayMenuItems();

  // Reservation Form
  document.getElementById("reservationForm").addEventListener("submit", (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    alert("Reservation submitted successfully!");
  });

  // Testimonial Slider
  const testimonials = [
    { name: "John Doe", text: "Amazing experience!" },
    { name: "Jane Smith", text: "The food was exceptional." },
    // Add more testimonials
  ];

  let currentTestimonial = 0;

  function showTestimonial() {
    const testimonialContainer = document.querySelector(".testimonial-slider");
    const testimonial = testimonials[currentTestimonial];
    testimonialContainer.innerHTML = `
        <div class="testimonial fade-in">
            <p>"${testimonial.text}"</p>
            <h4>- ${testimonial.name}</h4>
        </div>
    `;
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  }

  setInterval(showTestimonial, 5000); // Change testimonial every 5 seconds
  showTestimonial(); // Show first testimonial immediately

  // Gallery Modal
  const gallery = document.querySelector(".gallery-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeLightbox = document.querySelector(".close");

  // Filter functionality
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((btn) => btn.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      gallery.querySelectorAll(".gallery-item").forEach((item) => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Lightbox functionality
  gallery.addEventListener("click", (e) => {
    const clickedItem = e.target.closest(".gallery-item");
    if (clickedItem) {
      const img = clickedItem.querySelector("img");
      const caption = clickedItem.querySelector(".overlay h3").textContent;

      lightboxImg.src = img.src;
      lightboxCaption.textContent = caption;
      lightbox.style.display = "flex";
    }
  });

  closeLightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  // Lazy loading
  const lazyImages = document.querySelectorAll(".gallery-item img");
  const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        lazyImageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => lazyImageObserver.observe(img));

  // Scroll Animations
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function handleScrollAnimations() {
    const elements = document.querySelectorAll(".slide-in, .fade-in");
    elements.forEach((el) => {
      if (isInViewport(el)) {
        el.style.opacity = "1";
        el.style.transform = "translateX(0)";
      }
    });
  }

  window.addEventListener("scroll", handleScrollAnimations);
  window.addEventListener("load", handleScrollAnimations);

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  // Contact Form
  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    alert("Message sent successfully!");
  });

  // Google Maps Integration
  function initMap() {
    const restaurantLocation = { lat: 40.7128, lng: -74.006 }; // Replace with actual coordinates
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: restaurantLocation,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        // Add more styles to make the map match your theme
      ],
    });
    new google.maps.Marker({
      position: restaurantLocation,
      map: map,
      title: "Noir Restaurant",
    });
  }

  // Load Google Maps API
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
  script.async = true;
  document.head.appendChild(script);

//   initMap();

  // Blog Posts
  const blogPosts = [
    {
      title: "The Art of Plating in the Dark",
      excerpt: "Discover how our chefs create visually stunning dishes...",
    },
    {
      title: "Wine Pairing: A Sensory Experience",
      excerpt: "Learn about our unique approach to wine pairing...",
    },
    // Add more blog posts
  ];

  function displayBlogPosts() {
    const blogContainer = document.querySelector(".blog-posts");
    blogPosts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("blog-post", "fade-in");
      postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="#" class="read-more">Read More</a>
            `;
      blogContainer.appendChild(postElement);
    });
  }

  displayBlogPosts();

  // Parallax Effect
  window.addEventListener("scroll", () => {
    const parallaxElements = document.querySelectorAll(".parallax");
    parallaxElements.forEach((el) => {
      const speed = el.dataset.speed;
      el.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
  });

  // Event Countdown Timer
  function updateCountdown() {
    const countdownElement = document.getElementById("eventCountdown");
    const eventDate = new Date("2023-12-31T23:59:59").getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
      clearInterval(countdownInterval);
      countdownElement.innerHTML = "Event has started!";
    }
  }

  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown(); // Initial call

  // Performance Optimization
  document.addEventListener("DOMContentLoaded", () => {
    // Lazy load images
    const lazyImages = document.querySelectorAll("img[data-src]");
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          lazyImageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => lazyImageObserver.observe(img));
  });

  // Accessibility Enhancements
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  focusableElements.forEach((el) => {
    el.addEventListener("focus", () => {
      el.style.outline = "2px solid #ffffff";
    });
    el.addEventListener("blur", () => {
      el.style.outline = "none";
    });
  });

  // Add ARIA labels to improve screen reader experience
  document.querySelectorAll("nav a, button").forEach((el) => {
    if (!el.getAttribute("aria-label")) {
      el.setAttribute("aria-label", el.textContent);
    }
  });
});

