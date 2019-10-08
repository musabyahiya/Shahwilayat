AllClickFunction();
GetAllRelation();
GetAllMembers();
GetAllNominees();
GetAllMemberRelation();
GetAllTitle();
SearchTable();
var NomineeList;

var ProfileFile;
var FrcFile;
var CnicFront;
var CnicBack;
var BirthCertificate;
var GuardianCertificate;
var DeathCertificate;

var Nominee =
[{
    NomineeId: 0,
    MemberId: 0,
    TitleId: 0,
    MemberRelationId: 0,
    RelationId: 0,
    FirstName: null,
    LastName: null,
    FatherName: null,
    Dob: null,
    BirthPlace: null,
    CNIC: null,
    CellNo: null,
    Address: null,
    CnicFront: null,
    CnicBack: null,
    ProfileFile: null,
    BirthCertificate: null,
    FrcFile: null,
    HereshipCertificate: null,
    GuardianCertificate: null,
    DeathCertificate: null
}]

function AllClickFunction() {
    $('.btnSaveChanges').click(function () {
        var duplicationRelation = false;
        if (!validateForm(".frmNominee")) return;

        Nominee[0].MemberId = $('.ddlMember').val();
        Nominee[0].TitleId = $('.ddlTitle').val();
        Nominee[0].MemberRelationId = $('.ddlMemberRelation').val();
        Nominee[0].RelationId = $('.ddlRelation').val();
        Nominee[0].MemberRelation = $('.ddlMemberRelation').val();

        Nominee[0].FirstName = $('.txtFirstName').val();
        Nominee[0].LastName = $('.txtLastName').val();
        Nominee[0].FatherName = $('.txtFatherName').val();
        Nominee[0].Dob = $('.txtDob').val();
        Nominee[0].BirthPlace = $('.txtBirthPlace').val();
        Nominee[0].CNIC = $('.txtCNIC').val();
        Nominee[0].CellNo = $('.txtCellNo').val();
        Nominee[0].Address = $('.txtAddress').val();
        Nominee[0].ProfileFile = FileUpload('.txtProfileFile');
        Nominee[0].FrcFile = FileUpload('.txtFrcFile');
        Nominee[0].CnicFront = FileUpload('.txtCnicFront');
        Nominee[0].CnicBack = FileUpload('.txtCnicBack');
        Nominee[0].HereshipCertificate = FileUpload('.txtHereshipCertificate');
        Nominee[0].BirthCertificate = FileUpload('.txtBirthCertificate');
        Nominee[0].GuardianCertificate = FileUpload('.txtGuardianCertificate');
        Nominee[0].DeathCertificate = FileUpload('.txtDeathCertificate');


        //$('.trNominee').each(function () {
        //    if ($(this).children('.tdRelation').trim().val() == 'Father' &&
        //        $(this).children('.tdRelation').trim().val() == 'Mother' &&
        //        $(this).children('.hdnMemberId').val() == Nominee[0].MemberId) {
        //        duplicationRelation = true;
        //    }
        //});
        //if (duplicationRelation) {
        //    showError("This Relation of selected Member is already exist.");
        //    return;
        //}
        CreateNewNominee();
    });

    $('.btnUpdateChanges').click(function () {

        if (!validateForm(".frmNominee_upd")) return;

        Nominee[0].MemberId = $('.ddlMember_upd').val();
        Nominee[0].TitleId = $('.ddlTitle_upd').val();
        Nominee[0].MemberRelationId = $('.ddlMemberRelation_upd').val();
        Nominee[0].RelationId = $('.ddlRelation_upd').val();
        Nominee[0].MemberRelation = $('.ddlMemberRelation_upd').val();
        Nominee[0].FirstName = $('.txtFirstName_upd').val();
        Nominee[0].LastName = $('.txtLastName_upd').val();
        Nominee[0].FatherName = $('.txtFatherName_upd').val();
        Nominee[0].Dob = $('.txtDob_upd').val();
        Nominee[0].BirthPlace = $('.txtBirthPlace_upd').val();
        Nominee[0].CNIC = $('.txtCNIC_upd').val();
        Nominee[0].CellNo = $('.txtCellNo_upd').val();
        Nominee[0].Address = $('.txtAddress_upd').val();

        UpdateNominee();
    });

    $('.btnDelete').click(function () {
        DeleteNominee();
    });

    $('.btnUpdateAttachment').click(function () {
     

        Nominee[0].ProfileFile = FileUpload('.txtProfileFile_upd') == ''? ProfileFile : FileUpload('.txtProfileFile_upd');
        Nominee[0].FrcFile = FileUpload('.txtFrcFile_upd') == '' ? FrcFile : FileUpload('.txtFrcFile_upd');
        Nominee[0].CnicFront = FileUpload('.txtCnicFront_upd') == '' ? CnicFront : FileUpload('.txtCnicFront_upd');
        Nominee[0].CnicBack = FileUpload('.txtCnicBack_upd') == '' ? CnicBack : FileUpload('.txtCnicBack_upd');
        Nominee[0].HereshipCertificate = FileUpload('.txtHereshipCertificate_upd') == '' ? HereshipCertificate : FileUpload('.txtHereshipCertificate_upd');
        Nominee[0].BirthCertificate = FileUpload('.txtBirthCertificate_upd') == '' ? BirthCertificate : FileUpload('.txtBirthCertificate_upd');
        Nominee[0].GuardianCertificate = FileUpload('.txtGuardianCertificate_upd') == '' ? GuardianCertificate : FileUpload('.txtGuardianCertificate_upd');
        Nominee[0].DeathCertificate = FileUpload('.txtDeathCertificate_upd') == '' ? DeathCertificate : FileUpload('.txtDeathCertificate_upd');
        UpdateAttachment();
    });


}

