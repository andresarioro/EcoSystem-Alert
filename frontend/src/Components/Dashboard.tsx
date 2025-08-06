import { useNavigate } from 'react-router-dom'
import GreenGrafic from './grafics/GreenGrafic'
import { GreenGrafic8hrs } from './grafics/GreenGrafic8hrs'

export function Dashboard () {
  const navigate = useNavigate()

  return (
    <main className='text-black font-montserrat flex flex-col items-center justify-center min-h-screen w-full bg-gray-200'>
      <section className='overflow-y-auto overflow-x-hidden scrollbar-custom box-shadow-custom flex flex-col items-center gap-10 bg-white w-85/100 md:w-70/100 h-[600px] sm:h-[700px] rounded-xl'>
        <header className='flex w-full justify-between items-center px-2'>
          <div className='max-w-sm p-2'>
            <img src='/orth.svg' alt='Marina-Orth-logo' className='w-20 md:w-40 h-auto object-contain rounded' />
          </div>
          <h1 className='text-lg md:text-3xl text-center font-bold mt-5'>Ecosystem Dashboard</h1>
          <div className='max-w-sm'>
            <img src='/Ecosystem-logo.svg' alt='Ecosystem-logo' className='w-20 md:w-40 h-auto object-contain rounded' />
          </div>
        </header>
        <section className='w-full flex gap-10 md:flex-row flex-col items-center justify-center p-5'>
          <section className='w-full md:w-1/2 xl:h-[400px]'>
            <h1 className='text-center font-bold text-xl'>Resultados en tiempo real</h1>
            <GreenGrafic />
          </section>
          <section className='w-full md:w-1/2 xl:h-[400px]'>
            <h1 className='text-center font-bold text-xl'>Ultimas 8 horas</h1>
            <section className='flex flex-col items-center justify-center'>
              <GreenGrafic8hrs />
              <button onClick={() => navigate('/grafics')} className='underline text-[var(--primary-color)] cursor-pointer'>Ver mas resultados</button>
            </section>
          </section>
        </section>
        <section className='flex flex-col items-center justify-center mt-5'>
          <div>
            <h2 className='text-2xl text-center font-bold'>Señales de alerta</h2>
            <p className='text-center'>Aquí se mostrarán las señales de alerta detectadas por el sistema.</p>
          </div>
          <p className='text-center'>Por ahora no hay ninguna alerta</p>
        </section>
      </section>
    </main>
  )
}
