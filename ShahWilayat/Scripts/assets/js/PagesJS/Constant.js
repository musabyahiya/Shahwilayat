PickADatePicker();

ProgressBarHide();
//DatePicker();
//DatePickerMonth();
//DatePickerMonthComplete();
DatePickerComplete();
//DatePickerYear();
//DatePickerMulti();
//stopKeyPress();
validateNumeric();
CNICFormat();

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function toggleDiv(div) {
    $(div).toggle();
}
function DisableRightClick() {
    $("body").on("contextmenu", function (e) {
        return false;
    });
}
function AllKeyPressFunctions() {
    $('.txtSearchEmp').on('keyup', function () {
        var val = $(this).val().toLowerCase();
        $('.trSPO').each(function () {
            var c = false;
            c = $(this).find('td').eq(2).text().toLowerCase().indexOf(val) != -1 || $(this).find('td').eq(3).text().toLowerCase().indexOf(val) != -1 || $(this).find('td').eq(5).text().toLowerCase().indexOf(val) != -1
            c ? $(this).show() : $(this).hide();
        });
    });
}
function formatDate(_date) {
    if (_date == null)
        return;

    if (_date.indexOf('/') != -1) {
        var retDate = _date.substr(6, 4) + '-' + _date.substr(0, 2) + '-' + _date.substr(3, 2);
        return retDate;
    }
    else {
        if (_date == '' || _date == null || _date == undefined)
            return "";

        var d = new Date(_date);
        var month = (d.getMonth() + 1);
        var date = d.getDate();

        if (month >= 1 && month <= 9)
            month = '0' + month;

        if (date >= 1 && date <= 9)
            date = '0' + date;

        return d.getFullYear() + '-' + month + '-' + date;
        //return  month + '/' + date + '/' + d.getFullYear();
    }
}

function formatDatePakFormat(_date) {
    if (_date == null)
        return;

    if (_date.indexOf('/') != -1) {
        var retDate = _date.substr(6, 4) + '-' + _date.substr(0, 2) + '-' + _date.substr(3, 2);
        return retDate;
    }
    else {
        if (_date == '' || _date == null || _date == undefined)
            return "";

        var d = new Date(_date);
        var month = (d.getMonth() + 1);
        var date = d.getDate();

        if (month >= 1 && month <= 9)
            month = '0' + month;

        if (date >= 1 && date <= 9)
            date = '0' + date;


        return date + '-' + month + '-' + d.getFullYear()
        //return  month + '/' + date + '/' + d.getFullYear();
    }
}

function MultiTagsToJson(selector) {
    var a = [];

    $.each(selector, function (index, value) {
        a.push({ Name: value });
    });
    return JSON.stringify(a);
}

