GetAllInvoices();
GetMaxInvoiceId();
var InvoiceList;
var Email = '';

AllClickFunction();

var Invoice =
[{
    InvoiceId: 0,
    InvoiceNo: null,
    PlotId: 0,
    MemberId: 0,
    SnapShot: null,
    InvoiceDate: null,
    Purpose : null
}]

function GetMaxInvoiceId() {

    var request = $.ajax({
        method: "POST",
        url: "/Invoice/GetMaxInvoiceId",
        data: {}
    });
    request.done(function (data) {

        onGetMaxInvoiceId(data);

    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetMaxInvoiceId(data) {
    try {

       var res = data;
        Invoice[0].InvoiceNo = 'INV-' + leftPad(res, 3);
    }

    catch (Err) {
        console.log(Err);
    }
}

function PrintInvoice() {

    Invoice[0].Purpose = "Print";
    CreateNewInvoice();

    $(function () {
        //$('#Print').load('http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js');

    });

    var contents = $("#InvoiceTable").html();
    var frame1 = $('<iframe />');
    frame1[0].name = "frame1";
    frame1.css({ "position": "absolute", "top": "-1000000px" });
    $("body").append(frame1);
    var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
    frameDoc.document.open();
    //Create a new HTML document.
    frameDoc.document.write('<html><head><title>Member Individual Sheet</title>');
    frameDoc.document.write('</head><body>');
    //Append the external CSS file.
    frameDoc.document.write('<link href="/Content/css/PrintMaterial/Invoice.css" rel="stylesheet" type="text/css" />');
    //Append the DIV contents.
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        frame1.remove();
    }, 500);



}

function GetAllInvoices() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/Invoice/GetAllInvoices",
        data: {}
    });
    request.done(function (data) {

        onGetAllInvoices(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}
function onGetAllInvoices(data) {
    try {
        var res = data.split("|");
        var res1 = JSON.parse(res[0]);
        InvoiceList = JSON.parse(res[1]);
        var divTbodyGoalFund = $(".InvoiceListing").html("");
        $("#InvoiceListing").tmpl(res1).appendTo(divTbodyGoalFund);
        var i = 1;
        $('.trInvoice').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });

        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }

}
function AllClickFunction() {

    $('.btnSendInvoiceMail').click(function () {
        ProgressBarShow();
        CreateNewInvoice();
        var html = CreateInvoiceHtml();
        SendInvoiceEmail(html, Email);
        ProgressBarHide();
    });
}


function CreateInvoiceHtml() {
    var html = "<html>";
    html += "<head>";
    html += "<title>Invoice</title>";
    html += "<style type='text/css'>";
    html += "@import url(https://fonts.googleapis.com/css?family=Open+Sans);body{font-family: 'open sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;}body{-webkit-print-color-adjust: exact !important;}.Headers th{background-color: #24c6c8; color: white; font-weight: 600; font-size: 14px; height: 30px; text-align:center}label{font-size: 16px; font-weight: 500; text-align: center;}span{font-size: 14px; border: none;}thead span{font-size: 14px; border: none; font-weight: 600;}.center{text-align: center;}.RowCenter td{text-align: center; border-bottom: 1px solid #e7eaec;}";
    html += "</style>";
    html += "</head>";
    html += "<body style='background-color:#fff;'>";
    html += "<div>";
    // binding from Print table
    html += $('#InvoiceTable').html();
    // binding from Print table
    html += "</div>";
    html += "</body>";
    html += "</html>";

    html = html.replace(/"/g, '\'');

    return html;
}

function SendInvoiceEmail(Html, Email) {

    Invoice[0].Purpose = "Email";
    var request = $.ajax({
        method: "POST",
        url: "/Invoice/SendInvoiceEmail",
        data: { Html: Html, Email: Email }
    });
    request.done(function (data) {


        var res = data;
        if (res == "true") {
            ProgressBarHide();
            showSuccess('Email has been successfully sent!');
        }
        else {
            ProgressBarHide();
            showError('Email sending failed');
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function ViewInvoice(selector) {
    $('.AppendedRow').html('');
    objEditRow = $(selector).closest('tr');


   


    $('.printMembershipNo').html(objEditRow.find('.tdMembershipNo').text());
    $('.printFullName').html(objEditRow.find('.tdName').text());
    $('.printCNIC').html(objEditRow.find('.hdnCNIC').val());
    $('.printPresentAddress').html(objEditRow.find('.hdnPresentAddress').val());
    $('.printCellNo').html(objEditRow.find('.hdnCellNo').val());
    $('.printInvoiceNo').html(Invoice[0].InvoiceNo);
    $('.printInvoiceDate').html(GetCurrentDate());
    $('.printPlotType').html(objEditRow.find('.tdPlotType').text());
    $('.printSize').html(objEditRow.find('.tdSize').text());
    $('.printPlotNo').html(objEditRow.find('.tdPlotNo').text());
    $('.printPhase').html(objEditRow.find('.hdnPhase').val());

    Email = objEditRow.find('.hdnEmail').val();

    var PlotId = objEditRow.find('.hdnPlotId').val();
    var MemberId = objEditRow.find('.hdnMemberId').val();
    var obj = InvoiceList.filter(x=> x.PlotId == PlotId && x.MemberId == MemberId);

    var html = '';
    var i = 1;
    var totalAmount = 0;
    $.each(obj, function (key, value) {
        html += "<tr style='line-height:25px;border-bottom:1px solid #e8e8e8;' class='RowCenter AppendedRow'>";
        html += "<td><span>" + i + "</span></td>";
        html += "<td style='text-align:left'>" + value.PaymentCategory + ' - ' + value.PaymentSubCategory + "</td>";
        html += "<td>" + formatDate(value.DueDate) + "</td>";
        html += "<td class='tdAmount' style='text-align:right'><span>" + moneyFormat(value.PaymentAmount) + "</span>&nbsp;</td>";
        html += "</tr>";

        totalAmount += value.PaymentAmount;
        i++;
    });

    $(html).insertAfter($(".InvoiceBindAfter"));
    $('.printTotalAmount').html(moneyFormat(totalAmount) + '&nbsp;');

    //Invoice
    Invoice[0].PlotId = objEditRow.find('.hdnPlotId').val();
    Invoice[0].MemberId = objEditRow.find('.hdnMemberId').val();
    Invoice[0].SnapShot = CreateInvoiceHtml();
    Invoice[0].InvoiceDate = GetCurrentDate();
    //Invoice
}

function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

function CreateNewInvoice() {
    var request = $.ajax({
        method: "POST",
        url: "/Invoice/CreateNewInvoice",
        data: Invoice[0]
    });
    request.done(function (data) {

        var res = data;
        if (res > 0) {
            showSuccess('Successfully log generated!');
            onGetMaxInvoiceId(res);
        }
        else
        {
            showError("Invoice log not generated!");
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });

}