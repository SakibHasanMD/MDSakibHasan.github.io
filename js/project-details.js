document.addEventListener('DOMContentLoaded', () => {
    // Get project ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (!projectId) {
      showError('Project ID not found');
      return;
    }
    
    // Fetch project data
    fetch('assets/data/projects.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const project = data.projects.find(p => p.id === projectId);
        if (project) {
          renderProjectDetails(project);
        } else {
          showError('Project not found');
        }
      })
      .catch(error => {
        console.error('Error loading project details:', error);
        showError('Failed to load project details. Please try again later.');
      });
  });
  
  function renderProjectDetails(project) {
    document.title = `${project.name} - Project Details`;
    
    const container = document.getElementById('project-details-container');
    
    // Create project details HTML
    container.innerHTML = `
      <div class="project-header">
        <h1>${project.name}</h1>
        <div class="project-metadata">
          <span class="metadata-item">${project.category}</span>
          ${project.technologies.map(tech => `<span class="metadata-item">${tech}</span>`).join('')}
        </div>
      </div>
      
      <div class="project-content">
        <div class="project-main-image">
          <img src="${project.thumbnailUrl}" alt="${project.name}" />
        </div>
        
        <div class="project-description">
          <h2>About this project</h2>
          <p>${project.fullDescription}</p>
          
          <div class="project-links">
            ${project.linkToCode ? `<a href="${project.linkToCode}" target="_blank">View Code</a>` : ''}
            ${project.liveDemoLink ? `<a href="${project.liveDemoLink}" target="_blank">Live Demo</a>` : ''}
          </div>
        </div>
      </div>
      
      <div class="project-gallery">
        <h2>Gallery</h2>
        <div class="gallery-grid">
          ${project.images.map(img => `
            <div class="gallery-item">
              <img src="${img}" alt="${project.name}" />
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="back-button">
        <a href="projects.html">Back to Projects</a>
      </div>
    `;
  }
  
  function showError(message) {
    const container = document.getElementById('project-details-container');
    container.innerHTML = `
      <div class="error-container">
        <h2>Error</h2>
        <p>${message}</p>
        <a href="projects.html">Back to Projects</a>
      </div>
    `;
  }