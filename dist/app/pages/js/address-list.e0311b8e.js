var addressList={init:function(){this.initData(),this.initEvent()},initData:function(){function a(a){for(var d,i="",e=0,t=a.length;e<t;e++)d=a[e],i+="<li>",s==d.addressId&&(i+='<div class="checkbox"><i class="icon icon-checkbox"></i></div>'),i+='<div class="desc" data-id='+d.addressId+'><div class="'+(s==d.addressId?"active":"")+' em"><span>'+d.userName+'</span><span class="phone">'+d.userPhone+"</span>"+(1==d.isDefault?'<span class="btn btn-sm">默认地址</span>':"")+"</div>",i+='<div class="address"><div>'+d.areaName1+d.areaName2+d.areaName3+'</div><div class="text-ellipsis">'+d.address+"</div></div>",d.email&&(i+='<div class="mail">'+d.email+"</div>"),i+='</div><div class="operate"><a href="address.html?addressId='+d.addressId+'"><i class="icon icon-edit"></i></a><a href="javascript:;"><i class="icon icon-del" data-id="'+d.addressId+'"></i></a>',i+="</div></li>";return i}var d=this,s=Okay.util.searchUrl(location.search).addressId;d.token=Okay.util.getCookie("mall_token"),d.token?Okay.Ajax("post","/index.php?c=MobileAddress&a=getAddress",{mall_token:d.token}).done(function(s){d.data=s.data,$(".address-list").html(a(s.data)),d.data.length||$(".address-list").addClass("dn").next().removeClass("dn")}):window.location.href="login.html"},initEvent:function(){var a=this;$(".back").on("tap",function(){window.history.back()}),$("#footer").on("tap",function(){a.data&&a.data.length>=10?Okay.popUp("收货人信息最多保存10条"):window.location.href="address.html"}),$(".address-list").on("tap",".desc",function(){window.location.href="order-info.html?addressId="+$(this).data("id")}).on("tap",".icon-del",function(){var d=$(this);Okay.Dialog.confirm({content:"<p>您确定要要删除此地址吗？</p>",text:["取消","确定"],hlCancel:!0,onaccept:function(){Okay.Ajax("post","/index.php?m=OkayMall&c=MobileAddress&a=del",{mall_token:a.token,id:d.data("id")}).done(function(s){var i=d.data("id");d.parents("li").remove(),a.data.splice(Okay.util.findWhere(a.data,{id:i}),1),a.data.length||$(".address-list").addClass("dn").next().removeClass("dn")})}})})}};