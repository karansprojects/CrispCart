// Select DOM elements
let loginSection = document.querySelector(".login");
let sliderSection = document.querySelector(".slider");
let slideItems = document.querySelectorAll(".slide-item");
let subLine = document.getElementById("index-Sub_line");
let itemCounts = document.querySelectorAll(".item-count");
let currentIndex = 0;

// Function to show the current slide and update the subtitle
const showSlide = (index) => {
    // Hide the slider and show the login section if all slides have been shown
    if (index >= slideItems.length) {
        sliderSection.style.display = "none";
        loginSection.style.display = "flex";
        return; // Exit the function if we switched to the login section
    }

    // Update slide visibility
    slideItems.forEach((slide, i) => {
        slide.classList.toggle("disActive", i === index);
        slide.classList.toggle("disNone", i !== index);
    });

    // Update item counts visibility
    itemCounts.forEach((count, i) => {
        count.classList.toggle("item_width_entence", i === index);
        count.classList.toggle("item_width_none", i !== index);
    });

    // Update subtitle text based on the slide index
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
        default:
            subLine.innerHTML = ""; // Clear text if needed
            break;
    }
};

// Function to go to the next slide
const nextSlide = () => {
    currentIndex++;
    if (currentIndex >= slideItems.length) {
        // If the last slide is reached, transition to the login section
        sliderSection.style.display = "none"; // Hide the slider section
        loginSection.style.display = "flex"; // Show the login section
        return; // Exit the function
    }
    showSlide(currentIndex);
};

// Touch swipe functionality
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50;

const handleTouchStart = (event) => {
    touchStartX = event.changedTouches[0].clientX;
};

const handleTouchEnd = (event) => {
    touchEndX = event.changedTouches[0].clientX;
    let swipeDistance = touchEndX - touchStartX;

    if (swipeDistance < -swipeThreshold) {
        nextSlide(); // Swipe left
    } else if (swipeDistance > swipeThreshold) {
        currentIndex--; // Swipe right
        if (currentIndex < 0) {
            currentIndex = 0; // Prevent going back beyond the first slide
        }
        showSlide(currentIndex);
    }
};

// Set up initial display state
sliderSection.style.display = "flex"; 
loginSection.style.display = "none"; 
showSlide(currentIndex); // Show the initial slide

// Add event listeners for slider navigation
document.addEventListener("DOMContentLoaded", () => {
    // Initially show the first slide
    showSlide(currentIndex);

    // Add event listeners to item counts for navigation
    itemCounts.forEach((count, index) => {
        count.addEventListener('click', () => {
            currentIndex = index; // Change index based on clicked item
            showSlide(currentIndex);
        });
    });

    // Touch event listeners
    sliderSection.addEventListener("touchstart", handleTouchStart);
    sliderSection.addEventListener("touchend", handleTouchEnd);

    // Back button listener for returning to slider
    document.querySelector(".back_slider").addEventListener("click", () => {
        currentIndex = 0;
        sliderSection.style.display = "flex"; 
        loginSection.style.display = "none"; 
        showSlide(currentIndex); 
    });
});

// Extra functionality for opening a section (e.g., for a name-gathering section)
let opnerName = document.getElementById("openNameGattingOpner");
let openNameGattingSection = document.getElementById("openNameGattingSection");

opnerName.addEventListener("click", () => {
    openNameGattingSection.style.display = "flex"; // Show the name-gathering section
});
