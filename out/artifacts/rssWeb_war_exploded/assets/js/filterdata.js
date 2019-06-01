/**
 * 
 */
function showfilter(id,f,alist,sqllist)
{
	var ul=document.getElementById(id);
	var s="";
	for(var i=0;i<f.length;i++)
		s+="<li><input id='"+id+f[i]+"' name='"+sqllist[f[i]]+"'type='text' class='am-form-field am-input-sm am-input-xm' placeholder='"+alist[f[i]]+"' /></li>";
		s+= "<li><button id='"+id+"sc' type='button' class='am-btn am-radius am-btn-xs am-btn-success' style='margin-top: -1px;'>搜索</button></li>";
		s+= "<li><button id='"+id+"op' type='button' class='am-btn am-radius am-btn-xs am-btn-success' style='margin-top: -1px;'>打印</button></li>";
		ul.innerHTML+=s;
}
function setbtfunc(id,fid,uri,database){
	
	
	var bt=document.getElementById(id+"sc");
	bt.onclick=function(){
		var request="<BasicDAS><"+database+" pageSize='20' pageNo='1'>";
		fm=document.getElementById(fid);
		for(var i=0;i<fm.elements.length;i++){
			var tp=fm.elements[i];
			if(tp.localName=="button"){
				break;
			}
			if(tp.value==0 || tp.value=="")
				continue;
			request+="<"+tp.name+">"+tp.value+"</"+tp.name+">";
		}
		request+="</"+database+"></BasicDAS>";
		document.location.href ="/StudentManageSystem/DataServiceServlet?clientPage="+uri+"&&serviceRequest="+request;
	};
	
}