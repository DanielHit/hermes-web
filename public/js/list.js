init();

function init() {
    bindEvent();
}

function bindEvent() {
    $('#jobListSearchButton').on('click', getJobList);
}

function getJobList() {
    var util = new httpGet();
    var cityId = 1;
    var areaId = 123;
    var cateId = 10001;
    var salary = 0;
    var postDays = 10;
    var jobType = 0;
    var sortType = 'default';
    var experience = 0;
    var degree = 0;
    var offset = 0;
    var limit = 10;

    // 请求 列表页的筛选参数
    var selectParam = {cityId, areaId, cateId, salary, postDays, jobType, sortType, experience, degree, offset, limit};

    util.ajax({
        url: "/api/list/",
        type: "get",
        dataGet: selectParam
    }).done(function (res) {
        var html = "";
        var jobTitleList = res.data.jobList;
        for (var i = 0; i < jobTitleList.length; i++) {

            html += `<a href='/jd?id=${jobTitleList[i].jobId}' class='list-group-item'>
            <div class='row'>
                <div class='col-md-10'>
                    <h4 class='list-group-item-heading'>${jobTitleList[i].jobName}
                        <small>${jobTitleList[i].minSalary}-${jobTitleList[i].maxSalary}</small>
                        <small style="color: #9d9d9d">${jobTitleList[i].postTime}</small>
                    </h4>
                    <div class="form-inline">
                        <i class="icon-map-marker select-icon-style">
                        </i>${jobTitleList[i].address}
                    </div>
                    <p class="list-group-item-text" style="padding-top: 3px">${jobTitleList[i].welfare}</p>
                </div>
                <div class="col-md-2">
                    <div class="list-item-img">
                        <img src="https://d1du115wj2d9xz.cloudfront.net/api/file/8sJYOo1ySoGAr51dmZdU/convert?rotate=exif&w=120&h=70&fit=crop&align=center&format=jpeg&quality=65"
                             alt="">
                    </div>
                </div>
            </div>
        </a>
        `;
        }

        $('#jobListTable').html(html);
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