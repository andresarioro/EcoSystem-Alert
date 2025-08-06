import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.NEON_DATABASE_KEY)

await sql`CREATE TABLE IF NOT EXISTS datos (
    result_id SERIAL PRIMARY KEY,
    sensor_type VARCHAR(2),
    sensor_result INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);`
