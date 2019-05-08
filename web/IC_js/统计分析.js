/**
 * 
 */
$(document).ready(function() {

	$("#bulk_info_search").click(function() {

		var radio = document.getElementsByName("periodType");  
	    for (i=0; i<radio.length; i++) {  
	        if (radio[i].checked) {  
	        	var periodType=radio[i].value; 
	        }  
	    } 
	    var time;
	    var month;
	    var year;
	    var temp;
		if (periodType == "year"){
			temp = "month";
			time = $("#year").val();
		}else if (periodType == "month"){
			temp = "day";
			time = $("#month").val();
			year=time.split("-")[0];
			month=time.split("-")[1];
			time=year+"\"and month(registerTime)=\""+month;
		}else if (periodType == "week"){
			temp = "day";
			time = $("#week").val();
		}
		var type = $("#type").val();
		
	    var radio = document.getElementsByName("selectType");  
	    for (i=0; i<radio.length; i++) {  
	        if (radio[i].checked) {  
	            var type=radio[i].value;  
	        }  
	    } 

		var sql = "select "+temp+"(registerTime) as temp,"+type+" as type,SUM(waterDeduct) as waterNum,SUM(gangueDeduct) as gangueNum,count(cardNo) as carNum,SUM(bulkAmount) as bulkNum,SUM(grossWeight) as grossNum FROM bluk.bulk_info where year(registerTime)=\""+time+"\" group by temp,"+type+";"
		var request = "<BasicDAS><bulk_info operation='query' pageSize='20' pageNo='1' sql='"+sql+"'/></BasicDAS>";
		if(periodType==null||type==null){
			alert("请选择时间段和统计口径");
			document.location.href="统计分析.jsp";
		}
		
		document.location.href = "/StudentManageSystem/DataServiceServlet?clientPage=统计分析&&serviceRequest=" + request;
		
		/**
		 * var request = "<PlanStatisticDAS><bulk_info pageSize='20' pageNo='1' periodType='year'/></PlanStatisticDAS>";
		document.location.href = "/StudentManageSystem/DataServiceServlet?clientPage=统计分析&&serviceRequest=" + request;
		 */
	})

})
function openLogin() {
	document.getElementById("win").style.display = "";
}
function closeLogin() {
	document.getElementById("win").style.display = "none";
}
function fun() {
	document.getElementById("main").style.display = "none";
	document.getElementById("main2").style.display = "none";
	document.getElementById("main3").style.display = "none";
}

