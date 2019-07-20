GetAllAllotmentOrders();


function GetAllAllotmentOrders() {
    ProgressBarShow();

    var request = $.ajax({
        method: "POST",
        url: "/AllotmentRegister/GetAllAllotmentOrders",
        data: {}
    });
    request.done(function (data) {

        onGetAllAllotmentOrders(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllAllotmentOrders(data) {

    try {
        var res = data;
        var divTbodyGoalFund = $(".AllotmentOrderListing").html("");
        $("#AllotmentOrderListing").tmpl(res).appendTo(divTbodyGoalFund);
        var i = 1;
        $('.trAllotmentOrder').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }

}


function ExportExcel() {
    ShowToastr('Info', 'Importing data', 'Sending data to excel');


    tableToExcelFormatted('AllotmentRegisterExport', 'Worksheet 1', 'Nomiee.xls')
    ShowToastr('Success', 'Generating Excel', 'Successfully done');
}