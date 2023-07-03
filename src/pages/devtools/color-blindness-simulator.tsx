import Seo from '../../components/Seo'
import { useEffect, useRef, useState } from 'react'
import { H1Text } from '../../components/H1Text'

import { EuiCard, EuiFilePicker, EuiFormRow } from '@elastic/eui'
import Select from '../../components/inputs/Select'
import ToolsDashboard from '../../layouts/ToolsDashboard'


type CBType = 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochromacy' | null

/* Credit for these goes to Loren Petrich (lpetrich)
   source: https://lpetrich.org/Science/ColorBlindnessSim/ColorBlindnessSim.html */
// prettier-ignore
const cbMatrices = {
    protanopia: [
        [0.202001295331, 0.991720719265, -0.193722014597],
        [0.163800203026, 0.792663865514, 0.0435359314602],
        [0.00913336570448, -0.0132684300993, 1.00413506439],
    ],
    deuteranopia: [
        [0.430749076295, 0.717402505462, -0.148151581757],
        [0.336582831043, 0.574447762213, 0.0889694067435],
        [-0.0236572929497, 0.0275635332006, 0.996093759749],
    ],
    tritanopia: [
        [0.971710712275, 0.112392320487, -0.0841030327623],
        [0.0219508442818, 0.817739672383, 0.160309483335],
        [-0.0628595877201, 0.880724870686, 0.182134717034],
    ],
    monochromacy: [
        [0.299, 0.587, 0.114],
        [0.299, 0.587, 0.114],
        [0.299, 0.587, 0.114],
    ],
}

const downloadURI = (uri: string, name: string) => {
    const link = document.createElement('a')
    link.download = name
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const addTypeToFilename = (name: string, type: CBType) => {
    const start = name.slice(0, name.lastIndexOf('.'))
    const end = name.slice(name.lastIndexOf('.'))
    return start + '_' + (type as string) + end
}

interface CBImageProps {
    contents?: string
    type?: CBType
    amount?: number
    title?: string
}
const CBImage = ({ contents = '', type = null, amount = 0, title = '' }: CBImageProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const draw = (ctx: CanvasRenderingContext2D | null | undefined, blob: string = '') => {
        if (ctx !== undefined && ctx !== null && blob.length > 0) {
            const img = new Image()
            img.onload = () => {
                ctx.canvas.width = img.width
                ctx.canvas.height = img.height
                ctx.drawImage(img, 0, 0)

                if (type !== null && Object.keys(cbMatrices).includes(type)) {
                    const imageData = ctx.getImageData(0, 0, img.width, img.height)
                    const data = imageData.data
                    const newData = []
                    const mat = cbMatrices[type]
                    for (var i = 0; i < data.length; i += 4) {
                        // prettier-ignore
                        newData.push(
                            mat[0][0] * data[i] + mat[0][1] * data[i + 1] + mat[0][2] * data[i + 2],
                            mat[1][0] * data[i] + mat[1][1] * data[i + 1] + mat[1][2] * data[i + 2],
                            mat[2][0] * data[i] + mat[2][1] * data[i + 1] + mat[2][2] * data[i + 2],
                            data[i + 3]
                        )
                    }
                    // prettier-ignore
                    ctx.putImageData(
                        new ImageData(
                            new Uint8ClampedArray(newData),
                            img.width,
                            img.height
                        ), 0, 0
                    )
                }
            }
            img.src = blob
        }
    }

    useEffect(() => {
        draw(canvasRef.current?.getContext('2d'), contents)
    }, [draw, contents])
    // The line above causes an ESLint warning. I don't really understand how useEffect works so if you can make it go away then please do.

    return <canvas ref={canvasRef} title={title} className='max-w-full' />
}


export const handleFileChosen = (file: File, readAs: string, cb: any) => {
    if (readAs === 'objectURL') {
        return cb(URL.createObjectURL(file), file)
    }
    const fileReader = new FileReader()
    fileReader.onloadend = () => cb(fileReader.result, file)
    switch (readAs) {
        case 'text':
            fileReader.readAsText(file)
            break
        case 'dataURL':
            fileReader.readAsDataURL(file)
            break
        case 'binary':
            fileReader.readAsBinaryString(file)
            break
        case 'arrayBuffer':
            fileReader.readAsArrayBuffer(file)
            break
    }
}

const Content = () => {
    const [type, setType] = useState('protanopia' as CBType)
    const [amount, setAmount] = useState(100)
    const [image, setImage] = useState(null)

    return (
        <>
            <H1Text className='py-8' content="Color Blindness Simulator" />
            <div className="page-card-wrapper px-8">
                <div className='space-y-8'>
                    <EuiCard title="Input" className=''>
                        <EuiFormRow label="Color Blindness Type" fullWidth>
                            <Select
                                options={[
                                    { id: 'protanopia', value: 'Protanopia' },
                                    { id: 'deuteranopia', value: 'Deuteranopia' },
                                    { id: 'tritanopia', value: 'Tritanopia' },
                                    { id: 'monochromacy', value: 'Monochromacy (rare)' },
                                ]}
                                value={type}
                                onChange={type => {
                                    return setType(type)
                                }}
                            />
                        </EuiFormRow>
                        <EuiFormRow label="Input" fullWidth>
                            <EuiFilePicker
                                fullWidth
                                id={"filePickerId"}
                                multiple={false}
                                initialPromptText="Upload Image"
                                onChange={(files) => {
                                    const ls = (files.length > 0 ? Array.from(files) : [])
                                    if (files.length > 0) {
                                        handleFileChosen(ls[0], 'objectURL', (blob: string, file: File) => {
                                            setImage({ blob, name: file.arrayBuffer() })
                                        })
                                    } else {
                                        setImage(null)
                                    }
                                }}
                            />
                        </EuiFormRow>
                    </EuiCard>
                    <EuiCard title="Output" >
                        {
                            (image === null) ? <div>Kindly Select a File</div> :
                                <>
                                    <EuiFormRow label="Original" fullWidth>
                                        <CBImage contents={image.blob} title='Original, unaltered image' />
                                    </EuiFormRow>
                                    <EuiFormRow label="Simulated" fullWidth>
                                        <CBImage
                                            contents={image.blob}
                                            type={type}
                                            amount={amount}
                                            title={`Image altered to simulate ${amount}% ${type}`}
                                        />
                                    </EuiFormRow>
                                    <div>Right Click and Save to Download Simulated Image</div>
                                </>
                        }
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
            <Seo hasChat title="Color Blindness Simulator" description='Color Blindness Simulator helps you simulate Color Blindness on an Image' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
