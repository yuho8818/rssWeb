/**
 * 
 */

$(document).ready(function(){
	   
     prepare();
	
	 /*设置编号*/
	  $("td.am-text-center").each(function(){
		  var indexxx = $(this).closest('tr').index();
		  $(this).text(indexxx);
	  });
	

	
	/*全选*/
	  $("#check-all").click(function(){
		  
		  $("input[type=checkbox]").each(function(){
			  if(this.id != "check-all"){
				  this.checked = document.getElementById("check-all").checked;				  
			  }			  		  
		  })
		  //var cc = $("input[type=checkbox][id!=check-all]").attar("checked");
		  //$("#check-all").attr("checked",cc);
		  
		  $("#hidden_check").attr("checked",false);
	  })
	
	
	/*查询*/
	$("#dept_list_search").click(function(){
		var pageNo =1;
		search(pageNo);
	})
	
	
	 /*删除所选*/
	  $("#button-delete").click(function(){
		  
		  $("#delete_confirm").modal();
		  $("#delete_sure").click(function(){
			  $("input[type=checkbox]").each(function(){
				  if(this.checked && this.id != "check-all"){//$(this).is(':checked')
					  var tr = $(this).closest('tr');
					  var deptName;
					  var deptType;
					  var deptCode;
					  var deptLeader;
					  var leaderPhone;
					  var deptDuty;
					  var deptAddress;
					  var deptUID;
					  $(tr).find("td").each(function(){
						  var x = $(this).text();
						  switch($(this).index()){
						  case 2: deptName = x;break;
						  case 3: deptType = x;break;
						  case 4: deptCode = x;break;
						  case 5: deptLeader = x;break;
						  case 6: leaderPhone = x;break;
						  case 7: deptDuty = x;break;
						  case 8: deptAddress = x;break;
						  case 9: deptUID = x;break;
						  }
					  })
					  
					  var request ="<BasicDAS><dept_info operation='delete'><deptName>"+deptName+"</deptName><deptType>"+deptType+"</deptType>" +
			           "<deptCode>"+deptCode+"</deptCode>" +
					      "<deptLeader>"+deptLeader+"</deptLeader><leaderPhone>"+leaderPhone+"</leaderPhone>" +
							"<deptDuty>"+deptDuty+"</deptDuty><deptAddress>"+deptAddress+"</deptAddress>" +
							"<deptUID>"+deptUID+"</deptUID></dept_info></BasicDAS>";
			var dataToSend = "clientPage=部门管理&&serviceRequest="+request;
					  $.ajax({
							type:"POST",
							url:"/StudentManageSystem/DataServiceServlet",
							data:dataToSend,
							success:function(data,textStatus,jqXHR){
								 tr.remove();  
							}	
						});
				  }
				$("#check-all").attr("checked",false);
			  }				  		  
			  )
			  
			  $("td.am-text-center").each(function(){
				  var indexxx = $(this).closest('tr').index();
				  $(this).text(indexxx);
			  });
		  });
	  })
	
	
	
	/*新增*/
	$("#button-add").click(function(){
		$("#add_model").find("input").each(function(){
			$(this).val("");
		})
		
		$("#dept_no_add").removeAttr("disabled")
	     $("#dept_no_add").val($(".is-info-table").find("tbody").find("tr").last().index()+1);
	     $("#dept_no_add").attr("disabled",true);
		
		$("#add_model").modal();		
	  })	 
	  
	  /*新增确认*/
	  $("#add_sure").click(function(){
			var deptName = $("#deptName_add").val();
			var deptType = $("#deptType_add").val();
			var deptCode = $("#deptCode_add").val();
			var deptLeader = $("#deptLeader_add").val();
			var leaderPhone = $("#leaderPhone_add").val();
			var deptDuty = $("#deptDuty_add").val();
			var deptAddress = $("#deptAddress_add").val();
			
			/*生成UID*/
			var len = 32;
		    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
		    var maxPos = $chars.length;
		    var pwd = '';
		    for (i = 0; i < len; i++) {
		        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		    }
		    
		    
			var dept_infoUID=pwd;
			var request ="<BasicDAS><dept_info operation='save'><deptName>"+deptName+"</deptName>" +
					"<deptType>"+deptType+"</deptType><deptCode>"+deptCode+"</deptCode>" +
							"<deptLeader>"+deptLeader+"</deptLeader>" +
						    "<leaderPhone>"+leaderPhone+"</leaderPhone>" +
							"<deptDuty>"+deptDuty+"</deptDuty>" +
						    "<deptAddress>"+deptAddress+"</deptAddress>" +
						    "</dept_info></BasicDAS>"; 
			var dataToSend = "clientPage=部门管理&&serviceRequest="+request;
			
			$.ajax({
				type:"POST",
				url:"/StudentManageSystem/DataServiceServlet",
				data:dataToSend,
				success:function(data,textStatus,jqXHR){
					alert("新增确认！");
					var newTr =  $(".is-info-table tbody tr:first-child").clone();
					  $(newTr).attr("hidden",false);
					  $(newTr).removeAttr("disabled"); 
					  
					  $(newTr).find("td").eq(2).text(deptName);
					  $(newTr).find("td").eq(3).text(deptType);
					  $(newTr).find("td").eq(4).text(deptCode);
					  $(newTr).find("td").eq(5).text(deptLeader);
					  $(newTr).find("td").eq(6).text(leaderPhone);
					  $(newTr).find("td").eq(7).text(deptDuty);
					  $(newTr).find("td").eq(8).text(deptAddress);
					  $(newTr).find("td").eq(9).text(dept_infoUID);
					  
					  
					  $(newTr).appendTo(".is-info-table tbody");
					  
                    /*重新排序*/
					  $("td.am-text-center").each(function(){
						  var indexxx = $(this).closest('tr').index();
						  $(this).text(indexxx);
					  });
					
				}	
			});  
		}) 
		
		
		
		/*修改确认*/
$("#modify_sure").click(function(){
	alert("修改确认!");
	 var deptNo = $("#dept_no_modify").val();
	 var deptName = $("#deptName_modify").val();
	 var deptType = $("#deptType_modify").val();
	 var deptCode = $("#deptCode_modify").val();
	 var deptLeader = $("#deptLeader_modify").val();
	 var leaderPhone = $("#leaderPhone_modify").val();
	 var deptDuty = $("#deptDuty_modify").val();
	 var deptAddress = $("#deptAddress_modify").val();
	 var deptUID = $("#deptUID_modify").val();
	 request ="<BasicDAS><dept_info operation='update' unique='deptName'><deptName>"+deptName+"</deptName><deptType>"+deptType+"</deptType>" +
			"<deptCode>"+deptCode+"</deptCode><deptCode>"+deptCode+"</deptCode>" +
					"<deptLeader>"+deptLeader+"</deptLeader><leaderPhone>"+leaderPhone+"</leaderPhone>" +
							"<deptDuty>"+deptDuty+"</deptDuty><deptAddress>"+deptAddress+"</deptAddress>" +
									"<dept_infoUID>"+deptUID+"</dept_infoUID></dept_info></BasicDAS>";   
	var dataToSend = "clientPage=部门管理&&serviceRequest="+request;
	$.ajax({
		type:"POST",
		url:"/StudentManageSystem/DataServiceServlet",
		data:dataToSend,
		success:function(data,textStatus,jqXHR){
			$(".is-info-table").find("tbody").find("tr").eq(deptNo).find("td").each(function(){
				switch($(this).index()){
				    case 2: $(this).text(deptName);break;
					case 3: $(this).text(deptType);break;
					case 4: $(this).text(deptCode);break;
					case 5: $(this).text(deptLeader);break;
					case 6: $(this).text(leaderPhone);break;
					case 7: $(this).text(deptDuty);break;
					case 8: $(this).text(deptAddress);break;
					case 9: $(this).text(deptUID);break;
				}
			})
			
		}	
	});
})


})


