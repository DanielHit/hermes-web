var $table = $("#table");

$(function () {
    var $table = $('#table');
    $table.bootstrapTable({
        url: '/api/user/recruiter/getPostJobList',
        search: "true",
        pageSize: 10,
        queryParams: {
            userId: 12345,
            stage: 1
        },
        method: 'get',
        columns: [
            {
                field: 'jobId',
                title: '岗位编号',
                sortable: true
            },
            {
                field: 'editDate',
                title: '更新日期',
                sortable: true
            }, {
                field: 'jobName',
                title: '职位名称',
                sortable: true
            }, {
                field: 'applicationNum',
                title: '投递数量',
                sortable: true
            }, {
                field: 'operate',
                title: '操作',
                align: 'center',
                events: operateEvents,
                formatter: operateFormatter
            }
        ]
    })
});


$("li").click(function () {
    $(this).addClass("active");
    $(this).siblings("li").removeClass("active");
});

$("li").click(function () {

    $(this).addClass("active");
    $(this).siblings("li").removeClass("active");

    var refreshParam;
    if ($(this).attr("id") === "online") {
        refreshParam = {query: {userId: '12345', stage: 1}};
    } else if ($(this).attr("id") === "offline") {
        refreshParam = {query: {userId: '12345', stage: 0}};
        // 重新设置
    }


    $('#table').bootstrapTable('refresh', refreshParam);

    var params = {field: 'operate'};
    $('#table').bootstrapTable('hideColumn', params);
});


function operateFormatter(value, row, index) {
    if ($("#online").hasClass("active")) {
        return [
            '<a class="view col-md-4" href="javascript:void(0)" title="Like">',
            '<i class="glyphicon glyphicon-new-window"></i> 查看',
            '</a>  ',
            '<a class="edit col-md-4" href="javascript:void(0)" title="Remove">',
            '<i class=" glyphicon glyphicon-ok"></i> 编辑',

            '<a class="offline col-md-4" href="javascript:void(0)" title="Remove">',
            '<i class="glyphicon glyphicon-remove"></i> 下线',
            '</a>'
        ].join('');
    } else {
        return [
            '<a class="view col-md-4" href="javascript:void(0)" title="Like">',
            '<i class="glyphicon glyphicon-new-window"></i> 查看',
            '</a>  ',
            '<a class="edit col-md-4" href="javascript:void(0)" title="Remove">',
            '<i class=" glyphicon glyphicon-ok"></i> 编辑',

            '<a class="online col-md-4" href="javascript:void(0)" title="Remove">',
            '<i class="glyphicon glyphicon-remove"></i> 重新上线',
            '</a>'
        ].join('');

    }
}

window.operateEvents = {
    'click .view': function (e, value, row, index) {
        alert('You click like action, row: ' + JSON.stringify(row.applicationId));
    },

    'click .eidt': function (e, value, row, index) {
        alert("编辑吧,小于走")
    },

    'click .offline': function (e, value, row, index) {

        var http = new httpGet();
        var jobId = row.jobId;
        var stage = 0;

        var param = {jobId, stage};

        http.ajax({
            url: "/api/user/recruiter/handlePostJob",
            dataPost: param,
            type: "post"
        }).done(function (res) {
            console.log("ee");
        }).fail(function (err) {
            console.log(err.message);
        });
        $table.bootstrapTable('remove', {
            field: 'jobId',
            values: [row.jobId]
        });
    },

    'click .online': function (e, value, row, index) {

        var http = new httpGet();
        var jobId = row.jobId;
        var stage = 1;

        var param = {jobId, stage};

        http.ajax({
            url: "/api/user/recruiter/handlePostJob",
            dataPost: param,
            type: "post"
        }).done(function (res) {
            console.log("ee");
        }).fail(function (err) {
            console.log(err.message);
        });
        $table.bootstrapTable('remove', {
            field: 'jobId',
            values: [row.jobId]
        });
    },

};

// ajax 请求
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


