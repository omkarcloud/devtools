import Seo from '../../components/Seo'
import { useEffect, useState } from 'react'
import { H1Text } from '../../components/H1Text'

import TextAreaField from '../../components/inputs/TextAreaField'
import { EuiCard, EuiFormRow } from '@elastic/eui'
import Select from '../../components/inputs/Select'
import ToolsDashboard from '../../layouts/ToolsDashboard'

const Content = () => {

    const [mode, setMode] = useState( 'encode')
    const [encoding, setEncoding] = useState( 'utf-8')

    const [state, setstate] = useState({
        input: '',
        textOutput: ''
    })

    const { input } = state
    let output = ((): string => {
        try {
            if (mode === 'encode') return btoa(input)
            if (mode === 'decode') return atob(input)
        } catch (e) { }
        return ''
    })()



    function onChange(change) {
        setstate(prev => ({ ...prev, ...change }))
    }

    useEffect(() => {
        onChange({ textOutput: output })
    }, [
        output
    ])

    return (
        <>
            <H1Text className='py-8' content="Base64 Encoder And Decoder" />
            <div className="page-card-wrapper px-8">
                <div className='space-y-8'>
                    <EuiCard title="Input" className=''>
                        <EuiFormRow label="Conversion Method" fullWidth>
                            <Select
                                options={[
                                    {
                                        id: 'encode',
                                        value: 'Encode Text to Base64',
                                    },
                                    {
                                        id: 'decode',
                                        value: 'Decode Base64 to Text',
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

                        <TextAreaField value={state.textOutput} onChange={(value) => onChange({ textOutput: value })} rows={6} />
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
            <Seo hasChat title="Base64 Encoder And Decoder" description='Encode or Decode to base64 using our online tool' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
