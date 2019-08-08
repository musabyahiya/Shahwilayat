GetAllCharges();

GetAllPaymentSetup();
AllClickFunction();
AllChangeFunction();

var objEditRow;
var PaymentSubCategoryList;
var PaymentSetupList;
var PlotList;
var Charges =
[{
    ChargeId: 0,
    PaymentSetupId: 0,
    Description: null,
    DueDate: null,
    Surcharge: 0
}]


function AllChangeFunction() {
    $(".ddlPlotType").change(function () {
        var PlotTypeId = $(this).val();

        if (PlotTypeId == 4 || PlotTypeId == 0) {
            $('.ddlPlots').prop("disabled", true);
            $('.ddlPlots').addClass("notrequired");
        }
        else {
            $('.ddlPlots').prop("disabled", false);
            $('.ddlPlots').removeClass("notrequired");
            var obj = PlotList.filter(x => x.PlotTypeId == PlotTypeId);
            onGetAllPlots(obj);
        }

    });

    $(".ddlPlotType_upd").change(function () {
        var PlotTypeId = $(this).val();
        if (PlotTypeId == 4 || PlotTypeId == 0) {
            $('.ddlPlots_upd').prop("disabled", true);
            $('.ddlPlots_upd').addClass("notrequired");
        }
        else {
            $('.ddlPlots_upd').prop("disabled", false);
            $('.ddlPlots_upd').removeClass("notrequired");
            var obj = PlotList.filter(x => x.PlotTypeId == PlotTypeId);
            onGetAllPlots_upd(obj);
        }
    });
}
function AllClickFunction() {
    $('.btnSaveChanges').click(function () {
        var duplicationCharges = false;
        if (!validateForm(".frmCharges")) return;

        Charges[0].PaymentSetupId = $('.ddlPaymentSetup').val();
        Charges[0].Description = $('.txtDescription').val();
        Charges[0].DueDate = formatDate($('.txtDueDate').val());
        Charges[0].Surcharge = $('.txtSurcharge').val();


        CreateNewCharge();
    });

    $('.btnUpdateChanges').click(function () {
        var duplicationCharges = false;
        if (!validateForm(".frmCharges_upd")) return;

        Charges[0].PaymentSetupId = $('.ddlPaymentSetup_upd').val();
        Charges[0].Description = $('.txtDescription_upd').val();
        Charges[0].DueDate = formatDate($('.txtDueDate_upd').val());
        Charges[0].Surcharge = $('.txtSurcharge_upd').val();


        UpdateCharge();
    });

    $('.btnDelete').click(function () {
        DeleteCharge();
    });
}

function CreateNewCharge() {
    var request = $.ajax({
        method: "POST",
        url: "/Charges/CreateNewCharge",
        data: Charges[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            $('#CreateCharges').modal('hide');
            GetAllCharges();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}


function GetAllCharges() {
    ProgressBarShow();
    GetAllPaymentSetupUnique();
    var request = $.ajax({
        method: "POST",
        url: "/Charges/GetAllCharges",
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
        ChargesList = res;
        var divTbodyGoalFund = $(".ChargesListing").html("");
        $("#ChargesListing").tmpl(res).appendTo(divTbodyGoalFund);

        var i = 1;
        $('.trCharges').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
        // paginateTable('.tblCharges', 10);
        ProgressBarHide();


    }
    catch (Err) {
        console.log(Err);
    }
}
function CheckExistingPlotType(PlotTypeId) {
    var bool = true;
    $('.AppendedPanel').find('.hdnPlotTypeId').each(function () {
        if (PlotTypeId == $(this).attr('hdnplottypeid')) {
            bool = false;
        }
    })

    return bool;
}
function UpdateCharge() {
    var request = $.ajax({
        method: "POST",
        url: "/Charges/UpdateCharge",
        data: Charges[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            $('#EditCharges').modal('hide');

            GetAllCharges();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function GetAllPaymentSetupUnique() {

    var request = $.ajax({
        method: "POST",
        url: "/Charges/GetAllPaymentSetupUnique",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        PaymentSetupList = res;
        onGetAllPaymentSetupUnique(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function onGetAllPaymentSetupUnique(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlPaymentSetup', res);
    }
    catch (Err) {
        console.log(Err);
    }

}

function GetAllPaymentSetup() {

    var request = $.ajax({
        method: "POST",
        url: "/Charges/GetAllPaymentSetup",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        onGetAllPaymentSetup(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function onGetAllPaymentSetup(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlPaymentSetup_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }

}


function DeleteCharge() {
    var request = $.ajax({
        method: "POST",
        url: "/Charges/DeleteCharge",
        data: Charges[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Deleted!');
            $('#DeleteCharges').modal('hide');
            GetAllCharges();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function EditCharges(selector) {
    objEditRow = $(selector).closest('tr');
    Charges[0].ChargeId = objEditRow.find('.hdnChargeId').val();
    $('.ddlPaymentSetup_upd').val(objEditRow.find('.hdnPaymentSetupId').val());
    $('.txtDescription_upd').val(objEditRow.find('.hdnDescription').val());
    $('.txtDueDate_upd').val(objEditRow.find('.hdnDueDate').val());
    $('.txtSurcharge_upd').val(objEditRow.find('.hdnSurcharge').val());
}