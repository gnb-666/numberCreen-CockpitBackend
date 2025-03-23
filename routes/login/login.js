const express = require('express')
const db = require('../../sql/mysql')
let router = express.Router()
// jwt
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
// 定义secret 密钥
const secretKey = 'hello'

// 参数1：用户的信息对象
// 参数2：加密的秘钥
// 参数3：配置对象，可以配置当前 token 的有效期
// 记住：千万不要把密码加密到 token 字符中
//定义登录接口
//post '/api/login' 用于用户登录，判断用户登录信息是否正确，正确给用户发送一个token字符串
// const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '30s' })
// res.send({
//   status: 200,
//   message: '登录成功！',
//   token: tokenStr, // 要发送给客户端的 token 字符串
// })


router.post('/login',(req,res)=>{
  var name = req.body.name
  var pwd = req.body.pwd
  // console.log(name,pwd,req.body);
  var query1 = "select * from user where user_name='"+name+"' and password='"+pwd+"'"
  const tokenStr = jwt.sign({ 
    username: name,
    role:'admin'
  }, secretKey, { expiresIn: 60*60*24*7 })
  db.query(query1,(err,results)=>{
    if(err) return console.log(err.message);
    if(results.length == 0){
      res.send({
        "status": 400,
        "message":"用户名或密码错误"
      })
    }else{
      res.send({
        "status": 200,
        "message":"用户登录成功",
        "data":{
          "token":'Bearer '+ tokenStr
        }
      })
    }
  })
})

router.get('/getuserinfo',(req,res)=>{
  console.log(req.auth);
  res.send({
    "status": 200,
    "message":"获取用户姓名和权限成功",
    "data":{
      "username": req.auth.username,
      "role": req.auth.role
    }
  })
})

module.exports = router