import tf from '@tensorflow/tfjs-node'
import { createModel } from './createModel.js'

// Datos de ejemplo (deberías traerlos desde tu BD)
const datosH = [52, 55, 54, 56, 53, 52, 51, 53, 54, 55, 56, 57, 58, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50]
const datosV = [52, 55, 54, 56, 53, 52, 51, 53, 54, 55, 56, 57, 58, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50]
const datosG = [52, 55, 54, 56, 53, 52, 51, 53, 54, 55, 56, 57, 58, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50]
const datosA = [52, 55, 54, 56, 53, 52, 51, 53, 54, 55, 56, 57, 58, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50]
const datosL = [52, 55, 54, 56, 53, 52, 51, 53, 54, 55, 56, 57, 58, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50]

const pasosEntrada = 20
const pasosSalida = 3

// Prepara los datos para entrenamiento
function prepararDatos (datos) {
  if (datos.length < pasosEntrada + pasosSalida) return 'No hay resultados suficientes para un pronostico'
  const inputs = []
  const outputs = []

  for (let i = 0; i < datos.length - pasosEntrada; i++) {
    const entrada = datos.slice(i, i + pasosEntrada)
    const salida = datos.slice(i + pasosEntrada, i + pasosEntrada + pasosSalida)
    inputs.push(entrada)
    outputs.push(salida)
  }

  return {
    x: tf.tensor2d(inputs),
    y: tf.tensor2d(outputs)
  }
}

// Entrena el modelo
async function entrenarModelo (datos) {
  const { x, y } = prepararDatos(datos)
  console.log(x, y)
  const modelo = createModel(pasosEntrada, pasosSalida)

  await modelo.fit(x, y, {
    epochs: 100,
    verbose: 0
  })

  console.log('Entrenamiento completo.')

  // Usamos los últimos 20 para predecir los siguientes 3
  const ultimaEntrada = datosH.slice(-pasosEntrada)
  console.log('Última entrada para predecir:', ultimaEntrada)
  const prediccion = modelo.predict(tf.tensor2d([ultimaEntrada]))
  prediccion.print() // Puedes convertirlo a array si quieres

  return prediccion.arraySync()[0]
}

async function entrenarYPredecir (nombre, datos) {
  try {
    const pred = await entrenarModelo(datos)
    console.log(`Predicción para ${nombre}:`, pred.map(v => v.toFixed(2)))
  } catch (err) {
    console.error(`Error al entrenar para ${nombre}:`, err.message)
  }
}

entrenarYPredecir('H', datosH)
entrenarYPredecir('V', datosV)
entrenarYPredecir('G', datosG)
entrenarYPredecir('A', datosA)
entrenarYPredecir('L', datosL)
