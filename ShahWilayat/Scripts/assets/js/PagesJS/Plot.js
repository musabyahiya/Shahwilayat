GetAllPlotCategoryPercent();
GetAllPlots();
AllClickFunction();
GetAllPlotType();
GetAllPlotSize();
GetAllUnits();
GetAllPlotSpecs();

GetAllPlotSubType();
AllChangeFunction();

var PlotCategoryPercentList;
var PlotsList;
var PlotSubTypeList;
var objEditRow;
var PlotCategoryJSON = [];
var RateJSON = [];
var Plots =
[{
    PlotId: 0,
    PlotTypeId: 0,
    PlotSubTypeId: 0,
    PlotSizeId: 0,
    UnitId: 0,
    PlotNo: null,
    AccountNo: null,
    HasExtraSize: false,
    ExtraSize: null,
    PlotCategory: null,
    HasAlotted: false,
    CategoryPercent: 0
}]

function AllClickFunction() {

    $('.btnSaveChanges').click(function () {
        var duplicationPlotNo = false;
        ActivateExtraSize();


        $('.tdPlotNo').each(function () {
            var plotno = $(this).text().trim();
            if ($('.txtPlotNo').val() == plotno)
                duplicationPlotNo = true;
        });

        if (duplicationPlotNo) {
            showError("This Plot No. is already exists");
            return;
        }

        if (!validateForm(".frmPlots")) return;
        if (AddPlotCategoryToJSON()) {
            showError('This Plot Specification already exist.');
            return;
        }
        if (AddRateToJSON()) {
            showError('The payment rate has some duplication!');
            return;
        }


        Plots[0].PlotTypeId = $('.ddlPlotType').val();
        Plots[0].PlotSubTypeId = $('.ddlPlotSubType').val();
        Plots[0].PlotNo = $('.txtPlotNo').val();
        Plots[0].PlotSizeId = $('.ddlPlotSize').val();
        Plots[0].UnitId = $('.ddlUnit').val();
        Plots[0].PlotNo = $('.txtPlotNo').val();
        Plots[0].AccountNo = $('.txtAccountNo').val();
        Plots[0].HasExtraSize = $('.ddlHasExtraSize').val() == "1" ? true : false;
        Plots[0].ExtraSize = $('.txtExtraSize').val();
        Plots[0].PlotCategory = JSON.stringify(PlotCategoryJSON);
        Plots[0].CategoryPercent = CalculateCategoryPercent();
        
        CreateNewPlot()
      
    });

    $('.btnUpdateChanges').click(function () {

        if (!validateForm(".frmPlots_upd")) return;
        if (AddPlotCategoryToJSON_upd()) {
            showError('This Plot Specification already exist.');
            return;
        }
        Plots[0].PlotTypeId = $('.ddlPlotType_upd').val();
        Plots[0].PlotSubTypeId = $('.ddlPlotSubType_upd').val();
        Plots[0].PlotNo = $('.txtPlotNo_upd').val();
        Plots[0].PlotSizeId = $('.ddlPlotSize_upd').val();
        Plots[0].UnitId = $('.ddlUnit_upd').val();
        Plots[0].PlotNo = $('.txtPlotNo_upd').val();
        Plots[0].AccountNo = $('.txtAccountNo_upd').val();
        Plots[0].HasExtraSize = $('.ddlHasExtraSize_upd').val() == "1" ? true : false;
        Plots[0].ExtraSize = $('.txtExtraSize_upd').val();
        Plots[0].PlotCategory = JSON.stringify(PlotCategoryJSON);
        Plots[0].CategoryPercent = CalculateCategoryPercent();

        ProgressBarShow();
        UpdatePlot();
        ProgressBarHide();
    });

    $('.btnDelete').click(function () {
        ProgressBarShow();
        DeletePlot();
        ProgressBarHide();
    });
}

function AllChangeFunction() {
    $('.ddlHasExtraSize').change(function () {
        if ($('.ddlHasExtraSize').val() == 0) {
            $('.txtExtraSize').val('0');
        }
        ActivateExtraSize();
    });
    $('.ddlHasExtraSize_upd').change(function () {
        if ($('.ddlHasExtraSize_upd').val() == 0) {
            $('.txtExtraSize_upd').val('0');
        }
        ActivateExtraSize_upd();
    });

    $('.ddlPlotType').change(function () {
        var PlotTypeId = $(this).val();
        var obj = PlotSubTypeList.filter(x => x.PlotTypeId == PlotTypeId);
        onGetAllPlotSubType(obj);
    });
    $('.ddlPlotType_upd').change(function () {
        var PlotTypeId = $(this).val();
        var obj = PlotSubTypeList.filter(x => x.PlotTypeId == PlotTypeId);
        onGetAllPlotSubType_upd(obj);
    });

}

