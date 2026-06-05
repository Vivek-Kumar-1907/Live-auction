import {Pool} from 'pg';

const globalPg = globalThis as unknown as {pgPool: Pool};

const pool = globalPg.pgPool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

globalPg.pgPool = pool;

export default pool;