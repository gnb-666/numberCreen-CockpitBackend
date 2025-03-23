const express = require('express')
const db2 = require('../sql/postgresql.js')
let router = express.Router()
// let result = []
router.get('/wastes',(req,res)=>{
  db2.query('SELECT * FROM xiexin.public.qualitymanagement$wastes',(err,results)=>{
      if(err) return console.log(err.message);
       results=results.rows
      let filterResults = JSON.parse(JSON.stringify(results))
      console.log(results);
      console.log(filterResults);
      filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
      res.send(filterResults)
    })
})
router.get('/recovery',(req,res)=>{
    db2.query('SELECT * FROM xiexin.public.qualitymanagement$recovery',(err,results)=>{
        if(err) return console.log(err.message);
         results=results.rows
        let filterResults = JSON.parse(JSON.stringify(results))
        console.log(results);
        console.log(filterResults);
        filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
        res.send(filterResults)
      })
  })
  router.get('/environmentreport',(req,res)=>{
    db2.query('SELECT * FROM xiexin.public.qualitymanagement$environmentreport',(err,results)=>{
        if(err) return console.log(err.message);
         results=results.rows
        let filterResults = JSON.parse(JSON.stringify(results))
        console.log(results);
        console.log(filterResults);
        filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
        res.send(filterResults)
      })
  })
  router.get('/indicator',(req,res)=>{
    db2.query('SELECT * FROM xiexin.public.qualitymanagement$indicator',(err,results)=>{
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