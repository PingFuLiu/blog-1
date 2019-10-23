const { getBlogList } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const listData = getBlogList(author, keyword)
    return new SuccessModel(listData)
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    return {
      msg: '这是获取博客详情的接口'
    }
  }

  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      mag: '这是新增博客接口'
    }
  }
  
  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    return {
      mag: '这是更新博客接口'
    }
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    return {
      mag: '这是删除博客接口'
    }
  }
}

module.exports = handleBlogRouter