var express = require('express');

module.exports = function (app) {
    var startMock = process.argv[2];
    console.log(startMock);
    if (startMock == "mock") {
        // 使用mock自动代理
        var mockRouter = require('../lib/mockHandler');
        app.use(mockRouter);
    } else {
        //app.use('/', routes);
//app.use('/users', users);
//app.use('/company', company);

        // 转发请求到服务端
        var indexRouter = require('../routes/index');
        app.use(indexRouter);
        var listRouter = require('../routes/users');
        app.use(listRouter);
        var channelRouter = require('../routes/company');
        app.use(channelRouter);
    }
}