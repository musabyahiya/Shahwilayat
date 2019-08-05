GetAllTenure();

GetAllPaymentCategory();

AllChangeFunction();
AllClickFunction();
var PaymentCategoryList;
var TenureList;
SearchTable();
var Tenure =
[{
    TenureId: 0,
    PaymentCategoryId: 0,
    Tenure1: null,
    StartDate: null,
    EndDate: null
}];


function AllChangeFunction() {


}
function AllClickFunction() {
    $('.btnSaveChanges').click(function () {
        var duplicationTenure = false;
        if (!validateForm(".frmTenure")) return;

        Tenure[0].PaymentCategoryId = $('.ddlPaymentCategory').val();
        Tenure[0].Tenure1 = $('.txtTenure').val();
        Tenure[0].StartDate = $('.txtStartDate').val();
        Tenure[0].EndDate = $('.txtEndDate').val();



        //$('.trTenure').each(function () {
        //    if ($(this).children('.hdnPaymentCategoryId').val() == Tenure[0].PaymentCategoryId &&
        //        $(this).children('.tdTenure').text() == Tenure[0].Tenure1) {
        //        duplicationTenure = true;
        //    }
        //});
        //if (duplicationTenure) {
        //    showError("This tenure is already already exist!");
        //    return;
        //}

        CreateNewTenure()
    });

    $('.btnUpdateChanges').click(function () {
        var duplicationTenure = false;
        if (!validateForm(".frmTenure_upd")) return;


        Tenure[0].PaymentCategoryId = $('.ddlPaymentCategory_upd').val();
        Tenure[0].Tenure1 = $('.txtTenure_upd').val();
        Tenure[0].StartDate = $('.txtStartDate_upd').val();
        Tenure[0].EndDate = $('.txtEndDate_upd').val();



        //$('.trTenure').each(function () {
        //    if ($(this).children('.hdnPaymentCategoryId').val() == Tenure[0].PaymentCategoryId &&
        //        $(this).children('.tdTenure').text() == Tenure[0].Tenure1 && $(this).children('.hdnTenureId').val() != Tenure[0].TenureId) {
        //        duplicationTenure = true;
        //    }
        //});
        //if (duplicationTenure) {
        //    showError("This tenure is already already exist!");
        //    return;
        //}
        UpdateTenure();
    });

   

    $('.btnDelete').click(function () {
        DeleteTenure();
    });


}

function CreateNewTenure() {
    var request = $.ajax({
        method: "POST",
        url: "/Tenure/CreateNewTenure",
        data: Tenure[0]
    });
    request.done(function (data) {
        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            $('#CreateTenure').modal('hide');
            GetAllTenure();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function UpdateTenure() {
    var request = $.ajax({
        method: "POST",
        url: "/Tenure/UpdateTenure",
        data: Tenure[0]
    });
    request.done(function (data) {
        var res = data;
        if (res == "true") {
            showSuccess('Successfully Updated!');
            $('#EditTenure').modal('hide');
            GetAllTenure();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function GetAllPaymentCategory() {

    var request = $.ajax({
        method: "POST",
        url: "/Tenure/GetAllPaymentCategory",
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
function GetAllPaymentSubCategory() {

    var request = $.ajax({
        method: "POST",
        url: "/Tenure/GetAllPaymentSubCategory",
        data: {}
    });
    request.done(function (data) {

        PaymentCategoryList = data;
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllPaymentSubCategory(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlPaymentCategory', res);

    }
    catch (Err) {
        console.log(Err);
    }

}

function onGetAllPaymentSubCategory_upd(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlPaymentCategory_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }

}
function GetAllTenure() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/Tenure/GetAllTenure",
        data: {}
    });
    request.done(function (data) {

        TenureList = data;
        onGetAllTenure(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllTenure(data) {

    try {
        var res = data;
        var divTbodyGoalFund = $(".TenureListing").html("");
        $("#TenureListing").tmpl(res).appendTo(divTbodyGoalFund);
        var i = 1;
        $('.trTenure').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
       // paginateTable('.tblTenure', 10);
        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }
}


function DeleteTenure() {
    var request = $.ajax({
        method: "POST",
        url: "/Tenure/DeleteTenure",
        data: Tenure[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            $('#DeleteTenure').modal('hide');
            GetAllTenure();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function EditTenure(selector) {
    objEditRow = $(selector).closest('tr');
    Tenure[0].TenureId = objEditRow.find('.hdnTenureId').val();
    $('.ddlPaymentCategory_upd').val(objEditRow.find('.hdnPaymentCategoryId').val()).change();
    $('.ddlPaymentCategory_upd').val(objEditRow.find('.hdnPaymentCategoryId').val());
    $('.txtTenure_upd').val(objEditRow.find('.tdTenure').text());
    $('.txtStartDate_upd').val(objEditRow.find('.tdStartDate').text());
    $('.txtEndDate_upd').val(objEditRow.find('.tdEndDate').text());

}

function SearchTable() {
    $(".txtSearch").keyup(function () {
        ProgressBarShow();
        _this = this; SearchTable()

        var search = $(_this).val();

        if (search == '') {
            onGetAllTenure(TenureList);
        }
        else {
            var obj = TenureList.filter(x=> x.PaymentCategory.toLowerCase().includes(search.toLowerCase()) ||

				x.Tenure.toLowerCase().includes(search.toLowerCase()) 
				)
            onGetAllTenure(obj);

        }
        ProgressBarHide();
    });
}