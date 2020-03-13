GetAllAllotment();
AllClickFunction();
GetAllMembers();
GetAllPlots();
GetAllManagementCommittee();
SearchTable();


var AllotmentList;
var objEditRow;

var Allotment =
[{
    AllotmentId: 0,
    MemberId: 0,
    PlotId: 0,
    ManagementCommitteeId: 0,
    AllotmentOrderNo: null,
    AllotmentOrderDate: null,
    ProvisionalAllotmentNo: null,
    ProvisionalAllotmentDate: null,
    ShareCertificateNo: null,
    ShareCertificateDate: null,
    ScanAllotmentOrder: null,
    ScanProvisionalOrder: null,
    ScanShareCertificate: null

}]
var ScanAllotmentOrder;
var ScanProvisionalOrder;
var ScanShareCertificate;


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
        Allotment[0].ScanAllotmentOrder = FileUpload('.txtScanAllotmentOrder');
        Allotment[0].ScanProvisionalOrder = FileUpload('.txtScanProvisionalOrder');
        Allotment[0].ScanShareCertificate = FileUpload('.txtScanShareCertificate');
        Allotment[0].ManagementCommitteeId = $('.ddlManagementCommittee').val();

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
        Allotment[0].ManagementCommitteeId = $('.ddlManagementCommittee_upd').val();

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
    $('.btnUpdateAttachment').click(function () {

        Allotment[0].ScanAllotmentOrder = FileUpload('.txtScanAllotmentOrder_upd') == '' ? ScanAllotmentOrder : FileUpload('.txtScanAllotmentOrder_upd');
        Allotment[0].ScanProvisionalOrder = FileUpload('.txtScanProvisionalOrder_upd') == '' ? ScanProvisionalOrder : FileUpload('.txtScanProvisionalOrder_upd');
        Allotment[0].ScanShareCertificate = FileUpload('.txtScanShareCertificate_upd') == '' ? ScanShareCertificate : FileUpload('.txtScanShareCertificate_upd');

        UpdateAttachment();
    });


    $('.btnDelete').click(function () {
        DeleteAllotement();
    });
}

function SearchTable() {
    $(".txtSearch").keyup(function () {
        ProgressBarShow();
        _this = this;

        var search = $(_this).val();

        if (search == '') {
            onGetAllAllotment(AllotmentList);
        }
        else {
            var obj = AllotmentList.filter(x=> x.FirstName.toLowerCase().includes(search.toLowerCase()) ||
				x.AllotmentOrderNo.includes(search) ||
                x.LastName.includes(search.toLowerCase())
				)
            onGetAllAllotment(obj);

        }
        ProgressBarHide();
    });
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
        AllotmentList = data;
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
    ScanAllotmentOrder = objEditRow.find('.hdnScanAllotmentOrder').val();
    ScanProvisionalOrder = objEditRow.find('.hdnScanProvisionalOrder').val();
    ScanShareCertificate = objEditRow.find('.hdnScanShareCertificate').val();


    Allotment[0].AllotmentId = objEditRow.find('.hdnAllotmentId').val();
    Allotment[0].PlotId = objEditRow.find('.hdnPlotId').val();

    $('.txtAllotmentOrderNo_upd').val(objEditRow.find('.hdnAllotmentOrderNo').val());
    $('.txtAllotmentOrderDate_upd').val(objEditRow.find('.hdnAllotmentOrderDate').val());
    $('.txtShareCertificateNo_upd').val(objEditRow.find('.hdnShareCertificateNo').val());
    $('.txtShareCertificateDate_upd').val(objEditRow.find('.hdnShareCertificateDate').val());
    $('.txtProvisionalAllotmentNo_upd').val(objEditRow.find('.hdnProvisionalAllotmentNo').val());
    $('.txtProvisionalAllotmentDate_upd').val(objEditRow.find('.hdnProvisionalAllotmentDate').val());
    $('.ddlManagementCommittee_upd').val(objEditRow.find('.hdnManagementCommitteeId').val());


}

function UpdateAttachment() {
    var request = $.ajax({
        method: "POST",
        url: "/Allotment/UpdateAttachment",
        data: Allotment[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Updated!');
            $('#EditAttachment').modal('hide');
            GetAllAllotment();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
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



function GetAllManagementCommittee() {

    var request = $.ajax({
        method: "POST",
        url: "/Allotment/GetAllManagementCommittee",
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