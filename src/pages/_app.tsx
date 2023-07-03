import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Router, { useRouter } from 'next/router'
import NextApp from 'next/app'
import Head from 'next/head'
import { EuiErrorBoundary } from '@elastic/eui'
import { Global } from '@emotion/react'
import Chrome from '../components/chrome'
import { Theme } from '../components/theme'
import { globalStyles } from '../styles/global.styles'

import Hooks from '@omkar111111/utils/hooks'
import Analytics from '../utils/analytics'
import '../../public/css/dark.css';

// import '../../public/css/tailwind.css';


/**
 * Next.js uses the App component to initialize pages. You can override it
 * and control the page initialization. Here use use it to render the
 * `Chrome` component on each page, and apply an error boundary.
 *
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */

const EuiApp = ({ Component, pageProps }) => {
  const router = useRouter()

  Hooks.useDidMount(() => {
    const handleRouteChange = (url) => {
      // if (pageProps.is_authenticated) {
      //   // Analytics.trackVisit()
      // }
    }

    router.events.on('routeChangeComplete', handleRouteChange)


    // Analytics.trackVisit()
    // Analytics.trackExceptions()
    // Analytics.trackTimeSpent()

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  })

  return (
    <>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5QFML2CFEJ"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5QFML2CFEJ', {
              page_path: window.location.pathname,
              });
          `,
          }}
        />
      </Head>
      <Global styles={globalStyles} />
      <Theme>
        <Chrome>
          <EuiErrorBoundary>
            <Component {...pageProps} />
          </EuiErrorBoundary>
        </Chrome>
      </Theme>
    </>
  )
}

EuiApp.getInitialProps = async props => {
  const {
    ctx,
    Component: { getInitialProps },
  } = props

  const appProps = await NextApp.getInitialProps(props)

  const componentPageProps = getInitialProps
    ? await getInitialProps(ctx)
    : {}

  const result = {
    ...appProps,
    pageProps: {
      ...componentPageProps,
    },
  }

  return result
}

export default EuiApp