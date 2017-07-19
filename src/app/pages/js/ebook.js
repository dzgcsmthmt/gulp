var ebook = {
    upperLimit: 100,
    scrollElem: $('#to-top'),
    isLogin: false,
    user: null,
    isShareOpen: false,
    init: function(){
        this.checkLogin();
        this.initEvent();
    },
    checkLogin: function(){
        var user;
        var self = this;
        $('#menu').append(Okay.util.createMenuList());
        if (!(window.okay || sessionStorage.getItem('isInIOSApp'))) {
            $('.app-download').removeClass('dn');
        }
        if(self.token = Okay.util.getCookie('mall_token')){
            this.isLogin = true;
            getCartNum();
        }else{
            this.isLogin = false;
        }

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
