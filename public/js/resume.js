init();

function init() {
    console.log("hello");
    bindEvent();
}

function bindEvent() {
    //$("#datetimepicker").datepicker();
}


$(function () {
    $('#datetimepicker4').datetimepicker({
        format: 'YYYY/MM/DD',
        minDate: {
            Default:true
        }
    });
});
