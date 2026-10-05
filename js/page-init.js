/* ============================================================
   PAGE INIT — Client-side hydration for static HTML pages
   ============================================================ */

import { initSearch, initCookieConsent, initHeaderScroll, initMobileMenu } from './components.js';
import {
    initSIPCalculator,
    initLoanCalculator,
    initHomeLoanCalculator,
    initPersonalLoanCalculator,
    initFDCalculator,
    initRDCalculator,
    initMutualFundCalculator,
    initIncomeTaxCalculator,
    initGSTCalculator,
    initCurrencyConverter
} from './calculators.js';

// 1. Handle legacy hash routes redirect gracefully
if (window.location.hash && window.location.hash.startsWith('#/')) {
    const hashRoute = window.location.hash.slice(2);
    if (hashRoute && hashRoute !== '/') {
        const clean = hashRoute.replace(/^\//, '');
        const target = clean.endsWith('.html') ? `/${clean}` : `/${clean}.html`;
        window.location.replace(target);
    }
}

// 2. Initialize global UI and calculator interactions
function initPage() {
    initSearch();
    initCookieConsent();
    initHeaderScroll();
    initMobileMenu();

    const path = window.location.pathname.toLowerCase();

    // Map path to calculator initializer
    if (path.includes('sip')) {
        initSIPCalculator();
    } else if (path.includes('home-loan-emi')) {
        initHomeLoanCalculator();
    } else if (path.includes('personal-loan-emi')) {
        initPersonalLoanCalculator();
    } else if (path.includes('loan')) {
        initLoanCalculator();
    } else if (path.includes('fd')) {
        initFDCalculator();
    } else if (path.includes('rd')) {
        initRDCalculator();
    } else if (path.includes('mutual-fund')) {
        initMutualFundCalculator();
    } else if (path.includes('income-tax')) {
        initIncomeTaxCalculator();
    } else if (path.includes('gst')) {
        initGSTCalculator();
    } else if (path.includes('currency-converter')) {
        initCurrencyConverter();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
