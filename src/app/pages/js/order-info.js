var order = {
    init: function(){
        this.initData();
        this.initEvent();
    },
    initData: function(){
        var self = this;
        self.token = Okay.util.getCookie('mall_token');
        if(!self.token){
            window.location.href = 'login.html';
            return;
        }
        var addressId = Okay.util.searchUrl(location.search).addressId;
        var data;
        if(addressId){
            data = {'mall_token':self.token,addressId: addressId};
        }else{
            data = {'mall_token':self.token};
        }


        Okay.Ajax('post','/index.php?m=OkayMall&c=mobileCart&a=orderPrepare',data,true,true).done(function(data){
            self.isMember = data.isMember == 1;
            if(!self.isMember){
                $('#member').removeClass('dn');
            }
            if(!data.goodsList){
                window.location.href = 'index.html';
            }
            $('#address').html(createAddress(data.address));
            $('.order-list').html(createLi(data.goodsList));
            $('.tool-bar').html('<span class="deliver-fee">' + (data.shippingFee == 0 ? '包邮' : '邮费：￥' + data.shippingFee) + '</span><span id="total-price">合计：￥' + data.goodsAmount + '</span>');
            if(data.shippingFee > 0){
                $('#deliver-tip').addClass('tool-tip').html('30元以下商品运费￥' + data.rate + '，两件包邮');    
            }
        }).fail(function(data){
            if(data.status == -1){
                window.location.href = 'index.html';
            }
        });

        function createAddress(obj){
            var str = '';
            if(!obj){
                str += '添加收货人信息';
                $('#address').addClass('empty');
            }else{
                self.addressId = obj.addressId;
                str += '<div><em>' + obj.userName + '</em><em class="phone">' + obj.userPhone + '</em>' + (obj.isDefault == 1 ? '<span class="btn btn-sm">默认地址</span>' : '') + '</div>';
                str += '<div class="group clearfix"><div class="fl address">',
                str += '<div>' + (obj.areaName1 + ' ' + obj.areaName2 + ' ' + obj.areaName3) + '</div><div class="text-ellipsis">' + obj.address + '</div>';
                str += '</div><div class="fr forward"><a href="address-list.html?addressId=' + self.addressId + '"><i class="icon icon-forward"></i></a></div></div>';
                if(obj.email){
                    str += '<div class="mail">' + obj.email + '</div>';
                }
            }
            return str;
        }

        function createLi(data){
            var str = '';
            for (var i = 0,len = data.length; i < len; i++) {
                var item = data[i];
                str += '<li><div class="order-product clearfix">';
                str += '<div class="img fl"><img src="' + item.goodsThums + '" /></div>';
                str += '<div class="desc fl">' + item.goodsName + '</div>';
                str += '<div class="price fl"><div class="em">￥' + (self.isMember ? item.memberPrice : item.shopPrice) + '</div>';
                // if(!self.isMember){
                //     str += '<div class="member-price">会员价￥' + item.memberPrice  + '</div>';
                // }
                str += '<div class="quantity"><span class="small">X</span><span>' + item.goodsNum + '</span></div>';
                str += '</div></div></li>';
            }
            return str;
        }

    },
    initEvent: function(){
        var self = this;
        var searchStr = location.search;

        // $('.radio').on('change','input',function(){
        //     if($(this).val() == 1){
        //         $('.invoice').removeClass('dn');
        //     }else{
        //         $('.invoice').addClass('dn').find('input').val("");
        //     }
        // });

        $('.back').on('tap',function(){
            window.history.back();
        });

        $('#member').on('tap',function(){
            if(searchStr){
                window.location.href = 'member.html?returnURL=' + 'order-info.html' + '&' + searchStr.substring(1);
            }else{
                window.location.href = 'member.html?returnURL=' + 'order-info.html';
            }
        });


        $('#address').on('tap',function(){
            if(!self.addressId){
                window.location.href = 'address.html';
            }else{
                window.location.href = 'address-list.html?addressId=' + self.addressId;
            }
        });

        $('#submit').on('tap',function(){
            var data;
            if(!self.addressId){
                Okay.popUp('请添加收货人信息');
                return;
            }

            data = {
                remarks:$('#invoice-title').val().trim(),
                addressId: self.addressId,
                mall_token: self.token
            },

            Okay.Ajax('post','/index.php?m=OkayMall&c=mobileOrders&a=orderSubmit',data).done(function(data){
                window.location.href = 'pay.html?orderId=' + data.orderIds;
            });

        });

    }

}