function onChangePaymentCategory(selector) {
    var PaymentCategoryId = $(selector).val();
    var obj = PaymentSubCategoryList.filter(x => x.PaymentCategoryId == PaymentCategoryId);
    var DivSubCategory = $(selector).parent().siblings();
    var dropdown = $(DivSubCategory).find('.ddlPaymentSubCategory');
    FillDropDownByReference(dropdown, obj);
}


function ActivateExtraSize() {
    if ($('.ddlHasExtraSize').val() == 1) {
        $('.txtExtraSize').prop("disabled", false);
        $('.txtExtraSize').removeClass("notrequired");
    }
    else {
        $('.txtExtraSize').prop("disabled", true);
        $('.txtExtraSize').addClass("notrequired");

    }
}

function ActivateExtraSize_upd() {
    if ($('.ddlHasExtraSize_upd').val() == 1) {
        $('.txtExtraSize_upd').prop("disabled", false);
        $('.txtExtraSize_upd').removeClass("notrequired");
    }
    else {
        $('.txtExtraSize_upd').prop("disabled", true);
        $('.txtExtraSize_upd').addClass("notrequired");

    }
}
function AddPlotCategoryToJSON() {
    var duplicatePlotCategory = false;
    $(".validate").each(function () {

        var PlotSpecsId = $(this).find(".ddlPlotSpecs").val();
        var PlotSpecsValue = $(this).find(".ddlPlotSpecs option:selected").text();
        var PercentId = $(this).find(".ddlPlotCategoryPercent").val();
        var PercentValue = $(this).find(".ddlPlotCategoryPercent option:selected").text();

        if (PlotCategoryJSON.filter(x=> x.PlotSpecsId == PlotSpecsId).length > 0) {

            PlotCategoryJSON = [];
            duplicatePlotCategory = true;
        }
        else {
            PlotCategoryJSON.push({
                PlotSpecsId: PlotSpecsId,
                PlotSpecsValue: PlotSpecsValue,
                PercentId: PercentId,
                PercentValue: PercentValue
            });
        }
    });

    return duplicatePlotCategory;
}

function AddPlotCategoryToJSON_upd() {
    var duplicatePlotCategory = false;
    $(".AppendedRow_upd").each(function () {

        var PlotSpecsId = $(this).find(".ddlPlotSpecs_upd").val();
        var PlotSpecsValue = $(this).find(".ddlPlotSpecs_upd option:selected").text();
        var PercentId = $(this).find(".ddlPlotCategoryPercent_upd").val();
        var PercentValue = $(this).find(".ddlPlotCategoryPercent_upd option:selected").text();

        if (PlotCategoryJSON.filter(x=> x.PlotSpecsId == PlotSpecsId).length > 0) {
            showError('This Plot Specification already exist.');
            PlotCategoryJSON = [];
            duplicatePlotCategory = true;
        }
        else {
            PlotCategoryJSON.push({
                PlotSpecsId: PlotSpecsId,
                PlotSpecsValue: PlotSpecsValue,
                PercentId: PercentId,
                PercentValue: PercentValue
            });
        }
    });
}

