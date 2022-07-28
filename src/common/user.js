import request from '../request/request.js'

export function getTableData(page, limit) {
  return request('post') ({
    url: '',
    data: {page, limit}
  }).then(res => {
    if(res.status === 200) {
      return res.data
    } 
    return Promise.reject(res.message)
  }).catch(() => ({
    data: [
      {
        name: '张三',
        age: 18,
        sex: '男',
        birth: '2000-12-12',
        addr: '河南省郑州市金水区'
      },
      {
        name: '张三',
        age: 18,
        sex: '男',
        birth: '2000-12-12',
        addr: '河南省郑州市金水区'
      } 
    ],
    total: 2
  }))
}

//更新表格
export function updateTable(type, data) {
  return request('post') ({
    url: type === 'edit' ? "/user/edit" : "/user/add",
    data: {...data}
  })
}

//搜索表格数据
export function searchTable(name) {
  return request('post') ({
    url: '',
    data: {name}
  }).then(res => {
    if(res.status === 200) {
      return
    } 
    return Promise.reject(res.message)
  })
}

//删除表格某一行数据
export function deleteTableItem(id) {
  return request('post') ({
    url: '',
    data: {id}
  }).then(res => {
    if(res.status === 200) {
      return
    }
    return Promise.reject(res.message)
  })
}