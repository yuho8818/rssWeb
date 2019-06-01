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
                        var COMPLAINTS_INFOUID="";
                        var complaintPerson="";
                        var complaintDept="";
                        var complaintDate="";
                        var complaintContent="";
                        var beComplainantPerson="";
                        var beComplainantDept="";
                        var acceptPerson="";
                        var acceptSuggestion="";
                        var acceptDate="";
                        var audit="";
                        var auditDate="";
                        var reAudit="";
                        var reAuditDate="";

                        $(tr).find("td").each(function () {
                            var x = $(this).text().split("\n")[0];
                            if(x=="null"){
                                x=""
                            }
                            switch ($(this).index()) {
                                case 2:
                                    COMPLAINTS_INFOUID=x;
                                    break;
                                case 3:
                                    complaintPerson=x;
                                    break;
                                case 4:
                                    complaintDept=x;
                                    break;
                                case 5:
                                    complaintDate=x;
                                    break;
                                case 6:
                                    complaintContent=x;
                                    break;
                                case 7:
                                    beComplainantPerson=x;
                                    break;
                                case 8:
                                    beComplainantDept=x;
                                    break;
                                case 9:
                                    acceptPerson=x;
                                    break;
                                case 10:
                                    acceptSuggestion=x;
                                    break;
                                case 11:
                                    acceptDate=x;
                                    break;
                                case 12:
                                    audit=x;
                                    break;
                                case 13:
                                    auditDate=x;
                                    break;
                                case 14:
                                    reAudit=x;
                                    break;
                                case 15:
                                    reAuditDate=x;
                                    break;
                            }
                        })
                        var request = "<BasicDAS><COMPLAINTS_INFO operation='delete'><COMPLAINTS_INFOUID>" + COMPLAINTS_INFOUID + "</COMPLAINTS_INFOUID>"
                            +"<complaintPerson>"+complaintPerson+"</complaintPerson>"
                            +"<complaintDept>"+complaintDept+"</complaintDept>"
                            +"<complaintDate>"+complaintDate+"</complaintDate>"
                            +"<complaintContent>"+complaintContent+"</complaintContent>"
                            +"<beComplainantPerson>"+beComplainantPerson+"</beComplainantPerson>"
                            +"<beComplainantDept>"+beComplainantDept+"</beComplainantDept>"
                            +"<acceptPerson>"+acceptPerson+"</acceptPerson>"
                            +"<acceptSuggestion>"+acceptSuggestion+"</acceptSuggestion>"
                            +"<acceptDate>"+acceptDate+"</acceptDate>"
                            +"<audit>"+audit+"</audit>"
                            +"<auditDate>"+auditDate+"</auditDate>"
                            +"<reAudit>"+reAudit+"</reAudit>"
                            +"<reAuditDate>"+reAuditDate+"</reAuditDate>"
                            +"</COMPLAINTS_INFO></BasicDAS>"
                        var dataToSend = "clientPage=COMPLAINTS_INFO&&serviceRequest=" + request;
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
        var COMPLAINTS_INFOUID = $("#COMPLAINTS_INFOUID").val();        var complaintPerson = $("#complaintPerson").val();
        var complaintDept = $("#complaintDept").val();
        var complaintDate = $("#complaintDate").val();
        var complaintContent = $("#complaintContent").val();
        var beComplainantPerson = $("#beComplainantPerson").val();
        var beComplainantDept = $("#beComplainantDept").val();
        var acceptPerson = $("#acceptPerson").val();
        var acceptSuggestion = $("#acceptSuggestion").val();
        var acceptDate = $("#acceptDate").val();
        var audit = $("#audit").val();
        var auditDate = $("#auditDate").val();
        var reAudit = $("#reAudit").val();
        var reAuditDate = $("#reAuditDate").val();
        var request=""
        if($("#table_model_name").html() == "信息添加"){
            request = "<BasicDAS><COMPLAINTS_INFO operation='save'>"
        }else if($("#table_model_name").html() == "信息修改"){
            request = "<BasicDAS><COMPLAINTS_INFO operation='update'><COMPLAINTS_INFOUID>"+COMPLAINTS_INFOUID+"</COMPLAINTS_INFOUID>"
        }
        request =request              +"<complaintPerson>" + complaintPerson + "</complaintPerson>"
            +"<complaintDept>" + complaintDept + "</complaintDept>"
            +"<complaintDate>" + complaintDate + "</complaintDate>"
            +"<complaintContent>" + complaintContent + "</complaintContent>"
            +"<beComplainantPerson>" + beComplainantPerson + "</beComplainantPerson>"
            +"<beComplainantDept>" + beComplainantDept + "</beComplainantDept>"
            +"<acceptPerson>" + acceptPerson + "</acceptPerson>"
            +"<acceptSuggestion>" + acceptSuggestion + "</acceptSuggestion>"
            +"<acceptDate>" + acceptDate + "</acceptDate>"
            +"<audit>" + audit + "</audit>"
            +"<auditDate>" + auditDate + "</auditDate>"
            +"<reAudit>" + reAudit + "</reAudit>"
            +"<reAuditDate>" + reAuditDate + "</reAuditDate>"
            + "</COMPLAINTS_INFO></BasicDAS>";
        var dataToSend = "clientPage=COMPLAINTS_INFO&&serviceRequest=" + request;

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
                   $("#COMPLAINTS_INFOUID").val(x);
                    break;
                case 3:
                    $("#complaintPerson").val(x);
                    break;
                case 4:
                    $("#complaintDept").val(x);
                    break;
                case 5:
                    $("#complaintDate").val(x);
                    break;
                case 6:
                    $("#complaintContent").val(x);
                    break;
                case 7:
                    $("#beComplainantPerson").val(x);
                    break;
                case 8:
                    $("#beComplainantDept").val(x);
                    break;
                case 9:
                    $("#acceptPerson").val(x);
                    break;
                case 10:
                    $("#acceptSuggestion").val(x);
                    break;
                case 11:
                    $("#acceptDate").val(x);
                    break;
                case 12:
                    $("#audit").val(x);
                    break;
                case 13:
                    $("#auditDate").val(x);
                    break;
                case 14:
                    $("#reAudit").val(x);
                    break;
                case 15:
                    $("#reAuditDate").val(x);
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
    var request = "<BasicDAS><COMPLAINTS_INFO pageSize='5' pageNo='" + pageNo + "'></COMPLAINTS_INFO></BasicDAS>";
    var dataToSend = "clientPage=COMPLAINTS_INFO&&serviceRequest=" + request;
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
    var request = "<BasicDAS><COMPLAINTS_INFO pageSize='5' pageNo='1'></COMPLAINTS_INFO></BasicDAS>";
    var dataToSend = "clientPage=COMPLAINTS_INFO&&serviceRequest=" + request;
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
