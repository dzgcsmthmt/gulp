var t,talkboxHtml;
var WIDTH = 70;
var HEIGHT = 50;
var TEHME_WIDTH = 810;
var TEHME_HEIGHT = 90;

if(typeof TimelineMax != 'undefined'){
    t = new TimelineMax();
    createRects(true);
    talkboxHtml = $('#talkbox').html();
    $('#talkbox').html('<div id="inner">' + talkboxHtml + '</div>');
    $('#yun').animate({left: '-=450px'},500,"swing",function(){

        updown();
        moveIERects();

        setTimeout(function(){
            moveTops();
        },500);

        function updown(){
            $('#yun').animate({top: '-=20px'}, 2000,"swing",function(){
                $('#yun').animate({top: '+=20px'}, 2000,"swing",function(){
                    updown();
                });
            });
        }

        t.to('#inner',0.35,{
            left: 0,
            ease: Linear.easeOut,
            onComplete:function(){
                t.to('#inner p',0.15,{
                    autoAlpha: 1,
                    ease: Linear.easeIn
                });
            }
        },3.65);

    });


    //处理ie8点击后的虚线框
    $('a').on('click',function(){
        $(this).blur();
    })

}else{
    createRects();

    $('#wrapper').iosParallax({
        movementFactor: 50,
    });

    $('#yun').one('animationend webkitAnimationEnd oAnimationEnd',function () {
        $('#yun1').hide();
        $(this).css({left:'130px',opacity: 1}).addClass('up-down');
        $('#move').addClass('motion');
        setTimeout(function(){
            moveTops();
        },500);
    });

}



function createRects(isIE){
    var oRect = $('#rects');
    var oMain = $('#main');
    var w = oRect.width();
    var h = oRect.height();
    var count,loc,points = [];
    var ml = (w - 1180) / 2;
    if(w >= 1440){
        count = 45;
    }else{
        count = 25;
    }

    for (var i = 0; i < count; i++) {
        loc = createPoint();
        while(collision(loc.x,loc.y)){
            loc = createPoint();
        }
        points.push(loc);
        $('<div class="rect"></div>').css({top: loc.y,left: loc.x}).appendTo(oRect);
    }

    for (var i = 0, len = Math.min(5,themes.length); i < len; i++) {
        loc = createPoint(true);
        while(collision(loc.x + ml,loc.y)){
            loc = createPoint(true);
        }
        points.push(loc);
        $('<a class="top" id="top' + (i + 1) + '" target="_blank" href="' + themes[i].href + '"></a>').css({top: loc.y,left: loc.x}).appendTo(oMain);
        loc.x = loc.x + ml;
    }

    if(isIE){
        moveIERects();
    }else{
        moveRects();
    }

    function createPoint(isTop){
        var minL = 50;
        var maxL = isTop ? (1160 - WIDTH) : (w - minL - WIDTH);
        var minT = 50;
        var maxT = h - minT -HEIGHT;
        var x = minL + Math.ceil((maxL - minL) * Math.random());
        if(isTop){
            minT = 260;
        }
        var y = minT + Math.ceil((maxT - minT) * Math.random());
        return {x: x,y: y};
    }

    function collision(x,y){
        if(!points.length){
            return false;
        }
        for (var i = 0,len = points.length; i < len; i++) {
            var t1 = y;
            var l1 = x;
            var r1 = l1 + WIDTH;
            var b1 = t1 + HEIGHT;

            var t2 = points[i].y;
            var l2 = points[i].x;
            var r2 = l2 + WIDTH;
            var b2 = t2 + HEIGHT;

            if(!(b1<t2 || l1>r2 || t1>b2 || r1<l2)){
                return true;
            }
        }
        return false;
    }

}

function moveRects(){
    var oRects = $('#rects').find('.rect').filter(":not(.top)");
    var str,degree,distance = 50;
    setTimeout(function(){
        for (var i = 0,len = oRects.length; i < len; i++) {
            degree = Math.floor(360 * Math.random());
            str = ('translate3d(' + Math.round(distance * Math.sin(degree * Math.PI / 180))+ 'px,' +  Math.round(distance * Math.cos(degree * Math.PI / 180)) + 'px,0)');
            oRects.eq(i).css({transform: str,opacity: 0});
        }
    },50);
}

