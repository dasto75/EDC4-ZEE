module.exports = {
  apps: [
    {
      name: 'my-app',
      script: './server.js',
      instances: 3,
      exec_mode: 'cluster',
      max_memory_restart: '200M',
      error_file: './logs/err.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
