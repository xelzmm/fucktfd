var wb = new
    function() {
        function W(W) {
            var Y = -1;
            try {
                Y = W.GetVariable("$version")
            } catch(M) {}
            return Y
        }
        var Y = this;
        Y.H = !1;
        Y.raw = "";
        Y.Y = -1;
        Y.S = -1;
        Y.R = -1;
        Y.$ = "";
        var t = [{
            name: "ShockwaveFlash.ShockwaveFlash.7",
            version: function(Y) {
                return W(Y)
            }
        },
            {
                name: "ShockwaveFlash.ShockwaveFlash.6",
                version: function(Y) {
                    var O = "6,0,21";
                    try {
                        Y.L = "always",
                            O = W(Y)
                    } catch(M) {}
                    return O
                }
            },
            {
                name: "ShockwaveFlash.ShockwaveFlash",
                version: function(Y) {
                    return W(Y)
                }
            }];
        Y.A = function(W) {
            return Y.Y >= W
        };
        Y.O = function(W) {
            return Y.S >= W
        };
        Y.l = function(W) {
            return Y.R >= W
        };
        Y.g = function(W) {
            var O = [Y.Y, Y.S, Y.R],
                M = Math.min(O.length, arguments.length);
            for (i = 0; i < M; i++) if (O[i] >= arguments[i]) {
                if (! (i + 1 < M && O[i] == arguments[i])) return ! 0
            } else return ! 1
        };
        Y.b = function() {
            var W, O, M, l, Rb;
            if (navigator.plugins && 0 < navigator.plugins.length) {
                var u = navigator.mimeTypes;
                if (u && u["application/x-shockwave-flash"] && u["application/x-shockwave-flash"].enabledPlugin && u["application/x-shockwave-flash"].enabledPlugin.description) {
                    u = u["application/x-shockwave-flash"].enabledPlugin.description;
                    W = u.split(/ +/);
                    M = W[2].split(/\./);
                    var p = W[3];
                    W = u;
                    O = parseInt(M[0], 10);
                    M = parseInt(M[1], 10);
                    l = p;
                    Rb = parseInt(p.replace(/[a-zA-Z]/g, ""), 10) || Y.R;
                    Y.raw = W;
                    Y.Y = O;
                    Y.S = M;
                    Y.$ = l;
                    Y.R = Rb;
                    Y.H = !0
                }
            } else if ( - 1 == navigator.appVersion.indexOf("Mac") && window.execScript) for (u = -1, p = 0; p < t.length && -1 == u; p++) {
                W = -1;
                try {
                    W = new ActiveXObject(t[p].name)
                } catch(Db) {
                    W = {
                        J: !0
                    }
                }
                W.J || (Y.H = !0, u = t[p].version(W), -1 != u && (l = u.split(","), W = u, O = parseInt(l[0].split(" ")[1], 10), M = parseInt(l[1], 10), Rb = parseInt(l[2], 10), l = l[2], Y.raw = W, Y.Y = O, Y.S = M, Y.R = Rb, Y.$ = l))
            }
        } ()
    };
wb.X = "1.0.4";
var _host = window.location.host,
    _swf = document.getElementById("swf");
1 == wb.H && (_swf.innerHTML = '<object id="payegisSwf" height="1" width="1" data="' + document.location.protocol + "//" + _host + '/did/fp/swf/payegisFp.swf" type="application/x-shockwave-flash"><param name="movie" name="payegisSwf" value="' + document.location.protocol + "//" + _host + '/did/fp/swf/payegisFp.swf" />' + ('<param name="flashVars" value="appId=16490&sessionId=259E6E6F5092EA217B440EF881A8B9D0&url=' + document.location.protocol + "//" + _host + '/did/fp/fl" />') + "</object>");
var _date = new Date,
    x = {
        enabled: wb.H,
        flash_object: void 0,
        try_count: 4,
        info: "",
        rand_id: "",
        timeout: void 0
    };
