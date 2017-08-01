'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var archerUtil = {
    backTop: function backTop() {
        var topTimer = setInterval(function () {
            var currTop = document.body.scrollTop;
            document.body.scrollTop -= Math.max(Math.ceil(currTop / 9) + 2);
            if (currTop === 0) {
                clearInterval(topTimer);
            }
        }, 20);
    },

    getScrollTop: function getScrollTop() {
        return document.documentElement.scrollTop || document.body.scrollTop;
    },

    // 获取元素在页面上相对左上角的位置
    getAbsPosition: function getAbsPosition(e) {
        var x = e.offsetLeft,
            y = e.offsetTop;
        while (e = e.offsetParent) {
            x += e.offsetLeft;
            y += e.offsetTop;
        }
        return {
            'x': x,
            'y': y
        };
    },
    dateFormater: function dateFormater(date, fmt) {
        var o = {
            'M+': date.getMonth() + 1, //月份 
            'd+': date.getDate(), //日 
            'h+': date.getHours(), //小时 
            'm+': date.getMinutes(), //分 
            's+': date.getSeconds(), //秒 
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度 
            'S': date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }
        return fmt;
    },
    toggler: function toggler(target, eventName, btn, addClassName, removeClassName, optEvent) {
        if (!(target && typeof window !== 'undefined' && (target === window || target.nodeType))) {
            return;
        }
        btn.addEventListener(eventName, function (eve) {
            if (addClassName) {
                var classNameArr = addClassName.split(/[, ]/);
                var length = classNameArr.length;
                while (length--) {
                    target.classList.add(classNameArr[length]);
                }
            }
            if (removeClassName) {
                var _classNameArr = removeClassName.split(/[, ]/);
                var _length = _classNameArr.length;
                while (_length--) {
                    target.classList.remove(_classNameArr[_length]);
                }
            }
            if (optEvent) {
                optEvent(eve);
            }
        });
    }

};

exports.archerUtil = archerUtil;