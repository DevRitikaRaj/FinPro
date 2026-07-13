/* ============================================================
   CALCULATORS — All 10 financial calculator pages
   ============================================================ */

import { CALCULATORS, EXCHANGE_RATES, CURRENCY_NAMES, CURRENCY_SYMBOLS, TAX_SLABS_OLD, TAX_SLABS_NEW, GST_RATES } from './data.js';
import { formatINR, formatNum, renderFAQ, renderShareButtons, renderRelatedTools, updateMeta } from './components.js';
import { drawDonutChart, drawBarChart, drawLineChart, drawStackedBarChart } from './charts.js';

// ---- Shared calculator page wrapper ----
function calcPage(id, content, initFn) {
    const calc = CALCULATORS.find(c => c.id === id);
    updateMeta(calc.name, calc.description);
    // Schedule init after DOM render
    setTimeout(() => { if (initFn) initFn(); }, 50);
    return `<div class="calc-page"><div class="container">${content}</div></div>`;
}

// ======================== 1. SIP CALCULATOR ========================
export function renderSIPCalculator() {
    return calcPage('sip', `
        <div class="calc-page-header animate-fade-up">
            <h1><span class="page-icon">📈</span> SIP Calculator</h1>
            <p class="page-desc">Calculate how much wealth you can create through a Systematic Investment Plan (SIP) in mutual funds. Visualize your investment growth over time with our interactive calculator.</p>
        </div>

        <div class="calc-widget animate-fade-up">
            <div class="calc-inputs">
                <h3 style="margin-bottom:var(--space-6);color:var(--text-heading)">Enter Your Details</h3>
                <div class="input-group">
                    <label class="input-label">Monthly Investment <span class="input-value" id="sip-amt-val">₹5,000</span></label>
                    <input type="range" class="input-slider" id="sip-amount" min="500" max="200000" step="500" value="5000">
                </div>
                <div class="input-group">
                    <label class="input-label">Expected Return Rate (p.a.) <span class="input-value" id="sip-rate-val">12%</span></label>
                    <input type="range" class="input-slider" id="sip-rate" min="1" max="30" step="0.5" value="12">
                </div>
                <div class="input-group">
                    <label class="input-label">Time Period <span class="input-value" id="sip-years-val">10 years</span></label>
                    <input type="range" class="input-slider" id="sip-years" min="1" max="40" step="1" value="10">
                </div>
                <button class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-4)" onclick="window.__sipCalc()">Calculate SIP Returns</button>
            </div>
            <div class="calc-results">
                <div class="result-cards" id="sip-results">
                    <div class="result-card"><div class="result-card-label">Invested Amount</div><div class="result-card-value" id="sip-invested">₹6,00,000</div></div>
                    <div class="result-card"><div class="result-card-label">Est. Returns</div><div class="result-card-value" id="sip-returns">₹5,58,070</div></div>
                    <div class="result-card highlight"><div class="result-card-label">Total Value</div><div class="result-card-value" id="sip-total">₹11,58,070</div></div>
                </div>
                <div class="chart-container"><canvas id="sip-chart"></canvas></div>
                <div class="chart-legend">
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#38bdf8"></span> Invested</div>
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#22c55e"></span> Returns</div>
                </div>
            </div>
        </div>

        ${renderShareButtons('SIP Calculator - FinCalc Pro')}

        <div class="content-section">
            <h2>📖 What is a SIP?</h2>
            <p>A Systematic Investment Plan (SIP) is a method of investing a fixed amount regularly (usually monthly) in mutual funds. Instead of investing a large lump sum at once, SIP allows you to invest in small installments, making it accessible for beginners and salaried individuals.</p>
            <p>SIP harnesses the power of compounding and rupee cost averaging. By investing consistently regardless of market conditions, you buy more units when prices are low and fewer when prices are high, averaging out your purchase cost over time.</p>
        </div>

        <div class="content-section">
            <h2>⚙️ How SIP Calculator Works</h2>
            <ol>
                <li>Enter your desired <strong>monthly investment amount</strong> using the slider</li>
                <li>Set your <strong>expected annual return rate</strong> (historical average for equity mutual funds is 12-15%)</li>
                <li>Choose the <strong>investment time period</strong> in years</li>
                <li>The calculator instantly shows your total investment, estimated returns, and final corpus</li>
            </ol>
        </div>

        <div class="content-section">
            <h2>📐 SIP Formula</h2>
            <div class="formula-box">
                M = P × [{(1 + r)^n – 1} / r] × (1 + r)
            </div>
            <p>Where: <strong>M</strong> = Maturity amount, <strong>P</strong> = Monthly investment, <strong>r</strong> = Monthly rate of return (annual rate / 12), <strong>n</strong> = Total number of months.</p>
        </div>

        <div class="content-section">
            <h2>💡 Example Calculation</h2>
            <div class="example-box">
                <h4>Example</h4>
                <p><strong>Monthly SIP:</strong> ₹5,000 | <strong>Duration:</strong> 10 years | <strong>Expected Return:</strong> 12% p.a.</p>
                <p><strong>Total Investment:</strong> ₹5,000 × 120 months = ₹6,00,000</p>
                <p><strong>Estimated Returns:</strong> ₹5,58,070</p>
                <p><strong>Total Corpus:</strong> ₹11,58,070</p>
                <p>Your money nearly doubles in 10 years with the power of compounding!</p>
            </div>
        </div>

        <div class="content-section">
            <h2>✅ Benefits of SIP</h2>
            <ul>
                <li><strong>Rupee Cost Averaging:</strong> Buy more units when prices are low, fewer when high</li>
                <li><strong>Power of Compounding:</strong> Your returns earn returns over time</li>
                <li><strong>Disciplined Investing:</strong> Automate your investments with fixed monthly amounts</li>
                <li><strong>Flexibility:</strong> Start with as low as ₹500/month, increase or pause anytime</li>
                <li><strong>No Market Timing:</strong> No need to predict market highs and lows</li>
                <li><strong>Long-Term Wealth Creation:</strong> Ideal for goals like retirement, education, or home purchase</li>
            </ul>
        </div>

        ${renderFAQ([
            { q: 'What is the minimum amount to start a SIP?', a: 'Most mutual fund houses allow SIPs starting from ₹500 per month. Some even offer SIPs starting at ₹100.' },
            { q: 'Is SIP risk-free?', a: 'No, SIP investments in mutual funds are subject to market risk. However, SIP reduces risk through rupee cost averaging over long periods. The longer you stay invested, the lower the risk.' },
            { q: 'Can I stop my SIP anytime?', a: 'Yes, you can stop, pause, or modify your SIP at any time without any penalty. There is no lock-in period for most SIPs (except ELSS which has a 3-year lock-in).' },
            { q: 'What returns can I expect from SIP?', a: 'Returns depend on the type of fund. Equity mutual funds have historically given 12-15% annual returns over 10+ years. Debt funds typically return 6-8%. Past performance does not guarantee future results.' },
            { q: 'SIP vs Lump Sum — which is better?', a: 'SIP is better for most investors as it eliminates the need to time the market. Lump sum can be better if you have a large amount and the market is at a low point. For regular income earners, SIP is generally recommended.' },
            { q: 'Are SIP returns taxable?', a: 'Yes. Equity fund returns are taxed as Short Term Capital Gains (15%) if held less than 1 year, and Long Term Capital Gains (10% above ₹1 lakh) if held more than 1 year.' },
        ], 'sip')}

        ${renderRelatedTools('sip')}
    `, initSIPCalculator);
}

function initSIPCalculator() {
    const amtSlider = document.getElementById('sip-amount');
    const rateSlider = document.getElementById('sip-rate');
    const yearsSlider = document.getElementById('sip-years');
    if (!amtSlider) return;

    function calculate() {
        const P = parseFloat(amtSlider.value);
        const annualRate = parseFloat(rateSlider.value);
        const years = parseInt(yearsSlider.value);
        const r = annualRate / 100 / 12;
        const n = years * 12;
        const invested = P * n;
        const maturity = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        const returns = maturity - invested;

        document.getElementById('sip-amt-val').textContent = formatINR(P);
        document.getElementById('sip-rate-val').textContent = annualRate + '%';
        document.getElementById('sip-years-val').textContent = years + ' years';
        document.getElementById('sip-invested').textContent = formatINR(invested);
        document.getElementById('sip-returns').textContent = formatINR(returns);
        document.getElementById('sip-total').textContent = formatINR(maturity);

        drawDonutChart('sip-chart', [
            { label: 'Invested', value: invested, color: '#38bdf8' },
            { label: 'Returns', value: returns, color: '#22c55e' },
        ], { size: 200, centerText: formatINR(maturity), centerLabel: 'Total' });
    }

    [amtSlider, rateSlider, yearsSlider].forEach(el => el.addEventListener('input', calculate));
    window.__sipCalc = calculate;
    calculate();
}

