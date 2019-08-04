devServer: {
  host: '0.0.0.0',
  port: 8080,
  proxy: {
    '/': {
      target: 'http://127.0.0.1:8080/',
      changeOrigin: true,
      pathRewrite: {
        '^/': ''
      }
      ws: false
    }
  }
}
