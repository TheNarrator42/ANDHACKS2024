import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typed from 'typed.js';
import './Home.css'; // Ensure the CSS file is correctly imported

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      strings: ["Free path to financial literacy", "Test your financial decision skills", "Learn step-by-step"],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 2000, // Delay after text is typed before deleting
      loop: true,
      cursorChar: '|', // Ensure the cursor character is a pipe
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
      </div>
      <div className="hero-cards">
        <div className="card card-custom">
          <div className="card-body">
            <h5 className="card-title">Tutorial</h5>
            <p className="card-text">Get started with our detailed tutorial to understand market trends.</p>
            <button onClick={() => navigate('/tutorial')} className="btn btn-primary">Start Tutorial</button>
          </div>
        </div>
        <div className="card card-custom">
          <div className="card-body">
            <h5 className="card-title">Stock Game</h5>
            <p className="card-text">Test your skills with our interactive stock trading game.</p>
            <button onClick={() => navigate('/stock_game')} className="btn btn-success">Go to Stock Game</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;