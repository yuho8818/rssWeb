/**
 * 
 */
function simpledata(id,list){
	var lvalue=arguments[2] ? arguments[2] :[];
	var tbe=document.getElementById(id);
	tbe.innerHTML+="<tbody id='tby'>";
	
	for(var i=0;i<10;i++){
		//详细信息
	//表格信息
	var s="<tr>";
	s+="<td><input type='checkbox' /></td>";
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
	s+="<thead>";
    s+="<tr class='am-success'>";
    s+="<th class='table-check'><input id='check0' type='checkbox' /></th>";
    for(var i=0;i<list.length;i++)
    	s+="<th>"+list[i]+"</th>";
    s+="</tr>";
    s+="</thead>";
    tbe.innerHTML+=s;
}
function checka(fid,k){
	var fm=document.getElementById(fid);
	$('#check0').click(function(){
		 if($(this).prop('checked')){
			 for(var i=1;i<fm.elements.length;i+=k)
				 fm.elements[i].checked=true;
		 }
		 else{
			 for(var i=1;i<fm.elements.length;i+=k)
				 fm.elements[i].checked=false;
		 }
		 });
	 
}