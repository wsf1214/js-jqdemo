
onload = function(){
	box1 = document.getElementById("box1");
	box = document.getElementsByName("box");
	btnDiv = document.getElementById("btnDiv");
	btn =document.getElementsByTagName("input");
	btn.timer=null;

	function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}
		else{
			return getComputedStyle(obj)[attr];
		}
	}


	/*
	btn[0].onclick=function(){	
		for(var i=0;i<box.length;i++){	
				
			if(box[i].offsetLeft<0||box[i].pffsetTop<0){
				alert("GAMEOVER");	
			}else{
				startMove(box[i],{left:parseInt(veCode(1)),top:parseInt(veCode(1))});
				
			}
		}
	}
	*/
	//鼠标经过弹 但是出界后不返回
	for(var i=0;i<box.length;i++){
		box[i].onmouseover=function(){
			for(var i=0;i<box.length;i++){	
				
				if(box[i].offsetLeft<0||box[i].offsetTop<0){
					alert("GAMEOVER");
				}
					startMove(box[i],{left:parseInt(veCode(1)),top:parseInt(veCode(1))});
					
				
			}
		}
	}
	
	/*
	btn[3].onclick=function(){
		var text  = createElement(box.length+1);
		var box = createElement("box");
		box.createElement(text);
		box1.insertBefore(btnDiv,box);
		
	}
	*/
}
	function back(){
		for(var i=0;i<box.length;i++){
			box[i].style.left="240px";
			box[i].style.top="240px";
			
		}
	}
//alert



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
         if(attr=='opacity'){
             iCur = parseInt(100*parseFloat(getStyle(obj,attr)));
         }
         else{
             iCur = parseInt(getStyle(obj,attr));
         }
         var iSpeed = (json[attr] - iCur)/8;
         iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
         if(json[attr]!=iCur){
             bStop = false;
         }
         if(attr=='opacity'){
             obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
             obj.style.opacity = (iCur + iSpeed)/100;
         }
         else{
             obj.style[attr] = iCur + iSpeed + 'px';
         }
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
 
 function veCode(n){
	var veCode = [];
	var rad = [];
	function add(a,b){	
		for(var i=a;i<=b;i++){
			rad.push(i);
		}
	};
	add(-30,480);

	function num(c,d){
		var e = d+1-c;
		return Math.floor(Math.random()*e+c);
	};//c-d之间的随机数

	for(var k =1;k<=n;k++){
		veCode.push(rad[num(0,rad.length-1)]);
	}
	return veCode.join("");
}