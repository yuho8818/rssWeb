<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>侧导航栏</title>
</head>
<body>

<form id="is_prepare_form" hidden="hidden" action="/StudentManageSystem/DataServiceServlet" method="POST">
    <input id="is_prepare_clientPage" name="clientPage" value="">
    <input id="is_prepare_ifPrepare" name="ifPrepare" value="true">
    <input id="is_prepare_serviceRequest" name="serviceRequest" value="">
    <button type="submit"></button>
</form>


<!-- 左侧导航栏 -->
<div class="nav-navicon admin-main admin-sidebar">

    <div class="sideMenu am-icon-dashboard" style="color:#aeb2b7; margin: 10px 0 0 0;"> 欢迎系统管理员：俞果</div>
    <div class="sideMenu">
        <h3 style="display:none;" class="am-icon-flag on"><em></em> <a href="#"></a></h3>
        <ul style="height:0px;padding:0px;display:none;"></ul>
        <h3 class="am-icon-flag"><em></em> <a href="#">安全环保管理</a></h3>
        <ul>
            <li><a href="./SEWAGE_INFO.jsp">污水管理</a></li>
            <li><a href="./SPECIALEQUIPMENT_INFO.jsp">特种设备管理</a></li>
            <li><a href="./EQUIPENV_INFO.jsp">设备环保管理</a></li>
            <li><a href="./SOILDCHEMICAL_INFO.jsp">固化体管理</a></li>
            <li><a href="./PERSONALHEALTH_INFO.jsp">人员健康管理</a></li>
            <li><a href="./SAFETRAIN_INFO.jsp">人员安全培训管理</a></li>
        </ul>

        <h3 class="am-icon-cart-plus"><em></em> <a href="#">实验室认证管理</a></h3>
        <ul>
            <li><a href="./QUALITYCONTROL_INFO.jsp">质量控制计划管理</a></li>
            <li><a href="./INTERNALAUDIT_INFO.jsp">内审管理</a></li>
            <li><a href="./OUTSIDEAUDIT_INFO.jsp">外审管理</a></li>
            <li><a href="./MANAGEMENTREVIEW_INFO.jsp">评审管理</a></li>
            <li><a href="./UNSTATISFIED_INFO.jsp">不符合工作管理</a></li>
            <li><a href="./CORRECT_INFO.jsp">纠正预防管理</a></li>
            <li><a href="./COMPLAINTS_INFO.jsp">申投诉管理</a></li>
            <li><a href="./SATISFACTIONSURVEY_INFO.jsp">﻿满意度调查管理</a></li>
        </ul>


    </div>
    <!-- sideMenu End -->

    <script type="text/javascript">
        jQuery(".sideMenu").slide({
            titCell: "h3", //鼠标触发对象
            targetCell: "ul", //与titCell一一对应，第n个titCell控制第n个targetCell的显示隐藏
            effect: "slideDown", //targetCell下拉效果
            delayTime: 300, //效果时间
            triggerTime: 150, //鼠标延迟触发时间（默认150）
            defaultPlay: true,//默认是否执行效果（默认true）
            returnDefault: true //鼠标从.sideMen移走后返回默认状态（默认false）
        });
    </script>
</div>

</body>
</html>