let sliderSection = document.querySelector(".slider");
let loginSection = document.querySelector(".login");
let slideItems = document.querySelectorAll(".slide-item");
let subLine = document.getElementById("Sub_line");
let itemCounts = document.querySelectorAll(".item-count");
let currentIndex = 0;

// Function to show the current slide based on the index
const showSlide = (index) => {
    if (index >= slideItems.length) {
        // Hide the slider section when reaching beyond the last slide
        sliderSection.style.display = "none";
        loginSection.style.display = "flex"; // Show the login section
        return;
    }

    // Update slide display
    slideItems.forEach((slide, i) => {
        slide.classList.toggle("disActive", i === index);
        slide.classList.toggle("disNone", i !== index);
    });

    // Update the subtitle based on the current slide
    switch (index) {
        case 0:
            subLine.innerHTML = "Always give people more than what they expect to get.";
            break;
        case 1:
            subLine.innerHTML = "Add this to your cart and enjoy a delightful shopping experience!";
            break;
        case 2:
            subLine.innerHTML = "Let’s Make It Yours!";
            break;
    }

    // Update item count visibility
    itemCounts.forEach((count, i) => {
        count.classList.toggle("item_width_entence", i === index);
        count.classList.toggle("item_width_none", i !== index);
    });
};

// Function to go to the next slide
const nextSlide = () => {
    if (currentIndex < slideItems.length - 1) {
        currentIndex++;
        showSlide(currentIndex);
    } else {
        // Hide slider if on the last slide
        sliderSection.style.display = "none";
        loginSection.style.display = "flex"; // Show the login section
    }
};

// Function to go to the previous slide
const previousSlide = () => {
    if (currentIndex > 0) {
        currentIndex--;
        showSlide(currentIndex);
    }
};

// Swipe handling for mobile devices
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50; // Minimum distance in pixels to be considered a swipe

const handleTouchStart = (event) => {
    touchStartX = event.changedTouches[0].clientX;
};

const handleTouchEnd = (event) => {
    touchEndX = event.changedTouches[0].clientX;
    let swipeDistance = touchEndX - touchStartX;

    if (swipeDistance < -swipeThreshold) {
        // Swipe left to move to the next slide
        nextSlide();
    } else if (swipeDistance > swipeThreshold) {
        // Swipe right to move to the previous slide
        previousSlide();
    }
};

// Show the slider section when the page loads
sliderSection.style.display = "flex"; // Unhide the slider section
loginSection.style.display = "none"; // Initially hide the login section

// Event listeners for swiping
sliderSection.addEventListener("touchstart", handleTouchStart);
sliderSection.addEventListener("touchend", handleTouchEnd);

// Handle back button click to reset the slider
document.querySelector(".back_slider").addEventListener("click", () => {
    // Reset index and display the first slide
    currentIndex = 0;
    sliderSection.style.display = "flex"; // Show slider again
    loginSection.style.display = "none"; // Hide login section
    showSlide(currentIndex); // Show the first slide
});

// Initial setup to show the first item
showSlide(currentIndex);
