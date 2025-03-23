// 1.导入mysql模块
const mysql = require('mysql')
// 2.建立Mysql数据库连接
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'zyz01',
});

// let results0 = []
// db.query('SELECT * FROM each_section_alarm_information',(err,results)=>{
//   if(err) return console.log(err.message);
//   results0 = results
//   console.log(results);
// })

// module.exports = {db,db2}
module.exports =db