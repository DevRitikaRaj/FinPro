/* ============================================================
   PAGES — Home, About, Contact, Legal, Sitemap, 404
   ============================================================ */

import { CALCULATORS, LEGAL_PAGES, SITE_NAME, SITE_EMAIL } from './data.js';
import { updateMeta } from './components.js';

// ======================== HOME ========================
export function renderHome() {
    updateMeta(null, 'Free online financial calculators — SIP, Loan EMI, FD, RD, Mutual Fund, Income Tax, GST & Currency Converter. Accurate, fast, and easy to use.');

    const calcCards = CALCULATORS.map(c => `
        <a href="${c.path}" class="calc-card" data-nav>
            <div class="calc-card-icon">${c.icon}</div>
            <h3>${c.name}</h3>
            <p>${c.description}</p>
            <span class="calc-card-cta">Calculate now →</span>
        </a>
    `).join('');

    return `
    <section class="hero">
        <div class="container animate-fade-up">
            <div class="hero-badge">
                <span class="badge-dot">✦</span>
                Free & Accurate Financial Tools
            </div>
            <h1>Smart Money Decisions<br>Start with <span class="text-gold">Better Calculations</span></h1>
            <p class="hero-subtitle">Plan your investments, loans, and taxes with our suite of 10+ free financial calculators. Trusted by thousands for accuracy and simplicity.</p>
            <div class="hero-actions">
                <a href="#/calculators/sip" class="btn btn-primary btn-lg" data-nav>Try SIP Calculator</a>
                <a href="#/about" class="btn btn-secondary btn-lg" data-nav>Learn More</a>
            </div>
            <div class="hero-stats">
                <div class="hero-stat">
                    <div class="hero-stat-number">10+</div>
                    <div class="hero-stat-label">Free Calculators</div>
                </div>
                <div class="hero-stat">
                    <div class="hero-stat-number">100%</div>
                    <div class="hero-stat-label">Free to Use</div>
                </div>
                <div class="hero-stat">
                    <div class="hero-stat-number">0</div>
                    <div class="hero-stat-label">Signup Required</div>
                </div>
            </div>
        </div>
    </section>

    <section class="section" id="calculators">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Our Tools</span>
                <h2 class="section-title">Financial Calculators</h2>
                <p class="section-subtitle">From investments to taxes, we've got every calculation covered. Pick a tool and start planning.</p>
            </div>
            <div class="calc-grid stagger-children">
                ${calcCards}
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Why Choose Us</span>
                <h2 class="section-title">Built for Accuracy & Simplicity</h2>
                <p class="section-subtitle">We obsess over getting the details right so you can focus on making the right decisions.</p>
            </div>
            <div class="features-grid stagger-children">
                <div class="feature-card">
                    <div class="feature-icon">🎯</div>
                    <h3>Precise Calculations</h3>
                    <p>Every formula is validated against industry standards. Your results are accurate to the last rupee.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <h3>Instant Results</h3>
                    <p>No loading, no waiting. Get real-time calculations as you adjust your inputs with interactive sliders.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📊</div>
                    <h3>Visual Charts</h3>
                    <p>Beautiful donut and bar charts help you visualize your financial data at a glance.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔒</div>
                    <h3>100% Private</h3>
                    <p>All calculations happen in your browser. We never store your financial data on any server.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📱</div>
                    <h3>Mobile Friendly</h3>
                    <p>Use our tools on any device — phone, tablet, or desktop. Fully responsive design.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🆓</div>
                    <h3>Always Free</h3>
                    <p>No subscriptions, no hidden fees, no signup walls. Every tool is free to use, forever.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Getting Started</span>
                <h2 class="section-title">How It Works</h2>
                <p class="section-subtitle">Three simple steps to smarter financial planning.</p>
            </div>
            <div class="steps-grid stagger-children">
                <div class="step-card">
                    <div class="step-number">1</div>
                    <h3>Choose a Calculator</h3>
                    <p>Browse our collection of 10+ free financial calculators and select the one you need.</p>
                </div>
                <div class="step-card">
                    <div class="step-number">2</div>
                    <h3>Enter Your Details</h3>
                    <p>Use sliders or input fields to enter amounts, rates, and time periods. Adjust in real-time.</p>
                </div>
                <div class="step-card">
                    <div class="step-number">3</div>
                    <h3>Get Your Results</h3>
                    <p>View detailed results with charts, breakdowns, and actionable insights instantly.</p>
                </div>
            </div>
        </div>
    </section>`;
}