// ======================== 2. LOAN CALCULATOR ========================
export function renderLoanCalculator() {
    return calcPage('loan', `
        <div class="calc-page-header animate-fade-up">
            <h1><span class="page-icon">🏦</span> Loan Calculator</h1>
            <p class="page-desc">Calculate your Equated Monthly Installment (EMI), total interest payable, and get a complete amortization schedule for any type of loan.</p>
        </div>

        <div class="calc-widget animate-fade-up">
            <div class="calc-inputs">
                <h3 style="margin-bottom:var(--space-6);color:var(--text-heading)">Loan Details</h3>
                <div class="input-group">
                    <label class="input-label">Loan Amount <span class="input-value" id="loan-amt-val">₹10,00,000</span></label>
                    <input type="range" class="input-slider" id="loan-amount" min="50000" max="50000000" step="50000" value="1000000">
                </div>
                <div class="input-group">
                    <label class="input-label">Interest Rate (p.a.) <span class="input-value" id="loan-rate-val">10%</span></label>
                    <input type="range" class="input-slider" id="loan-rate" min="1" max="30" step="0.1" value="10">
                </div>
                <div class="input-group">
                    <label class="input-label">Loan Tenure <span class="input-value" id="loan-tenure-val">5 years</span></label>
                    <input type="range" class="input-slider" id="loan-tenure" min="1" max="30" step="1" value="5">
                </div>
                <button class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-4)" onclick="window.__loanCalc()">Calculate EMI</button>
            </div>
            <div class="calc-results">
                <div class="result-cards">
                    <div class="result-card highlight"><div class="result-card-label">Monthly EMI</div><div class="result-card-value" id="loan-emi">—</div></div>
                    <div class="result-card"><div class="result-card-label">Total Interest</div><div class="result-card-value" id="loan-interest">—</div></div>
                    <div class="result-card"><div class="result-card-label">Total Payment</div><div class="result-card-value" id="loan-total">—</div></div>
                </div>
                <div class="chart-container"><canvas id="loan-chart"></canvas></div>
                <div class="chart-legend">
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#38bdf8"></span> Principal</div>
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#fb7185"></span> Interest</div>
                </div>
            </div>
        </div>

        ${renderShareButtons('Loan Calculator - FinCalc Pro')}

        <div class="content-section">
            <h2>📖 What is an EMI?</h2>
            <p>EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is paid off in full.</p>
            <p>EMI depends on three factors: the loan amount (principal), the interest rate, and the loan tenure. A higher loan amount or interest rate increases the EMI, while a longer tenure reduces it (but increases total interest paid).</p>
        </div>

        <div class="content-section">
            <h2>📐 EMI Formula</h2>
            <div class="formula-box">EMI = P × r × (1 + r)^n / [(1 + r)^n – 1]</div>
            <p>Where: <strong>P</strong> = Principal loan amount, <strong>r</strong> = Monthly interest rate (annual rate / 12 / 100), <strong>n</strong> = Total number of monthly installments.</p>
        </div>

        <div class="content-section">
            <h2>💡 Example</h2>
            <div class="example-box">
                <h4>Example</h4>
                <p><strong>Loan Amount:</strong> ₹10,00,000 | <strong>Interest Rate:</strong> 10% p.a. | <strong>Tenure:</strong> 5 years</p>
                <p><strong>Monthly EMI:</strong> ₹21,247</p>
                <p><strong>Total Interest:</strong> ₹2,74,823</p>
                <p><strong>Total Payment:</strong> ₹12,74,823</p>
            </div>
        </div>

        <div class="content-section">
            <h2>✅ Features</h2>
            <ul>
                <li>Works for any type of loan — personal, car, education, business</li>
                <li>Real-time EMI calculation as you adjust sliders</li>
                <li>Visual pie chart showing principal vs. interest breakdown</li>
                <li>Accurate to the last rupee using standard EMI formula</li>
            </ul>
        </div>

        ${renderFAQ([
            { q: 'What types of loans can I calculate EMI for?', a: 'This calculator works for any reducing balance loan including personal loans, car loans, education loans, business loans, and more.' },
            { q: 'Does a longer tenure mean less EMI?', a: 'Yes, a longer tenure reduces your monthly EMI but increases the total interest paid over the loan period. It\'s a trade-off between monthly affordability and total cost.' },
            { q: 'Is EMI fixed throughout the loan?', a: 'For fixed-rate loans, yes. For floating-rate loans, the EMI may change when the interest rate changes. Most home loans in India are floating rate.' },
            { q: 'Can I prepay my loan to reduce interest?', a: 'Yes! Most loans allow prepayment. Making extra payments reduces the principal faster, saving you interest. Some loans may charge a prepayment penalty, so check with your lender.' },
            { q: 'What is a good EMI-to-income ratio?', a: 'Financial advisors recommend keeping your total EMI payments below 40-50% of your monthly income. This ensures you have enough for other expenses and savings.' },
        ], 'loan')}

        ${renderRelatedTools('loan')}
    `, initLoanCalculator);
}

function initLoanCalculator() {
    const amtSlider = document.getElementById('loan-amount');
    const rateSlider = document.getElementById('loan-rate');
    const tenureSlider = document.getElementById('loan-tenure');
    if (!amtSlider) return;

    function calculate() {
        const P = parseFloat(amtSlider.value);
        const annualRate = parseFloat(rateSlider.value);
        const years = parseInt(tenureSlider.value);
        const r = annualRate / 100 / 12;
        const n = years * 12;
        const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n;
        const totalInterest = totalPayment - P;

        document.getElementById('loan-amt-val').textContent = formatINR(P);
        document.getElementById('loan-rate-val').textContent = annualRate + '%';
        document.getElementById('loan-tenure-val').textContent = years + ' years';
        document.getElementById('loan-emi').textContent = formatINR(emi);
        document.getElementById('loan-interest').textContent = formatINR(totalInterest);
        document.getElementById('loan-total').textContent = formatINR(totalPayment);

        drawDonutChart('loan-chart', [
            { label: 'Principal', value: P, color: '#38bdf8' },
            { label: 'Interest', value: totalInterest, color: '#fb7185' },
        ], { size: 200, centerText: formatINR(emi), centerLabel: 'EMI' });
    }

    [amtSlider, rateSlider, tenureSlider].forEach(el => el.addEventListener('input', calculate));
    window.__loanCalc = calculate;
    calculate();
}

