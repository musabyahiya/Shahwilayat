GetAllMembers();
AllClickFunction();
GetAllCountry();
GetAllGender();
GetAllMemberRelations();
GetAllTitle();
GetAllCity();
GetAllProvince();
SearchTable();
GetAllCurrentAllottee();
AllChangeFunction();

var ProvonceList;
var CityList;
var MemberList;
var AllotteeList;

var CnicFrontFile;
var CnicFrontBack;
var ProfileFile;

var objEditRow;
var Members =
[{
    MemberId: 0,
    TitleId: 0,
    MemberRelationId: 0,
    GenderId: 0,
    CountryId: 0,
    ProvinceId: 0,
    CityId: 0,
    FirstName: null,
    LastName: null,
    FatherName: null,
    CellNo: null,
    Landline: null,
    WhatsApp: null,
    OfficePhone: null,
    Email: null,
    Dob: null,
    BirthPlace: null,
    CNIC: null,
    CnicExpiryDate: null,
    BloodGroup: null,
    PostalCode: null,
    PermanentAddress: null,
    Occupation: null,
    MembershipNo: null,
    MembershipDate: null,
    ReferenceNo: null,
    FolioNo: null,
    CnicFrontFile: null,
    CnicBackFile: null,
    ProfileFile: null,
    IsMember: true

}]

