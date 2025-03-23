// 1. 导入 pg 模块
const { Pool } = require('pg');

// 2. 建立 PostgreSQL 数据库连接
const db2 = new Pool({
  host: '10.69.1.121',
  user: 'postgres',
  password: 'postgres',
  database: 'xiexin',
});
// 示例查询
db2.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('查询错误', err.stack);
    } else {
      console.log('当前时间：', res.rows[0].now);
    }
  
    // 关闭连接池（可选）
    // db2.end();
  });
  module.exports =db2