import { neon } from '@neondatabase/serverless'
import { POSTGRESQL_KEY } from '../config.js'

const sql = neon(POSTGRESQL_KEY)

await sql`CREATE TABLE IF NOT EXISTS datos (
    result_id SERIAL PRIMARY KEY,
    sensor_type VARCHAR(2),
    sensor_result DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);`

// await sql`DROP TABLE IF EXISTS datos;`

console.log(await sql`SELECT * FROM datos`)