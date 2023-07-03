import Seo from '../../components/Seo'
import { useState } from 'react'
import UnAuthedLanding from '../../layouts/UnAuthedLanding'
import { H1Text } from '../../components/H1Text'
import AuthedDashboard from '../../layouts/AuthedDashboard'
import { EuiCard, EuiFormRow } from '@elastic/eui'
import Select from '../../components/inputs/Select'
import NumberField from '../../components/inputs/NumberField'
import { OutputTextField } from '../../components/inputs/outputs'
import TextField from '../../components/inputs/TextField'
import CheckboxBoxField from '../../components/inputs/CheckBoxField'
import ToolsDashboard from '../../layouts/ToolsDashboard'

// source: https://stackoverflow.com/a/8952393/908128
const parseFloat = (x: string, radix: number) => {
	// Split the string at the decimal point
	const parts = x.split(/\./).map((s) => s.trim())

	// If there is nothing before the decimal point, make it 0
	if (parts[0] == '') {
		parts[0] = '0'
	}

	// If there was a decimal point & something after it
	if (parts.length > 1 && parts[1] != '') {
		const fractionLength = parts[1].length
		const mantissa = parseInt(parts[1], radix) * Math.pow(radix, -fractionLength)
		return parseInt(parts[0], radix) + mantissa
	}

	// If there wasn't a decimal point or there was but nothing was after it
	return parseInt(parts[0], radix)
}

type Base = 'bin' | 'oct' | 'dec' | 'hex'
const baseMap = {
	bin: 2,
	oct: 8,
	dec: 10,
	hex: 16,
}

const prettyBin = (number: string): string => {
	let out: string[] = []
	if (number.length > 1) {
		for (var i = number.length; i > 0; i -= 4) {
			out.unshift(number.slice(i - 4 >= 0 ? i - 4 : 0, i))
		}
		return out.join(' ')
	} else return number
}
const prettyOct = (number: string): string => {
	let out: string[] = []
	if (number.length > 1) {
		for (var i = number.length; i > 0; i -= 3) {
			out.unshift(number.slice(i - 3 >= 0 ? i - 3 : 0, i))
		}
		return out.join(' ')
	} else return number
}
const prettyDec = (number: string): string => {
	let out: string[] = []
	if (number.length > 1) {
		for (var i = number.length; i > 0; i -= 3) {
			out.unshift(number.slice(i - 3 >= 0 ? i - 3 : 0, i))
		}
		return out.join(',')
	} else return number
}
const prettyHex = (number: string): string => {
	let out: string[] = []
	if (number.length > 1) {
		for (var i = number.length; i > 0; i -= 2) {
			out.unshift(number.slice(i - 2 >= 0 ? i - 2 : 0, i))
		}
		return out.join(' ')
	} else return number
}

const convert = (x: string, base: Base, pretty: boolean) => {
	const input = parseFloat(x, baseMap[base])
	if (isNaN(input)){
		return ['', '', '', '']
	} else if (pretty){
		return [
			prettyBin(input.toString(2)),
			prettyOct(input.toString(8)),
			prettyDec(input.toString(10)),
			prettyHex(input.toString(16)),
		]
	} else {
		return [input.toString(2), input.toString(8), input.toString(10), input.toString(16)]
	}
}

const Content = () => {

	const [pretty, setPretty] = useState( true)
	const [base, setBase] = useState( 'dec')

    const [state, setstate] = useState({
        input: '',
        textOutput: ''
    })

    const { input } = state
    //@ts-ignore
	let [resultBin, resultOct, resultDec, resultHex] = convert(input, base, pretty)
    
    
    function onChange(change) {
        setstate(prev => ({ ...prev, ...change }))
    }
    console.log({base})

    return (
        <>
            <H1Text className='py-8' content="Number Base Converter" />
            <div className="page-card-wrapper px-8">
                <div className='space-y-8'>
                    <EuiCard title="Input" className=''>
                        <EuiFormRow label="Input" fullWidth>
                            <TextField value={state.input} onChange={(value) => onChange({ input: value })} />
                        </EuiFormRow>
                        <EuiFormRow label="Input Base" fullWidth>
                            <Select
                                options={[
									{ id: 'hex', value: 'Hexadecimal' },
									{ id: 'dec', value: 'Decimal' },
									{ id: 'oct', value: 'Octal' },
									{ id: 'bin', value: 'Binary' },
                                ]}
                                value={base}
                                onChange={(b)=>{
                                    return setBase(b)
                                }}
                            />
                        </EuiFormRow>
                        <EuiFormRow  label="Pretty Print" fullWidth>
                            <CheckboxBoxField
                            className='text-left'
                                value={pretty}
                                onChange={pretty => {
                                    console.log({pretty})
                                    return setPretty(pretty)
                                }}
                            />
                        </EuiFormRow>
                    </EuiCard>
                    <EuiCard title="Output" >
                        <EuiFormRow label="Hexadecimal" fullWidth>
                            <OutputTextField value={resultHex} />
                        </EuiFormRow>
                        <EuiFormRow label="Decimal" fullWidth>
                            <OutputTextField value={resultDec} />
                        </EuiFormRow>
                        <EuiFormRow label="Octal" fullWidth>
                            <OutputTextField value={resultOct} />
                        </EuiFormRow>
                        <EuiFormRow label="Binary" fullWidth>
                            <OutputTextField value={resultBin} />
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
            <Seo hasChat title="Number Base Converter" description='Our Number Base Converter helps you in hexadecimal, octal, decimal and binary  conversion' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
