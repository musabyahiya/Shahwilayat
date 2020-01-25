//$(document).ready(function () {

//    var defaultData = [{
//        text: 'Parent 1',
//        href: '#parent1',
//        tags: ['4'],
//        nodes: [{
//            text: 'Child 1',
//            href: '#child1',
//            tags: ['2'],
//            nodes: [{
//                text: 'Grandchild 1',
//                href: '#grandchild1',
//                tags: ['0']
//            }, {
//                text: 'Grandchild 2',
//                href: '#grandchild2',
//                tags: ['0']
//            }]
//        }]
//    }];


//});



GetAllFileManagement();
GetAllParents();
GetAllChilds();
AllClickFunction();
GetAllChangeFunction();
var ChildList;
var Counter = 0;
var FileManagement =
[{
    FileManagementId: 0,
    ContentName: null,
    FilePath: null,
    IsParent: 0,
    ParentId: 0,
    IsSubParent: 0,
    IsSubChild: 0,
    ParentOrder: 0,
    SubParentOrder: 0,
    SubChildOrder: 0,
    IsChildHead: 0
}]

function AllClickFunction() {
    $('.btnSaveChanges').click(function () {
        if (!validateForm(".frmFileManagement")) return;

        FileManagement[0].ParentId = $('.ddlSubChild').val() == 0 ? $('.ddlChild').val() : $('.ddlSubChild').val();
        FileManagement[0].ContentName = $('.txtContentName').val();
        FileManagement[0].SubChildOrder = $('.txtSubChildOrder').val();
        FileManagement[0].FilePath = FileUpload('.txtFilePath');
        CreateNewFileManagement();
    });



}

