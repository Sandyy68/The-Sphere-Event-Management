console.log("It works!");
document.addEventListener("DOMContentLoaded", function () {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector(".menu-btn");
    const navigation = document.querySelector(".navigation");
    if (menuBtn && navigation) {
        menuBtn.addEventListener("click", () => {
            menuBtn.classList.toggle("active");
            navigation.classList.toggle("active");
        });
    }

    // Carousel Logic
    const btns = document.querySelectorAll(".nav-btn");
    const slides = document.querySelectorAll(".video-slide");
    const contents = document.querySelectorAll(".content");
    const readMoreButtons = document.querySelectorAll(".content a");
    const pauseBtn = document.getElementById("pauseBtn");

    if (btns.length === 0 || slides.length === 0) {
        console.error("Carousel elements not found.");
        return;
    }

    let currentSlide = 0;
    let autoSlideInterval = null;
    let isPlaying = true;

    function sliderNav(index) {
        btns.forEach(btn => btn.classList.remove("active"));
        slides.forEach(slide => slide.classList.remove("active"));
        contents.forEach(content => content.classList.remove("active"));

        btns[index].classList.add("active");
        slides[index].classList.add("active");
        contents[index].classList.add("active");

        const blogPostIds = ["anyma-residency", "sphere-experience", "dead-company", "u2-concert", "eagles-experience"];
        readMoreButtons.forEach(button => {
            button.href = `blog.html#${blogPostIds[index]}`;
        });
    }

    function startAutoSlide() {
        if (!autoSlideInterval) {
            autoSlideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                sliderNav(currentSlide);
            }, 5000);
        }
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }

    function resetAutoSlide() {
        stopAutoSlide();
        if (isPlaying) startAutoSlide();
    }

    sliderNav(currentSlide);
    startAutoSlide();

    btns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            currentSlide = i;
            sliderNav(currentSlide);
            resetAutoSlide();
        });
    });

    if (pauseBtn) {
        pauseBtn.addEventListener("click", () => {
            isPlaying = !isPlaying;

            if (isPlaying) {
                startAutoSlide();
                document.querySelector(".video-slide.active")?.play();
                pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                stopAutoSlide();
                document.querySelector(".video-slide.active")?.pause();
                pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }

    // Smooth Scroll for Blog
    if (window.location.hash) {
        document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'smooth' });
    }

    // Accordion
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            accordionItem.classList.toggle('active');
        });
    });

  // Newsletter Modal
function openNewsletter() {
    document.getElementById('newsletterModal').style.display = 'block';
}

function closeNewsletter() {
    document.getElementById('newsletterModal').style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('newsletterModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Form Submission
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const emailInput = newsletterForm.querySelector("input[type='email']");
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailValue)) {
            alert("Please enter a valid email address.");
            return;
        }

        alert('Thank you for subscribing!');
        emailInput.value = ""; // Clear the input field
        closeNewsletter(); // Close the modal if it's open
    });
}

// Redirect to Newsletter Page
function openNewsletterPage() {
    window.location.href = "newsletter.html"; // Redirect to the newsletter page
}
});

// Newsletter Button Functionality
function openNewsletter() {
    // Redirect to the newsletter page or open a modal
    window.location.href = "newsletter.html"; // Update with your newsletter page URL
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const submitBtn = document.querySelector('.submit-btn');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const formData = new FormData(contactForm);

    try {
        const response = await fetch('submit_contact.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.status === 'success') {
            showMessage(result.message, 'success');
            contactForm.reset();
        } else {
            showMessage(result.message, 'error');
        }
    } catch (error) {
        showMessage('Network error. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});

function showMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = text;

    contactForm.parentNode.insertBefore(messageDiv, contactForm);

    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}
