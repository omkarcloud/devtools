import Seo from '../../components/Seo'
import { useEffect, useState } from 'react'
import UnAuthedLanding from '../../layouts/UnAuthedLanding'
import { H1Text } from '../../components/H1Text'
import AuthedDashboard from '../../layouts/AuthedDashboard'

import TextAreaField from '../../components/inputs/TextAreaField'
import { EuiCard, EuiFormRow } from '@elastic/eui'
import Select from '../../components/inputs/Select'
import he from 'he'
import { OutputTextAreaField } from '../../components/inputs/outputs'
import ToolsDashboard from '../../layouts/ToolsDashboard'

const Content = () => {

    const [mode, setMode] =useState( 'encode')

    const [state, setstate] = useState({
        input: '',
        textOutput: ''
    })

    const { input } = state
    let output
    if (mode === 'encode') output = he.encode(input)
    else output = he.decode(input)


    function onChange(change) {
        setstate(prev => ({ ...prev, ...change }))
    }

    return (
        <>
            <H1Text className='py-8' content="HTML Encoder and Decoder" />
            <div className="page-card-wrapper px-8">
                <div className='space-y-8'>
                    <EuiCard title="Input" className=''>
                        <EuiFormRow label="Conversion Method" fullWidth>
                            <Select
                                options={[
                                    {
                                        id: 'encode',
                                        value: 'Encode',
                                    },
                                    {
                                        id: 'decode',
                                        value: 'Decode',
                                    }]}
                                value={mode}
                                onChange={mode => {
                                    return setMode(mode)
                                }}
                            />
                        </EuiFormRow>
                        <EuiFormRow label="Input" fullWidth>
                            <TextAreaField value={state.input} onChange={(value) => onChange({ input: value })} rows={6} />
                        </EuiFormRow>
                    </EuiCard>
                    <EuiCard title="Output" >
                        <EuiFormRow label="Output" fullWidth>
                            <OutputTextAreaField value={output} />
                        </EuiFormRow>

                    </EuiCard>
                </div>
            </div>
        </>
    )
}

const Page = () => {
    const Component = ToolsDashboard
    return (
        <>
            <Seo hasChat title="HTML Encoder and Decoder" description='Our HTML Encoder and Decoder helps you in encoding or decoding HTML' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
