import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.{test,spec}.ts', 'src/**/*.{test,spec}.ts'],
    /**
     * Integration tests share one database, so parallel files would race on
     * the same rows. A single fork also keeps the connection count low, which
     * matters against a serverless Postgres.
     */
    pool: 'forks',
    poolOptions: { forks: { singleFork: true } },
    setupFiles: ['tests/setup.ts'],
    /**
     * Generous, because a suspended Neon endpoint pays a cold start of a few
     * seconds on the first query. Tests against a warm database finish in
     * well under a second.
     */
    testTimeout: 30_000,
    hookTimeout: 60_000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: 'coverage',
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.d.ts',
        'src/index.ts',
        'src/types/**',
        // Config is validated at boot; a test would only re-assert Zod.
        'src/config/env.ts',
      ],
      thresholds: {
        // Deliberately low to start. Raise these as the suite fills in —
        // a threshold nobody can meet just gets deleted.
        lines: 0,
        functions: 0,
        branches: 0,
        statements: 0,
      },
    },
  },
})
