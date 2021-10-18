var result = document.querySelector('.result');
var look = document.querySelector('.look');
var list = document.querySelector('.container2');
var bmiNum = JSON.parse(localStorage.getItem('bmiNum')) || [];

look.addEventListener('click', bmi);
list.addEventListener('click', listDel);
updateList(bmiNum)


//計算BMI
function bmi(e){
    var cm = document.querySelector('.cm').value;
    var kg = document.querySelector('.kg').value;
    var bmi = (kg / ((cm*0.01) * (cm*0.01))).toFixed(1);
    var today = new Date();
    var day = today.getFullYear()+ '-' + (today.getMonth()+1) + '-'+today.getDate();
    var bmiArr= {
        height : cm,
        weight : kg,
        bmi: bmi,
        day: day
    };
    // console.log(bmiNum);
    bmiNum.push(bmiArr);
    // console.log(bmiArr);
    updateList(bmiNum);
    localStorage.setItem('bmiNum', JSON.stringify(bmiNum));
    
    look.innerHTML =  `<span class="result-v">${bmi}</span> <br>
                       <span class="result-b">BMI</span>
                       <div class=""><img src="img/icons_loop.png"></div>`;

    //分顏色
    if(bmi<18.5){
        look.setAttribute('class', 'look look-b');

    }else if(bmi>=18.5 && bmi<=23.9){
        look.setAttribute('class', 'look look-g');
        
    }else if(bmi>24 && bmi<=27.9){
        look.setAttribute('class', 'look look-o');

    }else if(bmi>=28 && bmi<30){
        look.setAttribute('class', 'look look-bo');
 
    }else if(bmi>=30 && bmi<35){
        look.setAttribute('class', 'look look-bbo');

    }else if(bmi >= 35){
        look.setAttribute('class', 'look look-r');
    }
}


//更新及顯示
function updateList(){
    var str = "";
    for (let i = 0; i < bmiNum.length; i++) {
       var bmiLv = '';
       var color = '';

       if(bmiNum[i].bmi < 18.5){
           bmiLv = '過輕';
           color = 'color-b';
       }else if(bmiNum[i].bmi>=18.5 && bmiNum[i].bmi<=23.9){
            bmiLv = '理想';
            color = 'color-g';
       }else if(bmiNum[i].bmi>24 && bmiNum[i].bmi<=27.9){
            bmiLv = '過重';
            color = 'color-o';
       }else if(bmiNum[i].bmi>=28 && bmiNum[i].bmi<30){
            bmiLv = '輕微肥胖';
            color = 'color-bo';
       }else if(bmiNum[i].bmi>=30.1 && bmiNum[i].bmi<35){
            bmiLv = '中度肥胖';
            color = 'color-bbo';
       }else if(bmiNum[i].bmi>=35){
            bmiLv = '重度肥胖';
            color = 'color-r';
       }
       str += `<div class="list">
                <div class="color ${color}"></div>
                <h3 class="lv">${bmiLv}</h3>
                <span class="bmi">BMI &nbsp;</span>
                <h3 class="bminum">${bmiNum[i].bmi}</h3>
                <span class="weight">Weight</span>
                <h3 class-"weightnum">${bmiNum[i].weight}kg</h3>
                <span class="height">height</span>
                <h3 class-"heightnum">${bmiNum[i].height}cm</h3>
                <time datetime="" class="time">${bmiNum[i].day}</time>
                <a href="#" data-num="${i}">刪除</a>
               </div>`;
    }
   list.innerHTML = str;
}

//刪除資料
function listDel(e){
    if(e.target.nodeName !== "A"){return;}
    var num = e.target.dataset.num;
    bmiNum.splice(num, 1);
    localStorage.setItem('bmiNum', JSON.stringify(bmiNum));
    updateList(bmiNum);
}


