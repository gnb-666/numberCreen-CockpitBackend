//SELECT *,
// 	CASE 
//   WHEN batch LIKE '%A%' THEN 'Batch A'
//   WHEN batch LIKE '%B%' THEN 'Batch B'
//   WHEN batch LIKE '%C%' THEN 'Batch C'
//   WHEN batch LIKE '%D%' THEN 'Batch D'
//   ELSE 'Other Batch'
// END AS batch_category
// FROM
// storage_list
// WHERE 
// time BETWEEN '2023-07-21 16:00:00' AND '2023-07-21 17:00:00';


const express = require('express')
const db = require('../sql/mysql.js')
let router = express.Router()

router.get('/overview/siin',(req,res)=>{
  // let result 
  db.query(
    `SELECT *,\
    	CASE \
      WHEN batch LIKE '%A%' THEN 'Batch A'\
      WHEN batch LIKE '%B%' THEN 'Batch B'\
      WHEN batch LIKE '%C%' THEN 'Batch C'\
      WHEN batch LIKE '%D%' THEN 'Batch D'\
      ELSE 'Other Batch'\
    END AS batch_category\
    FROM\
    storage_list\
    WHERE \
    time BETWEEN '${req.query.param1}' AND '${req.query.param2}';`,
    (err,results)=>{
      if(err) return console.log(err.message);
      let filterResults = JSON.parse(JSON.stringify(results))
      // fi_result['2023-07-21 15'] = filterResults
    //  return results=filterResults
      res.send(filterResults)
    }
  )
  // console.log('88',result);
  // res.send(result)
})



module.exports = router