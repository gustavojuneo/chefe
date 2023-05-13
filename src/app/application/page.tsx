import { CreateListModal } from '@/components/CreateListModal'
import { Header } from '@/components/Header'

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="h-full flex flex-col justify-center">
        <CreateListModal />
      </div>
    </div>
  )
}
