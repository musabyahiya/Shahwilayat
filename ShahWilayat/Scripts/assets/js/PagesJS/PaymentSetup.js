GetAllPaymentSetup();
GetAllPaymentCategory();
GetAllTenure();
GetAllPlotType();
GetAllPlots();
GetAllPlotSize();
AllClickFunction();
AllChangeFunction();
var objEditRow;
var TenureList;
var PlotList;
var PaymentSetupList;
var PaymentSetup =
[{
    PaymentSetupId: 0,
    TenureId: 0,
    Rate: 0,
    PlotTypeId: 0,
    PlotId: 0,
    IsFixed: false,
    HasSizeBase: false,
    SizeTo: 0,
    SizeFrom: 0,
}]

function AllChangeFunction() {


    $(".ddlPaymentCategory").change(function () {
        var PaymentCategoryId = $(this).val();
        var obj = TenureList.filter(x => x.PaymentCategoryId == PaymentCategoryId);
        onGetAllTenure(obj);
    });

    $(".ddlPaymentCategory_upd").change(function () {
        var PaymentCategoryId = $(this).val();
        var obj = TenureList.filter(x => x.PaymentCategoryId == PaymentCategoryId);
        onGetAllTenure_upd(obj);
    });

    $(".ddlPlotType").change(function () {
        var PlotTypeId = $(this).val();

        if (PlotTypeId == 4 || PlotTypeId == 0) {
            $('.ddlPlot').prop("disabled", true);
            $('.ddlPlot').addClass("notrequired");
        }
        else {
            $('.ddlPlot').prop("disabled", false);
            $('.ddlPlot').removeClass("notrequired");
            var obj = PlotList.filter(x => x.PlotTypeId == PlotTypeId);
            onGetAllPlots(obj);
        }

    });

    $(".ddlPlotType_upd").change(function () {
        var PlotTypeId = $(this).val();
        if (PlotTypeId == 4 || PlotTypeId == 0) {
            $('.ddlPlot_upd').prop("disabled", true);
            $('.ddlPlot_upd').addClass("notrequired");
        }
        else {
            $('.ddlPlot_upd').prop("disabled", false);
            $('.ddlPlot_upd').removeClass("notrequired");
            var obj = PlotList.filter(x => x.PlotTypeId == PlotTypeId);
            onGetAllPlots_upd(obj);
        }
    });

    $(".ddlHasSizeBase").change(function () {
        var HasSizeBaseId = $(this).val();

        if (HasSizeBaseId == 2 || HasSizeBaseId == 0) {
            $('.txtSizeFrom').prop("disabled", true);
            $('.txtSizeFrom').addClass("notrequired");

            $('.txtSizeTo').prop("disabled", true);
            $('.txtSizeTo').addClass("notrequired");

            $('.txtSizeTo').val(0);
            $('.txtSizeFrom').val(0);
        }
        else {
            $('.txtSizeFrom').prop("disabled", false);
            $('.txtSizeFrom').removeClass("notrequired");

            $('.txtSizeTo').prop("disabled", false);
            $('.txtSizeTo').removeClass("notrequired");

        }

    });

    $(".ddlHasSizeBase_upd").change(function () {
        var HasSizeBaseId = $(this).val();

        if (HasSizeBaseId == 2 || HasSizeBaseId == 0) {
            $('.txtSizeFrom_upd').prop("disabled", true);
            $('.txtSizeFrom_upd').addClass("notrequired");

            $('.txtSizeTo_upd').prop("disabled", true);
            $('.txtSizeTo_upd').addClass("notrequired");

            $('.txtSizeTo_upd').val(0);
            $('.txtSizeFrom_upd').val(0);
        }
        else {
            $('.txtSizeFrom_upd').prop("disabled", false);
            $('.txtSizeFrom_upd').removeClass("notrequired");

            $('.txtSizeTo_upd').prop("disabled", false);
            $('.txtSizeTo_upd').removeClass("notrequired");

        }

    });
}