// ======================== 3. HOME LOAN EMI ========================
export function renderHomeLoanEMI() {
    return calcPage('home-loan-emi', `
        <div class="calc-page-header animate-fade-up">
            <h1><span class="page-icon">🏠</span> Home Loan EMI Calculator</h1>
            <p class="page-desc">Plan your dream home purchase. Calculate monthly EMIs, total interest, and see year-wise breakdowns for your home loan with down payment adjustments.</p>
        </div>

        <div class="calc-widget animate-fade-up">
            <div class="calc-inputs">
                <h3 style="margin-bottom:var(--space-6);color:var(--text-heading)">Home Loan Details</h3>
                <div class="input-group">
                    <label class="input-label">Home Price <span class="input-value" id="hl-price-val">₹50,00,000</span></label>
                    <input type="range" class="input-slider" id="hl-price" min="500000" max="100000000" step="100000" value="5000000">
                </div>
                <div class="input-group">
                    <label class="input-label">Down Payment (%) <span class="input-value" id="hl-down-val">20%</span></label>
                    <input type="range" class="input-slider" id="hl-down" min="0" max="50" step="1" value="20">
                </div>
                <div class="input-group">
                    <label class="input-label">Interest Rate (p.a.) <span class="input-value" id="hl-rate-val">8.5%</span></label>
                    <input type="range" class="input-slider" id="hl-rate" min="5" max="20" step="0.1" value="8.5">
                </div>
                <div class="input-group">
                    <label class="input-label">Loan Tenure <span class="input-value" id="hl-tenure-val">20 years</span></label>
                    <input type="range" class="input-slider" id="hl-tenure" min="5" max="30" step="1" value="20">
                </div>
                <button class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-4)" onclick="window.__hlCalc()">Calculate EMI</button>
            </div>
            <div class="calc-results">
                <div class="result-cards">
                    <div class="result-card"><div class="result-card-label">Loan Amount</div><div class="result-card-value" id="hl-loan-amt">—</div></div>
                    <div class="result-card highlight"><div class="result-card-label">Monthly EMI</div><div class="result-card-value" id="hl-emi">—</div></div>
                    <div class="result-card"><div class="result-card-label">Total Interest</div><div class="result-card-value" id="hl-interest">—</div></div>
                    <div class="result-card"><div class="result-card-label">Total Cost</div><div class="result-card-value" id="hl-total">—</div></div>
                </div>
                <div class="chart-container"><canvas id="hl-chart"></canvas></div>
                <div class="chart-legend">
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#a78bfa"></span> Down Payment</div>
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#38bdf8"></span> Principal</div>
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#fb7185"></span> Interest</div>
                </div>
            </div>
        </div>

        ${renderShareButtons('Home Loan EMI Calculator - FinCalc Pro')}

        <div class="content-section">
            <h2>📖 About Home Loans</h2>
            <p>A home loan (housing loan) is a secured loan offered by banks and financial institutions to help you purchase or construct a residential property. The property itself serves as collateral. Home loans typically have lower interest rates compared to unsecured loans because they are backed by the property.</p>
            <p>Understanding your EMI before taking a home loan is crucial for financial planning. This calculator helps you estimate your monthly payments based on home price, down payment, interest rate, and loan tenure.</p>
        </div>

        <div class="content-section">
            <h2>📐 Formula</h2>
            <div class="formula-box">EMI = P × r × (1 + r)^n / [(1 + r)^n – 1]<br>where P = Home Price − Down Payment</div>
        </div>

        <div class="content-section">
            <h2>✅ Tips for Home Buyers</h2>
            <ul>
                <li>Aim for at least 20% down payment to get better interest rates and avoid PMI</li>
                <li>Keep your EMI below 40% of your monthly income</li>
                <li>Compare interest rates from multiple banks before finalizing</li>
                <li>Consider prepaying when you get bonuses or windfalls</li>
                <li>Check for home loan tax benefits under Section 24(b) and Section 80C</li>
            </ul>
        </div>

        ${renderFAQ([
            { q: 'What is the ideal down payment for a home loan?', a: 'Most banks require a minimum of 10-20% down payment. A higher down payment (20%+) reduces your loan amount, EMI, and total interest, and may also help you get a better interest rate.' },
            { q: 'Can I get tax benefits on home loan?', a: 'Yes! Under Indian tax laws, you can claim deduction on principal repayment (Section 80C, up to ₹1.5 lakh) and interest paid (Section 24b, up to ₹2 lakh for self-occupied property).' },
            { q: 'Fixed vs floating rate — which is better?', a: 'Floating rates are generally lower than fixed rates and are more common in India. If you expect rates to decrease, floating is better. Fixed rates provide EMI certainty but are usually 1-2% higher.' },
            { q: 'What documents are needed for a home loan?', a: 'Typically: ID proof, address proof, income proof (salary slips/ITR), bank statements (6 months), property documents, and passport-size photographs.' },
            { q: 'Can I prepay my home loan?', a: 'Yes. RBI mandates that banks cannot charge prepayment penalty on floating rate home loans. Prepaying can significantly reduce your total interest burden.' },
        ], 'home-loan')}

        ${renderRelatedTools('home-loan-emi')}
    `, initHomeLoanCalculator);
}

function initHomeLoanCalculator() {
    const priceSlider = document.getElementById('hl-price');
    const downSlider = document.getElementById('hl-down');
    const rateSlider = document.getElementById('hl-rate');
    const tenureSlider = document.getElementById('hl-tenure');
    if (!priceSlider) return;

    function calculate() {
        const price = parseFloat(priceSlider.value);
        const downPct = parseFloat(downSlider.value);
        const annualRate = parseFloat(rateSlider.value);
        const years = parseInt(tenureSlider.value);
        const downPayment = price * downPct / 100;
        const P = price - downPayment;
        const r = annualRate / 100 / 12;
        const n = years * 12;
        const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n;
        const totalInterest = totalPayment - P;

        document.getElementById('hl-price-val').textContent = formatINR(price);
        document.getElementById('hl-down-val').textContent = downPct + '%';
        document.getElementById('hl-rate-val').textContent = annualRate + '%';
        document.getElementById('hl-tenure-val').textContent = years + ' years';
        document.getElementById('hl-loan-amt').textContent = formatINR(P);
        document.getElementById('hl-emi').textContent = formatINR(emi);
        document.getElementById('hl-interest').textContent = formatINR(totalInterest);
        document.getElementById('hl-total').textContent = formatINR(price + totalInterest);

        drawDonutChart('hl-chart', [
            { label: 'Down Payment', value: downPayment, color: '#a78bfa' },
            { label: 'Principal', value: P, color: '#38bdf8' },
            { label: 'Interest', value: totalInterest, color: '#fb7185' },
        ], { size: 200, centerText: formatINR(emi), centerLabel: 'EMI/mo' });
    }

    [priceSlider, downSlider, rateSlider, tenureSlider].forEach(el => el.addEventListener('input', calculate));
    window.__hlCalc = calculate;
    calculate();
}

// ======================== 4. PERSONAL LOAN EMI ========================
export function renderPersonalLoanEMI() {
    return calcPage('personal-loan-emi', `
        <div class="calc-page-header animate-fade-up">
            <h1><span class="page-icon">💳</span> Personal Loan EMI Calculator</h1>
            <p class="page-desc">Instantly calculate your personal loan EMI. Compare scenarios with and without prepayment to see how much you can save.</p>
        </div>

        <div class="calc-widget animate-fade-up">
            <div class="calc-inputs">
                <h3 style="margin-bottom:var(--space-6);color:var(--text-heading)">Personal Loan Details</h3>
                <div class="input-group">
                    <label class="input-label">Loan Amount <span class="input-value" id="pl-amt-val">₹5,00,000</span></label>
                    <input type="range" class="input-slider" id="pl-amount" min="10000" max="5000000" step="10000" value="500000">
                </div>
                <div class="input-group">
                    <label class="input-label">Interest Rate (p.a.) <span class="input-value" id="pl-rate-val">14%</span></label>
                    <input type="range" class="input-slider" id="pl-rate" min="8" max="36" step="0.5" value="14">
                </div>
                <div class="input-group">
                    <label class="input-label">Tenure (months) <span class="input-value" id="pl-tenure-val">36 months</span></label>
                    <input type="range" class="input-slider" id="pl-tenure" min="6" max="84" step="1" value="36">
                </div>
                <button class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-4)" onclick="window.__plCalc()">Calculate EMI</button>
            </div>
            <div class="calc-results">
                <div class="result-cards">
                    <div class="result-card highlight"><div class="result-card-label">Monthly EMI</div><div class="result-card-value" id="pl-emi">—</div></div>
                    <div class="result-card"><div class="result-card-label">Total Interest</div><div class="result-card-value" id="pl-interest">—</div></div>
                    <div class="result-card"><div class="result-card-label">Total Payment</div><div class="result-card-value" id="pl-total">—</div></div>
                </div>
                <div class="chart-container"><canvas id="pl-chart"></canvas></div>
                <div class="chart-legend">
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#38bdf8"></span> Principal</div>
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#fb7185"></span> Interest</div>
                </div>
            </div>
        </div>

        ${renderShareButtons('Personal Loan EMI Calculator - FinCalc Pro')}

        <div class="content-section">
            <h2>📖 About Personal Loans</h2>
            <p>A personal loan is an unsecured loan that doesn't require any collateral. It can be used for any purpose — medical emergencies, weddings, travel, debt consolidation, or home renovation. Since personal loans are unsecured, they typically carry higher interest rates (10-24%) compared to secured loans.</p>
        </div>

        <div class="content-section">
            <h2>📐 Formula</h2>
            <div class="formula-box">EMI = P × r × (1 + r)^n / [(1 + r)^n – 1]</div>
            <p>Where: <strong>P</strong> = Loan amount, <strong>r</strong> = Monthly interest rate, <strong>n</strong> = Number of monthly installments.</p>
        </div>

        <div class="content-section">
            <h2>✅ Personal Loan Tips</h2>
            <ul>
                <li>Compare rates from multiple lenders before applying</li>
                <li>Check your credit score — a higher score gets better rates</li>
                <li>Keep loan tenure short to minimize total interest</li>
                <li>Read the fine print for processing fees, prepayment charges, and hidden costs</li>
                <li>Avoid multiple loan applications in a short period as each enquiry affects your credit score</li>
            </ul>
        </div>

        ${renderFAQ([
            { q: 'What credit score is needed for a personal loan?', a: 'Most banks require a minimum CIBIL score of 700-750. Higher scores (750+) get better interest rates and faster approvals.' },
            { q: 'Can I prepay a personal loan?', a: 'Yes, most lenders allow prepayment after a lock-in period (usually 6-12 months). Some charge a prepayment penalty of 2-5% of the outstanding amount.' },
            { q: 'How quickly can I get a personal loan?', a: 'Many banks and NBFCs offer instant personal loans with disbursal within hours if you are an existing customer. New customers may take 2-7 business days.' },
            { q: 'What is the maximum personal loan amount I can get?', a: 'It depends on your income, credit score, and existing obligations. Generally, banks offer up to 10-20 times your monthly salary, with a maximum of ₹25-40 lakh.' },
        ], 'personal-loan')}

        ${renderRelatedTools('personal-loan-emi')}
    `, initPersonalLoanCalculator);
}

