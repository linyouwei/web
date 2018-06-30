// 多语言方法
var lang = function(tag) {
    return window.languageResource[tag] || '';
};
$(function () {
    $('body').inputAction({
        global: true
    }).height($(window).height());
    // 常用正则
    window.commonRegexp = {
        'mobile': {
            'regexp': /^1[34578]{1}\d{9}$/,
            'emptyMessage': lang('common.02'),
        },
        'password': {
            // 'regexp': /^(?=^[a-zA-Z0-9]{6,20}$).*[a-zA-Z]+.*$/,
            'regexp': /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{6,20}$/,
            'message': lang('common.03'),
            'emptyMessage': lang('common.04'),
        },
        'imageCode': {
            'regexp': /^[0-9a-zA-Z]{4}$/,
            'message': lang('common.05'),
            'emptyMessage': lang('common.06'),
        },
        'address': /^.{1,255}$/,
        'vcode': {
            'regexp': /^\d{4}$/,
            'message': lang('common.07'),
            'emptyMessage': lang('common.08'),
        },
        'smsvcode': {
            'regexp': /^\w{6}$/,
            'message': lang('common.07'),
            'emptyMessage': lang('common.08'),
        },
        'username': {
            'regexp': /^.{1,15}$/,
            'message': lang('common.10'),
            'emptyMessage': lang('common.11'),
        }
    };
});

var getArgs = function getArgs() {
        var args = {};
        var query = location.search.substring(1);
        // Get query string
        var pairs = query.split("&");
        // Break at ampersand
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');
            // Look for "name=value"
            if (pos == -1) {
                continue;
            }
            // If not found, skip
            var argname = pairs[i].substring(0, pos); // Extract the name
            var value = pairs[i].substring(pos + 1); // Extract the value
            value = decodeURIComponent(value); // Decode it, if needed
            args[argname] = value;
            // Store as a property
        }
        return args; // Return the object
};

// 显示或隐藏加载中动画
/* exported toggleLoading */
var toggleLoading = function (isShow) {
    if (isShow) {
        $('#loadingContainer').removeClass('hidden');
        $('body').addClass('modal-open');
    } else {
        $('#loadingContainer').addClass('hidden');
        $('body').removeClass('modal-open');
    }
};

//ajax异步请求
/* exported ajaxRequest */
var ajaxRequest = function (url, params, method, successcallback, errorcallback, obj) {
    if (method === null || method === '') {
        method = 'get';
    }
    if (obj !== undefined) {
        if (obj.attr('disabled') !== undefined) {
            return false;
        }
        obj.attr('disabled', true);
    }
    $.ajax({
        url: url,
        data: params,
        type: method,
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (obj !== undefined) {
                obj.removeAttr('disabled');
            }
            if (parseInt(data.error)>0) {
                if (typeof errorcallback == 'function') {
                    errorcallback(data, obj, defaultErrorHandler);
                } else {
                    defaultErrorHandler(data, obj);
                }
            } else {
                if (typeof successcallback == 'function') {
                    successcallback(data, obj);
                } else {
                    window.location.reload();
                 /*   reload 方法，该方法强迫浏览器刷新当前页面。
                       语法：location.reload([bForceGet])参数： bForceGet， 可选参数， 默认为 false，从客户端缓存里取当前页。 true, 则以GET 方式，从服务端取最新的页面, 相当于客户端点击 F5("刷新")
                */
                }
            }
        },
        error: function (error) {
            if (obj !== undefined) {
                obj.removeAttr('disabled');
            }
            if (typeof errorcallback == 'function') {
                errorcallback(error, obj, defaultErrorHandler);
            } else {
                defaultErrorHandler(error, obj);
            }

        }
    });
};