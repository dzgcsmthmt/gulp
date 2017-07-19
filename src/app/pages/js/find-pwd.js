var findPwd = {
    timer: null,
    msg_disabled: false,
    init: function(){
        this.initEvent();
    },
    countDown: function(){
        var count = 60,self = this;
        this.timer = setInterval(function(){
            $('#msg-code').html(--count + 'S');
            if(count == 0){
                self.clearTimer();
            }
        },1000);
    },
    clearTimer: function(){
        clearInterval(this.timer);
        $('#msg-code').html('获取验证码').removeClass('disabled');
        this.msg_disabled = false;
    },
    initEvent: function(){
        var util = Okay.util;
        var self = this;

        $('#submit').on('tap',function(){
            var phone = $('#phone').val();
            var code = $('#code').val();

            if(!util.isPhone(phone)){
                 Okay.popUp('请输入正确的手机号');
                 return;
            }

            if(!util.isMsgCode(code)){
                 Okay.popUp('请输入正确的验证码');
                 return;
            }

            $('.loading-overlay').show();
            $.ajax({
                type : "get",
                url : Okay.util.URL + "/index.php?c=MobileUsers&a=OkayMallFindPassSecond",
                data: {userPhone:phone,verifyCode:code},
                dataType : "jsonp",
                jsonpCallback:"jsonpReturn"
            }).done(function(data){
                $('.loading-overlay').hide();
                if(/200$/.test(data.status)){
                    window.location.href = 'reset-pwd.html' + location.search;
                }else{
                    Okay.popUp(data.msg);
                }
            }).fail(function(xhr,error){
                $('.loading-overlay').hide();
                var tip = "parsererror" == error ? "数据返回格式错误" : "网络异常";
                Okay.popUp(tip);
            });

        });

        $('#msg-code').on('tap',function(){
            var phone = $('#phone').val();
            if(!util.isPhone(phone)){
                 Okay.popUp('请输入正确的手机号');
                 return;
            }

            if(!self.msg_disabled){
                self.msg_disabled = true;
                $(this).html('60S').addClass('disabled');
                self.countDown();
                $.ajax({
                    type : "post",
                    url : Okay.util.URL + "/index.php?c=MobileUsers&a=OkayMallFindPassFirst",
                    data: {verifyTel:phone},
                    dataType : "jsonp",
                    jsonpCallback:"jsonpReturn"
                }).done(function(data){
                    if(!/200$/.test(data.status)){
                        Okay.popUp(data.msg);
                        self.clearTimer();
                    }else{
                        Okay.popUp('验证码已发送');
                    }
                }).fail(function(xhr,error){
                    var tip = "parsererror" == error ? "数据返回格式错误" : "网络异常";
                    Okay.popUp(tip);
                    self.clearTimer();
                });
            }

        });


        $('.back').on('tap',function(){
            window.history.back();
        });

    }
}
