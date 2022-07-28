import request from '../request/request'

export  function getTableData() {
  return request('post') ({
    url: '',
    data: {}
  }).then(res => {
    if(res.status === 200) {
      return res.data
    } 
    return Promise.reject(res.message || '获取表格数据失败')
  }).catch(() => [
    {
      course: '芭蕾舞',
      buy: 500,
      momentBuy: 1000,
      totalBuy: 1500
    }
  ])
}

export function getLineData() {
  return request('post') ({
    url: '',
    data: {}
  }).then(res => {
    if(res.status === 200) {
      return res.data
    }
    return Promise.reject('获取柱状图数据失败' || res.message)
  }).catch(() => ({
    data1: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
    data2: [
      {
      苹果: 10,
      三星: 100,
      魅族: 111,
      小米: 200,
      vivo: 30,
      oppo: 50
      },
      {
        苹果: 20,
        三星: 60,
        魅族: 130,
        小米: 500,
        vivo: 10,
        oppo: 100
      },
      {
        苹果: 78,
        三星: 43,
        魅族: 134,
        小米: 231,
        vivo: 142,
        oppo: 15
      },
      {
        苹果: 18,
        三星: 45,
        魅族: 190,
        小米: 250,
        vivo: 333,
        oppo: 22
      },
      {
        苹果: 36,
        三星: 57,
        魅族: 90,
        小米: 200,
        vivo: 300,
        oppo: 55
      },
      {
        苹果: 360,
        三星: 230,
        魅族: 480,
        小米: 500,
        vivo: 120,
        oppo: 180
      }
    ]
  }))
}

export function getBarData() {
  return request('post') ({
    url: '',
    data: {}
  }).then(res => {
    if(res.status === 200) {
      return res.data
    }
    return Promise.reject('获取柱状图数据失败' || res.message)
  }).catch(() => ([
    {
      date: '周一',
      new: 5,
      active: 200
    },
    {
      date: '周二',
      new: 10,
      active: 500
    },
    {
      date: '周三',
      new: 12,
      active: 550
    },
    {
      date: '周四',
      new: 60,
      active: 800
    },
    {
      date: '周五',
      new: 65,
      active: 550
    },
    {
      date: '周六',
      new: 53,
      active: 770
    },
    {
      date: '周日',
      new: 33,
      active: 170
    }
  ]))
}

export function getPieData() {
  return request('post') ({
    url: '',
    data: {}
  }).then(res => {
    if(res.status === 200) {
      return res.data
    }
    return Promise.reject('获取饼图数据失败' || res.message)
  }).catch(() => ([
    {
      name: '小米',
      value: 2999
    },
    {
      name: '苹果',
      value: 5999
    },
    {
      name: 'vivo',
      value: 1500
    },
    {
      name: 'oppo',
      value: 1999
    },
    {
      name: '魅族',
      value: 2200
    },
    {
      name: '三星',
      value: 4500
    }
  ]))
}