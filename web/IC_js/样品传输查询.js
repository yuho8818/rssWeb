/**
 * 
 */

$(document).ready(function(){
	/*查询*/
	
	prepare();
	
	$("#sample_transfer_search").click(function(){
		var pageNo =1;
		search(pageNo);
	})
})

function search(pageNo){
	var sampleCode =  $("#sampleCode_input").val();	
	var startTime = $("#startTime_input").val();
	var endTime = $("#endTime_input").val();
	var supplierName = $("#supplierName_input").val();
	var batchCode = $("#batchCode_input").val();
	var request="<BasicDAS><sample_transfer pageSize='5' pageNo='"+pageNo+"'><sampleCode operator='like'>"+sampleCode+"</sampleCode>" +
			"<startTime>"+startTime+"</startTime><endTime>"+endTime+"</endTime>" +
					"<supplierName operator='like'>"+supplierName+"</supplierName>" +
							"<batchCode operator='like'>"+batchCode+"</batchCode></sample_transfer></BasicDAS>";   
	var dataToSend =  "clientPage=样品传输查询&&serviceRequest="+request;
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
	 var request="<BasicDAS><sample_transfer pageSize='5' pageNo='1'></sample_transfer></BasicDAS>";   
     var dataToSend =  "clientPage=样品传输查询&&serviceRequest="+request;
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