function initPersonalLoanCalculator() {
    const amtSlider = document.getElementById('pl-amount');
    const rateSlider = document.getElementById('pl-rate');
    const tenureSlider = document.getElementById('pl-tenure');
    if (!amtSlider) return;

    function calculate() {
        const P = parseFloat(amtSlider.value);
        const annualRate = parseFloat(rateSlider.value);
        const months = parseInt(tenureSlider.value);
        const r = annualRate / 100 / 12;
        const emi = P * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
        const totalPayment = emi * months;
        const totalInterest = totalPayment - P;

        document.getElementById('pl-amt-val').textContent = formatINR(P);
        document.getElementById('pl-rate-val').textContent = annualRate + '%';
        document.getElementById('pl-tenure-val').textContent = months + ' months';
        document.getElementById('pl-emi').textContent = formatINR(emi);
        document.getElementById('pl-interest').textContent = formatINR(totalInterest);
        document.getElementById('pl-total').textContent = formatINR(totalPayment);

        drawDonutChart('pl-chart', [
            { label: 'Principal', value: P, color: '#38bdf8' },
            { label: 'Interest', value: totalInterest, color: '#fb7185' },
        ], { size: 200, centerText: formatINR(emi), centerLabel: 'EMI' });
    }

    [amtSlider, rateSlider, tenureSlider].forEach(el => el.addEventListener('input', calculate));
    window.__plCalc = calculate;
    calculate();
}

// ======================== 5. FD CALCULATOR ========================
export function renderFDCalculator() {
    return calcPage('fd', `
        <div class="calc-page-header animate-fade-up">
            <h1><span class="page-icon">🔒</span> FD Calculator</h1>
            <p class="page-desc">Calculate the maturity amount and interest earned on your Fixed Deposit. Compare different tenures and compounding frequencies to maximize your returns.</p>
        </div>

        <div class="calc-widget animate-fade-up">
            <div class="calc-inputs">
                <h3 style="margin-bottom:var(--space-6);color:var(--text-heading)">FD Details</h3>
                <div class="input-group">
                    <label class="input-label">Principal Amount <span class="input-value" id="fd-amt-val">₹1,00,000</span></label>
                    <input type="range" class="input-slider" id="fd-amount" min="1000" max="10000000" step="1000" value="100000">
                </div>
                <div class="input-group">
                    <label class="input-label">Interest Rate (p.a.) <span class="input-value" id="fd-rate-val">7%</span></label>
                    <input type="range" class="input-slider" id="fd-rate" min="1" max="15" step="0.1" value="7">
                </div>
                <div class="input-group">
                    <label class="input-label">Tenure <span class="input-value" id="fd-tenure-val">5 years</span></label>
                    <input type="range" class="input-slider" id="fd-tenure" min="1" max="20" step="1" value="5">
                </div>
                <div class="input-group">
                    <label class="input-label">Compounding Frequency</label>
                    <select class="input-select" id="fd-compound">
                        <option value="4" selected>Quarterly</option>
                        <option value="12">Monthly</option>
                        <option value="2">Half-Yearly</option>
                        <option value="1">Yearly</option>
                    </select>
                </div>
                <button class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-4)" onclick="window.__fdCalc()">Calculate Maturity</button>
            </div>
            <div class="calc-results">
                <div class="result-cards">
                    <div class="result-card"><div class="result-card-label">Principal</div><div class="result-card-value" id="fd-principal">—</div></div>
                    <div class="result-card"><div class="result-card-label">Interest Earned</div><div class="result-card-value" id="fd-interest">—</div></div>
                    <div class="result-card highlight"><div class="result-card-label">Maturity Amount</div><div class="result-card-value" id="fd-maturity">—</div></div>
                </div>
                <div class="chart-container"><canvas id="fd-chart"></canvas></div>
                <div class="chart-legend">
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#f0b429"></span> Principal</div>
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#22c55e"></span> Interest</div>
                </div>
            </div>
        </div>

        ${renderShareButtons('FD Calculator - FinCalc Pro')}

        <div class="content-section">
            <h2>📖 What is a Fixed Deposit?</h2>
            <p>A Fixed Deposit (FD) is a financial instrument offered by banks and NBFCs where you deposit a lump sum for a fixed period at a predetermined interest rate. FDs are one of the safest investment options in India, offering guaranteed returns regardless of market conditions.</p>
            <p>FDs are ideal for risk-averse investors who want capital protection with steady returns. Interest is compounded at regular intervals (quarterly, monthly, etc.), allowing your money to grow faster than simple interest.</p>
        </div>

        <div class="content-section">
            <h2>📐 FD Formula (Compound Interest)</h2>
            <div class="formula-box">A = P × (1 + r/n)^(n×t)</div>
            <p>Where: <strong>A</strong> = Maturity amount, <strong>P</strong> = Principal, <strong>r</strong> = Annual interest rate (decimal), <strong>n</strong> = Compounding frequency per year, <strong>t</strong> = Time in years.</p>
        </div>

        <div class="content-section">
            <h2>✅ Benefits of FD</h2>
            <ul>
                <li><strong>Guaranteed Returns:</strong> Fixed interest rate, unaffected by market fluctuations</li>
                <li><strong>Capital Safety:</strong> Deposits up to ₹5 lakh are insured under DICGC</li>
                <li><strong>Tax Benefits:</strong> 5-year tax-saving FDs qualify for Section 80C deduction</li>
                <li><strong>Loan Against FD:</strong> You can take a loan up to 90% of your FD value</li>
                <li><strong>Senior Citizen Benefits:</strong> Extra 0.25-0.50% interest for senior citizens</li>
            </ul>
        </div>

        ${renderFAQ([
            { q: 'What is the minimum FD amount?', a: 'Most banks allow FDs starting from ₹1,000 to ₹10,000. Some banks and post offices accept FDs from ₹100.' },
            { q: 'Is FD interest taxable?', a: 'Yes, FD interest is added to your income and taxed as per your income tax slab. Banks deduct TDS at 10% if annual interest exceeds ₹40,000 (₹50,000 for senior citizens).' },
            { q: 'Can I withdraw FD before maturity?', a: 'Yes, premature withdrawal is allowed but usually attracts a penalty of 0.5-1% on the interest rate. Some banks offer no-penalty FDs.' },
            { q: 'Which compounding frequency is best?', a: 'More frequent compounding (monthly or quarterly) gives slightly higher returns than yearly compounding. Most banks use quarterly compounding.' },
            { q: 'FD vs Recurring Deposit — which is better?', a: 'FD is better if you have a lump sum to invest. RD is better for monthly savings. FD generally earns slightly more interest than RD for the same rate and tenure because the full amount compounds from day one.' },
        ], 'fd')}

        ${renderRelatedTools('fd')}
    `, initFDCalculator);
}

function initFDCalculator() {
    const amtSlider = document.getElementById('fd-amount');
    const rateSlider = document.getElementById('fd-rate');
    const tenureSlider = document.getElementById('fd-tenure');
    const compoundSelect = document.getElementById('fd-compound');
    if (!amtSlider) return;

    function calculate() {
        const P = parseFloat(amtSlider.value);
        const rate = parseFloat(rateSlider.value);
        const years = parseInt(tenureSlider.value);
        const n = parseInt(compoundSelect.value);
        const r = rate / 100;
        const maturity = P * Math.pow(1 + r / n, n * years);
        const interest = maturity - P;

        document.getElementById('fd-amt-val').textContent = formatINR(P);
        document.getElementById('fd-rate-val').textContent = rate + '%';
        document.getElementById('fd-tenure-val').textContent = years + ' years';
        document.getElementById('fd-principal').textContent = formatINR(P);
        document.getElementById('fd-interest').textContent = formatINR(interest);
        document.getElementById('fd-maturity').textContent = formatINR(maturity);

        drawDonutChart('fd-chart', [
            { label: 'Principal', value: P, color: '#f0b429' },
            { label: 'Interest', value: interest, color: '#22c55e' },
        ], { size: 200, centerText: formatINR(maturity), centerLabel: 'Maturity' });
    }

    [amtSlider, rateSlider, tenureSlider].forEach(el => el.addEventListener('input', calculate));
    compoundSelect.addEventListener('change', calculate);
    window.__fdCalc = calculate;
    calculate();
}

