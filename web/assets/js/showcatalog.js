/**
 * 
 */
function showhd(){
	var hd=document.getElementById('hd');  
	var s="";
	s="<div class='am-topbar-brand'><img src='assets/i/logo2.png'></div>";
	s+="<div class='am-collapse am-topbar-collapse' id='topbar-collapse'>";
	s+="<ul class='am-nav am-nav-pills am-topbar-nav admin-header-list'>";
	s+="<li class='am-dropdown tognzhi' data-am-dropdown>";
	s+="<button class='am-btn am-btn-primary am-dropdown-toggle ";
	s+="am-btn-xs am-radius am-icon-bell-o' data-am-dropdown-toggle> ";
	s+="消息管理<span class='am-badge am-badge-danger am-round'>6</span></button>";
	s+="</li>";
	s+="<li class='am-hide-sm-only' style='float: right;'>";
	s+="<a href='javascript:;' id='admin-fullscreen'><span class='am-icon-arrows-alt'></span>";
	s+="<span class='admin-fullText'>开启全屏</span></a>";
	s+="</li>";
	s+="</ul>";
	s+="</div>";
	hd.innerHTML=s;
}
function catalog(){
var idx=document.getElementById('idx');  
var s="";
s="<div class='am-cf admin-main'>" ;
s+="<div class='nav-navicon admin-main admin-sidebar'>";
    
    
    s+="<div class='sideMenu am-icon-dashboard' style='color:#aeb2b7; margin: 10px 0 0 0;'> 欢迎系统管理员：清风抚雪</div>";
    s+="<div class='sideMenu'>";
      s+="<h3 class='am-icon-flag'><em></em> <a href='#'>系统管理</a></h3>";
      s+="<ul>";
        s+="<li><a href='参数管理.jsp'>参数管理</a></li>";
        s+="<li><a href='部门管理.jsp'>部门管理</a></li>";
        s+="<li><a href='员工账号管理.jsp'>员工账号管理</a></li>";
        s+="<li><a href='职工权限管理.jsp'>职工权限管理</a></li>";
      s+="</ul>";
      s+="<h3 class='am-icon-cart-plus'><em></em> <a href='#'> 基础数据管理</a></h3>";
      s+="<ul>";
        s+="<li><a href='供应商管理.jsp'>供应商管理</a></li>";
        s+="<li><a href='车辆管理.jsp'>车辆管理</a></li>";
        s+="<li><a href='设备类型管理.jsp'>设备类型管理</a></li>";
        s+="<li><a href='工位管理.jsp'>工位管理</a></li>";
      s+="</ul>";
      s+="<h3 class='am-icon-users'><em></em> <a href='#'>散料综合管理</a></h3>";
      s+="<ul>";
        s+="<li><a href='入场计划管理.jsp'>入场计划管理</a> </li>";
        s+="<li><a href='jihua.jsp'>计划执行统计</a></li>";
        s+="<li><a href='进料明细表.jsp'>进料明细报表</a></li>";
        s+="<li><a href='进料综合查询.jsp'>进料综合查询 </a></li>";
        
       
      s+="</ul>";
        
      s+="<h3 class='am-icon-volume-up'><em></em> <a href='#'>台账管理</a></h3>";
      s+="<ul>";
        
        s+="<li><a href='车卡登记台账.jsp'>车卡登记台账</a></li>";
        s+="<li><a href='入场登记台账.html'>入场记录台账</a></li>";
        s+="<li><a href='车辆异常处理.html'>异常处理台账</a></li>";
        s+="<li><a href='样品采集台账.html'>样品采集台账</a></li>";
        s+="<li><a href='重磅计量台账.html'>重磅计量台账</a></li>";
        s+="<li><a href='卸货记录台账.html'>卸货记录台账</a></li>";
        s+="<li><a href='空磅计量台账.html'>空磅计量台账</a></li>";
        s+="<li><a href='卸货监管台账.jsp'>卸货监管台账</a></li>";
        s+="<li><a href='出厂验收台账.html'>出场验收台账</a></li>";
        
      s+="</ul>";
      
      s+="<h3 class='am-icon-volume-up'><em></em> <a href='#'>化验综合管理</a></h3>";
      s+="<ul>";
      s+="<li><a href='制样综合查询.jsp'>制样记录查询</a></li>";
      s+="<li><a href='样品传输查询.jsp'>样品传输查询</a></li>";
      s+="<li><a href='样品存取查询.jsp'>样品存储查询</a></li>";
      s+="<li><a href='样品化验管理.jsp'>样品化验管理</a></li>";
      s+="<li><a href='统计分析.jsp'>样品综合查询</a></li>";
       
      s+="</ul>";
      
       
    s+="</div>";
  //  <!-- sideMenu End --> 
idx.innerHTML=s;
}

function sidelog()
{
	catalog();
	jQuery('.sideMenu').slide({
	titCell:'h3', //鼠标触发对象
	targetCell:'ul', //与titCell一一对应，第n个titCell控制第n个targetCell的显示隐藏
	effect:'slideDown', //targetCell下拉效果
	delayTime:300 , //效果时间
	triggerTime:150, //鼠标延迟触发时间（默认150）
	defaultPlay:true,//默认是否执行效果（默认true）
	returnDefault:false//鼠标从.sideMen移走后返回默认状态（默认false）
		});	
}