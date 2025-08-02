import tf from '@tensorflow/tfjs-node'

export function createModel (inputSize, outputSize) {
  const model = tf.sequential()
  model.add(tf.layers.dense({ inputShape: [inputSize], units: 64, activation: 'relu' }))
  model.add(tf.layers.dense({ units: 32, activation: 'relu' }))
  model.add(tf.layers.dense({ units: outputSize }))
  model.compile({ loss: 'meanSquaredError', optimizer: 'adam' })
  return model
}
