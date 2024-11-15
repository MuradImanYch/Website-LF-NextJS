const fs = require('fs');

const config = require('../../public/conf.json');

const urls = [];

config.tournaments.forEach(tournament => {
    const countryPath = tournament.name.en.replace(/\s+/g, '-').toLowerCase();

    // Добавляем ссылки на уровень страны
    urls.push(`/tournament/${countryPath}`);
    urls.push(`/tournament/${countryPath}/news`);
    urls.push(`/en/tournament/${countryPath}`);
    urls.push(`/en/tournament/${countryPath}/news`);

    // Добавляем ссылки на уровне турниров
    tournament.leagues.forEach(league => {
        const leaguePath = league.name.en.toLowerCase().replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '');

        urls.push(`/tournament/${countryPath}/${leaguePath}`);
        urls.push(`/tournament/${countryPath}/${leaguePath}/news`);
        urls.push(`/tournament/${countryPath}/${leaguePath}/standings`);
        urls.push(`/tournament/${countryPath}/${leaguePath}/results`);
        urls.push(`/tournament/${countryPath}/${leaguePath}/fixtures`);
        urls.push(`/tournament/${countryPath}/${leaguePath}/top-scorers`);

        urls.push(`/en/tournament/${countryPath}/${leaguePath}`);
        urls.push(`/en/tournament/${countryPath}/${leaguePath}/news`);
        urls.push(`/en/tournament/${countryPath}/${leaguePath}/standings`);
        urls.push(`/en/tournament/${countryPath}/${leaguePath}/results`);
        urls.push(`/en/tournament/${countryPath}/${leaguePath}/fixtures`);
        urls.push(`/en/tournament/${countryPath}/${leaguePath}/top-scorers`);
    });
});

// Создаем XML-содержимое
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${config.domain}${url}</loc>
    <lastmod>2024-11-16T16:58:29.000+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

// Записываем в файл
fs.writeFileSync('sitemap-tournaments.xml', sitemapContent, 'utf-8');

console.log('Файл sitemap-tournaments.xml успешно создан!');