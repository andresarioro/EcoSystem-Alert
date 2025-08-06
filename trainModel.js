import tf from '@tensorflow/tfjs-node'
import { createModel } from './createModel.js'


const pasosEntrada = 20
const pasosSalida = 3

// Prepara los datos para entrenamiento
function prepararDatos (datos) {
  if (datos.length < pasosEntrada + pasosSalida) return 'No hay resultados suficientes para un pronostico'
  const inputs = []
  const outputs = []

  for (let i = 0; i < datos.length - (pasosEntrada + pasosSalida); i++) {
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
  const modelo = createModel(pasosEntrada, pasosSalida)

  await modelo.fit(x, y, {
    epochs: 100,
    verbose: 0
  })

  console.log(datos)
  console.log('Entrenamiento completo.')

  // Usamos los últimos 20 para predecir los siguientes 3
  const ultimaEntrada = datos.slice(-pasosEntrada)
  const prediccion = modelo.predict(tf.tensor2d([ultimaEntrada]))
  prediccion.print() // Puedes convertirlo a array si quieres

  return prediccion.arraySync()[0]
}

export async function entrenarYPredecir (nombre, datos) {
  try {
    const pred = await entrenarModelo(datos)
    // se ve como si fuera un array dentro de otro ([[]]), pero en realidad se los indices se maneja como si fuera un array normal
    return pred.map(v => v.toFixed(2))
  } catch (err) {
    console.error(`Error al entrenar para ${nombre}:`, err.message)
  }
}
