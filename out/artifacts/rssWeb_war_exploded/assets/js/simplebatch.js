/**
 * 
 */
function showspbatch(id,fid,k)
{
	var sty=["am-icon-plus",'am-icon-pencil-square-o','am-icon-copy',"am-icon-save","am-icon-trash-o"];
	var func=["新建","修改","复制","保存","删除"];
	var bt=document.getElementById(id);
	var s="";
	for(var i=0;i<sty.length;i++)
	s+="<button type='button' id='batch"+i+"' class='am-btn am-btn-default'><span class='"+sty[i]+"'></span>"+func[i]+"</button>";
    bt.innerHTML+=s;
    var bt0=document.getElementById('batch0');
    bt0.onclick=function(){legtmp=newdata('tby',legtmp,alist.length)};
   
    var bt1=document.getElementById('batch1');
    bt1.onclick=function(){
    	 var fm=document.getElementById(fid);
    	for(var i=1;i<fm.elements.length;i+=k)
    	{
    		
    		if(fm.elements[i].checked==true){
    			for(var j=1;j<k;j++){
    				fm.elements[i+j].disabled=false;
    				fm.elements[i+j].style='border:1px,solid';
    			}
    		}
		}
    };
    
}
function newdata(id,i,k)
	{
	//confirm('asd');
	var tby=document.getElementById(id);
	var s="<tr>";
	s+="<td><input type='checkbox' /></td>";
	for(var j=0;j<k;j++){
		s+="<td><input id='h"+i+"d"+j+"' type='text' value='"+i+"' style='cursor:default'/></td>";
	}
	s+="</tr>";
	tby.innerHTML=s+tby.innerHTML;
	i++;
	return i;
	}