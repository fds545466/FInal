// 讀取opendata資料
var URL="https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c"

var xhr = new XMLHttpRequest();
xhr.open('get',URL,true);
xhr.setRequestHeader('contentType','application/json; charset=utf-8');
xhr.send(null);
xhr.onload = function () {
    console.log(xhr.responseText);
    database = JSON.parse(xhr.responseText);
    data = database.data.XML_Head.Infos.Info

};


/**
 * DOM 選擇元素
 */
var el = document.querySelector('.List');
var dataLen = data.length;
var dataBox = "";

for(var i =0;i <dataLen;i++){
    var content ='<li>'+ data[i].Name +'</li>';
    str += content;
}
el.innerHTML = str;
