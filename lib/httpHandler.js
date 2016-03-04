var express = require('express'),
	request = require('request'),
	promise = require("bluebird"),
	promisereq = promise.promisifyAll(require("request"),{ multiArgs:true});

function Proxy(){};

// 单请求请求代理
Proxy.httpHanlder = function httpHanlder(domain,req, res, api){
	var proxyApi = 'http://'+ domain + api;
	var options = {
		headers: [
			{
			  name: 'content-type',
			  value: 'application/x-www-form-urlencoded'
			}
		],
		method: req.method,
		url: proxyApi,
		qs: req.query,
		form: req.body,
		json: true
	};

	function callBack(error, result, body){
		if(options.method == 'GET'){
			res.json(body);
		}else{
			res.json(body);
		}
	}
	request(options, callBack)
};

/**
 * 多个接口并发调用
 * @param {[type]} param [description]
 */
Proxy.Multiple=function(param){
	var urllist=[];
	for(var i = 0; i<param.api.length; i++){
		var url = 'http://'+ param.domain + param.api[i];
		urllist.push(url);
	}
	return promise.map(urllist, function(url) {
	    return promisereq.getAsync(url).spread(function(response,body) {
	        return JSON.parse(body);
	    });
	});
};

module.exports = Proxy;