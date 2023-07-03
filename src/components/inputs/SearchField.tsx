import { EuiFieldSearch } from '@elastic/eui'
import Browser from '@omkar111111/utils/browser'

export default function SearchField({ value, onChange, onApply, ...props }: any) {
  const handleChange = event => {
    let value = Browser.inputValue(event)
    onChange(value)
  }

  return (
    <EuiFieldSearch
      placeholder="Search..."
      aria-label="Search field"
      {...props}
      isClearable={true}
      onSearch={onApply}
      onBlur={() => onChange(value)}
      value={value ?? ''}
      onChange={handleChange} />
  )
}
