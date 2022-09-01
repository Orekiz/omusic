const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
  // 代理目标地址
  let target = ''

  if (req.url.startsWith('/api')) {
    target = 'https://neteasecloudmusic-api.oreki.love'
  }

  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/backend`
      // 例如 /backend/user/login 将被转发到 http://backend-api.com/user/login
      '^/api/': '/'
    }
  })(req, res)
}
