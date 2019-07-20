GetAllTenure();

GetAllPaymentCategory();
GetAllPaymentSubCategory();
AllChangeFunction();
AllClickFunction();
var PaymentSubCategoryList;
var Tenure =
[{
    TenureId: 0,
    PaymentSubCategoryId: 0,
    Tenure1: null,
    StartYear: 0,
    EndYear: 0
}];


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

 
}
function AllClickFunction() {
    $('.btnSaveChanges').click(function () {
        var duplicationTenure = false;
        if (!validateForm(".frmTenure")) return;

        Tenure[0].PaymentSubCategoryId = $('.ddlPaymentSubCategory').val();
        Tenure[0].Tenure1 = $('.txtTenure').val();
        Tenure[0].StartYear = $('.txtStartYear').val();
        Tenure[0].EndYear = $('.txtEndYear').val();



        $('.trTenure').each(function () {
            if ($(this).children('.hdnPaymentSubCategoryId').val() == Tenure[0].PaymentSubCategoryId &&
                $(this).children('.tdTenure').text() == Tenure[0].Tenure1) {
                duplicationTenure = true;
            }
        });
        if (duplicationTenure) {
            showError("This tenure is already already exist!");
            return;
        }

        CreateNewTenure()
    });

    $('.btnUpdateChanges').click(function () {
        var duplicationTenure = false;
        if (!validateForm(".frmTenure_upd")) return;


        Tenure[0].PaymentSubCategoryId = $('.ddlPaymentSubCategory_upd').val();
        Tenure[0].Tenure1 = $('.txtTenure_upd').val();
        Tenure[0].StartYear = $('.txtStartYear_upd').val();
        Tenure[0].EndYear = $('.txtEndYear_upd').val();



        $('.trTenure').each(function () {
            if ($(this).children('.hdnPaymentSubCategoryId').val() == Tenure[0].PaymentSubCategoryId &&
                $(this).children('.tdTenure').text() == Tenure[0].Tenure1 && $(this).children('.hdnTenureId').val() != Tenure[0].TenureId) {
                duplicationTenure = true;
            }
        });
        if (duplicationTenure) {
            showError("This tenure is already already exist!");
            return;
        }
        UpdateTenure();
    });

    $('.btnUpdateChangesAttachments').click(function () {

        if (!validateForm(".frmTenureAttachments_upd")) return;
        Tenure[0].CnicFrontFile = FileUpload('.txtCnicFrontFile_upd');
        Tenure[0].CnicBackFile = FileUpload('.txtCnicBackFile_upd');
        Tenure[0].ProfileFile = FileUpload('.txtProfileFile_upd');
        if (Tenure[0].CnicFrontFile == "" || Tenure[0].CnicBackFile == "" || Tenure[0].ProfileFile == "") {
            return;
        }
        UpdateAttachment();
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

        PaymentSubCategoryList = data;
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllPaymentSubCategory(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlPaymentSubCategory', res);

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
function GetAllTenure() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/Tenure/GetAllTenure",
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
        var divTbodyGoalFund = $(".TenureListing").html("");
        $("#TenureListing").tmpl(res).appendTo(divTbodyGoalFund);
        var i = 1;
        $('.trTenure').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
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
    $('.ddlPaymentSubCategory_upd').val(objEditRow.find('.hdnPaymentSubCategoryId').val());
    $('.txtTenure_upd').val(objEditRow.find('.tdTenure').text());
    $('.txtStartYear_upd').val(objEditRow.find('.tdStartYear').text());
    $('.txtEndYear_upd').val(objEditRow.find('.tdEndYear').text());
    
}
