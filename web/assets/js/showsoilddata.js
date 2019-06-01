/**
 * 
 */
function simpledata(id,list){
	var lvalue=arguments[2] ? arguments[2] :[];
	var tbe=document.getElementById(id);
	tbe.innerHTML+="<tbody id='tby'>";
	
	for(var i=0;i<lvalue.length;i++){
		//详细信息
	//表格信息
	var s="<tr id='tr"+i+"'>";
	for(var j=0;j<lvalue[i].length;j++){
		s+="<td><input id='h"+i+"d"+j+"' type='text' value='"+lvalue[i][j]+"' style='border:0px;background:transparent;cursor:default;font-size:14px' disabled /></td>";
	}
	s+="</tr>"
	tbe.innerHTML+=s;  
        }  
	tbe.innerHTML+="</tbody>";
    }
function showthead(id,list)
{
	var tbe=document.getElementById(id);
	var s="";
	s+="<thead >";
    s+="<tr class='am-success' id='ted'>";
    for(var i=0;i<list.length;i++)
    	s+="<th>"+list[i]+"</th>";
    s+="</tr>";
    s+="</thead>";
    tbe.innerHTML+=s;
}
