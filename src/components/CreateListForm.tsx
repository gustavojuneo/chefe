'use client'
import * as uuid from 'uuid'
import { useLists } from '@/hooks/useLists'
import { RefObject, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ListDTO } from '@/dtos/ListDTO'
import { ListItemDTO } from '@/dtos/ListItemDTO'

const getItensFromInput = (inputRef: RefObject<HTMLInputElement>) => {
  if (inputRef.current) {
    const values = inputRef.current.value
      .split(',')
      .map((value) => value.trim())

    return values
  }
  return []
}

export type FormData = {
  id?: string
  name: string
  itens: ListItemDTO[]
}

type Props = {
  handleCloseModal: () => void
  defaultData?: FormData
  update?: boolean
}

export const CreateListForm = ({
  defaultData = { itens: [], name: '' },
  update = false,
  handleCloseModal,
}: Props) => {
  const { createList, updateList } = useLists()
  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: defaultData,
  })
  const listRef = useRef<HTMLInputElement>(null)

  const handleCreateList = (data: FormData) => {
    const newData: ListDTO = {
      ...data,
    }
    createList(newData)
    handleCloseModal()
  }

  const onAddList = (currentValue: ListItemDTO[], onChange: any) => {
    const values = getItensFromInput(listRef).map(
      (value) =>
        ({
          name: value,
          choosed: false,
        } as ListItemDTO),
    )

    const listValues =
      currentValue.length > 0 ? [...currentValue, ...values] : values

    if (listValues) {
      if (listRef.current) listRef.current.value = ''
      onChange(listValues)
    }
  }

  const handleUpdateList = (data: FormData) => {
    if (data.id) {
      updateList(data as ListDTO)
      handleCloseModal()
    }
  }

  return (
    <form
      className="flex flex-col w-full gap-4"
      onSubmit={
        update ? handleSubmit(handleUpdateList) : handleSubmit(handleCreateList)
      }
    >
      <div>
        <label htmlFor="name" className="block mb-1">
          List name
        </label>
        <input
          id="name"
          className="outline-none px-4 py-1 w-full rounded"
          {...register('name')}
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
                {value?.map((item) => (
                  <li key={item.id ?? uuid.v4()}>{item.name}</li>
                ))}
              </ul>
            </>
          )}
        />
      </div>

      <button
        className="px-2 py-1 bg-green-600 text-white font-bold rounded"
        type="submit"
      >
        Criar lista
      </button>
    </form>
  )
}
