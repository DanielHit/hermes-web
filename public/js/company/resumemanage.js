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
                title: '简历标号',
                sortable: true
            },
            {
                field: 'date',
                title: '投递时间',
                sortable: true
            }, {
                field: 'name',
                title: '求职者名称',
                sortable: true
            }, {
                field: 'telephone',
                title: '电话',
                sortable: true
            }, {
                field: 'operation',
                title: '操作',
                sortable: false,
                titleTooltip: "查看 编辑 下架"
            }
        ]
    })
});
