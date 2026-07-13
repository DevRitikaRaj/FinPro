/* ============================================================
   APP — Main entry point, router, and initialization
   ============================================================ */

import { renderHeader, renderFooter, renderBreadcrumbs, renderSearchModal, renderCookieConsent,
         initSearch, initCookieConsent, initHeaderScroll, initMobileMenu, updateMeta } from './components.js';

import { renderHome, renderAbout, renderContact, renderPrivacyPolicy, renderTerms,
         renderDisclaimer, renderCookiePolicy, renderDMCA, renderSitemap, renderNotFound } from './pages.js';

import { renderSIPCalculator, renderLoanCalculator, renderHomeLoanEMI, renderPersonalLoanEMI,
         renderFDCalculator, renderRDCalculator, renderMutualFundCalculator,
         renderIncomeTaxCalculator, renderGSTCalculator, renderCurrencyConverter } from './calculators.js';

import { SITE_URL } from './data.js';

// ---- Route Definitions ----
const ROUTES = {
    '/': renderHome,
    '/about': renderAbout,
    '/contact': renderContact,
    '/privacy-policy': renderPrivacyPolicy,
    '/terms-conditions': renderTerms,
    '/disclaimer': renderDisclaimer,
    '/cookie-policy': renderCookiePolicy,
    '/dmca-policy': renderDMCA,
    '/sitemap': renderSitemap,
    '/calculators/sip': renderSIPCalculator,
    '/calculators/loan': renderLoanCalculator,
    '/calculators/home-loan-emi': renderHomeLoanEMI,
    '/calculators/personal-loan-emi': renderPersonalLoanEMI,
    '/calculators/fd': renderFDCalculator,
    '/calculators/rd': renderRDCalculator,
    '/calculators/mutual-fund': renderMutualFundCalculator,
    '/calculators/income-tax': renderIncomeTaxCalculator,
    '/calculators/gst': renderGSTCalculator,
    '/calculators/currency-converter': renderCurrencyConverter,
};

// ---- Router ----
function getPath() {
    const hash = window.location.hash || '#/';
    return hash.replace(/^#/, '') || '/';
}

function render() {
    const path = getPath();
    const app = document.getElementById('app');

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
        canonical.href = SITE_URL + '/#' + path;
    }

    // Get page content
    const routeFn = ROUTES[path] || renderNotFound;
    const pageContent = routeFn();

    // Assemble full page
    app.innerHTML = `
        ${renderHeader()}
        ${renderSearchModal()}
        <main id="main-content">
            ${renderBreadcrumbs(path)}
            ${pageContent}
        </main>
        ${renderFooter()}
        ${renderCookieConsent()}
    `;

    // Initialize interactive components
    initSearch();
    initCookieConsent();
    initHeaderScroll();
    initMobileMenu();

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Animate elements on scroll
    initScrollAnimations();
}

// ---- Scroll Animations (Intersection Observer) ----
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-fade-up, .stagger-children').forEach(el => {
        observer.observe(el);
    });
}

// ---- Delegated Navigation (SPA links) ----
document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-nav]');
    if (link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            // Let hash change trigger the router
            return;
        }
    }
});

// ---- Listen for hash changes ----
window.addEventListener('hashchange', render);

// ---- Initial render ----
render();