function formatDate2(_date) {
    if (_date == null)
        return;

    if (_date.indexOf('/') != -1) {
        var retDate = _date.substr(6, 4) + '-' + _date.substr(0, 2) + '-' + _date.substr(3, 2);
        return retDate;
    }
    else {
        if (_date == '' || _date == null || _date == undefined)
            return "";

        var d = new Date(_date);
        var month = (d.getMonth() + 1);
        var date = d.getDate();

        if (month >= 1 && month <= 9)
            month = '0' + month;

        if (date >= 1 && date <= 9)
            date = '0' + date;

        //return d.getFullYear() + '-' + month + '-' + date;
        return month + '/' + date + '/' + d.getFullYear();
    }
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function HideDivRoleWise() {
    if (getCookie('RoleId') != "1")
        $('.ToHide').css({ "display": "none" });
}
function copyToClipboard(text) {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function BindTextToSelector(Selector, Text) {

    $(Selector).html(Text);
}
function serializeData(selector) {
    data = "";
    $(selector).find('input, select, textarea').each(function () {
        data += $(this).attr("name") + "=" + $(this).val() + "&";
    });
    return data.replace(/&$/g, "");
}

function CSS_BorderAndColor(selector, color) {
    $(selector).css("border-style", "solid");
    $(selector).css("border-weight", "5px");
    $(selector).css("border-color", color);
    $(selector).css("border-width", "1px");
}
//function getUrlVars() {
//    var vars = [], hash;
//    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
//    for (var i = 0; i < hashes.length; i++) {
//        hash = hashes[i].split('=');
//        vars.push(hash[0]);
//        vars[hash[0]] = hash[1];
//    }
//    return vars;
//}
function getUrlVars() {
    var vars = [], hash;
    var url = window.location.href;
    var check = url.includes('%20');
    if (check == true) {
        url = url.replace(/%20/g, '');
    }
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function validateForm(selector) {
    check = true;
    $(selector).find('select').each(function () {

        if ($(this).hasClass('mySelect')) {
            if (($(selector).find(this).val() == 0 || $(selector).find(this).val() == null) && this.className.includes('notrequired') == false) {
                $(this).find('.select2-selection').attr('style', 'border-color : red !important; border-style: solid');
                showError('Check All Mandatory Fields');
                check = false;
            }
            else
                $(this).attr('style', 'border-color : green !important; border-style: solid');
        }
        else {

            if (($(this).val() == 0 || $(this).val() == null) && this.className.includes('notrequired') == false) {
                CSS_BorderAndColor(this, 'red');
                showError('Check All Mandatory Fields');
                check = false;
            }
            else
                CSS_BorderAndColor(this, 'green');
        }

    });

    //$(selector).find('.select2-selection').each(function () {
    //    if (($(selector).find(this).val() == 0 || $(selector).find(this).val() == null) && this.className.includes('notrequired') == false) {
    //        $(this).find('.select2-selection').attr('style', 'border-color : red !important; border-style: solid');
    //        showError('Check All Mandatory Fields');
    //        check = false;
    //    }
    //    else
    //        $('.select2-selection').attr('style', 'border-color : green !important; border-style: solid');
    //});

    $(selector).find('input, textarea').each(function () {
        if ($(this).val() == "" && this.type != "hidden" && this.className.includes('notrequired') == false) {
            CSS_BorderAndColor(this, 'red');
            showError('Check All Mandatory Fields');
            check = false;
        }
        else
            CSS_BorderAndColor(this, 'green');
    });
    return check;
}
function moneyFormat(Value) {
    //Value = Value.toFixed(1).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    Value = Value.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"); //musab

    return Value;

}
function FillDropDownByReference(DropDownReference, res) {
    $(DropDownReference).empty().append('<option selected="selected" value="0">--Select--</option>');
    $(res).each(function () {
        $(DropDownReference).append($("<option></option>").val(this.Id).html(this.Value));
    });
}
function FillDropDownByReferenceEnum(DropDownReference, res) {

    $(res).each(function () {
        $(DropDownReference).append($("<option></option>").val(this.Id).html(this.Value));
    });
}
function FillDropDownByReferenceSearch(DropDownReference, res) {
    $(DropDownReference).empty().append('<option selected="selected" value="0">--Select--</option>');
    $(res).each(function () {
        $(DropDownReference).append($("<option></option>").val(this.Id).html(this.Value));
    });
}
function ProgressBarShow() {
    $('#cover-spin').show(0)
}


function ProgressBarHide() {
    $('#cover-spin').hide(0)
}

function cloneDiv(divToClone, divToAppend) {
    if (!validateForm(divToAppend))
        return;
    var cloned = $(divToClone).last().clone();
    resetControls(cloned);
    cloned.appendTo(divToAppend)
    DatePicker();
}

function showError(message) {
    AlertBox('Error!', message, 'error');
}

function showSuccess(message) {
    AlertBox('Success!', message, 'success');
}

function AlertBox(title, Message, type) {
    sweetAlert(title, Message, type);
}


function DatePicker() {
    $('.DatePicker').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        startDate: '2d+',
        autoclose: true
    });

}
function DatePickerMulti() {
    $('.DatePickerMulti').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        multidate: true,
        onSelect: function (date) {
            // Your CSS changes, just in case you still need them
            alert(date);
        }
    });

}
function DatePickerComplete() {
    $('.DatePickerComplete').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true
    });
}


function DatePickerMonth() {
    $('.DatePickerMonth').datepicker({
        minViewMode: 1,
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        startDate: '2d+',
        todayHighlight: true
    });
}

function DatePickerYear() {
    $('.DatePickerYear').datepicker({
        minViewMode: 'years',
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        startDate: '2d+',
        todayHighlight: true,
        format: 'yyyy'
    });
}


function DatePickerMonthComplete() {
    $('.DatePickerMonthComplete').datepicker({
        minViewMode: 1,
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        todayHighlight: true
    });
}

function removeCloneDivs(div) {
    $(div).not(':first').remove();
}

function removeSelectedDiv(child, div) {
    if ($(child).closest(div).siblings().size() != 0)
        $(child).closest(div).remove();
}

function resetControls(selector) {
    $(selector).find('input, textarea').each(function () {
        $(this).val('');
    });
    $(selector).find('select').each(function () {
        $(this).val(0).change();
    });
}

