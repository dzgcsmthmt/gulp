var cart={data:[],MAX_QUANTITY:99999,init:function(){this.initData(),this.initEvent()},initData:function(){function e(e){for(var a="",o=0,n=e.length;o<n;o++){var i=e[o];a+="<li data-id="+i.goodsId+'><span class="checkbox"><label ><input type="checkbox" '+(1==i.isCheck?"checked":"")+' data-id="'+i.goodsId+'" /><i class="icon icon-checkbox"></i></label></span>',a+='<span class="img"><img src="'+i.goodsThums+'"></span>',a+='<span class="desc"><span class="text">'+i.goodsName+"</span>",a+='<span class="num-wrapper"><i class="icon icon-minus '+(1==i.goodsNum?"disabled":"")+'"></i>',a+='<input type="tel" class="num" value="'+i.goodsNum+'" data-prev= '+i.goodsNum+' maxlength="5" /><i class="icon icon-plus '+(99999==i.goodsNum?"disabled":"")+'"></i></span></span>',a+='<span class="price"><em>￥'+(t.is_member?i.memberPrice:i.shopPrice)+"</em>",a+='<span class="del-item" data-index="'+i.goodsId+'"><i class="icon icon-del" ></i><span></span></li>'}return a}var a,t=this;t.token=Okay.util.getCookie("mall_token"),t.token?($("#menu").append(Okay.util.createMenuList()),Okay.Ajax("post","/index.php?m=OkayMall&c=mobileCart&a=index",{mall_token:t.token}).done(function(o){t.data=a=o.data,t.goodsIds=Okay.util.pluck(t.data,"goodsId"),t.is_member=1==o.isMember,t.is_member||($("#member").addClass("is-member").removeClass("dn"),$(".bitmap").addClass("is-member")),o.data&&a&&a.length?($(".cart-list").html(e(a)),$("#footer").removeClass("dn"),t.checkSelect()):$("#page-list").addClass("dn").next().removeClass("dn")})):window.location.href="login.html"},deselectAll:function(){$(".cart-list input:checkbox").prop("checked",!1),$("#total-price").html("0.00"),$("#pay").removeClass("active")},deselectFooter:function(){$("#footer input:checkbox").prop("checked",!1),$("#total-price").html("0.00"),$("#pay").removeClass("active")},checkSelect:function(){var e=$('.cart-list input[type="checkbox"]').length,a=$(".cart-list input:checked").length;a?(e==a?$("#footer input:checkbox").prop("checked",!0):$("#footer input:checkbox").prop("checked",!1),$("#pay").addClass("active"),this.calc()):this.deselectFooter()},calc:function(){for(var e=this,a=0,t=$(".cart-list li"),o=0,n=t.length;o<n;o++)t.eq(o).find(":checked").length&&(a+=(e.is_member?e.data[o].memberPrice:e.data[o].shopPrice)*t.eq(o).find(".num").val());$("#total-price").html(a.toFixed(2))},initEvent:function(){function e(e,t,o){Okay.Ajax("post","/index.php?m=OkayMall&c=mobileCart&a=changeGoodsNum",{mall_token:a.token,goodsId:e,num:t}).done(function(e){o()})}var a=this,t=$(".cart-list");$("#theme").on("tap",function(e){$("#menu").show()}),$("#menu").on("tap","a",function(e){e.preventDefault(),$("#menu").hide(),window.location.href=$(this).data("href")}),$("#close").on("tap",function(e){e.preventDefault(),$("#menu").hide()}),t.on("input",".num",function(){var e=$(this).val();e=e.replace(/[^\d]/g,""),$(this).val(e)}).on("blur",".num",function(){var e=$(this),t=$(this).val();0==t||1==t?(t=1,$(this).prev().addClass("disabled").next().next().removeClass("disabled")):t==a.MAX_QUANTITY?$(this).next().addClass("disabled").prev().prev().removeClass("disabled"):$(this).prev().removeClass("disabled").end().next().removeClass("disabled"),$(".loading-overlay").show(),$.ajax({type:"post",url:Okay.util.URL+"/index.php?m=OkayMall&c=mobileCart&a=changeGoodsNum",data:{mall_token:a.token,goodsId:e.parents("li").data("id"),num:t}}).done(function(o){$(".loading-overlay").hide(),/200$/.test(o.status)?($(this).val(t),e.data("prev",t),a.checkSelect()):/35201$/.test(o.status)?(Okay.util.delCookie("mall_token"),window.location.href="login.html"):Okay.popUp(o.msg)}).fail(function(a,t){$(".loading-overlay").hide();var o="parsererror"==t?"数据返回格式错误 ":"网络异常";Okay.popUp(o),e.val(e.data("prev"))})}).on("tap",".icon-plus",function(){if(!$(this).hasClass("disabled")){var t=$(this).prev(),o=t.val();o<a.MAX_QUANTITY&&e($(this).parents("li").data("id"),++o,function(){t.val(o),o==a.MAX_QUANTITY&&$(this).addClass("disabled"),t.prev().removeClass("disabled"),a.checkSelect()})}}).on("tap",".icon-minus",function(){if(!$(this).hasClass("disabled")){var t=$(this).next(),o=t.val();o>1&&(t.next().removeClass("disabled"),e($(this).parents("li").data("id"),--o,function(){t.val(o),1==o&&$(this).addClass("disabled"),a.checkSelect()}))}}).on("tap",".del-item",function(){var e=$(this);Okay.Dialog.confirm({content:"<p>您确定要把该商品</p><p>移出购物车吗?</p>",text:["取消","确定"],hlCancel:!0,onaccept:function(){Okay.Ajax("post","/index.php?m=OkayMall&c=mobileCart&a=del",{mall_token:a.token,goodsId:e.data("index")},!1).done(function(t){var o=e.data("index");e.parent().parent().remove(),a.data.splice(Okay.util.findWhere(a.data,{goodsId:o}),1),a.data.length?a.checkSelect():$("#page-list").addClass("dn").next().removeClass("dn")})}})}).on("change","input:checkbox",function(){var e=$('.cart-list input[type="checkbox"]').length,t=$(".cart-list input:checked").length,o=$(this).is(":checked")?1:-1;Okay.Ajax("post","/index.php?m=OkayMall&c=mobileCart&a=checkGoods",{mall_token:a.token,goodsId:[$(this).data("id")],op:o}).done(function(o){t?(e==t?$("#footer input:checkbox").prop("checked",!0):$("#footer input:checkbox").prop("checked",!1),$("#pay").addClass("active"),a.calc()):a.deselectFooter()})}),$("#member").on("tap",function(){window.location.href="member.html?returnURL=cart.html"}),$("#footer input:checkbox").on("change",function(){$(this).is(":checked")?Okay.Ajax("post","/index.php?m=OkayMall&c=mobileCart&a=checkGoods",{mall_token:a.token,goodsId:a.goodsIds,op:1}).done(function(e){$(".cart-list input:checkbox").prop("checked",!0),$("#pay").addClass("active"),a.calc()}):Okay.Ajax("post","/index.php?m=OkayMall&c=mobileCart&a=checkGoods",{mall_token:a.token,goodsId:a.goodsIds,op:-1}).done(function(e){a.deselectAll()})}),$("#pay").on("tap",function(){var e=[],t=$(".cart-list input:checked").length;if(t){for(var o=0;o<t;o++)e.push($(".cart-list input:checked").eq(o).parents("li").data("id"));Okay.Ajax("post","/index.php?m=OkayMall&c=mobileCart&a=checkCart",{mall_token:a.token,arr:e}).done(function(e){window.location.href="order-info.html"})}}),$("#user").on("tap",function(){a.token?window.location.href="user.html"+location.search+"?returnURL=cart.html":window.location.href="login.html"+location.search+"?returnURL=cart.html"})}};