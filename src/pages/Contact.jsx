// src/pages/Contact.jsx
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaGithub, FaResearchgate } from 'react-icons/fa';

// Import local data
import personalData from '../data/personalData';

import './Contact.css'; // Page-specific styles for Contact

/**
 * Contact Page Component
 * Displays contact information and a contact form.
 */
const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0); // Ensure scroll to top on page load
  }, []);

  const { contact } = personalData;

  // State for form fields (for UI control, not submission logic)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend or a form service.
    // For now, we'll just log it and show an alert.
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
  };

  return (
    <div className="contact-page">
      {/* --- Page Hero/Banner Section --- */}
      <section className="contact-hero-section">
        <div className="contact-hero-content" data-aos="fade-up">
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">I'd love to hear from you. Let's connect and discuss your needs.</p>
        </div>
      </section>

      {/* --- Contact Details and Form Section --- */}
      <section className="contact-details-form-section common-section">
        <div className="contact-container">
          {/* Contact Information */}
          <div className="contact-info card" data-aos="fade-right">
            <h2>Contact Information</h2>
            <p className="contact-info-description">
              Whether you have a question, a project proposal, or just want to say hello, feel free to reach out. I'm always open to new opportunities and collaborations.
            </p>
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <span>Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></span>
            </div>
            <div className="info-item">
              <FaPhone className="info-icon" />
              <span>Phone: <a href={`tel:${contact.phone}`}>{contact.phone}</a></span>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <span>Location: {contact.address}</span>
            </div>
            <div className="social-links">
              <h3>Connect with me:</h3>
              {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
              {contact.twitter && <a href={contact.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>}
              {contact.github && <a href={contact.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>}
              {contact.researchGateLink && <a href={contact.researchGateLink} target="_blank" rel="noopener noreferrer"><FaResearchgate /></a>}
              {/* Add other social links as needed */}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container card" data-aos="fade-left">
            <h2>Send Me a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject of your message"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;