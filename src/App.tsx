
import CardConsult from './components/carConsult'
import CardTelEmail from './components/cardTelEmail'
import DaisyCard from './components/daisyCard'

function App() {

  return (
    <main className='flex flex-col items-center'>
      <CardTelEmail />
      <div className='h-screen'></div>
      <DaisyCard />
      <div className='h-screen'></div>
      
    </main>
  )
}

export default App
