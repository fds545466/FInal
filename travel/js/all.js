//DOM
var dataCardBox = document.querySelector('.dataCardBox');
var pageNav = document.querySelector('.pageNav');
var pageNavLi = document.querySelectorAll('.pageNavLi');
var Btn_Box = document.querySelector('.Btn_Box');
var select_box = document.querySelector('#select_box');

//事件
pageNav.addEventListener('click', pageNum_click, false);
select_box.addEventListener('change', select_change, false);
Btn_Box.addEventListener('click', btn_click, false);

//xhr
var xhr = new XMLHttpRequest();  
// xhr.open('GET','https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c', false);
xhr.open('Get','data/attractionapi.json',false);
// xhr.open('GET','./attractionapi.json', false);
xhr.send(null);

//資料
var database = JSON.parse(xhr.responseText);  
// var data = database.data.XML_Head.Infos.Info;
var data = database.result.records;
var dataLen = data.length;  //資料長度 == 100
var str = '';

var array = [];  //array 未篩選過區域的陣列
for (var i = 0; i < dataLen; i++) {
    var el = data[i].Zone;
    array.push(el);
}

var array_result = array.filter(function (element, index, arr) {  //篩選出各區到陣列result (代表篩選過區域的陣列) 
    return arr.indexOf(element) === index;
});

//放進selectBox裡面
var select_box_str='<option  value="" selected disabled hidden>--請選擇行政區--</option>';
console.log(data);
for(var i = 0 ; i <array.length ; i++){
    var el = '<option value="' + array_result[i] + '">' + array_result[i] + '</option>';
    select_box_str+= el;
}   
select_box.innerHTML = select_box_str;
//初始
var start = true;
var pageNum = 1;
var dataNum_start = (pageNum - 1) * 20;
var dataNum_end = dataNum_start + 20;
var dataCardBox_txt = '';
updateList();
pageNavLi[0].style.color = 'rgba(74,74,74,0.50)';
pageNavLi[1].style.color = '#559AC8';


function btn_click(e) {
    start = false;
    str = e.target.dataset.btn;
    console.log(str);
    updateList();
}

function select_change(e) {
    start = false;
    str = e.target.value;
    console.log(str);
    updateList();
}

function updateList() {
    var dataCardNowNum = 0;
    var dataCardBox_txt = '';
    if(str !== '全部行政區' && start == false){
        var dataCard_head_Str = '<hr><img class="dataCardBox_img" src="assets/icons_down.png"><h2 class="dataCardBox_h1">' + str + '</h2>';
        dataCardBox_txt = dataCard_head_Str;
        for (var i = 0; i < dataLen; i++) {
            var dataCardNow = data[i];
            if (dataCardNow.Zone == str) {
                dataCardNowNum += 1;
                var dataCardBox_li_01 =
                    + dataCardNow.Picture1 + ');"><h3>'
                    + dataCardNow.Name + '</h3></div><div class="txtbox"><div class="box"><div class="img" ><img style="height: 100%;" src="assets/icons_clock.png" alt=""></div><p>'
                    + dataCardNow.Opentime + '</p></div><div class="box"><div class="img" ><img style="height: 100%;" src="assets/icons_pin.png" alt=""></div><p>'
                    + dataCardNow.Add + '</p></div><div class="box"><div class="img" ><img style="height: 100%;" src="assets/icons_phone.png" alt=""></div><p>'
                    + dataCardNow.Tel + '</p></div></div>';

                if (dataCardNow.Ticketinfo == '免費參觀') {
                    var dataCardBox_li_02 = '<div class="visitBox"><div class="img"><img src="assets/icons_tag.png" alt=""></div><p>'
                        + dataCardNow.Ticketinfo + '</p></div></li>';
                    var dataCardBox_li = dataCardBox_li_01 + dataCardBox_li_02;
                } else {
                    var dataCardBox_li = dataCardBox_li_01;
                }
                dataCardBox_txt += dataCardBox_li;
            }
        }

        console.log(dataCardNowNum);

        if(dataCardNowNum > 20){
            pageNav.style.visibility = "visible";
        }else{
            pageNav.style.visibility = "hidden";
        }

    }else if(str == '全部行政區' || start){
        for (var i = 0; i < dataLen; i++) {
            var dataCardNow = data[i];
            dataCardNowNum += 1;
        }

        console.log(dataCardNowNum);

        if(dataCardNowNum > 20){
            pageNav.style.visibility = "visible";
            pageData();
            for (var i = dataNum_start; i < dataNum_end; i++) {
                var dataCardNow = data[i];
                dataCardNowNum += 1;
                var dataCardBox_li_01 =
                    '<li class="dataCard"><div class="picbox" style="background-image: url('
                    + dataCardNow.Picture1 + ');"><h3>'
                    + dataCardNow.Name + '</h3></div><div class="txtbox"><div class="box"><div class="img" ><img style="height: 100%;" src="assets/icons_clock.png" alt=""></div><p>'
                    + dataCardNow.Opentime + '</p></div><div class="box"><div class="img" ><img style="height: 100%;" src="assets/icons_pin.png" alt=""></div><p>'
                    + dataCardNow.Add + '</p></div><div class="box"><div class="img" ><img style="height: 100%;" src="assets/icons_phone.png" alt=""></div><p>'
                    + dataCardNow.Tel + '</p></div></div>';

                if (dataCardNow.Ticketinfo == '免費參觀') {
                    var dataCardBox_li_02 = '<div class="visitBox"><div class="img"><img src="assets/icons_tag.png" alt=""></div><p>'
                        + dataCardNow.Ticketinfo + '</p></div></li>';
                    var dataCardBox_li = dataCardBox_li_01 + dataCardBox_li_02;
                } else {
                    var dataCardBox_li = dataCardBox_li_01;
                }
                dataCardBox_txt += dataCardBox_li;
            }
        }
    }
    dataCardBox.innerHTML = dataCardBox_txt;
}

