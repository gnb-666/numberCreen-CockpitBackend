const express = require('express')
const db2 = require('../sql/postgresql.js')
let router = express.Router()
// let result = []
router.get('/deviceconfiguration',(req,res)=>{
  db2.query('SELECT * FROM xiexin.public.facilitymanagement$equipmentconfiguration',(err,results)=>{
      if(err) return console.log(err.message);
       results=results.rows
      let filterResults = JSON.parse(JSON.stringify(results))
      console.log(results);
      console.log(filterResults);
      filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
      res.send(filterResults)
    })
})
router.get('/devicedistribution',(req,res)=>{
  db2.query('SELECT * FROM xiexin.public.facilitymanagement$equipmentdistribution',(err,results)=>{
      if(err) return console.log(err.message);
       results=results.rows
      let filterResults = JSON.parse(JSON.stringify(results))
      console.log(results);
      console.log(filterResults);
      filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
      res.send(filterResults)
    })
})
router.get('/equipmenthealth',(req,res)=>{
  db2.query('SELECT * FROM xiexin.public.facilitymanagement$equipmenthealth',(err,results)=>{
      if(err) return console.log(err.message);
       results=results.rows
      let filterResults = JSON.parse(JSON.stringify(results))
      console.log(results);
      console.log(filterResults);
      filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
      res.send(filterResults)
    })
})
router.get('/equipmentinput',(req,res)=>{
  db2.query('SELECT * FROM xiexin.public.facilitymanagement$equipmentinput',(err,results)=>{
      if(err) return console.log(err.message);
       results=results.rows
      let filterResults = JSON.parse(JSON.stringify(results))
      console.log(results);
      console.log(filterResults);
      filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
      res.send(filterResults)
    })
})
router.get('/multicomponenthealth',(req,res)=>{
  db2.query('SELECT * FROM xiexin.public.facilitymanagement$multicomponenthealth',(err,results)=>{
      if(err) return console.log(err.message);
       results=results.rows
      let filterResults = JSON.parse(JSON.stringify(results))
      console.log(results);
      console.log(filterResults);
      filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
      res.send(filterResults)
    })
})
router.get('/renovationinput',(req,res)=>{
  db2.query('SELECT * FROM xiexin.public.facilitymanagement$renovationinput',(err,results)=>{
      if(err) return console.log(err.message);
       results=results.rows
      let filterResults = JSON.parse(JSON.stringify(results))
      console.log(results);
      console.log(filterResults);
      filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
      res.send(filterResults)
    })
})
router.get('/anomalydetection',(req,res)=>{
  db2.query('SELECT * FROM xiexin.public.facilitymanagement$anomalydetection',(err,results)=>{
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