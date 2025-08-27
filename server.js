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

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173'
}))

// 🌐 Servir archivos estáticos desde carpeta 'public'
app.use(express.static('public'))


app.post('/get-data', async (req, res) => {
  const { sensorType } = await req.body

  try {
    const sensorResults = await SensorRepository.getSensorsDataWithoutPred(sensorType)
    console.log(sensorResults)
    return res.status(200).json({ res: sensorResults })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
})


app.post('/get-pred', async (req, res) => {
  const { sensorType } = await req.body

  try {
    const sensorResults = await SensorRepository.getSensorsData(sensorType)
    const predRes = await entrenarYPredecir(sensorType, sensorResults)
    return res.status(200).json({ res: predRes })
  } catch (e) {
    return res.status(500).json({ error: e.message })
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

  console.log(result)
  // suponiendo que dato es Sensor tal:
  //  202
  const sensor = result.split(':')[0]
  const value = Number(result.split(': ')[1])

  console.log(sensor, value)

  // si el valor es + de 1000 manda alerta
  // L: 1024
  // if (maxValueH > 400 && maxValueH < 800 ||
  //           maxValueC > 400 && maxValueC < 800 ||
  //           maxValueL > 50 && maxValueL < 100 ||
  //           maxValueV > 400 && maxValueV < 800 
  //       ) 

  if (sensor === 'H' > 400 && sensor === 'H' < 800 ||
      sensor === 'C' > 400 && sensor === 'C' < 800 ||
      sensor === 'L' > 50 && sensor === 'L' < 100 ||
      sensor === 'V' > 400 && sensor === 'V' < 800
  ) {
    const sensorName = (
      sensor === 'H' && 'Humedad' ?
      sensor === 'V' && 'Vibracion' :
      sensor === 'L' && 'Lluvia' &&
      sensor === 'C' && 'Cambio'
    )

    const textMessage = `Aviso 🚧: El Sensor ${sensorName} tiene señales sospechosas, recomendado visualizar la zona`
    
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
  } else if (sensor === 'H' > 800 ||
        sensor === 'C' > 800 ||
        sensor === 'L' > 100 ||
        sensor === 'V' > 800
  ) {
    const sensorName = (
      sensor === 'H' && 'Humedad' ?
      sensor === 'V' && 'Vibracion' :
      sensor === 'L' && 'Lluvia' &&
      sensor === 'C' && 'Cambio'
    )

    const textMessage = `Alerta ⚠❗: El Sensor ${sensorName} tiene señales alertantes, visualizar y revisar la zona urgentemente`
    
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
    const datosV = await SensorRepository.getSensorsData('V')
    const datosC = await SensorRepository.getSensorsData('C')
    const datosL = await SensorRepository.getSensorsData('L')

    if (!datosH || datosH.length < 23) {
      socket.emit('error', {
        message: 'No hay suficientes datos para hacer una prediccion en el sensor de Humedad'
      })
    }

    if (!datosV || datosV.length < 23) {
      socket.emit('error', {
        message: 'No hay suficientes datos para hacer una prediccion en la vibracion'
      })
    }

    if (!datosL || datosL.length < 23) {
      socket.emit('error', {
        message: 'No hay suficientes datos para hacer una prediccion en el sensor de Lluvias'
      })
    }

    if (!datosC || datosC.length < 23) {
      socket.emit('error', {
        message: 'No hay suficientes datos para hacer una prediccion en el cambio del giroscopio y acelerometro'
      })
    }

    const predH = await entrenarYPredecir('H', datosH)
    const predV = await entrenarYPredecir('V', datosV)
    const predL = await entrenarYPredecir('L', datosL)
    const predC = await entrenarYPredecir('C', datosC)

    io.emit('prediction', {
      predictionsH: predH,
      predictionsV: predV,
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