function getCommaSeparatedValues(selector) {
    returnString = "";
    $(selector).each(function () {
        if ($(this).val() != null)
            returnString += $(this).val() + ','
    });
    return returnString + "0";

}


function getCommaSeparatedValues_CheckedBoxes(selector) {
    returnString = "";
    $(selector).each(function () {
        if ($(this).prop('checked')) {
            if ($(this).val() != null)
                returnString += $(this).val() + ','
        }
    });
    return returnString + "0";
}


function validateNumeric() {
    $('.numericOnly').keydown(function (e) {
        if (e.keyCode != 8) {
            if ($(this).val().indexOf(".") > 0 && e.keyCode == 110)
                return false;

            if (!((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode == 110) || (e.keyCode == 190))) {
                return false;
            }
        }
    });
}


function paginateTable(cls, lengthPerPage) {

    var totalRows = $(cls).find('tbody tr:has(td)').length;
    var recordPerPage = lengthPerPage;
    var totalPages = Math.ceil(totalRows / recordPerPage);

    var $pages = $(cls).find('tfoot');

    $pages.html('');

    var $select = $('<tr  ><td colspan="2"><select  class="form-control" id="tableSelect"><select></td><td><button type="button" id="prevv" class="btn btn-white"><i class="fa fa-chevron-left"></i> </button><button id="nextt" type="button" class="btn btn-white"><i class="fa fa-chevron-right"></i> </button></td>  </tr>').appendTo($pages);


    for (i = 0; i < totalPages; i++) {
        $('<option value = "' + (i + 1) + '">' + 'Page: ' + (i + 1) + '</option>').appendTo('#tableSelect');
    }



    $(cls).find('tbody tr:has(td)').hide();
    var tr = $('table tbody tr:has(td)');

    for (var i = 0; i <= recordPerPage - 1; i++) {
        $(tr[i]).show();
    }


    $('#prevv').click(function () {
        if (parseInt($('#tableSelect').val()) != 1)
            $('#tableSelect').val($('#tableSelect').val() - 1).change();
    });


    $('#nextt').click(function () {
        if (!(parseInt($('#tableSelect').val()) + 1 > totalPages))
            $('#tableSelect').val(parseInt($('#tableSelect').val()) + 1).change();
    });

    $('#tableSelect').change(function (event) {
        $(cls).find('tbody tr:has(td)').hide();
        var nBegin = ($(this).val() - 1) * recordPerPage;
        var nEnd = $(this).val() * recordPerPage - 1;
        $('#recordDisp').text(nBegin + ' ' + nEnd);
        for (var i = nBegin; i <= nEnd; i++) {
            $(tr[i]).show();
        }
    });



}


function removeBlankandNulls(val) {
    if (val == '' || val == null || val == undefined)
        return '----';
    else
        return val;
}


function stopKeyPress() {
    $('.keylock').keypress(function (event) {
        event.preventDefault();
    })
}


//function FileUploadMulti(fileselector) {
//    ProgressBarShow();
//    var filename = '';
//    var isError = false;
//    var form_data = new FormData();
//    var ins = document.getElementById(fileselector).files.length;
//    if (ins <= 0) {
//        showError('No File Uploaded!');
//        ProgressBarHide();
//        return '';
//    }
//    if (files[0].size > 1048576) {
//        showError("File is too big, Maximum size is 1MB.");
//        return '';
//    };
//    for (var x = 0; x < ins; x++) {
//        form_data.append("files[]", document.getElementById(fileselector).files[x]);
//    }
//    $.ajax({
//        url: '../DatabaseFiles/Upload.php', // point to server-side PHP script 
//        dataType: 'text', // what to expect back from the PHP script
//        cache: false,
//        contentType: false,
//        processData: false,
//        data: form_data,
//        type: 'post',
//        success: function (response) {

//            filename = response;
//            return 'Musab'; // display success response from the PHP script
//        },
//        error: function (err) {
//            showError("File Upload Failure"); isError = true; // display error response from the PHP script
//        },
//    });

//    return filename;
//}

