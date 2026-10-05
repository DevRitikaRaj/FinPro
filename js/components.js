/* ============================================================
   COMPONENTS — Header, Footer, Breadcrumbs, Search, Cookie, UI
   ============================================================ */

import { CALCULATORS, NAV_LINKS, LEGAL_PAGES, SITE_NAME } from './data.js';

// ---- Utility: Format currency (INR) ----
export function formatINR(num) {
    if (num === undefined || num === null || isNaN(num)) return '₹0';
    const absNum = Math.abs(num);
    const sign = num < 0 ? '-' : '';
    if (absNum >= 10000000) return sign + '₹' + (absNum / 10000000).toFixed(2) + ' Cr';
    if (absNum >= 100000) return sign + '₹' + (absNum / 100000).toFixed(2) + ' L';
    return sign + '₹' + absNum.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

export function formatNum(num, decimals = 0) {
    if (num === undefined || isNaN(num)) return '0';
    return num.toLocaleString('en-IN', { maximumFractionDigits: decimals });
}

// ---- Header ----
export function renderHeader() {
    const currentPath = typeof window !== 'undefined' ? (window.location.pathname || '/') : '/';

    const dropdownItems = CALCULATORS.map(c => `
        <a href="${c.path}" class="dropdown-item" data-nav>
            <span class="dropdown-item-icon">${c.icon}</span>
            <span>${c.name}</span>
        </a>
    `).join('');

    return `
    <header class="site-header" id="site-header">
        <div class="header-inner">
            <a href="/" class="header-logo" data-nav>
                <span class="logo-icon">F</span>
                <span class="logo-text">Fin<span>Calc</span> Pro</span>
            </a>

            <nav class="header-nav" id="header-nav">
                <a href="/" class="nav-link ${currentPath === '/' ? 'active' : ''}" data-nav>Home</a>
                <div class="nav-dropdown">
                    <a href="/#calculators" class="nav-link ${currentPath.includes('/calculators') ? 'active' : ''}">
                        Calculators <span style="font-size:10px;margin-left:2px">▼</span>
                    </a>
                    <div class="dropdown-menu" id="calc-dropdown">
                        ${dropdownItems}
                    </div>
                </div>
                <a href="/about.html" class="nav-link ${currentPath.includes('about') ? 'active' : ''}" data-nav>About</a>
                <a href="/contact.html" class="nav-link ${currentPath.includes('contact') ? 'active' : ''}" data-nav>Contact</a>
            </nav>

            <button class="header-search-btn" id="search-btn" type="button" aria-label="Search calculators">
                <span>🔍 Search…</span>
                <kbd class="search-kbd">Ctrl+K</kbd>
            </button>

            <button class="mobile-menu-btn" id="mobile-menu-btn" type="button" aria-label="Toggle menu">
                <span></span><span></span><span></span>
            </button>
        </div>

        <nav class="mobile-nav" id="mobile-nav">
            <a href="/" class="mobile-nav-link" data-nav>🏠 Home</a>
            <a href="/about.html" class="mobile-nav-link" data-nav>ℹ️ About</a>
            <a href="/contact.html" class="mobile-nav-link" data-nav>✉️ Contact</a>
            <div class="mobile-nav-section-title">Calculators</div>
            ${CALCULATORS.map(c => `
                <a href="${c.path}" class="mobile-nav-link" data-nav>${c.icon} ${c.name}</a>
            `).join('')}
        </nav>
    </header>`;
}

// ---- Footer ----
export function renderFooter() {
    const year = new Date().getFullYear();

    const calcLinks = CALCULATORS.slice(0, 6).map(c =>
        `<li><a href="${c.path}" data-nav>${c.name}</a></li>`
    ).join('');

    const legalLinks = LEGAL_PAGES.map(p =>
        `<li><a href="${p.path}" data-nav>${p.label}</a></li>`
    ).join('');

    return `
    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <a href="/" class="header-logo" data-nav style="margin-bottom:4px;display:inline-flex">
                        <span class="logo-icon">F</span>
                        <span class="logo-text">Fin<span>Calc</span> Pro</span>
                    </a>
                    <p>Free, accurate financial calculators trusted by thousands. Make smarter money decisions with our easy-to-use tools at devtoolhubs.info.</p>
                    <div class="footer-social">
                        <a href="#" aria-label="Twitter" title="Twitter">𝕏</a>
                        <a href="#" aria-label="Facebook" title="Facebook">f</a>
                        <a href="#" aria-label="LinkedIn" title="LinkedIn">in</a>
                        <a href="#" aria-label="YouTube" title="YouTube">▶</a>
                    </div>
                </div>

                <div class="footer-column">
                    <h4>Calculators</h4>
                    <ul>${calcLinks}</ul>
                </div>

                <div class="footer-column">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="/about.html" data-nav>About Us</a></li>
                        <li><a href="/contact.html" data-nav>Contact Us</a></li>
                        <li><a href="/sitemap.html" data-nav>Sitemap</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h4>Legal</h4>
                    <ul>${legalLinks}</ul>
                </div>
            </div>

            <div class="footer-bottom">
                <span>© ${year} ${SITE_NAME} (devtoolhubs.info). All rights reserved.</span>
                <div class="footer-bottom-links">
                    <a href="/privacy-policy.html" data-nav>Privacy</a>
                    <a href="/terms-conditions.html" data-nav>Terms</a>
                    <a href="/disclaimer.html" data-nav>Disclaimer</a>
                    <a href="/sitemap.html" data-nav>Sitemap</a>
                </div>
            </div>
        </div>
    </footer>`;
}

// ---- Breadcrumbs ----
export function renderBreadcrumbs(path) {
    if (!path || path === '/' || path === '') {
        return '';
    }

    const cleanPath = path.replace(/^\//, '').replace(/\.html$/, '');
    const segments = cleanPath.split('/').filter(Boolean);
    let crumbs = [{ label: 'Home', path: '/' }];

    if (segments[0] === 'calculators') {
        crumbs.push({ label: 'Calculators', path: '/#calculators' });
        if (segments[1]) {
            const calc = CALCULATORS.find(c => c.id === segments[1]);
            crumbs.push({ label: calc ? calc.name : segments[1], path: null });
        }
    } else {
        const pageName = segments[0].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        crumbs.push({ label: pageName, path: null });
    }

    const breadcrumbHTML = crumbs.map((c, i) => {
        if (i === crumbs.length - 1) {
            return `<span class="current">${c.label}</span>`;
        }
        return `<a href="${c.path}" data-nav>${c.label}</a><span class="separator">›</span>`;
    }).join('');

    // Schema.org BreadcrumbList
    const schemaItems = crumbs.map((c, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": c.label,
        "item": c.path ? (c.path.startsWith('http') ? c.path : `https://devtoolhubs.info${c.path}`) : undefined
    }));

    return `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
        <div class="container">${breadcrumbHTML}</div>
    </nav>
    <script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": schemaItems
    })}</script>`;
}

// ---- Search Modal ----
export function renderSearchModal() {
    return `
    <div class="search-overlay" id="search-overlay">
        <div class="search-modal">
            <div class="search-modal-input-wrap">
                <span>🔍</span>
                <input type="text" class="search-modal-input" id="search-input"
                       placeholder="Search calculators…" autocomplete="off">
                <kbd class="search-kbd" style="cursor:pointer" id="search-close">Esc</kbd>
            </div>
            <div class="search-results" id="search-results"></div>
        </div>
    </div>`;
}

export function initSearch() {
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    const searchBtn = document.getElementById('search-btn');
    const closeBtn = document.getElementById('search-close');

    if (!overlay || !input) return;

    function openSearch() {
        overlay.classList.add('open');
        input.value = '';
        input.focus();
        showAllResults();
    }

    function closeSearch() {
        overlay.classList.remove('open');
    }

    function showAllResults() {
        renderResults(CALCULATORS);
    }

    function renderResults(items) {
        if (items.length === 0) {
            results.innerHTML = '<div class="search-no-results">No calculators found</div>';
            return;
        }
        results.innerHTML = items.map(c => `
            <a href="${c.path}" class="search-result-item" data-nav>
                <span class="search-result-icon">${c.icon}</span>
                <div class="search-result-info">
                    <h4>${c.name}</h4>
                    <p>${c.shortDesc}</p>
                </div>
            </a>
        `).join('');
    }

    searchBtn?.addEventListener('click', openSearch);
    closeBtn?.addEventListener('click', closeSearch);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeSearch();
    });

    input.addEventListener('input', () => {
        const q = input.value.toLowerCase().trim();
        if (!q) { showAllResults(); return; }
        const filtered = CALCULATORS.filter(c =>
            c.name.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            c.category.toLowerCase().includes(q)
        );
        renderResults(filtered);
    });

    // Click on result closes search
    results.addEventListener('click', (e) => {
        const item = e.target.closest('.search-result-item');
        if (item) closeSearch();
    });

    // Keyboard shortcut
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
        if (e.key === 'Escape' && overlay.classList.contains('open')) {
            closeSearch();
        }
    });
}

