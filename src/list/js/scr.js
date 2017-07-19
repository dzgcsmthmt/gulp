$(function(){
    var upperLimit = 100;
	var scrollElem = $('#to-top');
	var scrollSpeed = 300;
	$(window).on('scroll',function (){
		var scrollTop = $(document).scrollTop();
		if ( scrollTop > upperLimit ) {
			$(scrollElem).removeClass('dn');
		}else{
			$(scrollElem).addClass('dn');
		}
	});
	$(scrollElem).on('click',function(){
		$('html, body').animate({scrollTop:0}, scrollSpeed);
		return false;
	});
    $('.wgt-customer-service .function-feedback').on('click', function(e) {
        e.preventDefault();

        if(isMobile()){
            $(this).css('background-position','0 0');
            window.location.href='https://kefu.easemob.com/webim/im.html?tenantId=2782&emgroup=OKAY%E5%AE%98%E7%BD%91';
        }else{
            window.easemobim.bind({
                hide: true,
                tenantId: 2782,
                autoConnect: true,
                to: "kefuchannelimid_889489",
                appKey: "1157161207178432#kefuchannelapp2782",
                visitor: {
                    trueName: 'OKAY官网',
                    userNickname: 'OKAY官网'
                }
            });
        }

    });

    $('.share')[0].addEventListener(isMobile() ? 'touchstart' : "click", function(){
        $('.share-box').addClass('show');
        document.body.addEventListener("touchmove", freezeVp, false);
    });

    $('.close')[0].addEventListener(isMobile() ? 'touchstart' : "click", function(){
        $('.share-box').removeClass('show');
        document.body.removeEventListener("touchmove", freezeVp, false);
    });

    function freezeVp(e) {
        e.preventDefault();
    };

    function isMobile(){
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    if(isMobile()){
        var oHrefs = $('.href'),len = oHrefs.length;
        for(var i = 0;i < len;i++){
            oHrefs.eq(i).attr('target','_blank');
        }
    }

})
