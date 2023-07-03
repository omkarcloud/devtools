import Seo from '../../components/Seo'
import { useState } from 'react'
import UnAuthedLanding from '../../layouts/UnAuthedLanding'
import { H1Text } from '../../components/H1Text'
import AuthedDashboard from '../../layouts/AuthedDashboard'

import TextAreaField from '../../components/inputs/TextAreaField'
import { EuiCard, EuiFormRow } from '@elastic/eui'
import Select from '../../components/inputs/Select'
import { OutputTextAreaField } from '../../components/inputs/outputs'
import ToolsDashboard from '../../layouts/ToolsDashboard'

const titleCaseExclusions = ['a', 'about', 'above', 'across', 'after', 'against', 'ago', 'along', 'alongside', 'amid', 'among', 'amongst', 'an', 'and', 'anti', 'around', 'as', 'aside', 'at', 'atop', 'away', 'before', 'behind', 'below', 'beneath', 'beside', 'besides', 'between', 'beyond', 'but', 'by', 'circa', 'despite', 'down', 'during', 'except', 'for', 'from', 'hence', 'in', 'including', 'into', 'like', 'nor', 'notwithstanding', 'of', 'onto', 'or', 'over', 'per', 'regarding', 'respecting', 'since', 'than', 'the', 'through', 'to', 'toward', 'towards', 'under', 'underneath', 'unless', 'unlike', 'until', 'unto', 'upon', 'versus', 'via', 'what', 'when', 'where', 'who', 'whom', 'with', 'within', 'without']
const firstLetterUpper = (text: string): string =>
    text.substr(0, 1).toUpperCase() + text.substr(1).toLowerCase()

const lowerCase = (text: string): string => text.toLowerCase()
const upperCase = (text: string): string => text.toUpperCase()
const sentenceCase = (text: string): string =>
    text
        .split('. ')
        .map((sentence) =>
            sentence
                .split(' ')
                .map((word, i) =>
                    i === 0 || word.toLowerCase() === 'i' ? firstLetterUpper(word) : word.toLowerCase()
                )
                .join(' ')
        )
        .join('. ')
const titleCase = (text: string): string =>
    text
        .match(/(?<=[.?!]|[.?!]\s|^)[^.?!]+?([.?!]\s?|$)/g)
        ?.map((sentence) =>
            sentence
                .trim()
                .split(' ')
                .map((word, i) =>
                    i === 0 || !titleCaseExclusions.includes(word.toLowerCase())
                        ? firstLetterUpper(word)
                        : word.toLowerCase()
                )
                .join(' ')
        )
        .join('. ') || ''
const camelCase = (text: string): string =>
    text
        .split(' ')
        .map((word, i) => (i === 0 ? word.toLowerCase() : firstLetterUpper(word)))
        .join('')
const pascalCase = (text: string): string => text.split(' ').map(firstLetterUpper).join('')
const snakeCase = (text: string): string => text.toLowerCase().replaceAll(' ', '_')
const constantCase = (text: string): string => text.toUpperCase().replaceAll(' ', '_')
const kebabCase = (text: string): string => text.toLowerCase().replaceAll(' ', '-')
const cobolCase = (text: string): string => text.toUpperCase().replaceAll(' ', '-')
const trainCase = (text: string): string => text.split(' ').map(firstLetterUpper).join('-')
const alternatingCase = (text: string): string =>
    text
        .split('')
        .map((c, i) => (i % 2 == 0 ? c.toLowerCase() : c.toUpperCase()))
        .join('')
const inverseCase = (text: string): string =>
    text
        .split('')
        .map((c) => (c.charCodeAt(0) < 97 ? c.toLowerCase() : c.toUpperCase()))
        .join('')

const prettyDec = (number: number | undefined): string | null => {
    if (number) {
        if (number.toString().length > 3) {
            let out: string[] = []
            for (var i = number.toString().length; i > 0; i -= 3) {
                out.unshift(number.toString().slice(i - 3 >= 0 ? i - 3 : 0, i))
            }
            return out.join(',')
        } else return number.toString()
    } else return null
}



const Content = () => {

    const [mode, setMode] = useState('title-case')

    const [state, setstate] = useState({
        input: '',
        textOutput: ''
    })

    const { input } = state
    let output = (() => {
            if (mode === 'lowercase') return (lowerCase(input))
            if (mode === 'uppercase') return (upperCase(input))
            if (mode === 'sentence-case') return (sentenceCase(input))
            if (mode === 'title-case') return (titleCase(input))
            if (mode === 'camel-case') return (camelCase(input))
            if (mode === 'pascal-case') return (pascalCase(input))
            if (mode === 'snake-case') return (snakeCase(input))
            if (mode === 'constant-case') return (constantCase(input))
            if (mode === 'kebab-case') return (kebabCase(input))
            if (mode === 'cobol-case') return (cobolCase(input))
            if (mode === 'train-case') return (trainCase(input))
            if (mode === 'alternating-case') return (alternatingCase(input))
            if (mode === 'inverse-case') return (inverseCase(input))
        
    })()

    function onChange(change) {
        setstate(prev => ({ ...prev, ...change }))
    }

    return (
        <>
            <H1Text className='py-8' content="Case Convertor" />
            <div className="page-card-wrapper px-8">
                <div className='space-y-8'>
                    <EuiCard title="Input" className=''>
                        <EuiFormRow label="Conversion Method" fullWidth>
                            <Select
                                options={[
                                    { id: 'lowercase', value: 'lowercase' },
                                    { id: 'uppercase', value: 'UPPERCASE' },
                                    { id: 'sentence-case', value: 'Sentence case' },
                                    { id: 'title-case', value: 'Title Case' },
                                    { id: 'camel-case', value: 'camelCase' },
                                    { id: 'pascal-case', value: 'PascalCase' },
                                    { id: 'snake-case', value: 'snake_case' },
                                    { id: 'constant-case', value: 'CONSTANT_CASE' },
                                    { id: 'kebab-case', value: 'kebab-case' },
                                    { id: 'cobol-case', value: 'COBOL-CASE' },
                                    { id: 'train-case', value: 'Train-Case' },
                                    { id: 'alternating-case', value: 'aLtErNaTiNg cAsE' },
                                    { id: 'inverse-case', value: 'iNVERSE cASE' },
                                ]}
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
            <Seo hasChat title="Case Convertor" description='Use our Case Convertor to Convert text between different letter cases like lower case, upper case, sentence case, capitalized case, alternating case and many more.' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
