GetAllCharges();
GetAllMembers();
GetAllPlots();
GetAllPaymentMethod();
AllClickFunction();
PlotHideShow();
GetAllAllotment();
GetAllTransfer();
AllChangeFunction();

var objEditRow;
var PlotsList;
var ChargesList;
var MonthDifference;
var AllotmentList;
var TransferList;
var InstallmentPlanList;


function AllChangeFunction() {
    $(".ddlMember").change(function () {
        var MemberId = $(this).val();
        var obj = TransferList.filter(x => x.MemberId == MemberId);
        onGetAllTransfer(obj);

        var obj2 = AllotmentList.filter(x => x.MemberId == MemberId);
        onGetAllAllotment(obj2);
    });

    $(".ddlMember_upd").change(function () {
        var MemberId = $(this).val();
        var obj = TransferList.filter(x => x.MemberId == MemberId);
        onGetAllTransfer_upd(obj);

        var obj2 = AllotmentList.filter(x => x.MemberId == MemberId);
        onGetAllAllotment_upd(obj);
    });

    $('.txtPaymentDate').datepicker().on('changeDate', function (ev) {
        var dt = new Date($('.txtPaymentDate').val());
        var Year = dt.getFullYear();
        var obj = ChargesList.filter(x=> Year >= x.StartYear && Year <= x.EndYear);
        onGetAllCharges(obj);
    });


}
function AllClickFunction() {
    $('.btnInitializePayment').click(function () {
        if (!validateForm(".frmPayment")) return;

        var ChargeId = $('.ddlCharges').val();
        var MemberId = $('.ddlMember').val();
        var PlotId = $('.radioAllotment').prop('checked') == true ? $('.ddlAllotment').val() : $('.ddlTransfer').val();

        InitializePayment(ChargeId, MemberId, PlotId);
    });

    $('.btnMakePayment').click(function () {
        if (!validateForm(".frmPayment")) return;

        var ChargeId = $('.ddlCharges').val();
        var PaymentMethodId = $('.ddlPaymentMethod').val();
        var PaymentDate = formatDate($('.txtPaymentDate').val());
        var MemberId = $('.ddlMember').val();
        var PlotId = $('.radioAllotment').prop('checked') == true ? $('.ddlAllotment').val() : $('.ddlTransfer').val();
        var PaymentAmount = $('.hdnPaymentAmount').val();
        var TotalAmount = $('.hdnTotalAmount').val();
        var DueDate = $('.hdnDueDate').val();
        var Surcharge = $('.hdnSurcharge').val();
        var SurchargeAmount = $('.hdnSurchargeAmount').val();
        var HasPaymentPlan = $('.hdnHasPaymentPlan').val();
        var Number = $('.hdnNumber').val();
        var CategoryPercent = $('.hdnCategoryPercent').val();

        CreateNewPayment(ChargeId, PaymentMethodId, PaymentDate, MemberId, PlotId, PaymentAmount, TotalAmount, DueDate, Surcharge, SurchargeAmount, HasPaymentPlan, Number, CategoryPercent);

        //Init();
    });


}


