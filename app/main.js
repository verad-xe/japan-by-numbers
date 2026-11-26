/* Japan by Numbers — router and page views.
   Hash routes: #/ home, #/population, #/economy, #/prefectures, #/sources.
   Every view is built from JBN_DATA (data.js) and the SVG builders in
   charts.js. No network requests: all data is in the page's own files. */
"use strict";

const D = JBN_DATA;

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstChild;
}

function sourceLine(source, year) {
  return '<p class="src">Source: ' + esc(source) + " · " + year + "</p>";
}

function indicatorCards() {
  return '<div class="cards">' + D.keyIndicators.map(function (k) {
    return '<article class="card stat"><h3>' + esc(k.label) + '</h3><p class="big">' + esc(k.value) +
      '</p><p class="detail">' + esc(k.detail) + "</p>" + sourceLine(k.source, k.year) + "</article>";
  }).join("") + "</div>";
}

/* Merge the 5-year cohorts into 10-year bands for the compact pyramid
   shown on the home page. */
function aggregatePyramid() {
  const bands = [];
  for (let i = 0; i < D.pyramid.length; i += 2) {
    const a = D.pyramid[i], b = D.pyramid[i + 1];
    if (!b) { bands.push({ cohort: a.cohort, male: a.male, female: a.female }); break; }
    const start = a.cohort.split("–")[0];
    const end = b.cohort.indexOf("+") !== -1 ? "+" : b.cohort.split("–")[1];
    bands.push({ cohort: start + "–" + end, male: a.male + b.male, female: a.female + b.female });
  }
  return bands;
}

function pyramidBlock(detail, cohorts, rowH, hint) {
  const total = cohorts.reduce(function (s, c) { return s + c.male + c.female; }, 0);
  return '<section class="panel"><h2>Japan&rsquo;s population pyramid, 2024</h2>' +
    '<p class="lede">One chart tells the story of Japan: a narrow base of children, a bulge of people in their 40s and 70s, and more women than men at every age past 60. Click any row to read its numbers.</p>' +
    '<div class="pyr-wrap">' + pyramidChart(cohorts, { rowH: rowH }) + '</div>' +
    '<p class="pyr-readout">' + esc(hint) + '</p>' +
    '<p class="src">Source: Statistics Bureau of Japan, Population Estimates, 1 October 2024. Cohort figures rounded to the nearest 10,000; they sum to ' +
    (total / 1000).toFixed(1) + ' million.</p>' +
    (detail ? '<p class="lede">The pyramid&rsquo;s shape is why the working-age population keeps shrinking even as life expectancy rises: each new cohort of children is smaller than the one before it.</p>' : '<p><a class="btn" href="#/population">See the full 5-year pyramid →</a></p>') +
    "</section>";
}

function gdpChartBlock(unit) {
  const pts = D.gdp.map(function (g) {
    return { x: String(g.year), y: unit === "yen" ? g.yen : g.usd };
  });
  const fmt = unit === "yen" ? function (v) { return "¥" + v.toFixed(0) + "T"; } : function (v) { return "$" + v.toFixed(2) + "T"; };
  return lineChart(pts, {
    label: "Nominal GDP of Japan, 2015 to 2024",
    color: JBN.vermilion, fmt: fmt
  });
}

