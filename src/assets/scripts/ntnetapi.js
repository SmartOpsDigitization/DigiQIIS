function getntNet() {
    var userName;
    $.ajax({
        url: "http://nitind03:8089/node/auth.js",
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        dataType: 'text',
        crossDomain: true,
        async: false,
        success: function (data) {
            userName = data.substr(data.toString().lastIndexOf("\\") + 1);
        },
        error: function (X) {
        }
    });
    return userName;
}