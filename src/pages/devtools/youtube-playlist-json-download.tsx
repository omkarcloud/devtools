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
import YoutubeDashboard from '../../layouts/YouTubeDashboard'

function ContentForm() {
    const [state, setstate] = useState({
        url: ''
    })


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
            Api.downloadPlaylistVideosJson(state.url)
        }
    }

    return (
        <EuiForm
            isInvalid={hasSubmittedOnce && isInvalid && true}
            error={hasSubmittedOnce && isInvalid && errors}
            className=""
            component="form"
            onSubmit={handleSubmit}>
            <EuiFormRow label="YouTube Playlist URL" fullWidth>
                <EuiFieldText
                    placeholder='https://www.youtube.com/playlist?list=PL_yo-sbZRQo--ao2Vh6EibYRJ2cu8-6jH'
                    name="url"
                    value={state.url}
                    onChange={handleInputChange}
                    fullWidth
                />
            </EuiFormRow>
            <EuiButton type="submit" fill>
                Download Youtube Playlist Json
            </EuiButton>
        </EuiForm>
    )
}

const Content = () => {
    return (
        <>
            <div className="page-card-wrapper ">
                <H1Text content="Youtube Playlist Json Download" />
                <EuiText className='text-center'>
<p>To download Youtube Playlist as json, enter Playlist URL in the text box.</p>

</EuiText>
                <EuiCard title="" className='mt-8'>
                    <EuiSpacer size="l" />
                    <ContentForm />
                </EuiCard>
            </div>
            
        </>
    )
}

const Page = ({ is_authenticated }) => {
    const Component =YoutubeDashboard

    return (
        <>
            <Seo hasChat title="Youtube Playlist Json Download" description='With this tool you can download the Youtube Playlist as Json File.' />
           
            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page