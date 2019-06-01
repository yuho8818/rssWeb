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
                        var PERSONALHEALTH_INFOUID="";
                        var workerID="";
                        var checkDate="";
                        var checkOrg="";
                        var isReview="";
                        var resultSummarize="";
                        var tabooDisease="";
                        var remarksText="";
                        var hazardFactors="";
                        var itemNo="";
                        var itemName="";
                        var itemStandard="";
                        var itemResult="";
                        var itemDiagnotics="";

                        $(tr).find("td").each(function () {
                            var x = $(this).text().split("\n")[0];
                            if(x=="null"){
                                x=""
                            }
                            switch ($(this).index()) {
                                case 2:
                                    PERSONALHEALTH_INFOUID=x;
                                    break;
                                case 3:
                                    workerID=x;
                                    break;
                                case 4:
                                    checkDate=x;
                                    break;
                                case 5:
                                    checkOrg=x;
                                    break;
                                case 6:
                                    isReview=x;
                                    break;
                                case 7:
                                    resultSummarize=x;
                                    break;
                                case 8:
                                    tabooDisease=x;
                                    break;
                                case 9:
                                    remarksText=x;
                                    break;
                                case 10:
                                    hazardFactors=x;
                                    break;
                                case 11:
                                    itemNo=x;
                                    break;
                                case 12:
                                    itemName=x;
                                    break;
                                case 13:
                                    itemStandard=x;
                                    break;
                                case 14:
                                    itemResult=x;
                                    break;
                                case 15:
                                    itemDiagnotics=x;
                                    break;
                            }
                        })
                        var request = "<BasicDAS><PERSONALHEALTH_INFO operation='delete'><PERSONALHEALTH_INFOUID>" + PERSONALHEALTH_INFOUID + "</PERSONALHEALTH_INFOUID>"
                            +"<workerID>"+workerID+"</workerID>"
                            +"<checkDate>"+checkDate+"</checkDate>"
                            +"<checkOrg>"+checkOrg+"</checkOrg>"
                            +"<isReview>"+isReview+"</isReview>"
                            +"<resultSummarize>"+resultSummarize+"</resultSummarize>"
                            +"<tabooDisease>"+tabooDisease+"</tabooDisease>"
                            +"<remarksText>"+remarksText+"</remarksText>"
                            +"<hazardFactors>"+hazardFactors+"</hazardFactors>"
                            +"<itemNo>"+itemNo+"</itemNo>"
                            +"<itemName>"+itemName+"</itemName>"
                            +"<itemStandard>"+itemStandard+"</itemStandard>"
                            +"<itemResult>"+itemResult+"</itemResult>"
                            +"<itemDiagnotics>"+itemDiagnotics+"</itemDiagnotics>"
                            +"</PERSONALHEALTH_INFO></BasicDAS>"
                        var dataToSend = "clientPage=PERSONALHEALTH_INFO&&serviceRequest=" + request;
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
        var PERSONALHEALTH_INFOUID = $("#PERSONALHEALTH_INFOUID").val();        var workerID = $("#workerID").val();
        var checkDate = $("#checkDate").val();
        var checkOrg = $("#checkOrg").val();
        var isReview = $("#isReview").val();
        var resultSummarize = $("#resultSummarize").val();
        var tabooDisease = $("#tabooDisease").val();
        var remarksText = $("#remarksText").val();
        var hazardFactors = $("#hazardFactors").val();
        var itemNo = $("#itemNo").val();
        var itemName = $("#itemName").val();
        var itemStandard = $("#itemStandard").val();
        var itemResult = $("#itemResult").val();
        var itemDiagnotics = $("#itemDiagnotics").val();
        var request=""
        if($("#table_model_name").html() == "信息添加"){
            request = "<BasicDAS><PERSONALHEALTH_INFO operation='save'>"
        }else if($("#table_model_name").html() == "信息修改"){
            request = "<BasicDAS><PERSONALHEALTH_INFO operation='update'><PERSONALHEALTH_INFOUID>"+PERSONALHEALTH_INFOUID+"</PERSONALHEALTH_INFOUID>"
        }
        request =request              +"<workerID>" + workerID + "</workerID>"
            +"<checkDate>" + checkDate + "</checkDate>"
            +"<checkOrg>" + checkOrg + "</checkOrg>"
            +"<isReview>" + isReview + "</isReview>"
            +"<resultSummarize>" + resultSummarize + "</resultSummarize>"
            +"<tabooDisease>" + tabooDisease + "</tabooDisease>"
            +"<remarksText>" + remarksText + "</remarksText>"
            +"<hazardFactors>" + hazardFactors + "</hazardFactors>"
            +"<itemNo>" + itemNo + "</itemNo>"
            +"<itemName>" + itemName + "</itemName>"
            +"<itemStandard>" + itemStandard + "</itemStandard>"
            +"<itemResult>" + itemResult + "</itemResult>"
            +"<itemDiagnotics>" + itemDiagnotics + "</itemDiagnotics>"
            + "</PERSONALHEALTH_INFO></BasicDAS>";
        var dataToSend = "clientPage=PERSONALHEALTH_INFO&&serviceRequest=" + request;

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
                   $("#PERSONALHEALTH_INFOUID").val(x);
                    break;
                case 3:
                    $("#workerID").val(x);
                    break;
                case 4:
                    $("#checkDate").val(x);
                    break;
                case 5:
                    $("#checkOrg").val(x);
                    break;
                case 6:
                    $("#isReview").val(x);
                    break;
                case 7:
                    $("#resultSummarize").val(x);
                    break;
                case 8:
                    $("#tabooDisease").val(x);
                    break;
                case 9:
                    $("#remarksText").val(x);
                    break;
                case 10:
                    $("#hazardFactors").val(x);
                    break;
                case 11:
                    $("#itemNo").val(x);
                    break;
                case 12:
                    $("#itemName").val(x);
                    break;
                case 13:
                    $("#itemStandard").val(x);
                    break;
                case 14:
                    $("#itemResult").val(x);
                    break;
                case 15:
                    $("#itemDiagnotics").val(x);
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
    var request = "<BasicDAS><PERSONALHEALTH_INFO pageSize='5' pageNo='" + pageNo + "'></PERSONALHEALTH_INFO></BasicDAS>";
    var dataToSend = "clientPage=PERSONALHEALTH_INFO&&serviceRequest=" + request;
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
    var request = "<BasicDAS><PERSONALHEALTH_INFO pageSize='5' pageNo='1'></PERSONALHEALTH_INFO></BasicDAS>";
    var dataToSend = "clientPage=PERSONALHEALTH_INFO&&serviceRequest=" + request;
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
