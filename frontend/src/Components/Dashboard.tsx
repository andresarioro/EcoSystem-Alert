import { useNavigate } from 'react-router-dom'
import GreenGrafic from './grafics/GreenGrafic'
import { GreenGrafic8hrs } from './grafics/GreenGrafic8hrs'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import type { alerts, PredictionData } from '../types/types'

const data = [
  { name: 'H', value1: 0, value2: 0, value3: 0 },
  { name: 'A', value1: 0, value2: 0, value3: 0 },
  { name: 'G', value1: 0, value2: 0, value3: 0 },
  { name: 'V', value1: 0, value2: 0, value3: 0 },
  { name: 'L', value1: 0, value2: 0, value3: 0 }
]

export function Dashboard () {
  const navigate = useNavigate()

  const [dataPredictions, setDataPredictions] = useState(data)
  const [alert, setAlert] = useState<alerts>()
  
    useEffect(() => {
      try {
        console.log('A')
        const socket = io('http://localhost:3000')

        console.log(socket)
  
        socket.emit('prediction',() => {
          console.log('a')
        })
  
        socket.on('prediction', (predictionData: PredictionData) => {
          console.log(predictionData)
          setDataPredictions([
            { name: 'C', value1: predictionData.predictionsC[0], value2: predictionData.predictionsC[1], value3: predictionData.predictionsC[2] },
            { name: 'H', value1: predictionData.predictionsH[0], value2: predictionData.predictionsH[1], value3: predictionData.predictionsH[2] },
            { name: 'V', value1: predictionData.predictionsV[0], value2: predictionData.predictionsV[1], value3: predictionData.predictionsV[2] },
            { name: 'L', value1: predictionData.predictionsL[0], value2: predictionData.predictionsL[1], value3: predictionData.predictionsL[2] },
          ])
        })

        const maxValueC = Math.max(dataPredictions[0].value1, dataPredictions[0].value2, dataPredictions[0].value3)
        const maxValueH = Math.max(dataPredictions[1].value1, dataPredictions[1].value2, dataPredictions[1].value3)
        const maxValueV = Math.max(dataPredictions[2].value1, dataPredictions[2].value2, dataPredictions[2].value3)
        const maxValueL = Math.max(dataPredictions[3].value1, dataPredictions[3].value2, dataPredictions[3].value3)

        // Condicionales, si hay alertas
        // Condicionales, cambio giroscopio
        // lluvia, por cms cubicos
        if (maxValueH > 400 && maxValueH < 800 ||
            maxValueC > 400 && maxValueC < 800 ||
            maxValueL > 50 && maxValueL < 100 ||
            maxValueV > 400 && maxValueV < 800 
        ) {
          setAlert({
            alertMsg: 'Hay que tener precaucion en el terreno',
            alertLvl: 2
          })
        } else if (maxValueH > 800 || maxValueC > 800 ||
          maxValueL > 800 || maxValueV > 800
        ) {
          setAlert({ 
            alertMsg: 'Alerta maxima, hay valores muy preocupantes y riesgosos en los sensores',
            alertLvl: 3
          })
        } else {
          setAlert({ 
            alertMsg: 'Todo esta bien en los sensores',
            alertLvl: 1
          })
        }
  
        return () => {
          socket.off()
        }
      } catch (e) {
        console.log(e)
      }
      
    }, [])

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
          {alert && <section>
            {alert.alertLvl === 1 && <p>Todo va bien</p>} {/*Mostrar svg despues */}
            {alert.alertLvl === 2 && <p>Todo va no tan bien</p>} {/*Mostrar svg despues */}
                        {alert.alertLvl === 1 && <p>Alerta</p>} {/*Mostrar svg despues */}
            <p>{alert.alertMsg}</p>  
          </section>}
        </section>
      </section>
    </main>
  )
}
