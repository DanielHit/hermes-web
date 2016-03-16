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

function operateFormatter(value, row, index) {
    // todo 不同样式展示不同
    return [
        '<a class="view col-md-4" href="javascript:void(0)" title="Like">',
        '<i class="glyphicon glyphicon-new-window"></i> 查看',
        '</a>  ',
        '<a class="ok col-md-4" href="javascript:void(0)" title="Remove">',
        '<i class=" glyphicon glyphicon-ok"></i> 编辑',

        '<a class="remove col-md-4" href="javascript:void(0)" title="Remove">',
        '<i class="glyphicon glyphicon-remove"></i> 下线',
        '</a>'
    ].join('');
}

window.operateEvents = {
    'click .like': function (e, value, row, index) {
        alert('You click like action, row: ' + JSON.stringify(row));
    },
    'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        });
    }
};

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
    }

    $('#table').bootstrapTable('refresh', refreshParam);

});