function viewHome() {
  const top5 = D.prefectures.slice().sort(function (a, b) { return b.popM - a.popM; }).slice(0, 5);
  return '' +
    '<section class="hero"><p class="kicker">日本 · NATIONAL STATISTICS · 2024</p>' +
    '<h1>Japan by Numbers</h1>' +
    '<p class="lede">Every number Japan publishes about itself, on one site: 124.3 million people, the world&rsquo;s oldest population, and the fourth-largest economy — with the source and year on every figure.</p>' +
    '<p class="hero-links"><a class="btn" href="#/population">Explore the population</a> <a class="btn ghost" href="#/economy">See the economy</a> <a class="btn ghost" href="#/prefectures">All 47 prefectures</a></p></section>' +
    pyramidBlock(false, aggregatePyramid(), 26, "Click a row — for example the 70–79 band, the largest group in Japan's history.") +
    indicatorCards() +
    '<section class="panel"><h2>Nominal GDP, 2015–2024</h2>' +
    '<p class="lede">Japan&rsquo;s economy in dollars shrank as the yen weakened — in yen it grew every year of the decade except 2020. Switch units:</p>' +
    '<div class="toggle" role="group" aria-label="GDP units"><button type="button" class="toggle-btn active" data-gdp-unit="usd">US dollars</button><button type="button" class="toggle-btn" data-gdp-unit="yen">Japanese yen</button></div>' +
    '<div id="gdp-chart">' + gdpChartBlock("usd") + "</div>" +
    sourceLine("IMF, World Economic Outlook", 2024) + "</section>" +
    '<section class="panel"><h2>Where Japan lives</h2>' +
    '<p class="lede">A third of the country lives in three prefectures. The five largest, by population:</p>' +
    hbarChart(top5.map(function (p) { return { label: p.name, value: p.popM }; }), { label: "Five largest prefectures by population", fmt: function (v) { return v.toFixed(1) + "M"; } }) +
    sourceLine("Statistics Bureau of Japan, Population Estimates", 2024) +
    '<p><a class="btn" href="#/prefectures">See all 47 prefectures →</a></p></section>' +
    '<section class="panel"><h2>The ageing story in one line</h2>' +
    '<p class="lede">In 2024, <strong>29.4% of Japan was aged 65 or over</strong> — about 36.6 million people — while only 11.1% were children under 15. The fertility rate fell to 1.20 in 2023, the lowest on record. <a href="#/population">Read the full population story →</a></p></section>';
}

function viewPopulation() {
  const trend = lineChart(D.populationTrend.map(function (p) { return { x: String(p.year), y: p.pop }; }), {
    label: "Population of Japan, 2015 to 2024", color: JBN.indigoLight,
    fmt: function (v) { return v.toFixed(1) + "M"; }
  });
  return '' +
    '<section class="hero slim"><p class="kicker">POPULATION</p><h1>124.3 million people, getting older</h1>' +
    '<p class="lede">Japan&rsquo;s population has fallen every year since 2009. The pyramid below shows why: the base keeps narrowing while the top keeps widening.</p></section>' +
    pyramidBlock(true, D.pyramid, 22, "Click a row — for example the 70–74 band, the largest cohort in Japan's history.") +
    '<section class="panel"><h2>Population, 2015–2024</h2>' + trend +
    sourceLine("Statistics Bureau of Japan, Population Estimates", 2024) + "</section>" +
    '<section class="panel"><h2>Ageing indicators</h2><div class="cards">' +
    D.ageing.map(function (a) {
      return '<article class="card stat"><h3>' + esc(a.label) + '</h3><p class="big">' + esc(a.value) +
        '</p><p class="detail">' + esc(a.detail) + "</p>" + sourceLine(a.source, a.year) + "</article>";
    }).join("") + "</div></section>" +
    '<section class="panel"><h2>What this means</h2>' +
    '<p class="lede">With 50 people aged 65+ for every 100 of working age, pensions and health care dominate public spending, and rural prefectures shrink fastest — the smallest, Tottori, has about 0.5 million people. The prefecture table shows the pattern: <a href="#/prefectures">all 47 prefectures →</a></p></section>';
}

