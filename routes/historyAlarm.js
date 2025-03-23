const express = require('express')
const db = require('../sql/mysql.js')
let router = express.Router()

function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

router.get('/historyalarm',(req,res)=>{
  db.query('SELECT * FROM history_alarm_data LIMIT 50',(err,results)=>{
    if(err) return console.log(err.message);
    let filterResults = JSON.parse(JSON.stringify(results))
    filterResults.forEach((e)=>{
      e.start_time = formatDateTime(e.start_time)
      e.recover_time = formatDateTime(e.recover_time)
    })
    console.log(results);
    res.send(filterResults)
  })
  // console.log(req.params.type);
})

router.get('/historychart',(req,res)=>{
  db.query("SELECT DATE_FORMAT(start_time, '%Y-%m-%d %H:%i:00') AS hour,\
          COUNT(*) AS count_per_hour \
          FROM ( \
          SELECT *\
          FROM history_alarm_data\
          WHERE start_time BETWEEN '2023-07-20 00:00:01' AND '2023-07-22 23:59:59'\
          ) AS filtered_data\
          GROUP BY hour"
  ,(err,results)=>{
    if(err) return console.log(err.message);
    let filterResults = JSON.parse(JSON.stringify(results))
    console.log(filterResults);
    let hours=[]

    hours = filterResults.map((item)=>{
      return item['hour']
    })
    let count = []
    count = filterResults.map((item)=>{
      return item['count_per_hour']
    })
    res.send({
      "hours":hours,
      "count":count
    })
    // res.send()
  })
  // console.log(req.params.type);


//   SELECT DATE_FORMAT(start_time, '%Y-%m-%d %H:%i:00') AS hour,
//   COUNT(*) AS count_per_hour
//   FROM ( 
//   SELECT *
//   FROM history_alarm_data
//   WHERE start_time BETWEEN '2023-06-08 09:00:00' AND '2023-07-21 19:00:00'
//   ) AS filtered_data
// GROUP BY hour
})
module.exports = router