// ======================== 6. RD CALCULATOR ========================
export function renderRDCalculator() {
    return calcPage('rd', `
        <div class="calc-page-header animate-fade-up">
            <h1><span class="page-icon">🪙</span> RD Calculator</h1>
            <p class="page-desc">Estimate your Recurring Deposit maturity value. See how your monthly savings grow over time with the power of compound interest.</p>
        </div>

        <div class="calc-widget animate-fade-up">
            <div class="calc-inputs">
                <h3 style="margin-bottom:var(--space-6);color:var(--text-heading)">RD Details</h3>
                <div class="input-group">
                    <label class="input-label">Monthly Deposit <span class="input-value" id="rd-amt-val">₹5,000</span></label>
                    <input type="range" class="input-slider" id="rd-amount" min="100" max="100000" step="100" value="5000">
                </div>
                <div class="input-group">
                    <label class="input-label">Interest Rate (p.a.) <span class="input-value" id="rd-rate-val">7%</span></label>
                    <input type="range" class="input-slider" id="rd-rate" min="1" max="15" step="0.1" value="7">
                </div>
                <div class="input-group">
                    <label class="input-label">Tenure <span class="input-value" id="rd-tenure-val">5 years</span></label>
                    <input type="range" class="input-slider" id="rd-tenure" min="1" max="10" step="1" value="5">
                </div>
                <button class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-4)" onclick="window.__rdCalc()">Calculate Maturity</button>
            </div>
            <div class="calc-results">
                <div class="result-cards">
                    <div class="result-card"><div class="result-card-label">Total Deposited</div><div class="result-card-value" id="rd-deposited">—</div></div>
                    <div class="result-card"><div class="result-card-label">Interest Earned</div><div class="result-card-value" id="rd-interest">—</div></div>
                    <div class="result-card highlight"><div class="result-card-label">Maturity Value</div><div class="result-card-value" id="rd-maturity">—</div></div>
                </div>
                <div class="chart-container"><canvas id="rd-chart"></canvas></div>
                <div class="chart-legend">
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#2dd4bf"></span> Deposited</div>
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#f0b429"></span> Interest</div>
                </div>
            </div>
        </div>

        ${renderShareButtons('RD Calculator - FinCalc Pro')}

        <div class="content-section">
            <h2>📖 What is a Recurring Deposit?</h2>
            <p>A Recurring Deposit (RD) is a savings scheme offered by banks and post offices where you deposit a fixed amount every month for a predetermined period. At maturity, you receive your total deposits plus compound interest earned. RDs are ideal for building savings through small, regular contributions.</p>
        </div>

        <div class="content-section">
            <h2>📐 RD Formula</h2>
            <div class="formula-box">M = P × [(1 + r/n)^(n×t) – 1] / [1 – (1 + r/n)^(-1/n)]</div>
            <p>Where: <strong>M</strong> = Maturity value, <strong>P</strong> = Monthly installment, <strong>r</strong> = Annual interest rate, <strong>n</strong> = Compounding frequency (4 for quarterly), <strong>t</strong> = Time in years.</p>
        </div>

        <div class="content-section">
            <h2>✅ Benefits of RD</h2>
            <ul>
                <li>Start with as low as ₹100/month</li>
                <li>Builds a disciplined savings habit</li>
                <li>Guaranteed returns like FD</li>
                <li>Available at all banks and post offices</li>
                <li>Can be opened for minors too</li>
            </ul>
        </div>

        ${renderFAQ([
            { q: 'What is the minimum RD amount?', a: 'Most banks allow RDs starting from ₹100-500 per month. Post office RDs start from ₹100.' },
            { q: 'Is RD interest taxable?', a: 'Yes, RD interest is taxable as per your income tax slab. TDS is applicable if interest exceeds ₹40,000 in a year.' },
            { q: 'Can I miss an RD installment?', a: 'Missing installments attracts a penalty. Most banks charge ₹1-2 per ₹100 of installment per month of delay. Continuous defaults may lead to premature closure.' },
            { q: 'RD vs SIP — which is better?', a: 'RD offers guaranteed but lower returns (6-7%). SIP in mutual funds offers potentially higher returns (12-15%) but with market risk. Choose based on your risk appetite.' },
        ], 'rd')}

        ${renderRelatedTools('rd')}
    `, initRDCalculator);
}

function initRDCalculator() {
    const amtSlider = document.getElementById('rd-amount');
    const rateSlider = document.getElementById('rd-rate');
    const tenureSlider = document.getElementById('rd-tenure');
    if (!amtSlider) return;

    function calculate() {
        const P = parseFloat(amtSlider.value);
        const rate = parseFloat(rateSlider.value);
        const years = parseInt(tenureSlider.value);
        const n = 4; // quarterly compounding
        const r = rate / 100;
        const totalMonths = years * 12;
        const totalDeposited = P * totalMonths;

        // RD maturity calculation
        let maturity = 0;
        for (let i = 0; i < totalMonths; i++) {
            const monthsRemaining = totalMonths - i;
            maturity += P * Math.pow(1 + r / n, n * monthsRemaining / 12);
        }
        const interest = maturity - totalDeposited;

        document.getElementById('rd-amt-val').textContent = formatINR(P);
        document.getElementById('rd-rate-val').textContent = rate + '%';
        document.getElementById('rd-tenure-val').textContent = years + ' years';
        document.getElementById('rd-deposited').textContent = formatINR(totalDeposited);
        document.getElementById('rd-interest').textContent = formatINR(interest);
        document.getElementById('rd-maturity').textContent = formatINR(maturity);

        drawDonutChart('rd-chart', [
            { label: 'Deposited', value: totalDeposited, color: '#2dd4bf' },
            { label: 'Interest', value: interest, color: '#f0b429' },
        ], { size: 200, centerText: formatINR(maturity), centerLabel: 'Maturity' });
    }

    [amtSlider, rateSlider, tenureSlider].forEach(el => el.addEventListener('input', calculate));
    window.__rdCalc = calculate;
    calculate();
}

// ======================== 7. MUTUAL FUND CALCULATOR ========================
export function renderMutualFundCalculator() {
    return calcPage('mutual-fund', `
        <div class="calc-page-header animate-fade-up">
            <h1><span class="page-icon">📊</span> Mutual Fund Returns Calculator</h1>
            <p class="page-desc">Project your mutual fund returns for both SIP and lumpsum investments. Visualize wealth growth with interactive charts.</p>
        </div>

        <div class="calc-widget animate-fade-up">
            <div class="calc-inputs">
                <h3 style="margin-bottom:var(--space-6);color:var(--text-heading)">Investment Details</h3>
                <div class="toggle-group">
                    <button class="toggle-btn active" id="mf-sip-btn" onclick="window.__mfToggle('sip')">SIP</button>
                    <button class="toggle-btn" id="mf-lump-btn" onclick="window.__mfToggle('lumpsum')">Lumpsum</button>
                </div>
                <div class="input-group">
                    <label class="input-label"><span id="mf-amt-label">Monthly Investment</span> <span class="input-value" id="mf-amt-val">₹10,000</span></label>
                    <input type="range" class="input-slider" id="mf-amount" min="500" max="500000" step="500" value="10000">
                </div>
                <div class="input-group">
                    <label class="input-label">Expected Return Rate (p.a.) <span class="input-value" id="mf-rate-val">12%</span></label>
                    <input type="range" class="input-slider" id="mf-rate" min="1" max="30" step="0.5" value="12">
                </div>
                <div class="input-group">
                    <label class="input-label">Time Period <span class="input-value" id="mf-years-val">10 years</span></label>
                    <input type="range" class="input-slider" id="mf-years" min="1" max="30" step="1" value="10">
                </div>
                <button class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-4)" onclick="window.__mfCalc()">Calculate Returns</button>
            </div>
            <div class="calc-results">
                <div class="result-cards">
                    <div class="result-card"><div class="result-card-label">Invested Amount</div><div class="result-card-value" id="mf-invested">—</div></div>
                    <div class="result-card"><div class="result-card-label">Est. Returns</div><div class="result-card-value" id="mf-returns">—</div></div>
                    <div class="result-card highlight"><div class="result-card-label">Total Value</div><div class="result-card-value" id="mf-total">—</div></div>
                </div>
                <div class="chart-container"><canvas id="mf-chart"></canvas></div>
                <div class="chart-legend">
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#818cf8"></span> Invested</div>
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#22c55e"></span> Returns</div>
                </div>
            </div>
        </div>

        ${renderShareButtons('Mutual Fund Returns Calculator - FinCalc Pro')}

        <div class="content-section">
            <h2>📖 About Mutual Funds</h2>
            <p>Mutual funds pool money from multiple investors to invest in stocks, bonds, or other securities. They are professionally managed and offer diversification, making them suitable for both beginners and experienced investors.</p>
            <p>You can invest in mutual funds either through a lump sum (one-time investment) or SIP (regular monthly investment). Each approach has its advantages depending on your financial situation and goals.</p>
        </div>

        <div class="content-section">
            <h2>✅ Types of Mutual Funds</h2>
            <ul>
                <li><strong>Equity Funds:</strong> Invest in stocks. Higher risk, higher potential returns (12-18%)</li>
                <li><strong>Debt Funds:</strong> Invest in bonds. Lower risk, moderate returns (6-9%)</li>
                <li><strong>Hybrid Funds:</strong> Mix of equity and debt. Balanced risk-return</li>
                <li><strong>Index Funds:</strong> Track market indices like Nifty 50 or Sensex. Low cost, market returns</li>
                <li><strong>ELSS (Tax Saving):</strong> Equity funds with 3-year lock-in and tax benefits under Section 80C</li>
            </ul>
        </div>

        ${renderFAQ([
            { q: 'What is the difference between SIP and Lumpsum?', a: 'SIP involves investing a fixed amount regularly (monthly), while lumpsum is a one-time investment. SIP benefits from rupee cost averaging and is suitable for regular income earners. Lumpsum can be better if you have a large sum and the market is favorable.' },
            { q: 'Are mutual fund returns guaranteed?', a: 'No. Mutual fund investments are subject to market risk. Returns are not guaranteed and depend on market performance. However, long-term equity investments (10+ years) have historically delivered positive returns.' },
            { q: 'What is the expense ratio?', a: 'The expense ratio is the annual fee charged by the fund house for managing your investment. It is deducted from the fund\'s NAV. Lower expense ratios (0.1-0.5% for index funds, 1-2.5% for active funds) are generally better.' },
            { q: 'How are mutual fund returns taxed?', a: 'Equity funds: STCG (15% if held &lt; 1 year), LTCG (10% above ₹1 lakh if held &gt; 1 year). Debt funds: Taxed as per income slab for all holding periods.' },
        ], 'mutual-fund')}

        ${renderRelatedTools('mutual-fund')}
    `, initMutualFundCalculator);
}

