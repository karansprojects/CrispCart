let sliderSection = document.querySelector(".slider");
let slideItems = document.querySelectorAll(".slide-item");
let indicators = document.querySelectorAll(".item-count");
let subLine = document.getElementById("Sub_line");
let currentIndex = 0;

// Function to show the current slide based on the index
const showSlide = (index) => {
    if (index >= slideItems.length) {
        // Hide the slider section when reaching beyond the last slide
        sliderSection.style.display = "none";
        return;
    }

    // Update slide display
    slideItems.forEach((slide, i) => {
        slide.classList.toggle("disActive", i === index);
        slide.classList.toggle("disNone", i !== index);
    });

    // Update indicator display
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle("item_width_entence", i === index);
        indicator.classList.toggle("item_width_none", i !== index);
    });

    // Update the subtitle based on the current slide
    switch (index) {
        case 0:
            subLine.innerHTML = "Always give people more than what they expect to get.";
            break;
        case 1:
            subLine.innerHTML = "Ready to treat yourself? Add this to your cart and enjoy a delightful shopping experience!";
            break;
        case 2:
            subLine.innerHTML = "Let’s Make It Yours!";
            break;
    }
};

// Initial setup to show the first item
showSlide(currentIndex);

// Function to go to the next or previous slide
const nextSlide = () => {
    if (currentIndex < slideItems.length - 1) {
        currentIndex++;
        showSlide(currentIndex);
    } else {
        // Hide slider if on the last slide
        sliderSection.style.display = "none";
    }
};

const previousSlide = () => {
    if (currentIndex > 0) {
        currentIndex--;
        showSlide(currentIndex);
    }
};

// Improved swipe handling for mobile devices
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50; // Minimum distance in pixels to be considered a swipe

const handleTouchStart = (event) => {
    touchStartX = event.changedTouches[0].clientX;
};

const handleTouchEnd = (event) => {
    touchEndX = event.changedTouches[0].clientX;

    // Calculate swipe distance and determine direction
    let swipeDistance = touchEndX - touchStartX;

    if (swipeDistance < -swipeThreshold) {
        // Swipe left to move to the next slide
        nextSlide();
    } else if (swipeDistance > swipeThreshold) {
        // Swipe right to move to the previous slide
        previousSlide();
    }
};

// Event listeners for swiping/
sliderSection.addEventListener("touchstart", handleTouchStart);
sliderSection.addEventListener("touchend", handleTouchEnd);
