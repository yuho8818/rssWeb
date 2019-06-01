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
                        var SPECIALEQUIPMENT_INFOUID="";
                        var equipName="";
                        var innerNo="";
                        var equipRegisterNo="";
                        var usageNo="";
                        var manufactureDate="";
                        var useDate="";
                        var equipLocation="";
                        var equipStatus="";
                        var equipOperator="";
                        var shelfLife="";
                        var remark="";

                        $(tr).find("td").each(function () {
                            var x = $(this).text().split("\n")[0];
                            if(x=="null"){
                                x=""
                            }
                            switch ($(this).index()) {
                                case 2:
                                    SPECIALEQUIPMENT_INFOUID=x;
                                    break;
                                case 3:
                                    equipName=x;
                                    break;
                                case 4:
                                    innerNo=x;
                                    break;
                                case 5:
                                    equipRegisterNo=x;
                                    break;
                                case 6:
                                    usageNo=x;
                                    break;
                                case 7:
                                    manufactureDate=x;
                                    break;
                                case 8:
                                    useDate=x;
                                    break;
                                case 9:
                                    equipLocation=x;
                                    break;
                                case 10:
                                    equipStatus=x;
                                    break;
                                case 11:
                                    equipOperator=x;
                                    break;
                                case 12:
                                    shelfLife=x;
                                    break;
                                case 13:
                                    remark=x;
                                    break;
                            }
                        })
                        var request = "<BasicDAS><SPECIALEQUIPMENT_INFO operation='delete'><SPECIALEQUIPMENT_INFOUID>" + SPECIALEQUIPMENT_INFOUID + "</SPECIALEQUIPMENT_INFOUID>"
                            +"<equipName>"+equipName+"</equipName>"
                            +"<innerNo>"+innerNo+"</innerNo>"
                            +"<equipRegisterNo>"+equipRegisterNo+"</equipRegisterNo>"
                            +"<usageNo>"+usageNo+"</usageNo>"
                            +"<manufactureDate>"+manufactureDate+"</manufactureDate>"
                            +"<useDate>"+useDate+"</useDate>"
                            +"<equipLocation>"+equipLocation+"</equipLocation>"
                            +"<equipStatus>"+equipStatus+"</equipStatus>"
                            +"<equipOperator>"+equipOperator+"</equipOperator>"
                            +"<shelfLife>"+shelfLife+"</shelfLife>"
                            +"<remark>"+remark+"</remark>"
                            +"</SPECIALEQUIPMENT_INFO></BasicDAS>"
                        var dataToSend = "clientPage=SPECIALEQUIPMENT_INFO&&serviceRequest=" + request;
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
        var SPECIALEQUIPMENT_INFOUID = $("#SPECIALEQUIPMENT_INFOUID").val();        var equipName = $("#equipName").val();
        var innerNo = $("#innerNo").val();
        var equipRegisterNo = $("#equipRegisterNo").val();
        var usageNo = $("#usageNo").val();
        var manufactureDate = $("#manufactureDate").val();
        var useDate = $("#useDate").val();
        var equipLocation = $("#equipLocation").val();
        var equipStatus = $("#equipStatus").val();
        var equipOperator = $("#equipOperator").val();
        var shelfLife = $("#shelfLife").val();
        var remark = $("#remark").val();
        var request=""
        if($("#table_model_name").html() == "信息添加"){
            request = "<BasicDAS><SPECIALEQUIPMENT_INFO operation='save'>"
        }else if($("#table_model_name").html() == "信息修改"){
            request = "<BasicDAS><SPECIALEQUIPMENT_INFO operation='update'><SPECIALEQUIPMENT_INFOUID>"+SPECIALEQUIPMENT_INFOUID+"</SPECIALEQUIPMENT_INFOUID>"
        }
        request =request              +"<equipName>" + equipName + "</equipName>"
            +"<innerNo>" + innerNo + "</innerNo>"
            +"<equipRegisterNo>" + equipRegisterNo + "</equipRegisterNo>"
            +"<usageNo>" + usageNo + "</usageNo>"
            +"<manufactureDate>" + manufactureDate + "</manufactureDate>"
            +"<useDate>" + useDate + "</useDate>"
            +"<equipLocation>" + equipLocation + "</equipLocation>"
            +"<equipStatus>" + equipStatus + "</equipStatus>"
            +"<equipOperator>" + equipOperator + "</equipOperator>"
            +"<shelfLife>" + shelfLife + "</shelfLife>"
            +"<remark>" + remark + "</remark>"
            + "</SPECIALEQUIPMENT_INFO></BasicDAS>";
        var dataToSend = "clientPage=SPECIALEQUIPMENT_INFO&&serviceRequest=" + request;

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
                   $("#SPECIALEQUIPMENT_INFOUID").val(x);
                    break;
                case 3:
                    $("#equipName").val(x);
                    break;
                case 4:
                    $("#innerNo").val(x);
                    break;
                case 5:
                    $("#equipRegisterNo").val(x);
                    break;
                case 6:
                    $("#usageNo").val(x);
                    break;
                case 7:
                    $("#manufactureDate").val(x);
                    break;
                case 8:
                    $("#useDate").val(x);
                    break;
                case 9:
                    $("#equipLocation").val(x);
                    break;
                case 10:
                    $("#equipStatus").val(x);
                    break;
                case 11:
                    $("#equipOperator").val(x);
                    break;
                case 12:
                    $("#shelfLife").val(x);
                    break;
                case 13:
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
    var request = "<BasicDAS><SPECIALEQUIPMENT_INFO pageSize='5' pageNo='" + pageNo + "'></SPECIALEQUIPMENT_INFO></BasicDAS>";
    var dataToSend = "clientPage=SPECIALEQUIPMENT_INFO&&serviceRequest=" + request;
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
    var request = "<BasicDAS><SPECIALEQUIPMENT_INFO pageSize='5' pageNo='1'></SPECIALEQUIPMENT_INFO></BasicDAS>";
    var dataToSend = "clientPage=SPECIALEQUIPMENT_INFO&&serviceRequest=" + request;
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
