$(function(){
	//存放所有的商品
	var productData = [];
	//每页的显示的行数
	var pageRows = 10;
	
	var $proList = $('#main ul');
	$.get("json/product.json",function(res){
//		console.log(res.length);

		productData = res;
		//计算总页数
		var pageCount = Math.ceil(productData.length / pageRows);
//		alert(pageCount);
		
		addData(1);  //显示第一页的数据   ：10条
		
		$('.pages').createPage({
			pageCount:pageCount,
			current:1,
			backFn:function(page){
				addData(page);
			}
		})
	})
	
	function addData(page){
		var iNum = (page - 1) * pageRows;
		var str = '';
		for(var i = 0;i < pageRows;i++){
			if(!productData[iNum + i]){
				break;
			}
			
			str += '<li>'+
						'<img src="'+productData[iNum + i].imgSrc+'" alt="" />'+
						'<p class="price">￥'+productData[iNum + i].price+'</p>'+
						'<p>'+productData[iNum + i].info+'</p>'+
						'<p>月成交<span>'+productData[iNum + i ].sellNum+'笔</span></p>'+
					'</li>';
		}
		
		$proList.html(str);
	}
	
	
	
})
