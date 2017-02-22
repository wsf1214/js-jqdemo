/*
 *用户名可以是字母，数字，下划线，不能以数字开头，长度在6-20之间 
 */
window.onload=function(){
	
	createValidateCode();

	//用户名输入验证===============================================
	var usernameinf=document.getElementById("usernameinf");	
	var username=document.getElementById("username");
	username.onfocus=function(){
		usernameinf.innerHTML="";
		username.style.background="#fff";
		username.style.border="";
	}
	username.onblur=function testName(){
	
		var usernameValue=username.value;//获取文本框的值
		
		//循环username中的每一个字符进行判断
		for(i in usernameValue){
			var asc=usernameValue.charCodeAt(i);	
		//我们判断哪些内容是错误的
		//48-57代表0-9  65-90大写字母  97-122是小写字母 下划线95 
			if(asc<48||(asc>57&&asc<65)||(asc>90&&asc<95||asc==96||asc>122)){
				//如果输入错误返回false 显示错误
				username.style.background="lightpink";
				username.style.border="1px solid red";
				usernameinf.innerHTML="*用户名输入字符不合法";
				return false;
				
			}
		}
		if(usernameValue.charCodeAt(0)>=48&&usernameValue.charCodeAt(0)<=57){
				usernameinf.innerHTML="*用户名不能以数字开头";
				username.style.background="lightpink";
				username.style.border="1px solid red";
				return false;
		}
		if(usernameValue.length<6||usernameValue.length>20){
				usernameinf.innerHTML="*用户名不得少于6位或多于20位";
				username.style.background="lightpink";
				username.style.border="1px solid red";
				return false;
		}
		return true;
	}
	//验证密码输入的规则===========================================
	var pasword=document.getElementById("pasword");
	var paswordinf=document.getElementById("paswordinf");	
	
	//或得焦点 重置样式
	pasword.onfocus=function(){
			paswordinf.innerHTML="";
			pasword.style.background="#fff";
			pasword.style.border="";
			pasword.value="";
	}
	pasword.onblur=function testpaswrod(){
		
		var paswordValue=document.getElementById("pasword").value;
		var paswordValueLength=paswordValue.trim().length;
		//密码大于6位小于20位并且不为0;
		if(paswordValueLength<6||paswordValueLength>20||paswordValueLength==0){
			paswordinf.innerHTML="*密码不得少于6位或多于20位";
			pasword.style.background="lightpink";
			pasword.style.border="1px solid red";
				return false;
		}
		passwordLevel();
		return true; 
		
	}
	function passwordLevel(){
		var paswordValue=document.getElementById("pasword").value;
		var paswordinf=document.getElementById("paswordinf");	
		
		if(/\d+/.test(paswordValue)&&/[a-zA-Z_]+/.test(paswordValue)&&/\W+/.test(paswordValue)){
	  	 //密码级别高
	  	 paswordinf.innerHTML="密码级别高";
	  	 return;
	  }
	   if(/\d+/.test(paswordValue)&&/[a-zA-Z_]+/.test(paswordValue)){
	  	 //密码级别中
	  	 paswordinf.innerHTML="密码级别中";
	  	 return;
	  }
	   
	    if(/\d+/.test(paswordValue)||/[a-zA-Z_]+/.test(paswordValue)){
	  	 //密码级别低
	  	 paswordinf.innerHTML="密码级别低";
	  	 return;
	  }
		
		
	}
	//密码确认框=======================================================
	var paswordcheck=document.getElementById("paswordcheck");
	var paswordCheckInf=document.getElementById("paswordCheckInf");
	paswordcheck.onfocus=function(){
		paswordCheckInf.innerHTML="";
		paswordcheck.style.background="#fff";
		paswordcheck.style.border="";
		paswordcheck.value="";
	}
	paswordcheck.onblur=function paswordCheck(){
		var paswordcheckValue=document.getElementById("paswordcheck").value;
		var paswordValue=document.getElementById("pasword").value;
		
		if(paswordcheckValue!=paswordValue){
			paswordCheckInf.innerHTML="*两次输入的密码不一致";
			paswordcheck.style.background="lightpink";
			paswordcheck.style.border="1px solid red";
			
				return false;
		}
		if(paswordcheckValue==0){
			paswordCheckInf.innerHTML="*确认密码不能为空";
			paswordcheck.style.background="lightpink";
			paswordcheck.style.border="1px solid red";
			
				return false;
		}
		return true;
	}
	//电子邮箱===============================================
	var emailadd=document.getElementById("emailadd");
	var emailAddInf=document.getElementById("emailAddInf");
	emailadd.onblur=function emailaddCheck(){
		var emailaddValue=document.getElementById("emailadd").value;
		if(!/^([\w\.\-]+)@([\w\-]+)\.([a-zA-Z]{2,4})$/.test(emailaddValue)){
			emailAddInf.innerHTML="*邮箱格式错误";
			emailadd.style.background="lightpink";
			emailadd.style.border="1px solid red";
			
				return false;
		}
		return true;
	}
	emailadd.onfocus=function(){
		emailAddInf.innerHTML="";
		emailadd.style.background="#fff";
		emailadd.style.border="";
	}
	//真实名字===============================================
	var realname=document.getElementById("realname");
	var realnameInf=document.getElementById("realnameInf");
	realname.onblur=function realnameCheck(){
		var realnameValue=document.getElementById("realname").value;
		if(!/.{2,}/.test(realnameValue)){
			realnameInf.innerHTML="*名字输入有误";
			realname.style.background="lightpink";
			realname.style.border="1px solid red";
			
				return false;
		}
		//敏感词库
		var sentitiveWords =["tmd","hehe","nnd","知道","董成鹏"];
		for(var i in sentitiveWords){
			var word = sentitiveWords[i];
			if(realnameValue.indexOf(word)>=0){
				realnameInf.innerHTML="*有敏感字";
				realname.style.background="lightpink";
				realname.style.border="1px solid red";
		 	    return false;
			}
		}
		return true
	}
	realname.onfocus=function(){
		realnameInf.innerHTML="";
		realname.style.background="#fff";
		realname.style.border="";
	}
	//手机验证==================================
	var phonenum=document.getElementById("phonenum");
	var phonenumInf=document.getElementById("phonenumInf");
	phonenum.onblur=function phonenumCheck(){
		var phonenumValue=document.getElementById("phonenum").value;
		if(!/^1[34578]\d{9}$/.test(phonenumValue)){
			phonenumInf.innerHTML="*手机号码格式错误";
			phonenum.style.background="lightpink";
			phonenum.style.border="1px solid red";
			
				return false;
		}
		return true;
	}
	phonenum.onfocus=function(){
		phonenumInf.innerHTML="";
		phonenum.style.background="#fff";
		phonenum.style.border="";
	}
		/*
	  判断验证码是否与输入一致
	 */
	var checknum=document.getElementById("checknum");
	var checkIfn=document.getElementById("checkIfn");
	checknum.onblur=function checknumCheck(){
		 var checknumValue = document.getElementById("checknum").value;
		 if(checknumValue.toLowerCase()!=checknumInfValue.toLowerCase()){
		    checknum.style.background="lightpink";
			checknum.style.border="1px solid red";
		    checkIfn.innerHTML="*验证码输入错误";
		 	return false;
		}
		 return true;
	}
	checknum.onfocus=function(){
		checknum.value="";
		checknum.style.background="#fff";
		checknum.style.border="";
		checkIfn.innerHTML="";
		createValidateCode();
	}
	var tijiao=document.getElementById("tijiao");
	tijiao.onclick=function check(){
		if(username.onblur()&&pasword.onblur()&&paswordcheck.onblur()&&emailadd.onblur()&&realname.onblur()&&phonenum.onblur()&&checknum.onblur()){
			alert("注册成功");
			return true;
		}
		return false;
	}
	
}
//验证码==================================
			/*
	 * 验证码 4位，数字或字母
	 * 
	 * acU1    acu1  acu1
	 * */
	function createValidateCode(){
		
		var arr =[];//保存每个生成随机字符
		while(arr.length<4){
			//使用ascII码  数字48-57  字母65-90 97-122
			var n = getRandom(48,122);
			if((n>=48&&n<=57)||(n>=65&&n<=90)||(n>=97&&n<=122)){
				arr.push(String.fromCharCode(n));
			}
		}
		var checknumInf = document.getElementById("checknumInf");
		checknumInfValue = arr.join("");
		checknumInf.innerHTML= checknumInfValue;
		checknumInf.style.color="#333333";
		
		
		
	}
	
	
	
	function getRandom(start,end){
		var d = end+1-start;
		return Math.floor(Math.random()*d+start);
	}
