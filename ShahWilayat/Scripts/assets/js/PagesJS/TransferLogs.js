GetAllTransferLogs();

function GetAllTransferLogs() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/TransferLogs/GetAllTransferLogs",
        data: {}
    });
    request.done(function (data) {

        onGetAllTransferLogs(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllTransferLogs(data) {

    try {
        var res = JSON.parse(data);
        var divTbodyGoalFund = $(".TransferLogsListing").html("");
        $("#TransferLogsListing").tmpl(res).appendTo(divTbodyGoalFund);
        var i = 1;
        $('.trTransferLogs').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }
}