function CreateNewNominee() {
    var request = $.ajax({
        method: "POST",
        url: "/Nominee/CreateNewNominee",
        data: Nominee[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            $('#CreateNominee').modal('hide');
            GetAllNominees();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function UpdateNominee() {
    var request = $.ajax({
        method: "POST",
        url: "/Nominee/UpdateNominee",
        data: Nominee[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Updated!');
            $('#EditNominee').modal('hide');
            GetAllNominees();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function DeleteNominee() {
    var request = $.ajax({
        method: "POST",
        url: "/Nominee/DeleteNominee",
        data: { NomineeId: Nominee[0].NomineeId }
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Updated!');
            $('#DeleteNominee').modal('hide');
            GetAllNominees();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function UpdateAttachment() {
    var request = $.ajax({
        method: "POST",
        url: "/Nominee/UpdateAttachment",
        data: Nominee[0]
    });
    request.done(function (data) {

        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            $('#EditAttachment').modal('hide');
            GetAllNominees();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}
function GetAllMembers() {

    var request = $.ajax({
        method: "POST",
        url: "/Nominee/GetAllMembers",
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

function GetAllRelation() {

    var request = $.ajax({
        method: "POST",
        url: "/Nominee/GetAllRelation",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        onGetAllRelation(res);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function onGetAllRelation(data) {
    try {
        var res = data;
        FillDropDownByReference('.ddlRelation', res);
        FillDropDownByReference('.ddlRelation_upd', res);

    }
    catch (Err) {
        console.log(Err);
    }
}





function GetAllMemberRelation() {

    var request = $.ajax({
        method: "POST",
        url: "/Nominee/GetAllMemberRelations",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        onGetAllMemberRelation(res);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function onGetAllMemberRelation(data) {
    try {
        var res = data;
        FillDropDownByReference('.ddlMemberRelation', res);
        FillDropDownByReference('.ddlMemberRelation_upd', res);

    }
    catch (Err) {
        console.log(Err);
    }
}

function GetAllTitle() {

    var request = $.ajax({
        method: "POST",
        url: "/Nominee/GetAllTitle",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        onGetAllTitle(res);
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
        console.log(Err);
    }
}
function GetAllNominees() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/Nominee/GetAllNominees",
        data: {}
    });
    request.done(function (data) {

        onGetAllNominees(data);

    });
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);

    });
}


function onGetAllNominees(data) {
    try {

        var res = data;
        NomineeList = res;
        var divTbodyGoalFund = $(".NomineeListing").html("");
        $("#NomineeListing").tmpl(res).appendTo(divTbodyGoalFund);

        var i = 1;
        $('.trNominee').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });

        divTbodyGoalFund = $(".NomineeListingExport").html("");
        $("#NomineeListingExport").tmpl(res).appendTo(divTbodyGoalFund);
        var j = 1;
        $('.trNomineeExport').each(function () {
            $(this).find('td').first().text(j);
            j++;
        });
        // paginateTable('.tblNonimee', 10);
        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err.message);
    }

}
//function onGetAllNominees(data) {
//    try {

//        var res = data;


//        var html = '';
//        var counter = 0;

//        $.each(res, function (key, value) {
//            var MemberId = value.MemberId;

//            if (CheckExistingMember(MemberId)) {
//                html += "<div class='panel panel-default AppendedPanel'>";
//                html += "<div class='panel-heading blue-heading'>";
//                html += "<h4 class='panel-title'>";
//                html += "<a class='accordion-toggle hdnMemberId' hdnmemberid='" + value.MemberId + "'  data-toggle='collapse' data-parent='#accordion' href='#" + value.FirstName + value.LastName + "'>";
//                html += value.FullName;
//                html += "</a>";
//                html += "</h4>";
//                html += "</div>";

//                var childNominee = res.filter(x=> x.MemberId == value.MemberId);



//                html += "<div id='" + value.FirstName + value.LastName + "' class='panel-collapse collapse'>";
//                html += "<div class='panel-body' style='overflow: auto;'>";

//                // only print one time
//                html += "<table class='table table-hover' >";
//                html += "<thead>";
//                html += "<tr>";
//                html += "<th nowrap>Sr No.</th>";
//                html += "<th nowrap>Relation</th>";
//                html += "<th nowrap>First Name</th>";
//                html += "<th nowrap>Last Name</th>";
//                html += "<th nowrap>Birth Date</th>";
//                html += "<th nowrap>CNIC</th>";
//                html += "<th nowrap>Cell No.</th>";
//                html += "<th nowrap>Address</th>";
//                html += "<th nowrap>Attachment</th>";
//                html += "<th nowrap>FRC File</th>";
//                html += "<th nowrap>Action</th>";
//                html += "</tr>";
//                html += "</thead>";
//                html += "<tbody>";

//                /*Binding rows Nominee*/
//                var index = 1;
//                $.each(childNominee, function (key3, value3) {



//                    html += "<tr>";
//                    html += "<input type='hidden' class='hdnNomineeId' value='" + value3.NomineeId + "' />";
//                    html += "<input type='hidden' class='hdnMemberId' value='" + value3.MemberId + "' />";
//                    html += "<input type='hidden' class='hdnRelationId' value='" + value3.RelationId + "' />";
//                    html += "<input type='hidden' class='hdnDob' value='" + ToJavaScriptDate(value3.Dob) + "' />";
//                    if (value3.AttachmentFile == "") {


//                        html += "<input type='hidden' class='hdnAttachmentFile' value='' />";
//                    }
//                    else {
//                        html += "<input type='hidden' class='hdnAttachmentFile' value='" + JSON.parse(value3.AttachmentFile)[0] + "' />";
//                    }

//                    if (value3.FrcFile == "")
//                    {
//                        html += "<input type='hidden' class='hdnFrcFile' value='' />";
//                    }
//                    else
//                    {
//                        html += "<input type='hidden' class='hdnFrcFile' value='" + JSON.parse(value3.FrcFile)[0] + "' />";
//                    }

//                    html += "<td>" + index + "</td>";
//                    html += "<td class='tdRelation'>" + value3.Relation + "</td>";
//                    html += "<td class='tdFirstName'>" + value3.FirstName + "</td>";
//                    html += "<td class='tdLastName'>" + value3.LastName + "</td>";
//                    html += "<td class='tdDob' nowrap>" + ToJavaScriptDate(value3.Dob) + "</td>";
//                    html += "<td class='tdCNIC' nowrap>" + value3.CNIC + "</td>";
//                    html += "<td class='tdCellNo'>" + value3.CellNo + "</td>";
//                    html += "<td class='tdAddress small'>" + value3.Address + "</td>";

//                    html += "</td>";
//                    html += "<td class='project-title tdFrcFile'>";
//                    if (value3.AttachmentFile == '') {
//                        html += "<a  download=''  href='../Uploads/null.png'>";
//                        html += "<img  class='img-responsive' src='../Uploads/null.png' >";
//                        html += "</a>";
//                    }
//                    else {
//                        html += "<a  download=''  href='../Uploads/" + JSON.parse(value3.AttachmentFile)[0] + "'   >";
//                        html += "<img style='width:100px' class='img-responsive' src='../Uploads/" + JSON.parse(value3.AttachmentFile)[0] + "' >";
//                        html += "</a>";
//                    }
//                    html += "</td>";

//                    html += "<td class='project-title tdFrcFile'>";
//                    if (value3.FrcFile == '') {
//                        html += "<a  download=''  href='../Uploads/null.png'>";
//                        html += "<img  class='img-responsive' src='../Uploads/null.png' >";
//                        html += "</a>";
//                    }
//                    else {
//                        html += "<a  download=''  href='../Uploads/" + JSON.parse(value3.FrcFile)[0] + "'   >";
//                        html += "<img style='width:100px' class='img-responsive' src='../Uploads/" + JSON.parse(value3.FrcFile)[0] + "' >";
//                        html += "</a>";
//                    }



//                    html += "<td class='project-title' nowrap=''>";
//                    html += "<input type='button' onclick='EditNominee(this)' data-toggle='modal' data-target='#EditNominee' value='Edit Details' class='btn btn-group btn-xs btn-info'>&nbsp;&nbsp;";
//                    html += "<input type='button' onclick='EditNominee(this)' data-toggle='modal' data-target='#EditAttachment' value='Edit Attachment' class='btn btn-group btn-xs btn-warning'>&nbsp;&nbsp;";
//                    html += "<input type='button' data-toggle='modal' data-target='#DeleteNominee' onclick='EditNominee(this)' value='Delete' class='btn btn-group btn-xs btn-danger'>";
//                    html += "</td>";
//                    html += "</tr>";

//                    index++;



//                })
//                /*Binding Child Nominee*/
//                html += "</tbody>";
//                html += "</table>";
//                html += "</div>";
//                html += "</div>";


//                html += "</div>";

//                counter == 0 ? $('.AppendInside').append(html) : $(".AppendInside:last").after($(html));;
//                html = '';
//                counter++;
//            }
//            else {
//                html = '';
//            }


//        });
//        ProgressBarHide();
//    }
//    catch (Err) {
//        console.log(Err);
//    }

//}



function CheckExistingMember(MemberId) {
    var bool = true;
    $('.AppendedPanel').find('.hdnMemberId').each(function () {
        if (MemberId == $(this).attr('hdnmemberid')) {
            bool = false;
        }
    })

    return bool;
}

function EditNominee(selector) {
    objEditRow = $(selector).closest('tr');
    Nominee[0].NomineeId = objEditRow.find('.hdnNomineeId').val();
    var MemberId = objEditRow.find('.hdnMemberId').val();
    $('.ddlTitle_upd').val(objEditRow.find('.hdnTitleId').val());
    $('.ddlMember_upd').select2().val(MemberId).trigger("change");
    $('.ddlRelation_upd').val(objEditRow.find('.hdnRelationId').val());
    $('.ddlMemberRelation_upd').val(objEditRow.find('.hdnMemberRelationId').val());
    $('.txtFirstName_upd').val(objEditRow.find('.hdnFirstName').val());
    $('.txtLastName_upd').val(objEditRow.find('.hdnLastName').val());
    $('.txtFatherName_upd').val(objEditRow.find('.hdnFatherName').val());
    $('.txtDob_upd').val(objEditRow.find('.hdnDob').val());
    $('.txtBirthPlace_upd').val(objEditRow.find('.hdnBirthPlace').val());
    $('.txtCNIC_upd').val(objEditRow.find('.hdnCNIC').val());
    $('.txtCellNo_upd').val(objEditRow.find('.hdnCellNo').val());
    $('.txtAddress_upd').val(objEditRow.find('.hdnAddress').val());


    ProfileFile = objEditRow.find('.hdnProfileFile').val();
    FrcFile = objEditRow.find('.hdnFrcFile').val();
    CnicFront = objEditRow.find('.hdnCnicFront').val();
    CnicBack = objEditRow.find('.hdnCnicBack').val();
    HereshipCertificate = objEditRow.find('.hdnHereshipCertificate').val();
    BirthCertificate = objEditRow.find('.hdnBirthCertificate').val();
    GuardianCertificate = objEditRow.find('.hdnGuardianCertificate').val();
    DeathCertificate = objEditRow.find('.hdnDeathCertificate').val();

}

function SearchTable() {
    $(".txtSearch").keyup(function () {
        ProgressBarShow();
        _this = this;

        var search = $(_this).val();

        if (search == '') {
            onGetAllNominees(NomineeList);
        }
        else {
            var obj = NomineeList.filter(x=> x.FirstName.toLowerCase().includes(search.toLowerCase()) ||
				x.LastName.toLowerCase().includes(search.toLowerCase()) ||
                x.MemberName.toLowerCase().includes(search.toLowerCase()) ||
			    x.MembershipNo.toLowerCase().includes(search.toLowerCase()) ||
                x.FatherName.toLowerCase().includes(search.toLowerCase()) ||
                x.CellNo.toLowerCase().includes(search.toLowerCase())
				)
            onGetAllNominees(obj);
        }
        ProgressBarHide();
    });
}