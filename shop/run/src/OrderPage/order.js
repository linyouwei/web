$(function(){
    var getParams = getArgs();
    var shop = getParams.shop;
    var type = getParams.type;
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
    console.log(type);
    //处理导航栏
    if(type){
        switch (parseInt(type)){
            case 0:
                $("[href='#payment-order']").addClass('is-active').siblings('.tabs-tab').removeClass('is-active');
                $('#payment-order').addClass('is-active').siblings('.tabs-panel').removeClass('is-active');
                break;
            case 1:
                $("[href='#send-order']").addClass('is-active').siblings('.tabs-tab').removeClass('is-active');
                $('#send-order').addClass('is-active').siblings('.tabs-panel').removeClass('is-active');
                break;
            case 2:
                $("[href='#take-order']").addClass('is-active').siblings('.tabs-tab').removeClass('is-active');
                $('#take-order').addClass('is-active').siblings('.tabs-panel').removeClass('is-active');
                break;
        }
    }
    var shopStatus = {
        '0':'待支付',
        '1': '待发货',
        '2': '待收货',
        '3': '已完成',
        '4': '已过期',
        '11': '买家关闭',
        '12': '卖家关闭'
    };
  var showShopOrder = function(){
//        请求后台，填充数据
        if(cookieId){
            $("#doc-body").removeClass("hidden");
            params = {};
            params.id = cookieId;
            params.token = cookieToken;
            var domain = 'http://localhost:1300';
            ajaxRequest(domain+'/api/account/order', params, 'post', function(data) {
                var info = data.data;
                var allOrderHTML = '', paymentOrderHTML = '',
                    sendlOrderHTML = '', takeOrderHTML = '';
                if(info.length>0){//有订单则进入订单模块
                    //遍历所有的订单
                    $.each(info,function(key,value){
                        var templateSingleOrderHtml = $($("#templateOrder").clone().html());
                        templateSingleOrderHtml.find(".store-head .store-name").html(value.shopname);
                        templateSingleOrderHtml.find(".store-head .store-status").html(shopStatus[value.status]);
                        templateSingleOrderHtml.find(".store-foot .store-check .choice").html(value.goods.length);
                        templateSingleOrderHtml.find(".store-foot .store-pay .pay").html(value.payment);
                        templateSingleOrderHtml.find(".store-foot .store-freight .freight").html(value.expressfee);
                        //遍历商品
                        var goodsList = value.goods;
                        //该循环不能也function(key,value);
                        var templateAllGoodsHtml = '';
                        $.each(goodsList,function(goodsKey,goodsValue){
                            var templateSingleGoodsHtml = $($("#templateGoodsList").clone().html());
                            //不能写成 templateSingleGoodsHtml.find(".store-goods-list .goods-picture-cover")
                            //因为store-good-list 不在templateSingleGoodsHtml中
                            templateSingleGoodsHtml.find(".goods-picture-cover").css("backgroud-image","url("+goodsValue.cover+")")
                                .addClass("background-size","cover");
                            templateSingleGoodsHtml.find(".represent-dec").html(goodsValue.name);
                            templateSingleGoodsHtml.find(".represent-price").html(goodsValue.price);
                            templateSingleGoodsHtml.find(".model").html(goodsValue.modelnumber);
                            templateSingleGoodsHtml.find(".scalar").html(goodsValue.count);
                            templateAllGoodsHtml += templateSingleGoodsHtml.prop('outerHTML');
                        });
                        templateSingleOrderHtml.find(".store-goods").html(templateAllGoodsHtml);
                        switch(parseInt(value.status)){
                            case 0:
                                //待支付的订单
                                paymentOrderHTML += templateSingleOrderHtml.prop('outerHTML');
                                //还有和待支付相关的按钮（关闭订单、继续支付）
                                templateSingleOrderHtml.find(".operation-close").closest(".operation-list").removeClass("hidden");
                                templateSingleOrderHtml.find(".operation-pay").closest(".operation-list").removeClass("hidden");
                                break;
                            case 1:
                                //待发货的订单
                                sendlOrderHTML += templateSingleOrderHtml.prop('outerHTML');
                                //还有和待支付相关的按钮（关闭订单、继续支付）
                                templateSingleOrderHtml.find(".operation-remind").closest(".operation-list").removeClass("hidden");
                                break;
                            case 2:
                                //待收货的订单
                                takeOrderHTML += templateSingleOrderHtml.prop('outerHTML');
                                //还有和待支付相关的按钮（关闭订单、继续支付）
                                templateSingleOrderHtml.find(".operation-check").closest(".operation-list").removeClass("hidden");
                                templateSingleOrderHtml.find(".operation-affirm").closest(".operation-list").removeClass("hidden");
                                break;
                            case 3:
                                //已完成
                                templateSingleOrderHtml.find(".operation-delete").closest(".operation-list").removeClass("hidden");
                            case 4:
                                //已过期
                                templateSingleOrderHtml.find(".operation-delete").closest(".operation-list").removeClass("hidden");
                            case 11:
                                //买家关闭的订单
                                templateSingleOrderHtml.find(".operation-delete").closest(".operation-list").removeClass("hidden");
                                break;
                            case 12:
                                //卖家关闭的订单
                                templateSingleOrderHtml.find(".operation-delete").closest(".operation-list").removeClass("hidden");
                                break;

                        }
                        allOrderHTML += templateSingleOrderHtml.prop('outerHTML');
                    });
                    $("#all-order").html(allOrderHTML)
                }else{//显示空状态页
                   var allOrderHTML =  $("templateOrderEmpty").clone().html();
                }
            }, function(error) { //后台请求不是200，就进入该方法
                toastr.error(error.message);
            });
        }else{
            $("#noLogining").removeClass("hidden");
        }
    };
    showShopOrder();




});