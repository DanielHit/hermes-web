$(function () {
    var $table = $('#table');

    $table.bootstrapTable({
        //todo 文档: http://bootstrap-table.wenzhixin.net.cn/documentation/
        url: '/api/user/application/list?userId=100012',
        search: "true",
        pageSize: 10,
        columns: [
            {
                field: 'date',
                title: '修改日期',
                sortable: true
            }, {
                field: 'jobName',
                title: '职位',
                sortable: true
            }, {
                field: 'hireManager',
                title: '招聘人员',
                sortable: true
            }, {
                field: 'company',
                title: '公司',
                sortable: true
            }, {
                field: 'stage',
                title: '进度',
                sortable: truez
            }, {
                field: 'days',
                title: '已投递时间',
                sortable: true
            }
        ]
    })
})