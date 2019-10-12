GetAllCharges();
//GetAllMembers();
GetAllManagementCommittee();
GetAllPlotType();
GetAllPaymentMethod();
AllClickFunction();
GetAllPaymentType();
AllChangeFunction();
GetCurrentAssociateAllottees();
GetCurrentAllottees()
var objEditRow;
var ChargesList;
var MonthDifference;
var PlotList;
var MemberPlotList;
var OrignalAllotment;
var AssociateAllotment;
var AmountPayable;
var Email;

function AllChangeFunction() {


    $(".ddlPlotType").change(function () {
        var AllotmentTypeId = $('.ddlAllotmentType').val();
        var MemberId = $('.ddlMember').val();
        var PlotTypeId = $(this).val();
        if (AllotmentTypeId == 1) {
            var obj = OrignalAllotment.filter(x => (x.PlotTypeId == PlotTypeId) && (x.MemberId == MemberId));
            FillDropDownByReferencePlot('.ddlPlot', obj);
        }
        else {
            var obj = AssociateAllotment.filter(x => (x.PlotTypeId == PlotTypeId) && (x.MemberId == MemberId));
            FillDropDownByReferencePlot('.ddlPlot', obj);
        }


    });

    $(".ddlAllotmentType").change(function () {
        var AllotmentTypeId = $(this).val();
        if (AllotmentTypeId == 1) {
            FillDropDownByReferenceMember('.ddlMember', OrignalAllotment);
        }
        else {
            FillDropDownByReferenceMember('.ddlMember', AssociateAllotment);
        }
        GetAllPlots(AllotmentTypeId);

    });

    $('.ddlPaymentMethod').change(function () {
        if ($('.ddlPaymentMethod').val() != 2) {
            $('.txtChequeNo').val('');
            $('.txtChequeDate').val('');
        }
        ActivateChequeNo();
    });



    $('.txtPaymentDate').datepicker().on('changeDate', function (ev) {


        var SelectedDate = formatDate($('.txtPaymentDate').val());
        var PlotId = $('.ddlPlot').val();
        GetChargesForPayment(SelectedDate, PlotId);
    });

}

