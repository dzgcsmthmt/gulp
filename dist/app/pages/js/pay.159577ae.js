var pay={init:function(){this.initData(),this.initEvent()},initData:function(){function a(a){var e="";return e+='<div class="deliver"><span class="desc">订单号：</span><span>'+a.orderNo+"</span></div>",e+='<div class="user deliver"><span class="desc">收货人：</span><span>'+a.userName+" "+a.userPhone+"</span></div>",e+='<div class="address">'+a.city+'</div><div class="address">'+a.street+"</div>",a.email&&(e+='<div class="mail">'+a.email+"</div>"),e+='<div class="deliver"><span class="desc">配送：</span><span>送货上门</span></div>',a.remarks&&(e+='<div class="deliver"><span class="desc">备注：</span><span class="remarks">'+a.remarks+"</span></div>"),e}var e,n=this,t=Okay.util.searchUrl(location.search);n.orderId=t.orderId,n.token=Okay.util.getCookie("mall_token"),n.token?(Okay.util.isInWeixin()?$(".weChat").show():$(".aliPay").show(),Okay.Ajax("post","/index.php?m=OkayMall&c=mobileOrders&a=orderInfo",{mall_token:n.token,orderId:t.orderId}).done(function(t){0!=(e=t.data).needPay?(n.orderNo=e.orderNo,$("#total-price").html(e.totalMoney),$("#address").html(a(e))):Okay.popUp("订单已经支付或者需要支付订单为0",{callback:function(){window.location.href="order.html"}})})):window.location.href="login.html"},initEvent:function(){var a=this;$(".back").on("tap",function(){window.history.back()});var e=function(a){var e=new RegExp("(^|&)"+a+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(e);return null!=n?unescape(n[2]):null}("orderId");$(".aliPay").on("tap",function(){clearTimeout(void 0),$.ajax({type:"POST",url:Okay.util.URL+"/index.php?m=OkayMall&c=MobilePayment&a=toPay",data:{mall_token:a.token,key:e+"@1"}}).done(function(a){/200$/.test(a.status)?window.location.href=a.data:Okay.popUp(a.msg)}).fail(function(a,e){var n="parsererror"==e?"数据返回格式错误 ":"网络异常";Okay.popUp(n)})}),$(".weChat").on("tap",function(){window.location.href=Okay.util.URL+"/index.php?m=OkayMall&c=Wechat&a=toPay&mall_token="+a.token+"&key="+e+"@1&returnUrl="+encodeURIComponent(location.href)}),$(".bank").on("tap",function(e){window.location.href="pay-status.html?payFrom=3&orderNo="+a.orderNo+"&orderId="+a.orderId}),$(".aliPayApp").on("tap",function(){var a;window.okay&&(a=Okay.util.isIOS()?userInfo:okay.getJsonData(),$.ajax({type:"POST",url:Okay.util.URL+"/index.php?m=OkayMall&c=ALiApp&a=getOrderInfo",data:{key:e,token:a.token,systemId:a.uid}}).done(function(a){/200$/.test(a.status)?$("#test").append(a.data):Okay.popUp(a.msg)}).fail(function(a,e){var n="parsererror"==e?"数据返回格式错误 ":"网络异常";Okay.popUp(n)}))}),$(".aliPayApp2").on("tap",function(){window.okay&&(Okay.util.isIOS()?user=userInfo:user=okay.getJsonData(),$.ajax({type:"POST",url:Okay.util.URL+"/index.php?m=OkayMall&c=ALiApp&a=toPay",data:{key:e,token:user.token,systemId:user.uid}}).done(function(a){/200$/.test(a.status)?$("#test").append(a.data):Okay.popUp(a.msg)}).fail(function(a,e){var n="parsererror"==e?"数据返回格式错误 ":"网络异常";Okay.popUp(n)}))})}};