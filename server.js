import express from 'express'
import http from 'node:http'
import cors from 'cors'
import { Server } from 'socket.io'
import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'
import { BOT_TOKEN, CHAT_ID, configPort, PORT } from './config.js'
import { SensorRepository } from './repository/repository.js'
import { entrenarYPredecir } from './trainModel.js'

// 🖥️ Inicializar Express y servidor HTTP
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
})

app.use(cors({
  origin: 'http://localhost:5173'
}))

// 🌐 Servir archivos estáticos desde carpeta 'public'
app.use(express.static('public'))

app.get('/datos-h', async (req, res) => {
  try {
    const results = await SensorRepository.getSensorsData('H')
    return res.status(200).json({ res: results })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
})

app.get('/datos-a', async (req, res) => {
  try {
    const results = await SensorRepository.getSensorsData('A')
    return res.status(200).json({ res: results })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
})

app.get('/datos-c', async (req, res) => {
  try {
    const results = await SensorRepository.getSensorsData('C')
    return res.status(200).json({ res: results })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
})

app.get('/datos-g', async (req, res) => {
  try {
    const results = await SensorRepository.getSensorsData('G')
    return res.status(200).json({ res: results })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
})

app.get('/datos-l', async (req, res) => {
  try {
    const results = await SensorRepository.getSensorsData('L')
    return res.status(200).json({ res: results })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
})

app.get('/pred-h', async (req, res) => {
  try {
    const values = await SensorRepository.getSensorsData('H')
    const predRes = await entrenarYPredecir('H', values)
    return res.status(200).json({ res: predRes })
  } catch (e) {
    return res.status(500).json({ err: e.message })
  }
})

app.get('/pred-a', async (req, res) => {
  try {
    const values = await SensorRepository.getSensorsData('A')
    const predRes = await entrenarYPredecir('A', values)
    return res.status(200).json({ res: predRes })
  } catch (e) {
    return res.status(500).json({ err: e.message })
  }
})

app.get('/pred-g', async (req, res) => {
  try {
    const values = await SensorRepository.getSensorsData('G')
    const predRes = await entrenarYPredecir('G', values)
    return res.status(200).json({ res: predRes })
  } catch (e) {
    return res.status(500).json({ err: e.message })
  }
})

app.get('/pred-c', async (req, res) => {
  try {
    const values = await SensorRepository.getSensorsData('C')
    const predRes = await entrenarYPredecir('C', values)
    return res.status(200).json({ res: predRes })
  } catch (e) {
    return res.status(500).json({ err: e.message })
  }
})

app.get('/pred-l', async (req, res) => {
  try {
    const values = await SensorRepository.getSensorsData('L')
    const predRes = await entrenarYPredecir('L', values)
    return res.status(200).json({ res: predRes })
  } catch (e) {
    return res.status(500).json({ err: e.message })
  }
})

// 🛠️ CONFIGURACIÓN DEL PUERTO SERIAL (verifica COM y baudRate)
const port = new SerialPort(configPort)

// 📥 Parseador de líneas (por salto de línea)
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))

// 🔌 Intentar abrir el puerto COM
port.open(err => {
  if (err) {
    return console.error(`❌ Error al abrir el puerto: ${err.message}`)
  }
  console.log(`✅ Puerto ${port.path} abierto correctamente.`)
})

// 📤 Enviar datos recibidos al cliente vía WebSocket
parser.on('data', async (data) => {
  const result = data.trim()
  // suponiendo que dato es Sensor tal: 202
  const sensor = result.split(':')[0]
  const value = Number(result.split(': ')[1])

  // si el valor es + de 1000 manda alerta
  // L: 1024
  if (value > 1000) {
    const sensorName = (
      sensor === 'H' && 'Humedad' ?
      sensor === 'A' && 'Aceleracion' :
      sensor === 'G' && 'Giroscopio' ?
      sensor === 'L' && 'Lluvia' :
      sensor === 'C' && 'Cambio'
    )

    const textMessage = `El Sensor ${sensorName} tiene señales preocupantes, visualizen la zona`
    
    const tgRes = fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: textMessage
      })
    })

    if (!tgRes.ok) throw new Error('Error al enviar el mensaje a telegram')
  }

  // suponiendo que data.trim() sea Humedad: 51, o Acelerometro: 104, se escoge la primera letra del nombre del sensor
  await SensorRepository.saveData({ sensorType: sensor[0].toUpperCase(), sensorResult: value })
  io.emit('serial-data', {
    type: sensor[0].toUpperCase(),
    value
  })
})

io.on('connection', async (socket) => {
  socket.on('prediction', async () => {
    const datosH = await SensorRepository.getSensorsData('H')
    // const datosV = await SensorRepository.getSensorsData('V')
    const datosG = await SensorRepository.getSensorsData('G')
    const datosA = await SensorRepository.getSensorsData('A')
    const datosC = await SensorRepository.getSensorsData('C')
    const datosL = await SensorRepository.getSensorsData('L')

    if (!datosH || datosH.length < 23) {
      socket.emit('error', {
        message: 'No hay suficientes datos para hacer una prediccion en el sensor de Humedad'
      })
    }

    if (!datosG || datosG.length < 23) {
      socket.emit('error', {
        message: 'No hay suficientes datos para hacer una prediccion en el Giroscopio'
      })
    }

    if (!datosA || datosA.length < 23) {
      socket.emit('error', {
        message: 'No hay suficientes datos para hacer una prediccion en el Acelerometro'
      })
    }

    if (!datosL || datosL.length < 23) {
      socket.emit('error', {
        message: 'No hay suficientes datos para hacer una prediccion en el sensor de Lluvias'
      })
    }

    if (!datosC || datosC.length < 23) {
      socket.emit('error', {
        message: 'No hay suficientes datos para hacer una prediccion en el cambio promedio'
      })
    }

    const predH = await entrenarYPredecir('H', datosH)
    const predG = await entrenarYPredecir('G', datosG)
    const predA = await entrenarYPredecir('A', datosA)
    const predL = await entrenarYPredecir('L', datosL)
    const predC = await entrenarYPredecir('C', datosC)

    io.emit('prediction', {
      predictionsH: predH,
      predictionsG: predG,
      predictionsA: predA,
      predictionsL: predL,
      predictionsC: predC     
    })
  })
})


// 🖥️ Iniciar el servidor
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})

// 🛑 Manejo de errores del puerto
port.on('error', err => {
  console.error('⚠️ Error en el puerto:', err.message)
})
