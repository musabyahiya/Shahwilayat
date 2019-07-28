GetAllAllotment();
AllClickFunction();
GetAllMembers();
GetAllPlots();

AllChangeFunction();



var AllotmentList;
var objEditRow;

var Allotment =
[{
    AllotmentId: 0,
    MemberId: 0,
    PlotId: 0,
    AllotmentOrderNo: null,
    AllotmentOrderDate: null,
    ProvisionalAllotmentNo: null,
    ProvisionalAllotmentDate: null,
    ShareCertificateOrderNo: null,
    ShareCertificateDate: null

}]

function AllClickFunction() {
    $('.btnSaveChanges').click(function () {
        var duplicationAllotment = false;
        if (!validateForm(".frmAllotment")) return;
       
        Allotment[0].MemberId = $('.ddlMember').val();
        Allotment[0].PlotId = $('.ddlPlot').val();
        Allotment[0].AllotmentOrderNo = $('.txtAllotmentOrderNo').val();
        Allotment[0].AllotmentOrderDate = formatDate($('.txtAllotmentOrderDate').val());
        Allotment[0].ProvisionalAllotmentNo = $('.txtProvisionalAllotmentNo').val();
        Allotment[0].ProvisionalAllotmentDate = formatDate($('.txtProvisionalAllotmentDate').val());
        Allotment[0].ShareCertificateNo = $('.txtShareCertificateNo').val();
        Allotment[0].ShareCertificateDate = formatDate($('.txtShareCertificateDate').val());



        $('.trAllotment').each(function () {
            if (($(this).children('.tdAllotmentOrderNo').text() == Allotment[0].AllotmentOrderNo) &&
                ($(this).children('.hdnAllotmentId').val() != Allotment[0].AllotmentId)) {
                duplicationAllotment = true;
            }
        });
        if (duplicationAllotment) {
            showError("This Allotement Order No is already exist.");
            return;
        }


        CreateNewAllotment()
    });

    $('.btnUpdateChanges').click(function () {
        duplicationAllotment = false;
        if (!validateForm(".frmAllotments_upd")) return;

        Allotment[0].MemberId = $('.ddlMember_upd').val();
        Allotment[0].PlotId = $('.ddlPlot_upd').val();
        Allotment[0].AllotmentOrderNo = $('.txtAllotmentOrderNo_upd').val();
        Allotment[0].AllotmentOrderDate = formatDate($('.txtAllotmentOrderDate_upd').val());
        Allotment[0].ProvisionalAllotmentNo = $('.txtProvisionalAllotmentNo_upd').val();
        Allotment[0].ProvisionalAllotmentDate = formatDate($('.txtProvisionalAllotmentDate_upd').val());
        Allotment[0].ShareCertificateNo = $('.txtShareCertificateNo_upd').val();
        Allotment[0].ShareCertificateDate = formatDate($('.txtShareCertificateDate_upd').val());


        $('.trAllotment').each(function () {
            if (($(this).children('.tdAllotmentOrderNo').text() == Allotment[0].AllotmentOrderNo) && ($(this).children('.hdnAllotmentId').val() != Allotment[0].AllotmentId)) {
                duplicationAllotment = true;
            }
        });
        if (duplicationAllotment) {
            showError("This Allotement Order No is already exist.");

            return;
        }

        UpdateAllotment();
    });



    $('.btnDelete').click(function () {
        DeleteAllotement();
    });
}

function AllChangeFunction() {



}


function GetAllMembers() {

    var request = $.ajax({
        method: "POST",
        url: "/Allotment/GetAllMembers",
        data: {}
    });
    request.done(function (data) {

        onGetAllMembers(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllMembers(data) {
    try {
        var res = data;
        FillDropDownByReference('.ddlMember', res);
        FillDropDownByReference('.ddlMember_upd', res);

    }
    catch (Err) {
        console.log(Err);
    }

}




function CreateNewAllotment() {
    var request = $.ajax({
        method: "POST",
        url: "/Allotment/CreateNewAllotment",
        data: Allotment[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            $('#CreateAllotment').modal('hide');
            GetAllPlots();

            GetAllAllotment();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function UpdateAllotment() {
    var request = $.ajax({
        method: "POST",
        url: "/Allotment/UpdateAllotment",
        data: Allotment[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Updated!');
            $('#EditAllotment').modal('hide');

            GetAllPlots();
            GetAllAllotment();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function DeleteAllotement() {
    var request = $.ajax({
        method: "POST",
        url: "/Allotment/DeleteAllotment",
        data: { AllotmentId: Allotment[0].AllotmentId }
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Deleted!');
            $('#DeleteAllotment').modal('hide');
            GetAllAllotment();

        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function GetAllAllotment() {
    ProgressBarShow();

    var request = $.ajax({
        method: "POST",
        url: "/Allotment/GetAllAllotment",
        data: {}
    });
    request.done(function (data) {

        onGetAllAllotment(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllAllotment(data) {

    try {
        var res = data;
        var divTbodyGoalFund = $(".AllotmentListing").html("");
        $("#AllotmentListing").tmpl(res).appendTo(divTbodyGoalFund);
        var i = 1;
        $('.trAllotment').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }

}
function EditAllotment(selector) {

    objEditRow = $(selector).closest('tr');

    Allotment[0].AllotmentId = objEditRow.find('.hdnAllotmentId').val();
    Allotment[0].PlotId = objEditRow.find('.hdnPlotId').val();
    //$('.ddlMember_upd').val(objEditRow.find('.hdnMemberId').val());
    //$('.ddlPlot_upd').val(objEditRow.find('.hdnPlotId').val());
    $('.txtAllotmentOrderNo_upd').val(objEditRow.find('.hdnAllotmentOrderNo').val());
    $('.txtAllotmentOrderDate_upd').val(objEditRow.find('.hdnAllotmentOrderDate').val());
    $('.txtShareCertificateNo_upd').val(objEditRow.find('.hdnShareCertificateNo').val());
    $('.txtShareCertificateDate_upd').val(objEditRow.find('.hdnShareCertificateDate').val());
    $('.txtProvisionalAllotmentNo_upd').val(objEditRow.find('.hdnProvisionalAllotmentNo').val());
    $('.txtProvisionalAllotmentDate_upd').val(objEditRow.find('.hdnProvisionalAllotmentDate').val());



}


function GetAllPlots() {

    var request = $.ajax({
        method: "POST",
        url: "/Allotment/GetAllPlots",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        onGetAllPlots(res);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function onGetAllPlots(data) {
    try {
        var res = data;
        FillDropDownByReference('.ddlPlot', res);
        FillDropDownByReference('.ddlPlot_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }
}


