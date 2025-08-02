import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.NEON_DATABASE_KEY)

export class SensorRepository {
  static async saveData ({ sensorType, sensorResult }) {
    await sql`INSERT INTO datos (sensor_type, sensor_result) VALUES (${sensorType}, ${sensorResult})`
  }
}
