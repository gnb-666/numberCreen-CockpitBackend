const express = require('express')
const db = require('../sql/mysql.js')
let router = express.Router()
let menuList= [
  {
    menuId: '111',
    menuName: '驾驶舱',
    path: '',
    children: [
      { menuId: '111-1', menuName: '驾驶舱1', path: '/first/first_1',src:'http://localhost:8080/#/HomePage/SecurityDetection', children: [] },
      { menuId: '111-2', menuName: '驾驶舱2', path: '/first/first_2',src:'http://localhost:8080/#/HomePage/ProducingManagement' ,children: [] },
      { menuId: '111-3', menuName: '驾驶舱3', path: '/first/first_3', src:'http://localhost:8080/#/HomePage/Overview',children: [] },
    ]
  },
]
router.get('/',(req,res)=>{
  res.send(menuList)
})

module.exports = router