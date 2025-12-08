// src/pages/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import local data
import personalData from '../data/personalData';

// Import UI Components
import ProjectCard from '../components/UI/ProjectCard'; // Re-using for all projects

import './Portfolio.css'; // Page-specific styles for Portfolio

/**
 * Portfolio Page Component
 * Displays a comprehensive collection of all projects across Mazi Chukwuka's
 * diverse professional roles, with filtering capabilities.
 */
const Portfolio = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    // Optional: Scroll to top on page load if not handled by ScrollToTop component in App.jsx
    window.scrollTo(0, 0);
  }, []);

  // Combine projects from all roles into a single array
  const allProjects = [
    ...personalData.homePortfolioPreviews, // Include any general projects shown on home
    ...personalData.accountant.projects,
    ...personalData.webDeveloper.projects,
    ...personalData.dataAnalyst.projects,
    ...personalData.researchAcademic.publications.map(pub => ({ // Map publications to fit ProjectCard structure
        id: pub.id,
        image: pub.image,
        title: pub.title,
        category: `Research: ${pub.category}`, // Prepend "Research" for clarity
        description: pub.snippet,
        detailsLink: pub.link,
        isInternalLink: false, // Publications are usually external
    })),
    // Add any other specific project arrays if they exist in personalData
  ].filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i); // Filter out duplicates by ID

  // Extract unique categories for filtering
  const categories = ['All', ...new Set(allProjects.map(project => project.category))];

  const [filter, setFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(allProjects);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredProjects(allProjects);
    } else {
      setFilteredProjects(allProjects.filter(project => project.category === filter));
    }
    // Re-initialize AOS on filter change to re-trigger animations
    AOS.refreshHard();
  }, [filter, allProjects]);

  return (
    <div className="portfolio-page">
      {/* --- Page Hero/Banner Section --- */}
      <section className="portfolio-hero-section">
        <div className="portfolio-hero-content" data-aos="fade-up">
          <h1 className="page-title">My Diverse Portfolio</h1>
          <p className="page-subtitle">Showcasing a Spectrum of Professional Work & Projects</p>
        </div>
      </section>

      {/* --- Filter Section --- */}
      <section className="portfolio-filter-section common-section">
        <div className="filter-buttons" data-aos="fade-up">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`filter-button ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* --- Projects Grid Section --- */}
      <section className="portfolio-projects-grid common-section">
        {filteredProjects.length > 0 ? (
          <div className="projects-grid-container">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id || index} // Use project ID if available, otherwise index
                image={project.image}
                title={project.title}
                category={project.category}
                description={project.description}
                detailsLink={project.detailsLink}
                isInternalLink={project.isInternalLink || false} // Default to false if not specified
                aos="fade-up"
                aosDelay={index % 3 * 100} // Stagger animation for grid
              />
            ))}
          </div>
        ) : (
          <p className="no-projects-message" data-aos="fade-up">No projects found for this category.</p>
        )}
      </section>
    </div>
  );
};

export default Portfolio;