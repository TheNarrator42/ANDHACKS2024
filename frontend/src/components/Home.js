import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typed from 'typed.js';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  useEffect(() => {
    const options = {
      strings: ["Free path to financial literacy", "Test your financial decision skills", "Learn step-by-step"],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 2000, // Delay after text is typed before deleting
      loop: true
    };
    const typed = new Typed("#typed-output", options);

    // Cleanup function to destroy the Typed instance when the component unmounts
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="hero-image">
      <div className="hero-text">
        <h1>MarketWatch</h1>
        <div id="typed-output"></div>
        <div className="hero-cards">
          <div className="card card-custom">
            <div className="card-body">
              <h5 className="card-title">Tutorial</h5>
              <p className="card-text">Get started with our detailed tutorial to understand market trends.</p>
              <Link to="/tutorial" className="btn btn-primary">Start Tutorial</Link>
            </div>
          </div>
          <div className="card card-custom">
            <div className="card-body">
              <h5 className="card-title">Stock Game</h5>
              <p className="card-text">Test your skills with our interactive stock trading game.</p>
              <Link to="/stock_game" className="btn btn-success">Go to Stock Game</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;