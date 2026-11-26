/* Japan by Numbers — statistics data.
   Every figure is a rounded value from the named official source and year.
   Cohort figures are rounded to the nearest 10,000 from the Statistics
   Bureau's 2024 population estimates; prefecture populations are rounded
   to the nearest 100,000. See the Sources page for the full list. */
"use strict";

const JBN_DATA = {
  meta: {
    country: "Japan",
    countryJp: "日本",
    updated: "26 November 2026",
    headlineYear: 2024,
    note: "Figures are rounded. Every figure names its source and year on the page where it appears."
  },

  keyIndicators: [
    { id: "population", label: "Population", value: "124.3M", detail: "1 October 2024 estimate", source: "Statistics Bureau of Japan, Population Estimates", year: 2024 },
    { id: "gdp", label: "Nominal GDP", value: "$4.0T", detail: "about ¥609 trillion", source: "IMF, World Economic Outlook", year: 2024 },
    { id: "unemployment", label: "Unemployment rate", value: "2.5%", detail: "annual average", source: "Statistics Bureau, Labour Force Survey", year: 2024 },
    { id: "inflation", label: "Consumer inflation", value: "2.7%", detail: "CPI, year on year", source: "Statistics Bureau, Consumer Price Index", year: 2024 },
    { id: "life", label: "Life expectancy", value: "84 years", detail: "men 81, women 87", source: "Ministry of Health, Labour and Welfare, life tables", year: 2023 },
    { id: "fertility", label: "Total fertility rate", value: "1.20", detail: "children per woman", source: "Ministry of Health, Labour and Welfare, Vital Statistics", year: 2023 }
  ],

  /* Population by 5-year age cohort, thousands of people, 2024.
     Male and female counts are rounded to the nearest 10,000. */
  pyramid: [
    { cohort: "0–4",   male: 2010, female: 1920 },
    { cohort: "5–9",   male: 2380, female: 2270 },
    { cohort: "10–14", male: 2660, female: 2540 },
    { cohort: "15–19", male: 2840, female: 2710 },
    { cohort: "20–24", male: 3150, female: 3000 },
    { cohort: "25–29", male: 3330, female: 3170 },
    { cohort: "30–34", male: 3580, female: 3420 },
    { cohort: "35–39", male: 3930, female: 3770 },
    { cohort: "40–44", male: 4210, female: 4040 },
    { cohort: "45–49", male: 4540, female: 4360 },
    { cohort: "50–54", male: 4450, female: 4300 },
    { cohort: "55–59", male: 3980, female: 3880 },
    { cohort: "60–64", male: 3620, female: 3630 },
    { cohort: "65–69", male: 3670, female: 3880 },
    { cohort: "70–74", male: 4200, female: 4600 },
    { cohort: "75–79", male: 3570, female: 4280 },
    { cohort: "80–84", male: 2480, female: 3380 },
    { cohort: "85–89", male: 1390, female: 2380 },
    { cohort: "90+",   male: 700,  female: 2060 }
  ],

  populationTrend: [
    { year: 2015, pop: 127.1 }, { year: 2016, pop: 126.9 },
    { year: 2017, pop: 126.7 }, { year: 2018, pop: 126.4 },
    { year: 2019, pop: 126.2 }, { year: 2020, pop: 126.1 },
    { year: 2021, pop: 125.5 }, { year: 2022, pop: 124.9 },
    { year: 2023, pop: 124.6 }, { year: 2024, pop: 124.3 }
  ],

  ageing: [
    { label: "Aged 65 and over", value: "29.4%", detail: "about 36.6 million people", source: "Statistics Bureau, Population Estimates", year: 2024 },
    { label: "Aged 75 and over", value: "16.8%", detail: "about 20.9 million people", source: "Statistics Bureau, Population Estimates", year: 2024 },
    { label: "Aged under 15", value: "11.1%", detail: "about 13.8 million people", source: "Statistics Bureau, Population Estimates", year: 2024 },
    { label: "Median age", value: "49 years", detail: "one of the highest in the world", source: "Statistics Bureau, Population Estimates", year: 2024 },
    { label: "Old-age dependency", value: "50 per 100", detail: "people 65+ per 100 people aged 15–64", source: "Statistics Bureau, Population Estimates", year: 2024 },
    { label: "Births minus deaths", value: "−860,000", detail: "about 720,000 births, 1.58 million deaths", source: "MHLW, Vital Statistics (monthly report)", year: 2023 }
  ],

  /* Nominal GDP, IMF World Economic Outlook, rounded. */
  gdp: [
    { year: 2015, usd: 4.44, yen: 531 }, { year: 2016, usd: 5.00, yen: 535 },
    { year: 2017, usd: 4.93, yen: 546 }, { year: 2018, usd: 5.04, yen: 557 },
    { year: 2019, usd: 5.15, yen: 562 }, { year: 2020, usd: 5.06, yen: 539 },
    { year: 2021, usd: 5.02, yen: 551 }, { year: 2022, usd: 4.26, yen: 558 },
    { year: 2023, usd: 4.23, yen: 592 }, { year: 2024, usd: 4.03, yen: 609 }
  ],

  realGrowth: [
    { year: 2015, v: 1.6 }, { year: 2016, v: 0.8 }, { year: 2017, v: 1.7 },
    { year: 2018, v: 0.6 }, { year: 2019, v: -0.4 }, { year: 2020, v: -4.2 },
    { year: 2021, v: 2.7 }, { year: 2022, v: 0.9 }, { year: 2023, v: 1.5 },
    { year: 2024, v: -0.1 }
  ],

  unemployment: [
    { year: 2015, v: 3.4 }, { year: 2016, v: 3.1 }, { year: 2017, v: 2.8 },
    { year: 2018, v: 2.4 }, { year: 2019, v: 2.4 }, { year: 2020, v: 2.8 },
    { year: 2021, v: 2.8 }, { year: 2022, v: 2.6 }, { year: 2023, v: 2.6 },
    { year: 2024, v: 2.5 }
  ],

  cpi: [
    { year: 2015, v: 0.8 }, { year: 2016, v: -0.1 }, { year: 2017, v: 0.5 },
    { year: 2018, v: 1.0 }, { year: 2019, v: 0.5 }, { year: 2020, v: 0.0 },
    { year: 2021, v: -0.2 }, { year: 2022, v: 2.5 }, { year: 2023, v: 3.3 },
    { year: 2024, v: 2.7 }
  ],

  trade: [
    { label: "Exports", value: "¥107 trillion", detail: "goods, customs basis", source: "Ministry of Finance, Trade Statistics", year: 2024 },
    { label: "Imports", value: "¥112 trillion", detail: "goods, customs basis", source: "Ministry of Finance, Trade Statistics", year: 2024 },
    { label: "Trade balance", value: "−¥5.3 trillion", detail: "fourth straight annual deficit", source: "Ministry of Finance, Trade Statistics", year: 2024 },
    { label: "Government debt", value: "≈255% of GDP", detail: "general government gross debt", source: "IMF, World Economic Outlook", year: 2024 },
    { label: "Exports to the United States", value: "≈20%", detail: "largest single export market", source: "Ministry of Finance, Trade Statistics", year: 2024 },
    { label: "Exports to China", value: "≈18%", detail: "second-largest export market", source: "Ministry of Finance, Trade Statistics", year: 2024 }
  ],

  /* All 47 prefectures. popM is population in millions, rounded to 0.1M
     from the Statistics Bureau's 2024 estimates. areaKm2 is land area. */
  prefectures: [
    { name: "Hokkaido", jp: "北海道", capital: "Sapporo", region: "Hokkaido", popM: 5.1, areaKm2: 83424 },
    { name: "Aomori", jp: "青森県", capital: "Aomori", region: "Tohoku", popM: 1.2, areaKm2: 9646 },
    { name: "Iwate", jp: "岩手県", capital: "Morioka", region: "Tohoku", popM: 1.2, areaKm2: 15275 },
    { name: "Miyagi", jp: "宮城県", capital: "Sendai", region: "Tohoku", popM: 2.3, areaKm2: 7282 },
    { name: "Akita", jp: "秋田県", capital: "Akita", region: "Tohoku", popM: 0.9, areaKm2: 11638 },
    { name: "Yamagata", jp: "山形県", capital: "Yamagata", region: "Tohoku", popM: 1.0, areaKm2: 9323 },
    { name: "Fukushima", jp: "福島県", capital: "Fukushima", region: "Tohoku", popM: 1.7, areaKm2: 13784 },
    { name: "Ibaraki", jp: "茨城県", capital: "Mito", region: "Kanto", popM: 2.8, areaKm2: 6097 },
    { name: "Tochigi", jp: "栃木県", capital: "Utsunomiya", region: "Kanto", popM: 1.9, areaKm2: 6408 },
    { name: "Gunma", jp: "群馬県", capital: "Maebashi", region: "Kanto", popM: 1.9, areaKm2: 6362 },
    { name: "Saitama", jp: "埼玉県", capital: "Saitama", region: "Kanto", popM: 7.3, areaKm2: 3798 },
    { name: "Chiba", jp: "千葉県", capital: "Chiba", region: "Kanto", popM: 6.3, areaKm2: 5158 },
    { name: "Tokyo", jp: "東京都", capital: "Tokyo", region: "Kanto", popM: 14.1, areaKm2: 2194 },
    { name: "Kanagawa", jp: "神奈川県", capital: "Yokohama", region: "Kanto", popM: 9.2, areaKm2: 2416 },
    { name: "Niigata", jp: "新潟県", capital: "Niigata", region: "Chubu", popM: 2.1, areaKm2: 12584 },
    { name: "Toyama", jp: "富山県", capital: "Toyama", region: "Chubu", popM: 1.0, areaKm2: 4248 },
    { name: "Ishikawa", jp: "石川県", capital: "Kanazawa", region: "Chubu", popM: 1.1, areaKm2: 4186 },
    { name: "Fukui", jp: "福井県", capital: "Fukui", region: "Chubu", popM: 0.7, areaKm2: 4191 },
    { name: "Yamanashi", jp: "山梨県", capital: "Kofu", region: "Chubu", popM: 0.8, areaKm2: 4465 },
    { name: "Nagano", jp: "長野県", capital: "Nagano", region: "Chubu", popM: 2.0, areaKm2: 13562 },
    { name: "Gifu", jp: "岐阜県", capital: "Gifu", region: "Chubu", popM: 1.9, areaKm2: 10621 },
    { name: "Shizuoka", jp: "静岡県", capital: "Shizuoka", region: "Chubu", popM: 3.5, areaKm2: 7777 },
    { name: "Aichi", jp: "愛知県", capital: "Nagoya", region: "Chubu", popM: 7.5, areaKm2: 5172 },
    { name: "Mie", jp: "三重県", capital: "Tsu", region: "Kansai", popM: 1.7, areaKm2: 5774 },
    { name: "Shiga", jp: "滋賀県", capital: "Otsu", region: "Kansai", popM: 1.4, areaKm2: 4017 },
    { name: "Kyoto", jp: "京都府", capital: "Kyoto", region: "Kansai", popM: 2.5, areaKm2: 4612 },
    { name: "Osaka", jp: "大阪府", capital: "Osaka", region: "Kansai", popM: 8.8, areaKm2: 1905 },
    { name: "Hyogo", jp: "兵庫県", capital: "Kobe", region: "Kansai", popM: 5.4, areaKm2: 8401 },
    { name: "Nara", jp: "奈良県", capital: "Nara", region: "Kansai", popM: 1.3, areaKm2: 3691 },
    { name: "Wakayama", jp: "和歌山県", capital: "Wakayama", region: "Kansai", popM: 0.9, areaKm2: 4725 },
    { name: "Tottori", jp: "鳥取県", capital: "Tottori", region: "Chugoku", popM: 0.5, areaKm2: 3507 },
    { name: "Shimane", jp: "島根県", capital: "Matsue", region: "Chugoku", popM: 0.6, areaKm2: 6708 },
    { name: "Okayama", jp: "岡山県", capital: "Okayama", region: "Chugoku", popM: 1.8, areaKm2: 7114 },
    { name: "Hiroshima", jp: "広島県", capital: "Hiroshima", region: "Chugoku", popM: 2.7, areaKm2: 8479 },
    { name: "Yamaguchi", jp: "山口県", capital: "Yamaguchi", region: "Chugoku", popM: 1.3, areaKm2: 6112 },
    { name: "Tokushima", jp: "徳島県", capital: "Tokushima", region: "Shikoku", popM: 0.7, areaKm2: 4147 },
    { name: "Kagawa", jp: "香川県", capital: "Takamatsu", region: "Shikoku", popM: 0.9, areaKm2: 1877 },
    { name: "Ehime", jp: "愛媛県", capital: "Matsuyama", region: "Shikoku", popM: 1.3, areaKm2: 5676 },
    { name: "Kochi", jp: "高知県", capital: "Kochi", region: "Shikoku", popM: 0.7, areaKm2: 7104 },
    { name: "Fukuoka", jp: "福岡県", capital: "Fukuoka", region: "Kyushu", popM: 5.1, areaKm2: 4986 },
    { name: "Saga", jp: "佐賀県", capital: "Saga", region: "Kyushu", popM: 0.8, areaKm2: 2440 },
    { name: "Nagasaki", jp: "長崎県", capital: "Nagasaki", region: "Kyushu", popM: 1.3, areaKm2: 4132 },
    { name: "Kumamoto", jp: "熊本県", capital: "Kumamoto", region: "Kyushu", popM: 1.7, areaKm2: 7409 },
    { name: "Oita", jp: "大分県", capital: "Oita", region: "Kyushu", popM: 1.1, areaKm2: 6341 },
    { name: "Miyazaki", jp: "宮崎県", capital: "Miyazaki", region: "Kyushu", popM: 1.0, areaKm2: 7735 },
    { name: "Kagoshima", jp: "鹿児島県", capital: "Kagoshima", region: "Kyushu", popM: 1.5, areaKm2: 9187 },
    { name: "Okinawa", jp: "沖縄県", capital: "Naha", region: "Kyushu", popM: 1.5, areaKm2: 2281 }
  ],

  sources: [
    { name: "Statistics Bureau of Japan — Population Estimates", what: "Total population, age structure, prefecture populations", year: 2024, note: "Estimates as of 1 October 2024; figures here are rounded." },
    { name: "Statistics Bureau of Japan — Labour Force Survey", what: "Unemployment rate", year: 2024, note: "Annual average, seasonally adjusted." },
    { name: "Statistics Bureau of Japan — Consumer Price Index", what: "Consumer inflation", year: 2024, note: "All-items CPI, year-on-year change." },
    { name: "Ministry of Health, Labour and Welfare — Vital Statistics", what: "Births, deaths, total fertility rate", year: 2023, note: "Final annual figures." },
    { name: "Ministry of Health, Labour and Welfare — Abridged Life Tables", what: "Life expectancy at birth", year: 2023, note: "Men 81.09 years, women 87.14 years." },
    { name: "IMF — World Economic Outlook", what: "Nominal GDP in US dollars and yen, government debt", year: 2024, note: "October 2024 database; figures rounded." },
    { name: "Cabinet Office — National Accounts", what: "Real GDP growth", year: 2024, note: "Calendar-year growth, second preliminary estimates." },
    { name: "Ministry of Finance — Trade Statistics of Japan", what: "Exports, imports, trade balance, export markets", year: 2024, note: "Customs-basis goods trade; market shares are approximate." },
    { name: "Geospatial Information Authority of Japan", what: "Prefecture land areas", year: 2024, note: "Areas as published in the national land survey." }
  ]
};
