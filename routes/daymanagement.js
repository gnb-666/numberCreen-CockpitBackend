const express = require('express')
const db2 = require('../sql/postgresql.js')
let router = express.Router()
// let result = []
router.get('/qualitycpkparam',(req,res)=>{
  db2.query('SELECT * FROM xiexin.public.productmanagement$qualitycpkparam',(err,results)=>{
      if(err) return console.log(err.message);
       results=results.rows
      let filterResults = JSON.parse(JSON.stringify(results))
      console.log(results);
      console.log(filterResults);
      filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
      res.send(filterResults)
    })
})
router.get('/dailyplandetail',(req,res)=>{
  db2.query('SELECT * FROM xiexin.public.productmanagement$dailyplandetail',(err,results)=>{
      if(err) return console.log(err.message);
       results=results.rows
      let filterResults = JSON.parse(JSON.stringify(results))
      console.log(results);
      console.log(filterResults);
      filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
      res.send(filterResults)
    })
})
router.get('/vitalstock',(req,res)=>{
  db2.query('SELECT * FROM xiexin.public.productmanagement$vitalstock',(err,results)=>{
      if(err) return console.log(err.message);
       results=results.rows
      let filterResults = JSON.parse(JSON.stringify(results))
      console.log(results);
      console.log(filterResults);
      filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
      res.send(filterResults)
    })
})
router.get('/siproductionquality',(req,res)=>{
    db2.query('SELECT * FROM xiexin.public.productmanagement$siproductionquality',(err,results)=>{
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