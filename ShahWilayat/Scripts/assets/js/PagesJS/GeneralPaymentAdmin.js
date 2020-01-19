$(window).on("load", function () {
    GeneralPaymentAdmin();
});


function GeneralPaymentAdmin() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/GeneralPaymentAdmin/GetRptGetPaymentAmountGeneralAdmin",
    });
    request.done(function (data) {

        onGeneralPaymentAdmin(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}


function onGeneralPaymentAdmin(data) {
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
            dataField: "PaymentCategory",
            caption: "Category",
            width: 140,
            headerFilter: {
                allowSearch: true
            }
        },
            {
                dataField: "MembershipNo",
                caption: "Membership No",
                width: 140,
                headerFilter: {
                    allowSearch: true
                }
            }, {
                dataField: "Size",
                caption: "Plot Size",
                alignment: "left",
                width: 140,
                headerFilter: {
                    allowSearch: true
                }
            },
        {
            dataField: "PlotNo",
            caption: "Plot No",
            width: 140,
            headerFilter: {
                allowSearch: true
            }
        }, {
            dataField: "FullName",
            caption: "Full Name",

            headerFilter: {
                allowSearch: true
            }
        }, {
            dataField: "PaidAmount",
            caption: "Paid Amount (PKR)",
            alignment: "right",
            format: "currency",

            editorOptions: {
                format: "currency",
                showClearButton: true
            }
        }, {
            dataField: "PaidPercent",
            caption: "Paid %",
            width: 140,
            headerFilter: {
                groupInterval: 20
            }
        },
        {
            dataField: "RemainingPercent",
            caption: "Remaining %",
            alignment: "right",
            width: 140,
            headerFilter: {
                groupInterval: 10000
            }
        }],
        summary: {
            totalItems: [{
                column: "FullName",
                summaryType: "count"
            }, {
                column: "PaidAmount",
                summaryType: "sum",
                valueFormat: "currency"
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
    return "RPT_GeneralPaymentAdmin_" + GetCurrentDate();
}