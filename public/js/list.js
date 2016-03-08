init();

function init() {
    bindEvent();
}

function bindEvent() {
    $('#jobListSearchButton').on('click', getJobList);
}


function getJobList() {
    var util = new httpGet();
    util.ajax({
        url: "/api/list/",
        type: "get"
    }).done(function (res) {
        var result = res.result.data;
        console.log("end");
    }).fail(function (err) {
        console.log("error");
        alert(err.result.message);
    });
};


// ajax httpGet异步请求
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
            if (res && res.result.code === 0) {
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