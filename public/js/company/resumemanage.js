$(function () {
    var $table = $('#table');
    $table.bootstrapTable({
        url: '/api/user/recruiter/getPostResume',
        search: "true",
        pageSize: 10,
        queryParams: {
            userId: 12345
        },
        method: 'get',
        columns: [
            {
                field: 'resumeId',
                title: '简历标号',
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
            }, {
                field: 'operate',
                title: '选中',
                checkbox: true,
                align: 'center',
                valign: 'middle'
            }
        ]
    })
});

function operateFormatter(value, row, index) {
    return [
        '<a class="like" href="javascript:void(0)" title="Like">',
        '<i class="glyphicon glyphicon-heart"></i>',
        '</a>  ',
        '<a class="remove" href="javascript:void(0)" title="Remove">',
        '<i class="glyphicon glyphicon-remove"></i>',
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
