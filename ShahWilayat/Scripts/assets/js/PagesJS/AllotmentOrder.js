GetAllAllotmentOrders();
AllClickFunction();
GetAllMembers();
GetAllPlots();
GetAllIssuerDesignation();
AllChangeFunction();



var AllotementOrderList;
var objEditRow;
var IssuerDesignationTextJSON = [];
var AllotementOrder =
[{
    AllotmentOrderId: 0,
    MemberId: 0,
    PlotId: 0,
    AllotmentOrderNo: null,
    AllotmentOrderDate: null,
    AllotmentApprovalDate: null,
    ProvisionalAllotmentNo: null,
    ProvisionalAllotmentDate: null,
    ProvisionalApprovalDate: null,
    ShareCertificateNo: null,
    ShareCertificateDate: null,
    ShareApprovalDate: null,
    IssuerDesignationText: null
}]

function AllClickFunction() {
    $('.btnSaveChanges').click(function () {
        var duplicationAllotementOrder = false;
        if (!validateForm(".frmAllotementOrder")) return;
        if (AddIssuerDesignationTextToJSON()) {
            showError('This Issuer is already exist.');
            return;
        }
        AllotementOrder[0].MemberId = $('.ddlMember').val();
        AllotementOrder[0].PlotId = $('.ddlPlot').val();
        AllotementOrder[0].AllotmentOrderNo = $('.txtAllotmentOrderNo').val();
        AllotementOrder[0].AllotmentOrderDate = formatDate($('.txtAllotmentOrderDate').val());
        AllotementOrder[0].AllotmentApprovalDate = formatDate($('.txtAllotmentApprovalDate').val());
        AllotementOrder[0].ProvisionalAllotmentNo = $('.txtProvisionalAllotmentNo').val();
        AllotementOrder[0].ProvisionalAllotmentDate = formatDate($('.txtProvisionalAllotmentDate').val());
        AllotementOrder[0].ProvisionalApprovalDate = formatDate($('.txtProvisionalApprovalDate').val());
        AllotementOrder[0].ShareCertificateNo = $('.txtShareCertificateNo').val();
        AllotementOrder[0].ShareCertificateDate = formatDate($('.txtShareCertificateDate').val());
        AllotementOrder[0].ShareApprovalDate = formatDate($('.txtShareApprovalDate').val());
        AllotementOrder[0].IssuerDesignationText = JSON.stringify(IssuerDesignationTextJSON);

        $('.trAllotmentOrder').each(function () {
            if (($(this).children('.tdAllotmentOrderNo').text() == AllotementOrder[0].AllotmentOrderNo) &&
                ($(this).children('.hdnAllotmentOrderId').val() != AllotementOrder[0].AllotementOrderId)) {
                duplicationAllotementOrder = true;
            }
        });
        if (duplicationAllotementOrder) {
            showError("This Allotement Order No is already exist.");
            return;
        }


        CreateNewAllotementOrder()
    });

    $('.btnUpdateChanges').click(function () {
        duplicationAllotementOrder = false;
        if (!validateForm(".frmAllotmentOrders_upd")) return;
        if (AddIssuerDesignationTextToJSON_upd()) {
            showError('This Issuer is already exist.');
            return;
        }
        AllotementOrder[0].MemberId = $('.ddlMember_upd').val();
        AllotementOrder[0].AllotmentOrderNo = $('.txtAllotmentOrderNo_upd').val();
        AllotementOrder[0].AllotmentOrderDate = formatDate($('.txtAllotmentOrderDate_upd').val());
        AllotementOrder[0].AllotmentApprovalDate = formatDate($('.txtAllotmentApprovalDate_upd').val());
        AllotementOrder[0].ProvisionalAllotmentNo = $('.txtProvisionalAllotmentNo_upd').val();
        AllotementOrder[0].ProvisionalAllotmentDate = formatDate($('.txtProvisionalAllotmentDate_upd').val());
        AllotementOrder[0].ProvisionalApprovalDate = formatDate($('.txtProvisionalApprovalDate_upd').val());
        AllotementOrder[0].ShareCertificateNo = $('.txtShareCertificateNo_upd').val();
        AllotementOrder[0].ShareCertificateDate = formatDate($('.txtShareCertificateDate_upd').val());
        AllotementOrder[0].ShareApprovalDate = formatDate($('.txtShareApprovalDate_upd').val());
        AllotementOrder[0].IssuerDesignationText = JSON.stringify(IssuerDesignationTextJSON);

        $('.trAllotmentOrder').each(function () {
            if (($(this).children('.tdAllotmentOrderNo').text() == AllotementOrder[0].AllotmentOrderNo) && ($(this).children('.hdnAllotmentOrderId').val() != AllotementOrder[0].AllotmentOrderId)) {
                duplicationAllotementOrder = true;
            }
        });
        if (duplicationAllotementOrder) {
            showError("This Allotement Order No is already exist.");
            IssuerDesignationTextJSON = [];
            return;
        }

        UpdateAllotmentOrder();
    });



    $('.btnDelete').click(function () {
        DeleteAllotement();
    });
}

