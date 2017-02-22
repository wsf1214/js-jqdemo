/**
 * Created by yangbin on 2016/7/19.
 */

/*
   ajax：get请求
   返回数据为对象/数组
 */
var  $ = {
    ajax:function (url, successFn){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            successFn(JSON.parse(xhr.responseText));
        }
    };
    xhr.open("get", url, true);
    xhr.send();
    }
}