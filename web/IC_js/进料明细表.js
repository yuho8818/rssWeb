/**
 * 
 */
$(document).ready(function() {

	$("#bulk_info_search").click(function() {

		var registerTime = $("#registerTime").val();
		var supplierName = $("#supplierName").val();
		var bulkType = $("#bulkType").val();
		var temp;
		if(registerTime==""&&supplierName==""&&bulkType==""){
			temp="";
		}else if(registerTime!=""&&supplierName==""&&bulkType==""){
			temp="where registerTime=\""+registerTime+"\"";
		}else if(registerTime==""&&supplierName!=""&&bulkType==""){
			temp="where supplierName=\""+supplierName+"\"";
		}else if(registerTime==""&&supplierName==""&&bulkType!=""){
			temp="where bulkType=\""+bulkType+"\"";
		}else if(registerTime!=""&&supplierName!=""&&bulkType==""){
			temp="where registerTime=\""+registerTime+"\" and supplierName=\""+supplierName+"\"";
		}else if(registerTime!=""&&supplierName==""&&bulkType!=""){
			temp="where registerTime=\""+registerTime+"\" and bulkType=\""+bulkType+"\"";
		}else if(registerTime==""&&supplierName!=""&&bulkType!=""){
			temp="where supplierName=\""+supplierName+"\" and bulkType=\""+bulkType+"\"";
		}else if(registerTime!=""&&supplierName!=""&&bulkType!=""){
			temp="where registerTime=\""+registerTime+"\" and supplierName=\""+supplierName+"\" and bulkType=\""+bulkType+"\"";
		}
		
		var sql = "select (SUM(grossWeight)-SUM(emptyWeight)-SUM(bulkAmount)) as travelCut,(SUM(grossWeight)-SUM(emptyWeight)-SUM(bulkAmount)-SUM(waterDeduct)-(-SUM(gangueDeduct))) as lose,(SUM(grossWeight)-SUM(emptyWeight)) as realNum,(SUM(waterDeduct)-SUM(gangueDeduct)) as allCut,supplierName,bulkType,unloadStation,registerTime,count(cardNo) as carNum,SUM(bulkAmount) as bulkNum,SUM(grossWeight) as grossNum,SUM(emptyWeight) as emptyNum FROM db.bulk_info "+temp+" group by supplierName,bulkType,unloadStation,registerTime;"

		alert(sql);
		
		var request = "<BasicDAS><bulk_info operation='query' pageSize='20' pageNo='1' sql='"+sql+"'/></BasicDAS>";

//		var request = "<BasicDAS><bulk_info pageSize='20' pageNo='1'><supplierName operator='like'>" + supplierName + "</supplierName>" +
//			"<bulkType>" + bulkType + "</bulkType>" + 
//			"<registerTime>" + registerTime + "</registerTime>" + 
//			"</bulk_info></BasicDAS>";		
		
		document.location.href = "/StudentManageSystem/DataServiceServlet?clientPage=进料明细表&&serviceRequest=" + request;
	})

})
function openLogin() {
	document.getElementById("win").style.display = "";
}
function closeLogin() {
	document.getElementById("win").style.display = "none";
}