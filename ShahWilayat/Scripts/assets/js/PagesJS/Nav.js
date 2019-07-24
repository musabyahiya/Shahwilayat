GetAllMenus()

function GetUserInfo() {

    var request = $.ajax({
        method: "POST",
        url: "../DatabaseFiles/Users.php?action=GetUserInfo",
        data: {}
    });
    request.done(function (data) {

        onGetUserInfo(data);

    });
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);

    });
}

function onGetUserInfo(data) {
    try {

        var res = JSON.parse(data);
        BindTextToSelector('.lblUserName', res[0].FirstName);

    }
    catch (Err) {
        console.log(Err);
    }

}
function GetAllMenus() {

    var request = $.ajax({
        method: "POST",
        url: "/Menus/GetAllMenus",
        data: {}
    });
    request.done(function (data) {
        var res = data;
        onGetAllMenus(res);

    });
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);

    });
}

function onGetAllMenus(data) {
    try {
        var res = data;
        if (res.length == 0) {
            //window.location.href = "../Login.php";
        }

        var html = '';
        $.each(res, function (key, value) {

            if (value.IsParent == 1) {
                html += '<li class="nav-item has-sub">';
                html += '<a href="#">';
                html += '<i class="' + value.Icon + '"></i>';
                html += '<span class="menu-title">' + value.MenuItemName + '</span>';
                html += '</a>';

                var childMenus = res.filter(x=> x.ParentId == value.MenuItemId);
                html += '<ul class="menu-content">';
                /*Binding Child Menus*/
                $.each(childMenus, function (key2, value2) {
                    html += '<li>';
                    html += '<a href="' + value2.MenuItemURL + '" class="menu-item">' + value2.MenuItemName + '</a>';
                    html += '</li>';
                })
                /*Binding Child Menus*/
                html += '</ul>';
                html += '</li>';
            }
        });
      
        $(".AppendInside").append(html);
    }
    catch (Err) {
        console.log(Err);
    }

}


