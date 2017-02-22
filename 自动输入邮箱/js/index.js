var email = document.getElementById("email");
var arr1 = ["@qq.com","@163.com","@sina.com","@szyuto.com","@yutong.com","@123.com","@gmail.com","@188.com","@sohu.com","@yahoo.con.cn","@qq.com", "@gmail.com", "@126.com", "@163.com", "@hotmail.com","@yahoo.com.cn","@live.com","@sohu.com"];
var arr = arr1.sort();//原始邮箱数组排序
var ul = document.getElementById("list");//获得ul
var body = document.getElementsByTagName("body")[0];//获得body
//根据arr的长度添加li
for(var i = 0;i<arr.length;i++){
	var li = document.createElement("li");
	ul.appendChild(li);
}
//邮箱输入框得到焦点触发函数
email.onfocus=function(){
	//ul.style.display="block";
	//邮箱输入框内容改变触发函数
	email.oninput=function(){
		ul.style.display="block";
		var li=ul.getElementsByTagName("li");
		/*for(var i=0;i<arr.length;i++){
			if(email.value.indexOf("@")==-1){	//输入内容没有@
				li[i].innerHTML=email.value+arr[i];
			}
			else{//输入内容有@
				li[i].innerHTML=email.value.substring(0,email.value.indexOf("@"))+arr[i];
				
			}	
		}*/
		if(email.value.indexOf("@")==-1){	//输入内容没有@时 li中内容变化
			for (var i=0;i<arr.length;i++) {
				li[i].innerHTML=email.value+arr[i];
			}		
		}
		else{//输入内容有@之后li的变化
			//alert(li.length);
			var emailAfterAt = email.value.substring(email.value.indexOf("@")+1);//输入内容中@之后的内容
			for (var i = 0;i<li.length;i++) {//循环li
				var li_innerHTML=li[i].innerHTML;
				var start = li_innerHTML.indexOf("@")+1;
				//var end = li_innerHTML.indexOf(".");
				var arrAfterAt = li_innerHTML.substring(start);//li中@之后的内容
					if(arrAfterAt.indexOf(emailAfterAt)==-1){//如果li中@之后的内容中没有输入框@之后的内容 li消失
						li[i].style.display="none";
					}
					else{//反之不消失
						li[i].style.display="block";
					}
				//alert(emailAfterAt);//输入框@之后输入的内容
				//alert(arrAfterAt);//数组元素@之后的内容
			}
			
		}
		//点击li中内容时  ul消失 li中内容--email输入框
		ul.onmouseover = function(evt){
			var event = evt||window.event;
			var target = event.srcElement||event.target;
			if(target.tagName.toLowerCase()=="li"){
				target.onmouseover=function(){
					target.style.background="grey";
				}
				target.onmouseout=function(){
					target.style.background="";
				}
			 	target.onclick=function(){
					email.value=target.innerHTML;
					ul.style.display="none";
				}
			} 
			
		}
	}
}
//email失去焦点 且内容为空时  ul消失
email.onblur=function(){
	if(email.value==""){
		ul.style.display="none";
	}
}




