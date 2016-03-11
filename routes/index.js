var express = require('express'),
    http = require('http'),
    router = express.Router(),
    qiniu = require('qiniu');

var config = require('../public/js/config/qiniuconfig');


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
});

router.get('/postjob', function (req, res, next) {
    res.render('postjob');
});

router.get('/test', function (req, res, next) {
    res.render('test', {title: '闪电聘'});
});


qiniu.conf.ACCESS_KEY = config.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.SECRET_KEY;
var uptoken = new qiniu.rs.PutPolicy(config.Bucket_Name);

router.get('/token', function(req, res, next) {
    var token = uptoken.token();
    res.header("Cache-Control", "max-age=0, private, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    if (token) {
        res.json({
            uptoken: token
        });
    }
});

module.exports = router;
