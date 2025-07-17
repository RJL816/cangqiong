Vue.filter("formaMoney", function (s, n) {
    if (!s && s !== 0) {
        return s;
    }
    n = n > 0 && n <= 20 ? n : 2;
    f = s < 0 ? "-" : "";
    s = parseFloat((Math.abs(s) + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return f + t.split("").reverse().join("") + "." + r.substring(0, 2);
});

Vue.filter("formatDate", function (s, n) {
    if (!s) {
        return s;
    }
    var d = new Date(s.replace(/-/g, '/'));
    var o = {
        "M+": d.getMonth() + 1,
        "d+": d.getDate(),
        "h+": d.getHours(),
        "m+": d.getMinutes(),
        "s+": d.getSeconds(),
        "q+": Math.floor((d.getMonth() + 3) / 3),
        "S": d.getMilliseconds()
    };
    if (/(y+)/.test(n)) {
        n = n.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(n)) {
            n = n.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }

    return n;
});

//格式化成万
Vue.filter("formatW", function (s) {
    if (!s) {
        return s;
    }
    s = parseFloat(s);
    s = Math.round((s / 10000) * 10000) / 10000;
    return s;
});
//格式化百万
Vue.filter("formatBW", function (s) {
    if (!s) {
        return s;
    }
    s = parseFloat(s);
    s = Math.round((s / 1000000) * 10000) / 10000;
    return s;
});
//格式化亿
Vue.filter("formatYiyuan", function (s) {
    if (!s) {
        return s;
    }
    s = parseFloat(s);
    s = Math.round((s / 100000000) * 10000) / 10000;
    return s;
});







