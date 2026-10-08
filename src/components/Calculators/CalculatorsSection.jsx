import React, { useState } from 'react';
import { Calculator, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './CalculatorsSection.css';

export default function CalculatorsSection() {
  const { openScheduleModal } = useApp();

  // Mode: 'mortgage' | 'investment'
  const [calcMode, setCalcMode] = useState('mortgage');

  // Mortgage Calculator Inputs
  const [propertyPrice, setPropertyPrice] = useState(185000000); // 18.5 Cr
  const [downPaymentPct, setDownPaymentPct] = useState(20); // 20%
  const [loanTenureYears, setLoanTenureYears] = useState(20); // 20 yrs
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%

  // Investment Calculator Inputs
  const [expectedRentMonthly, setExpectedRentMonthly] = useState(650000); // 6.5L/mo
  const [annualAppreciationPct, setAnnualAppreciationPct] = useState(12.5); // 12.5%
  const [holdingPeriodYears, setHoldingPeriodYears] = useState(5); // 5 yrs

  // Mortgage Calculations
  const downPaymentAmount = (propertyPrice * downPaymentPct) / 100;
  const loanPrincipal = propertyPrice - downPaymentAmount;
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = loanTenureYears * 12;

  // EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const emi = Math.round(
    (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalAmountPayable = emi * totalMonths;
  const totalInterest = totalAmountPayable - loanPrincipal;

  // Investment Calculations
  const annualRentalIncome = expectedRentMonthly * 12;
  const grossRentalYield = ((annualRentalIncome / propertyPrice) * 100).toFixed(2);
  const futureValue = Math.round(
    propertyPrice * Math.pow(1 + annualAppreciationPct / 100, holdingPeriodYears)
  );
  const projectedCapitalGain = futureValue - propertyPrice;
  const totalRentalEarned = annualRentalIncome * holdingPeriodYears;
  const totalProjectedWealth = projectedCapitalGain + totalRentalEarned;

  const formatCr = (num) => {
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(num / 100000).toFixed(2)} Lakh`;
  };

  return (
    <section className="calculators-section" id="calculators-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="sub-label">
            <span>FINANCIAL INTELLIGENCE ATELIER</span>
          </div>
          <h2 className="main-title">
            MORTGAGE & <span>INVESTMENT RETURN MODELS</span>
          </h2>
        </div>

        {/* Calculator Switcher */}
        <div className="calc-card glass-panel">
          <div className="calc-mode-tabs">
            <button
              type="button"
              className={`calc-mode-btn ${calcMode === 'mortgage' ? 'active' : ''}`}
              onClick={() => setCalcMode('mortgage')}
            >
              <Calculator size={16} />
              <span>SUPER-LUXURY MORTGAGE / EMI</span>
            </button>
            <button
              type="button"
              className={`calc-mode-btn ${calcMode === 'investment' ? 'active' : ''}`}
              onClick={() => setCalcMode('investment')}
            >
              <TrendingUp size={16} />
              <span>CAPITAL APPRECIATION & YIELD ROI</span>
            </button>
          </div>

          {/* Mortgage Mode */}
          {calcMode === 'mortgage' ? (
            <div className="calc-stage-grid">
              {/* Sliders Input Column */}
              <div className="calc-inputs-col">
                {/* Property Valuation Slider */}
                <div className="slider-control-item">
                  <div className="ctrl-header">
                    <span className="ctrl-title">Property Valuation</span>
                    <span className="ctrl-val">{formatCr(propertyPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="20000000"
                    max="500000000"
                    step="5000000"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    className="calc-range-slider"
                  />
                  <div className="range-bounds">
                    <span>₹2 Cr</span>
                    <span>₹25 Cr</span>
                    <span>₹50 Cr</span>
                  </div>
                </div>

                {/* Down Payment Slider */}
                <div className="slider-control-item">
                  <div className="ctrl-header">
                    <span className="ctrl-title">Down Payment ({downPaymentPct}%)</span>
                    <span className="ctrl-val">{formatCr(downPaymentAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={downPaymentPct}
                    onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                    className="calc-range-slider"
                  />
                  <div className="range-bounds">
                    <span>10%</span>
                    <span>30%</span>
                    <span>60%</span>
                  </div>
                </div>

                {/* Loan Tenure Slider */}
                <div className="slider-control-item">
                  <div className="ctrl-header">
                    <span className="ctrl-title">Loan Tenure</span>
                    <span className="ctrl-val">{loanTenureYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={loanTenureYears}
                    onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                    className="calc-range-slider"
                  />
                  <div className="range-bounds">
                    <span>5 Yrs</span>
                    <span>15 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>

                {/* Interest Rate Slider */}
                <div className="slider-control-item">
                  <div className="ctrl-header">
                    <span className="ctrl-title">Private Banking Interest Rate</span>
                    <span className="ctrl-val">{interestRate}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="7.0"
                    max="12.0"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="calc-range-slider"
                  />
                  <div className="range-bounds">
                    <span>7.0%</span>
                    <span>9.5%</span>
                    <span>12.0%</span>
                  </div>
                </div>
              </div>

              {/* Output Summary Column */}
              <div className="calc-outputs-col">
                <div className="emi-result-card">
                  <span className="emi-label">PROJECTED MONTHLY COMMITMENT</span>
                  <div className="emi-number">{formatCr(emi)} / mo</div>
                  <p className="emi-note">Based on amortisation formula for accredited private banking credit</p>
                </div>

                <div className="breakdown-grid">
                  <div className="bd-item">
                    <span className="bd-label">Loan Principal</span>
                    <span className="bd-val">{formatCr(loanPrincipal)}</span>
                  </div>
                  <div className="bd-item">
                    <span className="bd-label">Total Interest</span>
                    <span className="bd-val gold">{formatCr(totalInterest)}</span>
                  </div>
                  <div className="bd-item">
                    <span className="bd-label">Total Repayment</span>
                    <span className="bd-val">{formatCr(totalAmountPayable)}</span>
                  </div>
                  <div className="bd-item">
                    <span className="bd-label">Equity Down Payment</span>
                    <span className="bd-val">{formatCr(downPaymentAmount)}</span>
                  </div>
                </div>

                {/* Visual Ratio Bar */}
                <div className="ratio-bar-wrap">
                  <div
                    className="ratio-fill principal"
                    style={{ width: `${(loanPrincipal / totalAmountPayable) * 100}%` }}
                    title="Principal"
                  />
                  <div
                    className="ratio-fill interest"
                    style={{ width: `${(totalInterest / totalAmountPayable) * 100}%` }}
                    title="Interest"
                  />
                </div>
                <div className="ratio-legend">
                  <span className="leg-item"><span className="leg-dot principal"></span> Principal</span>
                  <span className="leg-item"><span className="leg-dot interest"></span> Total Interest</span>
                </div>

                <button
                  type="button"
                  className="btn-primary calc-apply-btn"
                  onClick={() => openScheduleModal()}
                >
                  <span>CONNECT WITH PRIVATE BANKING LIAISON</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          ) : (
            /* Investment & ROI Mode */
            <div className="calc-stage-grid">
              {/* Sliders Input Column */}
              <div className="calc-inputs-col">
                <div className="slider-control-item">
                  <div className="ctrl-header">
                    <span className="ctrl-title">Asset Valuation</span>
                    <span className="ctrl-val">{formatCr(propertyPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="20000000"
                    max="500000000"
                    step="5000000"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    className="calc-range-slider"
                  />
                </div>

                <div className="slider-control-item">
                  <div className="ctrl-header">
                    <span className="ctrl-title">Projected Monthly Rent</span>
                    <span className="ctrl-val">₹{(expectedRentMonthly / 100000).toFixed(1)} Lakh / mo</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="2000000"
                    step="50000"
                    value={expectedRentMonthly}
                    onChange={(e) => setExpectedRentMonthly(Number(e.target.value))}
                    className="calc-range-slider"
                  />
                </div>

                <div className="slider-control-item">
                  <div className="ctrl-header">
                    <span className="ctrl-title">Annual Capital Appreciation</span>
                    <span className="ctrl-val">{annualAppreciationPct}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="0.5"
                    value={annualAppreciationPct}
                    onChange={(e) => setAnnualAppreciationPct(Number(e.target.value))}
                    className="calc-range-slider"
                  />
                </div>

                <div className="slider-control-item">
                  <div className="ctrl-header">
                    <span className="ctrl-title">Holding Horizon</span>
                    <span className="ctrl-val">{holdingPeriodYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={holdingPeriodYears}
                    onChange={(e) => setHoldingPeriodYears(Number(e.target.value))}
                    className="calc-range-slider"
                  />
                </div>
              </div>

              {/* Output Column */}
              <div className="calc-outputs-col">
                <div className="emi-result-card">
                  <span className="emi-label">PROJECTED ASSET VALUE AT YEAR {holdingPeriodYears}</span>
                  <div className="emi-number gold">{formatCr(futureValue)}</div>
                  <p className="emi-note">Compound annual growth rate modeled at {annualAppreciationPct}% per annum</p>
                </div>

                <div className="breakdown-grid">
                  <div className="bd-item">
                    <span className="bd-label">Gross Rental Yield</span>
                    <span className="bd-val">{grossRentalYield}% p.a.</span>
                  </div>
                  <div className="bd-item">
                    <span className="bd-label">Net Capital Appreciation</span>
                    <span className="bd-val gold">+{formatCr(projectedCapitalGain)}</span>
                  </div>
                  <div className="bd-item">
                    <span className="bd-label">Cumulative Rental Income</span>
                    <span className="bd-val">+{formatCr(totalRentalEarned)}</span>
                  </div>
                  <div className="bd-item">
                    <span className="bd-label">Total Projected Return</span>
                    <span className="bd-val gold">+{formatCr(totalProjectedWealth)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-primary calc-apply-btn"
                  onClick={() => openScheduleModal()}
                >
                  <span>REQUEST BESPOKE PORTFOLIO SYNDICATION</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
