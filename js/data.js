/* ============================================================
   DATA — Calculator metadata, FAQs, exchange rates, tax slabs
   ============================================================ */

export const SITE_NAME = 'FinCalc Pro';
export const SITE_TAGLINE = 'Free Financial Calculators & Tools';
export const SITE_EMAIL = 'contact@fincalcpro.com';
export const SITE_URL = 'https://fincalcpro.com';

// ---- Calculator Registry ----
export const CALCULATORS = [
    {
        id: 'sip',
        name: 'SIP Calculator',
        shortName: 'SIP',
        icon: '📈',
        path: '#/calculators/sip',
        description: 'Calculate returns on your Systematic Investment Plan (SIP) and watch your investments grow over time.',
        shortDesc: 'Calculate SIP returns & wealth growth',
        category: 'Investment',
        color: '#22c55e',
    },
    {
        id: 'loan',
        name: 'Loan Calculator',
        shortName: 'Loan',
        icon: '🏦',
        path: '#/calculators/loan',
        description: 'Compute EMI, total interest, and amortization schedules for any type of loan with flexible tenure options.',
        shortDesc: 'EMI & amortization for any loan',
        category: 'Loan',
        color: '#38bdf8',
    },
    {
        id: 'home-loan-emi',
        name: 'Home Loan EMI Calculator',
        shortName: 'Home Loan',
        icon: '🏠',
        path: '#/calculators/home-loan-emi',
        description: 'Plan your dream home purchase by calculating monthly EMIs, total interest, and year-wise breakdowns.',
        shortDesc: 'Home loan EMI with down payment',
        category: 'Loan',
        color: '#a78bfa',
    },
    {
        id: 'personal-loan-emi',
        name: 'Personal Loan EMI Calculator',
        shortName: 'Personal Loan',
        icon: '💳',
        path: '#/calculators/personal-loan-emi',
        description: 'Find your personal loan EMI instantly. Compare scenarios with and without prepayment.',
        shortDesc: 'Personal loan EMI & prepayment',
        category: 'Loan',
        color: '#fb7185',
    },
    {
        id: 'fd',
        name: 'FD Calculator',
        shortName: 'FD',
        icon: '🔒',
        path: '#/calculators/fd',
        description: 'Calculate maturity amount and interest earned on your Fixed Deposit with various compounding options.',
        shortDesc: 'Fixed deposit maturity & interest',
        category: 'Investment',
        color: '#f0b429',
    },
    {
        id: 'rd',
        name: 'RD Calculator',
        shortName: 'RD',
        icon: '🪙',
        path: '#/calculators/rd',
        description: 'Estimate your Recurring Deposit maturity value and total interest earned over the investment period.',
        shortDesc: 'Recurring deposit maturity value',
        category: 'Investment',
        color: '#2dd4bf',
    },
    {
        id: 'mutual-fund',
        name: 'Mutual Fund Returns Calculator',
        shortName: 'Mutual Fund',
        icon: '📊',
        path: '#/calculators/mutual-fund',
        description: 'Project your mutual fund returns for both SIP and lumpsum investments with growth visualization.',
        shortDesc: 'SIP & lumpsum return projections',
        category: 'Investment',
        color: '#818cf8',
    },
    {
        id: 'income-tax',
        name: 'Income Tax Calculator',
        shortName: 'Income Tax',
        icon: '📋',
        path: '#/calculators/income-tax',
        description: 'Calculate your income tax liability under both Old and New tax regimes. Compare and save more.',
        shortDesc: 'Old vs New regime tax comparison',
        category: 'Tax',
        color: '#f97316',
    },
    {
        id: 'gst',
        name: 'GST Calculator',
        shortName: 'GST',
        icon: '🧾',
        path: '#/calculators/gst',
        description: 'Quickly add or remove GST from any amount. Get CGST/SGST split for all standard GST rates.',
        shortDesc: 'Add or remove GST instantly',
        category: 'Tax',
        color: '#06b6d4',
    },
    {
        id: 'currency-converter',
        name: 'Currency Converter',
        shortName: 'Currency',
        icon: '💱',
        path: '#/calculators/currency-converter',
        description: 'Convert between major world currencies with indicative exchange rates and popular conversion pairs.',
        shortDesc: 'Convert between world currencies',
        category: 'Utility',
        color: '#ec4899',
    },
];

// ---- Exchange Rates (base: INR) ----
export const EXCHANGE_RATES = {
    INR: 1,
    USD: 0.01190,
    EUR: 0.01095,
    GBP: 0.00943,
    JPY: 1.79,
    AUD: 0.01825,
    CAD: 0.01627,
    SGD: 0.01596,
    AED: 0.04370,
    SAR: 0.04462,
    CHF: 0.01058,
    CNY: 0.08659,
    HKD: 0.09278,
    MYR: 0.05290,
    THB: 0.41120,
    KRW: 16.48,
    NZD: 0.02003,
    ZAR: 0.21630,
    BRL: 0.06759,
    RUB: 1.19,
};

export const CURRENCY_NAMES = {
    INR: 'Indian Rupee',
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    JPY: 'Japanese Yen',
    AUD: 'Australian Dollar',
    CAD: 'Canadian Dollar',
    SGD: 'Singapore Dollar',
    AED: 'UAE Dirham',
    SAR: 'Saudi Riyal',
    CHF: 'Swiss Franc',
    CNY: 'Chinese Yuan',
    HKD: 'Hong Kong Dollar',
    MYR: 'Malaysian Ringgit',
    THB: 'Thai Baht',
    KRW: 'South Korean Won',
    NZD: 'New Zealand Dollar',
    ZAR: 'South African Rand',
    BRL: 'Brazilian Real',
    RUB: 'Russian Ruble',
};

export const CURRENCY_SYMBOLS = {
    INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥',
    AUD: 'A$', CAD: 'C$', SGD: 'S$', AED: 'د.إ', SAR: '﷼',
    CHF: 'CHF', CNY: '¥', HKD: 'HK$', MYR: 'RM', THB: '฿',
    KRW: '₩', NZD: 'NZ$', ZAR: 'R', BRL: 'R$', RUB: '₽',
};

// ---- Income Tax Slabs (India FY 2025-26) ----
export const TAX_SLABS_OLD = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250000, max: 500000, rate: 5 },
    { min: 500000, max: 1000000, rate: 20 },
    { min: 1000000, max: Infinity, rate: 30 },
];

export const TAX_SLABS_NEW = [
    { min: 0, max: 400000, rate: 0 },
    { min: 400000, max: 800000, rate: 5 },
    { min: 800000, max: 1200000, rate: 10 },
    { min: 1200000, max: 1600000, rate: 15 },
    { min: 1600000, max: 2000000, rate: 20 },
    { min: 2000000, max: 2400000, rate: 25 },
    { min: 2400000, max: Infinity, rate: 30 },
];

// ---- GST Rates ----
export const GST_RATES = [5, 12, 18, 28];

// ---- Navigation Links ----
export const NAV_LINKS = [
    { label: 'Home', path: '#/' },
    { label: 'Calculators', path: '#/calculators', dropdown: true },
    { label: 'About', path: '#/about' },
    { label: 'Contact', path: '#/contact' },
];

export const LEGAL_PAGES = [
    { label: 'Privacy Policy', path: '#/privacy-policy' },
    { label: 'Terms & Conditions', path: '#/terms-conditions' },
    { label: 'Disclaimer', path: '#/disclaimer' },
    { label: 'Cookie Policy', path: '#/cookie-policy' },
    { label: 'DMCA Policy', path: '#/dmca-policy' },
];
