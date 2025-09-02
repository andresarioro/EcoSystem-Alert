import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import { io } from 'socket.io-client'


export default function GreenGrafic() {
  const [snsData, setSnsData] = useState([
    { name: 'H', value: 0 },
    { name: 'V', value: 0 },
    { name: 'C', value: 0 },
    { name: 'L', value: 0 },
  ])

  useEffect(() => {
    const socket = io('http://localhost:3000')

    socket.emit('serial-data', () => {
      console.log('b')
    })

    socket.on('serial-data', (data: { type: string, value: number }) => {
      setSnsData((prevData) => {
        return prevData.map((item) => {
          if (item.name === data.type) return { ...item, value: data.value }
          
          return item
        })
      })
    })

    return () => {
      socket.off()
    }
  }, [])

  return (
    <section className='w-full h-full flex flex-col justify-center items-center gap-5'>
      <ResponsiveContainer width='100%' height={250} key={snsData.toString()}>
        <BarChart data={[snsData[0]]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#22c55e" /> {/* verde Tailwind: green-500 */}
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width='100%' height={250} key={snsData.toString()}>
        <BarChart data={[snsData[1]]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#22c55e" /> {/* verde Tailwind: green-500 */}
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width='100%' height={250} key={snsData.toString()}>
        <BarChart data={[snsData[2]]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#22c55e" /> {/* verde Tailwind: green-500 */}
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width='100%' height={250} key={snsData.toString()}>
        <BarChart data={[snsData[3]]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#22c55e" /> {/* verde Tailwind: green-500 */}
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}