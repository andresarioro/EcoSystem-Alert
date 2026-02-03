import express from 'express'
import http from 'node:http'
import cors from 'cors'
import { Server } from 'socket.io'
import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'
import { BOT_TOKEN, CHAT_ID, configPort, PORT } from './config.js'
import { SensorRepository } from './repository/repository.js'
import { entrenarYPredecir } from './trainModel.js'
import EventEmitter from 'node:events'

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

app.get('/get-proms', async (req, res) => {
  try {
    const datosH = (await SensorRepository.getSensorsData('H')).map(Number)
    const datosV = (await SensorRepository.getSensorsData('V')).map(Number)
    const datosC = (await SensorRepository.getSensorsData('C')).map(Number)
    const datosL = (await SensorRepository.getSensorsData('L')).map(Number)

    const promH = datosH.reduce((ant, curr) => ant + curr, 0) / datosH.length
    const promV = datosV.reduce((ant, curr) => ant + curr, 0) / datosV.length
    const promC = datosC.reduce((ant, curr) => ant + curr, 0) / datosC.length
    const promL = datosL.reduce((ant, curr) => ant + curr, 0) / datosL.length

    return res.status(200).json({
      promH,
      promV,
      promC,
      promL
    }) 
  } catch (e) {
    res.status(500).json({ error: e.message })
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

let type = ''
let valueSensor = 0

// 📤 Enviar datos recibidos al cliente vía WebSocket
parser.on('data', async (data) => {
  const result = data.trim()
  // suponiendo que dato es Sensor tal:
  //  202

  console.log(result)
  const sensor = result ? result.split(': ')[0] : 'N'
  const value = result ? Number(result.split(': ')[1]) : 0

  const firstLetter = sensor[0].toUpperCase()

  console.log((firstLetter === 'H' > 400 && firstLetter === 'H' < 800))

  // si el valor es + de 1000 manda alerta
  // L: 1024
  // if (maxValueH > 400 && maxValueH < 800 ||
  //           maxValueC > 400 && maxValueC < 800 ||
  //           maxValueL > 50 && maxValueL < 100 ||
  //           maxValueV > 400 && maxValueV < 800 
  //       ) 

  if (firstLetter === 'H' > 400 && firstLetter === 'H' < 800 ||
      firstLetter === 'C' > 400 && firstLetter === 'C' < 800 ||
      firstLetter === 'L' > 50 && firstLetter === 'L' < 100 ||
      firstLetter === 'V' > 400 && firstLetter === 'V' < 800
  ) {
    console.log('a')
    const sensorName = (
      firstLetter === 'H' && 'Humedad' ?
      firstLetter === 'V' && 'Vibracion' :
      firstLetter === 'L' && 'Lluvia' &&
      firstLetter === 'C' && 'Cambio'
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

    console.log('mensaje enviado')

    if (!tgRes.ok) throw new Error('Error al enviar el mensaje a telegram')
  } else if (firstLetter === 'H' > 800 ||
        firstLetter === 'C' > 800 ||
        firstLetter === 'L' > 100 ||
        firstLetter === 'V' > 800
  ) {
    const sensorName = (
      firstLetter === 'H' && 'Humedad' ?
      firstLetter === 'V' && 'Vibracion' :
      firstLetter === 'L' && 'Lluvia' &&
      firstLetter === 'C' && 'Cambio'
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
  await SensorRepository.saveData({ sensorType: firstLetter.toUpperCase(), sensorResult: value })
  
  
  io.emit('serial-data', {
    type: firstLetter.toUpperCase(),
    value
  })
    
})

EventEmitter.defaultMaxListeners = 1000

io.on('connection', async (socket) => {
  socket.on('serial-data', async () => {
    io.emit('serial-data' ,{
      type,
      value: valueSensor
    })
  })

  const getPredsData = async () => {
    const datosH = (await SensorRepository.getSensorsData('H')).map(Number)
    const datosV = (await SensorRepository.getSensorsData('V')).map(Number)
    const datosC = (await SensorRepository.getSensorsData('C')).map(Number)
    const datosL = (await SensorRepository.getSensorsData('L')).map(Number)

    if (!datosH || datosH.length < 23) {
      io.emit('error', {
        message: 'No hay suficientes datos para hacer una prediccion en el sensor de Humedad'
      })
      return
    }

    if (!datosV || datosV.length < 23) {
      io.emit('error', {
        message: 'No hay suficientes datos para hacer una prediccion en la vibracion'
      })
      return
    }

    if (!datosL || datosL.length < 23) {
      io.emit('error', {
        message: 'No hay suficientes datos para hacer una prediccion en el sensor de Lluvias'
      })
      return
    }

    if (!datosC || datosC.length < 23) {
      io.emit('error', {
        message: 'No hay suficientes datos para hacer una prediccion en el cambio del giroscopio y acelerometro'
      })
      return

      
    }

    const predH = await entrenarYPredecir('H', datosH)
    const predV = await entrenarYPredecir('V', datosV)
    const predL = await entrenarYPredecir('L', datosL)
    const predC = await entrenarYPredecir('C', datosC)

    console.log(predV)

    console.log({
      predictionsH: predH,
      predictionsV: predV,
      predictionsL: predL,
      predictionsC: predC     
    })

    return {
      predictionsH: predH,
      predictionsV: predV,
      predictionsL: predL,
      predictionsC: predC     
    }
  }

  const resultPreds = await getPredsData()

  io.emit('prediction', resultPreds) 
})


// 🖥️ Iniciar el servidor
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})

// 🛑 Manejo de errores del puerto
port.on('error', err => {
  console.error('⚠️ Error en el puerto:', err.message)
})
