var result = null;
//0-9
function command(num){
	result = document.getElementById("result");
	var str = result.innerHTML;
	/*function x(){
		if(str=="0"){  //初始点击0的时候，0不会累加
			return ""; //返回为空字符串
		}else{
			return str;
		}
	}
	str = x();*/
	str = str=="0"?"":str; //判断初始点击是不是0，并且0不会累加
	str += num;
	result.innerHTML = str;
	mark = true; //当mark等于ture的时候可以执行下面的代码
}

//加入点
var dian = true; //让小数点出现一次
function point(){
	if(dian){
		var num = result.innerHTML;
		num = num+".";
		result.innerHTML = num;
		dian = false;//false就不会执行这个代码
	}
}

//运算符  当result里面有数字的时候可以使用运算符
var mark = false;
function tool(op){
	if(mark){
		var num = result.innerHTML;
		num = num=="0"?"":num;
		result.innerHTML = num+op;
		mark = false; //当执行一次后，Mark为false，就不会执行此代码
	}
}

//等于号
function eq(){
	var num = result.innerHTML;
	var r = eval(num);  //eval()方法可以计算()里面的字符串并执行里面的代码
	result.innerHTML = r;
	mark = true; //可以再次使用运算符
}

//C清除按钮
function clearZero(){
	result.innerHTML = "0";
	mark = true;
	dian = true;
}
