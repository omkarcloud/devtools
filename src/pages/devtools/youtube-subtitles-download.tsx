import Seo from '../../components/Seo'
import { useState } from 'react'
import {
    EuiButton,
    EuiFieldText,
    EuiForm,
    EuiFormRow,
    EuiSpacer,
    EuiCard,
    EuiText,
} from '@elastic/eui'
import UnAuthedLanding from '../../layouts/UnAuthedLanding'
import { H1Text } from '../../components/H1Text'
import { isEmptyString } from '../../utils/data/validators'
import Api from '../../utils/api'
import Messages from '../../utils/messages'
import { } from '../../utils/data/faq'
import YoutubeDashboard from '../../layouts/YouTubeDashboard'
import useAxios, { useLazyAxios } from '../../utils/axios/use-axios'
import CenteredSpinner from '../../components/CenteredSpinner'

function ContentForm() {
    const [state, setstate] = useState({
        url: ''
    })

    const { isLoading, fetch, data } = useLazyAxios(() => Api.getSubtitles(state.url))

    function onChange(change) {
        setstate(prev => ({ ...prev, ...change }))
    }

    const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false)

    const errors = []

    if (isEmptyString(state.url)) {
        errors.push(Messages.YOUTUBE_VIDEO_URL_INVALID)
    }


    const isInvalid = errors.length > 0

    const handleInputChange = e => {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        const r = {
            [name]: value,
        }
        onChange(r)
    }

    const handleSubmit = event => {
        event.preventDefault()
        setHasSubmittedOnce(true)
        if (!isInvalid) {
            fetch()
        }
    }

    return (
        <>
            <EuiCard title="" className='mt-8 mb-8'>
                <EuiSpacer size="l" />
                <EuiForm
                    isInvalid={hasSubmittedOnce && isInvalid && true}
                    error={hasSubmittedOnce && isInvalid && errors}
                    className=""
                    component="form"
                    onSubmit={handleSubmit}>
                    <EuiFormRow label="YouTube Video URL" fullWidth>
                        <EuiFieldText
                            // placeholder='https://www.youtube.com/watch?v=442ewPgXHQ0'
                            placeholder='https://www.youtube.com/watch?v=kCpZ_evQJNY'
                            name="url"
                            value={state.url}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </EuiFormRow>
                    <EuiButton type="submit" fill>
                        Get Subtitles
                    </EuiButton>
                </EuiForm>
            </EuiCard>
            {
                isLoading ? <CenteredSpinner /> : data ? data['status'] === 0 ? <div className='font-bold text-2xl text-center'>No Subtitles Found</div> :
                    <EuiCard title="" className=''>

                        <div className='space-y-4'>  {data["response"]["formats"].map(({ quality, url }) => {

                            const download = () => {
                                Api.downloadSubtitles(url)
                            }

                            if (!quality) {
                                return <div className='flex items-center justify-center'>
                                    <EuiButton onClick={download} type="submit" fill>
                                        Download Subtitles
                                    </EuiButton>
                                </div>
                            }

                            return <div className='flex items-center justify-between'>
                                <div className='font-bold'>{quality}</div>

                                <EuiButton onClick={() => {
                                    Api.downloadSubtitles(url)
                                }} type="submit" fill>
                                    Download Subtitles
                                </EuiButton>
                            </div>
                        })}</div>
                    </EuiCard>
                    : undefined
            }
        </>
    )
}

const Content = () => {
    return (
        <>
            <div className="page-card-wrapper ">
                <H1Text content="Youtube Subtitles Download" />
                <EuiText className='text-center'>
                    <p>To download Youtube Subtitles, enter Youtube Video URL in the text box.</p>
                </EuiText>
                <ContentForm />
            </div>

        </>
    )
}

const Page = ({ is_authenticated }) => {
    const Component =YoutubeDashboard
    return (
        <>
            <Seo hasChat title="Youtube Subtitles Download" description='With this tool you can download the Youtube Subtitles.' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
