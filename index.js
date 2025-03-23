const express = require('express')
// 引入中间件
// var bodyParser = require('body-parser');
const expressJWT = require('express-jwt')
const app = express()
var useragent = require('useragent');
var os=require('os');
var ipnet = require('xz-ipnet')();
const IP2Region = require('ip2region').default;
// 创建一个IP2Region实例
const query = new IP2Region();
const cors = require("cors");
var q = require('qiao-get-ip')

const sectionAlarm = require('./routes/sectionAlarm.js')
const historyAlarm = require('./routes/historyAlarm.js')
//设备管理
const deviceconfiguration = require('./routes/device.js')
const devicedistribution = require('./routes/device.js')
const equipmentinput = require('./routes/device.js')
const equipmenthealth = require('./routes/device.js')
const multicomponenthealth = require('./routes/device.js')
const renovationinput = require('./routes/device.js')
const anomalydetection = require('./routes/device.js')
//环保管理
const wastes = require('./routes/environment.js')
const recovery = require('./routes/environment.js')
const environmentreport = require('./routes/environment.js')
const indicator = require('./routes/environment.js')
//年度生产管理
const capacitygrowthtrend = require('./routes/yearmanagement.js')
const productquality = require('./routes/yearmanagement.js')
const warehousingdetail= require('./routes/yearmanagement.js')
const plandetail = require('./routes/yearmanagement.js')
//日度生产管理
const qualitycpkparam = require('./routes/daymanagement.js')
const dailyplandetail = require('./routes/daymanagement.js')
const vitalstock = require('./routes/daymanagement.js')
const siproductionquality = require('./routes/daymanagement.js')
//其他
const cvdInfo = require('./routes/cvdInfo.js')
const overView = require('./routes/overView.js')
const frontList = require('./routes/getList.js')
const login = require('./routes/login/login.js');
const { log } = require('console');
//安全管理-人员安全
const violation_form = require('./routes/role.js')
const person_information = require('./routes/role.js')
const person_safe = require('./routes/role.js')
//安全管理-事故管理
const accident_index = require('./routes/accidentmanagement.js')
const accident_ledger = require('./routes/accidentmanagement.js')
const accident_number = require('./routes/accidentmanagement.js')
//安全管理-应急管理
const contingency_plan = require('./routes/contingencymanagement.js')
const emergency_team = require('./routes/contingencymanagement.js')
app.use(cors());
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
}
)

app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

// app.use(expressJwt({
//   secret: 'hello',  // 签名的密钥 或 PublicKey
//   credentialsRequired: false
// }).unless({
//   path: ['/']  // 指定路径不经过 Token 解析
// }))
app.use(
  expressJWT.expressjwt({ secret: 'hello', algorithms: ["HS256"] ,credentialsRequired: false }).unless({
    path: ['/'],
  })
)

app.use('/',sectionAlarm)
//设备管理
app.use('/',deviceconfiguration)
app.use('/',devicedistribution)
app.use('/',equipmenthealth)
app.use('/',equipmentinput)
app.use('/',multicomponenthealth)
app.use('/',anomalydetection)
app.use('/',renovationinput)
//环保管理
app.use('/',recovery)
app.use('/',environmentreport)
app.use('/',indicator)
app.use('/',wastes)
//年度生产管理
app.use('/',capacitygrowthtrend)
app.use('/',plandetail)
app.use('/',productquality)
app.use('/',warehousingdetail)
//日度生产管理
app.use('/',qualitycpkparam)
app.use('/',dailyplandetail)
app.use('/',vitalstock)
app.use('/',siproductionquality)
//安全管理-人员安全
app.use('/',violation_form)
app.use('/',person_information)
app.use('/',person_safe)
//安全管理-事故管理
app.use('/',accident_index)
app.use('/',accident_ledger)
app.use('/',accident_number)
//安全管理-应急管理
app.use('/',contingency_plan)
app.use('/',emergency_team)
//其他
app.use('/',historyAlarm)
app.use('/',overView)
app.use('/',cvdInfo)
app.use('/fronted/',frontList)
app.use('/',login)
app.get('/', async (req, res) => {
  var arch=os.arch();
  var cpus=os.cpus();
  var endianness=os.endianness();
  var freemem=os.freemem()
  var homedir=os.homedir();
  var hostname=os.hostname()
  var networkInterfaces=os.networkInterfaces();
  const ip = await q.getIP()
  res.send({
    "arch": arch,
    "cpus":cpus,
    "endianness":endianness,
    "useragent":useragent.parse(req.headers['user-agent']),
    "freemem":freemem,
    "homedir":homedir,
    "hostname":hostname,
    "networkInterfaces":networkInterfaces,
    "ip":ip,
    "wlan":networkInterfaces.WLAN[0].address,
    // "address":ipnet.find(ip)
    "address":  query.search(ip)
  })
})

const server = app.listen(9091, function () {
 
  const host = server.address().address
  const port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
