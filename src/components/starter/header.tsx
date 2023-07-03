import Image from 'next/image'
import Link from 'next/link'
import {
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiFlexItem,
  EuiListGroup,
  EuiHeader,
  EuiHeaderSectionItemButton,
  EuiTitle,
  useEuiTheme,
  useGeneratedHtmlId,
  EuiIcon,
  EuiListGroupItem,
} from '@elastic/eui'
import { imageLoader } from '../../lib/loader'
import { headerStyles } from './header.styles'
// @ts-ignore
import Logo from '../../../public/images/logo-eui.svg'
import GiveFeedback from '../Feedback'

import { useState } from 'react'
import tools from '../../utils/data/tools'
function HeaderLogo({ white = false }) {
  const { euiTheme } = useEuiTheme()

  const styles = headerStyles(euiTheme)

  return (
    <Link className="" key="logo-eui" href="/" passHref>
      <a css={styles.logo}>
        <Image width={24} height={24} src={Logo} alt="" loader={imageLoader} />
        <EuiTitle size="xxs" css={styles.title}>
          <span style={white ? { color: '#ffffff' } : undefined}>ओमकार</span>
        </EuiTitle>
      </a>
    </Link>
  )
}





export const ToolsHeader = () => {
  const guideHeaderCollapsibleNavId = useGeneratedHtmlId({
    prefix: 'guideHeaderCollapsibleNav',
  })
  const [navIsOpen, setNavIsOpen] = useState(false)

  const collapsibleNav = (
    <EuiCollapsibleNav
      id={guideHeaderCollapsibleNavId}
      aria-label="Main navigation"
      isOpen={navIsOpen}
      isDocked={true}
      button={
        <EuiHeaderSectionItemButton
          aria-label="Toggle main navigation"
          onClick={() => setNavIsOpen(!navIsOpen)}>
          <EuiIcon type={'menu'} size="m" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}>
      <EuiFlexItem className="eui-yScroll">
        <EuiCollapsibleNavGroup className="h-full child-h-full" background="none">
          <EuiListGroup
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s">
            {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(x => {
              return (
                <Link  key={x} href={tools[x].path} passHref>
                  <EuiListGroupItem className="font-bold" label={tools[x].title} />
                </Link>
              )
            })}
          </EuiListGroup>
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
    </EuiCollapsibleNav>
  )

  return (
    <>
      <EuiHeader
        role='navigation'
        position="fixed"
        theme="dark"
        sections={[
          {
            items: [
              collapsibleNav,
              <div className="w-6" />,
              <HeaderLogo white />,
            ],
            borders: 'none',
          },
          {
            items: [
              <GiveFeedback key="feedback" />
            ],
            borders: 'none',
          },
        ]}
      />
    </>
  )
}