function AddRateToJSON() {
    var duplicateRate = false;
    $(".validate_rate").each(function () {

        var PaymentCategoryId = $(this).find(".ddlPaymentCategory").val();
        var PaymentCategory = $(this).find(".ddlPaymentCategory option:selected").text();
        var PaymentSubCategoryId = $(this).find(".ddlPaymentSubCategory").val();
        var PaymentSubCategory = $(this).find(".ddlPaymentSubCategory option:selected").text();
        var TenureId = $(this).find(".ddlTenure").val();
        var Tenure = $(this).find(".ddlTenure option:selected").text();
        var Rate = $(this).find(".txtRate").val();

        if (RateJSON.filter(x=> x.PaymentCategoryId == PaymentCategoryId && x.PaymentSubCategoryId == PaymentSubCategoryId && x.TenureId == TenureId).length > 0) {
            RateJSON = [];
            duplicateRate = true;
        }
        else {
            RateJSON.push({
                PaymentCategoryId: PaymentCategoryId,
                PaymentCategory: PaymentCategory,
                PaymentSubCategoryId: PaymentSubCategoryId,
                PaymentSubCategory: PaymentSubCategory,
                TenureId: TenureId,
                Tenure: Tenure,
                Rate: Rate
            });
        }
    });
}
function AddPlotCategory() {
    if (!validateForm(".validate")) return;
    var html = "<div class='row AppendedRow validate'>";
    html += "<div class='col-sm-5'>";
    html += "<div class='form-group'>";
    html += "<label for='ddlPlotSpecs'>Plot Specification</label>";
    html += "<select class='form-control ddlPlotSpecs'>";
    var options = $('.ddlPlotSpecs option');

    var values = $.map(options, function (option) {

        html += "<option value='" + option.value + "'>" + option.text + "</option>";
    });
    html += "</select>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-5'> <label for='ddlPlotCategoryPercent'>Percentage</label>";
    html += "<select class='form-control ddlPlotCategoryPercent'>";
    var options = $('.ddlPlotCategoryPercent option');

    var values = $.map(options, function (option) {

        html += "<option value='" + option.value + "'>" + option.text + "</option>";
    });
    html += "</select>";
    html += "</div>";
    html += "<div class='col-sm-1'>";
    html += "<div class='form-group'>";
    html += "<label></label>";
    html += "<button class='btn btn-info form-control btnAddCategory' onclick='AddPlotCategory()'><i class='fa fa-plus'></i></button>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-1'>";
    html += "<div class='form-group'>";
    html += "<label></label>";
    html += "<button class='btn btn-danger form-control btnRemoveCategory' onclick='RemovePlotCategory(this)'><i class='fa fa-minus'></i></button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";

    $(".validate:last").after($(html));


}

function AddPlotCategory_upd() {
    if (!validateForm(".validate_upd")) return;
    var html = "<div class='row AppendedRow_upd validate_upd'>";
    html += "<div class='col-sm-5'>";
    html += "<div class='form-group'>";
    html += "<label for='ddlPlotSpecs_upd'>Plot Specification</label>";
    html += "<select class='form-control ddlPlotSpecs_upd'>";
    html += "<option value='0'>--Select--</option>";
    html += "<option value='1'>West Open</option>";
    html += "<option value='2'>Corner</option>";
    html += "<option value='3'>Park Facing</option>";
    html += "<option value='4'>Double Road</option>";
    html += "<option value='5'>Extra Land</option>";
    html += "</select>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-5'> <label for='ddlPlotCategoryPercent_upd'>Percentage</label>";
    html += "<select class='form-control ddlPlotCategoryPercent_upd'>";
    html += "<option value='0'>--Select--</option>";
    html += "<option value='1'>05 %</option>";
    html += "<option value='2'>10 %</option>";
    html += "<option value='3'>15 %</option>";
    html += "<option value='4'>20 %</option>";
    html += "<option value='5'>25 %</option>";
    html += "<option value='5'>30 %</option>";
    html += "</select>";
    html += "</div>";
    html += "<div class='col-sm-1'>";
    html += "<div class='form-group'>";
    html += "<label></label>";
    html += "<button class='btn btn-info form-control btnAddCategory_upd' onclick='AddPlotCategory_upd()'><i class='fa fa-plus'></i></button>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-1'>";
    html += "<div class='form-group'>";
    html += "<label></label>";
    html += "<button class='btn btn-danger form-control btnRemoveCategory_upd' onclick='RemovePlotCategory_upd(this)'><i class='fa fa-minus'></i></button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    $(".validate_upd:last").after($(html));

}


function RemovePlotCategory(selector) {
    $(selector).closest(".validate").remove();
}
function RemovePlotCategory_upd(selector) {
    $(selector).closest(".validate_upd").remove();
}


function RemoveRate(selector) {
    $(selector).closest(".validate_rate").remove();
}
function RemoveRate_upd(selector) {
    $(selector).closest(".validate_rate_upd").remove();
}

