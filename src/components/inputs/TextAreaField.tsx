import { EuiTextArea } from '@elastic/eui'
import Browser from '@omkar111111/utils/browser'

export default function TextAreaField({ value, onChange, ...props }: any) {
  const handleChange = event => {
    let value = Browser.inputValue(event)
    onChange(value)
  }

  return (
    <EuiTextArea
      fullWidth
      rows={6}
      value={value ?? ''}
      onChange={handleChange}
      {...props}
    />
  )
}
