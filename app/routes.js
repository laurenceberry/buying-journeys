var fs = require('fs');
var yaml = require('js-yaml');
var express = require('express');
var router = express.Router();

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

router.get('/buyers/:page/:yml', function (req, res) {
  var templateData = yaml.safeLoad(
    fs.readFileSync(__dirname + '/yml/' + req.params.yml + '.yml', {encoding: 'utf-8'})
  );

  Object.keys(req.query).map(function(key) {
    templateData[key] = req.query[key];
  });

  templateData.storedValues = req.cookies;

  console.log("--- GET", req.path);
  console.log(JSON.stringify(templateData, null, '  '));

  res.render(
    "buyers/" + req.params.page,
    templateData
  );

});



module.exports = router

