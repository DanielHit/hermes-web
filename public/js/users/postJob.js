init();

function init() {
    bindEvent();
};

function bindEvent() {
    $("#applyJobButton").on("click", submitJob);
}


function checkParam() {

    $("#contact-form").validate(
        {
            rules: {
                name: {
                    minlength: 2,
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                subject: {
                    minlength: 2,
                    required: true
                },
                message: {
                    minlength: 2,
                    required: true
                }
            },
            highlight: function (element) {
                $(element).closest('.control-group').removeClass('success').addClass('error');
            },
            success: function (element) {
                element
                    .text('OK!').addClass('valid')
                    .closest('.control-group').removeClass('error').addClass('success');
            }
        });
}

function submitJob() {
    checkParam();

    var jobName = $("#jobName").val();
    var cateId = $("#cateId").val();
    var jobContent = $("#jobContent").val();
    var companyDesc = $("#companyDesc").val();
    var jobType = $("#jobType").val();
    var salary = $("#salary").val();
    var salaryType = $("#salaryType").val();
    var cityId = $("#cityId").val();
    var areaId = $("#areaId").val();
    var address = $("#address").val();
    var jobImg = $("#imgUploaded").attr('src');
    var experience = $("#experience").val();

    var welfarBox = [];
    $('#box input:checked').each(function () {
        welfarBox.push(this.value);
    });
    var welfare = welfarBox.toString();
    var userId = 12345; //todo mock -> 之后用户系统增加之后,切换到动态获取用户userId
    var degree = $("#degree").val();

    // check the param format
    if (!jobName.trim() || !companyDesc.trim() || !jobContent.trim() || !address.trim()) {
        console.log("input wrong");
        return;
    }

    var postJobParam = {
        jobName,
        cityId,
        cateId,
        areaId,
        jobContent,
        companyDesc,
        jobType,
        userId,
        jobImg,
        salary,
        salaryType,
        address,
        welfare,
        experience,
        degree
    };
    console.log(postJobParam);
    var util = new httpGet();

    util.ajax({
        url: "/api/user/recruiter/postJob",
        type: "post",
        dataGet: postJobParam
    }).done(function (res) {
        alert("提交岗位成功");
    }).fail(function (err) {
        console.log("error");
        alert(err.result.message);
    });
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

