 /**
 * 
 */
function deletedata(id,uri)//id:数据在数组中的位置
{
	var f=confirm("确认要删除吗?")
	var alvalue=arguments[2] ? arguments[2] :[];
	var sqllist=arguments[3] ? arguments[3] :[];
	if(f){
		var k=sqllist.length-1;
		
		var request="<BasicDAS><"+sqllist[k]+" operation='delete'>"; 
		for(var i=k-1;i<k;i++){
			var ipt=alvalue[id][i];
			request+="<"+sqllist[i]+">"+ipt+"</"+sqllist[i]+">";
		}
		request+="</"+sqllist[k]+"></BasicDAS>";
		document.location.href ="/StudentManageSystem/DataServiceServlet?clientPage="+uri+"&&serviceRequest="+request;
	}

}
function copydata(id,uri)//id:数据在数组中的位置
{
	var f=confirm("确认要复制吗?")
	var alvalue=arguments[2] ? arguments[2] :[];
	var sqllist=arguments[3] ? arguments[3] :[];
	if(f){
		var k=sqllist.length-1;
		
		var request="<BasicDAS><"+sqllist[k]+" operation='save'>"; 
		for(var i=0;i<k-1;i++){
			var ipt=alvalue[id][i];
			request+="<"+sqllist[i]+">"+ipt+"</"+sqllist[i]+">";
		}
		request+="</"+sqllist[k]+"></BasicDAS>";
		document.location.href ="/StudentManageSystem/DataServiceServlet?clientPage="+uri+"&&serviceRequest="+request;
	}

}
function alterdata(id,alist)//id:数据在数组中的位置
{
	var alvalue=arguments[2] ? arguments[2] :[];
	var eid=arguments[3] ? arguments[3] :'edit';
	var tp="";
	for(var j=0;j<alist.length;j++){
		tp+="<div style='margin-top:10px'><p style='float:left;width:100px'>"+alist[j]+":  </p><input id='edit"+j+"' type='text' value='"+alvalue[id][j]+"'/>";
	}
	tp+="<input style='display:none' id='edit"+alist.length+"' type='text' value='"+alvalue[id][alist.length]+"'/>";
	altereditwindow(eid,tp);
	tp='#'+eid;
       $(tp).modal('show');
}
function detaildata(id,list)//id:数据在数组中的位置
{
	var lvalue=arguments[2] ? arguments[2] :[];
	var eid=arguments[3] ? arguments[3] :'detail';
	var tp="";
	for(var j=0;j<alist.length;j++){
		tp+="<div style='margin-top:10px'>"+list[j]+":  "+lvalue[id][j]+"</div>";
	}
	alterdetailwindow(eid,tp);
	tp='#'+eid;
       $(tp).modal('show');
}
function showthead(id,list)
{
	var tbe=document.getElementById(id);
	var s="";
	s+="<thead>";
    s+="<tr class='am-success'>";
    s+="<th class='table-check'><input id='check0' type='checkbox' /></th>";
    for(var i=0;i<list.length;i++)
    	s+="<th>"+list[i]+"</th>";
    s+="</tr>";
  s+="</thead>";
  tbe.innerHTML+=s;
  
}
function data(id,disp,alist,alvalue){
	var list=new Array(disp+1);
	//list 和 lvalue是表格里显示的内容
	for(var i=0;i<disp;i++)
	{
		list[i]=alist[i];
		
	}
	list[disp]="操作";
	var lvalue=new Array(alvalue.length);
	for(var i=0;i<alvalue.length;i++){
		lvalue[i]=new Array(disp);
		for(var j=0;j<disp;j++)
			lvalue[i][j]=alvalue[i][j];
	}
	showthead(id,list,'fm');
	//
	var tbe=document.getElementById(id);
	tbe.innerHTML+="<tbody>";
	
	for(var i=0;i<alvalue.length;i++){
	//表格信息
	var s="<tr>";
	s+="<td><input type='checkbox' id='checked"+(i+1)+"'/></td>";
	for(var j=0;j<lvalue[i].length;j++){
		s+="<td><p>"+lvalue[i][j]+"</p></td>";
	}
	s+="<td><div class='am-btn-toolbar'><div id='manu"+i+"' class='am-btn-group am-btn-group-xs'>";
	s+="<button onclick=\"detaildata("+i+",alist,alvalue);return false\"  class='am-btn am-btn-default am-btn-xs am-text-success am-round' ><span class='am-round am-icon-search'></span></button>";
	s+="<button onclick=\"alterdata("+i+",alist,alvalue);return false\" class='am-btn am-btn-default am-btn-xs am-text-secondary am-round' ><span class='am-icon-pencil-square-o'></span></button>";
	s+="<button onclick=\"copydata("+i+",uri,alvalue,sqllist);return false\" class='am-btn am-btn-default am-btn-xs am-text-warning  am-round'><span class='am-icon-copy'></span></button>";
	s+="<button onclick=\"deletedata("+i+",uri,alvalue,sqllist);return false\" class='am-btn am-btn-default am-btn-xs am-text-danger amround'><span class='am-icon-trash-o'></span></button>";
	s+="</div></div></td>";
	s+="</tr>"
	tbe.innerHTML+=s;  
        }  
	tbe.innerHTML+="</tbody>";
    }
function checka(){
	$('#check0').click(function(){
		 if($(this).prop('checked')){
			 var s=1;
				while(true){
					var tp=document.getElementById("checked"+s);
					if(tp==null)
						break;
					tp.checked=true
					s++;
				}
		 }
		 else{
			 var s=1;
				while(true){
					var tp=document.getElementById("checked"+s);
					if(tp==null)
						break;
					tp.checked=false
					s++;
				}
		 }
		 });
	 
}