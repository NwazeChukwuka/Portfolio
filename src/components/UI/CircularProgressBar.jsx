// src/components/UI/CircularProgressBar.jsx
import React, { useEffect, useState } from 'react';
import './CircularProgressBar.css'; // Specific styles for the CircularProgressBar

/**
 * CircularProgressBar Component
 * Displays a skill level as a percentage within a circular progress bar.
 * Includes a simple animation effect on mount to fill the bar.
 *
 * @param {object} props - Component props.
 * @param {string} props.skill - The name of the skill.
 * @param {number} props.percentage - The percentage value for the progress (0-100).
 * @param {string} [props.aos='zoom-in'] - AOS animation type for the container.
 * @param {number} [props.aosDelay=0] - Delay for AOS animation in milliseconds.
 */
const CircularProgressBar = ({ skill, percentage, aos = 'zoom-in', aosDelay = 0 }) => {
  const [dashOffset, setDashOffset] = useState(283); // Initial offset (2 * PI * 45, approx circumference)

  useEffect(() => {
    // Animate the dash offset when component mounts to simulate progress
    // Circumference = 2 * PI * Radius = 2 * 3.14159 * 45 = 282.74 -> approx 283
    // Offset for percentage: (100 - percentage) / 100 * circumference
    const offset = 283 - (percentage / 100) * 283;
    const timer = setTimeout(() => {
      setDashOffset(offset);
    }, 100); // Small delay to ensure CSS transition applies

    return () => clearTimeout(timer); // Cleanup timeout
  }, [percentage]); // Recalculate if percentage changes

  return (
    <div className="circular-progress-bar" data-aos={aos} data-aos-delay={aosDelay}>
      <svg className="progress-svg" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="progress-circle-bg"
          cx="50"
          cy="50"
          r="45"
        ></circle>
        {/* Foreground circle (progress) */}
        <circle
          className="progress-circle-fg"
          cx="50"
          cy="50"
          r="45"
          style={{ strokeDashoffset: dashOffset }} // Apply animated offset
        ></circle>
      </svg>
      <div className="progress-text-wrapper">
        <span className="progress-percentage">{percentage}%</span>
        <span className="skill-name">{skill}</span>
      </div>
    </div>
  );
};

export default CircularProgressBar;