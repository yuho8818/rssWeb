<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@page import="com.rss.framework.business.*" %>
<%@page import="java.util.*" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>null</title>
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
    <script type="text/javascript" src="IC_js/null.js"></script>

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
                <ul class="am-icon-flag on">null</ul>
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
                    </tr>
                    </thead>
                    <tbody>
                    <tr hidden="true">
                        <td><input type="checkbox" id="hidden_check"/></td>
                        <td contenteditable="true"></td>
                        <td class="am-text-center" hidden="hidden"></td>
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
 