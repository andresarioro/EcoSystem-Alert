import express from 'express'
import http from 'node:http'
import { Server } from 'socket.io'
import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'
import { configPort, PORT } from './config.js'
import { SensorRepository } from './repository/repository.js'

// 🖥️ Inicializar Express y servidor HTTP
const app = express()
const server = http.createServer(app)
const io = new Server(server)

// 🌐 Servir archivos estáticos desde carpeta 'public'
app.use(express.static('public'))

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
  const value = Number(result.split(':')[1])

  // suponiendo que data.trim() sea Humedad: 51, o Acelerometro: 104, se escoge la primera letra del nombre del sensor
  await SensorRepository.saveData({ sensorType: sensor[0].toUpperCase(), sensorResult: value })
  io.emit('serial-data', {
    type: sensor[0].toUpperCase(),
    value
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
