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
        if (!validateForm(".frmCharge")) return;

        Charges[0].PaymentSetupId = $('.ddlPaymentSetup').val();
        Charges[0].Description = $('.txtDescription').val();
        Charges[0].DueDate = formatDate($('.txtDueDate').val());
        Charges[0].Surcharge = $('.txtSurcharge').val();
        Charges[0].PlotTypeId = $('.ddlPlotType').val();
        Charges[0].PlotId = $('.ddlPlots').val();
        $('.trCharges').each(function () {
            if ($(this).children('.hdnPaymentSetupId').val() == Charges[0].PaymentSetupId) {
                duplicationCharges = true;
            }
        });
        if (duplicationCharges) {
            showError("This Payment Setup is already exist.");
            return;
        }
        CreateNewCharge();
    });

    $('.btnUpdateChanges').click(function () {
        var duplicationCharges = false;
        if (!validateForm(".frmCharge_upd")) return;

        Charges[0].PaymentSetupId = $('.ddlPaymentSetup_upd').val();
        Charges[0].Description = $('.txtDescription_upd').val();
        Charges[0].DueDate = formatDate($('.txtDueDate_upd').val());
        Charges[0].Surcharge = $('.txtSurcharge_upd').val();
        Charges[0].PlotTypeId = $('.ddlPlotType_upd').val();
        Charges[0].PlotId = $('.ddlPlots_upd').val();

        $('.trCharges').each(function () {
            if ($(this).children('.hdnPaymentSetupId').val() == Charges[0].PaymentSetupId &&
                $(this).children('.hdnChargeId').val() != Charges[0].ChargeId) {
                duplicationCharges = true;
            }
        });
        if (duplicationCharges) {
            showError("This Payment Setup is already exist.");
            return;
        }
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
            $('#CreateCharge').modal('hide');
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
                html += "<th nowrap>Payment Setup</th>";
                html += "<th nowrap>Description</th>";
                html += "<th nowrap>Due Date</th>";
                html += "<th nowrap>Surchage (%)</th>";
                html += "<th nowrap>Plot Type</th>"; // If residential plot hide
                html += "<th nowrap>Plot</th>";
                html += "<th nowrap>Action</th>";
                html += "</tr>";
                html += "</thead>";
                html += "<tbody>";

                /*Binding rows Payment setup*/
                var index = 1;
                $.each(childPlotType, function (key3, value3) {



                    html += "<tr class='trCharge'>";
                    html += "<input type='hidden' class='hdnChargeId' value='" + value3.ChargeId + "' />";
                    html += "<input type='hidden' class='hdnPaymentSetupId' value='" + value3.PaymentSetupId + "' />";
                    html += "<input type='hidden' class='hdnPlotTypeId' value='" + value3.PlotTypeId + "' />";
                    html += "<input type='hidden' class='hdnPlotId' value='" + value3.PlotId + "' />";
                    html += "<input type='hidden' class='hdnSurcharge' value='" + value3.Surcharge + "' />";
                    html += "<input type='hidden' class='hdnDueDate' value='" + ToJavaScriptDate(value3.DueDate) + "' />";
                    html += "<td>" + index + "</td>";
                    html += "<td class='tdPaymentSetup'>" + value3.PaymentSetup + "</td>";
                    html += "<td class='tdDescription'>" + value3.Description + "</td>";
                    html += "<td class='tdDueDate'>" + ToJavaScriptDate(value3.DueDate) + "</td>";
                    html += "<td class='tdSurcharge' nowrap>" + value3.Surcharge + "</td>";
                    html += "<td class='tdPlotType' nowrap>" + value3.PlotType + "</td>";
                    html += "<td class='tdPlot' nowrap>" + value3.Plot + "</td>"; // If residential plot hide


                    html += "<td class='project-title' nowrap=''>";
                    html += "<input type='button' onclick='EditCharge(this)' data-toggle='modal' data-target='#EditCharge' value='Edit Details' class='btn btn-group btn-xs btn-info'>&nbsp;&nbsp;";
                    html += "<input type='button' data-toggle='modal' data-target='#DeleteCharge' onclick='EditCharge(this)' value='Delete' class='btn btn-group btn-xs btn-danger'>";
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
            $('#EditCharge').modal('hide');

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

function GetAllPaymentSubCategory() {

    var request = $.ajax({
        method: "POST",
        url: "/Charges/GetAllPaymentSubCategory",
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
            $('#DeleteCharge').modal('hide');
            GetAllCharges();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function EditCharge(selector) {
    objEditRow = $(selector).closest('tr');
    Charges[0].ChargeId = objEditRow.find('.hdnChargeId').val();
    $('.ddlPaymentSetup_upd').val(objEditRow.find('.hdnPaymentSetupId').val()).change();
    $('.txtDescription_upd').val(objEditRow.find('.tdDescription').text().trim());
    $('.txtDueDate_upd').val(objEditRow.find('.tdDueDate').text().trim());
    $('.txtSurcharge_upd').val(objEditRow.find('.hdnSurcharge').val());
}