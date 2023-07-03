import Seo from '../components/Seo'
import { useEffect, useState } from 'react'

import { H1Text } from '../components/H1Text'


import { EuiButton, EuiCard, EuiFormRow } from '@elastic/eui'
import Select from '../components/inputs/Select'
import TextField from '../components/inputs/TextField'
import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5 } from 'uuid'
import Hooks from '@omkar111111/utils/hooks'
import ToolsDashboard from '../layouts/ToolsDashboard'

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

    const [version, setVersion] = useState( '4')
    const [count, setCount] = useState( 1)
    const [namespace, setNS] = useState( '')
    const [name, setName] = useState('')

    const forceupdate = Hooks.useForceUpdate()

    const [state, setstate] = useState({
        input: '',
        textOutput: ''
    })

    let output = ''
    try {
        if (version === '3') {
            output = uuidv3(name, namespace)
        } else if (version === '5') {
            output = uuidv5(name, namespace)
        } else {
            for (var i = 0; i < count; i++) {
                if (version === '1') {
                    output += uuidv1()
                } else if (version === '4') {
                    output += uuidv4()
                }

                if (i < count - 1) output += '\n'
            }
        }
    } catch (e) {
        console.error(e)
    }


    function onChange(change) {
        setstate(prev => ({ ...prev, ...change }))
    }

    // useEffect(() => {
    //     onChange({ textOutput: output })
    // }, [
    //     output
    // ])

    return (
        <>
            <H1Text className='py-8' content="UUID Generator" />
            <div className="page-card-wrapper px-8">
                <div className='space-y-8'>
                    <EuiCard title="Input" className=''>
                        <EuiFormRow label="Variant" fullWidth>
                            <Select
                                options={[
                                    { id: '1', value: 'uuidv1 (timestamp based)' },
                                    // { id: '3', value: '3 (namespace md5)' },
                                    { id: '4', value: 'uuidv4 (random and most popular)' },
                                    // { id: '5', value: '5 (namespace sha-1)' },
                                ]}
                                value={version}
                                onChange={mode => {
                                    return setVersion(mode)
                                }}
                            />
                        </EuiFormRow>
                        {(version === '3' || version === '5') && <>
                            <EuiFormRow label="Namespace UUID" fullWidth>
                                <TextField value={namespace} onChange={(value) => setNS(value)} />
                            </EuiFormRow>
                            <EuiFormRow label="Name" fullWidth>
                                <TextField value={name} onChange={(value) => setName(value)} />
                            </EuiFormRow>

                        </>}
                        <EuiButton onClick={()=>{forceupdate()}} fill>
                            Generate Again
                        </EuiButton>
                    </EuiCard>
                    <EuiCard title="Output" >
                        <EuiFormRow label="Output" fullWidth>
                            <OutputTextField value={output} />
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
            <Seo hasChat title="UUID Generator" description='Generate UUID using our online tool' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
