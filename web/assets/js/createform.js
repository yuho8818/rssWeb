/**
 * 
 */
function intiateform(id){
	var bdy=document.body;
	var dv=document.createElement('div');
	var tp="";
	//<!--BEGIN MODAL CONFIG PORTLET-->
	tp="<div id="+id+" class='modal fade'>";
	tp+="<div>";
	tp+="<div class='modal-content'>";
	tp+="<div class='modal-header'>";
	tp+="<button type='button' data-dismiss='modal' aria-hidden='true' class='close' ";
	tp+=">";
	tp+="&times;</button>";
	tp+="<h4 class='modal-title'>"+"详细信息"+"</h4>";
	tp+="</div><div id='form"+id+"' class='modal-body'>";
	
//插入表格内容
	tp+=" <form id='pfm' class='am-form am-g'>";
    tp+=" <table id='ptbe' class='table-table am-table am-table-bordered am-table-radius am-table-striped'>";
	tp+="</table>";
	tp+= "<div id='pbatch' class='am-btn-group am-btn-group-xs'></div>";
     tp+="</form>";
	//
       tp+="</div><div class='modal-footer'>";
       tp+="<button type='button' data-dismiss='modal' ";
       tp+=" class='btn btn-default'> Close</button>";
       tp+="<button type='button' class='btn btn-primary' disabled>Save changes</button>";
       tp+="</div></div> </div></div>";
       // <!--END MODAL CONFIG PORTLET-->
       dv.innerHTML=tp;
       bdy.appendChild(dv);
}