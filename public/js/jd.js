init();

function init() {
    getJobDetail();
}


function getJobDetail() {
    var util = new httpGet();

    var jobId = 10005;
    var param = {jobId};

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