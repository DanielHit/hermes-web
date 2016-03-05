$(function () {
    var $table = $('#table');
    $table.bootstrapTable({
        url: 'boxJson',
        search: "true",
        pageSize: 10,
        columns: [
            {
                field: 'from',
                title: '发件人',
                sortable: true
            }, {
                field: 'company',
                title: '公司',
                sortable: true
            }, {
                field: 'content',
                title: '内容',
                sortable: true
            }, {
                field: 'notifyTime',
                title: '通知时间',
                sortable: true
            }
        ]
    })
})