import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { CALCULATORS, LEGAL_PAGES, SITE_NAME, SITE_URL, SITE_EMAIL } from '../js/data.js';
import { renderHeader, renderFooter, renderBreadcrumbs, renderSearchModal, renderCookieConsent } from '../js/components.js';
import {
    renderHome, renderAbout, renderContact, renderPrivacyPolicy, renderTerms,
    renderDisclaimer, renderCookiePolicy, renderDMCA, renderSitemap, renderNotFound
} from '../js/pages.js';
import {
    renderSIPCalculator, renderLoanCalculator, renderHomeLoanEMI, renderPersonalLoanEMI,
    renderFDCalculator, renderRDCalculator, renderMutualFundCalculator,
    renderIncomeTaxCalculator, renderGSTCalculator, renderCurrencyConverter
} from '../js/calculators.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Ensure directories exist
const calcDir = path.join(rootDir, 'calculators');
if (!fs.existsSync(calcDir)) {
    fs.mkdirSync(calcDir, { recursive: true });
}

function generateHTML({
    title,
    description,
    keywords,
    canonicalPath,
    breadcrumbsPath,
    contentHtml,
    structuredData = null
}) {
    const fullCanonical = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`;
    const pageTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const pageDesc = description || 'Free, accurate, and easy-to-use financial calculators for SIP, Loans, EMI, Tax, GST, and Investments.';
    const pageKeywords = keywords || 'financial calculators, SIP calculator, loan calculator, EMI calculator, tax calculator, GST calculator, investment planning, DevToolHubs';

    // Default WebSite / WebPage schema
    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": pageTitle,
        "description": pageDesc,
        "url": fullCanonical,
        "publisher": {
            "@type": "Organization",
            "name": SITE_NAME,
            "url": SITE_URL,
            "logo": {
                "@type": "ImageObject",
                "url": `${SITE_URL}/favicon.png`
            }
        }
    };

    const finalSchema = structuredData || defaultSchema;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-GBXLVTLXBZ"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-GBXLVTLXBZ');
    </script>
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3837874977890769"
         crossorigin="anonymous"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
    <meta name="description" content="${pageDesc.replace(/"/g, '&quot;')}">
    <meta name="keywords" content="${pageKeywords}">
    <meta name="author" content="${SITE_NAME} | DevToolHubs">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#060a14">

    <!-- Open Graph -->
    <meta property="og:title" content="${pageTitle.replace(/"/g, '&quot;')}">
    <meta property="og:description" content="${pageDesc.replace(/"/g, '&quot;')}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${fullCanonical}">
    <meta property="og:site_name" content="${SITE_NAME}">
    <meta property="og:locale" content="en_US">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${pageTitle.replace(/"/g, '&quot;')}">
    <meta name="twitter:description" content="${pageDesc.replace(/"/g, '&quot;')}">

    <!-- Canonical URL -->
    <link rel="canonical" href="${fullCanonical}">

    <!-- Favicon (inline SVG) -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect rx='18' width='100' height='100' fill='%23060a14'/><text x='50' y='68' font-size='55' text-anchor='middle' fill='%23f0b429' font-family='sans-serif' font-weight='bold'>F</text></svg>">

    <!-- Google Fonts — Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="/styles.css">

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
${JSON.stringify(finalSchema, null, 2)}
    </script>
</head>
<body>
    <div id="app">
        ${renderHeader()}
        ${renderSearchModal()}
        <main id="main-content">
            ${breadcrumbsPath ? renderBreadcrumbs(breadcrumbsPath) : ''}
            ${contentHtml}
        </main>
        ${renderFooter()}
        ${renderCookieConsent()}
    </div>

    <!-- App Scripts (ES Modules) -->
    <script type="module" src="/js/page-init.js"></script>
</body>
</html>`;
}

console.log('🚀 Starting static HTML pre-rendering build for FinCalc Pro (devtoolhubs.info)...');

