const projectsGrid = document.getElementById('projects-grid');

async function loadProjects() {
  try {
    const response = await fetch('/api/projects');
    const data = await response.json();
    renderProjects(data?.projects || []);
  } catch (error) {
    console.error('Failed to load projects', error);
    projectsGrid.innerHTML = '<p class="form-status">Unable to load projects. Please refresh.</p>';
  }
}

function renderProjects(projects) {
  if (!projects.length) {
    projectsGrid.innerHTML = '<p>No projects found. Check back soon.</p>';
    return;
  }

  projectsGrid.innerHTML = projects
    .map(
      ({ title, description, stack, link, github }) => `
        <article class="project-card">
          <div>
            <p class="eyebrow">${stack[0] || 'Project'}</p>
            <h3>${title}</h3>
            <p>${description}</p>
          </div>
          <ul>
            ${stack.map((tech) => `<li>${tech}</li>`).join('')}
          </ul>
          <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
            ${link ? `<a href="${link}" target="_blank" rel="noreferrer">View Project →</a>` : ''}
            ${github ? `<a href="${github}" target="_blank" rel="noreferrer">GitHub Repo →</a>` : ''}
          </div>
        </article>
      `,
    )
    .join('');
}

loadProjects();