function viewEconomy() {
  const growth = barChart(D.realGrowth.map(function (g) {
    return { label: String(g.year).slice(2), value: g.v, color: g.v < 0 ? JBN.vermilion : JBN.indigoLight };
  }), { label: "Real GDP growth, 2015 to 2024", fmt: function (v) { return v.toFixed(1) + "%"; } });
  const unemp = lineChart(D.unemployment.map(function (u) { return { x: String(u.year), y: u.v }; }), {
    label: "Unemployment rate, 2015 to 2024", color: JBN.teal,
    fmt: function (v) { return v.toFixed(1) + "%"; }
  });
  const cpi = lineChart(D.cpi.map(function (c) { return { x: String(c.year), y: c.v }; }), {
    label: "Consumer price inflation, 2015 to 2024", color: JBN.amber,
    fmt: function (v) { return v.toFixed(1) + "%"; }
  });
  return '' +
    '<section class="hero slim"><p class="kicker">ECONOMY</p><h1>A $4 trillion economy, slowly reflating</h1>' +
    '<p class="lede">After three decades of near-zero inflation, consumer prices rose 2.7% in 2024 while unemployment stayed at 2.5% — one of the lowest rates in the developed world.</p></section>' +
    '<section class="panel"><h2>Nominal GDP, 2015–2024</h2>' +
    '<div class="toggle" role="group" aria-label="GDP units"><button type="button" class="toggle-btn active" data-gdp-unit="usd">US dollars</button><button type="button" class="toggle-btn" data-gdp-unit="yen">Japanese yen</button></div>' +
    '<div id="gdp-chart">' + gdpChartBlock("usd") + "</div>" +
    sourceLine("IMF, World Economic Outlook", 2024) + "</section>" +
    '<section class="panel"><h2>Real GDP growth, % per year</h2>' + growth +
    sourceLine("Cabinet Office, National Accounts", 2024) + "</section>" +
    '<div class="two-col"><section class="panel"><h2>Unemployment, %</h2>' + unemp +
    sourceLine("Statistics Bureau, Labour Force Survey", 2024) + '</section>' +
    '<section class="panel"><h2>Consumer inflation, %</h2>' + cpi +
    sourceLine("Statistics Bureau, Consumer Price Index", 2024) + "</section></div>" +
    '<section class="panel"><h2>Trade and debt</h2><div class="cards">' +
    D.trade.map(function (t) {
      return '<article class="card stat"><h3>' + esc(t.label) + '</h3><p class="big">' + esc(t.value) +
        '</p><p class="detail">' + esc(t.detail) + "</p>" + sourceLine(t.source, t.year) + "</article>";
    }).join("") + "</div></section>";
}

let prefSort = { key: "popM", dir: -1 };
let prefQuery = "";

function density(p) { return (p.popM * 1000000) / p.areaKm2; }

function prefRows(list) {
  return list.map(function (p) {
    return '<tr data-pref="' + esc(p.name) + '"><td><strong>' + esc(p.name) + '</strong> <span class="jp">' + esc(p.jp) + '</span></td>' +
      "<td>" + esc(p.capital) + "</td><td>" + esc(p.region) + "</td>" +
      '<td class="num">' + p.popM.toFixed(1) + '</td><td class="num">' + p.areaKm2.toLocaleString("en-US") + "</td>" +
      '<td class="num">' + Math.round(density(p)).toLocaleString("en-US") + "</td></tr>";
  }).join("");
}

