import { Header } from '@/components/Header'
import { List } from './components/List'

export default async function Lists() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <List />
    </div>
  )
}