function CreateNewFileManagement() {
    var request = $.ajax({
        method: "POST",
        url: "/FileManagement/CreateNewFileManagement",
        data: FileManagement[0]
    });
    request.done(function (data) {
        var res = data;
        if (res == "true") {
            showSuccess('Successfully Created!');
            $('#FileManagement').modal('hide');
            $('.AppendInsideMe').html('');
            Counter++;
            GetAllFileManagement();
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}
function GetAllChangeFunction() {
    $('.ddlParent').change(function () {
        var ParentId = $(this).val();
        var obj = ChildList.filter(x=>x.ParentId == ParentId);
        onGetAllChilds(obj);
    });

    $('.ddlChild').change(function () {
        var ParentId = $(this).val();
        var obj = ChildList.filter(x=>x.ParentId == ParentId && x.IsChildHead == 1);
        onGetAllSubChilds(obj);
    });
}

function GetAllChilds() {

    var request = $.ajax({
        method: "POST",
        url: "/FileManagement/GetAllChilds",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        ChildList = res;
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function onGetAllChilds(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlChild', res);
    }
    catch (Err) {
        console.log(Err);
    }

}

function onGetAllSubChilds(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlSubChild', res);
    }
    catch (Err) {
        console.log(Err);
    }

}



function GetAllParents() {

    var request = $.ajax({
        method: "POST",
        url: "/FileManagement/GetAllParents",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        onGetAllParents(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);
    });
}

function onGetAllParents(data) {
    try {

        var res = data;
        FillDropDownByReference('.ddlParent', res);
    }
    catch (Err) {
        console.log(Err);
    }

}

function GetAllFileManagement() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/FileManagement/GetAllFileManagement",
        data: {}
    });
    request.done(function (data) {

        var res = data;
        var html = '';
        var HasToggle = Counter == 0 ? '' : 'onclick="panelToggle(this)"';
        $.each(res, function (key, value) {
            html += '<div class="col-lg-12 ParentDiv">';
            html += '<div class="ibox">';

            if (value.IsParent == 1) {
                html += '<div class="ibox-title" style="background-color:#005aa1;color:white">';
                html += ' <h6 style="color:white">' + value.ContentName + '</h6>';
                //html += '<div class="ibox-tools">';
                //html += '<a class="collapse-link" style="color:white">';
                //html += '<i class="fa fa-chevron-up" ' + HasToggle + ' ></i>';
                //html += '</a>';
                //html += '<a class="fullscreen-link" style="color:white">';
                //html += '<i class="fa fa-expand"></i>';
                //html += '</a>';
                //html += '</div>';
                html += '</div>';
            }

            html += '<div class="ibox-content">';
            html += '<div class="row">';

            var objRows = res.filter(x=>x.ParentId == value.FileManagementId);

            // bind
            $.each(objRows, function (key2, value2) {


                html += '<div class="col-lg-6">';
                html += '<div class="panel panel-info">';
                if (value2.IsSubParent == 1 && value2.ParentId == value.FileManagementId) {
                    html += '<div class="panel-heading">';
                    html += value2.ContentName;
                    html += '</div>';
                }


                var CheckNullRow = res.filter(x=> x.ParentId == value2.FileManagementId && value2.IsChildHead == 0);

                html += '<div class="panel-body" style="height: 200px;overflow: auto;">';
                html += '<table class="table">';
                if (CheckNullRow.length > 0) {

                    html += '<thead class="tblHead">';
                    html += '<tr>';
                    html += '<th>Sr No.</th>';
                    html += '<th>File Name</th>';
                    html += '<th>Action</th>';
                    html += '</tr>';
                    html += '</thead>';
                }
                html += '<tbody>';


                var objRowsChild = res.filter(x=> (x.ParentId == value2.FileManagementId) && (value2.IsSubParent == 1));

                var i = 1;
                $.each(objRowsChild, function (key3, value3) {

                    html += '<tr>';
                    if (value3.IsChildHead == 0) {

                        html += '<td>' + i + '</td>';
                        html += '<td>' + value3.ContentName + '</td>';
                        html += '<td>';
                        html += '<div class="badge badge-warning round"><a style="color:white" href="../Uploads/' + JSON.parse(value3.FilePath)[0] + '" download="" title="Download"><i class="font-medium-2 icon-line-height la la-cloud-upload"></i></a></div>';
                        //  html += '<button class="btn btn-group btn-xs btn-info" type="button"><a style="color:white" href="../Uploads/' + JSON.parse(value3.FilePath)[0] + '" download="" title="Download"><i class="fa fa-download"></i></a></button>';
                        html += '</td>';
                        i++;
                    }
                    else {
                        html += '<div class="col-lg-12">';
                        html += '<div class="panel panel-warning" >';

                        html += '<div class="panel-heading" >';
                        html += value3.ContentName;
                        html += '</div>';

                        html += '<div class="panel-body" style="height: 200px;overflow: auto;">';
                        html += '<ul class="list-group">';

                        var objRowsChildChild = res.filter(x=> (x.ParentId == value3.FileManagementId));
                        $.each(objRowsChildChild, function (key4, value4) {
                            html += '<li class="list-group-item">';
                            html += value4.ContentName;
                            //    html += '<button class="btn btn-group btn-xs btn-warning pull-right" type="button"><a style="color:white" href="../Uploads/' + JSON.parse(value4.FilePath)[0] + '" download="" title="Download"><i class="fa fa-download"></i></a></button>';
                            html += '<div class="badge badge-warning round pull-right"><a style="color:white" href="../Uploads/' + JSON.parse(value4.FilePath)[0] + '" download="" title="Download"><i class="font-medium-2 icon-line-height la la-cloud-upload"></i></a></div>';

                            html += '</li>';
                        });


                        html += '</ul>';
                        html += '</div>'; //panel-body



                        html += '</div>'; // col-lg-12
                        html += '</div>'; // panel-heading
                    }

                    html += '</tr>';

                });

                html += '</tbody>';
                html += '</table>';
                html += '</div>';
                html += '</div>';
                html += '</div>';


            });
            // bind

            html += '</div>';
            html += '</div>';

            html += '</div>';
            html += '</div>';

            html.indexOf('ibox-title') != -1 ? $('.AppendInsideMe').append(html) : '';

            html = '';

        });

        //$(".collapse").collapse()
        //   $('div.ibox-content').slideUp();
        ProgressBarHide();
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}


function panelToggle(selector) {
    var $this = $(selector);
    if ($this.hasClass('fa-chevron-up')) {
        $this.removeClass('fa-chevron-up');
        $this.addClass('fa-chevron-down');
        $this.parents('.ibox-title').siblings('.ibox-content').slideDown();
    }
    else {
        $this.parents('.ibox-title').siblings('.ibox-content').slideUp();
        $this.removeClass('fa-chevron-down');
        $this.addClass('fa-chevron-up');
    }

}