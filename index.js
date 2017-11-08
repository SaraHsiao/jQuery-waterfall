
$(document).ready(function($){
    // 獲取容器和盒子
    var wrap=$('#wrap');
    var boxes=$('#wrap').children('div');
    // 加載盒子
    waterfall(wrap,boxes);
    // 滾動事件
    $(this).scroll(function(event) {
        appendBox(wrap);
    })
})

// 設置追加盒子的樣式
var getStartNumber=0;
var setStyle=function(box,top,left,index) {
    if (getStartNumber>=index) {
        return false;
    }
    box.css({
        'position':'absolute',
        'top':top,
        'left':left,
        'opacity':'0'
    }).stop().animate({
        'opacity':'1'
    },1000)
    getStartNumber=index;
}

// 數據請求檢驗
var getCheck=function(wrap) {
    // 獲取文檔視窗的高度
    var documentHeight=$(window).height();
    // 獲取文檔向上滾動的高度
    var scrollHeight=$(window).scrollTop();
    // 獲取最後一個盒子所在列的總高度
    var boxes=wrap.children('div')
    var lastBoxTop=boxes.eq(boxes.length-1).offset().top;
    var lastBoxHeight=boxes.eq(boxes.length-1).height()+20;
    var lastColHeight=lastBoxTop+lastBoxHeight;
    return documentHeight+scrollHeight >= lastColHeight ? true : false;
}

// 追加盒子函數
// 不需要重新加載原本已經被加載過的盒子了
var appendBox=function(wrap) {
    if (getCheck(wrap)) {
        for(i in data) {
            var innerString='<div><img src="'+ data[i].src +'"><a href="http://www.github.com/SaraHsiao" target="_blank">' + data[i].title + '</a></div>'
            wrap.append(innerString);
        }
    } else {
        return false;
    }
    waterfall(wrap,wrap.children('div'));
}

var waterfall=function(wrap,boxes) {
    // 獲取屏幕可以顯示的列數
    var boxWidth=boxes.eq(0).width()+40;
    var windowWidth=$(window).width();
    var colsNumber=Math.floor(windowWidth/boxWidth);

    // 設置容器的寬度
    wrap.width(boxWidth*colsNumber);

    // 定義一個數組並儲存每一列的高度
    var rowHeight=new Array(); // 定義一個數據儲存每一列的高度
    for (i=0; i<boxes.length;i++){
        if (i<colsNumber){
            rowHeight[i]=boxes.eq(i).height()+40;
        } else {
            // 獲取最小列的高度
            var minHeight=Math.min.apply(null,rowHeight);
            // 獲取最小列的索引
            var minIndex=getIndex(minHeight,rowHeight);
            var leftValue=boxes.eq(minIndex).position().left;
            setStyle(boxes.eq(i),minHeight,leftValue,i);
            // boxes.eq(i).css({
            //     'position':'absolute',
            //     'top':minHeight,
            //     'left':leftValue,
            //     'opacity':'0'
            // }).stop().animate ({
            //     'opacity':'1'
            // }, 1000)
            // 更新最小列的高度
            rowHeight[minIndex]+=boxes.eq(i).height()+40;
        }
    }
}
// 獲取最小列的索引
function getIndex (minHeight,rowHeight) {
    for (index in rowHeight) {
        if (rowHeight[index] === minHeight){
            return index;
        }
    }
}

// 模擬數據Json，只能使用 " " 
// 獲取 Json 數組的方法：
// data[0].src -> "../jQuery-waterfall/pics/1.JPG"
// data[0].title -> "第1張"
var data=[{
    "src":"../jQuery-waterfall/pics/1.JPG",
    "title":"第1張"
},{
    "src":"../jQuery-waterfall/pics/2.JPG",
    "title":"第2張"
},{
    "src":"../jQuery-waterfall/pics/3.JPG",
    "title":"第3張"
},{
    "src":"../jQuery-waterfall/pics/4.JPG",
    "title":"第4張"
},{
    "src":"../jQuery-waterfall/pics/5.JPG",
    "title":"第5張"
},{
    "src":"../jQuery-waterfall/pics/6.JPG",
    "title":"第6張"
},{
    "src":"../jQuery-waterfall/pics/7.JPG",
    "title":"第7張"
},{
    "src":"../jQuery-waterfall/pics/8.JPG",
    "title":"第8張"
},{
    "src":"../jQuery-waterfall/pics/9.JPG",
    "title":"第9張"
},{
    "src":"../jQuery-waterfall/pics/10.JPG",
    "title":"第10張"
},{
    "src":"../jQuery-waterfall/pics/11.JPG",
    "title":"第11張"
},{
    "src":"../jQuery-waterfall/pics/12.JPG",
    "title":"第12張"
},{
    "src":"../jQuery-waterfall/pics/13.JPG",
    "title":"第13張"
},{
    "src":"../jQuery-waterfall/pics/14.JPG",
    "title":"第14張"
},{
    "src":"../jQuery-waterfall/pics/15.JPG",
    "title":"第15張"
}]