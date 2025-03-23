const express = require('express')
const db2 = require('../sql/postgresql.js')
let router = express.Router()
// let result = []
router.get('/violation_form',(req,res)=>{
  db2.query('SELECT * FROM xiexin.public.security$violation_form',(err,results)=>{
      if(err) return console.log(err.message);
       results=results.rows
      let filterResults = JSON.parse(JSON.stringify(results))
      console.log(results);
      console.log(filterResults);
      filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
      res.send(filterResults)
    })
})
router.get('/person_information',(req,res)=>{
    db2.query('SELECT * FROM xiexin.public.security$person_information',(err,results)=>{
        if(err) return console.log(err.message);
         results=results.rows
        let filterResults = JSON.parse(JSON.stringify(results))
        console.log(results);
        console.log(filterResults);
        filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
        res.send(filterResults)
      })
  })
router.get('/person_safe',(req,res)=>{
    db2.query('SELECT * FROM xiexin.public.security$person_safe',(err,results)=>{
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