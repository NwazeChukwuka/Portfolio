// src/pages/Home.jsx - Final Corrected Version
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import local data
import personalData from '../data/personalData';
import blogArticles from '../data/blogArticles';

// Import UI Components
import Button from '../components/UI/Button';
import ServiceCard from '../components/UI/ServiceCard';
import ProjectCard from '../components/UI/ProjectCard';
import CircularProgressBar from '../components/UI/CircularProgressBar';
import TestimonialCarousel from '../components/UI/TestimonialCarousel';

// Import Icons
import {
  FaLinkedinIn, FaGithub, FaWhatsapp, FaTwitter, FaFacebookF,
  FaArrowRight, FaChevronDown, FaDownload, FaHandshake
} from 'react-icons/fa';

import './Home.css';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCvDropdownOpen, setIsCvDropdownOpen] = useState(false);
  const cvDropdownRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50
    });
    
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const latestBlogArticles = useMemo(() =>
    blogArticles
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3),
    []
  );

  const skillsAverage = useMemo(() =>
    personalData.homeSkills.reduce((acc, skill) => acc + skill.percentage, 0) / personalData.homeSkills.length,
    []
  );

  // CORRECTED: 'certifications' has been removed from destructuring and from the code below
  const {
    homeSkills,
    homeExperience,
    homeTestimonials,
    homeServices,
    homePortfolioPreviews,
    contact,
    general: {
      fullName: name,
      profilePicture,
      tagline: blendedTitle,
      aboutMe: [shortBio, longBio],
      cvs: cvPaths,
    }
  } = personalData;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader">
          <div className="loader-circle"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Enhanced Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-content">
          <div className="hero-text" data-aos="fade-right">
            <p className="greeting">Hello, I'm</p>
            <h1 className="hero-title">
              <span className="name-highlight">{name}</span>
            </h1>
            <h2 className="hero-subtitle">
              <span className="typing-animation">{blendedTitle}</span>
            </h2>
            <p className="hero-bio">{shortBio}</p>
            
            <div className="hero-stats" data-aos="fade-up" data-aos-delay="300">
              <div className="stat-item">
                <span className="stat-number">{homeExperience.length}+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{homePortfolioPreviews.length}+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{Math.round(skillsAverage)}%</span>
                <span className="stat-label">Skill Average</span>
              </div>
            </div>

            {/* Hero Action Buttons and Social Links on Same Line */}
            <div className="hero-actions-row" data-aos="fade-up" data-aos-delay="400">
              {/* Hero Action Buttons - Left Side */}
              <div className="hero-buttons">
                <Button to="/contact" variant="primary" className="hero-hire-btn">
                  <FaHandshake /> Hire Me Now
                </Button>
                
                <div className="hero-cv-dropdown-container" ref={cvDropdownRef}>
                  <button
                    className="hero-download-cv-btn"
                    onClick={() => setIsCvDropdownOpen(!isCvDropdownOpen)}
                    aria-expanded={isCvDropdownOpen}
                    aria-haspopup="true"
                  >
                    <FaDownload /> Download CV
                    <FaChevronDown className={`cv-dropdown-arrow ${isCvDropdownOpen ? 'open' : ''}`} />
                  </button>
                  
                  {isCvDropdownOpen && (
                    <div className="hero-cv-dropdown-menu">
                      <a
                        href={cvPaths.full}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-cv-dropdown-item"
                        onClick={() => setIsCvDropdownOpen(false)}
                      >
                        <FaDownload /> Full CV
                      </a>
                      <a
                        href={cvPaths.accountant}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-cv-dropdown-item"
                        onClick={() => setIsCvDropdownOpen(false)}
                      >
                        <FaDownload /> Accountant CV
                      </a>
                      <a
                        href={cvPaths.webDeveloper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-cv-dropdown-item"
                        onClick={() => setIsCvDropdownOpen(false)}
                      >
                        <FaDownload /> Web Developer CV
                      </a>
                      <a
                        href={cvPaths.dataAnalyst}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-cv-dropdown-item"
                        onClick={() => setIsCvDropdownOpen(false)}
                      >
                        <FaDownload /> Data Analyst CV
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Links - Right Side */}
              <div className="hero-social-links">
                <p className="social-label">Connect with me:</p>
                <div className="social-icons">
                  {contact.socialLinks.linkedin && (
                    <a href={contact.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link linkedin">
                      <FaLinkedinIn />
                    </a>
                  )}
                  {contact.socialLinks.github && (
                    <a href={contact.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-link github">
                      <FaGithub />
                    </a>
                  )}
                  {contact.socialLinks.whatsapp && (
                    <a href={contact.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-link whatsapp">
                      <FaWhatsapp />
                    </a>
                  )}
                  {contact.socialLinks.twitter && (
                    <a href={contact.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-link twitter">
                      <FaTwitter />
                    </a>
                  )}
                  {contact.socialLinks.facebook && (
                    <a href={contact.socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link facebook">
                      <FaFacebookF />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="hero-image" data-aos="fade-left" data-aos-delay="200">
            <div className="image-container">
              <img src={profilePicture} alt={name} className="profile-img" />
              <div className="image-overlay">
                <div className="status-indicator">
                  <span className="status-dot"></span>
                  Available for work
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator" data-aos="fade-up" data-aos-delay="800">
          <button
            onClick={() => scrollToSection('about')}
            className="scroll-btn"
            aria-label="Scroll to about section"
          >
            <FaChevronDown className="scroll-icon" />
          </button>
          <span className="scroll-text">Scroll to explore</span>
        </div>

        <div className="hero-bg-elements">
          <div className="hero-circle hero-circle-1"></div>
          <div className="hero-circle hero-circle-2"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section className="about-section common-section" id="about">
        <div className="section-header">
          <h2 className="section-title" data-aos="fade-up">About Me</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            My Journey & Expertise
          </p>
        </div>
        
        <div className="about-content">
          <div className="about-text" data-aos="fade-right">
            <h3>More About {name.split(' ')[0]}</h3>
            <p className="about-description">{longBio}</p>

            {/* Note: Certifications section has been removed as the data is not present in personalData.js */}
            <div className="about-actions">
              <Button to="/contact" variant="primary">
                Get In Touch
              </Button>
              <Button to="/about" variant="outline">
                Learn More About Me
              </Button>
            </div>
          </div>
          
          <div className="about-image" data-aos="fade-left">
            <div className="about-image-container">
              <img src={profilePicture} alt={`${name} - Professional Photo`} />
              <div className="about-image-overlay">
                <div className="experience-badge">
                  <span className="badge-number">{homeExperience.length}+</span>
                  <span className="badge-text">Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="services-section common-section bg-gradient" id="services">
        <div className="section-header">
          <h2 className="section-title" data-aos="fade-up">My Core Services</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            What I Offer Across My Roles
          </p>
        </div>
        
        <div className="services-grid">
          {homeServices.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              aos="fade-up"
              aosDelay={index * 100}
              className="enhanced-service-card"
            />
          ))}
        </div>
        
        <div className="section-action" data-aos="fade-up" data-aos-delay="300">
          <div className="cta-container">
            <h3>Ready to Start a Project?</h3>
            <p>Let's discuss how I can help bring your ideas to life.</p>
            <Link to="/contact" className="cta-button">
              Let's Talk! <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Portfolio Preview Section */}
      <section className="portfolio-section common-section" id="portfolio">
        <div className="section-header">
          <h2 className="section-title" data-aos="fade-up">Featured Projects</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            A Glimpse into My Work
          </p>
        </div>
        
        <div className="portfolio-grid">
          {homePortfolioPreviews.map((project, index) => (
            <ProjectCard
              key={project.id}
              image={project.image}
              title={project.title}
              category={project.category}
              description={project.description}
              detailsLink={project.detailsLink}
              technologies={project.technologies}
              aos="fade-up"
              aosDelay={index * 100}
              className="enhanced-project-card"
            />
          ))}
        </div>
        
        <div className="section-action" data-aos="fade-up" data-aos-delay="300">
          <Link to="/portfolio" className="learn-more-link">
            View All Projects <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section className="skills-section common-section bg-dark" id="skills">
        <div className="section-header">
          <h2 className="section-title" data-aos="fade-up">My Key Skills</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Proficiencies Across Disciplines
          </p>
        </div>
        
        <div className="skills-container">
          <div className="skills-grid">
            {homeSkills.map((skill, index) => (
              <CircularProgressBar
                key={index}
                skill={skill.skill}
                percentage={skill.percentage}
                color={skill.color}
                aos="zoom-in"
                aosDelay={index * 100}
                showAnimation={true}
              />
            ))}
          </div>
          
          <div className="skills-summary" data-aos="fade-up" data-aos-delay="400">
            <div className="summary-card">
              <h3>Overall Expertise</h3>
              <div className="average-skill">
                <span className="average-number">{Math.round(skillsAverage)}%</span>
                <span className="average-label">Average Proficiency</span>
              </div>
              <p>Continuously learning and adapting to new technologies and methodologies.</p>
            </div>
          </div>
        </div>
        
        <div className="section-action" data-aos="fade-up" data-aos-delay="300">
          <Link to="/about" className="learn-more-link light">
            Explore My Full Skillset <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Rest of sections remain the same with minor enhancements */}
      {/* Experience Section */}
      <section className="experience-section common-section" id="experience">
        <div className="section-header">
          <h2 className="section-title" data-aos="fade-up">Professional Journey</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            My Work History & Achievements
          </p>
        </div>
        
        <div className="experience-timeline">
          {homeExperience.map((exp, index) => (
            <div className="timeline-item" key={index} data-aos="fade-up" data-aos-delay={index * 150}>
              <div className="timeline-dot"></div>
              <div className="timeline-content card">
                <div className="exp-header">
                  <h3>{exp.title}</h3>
                  <span className="years-badge">{exp.years}</span>
                </div>
                <p className="company">{exp.company}</p>
                <p className="description">{exp.description}</p>
                {exp.achievements && (
                  <ul className="achievements">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="testimonials-section common-section bg-gradient" id="testimonials">
        <div className="section-header">
          <h2 className="section-title" data-aos="fade-up">What Clients Say</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Hear From Those I've Worked With
          </p>
        </div>
        
        <TestimonialCarousel
          testimonials={homeTestimonials}
          aos="fade-up"
          aosDelay={200}
          autoPlay={true}
          showDots={true}
        />
      </section>

      {/* Enhanced Blog Teaser Section */}
      <section className="blog-teaser-section common-section" id="blog-teasers">
        <div className="section-header">
          <h2 className="section-title" data-aos="fade-up">Latest Insights</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            From My Blog & Thoughts
          </p>
        </div>
        
        <div className="blog-teasers-grid">
          {latestBlogArticles.map((article, index) => (
            <article className="blog-teaser-card card" key={article.id} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="blog-image-container">
                <img src={article.image} alt={article.title} className="blog-teaser-image" />
                <div className="blog-overlay">
                  <span className="read-time">{article.readTime || '5 min read'}</span>
                </div>
              </div>
              <div className="blog-teaser-content">
                <div className="blog-meta">
                  <span className="blog-category">{article.category}</span>
                  <time className="blog-date">{article.date}</time>
                </div>
                <h3 className="blog-teaser-title">{article.title}</h3>
                <p className="blog-teaser-snippet">{article.snippet}</p>
                <Link to={`/blog/${article.slug}`} className="read-more-link">
                  Read Full Article <FaArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        <div className="section-action" data-aos="fade-up" data-aos-delay="300">
          <Link to="/blog" className="learn-more-link">
            View All Blog Posts <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section common-section bg-primary" id="cta">
        <div className="cta-content" data-aos="zoom-in">
          <h2>Ready to Work Together?</h2>
          <p>Let's discuss your project and see how I can help you achieve your goals.</p>
          <div className="cta-buttons">
            <Button to="/contact" variant="secondary" size="large">
              Start a Project
            </Button>
            <Button to="/portfolio" variant="outline-white" size="large">
              View My Work
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;