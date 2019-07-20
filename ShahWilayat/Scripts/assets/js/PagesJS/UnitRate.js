GetAllUnitRate();
GetAllUnits();
AllClickFunction();

var objEditRow;

var UnitRate =
[{
    UnitRateId: 0,
    UnitId: 0,
    UnitRate: 0
}]


function AllClickFunction() {
    $('.btnSaveChanges').click(function () {
        var duplicationUnit = false;
        if (!validateForm(".frmUnitRate")) return;

        UnitRate[0].UnitId = $('.ddlUnit').val();
        UnitRate[0].UnitRate = $('.txtUnitRate').val();

        $('.hdnUnitId').each(function () {
            var unitid = $(this).val();
            if (UnitRate[0].UnitId == unitid)
                duplicationUnit = true;
        });
        if (duplicationUnit) {
            showError("Unit is already exists");
            return;
        }
        CreateNewUnitRate();
    });

    $('.btnUpdateChanges').click(function () {

        if (!validateForm(".frmUnitRate_upd")) return;

        UnitRate[0].UnitId = $('.ddlUnit_upd').val();
        UnitRate[0].UnitRate = $('.txtUnitRate_upd').val();
        UpdateUnitRate();
    });

    $('.btnDelete').click(function () {
        DeleteUnitRate();
    });
}

function CreateNewUnitRate() {
    var request = $.ajax({
        method: "POST",
        url: "/UnitRate/CreateNewUnitRate",
        data: UnitRate[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            $('#CreateUnitRate').modal('hide');
            GetAllUnitRate();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}
function CheckDuplicateUnitRate() {
    var result = '';
    var request = $.ajax({
        method: "POST",
        url: "/UnitRate/CheckDuplicateUnitRate",
        data: UnitRate[0],
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

function UpdateUnitRate() {
    var request = $.ajax({
        method: "POST",
        url: "/UnitRate/UpdateUnitRate",
        data: UnitRate[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            $('#EditUnitRate').modal('hide');
            GetAllUnitRate();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function DeleteUnitRate() {
    var request = $.ajax({
        method: "POST",
        url: "/UnitRate/DeleteUnitRate",
        data: UnitRate[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            $('#DeleteUnitRate').modal('hide');
            GetAllUnitRate();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function GetAllUnits() {

    var request = $.ajax({
        method: "POST",
        url: "/UnitRate/GetAllUnits",
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

function GetAllTenure() {

    var request = $.ajax({
        method: "POST",
        url: "/UnitRate/GetAllTenure",
        data: {}
    });
    request.done(function (data) {

        onGetAllTenure(data);
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

function GetAllUnitRate() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/UnitRate/GetAllUnitRate",
        data: {}
    });
    request.done(function (data) {

        onGetAllUnitRate(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllUnitRate(data) {

    try {
        var res = data;
        var divTbodyGoalFund = $(".UnitRateListing").html("");
        $("#UnitRateListing").tmpl(res).appendTo(divTbodyGoalFund);
        var i = 1;
        $('.trUnitRate').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }
}

function EditUnitRate(selector) {
    objEditRow = $(selector).closest('tr');
    UnitRate[0].UnitRateId = objEditRow.find('.hdnUnitRateId').val();
    $('.ddlUnit_upd').val(objEditRow.find('.hdnUnitId').val());
    $('.txtUnitRate_upd').val(objEditRow.find('.hdnUnitRate').val());
}