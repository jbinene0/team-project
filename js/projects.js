const container = document.getElementById("projects-container");
const categoryFilter = document.getElementById("category-filter");

let allProjects = [];

function renderProjects(projects) {
    if (!projects || projects.length === 0) {
        container.innerHTML = `<p class="state-message error">No projects found for this category.</p>`;
        return;
    }

    const grid = document.createElement("div");
    grid.className = "projects-grid";

    projects.forEach((project, index) => {
        const tags = project.tags
            .map(t => `<span class="tag">${t}</span>`)
            .join("");

        const card = document.createElement("div");
        card.className = "project-card animate-in";
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <h2 class="card-title">${project.title}</h2>
            <div class="card-tags">${tags}</div>
            <p class="card-description">${project.description}</p>
            <a class="btn-details" href="project-detail.html?id=${project.id}">View Details</a>
        `;

        grid.appendChild(card);
    });

    container.innerHTML = "";
    container.appendChild(grid);
}

function populateDropdown(projects) {
    const categories = [...new Set(projects.map(p => p.category))];
    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });
}

categoryFilter.addEventListener("change", () => {
    const selected = categoryFilter.value;
    const filtered = selected === "all"
        ? allProjects
        : allProjects.filter(p => p.category === selected);
    renderProjects(filtered);
});

async function loadProjects() {
    try {
        const response = await fetch("./data/projects.json");

        if (!response.ok) throw new Error("Failed to load projects.");

        const data = await response.json();
        allProjects = data.projects;

        populateDropdown(allProjects);
        renderProjects(allProjects);

    } catch (error) {
        container.innerHTML = `<p class="state-message error">Could not load projects. Please try again later.</p>`;
    }
}

loadProjects();