function AllClickFunction() {
    $('.btnSaveChanges').click(function () {
        var duplicationPaymentSetup = false;
        if (!validateForm(".frmPaymentSetup")) return;

      
        PaymentSetup[0].TenureId = $('.ddlTenure').val();
        PaymentSetup[0].Rate = $('.txtRate').val();
        PaymentSetup[0].PlotTypeId = $('.ddlPlotType').val();
        PaymentSetup[0].PlotId = $('.ddlPlot').val();
        PaymentSetup[0].IsFixed = $('.ddlFixed').val() == 1 ? false : true;
        PaymentSetup[0].HasSizeBase = $('.ddlHasSizeBase').val() == 1 ? true : false;
        PaymentSetup[0].SizeFrom = $('.txtSizeFrom').val();
        PaymentSetup[0].SizeTo = $('.txtSizeTo').val();
        PaymentSetup[0].IsFixed = $('.ddlFixed').val() == 1 ? false : true;


        var obj = PaymentSetupList.filter(x=> (x.TenureId == PaymentSetup[0].TenureId)
            && (x.PlotTypeId == PaymentSetup[0].PlotTypeId) && (x.SizeFrom == PaymentSetup[0].SizeFrom) && (x.SizeTo == PaymentSetup[0].SizeTo));

        if (obj.length > 0)
            duplicationPaymentSetup = true;

        if (duplicationPaymentSetup) {
            showError("This Payment Category and selected Tenure is already exist.");
            return;
        }

        CreateNewPaymentSetup();
    });

    $('.btnUpdateChanges').click(function () {
        var duplicationPaymentSetup = false;
        if (!validateForm(".frmPaymentSetup_upd")) return;

      
        PaymentSetup[0].TenureId = $('.ddlTenure_upd').val();
        PaymentSetup[0].Rate = $('.txtRate_upd').val();
        PaymentSetup[0].PlotTypeId = $('.ddlPlotType_upd').val();
        PaymentSetup[0].PlotId = $('.ddlPlot_upd').val();
        PaymentSetup[0].PlotSizeId = $('.ddlPlotSize_upd').val();
        PaymentSetup[0].IsFixed = $('.ddlFixed_upd').val() == 1 ? false : true;
        PaymentSetup[0].HasSizeBase = $('.ddlHasSizeBase_upd').val() == 1 ? true : false;
        PaymentSetup[0].SizeFrom = $('.txtSizeFrom_upd').val();
        PaymentSetup[0].SizeTo = $('.txtSizeTo_upd').val();
        var obj = PaymentSetupList.filter(x=>  (x.TenureId == PaymentSetup[0].TenureId)
            && (x.PlotTypeId == PaymentSetup[0].PlotTypeId) && (x.PaymentSetupId != PaymentSetup[0].PaymentSetupId)
            && (x.SizeFrom == PaymentSetup[0].SizeFrom) && (x.SizeTo == PaymentSetup[0].SizeTo)
            )

        if (obj.length > 0)
            duplicationPaymentSetup = true;

        if (duplicationPaymentSetup) {
            showError("This Payment Category and selected Tenure is already exist.");
            return;
        }
        UpdatePaymentSetup();
    });

    $('.btnDelete').click(function () {
        DeletePaymentSetup();
    });
}

