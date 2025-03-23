const express = require('express')
const db2 = require('../sql/postgresql.js')
let router = express.Router()
// let result = []
router.get('/accident_index',(req,res)=>{
  db2.query('SELECT * FROM xiexin.public.emergency$accident_index',(err,results)=>{
      if(err) return console.log(err.message);
       results=results.rows
      let filterResults = JSON.parse(JSON.stringify(results))
      console.log(results);
      console.log(filterResults);
      filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
      res.send(filterResults)
    })
})
router.get('/emergency_team',(req,res)=>{
    db2.query('SELECT * FROM xiexin.public.emergency$emergency_team',(err,results)=>{
        if(err) return console.log(err.message);
         results=results.rows
        let filterResults = JSON.parse(JSON.stringify(results))
        console.log(results);
        console.log(filterResults);
        filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
        res.send(filterResults)
      })
  })
router.get('/accident_number',(req,res)=>{
    db2.query('SELECT * FROM xiexin.public.emergency$accident_number',(err,results)=>{
        if(err) return console.log(err.message);
         results=results.rows
        let filterResults = JSON.parse(JSON.stringify(results))
        console.log(results);
        console.log(filterResults);
        filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
        res.send(filterResults)
      })
  })
module.exports = router