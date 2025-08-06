import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { io } from 'socket.io-client'
import type { PredictionData } from '../../types/types'

// esto traerselo desde db
const data = [
  { name: 'H', value1: 0, value2: 0, value3: 0 },
  { name: 'A', value1: 0, value2: 0, value3: 0 },
  { name: 'G', value1: 0, value2: 0, value3: 0 },
  // { name: 'V', value1: 0, value2: 0, value3: 0 },
  { name: 'L', value1: 0, value2: 0, value3: 0 }
]

export function GreenGrafic8hrs () {
  const [dataPredictions, setDataPredictions] = useState(data)

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
          { name: 'A', value1: predictionData.predictionsA[0], value2: predictionData.predictionsA[1], value3: predictionData.predictionsA[2] },
          { name: 'G', value1: predictionData.predictionsG[0], value2: predictionData.predictionsG[1], value3: predictionData.predictionsG[2] },
          { name: 'L', value1: predictionData.predictionsL[0], value2: predictionData.predictionsL[1], value3: predictionData.predictionsL[2] },
        ])
      })

      

      return () => {
        socket.off()
      }
    } catch (e) {
      console.log(e)
    }
    
  }, [])

  console.log(dataPredictions)

  return (
    <ResponsiveContainer width='100%' height={400} key={dataPredictions.toString()}>
      <BarChart data={dataPredictions} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value1" fill="#16e38e" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        <Bar dataKey="value2" fill="#16e62e" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        <Bar dataKey="value3" fill="#18e90e" activeBar={<Rectangle fill="pink" stroke="blue" />} />
      </BarChart>
    </ResponsiveContainer>
  )
}
