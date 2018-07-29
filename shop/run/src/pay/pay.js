$(function(){
    var getParams = getArgs();
    var shop = getParams.shop;
    var type = getParams.type;
    var typeId = getParams.typeId;
    var num = getParams.num;
    var goodsSkuId = getParams.goodsSkuId;
    var goodsSkuidarr = getParams.goodsSkuidarr;
    var order = getParams.order;
    var orderid = getParams.id;
    var price = getParams.price;
    var storage = window.localStorage;
    var cookieId = storage.id_shopCookie;
    var cookieToken = storage.token_shopCookie;
    var originalHref = $('#noLogining a').attr('href');
    $('#noLogining a').attr('href', originalHref + '?shop=' + shop);
    var originalHref = $('#doc-header a').attr('href');
})