// 1. Pre-render Home Page
console.log('Generating index.html...');
const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FinCalc Pro — Free Financial Calculators & Tools | DevToolHubs",
    "url": `${SITE_URL}/`,
    "description": "Free online financial calculators — SIP, Loan EMI, FD, RD, Mutual Fund, Income Tax, GST & Currency Converter. Accurate, fast, and easy to use.",
    "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE_URL}/#calculators`,
        "query-input": "required name=search_term_string"
    }
};

const homeHtml = generateHTML({
    title: 'FinCalc Pro — Free Financial Calculators & Wealth Planning Tools | DevToolHubs',
    description: 'Free online financial calculators — SIP, Loan EMI, FD, RD, Mutual Fund, Income Tax, GST & Currency Converter. Accurate, fast, and 100% free financial planning utilities.',
    keywords: 'financial calculators, SIP calculator, loan EMI calculator, home loan EMI, FD calculator, RD calculator, income tax calculator FY 2025-26, GST calculator, currency converter, DevToolHubs',
    canonicalPath: '/',
    breadcrumbsPath: null,
    contentHtml: renderHome(),
    structuredData: homeSchema
});
fs.writeFileSync(path.join(rootDir, 'index.html'), homeHtml, 'utf8');

// 2. Pre-render Calculators
const calculatorsConfig = [
    {
        id: 'sip',
        renderFn: renderSIPCalculator,
        filename: 'calculators/sip.html',
        title: 'SIP Calculator — Calculate Systematic Investment Plan Returns',
        description: 'Free online SIP calculator to project mutual fund returns, total wealth accumulation, and compound interest growth with interactive charts and formulas.',
        keywords: 'SIP calculator, mutual fund SIP return, systematic investment plan, SIP interest calculator, compounding calculator, wealth creation'
    },
    {
        id: 'loan',
        renderFn: renderLoanCalculator,
        filename: 'calculators/loan.html',
        title: 'Loan Calculator — EMI, Interest & Amortization Schedule',
        description: 'Calculate monthly EMI, total interest payable, and repayment schedule for personal, car, business, or education loans with flexible tenure options.',
        keywords: 'loan calculator, EMI calculator, loan repayment schedule, interest calculator, monthly installment calculator'
    },
    {
        id: 'home-loan-emi',
        renderFn: renderHomeLoanEMI,
        filename: 'calculators/home-loan-emi.html',
        title: 'Home Loan EMI Calculator — Estimate Housing Loan Payments',
        description: 'Estimate your home loan EMI with down payment adjustment, total interest breakdown, and amortization schedule. Plan your dream home purchase accurately.',
        keywords: 'home loan EMI calculator, housing loan calculator, home loan interest, mortgage EMI calculator, down payment calculator'
    },
    {
        id: 'personal-loan-emi',
        renderFn: renderPersonalLoanEMI,
        filename: 'calculators/personal-loan-emi.html',
        title: 'Personal Loan EMI Calculator — Monthly Installment & Interest',
        description: 'Instantly compute personal loan EMI and interest costs. Compare tenures and loan amounts to choose an affordable monthly budget.',
        keywords: 'personal loan EMI calculator, personal loan interest rate, instant loan calculator, unsecured loan EMI'
    },
    {
        id: 'fd',
        renderFn: renderFDCalculator,
        filename: 'calculators/fd.html',
        title: 'FD Calculator — Fixed Deposit Maturity & Interest Calculator',
        description: 'Calculate Fixed Deposit (FD) maturity value, quarterly/monthly compound interest, and cumulative returns across bank and post office schemes.',
        keywords: 'FD calculator, fixed deposit calculator, FD interest rates, compound interest FD, bank FD return calculator'
    },
    {
        id: 'rd',
        renderFn: renderRDCalculator,
        filename: 'calculators/rd.html',
        title: 'RD Calculator — Recurring Deposit Maturity Value Calculator',
        description: 'Estimate your Recurring Deposit (RD) maturity proceeds and total interest earned. Plan disciplined monthly savings with accurate compound interest projections.',
        keywords: 'RD calculator, recurring deposit calculator, monthly deposit return, post office RD calculator, bank RD interest'
    },
    {
        id: 'mutual-fund',
        renderFn: renderMutualFundCalculator,
        filename: 'calculators/mutual-fund.html',
        title: 'Mutual Fund Returns Calculator — SIP & Lumpsum Returns',
        description: 'Project returns on your mutual fund investments for both SIP and lumpsum options. Visualize wealth compounding over 5, 10, 15, and 20 years.',
        keywords: 'mutual fund calculator, mutual fund return calculator, SIP vs lumpsum, equity mutual fund returns, wealth growth chart'
    },
    {
        id: 'income-tax',
        renderFn: renderIncomeTaxCalculator,
        filename: 'calculators/income-tax.html',
        title: 'Income Tax Calculator (FY 2025-26) — Old vs New Tax Regime',
        description: 'Compare Old vs New Tax Regime tax liability for FY 2025-26. Input deductions under 80C, 80D, HRA, and discover where you save the most tax.',
        keywords: 'income tax calculator, old vs new regime calculator, income tax slabs FY 2025-26, tax savings calculator, Section 80C deduction'
    },
    {
        id: 'gst',
        renderFn: renderGSTCalculator,
        filename: 'calculators/gst.html',
        title: 'GST Calculator — Add or Remove GST (5%, 12%, 18%, 28%)',
        description: 'Quickly calculate inclusive and exclusive GST amounts. Get instant CGST, SGST, and IGST breakdowns for goods and services in India.',
        keywords: 'GST calculator, add GST, remove GST, reverse GST calculator, 18% GST calculator, CGST SGST calculator'
    },
    {
        id: 'currency-converter',
        renderFn: renderCurrencyConverter,
        filename: 'calculators/currency-converter.html',
        title: 'Currency Converter — Real-Time World Currency Exchange Rates',
        description: 'Convert between USD, EUR, GBP, INR, JPY, AUD, CAD, and other major world currencies with reliable indicative conversion rates and popular currency pairs.',
        keywords: 'currency converter, forex exchange rates, USD to INR, EUR to INR, currency conversion calculator'
    }
];