function AddRate() {
    if (!validateForm(".validate_rate")) return;
    var html = "<div class='col-lg-12 AppendedRow_rate validate_rate'>";
    html += "<div class='col-sm-2'> <label for='ddlPaymentCategory'>Payment Category</label>";
    html += "<select class='form-control ddlPaymentCategory'  onchange='onChangePaymentCategory(this)'>";
    var options = $('.ddlPaymentCategory:last  option');

    var values = $.map(options, function (option) {

        html += "<option value='" + option.value + "'>" + option.text + "</option>";
    });
    html += "</select>";
    html += "</div>";
    html += "<div class='col-sm-2'> <label for='ddlPaymentSubCategory'>Sub Category</label>";
    html += "<select class='form-control ddlPaymentSubCategory'>";

    html += "</select>";
    html += "</div>";


    html += "<div class='col-sm-2'> <label for='ddlTenure'>Tenure</label>";
    html += "<select class='form-control ddlTenure'>";
    var options = $('.ddlTenure:last option');

    var values = $.map(options, function (option) {

        html += "<option value='" + option.value + "'>" + option.text + "</option>";
    });
    html += "</select>";
    html += "</div>";
    html += "<div class='col-sm-2'>";
    html += "<div class='form-group'>";
    html += "<label for='txtDueDate'>Due Date</label>";
    html += "<input type='text' class='form-control txtDueDate DatePickerComplete'  placeholder='dd/mm/yyyy'>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-2'>";
    html += "<div class='form-group'>";
    html += "<label for='txtRate'>Rate</label>";
    html += "<input type='text' class='form-control txtRate numericOnly'  placeholder='Enter rate tenure wise'>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-1'>";
    html += "<div class='form-group'>";
    html += "<label></label>";
    html += "<button class='btn btn-info form-control btnAddRate' onclick='AddRate()'><i class='fa fa-plus'></i></button>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-1'>";
    html += "<div class='form-group'>";
    html += "<label></label>";
    html += "<button class='btn btn-danger form-control btnRemoveRate' onclick='RemoveRate(this)'><i class='fa fa-minus'></i></button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";

    $(".validate_rate:last").after($(html));
    validateNumeric();
    AllChangeFunction();
}

