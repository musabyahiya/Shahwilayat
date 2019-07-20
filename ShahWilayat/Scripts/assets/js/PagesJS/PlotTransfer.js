GetRptPlotTransfer()




function GetRptPlotTransfer() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/PlotTransfer/GetRptPlotTransfer",
    });
    request.done(function (data) {

        onGetRptPlotTransfer(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}


function onGetRptPlotTransfer(data) {
    var res = JSON.parse(data);
    InitializeDevExpress(res)
}


function InitializeDevExpress(source) {
    var dataGrid = $("#gridContainer").dxDataGrid({
        dataSource: source,
        allowColumnResizing: true,
        showColumnLines: true,
        rowAlternationEnabled: false,
        showRowLines: true,
        columnsAutoWidth: true,
        showBorders: true,
        export: {
            enabled: true
        },
        onFileSaving: function (e) {
            e.fileName = getNewFileName();
        },

        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Search..."
        },
        headerFilter: {
            visible: true
        },
        columns: [{
            dataField: "PlotNo",
            caption: "Plot No",
            width: 140,
            headerFilter: {
                allowSearch: true
            }
        },
            {
                dataField: "Size",
                caption: "Size",
                width: 140,
                headerFilter: {
                    allowSearch: true
                }
            }, {
                dataField: "MembershipNo",
                caption: "Membership No",
                alignment: "left",
                width: 140,
                headerFilter: {
                    allowSearch: true
                }
            },
         {
             dataField: "FullName",
             caption: "Full Name",

             headerFilter: {
                 allowSearch: true
             }
         }, {
             dataField: "Type",
             caption: "Status",

             headerFilter: {
                 allowSearch: true
             }
         }, {
             dataField: "TransferDate",
             caption: "Allotment Date",
             alignment: "right",
             dataType: "date"
         }
        ],

        summary: {
            totalItems: [{
                column: "PlotNo",
                summaryType: "count"
            }
            // ...
            ]
        }
    }).dxDataGrid('instance');

    var applyFilterTypes = [{
        key: "auto",
        name: "Immediately"
    }, {
        key: "onClick",
        name: "On Button Click"
    }];

    var applyFilterModeEditor = $("#useFilterApplyButton").dxSelectBox({
        items: applyFilterTypes,
        value: applyFilterTypes[0].key,
        valueExpr: "key",
        displayExpr: "name",
        onValueChanged: function (data) {
            dataGrid.option("filterRow.applyFilter", data.value);
        }
    }).dxSelectBox("instance");

    $("#filterRow").dxCheckBox({
        text: "Filter Row",
        value: true,
        onValueChanged: function (data) {
            dataGrid.clearFilter();
            dataGrid.option("filterRow.visible", data.value);
            applyFilterModeEditor.option("disabled", !data.value);
        }
    });

    $("#headerFilter").dxCheckBox({
        text: "Header Filter",
        value: true,
        onValueChanged: function (data) {
            dataGrid.clearFilter();
            dataGrid.option("headerFilter.visible", data.value);
        }
    });

    function getOrderDay(rowData) {
        return (new Date(rowData.OrderDate)).getDay();
    }


    ProgressBarHide();
}



function getNewFileName() {
    return "RPT_PlotTransfer_" + GetCurrentDate();
}