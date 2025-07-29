import tf from '@tensorflow/tfjs-node'
import { createModel } from './createModel';

// Datos de ejemplo (deberías traerlos desde tu BD)
const datos = [52, 55, 54, 56, 53, 52, 51, 53, 54, 55, 56, 57, 58, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50];

const pasosEntrada = 20;
const pasosSalida = 3;

// Prepara los datos para entrenamiento
function prepararDatos(datos) {
  const inputs = []
  const outputs = []

  // si hay 21 datos el bucle se hace solo 1 vez ya que 21 - 20, la entrada seria datos.slice(0, 20) por lo cual esta correcto
  // pero en salida seria datos.slice(20, 23), y el index 23 no correspondiria a ningun elemento, por lo que para sacar el dato final podriamos hacer mejor
  // en caso de que sea 21 elementos, datos.slice(17, 20)

  for (let i = 0; i < datos.length - pasosEntrada; i++) {
    if (datos.length < 21) return "No hay resultados suficientes para un pronostico"

    const entrada = datos.slice(i, i + pasosEntrada);
    const salida = datos.slice(i + pasosEntrada, i + pasosEntrada + pasosSalida);
    inputs.push(entrada)
    outputs.push(salida)
  }

  return {
    x: tf.tensor2d(inputs),
    y: tf.tensor2d(outputs),
  };
}

// Entrena el modelo
async function entrenarModelo() {
  const { x, y } = prepararDatos(datos);
  const modelo = createModel(pasosEntrada, pasosSalida);

  console.log('Entrenando...');
  await modelo.fit(x, y, {
    epochs: 100,
    verbose: 0
  });
  console.log('Entrenamiento completo.');

  // Usamos los últimos 20 para predecir los siguientes 3
  const ultimaEntrada = datos.slice(-pasosEntrada);
  const prediccion = modelo.predict(tf.tensor2d([ultimaEntrada]));
  prediccion.print(); // Puedes convertirlo a array si quieres

  return prediccion.arraySync()[0];
}

entrenarModelo().then(res => {
  console.log('Predicción siguiente:', res.map(v => v.toFixed(2)));
});
