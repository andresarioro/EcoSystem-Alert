import dotenv from 'dotenv'

dotenv.config()

export const configPort = {
  path: 'COM5', // Asegúrate de que este sea el puerto correcto
  baudRate: 9600, // Configura según tu dispositivo
  autoOpen: false // Desactivamos apertura automática para manejar errores
}

export const {
  POSTGRESQL_KEY,
  CHAT_ID,
  BOT_TOKEN
} = process.env

export const PORT = 3000
