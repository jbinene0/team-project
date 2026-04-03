console.log("JS IS RUNNING");

document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    console.log("FORM SUBMITTED");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const formData = { name, email, message };
    localStorage.setItem("contactData", JSON.stringify(formData));

    try {
        const response = await fetch("./data/message.json");
        const data = await response.json();

        document.getElementById("form-message").textContent = data.successMessage;

        document.getElementById("contactForm").reset();

    } catch (error) {
        console.error("Error loading message:", error);
    }
});