var app = getApp(), util = require("../../utils/util.js");

Page({
    data: {
        isloading: !1,
        store_id: "1",
        navbar: [ "外卖", "评价", "详情" ],
        selectedindex: 0,
        catalogSelect: 0,
        share_modal_active: !1,
        color: "",
        fwxy: !0,
        cpjzz: !0,
        spggtoggle: !0,
        yysjtoggle: !0,
        spxqtoggle: !0,
        gg: [],
        storeyyzz: [],
        pjselectedindex: 0,
        isytpj: !1,
        pagenum: 1,
        storelist: [],
        bfstorelist: [],
        mygd: !1,
        jzgd: !0
    },
    cartaddformSubmit: function(t) {
        console.log("formid", t.detail.formId);
        var a = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/AddFormId",
            cachetime: "0",
            data: {
                user_id: a,
                form_id: t.detail.formId
            },
            success: function(t) {
                console.log(t.data);
            }
        });
    },
    commentPicView: function(t) {
        console.log(t);
        var a = this.data.storelist, e = [], o = t.currentTarget.dataset.index, s = t.currentTarget.dataset.picindex, i = t.currentTarget.dataset.id;
        if (console.log(o, s, i), i == a[o].id) {
            var n = a[o].img;
            for (var r in n) e.push(this.data.url + n[r]);
            wx.previewImage({
                current: this.data.url + n[s],
                urls: e
            });
        }
    },
    ytpj: function() {
        var t = this.data.params;
        this.data.isytpj ? t.img = "" : t.img = "1", this.setData({
            pagenum: 1,
            storelist: [],
            bfstorelist: [],
            mygd: !1,
            jzgd: !0,
            isytpj: !this.data.isytpj,
            params: t
        }), this.getstorelist();
    },
    pjselectednavbar: function(t) {
        console.log(t);
        var a = this.data.params;
        0 == t.currentTarget.dataset.index && (a.type = "全部"), 1 == t.currentTarget.dataset.index && (a.type = "1"), 
        2 == t.currentTarget.dataset.index && (a.type = "2"), this.setData({
            pagenum: 1,
            storelist: [],
            bfstorelist: [],
            mygd: !1,
            jzgd: !0,
            pjselectedindex: t.currentTarget.dataset.index,
            params: a
        }), this.getstorelist();
    },
    getstorelist: function() {
        var o = this, s = o.data.pagenum;
        o.data.params.page = s, o.data.params.pagesize = 10, console.log(s, o.data.params), 
        o.setData({
            isjzz: !0
        }), app.util.request({
            url: "entry/wxapp/AssessList",
            cachetime: "0",
            data: o.data.params,
            success: function(t) {
                console.log("分页返回的商家列表数据", t.data);
                var a = [ {
                    name: "全部",
                    num: t.data.all
                }, {
                    name: "满意",
                    num: t.data.ok
                }, {
                    name: "不满意",
                    num: t.data.no
                } ], e = o.data.bfstorelist;
                e = function(t) {
                    for (var a = [], e = 0; e < t.length; e++) -1 == a.indexOf(t[e]) && a.push(t[e]);
                    return a;
                }(e = e.concat(t.data.assess)), o.setData({
                    storelist: e,
                    bfstorelist: e,
                    pjnavbar: a
                }), t.data.assess.length < 10 ? o.setData({
                    mygd: !0,
                    jzgd: !0,
                    isjzz: !1
                }) : o.setData({
                    jzgd: !0,
                    pagenum: s + 1,
                    isjzz: !1
                }), console.log(e);
            }
        });
    },
    Coupons: function() {
        var o = this, t = wx.getStorageSync("users").id, a = o.data.store_id;
        app.util.request({
            url: "entry/wxapp/Coupons",
            cachetime: "0",
            data: {
                store_id: a,
                user_id: t
            },
            success: function(t) {
                console.log(t.data);
                for (var a = [], e = 0; e < t.data.length; e++) "2" != t.data[e].type && a.push(t.data[e]);
                o.setData({
                    Coupons: a
                });
            }
        });
    },
    ljlq: function(t) {
        console.log(t.currentTarget.dataset.qid);
        var a = this, e = wx.getStorageSync("users").id;
        wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/LqCoupons",
            cachetime: "0",
            data: {
                user_id: e,
                coupon_id: t.currentTarget.dataset.qid
            },
            success: function(t) {
                console.log(t), "1" == t.data && (wx.showToast({
                    title: "领取成功"
                }), setTimeout(function() {
                    a.Coupons();
                }, 1e3));
            }
        });
    },
    submit: function() {
        var t = this.data.cart_list;
        if (console.log(t), wx.setStorageSync("cart_list", t), 0 == t.length) return !0;
        wx.navigateTo({
            url: "../gwc/tjdd"
        });
    },
    lookck: function() {
        this.setData({
            fwxy: !1
        });
    },
    queren: function() {
        this.setData({
            fwxy: !0
        });
    },
    spxqck: function(t) {
        var a = t.currentTarget.dataset.itemIndex, e = t.currentTarget.dataset.parentindex, o = this.data.dishes, s = this.data.cart_list, i = t.currentTarget.dataset.goodid, n = this.data.dishes[e].good[a], r = wx.getStorageSync("UserData").id, d = this.data.store_id;
        n.goodindex = a, n.catalogSelect = e, console.log(o, s, a, e, i, n, r, d), this.setData({
            spxqinfo: n,
            spxqtoggle: !1
        });
    },
    ckcd: function() {
        this.setData({
            yysjtoggle: !0
        });
    },
    gdsh: function() {
        wx.navigateBack({});
    },
    gbspxq: function() {
        this.setData({
            spxqtoggle: !0
        });
    },
    ggcartdec: function() {
        var a = this;
        wx.showModal({
            title: "提示",
            content: "多规格商品请在购物车中删除对应的规格商品！",
            success: function(t) {
                a.setData({
                    share_modal_active: !0
                });
            }
        });
    },
    gwcdec: function(t) {
        var o = this, s = this.data.dishes, i = t.currentTarget.dataset.goodid, a = Number(t.currentTarget.dataset.num) - 1, e = t.currentTarget.dataset.id;
        console.log(s, i, a, e), wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/UpdCar",
            cachetime: "0",
            data: {
                num: a,
                id: e
            },
            success: function(t) {
                if (console.log(t), "1" == t.data) {
                    for (var a = 0; a < s.length; a++) for (var e = 0; e < s[a].good.length; e++) s[a].good[e].id == i && s[a].good[e].quantity--;
                    o.setData({
                        dishes: s
                    }), o.gwcreload();
                }
                "超出库存!" == t.data && wx.showModal({
                    title: "提示",
                    content: "超出库存!"
                });
            }
        });
    },
    gwcadd: function(t) {
        var o = this, s = this.data.dishes, i = t.currentTarget.dataset.goodid, a = Number(t.currentTarget.dataset.num) + 1, e = t.currentTarget.dataset.id;
        console.log(s, i, a, e), wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/UpdCar",
            cachetime: "0",
            data: {
                num: a,
                id: e
            },
            success: function(t) {
                if (console.log(t), "1" == t.data) {
                    for (var a = 0; a < s.length; a++) for (var e = 0; e < s[a].good.length; e++) s[a].good[e].id == i && s[a].good[e].quantity++;
                    o.setData({
                        dishes: s
                    }), o.gwcreload();
                }
                "超出库存!" == t.data && wx.showModal({
                    title: "提示",
                    content: "超出库存!请选择其他商品"
                });
            }
        });
    },
    cartdec: function(t) {
        var a = t.currentTarget.dataset.itemIndex, e = t.currentTarget.dataset.parentindex, o = this.data.dishes, s = this.data.cart_list, i = t.currentTarget.dataset.goodid, n = this, r = this.data.dishes[e].good[a], d = wx.getStorageSync("UserData").id, c = this.data.store_id;
        console.log(o, s, a, e, i, r, d, c);
        for (var l = 0; l < s.length; l++) if (s[l].good_id == i) {
            var g = Number(s[l].num) - 1, u = s[l].id;
            console.log(s[l], g, u), wx.showLoading({
                title: "正在加载",
                mask: !0
            }), app.util.request({
                url: "entry/wxapp/UpdCar",
                cachetime: "0",
                data: {
                    num: g,
                    id: u
                },
                success: function(t) {
                    if (console.log(t), "1" == t.data) {
                        for (var a = 0; a < o.length; a++) for (var e = 0; e < o[a].good.length; e++) o[a].good[e].id == i && o[a].good[e].quantity--;
                        n.setData({
                            dishes: o
                        }), n.gwcreload();
                    }
                    "超出库存!" == t.data && wx.showModal({
                        title: "提示",
                        content: "超出库存!"
                    });
                }
            });
        }
    },
    cartadd: function(t) {
        var a = t.currentTarget.dataset.itemIndex, e = t.currentTarget.dataset.parentindex, o = this.data.dishes, s = t.currentTarget.dataset.goodid, i = this, n = this.data.dishes[e].good[a], r = wx.getStorageSync("UserData").id, d = this.data.store_id;
        console.log(a, e, s, n, r, d), wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/AddCar",
            cachetime: "0",
            data: {
                money: n.money,
                good_id: s,
                store_id: d,
                user_id: r,
                num: 1,
                spec: "",
                combination_id: ""
            },
            success: function(t) {
                if (console.log(t), "1" == t.data) {
                    for (var a = 0; a < o.length; a++) for (var e = 0; e < o[a].good.length; e++) o[a].good[e].id == s && o[a].good[e].quantity++;
                    i.setData({
                        dishes: o
                    }), console.log(o), i.gwcreload();
                }
                "超出库存!" == t.data && wx.showModal({
                    title: "提示",
                    content: "库存不足!请重新选择"
                });
            }
        });
    },
    spggck: function(t) {
        var d = t.currentTarget.dataset.itemIndex, c = t.currentTarget.dataset.parentindex, l = t.currentTarget.dataset.goodid, g = this;
        console.log(d, c, l), app.util.request({
            url: "entry/wxapp/GoodInfo",
            cachetime: "0",
            data: {
                good_id: l
            },
            success: function(t) {
                console.log(t.data);
                var a = t.data.spec, e = t.data.name;
                for (var o in a) for (var s in a[o].spec_val) a[o].spec_val[s].checked = 0 == s;
                g.setData({
                    gg: a,
                    spname: e
                }), console.log(a);
                var i = [], n = !0;
                for (var o in a) {
                    var r = !1;
                    for (var s in a[o].spec_val) if (a[o].spec_val[s].checked) {
                        i.push(a[o].spec_val[s].spec_val_name), r = !0;
                        break;
                    }
                    if (!r) {
                        n = !1;
                        break;
                    }
                }
                console.log(l, i, i.toString()), n && (wx.showLoading({
                    title: "正在加载",
                    mask: !0
                }), app.util.request({
                    url: "entry/wxapp/GgZh",
                    cachetime: "0",
                    data: {
                        combination: i.toString(),
                        good_id: l
                    },
                    success: function(t) {
                        console.log(t), g.setData({
                            spggtoggle: !1,
                            gginfo: t.data,
                            itemIndex: d,
                            parentindex: c
                        });
                    }
                }));
            }
        });
    },
    attrClick: function(t) {
        var a = this, e = this.data.gginfo.good_id, o = t.target.dataset.groupId, s = t.target.dataset.id, i = a.data.gg;
        for (var n in console.log(o, s, i), i) if (i[n].spec_id == o) for (var r in i[n].spec_val) i[n].spec_val[r].spec_val_id == s ? i[n].spec_val[r].checked = !0 : i[n].spec_val[r].checked = !1;
        a.setData({
            gg: i
        });
        var d = [], c = !0;
        for (var n in i) {
            var l = !1;
            for (var r in i[n].spec_val) if (i[n].spec_val[r].checked) {
                d.push(i[n].spec_val[r].spec_val_name), l = !0;
                break;
            }
            if (!l) {
                c = !1;
                break;
            }
        }
        console.log(e, d, d.toString()), c && (wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/GgZh",
            cachetime: "0",
            data: {
                combination: d.toString(),
                good_id: e
            },
            success: function(t) {
                console.log(t), a.setData({
                    gginfo: t.data
                });
            }
        }));
    },
    ggaddcart: function() {
        var t = this.data.itemIndex, a = this.data.parentindex, o = this.data.dishes, s = this, i = this.data.gginfo, e = wx.getStorageSync("UserData").id, n = this.data.gg, r = this.data.store_id, d = [], c = !0;
        for (var l in n) {
            var g = !1;
            for (var u in n[l].spec_val) if (n[l].spec_val[u].checked) {
                d.push(n[l].spec_name + ":" + n[l].spec_val[u].spec_val_name), g = !0;
                break;
            }
            if (!g) {
                c = !1;
                break;
            }
        }
        console.log("加入购物车", t, a, o, i, e, r, n, d, d.toString()), c && (wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/AddCar",
            cachetime: "0",
            data: {
                money: i.money,
                good_id: i.good_id,
                store_id: r,
                user_id: e,
                num: 1,
                spec: d.toString(),
                combination_id: i.id
            },
            success: function(t) {
                if (console.log(t), "1" == t.data) {
                    for (var a = 0; a < o.length; a++) for (var e = 0; e < o[a].good.length; e++) o[a].good[e].id == i.good_id && o[a].good[e].quantity++;
                    s.setData({
                        dishes: o
                    }), s.gwcreload(), s.setData({
                        spggtoggle: !0
                    });
                }
                "超出库存!" == t.data && wx.showModal({
                    title: "提示",
                    content: "暂无库存!请选择其他规格或商品"
                });
            }
        }));
    },
    gwcreload: function() {
        var e = this.data.dishes, o = this, t = wx.getStorageSync("UserData").id, a = this.data.store_id;
        console.log(e, t, a), app.util.request({
            url: "entry/wxapp/MyCar",
            cachetime: "0",
            data: {
                store_id: a,
                user_id: t
            },
            success: function(t) {
                console.log(t), console.log(e);
                for (var a = 0; a < t.data.length; a++) "0" == t.data[a].combination_id && (t.data[a].number = t.data[a].inventory), 
                t.data[a].num = Number(t.data[a].num), t.data[a].number = Number(t.data[a].number), 
                t.data[a].money = Number(t.data[a].money);
                o.setData({
                    cart_list: t.data
                }), o.jstotalPrice();
            }
        });
    },
    gbspgg: function() {
        this.setData({
            spggtoggle: !0
        });
    },
    gbyysj: function() {
        this.setData({
            yysjtoggle: !0
        });
    },
    selectednavbar: function(t) {
        console.log(t), this.setData({
            selectedindex: t.currentTarget.dataset.index
        });
    },
    selectMenu: function(e) {
        var s = this.data.dishes, i = this, o = wx.getStorageSync("UserData").id, n = i.data.store_id, r = e.currentTarget.dataset.itemIndex;
        if (console.log(s, o, n, r), this.setData({
            catalogSelect: e.currentTarget.dataset.itemIndex
        }), 0 == s[e.currentTarget.dataset.itemIndex].good.length) {
            var t = s[e.currentTarget.dataset.itemIndex].id;
            console.log("还没加载过数据", t), i.setData({
                cpjzz: !0
            }), app.util.request({
                url: "entry/wxapp/Dishes",
                cachetime: "0",
                data: {
                    type_id: t,
                    type: 2
                },
                success: function(t) {
                    console.log(t.data);
                    for (var a = 0; a < t.data.length; a++) t.data[a].quantity = Number(t.data[a].quantity);
                    s[e.currentTarget.dataset.itemIndex].good = t.data, i.setData({
                        cpjzz: !1
                    }), app.util.request({
                        url: "entry/wxapp/MyCar",
                        cachetime: "0",
                        data: {
                            store_id: n,
                            user_id: o
                        },
                        success: function(t) {
                            console.log(t);
                            for (var a = t.data, e = 0; e < a.length; e++) for (var o = 0; o < s[r].good.length; o++) a[e].good_id == s[r].good[o].id && (s[r].good[o].quantity = s[r].good[o].quantity + Number(a[e].num));
                            console.log(s), i.setData({
                                dishes: s
                            });
                        }
                    });
                }
            });
        } else console.log("已有缓存数据");
    },
    swiperChange: function(t) {
        console.log(t), this.setData({
            selectedindex: t.detail.current
        });
    },
    showcart: function() {
        this.setData({
            share_modal_active: !this.data.share_modal_active
        });
    },
    closecart: function() {
        this.setData({
            share_modal_active: !1
        });
    },
    clear: function() {
        var o = this, s = this.data.dishes, a = wx.getStorageSync("UserData").id, e = o.data.store_id;
        console.log(s, a, e), wx.showModal({
            title: "提示",
            content: "确定清空此商家的购物车吗？",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), wx.showLoading({
                    title: "正在加载",
                    mask: !0
                }), app.util.request({
                    url: "entry/wxapp/DelCar2",
                    cachetime: "0",
                    data: {
                        user_id: a,
                        store_id: e
                    },
                    success: function(t) {
                        if (console.log(t.data), "1" == t.data) {
                            for (var a = 0; a < s.length; a++) for (var e = 0; e < s[a].good.length; e++) s[a].good[e].quantity = 0;
                            o.setData({
                                dishes: s,
                                share_modal_active: !1
                            }), o.gwcreload();
                        }
                    }
                })) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    jstotalPrice: function() {
        var t = 0, a = 0, e = this.data.cart_list;
        for (var o in e) t += e[o].money * e[o].num, a += e[o].num;
        this.setData({
            total_price: t.toFixed(2),
            total_num: a
        });
        var s, i = parseFloat(this.data.total_price);
        console.log(i), i <= 0 ? s = "未选购商品" : (console.log(i), s = "去结算"), this.setData({
            subtext: s
        });
    },
    subText: function() {
        console.log(this.data);
        var t = parseFloat(this.data.totalPrice);
        console.log(t), this.setData({
            subtext: void 0
        });
    },
    tzweb: function(t) {
        console.log(t.currentTarget.dataset.index, this.data.lblist);
        var a = this.data.lblist[t.currentTarget.dataset.index];
        console.log(a), "1" == a.item && wx.navigateTo({
            url: a.src
        }), "2" == a.item && (wx.setStorageSync("vr", a.src2), wx.navigateTo({
            url: "../car/car"
        })), "3" == a.item && wx.navigateToMiniProgram({
            appId: a.appid,
            success: function(t) {
                console.log(t);
            }
        });
    },
    onLoad: function(t) {
        app.pageOnLoad(this), console.log("options", t);
        var a = wx.getStorageSync("UserData").id, e = wx.getStorageSync("mdid");
        console.log("uid", a, e), app.util.request({
            url: "entry/wxapp/DelCar2",
            cachetime: "0",
            data: {
                user_id: a,
                store_id: e
            },
            success: function(t) {
                console.log(t.data);
            }
        });
        var o = this, s = (util.formatTime(new Date()).slice(11, 16), wx.getStorageSync("xtxx")), i = getApp().imgurl;
        console.log(s), this.setData({
            xtxx: s,
            url: i,
            color: s.link_color
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: s.link_color
        }), wx.getSystemInfo({
            success: function(t) {
                console.log(t), o.setData({
                    height: t.windowHeight - 145
                });
            }
        }), app.util.request({
            url: "entry/wxapp/StoreAd",
            cachetime: "0",
            data: {
                store_id: wx.getStorageSync("mdid")
            },
            success: function(t) {
                console.log(t.data), o.setData({
                    lblist: t.data
                });
            }
        });
    },
    reLoad: function() {
        var t = wx.getStorageSync("mdid");
        console.log(t), this.setData({
            store_id: t
        });
        var r = this, a = r.data.store_id;
        app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: a,
                type: 2
            },
            success: function(t) {
                console.log(t.data), r.setData({
                    store: t.data
                });
            }
        }), app.getUserInfo(function(t) {
            console.log(t);
            var e = wx.getStorageSync("UserData").id, o = r.data.store_id;
            console.log("uid", e, o), r.Coupons(), app.util.request({
                url: "entry/wxapp/DishesType",
                cachetime: "0",
                data: {
                    store_id: o,
                    type: 2
                },
                success: function(t) {
                    console.log(t.data);
                    var n = t.data;
                    0 == n.length ? r.setData({
                        nosp: !0,
                        isloading: !1
                    }) : app.util.request({
                        url: "entry/wxapp/Dishes",
                        cachetime: "0",
                        data: {
                            type_id: n[0].id,
                            type: 2
                        },
                        success: function(t) {
                            console.log(t.data);
                            for (var a = 0; a < t.data.length; a++) t.data[a].quantity = Number(t.data[a].quantity);
                            n[0].good = t.data, r.setData({
                                cpjzz: !1
                            }), app.util.request({
                                url: "entry/wxapp/MyCar",
                                cachetime: "0",
                                data: {
                                    store_id: o,
                                    user_id: e
                                },
                                success: function(t) {
                                    console.log(t);
                                    for (var a = t.data, e = 0; e < a.length; e++) for (var o = 0; o < n.length; o++) for (var s = 0; s < n[o].good.length; s++) a[e].good_id == n[o].good[s].id && (n[o].good[s].quantity = n[o].good[s].quantity + Number(a[e].num));
                                    for (var i = 0; i < t.data.length; i++) "0" == t.data[i].combination_id && (t.data[i].number = t.data[i].inventory), 
                                    t.data[i].num = Number(t.data[i].num), t.data[i].number = Number(t.data[i].number), 
                                    t.data[i].money = Number(t.data[i].money);
                                    console.log(n), r.setData({
                                        cart_list: t.data,
                                        dishes: n,
                                        nosp: !1,
                                        isloading: !1
                                    }), r.jstotalPrice();
                                }
                            });
                        }
                    });
                }
            });
        });
    },
    maketel: function(t) {
        var a = this.data.store.tel;
        wx.makePhoneCall({
            phoneNumber: a
        });
    },
    location: function() {
        var t = this.data.store.coordinates.split(","), a = this.data.store;
        console.log(t), wx.openLocation({
            latitude: parseFloat(t[0]),
            longitude: parseFloat(t[1]),
            address: a.address,
            name: a.name
        });
    },
    onReady: function() {},
    onShow: function() {
        this.reLoad();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    pjmore: function() {
        console.log("上拉加载", this.data.pagenum);
        this.data.mygd || !this.data.jzgd || this.data.isjzz || (this.setData({
            jzgd: !1
        }), this.getstorelist());
    }
});