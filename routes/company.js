/**
 * Created by Daniel on 3/5/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render("company/index");
});

router.get('/index', function (req, res, next) {
    res.render("company/index");
});



module.exports = router;
