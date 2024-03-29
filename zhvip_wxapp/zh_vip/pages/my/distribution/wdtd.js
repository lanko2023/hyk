var app = getApp(), util = require("../../../utils/util.js");

Page({
    data: {
        tabs: [ "一级", "二级" ],
        activeIndex: 0,
        djd: []
    },
    tabClick: function(t) {
        this.setData({
            activeIndex: t.currentTarget.id
        });
    },
    onLoad: function(t) {
        var o = this, e = wx.getStorageSync("UserData").id;
        app.util.request({
            url: "entry/wxapp/MyTeam",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(t) {
                console.log(t);
                var e = [], a = [];
                e = t.data.one, a = t.data.two;
                for (var n = 0; n < e.length; n++) e[n].time = util.ormatDate(e[n].time);
                for (n = 0; n < a.length; n++) a[n].time = util.ormatDate(a[n].time);
                o.setData({
                    yj: e,
                    ej: a
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});