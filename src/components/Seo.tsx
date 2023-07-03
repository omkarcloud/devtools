import Head from 'next/head'

export default function Seo({
  title = 'Omkar DevTools',
  description = '✨ Swiss Army Knife for Developers. Format/Validate JSON, encode/decode Base64, debug JWT… with just one click!. 🚀',
  hasChat = false
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://repository-images.githubusercontent.com/233832487/cddf0ff5-a35f-4380-8912-1c9f365366a8"
      />
      <meta
        property="og:url"
        content="https://www.omkar.cloud/images/twitter-card.png"
      />

            {/* {hasChat ? <script type="text/javascript" id="hs-script-loader" async defer src="https://js-eu1.hs-scripts.com/27067922.js"></script> : undefined} */}

    </Head>
  )
}