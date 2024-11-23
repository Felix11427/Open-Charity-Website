// Accordion Toggle for Charity Section
// Open and close the accordions with a smooth transition, and toggle the symbol between "+" and "-"
const charityAccordions = document.querySelectorAll(".charity-accordion");
charityAccordions.forEach(accordion => {
    accordion.addEventListener("click", function () {
        this.classList.toggle("active"); // Toggle the active class for the accordion
        const content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null; // Close the accordion
        } else {
            content.style.maxHeight = content.scrollHeight + "px"; // Open the accordion
        }
    });
});

// Toggle Calculator Visibility
// This toggles the visibility of the calculator when the button is clicked
const toggleCalculatorButton = document.querySelector('#toggleCalculatorBtn');
const calculatorWrapper = document.querySelector('#calculator-container');

calculatorWrapper.style.display = 'none'; // Initially hide the calculator

toggleCalculatorButton.addEventListener('click', () => {
    // Toggle display of the calculator
    calculatorWrapper.style.display = (calculatorWrapper.style.display === 'none') ? 'block' : 'none';
});

// Calculator Functionality
// Number button functionality and screen updates
const numberButtons = document.querySelectorAll('.number-button');
const resultButton = document.querySelector('.equal-button');
const clearButton = document.querySelector('.clear-button');
const displayScreen = document.querySelector('.calculator-screen');

// Update the screen with clicked number or operator
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.getAttribute('data-value');
        displayScreen.value += number;
    });
});

// Evaluate the expression on pressing "=" button
resultButton.addEventListener('click', () => {
    if (displayScreen.value === '') {
        displayScreen.value = '0';
    } else {
        try {
            displayScreen.value = eval(displayScreen.value);
        } catch (error) {
            displayScreen.value = 'Error'; // Handle invalid expression
        }
    }
});

// Clear the calculator screen
clearButton.addEventListener('click', () => {
    displayScreen.value = '';
});

// Calculator Dragging Functionality
// Dragging functionality for the calculator container
enableDrag(document.getElementById("calculator-container"));

function enableDrag(element) {
    let startX = 0, startY = 0, currentX = 0, currentY = 0;

    const dragHeader = element.querySelector('.drag-header') || element; // If no specific header, drag the whole element
    dragHeader.addEventListener("mousedown", dragStart);

    function dragStart(e) {
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("mousemove", dragMove);
    }

    function dragMove(e) {
        e.preventDefault();
        currentX = startX - e.clientX;
        currentY = startY - e.clientY;
        startX = e.clientX;
        startY = e.clientY;

        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDrag() {
        document.removeEventListener("mouseup", stopDrag);
        document.removeEventListener("mousemove", dragMove);
    }
}
