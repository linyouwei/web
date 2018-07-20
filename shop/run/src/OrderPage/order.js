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

});