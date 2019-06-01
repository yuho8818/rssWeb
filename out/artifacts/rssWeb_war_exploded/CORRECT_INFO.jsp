<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@page import="com.rss.framework.business.*" %>
<%@page import="java.util.*" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>﻿纠正预防管理</title>
    <meta name="description" content="这是一个 index 页面">
    <meta name="keywords" content="index">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <link rel="icon" type="image/png" href="assets/i/favicon.png">
    <link rel="apple-touch-icon-precomposed" href="assets/i/app-icon72x72@2x.png">
    <meta name="apple-mobile-web-app-title" content="Amaze UI"/>
    <link rel="stylesheet" href="assets/css/amazeui.min.css"/>
    <link rel="stylesheet" href="assets/css/admin.css">
    <link rel="stylesheet" href="IC_css/Communal.css">
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/app.js"></script>
    <script src="IC_js/NagivationBar.js"></script>

    <!--[if lt IE 9]>
    <script src="http://libs.baidu.com/jquery/1.11.1/jquery.min.js"></script>
    <script src="http://cdn.staticfile.org/modernizr/2.8.3/modernizr.js"></script>
    <script src="assets/js/polyfill/rem.min.js"></script>
    <script src="assets/js/polyfill/respond.min.js"></script>
    <script src="assets/js/amazeui.legacy.js"></script>
    <![endif]-->

    <!--[if (gte IE 9)|!(IE)]><!-->
    <script src="assets/js/amazeui.min.js"></script>
    <!--<![endif]-->


    <script src="IC_js/Communal.js"></script>
    <script type="text/javascript" src="IC_js/CORRECT_INFO.js"></script>

</head>
<!--[if lte IE 9]><p class="browsehappy">升级你的浏览器吧！ <a href="http://se.360.cn/" target="_blank">升级浏览器</a>以获得更好的体验！</p>
<![endif]-->


<body id="is_body">
<%int pageNo = 0, totalPages = 0, pageSize = 0, totalRecords = 0;%>
<%@include file="TopBar.jsp" %>

