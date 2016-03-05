var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/resume', function (req, res, next) {
    res.render('users/resume');
});

router.get('/application', function (req, res, next) {
    res.render('users/application');
});

router.get('/applicationJson', function (req, res, next) {
    var data = new Array();
    var list = new Array();
    for(var i = 0; i < 100; i ++ ){
        list.push(i);
    }
    list.forEach(function(e) {
        data.push({
            modified: '2015年1月' + (10 - e) + '日',
            job: '地推',
            recruiter: '王经理',
            company: '美团',
            progress: '未阅读',
            status: '已投递',
            postTime: e + '天'
        })
    })
    res.send(data)
})
module.exports = router;
