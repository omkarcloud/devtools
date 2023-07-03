import Seo from '../../components/Seo'
import { useState } from 'react'
import UnAuthedLanding from '../../layouts/UnAuthedLanding'
import { H1Text } from '../../components/H1Text'
import AuthedDashboard from '../../layouts/AuthedDashboard'

import TextAreaField from '../../components/inputs/TextAreaField'
import { EuiCard, EuiFormRow } from '@elastic/eui'
import Select from '../../components/inputs/Select'
import { OutputTextAreaField } from '../../components/inputs/outputs'
import { isEmptyString } from '../../utils/data/validators'
import ToolsDashboard from '../../layouts/ToolsDashboard'



const prettyDec = (number: number | undefined): string | null => {

    if (number) {
        if (number.toString().length > 3) {
            let out: string[] = []
            for (var i = number.toString().length; i > 0; i -= 3) {
                out.unshift(number.toString().slice(i - 3 >= 0 ? i - 3 : 0, i))
            }
            return out.join(',')
        } else return number.toString()
    } else return '0'
}

const Content = () => {

    const [state, setstate] = useState({
        input: '',
        textOutput: ''
    })

    const { input } = state

    const wordDistrib = {}
    input.match(/\b\w+\b/g)?.forEach((word: string) => {
        if (wordDistrib.hasOwnProperty(word.toLowerCase())) {
            wordDistrib[word.toLowerCase()] += 1
        } else {
            wordDistrib[word.toLowerCase()] = 1
        }
    })
    const wordDistribStr = Object.keys(wordDistrib)
        .map((word: string) => ({ word, count: wordDistrib[word] }))
        .sort((a, b) => {
            if (a.count < b.count) {
                return 1
            } else if (a.count === b.count) {
                return a.word.localeCompare(b.word)
            } else {
                return -1
            }
        })
        .map((line) => line.word + ': ' + line.count.toString())
        .join('\n')

    const charDistrib = {}
    input.split('').forEach((char: string) => {
        if (charDistrib.hasOwnProperty(char.toLowerCase())) {
            charDistrib[char.toLowerCase()] += 1
        } else {
            charDistrib[char.toLowerCase()] = 1
        }
    })
    const charDistribStr = Object.keys(charDistrib)
        .map((char: string) => ({ char, count: charDistrib[char] }))
        .sort((a, b) => {
            if (a.count < b.count) {
                return 1
            } else if (a.count === b.count) {
                return a.char.localeCompare(b.char)
            } else {
                return -1
            }
        })
        .map((line) => line.char + ': ' + line.count.toString())
        .join('\n')



    function onChange(change) {
        setstate(prev => ({ ...prev, ...change }))
    }

    return (
        <>
            <H1Text className='py-8' content="Text Counter" />
            <div className="page-card-wrapper px-8">
                <div className='space-y-8'>
                    <EuiCard title="Input" className=''>
                        <EuiFormRow label="Input" fullWidth>
                            <TextAreaField value={state.input} onChange={(value) => onChange({ input: value })} rows={6} />
                        </EuiFormRow>
                    </EuiCard>
                    <EuiCard title="Output" >
                        <EuiFormRow label="Characters" fullWidth>
                            <div className='text-left '>{prettyDec(input.length)}</div>
                        </EuiFormRow>
                        <EuiFormRow label="Words" fullWidth>
                            <div className='text-left '>{prettyDec(
                                input
                                    .trim()
                                    .split(/\s+/)
                                    .filter((word) => word.length > 0).length
                            )}</div>
                        </EuiFormRow>
                        <EuiFormRow label="Lines" fullWidth>
                            <div className='text-left '>{prettyDec(isEmptyString(input) ? null : input.split(/\n/).length)}</div>
                        </EuiFormRow>
                        <EuiFormRow label="Paragraphs" fullWidth>
                            <div className='text-left '>{prettyDec(input.split(/\n/).filter((l) => l.trim().length > 0).length)}</div>
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
            <Seo hasChat title="Text Counter" description='Use our Text Counter to count characters, words, lines, paragraphs.' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
