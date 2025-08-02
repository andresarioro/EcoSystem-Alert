import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// esto traerselo desde db
const data = [
  { name: 'H', value: 200 },
  { name: 'A', value: 275 },
  { name: 'G', value: 250 },
  { name: 'V', value: 225 },
  { name: 'LL', value: 300 }
]

export async function GreenGrafic8hrs () {
  return (
    <ResponsiveContainer width='100%' height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Bar dataKey='value' fill='#22c55e' /> {/* verde Tailwind: green-500 */}
      </BarChart>
    </ResponsiveContainer>
  )
}
