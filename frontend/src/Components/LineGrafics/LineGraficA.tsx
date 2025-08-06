import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchSnH } from '../../fetchs/fetchs';
import type { SensorData } from '../../types/types';

export function LineGraficA() {
  const [snData, setSnData] = useState< SensorData[] >([])

  useEffect(() => {
    const getSnData = async () => {
      const data = await fetchSnH()

      setSnData(() => {
        const updatedArr = data.map((value: number) => {
          return {
            valores: value
          }
        })

        return updatedArr
      })
    }

    getSnData()
  }, [])

  if (snData.length > 0) return (
    <ResponsiveContainer width="100%" height={400} key={snData.toString()}>
      <LineChart
        width={500}
        height={300}
        data={snData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="valores" stroke="#B22222" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
