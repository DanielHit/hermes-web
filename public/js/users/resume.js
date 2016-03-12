init();
var workYear = 0;
var degree = 0;

function init() {
    loadUserInfo();
    bindEvent();
}

function loadUserInfo() {
    var userId = getUrlParam("userId");
    var util = new httpGet();
    var param = {userId};
    util.ajax({
        url: "/api/user/candidate/getResume",
        type: "get",
        dataGet: param
    }).done(function (res) {
        console.log("load resume info success");
        var result = res.data;
        console.log(result);
        $("#userImg").attr("src", result.userImg);
        $("#phoneNum").html(result.phoneNum);
        $("#address").html(result.address);
        $("#education").val(result.educationContent);
        $("#workContent").val(result.workContent);
        $("#startWork").html(result.startDate);

    }).fail(function (err) {
        console.log("error");
    });
}

function bindEvent() {
    $("#editButton").on('click', directEditPage);
}

function directEditPage() {
    var userId = 12345;
    console.log("redirect to edit page");
    window.location.replace("/users/editResume?userId=" + userId);
}

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

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