calculatorsConfig.forEach(cfg => {
    console.log(`Generating ${cfg.filename}...`);
    const calcInfo = CALCULATORS.find(c => c.id === cfg.id);
    
    // SoftwareApplication Schema
    const toolSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": cfg.title,
        "url": `${SITE_URL}/${cfg.filename}`,
        "description": cfg.description,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "publisher": {
            "@type": "Organization",
            "name": SITE_NAME,
            "url": SITE_URL
        }
    };

    const html = generateHTML({
        title: cfg.title,
        description: cfg.description,
        keywords: cfg.keywords,
        canonicalPath: `/${cfg.filename}`,
        breadcrumbsPath: `/calculators/${cfg.id}`,
        contentHtml: cfg.renderFn(),
        structuredData: toolSchema
    });

    fs.writeFileSync(path.join(rootDir, cfg.filename), html, 'utf8');
});

// 3. Pre-render General & Legal Pages
const generalPagesConfig = [
    {
        filename: 'about.html',
        renderFn: renderAbout,
        title: 'About Us — Free Financial Planning Tools | FinCalc Pro',
        description: 'Learn about FinCalc Pro at devtoolhubs.info — our mission to empower individuals with free, transparent, and accurate financial calculation tools.',
        breadcrumbsPath: '/about'
    },
    {
        filename: 'contact.html',
        renderFn: renderContact,
        title: 'Contact Us — Inquiries & Support | FinCalc Pro',
        description: 'Get in touch with the FinCalc Pro team at devtoolhubs.info for suggestions, bug reports, feature requests, and partnership opportunities.',
        breadcrumbsPath: '/contact'
    },
    {
        filename: 'privacy-policy.html',
        renderFn: renderPrivacyPolicy,
        title: 'Privacy Policy — Data Protection, AdSense & Cookies | FinCalc Pro',
        description: 'Read the FinCalc Pro (devtoolhubs.info) Privacy Policy. Information on zero server-side data retention, Google AdSense DART cookies, GDPR, and CCPA.',
        breadcrumbsPath: '/privacy-policy'
    },
    {
        filename: 'terms-conditions.html',
        renderFn: renderTerms,
        title: 'Terms & Conditions — User Agreement | FinCalc Pro',
        description: 'Terms and conditions of use for FinCalc Pro (devtoolhubs.info) financial calculators and services.',
        breadcrumbsPath: '/terms-conditions'
    },
    {
        filename: 'disclaimer.html',
        renderFn: renderDisclaimer,
        title: 'Financial Disclaimer — Educational Use Only | FinCalc Pro',
        description: 'Financial disclaimer for FinCalc Pro (devtoolhubs.info). Our calculators are for educational and informational purposes, not professional financial advice.',
        breadcrumbsPath: '/disclaimer'
    },
    {
        filename: 'cookie-policy.html',
        renderFn: renderCookiePolicy,
        title: 'Cookie Policy — How We Use Cookies | FinCalc Pro',
        description: 'Information regarding the use of functional, analytics, and Google AdSense advertising cookies on devtoolhubs.info.',
        breadcrumbsPath: '/cookie-policy'
    },
    {
        filename: 'dmca-policy.html',
        renderFn: renderDMCA,
        title: 'DMCA & Copyright Policy | FinCalc Pro',
        description: 'DMCA copyright policy, takedown notice procedures, and intellectual property statements for devtoolhubs.info.',
        breadcrumbsPath: '/dmca-policy'
    },
    {
        filename: 'sitemap.html',
        renderFn: renderSitemap,
        title: 'HTML Sitemap — Overview of All Pages & Calculators | FinCalc Pro',
        description: 'Explore the complete directory of financial calculators, guides, and legal pages available on devtoolhubs.info.',
        breadcrumbsPath: '/sitemap'
    },
    {
        filename: '404.html',
        renderFn: renderNotFound,
        title: 'Page Not Found (404) | FinCalc Pro',
        description: 'The requested page could not be found. Navigate back to FinCalc Pro free financial calculators.',
        breadcrumbsPath: null
    }
];

