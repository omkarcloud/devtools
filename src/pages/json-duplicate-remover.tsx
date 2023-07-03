import Seo from '../components/Seo'
import { useEffect, useState } from 'react'
import { H1Text } from '../components/H1Text'
import TextAreaField from '../components/inputs/TextAreaField'
import { OutputTextAreaField } from '../components/inputs/outputs'
// import prettier from 'prettier'
import _ from 'lodash'
import Select from '../components/inputs/Select'
import ToolsDashboard from '../layouts/ToolsDashboard'
// import parser from 'prettier/parser-babel'
// import prettier from 'prettier'

function prettyJson(input) {
    return input
    // return prettier.format(input, {
    //     parser: 'babel',
    //     plugins: [parser],
    //     ...{
    //         printWidth: 3,
    //         useTabs: 'tab' === 'tab',
    //         tabWidth: 'tab' !== 'tab' ? parseInt('tab') : undefined,
    //         semi: false,
    //         singleQuote: 'single' === 'single',
    //     }
    // })
}


function getOptions(ls) {
    try {
        return Object.keys(JSON.parse(ls)[0])
    } catch (e) {
        return []
    }
}



function getFirstOption(keys) {
    try {

        const name = keys.find(x => x.toLowerCase() === 'name')
        if (name) return name
        const id = keys.find(x => x.toLowerCase() === 'id')
        if (id) return id
        const _id = keys.find(x => x.toLowerCase() === '_id')
        if (_id) return _id
        return keys[0]
    } catch (e) {
        return ''
    }
}

const Content = () => {

    const [options, setoptions] = useState([])
    const [selectedOption, setselectedOption] = useState('')

    const [state, setstate] = useState({
        input: '',
    })

    const { input } = state

    let output
    try {
        const items = JSON.parse(input)
        const result = _.uniqBy(items, selectedOption)
        output = prettyJson(JSON.stringify(result))
    } catch (e) {
        output = ''
        console.error(e)
    }

    useEffect(() => {
        const newopts = getOptions(input)
        if (!_.isEqual(options, newopts)) {
            setoptions(newopts)
            setselectedOption(getFirstOption(newopts))
        }

    }, [options, input])

    function onChange(change) {
        setstate(prev => ({ ...prev, ...change }))
    }

    console.log({ options, selectedOption })
    return (
        <>
            <div className="px-8">
                <H1Text className='py-8' content="Json Duplicate Remover " />
                <div className='flex space-x-4 items-center justify-center max-w-2xl mb-4 mx-auto'>
                    <div className='grow'>Remove Duplicates by</div>
                    <div className='grow'>
                        <Select
                            fullWidth
                            options={options.map(x => ({ id: x, value: x }))}
                            value={selectedOption}
                            onChange={selectedOption => {
                                return setselectedOption(selectedOption)
                            }}
                        />
                    </div>
                </div>
                <div className='flex gap-8 max-w-4xl	mx-auto'>
                    <div className='flex-grow'>
                        <div className='text-2xl font-bold'>Duplicate JSON Array</div>
                        <TextAreaField value={state.input} onChange={(value) => onChange({ input: value })} rows={40} />
                    </div>
                    <div className='flex-grow' >
                        <div className='text-2xl font-bold'>Unique JSON Array</div>
                        <OutputTextAreaField value={output} rows={40} />
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
            <Seo hasChat title="Json Duplicate Remover " description='Remove Duplicates from JSON Online using our Tool' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
