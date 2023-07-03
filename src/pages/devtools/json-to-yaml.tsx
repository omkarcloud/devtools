import Seo from '../../components/Seo'
import { useEffect, useState } from 'react'
import { H1Text } from '../../components/H1Text'
import YAML from 'yaml'
import TextAreaField from '../../components/inputs/TextAreaField'
import ToolsDashboard from '../../layouts/ToolsDashboard'

const Content = () => {

    const [mode, setMode] = useState( 'yaml')
    const [pretty, setPretty] = useState( true)

    const [state, setstate] = useState({
        input: '',
        textOutput: ''
    })

    const { input } = state
    let output
    try {
        if (input.length === 0) output = ''
        else if (mode === 'yaml') {
            output = YAML.stringify(YAML.parse(input))
        } else if (mode === 'json') {
            if (pretty) output = JSON.stringify(YAML.parse(input), null, '\t')
            else output = JSON.stringify(YAML.parse(input))
        }
    } catch (e) {
        output = ''
        console.error(e)
    }


    function onChange(change) {
        setstate(prev => ({ ...prev, ...change }))
    }

    useEffect(() => {
        onChange({textOutput: output})
    }, [
        output
    ])

    return (
        <>
            <div className=" px-8">
                <H1Text className='py-8' content="JSON to YAML" />
                <div className='flex gap-8 max-w-4xl	mx-auto'>
                    <div className='flex-grow'>
                        <div className='text-2xl font-bold'>JSON</div>
                        <TextAreaField value={state.input} onChange={(value) => onChange({input: value})} rows={40} />
                    </div>
                    <div className='flex-grow' >
                        <div className='text-2xl font-bold'>YAML</div>
                        <TextAreaField value={state.textOutput} onChange={(value) => onChange({textOutput: value})} rows={40} />
                    </div>
                </div>
            </div>

        </>
    )
}



const Page = () => {
    const Component = ToolsDashboard

    return (
        <>
            <Seo hasChat title="JSON to YAML" description='Convert JSON to YAML using our online editor' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
