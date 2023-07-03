import Seo from '../../components/Seo'
import { useEffect, useState } from 'react'
import UnAuthedLanding from '../../layouts/UnAuthedLanding'
import { H1Text } from '../../components/H1Text'
import AuthedDashboard from '../../layouts/AuthedDashboard'
import { EuiButton, EuiCard, EuiFormRow } from '@elastic/eui'
import TextField from '../../components/inputs/TextField'
import Hooks from '@omkar111111/utils/hooks'
import ToolsDashboard from '../../layouts/ToolsDashboard'

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
function generateKey() {
    let newSecretKey = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)';
    for (let i = 0; i < 50; i++) {
        newSecretKey += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return newSecretKey;
}
const Content = () => {

    const forceupdate = Hooks.useForceUpdate()

    let output = generateKey()

    return (
        <>
            <H1Text className='py-8' content="Secret Key Generator" />
            <div className="page-card-wrapper px-8">
                <div className='space-y-8'>
                    <EuiCard title="Input" className=''>
                        <EuiButton onClick={forceupdate} fill>
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
            <Seo hasChat title="Secret Key Generator" description='Generate Secret Keys for Django, JWT Token etc using our Secret Key Generator' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
