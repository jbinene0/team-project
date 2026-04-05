import "./nav.js";

const hamburger = document.getElementById("hamburger");
const navTabs = document.querySelector(".nav-tabs");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navTabs.classList.toggle("open");
});

navTabs.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navTabs.classList.remove("open");
    });
});