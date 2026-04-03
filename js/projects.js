const container = document.getElementById("projects-container");

function renderProjects(projects) {
    if (!projects || projects.length === 0) {
        container.innerHTML = `<p class="state-message error">No projects found.</p>`;
        return;
    }

    const grid = document.createElement("div");
    grid.className = "projects-grid";

    projects.forEach(project => {
        const highlights = project.highlights
            .map(h => `<div class="highlight-item">${h}</div>`)
            .join("");

        const tags = project.tags
            .map(t => `<span class="tag">${t}</span>`)
            .join("");

        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
            <div class="card-front">
                <h2 class="card-title">${project.title}</h2>
                <div class="card-tags">${tags}</div>
                <p class="card-description">${project.description}</p>
                <button class="btn-details">View Details</button>
            </div>
            <div class="card-details">
                <button class="btn-back">← Back</button>
                <h2 class="card-title">${project.title}</h2>
                <p class="card-role">${project.role}</p>
                <p class="card-description">${project.description}</p>
                <div class="card-highlights">${highlights}</div>
                <div class="card-tags">${tags}</div>
            </div>
        `;

        const btnDetails = card.querySelector(".btn-details");
        const btnBack = card.querySelector(".btn-back");

        btnDetails.addEventListener("click", () => {
            card.classList.add("flipped");
        });

        btnBack.addEventListener("click", () => {
            card.classList.remove("flipped");
        });

        grid.appendChild(card);
    });

    container.innerHTML = "";
    container.appendChild(grid);
}

async function loadProjects() {
    try {
        const response = await fetch("./data/projects.json");

        if (!response.ok) {
            throw new Error("Failed to load projects.");
        }

        const data = await response.json();
        renderProjects(data.projects);

    } catch (error) {
        container.innerHTML = `<p class="state-message error">Could not load projects. Please try again later.</p>`;
    }
}

loadProjects();