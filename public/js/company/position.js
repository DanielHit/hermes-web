var $table = $("#table");

$(function () {
    var $table = $('#table');

    $table.bootstrapTable({
        url: '/api/user/recruiter/getPostJobList',
        search: "true",
        pageSize: 10,
        queryParams: {
            userId: 100012
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
    return [
        '<a class="view col-md-4" href="javascript:void(0)" title="Like">',
        '<i class="glyphicon glyphicon-new-window"></i> 详细简历',
        '</a>  ',
        '<a class="ok col-md-4" href="javascript:void(0)" title="Remove">',
        '<i class=" glyphicon glyphicon-ok"></i> 邀请面试',

        '<a class="remove col-md-4" href="javascript:void(0)" title="Remove">',
        '<i class="glyphicon glyphicon-remove"></i> 不合适',
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

