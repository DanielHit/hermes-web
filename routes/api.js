/**
 *  ajax调用异步后台请求转发
 */
var express = require('express'),
    router = express.Router(),
    http = require('http'),
    proxy = require('../lib/httpHandler'),
    router = express.Router(),
    domain = "127.0.0.1:8080/api/";


router.get('/list/', function (req, res) {
    proxy.httpHanlder(domain, req, res, 'jobList/getJobList');
});

router.get('/jobdetail/getjobdesc', function (req, res) {
    proxy.httpHanlder(domain, req, res, 'jobdetail/getjobdesc');
});

router.get('/jobdetail/applyJob', function (req, res) {
    proxy.httpHanlder(domain, req, res, 'jobdetail/applyJob');
});

// 发布岗位信息
router.post('/user/recruiter/postJob', function (req, res) {
    proxy.httpHanlder(domain, req, res, 'user/recruiter/postJob');
});

// 修改简历
router.post('/user/candidate/editResume', function (req, res) {
    console.log("enter here");
    proxy.httpHanlder(domain, req, res, 'user/candidate/editResume');
});

router.get('/user/candidate/getResume', function (req, res) {
    console.log("enter here");
    proxy.httpHanlder(domain, req, res, 'user/candidate/getResume');
});

router.get('/user/application/list', function (req, res) {
    proxy.httpHanlder(domain, req, res, 'user/application/list?userId=100012');
});

router.get('/user/recruiter/getPostJobList', function (req, res) {
    proxy.httpHanlder(domain, req, res, 'user/recruiter/getPostJobList');
});

module.exports = router;



