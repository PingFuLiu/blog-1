const { 
  getBlogList,
  getBlogDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id

  // 博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // const listData = getBlogList(author, keyword)
    // return new SuccessModel(listData)
    const result = getBlogList(author, keyword)
    return result.then((listData) => {
      return new SuccessModel(listData)
    })
  }

  // 博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getBlogDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const author = 'zhangsan' //假数据
    req.body.author = author
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
  
  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result  = updateBlog(id, req.body)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const author = 'zhangsan'
    const result  = delBlog(id, author)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('删除博客失败')
      }
    })
  }
}

module.exports = handleBlogRouter