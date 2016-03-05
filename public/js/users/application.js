$(function () {
    var $table = $('#table');
    $table.bootstrapTable({
        url: 'applicationJson',
        columns: [
            {
                field: 'modified',
                title: '修改日期',
                sortable: true
            }, {
                field: 'job',
                title: '职位',
                sortable: true
            }, {
                field: 'recruiter',
                title: '招聘人员',
                sortable: true
            }, {
                field: 'company',
                title: '公司',
                sortable: true
            }, {
                field: 'progress',
                title: '进度',
                sortable: true
            }, {
                field: 'status',
                title: '状态',
                sortable: true
            }, {
                field: 'postTime',
                title: '已投递时间',
                sortable: true
            },
        ]
    })
})