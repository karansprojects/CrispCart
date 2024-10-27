let sliderSection = document.querySelector(".slider");
let slideItems = document.querySelectorAll(".slide-item");
let indicators = document.querySelectorAll(".item-count");
let subLine = document.getElementById("Sub_line");
let nextButton = document.getElementById("slide_button");
let currentIndex = 0;

// Function to show slides based on the current index
const showSlide = (index) => {
    slideItems.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add("disActive"); // Show the current slide
        } else {
            slide.classList.remove("disActive"); // Hide other slides
        }
    });

    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.remove("item_width_none");
            indicator.classList.add("item_width_entence");
        } else {
            indicator.classList.add("item_width_none");
            indicator.classList.remove("item_width_entence");
        }
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
            subLine.innerHTML = "<br>" + "Let’s Make It Yours!" + "<br>" ;
            break;
    }
};

// Initial setup to show the first item
showSlide(currentIndex);

// Function to handle slide transition
const goToNextSlide = () => {
    currentIndex++;
    if (currentIndex >= slideItems.length) {
        // If swiped past the last slide, hide the slider section
        sliderSection.style.display = "none"; // Hide the slider section
    } else {
        showSlide(currentIndex);
    }
};

// Event listener for the next button
nextButton.addEventListener("click", goToNextSlide);

// Function to handle swipe logic
const handleSwipe = () => {
    if (endX < startX - 50) {
        // Swipe left
        goToNextSlide();
    } else if (endX > startX + 50) {
        // Swipe right
        if (currentIndex > 0) {
            currentIndex--;
            showSlide(currentIndex);
        }
    }
};

// Variables to track swipe
let startX = 0;
let endX = 0;

// Event listeners for touch events
sliderSection.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

sliderSection.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
});

sliderSection.addEventListener("touchend", handleSwipe);
