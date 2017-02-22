var comm = {
	renderBtn : function(node){
		node.onmouseover = function(){
			node.style.backgroundColor = "#317ef3";
		};
		node.onmousedown = function(){
			node.style.backgroundColor = "#2964bb";
		};
		node.onmouseup = function(){
			node.style.backgroundColor = "#317ef3";
		};
		node.onmouseout = function(){
			node.style.backgroundColor = "";
		}
	},
	ajax : function(url , type , handler){
		var xhr;
		if (window.XMLHttpRequest){
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhr.open(type , url ,true);
		xhr.send();
		xhr.onreadystatechange = function(){
			if (xhr.readyState = 4){
				if (xhr.status == 200) {
					handler(xhr.responseText);
				} else {
					alert("发送失败，请重新发送！");
				}
			}
		}
	},
	/**
	 * getRandomColor获取随机颜色的函数
	 * @returns {string}
     */
	getRandomColor : function(){
		var R = parseInt(Math.random()*255).toString(16);//转换进制toString的对象必须是一个number类型
		var G = parseInt(Math.random()*255).toString(16);//toString中可写2-36之间的进制数
		var B = parseInt(Math.random()*255).toString(16);//parseInt有一个方法，可以将2-36进制的数转化为10进制
		//此处三元判断的意义：保证R、G、B产生的都是2位十六进制数
		return "#" + (R.length < 2 ?"0" + R :R) + (G.length < 2 ?"0" + G :G) + (B.length < 2 ?"0" + B :B);
	},
	/**
	 * 获取min到max之间的随机数的函数
	 * @param min 随机数下限
	 * @param max 随机数上限
	 * @param isFloat  所取随机数是否可为小数
     * @returns {*} 返回所需区间内的随机数
     */
	getRandomNum : function(min, max, isFloat) {
		if (isFloat) {
			return Math.random() * (max - min) + min;
		}
		return Math.floor(Math.random() * (max - min)) + min;
	}

};
/**
 * 获取ID的封装函数
 * @param id
 * @returns {Element}
 */
function $ (id){
	return document.getElementById(id);
}
function $$(ele) {
	return document.getElementsByTagName("ele");
}



/**
 * 字符串或数组的去重
 * @param str 要去除的重复的字符串或者数组。
 * @returns {*}
 */
function unique(str){
	var arr;
	if (typeof str == "string"){
		arr = str.split("");
	}else{
		arr = str;
	}
	var result = [];
	for (var i = 0;i < arr.length;i++){
		var isRepeat = false;
		for (var j = 0; j < result.length; j++) {
			if (arr[i] == result[j]) {
				isRepeat = true;
				break;
			}
		}
		if (!isRepeat) {
			result.push(arr[i]);
		}
	}
	if (typeof str == "string") {
		return result.join("");
	}
	return result;
}
/**
 * 冒泡排序
 * @param arr
 * @returns {*}
 */
function bubbleSort(arr) {
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr.length - i; j++) {
			if (arr[j] > arr[j + 1]) {
				var temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
	}
	return arr;
}


var CookieUitl ={
	/**
	 * 设置cookie
	 * @param key cookie 名
	 * @param value cookie 值
	 * @param expires cookie 的过期期限，有闲时间 number型，如输入7，有效期为7天
	 * @param path cookie 的路径（不一定是文件的路径，通过path自己进行设置）
	 * @param domain cookie 的域名
	 * @param isSecure 是否安全的标志
	 */
	setCookie : function(key,value,expires,path,domain,isSecure){
		//实参和形参一一对应，无此实参就在相应位置写上空串"",或者false;
		var str = key + "=" + encodeURIComponent(value);
		//encodeURIComponent(value)将value中可能出现的“=”转码了“%3d”
		//if(expires){
		//	str += ";expires=" + expires;//""引号里面不用写空格
		//}//因想输入一个数字直接出几天后时间，所做更改如下：
		if(typeof expires == "number"){
			var date = new Date();
			date.setDate(date.getDate() + expires);
			str += ";expires=" + date;//""引号里面不用写空格
		}
		if(path){
			str += ";path=" + path;
		}
		if(domain){
			str += ";domain=" + domain;
		}
		if(isSecure){
			str += ";secure";//secure不用加等于，不用赋值
		}
		document.cookie = str;
	},
	/**
	 * 删除cookie封装函数
	 */
	removeCookie : function(key){
		this.setCookie(key, "", -1);//过期时间设为负值，过期后删除,
		// 不加this无法获得setCookie()，不能实现相应的功能
	},
	/**
	 * 获取cookie
	 */
	getCookie : function(key){
		var str = document.cookie;
		var arr = str.split("; ");
		for (var i = 0; i < arr.length; i++){
			if(arr[i].indexOf(key) != -1){
				var temp = arr[i].split("=");
				if(temp[0] == key){
					return decodeURIComponent(temp[1]);
				}
			}
		}
		return null;
	},
	/**
	 * 获取多个cookie值的封装函数 如user=孙文月&passward=123&name=swy-----first--stage---homework
	 * 		("user"为key,"孙文月&passward=123&name=swy-----first--stage---homework"为与“key”相对应的keyvalue)
	 * 				书写方式如下：
	 * 				CookieUitl.setCookie("user","孙文月&passward=123&name=swy-----first--stage---homework",2)
	 *				CookieUitl.setCookie("user2","孙文月&passward=456&name=swy-----first--stage---homework",2)
	 * @param key1  指的是key,如“user"、"user2"
	 * @param key2  指的是与key1相对应的value值，如："孙文月&passward=456&name=swy-----first--stage---homework"
	 * @returns {*}
	 */
	getCookieFromMult :function(key1,key2){
		var value1 = CookieUitl.getCookie(key1);//此处得到key1对应的一串value值
		if(!value1){
			return;//若不进行此判断，如value1是空会报错说空串不能split
					// (如果key1存在，则value1不可能为空，此处为避免key1为空的情况)
		}
		var valuearr = value1.split("&");
		//此处判断key2是否为空，若为空，说明该cookie为"user" = "孙文月"的格式，
		// 即value值单一;
		if (!key2){
			return valuearr[0];
		}
		//若不为空，进行遍历valuearr,看该数组中是否有包含key2的字符串
		for (var i = 0;i < valuearr.length;i++){
			if(valuearr[i].indexOf(key2) != -1){
				var temparr = valuearr[i].split("=");
				//这一步判断是为了排除所获取的temparr[0]是包含key2但不完
				// 全等于key2的字符串
				if (temparr[0] == key2){
					return decodeURIComponent(temparr[1]);
				}
			}
		}
		return null;//遍历完后没找到key2，返回null
	},
	/**
	 * 存储多个cookie值的封装函数（功能，存储一组cookie值，并可独立更改特定的key的value值）
	 * @param key1 多值cookie的id号如：sno_123=name=苹果&price=5&num=4中的sno_123
	 * @param key2 要操作的key,如：sno_123=name=苹果&price=5&num=4中的name\price\num
	 * @param value key2的value值
     * @param expires 过期时间
     */
	setCookieAtMult :function(key1,key2,value,expires){
		//sno_123=name=苹果&price=5&num=4
		var val = this.getCookie(key1);//val为name=苹果&price=5&num=4
		var subValList = val.split("&");//subValList = [name=苹果,price=5,num=4]
		for ( var i = 0;i <= subValList.length;i++){
			if (subValList[i].indexOf(key2) != -1){
				var temp = subValList[i].split("=");//若key2=num ，temp = [num,4]
				if (temp[0] == key2){
					subValList[i] = key2 + "=" + value;
					val = subValList.join("&");//数组元素用&符号链接转换成字符串
					this.setCookie(key1,val,expires || 7);//再次存入cookie
					break;
				}
			}
		}
	}
};
/**
 * 点击dragNode对象拖动panel（dragNode的父元素，即最外面的大框）
 * 不用监听事件，因为IE6不识别addEventListener监听器
 * @type {{dragAble: DragUtil.dragAble}}
 */
var DragUtil = {
	dragAble : function(dragNode, panel) {
		dragNode.onmousedown = function(ev) {
			ev = ev || event;
			var preX =  ev.offsetX;
			var preY = ev.offsetY;

			function dragMove(ev2) {
				ev2 = ev2 || event;
				panel.style.left = ev2.clientX - preX + "px";
				panel.style.top = ev2.clientY - preY + "px";
			}

			document.onmousemove = dragMove;

			dragNode.onmouseup = function(){
				document.onmousemove = null;
			}
		};
	}
};
/**
 * 常用的js动态特效
 */
var SpecialUtil = {
	/**
	 * 让元素节点逐渐消失  特效
	 * @param msgNode   页面元素(逐渐消失的那个元素，即作用对象)
	 * @param errMsg	页面元素内的提示信息（错误信息）字符串 根据需求调用时填写
	 * @param time		页面从出现到消失渐变总时长
     * @param step		页面的透明度减少的次数
     */
	gradDisappear : function(msgNode, errMsg, time, step) {
		var count = 100;
		time *= 1000;//若想5秒内实现出现到消失，则time=5；

		// 只需要在页面搜索一次就可以
		if (errMsg) {
			msgNode.innerHTML = errMsg;
		}
		// 2000ms
		// 总共2s做20次变化
		var timer = setInterval(function(){
			var num = time / step;
			count -=  1*100 / num;//1为不透明时的透明度值，为避免浮点型不等于零的情况
			msgNode.style.opacity = count / 100;//透明度的取值只能0-1
			//filter : alpha(opacity = 0);//IE兼容,count 不能直接写在括号内，它是变量。
			msgNode.style.filter = "alpha(opacity=" + count + ")";
			if (count == 0) {
				clearInterval(timer);
			}
		}, step);
	}
};


/*
 * 兼容IE的相关事件
 */
var IEUtil = {
	/**
	 * stopDefault:阻止浏览器默认行为
	 * @param evt
	 */
	stopDefault : function(evt){
		if(!evt){
			evt.returnValue = false;
		}else{
			evt.preventDefault();
		}
	},
	/**
	 * stopBubble阻止冒泡
	 * @param evt
     */
	stopBubble : function(evt){
		if(!evt){
			event.cancelBubble = true;
		}else{
			evt.stopPropagation();
		}

	},
	/**
	 * 添加监听事件
	 * @param node 所要监听事件的对象
	 * @param type 事件
	 * @param handler
	 * @param IsBubble
     */
	addEventListener : function(node, type, handler, IsBubble){
		if(typeof attachEvent == "undefined"){
			node.addEventListener(type,handler,IsBubble);
		}else{
			node.attachEvent("on" + type, handler);
		}
	},
	/**
	 * 移除监听事件
	 * @param node
	 * @param type
	 * @param handler
	 * @param IsBubble
     */
	deleteListener : function(node, type, handler, IsBubble){
		if (typeof detachEvent == "undefined"){
			node.removeEventListener(type, handler, IsBubble);
		}else {
			node.detachEvent("on" + type,handler)
		}
	},/**
	 * 获取 元素样式    通过style只能获取行内样式
	 * @param obj 要获取样式的元素
	 * @param attr 要获取样式的属性如color,height……
	 * @returns {*}
	 */
	 getAttr : function(obj, attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];//IE
		}
		return getComputedStyle(obj, false)[attr];//非IE
	 },
	//var obj = {
	//	name : "abc",
	//	age : 18
	//};
	//alert(obj.name);
	//var name = "age";
	//alert(obj["name"]);
	//alert(obj[name]);

	/**
	 * IE6不识别document.getElementsByClassName，
	 * 故用此函数获取元素节点且兼容各大浏览器的
	 * @param str 要获取节点的id名或者className名或者标签名格式分别为“#box”".active""input"
	 * @returns {*}
     */
	 $ : function(str) {
		if (str.charAt(0) == "#") {
			return document.getElementById(str.substring(1));
		} else if (str.charAt(0) == ".") {
			// 表示非IE
			if (document.getElementsByClassName) {
				return document.getElementsByClassName(str.substring(1));
			} else {
				var all = document.getElementsByTagName("*");
				var result = [];
				for (var i = 0; i < all.length; i++) {
					// 获取某一个元素上所有的样式名字
					var nameList = all[i].className.split(" ");
					for (var j = 0; j < nameList.length; j++) {
						// 判断样式列表里面是否存在我们想要获取的样式
						// 若有则存入返回数组对象中
						if (nameList[j] == str.substring(1)) {
							result.push(all[i]);
							break;
						}
					}
				}
				return result;
			}

		}
		return document.getElementsByTagName(str);
	 },
	/**
	 * 当输入框值发生变化时的触发事件
	 * @param node 事件添加对象，一个input框
	 * @param funName 事件促发后要执行的函数
     */
	inputChangeEvent : function(node,funName){
		if (onpropertychange){
			node.onpropertychange= funName;
		}else{
			node.oninput = funName;
		}
	},

	//定义一个用于创建XMLHttpRequest对象的函数
	createXMLHttpRequest : function (){
		var xmlHttpRequest;  //定义一个变量用于存放XMLHttpRequest对象
		if(window.ActiveXObject)
		{
			//IE浏览器的创建方式
			xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		}else if(window.XMLHttpRequest)
		{
			//Netscape浏览器中的创建方式
			xmlHttpRequest = new XMLHttpRequest();
		}
}


};
//3.DateUtil getNow() getPreDay(n) getNextDay(n)
var DateUtil = {
	getNow : function(){
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();
		return year + "-" + (month + 1) + "-" + day;
	},
	getPreDay : function(n){
		var second = n * 24 * 60 * 60*1000;
		var date = new Date();
		var seconds = date.getTime();
		var PreTime = new Date((seconds - second));
		var year = PreTime.getFullYear();
		var month = PreTime.getMonth();
		var day = PreTime.getDate();
		return year + "-" + (month + 1) + "-" + day;
	},
	getNextDay : function(n){
		var second = n * 24 * 60 * 60*1000;
		var date = new Date();
		var seconds = date.getTime();
		var nextTime = new Date((seconds + second));
		var year = nextTime.getFullYear();
		var month = nextTime.getMonth();
		var day = nextTime.getDate();
		return year + "-" + (month + 1) + "-" + day;
	}
};