const express = require('express')
const db = require('../sql/mysql.js')
let router = express.Router()
// let result = []
router.get('/infolist/:type',(req,res)=>{
  db.query('SELECT * FROM each_section_alarm_information',(err,results)=>{
    if(err) return console.log(err.message);
    let filterResults = JSON.parse(JSON.stringify(results)).filter((e)=>{
      console.log(req.params.type,e.name.includes(req.params.type));
      return (e.name.includes(req.params.type)== true)
    })
    filterResults.forEach((e)=>{
      e.warningLevel = Math.floor(Math.random() * 4)
    })
    // console.log(results);
    res.send(filterResults)
  })
  // console.log(req.params.type);
})

router.get('/warninglist/:type',(req,res)=>{
  db.query('SELECT * FROM real_time_alarm',(err,results)=>{
    if(err) return console.log(err.message);
    let filterResults = JSON.parse(JSON.stringify(results)).filter((e)=>{
      console.log(req.params.type,e.name.includes(req.params.type));
      return (e.name.includes(req.params.type)== true)
    })
    filterResults.forEach((e)=>{
      e.warningLevel = Math.floor(Math.random() * 4)
    })
    // console.log(results);
    res.send(filterResults)
  })
  // console.log(req.params.type);
})

router.get('/warningchart/:type',(req,res)=>{
  console.log(req.params.type);
  db.query(`SELECT DATE_FORMAT(start_time, '%Y-%m-%d %H:00:00') AS hour,\
          COUNT(*) AS count_per_hour \
          FROM ( \
          SELECT *\
          FROM real_time_alarm\
          WHERE start_time BETWEEN '2023-06-08 09:00:00' AND '2023-07-21 19:00:00'\
            AND name LIKE '%${req.params.type}%'\
          ) AS filtered_data\
          GROUP BY hour`
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

//   SELECT DATE_FORMAT(start_time, '%Y-%m-%d %H:00:00') AS hour,
//   COUNT(*) AS count_per_hour
// FROM (
// SELECT *
// FROM real_time_alarm
// WHERE start_time BETWEEN '2023-06-08 09:00:00' AND '2023-07-21 19:00:00'
//   AND name LIKE '%QH%'
// ) AS filtered_data
// GROUP BY hour
})

module.exports = router