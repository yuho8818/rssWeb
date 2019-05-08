/**
 * 
 */

function authority_set_tr(obj){
	var Tr = obj.closest('tr');
	  $("#authority_set").modal();	 
	  
	  
}

$(document).ready(function(){
	/*$(".authority_check").click(function(){
		var checkIf = this.checked;
		if(checkIf){
			$(this).parent().find("ul").find("input").each(function(){
				this.checked = true;	
				//$(this).attr("checked",true); 不知为什么行不通
			});
		}else{
			$(this).parent().find("ul").find("input").each(function(){
				//this.checked = false;		
			});
		}			
	});	*/
	
	$(".authority_check").on("click",function(){
		$(".authority_check").click(function(){
			var checkIf = this.checked;
			if(checkIf){
				$(this).parent().find("ul").find("input").each(function(){
					this.checked = true;		
				});
			}else{
				$(this).parent().find("ul").find("input").each(function(){
					this.checked = false;		
				});
			}			
		});	
	})
})