function InitializePayment(ChargeId, MemberId, PlotId) {
    var request = $.ajax({
        method: "POST",
        url: "/Payments/InitializePayment",
        data: { "ChargeId": ChargeId, "MemberId": MemberId, "PlotId": PlotId }
    });
    request.done(function (data) {

        var res = JSON.parse(data);
        $('.hdnPaymentAmount').val(res[0].PayableAmount);
        $('.hdnSurcharge').val(res[0].Surcharge);
        $('.hdnSurchargeAmount').val(res[0].SurchargeAmount);
        $('.hdnTotalAmount').val(res[0].TotalAmount);
        $('.hdnDueDate').val(res[0].DueDate);
        $('.hdnHasPaymentPlan').val(res[0].HasPaymentPlan);
        $('.hdnNumber').val(res[0].HasPaymentPlan == 1 ? res[0].Number : 0);
        $('.hdnCategoryPercent').val(res[0].CategoryPercent);

        BindTextToSelector($('.tdPayableAmount '), moneyFormat(res[0].PayableAmount));
        BindTextToSelector($('.tdSurcharge '), res[0].Surcharge + ' %');
        BindTextToSelector($('.tdSurchargeAmount '), moneyFormat(res[0].SurchargeAmount));
        BindTextToSelector($('.tdTotalAmount '), moneyFormat(res[0].TotalAmount));
        BindTextToSelector($('.tdBalance'), moneyFormat(res[0].Balance));
        BindTextToSelector($('.tdPaidAmount'), moneyFormat(res[0].PaidAmount));
        BindTextToSelector($('.tdPaidPercent'), res[0].PaidPercent.toFixed(2) + ' %');
        BindTextToSelector($('.tdDueDate'), res[0].DueDate);

        if (res[0].HasPaid == 1) {
            $(".btnMakePayment").prop("disabled", true);
            showError('This payment has already paid!');
        }
        else {
            $(".btnMakePayment").prop("disabled", false);
            $(".DivPaymentInfo").css("display", "block");
        }



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

function GetAllMembers() {

    var request = $.ajax({
        method: "POST",
        url: "/PaymentPlan/GetAllMembers",
        data: {}
    });
    request.done(function (data) {

        onGetAllMembers(data);
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

function onGetAllMembers(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlMember', res);
        FillDropDownByReference('.ddlMember_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }
}

function GetAllAllotment() {

    var request = $.ajax({
        method: "POST",
        url: "/PaymentPlan/GetAllAllotmentPlot",
        data: {}
    });
    request.done(function (data) {

        AllotmentList = JSON.parse(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllAllotment(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlAllotment', res);
    }
    catch (Err) {
        console.log(Err);
    }
}

function onGetAllAllotment_upd(data) {
    try {
        var res = data;
        FillDropDownByReference('.ddlAllotment_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }
}

function GetAllTransfer() {

    var request = $.ajax({
        method: "POST",
        url: "/PaymentPlan/GetAllTransferPlot",
        data: {}
    });
    request.done(function (data) {

        TransferList = data;
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllTransfer(data) {
    try {

        var res = data;

        FillDropDownByReference('.ddlTransfer', res);
    }
    catch (Err) {
        console.log(Err);
    }
}

function onGetAllTransfer_upd(data) {
    try {
        var res = data;
        FillDropDownByReference('.ddlTransfer_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }
}
function GetAllPlots() {

    var request = $.ajax({
        method: "POST",
        url: "/PaymentPlan/GetAllPlots",
        data: {}
    });
    request.done(function (data) {

        onGetAllPlots(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllPlots(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlPlots', res);
        FillDropDownByReference('.ddlPlots_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }

}
function GetAllPaymentMethod() {

    var request = $.ajax({
        method: "POST",
        url: "/Payments/GetAllPaymentMethod",
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
        url: "/Payments/GetAllCharges",
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

function GetAllPaymentPlans() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/PaymentPlan/GetAllPaymentPlans",
        data: {}
    });
    request.done(function (data) {

        onGetAllPaymentPlans(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllPaymentPlans(data) {

    try {
        var res = data;
        var divTbodyGoalFund = $(".PaymentPlanListing").html("");
        $("#PaymentPlanListing").tmpl(res).appendTo(divTbodyGoalFund);
        var i = 1;
        $('.trPaymentPlan').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
        ProgressBarHide();
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
        $(DropDownReference).append($("<option duedate='" + ToJavaScriptDate(this.DueDate) + "'></option>").val(this.Id).html(this.Value));
    });
}

function CreateNewPayment(ChargeId, PaymentMethodId, PaymentDate, MemberId, PlotId, PaymentAmount, TotalAmount, DueDate, Surcharge, SurchargeAmount, HasPaymentPlan, Number, CategoryPercent) {
    var request = $.ajax({
        method: "POST",
        url: "/Payments/CreateNewPayment",
        data: {
            ChargeId: ChargeId, PaymentMethodId: PaymentMethodId, PaymentDate: PaymentDate,
            MemberId: MemberId, PlotId: PlotId, PaymentAmount: PaymentAmount, TotalAmount: TotalAmount,
            DueDate: DueDate, Surcharge: Surcharge, SurchargeAmount: SurchargeAmount, HasPaymentPlan: HasPaymentPlan, Number: Number, CategoryPercent: CategoryPercent
        }
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Paid!');


        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function Init() {

    // $(".DivPaymentInfo").css("display", "none");
    $(".ddlCharges").val(0);
    $(".ddlPaymentMethod").val(0);
    $(".ddlPlots").val(0);
    $('.txtPaymentDate').val('');
    $(".ddlMember").val(0);
    $(".btnMakePayment").prop("disabled", true);
    $(".btnInitializePayment").prop("disabled", false);
}