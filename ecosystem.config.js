module.exports = {
  apps: [{
    name: 'brighten-bangladesh-backend',
    script: './dist/main.js',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '200M',
    env: {
      NODE_ENV: 'production',
      APP_URL: 'https://brightenbangladesh.com',
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    merge_logs: true,
    kill_timeout: 5000,
    listen_timeout: 10000,
    max_restarts: 10,
    min_uptime: '10s',
    restart_delay: 4000,
  }]
};