// ======================== ABOUT ========================
export function renderAbout() {
    updateMeta('About Us', 'Learn about FinCalc Pro — our mission to make financial planning accessible to everyone through free, accurate, and easy-to-use calculators.');

    return `
    <div class="container">
        <div class="about-hero animate-fade-up">
            <h1>About ${SITE_NAME}</h1>
            <p>We're on a mission to make financial planning accessible, transparent, and free for everyone. No jargon, no hidden fees — just accurate tools that help you make better money decisions.</p>
        </div>

        <div class="about-stats stagger-children">
            <div class="about-stat">
                <div class="stat-num">10+</div>
                <div class="stat-label">Financial Calculators</div>
            </div>
            <div class="about-stat">
                <div class="stat-num">50K+</div>
                <div class="stat-label">Calculations Done</div>
            </div>
            <div class="about-stat">
                <div class="stat-num">100%</div>
                <div class="stat-label">Free Forever</div>
            </div>
            <div class="about-stat">
                <div class="stat-num">0</div>
                <div class="stat-label">Data Stored</div>
            </div>
        </div>

        <div class="about-content animate-fade-up">
            <h2>Our Mission</h2>
            <p>Financial literacy is the foundation of financial freedom. Yet millions of people struggle with basic financial calculations — from understanding how much their SIP will grow, to calculating the true cost of a home loan, to figuring out their tax liability.</p>
            <p>${SITE_NAME} was built to bridge that gap. We believe everyone deserves access to professional-grade financial tools without paying for expensive software or hiring a financial advisor for simple calculations.</p>

            <h2>What We Offer</h2>
            <p>Our suite of 10+ financial calculators covers the most common financial planning needs:</p>
            <ul style="list-style:disc;padding-left:1.5rem;color:var(--text-secondary);margin-bottom:1rem;">
                <li style="margin-bottom:0.5rem;list-style:disc"><strong style="color:var(--text-primary)">Investment Calculators</strong> — SIP, FD, RD, and Mutual Fund returns calculators to plan your wealth-building journey.</li>
                <li style="margin-bottom:0.5rem;list-style:disc"><strong style="color:var(--text-primary)">Loan Calculators</strong> — EMI calculators for home loans, personal loans, and general loan comparison.</li>
                <li style="margin-bottom:0.5rem;list-style:disc"><strong style="color:var(--text-primary)">Tax Calculators</strong> — Income tax calculator with old vs. new regime comparison, plus GST calculator.</li>
                <li style="margin-bottom:0.5rem;list-style:disc"><strong style="color:var(--text-primary)">Utility Tools</strong> — Currency converter for quick international conversions.</li>
            </ul>

            <h2>Our Values</h2>
            <p><strong style="color:var(--text-primary)">Accuracy First:</strong> Every calculator uses industry-standard formulas. We regularly validate our calculations against banking standards and government guidelines.</p>
            <p><strong style="color:var(--text-primary)">Privacy by Design:</strong> All calculations happen right in your browser. We don't collect, store, or transmit any of your financial data. Period.</p>
            <p><strong style="color:var(--text-primary)">Free Forever:</strong> We believe financial tools should be accessible to everyone. Our calculators are free to use, with no signups, no paywalls, and no hidden costs.</p>
            <p><strong style="color:var(--text-primary)">Transparency:</strong> We show you the formulas behind every calculation. No black boxes, no mysterious algorithms — just clear math you can verify yourself.</p>

            <h2>Contact Us</h2>
            <p>Have questions, suggestions, or found a bug? We'd love to hear from you! Reach out at <a href="mailto:${SITE_EMAIL}">${SITE_EMAIL}</a> or visit our <a href="#/contact" data-nav>Contact page</a>.</p>
        </div>
    </div>`;
}

