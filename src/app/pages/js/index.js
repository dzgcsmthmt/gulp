var index = {
    upperLimit: 100,
    scrollElem: $('#to-top'),
    isLogin: false,
    user: null,
    isShareOpen: false,
    init: function(){
        this.checkLogin();
        this.initSwipe();
        this.initEvent();
    },
    checkLogin: function(){
        var user;
        var self = this;
        if (Okay.util.isInApp()) {
            if (Okay.util.isIOS()) {
                this.user = window.resultIos;
                this.isLogin = true;
            } else {
                user = okay.getJsonData();
                this.user = JSON.parse(user);
                this.isLogin = true;
            }
            $.ajax({
                type : "post",
                url : Okay.util.URL + "/index.php?c=MobileUsers&a=login",
                data: {token:this.user.token,systemId: this.user.uid}
            }).done(function(data){
                if(/200$/.test(data.status)){
                    self.token = data.mall_token;
                    Okay.util.setCookie('mall_token',data.mall_token,24);
                    getCartNum();
                }else{
                    Okay.popUp(error);
                }
            }).fail(function(xhr,error){
                var tip = "parsererror" == error ? "数据返回格式错误" : "网络异常";
                Okay.popUp(tip);
            });
        }else{
            $('.app-download').removeClass('dn');
            if(self.token = Okay.util.getCookie('mall_token')){
                this.isLogin = true;
                getCartNum();
            }else{
                this.isLogin = false;
            }
        }
        $('#menu').append(Okay.util.createMenuList());
        function getCartNum(){
            Okay.Ajax('post','/index.php?m=OkayMall&c=mobileCart&a=getGoodsSum',{'mall_token':self.token},false).done(function(data){
                if(data.goodsSum == 0){
                    $('.num').hide().parent().show();
                }else{
                    $('.num').html(data.goodsSum > 99 ? '99+' : data.goodsSum).parent().show();
                }
            });
        }

    },
    initSwipe: function(){
        var len,str = '<div class="swipe-banner">';
        var swipe = new Swipe(document.getElementById('slider'), {
              speed: 500,
              auto: 4000,
              callback: function(index, elem) {
                  $('.swipe-circle').eq(swipe.getPos()).addClass('active').siblings().removeClass('active');
              },
              transitionEnd: function(index, elem) {}
        });
        len = $('#slider .swipe-wrap').children().length;
        for (var i = 0; i < len; i++) {
            str += '<span class="swipe-circle ' + (i == 0 ? 'active' : '') + '"></span>';
        }
        str += '</div>';

        $('#slider').append(str);
    },
    initEvent: function(){
        var self = this;
        var scrollHandler = Okay.util.debounce(function() {
            var scrollTop = $(document).scrollTop();
            if ( scrollTop > self.upperLimit ) {
                self.scrollElem.removeClass('dn');
            }else{
                self.scrollElem.addClass('dn');
            }
        }, 150);

        $(window).on('scroll',scrollHandler);

        this.scrollElem.on('tap',function(){
            $('html, body').scrollTop(0);
            self.scrollElem.addClass('dn');
        });

        $('#theme').on('tap',function(ev){
            ev.preventDefault();
            $('#menu').show();
            $('body').addClass('with-menu');
        });

        $('#menu').on('tap','a',function(ev){
            ev.preventDefault();
            $('#menu').hide();
            window.location.href = $(this).data('href');
        });

        $('#close').on('tap',function(ev){
            ev.preventDefault();
            $('#menu').hide();
        });

        $('#user').on('tap',function(){
            if(self.isLogin){
                window.location.href = 'user.html';
            }else{
                window.location.href = 'login.html';
            }
        });

        $('#share').on('tap',function(){
            if(self.isShareOpen){
                $('.share-box').show();
            }else{
                self.isShareOpen = true;
                $('body').append($('#' + (Okay.util.isInApp() ? 'app' : 'web') + '-share').html());
            }
        });

        $(document).on('tap','.close',function(){
            $('.share-box').hide();
        });

    }

}
