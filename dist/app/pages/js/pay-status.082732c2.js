var payStatus={init:function(){this.initData(),this.initEvent()},initData:function(){var i="",a=this,t=Okay.util.searchUrl(location.search);a.orderNo=t.orderNo,a.payFrom=t.payFrom,a.orderId=t.orderId,a.isPay=t.isPay,a.token=Okay.util.getCookie("mall_token"),a.token?3==a.payFrom?(i+='<div class="img-wrapper"><div class="circle visa shadow"><img src="pages/img/bank.c909a676.png"></div></div>',i+='<div class="status p">银行汇款</div>',i+='<div class="order p">您的订单号：'+a.orderNo+"</div>",i+='<div class="bank"><p>开户银行：交通银行北京阜外支行</p><p>银行账号：1100 6023 9018 8000 23363</p><p>公司名称：北京点石经纬科技有限公司</p></div>',i+='<div class="btn-wrapper"><button class="btn btn-primary btn-full">查看我的订单</button></div>',i+='<div class="tip"><p>请在汇款时写清您的订单号，手机号，姓名</p><p>您还可以在我的订单、汇款信息中再次查看这些信息</p></div>',$("#status").html(i)):(a.callback=1,0==a.isPay?(i+='<div class="img-wrapper"><div class="circle loading shadow"><img src="common/img/loading.8a851423.gif"></div></div>',i+='<div class="status p">等待付款</div>',i+='<div class="order p">订单号：'+a.orderNo+"</div>",i+='<div class="btn-wrapper"><a class="btn btn-primary btn-full" href="order.html">查看我的订单</a></div>',i+='<div class="tip"><p>您还没有支付成功</p><p>您还可以在我的订单中继续支付</p></div>',$("#status").html(i)):1==a.isPay&&(i+='<div class="img-wrapper"><div class="circle"><img src="pages/img/done.88636576.png"></div></div>',i+='<div class="status p">支付成功</div>',i+='<div class="order p">订单号：'+a.orderNo+"</div>",i+='<div class="btn-wrapper"><a class="btn btn-primary btn-full" href="order.html">查看我的订单</a></div>',i+='<div class="tip"><p>如有任何问题</p><p>请咨询小云或者电话</p><p><a href="tel:400-996-0175">400-996-0175</a></p></div>',$("#status").html(i))):window.location.href="login.html"},initEvent:function(){var i=this;$("#done").on("tap",function(){i.callback?window.location.href="/order.html":Okay.Ajax("post","/index.php?m=OkayMall&c=mobileOrders&a=setPay",{orderId:i.orderId,payFrom:3,mall_token:i.token}).done(function(i){window.location.href="/order.html"})}),$("#status").on("tap","button.btn",function(){Okay.Ajax("post","/index.php?m=OkayMall&c=mobileOrders&a=setPay",{orderId:i.orderId,payFrom:3,mall_token:i.token}).done(function(i){window.location.href="/order.html"})})}};