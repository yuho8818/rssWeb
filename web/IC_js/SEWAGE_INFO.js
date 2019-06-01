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
                        var SEWAGE_INFOUID="";
                        var dischargeArea="";
                        var dischargeDate="";
                        var dischargePlace="";
                        var dischargeVolume="";
                        var registrant="";
                        var registerDate="";
                        var cod="";
                        var acIDHeavyMetal="";
                        var alkalineHeavyMetal="";
                        var checkPerson="";
                        var checkDate="";
                        var recycleDate="";
                        var recyclePeople="";
                        var operator="";
                        var operatorDate="";
                        var useDevice="";
                        var result="";
                        var remark="";

                        $(tr).find("td").each(function () {
                            var x = $(this).text().split("\n")[0];
                            if(x=="null"){
                                x=""
                            }
                            switch ($(this).index()) {
                                case 2:
                                    SEWAGE_INFOUID=x;
                                    break;
                                case 3:
                                    dischargeArea=x;
                                    break;
                                case 4:
                                    dischargeDate=x;
                                    break;
                                case 5:
                                    dischargePlace=x;
                                    break;
                                case 6:
                                    dischargeVolume=x;
                                    break;
                                case 7:
                                    registrant=x;
                                    break;
                                case 8:
                                    registerDate=x;
                                    break;
                                case 9:
                                    cod=x;
                                    break;
                                case 10:
                                    acIDHeavyMetal=x;
                                    break;
                                case 11:
                                    alkalineHeavyMetal=x;
                                    break;
                                case 12:
                                    checkPerson=x;
                                    break;
                                case 13:
                                    checkDate=x;
                                    break;
                                case 14:
                                    recycleDate=x;
                                    break;
                                case 15:
                                    recyclePeople=x;
                                    break;
                                case 16:
                                    operator=x;
                                    break;
                                case 17:
                                    operatorDate=x;
                                    break;
                                case 18:
                                    useDevice=x;
                                    break;
                                case 19:
                                    result=x;
                                    break;
                                case 20:
                                    remark=x;
                                    break;
                            }
                        })
                        var request = "<BasicDAS><SEWAGE_INFO operation='delete'><SEWAGE_INFOUID>" + SEWAGE_INFOUID + "</SEWAGE_INFOUID>"
                            +"<dischargeArea>"+dischargeArea+"</dischargeArea>"
                            +"<dischargeDate>"+dischargeDate+"</dischargeDate>"
                            +"<dischargePlace>"+dischargePlace+"</dischargePlace>"
                            +"<dischargeVolume>"+dischargeVolume+"</dischargeVolume>"
                            +"<registrant>"+registrant+"</registrant>"
                            +"<registerDate>"+registerDate+"</registerDate>"
                            +"<cod>"+cod+"</cod>"
                            +"<acIDHeavyMetal>"+acIDHeavyMetal+"</acIDHeavyMetal>"
                            +"<alkalineHeavyMetal>"+alkalineHeavyMetal+"</alkalineHeavyMetal>"
                            +"<checkPerson>"+checkPerson+"</checkPerson>"
                            +"<checkDate>"+checkDate+"</checkDate>"
                            +"<recycleDate>"+recycleDate+"</recycleDate>"
                            +"<recyclePeople>"+recyclePeople+"</recyclePeople>"
                            +"<operator>"+operator+"</operator>"
                            +"<operatorDate>"+operatorDate+"</operatorDate>"
                            +"<useDevice>"+useDevice+"</useDevice>"
                            +"<result>"+result+"</result>"
                            +"<remark>"+remark+"</remark>"
                            +"</SEWAGE_INFO></BasicDAS>"
                        var dataToSend = "clientPage=SEWAGE_INFO&&serviceRequest=" + request;
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
        var SEWAGE_INFOUID = $("#SEWAGE_INFOUID").val();        var dischargeArea = $("#dischargeArea").val();
        var dischargeDate = $("#dischargeDate").val();
        var dischargePlace = $("#dischargePlace").val();
        var dischargeVolume = $("#dischargeVolume").val();
        var registrant = $("#registrant").val();
        var registerDate = $("#registerDate").val();
        var cod = $("#cod").val();
        var acIDHeavyMetal = $("#acIDHeavyMetal").val();
        var alkalineHeavyMetal = $("#alkalineHeavyMetal").val();
        var checkPerson = $("#checkPerson").val();
        var checkDate = $("#checkDate").val();
        var recycleDate = $("#recycleDate").val();
        var recyclePeople = $("#recyclePeople").val();
        var operator = $("#operator").val();
        var operatorDate = $("#operatorDate").val();
        var useDevice = $("#useDevice").val();
        var result = $("#result").val();
        var remark = $("#remark").val();
        var request=""
        if($("#table_model_name").html() == "信息添加"){
            request = "<BasicDAS><SEWAGE_INFO operation='save'>"
        }else if($("#table_model_name").html() == "信息修改"){
            request = "<BasicDAS><SEWAGE_INFO operation='update'><SEWAGE_INFOUID>"+SEWAGE_INFOUID+"</SEWAGE_INFOUID>"
        }
        request =request              +"<dischargeArea>" + dischargeArea + "</dischargeArea>"
            +"<dischargeDate>" + dischargeDate + "</dischargeDate>"
            +"<dischargePlace>" + dischargePlace + "</dischargePlace>"
            +"<dischargeVolume>" + dischargeVolume + "</dischargeVolume>"
            +"<registrant>" + registrant + "</registrant>"
            +"<registerDate>" + registerDate + "</registerDate>"
            +"<cod>" + cod + "</cod>"
            +"<acIDHeavyMetal>" + acIDHeavyMetal + "</acIDHeavyMetal>"
            +"<alkalineHeavyMetal>" + alkalineHeavyMetal + "</alkalineHeavyMetal>"
            +"<checkPerson>" + checkPerson + "</checkPerson>"
            +"<checkDate>" + checkDate + "</checkDate>"
            +"<recycleDate>" + recycleDate + "</recycleDate>"
            +"<recyclePeople>" + recyclePeople + "</recyclePeople>"
            +"<operator>" + operator + "</operator>"
            +"<operatorDate>" + operatorDate + "</operatorDate>"
            +"<useDevice>" + useDevice + "</useDevice>"
            +"<result>" + result + "</result>"
            +"<remark>" + remark + "</remark>"
            + "</SEWAGE_INFO></BasicDAS>";
        var dataToSend = "clientPage=SEWAGE_INFO&&serviceRequest=" + request;

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
                   $("#SEWAGE_INFOUID").val(x);
                    break;
                case 3:
                    $("#dischargeArea").val(x);
                    break;
                case 4:
                    $("#dischargeDate").val(x);
                    break;
                case 5:
                    $("#dischargePlace").val(x);
                    break;
                case 6:
                    $("#dischargeVolume").val(x);
                    break;
                case 7:
                    $("#registrant").val(x);
                    break;
                case 8:
                    $("#registerDate").val(x);
                    break;
                case 9:
                    $("#cod").val(x);
                    break;
                case 10:
                    $("#acIDHeavyMetal").val(x);
                    break;
                case 11:
                    $("#alkalineHeavyMetal").val(x);
                    break;
                case 12:
                    $("#checkPerson").val(x);
                    break;
                case 13:
                    $("#checkDate").val(x);
                    break;
                case 14:
                    $("#recycleDate").val(x);
                    break;
                case 15:
                    $("#recyclePeople").val(x);
                    break;
                case 16:
                    $("#operator").val(x);
                    break;
                case 17:
                    $("#operatorDate").val(x);
                    break;
                case 18:
                    $("#useDevice").val(x);
                    break;
                case 19:
                    $("#result").val(x);
                    break;
                case 20:
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
    var request = "<BasicDAS><SEWAGE_INFO pageSize='5' pageNo='" + pageNo + "'></SEWAGE_INFO></BasicDAS>";
    var dataToSend = "clientPage=SEWAGE_INFO&&serviceRequest=" + request;
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
    var request = "<BasicDAS><SEWAGE_INFO pageSize='5' pageNo='1'></SEWAGE_INFO></BasicDAS>";
    var dataToSend = "clientPage=SEWAGE_INFO&&serviceRequest=" + request;
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
