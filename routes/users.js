var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/resume', function (req, res, next) {
    res.render('users/resume');
});

module.exports = router;