// ======================== CONTACT ========================
export function renderContact() {
    updateMeta('Contact Us', 'Get in touch with FinCalc Pro. We welcome your questions, feedback, and suggestions.');

    return `
    <div class="container">
        <div class="about-hero animate-fade-up" style="padding-bottom:var(--space-8)">
            <h1>Contact Us</h1>
            <p>Have a question, suggestion, or just want to say hello? We'd love to hear from you.</p>
        </div>

        <div class="contact-grid animate-fade-up">
            <div class="contact-form-card">
                <h2>Send a Message</h2>
                <p>Fill out the form below and we'll get back to you within 24–48 hours.</p>
                <form class="contact-form" id="contact-form" onsubmit="event.preventDefault(); document.getElementById('form-success').style.display='block'; this.reset();">
                    <div class="input-group">
                        <label class="input-label">Your Name</label>
                        <input type="text" class="input-field" placeholder="John Doe" required>
                    </div>
                    <div class="input-group">
                        <label class="input-label">Email Address</label>
                        <input type="email" class="input-field" placeholder="john@example.com" required>
                    </div>
                    <div class="input-group">
                        <label class="input-label">Subject</label>
                        <select class="input-select">
                            <option>General Inquiry</option>
                            <option>Bug Report</option>
                            <option>Feature Request</option>
                            <option>Partnership</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label class="input-label">Message</label>
                        <textarea class="input-field" placeholder="Tell us what's on your mind…" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary btn-lg" style="width:100%">Send Message</button>
                    <div id="form-success" style="display:none;margin-top:var(--space-4);padding:var(--space-4);background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);border-radius:var(--radius-sm);color:var(--success);font-size:var(--fs-sm);text-align:center;">
                        ✅ Thank you! Your message has been received. We'll get back to you soon.
                    </div>
                </form>
            </div>

            <div class="contact-info-card">
                <div class="contact-info-item">
                    <div class="contact-info-icon">✉️</div>
                    <div>
                        <h3>Email Us</h3>
                        <p><a href="mailto:${SITE_EMAIL}">${SITE_EMAIL}</a></p>
                        <p style="margin-top:4px;font-size:var(--fs-xs);color:var(--text-muted)">We respond within 24–48 hours</p>
                    </div>
                </div>
                <div class="contact-info-item">
                    <div class="contact-info-icon">📍</div>
                    <div>
                        <h3>Location</h3>
                        <p>India</p>
                        <p style="margin-top:4px;font-size:var(--fs-xs);color:var(--text-muted)">Serving users worldwide</p>
                    </div>
                </div>
                <div class="contact-info-item">
                    <div class="contact-info-icon">🕐</div>
                    <div>
                        <h3>Business Hours</h3>
                        <p>Monday – Friday: 9 AM – 6 PM IST</p>
                        <p style="margin-top:4px;font-size:var(--fs-xs);color:var(--text-muted)">Weekend emails answered on Monday</p>
                    </div>
                </div>
                <div class="contact-info-item">
                    <div class="contact-info-icon">💬</div>
                    <div>
                        <h3>Social Media</h3>
                        <p>Follow us on Twitter, Facebook, and LinkedIn for updates and financial tips.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

// ======================== PRIVACY POLICY ========================
export function renderPrivacyPolicy() {
    updateMeta('Privacy Policy', `${SITE_NAME} Privacy Policy — how we collect, use, and protect your data.`);
    const date = 'July 13, 2026';

    return `
    <div class="container">
        <div class="legal-page animate-fade-up">
            <h1>Privacy Policy</h1>
            <p class="last-updated">Last updated: ${date}</p>
            <div class="legal-content">
                <p>At ${SITE_NAME}, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

                <h2>1. Information We Collect</h2>
                <h3>Personal Data</h3>
                <p>We may collect personal identification information only when you voluntarily submit it to us via our contact form, including:</p>
                <ul>
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Message content</li>
                </ul>

                <h3>Non-Personal Data</h3>
                <p>When you visit our website, we may automatically collect certain information including:</p>
                <ul>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Referring website</li>
                    <li>Pages visited and time spent</li>
                    <li>IP address (anonymized)</li>
                </ul>

                <h3>Financial Data</h3>
                <p><strong>We do NOT collect, store, or transmit any financial data.</strong> All calculations performed on our website happen entirely within your browser (client-side). No financial information you enter into our calculators is ever sent to our servers.</p>

                <h2>2. How We Use Your Information</h2>
                <p>We may use the information we collect for the following purposes:</p>
                <ul>
                    <li>To respond to your inquiries and support requests</li>
                    <li>To improve our website and user experience</li>
                    <li>To analyze usage patterns and optimize performance</li>
                    <li>To display relevant advertisements via third-party services</li>
                    <li>To comply with legal obligations</li>
                </ul>

                <h2>3. Cookies and Tracking</h2>
                <p>Our website uses cookies to enhance your experience. Cookies are small text files stored on your device. We use the following types of cookies:</p>
                <ul>
                    <li><strong>Essential Cookies:</strong> Required for basic site functionality (e.g., cookie consent preferences).</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site (e.g., Google Analytics).</li>
                    <li><strong>Advertising Cookies:</strong> Used by third-party ad services (e.g., Google AdSense) to display relevant advertisements.</li>
                </ul>
                <p>You can control cookies through your browser settings. Disabling cookies may affect some site functionality.</p>

                <h2>4. Third-Party Services</h2>
                <p>We may use third-party services that collect information, including:</p>
                <ul>
                    <li><strong>Google Analytics:</strong> Web analytics service. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacy Policy</a></li>
                    <li><strong>Google AdSense:</strong> Advertising service that may use cookies to serve personalized ads. <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">Google Ads Policy</a></li>
                </ul>

                <h2>5. Data Security</h2>
                <p>We implement appropriate technical and organizational security measures to protect your information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>

                <h2>6. Your Rights (GDPR)</h2>
                <p>If you are a resident of the European Economic Area, you have the following rights:</p>
                <ul>
                    <li>Right to access your personal data</li>
                    <li>Right to rectification of inaccurate data</li>
                    <li>Right to erasure of your data</li>
                    <li>Right to restrict processing</li>
                    <li>Right to data portability</li>
                    <li>Right to object to processing</li>
                </ul>
                <p>To exercise any of these rights, please contact us at <a href="mailto:${SITE_EMAIL}">${SITE_EMAIL}</a>.</p>

                <h2>7. Children's Privacy</h2>
                <p>Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>

                <h2>8. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>

                <h2>9. Contact Us</h2>
                <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:${SITE_EMAIL}">${SITE_EMAIL}</a> or visit our <a href="#/contact" data-nav>Contact page</a>.</p>
            </div>
        </div>
    </div>`;
}

// ======================== TERMS & CONDITIONS ========================
export function renderTerms() {
    updateMeta('Terms & Conditions', `${SITE_NAME} Terms and Conditions of use.`);
    const date = 'July 13, 2026';

    return `
    <div class="container">
        <div class="legal-page animate-fade-up">
            <h1>Terms & Conditions</h1>
            <p class="last-updated">Last updated: ${date}</p>
            <div class="legal-content">
                <p>Welcome to ${SITE_NAME}. By accessing and using this website, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.</p>

                <h2>1. Use of Website</h2>
                <p>You may use ${SITE_NAME} for lawful purposes only. You agree not to:</p>
                <ul>
                    <li>Use the website in any way that violates applicable laws or regulations</li>
                    <li>Attempt to gain unauthorized access to any part of the website</li>
                    <li>Use automated systems (bots, scrapers) to access the website without permission</li>
                    <li>Interfere with or disrupt the website's operation</li>
                    <li>Copy, reproduce, or redistribute our content without permission</li>
                </ul>

                <h2>2. Calculator Results</h2>
                <p>The calculators provided on ${SITE_NAME} are for informational and educational purposes only. While we strive for accuracy:</p>
                <ul>
                    <li>Results are approximations and may differ from actual financial outcomes</li>
                    <li>We do not guarantee the accuracy, completeness, or reliability of any calculation</li>
                    <li>Results should not be considered as financial, tax, or investment advice</li>
                    <li>Always consult a qualified financial professional before making financial decisions</li>
                </ul>

                <h2>3. Intellectual Property</h2>
                <p>All content on ${SITE_NAME}, including text, graphics, logos, icons, images, and software, is the property of ${SITE_NAME} and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>

                <h2>4. Third-Party Links</h2>
                <p>Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of any third-party websites. Visiting these links is at your own risk.</p>

                <h2>5. Disclaimer of Warranties</h2>
                <p>This website is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.</p>

                <h2>6. Limitation of Liability</h2>
                <p>In no event shall ${SITE_NAME}, its owners, or affiliates be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of this website or its calculators.</p>

                <h2>7. Indemnification</h2>
                <p>You agree to indemnify and hold harmless ${SITE_NAME} and its owners from any claims, losses, or damages arising from your use of the website or violation of these terms.</p>

                <h2>8. Governing Law</h2>
                <p>These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.</p>

                <h2>9. Changes to Terms</h2>
                <p>We reserve the right to modify these Terms at any time. Continued use of the website after changes constitutes acceptance of the modified terms.</p>

                <h2>10. Contact</h2>
                <p>For questions about these Terms, contact us at <a href="mailto:${SITE_EMAIL}">${SITE_EMAIL}</a>.</p>
            </div>
        </div>
    </div>`;
}

// ======================== DISCLAIMER ========================
export function renderDisclaimer() {
    updateMeta('Disclaimer', `${SITE_NAME} Disclaimer — important information about calculator results and financial advice.`);
    const date = 'July 13, 2026';

    return `
    <div class="container">
        <div class="legal-page animate-fade-up">
            <h1>Disclaimer</h1>
            <p class="last-updated">Last updated: ${date}</p>
            <div class="legal-content">
                <h2>General Disclaimer</h2>
                <p>The information provided by ${SITE_NAME} ("we", "us", or "our") on this website is for general informational and educational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>

                <h2>Not Financial Advice</h2>
                <p><strong>The calculators and tools on ${SITE_NAME} do not constitute financial, investment, tax, or legal advice.</strong> The results generated by our calculators are approximations based on the information you provide and standard mathematical formulas. They should not be relied upon as the sole basis for any financial decision.</p>
                <p>Before making any financial decision, we strongly recommend consulting with a qualified financial advisor, tax professional, or other appropriate professional who can provide personalized advice based on your specific circumstances.</p>

                <h2>Accuracy of Calculations</h2>
                <p>While we strive to ensure our calculators use accurate and up-to-date formulas:</p>
                <ul>
                    <li>Actual financial outcomes may differ from calculated results due to rounding, market conditions, policy changes, fees, and other factors</li>
                    <li>Tax slabs and rates may change with government policies and budgets</li>
                    <li>Exchange rates are indicative and may not reflect real-time market rates</li>
                    <li>Interest rates used in calculations may differ from rates offered by specific financial institutions</li>
                </ul>

                <h2>External Links</h2>
                <p>Our website may contain links to external websites. We do not control the content, privacy policies, or practices of these websites. Inclusion of a link does not imply endorsement.</p>

                <h2>Limitation of Liability</h2>
                <p>Under no circumstances shall ${SITE_NAME} be held liable for any loss or damage, including but not limited to financial loss, arising from the use of our calculators and tools.</p>

                <h2>Professional Advice</h2>
                <p>For specific financial planning, tax filing, investment decisions, or loan applications, always consult with:</p>
                <ul>
                    <li>A certified financial planner (CFP) for investment advice</li>
                    <li>A chartered accountant (CA) for tax-related decisions</li>
                    <li>A certified credit counselor for loan and debt management</li>
                    <li>Your bank or financial institution for specific product terms</li>
                </ul>

                <h2>Contact</h2>
                <p>If you have questions about this Disclaimer, please contact us at <a href="mailto:${SITE_EMAIL}">${SITE_EMAIL}</a>.</p>
            </div>
        </div>
    </div>`;
}

// ======================== COOKIE POLICY ========================
export function renderCookiePolicy() {
    updateMeta('Cookie Policy', `${SITE_NAME} Cookie Policy — how we use cookies and how you can manage them.`);
    const date = 'July 13, 2026';

    return `
    <div class="container">
        <div class="legal-page animate-fade-up">
            <h1>Cookie Policy</h1>
            <p class="last-updated">Last updated: ${date}</p>
            <div class="legal-content">
                <p>This Cookie Policy explains what cookies are, how ${SITE_NAME} uses them, and how you can control them.</p>

                <h2>What Are Cookies?</h2>
                <p>Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.</p>

                <h2>Types of Cookies We Use</h2>

                <h3>Essential Cookies</h3>
                <p>These cookies are necessary for the basic functionality of our website. They include cookies that remember your cookie consent preferences. Without these cookies, some parts of the website may not function properly.</p>

                <h3>Analytics Cookies</h3>
                <p>We use analytics cookies (such as Google Analytics) to understand how visitors interact with our website. These cookies collect information such as:</p>
                <ul>
                    <li>Pages visited and time spent on each page</li>
                    <li>How you arrived at our website</li>
                    <li>Your general geographic location</li>
                    <li>Your browser type and device</li>
                </ul>
                <p>This information is aggregated and anonymized, meaning it cannot be used to identify you personally.</p>

                <h3>Advertising Cookies</h3>
                <p>We may use third-party advertising cookies (such as those from Google AdSense) to display advertisements that are relevant to you. These cookies may track your browsing activity across different websites to build a profile of your interests.</p>

                <h2>How to Manage Cookies</h2>
                <p>You can control and manage cookies in several ways:</p>
                <ul>
                    <li><strong>Browser Settings:</strong> Most browsers allow you to view, manage, and delete cookies through their settings. Refer to your browser's help documentation for instructions.</li>
                    <li><strong>Cookie Consent:</strong> When you first visit our website, you can choose to accept or decline non-essential cookies through our cookie consent banner.</li>
                    <li><strong>Google Ads Settings:</strong> You can manage your Google advertising preferences at <a href="https://adssettings.google.com" target="_blank" rel="noopener">Google Ads Settings</a>.</li>
                    <li><strong>Opt-Out Tools:</strong> You can opt out of interest-based advertising at <a href="https://optout.aboutads.info" target="_blank" rel="noopener">Digital Advertising Alliance</a>.</li>
                </ul>

                <h2>Impact of Disabling Cookies</h2>
                <p>Disabling cookies may affect the functionality of our website. Essential cookies cannot be disabled as they are required for the website to work. If you disable analytics or advertising cookies, you may still see ads, but they may not be relevant to your interests.</p>

                <h2>Updates to This Policy</h2>
                <p>We may update this Cookie Policy from time to time. The updated version will be indicated by the "Last updated" date at the top of this page.</p>

                <h2>Contact</h2>
                <p>For questions about our use of cookies, contact us at <a href="mailto:${SITE_EMAIL}">${SITE_EMAIL}</a>.</p>
            </div>
        </div>
    </div>`;
}

// ======================== DMCA POLICY ========================
export function renderDMCA() {
    updateMeta('DMCA / Copyright Policy', `${SITE_NAME} DMCA and Copyright Policy.`);
    const date = 'July 13, 2026';

    return `
    <div class="container">
        <div class="legal-page animate-fade-up">
            <h1>DMCA / Copyright Policy</h1>
            <p class="last-updated">Last updated: ${date}</p>
            <div class="legal-content">
                <p>${SITE_NAME} respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond promptly to claims of copyright infringement.</p>

                <h2>Copyright Infringement Notification</h2>
                <p>If you believe that content on our website infringes your copyright, please provide us with the following information in writing:</p>
                <ul>
                    <li>A physical or electronic signature of the copyright owner or authorized representative</li>
                    <li>Identification of the copyrighted work claimed to be infringed</li>
                    <li>Identification of the material that is claimed to be infringing, including URL or page reference</li>
                    <li>Your contact information (name, address, phone number, email)</li>
                    <li>A statement that you have a good faith belief that the use is not authorized by the copyright owner, its agent, or the law</li>
                    <li>A statement, under penalty of perjury, that the information in your notification is accurate and that you are the copyright owner or authorized to act on their behalf</li>
                </ul>

                <h2>How to Submit a DMCA Notice</h2>
                <p>Send your DMCA takedown notice to: <a href="mailto:${SITE_EMAIL}">${SITE_EMAIL}</a></p>
                <p>Please include "DMCA Notice" in the subject line.</p>

                <h2>Counter-Notification</h2>
                <p>If you believe your content was removed in error, you may file a counter-notification containing:</p>
                <ul>
                    <li>Your physical or electronic signature</li>
                    <li>Identification of the removed material and its former location</li>
                    <li>A statement under penalty of perjury that you believe the material was removed in error</li>
                    <li>Your name, address, and phone number</li>
                    <li>A statement that you consent to jurisdiction of the appropriate court</li>
                </ul>

                <h2>Repeat Infringers</h2>
                <p>We will terminate user access for repeat copyright infringers in appropriate circumstances.</p>

                <h2>Contact</h2>
                <p>For copyright-related questions, contact us at <a href="mailto:${SITE_EMAIL}">${SITE_EMAIL}</a>.</p>
            </div>
        </div>
    </div>`;
}

// ======================== SITEMAP ========================
export function renderSitemap() {
    updateMeta('Sitemap', `${SITE_NAME} sitemap — find all pages and tools.`);

    return `
    <div class="container">
        <div class="legal-page animate-fade-up">
            <h1>Sitemap</h1>
            <p style="color:var(--text-secondary);margin-bottom:var(--space-10)">Find all pages and calculators available on ${SITE_NAME}.</p>

            <div class="sitemap-grid">
                <div class="sitemap-section">
                    <h3>📄 Main Pages</h3>
                    <ul>
                        <li><a href="#/" data-nav>→ Home</a></li>
                        <li><a href="#/about" data-nav>→ About Us</a></li>
                        <li><a href="#/contact" data-nav>→ Contact Us</a></li>
                    </ul>
                </div>

                <div class="sitemap-section">
                    <h3>🧮 Calculators</h3>
                    <ul>
                        ${CALCULATORS.map(c => `<li><a href="${c.path}" data-nav>→ ${c.name}</a></li>`).join('')}
                    </ul>
                </div>

                <div class="sitemap-section">
                    <h3>⚖️ Legal</h3>
                    <ul>
                        ${LEGAL_PAGES.map(p => `<li><a href="${p.path}" data-nav>→ ${p.label}</a></li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>`;
}

// ======================== 404 ========================
export function renderNotFound() {
    updateMeta('Page Not Found', 'The page you were looking for could not be found.');

    return `
    <div class="page-404 animate-fade-up">
        <div class="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.</p>
        <a href="#/" class="btn btn-primary btn-lg" data-nav>← Back to Home</a>
        <div class="popular-links" style="margin-top:var(--space-8)">
            <span style="color:var(--text-muted);font-size:var(--fs-sm);width:100%;margin-bottom:var(--space-2)">Popular calculators:</span>
            ${CALCULATORS.slice(0, 5).map(c => `<a href="${c.path}" data-nav>${c.icon} ${c.shortName}</a>`).join('')}
        </div>
    </div>`;
}
