GetAllMembers();
GetAllAssociateMembers();
AllClickFunction();
GetAllCountry();
GetAllGender();
GetAllMemberRelations();
GetAllTitle();
GetAllCity();
GetAllProvince();
SearchTable();

AllChangeFunction();

var ProvonceList;
var CityList;
var MemberList;
var AllotteeList;

var CnicFrontFile;
var CnicFrontBack;
var ProfileFile;

var objEditRow;
var AssociateMember =
[{
    AssociateMemberId: 0,
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
    CnicFrontFile: null,
    CnicBackFile: null,
    ProfileFile: null,
    IsMember: true

}]

function AllClickFunction() {
    $('.btnSaveChanges').click(function () {
        var duplicationMember = false;
        if (!validateForm(".frmMember")) return;
        if (!isValidEmailAddress($('.txtEmail').val())) return;

        AssociateMember[0].MemberId = $('.ddlMember').val();
        AssociateMember[0].TitleId = $('.ddlTitle').val();
        AssociateMember[0].MemberRelationId = $('.ddlMemberRelation').val();
        AssociateMember[0].GenderId = $('.ddlGender').val();
        AssociateMember[0].CountryId = $('.ddlCountry').val();
        AssociateMember[0].ProvinceId = $('.ddlProvince').val();
        AssociateMember[0].CityId = $('.ddlCity').val();
        AssociateMember[0].FirstName = $('.txtFirstName').val();
        AssociateMember[0].LastName = $('.txtLastName').val();
        AssociateMember[0].FatherName = $('.txtFatherName').val();
        AssociateMember[0].CellNo = $('.txtCellNo').val();
        AssociateMember[0].Landline = $('.txtLandline').val();
        AssociateMember[0].WhatsApp = $('.txtWhatsApp').val();
        AssociateMember[0].OfficePhone = $('.txtOfficePhone').val();
        AssociateMember[0].Email = $('.txtEmail').val();
        AssociateMember[0].Dob = $('.txtDob').val();
        AssociateMember[0].BirthPlace = $('.txtBirthPlace').val();
        AssociateMember[0].CNIC = $('.txtCNIC').val();
        AssociateMember[0].PostalCode = $('.txtPostalCode').val();
        AssociateMember[0].BloodGroup = $('.txtBloodGroup').val();
        AssociateMember[0].PermanentAddress = $('.txtPermanentAddress').val();
        AssociateMember[0].Occupation = $('.txtOccupation').val();
        AssociateMember[0].CnicExpiryDate = $('.txtCnicExpiryDate').val()
        AssociateMember[0].CnicFrontFile = FileUpload('.txtCnicFrontFile');
        AssociateMember[0].CnicBackFile = FileUpload('.txtCnicBackFile');
        AssociateMember[0].ProfileFile = FileUpload('.txtProfileFile');

        CreateNewMember()
    });

    $('.btnUpdateChanges').click(function () {
        var duplicationMember = false;
        if (!validateForm(".frmMember_upd")) return;

        AssociateMember[0].MemberId = $('.ddlMember_upd').val();
        AssociateMember[0].TitleId = $('.ddlTitle_upd').val();
        AssociateMember[0].MemberRelationId = $('.ddlMemberRelation_upd').val();
        AssociateMember[0].GenderId = $('.ddlGender_upd').val();
        AssociateMember[0].CountryId = $('.ddlCountry_upd').val();
        AssociateMember[0].ProvinceId = $('.ddlProvince_upd').val();
        AssociateMember[0].CityId = $('.ddlCity_upd').val();
        AssociateMember[0].FirstName = $('.txtFirstName_upd').val();
        AssociateMember[0].LastName = $('.txtLastName_upd').val();
        AssociateMember[0].FatherName = $('.txtFatherName_upd').val();
        AssociateMember[0].CellNo = $('.txtCellNo_upd').val();
        AssociateMember[0].Landline = $('.txtLandline_upd').val();
        AssociateMember[0].WhatsApp = $('.txtWhatsApp_upd').val();
        AssociateMember[0].OfficePhone = $('.txtOfficePhone_upd').val();
        AssociateMember[0].Email = $('.txtEmail_upd').val();
        AssociateMember[0].Dob = $('.txtDob_upd').val();
        AssociateMember[0].BirthPlace = $('.txtBirthPlace_upd').val();
        AssociateMember[0].CNIC = $('.txtCNIC_upd').val();
        AssociateMember[0].PostalCode = $('.txtPostalCode_upd').val();
        AssociateMember[0].BloodGroup = $('.txtBloodGroup_upd').val();
        AssociateMember[0].PermanentAddress = $('.txtPermanentAddress_upd').val();
        AssociateMember[0].Occupation = $('.txtOccupation_upd').val();
        AssociateMember[0].CnicExpiryDate = $('.txtCnicExpiryDate_upd').val();




        $('.trMembers').each(function () {
            if ((($(this).children('.tdMembershipNo').text() == AssociateMember[0].MembershipNo) ||
                ($(this).children('.tdCnic').text() == AssociateMember[0].Cnic)) && ($(this).children('.hdnMemberId').val() != AssociateMember[0].MemberId)) {
                duplicationMember = true;
            }
        });
        if (duplicationMember) {
            showError("Membership No or CNIC has already exist.");
            return;
        }
        UpdateMember();
    });

    $('.btnUpdateAttachment').click(function () {

        if (!validateForm(".frmAttachment")) return;
        AssociateMember[0].CnicFrontFile = FileUpload('.txtCnicFrontFile_upd') == '' ? CnicFrontFile : FileUpload('.txtCnicFrontFile_upd');
        AssociateMember[0].CnicBackFile = FileUpload('.txtCnicBackFile_upd') == '' ? CnicBackFile : FileUpload('.txtCnicBackFile_upd');
        AssociateMember[0].ProfileFile = FileUpload('.txtProfileFile_upd') == '' ? ProfileFile : FileUpload('.txtProfileFile_upd');

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
function PrintIDCard(selector) {
    objEditRow = $(selector).closest('tr');
    $('.IDCardMembershipNo').html(objEditRow.find('.hdnMembershipNo').val());
    $('.IDCardFullName').html(objEditRow.find('.hdnFirstName').val() + ' ' + objEditRow.find('.hdnLastName').val());
    $('.IDCardBloodGroup').html(objEditRow.find('.hdnBloodGroup').val() == null ? 'N/A' : objEditRow.find('.hdnBloodGroup').val());
    $('.IDCardAddress').html(objEditRow.find('.hdnPermanentAddress').val());
    $('.IDCardCNIC').html(objEditRow.find('.hdnCNIC').val());
    $('.IDCardCellNo').html(objEditRow.find('.hdnCellNo').val());
    $('.IDCardExpiryDate').html(GetExpiryDate());
    $(".IDCardProfile").attr("src", '../Uploads/' + JSON.parse(objEditRow.find('.hdnProfileFile').val())[0]);
    $(function () {
        //$('#Print').load('http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js');

    });

    var contents = $("#IDCard").html();
    var frame1 = $('<iframe />');
    frame1[0].name = "frame1";
    frame1.css({ "position": "absolute", "top": "-1000000px" });
    $("body").append(frame1);
    var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
    frameDoc.document.open();
    //Create a new HTML document.
    frameDoc.document.write('<html><head><title>ID Card</title>');
    frameDoc.document.write('</head><body>');
    //Append the external CSS file.
    frameDoc.document.write('<link href="/Content/assets/css/PrintMaterial/IDCard.css" rel="stylesheet" type="text/css" />');
    //Append the DIV contents.
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        frame1.remove();
    }, 500);
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
        url: "/AssociateMember/GetAllTitle",
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
        url: "/AssociateMember/GetAllMemberRelations",
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
        url: "/AssociateMember/GetAllCountry",
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
        url: "/AssociateMember/GetAllProvince",
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
        url: "/AssociateMember/GetAllCity",
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
        url: "/AssociateMember/GetCurrentAllottee",
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


function GetAllMembers() {

    var request = $.ajax({
        method: "POST",
        url: "/AssociateMember/GetAllMembers",
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
        console.log(Err.message);
    }

}
function GetAllGender() {

    var request = $.ajax({
        method: "POST",
        url: "/AssociateMember/GetAllGender",
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
        url: "/AssociateMember/CreateNewAssociateMember",
        data: AssociateMember[0]
    });
    request.done(function (data) {
        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            $('#CreateMember').modal('hide');
            GetAllAssociateMembers();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function UpdateMember() {
    var request = $.ajax({
        method: "POST",
        url: "/AssociateMember/UpdateAssociateMember",
        data: AssociateMember[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Updated!');
            $('#EditMember').modal('hide');
            GetAllAssociateMembers();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function UpdateAttachment() {
    var request = $.ajax({
        method: "POST",
        url: "/AssociateMember/UpdateAttachment",
        data: AssociateMember[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Updated!');
            $('#EditAttachment').modal('hide');
            GetAllAssociateMembers();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function DeleteMember() {
    var request = $.ajax({
        method: "POST",
        url: "/AssociateMember/DeleteMember",
        data: AssociateMember[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Deleted!');
            $('#DeleteMember').modal('hide');
            GetAllAssociateMembers();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function GetAllAssociateMembers() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/AssociateMember/GetAllAssociateMembers",
        data: {}
    });
    request.done(function (data) {

        MemberList = data;
        onGetAllAssociateMembers(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
    ProgressBarHide();
}

function onGetAllAssociateMembers(data) {
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
            onGetAllAssociateMembers(MemberList);
        }
        else {
            var obj = MemberList.filter(x=> x.FirstName.toLowerCase().includes(search.toLowerCase()) ||
				x.LastName.toLowerCase().includes(search.toLowerCase()) ||
                x.MembershipNo.includes(search)
				)
            onGetAllAssociateMembers(obj);

        }
        ProgressBarHide();
    });
}


function EditMember(selector) {
    objEditRow = $(selector).closest('tr');
    AssociateMember[0].AssociateMemberId = objEditRow.find('.hdnAssociateMemberId').val();
    var MemberId = objEditRow.find('.hdnMemberId').val();
    $(".ddlMember_upd").select2().val(MemberId).trigger("change");
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


    // for attachments

    CnicFrontFile = objEditRow.find('.hdnCnicFrontFile').val();
    CnicBackFile = objEditRow.find('.hdnCnicBackFile').val();
    ProfileFile = objEditRow.find('.hdnProfileFile').val();

}

function PrintIndividualMember(selector) {
    objEditRow = $(selector).closest('tr');
    AssociateMember[0].MemberId = objEditRow.find('.hdnMemberId').val();
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
    $('.printMembers').html(objEditRow.find('.tdMembers').text());
    $('.printProfileFile').attr('src', objEditRow.find('.hdnProfileFile').val());

    // for plot binding
    var res = AllotteeList.filter(x=> x.MemberId == AssociateMember[0].MemberId);
    var divTbodyGoalFund = $(".PlotListing").html("");
    $("#PlotListing").tmpl(res).appendTo(divTbodyGoalFund);
    var i = 1;
    $('.trPlots').each(function () {
        $(this).find('td').first().text(i);
        i++;
    });
}


function GetExpiryDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = parseInt(today.getFullYear()) + 3;

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = dd + '-' + mm + '-' + yyyy

    return today;
}