let mfMode = 'sip';
function initMutualFundCalculator() {
    const amtSlider = document.getElementById('mf-amount');
    const rateSlider = document.getElementById('mf-rate');
    const yearsSlider = document.getElementById('mf-years');
    if (!amtSlider) return;

    window.__mfToggle = (mode) => {
        mfMode = mode;
        document.getElementById('mf-sip-btn').classList.toggle('active', mode === 'sip');
        document.getElementById('mf-lump-btn').classList.toggle('active', mode === 'lumpsum');
        document.getElementById('mf-amt-label').textContent = mode === 'sip' ? 'Monthly Investment' : 'Investment Amount';
        if (mode === 'lumpsum') {
            amtSlider.min = 10000; amtSlider.max = 10000000; amtSlider.step = 10000;
            if (parseFloat(amtSlider.value) < 10000) amtSlider.value = 100000;
        } else {
            amtSlider.min = 500; amtSlider.max = 500000; amtSlider.step = 500;
        }
        calculate();
    };

    function calculate() {
        const amount = parseFloat(amtSlider.value);
        const annualRate = parseFloat(rateSlider.value);
        const years = parseInt(yearsSlider.value);

        let invested, maturity;
        if (mfMode === 'sip') {
            const r = annualRate / 100 / 12;
            const n = years * 12;
            invested = amount * n;
            maturity = amount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        } else {
            invested = amount;
            maturity = amount * Math.pow(1 + annualRate / 100, years);
        }
        const returns = maturity - invested;

        document.getElementById('mf-amt-val').textContent = formatINR(amount);
        document.getElementById('mf-rate-val').textContent = annualRate + '%';
        document.getElementById('mf-years-val').textContent = years + ' years';
        document.getElementById('mf-invested').textContent = formatINR(invested);
        document.getElementById('mf-returns').textContent = formatINR(returns);
        document.getElementById('mf-total').textContent = formatINR(maturity);

        drawDonutChart('mf-chart', [
            { label: 'Invested', value: invested, color: '#818cf8' },
            { label: 'Returns', value: returns, color: '#22c55e' },
        ], { size: 200, centerText: formatINR(maturity), centerLabel: 'Total' });
    }

    [amtSlider, rateSlider, yearsSlider].forEach(el => el.addEventListener('input', calculate));
    window.__mfCalc = calculate;
    calculate();
}

// ======================== 8. INCOME TAX CALCULATOR ========================
export function renderIncomeTaxCalculator() {
    return calcPage('income-tax', `
        <div class="calc-page-header animate-fade-up">
            <h1><span class="page-icon">📋</span> Income Tax Calculator</h1>
            <p class="page-desc">Calculate your income tax liability under both Old and New tax regimes (FY 2025-26). Compare regimes to find which saves you more.</p>
        </div>

        <div class="calc-widget animate-fade-up">
            <div class="calc-inputs">
                <h3 style="margin-bottom:var(--space-6);color:var(--text-heading)">Your Income Details</h3>
                <div class="input-group">
                    <label class="input-label">Annual Gross Income <span class="input-value" id="tax-income-val">₹10,00,000</span></label>
                    <input type="range" class="input-slider" id="tax-income" min="100000" max="50000000" step="50000" value="1000000">
                </div>
                <div class="input-group">
                    <label class="input-label">Deductions (80C, 80D, etc.) <span class="input-value" id="tax-ded-val">₹1,50,000</span></label>
                    <input type="range" class="input-slider" id="tax-deductions" min="0" max="500000" step="10000" value="150000">
                </div>
                <div class="input-group">
                    <label class="input-label">Age Group</label>
                    <select class="input-select" id="tax-age">
                        <option value="general">Below 60 years</option>
                        <option value="senior">60-80 years (Senior Citizen)</option>
                        <option value="supersenior">Above 80 years (Super Senior)</option>
                    </select>
                </div>
                <button class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-4)" onclick="window.__taxCalc()">Compare Tax Regimes</button>
            </div>
            <div class="calc-results">
                <h3 style="color:var(--text-heading);margin-bottom:var(--space-4)">Tax Comparison</h3>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">
                    <div class="result-card">
                        <div class="result-card-label">Old Regime Tax</div>
                        <div class="result-card-value" id="tax-old">—</div>
                    </div>
                    <div class="result-card">
                        <div class="result-card-label">New Regime Tax</div>
                        <div class="result-card-value" id="tax-new">—</div>
                    </div>
                </div>
                <div class="result-card highlight" style="margin-top:var(--space-4)">
                    <div class="result-card-label">You Save</div>
                    <div class="result-card-value" id="tax-saving">—</div>
                    <div style="font-size:var(--fs-xs);color:var(--text-muted);margin-top:var(--space-1)" id="tax-better">—</div>
                </div>
                <div class="chart-container"><canvas id="tax-chart"></canvas></div>
                <div class="chart-legend">
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#f97316"></span> Old Regime</div>
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#38bdf8"></span> New Regime</div>
                </div>
            </div>
        </div>

        ${renderShareButtons('Income Tax Calculator - FinCalc Pro')}

        <div class="content-section">
            <h2>📖 Old vs New Tax Regime</h2>
            <p>India offers two tax regimes for individual taxpayers. The <strong>Old Regime</strong> offers various deductions and exemptions (like 80C, 80D, HRA, etc.) but has higher base rates. The <strong>New Regime</strong> (introduced in Budget 2020, updated in 2023 & 2025) offers lower tax rates but fewer deductions.</p>
            <p>The best regime depends on your income level and eligible deductions. Use our calculator to compare both and make an informed choice.</p>
        </div>

        <div class="content-section">
            <h2>📐 Tax Slabs (FY 2025-26)</h2>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-6)">
                <div>
                    <h3>Old Regime</h3>
                    <div class="data-table-container">
                        <table class="data-table">
                            <thead><tr><th>Income Slab</th><th>Rate</th></tr></thead>
                            <tbody>
                                <tr><td>Up to ₹2.5L</td><td>Nil</td></tr>
                                <tr><td>₹2.5L - ₹5L</td><td>5%</td></tr>
                                <tr><td>₹5L - ₹10L</td><td>20%</td></tr>
                                <tr><td>Above ₹10L</td><td>30%</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <h3>New Regime</h3>
                    <div class="data-table-container">
                        <table class="data-table">
                            <thead><tr><th>Income Slab</th><th>Rate</th></tr></thead>
                            <tbody>
                                <tr><td>Up to ₹4L</td><td>Nil</td></tr>
                                <tr><td>₹4L - ₹8L</td><td>5%</td></tr>
                                <tr><td>₹8L - ₹12L</td><td>10%</td></tr>
                                <tr><td>₹12L - ₹16L</td><td>15%</td></tr>
                                <tr><td>₹16L - ₹20L</td><td>20%</td></tr>
                                <tr><td>₹20L - ₹24L</td><td>25%</td></tr>
                                <tr><td>Above ₹24L</td><td>30%</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        ${renderFAQ([
            { q: 'Which tax regime should I choose?', a: 'If you have significant deductions (80C, 80D, HRA, home loan interest), the Old Regime may save more. If your deductions are low, the New Regime with lower rates is usually better. Use our calculator to compare both.' },
            { q: 'Can I switch between regimes every year?', a: 'Salaried individuals can switch between the two regimes every financial year. Business owners who choose the New Regime can switch back only once.' },
            { q: 'Is health and education cess included?', a: 'Our calculator provides the base tax amount. Health and Education Cess of 4% is levied on top of the total tax. Surcharge may also apply for high income.' },
            { q: 'What deductions are available under Old Regime?', a: 'Key deductions include: Section 80C (₹1.5L - EPF, PPF, ELSS, LIC, etc.), Section 80D (health insurance), HRA, LTA, home loan interest (Section 24), and NPS (80CCD). These are not available under the New Regime.' },
        ], 'income-tax')}

        ${renderRelatedTools('income-tax')}
    `, initIncomeTaxCalculator);
}