function viewPrefectures() {
  const sorted = D.prefectures.slice().sort(function (a, b) {
    const k = prefSort.key;
    const av = k === "name" ? a.name : k === "density" ? density(a) : a[k];
    const bv = k === "name" ? b.name : k === "density" ? density(b) : b[k];
    if (av < bv) return -1 * prefSort.dir;
    if (av > bv) return 1 * prefSort.dir;
    return 0;
  });
  const filtered = sorted.filter(function (p) {
    const q = prefQuery.trim().toLowerCase();
    if (!q) return true;
    return p.name.toLowerCase().indexOf(q) !== -1 || p.jp.indexOf(q) !== -1 ||
      p.capital.toLowerCase().indexOf(q) !== -1 || p.region.toLowerCase().indexOf(q) !== -1;
  });
  const top10 = D.prefectures.slice().sort(function (a, b) { return b.popM - a.popM; }).slice(0, 10);
  const sortLabel = { name: "Name", popM: "Population", areaKm2: "Area", density: "Density" }[prefSort.key];
  return '' +
    '<section class="hero slim"><p class="kicker">PREFECTURES · 47</p><h1>All 47 prefectures</h1>' +
    '<p class="lede">From Hokkaido&rsquo;s 83,424 km² to Kagawa&rsquo;s 1,877 km², and from Tokyo&rsquo;s 14.1 million people to Tottori&rsquo;s 0.5 million. Search, sort, and click any row for its detail.</p></section>' +
    '<section class="panel"><h2>Ten largest by population</h2>' +
    hbarChart(top10.map(function (p) { return { label: p.name, value: p.popM }; }), { label: "Ten largest prefectures by population", fmt: function (v) { return v.toFixed(1) + "M"; } }) +
    sourceLine("Statistics Bureau of Japan, Population Estimates", 2024) + "</section>" +
    '<section class="panel"><h2>Prefecture table</h2>' +
    '<div class="table-tools"><label>Search <input id="pref-search" type="search" placeholder="Name, capital or region…" value="' + esc(prefQuery) + '" aria-label="Search prefectures"></label>' +
    '<label>Sort by <select id="pref-sort" aria-label="Sort prefectures">' +
    ["name", "popM", "areaKm2", "density"].map(function (k) {
      return '<option value="' + k + '"' + (prefSort.key === k ? " selected" : "") + ">" + sortLabelFor(k) + "</option>";
    }).join("") + "</select></label>" +
    '<span class="count">' + filtered.length + " of 47 shown · sorted by " + sortLabel + "</span></div>" +
    '<div class="table-wrap"><table id="pref-table"><thead><tr>' +
    '<th data-sort="name">Prefecture</th><th>Capital</th><th>Region</th>' +
    '<th data-sort="popM" class="num">Pop. (M)</th><th data-sort="areaKm2" class="num">Area (km²)</th><th data-sort="density" class="num">Density (/km²)</th>' +
    "</tr></thead><tbody>" + prefRows(filtered) + "</tbody></table></div>" +
    '<div id="pref-detail" class="pref-detail" aria-live="polite"><p>Click a row above to see that prefecture&rsquo;s detail.</p></div>' +
    sourceLine("Statistics Bureau, Population Estimates; Geospatial Information Authority of Japan", 2024) + "</section>";
}

function sortLabelFor(k) {
  return { name: "Name", popM: "Population", areaKm2: "Area", density: "Density" }[k];
}

function wirePrefectures(root) {
  const search = root.querySelector("#pref-search");
  const sort = root.querySelector("#pref-sort");
  const detail = root.querySelector("#pref-detail");
  if (search) {
    search.addEventListener("input", function () {
      prefQuery = search.value;
      const pos = search.selectionStart;
      render(false);
      const again = document.querySelector("#pref-search");
      if (again) { again.focus(); again.setSelectionRange(pos, pos); }
    });
  }
  if (sort) {
    sort.addEventListener("change", function () {
      prefSort = { key: sort.value, dir: sort.value === "name" ? 1 : -1 };
      render(false);
    });
  }
  root.querySelectorAll("#pref-table th[data-sort]").forEach(function (th) {
    th.addEventListener("click", function () {
      const k = th.getAttribute("data-sort");
      if (prefSort.key === k) { prefSort.dir *= -1; } else { prefSort = { key: k, dir: k === "name" ? 1 : -1 }; }
      render(false);
    });
  });
  root.querySelectorAll("#pref-table tbody tr").forEach(function (tr) {
    tr.addEventListener("click", function () {
      const p = D.prefectures.find(function (x) { return x.name === tr.getAttribute("data-pref"); });
      if (!p) return;
      root.querySelectorAll("#pref-table tbody tr").forEach(function (r) { r.classList.remove("selected"); });
      tr.classList.add("selected");
      const share = ((p.popM / 124.3) * 100).toFixed(1);
      detail.innerHTML = "<h3>" + esc(p.name) + " <span class='jp'>" + esc(p.jp) + "</span></h3>" +
        "<p><strong>Capital:</strong> " + esc(p.capital) + " · <strong>Region:</strong> " + esc(p.region) + "</p>" +
        "<p><strong>Population:</strong> about " + p.popM.toFixed(1) + " million (" + share + "% of Japan) · " +
        "<strong>Area:</strong> " + p.areaKm2.toLocaleString("en-US") + " km² · " +
        "<strong>Density:</strong> about " + Math.round(density(p)).toLocaleString("en-US") + " people per km².</p>" +
        "<p class='src'>Source: Statistics Bureau, Population Estimates 2024; Geospatial Information Authority of Japan.</p>";
    });
  });
}

