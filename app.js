const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    if (req.method === 'POST') {
      let postData = ''
      req.on('data', chunk => {
        postData += chunk.toString()
      })
      req.on('end', () => {
        if (!postData) {
          resolve({})
          return
        }
        resolve(
          JSON.parse(postData)
        )
      })
    }
    
  })
}

const serverHandle = (req, res) => {

  // 设置返回类型 JSON
  res.setHeader('Content-type', 'application/json')

  const url = req.url
  req.path = url.split('?')[0]

  // 处理query
  req.query = querystring.parse(url.split('?')[1])

  getPostData(req).then((postData) => {
    req.body = postData

    // 处理博客路由
    // const blogData  = handleBlogRouter(req, res)
    // if (blogData) {
    //   res.end(
    //     JSON.stringify(blogData)
    //   )
    //   return
    // }

    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }
    

    // 处理用户路由
    // const userData = handleUserRouter(req, res)
    // if (userData) {
    //   res.end(
    //     JSON.stringify(userData)
    //   )
    //   return
    // }
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        res.end(
          JSON.stringify(userData)
        )
      })
      return
    }

    //404
    res.writeHead(404, {'Content-type': 'text/plain'})
    res.write('404 Not Found\n')
    res.end()
  })
}

module.exports = serverHandle