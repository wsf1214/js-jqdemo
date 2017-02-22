 onload=function() {
    var boxs=document.getElementById("boxs");
	var abox=document.getElementsByClassName("box");
	var boxwidth=abox[0].offsetWidth;
	var documentwidth=document.documentElement.clientWidth;
	var num=Math.floor(documentwidth/boxwidth);
	boxs.style.cssText='width:'+boxwidth*num+'px;margin:0 auto';
	var aboxHeight=new Array();
	for(var i=0;i<abox.length;i++){
		if(i<num){
			abox[i].style.top = 0 + 'px';
            abox[i].style.left = boxwidth * i + 'px';
            aboxHeight.push(abox[i].offsetHeight);
		}
		else{
			var minHeight=Math.min.apply(null,aboxHeight);
			var minIndex=getIndex(aboxHeight,minHeight);
			abox[i].style.position="absolute";
			abox[i].style.top=minHeight+"px";
			abox[i].style.left=abox[minIndex].offsetLeft+"px";
			aboxHeight[minIndex]+=abox[i].offsetHeight;
		}
	}
}
function getIndex(arr, value) {
    for(var i in arr) {
        if(arr[i] == value){
        	return i;
        } 
    }
}