function AllClickFunction() {
    $('.btnSaveChanges').click(function () {
        ProgressBarShow();

        if (!validateForm(".frmMember")) {
            ProgressBarHide();
            return;

        }


        Members[0].TitleId = $('.ddlTitle').val();
        Members[0].MemberRelationId = $('.ddlMemberRelation').val();
        Members[0].GenderId = $('.ddlGender').val();
        Members[0].CountryId = $('.ddlCountry').val();
        Members[0].ProvinceId = $('.ddlProvince').val();
        Members[0].CityId = $('.ddlCity').val();
        Members[0].FirstName = $('.txtFirstName').val();
        Members[0].LastName = $('.txtLastName').val();
        Members[0].FatherName = $('.txtFatherName').val();
        Members[0].CellNo = $('.txtCellNo').val();
        Members[0].Landline = $('.txtLandline').val();
        Members[0].WhatsApp = $('.txtWhatsApp').val();
        Members[0].OfficePhone = $('.txtOfficePhone').val();
        Members[0].Email = $('.txtEmail').val();
        Members[0].Dob = $('.txtDob').val();
        Members[0].BirthPlace = $('.txtBirthPlace').val();
        Members[0].CNIC = $('.txtCNIC').val();
        Members[0].PostalCode = $('.txtPostalCode').val();
        Members[0].BloodGroup = $('.txtBloodGroup').val();
        Members[0].PermanentAddress = $('.txtPermanentAddress').val();
        Members[0].Occupation = $('.txtOccupation').val();
        Members[0].MembershipNo = $('.txtMembershipNo').val();
        Members[0].MembershipDate = $('.txtMembershipDate').val();
        Members[0].ReferenceNo = $('.txtReferenceNo').val();
        Members[0].FolioNo = $('.txtFolioNo').val();
        Members[0].CnicExpiryDate = $('.txtCnicExpiryDate').val()
        Members[0].CnicFrontFile = FileUpload('.txtCnicFrontFile');
        Members[0].CnicBackFile = FileUpload('.txtCnicBackFile');
        Members[0].ProfileFile = FileUpload('.txtProfileFile');



        if (Members[0].CnicFrontFile == "" || Members[0].CnicBackFile == "" || Members[0].ProfileFile == "") {
            showError('Please attach all the attachments');
            return;
        }


        CreateNewMember()
        ProgressBarHide();
    });

    $('.btnUpdateChanges').click(function () {
        ProgressBarShow();
        var duplicationMember = false;
        if (!validateForm(".frmMember_upd")) return;

        Members[0].TitleId = $('.ddlTitle_upd').val();
        Members[0].MemberRelationId = $('.ddlMemberRelation_upd').val();
        Members[0].GenderId = $('.ddlGender_upd').val();
        Members[0].CountryId = $('.ddlCountry_upd').val();
        Members[0].ProvinceId = $('.ddlProvince_upd').val();
        Members[0].CityId = $('.ddlCity_upd').val();
        Members[0].FirstName = $('.txtFirstName_upd').val();
        Members[0].LastName = $('.txtLastName_upd').val();
        Members[0].FatherName = $('.txtFatherName_upd').val();
        Members[0].CellNo = $('.txtCellNo_upd').val();
        Members[0].Landline = $('.txtLandline_upd').val();
        Members[0].WhatsApp = $('.txtWhatsApp_upd').val();
        Members[0].OfficePhone = $('.txtOfficePhone_upd').val();
        Members[0].Email = $('.txtEmail_upd').val();
        Members[0].Dob = $('.txtDob_upd').val();
        Members[0].BirthPlace = $('.txtBirthPlace_upd').val();
        Members[0].CNIC = $('.txtCNIC_upd').val();
        Members[0].PostalCode = $('.txtPostalCode_upd').val();
        Members[0].BloodGroup = $('.txtBloodGroup_upd').val();
        Members[0].PermanentAddress = $('.txtPermanentAddress_upd').val();
        Members[0].Occupation = $('.txtOccupation_upd').val();
        Members[0].MembershipNo = $('.txtMembershipNo_upd').val();
        Members[0].MembershipDate = $('.txtMembershipDate_upd').val();
        Members[0].ReferenceNo = $('.txtReferenceNo_upd').val();
        Members[0].FolioNo = $('.txtFolioNo_upd').val();
        Members[0].CnicExpiryDate = $('.txtCnicExpiryDate_upd').val()



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
        ProgressBarHide();
    });

    $('.btnUpdateAttachment').click(function () {

        Members[0].CnicFrontFile = FileUpload('.txtCnicFrontFile_upd') == '' ? CnicFrontFile : FileUpload('.txtCnicFrontFile_upd');
        Members[0].CnicBackFile = FileUpload('.txtCnicBackFile_upd') == '' ? CnicBackFile : FileUpload('.txtCnicBackFile_upd');
        Members[0].ProfileFile = FileUpload('.txtProfileFile_upd') == '' ? ProfileFile : FileUpload('.txtProfileFile_upd');

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
        frameDoc.document.write('<link href="/Content/assets/css/PrintMaterial/MemberProfile.css" rel="stylesheet" type="text/css" />');
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

function GetAllTitle() {

    var request = $.ajax({
        method: "POST",
        url: "/Member/GetAllTitle",
        data: {}
    });
    request.done(function (data) {

        onGetAllTitle(data);


    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllTitle(data) {
    try {


        var res = data;
        FillDropDownByReference('.ddlTitle', res);
        FillDropDownByReference('.ddlTitle_upd', res);

    }
    catch (Err) {
        console.log(Err.message);
    }

}


function GetAllMemberRelations() {

    var request = $.ajax({
        method: "POST",
        url: "/Member/GetAllMemberRelations",
        data: {}
    });
    request.done(function (data) {

        onGetAllMemberRelations(data);


    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllMemberRelations(data) {
    try {


        var res = data;
        FillDropDownByReference('.ddlMemberRelation', res);
        FillDropDownByReference('.ddlMemberRelation_upd', res);

    }
    catch (Err) {
        console.log(Err.message);
    }

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
        console.log(Err.message);
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
        console.log(Err.message);
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
        console.log(Err.message);
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
        console.log(Err.message);
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
        console.log(Err.message);
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

        MemberList = data;
        onGetAllMembers(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllMembers(data) {
    try {

        var res = data;

        var divTbodyGoalFund = $(".MemberListing").html("");
        $("#MemberListing").tmpl(res).appendTo(divTbodyGoalFund);

        var i = 1;
        $('.trMembers').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
        paginateTable('.tblMember', 10);
        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err.message);
    }

}

function SearchTable() {
    $(".txtSearch").keyup(function () {
        ProgressBarShow();
        _this = this;

        var search = $(_this).val();

        if (search == '') {
            onGetAllMembers(MemberList);
        }
        else {
            var obj = MemberList.filter(x=> x.FirstName.toLowerCase().includes(search.toLowerCase()) ||
				x.LastName.toLowerCase().includes(search.toLowerCase()) ||
				x.Email.toLowerCase().includes(search.toLowerCase()) ||
				x.CellNo.toLowerCase().includes(search.toLowerCase()) ||
			    x.MembershipNo.toLowerCase().includes(search.toLowerCase()) ||
                x.FolioNo.toLowerCase().includes(search.toLowerCase()) ||
                x.ReferenceNo.toLowerCase().includes(search.toLowerCase())
				)
            onGetAllMembers(obj);

        }
        ProgressBarHide();
    });
}

function CheckDuplicateMembershipNo(MembershipNo) {
    var obj = MemberList.filter(x=> x.MembershipNo == MembershipNo);
    return obj.length > 0 ? true : false;
}
function EditMember(selector) {
    objEditRow = $(selector).closest('tr');
    Members[0].MemberId = objEditRow.find('.hdnMemberId').val();
    $('.ddlTitle_upd').val(objEditRow.find('.hdnTitleId').val());
    $('.ddlMemberRelation_upd').val(objEditRow.find('.hdnMemberRelationId').val());
    $('.ddlGender_upd').val(objEditRow.find('.hdnGenderId').val());
    $('.ddlCountry_upd').val(objEditRow.find('.hdnCountryId').val()).change();
    $('.ddlProvince_upd').val(objEditRow.find('.hdnProvinceId').val()).change();
    $('.ddlCity_upd').val(objEditRow.find('.hdnCityId').val());
    $('.txtFirstName_upd').val(objEditRow.find('.hdnFirstName').val());
    $('.txtLastName_upd').val(objEditRow.find('.hdnLastName').val());
    $('.txtFatherName_upd').val(objEditRow.find('.hdnFatherName').val());
    $('.txtCellNo_upd').val(objEditRow.find('.hdnCellNo').val());
    $('.txtLandline_upd').val(objEditRow.find('.hdnLandline').val());
    $('.txtWhatsApp_upd').val(objEditRow.find('.hdnWhatsApp').val());
    $('.txtOfficePhone_upd').val(objEditRow.find('.hdnOfficePhone').val());
    $('.txtEmail_upd').val(objEditRow.find('.hdnEmail').val());
    $('.txtDob_upd').val(objEditRow.find('.hdnDob').val());
    $('.txtBirthPlace_upd').val(objEditRow.find('.hdnBirthPlace').val());
    $('.txtCNIC_upd').val(objEditRow.find('.hdnCNIC').val());
    $('.txtCnicExpiryDate_upd').val(objEditRow.find('.hdnCnicExpiryDate').val());
    $('.txtPostalCode_upd').val(objEditRow.find('.hdnPostalCode').val());
    $('.txtBloodGroup_upd').val(objEditRow.find('.hdnBloodGroup').val());
    $('.txtOccupation_upd').val(objEditRow.find('.hdnOccupation').val());
    $('.txtPermanentAddress_upd').val(objEditRow.find('.hdnPermanentAddress').val());
    $('.txtMembershipNo_upd').val(objEditRow.find('.hdnMembershipNo').val());
    $('.txtMembershipDate_upd').val(objEditRow.find('.hdnMembershipDate').val());
    $('.txtReferenceNo_upd').val(objEditRow.find('.hdnReferenceNo').val());
    $('.txtFolioNo_upd').val(objEditRow.find('.hdnFolioNo').val());

    // for attachments

    CnicFrontFile = objEditRow.find('.hdnCnicFrontFile').val();
    CnicBackFile = objEditRow.find('.hdnCnicBackFile').val();
    ProfileFile = objEditRow.find('.hdnProfileFile').val();

}

function PrintIndividualMember(selector) {
    objEditRow = $(selector).closest('tr');
    Members[0].MemberId = objEditRow.find('.hdnMemberId').val();
    $('.printFullName').html(objEditRow.find('.hdnFirstName').val() + ' ' + objEditRow.find('.hdnLastName').val());
    $('.printMemberRelation').html(objEditRow.find('.hdnMemberRelation').val());
    $('.printFatherName').html(objEditRow.find('.hdnFatherName').val());
    $('.printCellNo').html(objEditRow.find('.hdnCellNo').val());
    $('.printLandline').html(objEditRow.find('.hdnLandline').val() == null ? 'N/A' : objEditRow.find('.hdnLandline').val());
    $('.printWhatsApp').html(objEditRow.find('.hdnWhatsApp').val() == null ? 'N/A' : objEditRow.find('.hdnWhatsApp').val());
    $('.printOfficePhone').html(objEditRow.find('.hdnOfficePhone').val() == null ? 'N/A' : objEditRow.find('.hdnOfficePhone').val());
    $('.printEmail').html(objEditRow.find('.hdnEmail').val() == null ? 'N/A' : objEditRow.find('.hdnWhatsApp').val());
    $('.printDob').html(objEditRow.find('.hdnDob').val());
    $('.printBirthPlace').html(objEditRow.find('.hdnBirthPlace').val());
    $('.printCNIC').html(objEditRow.find('.hdnCNIC').val());
    $('.printCnicExpiryDate').html(objEditRow.find('.hdnCnicExpiryDate').val());

    $('.printGender').html(objEditRow.find('.hdnGender').val());
    $('.printCountry').html(objEditRow.find('.hdnCountry').val());
    $('.printProvince').html(objEditRow.find('.hdnProvince').val());
    $('.printCity').html(objEditRow.find('.hdnCity').val());
    $('.printPostalCode').html(objEditRow.find('.hdnPostalCode').val());
    $('.printBloodGroup').html(objEditRow.find('.hdnBloodGroup').val() == null ? 'N/A' : objEditRow.find('.hdnBloodGroup').val());
    $('.printOccupation').html(objEditRow.find('.hdnOccupation').val() == null ? 'N/A' : objEditRow.find('.hdnOccupation').val());
    $('.printPermanentAddress').html(objEditRow.find('.hdnPermanentAddress').val());
    $('.printMembershipNo').html(objEditRow.find('.hdnMembershipNo').val());
    $('.printMembershipDate').html(objEditRow.find('.hdnMembershipDate').val());
    $('.printReferenceNo').html(objEditRow.find('.hdnReferenceNo').val());
    $('.printFolioNo').html(objEditRow.find('.hdnFolioNo').val());
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
