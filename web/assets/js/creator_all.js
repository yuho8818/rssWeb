/**
 * 
 */
function createselector(id,data){
	var sel=document.getElementById(id);
  	var s="";
  	s+="<li><select style='font-size:13px'>";
  	s+="<option value='0'>请选择"+data[0]+"</option>";
  	for(var i=1;i<data.length;i++)
  		{
  		s+="<option value='"+data[i]+"'>"+data[i]+"</option>";
  		}
  	s+="</select></li>";
  
  	sel.innerHTML+=s;
}
function intiatedetailwindow(id){
	var cont=arguments[1] ? arguments[1] :[];
	var bdy=document.body;
	var dv=document.createElement('div');
	var tp="";
	//<!--BEGIN MODAL CONFIG PORTLET-->
	tp="<div id="+id+" class='modal fade'>";
	tp+="<div class='modal-dialog'>";
	tp+="<div class='modal-content'>";
	tp+="<div class='modal-header'>";
	tp+="<button type='button' data-dismiss='modal' aria-hidden='true' class='close' ";
	tp+=">";
	tp+="&times;</button>";
	tp+="<h4 class='modal-title'>"+"详细信息"+"</h4>";
	tp+="</div><div id='detail"+id+"' class='modal-body'>";
	
//插入表格内容
	tp+=cont;
       tp+="</div><div class='modal-footer'>";
       tp+="<button type='button' data-dismiss='modal' ";
       tp+=" class='btn btn-default'> Close</button>";
       tp+="<button type='button'  class='btn btn-primary' >Save changes</button>";
       tp+="</div></div> </div></div>";
       // <!--END MODAL CONFIG PORTLET-->
       dv.innerHTML=tp;
       bdy.appendChild(dv);
}

function intiateeditwindow(id){
	var cont=arguments[1] ? arguments[1] :[];
	var bdy=document.body;
	var dv=document.createElement('div');
	var tp="";
	//<!--BEGIN MODAL CONFIG PORTLET-->
	tp="<div id="+id+" class='modal fade'>";
	tp+="<div class='modal-dialog'>";
	tp+="<div class='modal-content'>";
	tp+="<div class='modal-header'>";
	tp+="<button type='button' data-dismiss='modal' aria-hidden='true' class='close' ";
	tp+=">";
	tp+="&times;</button>";
	tp+="<h4 class='modal-title'>"+"详细信息"+"</h4>";
	tp+="</div><div id='edit"+id+"' class='modal-body'>";
	
//插入表格内容
	tp+=cont;
       tp+="</div><div class='modal-footer'>";
       tp+="<button type='button' data-dismiss='modal' ";
       tp+=" class='btn btn-default'> Close</button>";
       tp+="<button type='button' onclick='confirm_edit();return false' class='btn btn-primary'>Save changes</button>";
       
       tp+="</div></div> </div></div>";
       // <!--END MODAL CONFIG PORTLET-->
       dv.innerHTML=tp;
       bdy.appendChild(dv);
}


function alterdetailwindow(id)
{
	var cont=arguments[1] ? arguments[1] :[];
	var dv=document.getElementById('detail'+id);
	dv.innerHTML=cont;
}
function altereditwindow(id)
{
	var cont=arguments[1] ? arguments[1] :[];
	var dv=document.getElementById('edit'+id);
	dv.innerHTML=cont;
}

function confirm_edit()
{
	/*
	var f=confirm("确认要保存吗?");
	if(f)
		{
		var k=sqllist.length-1;
		
		String request="<BasicDAS><"+sqllist[k]+" operation='update'>"; 
		for(var i=0;i<k;i++){
			var ipt=document.getElementById('edit'+i).value;
			request+="<"+sqllist[i]+">"+ipt+"</"+sqllist[i]+">";
		}
		document.location.href ="/StudentManmageSystem/DataServiceServlket?clientPage="+uri+"&&serviceRequest="+request;
		}
	*/
}
