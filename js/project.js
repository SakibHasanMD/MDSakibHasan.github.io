document.addEventListener('DOMContentLoaded', () => {
    // Load projects data
    loadProjects();
    
    // Set up filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filter = button.getAttribute('data-filter');
        // Filter projects
        filterProjects(filter);
      });
    });
  });
  
  // Function to load projects from JSON
  function loadProjects() {
    fetch('assets/data/projects.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Store projects data globally
        window.projectsData = data.projects;
        // Initially display all projects
        displayProjects(window.projectsData);
      })
      .catch(error => {
        console.error('Error loading projects:', error);
        document.getElementById('projects-container').innerHTML = 
          '<p class="error-message">Failed to load projects. Please try again later.</p>';
      });
  }
  
  // Function to filter projects by category
  function filterProjects(category) {
    if (!window.projectsData) return;
    
    if (category === 'all') {
      displayProjects(window.projectsData);
    } else {
      const filtered = window.projectsData.filter(project => project.category === category);
      displayProjects(filtered);
    }
  }
  
  // Function to display projects in the container
  function displayProjects(projects) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      projectCard.innerHTML = `
        <div class="project-thumbnail">
          <img src="${project.thumbnailUrl}" alt="${project.name}" />
        </div>
        <div class="project-info">
          <h3 class="project-name">${project.name}</h3>
          <p class="project-description">${project.shortDescription}</p>
        </div>
      `;
      
      // Add click event to navigate to project details
      projectCard.addEventListener('click', () => {
        window.location.href = `project-details.html?id=${project.id}`;
      });
      
      container.appendChild(projectCard);
    });
  }