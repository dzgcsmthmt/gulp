var t,talkboxHtml;
if(typeof TimelineMax != 'undefined'){
    t = new TimelineMax();
    talkboxHtml = $('#talkbox').html();
    $('#talkbox').html('<div id="inner">' + talkboxHtml + '</div>');
    t.staggerTo('#yun',1,{
        cycle: {
            bezier: function(){
                return [
                    {x:0,y:0},
                    {x: 528,y:-175},
                    {x: 341,y:-363}
                ]
            }
        },
        onComplete: function(){

            updown();

            function updown(){
                $('#yun').animate({top: '-=20px'}, 2000,"swing",function(){
                    $('#yun').animate({top: '+=20px'}, 2000,"swing",function(){
                        updown();
                    });
                });
            }

        }
    });

    t.to('#inner',0.35,{
        left: 0,
        ease: Linear.easeOut,
        onComplete:function(){
            t.to('#inner p',0.15,{
                autoAlpha: 1,
                ease: Linear.easeIn,
                onComplete: function(){
                    $('.detail').show();

                    $('.tea').animate({left: '-=216px',top: '-=125px'}, 250);
                    $('.edu').animate({left: '-=216px',top: '+=125px'}, 250);
                    $('.par').animate({left: '+=216px',top: '-=125px'}, 250);
                    $('.tra').animate({left: '+=216px',top: '+=125px'}, 250);

                    $('.hea').animate({left: '-=432px'}, 350);
                    $('.ptn').animate({left: '+=432px'}, 350);
                }
            })
        }
    });

    //处理ie8点击后的虚线框
    $('.detail').on('click',function(){
        $(this).blur();
    })

}else{
    $('#wrapper').iosParallax({
        movementFactor: 50,
    });

    $('#yun').one('animationend webkitAnimationEnd oAnimationEnd',function () {
        $('#yun1').hide();
        $(this).css({left:'821px',top:'-188px'}).addClass('up-down');
        $('#move').addClass('motion');
    });

    $('.wgt-customer-service .function-feedback').on('click', function(e) {
        e.preventDefault();
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
        })
    });
}
