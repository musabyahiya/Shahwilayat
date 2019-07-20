AllClickFunction();
GetAllRelations();
GetAllMembers();
GetAllNominees();

var Nominee =
[{
    NomineeId: 0,
    MemberId: 0,
    RelationId: 0,
    FirstName: null,
    LastName: null,
    Dob: null,
    CNIC: null,
    CellNo: null,
    Address: null,
    AttachmentFile: null,
    FrcFile: null
}]

function AllClickFunction() {
    $('.btnSaveChanges').click(function () {
        var duplicationRelation = false;
        if (!validateForm(".frmNominee")) return;

        Nominee[0].MemberId = $('.ddlMember').val();
        Nominee[0].RelationId = $('.ddlRelation').val();
        Nominee[0].FirstName = $('.txtFirstName').val();
        Nominee[0].LastName = $('.txtLastName').val();
        Nominee[0].Dob = formatDate($('.txtDob').val());
        Nominee[0].CNIC = $('.txtCNIC').val();
        Nominee[0].CellNo = $('.txtCellNo').val();
        Nominee[0].Address = $('.txtAddress').val();
        Nominee[0].AttachmentFile = FileUpload('.txtAttachmentFile');
        Nominee[0].FrcFile = FileUpload('.txtFrcFile');

        $('.trNominee').each(function () {
            if ($(this).children('.tdRelation').trim().val() == 'Father' &&
                $(this).children('.tdRelation').trim().val() == 'Mother' &&
                $(this).children('.hdnMemberId').val() == Nominee[0].MemberId) {
                duplicationRelation = true;
            }
        });
        if (duplicationRelation) {
            showError("This Relation of selected Member is already exist.");
            return;
        }
        CreateNewNominee();
    });

    $('.btnUpdateChanges').click(function () {
        var duplicationRelation = false;
        if (!validateForm(".frmNominee_upd")) return;

        Nominee[0].MemberId = $('.ddlMember_upd').val();
        Nominee[0].RelationId = $('.ddlRelation_upd').val();
        Nominee[0].FirstName = $('.txtFirstName_upd').val();
        Nominee[0].LastName = $('.txtLastName_upd').val();
        Nominee[0].Dob = formatDate($('.txtDob_upd').val());
        Nominee[0].CNIC = $('.txtCNIC_upd').val();
        Nominee[0].CellNo = $('.txtCellNo_upd').val();
        Nominee[0].Address = $('.txtAddress_upd').val();


        $('.trNominee').each(function () {
            if ($(this).children('.tdRelation').trim().val() == 'Father' &&
                $(this).children('.tdRelation').trim().val() == 'Mother' &&
                $(this).children('.hdnMemberId').val() == Nominee[0].MemberId) {
                duplicationRelation = true;
            }
        });
        if (duplicationRelation) {
            showError("This Relation of selected Member is already exist.");
            return;
        }
        UpdateNominee();
    });

    $('.btnDelete').click(function () {
        DeleteNominee();
    });

    $('.btnUpdateAttachment').click(function () {
        if (!validateForm(".frmAttachment_upd")) return;
        Nominee[0].AttachmentFile = FileUpload('.txtAttachmentFile_upd');
        Nominee[0].FrcFile = FileUpload('.txtFrcFile_upd');
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
            showSuccess('Successfully Created!');
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

function GetAllRelations() {

    var request = $.ajax({
        method: "POST",
        url: "/Nominee/GetAllRelations",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        onGetAllRelations(res);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function onGetAllRelations(data) {
    try {
        var res = data;
        FillDropDownByReference('.ddlRelation', res);
        FillDropDownByReference('.ddlRelation_upd', res);

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


        var html = '';
        var counter = 0;

        $.each(res, function (key, value) {
            var MemberId = value.MemberId;

            if (CheckExistingMember(MemberId)) {
                html += "<div class='panel panel-default AppendedPanel'>";
                html += "<div class='panel-heading blue-heading'>";
                html += "<h4 class='panel-title'>";
                html += "<a class='accordion-toggle hdnMemberId' hdnmemberid='" + value.MemberId + "'  data-toggle='collapse' data-parent='#accordion' href='#" + value.FirstName + value.LastName + "'>";
                html += value.FullName;
                html += "</a>";
                html += "</h4>";
                html += "</div>";

                var childNominee = res.filter(x=> x.MemberId == value.MemberId);



                html += "<div id='" + value.FirstName + value.LastName + "' class='panel-collapse collapse'>";
                html += "<div class='panel-body' style='overflow: auto;'>";

                // only print one time
                html += "<table class='table table-hover' >";
                html += "<thead>";
                html += "<tr>";
                html += "<th nowrap>Sr No.</th>";
                html += "<th nowrap>Relation</th>";
                html += "<th nowrap>First Name</th>";
                html += "<th nowrap>Last Name</th>";
                html += "<th nowrap>Birth Date</th>";
                html += "<th nowrap>CNIC</th>";
                html += "<th nowrap>Cell No.</th>";
                html += "<th nowrap>Address</th>";
                html += "<th nowrap>Attachment</th>";
                html += "<th nowrap>FRC File</th>";
                html += "<th nowrap>Action</th>";
                html += "</tr>";
                html += "</thead>";
                html += "<tbody>";

                /*Binding rows Nominee*/
                var index = 1;
                $.each(childNominee, function (key3, value3) {



                    html += "<tr>";
                    html += "<input type='hidden' class='hdnNomineeId' value='" + value3.NomineeId + "' />";
                    html += "<input type='hidden' class='hdnMemberId' value='" + value3.MemberId + "' />";
                    html += "<input type='hidden' class='hdnRelationId' value='" + value3.RelationId + "' />";
                    html += "<input type='hidden' class='hdnDob' value='" + ToJavaScriptDate(value3.Dob) + "' />";
                    if (value3.AttachmentFile == "") {


                        html += "<input type='hidden' class='hdnAttachmentFile' value='' />";
                    }
                    else {
                        html += "<input type='hidden' class='hdnAttachmentFile' value='" + JSON.parse(value3.AttachmentFile)[0] + "' />";
                    }

                    if (value3.FrcFile == "")
                    {
                        html += "<input type='hidden' class='hdnFrcFile' value='' />";
                    }
                    else
                    {
                        html += "<input type='hidden' class='hdnFrcFile' value='" + JSON.parse(value3.FrcFile)[0] + "' />";
                    }

                    html += "<td>" + index + "</td>";
                    html += "<td class='tdRelation'>" + value3.Relation + "</td>";
                    html += "<td class='tdFirstName'>" + value3.FirstName + "</td>";
                    html += "<td class='tdLastName'>" + value3.LastName + "</td>";
                    html += "<td class='tdDob' nowrap>" + ToJavaScriptDate(value3.Dob) + "</td>";
                    html += "<td class='tdCNIC' nowrap>" + value3.CNIC + "</td>";
                    html += "<td class='tdCellNo'>" + value3.CellNo + "</td>";
                    html += "<td class='tdAddress small'>" + value3.Address + "</td>";

                    html += "</td>";
                    html += "<td class='project-title tdFrcFile'>";
                    if (value3.AttachmentFile == '') {
                        html += "<a  download=''  href='../Uploads/null.png'>";
                        html += "<img  class='img-responsive' src='../Uploads/null.png' >";
                        html += "</a>";
                    }
                    else {
                        html += "<a  download=''  href='../Uploads/" + JSON.parse(value3.AttachmentFile)[0] + "'   >";
                        html += "<img style='width:100px' class='img-responsive' src='../Uploads/" + JSON.parse(value3.AttachmentFile)[0] + "' >";
                        html += "</a>";
                    }
                    html += "</td>";

                    html += "<td class='project-title tdFrcFile'>";
                    if (value3.FrcFile == '') {
                        html += "<a  download=''  href='../Uploads/null.png'>";
                        html += "<img  class='img-responsive' src='../Uploads/null.png' >";
                        html += "</a>";
                    }
                    else {
                        html += "<a  download=''  href='../Uploads/" + JSON.parse(value3.FrcFile)[0] + "'   >";
                        html += "<img style='width:100px' class='img-responsive' src='../Uploads/" + JSON.parse(value3.FrcFile)[0] + "' >";
                        html += "</a>";
                    }



                    html += "<td class='project-title' nowrap=''>";
                    html += "<input type='button' onclick='EditNominee(this)' data-toggle='modal' data-target='#EditNominee' value='Edit Details' class='btn btn-group btn-xs btn-info'>&nbsp;&nbsp;";
                    html += "<input type='button' onclick='EditNominee(this)' data-toggle='modal' data-target='#EditAttachment' value='Edit Attachment' class='btn btn-group btn-xs btn-warning'>&nbsp;&nbsp;";
                    html += "<input type='button' data-toggle='modal' data-target='#DeleteNominee' onclick='EditNominee(this)' value='Delete' class='btn btn-group btn-xs btn-danger'>";
                    html += "</td>";
                    html += "</tr>";

                    index++;



                })
                /*Binding Child Nominee*/
                html += "</tbody>";
                html += "</table>";
                html += "</div>";
                html += "</div>";


                html += "</div>";

                counter == 0 ? $('.AppendInside').append(html) : $(".AppendInside:last").after($(html));;
                html = '';
                counter++;
            }
            else {
                html = '';
            }


        });
        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }

}

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
    $('.ddlMember_upd').val(objEditRow.find('.hdnMemberId').val());
    $('.ddlRelation_upd').val(objEditRow.find('.hdnRelationId').val());
    $('.txtFirstName_upd').val(objEditRow.find('.tdFirstName').text().trim());
    $('.txtLastName_upd').val(objEditRow.find('.tdLastName').text().trim());
    $('.txtDob_upd').val(objEditRow.find('.hdnDob').val());
    $('.txtCNIC_upd').val(objEditRow.find('.tdCNIC').text().trim());
    $('.txtCellNo_upd').val(objEditRow.find('.tdCellNo').text().trim());
    $('.txtAddress_upd').val(objEditRow.find('.tdAddress').text().trim());


    Nominee[0].AttachmentFile = objEditRow.find('.hdnAttachmentFile').val();
    Nominee[0].FrcFile = objEditRow.find('.hdnFrcFile').val();
}