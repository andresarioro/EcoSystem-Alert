import express from 'express'
import http from 'node:http'
import { Server } from 'socket.io'
import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'
import { configPort, PORT } from './config.js'

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
parser.on('data', data => {
  const result = data.trim()
  console.log('📨 Dato recibido:', result)
  io.emit('serial-data', result)
})

// 🖥️ Iniciar el servidor
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})

// 🛑 Manejo de errores del puerto
port.on('error', err => {
  console.error('⚠️ Error en el puerto:', err.message)
})
