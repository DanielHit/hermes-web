
init();
var workYear = 0;
var degree = 0;

function init() {
    bindEvent();
    loadResume();
}

function bindEvent() {
    $("#editButton").on('click', postEditResume);
}

$('#degree .btn').on("click", function () {

    degree = $(this).val();
    console.log(degree);
    $(this).addClass("active");
});

$('#workYear .btn').on("click", function () {

    workYear = $(this).val();
    console.log(workYear);
    $(this).addClass("active");
});

function loadResume() {

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
        $("#imgUploaded").attr("src", result.userImg);
        $("#phoneNum").html(result.phoneNum);
        $("#address").html(result.address);
        $("#education").val(result.educationContent);
        $("#workContent").val(result.workContent);
        $("#datetimepicker").val(result.startDate);
        $("#cateId").html(result.cateId);

    }).fail(function (err) {
        console.log("error");
    });

}

function postEditResume() {
    var userId = 12345;
    var userImg = $("#imgUploaded").attr("src");
    var phoneNum = $("#phoneNum").val();
    var address = $("#address").val();
    var workContent = $("#workContent").val();
    var education = $("#education").val();
    var date = $("#datetimepicker").val();
    var cateId = $("#cateId").val();

    var editParam = {userId, userImg, phoneNum, address, workYear, workContent, degree, education, date, cateId};
    console.log(editParam);

    var util = new httpGet();
    util.ajax({
        url: "/api/user/candidate/editResume",
        type: "post",
        dataGet: editParam
    }).done(function (res) {
        alert("修改简历成功"); // todo 然后进行跳转
        window.location.replace("/users/resume?userId=" + userId);
    }).fail(function (err) {
        console.log("error");
    });

}

$(function () {
    $('#datetimepicker').datetimepicker({
        format: 'YYYY-MM-DD',
        minDate: {
            Default: true
        }
    });
});

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
