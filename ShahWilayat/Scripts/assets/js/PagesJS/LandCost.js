
GetRptLandCostConsolidated();
var LandCostList = [];


function GetRptLandCostConsolidated() {
    ProgressBarShow();
    var request = $.ajax({
        method: "POST",
        url: "/LandCost/GetRptLandCostConsolidated",
        data: {}
    });
    request.done(function (data) {

        onGetRptLandCostConsolidated(data);
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });
}


function onGetRptLandCostConsolidated(data) {
    var res = JSON.parse(data);
    LandCostList = res;
    InitializeDevExpress(LandCostList)
}
function InitializeDevExpress(source) {
    var dataGrid = $("#gridContainer").dxDataGrid({
        dataSource: source,
        columnsAutoWidth: true,
        showBorders: true,
        export: {
            enabled: true
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
            width: 240,
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
            },
            headerFilter: {
                dataSource: [{
                    text: "Less than $3000",
                    value: ["SaleAmount", "<", 3000]
                }, {

                    text: "$3000 - $5000",
                    value: [["SaleAmount", ">=", 3000], ["SaleAmount", "<", 5000]]
                }, {

                    text: "$5000 - $10000",
                    value: [["SaleAmount", ">=", 5000], ["SaleAmount", "<", 10000]]
                }, {

                    text: "$10000 - $20000",
                    value: [["SaleAmount", ">=", 10000], ["SaleAmount", "<", 20000]]
                }, {
                    text: "Greater than $20000",
                    value: ["SaleAmount", ">=", 20000]
                }]
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