/*删除单个*/
function delete_tr(obj){
	var deptName;
	var deptType;
	var deptCode;
	var deptLeader;
	var leaderPhone;
	var deptDuty;
	var deptAddress;
	var deptUID;
	  var Tr = obj.closest('tr');
		$(Tr).find("td").each(function(){
			switch($(this).index()){
			case 2:deptName = $(this).text();break;
			case 3:deptType = $(this).text();break;
			case 4:deptCode = $(this).text();break;
			case 5:deptLeader = $(this).text();break;
			case 6:leaderPhone = $(this).text();break;
			case 7:deptDuty = $(this).text();break;
			case 8:deptAddress = $(this).text();break;
			case 9:deptUID = $(this).text();break;
			}
		})	  
	  $("#delete_confirm").modal();
		
		
	  $("#delete_sure").click(function(){
		    
			var request ="<BasicDAS><dept_info operation='delete'><deptName>"+deptName+"</deptName><deptType>"+deptType+"</deptType>" +
			"<deptCode>"+deptCode+"</deptCode><deptCode>"+deptCode+"</deptCode>" +
					"<deptLeader>"+deptLeader+"</deptLeader><leaderPhone>"+leaderPhone+"</leaderPhone>" +
							"<deptDuty>"+deptDuty+"</deptDuty><deptAddress>"+deptAddress+"</deptAddress>" +
							"<dept_infoUID>"+deptUID+"</dept_infoUID></dept_info></BasicDAS>";   
			var dataToSend = "clientPage=部门管理&&serviceRequest="+request;
			alert(dataToSend);
			$.ajax({
				
				type:"POST",
				url:"/StudentManageSystem/DataServiceServlet",
				data:dataToSend,
				success:function(data,textStatus,jqXHR){
					 Tr.remove(); 
					  
					  $("td.am-text-center").each(function(){
						  var indexxx = $(this).closest('tr').index();
						  $(this).text(indexxx);
					  });
				}	
			});
	  });	 
}


