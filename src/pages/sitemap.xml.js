import Config from '../utils/config';
import tools from '../utils/data/tools'


function generateSiteMap(posts) {
    const links = [...tools]

  return `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${
        links.map(
          url => `
      <url>
          <loc>https://${Config.DOMAIN_NAME}/devtools${url.path}</loc>
      </url>
    `)
        .join('')}
</urlset> 
  `.trim();
}

function SiteMap() {}

export async function getServerSideProps({ res }) {

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap([]);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
