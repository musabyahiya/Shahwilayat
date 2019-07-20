GetAllMembers();
AllClickFunction();
GetAllCountry();
GetAllGender();
GetAllReligion();
GetAllCity();
GetAllProvince();
GetAllMembershipFee();
GetAllCurrentAllottee();
AllChangeFunction();

var ProvonceList;
var CityList;
var MembersList;
var AllotteeList;
var objEditRow;
var Members =
[{
    MemberId: 0,
    FirstName: null,
    LastName: null,
    FatherName: null,
    CellNo: null,
    Landline: null,
    WhatsApp: null,
    Email: null,
    Dob: null,
    Cnic: null,
    CnicIssuanceDate: null,
    CnicExpiryDate: null,
    CnicIssuancePlace: null,
    CnicFrontFile: null,
    CnicBackFile: null,
    ProfileFile: 0,
    GenderId: 0,
    CountryId: 0,
    ProvinceId: 0,
    CityId: 0,
    PostalCode: null,
    PresentAddress: null,
    PermanentAddress: null,
    MembershipNo: null,
    MembershipFeeId: 0,
    MembershipFeeDate: null,
    MembershipFeeReceptNo: null,
    MembershipBookNo: null,
    ReligionId: 0,
    MembershipRegNo: null
}]

function AllClickFunction() {
    $('.btnSaveChanges').click(function () {
        var duplicationMember = false;
        if (!validateForm(".frmMembers")) return;
        if (!isValidEmailAddress($('.txtEmail').val())) return;

        Members[0].FirstName = $('.txtFirstName').val();
        Members[0].LastName = $('.txtLastName').val();
        Members[0].FatherName = $('.txtFatherName').val();
        Members[0].CellNo = $('.txtCellNo').val();
        Members[0].Landline = $('.txtLandline').val();
        Members[0].WhatsApp = $('.txtWhatsApp').val();
        Members[0].Email = $('.txtEmail').val();
        Members[0].Dob = formatDate($('.txtDob').val());
        Members[0].Cnic = $('.txtCnic').val();
        Members[0].CnicIssuanceDate = formatDate($('.txtCnicIssuanceDate').val());
        Members[0].CnicExpiryDate = formatDate($('.txtCnicExpiryDate').val());
        Members[0].CnicIssuancePlace = $('.txtCnicIssuancePlace').val();
        Members[0].CnicFrontFile = FileUpload('.txtCnicFrontFile');
        Members[0].CnicBackFile = FileUpload('.txtCnicBackFile');
        Members[0].ProfileFile = FileUpload('.txtProfileFile');
        Members[0].GenderId = $('.ddlGender').val();
        Members[0].CountryId = $('.ddlCountry').val();
        Members[0].ProvinceId = $('.ddlProvince').val();
        Members[0].CityId = $('.ddlCity').val();
        Members[0].PostalCode = $('.txtPostalCode').val();
        Members[0].PresentAddress = $('.txtPresentAddress').val();
        Members[0].PermanentAddress = $('.txtPermanentAddress').val();
        Members[0].MembershipNo = $('.txtMembershipNo').val();
        Members[0].MembershipFeeId = $('.ddlMembershipFee').val();
        Members[0].MembershipFeeDate = formatDate($('.txtMembershipFeeDate').val());
        Members[0].MembershipFeeReceptNo = $('.txtMembershipFeeReceptNo').val();;
        Members[0].MembershipBookNo = $('.txtMembershipBookNo').val();;
        Members[0].ReligionId = $('.ddlReligion').val();;
        Members[0].MembershipRegNo = $('.txtMembershipRegNo').val();

        if (Members[0].CnicFrontFile == "" || Members[0].CnicBackFile == "" || Members[0].ProfileFile == "") {
            return;
        }
        $('.trMembers').each(function () {
            if ($(this).children('.tdMembershipNo').text() == Members[0].MembershipNo ||
                $(this).children('.tdCnic').text() == Members[0].Cnic) {
                duplicationMember = true;
            }
        });
        if (duplicationMember) {
            showError("Membership No or CNIC has already exist.");
            return;
        }

        CreateNewMember()
    });

    $('.btnUpdateChanges').click(function () {
        var duplicationMember = false;
        if (!validateForm(".frmMembers_upd")) return;
        Members[0].FirstName = $('.txtFirstName_upd').val();
        Members[0].LastName = $('.txtLastName_upd').val();
        Members[0].FatherName = $('.txtFatherName_upd').val();
        Members[0].CellNo = $('.txtCellNo_upd').val();
        Members[0].Landline = $('.txtLandline_upd').val();
        Members[0].WhatsApp = $('.txtWhatsApp_upd').val();
        Members[0].Email = $('.txtEmail_upd').val();
        Members[0].Dob = formatDate($('.txtDob_upd').val());
        Members[0].Cnic = $('.txtCnic_upd').val();
        Members[0].CnicIssuanceDate = formatDate($('.txtCnicIssuanceDate_upd').val());
        Members[0].CnicExpiryDate = formatDate($('.txtCnicExpiryDate_upd').val());
        Members[0].CnicIssuancePlace = $('.txtCnicIssuancePlace_upd').val();
        Members[0].GenderId = $('.ddlGender_upd').val();
        Members[0].CountryId = $('.ddlCountry_upd').val();
        Members[0].ProvinceId = $('.ddlProvince_upd').val();
        Members[0].CityId = $('.ddlCity_upd').val();
        Members[0].PostalCode = $('.txtPostalCode_upd').val();
        Members[0].PresentAddress = $('.txtPresentAddress_upd').val();
        Members[0].PermanentAddress = $('.txtPermanentAddress_upd').val();
        Members[0].MembershipNo = $('.txtMembershipNo_upd').val();
        Members[0].MembershipFeeId = $('.ddlMembershipFee_upd').val();
        Members[0].MembershipFeeDate = formatDate($('.txtMembershipFeeDate_upd').val());
        Members[0].MembershipFeeReceptNo = $('.txtMembershipFeeReceptNo_upd').val();;
        Members[0].MembershipBookNo = $('.txtMembershipBookNo_upd').val();;
        Members[0].ReligionId = $('.ddlReligion_upd').val();;
        Members[0].MembershipRegNo = $('.txtMembershipRegNo_upd').val();


        $('.trMembers').each(function () {
            if ((($(this).children('.tdMembershipNo').text() == Members[0].MembershipNo) ||
                ($(this).children('.tdCnic').text() == Members[0].Cnic)) && ($(this).children('.hdnMemberId').val() != Members[0].MemberId)) {
                duplicationMember = true;
            }
        });
        if (duplicationMember) {
            showError("Membership No or CNIC has already exist.");
            return;
        }
        UpdateMember();
    });

    $('.btnUpdateChangesAttachments').click(function () {

        if (!validateForm(".frmMembersAttachments_upd")) return;
        Members[0].CnicFrontFile = FileUpload('.txtCnicFrontFile_upd');
        Members[0].CnicBackFile = FileUpload('.txtCnicBackFile_upd');
        Members[0].ProfileFile = FileUpload('.txtProfileFile_upd');
        if (Members[0].CnicFrontFile == "" || Members[0].CnicBackFile == "" || Members[0].ProfileFile == "") {
            return;
        }
        UpdateAttachment();
    });

    $('.btnDelete').click(function () {
        DeleteMember();
    });

    $('.btnPrint').click(function () {
        $(function () {
            //$('#Print').load('http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js');

        });

        var contents = $("#Print").html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title>Member Individual Sheet</title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.
        frameDoc.document.write('<link href="/Content/css/PrintMaterial/IndividualSheet.css" rel="stylesheet" type="text/css" />');
        //Append the DIV contents.
        frameDoc.document.write(contents);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();
        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            frame1.remove();
        }, 500);
    });
}

