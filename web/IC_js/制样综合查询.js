/**
 * 
 */

$(document).ready(function(){
	/*查询*/
	
	prepare();
	
	$("#sample_info_search").click(function(){
		var pageNo =1;
		search(pageNo);
	})
})

function search(pageNo){
	var sampleCode =  $("#sampleCode_input").val();	
	var barrelNo = $("#barrelNo_input").val();
	var supplierName = $("#supplierName_input").val();
	var batchCode = $("#batchCode_input").val();
    var enterTime = $("#enterTime_input").val();
    var exitTime = $("#exitTime_input").val();
	var request="<BasicDAS><sample_info pageSize='5' pageNo='"+pageNo+"'><sampleCode operator='like'>"+sampleCode+"</sampleCode>" +
			"<barrelNo operator='like'>"+barrelNo+"</barrelNo>" +
					"<supplierName operator='like'>"+supplierName+"</supplierName>" +
							"<batchCode operator='like'>"+batchCode+"</batchCode>" +
									"<enterTime>"+enterTime+"</enterTime>" +
											"<exitTime>"+exitTime+"</exitTime></sample_info></BasicDAS>";   
	var dataToSend =  "clientPage=制样综合查询&&serviceRequest="+request;
	$.ajax({
		type:"POST",
		async:false,
		url:"/StudentManageSystem/DataServiceServlet",
		data:dataToSend,
		success:function(data){
			$("#data_table").html($(data).find("#data_table").html());
			 $("#is_page_count").html($(data).find("#is_page_count").html());	
			/*排序*/
			$("td.am-text-center").each(function(){
				  var indexxx = $(this).closest('tr').index();
				  $(this).text(indexxx);
			  });
		},
	});	
}

function prepare(){	
	 var request="<BasicDAS><sample_info pageSize='5' pageNo='1'></sample_info></BasicDAS>";   
     var dataToSend =  "clientPage=制样综合查询&&serviceRequest="+request;
    $.ajax({
      type:"POST",
      async:false,
      url:"/StudentManageSystem/DataServiceServlet",
      data:dataToSend,
      success:function(data){  
	         $("#data_table").html($(data).find("#data_table").html());	
	         $("#is_page_count").html($(data).find("#is_page_count").html());	
          },
      });
	
}