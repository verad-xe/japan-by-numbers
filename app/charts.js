/* Japan by Numbers — hand-rolled SVG chart builders.
   No chart library: every chart is drawn from the data in data.js.
   Each chart returns an SVG string; hovering a bar or point shows a
   tooltip built from the same data. */
"use strict";

const JBN = {
  indigo: "#2e2a6e",
  indigoLight: "#4c46a8",
  vermilion: "#e0392c",
  vermilionSoft: "#f6a49c",
  teal: "#0e7c7b",
  amber: "#e8a13a",
  grey: "#8a8a9e",
  grid: "#e4e4ee"
};

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* A small helper: after a chart is in the page, wire hover tooltips.
   Elements carry data-tip; a single floating div shows the text. */
function wireTips(root) {
  let tip = document.getElementById("jbn-tip");
  if (!tip) {
    tip = document.createElement("div");
    tip.id = "jbn-tip";
    tip.className = "chart-tip";
    document.body.appendChild(tip);
  }
  root.querySelectorAll("[data-tip]").forEach(function (el) {
    el.addEventListener("mousemove", function (ev) {
      tip.textContent = el.getAttribute("data-tip");
      tip.style.display = "block";
      const x = Math.min(ev.clientX + 12, window.innerWidth - 190);
      const y = Math.max(ev.clientY - 34, 8);
      tip.style.left = x + "px";
      tip.style.top = y + "px";
    });
    el.addEventListener("mouseleave", function () { tip.style.display = "none"; });
  });
}

/* Line chart: points is [{x: label, y: number}], value shown with fmt.
   The y axis snaps to round steps so the labels read cleanly. */
function lineChart(points, opts) {
  const w = opts.width || 720, h = opts.height || 280;
  const padL = 52, padR = 16, padT = 18, padB = 34;
  const iw = w - padL - padR, ih = h - padT - padB;
  const vals = points.map(function (p) { return p.y; });
  let vMin = Math.min.apply(null, vals), vMax = Math.max.apply(null, vals);
  if (opts.floor !== undefined) vMin = Math.min(vMin, opts.floor);
  if (opts.zeroBase) vMin = Math.min(vMin, 0);
  const steps = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
  let step = steps[steps.length - 1];
  for (const s of steps) { if ((vMax - vMin) / s <= 4) { step = s; break; } }
  const lo = Math.floor(vMin / step) * step, hi = Math.ceil(vMax / step) * step;
  const yAt = function (v) { return padT + ih - ((v - lo) / ((hi - lo) || 1)) * ih; };
  const fmt = opts.fmt || function (v) { return String(v); };
  let g = "";
  for (let v = lo; v <= hi + step / 2; v += step) {
    const y = yAt(v);
    g += '<line x1="' + padL + '" y1="' + y.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + y.toFixed(1) + '" stroke="' + JBN.grid + '"/>';
    g += '<text x="' + (padL - 8) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end" class="axis-label">' + esc(fmt(v)) + "</text>";
  }
  let path = "";
  const xAt = function (i) { return padL + (iw * i) / (points.length - 1); };
  points.forEach(function (p, i) {
    path += (i === 0 ? "M" : "L") + xAt(i).toFixed(1) + "," + yAt(p.y).toFixed(1) + " ";
  });
  g += '<path d="' + path + '" fill="none" stroke="' + (opts.color || JBN.vermilion) + '" stroke-width="3" stroke-linejoin="round"/>';
  points.forEach(function (p, i) {
    const cx = xAt(i), cy = yAt(p.y);
    g += '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="4.5" fill="#fff" stroke="' + (opts.color || JBN.vermilion) + '" stroke-width="2.5" data-tip="' + esc(p.x + ": " + fmt(p.y)) + '"><title>' + esc(p.x + ": " + fmt(p.y)) + "</title></circle>";
    if (i % 2 === 0 || i === points.length - 1) {
      g += '<text x="' + cx.toFixed(1) + '" y="' + (h - 10) + '" text-anchor="middle" class="axis-label">' + esc(p.x) + "</text>";
    }
  });
  return '<svg viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="' + esc(opts.label || "line chart") + '">' + g + "</svg>";
}

/* Vertical bar chart: items is [{label, value}], value shown with fmt. */
function barChart(items, opts) {
  const w = opts.width || 720, h = opts.height || 300;
  const padL = 52, padR = 12, padT = 14, padB = 34;
  const iw = w - padL - padR, ih = h - padT - padB;
  const vals = items.map(function (d) { return d.value; });
  let lo = Math.min.apply(null, vals.concat([0]));
  let hi = Math.max.apply(null, vals.concat([0]));
  if (hi === lo) hi = lo + 1;
  const steps = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
  let step = steps[steps.length - 1];
  for (const s of steps) { if ((hi - lo) / s <= 4) { step = s; break; } }
  lo = Math.floor(lo / step) * step;
  hi = Math.ceil(hi / step) * step;
  const span = hi - lo;
  const yAt = function (v) { return padT + ih - ((v - lo) / span) * ih; };
  const zeroY = yAt(0);
  const slot = iw / items.length, bw = Math.min(slot * 0.62, 52);
  const fmt = opts.fmt || function (v) { return String(v); };
  let g = "";
  for (let v = lo; v <= hi + step / 2; v += step) {
    const y = yAt(v);
    g += '<line x1="' + padL + '" y1="' + y.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + y.toFixed(1) + '" stroke="' + JBN.grid + '"/>';
    g += '<text x="' + (padL - 8) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end" class="axis-label">' + esc(fmt(v)) + "</text>";
  }
  g += '<line x1="' + padL + '" y1="' + zeroY.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + zeroY.toFixed(1) + '" stroke="#c9c9da"/>';
  items.forEach(function (d, i) {
    const yv = yAt(d.value);
    const top = Math.min(zeroY, yv), bh = Math.abs(zeroY - yv);
    const x = padL + slot * i + (slot - bw) / 2;
    const color = d.color || (d.value < 0 ? JBN.vermilion : (opts.color || JBN.indigoLight));
    g += '<rect x="' + x.toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + Math.max(bh, 1).toFixed(1) + '" rx="3" fill="' + color + '" data-tip="' + esc(d.label + ": " + fmt(d.value)) + '"><title>' + esc(d.label + ": " + fmt(d.value)) + "</title></rect>";
    g += '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (h - 10) + '" text-anchor="middle" class="axis-label">' + esc(d.label) + "</text>";
  });
  return '<svg viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="' + esc(opts.label || "bar chart") + '">' + g + "</svg>";
}

