AllClickFunction();
GetAllTransfers();
GetAllMembers();
GetAllPlots();
GetAllManagementCommittee();
SearchTable();
GetRptPlotTransfer();
var objEditRow;
var PlotTransfer;
var TransferList;
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
    IsTransfered: true,
    ManagementCommitteeId: 0
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

function GetAllManagementCommittee() {

    var request = $.ajax({
        method: "POST",
        url: "/Transfer/GetAllManagementCommittee",
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
        Transfer[0].ManagementCommitteeId = $('.ddlManagementCommittee').val();



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
        Transfer[0].ManagementCommitteeId = $('.ddlManagementCommittee_upd').val();
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

        TransferList = data;
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
function GetRptPlotTransfer() {

    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/AssociateTransfer/GetRptPlotTransfer",
    });
    request.done(function (data) {

        onGetRptPlotTransfer(data);
        ProgressBarHide();
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}


function onGetRptPlotTransfer(data) {
    var res = JSON.parse(data);
    PlotTransfer = res;

}

function EditTransfer(selector) {
    objEditRow = $(selector).closest('tr');
    Transfer[0].AssociateTransferId = objEditRow.find('.hdnAssociateTransferId').val();
    $('.ddlPlot_upd').val(objEditRow.find('.hdnPlotId').val());
    $('.ddlMember_upd').val(objEditRow.find('.hdnMemberId').val());
    $('.txtTransferDate_upd').val(objEditRow.find('.tdTransferDate').text());
    $('.txtTransferOrderNo_upd').val(objEditRow.find('.tdTransferOrderNo').text());
    $('.txtMCMDate_upd').val(objEditRow.find('.hdnMCMDate').val());
    $('.txtNewspaperAdvDate_upd').val(objEditRow.find('.hdnNewspaperAdvDate').val());
    $('.txtNewspaperName_upd').val(objEditRow.find('.hdnNewspaperName').val());
    $('.ddlManagementCommittee_upd').val(objEditRow.find('.hdnManagementCommitteeId').val());
}
function PrintTransferOrder(selector) {
    objEditRow = $(selector).closest('tr');
    var MemberId = objEditRow.find('.hdnMemberId').val();
    var PlotId = objEditRow.find('.hdnPlotId').val();
    var obj = PlotTransfer.filter(x=> x.PlotId == PlotId);

    var Tranfer = obj.filter(x=> x.Type == "Transfered" && x.MemberId == MemberId);
    var Allottee = obj.filter(x=> x.Type == "Allotted");

    BindTextToSelector('.printTransferFullName', Tranfer[0].FullName);
    BindTextToSelector('.printTransferFatherName', Tranfer[0].FatherName);
    BindTextToSelector('.printTransferCNIC', Tranfer[0].CNIC);
    BindTextToSelector('.printTransferAddress', Tranfer[0].PermanentAddress);
    BindTextToSelector('.printTransferPlotNo', Tranfer[0].PlotNo);
    BindTextToSelector('.printTransferSize', Tranfer[0].Size);
    BindTextToSelector('.printTransferMCMDate', formatDatePakFormat(Tranfer[0].MCMDate));
    BindTextToSelector('.printAllotteeMembershipNo', Allottee[0].MembershipNo);
    BindTextToSelector('.printAllotteeFullName', Allottee[0].FullName);
    BindTextToSelector('.printAllotteeCNIC', Allottee[0].CNIC);
    BindTextToSelector('.printAllotteeAddress', Allottee[0].PermanentAddress);
    $(".printTransferProfile").attr("src", '../Uploads/' + JSON.parse(Tranfer[0].ProfileFile)[0]);
    $(function () {
        //$('#Print').load('http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js');

    });

    var contents = $("#PrintTransferOrder").html();
    var frame1 = $('<iframe />');
    frame1[0].name = "frame1";
    frame1.css({ "position": "absolute", "top": "-1000000px" });
    $("body").append(frame1);
    var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
    frameDoc.document.open();
    //Create a new HTML document.
    frameDoc.document.write('<html><head><title>Membership Single</title>');
    frameDoc.document.write('</head><body>');
    //Append the external CSS file.
    frameDoc.document.write('<link href="/Content/assets/css/PrintMaterial/TransferOrder/TransferOrder.css" rel="stylesheet" type="text/css" />');
    //Append the DIV contents.
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        frame1.remove();
    }, 700);
}

function PrintTransferApplication(selector) {
    objEditRow = $(selector).closest('tr');
    var MemberId = objEditRow.find('.hdnMemberId').val();
    var PlotId = objEditRow.find('.hdnPlotId').val();
    var obj = PlotTransfer.filter(x=> x.PlotId == PlotId);

    var Tranfer = obj.filter(x=> x.Type == "Transfered" && x.MemberId == MemberId);
    var Allottee = obj.filter(x=> x.Type == "Allotted");

    BindTextToSelector('.printTransferFullName', Tranfer[0].FullName);
    BindTextToSelector('.printTransferFatherName', Tranfer[0].FatherName);
    BindTextToSelector('.printTransferCNIC', Tranfer[0].CNIC);
    BindTextToSelector('.printTransferAddress', Tranfer[0].PermanentAddress);
    BindTextToSelector('.printTransferPlotNo', Tranfer[0].PlotNo);
    BindTextToSelector('.printTransferLandline', Tranfer[0].Landline);
    BindTextToSelector('.printTransferCellNo', Tranfer[0].CelNo);
    BindTextToSelector('.printTransferSize', Tranfer[0].Size);
    BindTextToSelector('.printTransferMCMDate', formatDatePakFormat(Tranfer[0].MCMDate));
    BindTextToSelector('.printAllotteeMembershipNo', Allottee[0].MembershipNo);
    BindTextToSelector('.printAllotteeFullName', Allottee[0].FullName);
    BindTextToSelector('.printAllotteeFatherName', Allottee[0].FatherName);
    BindTextToSelector('.printAllotteeCNIC', Allottee[0].CNIC);
    BindTextToSelector('.printAllotteeAddress', Allottee[0].PermanentAddress);
    BindTextToSelector('.printAllotteeProvisionalAllotmentDate', formatDatePakFormat(Allottee[0].ProvisionalAllotmentDate));
    $(function () {
        //$('#Print').load('http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js');

    });

    var contents = $("#PrintTransferApplication").html();
    var frame1 = $('<iframe />');
    frame1[0].name = "frame1";
    frame1.css({ "position": "absolute", "top": "-1000000px" });
    $("body").append(frame1);
    var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
    frameDoc.document.open();
    //Create a new HTML document.
    frameDoc.document.write('<html><head><title>Membership Single</title>');
    frameDoc.document.write('</head><body>');
    //Append the external CSS file.
    frameDoc.document.write('<link href="/Content/assets/css/PrintMaterial/TransferApplication/Transfer-Application.css" rel="stylesheet" type="text/css" />');
    //Append the DIV contents.
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        frame1.remove();
    }, 700);
}

function SearchTable() {
    $(".txtSearch").keyup(function () {
        ProgressBarShow();
        _this = this;

        var search = $(_this).val();

        if (search == '') {
            onGetAllTransfers(TransferList);
        }
        else {
            var obj = TransferList.filter(x=> x.Member.toLowerCase().includes(search.toLowerCase()) ||
				x.TransferOrderNo.includes(search) ||
                x.Plot.includes(search)

				)
            onGetAllTransfers(obj);
        }
        ProgressBarHide();
    });
}