function decrypt(W, Y) {
    for (var t = "",
             Kb = 0; Kb < W.length; Kb++) t += window.String.fromCharCode(((W.charCodeAt(Kb) - 32 ^ 31 & Kb) + 95 - Y) % 95 + 32);
    return t
}
function ZX() {
    if (x.enabled && 0 !== x.try_count--) try {
        var W = x.flash_object = document.getElementById("payegisSwf");
        x.info = W.payegis_getFlashInfo();
        x.rand_id = W.payegis_getFlashId();
        x.timeout && clearTimeout(x.timeout)
    } catch(Y) {
        x.timeout = setTimeout(ZX, 200)
    }
}
var vX = new
    function() {
        function W(W, v) {
            var G = "";
            v = parseInt(v);
            for (var a = 0; a < W.length; a++) G += S.String.fromCharCode(((W.charCodeAt(a) - 32 ^ 31 & a) + 95 - v) % 95 + 32);
            return G
        }
        function Y(N) {
            try {
                N.transaction([Vb], "readonly").objectStore(Vb).get(0).onsuccess = function(v) {
                    if (v = v.target.result) y.indexedDbId = v.value
                }
            } catch(v) {}
        }
        function t(N) {
            try {
                N.transaction(function(v) {
                    v.executeSql("SELECT * FROM randomId", [],
                        function(G, v) {
                            if (0 < v.rows.length) {
                                var Z = v.rows.item(0).val;
                                Z && (y.webDbId = Z)
                            }
                        },
                        function() {})
                })
            } catch(v) {}
        }
        function Kb() {
            var N = S.webkitRTCPeerConnection || S.mozRTCPeerConnection || S.RTCPeerConnection;
            if (N) {
                var v = function(W) {
                        var G = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
                        try {
                            var v = G.exec(W)[1];
                            void 0 === a[v] && yb.push(v);
                            a[v] = !0
                        } catch(N) {}
                    },
                    G,
                    a = {};
                try {
                    G = new N({
                        iceServers: [{
                            url: "stun:stun.services.mozilla.com"
                        }]
                    })
                } catch(Z) {}
                try {
                    void 0 === G && (G = new N({
                        iceServers: []
                    }))
                } catch(Z) {}
                if (G || S.mozRTCPeerConnection) try {
                    G.createDataChannel("chat", {
                        reliable: !1
                    })
                } catch(Z) {}
                G && (G.onicecandidate = function(W) {
                    W.candidate && v(W.candidate.candidate)
                },
                    G.createOffer(function(W) {
                            G.setLocalDescription(W,
                                function() {},
                                function() {})
                        },
                        function() {}), setTimeout(function() {
                        try {
                            G.localDescription.sdp.split("\n").forEach(function(Z) {
                                0 === Z.indexOf("a=candidate:") && v(Z)
                            })
                        } catch(Z) {}
                    },
                    800))
            }
            try {
                S.MediaStreamTrack && S.MediaStreamTrack.getSources && S.MediaStreamTrack.getSources(function(Z) {
                    for (var G = [], v = 0; v < Z.length; v++) G.push(Z[v].kind + ";" + Z[v].label + ";" + Z[v].id);
                    qb = G.sort().join("|")
                })
            } catch(Z) {}
        }
        function O() {
            function W(G) {
                var v = {};
                Z.style.fontFamily = G;
                a.appendChild(Z);
                v.height = Z.offsetHeight;
                v.width = Z.offsetWidth;
                a.removeChild(Z);
                return v
            }
            var v = ["monospace", "sans-serif", "serif"],
                G = [],
                a = mb,
                Z = b.createElement("span");
            Z.style.fontSize = "72px";
            Z.style.visibility = "hidden";
            Z.innerHTML = "mmmmmmmmmmlli";
            for (var L = 0; L < v.length; L++) G[L] = W(v[L]);
            this.T = function(Z) {
                for (var a = 0; a < G.length; a++) {
                    var V = W(Z + "," + v[a]),
                        d = G[a];
                    if (V.height !== d.height || V.width !== d.width) return ! 0
                }
                return ! 1
            }
        }
        function M() {
            var N, v = "./detect.jsp?" + Ab.random();
            try {
                N = new(S.XMLHttpRequest)
            } catch(G) {}
            if (!N) try {
                N = new(S.ActiveXObject)("Microsoft.XMLHTTP")
            } catch(G) {}
            if (!N) try {
                N = new(S.ActiveXObject)("Msxml2.XMLHTTP")
            } catch(G) {}
            if (!N) try {
                N = new(S.ActiveXObject)("Msxml3.XMLHTTP")
            } catch(G) {}
            if (N) {
                N.onreadystatechange = function() {
                    4 === N.readyState && 200 === N.status && (Mb = N.getResponseHeader("Via") || N.getResponseHeader("X-Cache") ? !0 : !1)
                };
                try {
                    N.open("POST", v, !0),
                    "function" == typeof N.setRequestHeader && N.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"),
                        N.send(null)
                } catch(G) {}
            }
        }
        function l(N) {
            var v = {};
            v.name = N.name;
            v.filename = N.filename.toLowerCase();
            v.description = N.description;
            void 0 !== N.version && (v.version = N.version);
            v.mimeTypes = [];
            for (var G = 0; N.length > G; G++) {
                var a = N[G],
                    Z = {};
                Z.description = a.description;
                Z.suffixes = a.suffixes;
                Z.type = a.type;
                v.mimeTypes.push(Z)
            }
            return v
        }
        function Rb(N) {
            var v = W("PE>\\#QsstX,YRn+0uci0[I-gah'Bd9SamCxl`RFt?hW)qNhArB|KNbva&L[:Y=HD", "12"),
                G = sb,
                a = Cb,
                Z,
                L,
                Y,
                H,
                V,
                d;
            Y = N.length;
            L = 0;
            for (Z = ""; L < Y;) {
                H = N.charCodeAt(L++) & 255;
                if (L == Y) {
                    Z += v.charAt(H >> 2);
                    Z += v.charAt((H & 3) << 4);
                    Z += "==";
                    break
                }
                V = N.charCodeAt(L++);
                if (L == Y) {
                    Z += v.charAt(H >> 2);
                    Z += v.charAt((H & 3) << 4 | (V & 240) >> 4);
                    Z += v.charAt((V & 15) << 2);
                    Z += "=";
                    break
                }
                d = N.charCodeAt(L++);
                Z += v.charAt(H >> 2);
                Z += v.charAt((H & 3) << 4 | (V & 240) >> 4);
                Z += v.charAt((V & 15) << 2 | (d & 192) >> 6);
                Z += v.charAt(d & 63)
            }
            return G + Z + a
        }
        function u(str) {
            var v = "",
                G, a = str.length,
                Z;
            for (G = 0; G < a; G++) Z = str.charCodeAt(G),
                1 <= Z && 127 >= Z ? v += str.charAt(G) : (2047 < Z ? (v += String.fromCharCode(224 | Z >> 12 & 15), v += String.fromCharCode(128 | Z >> 6 & 63)) : v += String.fromCharCode(192 | Z >> 6 & 31), v += String.fromCharCode(128 | Z >> 0 & 63));
            return v
        }
        function p() {
            var N = {},
                v = b.getElementById("payegis_user_data");
            try {
                var G = b.cookie.replace(/(?:(?:^|.*;\s*)__upayegisid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                0 !== G.length && (N.cookie = G)
            } catch(a) {}
            try {
                S.localStorage && null !== S.localStorage && 0 !== S.localStorage.length && (N.localStorage = S.localStorage.getItem("__upayegisid"))
            } catch(a) {}
            x.rand_id && (N.flash = x.rand_id);
            try {
                S.sessionStorage && null !== S.sessionStorage && (N.sessionStorage = S.sessionStorage.__upayegisid)
            } catch(a) {}
            try {
                S.globalStorage && (N.globalStorage = S.globalStorage[".localdomain"].__upayegisid)
            } catch(a) {}
            try {
                v && "function" == typeof v.load && "function" == typeof v.getAttribute && (v.load("payegis_user_data"), N.userData = v.getAttribute("__upayegisid"))
            } catch(a) {}
            try {
                y.indexedDbId && (N.indexedDb = y.indexedDbId)
            } catch(a) {}
            try {
                y.webDbId && (N.webDb = y.webDbId)
            } catch(a) {}
            return N
        }
        function Db(N) {
            try {
                var v = y.db;
                v && v.transaction([Vb], "readwrite").objectStore(Vb).put({
                    id: 0,
                    value: N
                })
            } catch(a) {}
            try {
                var G = y.webDb;
                G && G.transaction(function(G) {
                    G.executeSql("INSERT INTO randomId(id, val) VALUES(?, ?)", [0, N],
                        function() {},
                        function() {});
                    G.executeSql("UPDATE randomId SET val = ? WHERE id = ?", [N, 0],
                        function() {},
                        function() {})
                })
            } catch(a) {}
        }
        function RX(W) {
            function v() {
                this.G = this.W = 0
            }
            function G() {
                this.j = this.a = this.K = null;
                this.Z = this.V = this.o = this.N = 0
            }
            function a(W, G, K) {
                this.I = W;
                this.M = G;
                this.D = K
            }
            function Z() {
                this.next = null;
                this.v = 0;
                this.C = Array(8192);
                this.m = 0
            }
            function Y(W) {
                pb[X + w++] = W;
                if (8192 == X + w && 0 != w) {
                    var G;
                    null != kb ? (W = kb, kb = kb.next) : W = new Z;
                    W.next = null;
                    W.v = W.m = 0;
                    null == q ? q = vb = W: vb = vb.next = W;
                    W.v = w - X;
                    for (G = 0; G < W.v; G++) W.C[G] = pb[X + G];
                    w = X = 0
                }
            }
            function S(W) {
                W &= 65535;
                8190 > X + w ? (pb[X + w++] = W & 255, pb[X + w++] = W >>> 8) : (Y(W & 255), Y(W >>> 8))
            }
            function H() {
                h = (h << 5 ^ m[C + 3 - 1] & 255) & 8191;
                Sb = P[32768 + h];
                P[C & 32767] = Sb;
                P[32768 + h] = C
            }
            function V(W, G) {
                r(G[W].W, G[W].G)
            }
            function d(W, G, K) {
                return W[G].W < W[K].W || W[G].W == W[K].W && E[G] <= E[K]
            }
            function k(W, G, K) {
                var Z;
                for (Z = 0; Z < K && ib < Ob.length; Z++) W[G + Z] = Ob.charCodeAt(ib++) & 255;
                return Z
            }
            function y(W) {
                var G = yb,
                    K = C,
                    Z, R = c,
                    v = 32506 < C ? C - 32506 : 0,
                    a = C + 258,
                    N = m[K + R - 1],
                    V = m[K + R];
                c >= qb && (G >>= 2);
                do
                    if (Z = W, m[Z + R] == V && m[Z + R - 1] == N && m[Z] == m[K] && m[++Z] == m[K + 1]) {
                        K += 2;
                        for (Z++; m[++K] == m[++Z] && m[++K] == m[++Z] && m[++K] == m[++Z] && m[++K] == m[++Z] && m[++K] == m[++Z] && m[++K] == m[++Z] && m[++K] == m[++Z] && m[++K] == m[++Z] && K < a;);
                        Z = 258 - (a - K);
                        K = a - 258;
                        if (Z > R) {
                            Jb = W;
                            R = Z;
                            if (258 <= Z) break;
                            N = m[K + R - 1];
                            V = m[K + R]
                        }
                    }
                while ((W = P[W & 32767]) > v && 0 != --G);
                return R
            }
            function D() {
                var W, Z, K = 65536 - f - C;
                if ( - 1 == K) K--;
                else if (65274 <= C) {
                    for (W = 0; 32768 > W; W++) m[W] = m[W + 32768];
                    Jb -= 32768;
                    C -= 32768;
                    Wb -= 32768;
                    for (W = 0; 8192 > W; W++) Z = P[32768 + W],
                        P[32768 + W] = 32768 <= Z ? Z - 32768 : 0;
                    for (W = 0; 32768 > W; W++) Z = P[W],
                        P[W] = 32768 <= Z ? Z - 32768 : 0;
                    K += 32768
                }
                ab || (W = k(m, C + f, K), 0 >= W ? ab = !0 : f += W)
            }
            function T(W, Z) {
                var K;
                if (!mb) {
                    if (!ab) {
                        n = Gb = 0;
                        var G, R;
                        if (0 == $b[0].G) {
                            U.K = Zb;
                            U.a = ob;
                            U.j = rb;
                            U.N = 257;
                            U.o = 286;
                            U.V = 15;
                            U.Z = 0;
                            B.K = Nb;
                            B.a = $b;
                            B.j = Lb;
                            B.N = 0;
                            B.o = 30;
                            B.V = 15;
                            B.Z = 0;
                            db.K = z;
                            db.a = null;
                            db.j = Ab;
                            db.N = 0;
                            db.o = 19;
                            db.V = 7;
                            for (R = G = db.Z = 0; 28 > R; R++) for (tb[R] = G, K = 0; K < 1 << rb[R]; K++) bb[G++] = R;
                            bb[G - 1] = R;
                            for (R = G = 0; 16 > R; R++) for (lb[R] = G, K = 0; K < 1 << Lb[R]; K++) ub[G++] = R;
                            for (G >>= 7; 30 > R; R++) for (lb[R] = G << 7, K = 0; K < 1 << Lb[R] - 7; K++) ub[256 + G++] = R;
                            for (K = 0; 15 >= K; K++) g[K] = 0;
                            for (K = 0; 143 >= K;) ob[K++].G = 8,
                                g[8]++;
                            for (; 255 >= K;) ob[K++].G = 9,
                                g[9]++;
                            for (; 279 >= K;) ob[K++].G = 7,
                                g[7]++;
                            for (; 287 >= K;) ob[K++].G = 8,
                                g[8]++;
                            O(ob, 287);
                            for (K = 0; 30 > K; K++) $b[K].G = 5,
                                $b[K].W = Rb(K, 5);
                            u()
                        }
                        for (K = 0; 8192 > K; K++) P[32768 + K] = 0;
                        cb = nb[fb].M;
                        qb = nb[fb].I;
                        yb = nb[fb].D;
                        Wb = C = 0;
                        f = k(m, 0, 65536);
                        if (0 >= f) ab = !0,
                            f = 0;
                        else {
                            for (ab = !1; 262 > f && !ab;) D();
                            for (K = h = 0; 2 > K; K++) h = (h << 5 ^ m[K] & 255) & 8191
                        }
                        q = null;
                        X = w = 0;
                        3 >= fb ? (c = 2, I = 0) : (I = 2, Xb = 0);
                        xb = !1
                    }
                    mb = !0;
                    if (0 == f) return xb = !0,
                        0
                }
                if ((K = A(W, 0, Z)) == Z) return Z;
                if (xb) return K;
                if (3 >= fb) for (; 0 != f && null == q;) {
                    H();
                    0 != Sb && 32506 >= C - Sb && (I = y(Sb), I > f && (I = f));
                    if (3 <= I) if (R = e(C - Jb, I - 3), f -= I, I <= cb) {
                        I--;
                        do C++,
                            H();
                        while (0 != --I);
                        C++
                    } else C += I,
                        I = 0,
                        h = m[C] & 255,
                        h = (h << 5 ^ m[C + 1] & 255) & 8191;
                    else R = e(0, m[C] & 255),
                        f--,
                        C++;
                    R && (p(0), Wb = C);
                    for (; 262 > f && !ab;) D()
                } else for (; 0 != f && null == q;) {
                    H();
                    c = I;
                    Db = Jb;
                    I = 2;
                    0 != Sb && c < cb && 32506 >= C - Sb && (I = y(Sb), I > f && (I = f), 3 == I && 4096 < C - Jb && I--);
                    if (3 <= c && I <= c) {
                        R = e(C - 1 - Db, c - 3);
                        f -= c - 1;
                        c -= 2;
                        do C++,
                            H();
                        while (0 != --c);
                        Xb = 0;
                        I = 2;
                        C++;
                        R && (p(0), Wb = C)
                    } else 0 != Xb ? e(0, m[C - 1] & 255) && (p(0), Wb = C) : Xb = 1,
                        C++,
                        f--;
                    for (; 262 > f && !ab;) D()
                }
                0 == f && (0 != Xb && e(0, m[C - 1] & 255), p(1), xb = !0);
                return K + A(W, K + 0, Z - K)
            }
            function A(W, Z, K) {
                var G, R, v;
                for (G = 0; null != q && G < K;) {
                    R = K - G;
                    R > q.v && (R = q.v);
                    for (v = 0; v < R; v++) W[Z + G + v] = q.C[q.m + v];
                    q.m += R;
                    q.v -= R;
                    G += R;
                    0 == q.v && (R = q, q = q.next, R.next = kb, kb = R)
                }
                if (G == K) return G;
                if (X < w) {
                    R = K - G;
                    R > w - X && (R = w - X);
                    for (v = 0; v < R; v++) W[Z + G + v] = pb[X + v];
                    X += R;
                    G += R;
                    w == X && (w = X = 0)
                }
                return G
            }
            function u() {
                var W;
                for (W = 0; 286 > W; W++) Zb[W].W = 0;
                for (W = 0; 30 > W; W++) Nb[W].W = 0;
                for (W = 0; 19 > W; W++) z[W].W = 0;
                Zb[256].W = 1;
                Tb = jb = gb = Ub = Hb = Ib = 0;
                zb = 1
            }
            function M(W, G) {
                for (var K = Q[G], Z = G << 1; Z <= Yb;) {
                    Z < Yb && d(W, Q[Z + 1], Q[Z]) && Z++;
                    if (d(W, K, Q[Z])) break;
                    Q[G] = Q[Z];
                    G = Z;
                    Z <<= 1
                }
                Q[G] = K
            }
            function O(W, G) {
                var K = Array(16),
                    Z = 0,
                    R;
                for (R = 1; 15 >= R; R++) Z = Z + g[R - 1] << 1,
                    K[R] = Z;
                for (Z = 0; Z <= G; Z++) R = W[Z].G,
                0 != R && (W[Z].W = Rb(K[R]++, R))
            }
            function b(W) {
                var Z = W.K,
                    K = W.a,
                    G = W.o,
                    R, v = -1,
                    a = G;
                Yb = 0;
                Qb = 573;
                for (R = 0; R < G; R++) 0 != Z[R].W ? (Q[++Yb] = v = R, E[R] = 0) : Z[R].G = 0;
                for (; 2 > Yb;) R = Q[++Yb] = 2 > v ? ++v: 0,
                    Z[R].W = 1,
                    E[R] = 0,
                    Hb--,
                null != K && (Ib -= K[R].G);
                W.Z = v;
                for (R = Yb >> 1; 1 <= R; R--) M(Z, R);
                do R = Q[1],
                    Q[1] = Q[Yb--],
                    M(Z, 1),
                    K = Q[1],
                    Q[--Qb] = R,
                    Q[--Qb] = K,
                    Z[a].W = Z[R].W + Z[K].W,
                    E[a] = E[R] > E[K] + 1 ? E[R] : E[K] + 1,
                    Z[R].G = Z[K].G = a,
                    Q[1] = a++,
                    M(Z, 1);
                while (2 <= Yb);
                Q[--Qb] = Q[1];
                a = W.K;
                R = W.j;
                var G = W.N,
                    K = W.Z,
                    N = W.V,
                    V = W.a,
                    H, d, Y, S, L = 0;
                for (d = 0; 15 >= d; d++) g[d] = 0;
                a[Q[Qb]].G = 0;
                for (W = Qb + 1; 573 > W; W++) H = Q[W],
                    d = a[a[H].G].G + 1,
                d > N && (d = N, L++),
                    a[H].G = d,
                H > K || (g[d]++, Y = 0, H >= G && (Y = R[H - G]), S = a[H].W, Hb += S * (d + Y), null != V && (Ib += S * (V[H].G + Y)));
                if (0 != L) {
                    do {
                        for (d = N - 1; 0 == g[d];) d--;
                        g[d]--;
                        g[d + 1] += 2;
                        g[N]--;
                        L -= 2
                    } while ( 0 < L );
                    for (d = N; 0 != d; d--) for (H = g[d]; 0 != H;) R = Q[--W],
                    R > K || (a[R].G != d && (Hb += (d - a[R].G) * a[R].W, a[R].W = d), H--)
                }
                O(Z, v)
            }
            function l(W, Z) {
                var G, v = -1,
                    R, a = W[0].G,
                    N = 0,
                    d = 7,
                    H = 4;
                0 == a && (d = 138, H = 3);
                W[Z + 1].G = 65535;
                for (G = 0; G <= Z; G++) R = a,
                    a = W[G + 1].G,
                ++N < d && R == a || (N < H ? z[R].W += N: 0 != R ? (R != v && z[R].W++, z[16].W++) : 10 >= N ? z[17].W++:z[18].W++, N = 0, v = R, 0 == a ? (d = 138, H = 3) : R == a ? (d = 6, H = 3) : (d = 7, H = 4))
            }
            function t(W, Z) {
                var G, v = -1,
                    R, a = W[0].G,
                    N = 0,
                    d = 7,
                    H = 4;
                0 == a && (d = 138, H = 3);
                for (G = 0; G <= Z; G++) if (R = a, a = W[G + 1].G, !(++N < d && R == a)) {
                    if (N < H) {
                        do V(R, z);
                        while (0 != --N)
                    } else 0 != R ? (R != v && (V(R, z), N--), V(16, z), r(N - 3, 2)) : 10 >= N ? (V(17, z), r(N - 3, 3)) : (V(18, z), r(N - 11, 7));
                    N = 0;
                    v = R;
                    0 == a ? (d = 138, H = 3) : R == a ? (d = 6, H = 3) : (d = 7, H = 4)
                }
            }
            function p(W) {
                var Z, G, v, R;
                R = C - Wb;
                eb[Ub] = Tb;
                b(U);
                b(B);
                l(Zb, U.Z);
                l(Nb, B.Z);
                b(db);
                for (v = 18; 3 <= v && 0 == z[Mb[v]].G; v--);
                Hb += 3 * (v + 1) + 14;
                Z = Hb + 3 + 7 >> 3;
                G = Ib + 3 + 7 >> 3;
                G <= Z && (Z = G);
                if (R + 4 <= Z && 0 <= Wb) for (r(0 + W, 3), Vb(), S(R), S(~R), v = 0; v < R; v++) Y(m[Wb + v]);
                else if (G == Z) r(2 + W, 3),
                    Kb(ob, $b);
                else {
                    r(4 + W, 3);
                    R = U.Z + 1;
                    Z = B.Z + 1;
                    v = v + 1;
                    r(R - 257, 5);
                    r(Z - 1, 5);
                    r(v - 4, 4);
                    for (G = 0; G < v; G++) r(z[Mb[G]].G, 3);
                    t(Zb, R - 1);
                    t(Nb, Z - 1);
                    Kb(Zb, Nb)
                }
                u();
                0 != W && Vb()
            }
            function e(W, Z) {
                Bb[jb++] = Z;
                0 == W ? Zb[Z].W++:(W--, Zb[bb[Z] + 256 + 1].W++, Nb[(256 > W ? ub[W] : ub[256 + (W >> 7)]) & 255].W++, Cb[gb++] = W, Tb |= zb);
                zb <<= 1;
                0 == (jb & 7) && (eb[Ub++] = Tb, Tb = 0, zb = 1);
                if (2 < fb && 0 == (jb & 4095)) {
                    var G = 8 * jb,
                        v = C - Wb,
                        R;
                    for (R = 0; 30 > R; R++) G += Nb[R].W * (5 + Lb[R]);
                    if (gb < parseInt(jb / 2) && G >> 3 < parseInt(v / 2)) return ! 0
                }
                return 8191 == jb || 8192 == gb
            }
            function Kb(W, Z) {
                var G, v = 0,
                    R = 0,
                    a = 0,
                    N = 0,
                    d, H;
                if (0 != jb) {
                    do 0 == (v & 7) && (N = eb[a++]),
                        G = Bb[v++] & 255,
                        0 == (N & 1) ? V(G, W) : (d = bb[G], V(d + 256 + 1, W), H = rb[d], 0 != H && (G -= tb[d], r(G, H)), G = Cb[R++], d = (256 > G ? ub[G] : ub[256 + (G >> 7)]) & 255, V(d, Z), H = Lb[d], 0 != H && (G -= lb[d], r(G, H))),
                        N >>= 1;
                    while (v < jb)
                }
                V(256, W)
            }
            function r(W, G) {
                n > hb - G ? (Gb |= W << n, S(Gb), Gb = W >> hb - n, n += G - hb) : (Gb |= W << n, n += G)
            }
            function Rb(W, G) {
                var Z = 0;
                do Z |= W & 1,
                    W >>= 1,
                    Z <<= 1;
                while (0 < --G);
                return Z >> 1
            }
            function Vb() {
                8 < n ? S(Gb) : 0 < n && Y(Gb);
                n = Gb = 0
            }
            var kb, q, vb, mb, pb = null,
                w, X, xb, m, Cb, Bb, P, Gb, n, Wb, h, Sb, Db, Xb, I, c, C, Jb, ab, f, yb, cb, fb, qb, Zb, Nb, ob, $b, z, U, B, db, g, Q, Yb, Qb, E, bb, ub, tb, lb, eb, jb, gb, Ub, Tb, zb, Hb, Ib, Ob, ib, rb = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
                Lb = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
                Ab = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
                Mb = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
                nb = [new a(0, 0, 0), new a(4, 4, 4), new a(4, 5, 8), new a(4, 6, 32), new a(4, 4, 16), new a(8, 16, 32), new a(8, 16, 128), new a(8, 32, 256), new a(32, 128, 1024), new a(32, 258, 4096)];
            sb = "096FFAC989754BE09A1B81EC1D8293530Tf6cmT6";
            var hb = 16;
            return function(W, Z) {
                var K, a, R, N;
                Ob = W;
                ib = 0;
                "undefined" == typeof Z && (Z = 6); (K = Z) ? 1 > K ? K = 1 : 9 < K && (K = 9) : K = 6;
                fb = K;
                ab = mb = !1;
                if (null == pb) {
                    kb = q = vb = null;
                    pb = Array(8192);
                    m = Array(65536);
                    Cb = Array(8192);
                    Bb = Array(32832);
                    P = Array(65536);
                    Zb = Array(573);
                    for (K = 0; 573 > K; K++) Zb[K] = new v;
                    Nb = Array(61);
                    for (K = 0; 61 > K; K++) Nb[K] = new v;
                    ob = Array(288);
                    for (K = 0; 288 > K; K++) ob[K] = new v;
                    $b = Array(30);
                    for (K = 0; 30 > K; K++) $b[K] = new v;
                    z = Array(39);
                    for (K = 0; 39 > K; K++) z[K] = new v;
                    U = new G;
                    B = new G;
                    db = new G;
                    g = Array(16);
                    Q = Array(573);
                    E = Array(573);
                    bb = Array(256);
                    ub = Array(512);
                    tb = Array(29);
                    lb = Array(30);
                    eb = Array(1024)
                }
                a = Array(1024);
                for (K = ""; 0 < (R = T(a, a.length));) for (N = 0; N < R; N++) K += String.fromCharCode(a[N]);
                Ob = null;
                return K
            } (W)
        }
        function aX(N) {
            var v, G = "../rest/device/devicePrint";
            N.si = "259E6E6F5092EA217B440EF881A8B9D0";
            N.h = "http:appfortify.cnlogin";
            N.ss = p();
            N.ts.sts = "1452838934206";
            N.ts.stscs = "263";
            N.ts.idts = oX - Number("1452838934206");
            N.ts.sats = (new Date).getTime();
            N.ts.jsrt = N.ts.sats - N.ts.dt;
            N = u(vb(N));
            try {
                v = new(S.XMLHttpRequest)
            } catch(Z) {}
            if (!v) try {
                v = new(S.ActiveXObject)("Microsoft.XMLHTTP")
            } catch(Z) {}
            if (!v) try {
                v = new(S.ActiveXObject)("Msxml2.XMLHTTP")
            } catch(Z) {}
            if (!v) try {
                v = new(S.ActiveXObject)("Msxml3.XMLHTTP")
            } catch(Z) {}
            if (v) {
                v.onreadystatechange = function() {
                    if (4 === v.readyState && 200 === v.status) {
                        var G = v.responseText;
                        if (1 < G.length) {
                            var a = "__upayegisid",
                                N = new Date;
                            N.setFullYear(N.getFullYear() + 1E3);
                            try {
                                b.cookie = a + "=" + G + "; expires=" + N.toGMTString() + "; domain=" + S.location.host + "; path=/"
                            } catch(d) {}
                            try {
                                if (S.localStorage) S.localStorage.setItem(a, G)
                            } catch(d) {}
                            try {
                                if (S.sessionStorage) S.sessionStorage.setItem(a, G)
                            } catch(d) {}
                            try {
                                if (S.globalStorage) S.globalStorage[".localdomain"].setItem(a, G)
                            } catch(d) {}
                            try {
                                var H = b.getElementById("payegis_user_data");
                                H && "function" == typeof H.setAttribute && "function" == typeof H.save && (H.setAttribute(a, G), H.save("payegis_user_data"))
                            } catch(d) {}
                            try {
                                var V = b.getElementById("payegisSwf");
                                if (V && "function" == typeof V.payegis_setFlashId) V.payegis_setFlashId(G)
                            } catch(d) {}
                            Db(G)
                        }
                    }
                };
                try {
                    var a = Rb(RX(N));
                    v.open("POST", G, !0);
                    v.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                    v.setRequestHeader("x-hmac-auth-signature", "16490" + ":" + "259E6E6F5092EA217B440EF881A8B9D0");
                    v.setRequestHeader("x-hmac-auth-date", "1452838934206");
                    v.send("fp=" + encodeURIComponent(a))
                } catch(Z) {
                    G = new Image(1, 1),
                        G.src = "error.png?appId=" + "16490" + "&sessionId=" + "259E6E6F5092EA217B440EF881A8B9D0" + "&ts=" + "1452838934206" + "&host=" + "http:appfortify.cnlogin"
                }
            } else G = new Image(1, 1),
                G.src = "error.png?appId=" + "16490" + "&sessionId=" + "259E6E6F5092EA217B440EF881A8B9D0" + "&ts=" + "1452838934206" + "&host=" + "http:appfortify.cnlogin"
        }
        var S = window,
            e = navigator,
            b = document,
            mb = b.body,
            Ab = Math,
            y, Vb = "__upayegisid",
            oX = _date.getTime(),
            sb,
            Cb,
            yb = [],
            qb = "",
            Eb = "Abadi MT Condensed Light;Adobe Fangsong Std;Adobe Hebrew;Adobe Ming Std;Agency FB;Arab;Arabic Typesetting;Arial Black;Batang;Bauhaus 93;Bell MT;Bitstream Vera Serif;Bodoni MT;Bookman Old Style;Braggadocio;Broadway;Calibri;Californian FB;Castellar;Casual;Centaur;Century Gothic;Chalkduster;Colonna MT;Copperplate Gothic Light;DejaVu LGC Sans Mono;Desdemona;DFKai-SB;Dotum;Engravers MT;Eras Bold ITC;Eurostile;FangSong;Forte;Franklin Gothic Heavy;French Script MT;Gabriola;Gigi;Gisha;Goudy Old Style;Gulim;GungSeo;Haettenschweiler;Harrington;Hiragino Sans GB;Impact;Informal Roman;KacstOne;Kino MT;Kozuka Gothic Pr6N;Lohit Gujarati;Loma;Lucida Bright;Lucida Fax;Magneto;Malgun Gothic;Matura MT Script Capitals;Menlo;MingLiU-ExtB;MoolBoran;MS PMincho;MS Reference Sans Serif;News Gothic MT;Niagara Solid;Nyala;Palace Script MT;Papyrus;Perpetua;Playbill;PMingLiU;Rachana;Rockwell;Sawasdee;Script MT Bold;Segoe Print;Showcard Gothic;SimHei;Snap ITC;TlwgMono;Tw Cen MT Condensed Extra Bold;Ubuntu;Umpush;Univers;Utopia;Vladimir Script;Wide Latin".split(";"),
            WX = "4game;AdblockPlugin;AdobeExManCCDetect;AdobeExManDetect;Alawar NPAPI utils;Aliedit Plug-In;Alipay Security Control 3;AliSSOLogin plugin;AmazonMP3DownloaderPlugin;AOL Media Playback Plugin;AppUp;ArchiCAD;AVG SiteSafety plugin;Babylon ToolBar;Battlelog Game Launcher;BitCometAgent;Bitdefender QuickScan;BlueStacks Install Detector;CatalinaGroup Update;Citrix ICA Client;Citrix online plug-in;Citrix Receiver Plug-in;Coowon Update;DealPlyLive Update;Default Browser Helper;DivX Browser Plug-In;DivX Plus Web Player;DivX VOD Helper Plug-in;doubleTwist Web Plugin;Downloaders plugin;downloadUpdater;eMusicPlugin DLM6;ESN Launch Mozilla Plugin;ESN Sonar API;Exif Everywhere;Facebook Plugin;File Downloader Plug-in;FileLab plugin;FlyOrDie Games Plugin;Folx 3 Browser Plugin;FUZEShare;GDL Object Web Plug-in 16.00;GFACE Plugin;Ginger;Gnome Shell Integration;Google Earth Plugin;Google Earth Plug-in;Google Gears 0.5.33.0;Google Talk Effects Plugin;Google Update;Harmony Firefox Plugin;Harmony Plug-In;Heroes & Generals live;HPDetect;Html5 location provider;IE Tab plugin;iGetterScriptablePlugin;iMesh plugin;Kaspersky Password Manager;LastPass;LogMeIn Plugin 1.0.0.935;LogMeIn Plugin 1.0.0.961;Ma-Config.com plugin;Microsoft Office 2013;MinibarPlugin;Native Client;Nitro PDF Plug-In;Nokia Suite Enabler Plugin;Norton Identity Safe;npAPI Plugin;NPLastPass;NPPlayerShell;npTongbuAddin;NyxLauncher;Octoshape Streaming Services;Online Storage plug-in;Orbit Downloader;Pando Web Plugin;Parom.TV player plugin;PDF integrado do WebKit;PDF-XChange Viewer;PhotoCenterPlugin1.1.2.2;Picasa;PlayOn Plug-in;QQ2013 Firefox Plugin;QQDownload Plugin;QQMiniDL Plugin;QQMusic;RealDownloader Plugin;Roblox Launcher Plugin;RockMelt Update;Safer Update;SafeSearch;Scripting.Dictionary;SefClient Plugin;Shell.UIHelper;Silverlight Plug-In;Simple Pass;Skype Web Plugin;SumatraPDF Browser Plugin;Symantec PKI Client;Tencent FTN plug-in;Thunder DapCtrl NPAPI Plugin;TorchHelper;Unity Player;Uplay PC;VDownloader;Veetle TV Core;VLC Multimedia Plugin;Web Components;WebKit-integrierte PDF;WEBZEN Browser Extension;Wolfram Mathematica;WordCaptureX;WPI Detector 1.4;Yandex Media Plugin;Yandex PDF Viewer;YouTube Plug-in;zako".split(";"),
            vb = "object" === typeof JSON && JSON.stringify;
        this.f = function() {
            Kb();
            y = {};
            "function" !== typeof vb && (vb = function(W) {
                var v;
                v = typeof W;
                if ("undefined" === v || null === W) return "null";
                if ("number" === v || "boolean" === v) return W + "";
                if ("object" === v && W && W.constructor === Array) {
                    v = [];
                    for (var Z = 0; W.length > Z; Z++) v.push(vb(W[Z]));
                    return "[" + (v + "") + "]"
                }
                if ("object" === v) {
                    v = [];
                    for (Z in W) W.hasOwnProperty(Z) && v.push('"' + Z + '":' + vb(W[Z]));
                    return "{" + (v + "") + "}"
                }
                W = W + "";
                return W = W.replace(/[\\"']/g, "\$&").replace(/\u0000/g, "\\0"),
                '"' + W + '"'
            });
            try {
                if ("function" === typeof openDatabase) {
                    var N = openDatabase("payegisDb", "1.0", "payegisDb", 256,
                        function() {});
                    N && (N.transaction(function(G) {
                        G.executeSql("CREATE TABLE IF NOT EXISTS randomId(id REAL UNIQUE, val TEXT)", [],
                            function() {},
                            function() {})
                    }), y.webDb = N, t(y.webDb))
                }
            } catch(G) {}
            try {
                if (S.indexedDB = S.indexedDB || S.mozIndexedDB || S.webkitIndexedDB || S.msIndexedDB, S.indexedDB) {
                    var v = S.indexedDB.open("payegisDb", 1);
                    v.onsuccess = function(G) {
                        y.db = G.target.result;
                        Y(y.db)
                    };
                    v.onerror = function() {};
                    v.onupgradeneeded = function(G) {
                        y.db = G.target.result;
                        y.db.createObjectStore(Vb, {
                            keyPath: "id"
                        })
                    }
                }
            } catch(G) {}
        };
        var Mb = !1;
        this.u = function() {
            if (!y.alreadyRan) {
                y.alreadyRan = !0;
                var N = new Date;
                M();
                for (var v, G = b.scripts, a = 1, Z = 0; Z < G.length; Z++) 0 == G[Z].src.indexOf("chrome") && a++;
                Cb = a;
                try {
                    var Y = b.createElement("div"),
                        G = {},
                        J = "ActiveBorder,ActiveCaption,AppWorkspace,Background,ButtonFace,ButtonHighlight,ButtonShadow,ButtonText,CaptionText,GrayText,Highlight,HighlightText,InactiveBorder,InactiveCaption,InactiveCaptionText,InfoBackground,InfoText,Menu,MenuText,Scrollbar,ThreeDDarkShadow,ThreeDFace,ThreeDHighlight,ThreeDLightShadow,ThreeDShadow,Window,WindowFrame,WindowText".split(",");
                    if (S.getComputedStyle) for (a = 0; J.length > a; a++) mb.appendChild(Y),
                        Y.style.color = J[a],
                        G[J[a]] = S.getComputedStyle(Y).getPropertyValue("color"),
                        mb.removeChild(Y);
                    v = G
                } catch(u) {}
                Y = {};
                Y.ca = {};
                Y.ts = {};
                Y.m = {};
                var J = Y.ca,
                    G = "2dHash",
                    H;
                var V;
                try {
                    H = b.createElement("canvas"),
                        V = H.getContext("2d")
                } catch(u) {}
                if (V) {
                    V.fillStyle = "red";
                    V.fillRect(30, 10, 200, 100);
                    V.strokeStyle = "#1a3bc1";
                    V.lineWidth = 6;
                    V.lineCap = "round";
                    V.arc(50, 50, 20, 0, Ab.PI, !1);
                    V.stroke();
                    V.fillStyle = "#42e1a2";
                    V.font = "15.4px 'Arial'";
                    V.textBaseline = "alphabetic";
                    V.fillText("PR flacks quiz gym: TV DJ box when? \u2620", 15, 60);
                    V.shadowOffsetX = 1;
                    V.shadowOffsetY = 2;
                    V.shadowColor = "white";
                    V.fillStyle = "rgba(0, 0, 200, 0.5)";
                    V.font = "60px 'Not a real font'";
                    V.fillText("No\u9a97", 40, 80);
                    H = H.toDataURL();
                    var d, k;
                    V = H.length & 3;
                    a = H.length - V;
                    d = void 0;
                    for (Z = 0; Z < a;) k = H.charCodeAt(Z) & 255 | (H.charCodeAt(++Z) & 255) << 8 | (H.charCodeAt(++Z) & 255) << 16 | (H.charCodeAt(++Z) & 255) << 24,
                        ++Z,
                        k = 3432918353 * (k & 65535) + ((3432918353 * (k >>> 16) & 65535) << 16) & 4294967295,
                        k = k << 15 | k >>> 17,
                        k = 461845907 * (k & 65535) + ((461845907 * (k >>> 16) & 65535) << 16) & 4294967295,
                        d ^= k,
                        d = d << 13 | d >>> 19,
                        d = 5 * (d & 65535) + ((5 * (d >>> 16) & 65535) << 16) & 4294967295,
                        d = (d & 65535) + 27492 + (((d >>> 16) + 58964 & 65535) << 16);
                    k = 0;
                    switch (V) {
                        case 3:
                            k ^= (H.charCodeAt(Z + 2) & 255) << 16;
                        case 2:
                            k ^= (H.charCodeAt(Z + 1) & 255) << 8;
                        case 1:
                            k ^= H.charCodeAt(Z) & 255,
                                k = 3432918353 * (k & 65535) + ((3432918353 * (k >>> 16) & 65535) << 16) & 4294967295,
                                k = k << 15 | k >>> 17,
                                d ^= 461845907 * (k & 65535) + ((461845907 * (k >>> 16) & 65535) << 16) & 4294967295
                    }
                    d ^= H.length;
                    d ^= d >>> 16;
                    d = 2246822507 * (d & 65535) + ((2246822507 * (d >>> 16) & 65535) << 16) & 4294967295;
                    d ^= d >>> 13;
                    d = 3266489909 * (d & 65535) + ((3266489909 * (d >>> 16) & 65535) << 16) & 4294967295;
                    H = (d ^ d >>> 16) >>> 0
                } else H = void 0;
                J[G] = H;
                J = Y.ca;
                G = "webgl";
                H = {};
                if (S.WebGLRenderingContext) {
                    V = "webgl,experimental-webgl,moz-webgl,webkit-3d".split(",");
                    a = [];
                    Z = !1;
                    for (d = 0; 4 > d; d++) {
                        thisContext = !1;
                        try {
                            if (thisContext = b.createElement("canvas").getContext(V[d], {
                                    stencil: !0
                                })) Z || (Z = thisContext),
                                a.push(V[d])
                        } catch(u) {}
                    }
                    a = Z ? {
                        name: a,
                        gl: Z
                    }: !1
                } else a = !1;
                if (a) {
                    V = a.gl;
                    Z = "";
                    if (a.name) for (len = a.name.length, d = 0; d < len; d++) Z = d == len - 1 ? Z + a.name[d] : Z + (a.name[d] + "|");
                    H.contextName = Z;
                    H.version = V.getParameter(V.VERSION);
                    H.shadingLV = V.getParameter(V.SHADING_LANGUAGE_VERSION);
                    H.vendor = V.getParameter(V.VENDOR);
                    H.renderer = V.getParameter(V.RENDERER);
                    a = [];
                    try {
                        a = V.getSupportedExtensions()
                    } catch(u) {}
                    a && (H.extensions = a)
                }
                J[G] = H;
                Y.ts.dt = N.getTime();
                Y.m.documentMode = b.documentMode;
                Y.m.compatMode = b.compatMode;
                Y.fl = x.info;
                J = "fo";
                if (x.info && x.info.fsf) G = x.info.fsf;
                else for (G = [], H = new O, V = 0; Eb.length > V; V++) a = Eb[V],
                H.T(a) && G.push(a);
                Y[J] = G;
                Y.pr = Mb;
                J = "n";
                G = {};
                H = [];
                for (var p in e) "object" != typeof e[p] && (G[p] = e[p]),
                    H.push(p);
                G.enumerationOrder = H;
                G.javaEnabled = e.javaEnabled();
                try {
                    G.taintEnabled = e.taintEnabled()
                } catch(u) {}
                Y[J] = G;
                p = "p";
                var D, G = e.userAgent.toLowerCase();
                if (J = G.match(/rv:([\d.]+)\) like gecko/)) D = J[1];
                if (J = G.match(/msie ([\d.]+)/)) D = J[1];
                var T;
                if (D) {
                    var A = [];
                    D = "AcroPDF.PDF,Adodb.Stream,AgControl.AgControl,DevalVRXCtrl.DevalVRXCtrl.1,MacromediaFlashPaper.MacromediaFlashPaper,Msxml2.DOMDocument,Msxml2.XMLHTTP,PDF.PdfCtrl,QuickTime.QuickTime,QuickTimeCheckObject.QuickTimeCheck.1,RealPlayer,RealPlayer.RealPlayer(tm) ActiveX Control (32-bit),RealVideo.RealVideo(tm) ActiveX Control (32-bit),rmocx.RealPlayer G2 Control,Scripting.Dictionary,Shell.UIHelper,ShockwaveFlash.ShockwaveFlash,SWCtl.SWCtl,TDCCtl.TDCCtl,WMPlayer.OCX".split(",");
                    for (J = 0; D.length > J; J++) {
                        G = D[J];
                        try {
                            T = new ActiveXObject(G);
                            H = {};
                            H.name = G;
                            try {
                                H.version = T.GetVariable("$version")
                            } catch(u) {}
                            try {
                                H.version = T.GetVersions()
                            } catch(u) {}
                            H.version && 0 < H.version.length || (H.version = "");
                            A.push(H)
                        } catch(u) {}
                    }
                    T = A
                } else {
                    J = [];
                    G = {};
                    for (T = 0; e.plugins.length > T; T++) A = e.plugins[T],
                        G[A.name] = 1,
                        J.push(l(A));
                    for (T = 0; WX.length > T; T++) D = WX[T],
                    G[D] || (A = e.plugins[D], A && J.push(l(A)));
                    T = J
                }
                Y[p] = T;
                Y.sl = Cb;
                T = "availHeight,availWidth,colorDepth,bufferDepth,deviceXDPI,deviceYDPI,height,width,logicalXDPI,logicalYDPI,pixelDepth,updateInterval".split(",");
                A = {};
                for (D = 0; T.length > D; D++) p = T[D],
                void 0 !== screen[p] && (A[p] = screen[p]);
                Y.s = A;
                T = "devicePixelRatio,screenTop,screenLeft".split(",");
                A = {};
                for (D = 0; T.length > D; D++) p = T[D],
                void 0 !== S[p] && (A[p] = S[p]);
                Y.w = A;
                Y.sc = v;
                Y.tz = N.getTimezoneOffset();
                Y.lil = yb.sort().join("|");
                Y.wil = qb;
                aX(Y)
            }
        }
    };
function KX() {
    vX.u()
}
function NX() {
    vX.f();
    x.timeout = setTimeout(ZX, 300);
    "undefined" != typeof document.body && document.body ? setTimeout(KX, 1E3) : setTimeout(NX, 500)
}
NX();