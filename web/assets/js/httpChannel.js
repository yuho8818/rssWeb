/**
 * 
 */
function findall(uri,database,pageNo){
	var pageNo=arguments[2] ? arguments[2] :1;
	var request="<BasicDAS><"+database+" pageSize='20' pageNo='"+pageNo+"'/></BasicDAS>";
	document.location.href ="/StudentManageSystem/DataServiceServlet?clientPage="+uri+"&&serviceRequest="+request;
}