/* Horizontal bar chart: good for ranked lists such as prefectures. */
function hbarChart(items, opts) {
  const w = opts.width || 720, rowH = opts.rowH || 30;
  const h = rowH * items.length + 16;
  const padL = opts.padL || 92, padR = 64, padT = 6;
  const iw = w - padL - padR;
  const max = Math.max.apply(null, items.map(function (d) { return d.value; })) || 1;
  const fmt = opts.fmt || function (v) { return String(v); };
  let g = "";
  items.forEach(function (d, i) {
    const y = padT + rowH * i + 5;
    const bw = (iw * d.value) / max;
    const color = d.color || (opts.color || JBN.indigoLight);
    g += '<text x="' + (padL - 8) + '" y="' + (y + 14) + '" text-anchor="end" class="axis-label name-label">' + esc(d.label) + "</text>";
    g += '<rect x="' + padL + '" y="' + y + '" width="' + Math.max(bw, 2).toFixed(1) + '" height="18" rx="3" fill="' + color + '" data-tip="' + esc(d.label + ": " + fmt(d.value)) + '"><title>' + esc(d.label + ": " + fmt(d.value)) + "</title></rect>";
    g += '<text x="' + (padL + bw + 6).toFixed(1) + '" y="' + (y + 14) + '" class="axis-label value-label">' + esc(fmt(d.value)) + "</text>";
  });
  return '<svg viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="' + esc(opts.label || "horizontal bar chart") + '">' + g + "</svg>";
}

/* Population pyramid: cohorts is [{cohort, male, female}] in thousands.
   Men to the left (indigo), women to the right (vermilion), with a centre
   gap that holds the cohort labels. Clicking a cohort row highlights it
   and shows its numbers in the readout below. */
function pyramidChart(cohorts, opts) {
  const w = opts.width || 720, rowH = opts.rowH || 26;
  const h = rowH * cohorts.length + 34;
  const mid = w / 2, padT = 24;
  const gap = 64;
  const max = Math.max.apply(null, cohorts.map(function (c) { return Math.max(c.male, c.female); }));
  const avail = mid - 40 - gap / 2;
  let g = "";
  g += '<text x="' + (mid - gap / 2 - avail / 2).toFixed(0) + '" y="16" text-anchor="middle" class="pyr-head">Male</text>';
  g += '<text x="' + (mid + gap / 2 + avail / 2).toFixed(0) + '" y="16" text-anchor="middle" class="pyr-head">Female</text>';
  cohorts.forEach(function (c, i) {
    const y = padT + rowH * i + 2;
    const mw = (avail * c.male) / max, fw = (avail * c.female) / max;
    const tip = c.cohort + " years — men " + (c.male / 1000).toFixed(2) + "M, women " + (c.female / 1000).toFixed(2) + "M";
    const attrs = 'data-cohort="' + i + '" data-label="' + esc(c.cohort) + '" data-m="' + c.male + '" data-f="' + c.female + '"';
    g += '<rect class="pyr-bar" ' + attrs + ' x="' + (mid - gap / 2 - mw).toFixed(1) + '" y="' + y + '" width="' + mw.toFixed(1) + '" height="20" fill="' + JBN.indigoLight + '" data-tip="' + esc(tip) + '"><title>' + esc(tip) + "</title></rect>";
    g += '<rect class="pyr-bar" ' + attrs + ' x="' + (mid + gap / 2).toFixed(1) + '" y="' + y + '" width="' + fw.toFixed(1) + '" height="20" fill="' + JBN.vermilion + '" data-tip="' + esc(tip) + '"><title>' + esc(tip) + "</title></rect>";
    g += '<text x="' + mid + '" y="' + (y + 14) + '" text-anchor="middle" class="pyr-cohort">' + esc(c.cohort) + "</text>";
  });
  return '<svg viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="Population pyramid of Japan, 2024">' + g + "</svg>";
}

/* Wire pyramid clicks: highlight the row and fill the readout line.
   Reads the numbers from the bars' own data attributes, so it works for
   the full 5-year pyramid and the compact 10-year one alike. */
function wirePyramid(root) {
  const out = root.querySelector(".pyr-readout");
  if (!out) return;
  root.querySelectorAll(".pyr-bar").forEach(function (bar) {
    bar.addEventListener("click", function () {
      const m = Number(bar.getAttribute("data-m")), f = Number(bar.getAttribute("data-f"));
      const label = bar.getAttribute("data-label");
      root.querySelectorAll(".pyr-bar").forEach(function (b) { b.classList.remove("pyr-active"); });
      root.querySelectorAll('[data-cohort="' + bar.getAttribute("data-cohort") + '"]').forEach(function (b) { b.classList.add("pyr-active"); });
      out.textContent = "Ages " + label + ": " + ((m + f) / 1000).toFixed(2) + " million people — " +
        (m / 1000).toFixed(2) + "M men, " + (f / 1000).toFixed(2) + "M women (2024).";
    });
  });
}
