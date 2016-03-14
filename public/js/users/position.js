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
                field: 'stage',
                title: '操作',
                sortable: false,
                titleTooltip: "查看 编辑 下架"
            }
        ]
    })
});

$(".nav-tabs").on("click", function(){
    console.log("被点击了");
});