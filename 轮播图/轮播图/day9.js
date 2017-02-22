
onload= function(){
	var box1= document.getElementById("box1");
	var j = 0;
	var fun= setInterval(function(){
		var i = (0-j)*600;
		box1.style.left=i+"px";
		j++;
		if(j==5){
			j=0;
		}
		
	},500)
	
}