function GetAllPlotType() {

    var request = $.ajax({
        method: "POST",
        url: "/Plots/GetAllPlotType",
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



function GetAllPlotSubType() {

    var request = $.ajax({
        method: "POST",
        url: "/Plots/GetAllPlotSubType",
        data: {}
    });
    request.done(function (data) {

        PlotSubTypeList = data;

    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllPlotSubType(data) {
    try {


        var res = data;
        FillDropDownByReference('.ddlPlotSubType', res);

    }
    catch (Err) {
        console.log(Err);
    }

}

function onGetAllPlotSubType_upd(data) {
    try {


        var res = data;
        FillDropDownByReference('.ddlPlotSubType_upd', res);

    }
    catch (Err) {
        console.log(Err);
    }

}
function GetAllPlotSpecs() {

    var request = $.ajax({
        method: "POST",
        url: "/Plots/GetAllPlotSpecs",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        onGetAllPlotSpecs(res);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function onGetAllPlotSpecs(data) {
    try {
        var res = data;
        FillDropDownByReference('.ddlPlotSpecs', res);
        FillDropDownByReference('.ddlPlotSpecs_upd', res);

    }
    catch (Err) {
        console.log(Err);
    }
}
function GetAllPlotCategoryPercent() {

    var request = $.ajax({
        method: "POST",
        url: "/Plots/GetAllPlotCategoryPercent",
        data: {}
    });
    request.done(function (data) {


        var res = data;
        PlotCategoryPercentList = res;
        onGetAllPlotCategoryPercent(res);


    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllPlotCategoryPercent(data) {
    try {


        var res = data;
        FillDropDownByReference('.ddlPlotCategoryPercent', res);
        FillDropDownByReference('.ddlPlotCategoryPercent_upd', res);

    }
    catch (Err) {
        console.log(Err);
    }

}

function GetAllUnits() {

    var request = $.ajax({
        method: "POST",
        url: "/Plots/GetAllUnits",
        data: {}
    });
    request.done(function (data) {

        onGetAllUnits(data);


    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllUnits(data) {
    try {


        var res = data;
        FillDropDownByReference('.ddlUnit', res);
        FillDropDownByReference('.ddlUnit_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }

}
function GetAllPlotSize() {

    var request = $.ajax({
        method: "POST",
        url: "/Plots/GetAllPlotSize",
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



function CreateNewPlot() {

    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/Plots/CreateNewPlot",
        data: Plots[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            PlotCategoryJSON = [];
            $('#CreatePlot').modal('hide');
            ProgressBarHide();
            GetAllPlots();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function UpdatePlot() {
    var request = $.ajax({
        method: "POST",
        url: "/Plots/UpdatePlot",
        data: Plots[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Updated!');
            $('#EditPlot').modal('hide');
            PlotCategoryJSON = [];
            GetAllPlots();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}



function DeletePlot() {
    var request = $.ajax({
        method: "POST",
        url: "/Plots/DeletePlot",
        data: Plots[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Deleted!');
            $('#DeletePlot').modal('hide');
            GetAllPlots();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function GetAllPlots() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/Plots/GetAllPlots",
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
        var divTbodyGoalFund = $(".PlotsListing").html("");
        $("#PlotsListing").tmpl(res).appendTo(divTbodyGoalFund);
        //Export
        divTbodyGoalFund = $(".PlotsListingExport").html("");
        $("#PlotsListingExport").tmpl(res).appendTo(divTbodyGoalFund);
        var i = 1;
        $('.trPlots').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
        i = 1;
        $('.trPlotsExport').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }
}
function EditPlot(selector) {
    objEditRow = $(selector).closest('tr');
    Plots[0].PlotId = objEditRow.find('.hdnPlotId').val();
    $('.ddlPlotType_upd').val(objEditRow.find('.hdnPlotTypeId').val()).change();
    $('.ddlPlotSubType_upd').val(objEditRow.find('.hdnPlotSubTypeId').val());
    $('.txtPlotNo_upd').val(objEditRow.find('.tdPlotNo').text());
    $('.txtAccountNo_upd').val(objEditRow.find('.tdAccountNo').text());
    $('.ddlPlotSize_upd').val(objEditRow.find('.hdnPlotSizeId').val());
    $('.ddlUnit_upd').val(objEditRow.find('.hdnUnitId').val());
    $('.ddlHasExtraSize_upd').val(objEditRow.find('.hdnHasExtraSize').val() == 'true' ? 1 : 0).change();
    $('.txtExtraSize_upd').val(objEditRow.find('.hdnExtraSize').val());

    PlotCategoryJSON = [];
    $(".AppendedRow_upd").remove();
    BindPlotCategoryEdit(objEditRow.find('.hdnPlotCategory').val());
}

function BindPlotCategoryEdit(Json) {
    var i = 0;
    $.each(JSON.parse(Json), function (key, val) {
        var rowHtml = '';
        if (i == 0) {
            var html = "<div class='row AppendedRow_upd validate_upd'>";
            html += "<div class='col-sm-5'>";
            html += "<div class='form-group'>";
            html += "<label for='ddlPlotSpecs_upd'>Plot Specification</label>";
            html += "<select class='form-control ddlPlotSpecs_upd'>";
            html += "<option value='0'>--Select--</option>";
            html += "<option value='1'>West Open</option>";
            html += "<option value='2'>Corner</option>";
            html += "<option value='3'>Park Facing</option>";
            html += "<option value='4'>Double Road</option>";
            html += "<option value='5'>Extra Land</option>";
            html += "<option value='1002'>None</option>";
            html += "</select>";
            html += "</div>";
            html += "</div>";
            html += "<div class='col-sm-5'><label for='ddlPlotCategoryPercent_upd'>Percentage</label>";
            html += "<select class='form-control ddlPlotCategoryPercent_upd'>";
            html += "<option value='0'>--Select--</option>";
            html += "<option value='1002'>0 %</option>";
            html += "<option value='1'>05 %</option>";
            html += "<option value='2'>10 %</option>";
            html += "<option value='3'>15 %</option>";
            html += "<option value='4'>20 %</option>";
            html += "<option value='5'>25 %</option>";
            html += "<option value='5'>30 %</option>";
            html += "</select>";
            html += "</div>";
            html += "<div class='col-sm-1'>";
            html += "<div class='form-group'>";
            html += "<label></label>";
            html += "<button class='btn btn-info form-control btnAddCategory_upd' onclick='AddPlotCategory_upd()'><i class='fa fa-plus'></i></button>";
            html += "</div>";
            html += "</div>";
            html += "</div>";
        }

        else {
            var html = "<div class='row AppendedRow_upd validate_upd'>";
            html += "<div class='col-sm-5'>";
            html += "<div class='form-group'>";
            html += "<label for='ddlPlotSpecs_upd'>Plot Specification</label>";
            html += "<select class='form-control ddlPlotSpecs_upd'>";
            html += "<option value='0'>--Select--</option>";
            html += "<option value='1'>West Open</option>";
            html += "<option value='2'>Corner</option>";
            html += "<option value='3'>Park Facing</option>";
            html += "<option value='4'>Double Road</option>";
            html += "<option value='5'>Extra Land</option>";
            html += "<option value='1002'>None</option>";
            html += "</select>";
            html += "</div>";
            html += "</div>";
            html += "<div class='col-sm-5'> <label for='ddlPlotCategoryPercent_upd'>Percentage</label>";
            html += "<select class='form-control ddlPlotCategoryPercent_upd'>";
            html += "<option value='0'>--Select--</option>";
            html += "<option value='1002'>0 %</option>";
            html += "<option value='1'>05 %</option>";
            html += "<option value='2'>10 %</option>";
            html += "<option value='3'>15 %</option>";
            html += "<option value='4'>20 %</option>";
            html += "<option value='5'>25 %</option>";
            html += "<option value='5'>30 %</option>";
            html += "</select>";
            html += "</div>";
            html += "<div class='col-sm-1'>";
            html += "<div class='form-group'>";
            html += "<label></label>";
            html += "<button class='btn btn-info form-control btnAddCategory_upd' onclick='AddPlotCategory_upd()'><i class='fa fa-plus'></i></button>";
            html += "</div>";
            html += "</div>";
            html += "<div class='col-sm-1'>";
            html += "<div class='form-group'>";
            html += "<label></label>";
            html += "<button class='btn btn-danger form-control btnRemoveCategory_upd' onclick='RemovePlotCategory_upd(this)'><i class='fa fa-minus'></i></button>";
            html += "</div>";
            html += "</div>";
            html += "</div>";

        }

        $(".validate_upd:last").after($(html));
        $(".ddlPlotSpecs_upd").eq(i).val(val.PlotSpecsId);
        $(".ddlPlotCategoryPercent_upd").eq(i).val(val.PercentId);
        i++;
    });
}


function htmlBr(Json, Key) {
    var b = "";
    Json = JSON.parse(Json);
    $.each(Json, function (i, item) {
        if (i == Json.length) {
            b += item[Key];
        } else {
            b += item[Key] + "</br>";
        }
    });
    return b;
}

function CalculatePercentWisePrice(TotalSize, UnitRate, PlotCategory) {
    var PercentJSON = JSON.parse(PlotCategory);
    //objEditRow = $(selector).closest('tr');
    //var PercentJSON = JSON.parse(objEditRow.find('.hdnPlotCategory').val());
    //var UnitRate = JSON.parse(objEditRow.find('.hdnUnitRate').val());
    var totalper = 0;
    $.each(PercentJSON, function () {
        var Id = parseInt(this.PercentId);

        var obj = PlotCategoryPercentList.filter(x=> x.Id == Id);

        totalper += parseInt(obj[0].PlotCategoryPercent);
    });


    //var TotalSize = objEditRow.find('.hdnHasExtraSize').val() == true ? objEditRow.find('.hdnExtraSize').val() + objEditRow.find('.tdUnit').text().trim()
    //    : objEditRow.find('.tdUnit').text().trim();
    var TotalPrice = UnitRate * TotalSize;
    var PercentPrice = (TotalPrice * totalper) / 100;
    return PercentPrice;

}


function CalculateTotalPrice(TotalSize, UnitRate, PlotCategory) {
    var PercentJSON = JSON.parse(PlotCategory);
    var totalper = 0;
    $.each(PercentJSON, function () {
        var Id = parseInt(this.PercentId);

        var obj = PlotCategoryPercentList.filter(x=> x.Id == Id);

        totalper += parseInt(obj[0].PlotCategoryPercent);
    });
    var TotalPrice = UnitRate * TotalSize;
    var PercentPrice = (TotalPrice * totalper) / 100;
    return TotalPrice;

}


function CalculateCategoryPercent() {

    var CategoryPercent = 0;
    $.each(PlotCategoryJSON, function () {
        var Id = parseInt(this.PercentId);
        var obj = PlotCategoryPercentList.filter(x=> x.Id == Id);
        CategoryPercent += parseInt(obj[0].PlotCategoryPercent);
    });

    return CategoryPercent;
}

