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

router.post('/user/recruiter/postJob', function (req, res) {
    console.log("enter proxy");
    proxy.httpHanlder(domain, req, res, 'user/recruiter/postJob');
});

module.exports = router;



