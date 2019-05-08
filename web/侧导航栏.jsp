<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
       
    <div class="sideMenu am-icon-dashboard" style="color:#aeb2b7; margin: 10px 0 0 0;"> 欢迎系统管理员：清风抚雪</div>
    <div class="sideMenu">
      <h3 style="display:none;" class="am-icon-flag on"><em></em> <a href="#"></a></h3>
      <ul style="height:0px;padding:0px;display:none;"></ul>
      <h3 class="am-icon-flag"><em></em> <a href="#">系统管理</a></h3>
      <ul>
        <li><a href="javascript:dispather('参数管理')">参数管理</a></li>
        <li><a href="javascript:dispather('部门管理')">部门管理</a></li>
        <li><a href="javascript:dispather('员工账号管理')">员工账号管理</a></li>
        <li><a href="职工权限管理.jsp">职工权限管理</a></li>
      </ul>
      <h3 class="am-icon-cart-plus"><em></em> <a href="#"> 基础数据管理</a></h3>
      <ul>
        <li><a href="供应商管理.jsp">供应商管理</a></li>
        <li><a href="车辆管理.jsp">车辆管理</a></li>
        <li><a href="设备类型管理.jsp">设备管理</a></li>
        <li><a href="工位管理.jsp">工位管理</a></li>
      </ul>
     
     <h3 class="am-icon-volume-up"><em></em> <a href="#">散料综合管理</a></h3>
      <ul>
        <li><a href="入场计划管理.jsp">入场计划管理</a> </li>
        <li><a href="jihua.jsp">计划执行统计</a></li>
        <li><a href="进料明细表.jsp">进料明细报表</a></li>
        <li><a href="进料综合查询.jsp">进料综合查询 </a></li>
        <li><a >进料统计报表</a></li>
      </ul>
                 
      <h3 class="am-icon-gears"><em></em> <a href="#">台账管理</a></h3>
      <ul>
        <li><a href="车卡登记台账.jsp">车卡登记台账</a></li>
        <li><a href="入场登记台账.html">入场记录台账</a></li>
        <li><a href="车辆异常处理.html">异常处理台账</a></li>
        <li><a href="样品采集台账.html">样品采集台账</a></li>
        <li><a href="重磅计量台账.html">重磅计量台账</a></li>
        <li><a href="卸货记录台账.html">卸货记录台账</a></li>
        <li><a href="空磅计量台账.html">空磅计量台账</a></li>
        <li><a href="卸货监管台账.jsp">卸货监管台账</a></li>
        <li><a href="出厂验收台账.html">出场验收台账</a></li>
      </ul>
            
      <h3 class="am-icon-gears"><em></em> <a href="#">化验综合管理</a></h3>
      <ul>
        <li><a href="javascript:dispather('制样综合查询')">制样综合查询</a></li>
        <li><a href="javascript:dispather('样品传输查询')">样品传输查询</a></li>
        <li><a href="javascript:dispather('样品存取查询')">样品存取查询</a></li>
        <li><a href="样品化验管理.jsp">样品化验管理</a></li>
         
      </ul>
      
    </div>
    <!-- sideMenu End --> 
    
    <script type="text/javascript">
			jQuery(".sideMenu").slide({
				titCell:"h3", //鼠标触发对象
				targetCell:"ul", //与titCell一一对应，第n个titCell控制第n个targetCell的显示隐藏
				effect:"slideDown", //targetCell下拉效果
				delayTime:300 , //效果时间
				triggerTime:150, //鼠标延迟触发时间（默认150）
				defaultPlay:true,//默认是否执行效果（默认true）
				returnDefault:true //鼠标从.sideMen移走后返回默认状态（默认false）
				});
		</script>    
</div>

</body>
</html>