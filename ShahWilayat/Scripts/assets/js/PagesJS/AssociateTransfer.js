AllClickFunction();
GetAllTransfers();
GetAllMembers();
GetAllPlots();
var objEditRow;

var Transfer =
[{
    AssociateTransferId: 0,
    PlotId: 0,
    MemberId: 0,
    TransferOrderNo: null,
    TransferDate: null,
    MCMDate: null,
    NewspaperAdvDate: null,
    NewspaperName: null,
    NewspaperScan: null,
    IndemnityBondScan: null,
    TransferOrderScan: null,
    IsTransfered: true

}]

function GetAllTransfer() {

    var request = $.ajax({
        method: "POST",
        url: "/AssociateTransfer/GetAllTransfer",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        onGetAllTransfer(res);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function onGetAllTransfer(data) {
    try {
        var res = data;
        FillDropDownByReference('.ddlTransfer', res);
        FillDropDownByReference('.ddlTransfer_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }

}

function GetAllMembers() {

    var request = $.ajax({
        method: "POST",
        url: "/AssociateTransfer/GetAllMembers",
        data: {}
    });
    request.done(function (data) {
        var res = data;
        onGetAllMembers(res);
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

function AllClickFunction() {
    $('.btnSaveChanges').click(function () {
        var duplicateTransfer = false;
        if (!validateForm(".frmTransfer")) return;

        Transfer[0].MemberId = $('.ddlMember').val();
        Transfer[0].PlotId = $('.ddlPlot').val();
        Transfer[0].TransferOrderNo = $('.txtTransferOrderNo').val();
        Transfer[0].TransferDate = $('.txtTransferDate').val();
        Transfer[0].MCMDate = $('.txtMCMDate').val();
        Transfer[0].NewspaperAdvDate = formatDate($('.txtNewspaperAdvDate').val());
        Transfer[0].NewspaperName = $('.txtNewspaperName').val();
        Transfer[0].NewspaperScan = FileUpload('.txtNewspaperScan');
        Transfer[0].IndemnityBondScan = FileUpload('.txtIndemnityBondScan');
        Transfer[0].TransferOrderScan = FileUpload('.txtTransferOrderScan');




        CreateNewTransfer();
    });

    $('.btnUpdateChanges').click(function () {
        var duplicateTransfer = false;
        if (!validateForm(".frmTransfer_upd")) return;

        Transfer[0].MemberId = $('.ddlMember_upd').val();
        Transfer[0].PlotId = $('.ddlPlot_upd').val();
        Transfer[0].TransferOrderNo = $('.txtTransferOrderNo_upd').val();
        Transfer[0].TransferDate = $('.txtTransferDate_upd').val();
        Transfer[0].MCMDate = $('.txtMCMDate_upd').val();
        Transfer[0].NewspaperAdvDate = formatDate($('.txtNewspaperAdvDate_upd').val());
        Transfer[0].NewspaperName = formatDate($('.txtNewspaperName_upd').val());

        UpdateTransfer();
    });

    $('.btnDelete').click(function () {
        DeleteTransfer();
    });
}

function CreateNewTransfer() {
    var request = $.ajax({
        method: "POST",
        url: "/AssociateTransfer/CreateNewTransfer",
        data: Transfer[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            $('#CreateTransfer').modal('hide');
            GetAllTransfers();
        }
        else if (res == "false") {
            showError('Please change the Member before transfer, duplication found!');

        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function UpdateTransfer() {
    var request = $.ajax({
        method: "POST",
        url: "/AssociateTransfer/UpdateTransfer",
        data: Transfer[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Updated!');
            $('#EditTransfer').modal('hide');
            GetAllTransfers();
        }
        else if (res == "false") {
            showError('Please before transfer, make sure all the dues must be clear!');

        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function DeleteTransfer() {
    var request = $.ajax({
        method: "POST",
        url: "/AssociateTransfer/DeleteTransfer",
        data: Transfers[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Deleted!');
            $('#DeleteTransfer').modal('hide');
            GetAllTransfers();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function GetAllTransfers() {

    var request = $.ajax({
        method: "POST",
        url: "/AssociateTransfer/GetAllTransfers",
        data: {}
    });
    request.done(function (data) {

        onGetAllTransfers(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllTransfers(data) {

    try {
        var res = data;
        var divTbodyGoalFund = $(".TransferListing").html("");
        $("#TransferListing").tmpl(res).appendTo(divTbodyGoalFund);
        var i = 1;
        $('.trTransfer').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
    }
    catch (Err) {
        console.log(Err);
    }
}

function GetAllPlots() {

    var request = $.ajax({
        method: "POST",
        url: "/AssociateTransfer/GetAllPlots",
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
        FillDropDownByReference('.ddlPlot', res);
        FillDropDownByReference('.ddlPlot_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }

}

function EditTransfer(selector) {
    objEditRow = $(selector).closest('tr');
    Transfer[0].AssociateTransferId = objEditRow.find('.hdnAssociateTransferId').val();
    $('.ddlPlot_upd').val(objEditRow.find('.hdnPlotId').val());
    $('.ddlMember_upd').val(objEditRow.find('.hdnMemberId').val());
    $('.txtTransferDate_upd').val(objEditRow.find('.tdTransferDate').text());
    $('.txtTransferOrderNo_upd').val(objEditRow.find('.tdTransferOrderNo').text());
}