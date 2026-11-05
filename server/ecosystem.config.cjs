// PM2 process file:  pm2 start ecosystem.config.cjs && pm2 save
// Secrets live in server/.env (loaded by dotenv). UPLOAD_DIR must point at persistent storage.
module.exports = {
  apps: [
    {
      name: "sanjus-api",
      script: "index.js",
      cwd: __dirname,
      instances: 1, // image-quota locking is per-process; keep a single instance
      exec_mode: "fork",
      max_memory_restart: "600M",
      env: { NODE_ENV: "production" },
      kill_timeout: 5000,
    },
  ],
};

