/**
 * 
 */




$(document).ready(function(){
	
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
	 
	  
	  /*删除所选*/
	  $("#button-delete").click(function(){
		  $("#delete_confirm").modal();
		  $("#delete_sure").click(function(){
			  $("input[type=checkbox]").each(function(){
				  if(this.checked && this.id != "check-all"){//$(this).is(':checked')
					  var tr = $(this).closest('tr');
					  tr.remove();				  
				  }
				$("#check-all").attr("checked",false)//document.getElementById("check-all").checked = false;
			  }				  		  
			  )
			  
			  $("td.am-text-center").each(function(){
				  var indexxx = $(this).closest('tr').index();
				  $(this).text(indexxx);
			  });
		  });
	  })
	   	  
	   /*新增*/
	  /* $("#button-add").click(function(){
		  var newTr =  $(".is-info-table tbody tr:first-child").clone();
		  $(newTr).attr("hidden",false);
		  $(newTr).removeAttr("disabled"); 
		  $(newTr).appendTo(".is-info-table tbody");		  
		  $("td.am-text-center").each(function(){
			  var indexxx = $(this).closest('tr').index();
			  $(this).text(indexxx);
		  });		  
	  })
	  */	
	  
	  
	  
});

/*单个拷贝*/
function copy_tr(obj){
	  var Tr = obj.closest('tr');
	  var newTr = $(Tr).clone();
	  $(newTr).appendTo(".is-info-table tbody");
	  
	  $("td.am-text-center").each(function(){
		  var indexxx = $(this).closest('tr').index();
		  $(this).text(indexxx);
	  });
}

/*单个删除*/






   
function show_detail(obj){
	var Tr = obj.closest('tr');
	$(Tr).children().each(function(){
		var indexx = $(this).index();
		var textt = $(this).text();
		var thTitle = $(".is-info-table").find("th").eq(indexx).text();		
		var ilen =  $(".is-info-modify").find("td").length / 2;
		//var jlen =  $(".is-info-table").find("th").find("td").length;
		for(var i=0;i<ilen;i++){
				var Title = $(".is-info-modify").find("td").eq(i*2).text();
				if(Title==thTitle){
					//if($(".is-info-modify").find("td").eq(i*2+1).children().is("input")){
						$(".is-info-modify").find("td").eq(i*2+1).find("input").val(textt);
						$(".is-info-modify").find("td").eq(i*2+1).find("select").val(textt);
					//}
									
			}			 
		}
	})
	$("#detail_model").find("input").attr("disabled","true");
	$("#detail_model").modal();
}