function FileUpload(fileselector) {
    ProgressBarShow();
    var fileUpload = $(fileselector).get(0);
    var files = fileUpload.files;
    var data = new FormData();
    if (files.length <= 0) {
        if (!$(fileselector).hasClass('notrequired')) {
            showError('No File Uploaded!');
        }


        ProgressBarHide();
        return '';
    }
    if (files[0].size > 1048576) {
        showError("File is too large, Maximum size is 1MB.");
        ProgressBarHide();
        return '';
    };
    var filename = '';
    var isError = false;
    for (var i = 0; i < files.length; i++) {
        data.append('file', files[i]);
    }
    $.ajax({
        url: "FileUploadHandler.ashx",
        type: "POST",
        data: data,
        async: false,
        contentType: false,
        processData: false,
        success: function (result) { filename = result },
        error: function (err) { showError("File Upload Failure"); isError = true; }
    });

    ProgressBarHide();
    return filename;
}
function FileUploadHandler(fileselector) {
    ProgressBarShow();
    var fileUpload = $(fileselector).get(0);
    var files = fileUpload.files;
    var data = new FormData();
    if (files.length <= 0) {
        showError('No File Uploaded!');
        ProgressBarHide();
        return '';
    }

    var filename = '';
    var isError = false;
    for (var i = 0; i < files.length; i++) {
        data.append(files[i].name, files[i]);
    }
    $.ajax({
        url: "UploadHandler.ashx",
        type: "POST",
        data: data,
        async: false,
        contentType: false,
        processData: false,
        success: function (result) { filename = result },
        error: function (err) { showError("File Upload Failure"); isError = true; }
    });

    ProgressBarHide();
    return filename;
}



function excelOut(selector) {
    $(selector).table2excel({
        name: "Data",
        filename: "myFileName",
        fileext: ".xls"
    });
}
function exportTableToExcel(tableID, filename) {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}
function sendPrint(selector) {
    $(selector).printThis();
}

function BindGroupByDDL() {
    //alert(HCM_ArrGroupBy.length);
    FillDropDownByReference('.ddlGroupBy', HCM_ArrGroupBy);
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}

function searchTable() {
    $(".txtSearch").keyup(function () {
        _this = this;
        // Show only matching TR, hide rest of them
        $.each($(".myTable tbody tr"), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1) {
                $(this).hide();
            }
            else {
                $(this).show();
            }
        });
    });
}
function CNICFormat() {
    $('.CNICFormat').keydown(function (event) {
        if (event.which == 8) {
            // do nothing
        }
        else {
            if ($('.CNICFormat').val().length == 5 || $('.CNICFormat').val().length == 13) {
                var a = $('.CNICFormat').val();
                a += '-';
                $('.CNICFormat').val(a);
            }
            else if ($('.CNICFormat').val().length == 15) {
                var a = $('.CNICFormat').val().slice(0, -1);
                $('.CNICFormat').val(a);
            }
        }
    });
}
//function ToJavaScriptDate(value) {
//     on in mvc5 entity
//    var pattern = /Date\(([^)]+)\)/;
//    var results = pattern.exec(value);
//    var dt = new Date(parseFloat(results[1]));
//    return (dt.getFullYear() + '-' + dt.getMonth() + 1) + "-" + dt.getDate();
//}

function ToJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate());
}

function GetCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function GetCurrentDatePakFormat() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = dd + '-' + mm + '-' + yyyy;
    return today;
}
var tableToExcelFormatted = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
	, template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
	, base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
	, format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        window.location.href = uri + base64(format(template, ctx));
        document.getElementById("dlink").download = name;
    }
})();

function GetMonth(date) {
    var d = new Date(date);
    return d.getMonth();
}


function GetYear(date) {
    var d = new Date(date);
    return d.getFullYear();
}

function GetDay(date) {
    var d = new Date(date);
    return d.getDay();
}

function nth(d) {
    if (d > 3 && d < 21) return 'th'; // thanks kennebec
    switch (d % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}


function GetCurrentTime() {
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    return time;
}
function ShowToastr(Action, Heading, Text) {
    toastr.options = {
        closeButton: true,
        progressBar: true,
        showMethod: 'slideDown',
        positionClass: "toast-top-right",
        timeOut: 4000
    };


    if (Action == 'Success') {
        toastr.success(Text, Heading);
    }
    else if (Action == 'Warning') {
        toastr.warning(Text, Heading);
    }
    else if (Action == 'Info') {
        toastr.info(Text, Heading);
    }
    else if (Action == 'Error') {
        toastr.error(Text, Heading);
    }



}

function GetAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function PickADatePicker() {
    $('.DatePicker').pickadate({
        format: 'yyyy-mm-dd',
        formatSubmit: 'yyyy-mm-dd',
        selectYears: true,
        selectMonths: true

    }

    );

}

function GetAmountInWords(num) {
    var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// https://stackoverflow.com/questions/31331062/disable-previous-dates-when-using-pickadate-js