(function() {
    var url = document.location.href; //"https://www.agefans.net/_getplay?aid={}&playindex=2&epindex=1&r={}";
    var res = url.matchAll(/.*\/(.*)\?playid=(.*)_(.*)/g).next().value;
    var aid = res[1];
    var playindex = res[2];
    var epindex = res[3];
    var c_t1 = document.cookie.match(/t1=[^;]*/g)[0].split("=")[1];
    var t1 = Math.round(Number(c_t1)/1000)>>5;
    var k2 = (t1*(t1%4096)*0x3+83215)*(t1%4096)+t1;
    var t2 = new Date().getTime();
    fetch("https://www.agefans.net/_getplay?aid=" + aid + "&playindex=" + playindex + "&epindex=" + epindex + "&r=" + Math.random(), {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Cookie": document.cookie + "; k2=" + k2 + "; t2=" + t2
        }
    }).then(function(res){return res.json()}).then(function(res){
        var d = document.createElement('div');
        var text = "";
        for (var key in res){
            if (key == "vurl") {
                if (unescape(res[key]).indexOf("http") > -1) {
                    text += "<a style='background-color: red' href='" + unescape(res[key]) + "' target='_blank'>【跳转播放界面1】</a>&emsp;";
                    text += "<a style='background-color: red' href='" + res.purlf + unescape(res[key]) + "' target='_blank'>【跳转播放界面2】</a>&emsp;";
                    text += "<a style='background-color: red' href='" + res.purl + unescape(res[key]) + "' target='_blank'>【跳转播放界面3】</a>&emsp;";
                    text += "<br/>";
                } else {
                    text += "<a style='background-color: red' href='" + res.purlf + unescape(res[key]) + "' target='_blank'>【跳转播放界面1】</a>&emsp;";
                    text += "<a style='background-color: red' href='" + res.purl + unescape(res[key]) + "' target='_blank'>【跳转播放界面2】</a>&emsp;";
                    text += "<br/>";
                }
            }
        }
        d.innerHTML = text;
        d.style.width = "980px";
        d.style.overflow = "auto";
        var b = document.getElementById("playlist-div");
        b.append(d);
    });
})();
