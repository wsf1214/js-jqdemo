var dataInit = {
    'data':[
        {'src':'img/13.jpg'},
        {'src':'img/14.jpg'},
        {'src':'img/15.jpg'},
        {'src':'img/16.jpg'},
        {'src':'img/17.jpg'},
        {'src':'img/18.jpg'},
        {'src':'img/1.jpg'},
        {'src':'img/2.jpg'},
        {'src':'img/3.jpg'},
        {'src':'img/4.jpg'},
        {'src':'img/5.jpg'},
        {'src':'img/6.jpg'}
    ]
};
//图片的排列
function waterfall(boxs, box) {
    var boxs=document.getElementById(boxs);
	var abox=document.getElementsByClassName(box);
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
function getIndex(arr, min) {
    for(var i in arr) {
        if(arr[i] == min){
        	return i;
        } 
    }
}
//加载图片
//思路：当滚动条拉到最后张图片露出一半时，加载剩余的图片。
window.onload = function() {
    waterfall('boxs', 'box');
}
function checkScrollside(box) {
    var abox = document.getElementsByClassName(box);
    //求出最后一个盒子上边距和盒子一半高度的和
    var lastImgIn = abox[abox.length-1].offsetTop + Math.floor(abox[abox.length-1].offsetHeight/2);
        // alert(lastImgIn);//885
    //求出用户拉动滑动条的长度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
       //alert(scrollTop);//671
    //页面的高度
    var documentHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //alert(documentHeight);//开始为0
    return (lastImgIn < scrollTop + documentHeight);
}
window.onscroll = function() {
    if(checkScrollside('box')) {
        var oBoxs = document.getElementById("boxs");
            for(var i = 0; i < dataInit.data.length; i++) {
            var oBox = document.createElement('div');
            oBox.className = 'box';
            var oPic = document.createElement('div');
            oPic.className = 'pic';
            var oImg = document.createElement('img');
            oImg.src = dataInit.data[i].src;
            oPic.appendChild(oImg);
            oBox.appendChild(oPic);
            oBoxs.appendChild(oBox);
        }
        waterfall('boxs', 'box');
    }
}
