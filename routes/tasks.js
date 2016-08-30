var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var path = require('path');
/* GET tasks listing. */
router.get('/', function (req, res, next) {
  jsonfile.readFile(path.join(__dirname, '../db/tasks.json'), function (err, obj) {
    if (err) {
      res.json({ status: 'error', msg: err });
    } else {
      res.json({ status: 'success', msg: '', data: obj });
    }
  });
});

/* update tasks listing. */
router.put('/', function (req, res, next) {
  var task = req.body;
  jsonfile.writeFile(path.join(__dirname, '../db/tasks.json'), task, { spaces: 4 }, function (err) {
    if (err) {
      res.json({ status: 'error', msg: err });
    } else {
      res.json({ status: 'success', msg: '' });
    }
  });
});

module.exports = router;
