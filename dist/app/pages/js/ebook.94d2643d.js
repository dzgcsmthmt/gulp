var ebook={upperLimit:100,scrollElem:$("#to-top"),isLogin:!1,user:null,isShareOpen:!1,init:function(){this.checkLogin(),this.initEvent()},checkLogin:function(){var o=this;$("#menu").append(Okay.util.createMenuList()),window.okay||sessionStorage.getItem("isInIOSApp")||$(".app-download").removeClass("dn"),(o.token=Okay.util.getCookie("mall_token"))?(this.isLogin=!0,Okay.Ajax("post","/index.php?m=OkayMall&c=mobileCart&a=getGoodsSum",{mall_token:o.token},!1).done(function(o){0==o.goodsSum?$(".num").hide().parent().show():$(".num").html(o.goodsSum>99?"99+":o.goodsSum).parent().show()})):this.isLogin=!1},initEvent:function(){var o=this,n=Okay.util.debounce(function(){$(document).scrollTop()>o.upperLimit?o.scrollElem.removeClass("dn"):o.scrollElem.addClass("dn")},150);$(window).on("scroll",n),this.scrollElem.on("tap",function(){$("html, body").scrollTop(0),o.scrollElem.addClass("dn")}),$("#theme").on("tap",function(o){o.preventDefault(),$("#menu").show(),$("body").addClass("with-menu")}),$("#menu").on("tap","a",function(o){o.preventDefault(),$("#menu").hide(),window.location.href=$(this).data("href")}),$("#close").on("tap",function(o){o.preventDefault(),$("#menu").hide()}),$("#user").on("tap",function(){o.isLogin?window.location.href="user.html":window.location.href="login.html"}),$("#share").on("tap",function(){o.isShareOpen?$(".share-box").show():(o.isShareOpen=!0,$("body").append($("#"+(Okay.util.isInApp()?"app":"web")+"-share").html()))}),$(document).on("tap",".close",function(){$(".share-box").hide()})}};