generalPagesConfig.forEach(cfg => {
    console.log(`Generating ${cfg.filename}...`);
    const html = generateHTML({
        title: cfg.title,
        description: cfg.description,
        canonicalPath: `/${cfg.filename}`,
        breadcrumbsPath: cfg.breadcrumbsPath,
        contentHtml: cfg.renderFn()
    });
    fs.writeFileSync(path.join(rootDir, cfg.filename), html, 'utf8');
});

// 4. Generate XML Sitemap
console.log('Generating sitemap.xml...');
const today = new Date().toISOString().split('T')[0];

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Core Financial Calculators (High Priority) -->
`;

calculatorsConfig.forEach(c => {
    sitemapXml += `  <url>
    <loc>${SITE_URL}/${c.filename}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>\n`;
});

sitemapXml += `\n  <!-- Informational & Legal Pages -->\n`;

generalPagesConfig.forEach(p => {
    if (p.filename === '404.html') return; // do not include 404 in sitemap
    const priority = ['about.html', 'contact.html', 'sitemap.html'].includes(p.filename) ? '0.8' : '0.5';
    sitemapXml += `  <url>
    <loc>${SITE_URL}/${p.filename}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
});

sitemapXml += `</urlset>\n`;
fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapXml, 'utf8');

// 5. Generate robots.txt
console.log('Generating robots.txt...');
const robotsTxt = `User-agent: *
Allow: /

# Googlebot & Mediapartners crawler access
User-agent: Mediapartners-Google
Allow: /

User-agent: Googlebot
Allow: /

# Sitemap Index
Sitemap: ${SITE_URL}/sitemap.xml
`;
fs.writeFileSync(path.join(rootDir, 'robots.txt'), robotsTxt, 'utf8');

// 6. Ensure ads.txt is valid
console.log('Validating ads.txt...');
const adsTxtContent = `google.com, pub-3837874977890769, DIRECT, f08c47fec0942fa0\n`;
fs.writeFileSync(path.join(rootDir, 'ads.txt'), adsTxtContent, 'utf8');

console.log('✅ Static build complete! All pages, sitemaps, and robots.txt successfully generated.');
