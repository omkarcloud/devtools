import Seo from '../components/Seo'
import { useState } from 'react'
import { H1Text } from '../components/H1Text'

import { EuiCard, EuiFilePicker, EuiFormRow } from '@elastic/eui'
import { handleFileChosen } from './color-blindness-simulator'
import { OutputTextAreaField } from '../components/inputs/outputs'
import ToolsDashboard from '../layouts/ToolsDashboard'



const Content = () => {

    const [output, setOutput] = useState('')


    return (
        <>
            <H1Text className='py-8' content="Base64 File Encoder" />
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
                                        ls[0].arrayBuffer().then(b => {
                                            handleFileChosen(ls[0], 'dataURL',  (blob: string, file: File) => {
                                                const base64String = blob.replace(/^data:.+;base64,/, '');
                                                setOutput(base64String)
                                            })
                                            // base64Encode(b).then(setOutput)
                                        })
                                    } else {
                                        setOutput('')
                                    }
                                }
                                }
                            />
                        </EuiFormRow>                    </EuiCard>
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
            <Seo hasChat title="Base64 File Encoder" description='Encode file to Base64 using our Base64 File Encoder' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