function fun1() {
	document.getElementById("main2").style.display = "none";
	document.getElementById("main3").style.display = "none";
	document.getElementById("main").style.display = "";
	pic1();
}
function fun2() {
	document.getElementById("main").style.display = "none";
	document.getElementById("main3").style.display = "none";
	document.getElementById("main2").style.display = "";
	pic2();
}
function fun3() {
	document.getElementById("main").style.display = "none";
	document.getElementById("main2").style.display = "none";
	document.getElementById("main3").style.display = "";
	pic3();
}
function funy() {
	document.getElementById("year").style.display = "";
	document.getElementById("month").style.display = "none";
	document.getElementById("week").style.display = "none";
}
function funm() {
	document.getElementById("year").style.display = "none";
	document.getElementById("month").style.display = "";
	document.getElementById("week").style.display = "none";
}
function funw() {
	document.getElementById("year").style.display = "none";
	document.getElementById("month").style.display = "none";
	document.getElementById("week").style.display = "";
}
function pic1(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main'));
	var option = {
		title : {
			text : '来煤统计',
			x : 'center'
		},
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		legend : {
			orient : 'vertical',
			x : 'left',
			data : []
		},
		toolbox : {
			show : true,
			feature : {
				mark : {
					show : true
				},
				dataView : {
					show : true,
					readOnly : false
				},
				magicType : {
					show : true,
					type : [ 'pie', 'funnel' ],
					option : {
						funnel : {
							x : '25%',
							width : '50%',
							funnelAlign : 'left',
							max : 1548
						}
					}
				},
				restore : {
					show : true
				},
				saveAsImage : {
					show : true
				}
			}
		},
		calculable : true,
		series : [ {
			name : '来煤统计',
			type : 'pie',
			radius : '55%',
			center : [ '50%', '60%' ],
			data : []
		} ]
	};
		
	// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		
	var radio = document.getElementsByName("periodType");  
    for (i=0; i<radio.length; i++) {  
        if (radio[i].checked) {  
        	var periodType=radio[i].value; 
        }  
    } 
    var time;
    var month;
    var year;
    var temp;
	if (periodType == "year"){
		temp = "month";
		time = $("#year").val();
	}else if (periodType == "month"){
		temp = "day";
		time = $("#month").val();
		year=time.split("-")[0];
		month=time.split("-")[1];
		time=year+"\"and month(registerTime)=\""+month;
	}else if (periodType == "week"){
		temp = "day";
		time = $("#week").val();
	}
	var type = $("#type").val();
	
    var radio = document.getElementsByName("selectType");  
    for (i=0; i<radio.length; i++) {  
        if (radio[i].checked) {  
            var type=radio[i].value;  
        }  
    }
	var sql = "select "+type+" as type,SUM(bulkAmount) as bulkNum,"+type+" as temp FROM bluk.bulk_info where year(registerTime)=\""+time+"\" group by "+type+";"
//	var request = "<BasicDAS><bulk_info operation='query' pageSize='20' pageNo='1' sql='"+sql+"'/></BasicDAS>";
	var dataToSend =  "sql=" + sql;
	
	var names=[];    //类别数组（实际用来盛放X轴坐标值）
    var nums=[];    //销量数组（实际用来盛放Y坐标值）
	$.ajax({
        type : "post",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "/StudentManageSystem/bar.do", 
        data:dataToSend,
        dataType : "json",        //返回数据形式为json
        success : function(result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                   for(var i=0;i<result.length;i++){ 
                		   names.push(result[i].type);
                		   nums.push(result[i].bulkNum);
                    }
                   //myChart.hideLoading();    //隐藏加载动画                   
                   myChart.setOption({        //加载数据图表
                	   legend : {
               			data : names
               		},
                       series: [{
                           // 根据名字对应到相应的系列
                           name: names,
                           data: nums
                       }]
                   });
                   
            }
        
       },
        error : function(errorMsg) {
            //请求失败时执行该函数
        alert("图表请求数据失败!");
        myChart.hideLoading();
        }
   });
	
	
	
	
}
function pic2(){
	var myChart = echarts.init(document.getElementById('main2'));
	// 基于准备好的dom，初始化echarts实例
	
	var option = {
		title : {
			text : '进料统计',
		},
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : []
		},
		toolbox : {
			show : true,
			feature : {
				mark : {
					show : true
				},
				dataView : {
					show : true,
					readOnly : false
				},
				magicType : {
					show : true,
					type : [ 'line', 'bar' ]
				},
				restore : {
					show : true
				},
				saveAsImage : {
					show : true
				}
			}
		},
		calculable : true,
		xAxis : [ {
			type : 'category',
			data : []
		} ],
		yAxis : [ {
			type : 'value'
		} ],
		
		series : [
			//for
			{
				name : '无烟煤',
				type : 'bar',
				name:[],
				data : [],
				markPoint : {
					data : [ {
						type : 'max',
						name : '最大值'
					}, {
						type : 'min',
						name : '最小值'
					} ]
				},
				markLine : {
					data : [ {
						type : 'average',
						name : '平均值'
					} ]
				}
			}]
	};
	
	
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
	
	var radio = document.getElementsByName("periodType");  
    for (i=0; i<radio.length; i++) {  
        if (radio[i].checked) {  
        	var periodType=radio[i].value; 
        }  
    } 
    var time;
    var month;
    var year;
    var temp;
	if (periodType == "year"){
		temp = "month";
		time = $("#year").val();
	}else if (periodType == "month"){
		temp = "day";
		time = $("#month").val();
		year=time.split("-")[0];
		month=time.split("-")[1];
		time=year+"\"and month(registerTime)=\""+month;
	}else if (periodType == "week"){
		temp = "day";
		time = $("#week").val();
	}
	var type = $("#type").val();
	
    var radio = document.getElementsByName("selectType");  
    for (i=0; i<radio.length; i++) {  
        if (radio[i].checked) {  
            var type=radio[i].value;  
        }  
    }
    var sql = "select "+temp+"(registerTime) as temp,"+type+" as type,SUM(bulkAmount) as bulkNum FROM bluk.bulk_info where year(registerTime)=\""+time+"\" group by temp,"+type+";"
