var tongfudun = new function() {
    // base64
    function base64(a) {
        var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e, d, g, f, m, l;
        g = a.length;
        d = 0;
        for (e = ""; d < g;) {
            f = a.charCodeAt(d++) & 255;
            if (d == g) {
                e += c.charAt(f>>2);
                e += c.charAt((f & 3)<<4);
                e += "==";
                break
            }
            m = a.charCodeAt(d++);
            if (d == g) {
                e += c.charAt(f>>2);
                e += c.charAt((f & 3)<<4 | (m & 240)>>4);
                e += c.charAt((m & 15)<<2);
                e += "=";
                break
            }
            l = a.charCodeAt(d++);
            e += c.charAt(f>>2);
            e += c.charAt((f & 3)<<4 | (m & 240)>>4);
            e += c.charAt((m & 15)<<2 | (l & 192)>>6);
            e += c.charAt(l & 63)
        }
        return e
    }
    // randomBytes(length)
    function randomBytes(length) {
        length = length || 32;
        var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = c.length, d = "";
        for (var i = 0; i < length; i++)
            d += c.charAt(Math.floor(Math.random() * e));
        return d
    }
    // randomInt(top)
    function randomInt(top) {
        return Math.floor(Math.random() * (top + 1))
    }
    // addEvent(target, event, handler)
    function addEvent(target, event, handler) {
        try {
            target.addEventListener(event, handler, !1)
        } catch (d) {
            try {
                target.attachEvent("on" + event, handler)
            } catch (g) {
                target["on" + event] = handler
            }
        }
    }
    function getParams() {
        var i, src, scripts = document.scripts, d = {};
        for (i = scripts.length; 0 < i; i--)
            if ( - 1 !== scripts[i - 1].src.indexOf("dpa.js")) {
                src = scripts[i - 1].src;
                break
            }
        i = src.substring(src.indexOf("?"));
        if ( - 1 !== i.indexOf("?"))
            for (src = i.substr(1).split("&"), i = 0; i < src.length; i++)
                d[src[i].split("=")[0]] = decodeURIComponent(src[i].split("=")[1]);
        return d
    }
    function getFpUrl() {
        for (var scripts = document.scripts, src = "/", i = scripts.length; 0 < i; i--)
            if ( - 1 !== scripts[i - 1].src.indexOf("dpa.js")) {
                src = scripts[i - 1].src;
                break
            }
        return src.substring(0, src.lastIndexOf("/dpa") + 1) + "../fp/"
    }
    // decrypt string
    //function b(a, b) {
    //    for (var c = "", d = 0; d < a.length; d++)
    //        c += window.String.fromCharCode(((a.charCodeAt(d) -
    //            32^31 & d) + 95 - b)%95 + 32);
    //    return c
    //}
    var body = document.body;
    this.time = (new Date).getTime();
    this.appId;
    this.sessionId;
    this.ts;
    this.fpUrl;
    this.location;
    this.lastMoveTime;
    this.moveTimeList = [];
    this.keyTime;
    this.keyTimeList = [];
    this.addM = function(x, y) {
        //console.log("addM(" + x + "," + y + ");");
        if (this.moveTimeList && 100 > this.moveTimeList.length) {
            var now = (new Date).getTime(), timeOffset = this.lastMoveTime ? now - this.lastMoveTime: now;
            this.moveTimeList.push(x + "," + y + "," + timeOffset);
            this.lastMoveTime = now
        }
    };
    this.addK = function() {
        //console.log("addK();");
        if (this.keyTimeList && 100 > this.keyTimeList.length) {
            var now = (new Date).getTime(), b = this.keyTime ? now - this.keyTime: now;
            this.keyTimeList.push(b);
            this.keyTime = now
        }
    };
    this.cost = function() {
        console.log("cost();");
        var random = randomInt(65535), costTime = (new Date).getTime() - this.time + random;
        (new Image(1, 1)).src = this.fpUrl + "clean.png?appId=" + this.appId + "&sessionId=" + this.sessionId + "&c=" + costTime + "&r=" + random
    };
    this.go = function(f, q) {
        console.log("go();");
        debugger;
        if (this.moveTimeList && 0 < this.moveTimeList.length || this.keyTimeList && 0 < this.keyTimeList.length) {
            var e = randomBytes(3) + base64(randomBytes(3) + base64(this.moveTimeList.join(";")) + "|" + randomBytes(3) + base64(this.keyTimeList.join(","))), d = "____PEF" + randomInt(1E7) + "___", g = "___PESN" + randomBytes(10) + "____";
            window[d] = function(a) {
                0 === a ? f && "function" == typeof f && f() : q && "function" == typeof q && q();
                delete window[d];
                a = document.getElementById(g);
                a.parentNode.removeChild(a)
            };
            var k = document.createElement("script");
            k.type = "text/javascript";
            k.src = this.fpUrl + "profile.png?appId=" + this.appId + "&sessionId=" + this.sessionId + "&t=" + Math.random() + "&c=" + encodeURIComponent(d) + "&d=" + encodeURIComponent(e);
            k.id = g;
            body.insertBefore(k, body.lastChild);
            setTimeout(function() {
                if (window[d] && "function" == typeof window[d]) {
                    f && "function" == typeof f && f();
                    delete window[d];
                    var a = document.getElementById(g);
                    a.parentNode.removeChild(a)
                }
            }, 5E3);
            this.moveTimeList = [];
            this.lastMoveTime = null;
            this.keyTimeList = [];
            this.keyTime = null
        }
    };
    this.init = function() {
        console.log("init();");
        var params = getParams();
        this.appId = params.appId;
        this.sessionId = params.sessionId;
        this.ts = params.ts;
        this.fpUrl = getFpUrl();
        this.location = window.location.href;
        var eid = params.eid, div;
        "undefined" != typeof eid && "undefined" != typeof document.getElementById(eid) ? div = document.getElementById(eid) : div = document;
        (new Image(1, 1)).src = this.fpUrl + "clear.png?appId=" + this.appId + "&sessionId=" + this.sessionId + "&ts=" + this.ts + "&host=" + encodeURIComponent(this.location);
        var iframe = document.createElement("iframe");
        iframe.src = this.fpUrl + "payegisIfm.jsp?appId=" + this.appId + "&sessionId=" + this.sessionId + "&ts=" + this.ts + "&rid=" + Math.random() + "&host=" + encodeURIComponent(this.location);
        iframe.setAttribute("id", "payegisIfm");
        iframe.setAttribute("frameBorder", "0");
        iframe.setAttribute("border", "0");
        iframe.setAttribute("width", "1px");
        iframe.setAttribute("height", "1px");
        iframe.setAttribute("position", "absolute");
        iframe.setAttribute("right", "100%");
        iframe.setAttribute("top", "1%");
        body.insertBefore(iframe, body.lastChild);
        var tongfudun = this;
        addEvent(div, "mousemove", function(a) {
            tongfudun.addM(a.clientX, a.clientY)
        });
        addEvent(div, "keypress", function() {
            tongfudun.addK()
        });
        addEvent(div, "touchmove", function(a) {
            a = a.touches[0];
            tongfudun.addM(a.pageX, a.pageY)
        });
        addEvent(div, "touchstart", function(a) {
            a = a.touches[0];
            tongfudun.addM(a.pageX, a.pageY)
        });
        addEvent(div, "touchend", function(a) {
            a = a.touches[0];
            tongfudun.addM(a.pageX, a.pageY)
        });
        addEvent(window, "unload",
            function() {
                tongfudun.cost()
            });
        addEvent(window, "beforeunload", function() {
            tongfudun.cost()
        })
    }
};
function init() {
    "undefined" != typeof document.body && document.body ? tongfudun.init() : setTimeout(init, 10)
}
init();
window.PayEgisLockConfig = function() {
    // decrypt string
    //function a(a, b) {
    //    for (var d = "", c = 0; c < a.length; c++)
    //        d += m.String.fromCharCode(((a.charCodeAt(c) - 32^31 & c) + 95 - b)%95 + 32);
    //    return d
    //}
    function getIeVersion() {
        var version, matches = navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/);
        matches && (version = matches[1]);
        if (version) {
            if ("10.0" == version)
                return 10;
            if ("9.0" == version)
                return 9;
            if ("8.0" == version)
                return 8;
            if ("7.0" == version)
                return 7
        }
    }
    function getFpUrl() {
        for (var b = document.scripts, d = "/", c = b.length; 0 < c; c--)
            if ( - 1 !== b[c - 1].src.indexOf("dpa.js")) {
                d = b[c - 1].src;
                break
            }
        return d.substring(0, d.lastIndexOf("/dpa") + 1) + "../fp/"
    }
    function getParams() {
        var b, d, c = document.scripts, e = {};
        for (b = c.length; 0 < b; b--)
            if ( - 1 !== c[b - 1].src.indexOf("dpa.js")) {
                d = c[b - 1].src;
                break
            }
        b = d.substring(d.indexOf("?"));
        if ( - 1 !== b.indexOf("?"))
            for (d = b.substr(1).split("&"), b = 0; b < d.length; b++)
                e[d[b].split("=")[0]] = decodeURIComponent(d[b].split("=")[1]);
        return e
    }
    function addEvent(target, event, handler) {
        try {
            target.addEventListener(event, handler, !1)
        } catch (e) {
            try {
                target.attachEvent("on" + event, handler)
            } catch (g) {
                target["on" + event] = handler
            }
        }
    }
    function removeEvent(target, event, handler) {
        try {
            target.removeEventListener(event, handler, !1)
        } catch (e) {
            try {
                target.detachEvent("on" + event, handler)
            } catch (g) {
                target["on" + event] = null
            }
        }
    }
    function randomInt(top) {
        return Math.floor(Math.random() * (top + 1))
    }
    function randomBytes(length) {
        length = length || 32;
        var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", c = d.length, e = "";
        for (var i = 0; i < length; i++)
            e += d.charAt(Math.floor(Math.random() * c));
        return e
    }
    function base64(b) {
        var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c, e, g, h, f, m;
        g = b.length;
        e = 0;
        for (c = ""; e < g;) {
            h = b.charCodeAt(e++) & 255;
            if (e == g) {
                c += d.charAt(h>>2);
                c += d.charAt((h & 3)<<4);
                c += "==";
                break
            }
            f = b.charCodeAt(e++);
            if (e == g) {
                c += d.charAt(h>>2);
                c += d.charAt((h & 3)<<4 | (f & 240)>>4);
                c += d.charAt((f & 15)<<2);
                c += "=";
                break
            }
            m = b.charCodeAt(e++);
            c += d.charAt(h>>2);
            c += d.charAt((h & 3)<<4 | (f & 240)>>4);
            c += d.charAt((f & 15)<<2 | (m & 192)>>6);
            c += d.charAt(m & 63)
        }
        return c
    }
    function hideSlide() {
        var a = document.getElementById(p_slide);
        a.parentElement.removeChild(a)
    }
    function hideLock() {
        1 == t.p_stay ? t.p_tip &&
        (document.getElementById(p_tip).style.display = "block") : hideSlide()
    }
    function addMove(x, y) {
        console.log("addMove(" + x + "," + y + ");");
        1 == _this.moving&&-1 == _this.lastX&&-1 == _this.lastY && (_this.lastX = parseInt(x), _this.lastY = parseInt(y));
        if (1 == _this.moving && _this.moveTimeList && 100 > _this.moveTimeList.length && Math.abs(parseInt(x) - _this.lastX) <= backWidth && Math.abs(parseInt(y) - _this.lastY) <= backHeight) {
            var now = (new Date).getTime(), time = _this.lastMoveTime ? now - _this.lastMoveTime: now;
            _this.moveTimeList.push(x + "," + y + "," + time);
            _this.lastMoveTime = now
        }
    }
    function unload_handle() { // !!!
        console.log("unload_handle();");
        var c = randomInt(65535), e = (new Date).getTime() - _this.time + c;
        (new Image(1, 1)).src = _this.fpUrl + "clean.png?appId=" + _this.appId + "&sessionId=" + _this.sessionId + "&c=" + e + "&r=" + c
    }
    function profile(success, failed, p_waiting) {
        console.log("profile();");
        if (_this.moveTimeList && 0 < _this.moveTimeList.length ||
            _this.keyTimeList && 0 < _this.keyTimeList.length) {
            var params = getParams(),
                q = params.appId,
                sessionId = params.sessionId,
                h = getFpUrl(),
                n = randomBytes(3) + base64(randomBytes(3) + base64(_this.buffer.get().join(";") + "#" + _this.moveTimeList.join(";")) + "|" + randomBytes(3) + base64(_this.keyTimeList.join(","))),
                p = "____PEF" + randomInt(1E7) + "___",
                z = "___PESN" + randomBytes(10) + "____";
            console.log("appId: " + q);
            console.log("sessionId: " + sessionId);
            console.log("url: " + h);
            console.log("buffer: " + JSON.stringify(_this.buffer.get()));
            console.log("moveTimeList: " + JSON.stringify(_this.moveTimeList));
            console.log("moveTimeList: " + JSON.stringify(_this.keyTimeList));
            console.log("p: " + p);
            console.log("z: " + z);
            debugger;
            n = randomBytes(3) + base64(randomBytes(3) + base64(_this.buffer.get().join(";") + "#" + _this.moveTimeList.join(";")) + "|" + randomBytes(3) + base64(_this.keyTimeList.join(","))),
                window[p] = function(b) {
                0 === b ? success && "function" == typeof success && success() : failed && "function" == typeof failed && failed();
                try {
                    delete window[p]
                } catch (c) {
                    window[p] = null
                }
                b = document.getElementById(z);
                b.parentNode.removeChild(b);
                (b = document.getElementById(p_waiting)) &&
                (b.style.display = "none")
            };
            var w = document.createElement("script");
            w.type = "text/javascript";
            w.src = h + "profile.png?appId=" + q + "&sessionId=" + sessionId + "&t=" + Math.random() + "&c=" + encodeURIComponent(p) + "&d=" + encodeURIComponent(n);
            w.id = z;
            body.insertBefore(w, body.lastChild);
            (q = document.getElementById(p_waiting)) && (q.style.display = "block");
            setTimeout(function() {
                if (window[p] && "function" ==
                    typeof window[p]) {
                    success && "function" == typeof success && success();
                    try {
                        delete window[p]
                    } catch (b) {
                        window[p] = null
                    }
                    var c = document.getElementById(z);
                    c.parentNode.removeChild(c);
                    (c = document.getElementById(p_waiting)) && (c.style.display = "none")
                }
            }, 1E4);
            _this.moveTimeList = [];
            _this.lastMoveTime = null;
            _this.keyTimeList = [];
            _this.keyTime = null;
            _this.moving = false;
            _this.lastX =- 1;
            _this.lastY =- 1
        }
    }
    function start(block, container, success, failed) {
        console.log("start();");
        function touchstart(event) {
            event.preventDefault();
            console.log("moving = true;");
            _this.moving=true;
            var g = event.touches[0];
            addMove(g.pageX, g.pageY);
            if (1 == event.targetTouches.length) {
                w = event.targetTouches[0].pageX - block.offsetLeft;
                var touchmove = function(c) {
                    c.preventDefault();
                    var d = c.touches[0];
                    addMove(d.pageX, d.pageY);
                    1 == c.targetTouches.length && (c = c.targetTouches[0].pageX - w, 0 > c && (c = 0), c > t && (c = t), block.style.left = c + "px")
                }, touchend = function(c) {
                    removeEvent(block, "touchmove", touchmove);
                    removeEvent(block, "touchend", touchend);
                    block.offsetLeft >= t ? clean(t, function() {
                        profile(function() {
                            removeEvent(block, "touchstart", touchstart);
                            hideLock();
                            success && "function" == typeof success && success()
                        }, function() {
                            clean(0);
                            failed && "function" == typeof failed && failed()
                        }, p_waiting)
                    }) : clean(0);
                    c.stopPropagation()
                };
                addEvent(block, "touchmove", touchmove);
                addEvent(block, "touchend", touchend)
            }
        }
        function mousedown(event) {
            function mouseup(event) {
                event = event ? event : window.event;
                removeEvent(document, "mousemove", mousemove);
                removeEvent(document, "mouseup", mouseup);
                addMove(event.clientX, event.clientY);
                removeEvent(block, "mousedown", mousedown);
                block.offsetLeft >= t ? clean(t, function() {
                    profile(function() {
                        hideLock();
                        success && "function" == typeof success && success()
                    }, function() {
                        addEvent(block, "mousedown", mousedown);
                        clean(0);
                        failed && "function" == typeof failed && failed()
                    }, p_waiting)
                }) : (addEvent(block, "mousedown", mousedown), clean(0))
            }
            function mousemove(event) {
                event = event ? event : window.event;
                var d = event.clientX - w;
                addMove(event.clientX, event.clientY);
                0 > d && (d = 0);
                d > t && (d = t);
                block.style.left = d + "px"
            }
            event = event ? event : window.event;
            w = event.clientX - block.offsetLeft;
            console.log("moving = true;");
            _this.moving=true;
            var z = document.getElementById(p_info);
            z && (z.style.visibility = "hidden");
            addMove(event.clientX, event.clientY);
            addEvent(document, "mousemove", mousemove);
            addEvent(document, "mouseup", mouseup)
        }
        function clean(offset, handle) {
            console.log("clean(" + offset + "," + handle + ");");
            block.timer && clearInterval(block.timer);
            block.timer = setInterval(function() {
                var r = (offset - block.offsetLeft) / 5, r = 0 < r ? Math.ceil(r): Math.floor(r);
                if (0 != offset && block.offsetLeft >= offset)
                    clearInterval(block.timer), handle && handle();
                else {
                    _this.moveTimeList = [];
                    _this.lastMoveTime = null;
                    _this.keyTimeList = [];
                    _this.keyTime = null;
                    _this.moving=false;
                    _this.lastX =- 1;
                    _this.lastY =- 1;
                    var f = document.getElementById(p_info);
                    f && (f.style.visibility = "visible");
                    f = 0;
                    8 == ieVersion ? (0 != offset ? f = r + block.offsetLeft : f = r + block.offsetLeft - u, block.style.left = f + "px", 0 >= f && (block.style.left = "0px", clearInterval(block.timer))) : (f = r + block.offsetLeft, block.style.left = f + "px", 0 >= f && clearInterval(block.timer))
                }
            }, 30)
        }
        var u = parseInt(container.style.borderLeftWidth), ieVersion = getIeVersion(), w = 0, t = container.clientWidth - block.offsetWidth;
        addEvent(block, "mousedown", mousedown);
        addEvent(document, "keypress", function() {
            if (_this.keyTimeList && 100 > _this.keyTimeList.length) {
                var a = (new Date).getTime(), b = 0, b = _this.keyTime ? a - _this.keyTime: a;
                _this.keyTimeList.push(b);
                _this.keyTime = a
            }
        });
        addEvent(block, "touchstart", touchstart);
        addEvent(window, "unload", function() {
            unload_handle()
        });
        addEvent(window, "beforeunload", function() {
            unload_handle()
        });
        addEvent(document, "mouseup", function(event) {
            0 == _this.moving && _this.buffer.push(event.clientX + "," + event.clientY + "," + (new Date).getTime())
        });
        addEvent(document, "mousemove", function(event) {
            0 == _this.moving && _this.buffer.push(event.clientX + "," + event.clientY + "," + (new Date).getTime())
        });
        addEvent(document, "mousedown", function(event) {
            0 == _this.moving && _this.buffer.push(event.clientX + "," + event.clientY + "," + (new Date).getTime())
        });
        addEvent(document, "touchmove", function(event) {
            0 ==
            _this.moving && (event = event.touches[0], _this.buffer.push(event.pageX + "," + event.pageY + "," + (new Date).getTime()))
        });
        addEvent(document, "touchstart", function(event) {
            0 == _this.moving && (event = event.touches[0], _this.buffer.push(event.pageX + "," + event.pageY + "," + (new Date).getTime()))
        });
        addEvent(document, "touchend", function(event) {
            0 == _this.moving && (event = event.touches[0], _this.buffer.push(event.pageX + "," + event.pageY + "," + (new Date).getTime()))
        })
    }
    var _this = this, body = document.body, backWidth, backHeight, t = {}, p_slide =
        "p_slide", p_block = "p_block", p_info = "p_info", p_waiting = "p_waiting", p_lock = "p_lock", p_tip = "p_tip";
    _this.buffer = new function() {
        var _this = this;
        _this.length = 0;
        _this.size = 0;
        _this.data = [];
        _this.init = function(size) {
            _this.length = 0;
            _this.size = size;
            _this.data = []
        };
        _this.push = function(element) {
            console.log("buffer.push(" + element + ");");
            _this.length = _this.data.push(element);
            _this.length > _this.size && (console.log("buffer shift.."), _this.data.shift())
        };
        _this.get = function() {
            return _this.data
        }
    };
    _this.moving=false;
    _this.lastMoveTime;
    _this.moveTimeList = [];
    _this.keyTime;
    _this.keyTimeList = [];
    _this.lastX =- 1;
    _this.lastY =- 1;
    _this.removeSlide = function() {
        hideSlide()
    };
    _this.makeSlide = function(container, data, success, failed) {
        console.log("makeSlide();");
        t.p_back = data.back;
        t.p_font = data.font;
        t.p_arrow = data.arrow;
        t.p_tip = data.tip;
        t.p_waiting = data.waiting;
        t.p_stay = data.stay;
        var _div = document.createElement("div");
        _div.id = p_slide;
        document.getElementById(container).appendChild(_div);
        var h = data.back.width;
        backWidth = h;
        var n = data.back.height;
        backHeight = n;
        container = document.createElement("div");
        container.id = p_block;
        container.style.height = n + "px";
        container.style.width = h + "px";
        data.back.border && (container.style.border = data.back.border);
        data.back.color ? container.style.background =
            data.back.color : data.back.url && (h = data.back.left, n = data.back.top, h || (h = 0), n || (n = 0), container.style.background = "url(" + data.back.url + ") " + h + "px " + n + "px no-repeat");
        container.style.position = "relative";
        container.style.display = "block";
        container.style.cursor = "pointer";
        _div.appendChild(container);
        data.tip && (h = document.createElement("img"), h.id = p_tip, h.src = data.tip.url, h.style.display = "none", h.style.position = "relative", h.style.top = data.tip.top +
            "px", h.style.left = data.tip.left + "px", _div.appendChild(h));
        data.waiting && (h = document.createElement("img"), h.id = p_waiting, h.src = data.waiting.url, h.style.display = "none", h.style.position = "relative", h.style.top = data.waiting.top + "px", h.style.left = data.waiting.left + "px", _div.appendChild(h));
        data.font && (h = document.getElementById(p_block), n = document.createElement("span"), n.id = p_info, n.innerHTML = data.font.content, n.style.position = "relative", data.font.size && (n.style.fontSize = data.font.size + "px"), data.font.family && (n.style.fontFamily = data.font.family), data.font.style && (n.style.fontStyle = data.font.style), data.font.weight && (n.style.fontWeight = data.font.weight), data.font.color && (n.style.color = data.font.color), data.font.top && (n.style.top = data.font.top + "px"), data.font.left &&
        (n.style.left = data.font.left + "px"), h.appendChild(n));
        var h = data.arrow.width, n = data.arrow.height, p = document.getElementById(p_block), block = document.createElement("div");
        block.id = p_lock;
        block.style.position = "relative";
        block.style.top = data.arrow.top + "px";
        block.style.left = data.arrow.left + "px";
        block.style.height = n + "px";
        block.style.width = h + "px";
        block.style.cursor = "pointer";
        block.style.background = "url(" + data.arrow.url + ") 0 0 no-repeat";
        p.appendChild(block);
        _this.buffer.init(5);
        start(block, container, success, failed);
        return _div
    }
};
