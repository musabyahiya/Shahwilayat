GetAllLetters();
GetAllClickFunction();
function GetAllClickFunction()

{
    $('.btnPrintPossessionOrder').click(function () {

        var contents = $("#tblPossesionOrder").html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title>Possession Order</title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.
        frameDoc.document.write('<link href="/Content/css/PrintMaterial/Letters/PossessionOrder.css" rel="stylesheet" type="text/css" />');
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

    $('.btnPrintPhysicalPossessionOrder').click(function () {

        var contents = $("#tblPhysicalPossesionOrder").html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title>Possession Order</title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.
        frameDoc.document.write('<link href="/Content/css/PrintMaterial/Letters/PhysicalPossessionOrder.css" rel="stylesheet" type="text/css" />');
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

    $('.btnPrintTransferOrder').click(function () {

        var contents = $("#tblTransferOrder").html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title>Transfer Order</title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.
        frameDoc.document.write('<link href="/Content/css/PrintMaterial/Letters/TransferOrder.css" rel="stylesheet" type="text/css" />');
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
function GetAllLetters() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/Letters/GetAllLetters",
        data: {}
    });
    request.done(function (data) {

        var res = JSON.parse(data);
        onGetAllLetters(res);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}

function onGetAllLetters(data) {
    try {

        var res = data;
        var divTbodyGoalFund = $(".LettersListing").html("");
        $("#LettersListing").tmpl(res).appendTo(divTbodyGoalFund);

        var i = 1;
        $('.trLetters').each(function () {
            $(this).find('td').first().text(i);
            i++;
        });

        ProgressBarHide();
    }
    catch (Err) {
        console.log(Err);
    }

}
