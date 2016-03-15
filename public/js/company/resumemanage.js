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
            }
            , {
                field: 'operation',
                title: '操作',
                sortable: false,
                titleTooltip: "查看 编辑 下架"
            }
        ]
    })
});