function initIncomeTaxCalculator() {
    const incomeSlider = document.getElementById('tax-income');
    const dedSlider = document.getElementById('tax-deductions');
    if (!incomeSlider) return;

    function calculateTax(income, slabs) {
        let tax = 0;
        for (const slab of slabs) {
            if (income > slab.min) {
                const taxable = Math.min(income, slab.max) - slab.min;
                tax += taxable * slab.rate / 100;
            }
        }
        return tax;
    }

    function calculate() {
        const income = parseFloat(incomeSlider.value);
        const deductions = parseFloat(dedSlider.value);

        const taxableOld = Math.max(0, income - deductions - 50000); // Standard deduction
        const taxableNew = Math.max(0, income - 75000); // Standard deduction for new regime

        let taxOld = calculateTax(taxableOld, TAX_SLABS_OLD);
        let taxNew = calculateTax(taxableNew, TAX_SLABS_NEW);

        // Rebate under 87A (Old: up to 5L, New: up to 12L under new rules)
        if (taxableOld <= 500000) taxOld = 0;
        if (taxableNew <= 1200000) taxNew = 0;

        // Add 4% cess
        taxOld = taxOld * 1.04;
        taxNew = taxNew * 1.04;

        const saving = Math.abs(taxOld - taxNew);
        const betterRegime = taxOld <= taxNew ? 'Old Regime' : 'New Regime';

        document.getElementById('tax-income-val').textContent = formatINR(income);
        document.getElementById('tax-ded-val').textContent = formatINR(deductions);
        document.getElementById('tax-old').textContent = formatINR(taxOld);
        document.getElementById('tax-new').textContent = formatINR(taxNew);
        document.getElementById('tax-saving').textContent = formatINR(saving);
        document.getElementById('tax-better').textContent = `with ${betterRegime}`;

        drawDonutChart('tax-chart', [
            { label: 'Old Regime', value: Math.max(taxOld, 1), color: '#f97316' },
            { label: 'New Regime', value: Math.max(taxNew, 1), color: '#38bdf8' },
        ], { size: 200, centerText: formatINR(Math.min(taxOld, taxNew)), centerLabel: 'Lower Tax' });
    }

    [incomeSlider, dedSlider].forEach(el => el.addEventListener('input', calculate));
    document.getElementById('tax-age')?.addEventListener('change', calculate);
    window.__taxCalc = calculate;
    calculate();
}

// ======================== 9. GST CALCULATOR ========================
export function renderGSTCalculator() {
    return calcPage('gst', `
        <div class="calc-page-header animate-fade-up">
            <h1><span class="page-icon">🧾</span> GST Calculator</h1>
            <p class="page-desc">Quickly add or remove GST from any amount. Get the CGST/SGST or IGST split for all standard GST rates used in India.</p>
        </div>

        <div class="calc-widget animate-fade-up">
            <div class="calc-inputs">
                <h3 style="margin-bottom:var(--space-6);color:var(--text-heading)">GST Calculation</h3>
                <div class="toggle-group">
                    <button class="toggle-btn active" id="gst-add-btn" onclick="window.__gstToggle('add')">Add GST</button>
                    <button class="toggle-btn" id="gst-remove-btn" onclick="window.__gstToggle('remove')">Remove GST</button>
                </div>
                <div class="input-group">
                    <label class="input-label"><span id="gst-amt-label">Amount (Excluding GST)</span></label>
                    <div class="input-with-addon">
                        <span class="input-addon">₹</span>
                        <input type="number" class="input-field" id="gst-amount" value="10000" min="0" step="1">
                    </div>
                </div>
                <div class="input-group">
                    <label class="input-label">GST Rate</label>
                    <div class="toggle-group" style="margin-bottom:0">
                        ${GST_RATES.map((r, i) => `<button class="toggle-btn ${i === 2 ? 'active' : ''}" onclick="document.getElementById('gst-rate').value=${r};window.__gstCalc();document.querySelectorAll('.gst-rate-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active')" class="gst-rate-btn">${r}%</button>`).join('')}
                    </div>
                    <input type="hidden" id="gst-rate" value="18">
                </div>
                <button class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-6)" onclick="window.__gstCalc()">Calculate GST</button>
            </div>
            <div class="calc-results">
                <div class="result-cards" style="grid-template-columns:1fr 1fr">
                    <div class="result-card"><div class="result-card-label" id="gst-base-label">Base Amount</div><div class="result-card-value" id="gst-base">—</div></div>
                    <div class="result-card"><div class="result-card-label">GST Amount</div><div class="result-card-value" id="gst-tax">—</div></div>
                    <div class="result-card"><div class="result-card-label">CGST</div><div class="result-card-value" id="gst-cgst">—</div></div>
                    <div class="result-card"><div class="result-card-label">SGST</div><div class="result-card-value" id="gst-sgst">—</div></div>
                </div>
                <div class="result-card highlight" style="margin-top:var(--space-4)">
                    <div class="result-card-label" id="gst-total-label">Total Amount (Incl. GST)</div>
                    <div class="result-card-value" id="gst-total">—</div>
                </div>
                <div class="chart-container"><canvas id="gst-chart"></canvas></div>
                <div class="chart-legend">
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#06b6d4"></span> Base Amount</div>
                    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#f0b429"></span> GST</div>
                </div>
            </div>
        </div>

        ${renderShareButtons('GST Calculator - FinCalc Pro')}

        <div class="content-section">
            <h2>📖 What is GST?</h2>
            <p>Goods and Services Tax (GST) is a comprehensive indirect tax levied on the supply of goods and services in India, implemented on July 1, 2017. It replaced multiple cascading taxes like VAT, service tax, excise duty, and others, creating a unified tax structure.</p>
            <p>GST is a destination-based tax, meaning it is levied at the point of consumption rather than the point of origin. For intra-state transactions, GST is split equally into CGST (Central) and SGST (State). For inter-state transactions, IGST (Integrated GST) is charged.</p>
        </div>

        <div class="content-section">
            <h2>📐 GST Formulas</h2>
            <div class="formula-box">
                Add GST: Total = Amount × (1 + GST%/100)<br>
                Remove GST: Base = Amount / (1 + GST%/100)
            </div>
        </div>

        <div class="content-section">
            <h2>✅ GST Rate Categories</h2>
            <ul>
                <li><strong>5% GST:</strong> Essential items — packaged food, footwear below ₹1000, economy train tickets</li>
                <li><strong>12% GST:</strong> Standard items — processed food, business class air tickets, cell phones</li>
                <li><strong>18% GST:</strong> Most goods & services — electronics, financial services, restaurants, IT services</li>
                <li><strong>28% GST:</strong> Luxury & sin goods — luxury cars, tobacco, aerated drinks, cement</li>
            </ul>
        </div>

        ${renderFAQ([
            { q: 'What is the difference between CGST, SGST, and IGST?', a: 'CGST (Central GST) and SGST (State GST) are levied on intra-state supplies. Each is half of the total GST rate. IGST (Integrated GST) is levied on inter-state supplies and equals the full GST rate.' },
            { q: 'How do I know which GST rate applies?', a: 'GST rates are determined by the HSN (Harmonized System of Nomenclature) code for goods and SAC (Services Accounting Code) for services. You can look up the applicable rate on the GST portal.' },
            { q: 'Can I claim GST input tax credit?', a: 'Yes, registered businesses can claim ITC on GST paid on purchases used for business purposes. This reduces the net GST liability. Proper invoicing and filing are required.' },
            { q: 'Is GST applicable on all goods and services?', a: 'No. Some items are exempt from GST, including fresh fruits and vegetables, milk, eggs, bread, and certain healthcare and educational services.' },
        ], 'gst')}

        ${renderRelatedTools('gst')}
    `, initGSTCalculator);
}

