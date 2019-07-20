GetCurrentAllottees();
GetAllNominees();
var NomineesList = [];
var objEditRow;
function GetCurrentAllottees() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/NomineeMemberWise/GetCurrentAllottees",
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
    var divTbodyGoalFund = $(".NomineeMemberWiseListing").html("");
    $("#NomineeMemberWiseListing").tmpl(res).appendTo(divTbodyGoalFund);

    var i = 1;
    $('.trNomineeMemberWise').each(function () {
        $(this).find('td').first().text(i);
        i++;
    });

    ProgressBarHide();
}

function GetAllNominees() {

    var request = $.ajax({
        method: "POST",
        url: "/NomineeMemberWise/GetAllNominees",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        NomineesList = res;
    });
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);

    });
}


function ExportExcel(selector) {
    ShowToastr('Info', 'Importing data', 'Sending data to excel');
    objEditRow = $(selector).closest('tr');
    var MemberId = objEditRow.find('.hdnMemberId').val();

    var obj = NomineesList.filter(x=> x.MemberId == MemberId);

    BindTextToSelector('.tdMembershipNoExcel', objEditRow.find('.tdMembershipNo').text().trim());
    BindTextToSelector('.tdPlotNoExcel', objEditRow.find('.tdPlotNo').text().trim());
    BindTextToSelector('.tdSizeExcel', objEditRow.find('.tdSize').text().trim());
    BindTextToSelector('.tdNameExcel', objEditRow.find('.tdName').text().trim());

    var divTbodyGoalFund = $(".NomineeListing").html("");
    $("#NomineeListing").tmpl(obj).appendTo(divTbodyGoalFund);

    var i = 1;
    $('.trNominee').each(function () {
        $(this).find('td').first().text(i);
        i++;
    });

    tableToExcelFormatted('NomineeExport', 'Worksheet 1','Nomiee.xls')
    ShowToastr('Success', 'Generating Excel', 'Successfully done');
}