function AllChangeFunction() {



}
function AddIssuerDesignationTextToJSON() {
    var duplicateIssuerDesignation = false;
    $(".validate").each(function () {

        var IssuerDesignationId = $(this).find(".ddlIssuerDesignation").val();
        var IssuerDesignationValue = $(this).find(".ddlIssuerDesignation option:selected").text();
        if (IssuerDesignationTextJSON.filter(x=> x.IssuerDesignationId == IssuerDesignationId).length > 0) {

            IssuerDesignationTextJSON = [];
            duplicateIssuerDesignation = true;
        }
        else {
            IssuerDesignationTextJSON.push({
                IssuerDesignationId: IssuerDesignationId,
                IssuerDesignationValue: IssuerDesignationValue
            });
        }
    });
    return duplicateIssuerDesignation;
}

function AddIssuerDesignationTextToJSON_upd() {
    var duplicateIssuerDesignation = false;
    $(".AppendedRow").each(function () {

        var IssuerDesignationId = $(this).find(".ddlIssuerDesignation_upd").val();
        var IssuerDesignationValue = $(this).find(".ddlIssuerDesignation_upd option:selected").text();

        if (IssuerDesignationTextJSON.filter(x=> x.IssuerDesignationId == IssuerDesignationId).length > 0) {

            IssuerDesignationTextJSON = [];
            duplicateIssuerDesignation = true;
        }
        else {
            IssuerDesignationTextJSON.push({
                IssuerDesignationId: IssuerDesignationId,
                IssuerDesignationValue: IssuerDesignationValue
            });
        }
    });
    return duplicateIssuerDesignation;
}

function AddIssuerDesignation() {
    if (!validateForm(".validate")) return;
    var html = "<div class='col-lg-6 validate'>";
    html += "<div class='col-sm-8'>";
    html += "<div class='form-group'>";
    html += "<label for='ddlIssuerDesignation'>Issuer Designation</label>";
    html += "<select class='form-control ddlIssuerDesignation'>";
    html += "<option value='0'>--Select--</option>";
    html += "<option value='1'>President</option>";
    html += "<option value='2'>Chairman</option>";
    html += "<option value='3'>General Secretary</option>";
    html += "<option value='4'>Treasurer</option>";
    html += "</select>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-2'>";
    html += "<div class='form-group'>";
    html += "<label></label>";
    html += "<button class='btn btn-info form-control btnAddIssuerDesignation' onclick='AddIssuerDesignation()'><i class='fa fa-plus'></i></button>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-2'>";
    html += "<div class='form-group'>";
    html += "<label></label>";
    html += "<button class='btn btn-danger form-control btnRemoveIssuerDesignation' onclick='RemoveIssuerDesignation(this)'><i class='fa fa-minus'></i></button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";

    $(".validate:last").after($(html));


}