function AllClickFunction() {
    $('.btnGetPaymentAmount').click(function () {
        if (!validateForm(".frmPayment")) return;

        var ChargeId = $('.ddlCharges').val();
        var MemberId = $('.ddlMember').val();
        var PlotId = $('.ddlPlot').val();
        var AllotmentTypeId = $('.ddlAllotmentType').val() == 1 ? 1 : 0;

        GetPaymentAmount(ChargeId, MemberId, PlotId, AllotmentTypeId);
    });


    $('.btnMakePayment').click(function () {
        if (!validateForm(".frmCreatePayment")) return;

        var ChargeId = $('.ddlCharges').val();
        var PaymentMethodId = $('.ddlPaymentMethod').val();
        var PaymentTypeId = $('.ddlPaymentType').val();
        var AllotmentTypeId = $('.ddlAllotmentType').val() == 1 ? 1 : 0;
        var PaymentDate = formatDate($('.txtPaymentDate').val());
        var MemberId = $('.ddlMember').val();
        var PlotId = $('.ddlPlot').val();

        var PaymentAmount = $('.txtPayableAmount').val();
        var TotalAmount = $('.hdnTotalAmount').val();
        var DueDate = $('.hdnDueDate').val();
        var PaymentCategoryId = $('.hdnPaymentCategoryId').val();
        var ReceiptNo = $('.txtReceiptNo').val();
        var ChequeNo = $('.txtChequeNo').val();
        var ChequeDate = PaymentMethodId == 2 ? formatDate($('.txtChequeDate').val()) : '';
        var Remarks = $('.txtRemarks').val();
        var TenureId = $('.hdnTenureId').val();
        var Rate = $('.hdnRate').val();
        var RemainingBalance = $('.hdnRemainingBalance').val();
        var PaidPercentBefore = $('.hdnPaidPercentBefore').val();
        var ManagementCommitteeId = $('.ddlManagementCommittee').val();

        if (PaymentAmount > AmountPayable || PaymentAmount < 1) {
            showError('Please enter correct Payment Amount!');
            return;
        }

        BindTextToSelector($('.printPaymentAmount'), moneyFormat(PaymentAmount) + '&nbsp;');


        CreateNewPayment(ChargeId, PaymentMethodId, PaymentDate, MemberId, PlotId, PaymentAmount, RemainingBalance, PaidPercentBefore,
            TotalAmount, DueDate, PaymentCategoryId, TenureId, Rate, PaymentTypeId, AllotmentTypeId, ReceiptNo, ChequeNo, ChequeDate, Remarks, ManagementCommitteeId);

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


function GetPaymentAmount(ChargeId, MemberId, PlotId, AllotmentTypeId) {
    var request = $.ajax({
        method: "POST",
        url: "/Payment/GetPaymentAmount",
        data: { "ChargeId": ChargeId, "MemberId": MemberId, "PlotId": PlotId, "AllotmentTypeId": AllotmentTypeId }
    });
    request.done(function (data) {

        var res = JSON.parse(data);
        $('.hdnPaymentAmount').val(res[0].PaymentAmount);
        $('.hdnTenureId').val(res[0].TenureId);
        $('.hdnDueDate').val(res[0].DueDate);

        $('.hdnPaymentCategoryId').val(res[0].PaymentCategoryId);

        $('.hdnRate').val(res[0].Rate);
        $('.hdnSize').val(res[0].Size);
        $('.hdnTotalAmount').val(res[0].PaymentAmount + res[0].PaidAmount);
        $('.hdnRemainingBalance').val(res[0].PaymentAmount);
        $('.hdnPaidPercentBefore').val(res[0].PaidPercent);
        $('.hdnPlotType').val(res[0].PlotType);
        Email = res[0].Email;


        AmountPayable = res[0].PaymentAmount;
        BindTextToSelector($('.tdPaymentAmount'), moneyFormat(res[0].PaymentAmount));
        BindTextToSelector($('.tdTenure'), res[0].Tenure);
        BindTextToSelector($('.tdBalance'), moneyFormat(res[0].Balance));
        BindTextToSelector($('.tdPaidAmount'), moneyFormat(res[0].PaidAmount));
        BindTextToSelector($('.tdPaidPercent'), res[0].PaidPercent.toFixed(2) + ' %');
        BindTextToSelector($('.tdDueDate'), res[0].DueDate);
        $(".DivPaymentInfo").css("display", "block");
        if (res[0].HasPaid == 1) {

            // showError('This charge has paid!');
            $(".btnEnterAmount").css("pointer-events", 'none');
        }
        else {
            $(".btnGetPaymentAmount").prop("disabled", false);

            $(".btnEnterAmount").css("pointer-events", 'auto');

        }


        // For Sending Payment Recept
        BindTextToSelector($('.printMembershipNo'), res[0].MembershipNo);
        BindTextToSelector($('.printFullName'), res[0].Name);
        BindTextToSelector($('.printCNIC'), res[0].CNIC);
        BindTextToSelector($('.printPresentAddress'), res[0].Address);
        BindTextToSelector($('.printInvoiceNo'), 'RPT-146');
        BindTextToSelector($('.printCellNo'), res[0].CellNo);
        BindTextToSelector($('.printInvoiceDate'), GetCurrentDate());
        BindTextToSelector($('.printPlotType'), res[0].PlotType);
        BindTextToSelector($('.printSize'), res[0].Size);
        BindTextToSelector($('.printPhase'), 'I');
        BindTextToSelector($('.printPlotNo'), res[0].PlotNo);
        BindTextToSelector($('.tdHead'), res[0].PaymentCategory + ' - ' + res[0].PaymentSubCategory);
        BindTextToSelector($('.tdHeadtdPaymentDate'), GetCurrentDate());
        BindTextToSelector($('.printPaidAmount'), moneyFormat(res[0].PaidAmount) + '&nbsp;');
        BindTextToSelector($('.printRemainingAmount'), moneyFormat(res[0].Balance) + '&nbsp;');

        // For Sending Payment Recept

        //  DisableInputs();

    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function UpdatePaymentPlan() {
    var request = $.ajax({
        method: "POST",
        url: "/PaymentPlan/UpdatePaymentPlan",
        data: PaymentPlan[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Update!');
            $('#EditPaymentPlan').modal('hide');
            GetAllPaymentPlan();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

//function GetAllMembers() {

//    var request = $.ajax({
//        method: "POST",
//        url: "/Payment/GetAllMembers",
//        data: {}
//    });
//    request.done(function (data) {

//        onGetAllMembers(data);
//    });
//    request.fail(function (jqXHR, Status) {
//        console.log(jqXHR.responseText);

//    });
//}

//function onGetAllMembers(data) {
//    try {

//        var res = JSON.parse(data);
//        FillDropDownByReferenceMember('.ddlMember', res);

//    }
//    catch (Err) {
//        console.log(Err);
//    }
//}
function FillDropDownByReferenceMember(DropDownReference, res) {
    $(DropDownReference).empty().append('<option selected="selected" value="0">--Select--</option>');
    $(res).each(function () {
        $(DropDownReference).append($("<option></option>").val(this.MemberId).html(this.FirstName + ' ' + this.LastName + ' (' + this.MembershipNo + ' - ' + this.PlotNo + ')'));
    });
}

function FillDropDownByReferencePlot(DropDownReference, res) {
    $(DropDownReference).empty().append('<option selected="selected" value="0">--Select--</option>');
    $(res).each(function () {
        $(DropDownReference).append($("<option></option>").val(this.PlotId).html(this.PlotNo + ' (' + this.MembershipNo + ')'));
    });
}
function GetCurrentAssociateAllottees() {

    var request = $.ajax({
        method: "POST",
        url: "/Payment/GetCurrentAssociateAllottees",
        data: {}
    });
    request.done(function (data) {
        var res = JSON.parse(data);
        AssociateAllotment = res;
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function GetCurrentAllottees() {

    var request = $.ajax({
        method: "POST",
        url: "/Payment/GetCurrentAllottees",
        data: {}
    });
    request.done(function (data) {
        var res = JSON.parse(data);
        OrignalAllotment = res;
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}
function GetMonthDifference(DueDate) {
    var request = $.ajax({
        method: "POST",
        url: "/PaymentPlan/GetMonthDifference",
        data: { "EndDate": DueDate }
    });
    request.done(function (data) {

        MonthDifference = JSON.parse(data)[0].Difference;

    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}


function GetAllPlotType() {

    var request = $.ajax({
        method: "POST",
        url: "/Payment/GetAllPlotType",
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

function GetAllPaymentType() {

    var request = $.ajax({
        method: "POST",
        url: "/Payment/GetAllPaymentType",
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
        url: "/Payment/GetAllPlots",
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
        url: "/Payment/GetAllPaymentMethod",
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
        url: "/Payment/GetAllPaymentMethod",
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

function GetAllCharges() {

    var request = $.ajax({
        method: "POST",
        url: "/Payment/GetAllCharges",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        ChargesList = res;

    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllCharges(data) {
    try {

        var res = data;
        FillDropDownByReferenceCharges('.ddlCharges', res);
        FillDropDownByReferenceCharges('.ddlCharges_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }

}

function GetChargesForPayment(SelectedDate, PlotId) {

    var request = $.ajax({
        method: "POST",
        url: "/Payment/GetChargesForPayment",
        data: { SelectedDate: SelectedDate, PlotId: PlotId }
    });
    request.done(function (data) {

        var res = JSON.parse(data);
        onGetChargesForPayment(res);

    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetChargesForPayment(data) {
    try {

        var res = data;
        FillDropDownByReferenceCharges('.ddlCharges', res);

    }
    catch (Err) {
        console.log(Err);
    }

}


function PlotHideShow() {
    if ($('.radioAllotment').prop('checked') == true) {
        $('.ddlTransfer').prop('disabled', true);
        $('.ddlTransfer').addClass('notrequired');
        $('.ddlTransfer').val(0);
        $('.ddlAllotment').prop('disabled', false);
    }
    else if ($('.radioTransfer').prop('checked') == true) {
        $('.ddlAllotment').prop('disabled', true);
        $('.ddlAllotment').addClass('notrequired');
        $('.ddlAllotment').val(0);
        $('.ddlTransfer').prop('disabled', false);
    }
}

function FillDropDownByReferenceCharges(DropDownReference, res) {
    $(DropDownReference).empty().append('<option selected="selected" value="0">--Select--</option>');
    $(res).each(function () {
        $(DropDownReference).append($("<option duedate='" + formatDate(this.DueDate) + "'></option>").val(this.Id).html(this.Value));
    });
}

function CreateNewPayment(ChargeId, PaymentMethodId, PaymentDate, MemberId, PlotId, PaymentAmount, RemainingBalance, PaidPercentBefore, TotalAmount, DueDate, PaymentCategoryId, TenureId, Rate, PaymentTypeId, AllotmentTypeId, ReceiptNo, ChequeNo, ChequeDate, Remarks, ManagementCommitteeId) {
    ProgressBarShow();

    var request = $.ajax({
        method: "POST",
        url: "/Payment/CreateNewPayment",
        data: {
            ChargeId: ChargeId, PaymentMethodId: PaymentMethodId, PaymentDate: PaymentDate,
            MemberId: MemberId, PlotId: PlotId, PaymentAmount: PaymentAmount, RemainingBalance: RemainingBalance, PaidPercentBefore: PaidPercentBefore, TotalAmount: TotalAmount,
            DueDate: DueDate, PaymentCategoryId: PaymentCategoryId, TenureId: TenureId, Rate: Rate, PaymentTypeId: PaymentTypeId, AllotmentTypeId: AllotmentTypeId, ReceiptNo: ReceiptNo, ChequeNo: ChequeNo, ChequeDate: ChequeDate, Remarks: Remarks, ManagementCommitteeId: ManagementCommitteeId
        }
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Paid!');
            ProgressBarHide();
            $('#CreatePaymentAmount').modal('hide');
            var ChargeId = $('.ddlCharges').val();
            var MemberId = $('.ddlMember').val();
            var PlotId = $('.ddlPlot').val();

            var AllotmentTypeId = $('.ddlAllotmentType').val() == 1 ? 1 : 0;
            GetPaymentAmount(ChargeId, MemberId, PlotId, AllotmentTypeId);
            //setTimeout(function () {
            //    SendInvoiceEmail(CreateInvoiceHtml(), Email, $('.tdHead').text().trim());
            //}, 2000);

        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
        ProgressBarHide();
    });

}

function Init() {
    alert('Init');
    // $(".DivPaymentInfo").css("display", "none");
    $(".ddlCharges").val(0);
    $(".ddlAllotmentType").val(0);
    $(".ddlPaymentMethod").val(0);
    $(".ddlPlot").val(0);
    $('.txtPaymentDate').val('');
    $(".ddlMember").val(0);
    $(".btnPayment").prop("disabled", true);
    $(".btnGetPaymentAmount").prop("disabled", false);

    $(".btnEnterAmount").css("pointer-events", 'auto');


    EnableInputs();
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
        url: "/Payment/SendInvoiceEmail",
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
    $('.frmMakePayment').find('input, textarea').each(function () {
        $(this).val('');
    });

    $('.frmMakePayment').find('select').each(function () {
        $(this).val(0);

    });
    $('.frmMakePayment').find('.select2').each(function () {

        $(this).select2().val(0).trigger("change");
    });
    var i = 0;
    $('.trMakePayment').find('td').each(function () {
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

function GetAllManagementCommittee() {

    var request = $.ajax({
        method: "POST",
        url: "/Payment/GetAllManagementCommittee",
        data: {}
    });
    request.done(function (data) {

        onGetAllManagementCommittee(data);


    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}
function onGetAllManagementCommittee(data) {
    try {


        var res = data;
        FillDropDownByReference('.ddlManagementCommittee', res);
        FillDropDownByReference('.ddlManagementCommittee_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }

}
