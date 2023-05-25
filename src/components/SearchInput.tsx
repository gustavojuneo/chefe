import { Search } from 'lucide-react'

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
    <div className="relative w-full">
      <input
        placeholder="Pesquisar"
        value={value}
        className="w-full border-2 border-zinc-200 p-2 pl-8 rounded outline-none focus:border-red-500 focus:placeholder:text-red-400 peer transition"
        onChange={({ target }) => {
          onChangeValue(target.value)
        }}
      />
      <span className="absolute left-2 top-[50%] -translate-y-1/2 text-zinc-400 peer-focus:text-red-500 transition">
        <Search size={18} />
      </span>
    </div>
  )
}
