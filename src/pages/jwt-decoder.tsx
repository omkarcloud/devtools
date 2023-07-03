import Seo from '../components/Seo'
import { H1Text } from '../components/H1Text'
import { EuiCard, EuiFormRow } from '@elastic/eui'

import TextAreaField from '../components/inputs/TextAreaField'
import { useState } from 'react'
import { OutputTextAreaField } from '../components/inputs/outputs'
import ToolsDashboard from '../layouts/ToolsDashboard'


const parseToken = (input: string) => {
	try {
		return input
			.replaceAll('-', '+')
			.replaceAll('_', '/')
			.split('.')
			.slice(0, 2)
			.map(atob)
			.map((part) => JSON.stringify(JSON.parse(part), null, '\t'))
	} catch (e) {
		return ['', '']
	}
}


const Content = () => {
    
    const [state, setstate] = useState({
        input: '',
        textOutput: ''
    })

    

    const { input } = state


    function onChange(change) {
        setstate(prev => ({ ...prev, ...change }))
    }

    let [header, payload] = parseToken(input)

    return (
        <>
            <H1Text className='py-8' content="JWT Decoder" />
            <div className="page-card-wrapper px-8">
                <div className='space-y-8'>
                    <EuiCard title="Input" className=''>
                        <EuiFormRow label="Input" fullWidth>
                            <TextAreaField
                                rows={4}
                                value={state.input}
                                onChange={(value) => onChange({ input: value })} 
                            />
                        </EuiFormRow>
                    </EuiCard>
                    <EuiCard title="Output" >
                    <EuiFormRow label="Header" fullWidth>
                            <OutputTextAreaField rows={4} value={header}/>
                        </EuiFormRow>
                        <EuiFormRow label="Payload" fullWidth>
                        <OutputTextAreaField  rows={4} value={payload}/>
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
            <Seo hasChat title="JWT Decoder" description='Decode JWT Token to get payload using our JWT Decoder ' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
