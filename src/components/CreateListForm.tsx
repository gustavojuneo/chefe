'use client'

import { storageListsSave } from '@/storage/storageLists'
import { RefObject, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'

const getItensFromInput = (inputRef: RefObject<HTMLInputElement>) => {
  if (inputRef.current) {
    const values = inputRef.current.value
      .split(',')
      .map((value) => value.trim())

    return values
  }
  return []
}

export const CreateListForm = () => {
  const { register, handleSubmit, control } = useForm()
  const listRef = useRef<HTMLInputElement>(null)

  const handleCreateList = (data: any) => {
    storageListsSave(data)
  }

  const onAddList = (currentValue: string[], onChange: any) => {
    const listValues = currentValue
      ? [...currentValue, ...getItensFromInput(listRef)]
      : getItensFromInput(listRef)
    if (listValues) {
      onChange(listValues)
    }
  }

  return (
    <form className="flex flex-col w-full gap-4" onSubmit={() => {}}>
      <div>
        <label htmlFor="listName" className="block mb-1">
          List name
        </label>
        <input
          id="listName"
          className="outline-none px-4 py-1 w-full rounded"
          {...register('listName')}
        />
      </div>

      <div>
        <Controller
          name="itens"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <div className="flex w-full gap-2">
                <input
                  ref={listRef}
                  id="list"
                  placeholder="Novo item"
                  className="w-full px-2 text-sm rounded"
                />
                <button
                  type="button"
                  onClick={() => onAddList(value, onChange)}
                  className="p-2 w-[40px] h-[40px] bg-green-500 rounded flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <ul className="flex flex-col gap-1 h-[100px] overflow-auto mt-2">
                {value?.map((item: string, index: number) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>
            </>
          )}
        />
      </div>

      <button
        className="px-2 py-1 bg-green-600 text-white font-bold rounded"
        type="submit"
        onClick={handleSubmit(handleCreateList)}
      >
        Criar lista
      </button>
    </form>
  )
}
