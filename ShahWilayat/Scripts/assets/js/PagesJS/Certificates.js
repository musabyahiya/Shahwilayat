GetAllCertificates();
GetAllPlotTransfer();
AllClickFunction();

var PlotTransfer = [];
var objEditRow;
var AllotmentOrderList = [];
function AllClickFunction() {
    $('.btnPrintAllotmentOrder').click(function () {
        var contents = $("#tblAllotmentOrder").html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title>Allotment Order</title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.
        frameDoc.document.write('<link href="/Content/css/PrintMaterial/Certificates/AllotmentOrder/Allotment-Order.css" rel="stylesheet" type="text/css" />');
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


    $('.btnPrintPAL').click(function () {

        var contents = $("#tblPAL").html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title>Provisional Allotment Order</title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.
        frameDoc.document.write('<link href="/Content/css/PrintMaterial/Certificates/PAL/Provisional-Allotment-Order.css" rel="stylesheet" type="text/css" />');
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


    $('.btnPrintShared').click(function () {

        var contents = $("#tblShared").html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title>Share Certificate</title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.
        frameDoc.document.write('<link href="/Content/css/PrintMaterial/Certificates/ShareCertificate/Share.css" rel="stylesheet" type="text/css" />');
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
    $('.btnPrintSharedBack').click(function () {

        var contents = $("#tblSharedBack").html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title>Provisional Allotment Order</title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.
        frameDoc.document.write('<link href="/Content/css/PrintMaterial/Certificates/ShareCertificate/Shared-Back.css" rel="stylesheet" type="text/css" />');
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
function GetAllCertificates() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/Certificates/GetAllCertificates",
        data: {}
    });
    request.done(function (data) {

        onGetAllCertificates(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllCertificates(data) {
    try {

        var res = data;
        var divTbodyGoalFund = $(".CertificateListing").html("");
        $("#CertificateListing").tmpl(res).appendTo(divTbodyGoalFund);

        var i = 1;
        $('.trCertificate').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });

        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }

}


function GetAllPlotTransfer() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/Certificates/GetAllPlotTransfer",
        data: {}
    });
    request.done(function (data) {

        var res = JSON.parse(data);
        PlotTransfer = res;
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllPlotTransfer(data) {
    try {

        var res = data;
        var divTbodyGoalFund = $(".SharedBackListing").html("");
        $("#SharedBackListing").tmpl(res).appendTo(divTbodyGoalFund);

        var i = 1;
        $('.trSharedBack').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });

        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }

}

function PopulateBackSide(selector) {
    objEditRow = $(selector).closest('tr');
    var PlotId = objEditRow.find('.hdnPlotId').val();
    var MemberId = objEditRow.find('.hdnMemberId').val();
    var obj = PlotTransfer.filter(x=> x.PlotId == PlotId);
    onGetAllPlotTransfer(obj);
}


function PopulateCertificates(selector) {
    objEditRow = $(selector).closest('tr');
    BindTextToSelector('.printAllotmentOrderNo', objEditRow.find('.hdnAllotmentOrderNo').val());
    BindTextToSelector('.printAllotmentOrderDate', objEditRow.find('.hdnAllotmentOrderDate').val());
    BindTextToSelector('.printGender', objEditRow.find('.hdnGender').val() == 'Male' ? 'Mr.' : 'Miss');
    BindTextToSelector('.printFullName', objEditRow.find('.tdFullName').text());
    BindTextToSelector('.printFatherName', objEditRow.find('.hdnFatherName').val());
    BindTextToSelector('.printCnic', objEditRow.find('.hdnCnic').val());
    BindTextToSelector('.printPresentAddress', objEditRow.find('.hdnPresentAddress').val());
    BindTextToSelector('.printPlotNo', objEditRow.find('.tdPlotNo').text());
    BindTextToSelector('.printSize', objEditRow.find('.tdSize').text() + ' Sqyd');
    BindTextToSelector('.printPlotType', objEditRow.find('.tdPlotType').text());
    BindTextToSelector('.printAccountNo', objEditRow.find('.hdnAccountNo').val());
    $('.printProfileFile').attr('src', '/Uploads/' + objEditRow.find('.hdnProfileFile').val());



    // PAL
    BindTextToSelector('.printProvisionalAllotmentNo', objEditRow.find('.hdnProvisionalAllotmentNo').val());
    BindTextToSelector('.printProvisionalAllotmentDate', objEditRow.find('.hdnProvisionalAllotmentDate').val());
    BindTextToSelector('.printShareCertificateNo', objEditRow.find('.hdnShareCertificateNo').val());
    BindTextToSelector('.printTitle', objEditRow.find('.hdnGender').val() == 'Male' ? 'Dear Sir,' : 'Dear Madam,');
    // PAL

    // Share
    BindTextToSelector('.printShareDay', GetDay(objEditRow.find('.hdnShareCertificateDate').val()) + nth(GetDay(objEditRow.find('.hdnShareCertificateDate').val())));
    BindTextToSelector('.printShareMonth', months[GetMonth(objEditRow.find('.hdnShareCertificateDate').val())]);
    BindTextToSelector('.printShareYear', GetYear(objEditRow.find('.hdnShareCertificateDate').val()));
    // Share
}

function HideAccountNo() {
    $('.tdAccountNoBackSide').css('display', 'none');
}

function ShowAccountNo() {
    $('.tdAccountNoBackSide').css('display', 'block');
}