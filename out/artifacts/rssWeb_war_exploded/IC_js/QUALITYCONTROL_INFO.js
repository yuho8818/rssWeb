/**
 *
 */

$(document).ready(function () {

    prepare();

    /*设置编号*/
    $("td.am-text-center").each(function () {
        var indexxx = $(this).closest('tr').index();
        $(this).text(indexxx);
    });


    /*全选*/
    $("#check-all").click(function () {

        $("input[type=checkbox]").each(function () {
            if (this.id != "check-all") {
                this.checked = document.getElementById("check-all").checked;
            }
        })
        //var cc = $("input[type=checkbox][id!=check-all]").attar("checked");
        //$("#check-all").attr("checked",cc);

        $("#hidden_check").attr("checked", false);
    })


    /*查询*/
    $("#dept_list_search").click(function () {
        var pageNo = 1;
        search(pageNo);
    })


    /*删除所选*/
    $("#button-delete").click(function () {
        alert("删除！")
        $("#delete_confirm").modal();
        // $("#delete_sure").click(function () {
            $("input[type=checkbox]").each(function () {
                    if (this.checked && this.id != "check-all") {//$(this).is(':checked')
                        var tr = $(this).closest('tr');
                        var QUALITYCONTROL_INFOUID="";
                        var monotiorProject="";
                        var monotiorMethod="";
                        var deadline="";
                        var partDept="";
                        var evaluateDateTime="";
                        var amount="";
                        var executiveDirector="";
                        var remark="";

                        $(tr).find("td").each(function () {
                            var x = $(this).text().split("\n")[0];
                            if(x=="null"){
                                x=""
                            }
                            switch ($(this).index()) {
                                case 2:
                                    QUALITYCONTROL_INFOUID=x;
                                    break;
                                case 3:
                                    monotiorProject=x;
                                    break;
                                case 4:
                                    monotiorMethod=x;
                                    break;
                                case 5:
                                    deadline=x;
                                    break;
                                case 6:
                                    partDept=x;
                                    break;
                                case 7:
                                    evaluateDateTime=x;
                                    break;
                                case 8:
                                    amount=x;
                                    break;
                                case 9:
                                    executiveDirector=x;
                                    break;
                                case 10:
                                    remark=x;
                                    break;
                            }
                        })
                        var request = "<BasicDAS><QUALITYCONTROL_INFO operation='delete'><QUALITYCONTROL_INFOUID>" + QUALITYCONTROL_INFOUID + "</QUALITYCONTROL_INFOUID>"
                            +"<monotiorProject>"+monotiorProject+"</monotiorProject>"
                            +"<monotiorMethod>"+monotiorMethod+"</monotiorMethod>"
                            +"<deadline>"+deadline+"</deadline>"
                            +"<partDept>"+partDept+"</partDept>"
                            +"<evaluateDateTime>"+evaluateDateTime+"</evaluateDateTime>"
                            +"<amount>"+amount+"</amount>"
                            +"<executiveDirector>"+executiveDirector+"</executiveDirector>"
                            +"<remark>"+remark+"</remark>"
                            +"</QUALITYCONTROL_INFO></BasicDAS>"
                        var dataToSend = "clientPage=QUALITYCONTROL_INFO&&serviceRequest=" + request;
                        $.ajax({
                            type: "POST",
                            url: "/rssWeb/DataServiceServlet",
                            data: dataToSend,
                            success: function (data, textStatus, jqXHR) {
                                // tr.remove();
                                prepare();
                                /*重新排序*/
                                $("td.am-text-center").each(function () {
                                    var indexxx = $(this).closest('tr').index();
                                    $(this).text(indexxx);
                                });
                            }
                        });
                    }
                    $("#check-all").attr("checked", false);
                }
            )

            $("td.am-text-center").each(function () {
                var indexxx = $(this).closest('tr').index();
                $(this).text(indexxx);
            });
        // });
    })


    /*新增*/
    $("#button-add").click(function () {
        $("#table_model").find("input").each(function () {
            $(this).val("");
        })
        $("#table_model_name").html("信息添加")

        $("#table_row_no").removeAttr("disabled")
        $("#table_row_no").val($(".is-info-table").find("tbody").find("tr").last().index() + 1);
        $("#table_row_no").attr("disabled", true);

        $("#table_model").modal();
    })

    /*新增确认*/
    $("#button_sure").click(function () {
        var QUALITYCONTROL_INFOUID = $("#QUALITYCONTROL_INFOUID").val();        var monotiorProject = $("#monotiorProject").val();
        var monotiorMethod = $("#monotiorMethod").val();
        var deadline = $("#deadline").val();
        var partDept = $("#partDept").val();
        var evaluateDateTime = $("#evaluateDateTime").val();
        var amount = $("#amount").val();
        var executiveDirector = $("#executiveDirector").val();
        var remark = $("#remark").val();
        var request=""
        if($("#table_model_name").html() == "信息添加"){
            request = "<BasicDAS><QUALITYCONTROL_INFO operation='save'>"
        }else if($("#table_model_name").html() == "信息修改"){
            request = "<BasicDAS><QUALITYCONTROL_INFO operation='update'><QUALITYCONTROL_INFOUID>"+QUALITYCONTROL_INFOUID+"</QUALITYCONTROL_INFOUID>"
        }
        request =request              +"<monotiorProject>" + monotiorProject + "</monotiorProject>"
            +"<monotiorMethod>" + monotiorMethod + "</monotiorMethod>"
            +"<deadline>" + deadline + "</deadline>"
            +"<partDept>" + partDept + "</partDept>"
            +"<evaluateDateTime>" + evaluateDateTime + "</evaluateDateTime>"
            +"<amount>" + amount + "</amount>"
            +"<executiveDirector>" + executiveDirector + "</executiveDirector>"
            +"<remark>" + remark + "</remark>"
            + "</QUALITYCONTROL_INFO></BasicDAS>";
        var dataToSend = "clientPage=QUALITYCONTROL_INFO&&serviceRequest=" + request;

        $.ajax({
            type: "POST",
            url: "/rssWeb/DataServiceServlet",
            data: dataToSend,
            success: function (data, textStatus, jqXHR) {
                prepare();

                /*重新排序*/
                $("td.am-text-center").each(function () {
                    var indexxx = $(this).closest('tr').index();
                    $(this).text(indexxx);
                });

            }
        });
    })

    /*修改*/
    $("#button-modify").click(function () {
        $("#table_model_name").html("信息修改")

        $("#table_row_no").removeAttr("disabled")
        var count = 0
        $("input[type=checkbox]").each(function () {
            if (this.id != "check-all" && this.checked) {
                count += 1
            }
        })
        if(count >1){
            alert("修改只能单条进行！")
            return false;
        }else if (count <= 0){
            alert("请选择需要修改的数据！")
            return false;
        }

        var tr
        $("input[type=checkbox]").each(function () {
            if (this.id != "check-all" && this.checked) {
                tr = this.parentNode.parentNode
            }
        })
        $(tr).find("td").each(function () {
            var x = $(this).text().split("\n")[0];
            if(x=="null"){
                x=""
            }
            switch ($(this).index()) {
                case 1:
                    $("#table_row_no").val(x);
                    break;
                case 2:
                   $("#QUALITYCONTROL_INFOUID").val(x);
                    break;
                case 3:
                    $("#monotiorProject").val(x);
                    break;
                case 4:
                    $("#monotiorMethod").val(x);
                    break;
                case 5:
                    $("#deadline").val(x);
                    break;
                case 6:
                    $("#partDept").val(x);
                    break;
                case 7:
                    $("#evaluateDateTime").val(x);
                    break;
                case 8:
                    $("#amount").val(x);
                    break;
                case 9:
                    $("#executiveDirector").val(x);
                    break;
                case 10:
                    $("#remark").val(x);
                    break;
            }
        })
        $("#table_row_no").attr("disabled", true);
        $("#table_model").modal();

    })

})

