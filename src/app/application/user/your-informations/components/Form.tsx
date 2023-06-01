'use client'
import { isAxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import colors from 'tailwindcss/colors'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { api } from '@/lib/axios'
import { Spinner } from '@/components/Spinner'

const updateProfileFormSchema = z.object({
  name: z
    .string({
      required_error: 'O nome é obrigatório.',
    })
    .min(3, 'O nome precisa ter pelomenos 3 letras.'),
  email: z
    .string({
      required_error: 'O e-mail é obrigatório.',
    })
    .email('Digite um e-mail inválido.'),
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

type FormContainerProps = {
  user: UpdateProfileFormData
}

export const FormContainer = ({ user }: FormContainerProps) => {
  const { update } = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
    },
  })

  const handleUpdateProfile = async (updatedData: UpdateProfileFormData) => {
    if (!isDirty) return
    try {
      const response = await api.put('/users/update', { data: updatedData })
      const { data } = response
      update(data.user)

      if (data.message) {
        toast.success(data.message, {
          position: 'top-center',
          closeOnClick: true,
          theme: 'colored',
        })
      }
    } catch (err) {
      if (isAxiosError(err)) {
        if (isAxiosError(err)) {
          toast.error(err?.response?.data.message, {
            position: 'top-center',
            closeOnClick: true,
            theme: 'colored',
          })
        }
      }
    }
  }

  return (
    <form
      className="flex flex-col gap-2 mt-10"
      onSubmit={handleSubmit(handleUpdateProfile)}
    >
      <h1 className="mb-4 text-2xl font-semibold text-zinc-800">
        Suas informações
      </h1>
      <Input
        label="Nome"
        placeholder="digite seu nome"
        errorMessage={errors?.name?.message}
        {...register('name')}
      />
      <Input
        label="E-mail"
        placeholder="digite seu e-mail"
        errorMessage={errors?.email?.message}
        {...register('email')}
        disabled
      />
      <Button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-zinc-50 relative"
        disabled={!isDirty || isSubmitting}
      >
        Salvar alterações
        {isSubmitting && (
          <Spinner
            size={20}
            containerFullSize={false}
            fill={colors.zinc[400]}
            className="absolute right-2"
          />
        )}
      </Button>
    </form>
  )
}

type FormProps = {
  isLoading?: boolean
  user: UpdateProfileFormData
}

export const Form = ({ isLoading = false, user }: FormProps) => {
  if (!isLoading) return <FormContainer user={user} />

  return (
    <form className="flex flex-col gap-2 mt-10">
      <h1 className="mb-4 text-2xl font-semibold text-zinc-800 animate-pulse">
        <div className="w-[200px] h-[32px] bg-slate-200 rounded" />
      </h1>
      <Input label="Nome" placeholder="seu nome" isLoading />
      <Input label="E-mail" placeholder="seu e-mail" isLoading disabled />
      <Button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-zinc-50"
        isLoading
      >
        Salvar alterações
      </Button>
    </form>
  )
}