function GetAllPlotType() {

    var request = $.ajax({
        method: "POST",
        url: "/PaymentSetup/GetAllPlotType",
        data: {}
    });
    request.done(function (data) {

        onGetAllPlotType(data);

    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllPlotType(data) {
    try {


        var res = data;
        FillDropDownByReference('.ddlPlotType', res);
        FillDropDownByReference('.ddlPlotType_upd', res);

    }
    catch (Err) {
        console.log(Err);
    }

}
function GetAllPlotSize() {

    var request = $.ajax({
        method: "POST",
        url: "/PaymentSetup/GetAllPlotSize",
        data: {}
    });
    request.done(function (data) {

        onGetAllPlotSize(data);

    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllPlotSize(data) {
    try {


        var res = data;
        FillDropDownByReference('.ddlPlotSize', res);
        FillDropDownByReference('.ddlPlotSize_upd', res);

    }
    catch (Err) {
        console.log(Err);
    }

}
function GetAllPlots() {

    var request = $.ajax({
        method: "POST",
        url: "/PaymentSetup/GetAllPlots",
        data: {}
    });
    request.done(function (data) {

        var res = data;
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
    try {

        var res = data;
        FillDropDownByReference('.ddlPlot_upd', res);


    }
    catch (Err) {
        console.log(Err);
    }

}
function CreateNewPaymentSetup() {
    var request = $.ajax({
        method: "POST",
        url: "/PaymentSetup/CreateNewPaymentSetup",
        data: PaymentSetup[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            $('#CreatePaymentSetup').modal('hide');
            GetAllPaymentSetup();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function CheckDuplicatePaymentSetup() {
    var result = '';
    var request = $.ajax({
        method: "POST",
        url: "/PaymentSetup/CheckDuplicatePaymentSetup",
        data: PaymentSetup[0],
        async: false
    });
    request.done(function (data) {

        result = data;

    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
    return result;

}

function UpdatePaymentSetup() {
    var request = $.ajax({
        method: "POST",
        url: "/PaymentSetup/UpdatePaymentSetup",
        data: PaymentSetup[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Updated!');
            $('#EditPaymentSetup').modal('hide');
            GetAllPaymentSetup();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function DeletePaymentSetup() {
    var request = $.ajax({
        method: "POST",
        url: "/PaymentSetup/DeletePaymentSetup",
        data: PaymentSetup[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            $('#DeletePaymentSetup').modal('hide');
            GetAllPaymentSetup();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}



function GetAllTenure() {

    var request = $.ajax({
        method: "POST",
        url: "/PaymentSetup/GetAllTenure",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        TenureList = res;
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllTenure(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlTenure', res);
        FillDropDownByReference('.ddlTenure_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }

}

function GetAllPaymentCategory() {

    var request = $.ajax({
        method: "POST",
        url: "/PaymentSetup/GetAllPaymentCategory",
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
        FillDropDownByReference('.ddlPaymentCategory_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }

}

function onGetAllTenure_upd(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlTenure_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }

}

function GetAllPaymentSetup() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/PaymentSetup/GetAllPaymentSetup",
        data: {}
    });
    request.done(function (data) {

        onGetAllPaymentSetup(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllPaymentSetup(data) {

    try {
        var res = data;
        PaymentSetupList = res;
        var divTbodyGoalFund = $(".PaymentSetupListing").html("");
        $("#PaymentSetupListing").tmpl(res).appendTo(divTbodyGoalFund);

        var i = 1;
        $('.trPaymentSetup').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
       // paginateTable('.tblPaymentSetup', 10);
        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }
}

function SearchTable() {
    $(".txtSearch").keyup(function () {
        ProgressBarShow();
        _this = this; SearchTable()

        var search = $(_this).val();

        if (search == '') {
            onGetAllPaymentSetup(PaymentSetupList);
        }
        else {
            var obj = PaymentSetupList.filter(x=> x.PaymentCategory.toLowerCase().includes(search.toLowerCase()) ||

				x.Tenure.toLowerCase().includes(search.toLowerCase()) ||
				x.PlotType.toLowerCase().includes(search.toLowerCase())
				)
            onGetAllPaymentSetup(obj);

        }
        ProgressBarHide();
    });
}
function EditPaymentSetup(selector) {
    objEditRow = $(selector).closest('tr');
    PaymentSetup[0].PaymentSetupId = objEditRow.find('.hdnPaymentSetupId').val();
    $('.ddlPaymentCategory_upd').val(objEditRow.find('.hdnPaymentCategoryId').val()).change();
    $('.ddlTenure_upd').val(objEditRow.find('.hdnTenureId').val());
    $('.txtRate_upd').val(objEditRow.find('.hdnRate').val());

    $('.ddlPlotType_upd').val(objEditRow.find('.hdnPlotTypeId').val()).change();
    $('.ddlPlot_upd').val(objEditRow.find('.hdnPlotId').val());
    $('.ddlPlotSize_upd').val(objEditRow.find('.hdnPlotSizeId').val());
    $('.ddlFixed_upd').val(objEditRow.find('.hdnIsFixed').val() == 1 ? 1 : 2);
    $('.ddlHasSizeBase_upd').val(objEditRow.find('.hdnHasSizeBase').val() == "true" ? 1 : 0);
    $('.txtSizeFrom_upd').val(objEditRow.find('.hdnSizeFrom').val());
    $('.txtSizeTo_upd').val(objEditRow.find('.hdnSizeTo').val());

    var HasSizeBaseId = objEditRow.find('.hdnHasSizeBase').val() == "true" ? 1 : 0;

    if (HasSizeBaseId == 2 || HasSizeBaseId == 0) {
        $('.txtSizeFrom_upd').prop("disabled", true);
        $('.txtSizeFrom_upd').addClass("notrequired");

        $('.txtSizeTo_upd').prop("disabled", true);
        $('.txtSizeTo_upd').addClass("notrequired");

        $('.txtSizeTo_upd').val(0);
        $('.txtSizeFrom_upd').val(0);
    }
    else {
        $('.txtSizeFrom_upd').prop("disabled", false);
        $('.txtSizeFrom_upd').removeClass("notrequired");

        $('.txtSizeTo_upd').prop("disabled", false);
        $('.txtSizeTo_upd').removeClass("notrequired");
        
    }

    var PlotTypeId = objEditRow.find('.hdnPlotTypeId').val();
    if (PlotTypeId == 4 || PlotTypeId == 0) {
        $('.ddlPlot_upd').prop("disabled", true);
        $('.ddlPlot_upd').addClass("notrequired");
    }
    else {
        $('.ddlPlot_upd').prop("disabled", false);
        $('.ddlPlot_upd').removeClass("notrequired");

    }
}



