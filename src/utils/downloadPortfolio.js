// src/utils/downloadPortfolio.js
import JSZip from 'jszip';

export const generatePortfolioHTML = (formData, template) => {
  const { personalInfo, education, experience, skills, projects, socialLinks } = formData;
  
  // Helper function to generate skills HTML
  const generateSkillsHTML = () => {
    if (!skills || skills.length === 0) return '';
    
    return `
    <section class="skills-section">
      <h2>Skills & Expertise</h2>
      <div class="skills-grid">
        ${skills.map(skill => `
          <div class="skill-item">
            <div class="skill-header">
              <span class="skill-name">${skill.name}</span>
              <span class="skill-level">${skill.level}</span>
            </div>
            <div class="skill-bar">
              <div class="skill-progress" style="width: ${
                skill.level === 'Beginner' ? '25%' :
                skill.level === 'Intermediate' ? '50%' :
                skill.level === 'Advanced' ? '75%' : '100%'
              }; background-color: ${template.colors.primary};"></div>
            </div>
            <span class="skill-category">${skill.category}</span>
          </div>
        `).join('')}
      </div>
    </section>`;
  };

  // Helper function to generate experience HTML
  const generateExperienceHTML = () => {
    if (!experience || experience.length === 0) return '';
    
    return `
    <section class="experience-section">
      <h2>Experience</h2>
      <div class="timeline">
        ${experience.map(exp => `
          <div class="timeline-item">
            <div class="timeline-dot" style="background-color: ${template.colors.primary};"></div>
            <div class="timeline-content">
              <h3>${exp.position}</h3>
              <p class="company">${exp.company}</p>
              <p class="duration">
                ${new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                ${exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
              <p class="description">${exp.description.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>`;
  };

  // Helper function to generate projects HTML
  const generateProjectsHTML = () => {
    if (!projects || projects.length === 0) return '';
    
    return `
    <section class="projects-section">
      <h2>Projects</h2>
      <div class="projects-grid">
        ${projects.map(project => `
          <div class="project-card">
            ${project.image ? `
              <div class="project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'">
              </div>
            ` : ''}
            <div class="project-content">
              <div class="project-header">
                <h3>${project.title}</h3>
                ${project.link ? `
                  <a href="${project.link}" target="_blank" rel="noopener" class="project-link">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                ` : ''}
              </div>
              <p class="project-description">${project.description.replace(/\n/g, '<br>')}</p>
              ${project.technologies && project.technologies.length > 0 ? `
                <div class="project-technologies">
                  ${project.technologies.map(tech => `
                    <span class="tech-tag" style="background-color: ${template.colors.accent}20; color: ${template.colors.accent};">${tech}</span>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </section>`;
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personalInfo.firstName} ${personalInfo.lastName} - Portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            --primary-color: ${template.colors.primary};
            --secondary-color: ${template.colors.secondary};
            --accent-color: ${template.colors.accent};
            --background-color: ${template.colors.background};
            --text-color: ${template.colors.text};
            --text-light: #64748B;
            --border-color: #E2E8F0;
            --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background: var(--background-color);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Header Styles */
        .portfolio-header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 4rem 0;
            position: relative;
            overflow: hidden;
        }
        
        .header-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.1);
        }
        
        .header-content {
            position: relative;
            display: flex;
            align-items: flex-end;
            gap: 2rem;
            flex-wrap: wrap;
        }
        
        .profile-image {
            width: 160px;
            height: 160px;
            border-radius: 50%;
            border: 4px solid white;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            font-weight: bold;
            color: white;
        }
        
        .profile-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .profile-info h1 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
        }
        
        .profile-info .title {
            font-size: 1.25rem;
            opacity: 0.9;
            margin-bottom: 1rem;
        }
        
        /* Contact Info */
        .contact-info {
            padding: 2rem 0;
            border-bottom: 1px solid var(--border-color);
        }
        
        .contact-items {
            display: flex;
            flex-wrap: wrap;
            gap: 1.5rem;
            align-items: center;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-light);
        }
        
        .social-links {
            display: flex;
            gap: 0.75rem;
            margin-top: 1rem;
        }
        
        .social-link {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary-color);
            background: rgba(var(--primary-rgb), 0.1);
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .social-link:hover {
            background: var(--primary-color);
            color: white;
            transform: translateY(-2px);
        }
        
        /* Main Content */
        .main-content {
            padding: 3rem 0;
        }
        
        section {
            margin-bottom: 3rem;
        }
        
        h2 {
            font-size: 1.75rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: var(--text-color);
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        h2::before {
            content: '';
            width: 4px;
            height: 24px;
            background: var(--primary-color);
            border-radius: 2px;
        }
        
        /* Summary */
        .summary {
            font-size: 1.125rem;
            line-height: 1.8;
            color: var(--text-color);
            white-space: pre-line;
        }
        
        /* Experience Timeline */
        .timeline {
            position: relative;
            padding-left: 2rem;
        }
        
        .timeline::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background: var(--border-color);
        }
        
        .timeline-item {
            position: relative;
            margin-bottom: 2rem;
        }
        
        .timeline-dot {
            position: absolute;
            left: -2.25rem;
            top: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 0 0 3px var(--border-color);
        }
        
        .timeline-content h3 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.25rem;
        }
        
        .company {
            color: var(--primary-color);
            font-weight: 500;
            margin-bottom: 0.5rem;
        }
        
        .duration {
            font-size: 0.875rem;
            color: var(--text-light);
            margin-bottom: 0.75rem;
        }
        
        .description {
            color: var(--text-color);
            line-height: 1.6;
            white-space: pre-line;
        }
        
        /* Skills */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
        }
        
        .skill-item {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: var(--card-shadow);
            transition: transform 0.3s ease;
        }
        
        .skill-item:hover {
            transform: translateY(-4px);
        }
        
        .skill-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.75rem;
        }
        
        .skill-name {
            font-weight: 600;
            color: var(--text-color);
        }
        
        .skill-level {
            font-size: 0.875rem;
            color: var(--text-light);
        }
        
        .skill-bar {
            height: 6px;
            background: var(--border-color);
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 0.5rem;
        }
        
        .skill-progress {
            height: 100%;
            border-radius: 3px;
            transition: width 1s ease;
        }
        
        .skill-category {
            font-size: 0.875rem;
            color: var(--text-light);
        }
        
        /* Projects */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 1.5rem;
        }
        
        .project-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: var(--card-shadow);
            transition: all 0.3s ease;
        }
        
        .project-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
        }
        
        .project-image {
            height: 200px;
            overflow: hidden;
        }
        
        .project-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .project-card:hover .project-image img {
            transform: scale(1.05);
        }
        
        .project-content {
            padding: 1.5rem;
        }
        
        .project-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
        }
        
        .project-content h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--text-color);
        }
        
        .project-link {
            color: var(--primary-color);
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: rgba(var(--primary-rgb), 0.1);
            transition: all 0.3s ease;
        }
        
        .project-link:hover {
            background: var(--primary-color);
            color: white;
        }
        
        .project-description {
            color: var(--text-color);
            line-height: 1.6;
            margin-bottom: 1rem;
            white-space: pre-line;
        }
        
        .project-technologies {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .tech-tag {
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
        }
        
        /* Education */
        .education-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
        }
        
        .education-item {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: var(--card-shadow);
        }
        
        .education-item h3 {
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .institution {
            color: var(--primary-color);
            font-weight: 500;
            margin-bottom: 0.5rem;
        }
        
        .education-year {
            font-size: 0.875rem;
            color: var(--text-light);
            margin-bottom: 0.75rem;
        }
        
        /* Footer */
        .portfolio-footer {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            text-align: center;
            padding: 2rem 0;
            margin-top: 3rem;
        }
        
        .footer-content p {
            margin-bottom: 0.5rem;
        }
        
        .footer-content p:last-child {
            opacity: 0.8;
            font-size: 0.875rem;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .header-content {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .profile-image {
                width: 120px;
                height: 120px;
            }
            
            .profile-info h1 {
                font-size: 2rem;
            }
            
            .skills-grid,
            .projects-grid,
            .education-grid {
                grid-template-columns: 1fr;
            }
            
            .contact-items {
                flex-direction: column;
                align-items: flex-start;
            }
        }
        
        /* Print Styles */
        @media print {
            .social-links,
            .project-link,
            .portfolio-footer {
                display: none;
            }
            
            .container {
                max-width: 100%;
                padding: 0;
            }
            
            .portfolio-header {
                padding: 2rem 0;
            }
            
            .main-content {
                padding: 1rem 0;
            }
            
            .skill-item,
            .project-card,
            .education-item {
                box-shadow: none;
                border: 1px solid var(--border-color);
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="portfolio-header">
        <div class="header-overlay"></div>
        <div class="container">
            <div class="header-content">
                <div class="profile-image">
                    ${personalInfo.photo ? 
                      `<img src="${personalInfo.photo}" alt="${personalInfo.firstName} ${personalInfo.lastName}">` : 
                      `<span>${personalInfo.firstName?.[0] || 'P'}</span>`
                    }
                </div>
                <div class="profile-info">
                    <h1>${personalInfo.firstName} ${personalInfo.lastName}</h1>
                    <p class="title">${personalInfo.title || 'Professional Portfolio'}</p>
                </div>
            </div>
        </div>
    </header>

    <!-- Contact Information -->
    <div class="contact-info">
        <div class="container">
            <div class="contact-items">
                ${personalInfo.email ? `
                    <div class="contact-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <span>${personalInfo.email}</span>
                    </div>
                ` : ''}
                
                ${personalInfo.phone ? `
                    <div class="contact-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>${personalInfo.phone}</span>
                    </div>
                ` : ''}
                
                ${personalInfo.location ? `
                    <div class="contact-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>${personalInfo.location}</span>
                    </div>
                ` : ''}
            </div>
            
            ${(socialLinks.linkedin || socialLinks.github || socialLinks.twitter) ? `
                <div class="social-links">
                    ${socialLinks.linkedin ? `
                        <a href="${socialLinks.linkedin}" class="social-link" target="_blank" rel="noopener">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                    ` : ''}
                    
                    ${socialLinks.github ? `
                        <a href="${socialLinks.github}" class="social-link" target="_blank" rel="noopener">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </a>
                    ` : ''}
                    
                    ${socialLinks.twitter ? `
                        <a href="${socialLinks.twitter}" class="social-link" target="_blank" rel="noopener">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                            </svg>
                        </a>
                    ` : ''}
                </div>
            ` : ''}
        </div>
    </div>

    <!-- Main Content -->
    <main class="main-content">
        <div class="container">
            <!-- Summary -->
            ${personalInfo.summary ? `
                <section class="summary-section">
                    <h2>About Me</h2>
                    <div class="summary">${personalInfo.summary.replace(/\n/g, '<br>')}</div>
                </section>
            ` : ''}
            
            <!-- Experience -->
            ${generateExperienceHTML()}
            
            <!-- Education -->
            ${education && education.length > 0 ? `
                <section class="education-section">
                    <h2>Education</h2>
                    <div class="education-grid">
                        ${education.map(edu => `
                            <div class="education-item">
                                <h3>${edu.degree}</h3>
                                <p class="institution">${edu.institution}</p>
                                <p class="education-year">${edu.year}</p>
                                ${edu.description ? `<p class="description">${edu.description.replace(/\n/g, '<br>')}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </section>
            ` : ''}
            
            <!-- Skills -->
            ${generateSkillsHTML()}
            
            <!-- Projects -->
            ${generateProjectsHTML()}
        </div>
    </main>

    <!-- Footer -->
    <footer class="portfolio-footer">
        <div class="container">
            <div class="footer-content">
                <p>© ${new Date().getFullYear()} ${personalInfo.firstName} ${personalInfo.lastName}</p>
                <p>Portfolio created with QuickPortfolio</p>
            </div>
        </div>
    </footer>

    <script>
        // Add smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Add image lazy loading
        document.addEventListener('DOMContentLoaded', function() {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (img.complete) {
                    img.classList.add('loaded');
                } else {
                    img.addEventListener('load', function() {
                        this.classList.add('loaded');
                    });
                }
            });
        });
        
        // Add print functionality
        window.addEventListener('beforeprint', function() {
            document.body.classList.add('printing');
        });
        
        window.addEventListener('afterprint', function() {
            document.body.classList.remove('printing');
        });
    </script>
</body>
</html>`;
};

export const downloadPortfolioAsHTML = (formData, template) => {
  const html = generatePortfolioHTML(formData, template);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = `${formData.personalInfo.firstName.toLowerCase()}-${formData.personalInfo.lastName.toLowerCase()}-portfolio.html`;
  a.download = fileName.replace(/\s+/g, '-');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadPortfolioAsZIP = async (formData, template) => {
  const zip = new JSZip();
  
  // Add HTML file
  const html = generatePortfolioHTML(formData, template);
  zip.file('index.html', html);
  
  // Add README
  const readme = `# ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}'s Portfolio

## Created with QuickPortfolio
Generated on: ${new Date().toLocaleDateString()}

## How to Use

### Option 1: Open Locally
Simply open \`index.html\` in your web browser.

### Option 2: Deploy Online

#### Netlify
1. Go to https://app.netlify.com/drop
2. Drag and drop this ZIP file
3. Your portfolio will be live instantly!

#### GitHub Pages
1. Create a new GitHub repository
2. Upload all files
3. Go to Settings > Pages
4. Select "main" branch and save
5. Your portfolio will be live at: https://yourusername.github.io/repository-name

#### Vercel
1. Go to https://vercel.com/new
2. Import Git repository or drag and drop files
3. Click "Deploy"

## Customization
Edit \`index.html\` to make changes to your portfolio.

## Features
- Fully responsive design
- SEO optimized
- Fast loading
- No external dependencies
- Mobile-friendly

## Contact
If you need help, contact: ${formData.personalInfo.email || 'N/A'}

---
Thank you for using QuickPortfolio!`;
  
  zip.file('README.md', readme);
  
  // Add a simple CSS file for additional styling
  const css = `/* Additional Custom Styles for ${formData.personalInfo.firstName}'s Portfolio */
  
  /* Add any custom CSS here */
  .custom-highlight {
      background: linear-gradient(120deg, ${template.colors.accent}20 0%, ${template.colors.primary}20 100%);
      padding: 1rem;
      border-radius: 8px;
      border-left: 4px solid ${template.colors.primary};
  }
  
  /* Animation for skill bars */
  @keyframes slideIn {
      from {
          width: 0;
      }
      to {
          width: var(--skill-width);
      }
  }
  
  .skill-progress {
      animation: slideIn 1.5s ease-out;
  }
  
  /* Dark mode preference */
  @media (prefers-color-scheme: dark) {
      body {
          background: #0F172A;
          color: #E2E8F0;
      }
      
      .skill-item,
      .project-card,
      .education-item {
          background: #1E293B;
          border-color: #334155;
      }
  }`;
  
  zip.file('styles/custom.css', css);
  
  // Add favicon
  const favicon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${template.colors.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${template.colors.secondary};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="8" fill="url(#gradient)"/>
  <text x="16" y="22" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
    ${formData.personalInfo.firstName?.[0] || 'P'}
  </text>
</svg>`;
  
  zip.file('favicon.svg', favicon);
  
  // Generate and add the ZIP
  const content = await zip.generateAsync({ 
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: {
      level: 6
    }
  });
  
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  const fileName = `${formData.personalInfo.firstName.toLowerCase()}-${formData.personalInfo.lastName.toLowerCase()}-portfolio.zip`;
  a.download = fileName.replace(/\s+/g, '-');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};