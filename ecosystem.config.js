module.exports = {
  apps: [
    {
      name: 'mall-login-main',
      exec_mode: 'cluster',
      // script: './node_modules/nuxt/bin/nuxt.mjs', // 애플리케이션의 진입점 파일명
      script: 'npm',
      cwd: '/var/www/html/mall-login-main',
      instances: 1, // 실행할 프로세스의 인스턴스 수
      autorestart: true, // 애플리케이션의 자동 재시작 여부
      args: 'start',
    },
  ],
  node_args: '--experimental-modules',
};
