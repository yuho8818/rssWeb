/**
 * 
 */
/*
function dispather(path){
	var form = $("<form method='post' action='/StudentManageSystem/DataServiceServlet'>" +
			"<button type='submit'></button></form>");
	var clientPage = $("<input hidden='hidden' name='clientPage' value='部门管理'>");
	form.append(clientPage);
	  
	var serviceRequest = $("<input name='serviceRequest' value='<BasicDAS><dept_info pageSize=20 pageNo=1></dept_info></BasicDAS>'>");
	form.append(serviceRequest);
	
	form.submit();
}*/

function dispather(path){
	var form = $("#is_prepare_form");
	var serviceRequest = $("#is_prepare_serviceRequest");
	var clientPage = $("#is_prepare_clientPage");
	if(path == "污水管理"){
		clientPage.val(path);
		serviceRequest.val("<BasicDAS><system_param><paramName>污水管理</paramName></system_param></BasicDAS>");
		form.submit();
	}
	// else if(path == "参数管理"){
	// 	clientPage.val(path);
	// 	serviceRequest.val("<BasicDAS><system_param pageSize='20' pageNo='1'/></BasicDAS>");
	// 	form.submit();
	// }else if(path == "职工权限管理"){
	// 	clientPage.val(path);
	// 	serviceRequest.val("<BasicDAS><system_param pageSize='20' pageNo='1'/></BasicDAS>");
	// 	form.submit();
	// }else if(path == "员工账号管理"){
	// 	clientPage.val(path);
	// 	serviceRequest.val("<BasicDAS><dept_info></dept_info></BasicDAS>");
	// 	form.submit();
	// }else if(path == "样品传输查询"){
	// 	clientPage.val(path);
	// 	serviceRequest.val("<BasicDAS><system_param pageSize='20' pageNo='1'/></BasicDAS>");
	// 	form.submit();
	// }else if(path == "样品存取查询"){
	// 	clientPage.val(path);
	// 	serviceRequest.val("<BasicDAS><system_param pageSize='20' pageNo='1'/></BasicDAS>");
	// 	form.submit();
	// }else if(path == "制样综合查询"){
	// 	clientPage.val(path);
	// 	serviceRequest.val("<BasicDAS><system_param pageSize='20' pageNo='1'/></BasicDAS>");
	// 	form.submit();
	// }
	
}