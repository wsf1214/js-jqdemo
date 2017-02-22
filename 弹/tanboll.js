
	var box2 = document.getElementsByName("box");
	var box1 = document.getElementById("box1");
	var btnDiv = document.getElementById("btnDiv");
	var btn =document.getElementsByTagName("input");
	btn.timer=null;	
	//增加球个数
	btn[2].onclick=function(){
		//var text  = createTextNode(box.length+1);
		var box = document.createElement("div");
		box.className="box2";
		box.setAttribute("name","box");
		var box3 =document.getElementsByName("box");
		box.innerHTML=box3.length+1;
		//alert(box3.length+1);
		box1.appendChild(box);	
	}
	//加10个
	btn[3].onclick=function(){
		for(var i = 0;i<10;i++){
			var box = document.createElement("div");
			box.className="box2";
			box.setAttribute("name","box");
			var box3 =document.getElementsByName("box");
			box.innerHTML=box3.length+1;
			//alert(box3.length+1);
			box1.appendChild(box);
		}
	}
	//减少球个数
	btn[4].onclick=function(){
		var box3 =document.getElementsByName("box");
		box3[box3.length-1].parentNode.removeChild(box3[box3.length-1]);
	}
	//减10个
	btn[5].onclick=function(){
		for(var i=0;i<10;i++){
			var box3 =document.getElementsByName("box");
			box3[box3.length-1].parentNode.removeChild(box3[box3.length-1]);
		}		
	}
	//点击按钮弹
	btn[0].onclick=function(){	
		for(var i=0;i<box2.length;i++){		
			if(box2[i].offsetLeft<0||box2[i].pffsetTop<0){
				alert("GAMEOVER");	
			}
				startMove(box2[i],{left:parseInt(veCode(1)),top:parseInt(veCode(1))});
				
		}
	}
	//重置
	btn[1].onclick=function(){
		for(var i=0;i<box2.length;i++){
			//box2[i].style.left="240px";
			//box2[i].style.top="240px";
			startMove(box2[i],{left:240,top:240});
		}
	}
	//鼠标经过弹 
	box1.onmouseover=function(){
		for(var i=0;i<box2.length;i++){	
			if(box2[i].offsetLeft<0||box2[i].offsetTop<0){
				alert("GAMEOVER");
			}
				startMove(box2[i],{left:parseInt(veCode(1)),top:parseInt(veCode(1))});
		}
	}

	
	
	


function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}
		else{
			return getComputedStyle(obj)[attr];
		}
	}

function startMove(obj,json,fnEnd){
      if(obj.timer){
          clearInterval(obj.timer);
      }
      obj.timer = setInterval(function(){
          doMove(obj,json,fnEnd);
      },30);
  }
  function doMove(obj,json,fnEnd){
     var iCur = 0;
     var attr = null;     var bStop = true;
     for(attr in json){

   
             iCur = parseInt(getStyle(obj,attr));

         var iSpeed = (json[attr] - iCur)/8;
         iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
         if(json[attr]!=iCur){
             bStop = false;
         }
        
             obj.style[attr] = iCur + iSpeed + 'px';
         
     }
     if(bStop){
         clearInterval(obj.timer);
         obj.timer = null;
         if(fnEnd){
             fnEnd();
         }
     }
 }
 function getStyle(obj,attr){
     if(obj.currentStyle){
         return obj.currentStyle[attr];
     }
     else{
         return getComputedStyle(obj)[attr];
     }
 }
 //球弹随机位置
 function veCode(n){
	var veCode = [];
	var rad = [];
	function add(a,b){	
		for(var i=a;i<=b;i++){
			rad.push(i);
		}
	};
	add(1,480);

	function num(c,d){
		var e = d+1-c;
		return Math.floor(Math.random()*e+c);
	};//c-d之间的随机数

	for(var k =1;k<=n;k++){
		veCode.push(rad[num(0,rad.length-1)]);
	}
	return veCode.join("");
}