function AddIssuerDesignation_upd() {
    if (!validateForm(".validate_upd")) return;
    var html = "<div class='col-lg-6 AppendedRow validate_upd'>";
    html += "<div class='col-sm-8'>";
    html += "<div class='form-group'>";
    html += "<label for='ddlIssuerDesignation_upd'>Issuer Designation</label>";
    html += "<select class='form-control ddlIssuerDesignation_upd'>";
    html += "<option value='0'>--Select--</option>";
    html += "<option value='1'>President</option>";
    html += "<option value='2'>Chairman</option>";
    html += "<option value='3'>General Secretary</option>";
    html += "<option value='4'>Treasurer</option>";
    html += "</select>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-2'>";
    html += "<div class='form-group'>";
    html += "<label></label>";
    html += "<button class='btn btn-info form-control btnAddIssuerDesignation_upd' onclick='AddIssuerDesignation_upd()'><i class='fa fa-plus'></i></button>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-2'>";
    html += "<div class='form-group'>";
    html += "<label></label>";
    html += "<button class='btn btn-danger form-control btnRemoveIssuerDesignation_upd' onclick='RemoveIssuerDesignation_upd(this)'><i class='fa fa-minus'></i></button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";

    $(".validate_upd:last").after($(html));


}
function RemoveIssuerDesignation(selector) {
    $(selector).closest(".validate").remove();
}
function RemoveIssuerDesignation_upd(selector) {
    $(selector).closest(".validate_upd").remove();
}
function GetAllMembers() {

    var request = $.ajax({
        method: "POST",
        url: "/AllotementOrder/GetAllMembers",
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

function GetAllIssuerDesignation() {

    var request = $.ajax({
        method: "POST",
        url: "/AllotementOrder/GetAllIssuerDesignation",
        data: {}
    });
    request.done(function (data) {

        onGetAllIssuerDesignation(data);


    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllIssuerDesignation(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlIssuerDesignation', res);
        FillDropDownByReference('.ddlIssuerDesignation_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }

}


function CreateNewAllotementOrder() {
    var request = $.ajax({
        method: "POST",
        url: "/AllotementOrder/CreateNewAllotementOrder",
        data: AllotementOrder[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            $('#CreateAllotmentOrder').modal('hide');
            GetAllPlots();
            IssuerDesignationTextJSON = [];
            GetAllAllotmentOrders();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function UpdateAllotmentOrder() {
    var request = $.ajax({
        method: "POST",
        url: "/AllotementOrder/UpdateAllotmentOrder",
        data: AllotementOrder[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Updated!');
            $('#EditAllotmentOrder').modal('hide');

            GetAllPlots();
            GetAllAllotmentOrders();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function DeleteAllotement() {
    var request = $.ajax({
        method: "POST",
        url: "/AllotementOrder/DeleteAllotmentOrder",
        data: { AllotmentOrderId: AllotementOrder[0].AllotmentOrderId }
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Deleted!');
            $('#DeleteAllotmentOrder').modal('hide');
            GetAllAllotmentOrders();

        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function GetAllAllotmentOrders() {
    ProgressBarShow();

    var request = $.ajax({
        method: "POST",
        url: "/AllotementOrder/GetAllAllotmentOrders",
        data: {}
    });
    request.done(function (data) {

        onGetAllAllotmentOrders(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllAllotmentOrders(data) {

    try {
        var res = data;
        var divTbodyGoalFund = $(".AllotmentOrderListing").html("");
        $("#AllotmentOrderListing").tmpl(res).appendTo(divTbodyGoalFund);
        var i = 1;
        $('.trAllotmentOrder').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }

}
function EditAllotmentOrder(selector) {

    objEditRow = $(selector).closest('tr');

    AllotementOrder[0].AllotmentOrderId = objEditRow.find('.hdnAllotmentOrderId').val();
    AllotementOrder[0].PlotId = objEditRow.find('.hdnPlotId').val();
    //$('.ddlMember_upd').val(objEditRow.find('.hdnMemberId').val());
    //$('.ddlPlot_upd').val(objEditRow.find('.hdnPlotId').val());
    $('.txtAllotmentOrderNo_upd').val(objEditRow.find('.tdAllotmentOrderNo').text());
    $('.txtAllotmentOrderDate_upd').val(objEditRow.find('.tdAllotmentOrderDate').text());
    $('.txtAllotmentApprovalDate_upd').val(objEditRow.find('.tdAllotmentApprovalDate').text());
    $('.txtShareCertificateNo_upd').val(objEditRow.find('.tdShareCertificateNo').text());
    $('.txtShareCertificateDate_upd').val(objEditRow.find('.tdShareCertificateDate').text());
    $('.txtShareApprovalDate_upd').val(objEditRow.find('.tdShareApprovalDate').text());
    $('.txtProvisionalAllotmentNo_upd').val(objEditRow.find('.tdProvisionalAllotmentNo').text());
    $('.txtProvisionalAllotmentDate_upd').val(objEditRow.find('.tdProvisionalAllotmentDate').text());
    $('.txtProvisionalApprovalDate_upd').val(objEditRow.find('.tdProvisionalApprovalDate').text());
    IssuerDesignationTextJSON = [];
    $(".AppendedRow").remove();
    BindIssuerDesignation(objEditRow.find('.hdnIssuerDesignationText').val());
}

function BindIssuerDesignation(Json) {
    var i = 0;
    $.each(JSON.parse(Json), function (key, val) {
        var rowHtml = '';
        if (i == 0) {
            var html = "<div class='col-lg-6 AppendedRow validate_upd'>";
            html += "<div class='col-sm-10'>";
            html += "<div class='form-group'>";
            html += "<label for='ddlIssuerDesignation_upd'>Issuer Designation</label>";
            html += "<select class='form-control ddlIssuerDesignation_upd'>";
            html += "<option value='0'>--Select--</option>";
            html += "<option value='1'>President</option>";
            html += "<option value='2'>Chairman</option>";
            html += "<option value='3'>General Secretary</option>";
            html += "<option value='4'>Treasurer</option>";
            html += "</select>";
            html += "</div>";
            html += "</div>";
            html += "<div class='col-sm-2'>";
            html += "<div class='form-group'>";
            html += "<label></label>";
            html += "<button class='btn btn-info form-control btnAddIssuerDesignation_upd()' onclick='AddIssuerDesignation_upd()'><i class='fa fa-plus'></i></button>";
            html += "</div>";
            html += "</div>";
            html += "</div>";
        }

        else {
            var html = "<div class='col-lg-6 AppendedRow validate_upd'>";
            html += "<div class='col-sm-8'>";
            html += "<div class='form-group'>";
            html += "<label for='ddlIssuerDesignation_upd'>Issuer Designation</label>";
            html += "<select class='form-control ddlIssuerDesignation_upd'>";
            html += "<option value='0'>--Select--</option>";
            html += "<option value='1'>President</option>";
            html += "<option value='2'>Chairman</option>";
            html += "<option value='3'>General Secretary</option>";
            html += "<option value='4'>Treasurer</option>";
            html += "</select>";
            html += "</div>";
            html += "</div>";
            html += "<div class='col-sm-2'>";
            html += "<div class='form-group'>";
            html += "<label></label>";
            html += "<button class='btn btn-info form-control btnAddIssuerDesignation_upd' onclick='AddIssuerDesignation_upd()'><i class='fa fa-plus'></i></button>";
            html += "</div>";
            html += "</div>";
            html += "<div class='col-sm-2'>";
            html += "<div class='form-group'>";
            html += "<label></label>";
            html += "<button class='btn btn-danger form-control btnRemoveIssuerDesignation_upd' onclick='RemoveIssuerDesignation_upd(this)'><i class='fa fa-minus'></i></button>";
            html += "</div>";
            html += "</div>";
            html += "</div>";
        }

        $(".validate_upd:last").after($(html));
        $(".ddlIssuerDesignation_upd").eq(i).val(val.IssuerDesignationId);
        i++;
    });
}

function GetAllPlots() {

    var request = $.ajax({
        method: "POST",
        url: "/AllotementOrder/GetAllPlots",
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