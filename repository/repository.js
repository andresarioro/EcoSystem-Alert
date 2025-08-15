import { neon } from '@neondatabase/serverless'
import { POSTGRESQL_KEY } from '../config.js'

const sql = neon(POSTGRESQL_KEY)

export class SensorRepository {
  static async saveData ({ sensorType, sensorResult }) {
    await sql`INSERT INTO datos (sensor_type, sensor_result) VALUES (${sensorType}, ${sensorResult})`
  }

  static async getSensorsData (sensorType) {
    if (!sensorType) return []

    const result = await sql`SELECT sensor_result FROM datos WHERE sensor_type = ${sensorType}
    AND created_at >= NOW() - INTERVAL '8 hours';`

    const sensorValues = result.map(data => data.sensor_result)

    return sensorValues
  }
}
