const getBlogList = (author, keyword) => {
  // 返回假数据 格式正确
  return [
    {
      id: 1,
      title: 'A',
      content: '这是A',
      createTime: 1571800630238
    },
    {
      id: 2,
      title: 'B',
      content: '这是B',
      createTime: 1571800646022
    }
  ]
}

module.exports = {
  getBlogList
}