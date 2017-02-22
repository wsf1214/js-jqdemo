var toast=new Toast();
var password1;
//验证用户名
function verifyUserName(){
	var username = document.getElementById("username").value;
	if(username.length<6||username.length>20){
		toast.show("用户名长度必须为6-20位");
		return false;
	}
	if(username.charAt(0).match(/[0-9]/)){
		toast.show("用户名不能以数字开头");
		return false;
	}
	if(!(username.match(/^[\d\w\_]{6,20}$/))){
		toast.show("用户名不合法");
		return false;
	}
	return true;
}
//密码6-20位 数字 字母 特殊字符 组成
function verifyPassWord(){
	password1=document.getElementById("password1").value;
	if(password1.trim().length<6||password1.trim().length>20){
		toast.show("密码长度必须为6-20位");
		return false;
	}
	return true;
}
//确认密码  显示密码强度等级
function verifyPassWordRange(){
	var passrange=document.getElementById("passrange");
	password1=document.getElementById("password1").value;
	passrange.style.color="red";
	if(password1.length>=6&&password1.length<=20){		
		if(password1.match(/\d+/)&&password1.match(/[a-zA-Z_]+/)&&password1.match(/\W+/)){
			passrange.innerHTML="安全级别高";
			return;
		}
		if(password1.match(/[a-zA-Z_]+/)&&password1.match(/\d+/)){
			passrange.innerHTML="安全等级中";
			return;
		}
		if(password1.match(/(\d+)|([a-zA-Z_]+)/)){
			passrange.innerHTML="安全等级低";
			return;
		}
	}
	else{
		passrange.innerHTML="密码长度必须为6-20位";
		return;
	}
}
//确认密码  验证邮箱 验证手机号
function verifyOthers(){
	var password2 = document.getElementById("password2").value;
	if(password1!=password2){
		toast.show("两次密码输入不一致");
		return false;
	}
	var email=document.getElementById("email").value;
	if(!email.match(/^([\w\.\-]+)@([\w\-]+)\.([a-zA-Z]{2,4})$/)){
		toast.show("邮箱格式不正确");
		return false;
	}
	var phone_num=document.getElementById("phone_num").value;
	if(!phone_num.match(/^1[34578][0-9]{9}$/)){
		toast.show("手机号码格式不正确");
		return false;
	}
	return true;
}
//验证真实姓名
function verifyRealName(){
	var real_name=document.getElementById("real_name").value;
	if(!real_name.match(/.{2,}/)){
		toast.show("姓名不能少于2位");
		return false;
	}
	var sentitiveWords =["tmd","hehe","nnd","知道"];
	for(var i in sentitiveWords){
		var word = sentitiveWords[i];
		if(real_name.indexOf(word)>=0){
			toast.show("姓名有敏感词");
	 	    return false;
		}
	}
	return true;
}
//验证码

//生成验证码

function veCode(num){
	var arr=[];
	while(arr.length<num){
		var n = getRandom(48,122);
		if((n>=48&&n<=57)||(n>=65&&n<=90)||(n>=97&&n<=122)){
			arr.push(String.fromCharCode(n));		
		}
	}
	var vecode=document.getElementById("vecode");
	vecode.innerHTML=arr.join("");
}
veCode(4);

//生成随机数
function getRandom(start,end){
	var d = end+1-start;
	return Math.floor(Math.random()*d+start);
}

//验证验证码
function  verifyVeCode(){
	var vecode=document.getElementById("vecode").innerHTML;
	var vecode_num=document.getElementById("vecode_num").value;
	if(vecode_num.toLowerCase()!=vecode.toLowerCase()){
		toast.show("验证码有误");
	 	return false;
	}
	return true;
}
function check(){
	if(verifyUserName()&&verifyPassWord()&&verifyOthers()&&verifyRealName()&&verifyVeCode()){
		toast.show("恭喜你，注册成功");
		return true;
	}
	return false;
}
