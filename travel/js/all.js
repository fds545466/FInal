/**
 * 景點API資料取得
 */
$.ajax({
    type:'Get',
    url:"https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json",
    success:function(data){
    // 成功會回傳資料到data變數
    }

});
// var data = [];
// data = 


/**
 * 行政區下拉式選單
 */
// const zoneSelect = document.querySelector('#zoneSelect');
// const dataLen = data.length;
// let zoneList = []
// for (let i = 0 ;i < dataLen; i++) {
//     if(zoneList.indexOf(data[i].Zone)=== -1) {   
//         zoneList.push(data[i].Zone);
//     };
// };

// let zoneListLen = zoneList.length;
// for (let i = 0 ;i < zoneLisLen; i++) {
//     const newOpt = document.createElement('option');
//     newOpt.setAttribute('value', '${zoneList[i]}');
//     newOpt.textContent('${zoneList[i]}');
//     zoneSelect.appendChild(newOpt);
// };
