import Seo from '../../components/Seo'
import { useEffect, useState } from 'react'
import { H1Text } from '../../components/H1Text'

import { EuiCard, EuiFilePicker, EuiFormRow } from '@elastic/eui'
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

    const [caps, setCaps] = useState(false)

    const [image, setImage] = useState(null)


    const [output, setOutput] = useState(['', '', '', ''])


    useEffect(() => {
        if (image) {
            hash(image, caps).then(setOutput)
        } else {
            setOutput(['', '', '', ''])
        }
    }, [image, caps])


    return (
        <>
            <H1Text className='py-8' content="File Hash Generator" />
            <div className="page-card-wrapper px-8">
                <div className='space-y-8'>
                    <EuiCard title="Input" className=''>
                    <EuiFormRow label="Input" fullWidth>
                            <EuiFilePicker
                                fullWidth
                                id={"filePickerId"}
                                multiple={false}
                                initialPromptText="Upload Image"
                                onChange={(files) => {
                                    const ls = (files.length > 0 ? Array.from(files) : [])
                                    if (files.length > 0) {
                                        ls[0].arrayBuffer().then(b=> setImage(b))
                                    } else {
                                        setImage(null)
                                    }
                                }
                            }
                            />
                        </EuiFormRow>                    </EuiCard>
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
            <Seo hasChat title="File Hash Generator" description='Generate MD5, SHA1, SHA256, SHA512 Hash from File using out Hash Generator' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
