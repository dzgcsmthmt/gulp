var promotion = {
    upperLimit: 100,
    scrollElem: $('#to-top'),
    user: null,
    init: function(){
        this.checkLogin();
        this.initEvent();
    },
    checkLogin: function(){
        var searchObj = Okay.util.searchUrl(location.search);
        var user;
        var self = this;
        if (Okay.util.isInOkayApp()) {
            $('#subscribe').show();
            if (Okay.util.isIOS()) {
                this.user = window.resultIos;
                if(!this.user){
                    this.user = {
                        token: sessionStorage.getItem('IOSToken'),
                        uid: sessionStorage.getItem('IOSUid')
                    }
                }
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
                    self.token = data.mall_token;
                    Okay.util.setCookie('mall_token',data.mall_token,24);
                }else{
                    Okay.popUp(error);
                }
            }).fail(function(xhr,error){
                var tip = "parsererror" == error ? "数据返回格式错误" : "网络异常";
                Okay.popUp(tip);
            });
        }else{
            $('.back').show();
            $('#download').show();
            // self.token = Okay.util.getCookie('mall_token');
            // if(self.token){
                // $('#subscribe').show();
            // }else{
            // }
        }

        if(searchObj.broadId){
            $.ajax({
                type : "post",
                url : Okay.util.URL + "/index.php?m=OkayMall&c=Count&a=push",
                data: {broadId:searchObj.broadId,broadIdOpenId: searchObj.broadIdOpenId,receiveId:searchObj.receiveId,receiveOpenId:searchObj.receiveOpenId}
            });
        }


    },
    initEvent: function(){
        var self = this;
        // var scrollHandler = Okay.util.debounce(function() {
        //     var scrollTop = $(document).scrollTop();
        //     if ( scrollTop > self.upperLimit ) {
        //         self.scrollElem.removeClass('dn');
        //     }else{
        //         self.scrollElem.addClass('dn');
        //     }
        // }, 150);
        //
        // $(window).on('scroll',scrollHandler);
        //
        // this.scrollElem.on('tap',function(){
        //     $('html, body').scrollTop(0);
        //     self.scrollElem.addClass('dn');
        // });

        $('.back').on('tap',function(){
            window.history.back();
        });


        $('#baoming').on('tap',function(){
            Okay.Ajax('post','/index.php?c=PreOrder&a=add',{mall_token: self.token}).done(function(data){
                Okay.popUp('报名成功');
            });
        });


    }

}
