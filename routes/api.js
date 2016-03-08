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

module.exports = router;



