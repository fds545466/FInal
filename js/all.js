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
var scrollEl = document.getElementById('scroll');
var select_location = document.querySelector('#select_location');
var datadBox = document.querySelector('.datadBox');
var datadBoxTitle = document.querySelector('.datadTaitle');
var Btn = document.querySelectorAll('.Btn');
var UlList = document.querySelector('.ulList');
var PgLen = document.querySelector('.pageLen');