function AllChangeFunction() {
    $('.ddlCountry').change(function () {
        var CountryId = $(this).val();
        var obj = ProvinceList.filter(x=>x.CountryId == CountryId);
        onGetAllProvince(obj);
    });

    $('.ddlProvince').change(function () {
        var ProvinceId = $(this).val();
        var obj = CityList.filter(x=>x.ProvinceId == ProvinceId);
        onGetAllCity(obj);
    });

    $('.ddlCountry_upd').change(function () {
        var CountryId = $(this).val();
        var obj = ProvinceList.filter(x=>x.CountryId == CountryId);
        onGetAllProvince(obj);
    });

    $('.ddlProvince_upd').change(function () {
        var ProvinceId = $(this).val();
        var obj = CityList.filter(x=>x.ProvinceId == ProvinceId);
        onGetAllCity(obj);
    });
}

function GetAllCountry() {

    var request = $.ajax({
        method: "POST",
        url: "/Member/GetAllCountry",
        data: {}
    });
    request.done(function (data) {

        onGetAllCountry(data);


    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllCountry(data) {
    try {


        var res = data;
        FillDropDownByReference('.ddlCountry', res);
        FillDropDownByReference('.ddlCountry_upd', res);

    }
    catch (Err) {
        console.log(Err);
    }

}

function GetAllProvince() {

    var request = $.ajax({
        method: "POST",
        url: "/Member/GetAllProvince",
        data: {}
    });
    request.done(function (data) {


        var res = data;
        ProvinceList = res;


    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllProvince(data) {
    try {


        var res = data;
        FillDropDownByReference('.ddlProvince', res);
        FillDropDownByReference('.ddlProvince_upd', res);

    }
    catch (Err) {
        console.log(Err);
    }

}

function GetAllCity() {

    var request = $.ajax({
        method: "POST",
        url: "/Member/GetAllCity",
        data: {}
    });
    request.done(function (data) {
        var res = data;
        CityList = res;
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllCity(data) {

    try {
        var res = data;
        FillDropDownByReference('.ddlCity', res);
        FillDropDownByReference('.ddlCity_upd', res);

    }
    catch (Err) {
        console.log(Err);
    }

}
function GetAllCurrentAllottee() {

    var request = $.ajax({
        method: "POST",
        url: "/Member/GetCurrentAllottee",
        data: {}
    });
    request.done(function (data) {
        var res = JSON.parse(data);
        AllotteeList = res;
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}


function GetAllReligion() {

    var request = $.ajax({
        method: "POST",
        url: "/Member/GetAllReligion",
        data: {}
    });
    request.done(function (data) {

        onGetAllReligion(data);


    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllReligion(data) {
    try {


        var res = data;
        FillDropDownByReference('.ddlReligion', res);
        FillDropDownByReference('.ddlReligion_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }

}
function GetAllGender() {

    var request = $.ajax({
        method: "POST",
        url: "/Member/GetAllGender",
        data: {}
    });
    request.done(function (data) {

        onGetAllGender(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllGender(data) {
    try {


        var res = data;
        FillDropDownByReference('.ddlGender', res);
        FillDropDownByReference('.ddlGender_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }

}

function GetAllMembershipFee() {

    var request = $.ajax({
        method: "POST",
        url: "/Member/GetAllMembershipFee",
        data: {}
    });
    request.done(function (data) {

        onGetAllMembershipFee(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllMembershipFee(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlMembershipFee', res);
        FillDropDownByReference('.ddlMembershipFee_upd', res);
    }
    catch (Err) {
        console.log(Err);
    }

}

function CreateNewMember() {
    var request = $.ajax({
        method: "POST",
        url: "/Member/CreateNewMember",
        data: Members[0]
    });
    request.done(function (data) {
        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            $('#CreateMember').modal('hide');
            GetAllMembers();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function UpdateMember() {
    var request = $.ajax({
        method: "POST",
        url: "/Member/UpdateMember",
        data: Members[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Updated!');
            $('#EditMember').modal('hide');
            GetAllMembers();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function UpdateAttachment() {
    var request = $.ajax({
        method: "POST",
        url: "/Member/UpdateAttachment",
        data: Members[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Updated!');
            $('#EditMemberAttachment').modal('hide');
            GetAllMembers();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function DeleteMember() {
    var request = $.ajax({
        method: "POST",
        url: "/Member/DeleteMember",
        data: Members[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Deleted!');
            $('#DeleteMember').modal('hide');
            GetAllMembers();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function GetAllMembers() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/Member/GetAllMembers",
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
        var divTbodyGoalFund = $(".MembersListing").html("");
        $("#MembersListing").tmpl(res).appendTo(divTbodyGoalFund);
        //Export 
        divTbodyGoalFund = $(".MembersListingExport").html("");
        $("#MembersListingExport").tmpl(res).appendTo(divTbodyGoalFund);
        var i = 1;
        $('.trMembers').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
        i = 1;
        $('.trMembersExport').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }

}
function EditMember(selector) {
    objEditRow = $(selector).closest('tr');
    Members[0].MemberId = objEditRow.find('.hdnMemberId').val();
    $('.txtFirstName_upd').val(objEditRow.find('.tdFirstName').text());
    $('.txtLastName_upd').val(objEditRow.find('.tdLastName').text());
    $('.txtFatherName_upd').val(objEditRow.find('.tdFatherName').text());
    $('.txtCellNo_upd').val(objEditRow.find('.tdCellNo').text());
    $('.txtLandline_upd').val(objEditRow.find('.tdLandline').text());
    $('.txtWhatsApp_upd').val(objEditRow.find('.tdWhatsApp').text());
    $('.txtEmail_upd').val(objEditRow.find('.tdEmail').text());
    $('.txtDob_upd').val(objEditRow.find('.tdDob').text());
    $('.txtCnic_upd').val(objEditRow.find('.tdCnic').text());
    $('.txtCnicIssuanceDate_upd').val(objEditRow.find('.tdCnicIssuanceDate').text());
    $('.txtCnicExpiryDate_upd').val(objEditRow.find('.tdCnicExpiryDate').text());
    $('.txtCnicIssuancePlace_upd').val(objEditRow.find('.tdCnicIssuancePlace').text());
    $('.ddlGender_upd').val(objEditRow.find('.hdnGenderId').val());
    $('.ddlCountry_upd').val(objEditRow.find('.hdnCountryId').val()).change();
    $('.ddlProvince_upd').val(objEditRow.find('.hdnProvinceId').val()).change();
    $('.ddlCity_upd').val(objEditRow.find('.hdnCityId').val());
    $('.txtPostalCode_upd').val(objEditRow.find('.tdPostalCode').text());
    $('.txtPresentAddress_upd').val(objEditRow.find('.tdPresentAddress').text());
    $('.txtPermanentAddress_upd').val(objEditRow.find('.tdPermanentAddress').text());
    $('.txtMembershipNo_upd').val(objEditRow.find('.tdMembershipNo').text());
    $('.ddlMembershipFee_upd').val(objEditRow.find('.hdnMembershipFeeId').val());
    $('.txtMembershipFeeDate_upd').val(objEditRow.find('.tdMembershipFeeDate').text());
    $('.txtMembershipFeeReceptNo_upd').val(objEditRow.find('.tdMembershipFeeReceptNo').text());
    $('.txtMembershipBookNo_upd').val(objEditRow.find('.tdMembershipBookNo').text());
    $('.ddlReligion_upd').val(objEditRow.find('.hdnReligionId').val());
    $('.txtMembershipRegNo_upd').val(objEditRow.find('.tdMembershipRegNo').text());


}

function PrintIndividualMember(selector) {
    objEditRow = $(selector).closest('tr');
    Members[0].MemberId = objEditRow.find('.hdnMemberId').val();
    $('.printFullName').html(objEditRow.find('.tdFirstName').text() + ' ' + objEditRow.find('.tdLastName').text());
    $('.printFatherName').html(objEditRow.find('.tdFatherName').text());
    $('.printCellNo').html(objEditRow.find('.tdCellNo').text());
    $('.printLandline').html(objEditRow.find('.tdLandline').text() == null ? 'N/A' : objEditRow.find('.tdLandline').text());
    $('.printWhatsApp').html(objEditRow.find('.tdWhatsApp').text());
    $('.printEmail').html(objEditRow.find('.tdEmail').text());
    $('.printDob').html(objEditRow.find('.tdDob').text());
    $('.printCnic').html(objEditRow.find('.tdCnic').text());
    $('.printCnicIssuanceDate').html(objEditRow.find('.tdCnicIssuanceDate').text());
    $('.printCnicExpiryDate').html(objEditRow.find('.tdCnicExpiryDate').text());
    $('.printCnicIssuancePlace').html(objEditRow.find('.tdCnicIssuancePlace').text());
    $('.printGender').html(objEditRow.find('.tdGender').text());
    $('.printCountry').html(objEditRow.find('.tdCountry').text());
    $('.printProvince').html(objEditRow.find('.tdProvince').text());
    $('.printCity').html(objEditRow.find('.tdCity').text());
    $('.printPostalCode').html(objEditRow.find('.tdPostalCode').text());
    $('.printPresentAddress').html(objEditRow.find('.tdPresentAddress').text());
    $('.printPermanentAddress').html(objEditRow.find('.tdPermanentAddress').text());
    $('.printMembershipNo').html(objEditRow.find('.tdMembershipNo').text());
    $('.printMembershipFee').html('Rs: ' + moneyFormat(objEditRow.find('.tdMembershipFee').text()));
    $('.printMembershipFeeDate').html(objEditRow.find('.tdMembershipFeeDate').text());
    $('.printMembershipFeeReceptNo').html(objEditRow.find('.tdMembershipFeeReceptNo').text());
    $('.printMembershipBookNo').html(objEditRow.find('.tdMembershipBookNo').text());
    $('.printMembershipRegNo').html(objEditRow.find('.tdMembershipRegNo').text());
    $('.printReligion').html(objEditRow.find('.tdReligion').text());
    $('.printProfileFile').attr('src', objEditRow.find('.hdnProfileFile').val());

    // for plot binding
    var res = AllotteeList.filter(x=> x.MemberId == Members[0].MemberId);
    var divTbodyGoalFund = $(".PlotListing").html("");
    $("#PlotListing").tmpl(res).appendTo(divTbodyGoalFund);
    var i = 1;
    $('.trPlots').each(function () {
        $(this).find('td').first().text(i);
        i++;
    });
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