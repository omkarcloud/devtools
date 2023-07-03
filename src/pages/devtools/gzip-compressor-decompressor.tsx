import Seo from '../../components/Seo'
import { useState } from 'react'
import { H1Text } from '../../components/H1Text'

import TextAreaField from '../../components/inputs/TextAreaField'
import { EuiCard, EuiFormRow } from '@elastic/eui'
import Select from '../../components/inputs/Select'
import pako from 'pako'
import { OutputTextAreaField } from '../../components/inputs/outputs'
import ToolsDashboard from '../../layouts/ToolsDashboard'
function compress(str) {
    // Convert the string to a Uint8Array
    const input = new TextEncoder().encode(str);
  
    // Compress the data using gzip
    const compressed = pako.gzip(input);
  
    // Convert the compressed data to a base64 string
    const base64 = btoa(String.fromCharCode.apply(null, compressed));
  
    return base64;
  }

  

  function decompress(base64) {
    // Convert the base64 string to a Uint8Array
    const compressed = new Uint8Array(atob(base64).split("").map((c) => c.charCodeAt(0)));
  
    // Decompress the data using gzip
    const decompressed = pako.inflate(compressed);
  
    // Convert the decompressed data to a string
    const str = new TextDecoder().decode(decompressed);
  
    return str;
  }
  
const Content = () => {

	const [mode, setMode] = useState( 'compress')

    const [state, setstate] = useState({
        input: '',
        textOutput: ''
    })

    const { input } = state
	let output = (() => {
		try {
			if (mode === 'compress') return compress(input)
			if (mode === 'decompress') return decompress(input)
		} catch (e) {
			return ''
		}
	})()

    function onChange(change) {
        setstate(prev => ({ ...prev, ...change }))
    }

    return (
        <>
            <H1Text className='py-8' content="GZIP Compressor/Decompressor" />
            <div className="page-card-wrapper px-8">
                <div className='space-y-8'>
                    <EuiCard title="Input" className=''>
                        <EuiFormRow label="Conversion Method" fullWidth>
                            <Select
                                options={[
                                    {
                                        id: 'compress',
                                        value: 'Compress',
                                    },
                                    {
                                        id: 'decompress',
                                        value: 'Decompress',
                                    }]}
                                value={mode}
                                onChange={mode => {
                                    return setMode(mode)
                                }}
                            />
                        </EuiFormRow>
                        <EuiFormRow label="Input" fullWidth>
                            <TextAreaField 
                    rows={6}
                            
                            value={state.input} onChange={(value) => onChange({ input: value })}  />
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
            <Seo hasChat title="GZIP Compressor/Decompressor" description='Our GZIP Compressor/Decompressor helps you in compressing string to gzip or gzipped string to string' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
