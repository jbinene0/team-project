// Returning visitor greeting
import "./nav.js";

const visitorName = localStorage.getItem("visitorName");
const greetingEl = document.getElementById("greeting");
if (visitorName) {
    greetingEl.textContent = `Welcome back, ${visitorName}!`;
    greetingEl.classList.add("visible");
}

// Letter-by-letter name animation
const nameEl = document.getElementById("hero-name");
const fullName = "Pierre Lono";
fullName.split("").forEach((ch, i) => {
    const span = document.createElement("span");
    span.textContent = ch === " " ? "\u00A0" : ch;
    span.style.animationDelay = `${0.4 + i * 0.06}s`;
    nameEl.appendChild(span);
});

// Floating particles
const particleContainer = document.getElementById("particles");
for (let i = 0; i < 28; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";
    p.style.animationDuration = (4 + Math.random() * 6) + "s";
    p.style.animationDelay = (Math.random() * 6) + "s";
    p.style.width = p.style.height = (1 + Math.random() * 2) + "px";
    particleContainer.appendChild(p);
}