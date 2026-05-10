import { Pool } from "pg";

/**
 * Supabase PostgreSQL database connection.
 *
 * Uses the standard `pg` driver with a connection pool optimized for
 * Vercel serverless functions. Connects via Supabase's transaction
 * pooler (port 6543) to avoid connection exhaustion.
 *
 * Requires a DATABASE_URL environment variable:
 *   postgresql://postgres.[ref]:[pass]@aws-0-[region].pooler.supabase.com:6543/postgres?sslmode=require
 */

function getConnectionString(): string {
    const url = process.env.DATABASE_URL;
    if (!url) {
        throw new Error(
            "DATABASE_URL environment variable is not set. " +
            "Please add it to .env.local (local dev) or your Vercel project settings (production)."
        );
    }
    return url;
}

/**
 * Connection pool — shared across hot module reloads in development
 * and across invocations within the same serverless instance in production.
 *
 * Settings tuned for serverless:
 *   max: 5          — keep the pool small (Supabase pooler handles fan-out)
 *   idleTimeoutMillis: 20 000 — release idle clients after 20 s
 *   connectionTimeoutMillis: 10 000 — fail fast if unable to connect
 *   ssl.rejectUnauthorized: false — required for Supabase hosted Postgres
 */

// Prevent pool duplication during Next.js hot reloads in dev
const globalForPg = globalThis as unknown as { pool: Pool | undefined };

function getPool(): Pool {
    if (!globalForPg.pool) {
        globalForPg.pool = new Pool({
            connectionString: getConnectionString(),
            max: 5,
            idleTimeoutMillis: 20_000,
            connectionTimeoutMillis: 10_000,
            ssl: {
                rejectUnauthorized: false,
            },
        });

        // Log unexpected pool-level errors (e.g. broken idle connections)
        globalForPg.pool.on("error", (err) => {
            console.error("[DB Pool] Unexpected error on idle client:", err);
        });
    }
    return globalForPg.pool;
}

const pool = getPool();

/**
 * Parameterized query helper for dynamic SQL.
 * Usage:  const rows = await query("SELECT * FROM projects WHERE id = $1", [id]);
 *
 * Accepts standard PostgreSQL $1, $2, ... placeholders with a params array.
 * Returns the rows array directly (same interface as the previous Neon driver).
 */
export async function query<T = Record<string, unknown>>(
    text: string,
    params: unknown[] = []
): Promise<T[]> {
    try {
        const result = await pool.query(text, params);
        return result.rows as T[];
    } catch (error) {
        console.error("[DB Error]", { query: text, error });
        throw error;
    }
}

/**
 * Health-check helper — verifies the database connection is alive.
 * Usage:  const ok = await checkConnection();
 */
export async function checkConnection(): Promise<boolean> {
    try {
        await pool.query("SELECT 1");
        return true;
    } catch (error) {
        console.error("[DB] Connection check failed:", error);
        return false;
    }
}
