window.onload=function(){
   
    // 定义全局变量
    index = 0;
    result = byId("header").getElementsByTagName("li");
    autoPhoto = byId("section").getElementsByTagName("div");
    len = autoPhoto.length;
    main=byId("main");

    //Dom2级事件，兼容ie浏览器
    function addDom(el, type, hander) {
        if (el.addEventListener) {
            el.addEventListener(type, hander, false);
        } else if (el.attachEvent) {
            el.attachEvent("on" + type, hander);
        } else {
            el["on" + type] = hander;
        }
    }

    //利用三元运算符封装绑定
    function byId(id) {
        return typeof (id) === "string" ? document.getElementById(id) : id;
    }

    //自动轮播图片
    function autoPlay() {
        autoBanner = setInterval(function () {
            index++
            if (index >= len) index = 0;
            changeImg()
        }, 1000)
    }

    //停止轮播
    function stopPlay() {
        if (autoBanner) {
            clearInterval(autoBanner);
        }
    }

    //切换图片函数
    function changeImg() {
        for (var x = 0; x < len; x++) {
            autoPhoto[x].style.display = "none";
            result[x].className = "old";
        }
        //当前图片
        autoPhoto[index].style.display = "block";
        //当前导航栏
        result[index].className = "new";
    }
    //手动切换
    for (var y = 0; y < len; y++) {
        result[y].setAttribute("new-data", y);
        addDom(result[y], "click", function () {
            index = this.getAttribute("new-data");
            changeImg();
        })
    }

    //mouseover停止轮播
    addDom(main,"mouseover",stopPlay);
    //mouseout开始轮播
    addDom(main,"mouseout",autoPlay)
autoPlay();
}

