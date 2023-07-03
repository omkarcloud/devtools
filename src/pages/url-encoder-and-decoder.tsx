import Seo from '../components/Seo'
import {  useState } from 'react'

import { H1Text } from '../components/H1Text'


import TextAreaField from '../components/inputs/TextAreaField'
import { EuiCard, EuiFormRow } from '@elastic/eui'
import Select from '../components/inputs/Select'
import { OutputTextAreaField } from '../components/inputs/outputs'
import ToolsDashboard from '../layouts/ToolsDashboard'

const Content = () => {

	const [mode, setMode] = useState('encode')

    const [state, setstate] = useState({
        input: '',
        textOutput: ''
    })

    const { input } = state
	let output = (() => {
		try {
			if (mode === 'encode') return encodeURIComponent(input)
			if (mode === 'decode') return decodeURIComponent(input)
		} catch (e) {
			return ''
		}
	})()

    function onChange(change) {
        setstate(prev => ({ ...prev, ...change }))
    }

    return (
        <>
            <H1Text className='py-8' content="URL Encoder and Decoder" />
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
            <Seo hasChat title="URL Encoder and Decoder" description='Our URL Encoder and Decoder helps you in encoding or decoding URLs' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
