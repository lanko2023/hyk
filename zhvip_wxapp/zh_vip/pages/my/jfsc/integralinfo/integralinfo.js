var app = getApp();

Page({
    data: {
        bomb: !0,
        kpgg: !0,
        ssq: "",
        xxdz: "",
        djdh: !1,
        qddh: !1
    },
    onLoad: function(t) {
        console.log(t.id);
        var a = getApp().imgurl, e = wx.getStorageSync("UserData").id;
        this.setData({
            url: a
        });
        var o = this;
        app.util.request({
            url: "entry/wxapp/JfGoodsInfo",
            cachetime: "0",
            data: {
                id: t.id
            },
            success: function(t) {
                console.log(t), o.setData({
                    spinfo: t.data[0]
                }), wx.setNavigationBarTitle({
                    title: t.data[0].name
                });
            }
        }), app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(t) {
                console.log(t), o.setData({
                    integral: t.data.integral
                });
            }
        });
    },
    duihuan: function() {
        this.setData({
            bomb: !1
        });
    },
    cancel: function() {
        this.setData({
            bomb: !0
        });
    },
    caomfirm: function() {
        var t = wx.getStorageSync("UserData").id, a = this, e = a.data.spinfo.id, o = a.data.spinfo.money, n = a.data.spinfo.hb_moeny, s = Number(a.data.integral), i = a.data.spinfo.name, d = a.data.spinfo.img;
        console.log(t, e, Number(o), n, s, i, d), "1" == a.data.spinfo.type ? (a.setData({
            bomb: !0
        }), Number(o) > s ? wx.showModal({
            title: "提示",
            content: "您的积分不足以兑换此物品"
        }) : (a.setData({
            djdh: !0
        }), app.util.request({
            url: "entry/wxapp/Exchange",
            cachetime: "0",
            data: {
                user_id: t,
                good_id: e,
                integral: o,
                hb_money: n,
                type: 1,
                good_name: i,
                good_img: d
            },
            success: function(t) {
                console.log(t), 1 == t.data ? (wx.showToast({
                    title: "兑换成功"
                }), setTimeout(function() {
                    wx.navigateBack({});
                }, 1e3)) : (wx.showToast({
                    title: "请重试！",
                    icon: "loading"
                }), a.setData({
                    djdh: !1
                }));
            }
        }))) : (a.setData({
            bomb: !0
        }), Number(o) > s ? wx.showModal({
            title: "提示",
            content: "您的积分不足以兑换此物品"
        }) : a.setData({
            kpgg: !1
        }));
    },
    ycgg: function() {
        this.setData({
            kpgg: !0
        });
    },
    dingwei: function(t) {
        console.log(t);
        var e = this;
        wx.chooseLocation({
            success: function(t) {
                console.log(t);
                var a = t.address.indexOf("区");
                console.log(t.address.substring(0, a + 1)), e.setData({
                    location: t.latitude + "," + t.longitude,
                    ssq: t.address.substring(0, a + 1),
                    xxdz: t.address.substring(a + 1) + t.name
                });
            }
        });
    },
    formSubmit: function(t) {
        console.log("form发生了submit事件，携带数据为：", t.detail.value);
        var a = this, e = wx.getStorageSync("UserData").id, o = a.data.spinfo.id, n = a.data.spinfo.money, s = a.data.spinfo.name, i = a.data.spinfo.img, d = t.detail.value.lxr, c = t.detail.value.tel, l = (a.data.ssq, 
        a.data.ssq + t.detail.value.grxxdz);
        console.log(e, o, n, d, c, l, s, i);
        var u = "", r = !0, g = t.detail.formId;
        app.util.request({
            url: "entry/wxapp/AddFormId",
            data: {
                user_id: wx.getStorageSync("UserData").id,
                form_id: g
            },
            success: function(t) {
                console.log(t);
            }
        }), "" == d ? u = "请填写联系人！" : "" == c ? u = "请填写联系电话！" : /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/.test(c) && 11 == c.length ? "" == l ? u = "请选择位置！" : (r = !1, 
        a.setData({
            qddh: !0
        }), app.util.request({
            url: "entry/wxapp/Exchange",
            cachetime: "0",
            data: {
                user_id: e,
                good_id: o,
                integral: n,
                user_name: d,
                user_tel: c,
                address: l,
                type: 2,
                good_name: s,
                good_img: i
            },
            success: function(t) {
                console.log(t), 1 == t.data ? (wx.showToast({
                    title: "兑换成功"
                }), setTimeout(function() {
                    wx.navigateBack({});
                }, 1e3)) : (wx.showToast({
                    title: "请重试！",
                    icon: "loading"
                }), a.setData({
                    qddh: !1
                }));
            }
        })) : u = "手机号错误", 1 == r && wx.showModal({
            title: "提示",
            content: u
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