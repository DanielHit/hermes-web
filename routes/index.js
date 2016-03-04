var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/index', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res, next) {
    res.render('login');
});

router.get('/register', function (req, res, next) {
    res.render('register');
});

/* job description page */
router.get('/jd', function (req, res, next) {
    res.render('jd');
});


router.get('/test', function (req, res, next) {
    res.render('test');
});

router.get('/postjob', function (req, res, next) {
    res.render('postjob');
});

module.exports = router;
