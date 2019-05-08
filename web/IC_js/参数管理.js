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
	$("#system_param_list_search").click(function(){
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
					  var paramName;
					  var paramType;
					  var paramValues;
					  var system_paramUID;
					  $(tr).find("td").each(function(){
						  var x = $(this).text();
						  switch($(this).index()){
						  case 2: paramName = x;break;
						  case 3: paramType = x;break;
						  case 4: paramValues = x;break;
						  case 5: system_paramUID = x;break;
						  }
					  })
					  
					  var request ="<BasicDAS><system_param operation='delete'><paramName>"+paramName+"</paramName>" +
					  		"<paramType>"+paramType+"</paramType>" +
			              "<paramValues>"+paramValues+"</paramValues>" +
					    "<system_paramUID>"+system_paramUID+"</system_paramUID></system_param></BasicDAS>";
			var dataToSend = "clientPage=参数管理&&serviceRequest="+request;
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
			
			$("#system_param_no_add").removeAttr("disabled")
		     $("#system_param_no_add").val($(".is-info-table").find("tbody").find("tr").last().index()+1);
		     $("#system_param_no_add").attr("disabled",true);
			
			$("#add_model").modal();		
		  })	 
		  
		  /*新增确认*/
		  $("#add_sure").click(function(){
				var paramName = $("#paramName_add").val();
				var paramType = $("#paramType_add").val();
				var paramValues = $("#paramValues_add").val();
				var system_paramUID ;
				
				
				/*生成UID*/
				var len = 18;
			    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
			    var maxPos = $chars.length;
			    var pwd = '';
			    for (i = 0; i < len; i++) {
			        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
			    }
			    
			    
				var system_paramUID=pwd;
				/*var request ="<BasicDAS><system_param operation='save'><paramName>"+paramName+"</paramName>" +
						"<paramType>"+paramType+"</paramType><paramValues>"+paramValues+"</paramValues>" +
								"</system_param></BasicDAS>"; */
				var request ="<BasicDAS><system_param operation='save'><paramName>"+paramName+"</paramName>" +
						"<paramType>"+paramType+"</paramType><paramValues>"+paramValues+"</paramValues>" +
								"</system_param></BasicDAS>"; 
				var dataToSend = "clientPage=参数管理&&serviceRequest="+request;
				
				$.ajax({
					type:"POST",
					url:"/StudentManageSystem/DataServiceServlet",
					data:dataToSend,
					success:function(data,textStatus,jqXHR){
						alert("新增确认！");
						var newTr =  $(".is-info-table tbody tr:first-child").clone();
						  $(newTr).attr("hidden",false);
						  $(newTr).removeAttr("disabled"); 
						  
						  $(newTr).find("td").eq(2).text(paramName);
						  $(newTr).find("td").eq(3).text(paramType);
						  $(newTr).find("td").eq(4).text(paramValues);
						  $(newTr).find("td").eq(5).text(system_paramUID);
				  
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
				 var system_paramNo = $("#system_param_no_modify").val();
				 var paramName = $("#paramName_modify").val();
				 var paramType = $("#paramType_modify").val();
				 var paramValues = $("#paramValues_modify").val();
				 var system_paramUID = $("#system_paramUID_modify").val();
				 
				 request ="<BasicDAS><system_param operation='update' unique='paramName'><paramName>"+paramName+
				 "</paramName><paramType>"+paramType+"</paramType>" +
						"<paramValues>"+paramValues+"</paramValues>" +
								"<system_paramUID>"+system_paramUID+"</system_paramUID></system_param></BasicDAS>";   
				var dataToSend = "clientPage=参数管理&&serviceRequest="+request;
				alert(dataToSend);
				$.ajax({
					type:"POST",
					url:"/StudentManageSystem/DataServiceServlet",
					data:dataToSend,
					success:function(data,textStatus,jqXHR){
						$(".is-info-table").find("tbody").find("tr").eq(system_paramNo).find("td").each(function(){
							switch($(this).index()){
							    case 2: $(this).text(paramName);break;
								case 3: $(this).text(paramType);break;
								case 4: $(this).text(paramValues);break;
								case 5: $(this).text(system_paramUID);break;
								
							}
						})
						
					}	
				});
			})
				  
			})

/*删除单个*/
function delete_tr(obj){
	var paramName;
	var paramType;
	var paramValues;
	var system_paramUID;
	
	  var Tr = obj.closest('tr');
		$(Tr).find("td").each(function(){
			switch($(this).index()){
			case 2:paramName = $(this).text();break;
			case 3:paramType = $(this).text();break;
			case 4:paramValues = $(this).text();break;
			case 5:system_paramUID = $(this).text();break;
			}
		})	  
	  $("#delete_confirm").modal();
		
		
	  $("#delete_sure").click(function(){
		    
			var request ="<BasicDAS><system_param operation='delete'><paramName>"+paramName+"</paramName><paramType>"+paramType+"</paramType>" +
			"<paramValues>"+paramValues+"</paramValues><paramValues>"+paramValues+"</paramValues>" +
					"<system_paramUID>"+system_paramUID+"</system_paramUID></system_param></BasicDAS>";   
			var dataToSend = "clientPage=参数管理&&serviceRequest="+request;
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
	var paramName;
	var paramType;
	var paramValues;
	var system_paramUID;
	
	
	$(Tr).find("td").each(function(){
		switch($(this).index()){
		    case 2:paramName = $(this).text();break;
			case 3:paramType = $(this).text();break;
			case 4:paramValues = $(this).text();break;
			case 5:system_paramUID = $(this).text();break;
			
		}
	})
	     $("#system_param_no_modify").removeAttr("disabled")
	     $("#system_param_no_modify").val($(Tr).index());
	     $("#system_param_no_modify").attr("disabled",true);
	     $("#paramName_modify").val(paramName);
		 $("#paramType_modify").val(paramType);
		 $("#paramValues_modify").val(paramValues);
		 $("#system_paramUID_modify").val(system_paramUID);
		 
	
		 
	     $("#modify_model").modal();
}


/*单个拷贝*/
function copy_tr(obj){
	    var Tr = obj.closest('tr');
	    var paramName;
		var paramType;
		var paramValues;
		var system_paramUID;
		
		
		$(Tr).find("td").each(function(){
			switch($(this).index()){
			    case 2:paramName = $(this).text();break;
				case 3:paramType = $(this).text();break;
				case 4:paramValues = $(this).text();break;
				case 5:system_paramUID = $(this).text();break;
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
		    
		    
			var system_paramUID=pwd;
			var request ="<BasicDAS><system_param operation='save'><paramName>"+paramName+"</paramName>" +
					"<paramType>"+paramType+"</paramType><paramValues>"+paramValues+"</paramValues>" +
							"</system_param></BasicDAS>"; 
			var dataToSend = "clientPage=参数管理&&serviceRequest="+request;
	  
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
	var paramName =  $("#paramName_input").val();	
	var paramType = $("#paramType_select").val();
	var request="<BasicDAS><system_param pageSize='5' pageNo='"+pageNo+"'><paramName operator='like'>"+paramName+"</paramName>" +
			"<paramType>"+paramType+"</paramType></system_param></BasicDAS>";   
	var dataToSend ="clientPage=参数管理&&serviceRequest="+request;
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
	var request="<BasicDAS><system_param pageSize='5' pageNo='1'/></BasicDAS>";   
	var dataToSend ="clientPage=参数管理&&serviceRequest="+request;
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
