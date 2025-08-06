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
    { name: 'A', value: 0 },
    { name: 'G', value: 0 },
    { name: 'C', value: 0 },
    { name: 'L', value: 0 },
  ])

  useEffect(() => {
    const socket = io('http://localhost:3000')

    socket.on('serial-data', (data: { type: string, value: number }) => {
      // hay que mandar desde el backend los nombres de los sensores como H, A, G, V, LL

      setSnsData((prevData) => {
        const updatedData = [...prevData]
        const index = updatedData.findIndex(item => item.name === data.type) 

        if (index !== -1) {
          updatedData[index].value = data.value
        } else {
          updatedData.push({ name: data.type, value: data.value }) // Agrega un nuevo sensor si no existe
        }

        return updatedData
      })
    })

    return () => {
      socket.off()
    }
  }, [])

  return (
    <ResponsiveContainer width='100%' height={400} key={snsData.toString()}>
      <BarChart data={snsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#22c55e" /> {/* verde Tailwind: green-500 */}
      </BarChart>
    </ResponsiveContainer>
  )
}