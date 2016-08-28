var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var path = require('path');
/* GET users listing. */
router.get('/', function(req, res, next) {
  jsonfile.readFile(path.join(__dirname, '../db/tasks.json'),function(err,obj){
      if(err){
        res.json({status:'error',msg:err});
      }else{
        res.json({status:'success',msg:'',data:obj});
      }
  });
});

module.exports = router;
