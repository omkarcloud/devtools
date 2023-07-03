import { EuiFieldText, EuiTextArea } from '@elastic/eui'
import Browser from '@omkar111111/utils/browser'

export default function TextField({ value, onChange, ...props }: any) {
  const handleChange = event => {
    let value = Browser.inputValue(event)
    onChange(value)
  }

  return (
  
    <EuiFieldText
      {...props}
      fullWidth
      value={value ?? ''}
      onChange={handleChange} />
  )
}
