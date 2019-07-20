﻿GetAllPaymentMemberWise();
AllClickFunction();

var PaymentMemberWiseList = [];

function AllClickFunction() {
    $('.btnPrintReceipt').click(function () {
        var contents = $("#tblPaymentDetails").html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title>PaymentMemberWise</title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.

        frameDoc.document.write('<link href="/Content/css/PrintMaterial/Receipt.css" rel="stylesheet" type="text/css" />');
        //Append the DIV contents.
        frameDoc.document.write(contents);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();
        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            frame1.remove();
        }, 500);
    });



}
function GetAllPaymentMemberWise() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/PaymentMemberWise/GetRptPaymentMemberWise",
        data: {}
    });
    request.done(function (data) {

        onGetAllPaymentMemberWise(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllPaymentMemberWise(data) {
    try {

        var res = JSON.parse(data);
        PaymentMemberWiseList = res;
        BindListingRows(res);
        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }

}


function ViewDetails(selector) {
    $(".AppendedRow").remove();
    objEditRow = $(selector).closest('tr');

    var MemberId = objEditRow.find('.hdnMemberId').val();
    var PlotId = objEditRow.find('.hdnPlotId').val();
    $('.printMembershipNo').html(objEditRow.find('.tdMembershipNo').text());
    $('.printFullName').html(objEditRow.find('.tdName').text());
    $('.printCNIC').html(objEditRow.find('.hdnCnic').val());
    $('.printPresentAddress').html(objEditRow.find('.hdnPresentAddress').val());
    $('.printCellNo').html(objEditRow.find('.hdnCellNo').val());
    $('.printPaymentDate').html(objEditRow.find('.tdPaymentDate').text());
    $('.printPlotType').html(objEditRow.find('.tdPlotType').text());
    $('.printSize').html(objEditRow.find('.tdSize').text() + ' Sqyd');
    $('.printPlotNo').html(objEditRow.find('.tdPlotNo').text());



    var obj = PaymentMemberWiseList.filter(x=> x.PlotId == PlotId && x.MemberId == MemberId);

    var i = 1;
    var tr = '';
    var TotalAmount = 0;
    $.each(obj, function (key, value) {
        tr += '<tr class="AppendedRow RowCenter" style="line-height:30px;border-bottom: 1px solid #e7eaec; font-size:13px" >';
        tr += '<td align="center">' + i + '</td>';
        tr += '<td style="text-align:left" class="tdHead">' + value.PaymentCategory + ' - ' + value.PaymentSubCategory + '</td>';
        tr += '<td align="center" class="tdDueDate">' + formatDate(value.DueDate) + '</td>';
        tr += '<td align="center" class="tdPaymentDate">' + formatDate(value.PaymentDate) + '</td>';
        tr += '<td style="text-align:right" class="tdPaymentAmount">' + moneyFormat(value.PaymentAmount) + '&nbsp;</td>';
        tr += '</tr>'
        i++;
        TotalAmount += value.PaymentAmount;
    });

    $(tr).insertAfter($(".BindAfter"));
    BindTextToSelector('.tdTotalAmount', moneyFormat(TotalAmount) + '&nbsp;');

}


function BindListingRows(res) {
    var i = 1;
    var duplicationPaymentMemberWise = false;
    $.each(res, function (key, value) {
        var trHtml = '';

        if (!CheckDuplicateListing(value.MemberId, value.PlotId)) {
            trHtml = '<tr class="trPaymentMemberWise">';
            trHtml += '<input type="hidden" class="hdnMemberId" value="' + value.MemberId + '" />';
            trHtml += '<input type="hidden" class="hdnPlotId" value="' + value.PlotId + '" />';
            trHtml += '<input type="hidden" class="hdnCnic" value="' + value.Cnic + '" />';
            trHtml += '<input type="hidden" class="hdnCellNo" value="' + value.CellNo + '" />';
            trHtml += '<input type="hidden" class="hdnPresentAddress" value="' + value.PresentAddress + '" />';
            trHtml += '<td>' + i + '</td>';
            trHtml += '<td class="project-title tdPlotType">' + value.PlotType + '</td>';
            trHtml += '<td class="project-title tdPlotNo">' + value.PlotNo + '</td>';
            trHtml += '<td class="project-title tdSize" align="right">' + value.Size + '</td>';
            trHtml += '<td class="project-title tdMembershipNo">' + value.MembershipNo + '</td>';
            trHtml += '<td class="project-title tdName">' + value.FullName + '</td>';
            trHtml += '<td class="project-title" nowrap="" align="center">';
            trHtml += '<input type="button" data-toggle="modal" data-target="#ViewDetails" onclick="ViewDetails(this)" value="Details" class="btn btn-group btn-xs btn-success">';
            trHtml += '</td>';
            trHtml += '</tr>';

            $(".PaymentMemberWiseListing").append(trHtml);
            trHtml = '';
            i++;
        }
    });
}

function CheckDuplicateListing(MemberId, PlotId) {
    var value = false;
    $('.trPaymentMemberWise').each(function () {
        if (($(this).children('.hdnMemberId').val() == MemberId) && ($(this).children('.hdnPlotId').val() == PlotId)) {
            value = true;
        }
    });
    return value;
}