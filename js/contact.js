// --- Validation helpers ---
import "./nav.js";

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}-error`);
    field.classList.add("invalid");
    field.classList.remove("valid");
    errorEl.textContent = message;
}

function showValid(fieldId) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}-error`);
    field.classList.remove("invalid");
    field.classList.add("valid");
    errorEl.textContent = "";
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(name, email, message) {
    let valid = true;

    if (name.length < 2) {
        showError("name", "Please enter your full name (at least 2 characters).");
        valid = false;
    } else {
        showValid("name");
    }

    if (!isValidEmail(email)) {
        showError("email", "Please enter a valid email address.");
        valid = false;
    } else {
        showValid("email");
    }

    if (message.length < 20) {
        showError("message", `Message is too short (${message.length}/20 characters minimum).`);
        valid = false;
    } else {
        showValid("message");
    }

    return valid;
}

// --- Live validation on blur ---

["name", "email", "message"].forEach(id => {
    const field = document.getElementById(id);
    field.addEventListener("blur", () => {
        const val = field.value.trim();
        if (id === "name") {
            val.length < 2
                ? showError("name", "Please enter your full name (at least 2 characters).")
                : showValid("name");
        }
        if (id === "email") {
            !isValidEmail(val)
                ? showError("email", "Please enter a valid email address.")
                : showValid("email");
        }
        if (id === "message") {
            val.length < 20
                ? showError("message", `Message is too short (${val.length}/20 characters minimum).`)
                : showValid("message");
        }
    });
});

// --- Form submission ---

document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("form-message");
    const submitBtn = this.querySelector("button[type='submit']");

    formMessage.textContent = "";
    formMessage.className = "";

    if (!validateForm(name, email, message)) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
        const response = await fetch("https://formspree.io/f/xeeprkkn", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        if (!response.ok) throw new Error("Submission failed.");

        formMessage.textContent = "Thank you for contacting me! I will reach out to you as soon as possible.";

        // Save visitor name for personalised greeting on home page
        localStorage.setItem("visitorName", name);
        formMessage.className = "success";

        ["name", "email", "message"].forEach(id => {
            document.getElementById(id).classList.remove("valid", "invalid");
            document.getElementById(`${id}-error`).textContent = "";
        });

        this.reset();

    } catch (error) {
        formMessage.textContent = "Something went wrong. Please email me directly at lonpierre25@gmail.com.";
        formMessage.className = "error";
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
    }
});

// --- Save visitor name to localStorage on successful submit ---
// (already handled inside the submit handler above via name variable)