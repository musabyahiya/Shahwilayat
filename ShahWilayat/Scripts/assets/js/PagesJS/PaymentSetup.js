GetAllPaymentSetup();
GetAllPaymentCategory();
GetAllPaymentSubCategory();
GetAllTenure();
GetAllPlotType();
GetAllPlots();
AllClickFunction();
AllChangeFunction();
var objEditRow;
var PaymentSubCategoryList;
var TenureList;
var PlotList;
var PaymentSetup =
[{
    PaymentSetupId: 0,
    PaymentCategoryId: 0,
    PaymentSubCategoryId: 0,
    TenureId: 0,
    Rate: 0,
    PlotTypeId: 0,
    PlotId: 0
}]

function AllChangeFunction() {
    $(".ddlPaymentCategory").change(function () {
        var PaymentCategoryId = $(this).val();
        var obj = PaymentSubCategoryList.filter(x => x.PaymentCategoryId == PaymentCategoryId);
        onGetAllPaymentSubCategory(obj);
    });

    $(".ddlPaymentCategory_upd").change(function () {
        var PaymentCategoryId = $(this).val();
        var obj = PaymentSubCategoryList.filter(x => x.PaymentCategoryId == PaymentCategoryId);
        onGetAllPaymentSubCategory_upd(obj);
    });

    $(".ddlPaymentSubCategory").change(function () {
        var PaymentSubCategoryId = $(this).val();
        var obj = TenureList.filter(x => x.PaymentSubCategoryId == PaymentSubCategoryId);
        onGetAllTenure(obj);
    });

    $(".ddlPaymentSubCategory_upd").change(function () {
        var PaymentSubCategoryId = $(this).val();
        var obj = TenureList.filter(x => x.PaymentSubCategoryId == PaymentSubCategoryId);
        onGetAllTenure_upd(obj);
    });

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
        var duplicationPaymentSetup = false;
        if (!validateForm(".frmPaymentSetup")) return;

        PaymentSetup[0].PaymentCategoryId = $('.ddlPaymentCategory').val();
        PaymentSetup[0].PaymentSubCategoryId = $('.ddlPaymentSubCategory').val();
        PaymentSetup[0].TenureId = $('.ddlTenure').val();
        PaymentSetup[0].Rate = $('.txtRate').val();
        PaymentSetup[0].PlotTypeId = $('.ddlPlotType').val();
        PaymentSetup[0].PlotId = $('.ddlPlots').val();

        $('.trPaymentSetup').each(function () {
            if ($(this).children('.hdnPaymentCategoryId').val() == PaymentSetup[0].PaymentCategoryId &&
                $(this).children('.hdnTenureId').val() == PaymentSetup[0].TenureId &&
                $(this).children('.hdnPaymentSubCategoryId').val() == PaymentSetup[0].PaymentSubCategoryId &&
                $(this).children('.hdnPlotTypeId').val() == PaymentSetup[0].PlotTypeId &&
                (PaymentSetup[0].PlotTypeId == 4 ?
                true : $(this).children('.hdnPlotId').val() == PaymentSetup[0].PlotId)
                ) {
                duplicationPaymentSetup = true;
            }
        });
        if (duplicationPaymentSetup) {
            showError("This Payment Category and selected Tenure is already exist.");
            return;
        }
        CreateNewPaymentSetup();
    });

    $('.btnUpdateChanges').click(function () {
        var duplicationPaymentSetup = false;
        if (!validateForm(".frmPaymentSetup_upd")) return;

        PaymentSetup[0].PaymentCategoryId = $('.ddlPaymentCategory_upd').val();
        PaymentSetup[0].PaymentSubCategoryId = $('.ddlPaymentSubCategory_upd').val();
        PaymentSetup[0].TenureId = $('.ddlTenure_upd').val();
        PaymentSetup[0].Rate = $('.txtRate_upd').val();
        PaymentSetup[0].PlotTypeId = $('.ddlPlotType_upd').val();
        PaymentSetup[0].PlotId = $('.ddlPlots_upd').val();
        var i = 0;
        $('.trPaymentSetup').each(function () {
            if (
                ($(this).children('.hdnPaymentCategoryId').val() == PaymentSetup[0].PaymentCategoryId) &&
                ($(this).children('.hdnTenureId').val() == PaymentSetup[0].TenureId) &&
                ($(this).children('.hdnPaymentSubCategoryId').val() == PaymentSetup[0].PaymentSubCategoryId) &&
                ($(this).children('.hdnPlotTypeId').val() == PaymentSetup[0].PlotTypeId) &&
                (PaymentSetup[0].PlotTypeId == 4 ?
                true : $(this).children('.hdnPlotId').val() == PaymentSetup[0].PlotId) &&
                ($(this).children('.hdnPaymentSetupId').val() != PaymentSetup[0].PaymentSetupId)) {
                duplicationPaymentSetup = true;
                i++;
            }
        });
        if (duplicationPaymentSetup && i == 1) {
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
        FillDropDownByReference('.ddlPlots', res);


    }
    catch (Err) {
        console.log(Err);
    }

}
function onGetAllPlots_upd(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlPlots_upd', res);


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

function GetAllPaymentCategory() {

    var request = $.ajax({
        method: "POST",
        url: "/PaymentSetup/GetAllPaymentCategory",
        data: {}
    });
    request.done(function (data) {

        onGetAllPaymentCategory(data);
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
        var html = '';
        var counter = 0;
        $('.AppendedPanel').remove();
        $.each(res, function (key, value) {
            var PlotTypeId = value.PlotTypeId;

            if (CheckExistingPlotType(PlotTypeId)) {
                html += "<div class='panel panel-default AppendedPanel'>";
                html += "<div class='panel-heading blue-heading'>";
                html += "<h4 class='panel-title'>";
                html += "<a class='accordion-toggle hdnPlotTypeId' hdnplottypeid='" + value.PlotTypeId + "'  data-toggle='collapse' data-parent='#accordion' href='#" + value.PlotType.replace(/ /g, '') + "'>";
                html += value.PlotType;
                html += "</a>";
                html += "</h4>";
                html += "</div>";

                var childPlotType = res.filter(x=> x.PlotTypeId == value.PlotTypeId);



                html += "<div id='" + value.PlotType.replace(/ /g, '') + "' class='panel-collapse collapse'>";
                html += "<div class='panel-body' style='overflow: auto;'>";

                // only print one time
                html += "<table class='table table-hover' >";
                html += "<thead>";
                html += "<tr>";
                html += "<th nowrap>Sr No.</th>";
                html += "<th nowrap>Payment Category</th>";
                html += "<th nowrap>Payment SubCategory</th>";
                html += "<th nowrap>Tenure</th>";
                html += "<th nowrap>Plot Type</th>";
                html += "<th nowrap>Plot</th>"; // If residential plot hide
                html += "<th nowrap>Rate / Unit (PKR)</th>";
                html += "<th nowrap>Action</th>";
                html += "</tr>";
                html += "</thead>";
                html += "<tbody>";

                /*Binding rows Payment setup*/
                var index = 1;
                $.each(childPlotType, function (key3, value3) {



                    html += "<tr class='trPaymentSetup'>";
                    html += "<input type='hidden' class='hdnPaymentSetupId' value='" + value3.PaymentSetupId + "' />";
                    html += "<input type='hidden' class='hdnPaymentCategoryId' value='" + value3.PaymentCategoryId + "' />";
                    html += "<input type='hidden' class='hdnPaymentSubCategoryId' value='" + value3.PaymentSubCategoryId + "' />";
                    html += "<input type='hidden' class='hdnTenureId' value='" + value3.TenureId + "' />";
                    html += "<input type='hidden' class='hdnPlotTypeId' value='" + value3.PlotTypeId + "' />";
                    html += "<input type='hidden' class='hdnPlotId' value='" + value3.PlotId + "' />";
                    html += "<input type='hidden' class='hdnRate' value='" + value3.Rate + "' />";
                    html += "<td>" + index + "</td>";
                    html += "<td class='tdPaymentCategory'>" + value3.PaymentCategory + "</td>";
                    html += "<td class='tdPaymentSubCategory'>" + value3.PaymentSubCategory + "</td>";
                    html += "<td class='tdTenure'>" + value3.Tenure + "</td>";
                    html += "<td class='tdPlotType' nowrap>" + value3.PlotType + "</td>";
                    html += "<td class='tdPlot' nowrap>" + value3.Plot + "</td>"; // If residential plot hide
                    html += "<td class='tdRate' nowrap>" + moneyFormat(value3.Rate) + "</td>";






                    html += "<td class='project-title' nowrap=''>";
                    html += "<input type='button' onclick='EditPaymentSetup(this)' data-toggle='modal' data-target='#EditPaymentSetup' value='Edit Details' class='btn btn-group btn-xs btn-info'>&nbsp;&nbsp;";
                    html += "<input type='button' data-toggle='modal' data-target='#DeletePaymentSetup' onclick='EditPaymentSetup(this)' value='Delete' class='btn btn-group btn-xs btn-danger'>";
                    html += "</td>";
                    html += "</tr>";

                    index++;



                })
                /*Binding Child Nominee*/
                html += "</tbody>";
                html += "</table>";
                html += "</div>";
                html += "</div>";


                html += "</div>";

                counter == 0 ? $('.AppendInside').append(html) : $(".AppendInside:last").after($(html));;
                html = '';
                counter++;
            }
            else {
                html = '';
            }


        });
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

function EditPaymentSetup(selector) {
    objEditRow = $(selector).closest('tr');
    PaymentSetup[0].PaymentSetupId = objEditRow.find('.hdnPaymentSetupId').val();
    $('.ddlPaymentCategory_upd').val(objEditRow.find('.hdnPaymentCategoryId').val()).change();
    $('.ddlPaymentSubCategory_upd').val(objEditRow.find('.hdnPaymentSubCategoryId').val()).change();;
    $('.ddlTenure_upd').val(objEditRow.find('.hdnTenureId').val());
    $('.txtRate_upd').val(objEditRow.find('.hdnRate').val());

    $('.ddlPlotType_upd').val(objEditRow.find('.hdnPlotTypeId').val()).change();
    $('.ddlPlots_upd').val(objEditRow.find('.hdnPlotId').val());

    var PlotTypeId = objEditRow.find('.hdnPlotTypeId').val();
    if (PlotTypeId == 4 || PlotTypeId == 0) {
        $('.ddlPlots_upd').prop("disabled", true);
        $('.ddlPlots_upd').addClass("notrequired");
    }
    else {
        $('.ddlPlots_upd').prop("disabled", false);
        $('.ddlPlots_upd').removeClass("notrequired");

    }
}

function GetAllPaymentSubCategory() {

    var request = $.ajax({
        method: "POST",
        url: "/PaymentSetup/GetAllPaymentSubCategory",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        PaymentSubCategoryList = res;
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function onGetAllPaymentSubCategory(data) {
    try {
        var res = data;
        FillDropDownByReference('.ddlPaymentSubCategory', res);
        FillDropDownByReference('.ddlPaymentSubCategory_upd', res);

    }
    catch (Err) {
        console.log(Err);
    }

}

function onGetAllPaymentSubCategory_upd(data) {
    try {
        var res = data;
        FillDropDownByReference('.ddlPaymentSubCategory_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }

}

function CalculateTotal() {
    var TotalRate = 0;
    $('.trPaymentSetup').each(function () {
        var rate = $(this).children('.hdnRate').val();
        TotalRate += parseInt(rate);
    });
    BindTextToSelector($('.tdTotalRate'), moneyFormat(TotalRate) + ' PKR');


}