function viewSources() {
  return '' +
    '<section class="hero slim"><p class="kicker">METHOD &amp; SOURCES</p><h1>Where every number comes from</h1>' +
    '<p class="lede">Japan by Numbers uses only official statistics. Figures are rounded to the level the source supports — no invented decimals, no estimates dressed up as exact counts.</p></section>' +
    '<section class="panel"><h2>How figures are shown</h2>' +
    "<ul class='method'><li><strong>Rounded, not precise.</strong> Population figures are rounded to the nearest 100,000 and pyramid cohorts to the nearest 10,000, because the underlying estimates do not support more precision.</li>" +
    "<li><strong>Named and dated.</strong> Every figure on the site carries its source and year next to it, and the full list is below.</li>" +
    "<li><strong>Japan only.</strong> This site covers Japan's national statistics. Figures for other countries are not shown.</li>" +
    "<li><strong>Static and offline.</strong> All data lives in this site's own files (data.js). Nothing is fetched from the internet, so the numbers you see are the numbers that were checked.</li></ul></section>" +
    '<section class="panel"><h2>Sources</h2><div class="table-wrap"><table><thead><tr><th>Source</th><th>Used for</th><th>Year</th><th>Note</th></tr></thead><tbody>' +
    D.sources.map(function (s) {
      return "<tr><td><strong>" + esc(s.name) + "</strong></td><td>" + esc(s.what) + "</td><td>" + s.year + "</td><td>" + esc(s.note) + "</td></tr>";
    }).join("") + "</tbody></table></div></section>" +
    '<section class="panel"><h2>About this site</h2>' +
    "<p class='lede'>Japan by Numbers is an original site built for make.fun's “Make the best national statistics site” bounty. Design, text and charts are original; the figures are public official statistics, cited above. Page last updated " + esc(D.meta.updated) + ".</p></section>";
}

const ROUTES = {
  "": viewHome,
  "population": viewPopulation,
  "economy": viewEconomy,
  "prefectures": viewPrefectures,
  "sources": viewSources
};

function route() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const key = hash.split("/")[0];
  return ROUTES[key] ? key : "";
}

function render(scrollTop) {
  const key = route();
  const view = document.getElementById("view");
  view.innerHTML = ROUTES[key]();
  document.querySelectorAll(".nav a").forEach(function (a) {
    a.classList.toggle("active", a.getAttribute("href") === "#/" + key || (key === "" && a.getAttribute("href") === "#/"));
  });
  document.title = "Japan by Numbers" + (key ? " — " + key.charAt(0).toUpperCase() + key.slice(1) : " — Japan's national statistics");
  wireTips(view);
  wirePyramid(view);
  view.querySelectorAll("[data-gdp-unit]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      view.querySelectorAll("[data-gdp-unit]").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      const chart = document.getElementById("gdp-chart");
      if (chart) { chart.innerHTML = gdpChartBlock(btn.getAttribute("data-gdp-unit")); wireTips(chart); }
    });
  });
  if (key === "prefectures") wirePrefectures(view);
  if (scrollTop !== false) window.scrollTo(0, 0);
}

window.addEventListener("hashchange", function () { render(true); });
document.addEventListener("DOMContentLoaded", function () { render(false); });
