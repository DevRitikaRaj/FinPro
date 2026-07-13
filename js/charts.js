/* ============================================================
   CHARTS — Canvas-based chart rendering (Donut, Bar, Line)
   ============================================================ */

/**
 * Draw a donut / pie chart on a canvas.
 * @param {string} canvasId
 * @param {Array<{label:string, value:number, color:string}>} segments
 * @param {object} opts
 */
export function drawDonutChart(canvasId, segments, opts = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = opts.size || 220;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = (size / 2) - 8;
    const innerRadius = radius * (opts.innerRadius || 0.6);
    const total = segments.reduce((s, seg) => s + seg.value, 0);
    if (total === 0) return;

    let startAngle = -Math.PI / 2;

    // Animate
    let progress = 0;
    const duration = 800;
    const startTime = performance.now();

    function animate(now) {
        progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

        ctx.clearRect(0, 0, size, size);

        // Background ring
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2, true);
        ctx.fillStyle = 'rgba(148, 163, 184, 0.06)';
        ctx.fill();

        let angle = -Math.PI / 2;
        segments.forEach(seg => {
            const sweep = (seg.value / total) * Math.PI * 2 * eased;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, angle, angle + sweep);
            ctx.arc(cx, cy, innerRadius, angle + sweep, angle, true);
            ctx.closePath();
            ctx.fillStyle = seg.color;
            ctx.fill();
            angle += sweep;
        });

        // Center text
        if (opts.centerText) {
            ctx.fillStyle = '#f1f5f9';
            ctx.font = `700 ${size * 0.09}px Inter, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(opts.centerLabel || 'Total', cx, cy - 10);
            ctx.font = `800 ${size * 0.12}px Inter, sans-serif`;
            ctx.fillStyle = '#f0b429';
            ctx.fillText(opts.centerText, cx, cy + 14);
        }

        if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

/**
 * Draw a bar chart on a canvas.
 * @param {string} canvasId
 * @param {Array<{label:string, value:number, color:string}>} bars
 * @param {object} opts
 */
export function drawBarChart(canvasId, bars, opts = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = opts.width || canvas.parentElement.clientWidth || 400;
    const height = opts.height || 220;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    const padding = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxVal = Math.max(...bars.map(b => b.value)) * 1.15;
    const barWidth = Math.min(40, (chartW / bars.length) * 0.6);
    const gap = (chartW - barWidth * bars.length) / (bars.length + 1);

    // Animate
    let progress = 0;
    const duration = 800;
    const startTime = performance.now();

    function animate(now) {
        progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        ctx.clearRect(0, 0, width, height);

        // Grid lines
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.06)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (chartH / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();

            // Y labels
            const val = maxVal - (maxVal / 4) * i;
            ctx.fillStyle = '#64748b';
            ctx.font = '500 11px Inter, sans-serif';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillText(formatCompact(val), padding.left - 8, y);
        }

        // Bars
        bars.forEach((bar, i) => {
            const x = padding.left + gap + (barWidth + gap) * i;
            const barH = (bar.value / maxVal) * chartH * eased;
            const y = padding.top + chartH - barH;

            // Bar with gradient
            const grad = ctx.createLinearGradient(x, y, x, padding.top + chartH);
            grad.addColorStop(0, bar.color || '#f0b429');
            grad.addColorStop(1, hexToRgba(bar.color || '#f0b429', 0.3));
            ctx.fillStyle = grad;

            // Rounded top
            const r = Math.min(4, barWidth / 2);
            ctx.beginPath();
            ctx.moveTo(x, padding.top + chartH);
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.lineTo(x + barWidth - r, y);
            ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + r);
            ctx.lineTo(x + barWidth, padding.top + chartH);
            ctx.closePath();
            ctx.fill();

            // X label
            ctx.fillStyle = '#94a3b8';
            ctx.font = '500 11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(bar.label, x + barWidth / 2, padding.top + chartH + 8);
        });

        if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

/**
 * Draw a line/area chart on a canvas.
 * @param {string} canvasId
 * @param {Array<{label:string, value:number}>} points
 * @param {object} opts
 */
export function drawLineChart(canvasId, points, opts = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = opts.width || canvas.parentElement.clientWidth || 400;
    const height = opts.height || 220;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    const padding = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxVal = Math.max(...points.map(p => p.value)) * 1.15;
    const minVal = 0;
    const step = chartW / (points.length - 1 || 1);
    const color = opts.color || '#f0b429';

    // Animate
    let progress = 0;
    const duration = 1000;
    const startTime = performance.now();

    function animate(now) {
        progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        ctx.clearRect(0, 0, width, height);

        // Grid
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.06)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (chartH / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
            const val = maxVal - ((maxVal - minVal) / 4) * i;
            ctx.fillStyle = '#64748b';
            ctx.font = '500 11px Inter, sans-serif';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillText(formatCompact(val), padding.left - 8, y);
        }

        // Draw up to animated progress
        const drawCount = Math.ceil(points.length * eased);
        if (drawCount < 2) {
            if (progress < 1) requestAnimationFrame(animate);
            return;
        }

        const coords = points.slice(0, drawCount).map((p, i) => ({
            x: padding.left + step * i,
            y: padding.top + chartH - ((p.value - minVal) / (maxVal - minVal)) * chartH,
        }));

        // Area fill
        ctx.beginPath();
        ctx.moveTo(coords[0].x, padding.top + chartH);
        coords.forEach(c => ctx.lineTo(c.x, c.y));
        ctx.lineTo(coords[coords.length - 1].x, padding.top + chartH);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
        grad.addColorStop(0, hexToRgba(color, 0.15));
        grad.addColorStop(1, hexToRgba(color, 0.01));
        ctx.fillStyle = grad;
        ctx.fill();

        // Line
        ctx.beginPath();
        coords.forEach((c, i) => i === 0 ? ctx.moveTo(c.x, c.y) : ctx.lineTo(c.x, c.y));
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Dots on last few points
        const lastCoord = coords[coords.length - 1];
        ctx.beginPath();
        ctx.arc(lastCoord.x, lastCoord.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(lastCoord.x, lastCoord.y, 7, 0, Math.PI * 2);
        ctx.strokeStyle = hexToRgba(color, 0.3);
        ctx.lineWidth = 2;
        ctx.stroke();

        // X labels (show a few)
        const labelInterval = Math.max(1, Math.floor(points.length / 6));
        points.forEach((p, i) => {
            if (i % labelInterval === 0 || i === points.length - 1) {
                const x = padding.left + step * i;
                ctx.fillStyle = '#94a3b8';
                ctx.font = '500 11px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText(p.label, x, padding.top + chartH + 8);
            }
        });

        if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

/**
 * Draw a stacked bar chart.
 */
export function drawStackedBarChart(canvasId, data, opts = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = opts.width || canvas.parentElement.clientWidth || 400;
    const height = opts.height || 220;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    const padding = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxVal = Math.max(...data.map(d => d.values.reduce((a, b) => a + b, 0))) * 1.15;
    const barWidth = Math.min(35, (chartW / data.length) * 0.6);
    const gap = (chartW - barWidth * data.length) / (data.length + 1);
    const colors = opts.colors || ['#f0b429', '#38bdf8'];

    let progress = 0;
    const duration = 800;
    const startTime = performance.now();

    function animate(now) {
        progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        ctx.clearRect(0, 0, width, height);

        // Grid
        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (chartH / 4) * i;
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.06)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
            const val = maxVal - (maxVal / 4) * i;
            ctx.fillStyle = '#64748b';
            ctx.font = '500 11px Inter, sans-serif';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillText(formatCompact(val), padding.left - 8, y);
        }

        // Bars
        data.forEach((d, i) => {
            const x = padding.left + gap + (barWidth + gap) * i;
            let yOffset = 0;
            d.values.forEach((val, vi) => {
                const barH = (val / maxVal) * chartH * eased;
                const y = padding.top + chartH - yOffset - barH;
                ctx.fillStyle = colors[vi % colors.length];
                const r = vi === d.values.length - 1 ? Math.min(3, barWidth / 2) : 0;
                if (r > 0) {
                    ctx.beginPath();
                    ctx.moveTo(x, y + barH);
                    ctx.lineTo(x, y + r);
                    ctx.quadraticCurveTo(x, y, x + r, y);
                    ctx.lineTo(x + barWidth - r, y);
                    ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + r);
                    ctx.lineTo(x + barWidth, y + barH);
                    ctx.closePath();
                    ctx.fill();
                } else {
                    ctx.fillRect(x, y, barWidth, barH);
                }
                yOffset += barH;
            });

            // X label
            ctx.fillStyle = '#94a3b8';
            ctx.font = '500 11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(d.label, x + barWidth / 2, padding.top + chartH + 8);
        });

        if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

// ---- Helpers ----
function formatCompact(num) {
    if (num >= 10000000) return '₹' + (num / 10000000).toFixed(1) + 'Cr';
    if (num >= 100000) return '₹' + (num / 100000).toFixed(1) + 'L';
    if (num >= 1000) return '₹' + (num / 1000).toFixed(1) + 'K';
    return '₹' + Math.round(num);
}

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
