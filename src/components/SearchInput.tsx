import { Search } from 'lucide-react'
import { Input } from './Input'

type SearchInputProps = {
  isLoading?: boolean
  value?: string
  onChangeValue: (value: string) => void
}

export const SearchInput = ({
  isLoading = false,
  value,
  onChangeValue,
}: SearchInputProps) => {
  return isLoading ? (
    <div className="animate-pulse">
      <div className="w-full">
        <input
          type="text"
          className="w-full p-2 pl-8 bg-slate-200 rounded border-2"
          disabled
        />
      </div>
    </div>
  ) : (
    <Input
      placeholder="Procure por uma lista"
      value={value}
      onChange={({ target }) => {
        onChangeValue(target.value)
      }}
      leftIcon={Search}
    />
  )
}