function pageNum_click(e) {
    pageNavLi[0].style.color = '#4A4A4A';
    pageNavLi[1].style.color = '#4A4A4A';
    pageNavLi[2].style.color = '#4A4A4A';
    pageNavLi[3].style.color = '#4A4A4A';
    pageNavLi[4].style.color = '#4A4A4A';
    pageNavLi[5].style.color = '#4A4A4A';
    pageNavLi[6].style.color = '#4A4A4A';
    var pageBtn = e.target.dataset.pagebtn;
    if (pageBtn == 'after') {
        if (pageNum<5){
            pageNum += 1;
        }
        switch (pageNum) {
            case 1:
                pageNavLi[0].style.color = 'rgba(74,74,74,0.50)';
                pageNavLi[1].style.color = '#559AC8';
                updateList();
                break;
            case 2:
                pageNavLi[2].style.color = '#559AC8';
                updateList();
                break;
            case 3:
                pageNavLi[3].style.color = '#559AC8';
                updateList();
                break;
            case 4:
                pageNavLi[4].style.color = '#559AC8';
                updateList();
                break;
            case 5:
                pageNavLi[5].style.color = '#559AC8';
                pageNavLi[6].style.color = 'rgba(74,74,74,0.50)';
                updateList();
                break;
            default:
                break;
        }
    } else if (pageBtn == 'before'){
        if (pageNum > 1) {
            pageNum -= 1;
        }
        switch (pageNum) {
            case 1:
                pageNavLi[0].style.color = 'rgba(74,74,74,0.50)';
                pageNavLi[1].style.color = '#559AC8';
                updateList();
                break;
            case 2:
                pageNavLi[2].style.color = '#559AC8';
                updateList();
                break;
            case 3:
                pageNavLi[3].style.color = '#559AC8';
                updateList();
                break;
            case 4:
                pageNavLi[4].style.color = '#559AC8';
                updateList();
                break;
            case 5:
                pageNavLi[5].style.color = '#559AC8';
                pageNavLi[6].style.color = 'rgba(74,74,74,0.50)';
                updateList();
                break;
            default:
                break;
        }
    } else {
        pageNum = parseInt(e.target.dataset.pagenum);
        switch (pageNum) {
            case 1:
                pageNavLi[0].style.color = 'rgba(74,74,74,0.50)';
                pageNavLi[1].style.color = '#559AC8';
                updateList();
                break;
            case 2:
                pageNavLi[2].style.color = '#559AC8';
                updateList();
                break;
            case 3:
                pageNavLi[3].style.color = '#559AC8';
                updateList();
                break;
            case 4:
                pageNavLi[4].style.color = '#559AC8';
                updateList();
                break;
            case 5:
                pageNavLi[5].style.color = '#559AC8';
                pageNavLi[6].style.color = 'rgba(74,74,74,0.50)';
                updateList();
                break;
            default:
                break;
        }
    }
}


function pageData() {
    dataNum_start = (pageNum - 1) * 20;
    dataNum_end = dataNum_start + 20;
    console.log(pageNum, dataNum_start, dataNum_end);
}
