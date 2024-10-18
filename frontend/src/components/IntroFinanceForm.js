import React from 'react';
import { Link } from 'react-router-dom';

const IntroFinanceForm = () => {
  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">Table of Contents</h1>

      <div className="row mb-2">
        {/* Card 1 */}
        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">Chapter 1</strong>
              <h3 className="mb-0">Introduction to Finance</h3>
              <p className="card-text mb-auto">Learn the basics of finance and its importance in the corporate world.</p>
              <Link to="/get_ch1" className="icon-link gap-1 icon-link-hover stretched-link">
                Start reading
                <svg className="bi"><use xlinkHref="#chevron-right"></use></svg>
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <img src="/static/img/Obj_Financial_M.webp" className="bd-placeholder-img" width="200" height="250" alt="Intro to Finance Image" />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">Chapter 2</strong>
              <h3 className="mb-0">Reviewing Financial Statements</h3>
              <p className="card-text mb-auto">Discover the critical roles that financial managers play in corporate success.</p>
              <Link to="#" className="icon-link gap-1 icon-link-hover stretched-link">
                Start reading
                <svg className="bi"><use xlinkHref="#chevron-right"></use></svg>
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <img src="/static/img/roles_financial_managers.webp" className="bd-placeholder-img" width="200" height="250" alt="Roles Image" />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        {/* Card 3 */}
        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">Chapter 3</strong>
              <h3 className="mb-0">Analyzing Financial Statements</h3>
              <p className="card-text mb-auto">Understand the different divisions within finance, such as corporate, markets, and institutions.</p>
              <Link to="#" className="icon-link gap-1 icon-link-hover stretched-link">
                Start reading
                <svg className="bi"><use xlinkHref="#chevron-right"></use></svg>
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <img src="/static/img/divisions_finance.webp" className="bd-placeholder-img" width="200" height="250" alt="Divisions Image" />
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">Chapter 4</strong>
              <h3 className="mb-0">Financial Planning</h3>
              <p className="card-text mb-auto">Learn about the importance of financial planning and how it impacts business decisions.</p>
              <Link to="#" className="icon-link gap-1 icon-link-hover stretched-link">
                Start reading
                <svg className="bi"><use xlinkHref="#chevron-right"></use></svg>
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <img src="/static/img/financial_planning.webp" className="bd-placeholder-img" width="200" height="250" alt="Financial Planning Image" />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        {/* Card 5 */}
        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">Chapter 5</strong>
              <h3 className="mb-0">Capital Budgeting</h3>
              <p className="card-text mb-auto">Explore the process of capital budgeting and its significance in financial management.</p>
              <Link to="#" className="icon-link gap-1 icon-link-hover stretched-link">
                Start reading
                <svg className="bi"><use xlinkHref="#chevron-right"></use></svg>
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <img src="/static/img/capital_budgeting.webp" className="bd-placeholder-img" width="200" height="250" alt="Capital Budgeting Image" />
            </div>
          </div>
        </div>

        {/* Card 6 */}
        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">Chapter 6</strong>
              <h3 className="mb-0">Risk Management</h3>
              <p className="card-text mb-auto">Understand the principles of risk management and how to mitigate financial risks.</p>
              <Link to="#" className="icon-link gap-1 icon-link-hover stretched-link">
                Start reading
                <svg className="bi"><use xlinkHref="#chevron-right"></use></svg>
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <img src="/static/img/risk_management.webp" className="bd-placeholder-img" width="200" height="250" alt="Risk Management Image" />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        {/* Card 7 */}
        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">Chapter 7</strong>
              <h3 className="mb-0">Financial Markets</h3>
              <p className="card-text mb-auto">Learn about the structure and function of financial markets and their role in the economy.</p>
              <Link to="#" className="icon-link gap-1 icon-link-hover stretched-link">
                Start reading
                <svg className="bi"><use xlinkHref="#chevron-right"></use></svg>
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <img src="/static/img/financial_markets.webp" className="bd-placeholder-img" width="200" height="250" alt="Financial Markets Image" />
            </div>
          </div>
        </div>

        {/* Card 8 */}
        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">Chapter 8</strong>
              <h3 className="mb-0">Investment Analysis</h3>
              <p className="card-text mb-auto">Discover the techniques used in investment analysis and portfolio management.</p>
              <Link to="#" className="icon-link gap-1 icon-link-hover stretched-link">
                Start reading
                <svg className="bi"><use xlinkHref="#chevron-right"></use></svg>
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <img src="/static/img/investment_analysis.webp" className="bd-placeholder-img" width="200" height="250" alt="Investment Analysis Image" />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        {/* Card 9 */}
        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">Chapter 9</strong>
              <h3 className="mb-0">Corporate Finance</h3>
              <p className="card-text mb-auto">Understand the key concepts and strategies in corporate finance.</p>
              <Link to="#" className="icon-link gap-1 icon-link-hover stretched-link">
                Start reading
                <svg className="bi"><use xlinkHref="#chevron-right"></use></svg>
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <img src="/static/img/corporate_finance.webp" className="bd-placeholder-img" width="200" height="250" alt="Corporate Finance Image" />
            </div>
          </div>
        </div>

        {/* Card 10 */}
        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">Chapter 10</strong>
              <h3 className="mb-0">International Finance</h3>
              <p className="card-text mb-auto">Explore the complexities of international finance and global financial markets.</p>
              <Link to="#" className="icon-link gap-1 icon-link-hover stretched-link">
                Start reading
                <svg className="bi"><use xlinkHref="#chevron-right"></use></svg>
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <img src="/static/img/international_finance.webp" className="bd-placeholder-img" width="200" height="250" alt="International Finance Image" />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        {/* Card 11 */}
        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">Chapter 11</strong>
              <h3 className="mb-0">Behavioral Finance</h3>
              <p className="card-text mb-auto">Learn about the psychological factors that influence financial decision-making.</p>
              <Link to="#" className="icon-link gap-1 icon-link-hover stretched-link">
                Start reading
                <svg className="bi"><use xlinkHref="#chevron-right"></use></svg>
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <img src="/static/img/behavioral_finance.webp" className="bd-placeholder-img" width="200" height="250" alt="Behavioral Finance Image" />
            </div>
          </div>
        </div>

        {/* Card 12 */}
        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">Chapter 12</strong>
              <h3 className="mb-0">Financial Technology</h3>
              <p className="card-text mb-auto">Explore the impact of technology on finance, including fintech innovations.</p>
              <Link to="#" className="icon-link gap-1 icon-link-hover stretched-link">
                Start reading
                <svg className="bi"><use xlinkHref="#chevron-right"></use></svg>
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <img src="/static/img/financial_technology.webp" className="bd-placeholder-img" width="200" height="250" alt="Financial Technology Image" />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        {/* Card 13 */}
        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">Chapter 13</strong>
              <h3 className="mb-0">Ethics in Finance</h3>
              <p className="card-text mb-auto">Understand the importance of ethics in finance and how to uphold ethical standards.</p>
              <Link to="#" className="icon-link gap-1 icon-link-hover stretched-link">
                Start reading
                <svg className="bi"><use xlinkHref="#chevron-right"></use></svg>
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <img src="/static/img/ethics_finance.webp" className="bd-placeholder-img" width="200" height="250" alt="Ethics in Finance Image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroFinanceForm;