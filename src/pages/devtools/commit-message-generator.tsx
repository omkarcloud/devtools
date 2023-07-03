import ToolsDashboard from '../../layouts/ToolsDashboard'
import Seo from '../../components/Seo'
import { useState } from 'react'

import { H1Text } from '../../components/H1Text'

import { EuiButton, EuiCard, EuiFormRow } from '@elastic/eui'
import Hooks from '@omkar111111/utils/hooks'
import { OutputTextAreaField } from '../../components/inputs/outputs'
import NumberField from '../../components/inputs/NumberField'
import { faker } from '@faker-js/faker';

function generateContent() {
    return faker.git.commitMessage()
}
  
  
function generate(count) {
    let output = ''

    for (var i = 0; i < count; i++) {
        
        let newContent = generateContent()
        
        while (output.includes(newContent)) {
            newContent = generateContent()
        }
        
        output += newContent

        if (i < count - 1) output += '\n'
    }

    return output
}

const Content = () => {

    const [count, setCount] = useState(3)

    const forceupdate = Hooks.useForceUpdate()

    let output = ''
    try {
        output = generate(count)
       
    } catch (e) {
        console.error(e)
    }


    return (
        <>
            <H1Text className='py-8' content="Commit Message Generator" />
            <div className="page-card-wrapper px-8">
                <div className='space-y-8'>
                    <EuiCard title="Input" className=''>
                        <EuiFormRow label="Count" fullWidth>
                            <NumberField
                                value={count}
                                min={1}
                                onChange={e => setCount(e)}
                                fullWidth
                            />
                        </EuiFormRow>
                        <EuiButton onClick={() => { forceupdate() }} fill>
                            Generate Again
                        </EuiButton>
                    </EuiCard>
                    <EuiCard title="Output" >
                        <EuiFormRow label="Output" fullWidth>
                            <OutputTextAreaField rows={4} value={output} />
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
            <Seo hasChat title="Commit Message Generator" description='Generate random commit message using our commit message generator.' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page

