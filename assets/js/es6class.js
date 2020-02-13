//json:
//carousel:
//run:自动轮播
//slide:滑动
//fade:淡化
//speed:轮播速度
class carousel{
    constructor(boxname,json){
        this.box = document.querySelector(boxname);
        this.json = json;
        //获取属性
        this.content = this.box.querySelector(".content");
        this.left = this.box.querySelector(".arrow_left");
        this.right = this.box.querySelector(".arrow_right");
        this.li_point = this.box.querySelector(".ul_point").getElementsByTagName("li");
        this.img = this.content.getElementsByTagName("img");
        //初始化设置
        this.timer = null;//自动轮播定时器

        this.num = 0;//用来计数
        this.init();
    }

    init(){
        //克隆第一张到最后完成无缝轮播
        // let cimg = this.img[0].cloneNode(true);
        // this.content.appendChild(cimg);

        this.content.style.width = this.content.children.length*this.img[0].offsetWidth +"px";

        //自动轮播
        if(this.json.run){
            this.go();
            //鼠标移入移出事件
            this.box.addEventListener(
                "mouseover",
                () =>{clearInterval(this.timer)}
            )
            this.box.addEventListener(
                "mouseout",
                () => {this.go()}
            )
        }

        //圆点点击事件
        for(let i = 0; i < this.li_point.length; i++){
            this.li_point[i].onclick = () =>{
            for(let i=0; i < this.li_point.length; i++){
                this.li_point[i].className = ""
            }
            this.li_point[i].className = "li_point";
            this.num = i;
            this.show();
            }
        }

        //箭头事件
        this.left.onclick = () =>{
            this.goLeft();
        }
        this.right.onclick = () =>{
            this.goRight();
        }
    }
    //圆点
    point(){
        for(let i =0 ;i < this.li_point.length;i++){
        //绑定对应响应
        this.li_point[i].className = "";
        if(this.num == this.img.length){
            this.num = 0;
        }
        if(i == this.num){
            this.li_point[i].className = "li_point";
        }
    }
    }

    //轮播定时器
    go(){
        this.timer = setInterval(()=>{
            this.goRight();
            
        },this.json.speed || 1500)//默认速度1.5s
    }

    //轮播显示方式
    show(){
        //slide滑动
        if(this.json.slide){
            this.content.style.left = -this.num*this.img[0].offsetWidth + "px";
        }

        //fade淡化
        if(this.json.fade){
            this.content.style.transition = "all 0s linear ";
            this.content.style.WebkitTransition = "all 0s linear ";
            this.content.style.left = -this.num*this.img[0].offsetWidth + "px";
            this.content.style.animation = "fade 1s";
            this.content.style.WebkitAnimation = "fade 1s";
            
            this.delay = setTimeout(()=>{
            this.content.style.animation = "";
            this.content.style.WebkitAnimation = "";
            },1000)
            
        }
    }
    
    goRight(){
        this.num++;
        this.num = this.num == this.img.length?0:this.num;
        this.show();
        this.point();
    }

    goLeft(){
        this.num--;
        this.num = this.num == -1?this.img.length-1:this.num;
        this.show();
        this.point();
    }
}

//json:
//carousel:
//run:自动轮播
//slide:滑动
//fade:淡化
//speed:轮播速度

let lunbo =  new carousel(".wrap",{
    run : true,
    fade: true,
})