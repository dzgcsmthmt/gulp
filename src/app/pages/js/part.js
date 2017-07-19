var part = {
    upperLimit: 100,
    scrollElem: $('#to-top'),
    init: function(){
        this.checkLogin();
        this.initEvent();
    },
    checkLogin: function(){
        var user;
        var self = this;
        if (Okay.util.isInApp()) {
            if (Okay.util.isIOS()) {
                this.user = window.resultIos;
                sessionStorage.setItem('isInIOSApp', true);
                sessionStorage.setItem('IOSToken', this.user.token);
                sessionStorage.setItem('IOSUid', this.user.uid);
            } else {
                user = okay.getJsonData();
                this.user = JSON.parse(user);
            }
            $.ajax({
                type : "post",
                url : Okay.util.URL + "/index.php?c=MobileUsers&a=login",
                data: {token:this.user.token,systemId: this.user.uid}
            }).done(function(data){
                if(/200$/.test(data.status)){
                    localStorage.setItem('phone',data.phone);
                    self.isLogin = true;
                    self.token = data.mall_token;
                    Okay.util.setCookie('mall_token',data.mall_token,24);
                }else{
                    Okay.popUp(data.msg);
                }
                self.loadData();
            }).fail(function(xhr,error){
                var tip = "parsererror" == error ? "数据返回格式错误" : "网络异常";
                Okay.popUp(tip);
            });
        }else{
            $('.app-download').removeClass('dn');
            this.token = Okay.util.getCookie('mall_token');
            this.loadData();
        }
    },
    loadData: function(){
        $('#menu').append(Okay.util.createMenuList());
        var self = this;
        Okay.Ajax('post','/index.php?m=OkayMall&c=mobileGoods&a=getGoods',{mall_token: self.token}).done(function(data){
            $('footer').removeClass('fixed');
            $('.part-list').html(createLi(data.data));
            if(self.token){
                if(data.goodsSum == 0){
                    $('.num').hide().parent().show();
                }else{
                    $('.num').html(data.goodsSum > 99 ? '99+' : data.goodsSum).parent().show();
                }
            }
        });

        function createLi(data){
            var str = '';
            data = data.root;
            for (var i = 0,len = data.length; i < len; i++) {
                var oLi = data[i];
                str += '<li><a href="' + 'product.html?goodsId=' + oLi.goodsId + '">';
                str += '<div class="img"><img src="' + oLi.goodsThums + '" /></div>';
                str += '<div class="info"><div class="desc">' + oLi.goodsName + '</div><div class="price">￥' + oLi.shopPrice + '</div></div>';
            }
            str += '</a></li><li class="vl"></li>';
            return str;
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

        this.scrollElem.on('tapend',function(ev){
            ev.preventDefault();
            $('html,body').scrollTop(0);
            self.scrollElem.addClass('dn');
        });

        $('#theme').on('tap',function(ev){
            ev.preventDefault();
            $('#menu').show();
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
            if(self.token){
                window.location.href = 'user.html?returnURL=index.html';
            }else{
                window.location.href = 'login.html?returnURL=index.html';
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
