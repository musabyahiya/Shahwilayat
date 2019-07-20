GetAllPaymentSubCategory();
AllClickFunction();
GetAllPaymentCategory();
var PaymentSubCategory =
[{
    PaymentSubCategoryId: 0,
    PaymentCategoryId: 0,
    PaymentSubCategory1: null
}]

function GetAllPaymentSubCategory() {
    ProgressBarShow();

    var request = $.ajax({
        method: "POST",
        url: "/PaymentSubCategory/GetAllPaymentSubCategory",
        data: {}
    });
    request.done(function (data) {

        onGetAllPaymentSubCategory(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllPaymentSubCategory(data) {

    try {
        var res = data;
        var divTbodyGoalFund = $(".PaymentSubCategoryListing").html("");
        $("#PaymentSubCategoryListing").tmpl(res).appendTo(divTbodyGoalFund);
        var i = 1;
        $('.trPaymentSubCategory').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }

}
function EditPaymentSubCategory(selector) {

    objEditRow = $(selector).closest('tr');

    PaymentSubCategory[0].PaymentSubCategoryId = objEditRow.find('.hdnPaymentSubCategoryId').val();
    $('.ddlPaymentCategory_upd').val(objEditRow.find('.hdnPaymentCategoryId').val());
    $('.txtPaymentSubCategory_upd').val(objEditRow.find('.tdPaymentSubCategory').text());

}

function AllClickFunction() {
    $('.btnSaveChanges').click(function () {
        if (!validateForm(".frmPaymentSubCategory")) return;

        PaymentSubCategory[0].PaymentCategoryId = $('.ddlPaymentCategory').val();
        PaymentSubCategory[0].PaymentSubCategory1 = $('.txtPaymentSubCategory').val();

        CreateNewPaymentSubCategory()
    });

    $('.btnUpdateChanges').click(function () {

        if (!validateForm(".frmPaymentSubCategory_upd")) return;
        PaymentSubCategory[0].PaymentCategoryId = $('.ddlPaymentCategory_upd').val();
        PaymentSubCategory[0].PaymentSubCategory1 = $('.txtPaymentSubCategory_upd').val();

        UpdatePaymentSubCategory();
    });



    $('.btnDelete').click(function () {
        DeletePaymentSubCategory();
    });
}

function GetAllPaymentCategory() {

    var request = $.ajax({
        method: "POST",
        url: "/PaymentSubCategory/GetAllPaymentCategory",
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

function CreateNewPaymentSubCategory() {
    var request = $.ajax({
        method: "POST",
        url: "/PaymentSubCategory/CreateNewPaymentSubCategory",
        data: PaymentSubCategory[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            $('#CreatePaymentSubCategory').modal('hide');
            GetAllPaymentSubCategory();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function UpdatePaymentSubCategory() {
    var request = $.ajax({
        method: "POST",
        url: "/PaymentSubCategory/UpdatePaymentSubCategory",
        data: PaymentSubCategory[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Updated!');
            $('#EditPaymentSubCategory').modal('hide');
            GetAllPaymentSubCategory();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function DeletePaymentSubCategory() {
    var request = $.ajax({
        method: "POST",
        url: "/PaymentSubCategory/DeletePaymentSubCategory",
        data: PaymentSubCategory[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Deleted!');
            $('#DeletePaymentSubCategory').modal('hide');
            GetAllPaymentSubCategory();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}
