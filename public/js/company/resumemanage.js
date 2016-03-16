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
            userId: 12345
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
        return row.resumeId
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


