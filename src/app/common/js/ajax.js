(function(okay){

    function Ajax(type,url,data,isLoading,isManual){
        if(typeof isLoading == 'undefined' || isLoading){
            $('.loading-overlay').show();
        }
        return $.ajax({
            type : type,
            url : Okay.util.URL + url,
            data: data,
        }).then(function(data){
            $('.loading-overlay').hide();
            if(/200$/.test(data.status)){
                return data;
            }else if(/35201$/.test(data.status)){
                Okay.util.delCookie('mall_token');
                window.location.href = 'login.html';
                return $.Deferred().reject(data);
            }else{
                if(!isManual){
                    Okay.popUp(data.msg);
                }
                return $.Deferred().reject(data);
            }
        },function(xhr,error){
            var tip = "parsererror" == error ? "数据返回格式错误 " : "网络异常";
            $('.loading-overlay').hide();
            if(!isManual){
                Okay.popUp(tip);
            }else{
                return $.Deferred().reject(error);
            }
        });

    }

    window.Okay = okay || {};
    window.Okay.Ajax = Ajax;
})(window.Okay);
