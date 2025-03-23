const express = require('express')
const db2 = require('../sql/postgresql.js')
let router = express.Router()
// let result = []
router.get('/contingency_plan',(req,res)=>{
  db2.query('SELECT * FROM xiexin.public.emergency$contingency_plan',(err,results)=>{
      if(err) return console.log(err.message);
       results=results.rows
      let filterResults = JSON.parse(JSON.stringify(results))
      console.log(results);
      console.log(filterResults);
      filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
      res.send(filterResults)
    })
})
router.get('/accident_ledger',(req,res)=>{
    db2.query('SELECT * FROM xiexin.public.emergency$accident_ledger',(err,results)=>{
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