/**
 * Created by Daniel on 3/9/16.
 */

// todo add 图片信息
var employerName = $("#employerName");
var employerPosition = $("#employerPosition");
var phoneNum = $("#phoneNum");

init();

function init() {
    bindEvent();
}

function bindEvent() {
    $("#applyJobButton").on("click", submitJob);
}

function submitJob() {

    var jobName = $("#jobName").val();
    var cateId = $("#cateId").val();
    var jobContent = $("#jobContent").val();
    var companyDesc = $("#companyDesc").val();
    var jobType = $("#jobType").val();
    var salary = $("#salary").val();
    var salaryType = $("#salaryType").val();
    var cityId = $("#cityId").val();
    var areaId = $("#areaId").val();
    var address = $("#address").val();
    var employerPosition = $("#employerPosition").val();
    var phoneNum = $("#phoneNum").val();
    var employerName = $("#employerName").val();

    console.log(jobName);
    console.log(cateId);
    console.log(jobContent);
    console.log(companyDesc);
    console.log(jobType);
    console.log(salary);
    console.log(salaryType);
    console.log(cityId);
    console.log(areaId);
    console.log(address);
    console.log(employerPosition)
    console.log(phoneNum)
    console.log(employerName)

}
