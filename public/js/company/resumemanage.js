var selections = [];
var $table = $('#table');
var $remove = $('#remove');
var $invite = $('#invite');

$(function () {
    var $table = $('#table');
    $table.bootstrapTable({
        url: '/api/user/recruiter/getPostResume',
        search: "true",
        pageSize: 10,
        queryParams: {
            userId: 12345,
            stage: 0
        },
        method: 'get',
        responseHandler: responseHandler,
        detailView: true,
        columns: [
            {
                field: 'state',
                title: '选中',
                checkbox: true,
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'applicationId',
                title: '投递编号',
                sortable: true
            },
            {
                field: 'date',
                title: '投递时间',
                sortable: true
            }, {
                field: 'candidateName',
                title: '求职者名称',
                sortable: true
            }, {
                field: 'telephone',
                title: '电话',
                sortable: true
            }, {
                field: 'jobName',
                title: '岗位名称',
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

function operateFormatter(value, row, index) {
    return [
        '<a class="detail col-md-4" href="javascript:void(0)" title="detail">',
        '<i class="glyphicon glyphicon-new-window"></i> 详细简历',
        '</a>',
        '<a class="ok col-md-4" href="javascript:void(0)" title="send">',
        '<i class=" glyphicon glyphicon-ok"></i> 邀请面试',
        '</a>',
        '<a class="refuse col-md-4" href="javascript:void(0)" title="remove">',
        '<i class="glyphicon glyphicon-remove"></i> 不合适',
        '</a>'
    ].join('');
}


function responseHandler(res) {
    //$.each(res.rows, function (i, row) {
    //    row.state = $.inArray(row.id, selections) !== -1;
    //});
    return res;
}

function detailFormatter(index, row) {
    var html = [];
    $.each(row, function (key, value) {
        html.push('<p><b>' + key + ':</b> ' + value + '</p>');
    });
    return html.join('');
}

$table.on('check.bs.table uncheck.bs.table ' +
    'check-all.bs.table uncheck-all.bs.table', function () {
    $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
    $invite.prop('disabled', !$table.bootstrapTable('getSelections').length);
    // save your data, here just save the current page
    selections = getIdSelections();
    // push or splice the selections if you want to save all data selections
});


function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
        return row.applicationId;
    });
}

$remove.click(function () {
    var ids = getIdSelections();
    console.log(ids.toString());
    $table.bootstrapTable('remove', {
        field: 'resumeId',
        values: ids
    });
    $remove.prop('disabled', true);
});

$invite.click(function () {
    var ids = getIdSelections();
    $table.bootstrapTable('add', {
        field: 'id',
        values: ids
    });
    $remove.prop('disabled', true);
});

$("li").click(function () {
    $(this).addClass("active");
    $(this).siblings("li").removeClass("active");

    var refreshParam;

    if ($(this).attr("id") === "wait") {
        refreshParam = {query: {userId: '12345', stage: 0}};
    } else if ($(this).attr("id") === "success") {
        refreshParam = {query: {userId: '12345', stage: 1}};
    } else {
        refreshParam = {query: {userId: '12345', stage: 2}};
    }

    $('#table').bootstrapTable('refresh', refreshParam);

});

window.operateEvents = {
    'click .detail': function (e, value, row, index) {
        alert('You click like action, row: ' + JSON.stringify(row.applicationId));

        // todo 进行页面跳转

    },

    'click .ok': function (e, value, row, index) {

        var http = new httpGet();
        var applicationId = row.applicationId;
        var stage = 1;

        var param = {applicationId, stage};
        http.ajax({
            url: "/api/user/recruiter/handleResume",
            dataGet: param,
            type: "post"
        }).done(function (res) {
            console.log("ok");
        }).fail(function (err) {
            console.log("ff");
        });

        $table.bootstrapTable('remove', {
            field: 'applicationId',
            values: [row.applicationId]
        });

    },

    'click .refuse': function (e, value, row, index) {
        console.log("enter");
        $table.bootstrapTable('remove', {
            field: 'applicationId',
            values: [row.applicationId]
        });
        var http = new httpGet();
        var applicationId = row.applicationId;
        var stage = 2;
        var param = {applicationId, stage};

        http.ajax({
            url: "/api/user/recruiter/handleResume",
            dataGet: param,
            type: "post"
        }).done(function (res) {
            console.log("ok");
        }).fail(function (err) {
            console.log("ff");
        });

        // todo 请求ajax请求,remove 相应的参数

    }
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


