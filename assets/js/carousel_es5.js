let wrap = document.getElementById('wrap');
let con = document.getElementById("content");
let img = wrap.getElementsByTagName('img');
const img_len = img.length;
let ul_point = document.getElementsByTagName("ul")[0];
let li_point = ul_point.getElementsByTagName("li");
const li_point_len = li_point.length;
let arrow_left = document.getElementsByClassName("arrow_left")[0];
let arrow_right = document.getElementsByClassName("arrow_right")[0];
let num = 0;
//调整wrap的宽度
let con_w = img_len*img[0].offsetWidth +"px";
con.style.width = con_w;

const time = 3000;//设置轮播时间（单位ms）

// 轮播
function next(){
    num++;
    num = num<img_len?num:0;
    fade();//默认轮播方式：show();淡化fade();滑动();
    li_point[num].style.background = "#f40";
}
function last(){
    num--;
    num = num<0?img_len - 1:num;
    fade();//默认轮播方式：show();淡化fade();滑动();
    li_point[num].style.background = "#f40";
}

//轮播方式
    //默认
function show(){
    for(let i=0;i<img_len;i++){
        img[i].style.display = "none";
        li_point[i].style.background = "#ccc";
    }
        //使num位图片和圆点标识显示
    img[num].style.display = "block";
}
    //淡化
function fade(){
    for(let i=0;i<img_len;i++){
        li_point[i].style.background = "#ccc";
    }
    li_point[num].style.background = "#f40";
        con.style.transition = "all 0s linear ";
        con.style.WebkitTransition = "all 0s linear ";
        con.style.left = -num*img[0].offsetWidth + "px";
        con.style.animation = "fade 1s";
        con.style.WebkitAnimation = "fade 1s";
        
        let delay = setTimeout(()=>{
        con.style.animation = "";
        con.style.WebkitAnimation = "";
        },1000)
}
    //滑动测试
function slide(){
    for(let i=0;i<img_len;i++){
        li_point[i].style.background = "#ccc";
    }
    con.style.left = - num*img[0].offsetWidth +"px";
}

//定时器
var timer = setInterval("next()",time);
// 鼠标事件
wrap.onmouseover = function(){
    clearInterval(timer);
}
wrap.onmouseleave = function(){
    timer = setInterval("next()",time);
}

//箭头事件
arrow_left.onclick = function(){
    last();
}
arrow_right.onclick = function(){
    next();
}

//圆点事件
for(let i=0;i<li_point_len;i++){
    li_point[i].index=i;
    li_point[i].onclick = function(){
        for(let i=0;i<img_len;i++){
            li_point[i].style.background = "#ccc";
        }
        num = this.index;
        fade();
    }
}





