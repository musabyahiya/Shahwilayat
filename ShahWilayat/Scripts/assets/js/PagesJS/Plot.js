GetAllPlot();
AllClickFunction();
GetAllPlotType();
GetAllPlotSize();
GetAllUnits();
GetAllManagementCommittee();

GetAllPlotSubType();
AllChangeFunction();
SearchTable();
var PlotList;
var PlotSubTypeList;
var objEditRow;
var SitePlan;

var Plot =
[{
    PlotId: 0,
    PlotTypeId: 0,
    PlotubTypeId: 0,
    PlotSizeId: 0,
    UnitId: 0,
    PlotNo: null,
    HasExtraSize: false,
    ExtraSize: null,
    HasAlotted: false,
    SitePlan: null,
    ManagementCommitteeId: 0

}]
function SearchTable() {
    $(".txtSearch").keyup(function () {
        ProgressBarShow();
        _this = this;

        var search = $(_this).val();

        if (search == '') {
            onGetAllPlot(PlotList);
        }
        else {
            var obj = PlotList.filter(x=> x.PlotType.toLowerCase().includes(search.toLowerCase()) ||
				x.PlotNo.includes(search.toLowerCase()) ||
				x.PlotSubType.toLowerCase().includes(search.toLowerCase())
				)
            onGetAllPlot(obj);

        }
        ProgressBarHide();
    });
}
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



        Plot[0].PlotTypeId = $('.ddlPlotType').val();
        Plot[0].PlotSubTypeId = $('.ddlPlotSubType').val();
        Plot[0].PlotNo = $('.txtPlotNo').val();
        Plot[0].PlotSizeId = $('.ddlPlotSize').val();
        Plot[0].UnitId = $('.ddlUnit').val();
        Plot[0].ManagementCommitteeId = $('.ddlManagementCommittee').val();
        Plot[0].PlotNo = $('.txtPlotNo').val();
        Plot[0].HasExtraSize = $('.ddlHasExtraSize').val() == "1" ? true : false;
        Plot[0].ExtraSize = $('.txtExtraSize').val();
        Plot[0].SitePlan = FileUpload('.txtSitePlan');


        CreateNewPlot()

    });

    $('.btnUpdateChanges').click(function () {

        if (!validateForm(".frmPlot_upd")) return;

        ProgressBarShow();
        Plot[0].PlotTypeId = $('.ddlPlotType_upd').val();
        Plot[0].PlotSubTypeId = $('.ddlPlotSubType_upd').val();
        Plot[0].PlotNo = $('.txtPlotNo_upd').val();
        Plot[0].PlotSizeId = $('.ddlPlotSize_upd').val();
        Plot[0].UnitId = $('.ddlUnit_upd').val();
        Plot[0].ManagementCommitteeId = $('.ddlManagementCommittee_upd').val();
        Plot[0].PlotNo = $('.txtPlotNo_upd').val();
        Plot[0].HasExtraSize = $('.ddlHasExtraSize_upd').val() == "1" ? true : false;
        Plot[0].ExtraSize = $('.txtExtraSize_upd').val();
        Plot[0].SitePlan = FileUpload('.txtSitePlan_upd') == '' ? SitePlan : FileUpload('.txtSitePlan_upd');



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

        var PlotpecsId = $(this).find(".ddlPlotpecs").val();
        var PlotpecsValue = $(this).find(".ddlPlotpecs option:selected").text();
        var PercentId = $(this).find(".ddlPlotCategoryPercent").val();
        var PercentValue = $(this).find(".ddlPlotCategoryPercent option:selected").text();

        if (PlotCategoryJSON.filter(x=> x.PlotpecsId == PlotpecsId).length > 0) {

            PlotCategoryJSON = [];
            duplicatePlotCategory = true;
        }
        else {
            PlotCategoryJSON.push({
                PlotpecsId: PlotpecsId,
                PlotpecsValue: PlotpecsValue,
                PercentId: PercentId,
                PercentValue: PercentValue
            });
        }
    });

    return duplicatePlotCategory;
}




function GetAllPlotType() {

    var request = $.ajax({
        method: "POST",
        url: "/Plot/GetAllPlotType",
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
        url: "/Plot/GetAllPlotSubType",
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

function GetAllUnits() {

    var request = $.ajax({
        method: "POST",
        url: "/Plot/GetAllUnits",
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


function GetAllManagementCommittee() {

    var request = $.ajax({
        method: "POST",
        url: "/Plot/GetAllManagementCommittee",
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
function GetAllPlotSize() {

    var request = $.ajax({
        method: "POST",
        url: "/Plot/GetAllPlotSize",
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
        url: "/Plot/CreateNewPlot",
        data: Plot[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            PlotCategoryJSON = [];
            $('#CreatePlot').modal('hide');
            ProgressBarHide();
            GetAllPlot();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function UpdatePlot() {
    var request = $.ajax({
        method: "POST",
        url: "/Plot/UpdatePlot",
        data: Plot[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Updated!');
            $('#EditPlot').modal('hide');
            PlotCategoryJSON = [];
            GetAllPlot();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}



function DeletePlot() {
    var request = $.ajax({
        method: "POST",
        url: "/Plot/DeletePlot",
        data: Plot[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Deleted!');
            $('#DeletePlot').modal('hide');
            GetAllPlot();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function GetAllPlot() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/Plot/GetAllPlots",
        data: {}
    });
    request.done(function (data) {

        onGetAllPlot(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllPlot(data) {

    try {
        var res = data;
        PlotList = data;
        var divTbodyGoalFund = $(".PlotListing").html("");
        $("#PlotListing").tmpl(res).appendTo(divTbodyGoalFund);

        var i = 1;
        $('.trPlot').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });

        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }
    ProgressBarHide();
}
function EditPlot(selector) {
    objEditRow = $(selector).closest('tr');
    SitePlan = objEditRow.find('.hdnSitePlan').val();
    Plot[0].PlotId = objEditRow.find('.hdnPlotId').val();
    $('.ddlPlotType_upd').val(objEditRow.find('.hdnPlotTypeId').val()).change();
    $('.ddlPlotSubType_upd').val(objEditRow.find('.hdnPlotSubTypeId').val());
    $('.txtPlotNo_upd').val(objEditRow.find('.tdPlotNo').text());
    $('.ddlPlotSize_upd').val(objEditRow.find('.hdnPlotSizeId').val());
    $('.ddlUnit_upd').val(objEditRow.find('.hdnUnitId').val());
    $('.ddlManagementCommittee_upd').val(objEditRow.find('.hdnManagementCommitteeId').val());
    $('.ddlHasExtraSize_upd').val(objEditRow.find('.hdnHasExtraSize').val() == 'true' ? 1 : 0).change();
    $('.txtExtraSize_upd').val(objEditRow.find('.hdnExtraSize').val());


}




