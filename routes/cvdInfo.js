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
  
  router.get('/cvdChart',(req,res)=>{
    db.query('SELECT * FROM cvd;',(err,results)=>{
      if(err) return console.log(err.message);
      let filterResults = JSON.parse(JSON.stringify(results))
      let dateList = []
      let xtcsList = []
      let xh2List = []
      
      filterResults.forEach((e)=>{
        // e.Time = formatDateTime(e.Time)
        dateList.push(formatDateTime(e.Time))
        xtcsList.push(e.xtcs)
        xh2List.push(e.xh2)
      })

      let finalResults = {
        "dateList": dateList,
        "xtcsList": xtcsList,
        "xh2List": xh2List
      }
    //   console.log(results);
      res.send(finalResults)
    })
    // console.log(req.params.type);
  })
  
  module.exports = router