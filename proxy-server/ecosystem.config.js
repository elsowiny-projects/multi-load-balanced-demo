module.exports = {
  apps: [
    {
      name: "proxy-server",
      script: "index.js",
      exec_mode: "fork",
      instances: 1,
      watch: false,
      env: { PORT: 3002},
      ignore_watch: ["node_modules", "logs"],
    },
  ],
};
