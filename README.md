# japan-by-numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/verad-xe/japan-by-numbers/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/verad-xe/japan-by-numbers/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Japan by Numbers — a national statistics site for Japan: an interactive population pyramid, GDP and labour trends, and all 47 prefectures, with the source and year on every figure.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080/ in a browser. The site is static files under `app/` — no build step, no network requests, no external assets.

## Pages

- `#/` — home: key indicators, the 2024 population pyramid, GDP trend, largest prefectures
- `#/population` — pyramid detail, ageing indicators, population trend 2015–2024
- `#/economy` — GDP (US dollars or yen), real growth, unemployment, inflation, trade
- `#/prefectures` — all 47 prefectures: searchable, sortable table and detail panel
- `#/sources` — methodology and every data source with its year

Data: Statistics Bureau of Japan, Ministry of Health, Labour and Welfare, IMF World Economic Outlook, Cabinet Office, Ministry of Finance, Geospatial Information Authority of Japan. Figures are rounded to the level the source supports.

---

Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards
