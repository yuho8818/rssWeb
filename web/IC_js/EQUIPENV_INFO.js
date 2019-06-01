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
                        var EQUIPENV_INFOUID="";
                        var equipName="";
                        var equipNo="";
                        var equipType="";
                        var deptartment="";
                        var testIndex="";
                        var testValue="";
                        var isOverproof="";
                        var testDate="";
                        var testPerson="";
                        var remark="";

                        $(tr).find("td").each(function () {
                            var x = $(this).text().split("\n")[0];
                            if(x=="null"){
                                x=""
                            }
                            switch ($(this).index()) {
                                case 2:
                                    EQUIPENV_INFOUID=x;
                                    break;
                                case 3:
                                    equipName=x;
                                    break;
                                case 4:
                                    equipNo=x;
                                    break;
                                case 5:
                                    equipType=x;
                                    break;
                                case 6:
                                    deptartment=x;
                                    break;
                                case 7:
                                    testIndex=x;
                                    break;
                                case 8:
                                    testValue=x;
                                    break;
                                case 9:
                                    isOverproof=x;
                                    break;
                                case 10:
                                    testDate=x;
                                    break;
                                case 11:
                                    testPerson=x;
                                    break;
                                case 12:
                                    remark=x;
                                    break;
                            }
                        })
                        var request = "<BasicDAS><EQUIPENV_INFO operation='delete'><EQUIPENV_INFOUID>" + EQUIPENV_INFOUID + "</EQUIPENV_INFOUID>"
                            +"<equipName>"+equipName+"</equipName>"
                            +"<equipNo>"+equipNo+"</equipNo>"
                            +"<equipType>"+equipType+"</equipType>"
                            +"<deptartment>"+deptartment+"</deptartment>"
                            +"<testIndex>"+testIndex+"</testIndex>"
                            +"<testValue>"+testValue+"</testValue>"
                            +"<isOverproof>"+isOverproof+"</isOverproof>"
                            +"<testDate>"+testDate+"</testDate>"
                            +"<testPerson>"+testPerson+"</testPerson>"
                            +"<remark>"+remark+"</remark>"
                            +"</EQUIPENV_INFO></BasicDAS>"
                        var dataToSend = "clientPage=EQUIPENV_INFO&&serviceRequest=" + request;
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
        var EQUIPENV_INFOUID = $("#EQUIPENV_INFOUID").val();        var equipName = $("#equipName").val();
        var equipNo = $("#equipNo").val();
        var equipType = $("#equipType").val();
        var deptartment = $("#deptartment").val();
        var testIndex = $("#testIndex").val();
        var testValue = $("#testValue").val();
        var isOverproof = $("#isOverproof").val();
        var testDate = $("#testDate").val();
        var testPerson = $("#testPerson").val();
        var remark = $("#remark").val();
        var request=""
        if($("#table_model_name").html() == "信息添加"){
            request = "<BasicDAS><EQUIPENV_INFO operation='save'>"
        }else if($("#table_model_name").html() == "信息修改"){
            request = "<BasicDAS><EQUIPENV_INFO operation='update'><EQUIPENV_INFOUID>"+EQUIPENV_INFOUID+"</EQUIPENV_INFOUID>"
        }
        request =request              +"<equipName>" + equipName + "</equipName>"
            +"<equipNo>" + equipNo + "</equipNo>"
            +"<equipType>" + equipType + "</equipType>"
            +"<deptartment>" + deptartment + "</deptartment>"
            +"<testIndex>" + testIndex + "</testIndex>"
            +"<testValue>" + testValue + "</testValue>"
            +"<isOverproof>" + isOverproof + "</isOverproof>"
            +"<testDate>" + testDate + "</testDate>"
            +"<testPerson>" + testPerson + "</testPerson>"
            +"<remark>" + remark + "</remark>"
            + "</EQUIPENV_INFO></BasicDAS>";
        var dataToSend = "clientPage=EQUIPENV_INFO&&serviceRequest=" + request;

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
                   $("#EQUIPENV_INFOUID").val(x);
                    break;
                case 3:
                    $("#equipName").val(x);
                    break;
                case 4:
                    $("#equipNo").val(x);
                    break;
                case 5:
                    $("#equipType").val(x);
                    break;
                case 6:
                    $("#deptartment").val(x);
                    break;
                case 7:
                    $("#testIndex").val(x);
                    break;
                case 8:
                    $("#testValue").val(x);
                    break;
                case 9:
                    $("#isOverproof").val(x);
                    break;
                case 10:
                    $("#testDate").val(x);
                    break;
                case 11:
                    $("#testPerson").val(x);
                    break;
                case 12:
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
    var request = "<BasicDAS><EQUIPENV_INFO pageSize='5' pageNo='" + pageNo + "'></EQUIPENV_INFO></BasicDAS>";
    var dataToSend = "clientPage=EQUIPENV_INFO&&serviceRequest=" + request;
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
    var request = "<BasicDAS><EQUIPENV_INFO pageSize='5' pageNo='1'></EQUIPENV_INFO></BasicDAS>";
    var dataToSend = "clientPage=EQUIPENV_INFO&&serviceRequest=" + request;
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