function search(pageNo) {
    var deptName = $("#deptName_input").val();
    var deptType = $("#deptType_select").val();
    var request = "<BasicDAS><QUALITYCONTROL_INFO pageSize='5' pageNo='" + pageNo + "'></QUALITYCONTROL_INFO></BasicDAS>";
    var dataToSend = "clientPage=QUALITYCONTROL_INFO&&serviceRequest=" + request;
    $.ajax({
        type: "POST",
        async: false,
        url: "/rssWeb/DataServiceServlet",
        data: dataToSend,
        success: function (data) {
            $("#data_table").html($(data).find("#data_table").html());
            $("#is_page_count").html($(data).find("#is_page_count").html());
            /*排序*/
            $("td.am-text-center").each(function () {
                var indexxx = $(this).closest('tr').index();
                $(this).text(indexxx);
            });
        },
    });
}


function prepare() {
    var request = "<BasicDAS><QUALITYCONTROL_INFO pageSize='5' pageNo='1'></QUALITYCONTROL_INFO></BasicDAS>";
    var dataToSend = "clientPage=QUALITYCONTROL_INFO&&serviceRequest=" + request;
    $.ajax({
        type: "POST",
        async: false,
        url: "/rssWeb/DataServiceServlet",
        data: dataToSend,
        success: function (data) {
            $("#data_table").html($(data).find("#data_table").html());
            $("#is_page_count").html($(data).find("#is_page_count").html());
        },
    });

}
