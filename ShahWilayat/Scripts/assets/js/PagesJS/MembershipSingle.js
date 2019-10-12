

GetMembershipFormSingle();
var MembershipFormSingleList;
var objEditRow;
function GetMembershipFormSingle() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/MembershipSingle/GetMembershipFormSingle",
        data: {}
    });
    request.done(function (data) {

        onGetMembershipFormSingle(data);

    });
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);

    });
}


function onGetMembershipFormSingle(data) {
    try {

        var res = JSON.parse(data);
        
        MembershipFormSingleList = res;
        var divTbodyGoalFund = $(".MembershipFormSingleListing").html("");
        $("#MembershipFormSingleListing").tmpl(res).appendTo(divTbodyGoalFund);

        var i = 1;
        $('.trMembershipFormSingle').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });
        // paginateTable('.tblNonimee', 10);
        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err.message);
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

function EditMembershipFormSingle(selector) {
    objEditRow = $(selector).closest('tr');
    MembershipFormSingle[0].MembershipFormSingleId = objEditRow.find('.hdnMembershipFormSingleId').val();
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
            onGetMembershipFormSingle(MembershipFormSingleList);
        }
        else {
            var obj = MembershipFormSingleList.filter(x=> x.FirstName.toLowerCase().includes(search.toLowerCase()) ||
				x.LastName.toLowerCase().includes(search.toLowerCase()) ||
                x.MemberName.toLowerCase().includes(search.toLowerCase()) ||
			    x.MembershipNo.toLowerCase().includes(search.toLowerCase()) ||
                x.FatherName.toLowerCase().includes(search.toLowerCase()) ||
                x.CellNo.toLowerCase().includes(search.toLowerCase())
				)
            onGetMembershipFormSingle(obj);
        }
        ProgressBarHide();
    });
}

function PrintMembershipSingle(selector) {

    objEditRow = $(selector).closest('tr');
    $('.printProfileFile').attr('src', objEditRow.find('.hdnProfileFile').val());
    $('.printNomineeProfileFile').attr('src', objEditRow.find('.hdnProfileFile').val());
    BindTextToSelector('.printReferenceNo', objEditRow.find('.hdnReferenceNo').val());
    BindTextToSelector('.printMembershipDate', formatDatePakFormat(objEditRow.find('.hdnMembershipDate').val()));
    BindTextToSelector('.printFullName', objEditRow.find('.hdnFullName').val());
    BindTextToSelector('.printFatherName', objEditRow.find('.hdnFatherName').val());
    BindTextToSelector('.printNomineeFullName', objEditRow.find('.hdnNomineeName').val());
    BindTextToSelector('.printNomineeFatherName', objEditRow.find('.hdnNomineeFatherName').val());
    BindTextToSelector('.printDob', formatDatePakFormat(objEditRow.find('.hdnDob').val()));
    BindTextToSelector('.printBirthPlace', objEditRow.find('.hdnBirthPlace').val());
    BindTextToSelector('.printNomineeDob', formatDatePakFormat(objEditRow.find('.hdnNomineeDob').val()));
    BindTextToSelector('.printNomineeBirthPlace', objEditRow.find('.hdnNomineeBirthPlace').val());

    
    BindTextToSelector('.printPermanentAddress', objEditRow.find('.hdnPermanentAddress').val());
    BindTextToSelector('.printNomineePermanentAddress', objEditRow.find('.hdnNomineePermanentAddress').val());
    BindTextToSelector('.printCNIC', objEditRow.find('.hdnCNIC').val());
    BindTextToSelector('.printNomineeCNIC', objEditRow.find('.hdnNomineeCNIC').val());
    BindTextToSelector('.printLandline', objEditRow.find('.hdnLandline').val());

    var MemberId = objEditRow.find('.hdnMemberId').val();
    $(function () {
        //$('#Print').load('http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js');

    });

    var contents = $("#PrintMembershipSingle").html();
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
    frameDoc.document.write('<link href="/Content/assets/css/PrintMaterial/MembershipSingle/MembershipSingle.css" rel="stylesheet" type="text/css" />');
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