<div class="am-cf admin-main">
    <%@include file="NagivationBar.jsp" %>
    <div class=" admin-content">
        <div class="daohang">
            <ul>
                <li>
                    <button type="button" class="am-btn am-btn-default am-radius am-btn-xs"> 首页</button>
                </li>
                <li>
                    <button type="button" class="am-btn am-btn-default am-radius am-btn-xs">商品管理<a
                            href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close="">×</a>
                    </button>
                </li>
                <li>
                    <button type="button" class="am-btn am-btn-default am-radius am-btn-xs">订单管理<a
                            href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close="">×</a>
                    </button>
                </li>
                <li>
                    <button type="button" class="am-btn am-btn-default am-radius am-btn-xs">实时监控<a
                            href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close="">×</a>
                    </button>
                </li>
            </ul>
        </div>

        <div class="admin-biaogelist">
            <div class="listbiaoti am-cf">
                <ul class="am-icon-flag on">﻿纠正预防管理</ul>
                <dl class="am-icon-home" style="float: right;"> 当前位置： 首页 > <a href="#">商品列表</a></dl>
            </div>

            <div id="search_block" class="am-btn-toolbars am-btn-toolbar is-search-bar">
                <ul>
                    <li>
                        <select id="deptType_select"
                                data-am-selected="{btnWidth: 120, btnSize: 'sm', btnStyle: 'default'}">
                            <optgroup label="部门类型选择">
                                <option value="">全部类型</option>
                                <%
                                    if (request.getSession().getAttribute("prepareResponse") != null) {
                                        String message = request.getSession().getAttribute("prepareResponse").toString();

                                        ArrayList<BusinessObjectEntity> entityList = JavaBeanAdapter.getBusinessObjectListFromMessage(message);
                                %>
                                <%
                                    for (int index = 0; index < entityList.size(); index++) {
                                        BusinessObjectEntity entity = entityList.get(index);

                                %>
                                <option value="<%=entity.getAttributeValue("paramValues") %>"><%=entity.getAttributeValue("paramValues") %>
                                </option>
                                <%
                                        }
                                    }
                                %>

                            </optgroup>
                        </select>
                    </li>

                    <li>
                        <span class="is-input-title">部门名称:</span>
                        <input id="deptName_input" type="text" class="am-input-sm is-search-input" placeholder="部门搜索">
                    </li>

                    <li>
                        <button class="am-btn am-btn-xs am-radius  am-btn-success" id="dept_list_search">查询</button>
                        <button class="am-btn am-btn-xs am-radius  am-btn-success">打印</button>
                    </li>

                </ul>
            </div>

            <form class="am-form am-g">
                <table id="data_table" width="100%"
                       class="is-info-table am-table am-table-bordered am-table-radius am-table-striped">
                    <thead>
                    <tr class="am-success">
                        <th class="table-check"><input type="checkbox" id="check-all"/></th>
                        <th class="table-title" >编号</th>
                        <th class="table-id am-text-center" hidden="hidden">UID</th>
                        <th class="table-title">不符合工作编号</th>
                        <th class="table-title">完成日期</th>
                        <th class="table-title">复审人员</th>
                        <th class="table-title">被审人员</th>
                        <th class="table-title">被审核日期</th>
                        <th class="table-title">重审日期</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr hidden="true">
                        <td><input type="checkbox" id="hidden_check"/></td>
                        <td contenteditable="true"></td>
                        <td class="am-text-center" hidden="hidden"></td>
                        <td contenteditable="true"></td>
                        <td contenteditable="true"></td>
                        <td contenteditable="true"></td>
                        <td contenteditable="true"></td>
                        <td contenteditable="true"></td>
                        <td contenteditable="true"></td>
                    </tr>


                    <%
                        if (request.getAttribute("serviceResponse") != null && !request.getAttribute("serviceResponse").equals("<error>没有记录！</error>")) {
                            String message = request.getAttribute("serviceResponse").toString();
                            ArrayList<BusinessObjectEntity> entityList = JavaBeanAdapter.getBusinessObjectListFromMessage(message);
                    %>
                    <%
                        for (int index = 0; index < entityList.size(); index++) {
                            BusinessObjectEntity entity = entityList.get(index);
                            if (index == 0) {
                                System.out.println("页数设置");
                                pageNo = Integer.parseInt(entity.getPageNo());
                                System.out.println("pageNo:" + pageNo);
                                totalPages = Integer.parseInt(entity.getTotalPages());
                                System.out.println("totalPages:" + entity.getTotalPages());
                                totalRecords = Integer.parseInt(entity.getTotalRecords());
                                System.out.println("totalRecords:" + totalRecords);
                                pageSize = Integer.parseInt(entity.getPageSize());
                                System.out.println("pageSize:" + pageSize);
                            }
                    %>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td class="am-text-center">14</td>
                        <td contenteditable="true" hidden="hidden"><%=entity.getAttributeValue("CORRECT_INFOUID") %>
                        </td>
                        <td contenteditable="true"><%=entity.getAttributeValue("unstatisfiedNo")!=null ?entity.getAttributeValue("unstatisfiedNo"):""%>
                        </td>
                        <td contenteditable="true"><%=entity.getAttributeValue("finishDate")!=null ?entity.getAttributeValue("finishDate"):""%>
                        </td>
                        <td contenteditable="true"><%=entity.getAttributeValue("reviewPerson")!=null ?entity.getAttributeValue("reviewPerson"):""%>
                        </td>
                        <td contenteditable="true"><%=entity.getAttributeValue("auditedPerson")!=null ?entity.getAttributeValue("auditedPerson"):""%>
                        </td>
                        <td contenteditable="true"><%=entity.getAttributeValue("auditedData")!=null ?entity.getAttributeValue("auditedData"):""%>
                        </td>
                        <td contenteditable="true"><%=entity.getAttributeValue("reauditedData")!=null ?entity.getAttributeValue("reauditedData"):""%>
                        </td>
                    </tr>
                    <%
                            }
                        }
                    %>


                    </tbody>
                </table>

                <div class="am-btn-group am-btn-group-xs">
                    <button id="button-delete" type="button" class="am-btn am-btn-default"><span
                            class="am-icon-trash"></span> 删除
                    </button>
                    <button id="button-add" type="button" class="am-btn am-btn-default"><span
                            class="am-icon-plus"></span> 新增
                    </button>
                    <button id="button-modify" type="button" class="am-btn am-btn-default a"><span
                            class="am-icon-pencil-square-o"></span>修改</button>
                </div>

                <ul id="is_page_count" class="am-pagination am-fr">
                    <%
                        int pageOfpage = 0;
                        if (pageNo % 5 == 0) {
                            pageOfpage = pageNo / 5;
                        } else {
                            pageOfpage = pageNo / 5 + 1;
                        }

                        if (pageOfpage > 1) {
                    %>
                    <li><a href="javascript:search(<%=(pageOfpage-1)*5%>)">«</a></li>
                    <%
                    } else {
                    %>
                    <li class="am-disabled"><a href="#">«</a></li>
                    <%
                        }

                        for (int i = (((pageOfpage - 1) * 5) + 1); i <= ((pageOfpage - 1) * 5 + 5); i++) {
                            if (i <= totalPages) {
                                if (i == pageNo) {
                    %>
                    <li class="am-active"><a href="javascript:search(<%=i %>)"><%=i %>
                    </a></li>
                    <%
                    } else {
                    %>
                    <li><a href="javascript:search(<%=i%>)"><%=i %>
                    </a></li>
                    <%
                                }
                            }
                        }

                        if ((pageOfpage) * 5 < totalPages) {
                    %>
                    <li><a href="javascript:search(<%=pageOfpage*5+1%>)">»</a></li>
                    <%
                    } else {
                    %>
                    <li class="am-disabled"><a href="#">»</a></li>
                    <%
                        }
                    %>
                </ul>
            </form>

        </div>
    </div>
</div>


<div style="width:580px" class="am-modal am-modal-alert" tabindex="-1" id="table_model">
    <div class="am-modal-dialog">
        <div class="am-modal-hd" id="table_model_name"></div>
        <div class="am-modal-bd">
            <table class="is-info-modify">
                <tr hidden="hidden">
                    <td>UID</td>
                    <td><input id="CORRECT_INFOUID"></td>
                    </td>
                </tr>
                <tr>
                    <td>编码</td>
                    <td><input id="table_row_no"></td>                    <td>不符合工作编号</td>
                    <td><input id="unstatisfiedNo"></td>
                </tr>                <tr>
                    <td>完成日期</td>
                    <td><input id="finishDate"></td>
                    <td>复审人员</td>
                    <td><input id="reviewPerson"></td>
                </tr>
                <tr>
                    <td>被审人员</td>
                    <td><input id="auditedPerson"></td>
                    <td>被审核日期</td>
                    <td><input id="auditedData"></td>
                </tr>
                <tr>
                    <td>重审日期</td>
                    <td><input id="reauditedData"></td>
                </tr>            </table>
        </div>
        <div class="am-modal-footer">
            <span class="am-modal-btn" id="button_sure">确定</span>
            <span class="am-modal-btn">取消</span>
        </div>
    </div>
</div>

</body>
</html>
