GetAllDashboardData();


function GetAllDashboardData() {
    var request = $.ajax({
        method: "POST",
        url: "/Dashboard/GetAllDashboardData",
        data: {},
        beforeSend: function () {
            ShowToastr('Info', 'Getting connection', 'Sending request to server');
        },
        success: function (data) {
            ShowToastr('Warning', 'Getting data', 'Initialize binding');
            onGetAllDashboardData(data);

        },
        fail: function (jqXHR, Status) {
            ShowToastr('Error', 'Fail to load', jqXHR.responseText);
            console.log(jqXHR.responseText);
        },
        complete: function () {
            ShowToastr('Info', 'Request Completed', '');
        }
    });

}


function onGetAllDashboardData(data) {

    try {
        var res = data.split("|");
        var MembersData = JSON.parse(res[0]);
        var PaymentsData = JSON.parse(res[1]);
        var CoLData = JSON.parse(res[2]);
        var InternalDevopmentData = JSON.parse(res[3]);
        var OuterDevopmentData = JSON.parse(res[4]);
        var DemarcationChargesData = JSON.parse(res[5]);
        var PossesionChargesData = JSON.parse(res[6]);
        var AdminChargesData = JSON.parse(res[7]);
        var SecurityChargesData = JSON.parse(res[8]);
        var OtherChargesData = JSON.parse(res[9]);
        var ResidentialPlotData = JSON.parse(res[10]);
        var CommercialPlotData = JSON.parse(res[11]);
        var AmenityPlotData = JSON.parse(res[12]);


        // Members
        BindTextToSelector('.hdnTotalMembers', MembersData[0].TotalMembers);
        BindTextToSelector('.hdnRegisteredMembersLastMonth', MembersData[0].RegisteredMembersLastMonth);
        BindTextToSelector('.hdnRegisteredMembersYTD', MembersData[0].RegisteredMembersYTD);
        BindTextToSelector('.hdnWrittenOffMembersYTD', MembersData[0].WrittenOffMembersYTD);

        // Payments
        BindTextToSelector('.hdnTotalPayments', 'PKR ' + moneyFormat(PaymentsData[0].TotalPayments == null ? 0 : PaymentsData[0].TotalPayments));
        BindTextToSelector('.hdnTotalPaymentsYTD', 'PKR ' + moneyFormat(PaymentsData[0].YTDPayments == null ? 0 : PaymentsData[0].YTDPayments));
        BindTextToSelector('.hdnTotalPaymentsCurrentMonth', 'PKR ' + moneyFormat(PaymentsData[0].CurrentMonthPayments == null ? 0 : PaymentsData[0].CurrentMonthPayments));


        // Residential Plots
        BindTextToSelector('.hdnResidentialTotalPlots', ResidentialPlotData[0].TotalPlots);
        BindTextToSelector('.hdnResidentialPlotsAvailable', ResidentialPlotData[0].PlotsAvailable);
        BindTextToSelector('.hdnResidentialTotalPlotsL', ResidentialPlotData[0].TotalPlotsL);
        BindTextToSelector('.hdnResidentialTotalPlotsR', ResidentialPlotData[0].TotalPlotsR);
        BindTextToSelector('.hdnResidentialTotalPlotsA', ResidentialPlotData[0].TotalPlotsA);
        BindTextToSelector('.hdnResidentialTotalPlotsB', ResidentialPlotData[0].TotalPlotsB);
        BindTextToSelector('.hdnResidentialTotalPlotsC', ResidentialPlotData[0].TotalPlotsC);
        BindTextToSelector('.hdnResidentialTotalPlotsD', ResidentialPlotData[0].TotalPlotsD);


        // Commercial Plots
        BindTextToSelector('.hdnCommercialTotalPlots', CommercialPlotData[0].TotalPlots);
        BindTextToSelector('.hdnCommercialAvailablePlots', CommercialPlotData[0].PlotsAvailable);
        BindTextToSelector('.hdnCommercialTotalPlotsLS', CommercialPlotData[0].TotalPlotsLS);
        BindTextToSelector('.hdnCommercialTotalPlotsRS', CommercialPlotData[0].TotalPlotsRS);
        BindTextToSelector('.hdnCommercialTotalPlotsAS', CommercialPlotData[0].TotalPlotsAS);
        BindTextToSelector('.hdnCommercialTotalPlotsSB', CommercialPlotData[0].TotalPlotsSB);


        // Amenity Plots
        BindTextToSelector('.hdnAmenityEducationalLand', AmenityPlotData[0].EducationalLand);
        BindTextToSelector('.hdnAmenityPublicBuilding', AmenityPlotData[0].PublicBuilding);
        BindTextToSelector('.hdnAmenityPark', AmenityPlotData[0].Park);
        BindTextToSelector('.hdnAmenityPlayGround', AmenityPlotData[0].PlayGround);



        var lineData = {
            labels: ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [

                {
                    label: "Cost of Land",
                    backgroundColor: 'rgba(21, 134, 202, 0.6)',
                    borderColor: "#1373ad",
                    pointBackgroundColor: "#135c88",
                    pointBorderColor: "#fff",
                    data: [CoLData[0].Jan, CoLData[0].Feb, CoLData[0].Mar, CoLData[0].Apr, CoLData[0].May, CoLData[0].Jun, CoLData[0].Jul, CoLData[0].Aug, CoLData[0].Sep, CoLData[0].Oct, CoLData[0].Nov, CoLData[0].Dec]
                },
                {
                    label: "Internal Development",
                    backgroundColor: 'rgba(237, 85, 101, 0.6)',
                    borderColor: "#d43f3a",
                    pointBackgroundColor: "#a90a05",
                    pointBorderColor: "#fff",
                    data: [InternalDevopmentData[0].Jan, InternalDevopmentData[0].Feb, InternalDevopmentData[0].Mar, InternalDevopmentData[0].Apr, InternalDevopmentData[0].May, InternalDevopmentData[0].Jun, InternalDevopmentData[0].Jul, InternalDevopmentData[0].Aug, InternalDevopmentData[0].Sep, InternalDevopmentData[0].Oct, InternalDevopmentData[0].Nov, InternalDevopmentData[0].Dec]
                },
                {
                    label: "Outer Development",
                    backgroundColor: 'rgba(26, 179, 148, 0.6)',
                    borderColor: "#0a8269",
                    pointBackgroundColor: "#075444",
                    pointBorderColor: "#fff",
                    data: [OuterDevopmentData[0].Jan, OuterDevopmentData[0].Feb, OuterDevopmentData[0].Mar, OuterDevopmentData[0].Apr, OuterDevopmentData[0].May, OuterDevopmentData[0].Jun, OuterDevopmentData[0].Jul, OuterDevopmentData[0].Aug, OuterDevopmentData[0].Sep, OuterDevopmentData[0].Oct, OuterDevopmentData[0].Nov, OuterDevopmentData[0].Dec]
                },
                {
                    label: "Demarcation Charges",
                    backgroundColor: 'rgba(248, 172, 89, 0.6)',
                    borderColor: "#e4841c",
                    pointBackgroundColor: "#a25400",
                    pointBorderColor: "#fff",
                    data: [DemarcationChargesData[0].Jan, DemarcationChargesData[0].Feb, DemarcationChargesData[0].Mar, DemarcationChargesData[0].Apr, DemarcationChargesData[0].May, DemarcationChargesData[0].Jun, DemarcationChargesData[0].Jul, DemarcationChargesData[0].Aug, DemarcationChargesData[0].Sep, DemarcationChargesData[0].Oct, DemarcationChargesData[0].Nov, DemarcationChargesData[0].Dec]
                },
                {
                    label: "Possesion Charges",
                    backgroundColor: 'rgba(38, 166, 91, 0.6)',
                    borderColor: "#058c3d",
                    pointBackgroundColor: "#006b2d",
                    pointBorderColor: "#fff",
                    data: [PossesionChargesData[0].Jan, PossesionChargesData[0].Feb, PossesionChargesData[0].Mar, PossesionChargesData[0].Apr, PossesionChargesData[0].May, PossesionChargesData[0].Jun, PossesionChargesData[0].Jul, PossesionChargesData[0].Aug, PossesionChargesData[0].Sep, PossesionChargesData[0].Oct, PossesionChargesData[0].Nov, PossesionChargesData[0].Dec]
                },
                {
                    label: "Admin Charges",
                    backgroundColor: 'rgba(118, 53, 104, 0.6)',
                    borderColor: "#561c4a",
                    pointBackgroundColor: "#35112e",
                    pointBorderColor: "#fff",
                    data: [AdminChargesData[0].Jan, AdminChargesData[0].Feb, AdminChargesData[0].Mar, AdminChargesData[0].Apr, AdminChargesData[0].May, AdminChargesData[0].Jun, AdminChargesData[0].Jul, AdminChargesData[0].Aug, AdminChargesData[0].Sep, AdminChargesData[0].Oct, AdminChargesData[0].Nov, AdminChargesData[0].Dec]
                }

            ]
        };

        var lineOptions = {
            responsive: true
        };


        var ctx = document.getElementById("lineChart").getContext("2d");
        new Chart(ctx, { type: 'line', data: lineData, options: lineOptions });

        ShowToastr('Success', 'Successfully loaded', 'Data binded');
    }
    catch (e) {
        ShowToastr('Error', 'Fail to bind', 'Something went wrong in data binding');
    }





}


