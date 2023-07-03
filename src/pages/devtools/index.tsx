import Seo from '../../components/Seo'
import { useState } from 'react'
import {
    EuiButton,
    EuiCard,
    EuiText,
    EuiFlexGrid,
    EuiFlexItem,
} from '@elastic/eui'
import UnAuthedLanding from '../../layouts/UnAuthedLanding'
import { H1Text } from '../../components/H1Text'
import { isEmptyString } from '../../utils/data/validators'
import { } from '../../utils/data/faq'
import AuthedDashboard from '../../layouts/AuthedDashboard'
import SearchField from '../../components/inputs/SearchField'
import _ from 'lodash'
import tools from '../../utils/data/tools'
import { isEmpty } from '../../utils/missc'
import { useRouter } from 'next/router'
import { useCustomToolContactUs } from '../../components/modals/useCustomToolContactUs'
import Link from 'next/link'

function filterByTitle(search: string): (value: { id: number; title: string; path: string }, index: number, array: { id: number; title: string; path: string }[]) => unknown {
    return x => {
        if (isEmptyString(search)) {
            return true
        } else {
            return x.title.toUpperCase().includes(search.trim().toUpperCase())
        }
    }
}

const Content = () => {
    const router = useRouter()
    const { query } = router

    const [state, setstate] = useState(() => {
        return ({
            search: isEmpty(query.q) ? '' : query.q.toString(),
        })
    })

    function updateState(change) {
        router.replace({
            query: {
                q: change.search
            }
        }, undefined, { shallow: true })
        setstate(prev => ({ ...prev, ...change }))
    }

    const onChange = (change,) => {
        updateState(change)
    }

    const { search } = state

    const filteredData = tools.filter(
        filterByTitle(search)
    )

    const { modal, showModal } = useCustomToolContactUs()


    return (
        <> {modal}
            <div className="page-card-wrapper-large  ">
                <H1Text content="Tools" />
                <EuiText className='text-center mt-8 mb-8'>
                    <p>Find Tools by searching in text box. You may also suggest custom tool.</p>
                </EuiText>
                <div className='space-y-8'>
                    <SearchField
                        fullWidth
                        placeholder="eg, YouTube 🔎"
                        onApply={search => {
                            return onChange({ search })
                        }}
                        value={search}
                        onChange={search => onChange({ search })}
                    />
                    <EuiFlexGrid columns={3}>
                        {filteredData.map((item) => {
                            return (
                                <EuiFlexItem key={item.id}>
                                    <EuiCard
                                        title={item.title}
                                    >
                                        <div className=' space-y-4'>
                                            {
                                                item.path &&
                                                <Link href={item.path} passHref>
                                                    <EuiButton 
                                                    >
                                                        Use
                                                    </EuiButton>
                                                </Link>
                                            }
                                        </div>

                                    </EuiCard>
                                </EuiFlexItem>
                            )
                        })}
                    </EuiFlexGrid>
                    <EuiText>

                        <EuiCard description="Tell us the Tool you need." title="Did not find the Tool?" className='mt-8'>
                            <EuiButton onClick={() => {
                                showModal()
                            }} fill>
                                Suggest Tool
                            </EuiButton>
                        </EuiCard>
                    </EuiText>
                </div>
            </div>
        </>
    )
}

const Page = ({ is_authenticated }) => {
    const Component = is_authenticated ? AuthedDashboard : UnAuthedLanding

    return (
        <>
            <Seo hasChat title="Tools" description='Find useful tools for simple tasks.' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
