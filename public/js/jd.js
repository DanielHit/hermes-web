init();

var jobId = getUrlParam('id');

function init() {
    getJobDetail();
    bindEvent();
}

function bindEvent() {
    $("#applyJobButton").on('click', applyJob);
}

function applyJob() {

    //todo  目前先用固定的用户,等后期加上用户模块
    var userId = 100012;
    var param = {userId, jobId};
    var util = new httpGet();

    util.ajax({
        url: "/api/jobdetail/applyJob/",
        type: "get",
        dataGet: param
    }).done(function (res) {
        var applyJobResult = res.data;
        console.log(applyJobResult);
        alert("申请职位成功!")

    }).fail(function (err) {
        console.log(err.message);
        alert("已经申请过职位")
    });

}

function getJobDetail() {
    var jobId = getUrlParam('id');
    console.log(jobId);
    var param = {jobId};

    var util = new httpGet();
    util.ajax({
        url: "/api/jobdetail/getjobdesc/",
        type: "get",
        dataGet: param

    }).done(function (res) {
        var jobDetail = res.data;

        $('#jobName').html(jobDetail.name);
        // todo 服务端转换
        $('#jobSalary').html(jobDetail.maxSalary + "-" + jobDetail.maxSalary);
        // todo 服务端转换
        $('#jobType').html(jobDetail.jobType);

        $('#jobWelfare').html(jobDetail.welfareList);
        $('#experience').html(jobDetail.experience);
        $('#degree').html(jobDetail.degree);
        $('#address').html(jobDetail.address);
        $('#jobContent').html(jobDetail.jobContent);

    }).fail(function (err) {
        console.log("error");
        alert(err.result.message);
    });
};


// todo 通过requireJs 放到 公共模块 ajax httpGet异步请求
function httpGet() {

    this.ajax = function (param) {
        var def = $.Deferred();

        if (param.dataGet) {
            param.url = param.url + (~param.url.indexOf('?') ? '&' : '?') + $.param(param.dataGet);
        }

        var ajax = $.ajax({
            url: param.url,
            type: param.type || 'get',
            dataType: 'json',
            data: param.dataPost
        }).done(function (res) {
            if (res && res.status === 200) {
                def.resolve(res)
            }
            else {
                def.reject(res);
            }
        }).fail(function (e) {
            def.reject(e);
        });

        var ret = def.promise();
        ret.abort = ajax.abort;
        return ret;
    };
};

// todo 放到公共模块 获取请求
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
