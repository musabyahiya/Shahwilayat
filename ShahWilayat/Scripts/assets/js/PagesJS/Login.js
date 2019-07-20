AllClickFunction();
KeyEnter();


function AllClickFunction() {
    $('.btnLogin').click(function () {

        if (!validateForm('.frmLogin'))
            return;
        var Email = $('.txtEmail').val();
        var Password = $('.txtPassword').val();
        Login(Email, Password);
    });
}


function ButtonLoad() {
    var l = $('.ladda-button-demo').ladda();

    l.click(function () {
        // Start loading
        l.ladda('start');

        // Timeout example
        // Do something in backend and then stop ladda
        setTimeout(function () {
            l.ladda('stop');
        }, 12000)

    });

}



function Login(Email, Password) {
    var request = $.ajax({
        method: "POST",
        url: "/Login/Login",
        data: { "Email": Email, "Password": Password }
    });
    request.done(function (data) {
        if (data == "True") {
            window.location.href = "/Dashboard";
        }
        else {
            showError('Incorrect Email or Password!');
        }
    });
    request.fail(function (jqXHR, Status) {
        console.log(jqXHR.responseText);

    });

}
function KeyEnter() {
    $(document).keypress(function (e) {
        if (e.which == 13) {
            $(".btnLogin").click();
        }
    });
}