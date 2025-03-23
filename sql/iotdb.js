const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // 服务器端口

// IoTDB 配置
const iotdbUrl = 'http://10.69.1.123:6667'; // IoTDB 服务器地址
const username = 'root'; // 用户名
const password = 'root'; // 密码

// 解析 JSON 请求体
app.use(express.json());

// 定义一个 GET 接口，供前端调用
app.get('/api/iotdb-data', async (req, res) => {
  try {
    // 查询语句（可以根据前端传递的参数动态调整）
    const query = 'SELECT * FROM root.xiexin.chejian1.oven'; // 替换为你的查询语句

    // 调用 IoTDB 的 HTTP API 查询数据
    const response = await axios.post(
      `${iotdbUrl}/rest/v1/query`, // IoTDB 的 HTTP API 地址
      {
        username,
        password,
        query,
      },
      {
        timeout: 10000, // 设置超时时间为 10 秒
      }
    );

    // 将查询结果返回给前端
    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error('Error querying IoTDB:', error);

    // 打印详细的错误信息
    if (error.response) {
      // 服务器返回了错误响应
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // 请求已发送，但未收到响应
      console.error('Request:', error.request);
    } else {
      // 其他错误
      console.error('Error message:', error.message);
    }

    res.status(500).json({
      success: false,
      message: 'Failed to query IoTDB',
      error: error.message,
    });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});