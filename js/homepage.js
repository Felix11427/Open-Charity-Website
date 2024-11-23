// Toggle 'Read More' and 'Read Less' text visibility
const toggleTextVisibility = (buttonId, textId, dotsId) => {
    const readMoreBtn = document.querySelector(buttonId);
    const textBlock = document.querySelector(textId);
    const dots = document.querySelector(dotsId);

    textBlock.style.display = 'none';

    readMoreBtn.addEventListener('click', () => {
        if (textBlock.style.display === 'none') {
            dots.style.display = 'none';
            textBlock.style.display = 'block';
            readMoreBtn.innerText = 'Read Less';
        } else {
            dots.style.display = 'inline';
            textBlock.style.display = 'none';
            readMoreBtn.innerText = 'Read More';
        }
    });
};

// Apply the 'Read More' functionality to different sections
toggleTextVisibility('#readBtn1', '#more1', '#dots1');
toggleTextVisibility('#readBtn2', '#more2', '#dots2');

// Text Animation on Page Load
const animatedText = document.getElementById("textEffect");

window.addEventListener("DOMContentLoaded", () => {
    animatedText.style.marginLeft = '20px';
    animatedText.style.transition = '1s ease-in-out';
});

// Fade-in Sections on Scroll
const fadeInSections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
    fadeInSections.forEach(section => {
        const sectionRect = section.getBoundingClientRect();
        if (window.scrollY >= sectionRect.bottom) {
            section.style.opacity = "1";
            section.style.transform = "translateX(0)";
            section.style.transition = "1s ease-in-out";
        } else {
            section.style.opacity = "0";
            section.style.transform = "translateX(-20px)";
            section.style.transition = "1s ease-in-out";
        }
    });
});

// Death Counter (Estimated)
const deathCounter = document.getElementById("counter");
const deathEstimate = document.getElementById("death");

let minutesElapsed = 0;
let secondsElapsed = 0;
let deathCount = 0;

// Update the counter every second
function updateCounter() {
    deathCounter.innerHTML = `<p>You've been here for <span class='blue-seconds'>${minutesElapsed}:${secondsElapsed}</span> minutes.</p>`;
    deathEstimate.innerHTML = `<p>Estimated number of people that passed away: <span class='red-count'>${deathCount}</span></p>`;

    secondsElapsed++;
    deathCount += 2;  // Increment death estimate by 2 every second

    if (secondsElapsed % 60 === 0) {
        secondsElapsed = 0;
        minutesElapsed++;
        if (minutesElapsed < 10) {
            minutesElapsed = `0${minutesElapsed}`;
        }
    }

    if (secondsElapsed < 10) {
        secondsElapsed = `0${secondsElapsed}`;
    }
}

// Start the timer and update every second
setInterval(updateCounter, 1000);
