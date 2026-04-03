document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Save to localStorage (requirement)
    const formData = { name, email, message };
    localStorage.setItem("contactData", JSON.stringify(formData));

    try {
        // Fetch JSON message
        const response = await fetch("./data/message.json");
        const data = await response.json();

        // Display message
        const messageBox = document.getElementById("form-message");
        messageBox.textContent = data.successMessage;

        // Optional: clear form
        document.getElementById("contactForm").reset();

    } catch (error) {
        console.error("Error loading message:", error);
    }
});