module.exports = {
    /**
     * 请求api
     * @param url 请求地址
     * @param type 请求类型
     * @param dataGet get数据
     * @param dataPost post数据
     * @returns {Promise}
     */
    ajax: function (param) {
        var def = $.Deferred();

        if (param.dataGet) {
            param.url = param.url + (~param.url.indexOf('?') ? '&' : '?') + $.param(param.dataGet);
        }

        var ajax = $.ajax({
            url: param.url,
            type: param.type || 'get',
            dataType: 'json',
            data: param.dataPost
        }).done(function(res) {
            if (res && res.result.code===0) {
                def.resolve(res)
            }
            else {
                def.reject(res);
            }
        }).fail(function(e) {
            def.reject(e);
        });

        var ret = def.promise();
        ret.abort = ajax.abort;
        return ret;
    }
};