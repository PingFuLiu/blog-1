const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res) => {

  // 设置返回类型 JSON
  res.setHeader('Content-type', 'application/json')

  const url = req.url
  req.path = url.split('?')[0]

  // 处理query
  req.query = querystring.parse(url.split('?')[1])

  // 处理博客路由
  const blogData  = handleBlogRouter(req, res)
  if (blogData) {
    res.end(
      JSON.stringify(blogData)
    )
    return
  }

  // 处理用户路由
  const userData = handleUserRouter(req, res)
  if (userData) {
    res.end(
      JSON.stringify(userData)
    )
    return
  }

  //404
  res.writeHead(404, {'Content-type': 'text/plain'})
  res.write('404 Not Found\n')
  res.end()

}

module.exports = serverHandle