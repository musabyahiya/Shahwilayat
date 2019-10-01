GetAllPaymentCategory();
GetAllPlotType();
GetAllPaymentMethod();
AllClickFunction();
GetAllPaymentType();
AllChangeFunction();

var objEditRow;
var ChargesList;
var MonthDifference;
var PlotList;
var MemberPlotList;
var AmountPayable;
var Email;

function AllChangeFunction() {
    $(".ddlMember").change(function () {
        var MemberId = $(this).val();
        var obj = PlotList.filter(x => x.MemberId == MemberId);
        MemberPlotList = obj;

        onGetAllPlots(obj);
    });

    $(".ddlPlotType").change(function () {
        var PlotTypeId = $(this).val();
        var obj = MemberPlotList.filter(x => x.PlotTypeId == PlotTypeId);
        onGetAllPlots(obj);

    });

    $(".ddlAllotmentType").change(function () {
        var AllotmentTypeId = $(this).val();
        GetAllMembers(AllotmentTypeId);
        GetAllPlots(AllotmentTypeId);

    });

    $('.ddlPaymentMethod').change(function () {
        if ($('.ddlPaymentMethod').val() != 2) {
            $('.txtChequeNo').val('');
            $('.txtChequeDate').val('');
        }
        ActivateChequeNo();
    });

}

function AllClickFunction() {


    $('.btnManualPayment').click(function () {
        if (!validateForm(".frmManualPayment")) return;


        var PaymentMethodId = $('.ddlPaymentMethod').val();
        var PaymentCategoryId = $('.ddlPaymentCategory').val();
        var PaymentDate = formatDate($('.txtPaymentDate').val());
        var MemberId = $('.ddlMember').val();
        var PlotId = $('.ddlPlot').val();
        var PaymentAmount = $('.txtPayableAmount').val();
        var PaymentTypeId = $('.ddlPaymentType').val();
        var AllotmentTypeId = $('.ddlAllotmentType').val() == 1 ? 1 : 0;
        var ReceiptNo = $('.txtReceiptNo').val();
        var ChequeNo = $('.txtChequeNo').val();
        var ChequeDate = PaymentMethodId == 2 ? formatDate($('.txtChequeDate').val()) : '';
        var Remarks = $('.txtRemarks').val();

        CreateNewPayment(PaymentMethodId, PaymentCategoryId, PaymentDate, MemberId, PlotId, PaymentAmount, PaymentTypeId, AllotmentTypeId, ReceiptNo, ChequeNo, ChequeDate, Remarks);

        // Init();
    });

    $(".tdPaymentAmount").click(function () {
        if ($(this).attr("contentEditable") == true) {
            $(this).attr("contentEditable", "false");
        } else {
            $(this).attr("contentEditable", "true");
        }
    })

}


