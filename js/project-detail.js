import "./nav.js";

const container = document.getElementById("detail-container");

function renderProject(project) {
    document.title = `${project.title} — Pierre Lono`;

    const highlights = project.highlights
        .map(h => `<div class="highlight-item">${h}</div>`)
        .join("");

    const tags = project.tags
        .map(t => `<span class="tag">${t}</span>`)
        .join("");

    container.innerHTML = `
        <a class="btn-back" href="projects.html">← Back to Projects</a>

        <div class="detail-header">
            <span class="detail-category">${project.category}</span>
            <h1 class="detail-title">${project.title}</h1>
            <p class="detail-role">${project.role} &mdash; ${project.year}</p>
        </div>

        <div class="detail-body">
            <div class="detail-section">
                <h2>Overview</h2>
                <p>${project.description}</p>
            </div>

            <div class="detail-section">
                <h2>Key Highlights</h2>
                <div class="highlights-list">${highlights}</div>
            </div>

            <div class="detail-section">
                <h2>Skills & Tools</h2>
                <div class="tags-list">${tags}</div>
            </div>
        </div>
    `;
}

async function loadProject() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        container.innerHTML = `<p class="state-message error">No project specified. <a href="projects.html">Go back to projects.</a></p>`;
        return;
    }

    try {
        const response = await fetch("./data/projects.json");

        if (!response.ok) throw new Error("Failed to load project data.");

        const data = await response.json();
        const project = data.projects.find(p => p.id === id);

        if (!project) {
            container.innerHTML = `<p class="state-message error">Project not found. <a href="projects.html">Go back to projects.</a></p>`;
            return;
        }

        renderProject(project);

    } catch (error) {
        container.innerHTML = `<p class="state-message error">Could not load project. Please try again later.</p>`;
    }
}

loadProject();