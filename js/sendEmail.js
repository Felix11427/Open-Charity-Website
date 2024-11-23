// Function to handle sending emails using EmailJS
function sendEmail(userName, userEmail, userMessage) {
    // Sends email with user details and message content
    emailjs.send("gmail", "first_template", {
        "from_name": userName,
        "from_email": userEmail,
        "message_body": userMessage,
    })
    .then(
        // Callback for successful email sending
        function (response) {
            let contactForm = document.getElementById("contact_form");
            contactForm.innerHTML = "<h2>Thank you for reaching out! Your message has been sent successfully.</h2>";
        },
        // Callback for email sending failure
        function (error) {
            let contactForm = document.getElementById("contact_form");
            contactForm.innerHTML = "<h2>Oops! Something went wrong while sending your message. Please try again later.</h2>";
        }
    );
    return false;
}

// Executes on page load
window.onload = function () {
    const submitButton = document.querySelector('#submitBtn');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#contactMessage');

    submitButton.addEventListener('click', validateAndSend);

    // Validates input fields and triggers the email sending process
    function validateAndSend() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Alerts users if required fields are empty
        if (!name) {
            alert('Please enter your name.');
        } else if (!email) {
            alert('Please enter your email address.');
        } else if (!message) {
            alert('Please enter your message.');
        } else {
            // Sends the email if all fields are filled
            sendEmail(name, email, message);
        }
    }
};