//	var request = "<BasicDAS><bulk_info operation='query' pageSize='20' pageNo='1' sql='"+sql+"'/></BasicDAS>";
	var dataToSend =  "sql=" + sql;

	var names=[];    //类别数组（实际用来盛放X轴坐标值）
    var nums=[];    //销量数组（实际用来盛放Y坐标值）
    var times=[];
	$.ajax({
        type : "post",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "/StudentManageSystem/bar.do", 
        data:dataToSend,
        dataType : "json",        //返回数据形式为json
        success : function(result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                   for(var i=0;i<result.length;i++){ 
                	   
                		   names.push(result[i].type);
                		   nums.push(result[i].bulkNum);
                		   times.push(result[i].temp);
                    }
               
                   //myChart.hideLoading();    //隐藏加载动画
                   myChart.setOption({        //加载数据图表
                       xAxis: {
                           data: times
                       },
                       series: [{
                           // 根据名字对应到相应的系列
                           name: names,
                           data: nums
                       }]
                   });
                   
            }
        
       },
        error : function(errorMsg) {
            //请求失败时执行该函数
        alert("图表请求数据失败!");
        myChart.hideLoading();
        }
   });
	

}
function pic3(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main3'));
	var option = {
			title : {
				text : '进料统计',
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				data : []
			},
			toolbox : {
				show : true,
				feature : {
					mark : {
						show : true
					},
					dataView : {
						show : true,
						readOnly : false
					},
					magicType : {
						show : true,
						type : [ 'line', 'bar' ]
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			calculable : true,
			xAxis : [ {
				type : 'category',
				data : []
			} ],
			yAxis : [ {
				type : 'value'
			} ],
			
			series : [
				//for
				{
					name : '无烟煤',
					type : 'line',
					name:[],
					data : [],
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					},
					markLine : {
						data : [ {
							type : 'average',
							name : '平均值'
						} ]
					}
				}]
		};
		
		
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		
		var radio = document.getElementsByName("periodType");  
	    for (i=0; i<radio.length; i++) {  
	        if (radio[i].checked) {  
	        	var periodType=radio[i].value; 
	        }  
	    } 
	    var time;
	    var month;
	    var year;
	    var temp;
		if (periodType == "year"){
			temp = "month";
			time = $("#year").val();
		}else if (periodType == "month"){
			temp = "day";
			time = $("#month").val();
			year=time.split("-")[0];
			month=time.split("-")[1];
			time=year+"\"and month(registerTime)=\""+month;
		}else if (periodType == "week"){
			temp = "day";
			time = $("#week").val();
		}
		var type = $("#type").val();
		
	    var radio = document.getElementsByName("selectType");  
	    for (i=0; i<radio.length; i++) {  
	        if (radio[i].checked) {  
	            var type=radio[i].value;  
	        }  
	    }
	    var sql = "select "+temp+"(registerTime) as temp,"+type+" as type,SUM(bulkAmount) as bulkNum FROM bluk.bulk_info where year(registerTime)=\""+time+"\" group by temp,"+type+";"
//		var request = "<BasicDAS><bulk_info operation='query' pageSize='20' pageNo='1' sql='"+sql+"'/></BasicDAS>";
		var dataToSend =  "sql=" + sql;

		var names=[];    //类别数组（实际用来盛放X轴坐标值）
	    var nums=[];    //销量数组（实际用来盛放Y坐标值）
	    var times=[];
		$.ajax({
	        type : "post",
	        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
	        url : "/StudentManageSystem/bar.do", 
	        data:dataToSend,
	        dataType : "json",        //返回数据形式为json
	        success : function(result) {
	            //请求成功时执行该函数内容，result即为服务器返回的json对象
	            if (result) {
	                   for(var i=0;i<result.length;i++){ 
	                	   
	                		   names.push(result[i].type);
	                		   nums.push(result[i].bulkNum);
	                		   times.push(result[i].temp);
	                    }
	               
	                   //myChart.hideLoading();    //隐藏加载动画
	                   myChart.setOption({        //加载数据图表
	                       xAxis: {
	                           data: times
	                       },
	                       series: [{
	                           // 根据名字对应到相应的系列
	                           name: names,
	                           data: nums
	                       }]
	                   });
	                   
	            }
	        
	       },
	        error : function(errorMsg) {
	            //请求失败时执行该函数
	        alert("图表请求数据失败!");
	        myChart.hideLoading();
	        }
	   });
	
}