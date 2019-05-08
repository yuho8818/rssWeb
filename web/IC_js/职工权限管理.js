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
	$("#role_info_list_search").click(function(){
		var pageNo = 1;
		search(pageNo);
	
		//document.location.href="/StudentManageSystem/DataServiceServlet?"+dataToSend;				
	}) 
	
	/*删除所选*/
	  $("#button-delete").click(function(){
		  $("#delete_confirm").modal();
		  $("#delete_sure").click(function(){
			  $("input[type=checkbox]").each(function(){
				  if(this.checked && this.id != "check-all"){//$(this).is(':checked')
					  var tr = $(this).closest('tr');
					  var roleName;
					  var functionName;
					  var rolePermission;
					  var role_infoUID;
					  $(tr).find("td").each(function(){
						  var x = $(this).text();
						  switch($(this).index()){
						  case 2: roleName = x;break;
						  case 3: functionName = x;break;
						  case 4: rolePermission = x;break;
						  case 5: role_infoUID = x;break;
						  }
					  })
					  
					  var request ="<BasicDAS><role_info operation='delete'><roleName>"+roleName+"</roleName>" +
					  		"<functionName>"+functionName+"</functionName>" +
			              "<rolePermission>"+rolePermission+"</rolePermission>" +
					    "<role_infoUID>"+role_infoUID+"</role_infoUID></role_info></BasicDAS>";
			var dataToSend = "clientPage=职工权限管理&&serviceRequest="+request;
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
			
			$("#role_info_no_add").removeAttr("disabled")
		     $("#role_info_no_add").val($(".is-info-table").find("tbody").find("tr").last().index()+1);
		     $("#role_info_no_add").attr("disabled",true);
			
			$("#add_model").modal();		
		  })	 
		  
		  /*新增确认*/
		  $("#add_sure").click(function(){
				var roleName = $("#roleName_add").val();
				var functionName = $("#functionName_add").val();
				var rolePermission = $("#rolePermission_add").val();
				var role_infoUID ;
				
				
				/*生成UID*/
				var len = 18;
			    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
			    var maxPos = $chars.length;
			    var pwd = '';
			    for (i = 0; i < len; i++) {
			        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
			    }
			    
			    
				var role_infoUID=pwd;
				var request ="<BasicDAS><role_info operation='save'><roleName>"+roleName+"</roleName>" +
						"<functionName>"+functionName+"</functionName><rolePermission>"+rolePermission+"</rolePermission>" +
								"</role_info></BasicDAS>"; 
				var dataToSend = "clientPage=职工权限管理&&serviceRequest="+request;
				
				$.ajax({
					type:"POST",
					url:"/StudentManageSystem/DataServiceServlet",
					data:dataToSend,
					success:function(data,textStatus,jqXHR){
						alert("新增确认！");
						var newTr =  $(".is-info-table tbody tr:first-child").clone();
						  $(newTr).attr("hidden",false);
						  $(newTr).removeAttr("disabled"); 
						  
						  $(newTr).find("td").eq(2).text(roleName);
						  $(newTr).find("td").eq(3).text(functionName);
						  $(newTr).find("td").eq(4).text(rolePermission);
						  $(newTr).find("td").eq(5).text(role_infoUID);
				  
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
	 var role_infoNo = $("#role_info_no_modify").val();
	 var roleName = $("#roleName_modify").val();
	 var functionName = $("#functionName_modify").val();
	 var rolePermission = $("#rolePermission_modify").val();
	 var role_infoUID = $("#role_infoUID_modify").val();
	 
	 request ="<BasicDAS><role_info operation='update' unique='roleName'><roleName>"+roleName+"</roleName><functionName>"+functionName+"</functionName>" +
			"<rolePermission>"+rolePermission+"</rolePermission><rolePermission>"+rolePermission+"</rolePermission>" +
					"<role_infoUID>"+role_infoUID+"</role_infoUID></role_info></BasicDAS>";   
	var dataToSend = "clientPage=职工权限管理&&serviceRequest="+request;
	$.ajax({
		type:"POST",
		url:"/StudentManageSystem/DataServiceServlet",
		data:dataToSend,
		success:function(data,textStatus,jqXHR){
			$(".is-info-table").find("tbody").find("tr").eq(role_infoNo).find("td").each(function(){
				switch($(this).index()){
				    case 2: $(this).text(roleName);break;
					case 3: $(this).text(functionName);break;
					case 4: $(this).text(rolePermission);break;
					case 5: $(this).text(role_infoUID);break;
					
				}
			})
			
		}	
	});
})
	  
})

/*删除单个*/
function delete_tr(obj){
	var roleName;
	var functionName;
	var rolePermission;
	var role_infoUID;
	
	  var Tr = obj.closest('tr');
		$(Tr).find("td").each(function(){
			switch($(this).index()){
			case 2:roleName = $(this).text();break;
			case 3:functionName = $(this).text();break;
			case 4:rolePermission = $(this).text();break;
			case 5:role_infoUID = $(this).text();break;
			}
		})	  
	  $("#delete_confirm").modal();
		
		
	  $("#delete_sure").click(function(){
		    
			var request ="<BasicDAS><role_info operation='delete'><roleName>"+roleName+"</roleName><functionName>"+functionName+"</functionName>" +
			"<rolePermission>"+rolePermission+"</rolePermission><rolePermission>"+rolePermission+"</rolePermission>" +
					"<role_infoUID>"+role_infoUID+"</role_infoUID></role_info></BasicDAS>";   
			var dataToSend = "clientPage=职工权限管理&&serviceRequest="+request;
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
	var roleName;
	var functionName;
	var rolePermission;
	var role_infoUID;
	
	
	$(Tr).find("td").each(function(){
		switch($(this).index()){
		    case 2:roleName = $(this).text();break;
			case 3:functionName = $(this).text();break;
			case 4:rolePermission = $(this).text();break;
			case 5:role_infoUID = $(this).text();break;
			
		}
	})
	     $("#role_info_no_modify").removeAttr("disabled")
	     $("#role_info_no_modify").val($(Tr).index());
	     $("#role_info_no_modify").attr("disabled",true);
	     $("#roleName_modify").val(roleName);
		 $("#functionName_modify").val(functionName);
		 $("#rolePermission_modify").val(rolePermission);
		 $("#role_infoUID_modify").val(role_infoUID);
		 
	
		 
	     $("#modify_model").modal();
}


/*单个拷贝*/
function copy_tr(obj){
	    var Tr = obj.closest('tr');
	    var roleName;
		var functionName;
		var rolePermission;
		var role_infoUID;
		
		
		$(Tr).find("td").each(function(){
			switch($(this).index()){
			    case 2:roleName = $(this).text();break;
				case 3:functionName = $(this).text();break;
				case 4:rolePermission = $(this).text();break;
				case 5:role_infoUID = $(this).text();break;
			}
		})
	  
		/*生成UID*/
			var len = 18;
		    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
		    var maxPos = $chars.length;
		    var pwd = '';
		    for (i = 0; i < len; i++) {
		        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		    }
		    
		    
			var role_infoUID=pwd;
			var request ="<BasicDAS><role_info operation='save'><roleName>"+roleName+"</roleName>" +
					"<functionName>"+functionName+"</functionName><rolePermission>"+rolePermission+"</rolePermission>" +
							"<role_infoUID>"+role_infoUID+"</role_infoUID></role_info></BasicDAS>"; 
			var dataToSend = "clientPage=职工权限管理&&serviceRequest="+request;
	  
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
	var roleName =  $("#roleName_input").val();	
	var request="<BasicDAS><role_info pageSize='5' pageNo='"+pageNo+"'><roleName operator='like'>"+roleName+"</roleName>" +
			"</role_info></BasicDAS>";   
	var dataToSend ="clientPage=职工权限管理&&serviceRequest="+request;
	$.ajax({
		type:"POST",
		async:false,
		url:"/StudentManageSystem/DataServiceServlet",
		data:dataToSend,
		success:function(data){
			$("#data_table").html($(data).find("#data_table").html());	
			/*重新排序*/
			  $("td.am-text-center").each(function(){
				  var indexxx = $(this).closest('tr').index();
				  $(this).text(indexxx);
			  });		
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$("#data_table").html($(data).find("#data_table").html());
			$("#is_page_count").html($(data).find("#is_page_count").html());
			/*重新排序*/
			  $("td.am-text-center").each(function(){
				  var indexxx = $(this).closest('tr').index();
				  $(this).text(indexxx);
			  });
		},
	});	
}

/*加载前数据准备*/
function prepare(){
	var request="<BasicDAS><role_info pageSize='5' pageNo='1'/></BasicDAS>";   
	var dataToSend ="clientPage=职工权限管理&&serviceRequest="+request;
	$.ajax({
		type:"POST",
		async:false,
		url:"/StudentManageSystem/DataServiceServlet",
		data:dataToSend,
		success:function(data){
			$("#data_table").html($(data).find("#data_table").html());	
			$("#is_page_count").html($(data).find("#is_page_count").html());	
			/*重新排序*/
			  $("td.am-text-center").each(function(){
				  var indexxx = $(this).closest('tr').index();
				  $(this).text(indexxx);
			  });
		},
	});
}