$(document).ready(function () {
    $("#testButton").click(function () {
        $.ajax({
            type: "POST",
            url: "/rssWeb/DataServiceServlet",
            data: "clientPage=index&&serviceRequest=<BasicDAS><Correct_Info pageSize='20' pageNo='1'/></BasicDAS>",
            dataType: "xml",
            success: function (data, textStatus, jqXHR) {
                alert(data)
                alert(textStatus)
                alert(jqXHR)
            }
        })
    })
})