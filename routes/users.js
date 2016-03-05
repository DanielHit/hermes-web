var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/resume', function (req, res, next) {
    res.render('users/resume');
});

router.get('/delivery', function (req, res, next) {
    res.render('users/delivery');
});

router.get('/deliveryJson', function (req, res, next) {
    var data = [
        {
            modified: '2015年1月1日',
            job: '地推',
            recruiter: '王经理',
            company: '美团',
            progress: '未阅读',
            status: '已投递',
            postTime: '3天'
        },{
            modified: '2015年1月2日',
            job: '地推',
            recruiter: '王经理',
            company: '美团',
            progress: '未阅读',
            status: '已投递',
            postTime: '3天'
        },{
            modified: '2015年3月1日',
            job: '地推',
            recruiter: '李经理',
            company: '点评',
            progress: '未阅读',
            status: '已投递',
            postTime: '1天'
        },]
    res.send(data)
})
module.exports = router;
