import Seo from '../../components/Seo'
import { H1Text } from '../../components/H1Text'
import { EuiCard, EuiFormRow } from '@elastic/eui'

import { LoremIpsum } from 'lorem-ipsum'
import TextAreaField from '../../components/inputs/TextAreaField'
import NumberField from '../../components/inputs/NumberField'
import Select from '../../components/inputs/Select'

import { useState } from 'react'
import ToolsDashboard from '../../layouts/ToolsDashboard'


const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
})


const Content = () => {
    const [unit, setUnit] = useState( 'paragraphs')
    const [count, setCount] = useState( 1)
    let output = (() => {
        try {
            if (unit === 'words') return lorem.generateWords(count)
            if (unit === 'sentences') return lorem.generateSentences(count)
            if (unit === 'paragraphs') return lorem.generateParagraphs(count)
        } catch (e) { }
        return ''
    })()

    return (
        <>
            <H1Text className='py-8' content="Lorem Ipsum Generator" />
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
                        <EuiFormRow label="Units" fullWidth>
                            <Select
                                options={[
                                    { id: 'words', value: 'Words' },
                                    { id: 'sentences', value: 'Sentences' },
                                    { id: 'paragraphs', value: 'Paragraphs' },
                                ]}
                                value={unit}
                                onChange={mode => {
                                    return setUnit(mode)
                                }}
                            />
                        </EuiFormRow>
                    </EuiCard>
                    <EuiCard title="Output" >
                        <EuiFormRow label="Output" fullWidth>
                            <TextAreaField rows={6} value={output}/>
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
            <Seo hasChat title="Lorem Ipsum Generator" description='Generate dummy Lorem Ipsum Text using our Lorem Ipsum Generator' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