function moveIERects(){
    var oRects = $('#rects').find('.rect').filter(":not(.top)");
    var degree,distance = 50;
    for (var i = 0,len = oRects.length; i < oRects.length; i++) {
        degree = Math.floor(360 * Math.random());
        oRects.eq(i).animate({top: '+=' + Math.round(distance * Math.sin(degree * Math.PI / 180)),left: '+=' +  Math.round(distance * Math.cos(degree * Math.PI / 180))},2000,function(){
            $(this).hide();
        });
    }
}

function moveTops(){
    var oRect = $('#rects');
    var oMain = $('#main');
    var count = 0;
    $('.top').addClass('hl');
    setTimeout(function(){
        for (var i = 1, len = Math.min(5,themes.length); i <= len; i++) {
            (function(i){
                setTimeout(function(){
                    var j = i;
                    $('#top' + i).animate({width:105,height:70,top: 255 + (i - 1) * TEHME_HEIGHT,left: 310 - (i - 1) * 30},800,function(){
                        $(this).css({'z-index':5,height:TEHME_HEIGHT});
                        $(this).addClass('top-item clearfix center').removeClass('top').html(createHtml(j,true)).find('.img-hover').addClass('panel-hover hl').end().animate({width:TEHME_WIDTH},350,function(){
                            $(this).find('.img-hover').removeClass('hl')
                            $(this).find('span').css('opacity',1).end().find('.img').addClass('panel');
                            if(++count == len){
                                moveOthers(count);
                            }
                        });
                    });
                },i * 300);
            })(i);
        }
    },500);

}

function moveOthers(count){
    var oRect = $('#rects');
    var oMain = $('#main');
    var h = oRect.height(),len = themes.length;
    var otherCounts = len - count;
    h += otherCounts * TEHME_HEIGHT;
    oRect.height(h);
    for (var i = count; i < len; i++) {
        $('<a class="top-item clearfix center show other-theme" target="_blank" href="' + themes[i].href + '"></a>').html(createHtml(i+1)).css({top: 255 + (len + 1) * TEHME_HEIGHT,left: 310 - i * 30,'z-index': 5}).appendTo(oMain);
    }

    for (var i = 0; i < otherCounts; i++) {
        (function(i){
            setTimeout(function(){
                $('.other-theme').eq(i).animate({top: 615 + (i + 1) * TEHME_HEIGHT,opacity: 1},1000);
            },i * 200);
        })(i);
    }

    setTimeout(function(){
        $('#footer').show();
    },otherCounts * 200 + 1000);

}


function createHtml(index,isTop){
    var str = "";
    if(isTop){
        str += '<img src="/themes/okayofficeweb/Public/assets/img/panel3.png" alt="" class="img"><img src="/themes/okayofficeweb/Public/assets/img/panel3_hover.png" alt="" class="img-hover">';
    }else{
        str += '<img src="/themes/okayofficeweb/Public/assets/img/panel3.png" alt="" class="img panel"><img src="/themes/okayofficeweb/Public/assets/img/panel3_hover.png" alt="" class="img-hover panel-hover">';
    }
    if(isTop){
        str += '<span class="percent-value fl ml-55">' + themes[index - 1]['percent'] + '</span><span class="percent fl">%</span>';
        str += '<span class="concern-role fl ml-5 mr-5"><span>的'+themeName +'</span><span>关注</span></span>';
    }else{
        str += '<span class="fl ml-55 center hl">其他热门关注</span>';
    }
    str += '<span class="concern-content fl ml-65">' + themes[index - 1]['theme'] + '</span>';
    str += '<i class="icon arrow"></i>';
    return str;
}

$('.wgt-customer-service .function-feedback').on('click', function(e) {
    e.preventDefault();
    window.easemobim.bind({
        hide: true,
        tenantId: 2782,
        autoConnect: true,
        to: "kefuchannelimid_889489",
        appKey: "1157161207178432#kefuchannelapp2782",
        visitor: {
            trueName: 'OKAY官网',
            userNickname: 'OKAY官网'
        }
    })
});
