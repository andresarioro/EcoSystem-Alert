import { useNavigate } from 'react-router-dom'
import GreenGrafic from './grafics/GreenGrafic'
import { GreenGrafic8hrs } from './grafics/GreenGrafic8hrs'
import { useEffect, useState } from 'react'
import type { alerts } from '../types/types'
import { CheckIcon, ExclamationTriangleIcon, MinusIcon } from '@heroicons/react/24/outline'
import { fetchPreds } from '../fetchs/fetchs'

export function Dashboard () {
  const navigate = useNavigate()

  const [alert, setAlert] = useState<alerts>()
  const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      setLoading(true)
      try {
        const getPredsAndAnalize = async () => {
          const predH = await fetchPreds('H')
          const predV = await fetchPreds('V')
          const predC = await fetchPreds('C')
          const predL = await fetchPreds('L')

          if (!predH || !predV || !predC || !predL) {
            setAlert({ 
              alertMsg: 'Todo esta bien en los sensores',
              alertLvl: 1
            })

            setLoading(false)

            return
        }

          const preds = [
            {
              value1: predH[0],
              value2: predH[1],
              value3: predH[2]
            }, {
              value1: predV[0],
              value2: predV[1],
              value3: predV[2]
            }, {
              value1: predC[0],
              value2: predC[1],
              value3: predC[2]
            }, {
              value1: predL[0],
              value2: predL[1],
              value3: predL[2]
            }
          ]

          

          const maxValueC = Math.max(preds[0].value1, preds[0].value2, preds[0].value3)
          const maxValueH = Math.max(preds[1].value1, preds[1].value2, preds[1].value3)
          const maxValueV = Math.max(preds[2].value1, preds[2].value2, preds[2].value3)
          const maxValueL = Math.max(preds[3].value1, preds[3].value2, preds[3].value3)

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
        }

        getPredsAndAnalize()
        setLoading(false)
      } catch (e) {
        console.log(e)
        setLoading(false)
      }
    }, [])

    console.log(alert, loading)

  return (
    <main className='text-black font-montserrat flex flex-col items-center justify-center min-h-screen w-full bg-gray-200'>
      <section className='overflow-y-auto overflow-x-hidden scrollbar-custom box-shadow-custom flex flex-col items-center gap-10 bg-white w-85/100 md:w-70/100 h-[600px] rounded-xl'>
      <header className='flex w-full justify-between items-center px-2'>
       <div className='max-w-sm p-2'>
          <img src='/orth.svg' alt='Marina-Orth-logo' className='w-20 md:w-40 h-auto object-contain rounded' />
        </div>
        <h1 className='text-lg md:text-3xl text-center font-bold mt-5'>Ecosystem Dashboard</h1>
        <div className='max-w-sm'>
          <img src='/Ecosystem-logo.svg' alt='Ecosystem-logo' className='w-20 md:w-40 h-auto object-contain rounded' />
        </div>
      </header>
        <section className='overflow-y-auto overflow-x-hidden scrollbar-custom flex flex-col items-center gap-10 bg-white w-85/100 md:w-70/100 h-full rounded-xl'>
          <section className='w-full flex gap-10 md:flex-row flex-col items-center justify-center p-5'>
            <section className='w-full md:w-1/2 xl:h-[450px]'>
              <h1 className='text-center font-bold text-xl'>Resultados en tiempo real</h1>
              <section className='flex flex-col items-center justify-center'>
                <GreenGrafic />
              </section>
            </section>
            <section className='w-full md:w-1/2 xl:h-[450px]'>
              <h1 className='text-center font-bold text-xl'>Ultimas 8 horas</h1>
              <section className='flex flex-col items-center justify-center'>
                <GreenGrafic8hrs />
              </section>
              <button onClick={() => navigate('/grafics')} className='w-full text-end underline text-[var(--primary-color)] cursor-pointer'>Ver mas resultados</button>
            </section>
          </section>
        </section>
        <section className='flex flex-col items-center justify-center mt-5'>
          <div>
            <h2 className='text-2xl text-center font-bold'>Señales de alerta</h2>
            <p className='text-center'>Aquí se mostrarán las señales de alerta detectadas por el sistema.</p>
          </div>
            {!alert &&
              <div className='flex flex-col items-center justify-center mt-3 pb-5'>
                  <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                <p className='text-center'>Cargando...</p>
              </div> 
            } 
          {alert && !loading && <section>
            {alert.alertLvl === 1 &&
              <div className='flex flex-col items-center justify-center mt-3 pb-5'>
                <div className='bg-[var(--primary-color)] p-3 rounded-full'>
                  <CheckIcon className='w-7 h-7 bg-[var(--primary-color)]' />
                </div>
                <p className='text-center'>Todo va bien</p>
              </div> 
            } {/*Mostrar svg despues */}
            {alert.alertLvl === 2 && 
              <div className='flex flex-col items-center justify-center gap-5 mt-3 pb-5'>
                <MinusIcon className='w-7 h-7'/>
                <p className='text-center'>Todo va no tan bien</p>
              </div>
            } {/*Mostrar svg despues */}
            {alert.alertLvl === 3 && 
              <div className='flex flex-col items-center justify-center gap-5 mt-3 pb-5'>
                <ExclamationTriangleIcon className='w-7 h-7'/>
                <p className='text-center'>Alerta</p>
              </div>
            } {/*Mostrar svg despues */}
          </section>}
        </section>
      </section>
    </main>
  )
}
