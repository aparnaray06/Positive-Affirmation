
// Get all generate buttons
const buttons = document.querySelectorAll(".generate-btn");


// Generate content using backend API
async function generateContent(type, button) {

    // Find the correct paragraph
    const element = document.getElementById(
        type === "tip-of-the-day" ? "tip" : type
    );

    // Save original button text
    const originalText = button.innerHTML;

    try {

        // Show loading state
        button.disabled = true;
        button.innerHTML = "Generating... ✨";

        element.innerText = "Please wait! Gemini AI is thinking...";

        // Send request to Express backend
        const response = await fetch(`/${type}`);

        const data = await response.json();

        // Handle API errors
        if (!response.ok) {
            throw new Error(
                data.error || "Something went wrong!"
            );
        }

        // Display generated content
        if (type === "joke") {
            element.innerText = data.joke;
        }

        else if (type === "motivation") {
            element.innerText = data.motivation;
        }

        else if (type === "tip-of-the-day") {
            element.innerText = data.tip;
        }

    }

    catch (error) {

        console.error("Error:", error);

        element.innerText =
            "Oops! Something went wrong. Please try again.";

    }

    finally {

        // Restore button
        button.disabled = false;
        button.innerHTML = originalText;

    }

}


// Add click events to all buttons
buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const type = button.dataset.type;

        generateContent(type, button);

    });

});
