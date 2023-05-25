import { ListItemDTO } from './ListItemDTO'

export type GetListDTO = {
  id: string
  name: string
  itens?: ListItemDTO[]
  members?: any
  ownerId: string
  restricted: boolean
  created_at: string
  updated_at: string
  _count: {
    members: number
    itens: number
  }
}
