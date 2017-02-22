
$(function(){
	var note = $(".note");
	ts = new Date(2017, 1, 1);
	newYear = true;
	if((new Date()) > ts){
		ts = (new Date()).getTime() + 10*24*60*60*1000;
		newYear = false;
	}
		
	$(".note").countdown({
		timestamp	: ts, //timeStamp 事件属性可返回一个时间戳。指示发生事件的日期和时间
		callback	: function(days, hours, minutes, seconds){		
		var message = "";		
		message += days + "天";
		message += ( hours<10 ? '0':'' )+hours + "时";
		message += ( minutes<10 ? '0':'' )+minutes + "分";
		message += ( seconds<10 ? '0':'' )+seconds + "秒" ;
		/*------	
			if(newYear){
				message += "left until the new year!";
			}
			else {
				message += "left to 10 days from now!";
			}		
		-------*/			
			note.html(message);
		}
	});	
	
})
