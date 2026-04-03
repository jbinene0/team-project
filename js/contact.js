document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("form-message");
    const submitBtn = this.querySelector("button[type='submit']");

    formMessage.textContent = "";
    formMessage.className = "";

    if (!name || !email || !message) {
        formMessage.textContent = "Please fill in all fields before submitting.";
        formMessage.className = "error";
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
        const response = await fetch("https://formspree.io/f/xeeprkkn", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        if (!response.ok) {
            throw new Error("Submission failed.");
        }

        formMessage.textContent = "Thank you for contacting me! I will reach out to you as soon as possible.";
        formMessage.className = "success";

        this.reset();

    } catch (error) {
        formMessage.textContent = "Something went wrong. Please email me directly at lonpierre25@gmail.com.";
        formMessage.className = "error";
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
    }
});