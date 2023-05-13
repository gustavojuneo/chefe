import { Header } from '@/components/Header'
import { Lists as ListsComponent } from '@/components/Lists'

export default async function Lists() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="w-full h-full flex flex-col mt-10">
        <ListsComponent />
      </div>
    </div>
  )
}
