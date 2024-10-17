import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file for styling

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/intro_finance_form">Intro to Finance</Link></li>
        <li><Link to="/financial_statement_form">Financial Statement Analysis</Link></li>
        <li><Link to="/financial_math_form">Financial Mathematics</Link></li>
        <li><Link to="/wacc/wacc_form">WACC Calculation</Link></li>
        <li><Link to="/financial_instruments_form">Financial Instruments & Markets</Link></li>
        <li><Link to="/risk_return_form" className="module-link">Risk and Return</Link></li>
        <li><Link to="/investment_analysis_form" className="module-link">Investment Analysis</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;