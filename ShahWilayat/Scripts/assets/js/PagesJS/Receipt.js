GetAllReceipts();



AllClickFunction();
SearchTable();
var ReceiptList;
var PaidReceiptList;
var ReceiptNo;
var objEditRow;


function SearchTable() {
    $(".txtSearch").keyup(function () {
        ProgressBarShow();
        _this = this;

        var search = $(_this).val();

        if (search == '') {
            onGetAllReceipts(ReceiptList);
        }
        else {
            var obj = ReceiptList.filter(x=> x.ReceiptNo.includes(search()) ||
				x.PlotNo.includes(search)
				)
            onGetAllReceipts(obj);

        }
        ProgressBarHide();
    });
}
function AllClickFunction() {


    $(".btnGenerateReceipt").click(function () {

        var contents = $("#PrintReceipt").html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title>Receipt</title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.
        frameDoc.document.write('<link href="/Content/assets/css/PrintMaterial/Receipt/Receipt.css" rel="stylesheet" type="text/css" />');
        //Append the DIV contents.
        frameDoc.document.write(contents);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();
        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            frame1.remove();
        }, 1000);
    });

}


function GetPaidReceipt(ReceiptNo) {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/Receipt/GetPaidReceipt",
        data: { ReceiptNo: ReceiptNo }
    });
    request.done(function (data) {

        onGetPaidReceipt(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetPaidReceipt(data) {

    try {
        var res = JSON.parse(data)
        PaidReceiptList = res;

        // Binding Receipt
        var obj = PaidReceiptList.filter(x=> x.ReceiptNo == ReceiptNo);
        var TotalAmount = 0;
        $.each(obj, function () {
            TotalAmount += parseFloat(this.PaymentAmount);
        });

        BindTextToSelector('.printIssueDate', GetCurrentDatePakFormat());
        BindTextToSelector('.printReceiptNo', obj[0].ReceiptNo);
        BindTextToSelector('.printMembershipNo', obj[0].MembershipNo);
        BindTextToSelector('.printPaymentDate', formatDatePakFormat(obj[0].PaymentDate));
        BindTextToSelector('.printPlotNo', obj[0].PlotNo);
        BindTextToSelector('.printReceiptNo', obj[0].ReceiptNo);
        BindTextToSelector('.printTitle', 'Received from ' + obj[0].Title + ': ');
        BindTextToSelector('.printFullName', obj[0].FullName);
        BindTextToSelector('.printMemberRelation', obj[0].MemberRelation + ': ');
        BindTextToSelector('.printReceiptNo', obj[0].ReceiptNo);
        BindTextToSelector('.printFatherName', obj[0].FatherName);

        BindTextToSelector('.printAmount', moneyFormat(TotalAmount) + '/= (' + GetAmountInWords(Math.trunc(TotalAmount)).capitalize() + ')');
        BindTextToSelector('.printPaymentMethod', 'by ' + obj[0].PaymentMethod + ':');
        BindTextToSelector('.printChequeNo', obj[0].ChequeNo);
        BindTextToSelector('.printChequeDate', formatDatePakFormat(obj[0].ChequeDate));
        BindTextToSelector('.printPlotType', 'on account of ' + obj[0].PlotType + ' Plot of:');
        BindTextToSelector('.printSize', obj[0].Size.toFixed(2));
        BindTextToSelector('.printTotalAmount', moneyFormat(TotalAmount) + '/-');


        var divTbodyGoalFund = $(".ReceiptEntityListing").html("");
        $("#ReceiptEntityListing").tmpl(obj).appendTo(divTbodyGoalFund);

        var i = 1;
        $('.trReceiptEntity').each(function () {
            $(this).find('span').first().text(i);
            i++;
        });


        PrintExtraRows(obj.length);
        // Binding Receipt
        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }
    ProgressBarHide();
}

function GetAllReceipts() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/Receipt/GetAllReceipts",
        data: {}
    });
    request.done(function (data) {

        onGetAllReceipts(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllReceipts(data) {

    try {
        var res = JSON.parse(data)
        ReceiptList = res;
        var divTbodyGoalFund = $(".ReceiptListing").html("");
        $("#ReceiptListing").tmpl(res).appendTo(divTbodyGoalFund);

        var i = 1;
        $('.trReceipt').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
        SearchTable();
        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }
    ProgressBarHide();
}
function EditReceipt(selector) {
    objEditRow = $(selector).closest('tr');
     ReceiptNo = objEditRow.find('.hdnReceiptNo').val();

    GetPaidReceipt(ReceiptNo);


}

function PrintExtraRows(Lenght) {
    var tblRows = '';
    var InitialPoint = $('.trReceiptEntity').length + 1;
    for (var i = 0; i < 16 - Lenght; i++) {
        tblRows += '<tr style="line-height:1.3;" >';

        tblRows += '<td style="text-align: center;"><span>' + InitialPoint + '</span></td>';
        tblRows += '<td><span>__________________</span></td>';

        tblRows += '<td style="text-align: center;"><span>_______</span></td>';
        tblRows += '</tr>';
        InitialPoint++;
    }

    $('.trReceiptEntity:last').after(tblRows);

}


