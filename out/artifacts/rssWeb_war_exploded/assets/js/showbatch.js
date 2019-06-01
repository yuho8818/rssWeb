/**
 * 
 */


function showbatch(id,fid,alist)
{
	var k=alist.length+2;
	var sty=["am-icon-plus",'am-icon-copy',"am-icon-save","am-icon-trash-o"];
	var func=["新建","复制","删除"];
	var bt=document.getElementById(id);
	var s="";
	for(var i=0;i<sty.length;i++)
	s+="<button type='button' id='"+id+i+"' class='am-btn am-btn-default'><span class='"+sty[i]+"'></span>"+func[i]+"</button>";
    bt.innerHTML+=s;
    var bt0=document.getElementById(id+'0');
    bt0.onclick=function(){
    	var tp="";
    	var id='new';
    	for(var j=0;j<alist.length;j++){
    		tp+="<div style='margin-top:10px'><p style='float:left;width:100px'>"+alist[j]+":  </p><input id='new"+j+"' type='text' value=''/>";
    	}
    	var dv=document.getElementById('new'+id);
    	dv.innerHTML=tp;
    	
    	tp='#'+id;
    	$(tp).modal('show');
    };
}
function setbt1(id,uri,sqllist,alvalue){
	var bt=document.getElementById(id+1);
	bt.onclick=function(){
		var k=sqllist.length-1;
		var request="<BasicDAS><"+sqllist[k]+" operation='saves' sql='insert  into  "+sqllist[k]+" (";
		for(var i=0;i<k-1;i++){
			request+=sqllist[i]+",";
		}
		request+=sqllist[k-1]+") values ";
		var s=1;
		var f=0;
		while(true){
			var tp=document.getElementById("checked"+s);
			if(tp==null)
				break;
			if(tp.checked==true){
				if(f)
					request+=" , ";
				request+="(";
				for(var i=0;i<k-1;i++)
					request+="\""+alvalue[s-1][i]+"\",";
				request+="?)";
				f=1;
			}
			s++;
		}
		if(f){
			request+="'/></BasicDAS>";
			document.location.href ="/StudentManageSystem/DataServiceServlet?clientPage="+uri+"&&serviceRequest="+request;
		}
	}
}
function setbt2(id,uri,sqllist,alvalue){
	var bt=document.getElementById(id+2);
	bt.onclick=function(){
		var k=sqllist.length-1;
		var request="<BasicDAS><"+sqllist[k]+" operation='deletes' sql='delete from "+sqllist[k]+" where ";
		var s=1;
		var f=0;
		while(true){
			var tp=document.getElementById("checked"+s);
			if(tp==null)
				break;
			if(tp.checked==true){
				if(f)
					request+=" or ";
				request+=sqllist[k-1]+"=\""+ alvalue[s-1][k-1]+"\"";
				f=1;
			}
			s++;
		}
		if(f){
			request+="'/></BasicDAS>";
			document.location.href ="/StudentManageSystem/DataServiceServlet?clientPage="+uri+"&&serviceRequest="+request;
		}
			
	}
}
