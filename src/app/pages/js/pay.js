var pay = {
    init: function(){
        this.initData();
        this.initEvent();
    },
    initData: function(){

        var obj,self = this;
        var searchObj = Okay.util.searchUrl(location.search);
        self.orderId = searchObj.orderId;
        self.token = Okay.util.getCookie('mall_token');
        if(!self.token){
            window.location.href = 'login.html';
            return;
        }

        if(Okay.util.isInWeixin()){
            $('.weChat').show();
        }else{
            $('.aliPay').show();
        }

        Okay.Ajax('post','/index.php?m=OkayMall&c=mobileOrders&a=orderInfo',{'mall_token': self.token,orderId: searchObj.orderId}).done(function(data){
            obj = data.data;
            if(obj.needPay == 0.00) {
                Okay.popUp('订单已经支付或者需要支付订单为0',{callback:function(){
                     window.location.href = 'order.html';
                }});
                return ;
            }
            self.orderNo = obj.orderNo;
            $('#total-price').html( obj.totalMoney);
            $('#address').html(createAddress(obj));
        });


        function createAddress(obj){
            var str = '';
            str += '<div class="deliver"><span class="desc">订单号：</span><span>' + obj.orderNo + '</span></div>';
            str += '<div class="user deliver"><span class="desc">收货人：</span><span>' + obj.userName + ' ' + obj.userPhone + '</span></div>';
            str += '<div class="address">' + obj.city + '</div><div class="address">' + obj.street + '</div>';
            if(obj.email){
                str += '<div class="mail">' + obj.email + '</div>';
            }
            str += '<div class="deliver"><span class="desc">配送：</span><span>送货上门</span></div>';
            if(obj.remarks){
                str += '<div class="deliver"><span class="desc">备注：</span><span class="remarks">' + obj.remarks + '</span></div>'
            }
            return str;

        }

    },
    initEvent: function(){
        var timer,self = this;
        $('.back').on('tap',function(){
            window.history.back();
        });
        var  orderId = GetQueryString("orderId");

        $('.aliPay').on('tap',function(){
            clearTimeout(timer);
            // $('#test').empty().off();

            $.ajax({
                type : "POST",
                url : Okay.util.URL + "/index.php?m=OkayMall&c=MobilePayment&a=toPay",
                data: {'mall_token': self.token, 'key': orderId + '@' + '1'},
            }).done(function(data){
                if(/200$/.test(data.status)){
                    // $('#test').append(data.data);
                    window.location.href = data.data;
                }else{
                    Okay.popUp(data.msg);
                }
            }).fail(function(xhr,error){
                var tip = "parsererror" == error ? "数据返回格式错误 " : "网络异常";
                Okay.popUp(tip);
            });
        });

        $('.weChat').on('tap',function(){
            window.location.href = Okay.util.URL + "/index.php?m=OkayMall&c=Wechat&a=toPay&mall_token=" + self.token + "&key=" + orderId + '@' + '1' + "&returnUrl="+ encodeURIComponent(location.href);
        });


        $('.bank').on('tap',function(ev){
            window.location.href='pay-status.html?payFrom=3&orderNo=' + self.orderNo + '&orderId=' + self.orderId;
        });

        $('.aliPayApp').on('tap',function(){
            var user;
            if(window.okay){
                if (Okay.util.isIOS()) {
                    user = userInfo;
                } else {
                    user = okay.getJsonData();
                }

                $.ajax({
                    type : "POST",
                    url : Okay.util.URL + "/index.php?m=OkayMall&c=ALiApp&a=getOrderInfo",
                    data: {'key': orderId, 'token': user.token,'systemId': user.uid},
                }).done(function(data){
                    if(/200$/.test(data.status)){
                        $('#test').append(data.data);
                    }else{
                        Okay.popUp(data.msg);

                    }
                }).fail(function(xhr,error){
                    var tip = "parsererror" == error ? "数据返回格式错误 " : "网络异常";
                    Okay.popUp(tip);
                });
            }

        });

        $('.aliPayApp2').on('tap',function(){
            if(window.okay){
                if (Okay.util.isIOS()) {
                    user = userInfo;
                } else {
                    user = okay.getJsonData();
                }

                $.ajax({
                    type : "POST",
                    url : Okay.util.URL + "/index.php?m=OkayMall&c=ALiApp&a=toPay",
                    data: {'key': orderId, 'token': user.token,'systemId': user.uid},
                }).done(function(data){
                    if(/200$/.test(data.status)){
                        $('#test').append(data.data);
                    }else{
                        Okay.popUp(data.msg);

                    }
                }).fail(function(xhr,error){
                    var tip = "parsererror" == error ? "数据返回格式错误 " : "网络异常";
                    Okay.popUp(tip);
                });


            }


        });

        function GetQueryString(name)
        {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        }

    }

}
