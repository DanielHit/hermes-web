var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var mobileAgentRegex = /(android|iphone|ipad)/i;
    if (mobileAgentRegex.test(req.header('user-agent'))) {
        res.render('customList');
        return
    }
    res.render('index', {title: '闪电聘'});
});

router.get('/index', function (req, res, next) {
    res.render('index', {title: '闪电聘'});
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

/* i版列表 */
router.get('/custom/list', function (req, res, next) {
    res.render('customList')
})

router.get('/test', function (req, res, next) {
    res.render('test');
});

router.get('/postjob', function (req, res, next) {
    res.render('postjob');
});

module.exports = router;
