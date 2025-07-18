import express from 'express'
import http from 'node:http'
import { Server } from 'socket.io'
import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'

// 🖥️ Inicializar Express y servidor HTTP
const app = express()
const server = http.createServer(app)
const io = new Server(server)

// 🌐 Servir archivos estáticos desde carpeta 'public'
app.use(express.static('public'))

// 🛠️ CONFIGURACIÓN DEL PUERTO SERIAL (verifica COM y baudRate)
const port = new SerialPort({
  path: 'COM20',      // Asegúrate de que este sea el puerto correcto
  baudRate: 9600,   // Configura según tu dispositivo
  autoOpen: false     // Desactivamos apertura automática para manejar errores
})

// 📥 Parseador de líneas (por salto de línea)
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// 🔌 Intentar abrir el puerto COM
port.open(err => {
  if (err) {
    return console.error(`❌ Error al abrir el puerto: ${err.message}`);
  }
  console.log(`✅ Puerto ${port.path} abierto correctamente.`);
})

// 📤 Enviar datos recibidos al cliente vía WebSocket
parser.on('data', data => {
  console.log('📨 Dato recibido:', data.trim());
  io.emit('serial-data', data.trim());
})

// 🖥️ Iniciar el servidor
server.listen(3000, () => {
  console.log('🚀 Servidor corriendo en http://localhost:3000');
})

// 🛑 Manejo de errores del puerto
port.on('error', err => {
  console.error('⚠️ Error en el puerto:', err.message);
})