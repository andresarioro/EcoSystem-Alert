import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchDataSensors } from '../../fetchs/fetchs';
import { useEffect, useState } from 'react';
import type { SensorData } from '../../types/types';

export function LineGraficC() {
  const [snData, setSnData] = useState< SensorData[] >([])
  
    useEffect(() => {
      const getSnData = async () => {
        const data = await fetchDataSensors('C')
  
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

  return (
    <ResponsiveContainer width="100%" height={400}>
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
        <Line type="monotone" dataKey="valores" stroke="#15e62e" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}