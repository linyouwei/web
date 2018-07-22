$(function(){
    var getParams = getArgs();
    var shop = getParams.shop;
    var orderId = getParams.orderId;
    var originalHref = $('.back-home').attr('href');
    console.log(shop);
    if(shop){
        $('.back-home').attr('href', originalHref + '?shop=' + shop);
    }else{
        $('.back-home').attr('href', 'javascript:history.back();');
    }
    var storage = window.localStorage;
    var cookieId = storage.id_shopCookie;
    var cookieToken = storage.token_shopCookie;
    toastr.options = {
        "newestOnTop": false,
        "timeOut": 1500,
        "extendedTimeOut": 0,
        "escapeHtml": true,
        "positionClass": "toast-bottom-center"
    };
    var shopStatus = {
        '0':'待支付',
        '1': '待发货',
        '2': '待收货',
        '3': '已完成',
        '4': '已过期',
        '11': '买家关闭',
        '12': '卖家关闭'
    };
  var showGoodsOrder = function(){
//        请求后台，填充数据
        if(cookieId){
            $("#doc-body").removeClass("hidden");
            params = {};
            params.id = cookieId;
            params.token = cookieToken;
            params.orderId = orderId;
            var domain = 'http://localhost:1300';
            toggleLoading(true);
            ajaxRequest(domain+'/api/order/detail', params, 'post', function(data) {
                toggleLoading(false);
                var orderDetail = data.data;
                $("#doc-body").find(".order-status").text(shopStatus[orderDetail.status]);
                $(".personage-info-content").find(".name").text(orderDetail.receivername);
                $(".personage-info-content").find(".number").text(orderDetail.managermobile);
                $(".personage-info-content").find(".personage-address").text(orderDetail.receiveraddress);

                $(".store-container").find(".store-name").text(orderDetail.shopname);
                $(".store-container").find(".store-status").text(shopStatus[orderDetail.status]);

                $(".store-container").find(".store-serial").text(orderDetail.tradeno)
                $(".store-container").find(".store-place-time").text(orderDetail.createtime)
                $(".store-container").find(".store-pay-time").text(orderDetail.paytime)

                $(".store-container").find(".payment-status").text(shopStatus[orderDetail.status]!=0?'实付款':'需付款')
                $(".store-container").find(".payment").text(orderDetail.payment);
                templateAllGoodsHtml = '';
                var goodsList = orderDetail.goods;
                $.each(goodsList,function(goodsKey,goodsValue){
                            var templateSingleGoodsHtml = $($("#templateGoodsList").clone().html());
                            templateSingleGoodsHtml.find(".goods-picture-cover").css("backgroud-image","url("+goodsValue.cover+")")
                                .addClass("background-size","cover");
                            templateSingleGoodsHtml.find(".represent-dec").html(goodsValue.name);
                            templateSingleGoodsHtml.find(" .represent-price").html(goodsValue.price);
                            templateSingleGoodsHtml.find(".model").html(goodsValue.modelnumber);
                            templateSingleGoodsHtml.find(".scalar").html(goodsValue.count);
                            templateAllGoodsHtml += templateSingleGoodsHtml.prop('outerHTML');
                });
                $(".store-container").find(".store-goods").html(templateAllGoodsHtml);
            }, function(error) { //后台请求不是200，就进入该方法
                toastr.error(error.message);
            });
        }else{
            $("#noLogining").removeClass("hidden");
        }
    };
    showGoodsOrder();



});