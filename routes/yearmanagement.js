const express = require('express')
const db2 = require('../sql/postgresql.js')
let router = express.Router()
// let result = []
router.get('/capacitygrowthtrend', (req, res) => {
  db2.query('SELECT * FROM xiexin.public.productmanagement$capacitygrowthtrend', (err, results) => {
    if (err) return console.log(err.message);
    results = results.rows
    let filterResults = JSON.parse(JSON.stringify(results))
    console.log(results);
    console.log(filterResults);
    filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
    res.send(filterResults)
  })
})
router.get('/plandetail', (req, res) => {
  db2.query('SELECT * FROM xiexin.public.productmanagement$plandetail', (err, results) => {
    if (err) return console.log(err.message);
    results = results.rows
    let filterResults = JSON.parse(JSON.stringify(results))
    console.log(results);
    console.log(filterResults);
    filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
    res.send(filterResults)
  })
})
router.get('/productquality', (req, res) => {
  db2.query('SELECT * FROM xiexin.public.productmanagement$productquality', (err, results) => {
    if (err) return console.log(err.message);
    results = results.rows
    let filterResults = JSON.parse(JSON.stringify(results))
    console.log(results);
    console.log(filterResults);
    filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
    res.send(filterResults)
  })
})
// router.get('/warehousingdetail',(req,res)=>{
//   db2.query('SELECT * FROM xiexin.public.productmanagement$warehousingdetail',(err,results)=>{
//       if(err) return console.log(err.message);
//        results=results.rows
//       let filterResults = JSON.parse(JSON.stringify(results))
//       console.log(results);
//       console.log(filterResults);
//       res.send(filterResults)
//     })
// })
router.get('/warehousingdetail', (req, res) => {
  // let result 
  db2.query(
    `SELECT *,\
          CASE \
        WHEN batch LIKE '%A%' THEN 'Batch A'\
        WHEN batch LIKE '%B%' THEN 'Batch B'\
        WHEN batch LIKE '%C%' THEN 'Batch C'\
        WHEN batch LIKE '%D%' THEN 'Batch D'\
        ELSE 'Other Batch'\
      END AS batch\
      FROM\
      xiexin.public.productmanagement$warehousingdetail\
      WHERE \
      time BETWEEN '${req.query.param1}' AND '${req.query.param2}';`,
    (err, results) => {
      if (err) return console.log(err.message);
      results = results.rows
      let filterResults = JSON.parse(JSON.stringify(results))
      // fi_result['2023-07-21 15'] = filterResults
      //  return results=filterResults
      filterResults = filterResults.filter((item) => item.gonggong_is_deleted == 0);
      res.send(filterResults)
    }
  )
  // console.log('88',result);
  // res.send(result)
})

module.exports = router