import React from 'react';
import '../About.css';

const About = () => {
    return (
        <div className="about-container">
            <h1>About HealthSphere+</h1>
            <section className="mission">
                <h2>Our Mission</h2>
                <p>To empower individuals living with non-communicable diseases (NCDs) by providing innovative tools and resources for better health management and care.</p>
            </section>
            <section className="vision">
                <h2>Our Vision</h2>
                <p>To be the leading digital health platform that transforms the way NCDs are managed worldwide, making a healthier life accessible to all.</p>
            </section>
        </div>
    );
};

export default About;
