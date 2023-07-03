import Seo from '../../components/Seo'
import { useEffect, useState } from 'react'

import { H1Text } from '../../components/H1Text'


import TextAreaField from '../../components/inputs/TextAreaField'
import { EuiCard, EuiFormRow } from '@elastic/eui'
import Select from '../../components/inputs/Select'
import md5 from 'js-md5'
import TextField from '../../components/inputs/TextField'
import ToolsDashboard from '../../layouts/ToolsDashboard'


const toHex = (buffer: ArrayBuffer) =>
    Array.from(new Uint8Array(buffer))
        .map((x) => x.toString(16).padStart(2, '0'))
        .join('')

const toBuf = (input: string) => {
    const enc = new TextEncoder()
    return enc.encode(input).buffer
}

const hash = async (input: ArrayBuffer, caps: boolean): Promise<string[]> => {
    let results = [
        md5(input),
        toHex(await crypto.subtle.digest('SHA-1', input)),
        toHex(await crypto.subtle.digest('SHA-256', input)),
        toHex(await crypto.subtle.digest('SHA-512', input)),
    ]
    if (caps) {
        return results.map((h) => h.toUpperCase())
    }
    return results
}



function OutputTextField({ value: output }) {

    const [state, setstate] = useState({
        textOutput: ''
    })

    function onChange(change) {
        setstate(prev => ({ ...prev, ...change }))
    }

    useEffect(() => {
        onChange({ textOutput: output })
    }, [
        output
    ])
    return <TextField value={state.textOutput} onChange={(textOutput) => { onChange({ textOutput }) }} />

}

const Content = () => {

    const [caps, setCaps] = useState( false)
    const [mode, setMode] = useState( 'encode')
    const [encoding, setEncoding] =useState( 'utf-8')

    const [state, setstate] = useState({
        input: '',
        textOutput: ''
    })

    const { input } = state


    const [output, setOutput] = useState(['', '', '', ''])


    function onChange(change) {
        setstate(prev => ({ ...prev, ...change }))
    }


    useEffect(() => {
        hash(toBuf(input), caps).then(setOutput)
    }, [input, caps])


    useEffect(() => {
        onChange({ textOutput: output })
    }, [
        output
    ])

    return (
        <>
            <H1Text className='py-8' content="Hash Generator" />
            <div className="page-card-wrapper px-8">
                <div className='space-y-8'>
                    <EuiCard title="Input" className=''>
                        <EuiFormRow label="Input" fullWidth>
                            <TextAreaField value={state.input} rows={6} onChange={(value) => onChange({ input: value })} />
                        </EuiFormRow>
                    </EuiCard>
                    <EuiCard title="Output" >
                        <EuiFormRow label="MD5" fullWidth>
                            <OutputTextField value={output[0]} />
                        </EuiFormRow>
                        <EuiFormRow label="SHA1" fullWidth>
                            <OutputTextField value={output[1]} />
                        </EuiFormRow>
                        <EuiFormRow label="SHA256" fullWidth>
                            <OutputTextField value={output[2]} />
                        </EuiFormRow>
                        <EuiFormRow label="SHA512" fullWidth>
                            <OutputTextField value={output[3]} />
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
            <Seo hasChat title="Hash Generator" description='Generate MD5, SHA1, SHA256, SHA512 Hash from Text using out Hash Generator' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
