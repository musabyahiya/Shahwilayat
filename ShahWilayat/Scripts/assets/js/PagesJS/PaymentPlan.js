GetAllPaymentPlans();
GetAllCharges();
GetAllMembers();
GetAllPlots();
GetAllInstallmentPlans();
AllClickFunction();
PlotHideShow();
GetAllAllotment();
GetAllTransfer();
AllChangeFunction();

var objEditRow;
var PlotsList;
var MonthDifference;
var AllotmentList;
var TransferList;
var InstallmentPlanList;
var Installment = [];
var PaymentPlan =
[{
    PaymentPlanId: 0,
    ChargeId: 0,
    InstallmentPlanId: 0,
    MemeberId: 0,
    PlotId: 0,
    DueDay: 10,
    Surcharge: 0
}]

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
    $(".ddlCharges").change(function () {
        var DueDate = $('option:selected', this).attr('duedate');
        if ($(this).val() != 0)
            GetMonthDifference(DueDate);

    });


}
function AllClickFunction() {
    $('.btnSaveChanges').click(function () {
        var duplicationPaymentPlan = false;
        if (!validateForm(".frmPaymentPlan")) return;

        PaymentPlan[0].ChargeId = $('.ddlCharges').val();
        PaymentPlan[0].InstallmentPlanId = $('.ddlInstallmentPlans').val();
        PaymentPlan[0].MemberId = $('.ddlMember').val();
        PaymentPlan[0].PlotId = $('.radioAllotment').prop('checked') == true ? $('.ddlAllotment').val() : $('.ddlTransfer').val();
        PaymentPlan[0].DueDay = $('.txtDueDay').val();
        PaymentPlan[0].Surcharge = $('.txtSurcharge').val();

        $('.trPaymentPlan').each(function () {
            if ($(this).children('.hdnChargeId').val() == PaymentPlan[0].ChargeId &&
                $(this).children('.hdnMemberId').val() == PaymentPlan[0].MemberId &&
                $(this).children('.hdnPlotId').val() == PaymentPlan[0].PlotId) {
                duplicationPaymentPlan = true;

            }
        });
        if (duplicationPaymentPlan) {
            showError("This Payment Plan is already exist.");
            return;
        }

        CreateNewPaymentPlan();

    });

    $('.btnUpdateChanges').click(function () {
        var duplicationPaymentPlan = false;
        if (!validateForm(".frmPaymentPlan_upd")) return;

        PaymentPlan[0].MemberId = $('.ddlMember_upd').val();
        PaymentPlan[0].ChargeId = $('.ddlCharges_upd').val();
        PaymentPlan[0].InstallmentPlanId = $('.ddlInstallmentPlans_upd').val();
        PaymentPlan[0].PlotId = $('.ddlPlots_upd').val();
        PaymentPlan[0].DueDay = $('.txtDueDay_upd').val();
        PaymentPlan[0].Surcharge = $('.txtSurcharge_upd').val();

        UpdatePaymentPlan();
    });

    $('.btnDelete').click(function () {
        DeletePaymentPlan();
    });
}