/*修改*/
function modify_tr(obj){
	var Tr = obj.closest('tr');
	var deptName;
	var deptType;
	var deptCode;
	var deptLeader;
	var leaderPhone;
	var deptDuty;
	var deptAddress;
	var deptUID;
	
	$(Tr).find("td").each(function(){
		switch($(this).index()){
		    case 2:deptName = $(this).text();break;
			case 3:deptType = $(this).text();break;
			case 4:deptCode = $(this).text();break;
			case 5:deptLeader = $(this).text();break;
			case 6:leaderPhone = $(this).text();break;
			case 7:deptDuty = $(this).text();break;
			case 8:deptAddress = $(this).text();break;
			case 9:deptUID = $(this).text();break;
		}
	})
	     $("#dept_no_modify").removeAttr("disabled")
	     $("#dept_no_modify").val($(Tr).index());
	     $("#dept_no_modify").attr("disabled",true);
	     $("#deptName_modify").val(deptName);
		 $("#deptType_modify").val(deptType);
		 $("#deptCode_modify").val(deptCode);
		 $("#deptLeader_modify").val(deptLeader);
		 $("#leaderPhone_modify").val(leaderPhone);
		 $("#deptDuty_modify").val(deptDuty);
		 $("#deptAddress_modify").val(deptAddress);
		 $("#deptUID_modify").val(deptUID);
	
		 
	     $("#modify_model").modal();
}


/*单个拷贝*/
function copy_tr(obj){
	    var Tr = obj.closest('tr');
	    var deptName;
		var deptType;
		var deptCode;
		var deptLeader;
		var leaderPhone;
		var deptDuty;
		var deptAddress;
		var deptUID;
		
		$(Tr).find("td").each(function(){
			switch($(this).index()){
			    case 2:deptName = $(this).text();break;
				case 3:deptType = $(this).text();break;
				case 4:deptCode = $(this).text();break;
				case 5:deptLeader = $(this).text();break;
				case 6:leaderPhone = $(this).text();break;
				case 7:deptDuty = $(this).text();break;
				case 8:deptAddress = $(this).text();break;
				case 9:deptUID = $(this).text();break;
			}
		})
	  
		/*生成UID*/
			var len = 32;
		    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
		    var maxPos = $chars.length;
		    var pwd = '';
		    for (i = 0; i < len; i++) {
		        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		    }
		    
		    
			var dept_infoUID=pwd;
			var request ="<BasicDAS><dept_info operation='save'><deptName>"+deptName+"</deptName>" +
					"<deptType>"+deptType+"</deptType><deptCode>"+deptCode+"</deptCode>" +
							"<deptLeader>"+deptLeader+"</deptLeader>" +
						    "<leaderPhone>"+leaderPhone+"</leaderPhone>" +
							"<deptDuty>"+deptDuty+"</deptDuty>" +
						    "<deptAddress>"+deptAddress+"</deptAddress>" +
						    "</dept_info></BasicDAS>"; 
			var dataToSend = "clientPage=部门管理&&serviceRequest="+request;
	  
			$.ajax({
				type:"POST",
				url:"/StudentManageSystem/DataServiceServlet",
				data:dataToSend,
				success:function(data,textStatus,jqXHR){
					  var newTr = $(Tr).clone();
					  $(newTr).appendTo(".is-info-table tbody");
					  
					  
                    /*重新排序*/
					  $("td.am-text-center").each(function(){
						  var indexxx = $(this).closest('tr').index();
						  $(this).text(indexxx);
					  });
					
				}	
			});  
				  
}

function search(pageNo){
	var deptName =  $("#deptName_input").val();	
	var deptType = $("#deptType_select").val();	
	var request="<BasicDAS><dept_info pageSize='5' pageNo='"+pageNo+"'><deptName operator='like'>"+deptName+"</deptName>" +
			"<deptType>"+deptType+"</deptType></dept_info></BasicDAS>";   
	var dataToSend =  "clientPage=部门管理&&serviceRequest="+request;
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
	/*var request="<BasicDAS><system_param><paramName>部门类型</paramName></system_param></BasicDAS>";   
	var dataToSend ="clientPage=部门管理&&serviceRequest="+request;
	 $.ajax({
	      type:"POST",
	      async:false,
	      url:"/StudentManageSystem/DataServiceServlet",
	      data:dataToSend,
	      success:function(data){
	    	     alert($(data).find("#search_block"));     
		         $("#search_block").html($(data).find("#search_block").html());	
	          },
	 });
	
	request="<BasicDAS><system_param><paramName>部门类型</paramName></system_param></BasicDAS>";   
	dataToSend ="clientPage=部门管理&&serviceRequest="+request;
		 $.ajax({
		      type:"POST",
		      async:false,
		      url:"/StudentManageSystem/DataServiceServlet",
		      data:dataToSend,
		      success:function(data){
		    	     alert($("#modify_model"));
			         $("#modify_model").html($(data).find("#modify_model").html());
		          },
		 });
	 */
	
	 var request="<BasicDAS><dept_info pageSize='5' pageNo='1'></dept_info></BasicDAS>";   
     var dataToSend =  "clientPage=部门管理&&serviceRequest="+request;
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