// ---- Cookie Consent ----
export function renderCookieConsent() {
    return `
    <div class="cookie-consent" id="cookie-consent">
        <h4>🍪 Cookie Notice</h4>
        <p>We use cookies to improve your experience. By continuing to use this site, you agree to our <a href="#/cookie-policy" data-nav>Cookie Policy</a>.</p>
        <div class="cookie-consent-actions">
            <button class="btn btn-primary btn-sm" id="cookie-accept">Accept All</button>
            <button class="btn btn-secondary btn-sm" id="cookie-decline">Decline</button>
        </div>
    </div>`;
}

export function initCookieConsent() {
    const banner = document.getElementById('cookie-consent');
    if (!banner) return;

    if (localStorage.getItem('cookie-consent')) return;

    setTimeout(() => banner.classList.add('show'), 1500);

    document.getElementById('cookie-accept')?.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'accepted');
        banner.classList.remove('show');
    });

    document.getElementById('cookie-decline')?.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'declined');
        banner.classList.remove('show');
    });
}

// ---- Header Scroll Effect ----
export function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
}

// ---- Mobile Menu ----
export function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('mobile-nav');
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close on nav click
    nav.addEventListener('click', (e) => {
        if (e.target.closest('.mobile-nav-link')) {
            btn.classList.remove('active');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

// ---- FAQ Accordion ----
export function renderFAQ(items, schemaId) {
    const faqHTML = items.map((item, i) => `
        <div class="faq-item" id="faq-${schemaId}-${i}">
            <button class="faq-question" type="button" aria-expanded="false" onclick="this.parentElement.classList.toggle('open'); this.setAttribute('aria-expanded', this.parentElement.classList.contains('open'))">
                <span>${item.q}</span>
                <span class="faq-chevron">▼</span>
            </button>
            <div class="faq-answer">
                <div class="faq-answer-inner">${item.a}</div>
            </div>
        </div>
    `).join('');

    // FAQPage Schema
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": items.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };

    return `
    <div class="content-section">
        <h2>❓ Frequently Asked Questions</h2>
        <div class="faq-list">${faqHTML}</div>
        <script type="application/ld+json">${JSON.stringify(schema)}</script>
    </div>`;
}

// ---- Share Buttons ----
export function renderShareButtons(title, url) {
    const encodedTitle = encodeURIComponent(title);
    const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://devtoolhubs.info');
    const encodedUrl = encodeURIComponent(pageUrl);

    return `
    <div class="share-section">
        <span>📤 Share this tool:</span>
        <div class="share-btns">
            <button class="share-btn" title="Share on Twitter" onclick="window.open('https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}', '_blank', 'width=550,height=420')">𝕏</button>
            <button class="share-btn" title="Share on Facebook" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}', '_blank', 'width=550,height=420')">f</button>
            <button class="share-btn" title="Share on LinkedIn" onclick="window.open('https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}', '_blank', 'width=550,height=420')">in</button>
            <button class="share-btn" title="Share on WhatsApp" onclick="window.open('https://wa.me/?text=${encodedTitle}%20${encodedUrl}', '_blank')">💬</button>
            <button class="share-btn" title="Copy link" onclick="navigator.clipboard.writeText(window.location.href).then(()=>this.textContent='✓').catch(()=>{})">🔗</button>
        </div>
    </div>`;
}

// ---- Related Tools ----
export function renderRelatedTools(currentId) {
    const related = CALCULATORS.filter(c => c.id !== currentId).slice(0, 4);

    return `
    <div class="related-tools">
        <h2>Related Calculators</h2>
        <div class="related-tools-grid">
            ${related.map(c => `
                <a href="${c.path}" class="calc-card" data-nav>
                    <div class="calc-card-icon">${c.icon}</div>
                    <h3>${c.name}</h3>
                    <p>${c.shortDesc}</p>
                    <span class="calc-card-cta">Calculate now →</span>
                </a>
            `).join('')}
        </div>
    </div>`;
}

// ---- Update Meta Tags ----
export function updateMeta(title, description) {
    if (typeof document === 'undefined') return;
    document.title = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Free Financial Calculators & Tools | DevToolHubs`;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', description || '');

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', document.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description || '');

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', document.title);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', description || '');
}
