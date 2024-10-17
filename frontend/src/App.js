import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Ch1 from './components/Ch1';
import IntroFinanceForm from './components/IntroFinanceForm';
import FinancialStatementForm from './components/FinancialStatementForm';
import FinancialMathForm from './components/FinancialMathForm';
import WaccForm from './components/WaccForm';
import FinancialInstrumentsForm from './components/FinancialInstrumentsForm';
import RiskReturnForm from './components/RiskReturnForm';
import InvestmentAnalysisForm from './components/InvestmentAnalysisForm';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro_finance_form" element={<IntroFinanceForm />} />
        <Route path="/financial_statement_form" element={<FinancialStatementForm />} />
        <Route path="/financial_math_form" element={<FinancialMathForm />} />
        <Route path="/wacc/wacc_form" element={<WaccForm />} />
        <Route path="/financial_instruments_form" element={<FinancialInstrumentsForm />} />
        <Route path="/risk_return_form" element={<RiskReturnForm />} />
        <Route path="/investment_analysis_form" element={<InvestmentAnalysisForm />} />
        <Route path="/ch1" element={<Ch1 />} />
      </Routes>
    </Router>
  );
}

export default App;