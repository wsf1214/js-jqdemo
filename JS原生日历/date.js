//创建日历 tr   td
var calMain=document.getElementById("calMain");
for(var i=0;i<6;i++){
	var tr = document.createElement("tr");
	for(var j=0;j<7;j++){
		var td = document.createElement("td");
		tr.appendChild(td);	
	}
	calMain.appendChild(tr);
}


var selectYear =document.getElementById("selectYear");//选年
var selectMonth=document.getElementById("selectMonth");//选月
var years =document.getElementById("years");//年ul
var months =document.getElementById("months");//月ul
//创建年份的li  1901-2099
for(var i=1901;i<=2099;i++){
	var li=document.createElement("li");
	li.innerHTML=i+"年";
	li.index=i;
	years.appendChild(li);	
	li.onclick=function(){
		//console.log(this.index)
		selectYear.value=this.index+"年";
		years.style.display="none";
		//console.log(selectYear.value+'-'+selectMonth.value);
		createCal(parseFloat(selectYear.value),parseFloat(selectMonth.value));
	}
}
//创建月份的li   1-12
for(var j=1;j<=12;j++){
	var li = document.createElement("li");
	li.innerHTML=j+"月";
	li.index=j;
	months.appendChild(li);
	li.onclick=function(){
		selectMonth.value=this.index+"月";
		months.style.display="none";
		createCal(parseFloat(selectYear.value),parseFloat(selectMonth.value));
	}
}


//点击年 年ul出现
selectYear.onclick=function(){
	if(years.style.display=="block"){
		years.style.display="none";
	}
	else{
		years.style.display="block";
	}
}
//点击月 月ul出现
selectMonth.onclick=function(){
	if(months.style.display=="block"){
		months.style.display="none";
	}
	else{
		months.style.display="block";
	}
}
//生成日历
//var calMain=document.getElementById("calMain");
var td = calMain.getElementsByTagName("td");
function createCal(year,month){
	//1号前有几天
	var daysBefore1=getFirstDay(year,month);
	//这个月的天数
	var nowMonthsDays=getMonthDays(year,month);
	//这个月天数加样式
	if((daysBefore1+nowMonthsDays)>=35){
		for(var i=daysBefore1;i<daysBefore1+nowMonthsDays;i++){
			td[i].className="nowMonthDate";
			var a =i-daysBefore1+1
			td[i].innerHTML=a;
		}
	}
	else{
		for(var i=daysBefore1;i<35;i++){
			td[i].className="nowMonthDate";
			td[i].innerHTML=i-daysBefore1+1;
		}
		for(var j=35;j<41;j++){
			td[j].innerHTML="";
		}
	}
	
	//下个月
	for(var k=daysBefore1+nowMonthsDays;k<35;k++){
		td[k].className="ontherMonthDate";
		td[k].innerHTML=k-daysBefore1-nowMonthsDays+1;
	}
	//上个月的天数
	var beforeMonthDays=month==1?getMonthDays(year-1,12):getMonthDays(year,month-1);
	for(var j=0;j<daysBefore1;j++){
		td[j].className="ontherMonthDate";
		td[j].innerHTML=beforeMonthDays-daysBefore1+j+1;
	}
	//var td =calMain.getElementsByTagName("td");
	for(var i=0;i<td.length;i++){
		switch (i){
			case 5:
			case 12:
			case 19:
			case 26:
			case 33:
			case 6:
			case 13:
			case 20:
			case 27:
			case 34:
			td[i].className="ontherMonthDate weekMonthDate";
			default:
				break;
		}
		/*if(td[i].innerHTML==(new Date()).getDate()){
			td[i].setAttribute("style","border-radius: 50%;background:grey;")
		}*/

	}
}
var date =new Date();
createCal(date.getFullYear(),date.getMonth()+1)
selectYear.value=date.getFullYear()+"年";
selectMonth.value=date.getMonth()+1+"月";
/*日期划过划出效果*/
for(var i=0;i<td.length;i++){
	if(td[i].innerHTML!=""){
		td[i].onmouseover=function(){
			this.setAttribute("style","background: grey;border-radius: 50%;color: #fff;")
		}
		td[i].onmouseout=function(){		
			this.style="";
		}
	}
		
}

//判断某年某月第一天是周几 返回"一"--"日" //1号前有几天
function getFirstDay(year,month){
	var date =new Date(year+"/"+month+"/1")
	var week = date.getDay();
	return week==0?6:week-1;
}
//alert(getFirstDay(2016,10));
//判断某年是否为闰年  是返回true
function leapYear(year){
	if(year%400==0||(year%100!=0&&year%4==0)){
		return true;
	}
	else{
		return false;
	}
}
//获得某年某月天数
function getMonthDays(year,month){
	switch(month){
	case 1:
	case 3:
	case 5: 
	case 7:
	case 8:
	case 10:
	case 12:
	return 31;
	break;
	case 2:
	if(leapYear(year)){
		return 29;
	}
	else{
		return 28;
	};
	break;
	case 4:
	case 6:
	case 9:
	case 11:
	return 30;
	break;
	default:
	return "error";
	break;
	}
}	




