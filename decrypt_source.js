

var fs = require("fs");
var js = fs.readFileSync("dpa.js", 'utf-8');

var lookupVars = function(js, varName, varArr) {
    var ret = false;
    if(varArr == undefined) {
        varArr = [];
        ret = true;
    }
    var reg = eval('/(\\w+)\\s*=\\s*' + varName + '\\s*[,;\\n\\)]/g');
    var _vs = js.match(reg);
    if(_vs) {
        _vs.forEach(function(v, i, w) { 
            var _var = v.split('=')[0].trim();
            if(varArr.indexOf(_var) < 0) {
                varArr.push(_var);
                lookupVars(js, _var, varArr);
            }
        });
    }
    if(ret) return varArr;
};

var windowVars = lookupVars(js, 'window');


var b = function(a, b) {
    for (var c = "", d = 0; d < a.length; d++)
        c += String.fromCharCode(((a.charCodeAt(d) -
        32^31 & d) + 95 - b)%95 + 32);
    return c
}

var a = function (a, b) {
    for (var d = "", c = 0; c < a.length; c++)
        d += String.fromCharCode(((a.charCodeAt(c) - 32^31 & c) + 95 - b)%95 + 32);
    return d
}

var strEncrypt = ['a', 'b'];

strEncrypt.forEach(function(v, i, s){
    var reg = eval('/' + v + '\\((["\'].+?["\']),\\s*(\\d+)\\)/g');
    var _s = js.match(reg);
    js = js.replace(reg, function(m, str, d){
        console.log(m, eval(v)(eval(str), parseInt(d)));
        return '"' + eval(v)(eval(str), parseInt(d)) + '"';
    });
});
console.log(js)

var reg = /\[\"(\w+)\"\]/g

var _s = js.match(reg);
console.log(_s)
js = js.replace(reg, function(m, key) {
    console.log(m, "." + key);
    return "." + key;
})

console.log(js)




// =======================================


js = fs.readFileSync("fp.js", 'utf-8');

var encryptFunctionsReg = /(\w)\((\"E7L98;N\/D2\"|\"KL<=EU;L\")/g;

_f = js.match(encryptFunctionsReg);

console.log(_f);

global[_f[0][0]] = global[_f[1][0]] = a;

var strEncrypt = [_f[0][0], _f[1][0]];

js = js.replace(/(\w)\s?=\s?\w\(\w\w\(\1\)\);/g, "console.log(JSON.stringify($1));debugger;$&");

strEncrypt.forEach(function(v, i, s){
    var reg = eval('/' + v + '\\((["\'].+?["\']),\\s*["\']?(\\d+)["\']?\\)/g');
    var _s = js.match(reg);
    js = js.replace(reg, function(m, str, d){
        console.log(str);
        console.log(m, global[v](eval(str), parseInt(d)));
        return '"' + global[v](eval(str), parseInt(d)) + '"';
    });
});
console.log(js)

console.log("==================================")
_s = js.match(reg);
console.log(_s)
js = js.replace(reg, function(m, key) {
    console.log(m, "." + key);
    return "." + key;
})

console.log(js)