function CreateNewPaymentPlan() {
    var request = $.ajax({
        method: "POST",
        url: "/PaymentPlan/CreateNewPaymentPlan",
        data: PaymentPlan[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            CreateNewInstallment();
            $('#CreatePaymentPlan').modal('hide');
            GetAllPaymentPlans();
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
            GetAllPaymentPlans();
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
        if (MonthDifference >= 1) {
            var obj = InstallmentPlanList.filter(x => x.NoM <= MonthDifference);
            onGetAllInstallmentPlans(obj);
        }
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
        FillDropDownByReferencePlot('.ddlAllotment', res);
    }
    catch (Err) {
        console.log(Err);
    }
}

function onGetAllAllotment_upd(data) {
    try {
        var res = data;
        FillDropDownByReferencePlot('.ddlAllotment_upd', res);
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

        FillDropDownByReferencePlot('.ddlTransfer', res);
    }
    catch (Err) {
        console.log(Err);
    }
}

function onGetAllTransfer_upd(data) {
    try {
        var res = data;
        FillDropDownByReferencePlot('.ddlTransfer_upd', res);
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
function GetAllInstallmentPlans() {

    var request = $.ajax({
        method: "POST",
        url: "/PaymentPlan/GetAllInstallmentPlans",
        data: {}
    });
    request.done(function (data) {
        InstallmentPlanList = data;
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllInstallmentPlans(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlInstallmentPlans', res);
        FillDropDownByReference('.ddlInstallmentPlans_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }

}

function GetAllCharges() {

    var request = $.ajax({
        method: "POST",
        url: "/PaymentPlan/GetAllCharges",
        data: {}
    });
    request.done(function (data) {

        onGetAllCharges(data);
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


function GenerateInstallment() {


    var InstallmentPlanId = PaymentPlan[0].InstallmentPlanId;
    var TotalRate = ($('.ddlCharges option:selected').attr("totalrate")) * ($('.radioAllotment').prop('checked') == true ? $('.ddlAllotment option:selected').attr("totalsize") : $('.ddlTransfer option:selected').attr("totalsize"));
    TotalRate += $('.radioAllotment').prop('checked') == true ? (TotalRate * $('.ddlAllotment option:selected').attr("CategoryPercent")) / 100 : (TotalRate * $('.ddlTransfer option:selected').attr("CategoryPercent")) / 100;


    var InstallmentAmount = 0;
    var Months = 0;
    var InstallmentDueDate = '';
    if (InstallmentPlanId == 1) {
        //Monthly
        InstallmentAmount = TotalRate / MonthDifference;
        Months = 1;
    }
    else if (InstallmentPlanId == 2) {
        InstallmentAmount = (TotalRate / MonthDifference) * 2;
        Months = 2;
    }
    else if (InstallmentPlanId == 3) {
        InstallmentAmount = (TotalRate / MonthDifference) * 3;
        Months = 3;
    }
    else if (InstallmentPlanId == 4) {
        InstallmentAmount = (TotalRate / MonthDifference) * 6;
        Months = 6;
    }
    else if (InstallmentPlanId == 5) {
        InstallmentAmount = (TotalRate / MonthDifference) * 12;
        Months = 12;
    }

    var NoI = Math.ceil(TotalRate / InstallmentAmount);
    var counter = TotalRate;
    for (var i = 1; i <= NoI; i++) {

        InstallmentDueDate = i == 1 ? GetTenCurrentMonth() : GetIncrementalDate(InstallmentDueDate, Months);
        counter = i == NoI
        ? counter < InstallmentAmount ? InstallmentAmount - counter : counter
        : counter - InstallmentAmount;
        Installment.push({
            ChargeId: PaymentPlan[0].ChargeId,
            MemberId: PaymentPlan[0].MemberId,
            PlotId: PaymentPlan[0].PlotId,
            InstallmentPlanId: PaymentPlan[0].InstallmentPlanId,
            Number: i,
            DueDate: InstallmentDueDate,
            ChargeDueDate: $('.ddlCharges option:selected').attr("duedate"),
            InstallmentAmount: i == NoI ? counter : InstallmentAmount,
            TotalAmount: TotalRate
        });
    }
}

function CreateNewInstallment() {
    GenerateInstallment();
    var request = $.ajax({
        method: "POST",
        url: "/PaymentPlan/CreateNewInstallment",
        data: { Installment: JSON.stringify(Installment) }
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            Installment = [];
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}
function FillDropDownByReferenceCharges(DropDownReference, res) {
    $(DropDownReference).empty().append('<option selected="selected" value="0">--Select--</option>');
    $(res).each(function () {
        $(DropDownReference).append($("<option totalrate='" + this.Rate + "' duedate='" + ToJavaScriptDate(this.DueDate) + "'></option>").val(this.Id).html(this.Value));
    });
}

function FillDropDownByReferencePlot(DropDownReference, res) {
    $(DropDownReference).empty().append('<option selected="selected" value="0">--Select--</option>');
    $(res).each(function () {
        $(DropDownReference).append($("<option categorypercent='" + this.CategoryPercent + "' totalsize='" + this.TotalSize + "'></option>").val(this.Id).html(this.Value));
    });
}
function GetTenCurrentMonth() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    if (dd <= 10) {
        today = yyyy + '-' + mm + '-' + 10;
    }
    else {
        today = yyyy + '-' + (parseInt(mm) + 1) + '-' + 10;
    }

    return today;
}

function GetIncrementalDate(InstallmentDate, value) {
    var dt = new Date(InstallmentDate);
    dt.setMonth(dt.getMonth() + value);



    var dd = dt.getDate();
    var mm = dt.getMonth() + 1; //January is 0!
    var yyyy = dt.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    dt = yyyy + '-' + mm + '-' + dd;

    return dt;

}