function GetAllMembers(AllotmentTypeId) {

    var request = $.ajax({
        method: "POST",
        url: "/ManualPayment/GetMemberByAllotmentType",
        data: { AllotmentTypeId: AllotmentTypeId }
    });
    request.done(function (data) {

        onGetAllMembers(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}



function GetAllPlotType() {

    var request = $.ajax({
        method: "POST",
        url: "/ManualPayment/GetAllPlotType",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        onGetAllPlotType(res);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllPlotType(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlPlotType', res);
    }
    catch (Err) {
        console.log(Err);
    }
}

function GetAllPaymentCategory() {

    var request = $.ajax({
        method: "POST",
        url: "/ManualPayment/GetAllPaymentCategory",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        onGetAllPaymentCategory(res);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllPaymentCategory(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlPaymentCategory', res);
    }
    catch (Err) {
        console.log(Err);
    }
}

function GetAllPaymentType() {

    var request = $.ajax({
        method: "POST",
        url: "/ManualPayment/GetAllPaymentType",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        onGetAllPaymentType(res);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllPaymentType(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlPaymentType', res);
    }
    catch (Err) {
        console.log(Err);
    }
}


function GetAllPlots(AllotmentTypeId) {

    var request = $.ajax({
        method: "POST",
        url: "/ManualPayment/GetAllPlots",
        data: { AllotmentTypeId: AllotmentTypeId }
    });
    request.done(function (data) {

        var res = JSON.parse(data);
        PlotList = res;
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllPlots(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlPlot', res);

    }
    catch (Err) {
        console.log(Err);
    }

}

function onGetAllPlots_upd(data) {
    var res = data;
    FillDropDownByReference('.ddlPlot_upd', res);
}
function GetAllPaymentMethod() {

    var request = $.ajax({
        method: "POST",
        url: "/ManualPayment/GetAllPaymentMethod",
        data: {}
    });
    request.done(function (data) {
        onGetAllPaymentMethod(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function GetAllPaymentMethod() {

    var request = $.ajax({
        method: "POST",
        url: "/ManualPayment/GetAllPaymentMethod",
        data: {}
    });
    request.done(function (data) {
        onGetAllPaymentMethod(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllPaymentMethod(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlPaymentMethod', res);
        FillDropDownByReference('.ddlPaymentMethod_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }

}


function CreateNewPayment(PaymentMethodId, PaymentCategoryId, PaymentDate, MemberId, PlotId, PaymentAmount, PaymentTypeId, AllotmentTypeId, ReceiptNo, ChequeNo, ChequeDate, Remarks) {
    ProgressBarShow();

    var request = $.ajax({
        method: "POST",
        url: "/ManualPayment/CreateNewPayment",
        data: {
            PaymentMethodId: PaymentMethodId, PaymentCategoryId: PaymentCategoryId,
            PaymentDate: PaymentDate, MemberId: MemberId, PlotId: PlotId, PaymentAmount: PaymentAmount, PaymentTypeId: PaymentTypeId, AllotmentTypeId: AllotmentTypeId, ReceiptNo: ReceiptNo, ChequeNo: ChequeNo, ChequeDate: ChequeDate, Remarks: Remarks
        }
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Paid!');
            Init();
            ProgressBarHide();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
        ProgressBarHide();
    });

}


function DisableInputs() {

    $('.frmMakePayment').find('input, select').each(function () {
        $(this).prop("disabled", true);
    });
}

function EnableInputs() {

    $('.frmMakePayment').find('input, select').each(function () {
        $(this).prop("disabled", false);
    });
}
function SetPaidAmount(selector) {
    objEditRow = $(selector).closest('tr');
    $('.txtPayableAmount').val(objEditRow.find('.hdnPaymentAmount').val());
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

function SendInvoiceEmail(Html, Email, Subject) {
    ProgressBarShow();
    //Invoice[0].Purpose = "Email/Recept";
    var request = $.ajax({
        method: "POST",
        url: "/ManualPayment/SendInvoiceEmail",
        data: { Html: Html, Email: Email, Subject: Subject }
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
        ProgressBarHide();
    });

}

function Init() {
    $('.frmManualPayment').find('input, textarea').each(function () {
        $(this).val('');
    });


    $('.frmManualPayment').find('select').each(function () {
        $(this).val(0);

    });
    $('.frmManualPayment').find('.select2').each(function () {

        $(this).select2().val(0).trigger("change");
    });
    var i = 0;
    $('.frmManualPayment').find('td').each(function () {
        if (i != 5)
            $(this).html('-');
        i++;
    });


}

function ActivateChequeNo() {
    if ($('.ddlPaymentMethod').val() == 2) {
        $('.txtChequeNo').prop("disabled", false);
        $('.txtChequeNo').removeClass("notrequired");

        $('.txtChequeDate').prop("disabled", false);
        $('.txtChequeDate').removeClass("notrequired");
    }
    else {
        $('.txtChequeNo').prop("disabled", true);
        $('.txtChequeNo').addClass("notrequired");

        $('.txtChequeDate').prop("disabled", true);
        $('.txtChequeDate').addClass("notrequired");

    }
}