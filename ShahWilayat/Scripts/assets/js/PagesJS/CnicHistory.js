AllClickFunction();
GetAllMembers();
GetAllCnicHistory();
var CnicHistory = [
    {
        CnicCnicHistoryId: 0,
        MemberId: 0,
        HistoryDetailsJson: null
    }
]

var HistoryDetailsJson = [];
function GetAllCnicHistory() {

    var request = $.ajax({
        method: "POST",
        url: "/CnicHistory/GetAllCnicHistory",
        data: {}
    });
    request.done(function (data) {

        onGetAllCnicHistory(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllCnicHistory(data) {

    try {

        var res = data;
        var divTbodyGoalFund = $(".CnicHistoryListing").html("");
        $("#CnicHistoryListing").tmpl(res).appendTo(divTbodyGoalFund);
        var i = 1;
        $('.trCnicHistory').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });

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
function AddHistoryDetailsToJSON() {
    $(".validate").each(function () {

        var IssueDate = formatDate($(this).find(".txtIssueDate").val());
        var ExpiryDate = formatDate($(this).find(".txtExpiryDate").val());
        var IssuancePlace = $(this).find(".txtIssuancePlace").val();

        HistoryDetailsJson.push({
            IssueDate: IssueDate,
            ExpiryDate: ExpiryDate,
            IssuancePlace: IssuancePlace
        });
    });
}

function AddHistoryRow() {
    if (!validateForm(".validate")) return;
    var html = "<div class='row AppendedRow validate'>";
    html += "<div class='col-sm-3'>";
    html += "<div class='form-group'>";
    html += "<label for='txtIssueDate'>Issue Date</label>";
    html += "<input type='text' class='form-control DatePickerComplete txtIssueDate' placeholder='mm/dd/yyyy' />";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-3'>";
    html += "<div class='form-group'>";
    html += "<label for='txtExpiryDate'>Expiry Date</label>";
    html += "<input type='text' class='form-control DatePickerComplete txtExpiryDate' placeholder='mm/dd/yyyy' />";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-2'>";
    html += "<div class='form-group'>";
    html += " <label for='txtIssuancePlace'>Issuance Place</label>";
    html += "<input type='text' class='form-control  txtIssuancePlace' placeholder='Enter place of issuance' />";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-2'>";
    html += "<div class='form-group'>";
    html += "<label></label>";
    html += "<button class='btn btn-info form-control btnAddHistoryRow' onclick='AddHistoryRow()'><i class='fa fa-plus'></i></button>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-2'>";
    html += "<div class='form-group'>";
    html += "<label></label>";
    html += "<button class='btn btn-danger form-control btnRemoveHistoryRow' onclick='RemoveHistoryRow(this)'><i class='fa fa-minus'></i></button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";

    $(".validate:last").after($(html));

    // DatePickerComplete();
}

function AddHistoryRow_upd() {
    if (!validateForm(".validate_upd")) return;
    var html = "<div class='row AppendedRow validate_upd'>";
    html += "<div class='col-sm-3'>";
    html += "<div class='form-group'>";
    html += "<label for='txtIssueDate_upd'>Issue Date</label>";
    html += "<input type='text' class='form-control DatePickerComplete txtIssueDate_upd' placeholder='mm/dd/yyyy' />";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-3'>";
    html += "<div class='form-group'>";
    html += "<label for='txtExpiryDate_upd'>Expiry Date</label>";
    html += "<input type='text' class='form-control DatePickerComplete txtExpiryDate_upd' placeholder='mm/dd/yyyy' />";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-2'>";
    html += "<div class='form-group'>";
    html += " <label for='txtIssuancePlace_upd'>Issuance Place</label>";
    html += "<input type='text' class='form-control  txtIssuancePlace_upd' placeholder='Enter place of issuance' />";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-2'>";
    html += "<div class='form-group'>";
    html += "<label></label>";
    html += "<button class='btn btn-info form-control btnAddHistoryRow_upd' onclick='AddHistoryRow_upd()'><i class='fa fa-plus'></i></button>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-sm-2'>";
    html += "<div class='form-group'>";
    html += "<label></label>";
    html += "<button class='btn btn-danger form-control btnRemoveHistoryRow_upd' onclick='RemoveHistoryRow_upd(this)'><i class='fa fa-minus'></i></button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";

    $(".validate_upd:last").after($(html));
}
function RemoveHistoryRow(selector) {
    $(selector).closest(".validate").remove();
}

function RemoveHistoryRow_upd(selector) {
    $(selector).closest(".validate_upd").remove();
}
function GetAllMembers() {

    var request = $.ajax({
        method: "POST",
        url: "/CnicHistory/GetAllMembers",
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

function CreateNewCnicHistory() {
    var request = $.ajax({
        method: "POST",
        url: "/CnicHistory/CreateNewCnicHistory",
        data: CnicHistory[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            HistoryCnicJson = [];
            $('#CreateCnicHistory').modal('hide');
            GetAllCnicHistory();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}
function AllClickFunction() {
    $('.btnSaveChanges').click(function () {
        var duplicationMember = false;
        if (!validateForm(".frmCnicHistory")) return;

        AddHistoryDetailsToJSON();
        CnicHistory[0].MemberId = $('.ddlMember').val();
        CnicHistory[0].HistoryDetailsJson = JSON.stringify(HistoryDetailsJson);

        $('.trCnicHistory').each(function () {
            if ($(this).children('.hdnMemberId').val() == CnicHistory[0].MemberId) {
                duplicationMember = true;
            }
        });
        if (duplicationMember) {
            showError("This Member CNIC No. is already exist.");
            return;
        }
        CreateNewCnicHistory();
    });

    $('.btnUpdateChanges').click(function () {

        if (!validateForm(".frmPlots_upd")) return;
        AddHistoryDetailsToJSON_upd();
        CnicHistory[0].MemberId = $('.ddlMember').val();
        CnicHistory[0].HistoryDetailsJson = JSON.stringify(HistoryDetailsJson);
        UpdateCnicHistory();
    });

    $('.btnDelete').click(function () {
        DeletePlot();
    });

    //$('.txtIssueDate').on('click',function () {
    //    DatePickerComplete();
    //});
}