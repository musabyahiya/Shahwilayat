GetCurrentAllottees();
GetAllShareRegister();
var ShareRegisterList = [];
var objEditRow;
function GetCurrentAllottees() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/ShareRegister/GetCurrentAllottees",
        data: {}
    });
    request.done(function (data) {

        var res = JSON.parse(data);
        onGetCurrentAllottees(res);

    });
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);

    });
}


function onGetCurrentAllottees(data) {
    var res = data;
    var divTbodyGoalFund = $(".ShareRegisterListing").html("");
    $("#ShareRegisterListing").tmpl(res).appendTo(divTbodyGoalFund);

    var i = 1;
    $('.trShareRegister').each(function () {
        $(this).find('td').first().text(i);
        i++;
    });

    ProgressBarHide();
}

function GetAllShareRegister() {

    var request = $.ajax({
        method: "POST",
        url: "/ShareRegister/GetAllShareRegister",
        data: {}
    });
    request.done(function (data) {

        var res = JSON.parse(data);
        ShareRegisterList = res;
    });
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);

    });
}


function ExportExcel(selector) {
    ShowToastr('Info', 'Importing data', 'Sending data to excel');
    objEditRow = $(selector).closest('tr');
    var PlotId = objEditRow.find('.hdnPlotId').val();

    var obj = ShareRegisterList.filter(x=> x.PlotId == PlotId);



    var divTbodyGoalFund = $(".ShareRegisterPlotWiseListing").html("");
    $("#ShareRegisterPlotWiseListing").tmpl(obj).appendTo(divTbodyGoalFund);

    var i = 1;
    $('.trShareRegisterPlotWiseListing').each(function () {
        $(this).find('td').first().text(i);
        i++;
    });

    tableToExcelFormatted('ShareRegisterExport', 'Worksheet 1', 'ShareRegister.xls')
    ShowToastr('Success', 'Generating Excel', 'Successfully done');
}