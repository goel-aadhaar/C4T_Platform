/**
 * PM2 process definition for the EC2 deployment (Agreement §2.7).
 *
 *   pm2 start ecosystem.config.cjs --env production
 *   pm2 save && pm2 startup      # survive a reboot
 *   pm2 logs c4t-api
 *   pm2 reload c4t-api           # zero-downtime restart
 *
 * `pm2 reload` works with the graceful shutdown in src/index.ts: PM2 sends
 * SIGINT, the process stops accepting connections, drains in-flight requests,
 * closes the Prisma pool, then exits.
 */
// An unset OR empty PM2_INSTANCES both mean "use every core", which is why
// this is an explicit truthiness check rather than `??`.
const configuredInstances = process.env.PM2_INSTANCES?.trim()

module.exports = {
  apps: [
    {
      name: 'c4t-api',
      script: 'dist/index.js',
      cwd: __dirname,

      // Cluster mode across available cores. Safe here because the API holds no
      // in-process state — sessions live in Postgres, which is the point of
      // stateful-auth-in-the-database rather than in memory.
      instances: configuredInstances ? Number(configuredInstances) : 'max',
      exec_mode: 'cluster',

      env_production: {
        NODE_ENV: 'production',
      },

      // Give in-flight requests time to finish before SIGKILL.
      kill_timeout: 20000,
      // Wait for the process to signal readiness rather than assuming it.
      listen_timeout: 10000,
      wait_ready: false,

      max_memory_restart: '512M',
      autorestart: true,
      // If it crashes 10 times inside a minute, stop trying — something is
      // genuinely broken and a restart loop only hides it.
      max_restarts: 10,
      min_uptime: '60s',
      restart_delay: 4000,

      // stdout/stderr are JSON from Pino; the CloudWatch agent ships these.
      output: '/var/log/c4t-api/out.log',
      error: '/var/log/c4t-api/error.log',
      merge_logs: true,
      time: false,
    },
  ],
}
