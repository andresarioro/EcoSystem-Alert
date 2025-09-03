import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { fetchProms } from '../../fetchs/fetchs'

// esto traerselo desde db
const data = [
  { name: 'H', value: 0, },
  { name: 'V', value: 0, },
  { name: 'C', value: 0, },
  { name: 'L', value: 0 }
]

export function GreenGrafic8hrs () {
  const [dataPredictions, setDataPredictions] = useState(data)

  useEffect(() => {
    const getProms = async () => {
      const proms = await fetchProms()

      setDataPredictions([
        {
          name: 'H', 
          value: proms.promH,
        }, {
          name: 'V',
          value: proms.promV
        }, {
          name: 'C',
          value: proms.promC
        }, {
          name: 'L',
          value: proms.promL
        }
      ])
    }

    getProms()
    
    
  }, [])

  return (
    <section className='w-full h-full flex flex-col justify-center items-center gap-5'>
      <ResponsiveContainer width='100%' height={250} key={dataPredictions.toString() + 'a'}>
        <BarChart data={[dataPredictions[0]]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#1bf16aff" /> {/* verde Tailwind: green-500 */}
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width='100%' height={250} key={dataPredictions.toString() + 'b'}>
        <BarChart data={[dataPredictions[1]]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#1bf16aff" /> {/* verde Tailwind: green-500 */}
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width='100%' height={250} key={dataPredictions.toString() + 'c'}>
        <BarChart data={[dataPredictions[2]]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#1bf16aff" /> {/* verde Tailwind: green-500 */}
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width='100%' height={250} key={dataPredictions.toString() + 'd'}>
        <BarChart data={[dataPredictions[3]]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#1bf16aff" /> {/* verde Tailwind: green-500 */}
        </BarChart>
      </ResponsiveContainer>
      <aside>
        <p className='text-center font-bold text-sm mb-3'>Las predicciones pueden demorar entre 1 o 2 minutos para obtenerse</p>
      </aside>
    </section>
      
  )
}
