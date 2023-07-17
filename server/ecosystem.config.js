module.exports = {
  apps: [
    {
      script: 'server.js',
      exec_mode: 'fork',
      name: 'worker 1 ',
      env: { PORT: 4500, SERVICE_NAME: 'worker 1' },
      watch: true,
      ignore_watch: ['node_modules', 'logs']
    },
    {
      script: 'server.js',
      exec_mode: 'fork',
      name: 'worker 2',
      env: { PORT: 4501, SERVICE_NAME: 'worker 2' },
      watch: true,
      ignore_watch: ['node_modules', 'logs']
    }
  ]
}
