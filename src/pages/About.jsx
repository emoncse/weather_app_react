import React, { useState, useEffect } from "react";
import "../assets/About.css";

function About() {
  const [showDetails, setShowDetails] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const [typedText, setTypedText] = useState("");
  const fullText =
    "Hi, I'm Imran Nazir Emon. This is my first React application.";

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  const skills = [
    { name: "Python", color: "bg-blue-500" },
    { name: "Django", color: "bg-yellow-500" },
  ];

  return (
    <div className="about-container">
      <h1 className="about-title">Developer</h1>
      <div className="about-content">
        <img
          src="https://avatars.githubusercontent.com/u/23101548?v=4"
          alt="Imran Nazir Emon"
          className="profile-image animate-pulse"
        />
        <p className="about-text">{typedText}</p>
        <button
          className="details-button"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide Details" : "Show More Details"}
        </button>
        {showDetails && (
          <div className="additional-details">
            <h2>Skills</h2>
            <ul className="flex flex-wrap justify-center gap-4 mb-6">
              {skills.map((skill) => (
                <li
                  key={skill.name}
                  className={`${skill.color} text-white px-4 py-2 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-110`}
                  onMouseEnter={() => setActiveSkill(skill.name)}
                  onMouseLeave={() => setActiveSkill(null)}
                >
                  {skill.name}
                </li>
              ))}
            </ul>
            {activeSkill && (
              <p className="text-gray-600 mb-4 animate-fadeIn">
                You're viewing: {activeSkill}
              </p>
            )}
            <h2>Contact</h2>
            <p className="hover:text-blue-500 transition-colors duration-300">
              Email: imran@example.com
            </p>
            <p className="hover:text-blue-500 transition-colors duration-300">
              GitHub: github.com/imranemon
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default About;
