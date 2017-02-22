//随机颜色的获取RGB
function color1() {
	var colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
	var color = "";
	for(var i = 0; i < 6; i++) {
		var n = Math.floor(Math.random() * 16);
		color += colors[n];//color=color+colors[n];
	}
	//consle.log(color);
	//alert(color);
	return "#" + color;
}
onload = function() {
	//间歇调用 更换边框颜色
	setInterval(function() {
		var box = document.getElementsByClassName("box")[0];
		var divs = box.children;
		//alert(divs);
		//alert(color1());
		//for(var j in divs) {
			//alert("111");
			for(var j=0;j<divs.length;j++){
				divs[j].setAttribute("style","border-color:"+color1());
			}
			
		//}
	}, 1000);
//写了一个拖拽函数
	var ball = document.getElementById("ball");
	ball.onmousedown = function(evt) {
		//alert("111");
		var event = evt || window.event;
		var offsetX = event.offsetX;
		var offsetY = event.offsetY;
		document.onmousemove = function(evt) {
			//alert("222");
			//document.write("111");
			var event = evt || window.event;
			ball.style.left = (event.clientX + document.documentElement.scrollLeft-offsetX)+"px";
			ball.style.top = (event.clientY + document.documentElement.scrollTop-offsetY)+"px";
		}
	}
	ball.onmouseup = function() {
		document.onmousemove = null;
	}
}