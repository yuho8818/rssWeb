/**
 * 
 */
$(document).ready(function() {

	$("#bulk_info_search").click(function() {

		var registerTime = $("#registerTime").val();
		var supplierName = $("#supplierName").val();
		var cardNo = $("#cardNo").val();
		var bulkType = $("#bulkType").val();
		
		var request = "<BasicDAS><bulk_info pageSize='20' pageNo='1'><supplierName operator='like'>" + supplierName + "</supplierName>" +
			"<bulkType>" + bulkType + "</bulkType>" +
			"<cardNo>" + cardNo + "</cardNo>" +
			"<registerTime>"+registerTime+"</registerTime>"+
			"</bulk_info></BasicDAS>";
		document.location.href = "/StudentManageSystem/DataServiceServlet?clientPage=进料综合查询&&serviceRequest=" + request;

	})

})