let gstMode = 'add';
function initGSTCalculator() {
    const amtInput = document.getElementById('gst-amount');
    if (!amtInput) return;

    window.__gstToggle = (mode) => {
        gstMode = mode;
        document.getElementById('gst-add-btn').classList.toggle('active', mode === 'add');
        document.getElementById('gst-remove-btn').classList.toggle('active', mode === 'remove');
        document.getElementById('gst-amt-label').textContent = mode === 'add' ? 'Amount (Excluding GST)' : 'Amount (Including GST)';
        calculate();
    };

    function calculate() {
        const amount = parseFloat(amtInput.value) || 0;
        const rate = parseFloat(document.getElementById('gst-rate').value);
        let base, gstAmt, total;

        if (gstMode === 'add') {
            base = amount;
            gstAmt = amount * rate / 100;
            total = amount + gstAmt;
        } else {
            total = amount;
            base = amount / (1 + rate / 100);
            gstAmt = total - base;
        }

        const halfGst = gstAmt / 2;

        document.getElementById('gst-base').textContent = formatINR(base);
        document.getElementById('gst-tax').textContent = formatINR(gstAmt);
        document.getElementById('gst-cgst').textContent = formatINR(halfGst) + ` (${rate/2}%)`;
        document.getElementById('gst-sgst').textContent = formatINR(halfGst) + ` (${rate/2}%)`;
        document.getElementById('gst-total').textContent = formatINR(total);

        drawDonutChart('gst-chart', [
            { label: 'Base', value: base, color: '#06b6d4' },
            { label: 'GST', value: gstAmt, color: '#f0b429' },
        ], { size: 180, centerText: rate + '% GST', centerLabel: 'Rate' });
    }

    amtInput.addEventListener('input', calculate);
    window.__gstCalc = calculate;
    calculate();
}

// ======================== 10. CURRENCY CONVERTER ========================
export function renderCurrencyConverter() {
    const currencyOptions = Object.entries(CURRENCY_NAMES).map(([code, name]) =>
        `<option value="${code}" ${code === 'INR' ? '' : ''}>${code} — ${name}</option>`
    ).join('');

    return calcPage('currency-converter', `
        <div class="calc-page-header animate-fade-up">
            <h1><span class="page-icon">💱</span> Currency Converter</h1>
            <p class="page-desc">Convert between major world currencies with indicative exchange rates. Quick, easy, and free.</p>
        </div>

        <div class="calc-widget animate-fade-up">
            <div class="calc-inputs">
                <h3 style="margin-bottom:var(--space-6);color:var(--text-heading)">Currency Conversion</h3>
                <div class="input-group">
                    <label class="input-label">Amount</label>
                    <div class="input-with-addon">
                        <span class="input-addon" id="cc-from-symbol">₹</span>
                        <input type="number" class="input-field" id="cc-amount" value="1000" min="0" step="1">
                    </div>
                </div>
                <div class="input-group">
                    <label class="input-label">From</label>
                    <select class="input-select" id="cc-from">${currencyOptions.replace('value="INR"', 'value="INR" selected')}</select>
                </div>
                <div style="text-align:center;margin:var(--space-3) 0">
                    <button class="btn btn-ghost btn-icon" style="font-size:20px" onclick="window.__ccSwap()" title="Swap currencies">⇅</button>
                </div>
                <div class="input-group">
                    <label class="input-label">To</label>
                    <select class="input-select" id="cc-to">${currencyOptions.replace('value="USD"', 'value="USD" selected')}</select>
                </div>
                <button class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-4)" onclick="window.__ccCalc()">Convert</button>
            </div>
            <div class="calc-results">
                <div class="result-card highlight" style="text-align:center;padding:var(--space-8)">
                    <div class="result-card-label" id="cc-rate-label">Exchange Rate</div>
                    <div class="result-card-value" style="font-size:var(--fs-3xl)" id="cc-result">—</div>
                    <div style="font-size:var(--fs-sm);color:var(--text-muted);margin-top:var(--space-2)" id="cc-rate-info">—</div>
                </div>
                <div style="margin-top:var(--space-6)">
                    <h4 style="font-size:var(--fs-sm);color:var(--text-heading);margin-bottom:var(--space-4)">Popular Conversions</h4>
                    <div id="cc-popular" style="display:flex;flex-direction:column;gap:var(--space-2)"></div>
                </div>
                <p style="font-size:var(--fs-xs);color:var(--text-muted);margin-top:var(--space-4);text-align:center">⚠️ Rates are indicative and may not reflect real-time market rates.</p>
            </div>
        </div>

        ${renderShareButtons('Currency Converter - FinCalc Pro')}

        <div class="content-section">
            <h2>📖 About Currency Conversion</h2>
            <p>Currency conversion is the process of changing one country's currency into another at a specific exchange rate. Exchange rates fluctuate based on supply and demand in the foreign exchange (forex) market, economic indicators, geopolitical events, and central bank policies.</p>
            <p>Our converter provides indicative exchange rates for quick reference. For actual transactions, please use your bank or authorized money changer for the most current rates, which may include margins and fees.</p>
        </div>

        <div class="content-section">
            <h2>📐 Conversion Formula</h2>
            <div class="formula-box">Converted Amount = Amount × (Target Rate / Source Rate)</div>
        </div>

        <div class="content-section">
            <h2>✅ Tips for Currency Exchange</h2>
            <ul>
                <li>Compare rates from multiple sources before exchanging large amounts</li>
                <li>Airport exchanges typically offer the worst rates — exchange before you travel</li>
                <li>Use forex cards for international travel — they lock in rates and avoid per-transaction fees</li>
                <li>Bank wire transfers usually offer better rates than cash exchanges for large amounts</li>
                <li>Be aware of hidden fees and commissions beyond the stated exchange rate</li>
            </ul>
        </div>

        ${renderFAQ([
            { q: 'Are these exchange rates real-time?', a: 'No, these are indicative reference rates and may not reflect current market rates. For actual transactions, check with your bank or an authorized dealer.' },
            { q: 'Why do exchange rates change?', a: 'Exchange rates are influenced by multiple factors including interest rates, inflation, trade balances, political stability, economic performance, and market speculation.' },
            { q: 'What is the best time to exchange currency?', a: 'There is no universally best time as rates fluctuate constantly. Monitor rates over time and exchange when the rate is favorable for your currency pair. Major economic announcements often cause volatility.' },
            { q: 'What is the difference between buying and selling rate?', a: 'The buying rate is what a dealer pays to buy foreign currency from you. The selling rate is what they charge to sell foreign currency to you. The difference (spread) is the dealer\'s margin.' },
        ], 'currency')}

        ${renderRelatedTools('currency-converter')}
    `, initCurrencyConverter);
}

function initCurrencyConverter() {
    const amtInput = document.getElementById('cc-amount');
    const fromSelect = document.getElementById('cc-from');
    const toSelect = document.getElementById('cc-to');
    if (!amtInput) return;

    // Default: USD selected for "to"
    toSelect.value = 'USD';

    function calculate() {
        const amount = parseFloat(amtInput.value) || 0;
        const from = fromSelect.value;
        const to = toSelect.value;
        const fromRate = EXCHANGE_RATES[from];
        const toRate = EXCHANGE_RATES[to];
        const converted = amount * (toRate / fromRate);
        const rate = toRate / fromRate;

        document.getElementById('cc-from-symbol').textContent = CURRENCY_SYMBOLS[from] || from;
        document.getElementById('cc-result').textContent = `${CURRENCY_SYMBOLS[to] || to}${formatNum(converted, 2)}`;
        document.getElementById('cc-rate-info').textContent = `1 ${from} = ${rate.toFixed(6)} ${to}`;
        document.getElementById('cc-rate-label').textContent = `${CURRENCY_NAMES[from]} → ${CURRENCY_NAMES[to]}`;

        // Popular conversions
        const popular = [
            ['INR', 'USD'], ['INR', 'EUR'], ['INR', 'GBP'],
            ['USD', 'EUR'], ['USD', 'JPY'], ['USD', 'GBP'],
        ].filter(([a, b]) => !(a === from && b === to));

        document.getElementById('cc-popular').innerHTML = popular.slice(0, 5).map(([a, b]) => {
            const r = EXCHANGE_RATES[b] / EXCHANGE_RATES[a];
            return `<div style="display:flex;justify-content:space-between;padding:var(--space-2) var(--space-3);background:rgba(148,163,184,0.04);border-radius:var(--radius-sm);font-size:var(--fs-sm)">
                <span style="color:var(--text-secondary)">1 ${a} → ${b}</span>
                <span style="color:var(--accent-gold);font-weight:500">${r.toFixed(4)}</span>
            </div>`;
        }).join('');
    }

    window.__ccSwap = () => {
        const temp = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = temp;
        calculate();
    };

    [amtInput, fromSelect, toSelect].forEach(el => el.addEventListener('input', calculate));
    fromSelect.addEventListener('change', calculate);
    toSelect.addEventListener('change', calculate);
    window.__ccCalc = calculate;
    calculate();
}
