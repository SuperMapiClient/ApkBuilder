/* Copyright (c) 2000-2011 by SuperMap Software Co., Ltd.*/

/** 
* 此处定义变量，实现地图可配置化，定义实例中用到的地图URL，便于以后更新数据的。
**/
var htmlUrl = document.location.toString(),
    stringIndex = htmlUrl.indexOf("//"),
    subString = htmlUrl.substring(0, stringIndex-1), org;
		
if (subString == "file") {
    org = "http://localhost:8090";
} else {
    org = 'http://' + document.location.host;
};


var World_Map = org + "/iserver/services/map-world/rest/maps/World Map";
var China_Map = org + "/iserver/services/map-china400/rest/maps/China";
var ChangChun_Map = org + "/iserver/services/map-changchun/rest/maps/长春市区图";
var China_Temperature_map = org + "/iserver/services/map-temperature/rest/maps/全国温度变化图";
var Jingjin_map = org + "/iserver/services/map-jingjin/rest/maps/京津地区人口分布图_专题图";
var World = org + "/iserver/services/map-world/rest/maps/World";
var World_data = org + "/iserver/services/data-world/rest/data";
var Changchun_spatialanalyst = org + "/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst";
var Spatialanalyst_sample = org + "/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst";
var Changchun_RoadNet = org + "/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun";
var Jingjin_rest = org + "/iserver/services/map-jingjin/rest/maps/京津地区土地利用现状图";
var Jingjin_data = org + "/iserver/services/data-jingjin/rest/data/";
var Jingjin_Landuse_R = org + "/iserver/services/data-jingjin/rest/data/datasources/name/Jingjin/datasets/name/Landuse_R/";



// 获取页面高度
function pageHeight() {
    if ($.browser.msie) {
        return document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
    } else {
        return self.innerHeight;
    }
};

// 获取页面宽度
function pageWidth() {
    if ($.browser.msie) {
        return document.compatMode == "CSS1Compat" ? document.documentElement.clientWidth : document.body.clientWidth;
    } else {
        return self.innerWidth;
    }
};


var nWidthDe, nWidthAll;
// 描述信息自适应高度
var nContentHeight;
var bFirst = true;
var nNavShow;
// 调整子页面布局
function adjustSubFrame() {
    nNavShow = true;
    $("#description").css("visibility", "visible");
	
    var nHeight = pageHeight() + 2;
    $("#core").css("height", nHeight);

    nWidthAll = $("#map").width() * 0.3;
    $("#all").css("width",nWidthAll);
    if (nWidthAll <= 150) {
        $("#all").css("width", "150px");
    }
    nWidthDe = $("#description").width();
    nWidthAll = $("#all").width();
    $("#all").css("left", nWidthAll + nWidthDe + 'px');

    var nValue = $("#button3").width();
    $("#com_a").css("left", (nValue - 8) / 2 + 'px');
    nValue = $("#button3").height();
    //$("#com_a").css("top", (nValue - 16) / 2 + 'px');

    var nPicWidth = $(".btn").width();
    $(".add-big").css("padding", '5px 0px 1px ' + nPicWidth + 'px');

    if (bFirst == true) {
        nContentHeight = $("#message").height();
        bFirst = false;
    }
    var nCoreHeight = $("#core").height() * 0.5;
    var nContentPosition;
    if (nContentHeight > nCoreHeight) {
        nContentPosition = nCoreHeight;
        $("#all #message").css("overflow-y", "scroll");
		$("#all #message").css("overflow-x", "hidden");
    }
    else {
        nContentPosition = nContentHeight;
        $("#all #message").css("overflow", "hidden");
    }
    $("#all #message").css("height", nContentPosition + 'px');

    $("#all #button3").css("top", (nContentPosition * 0.42) + 'px');
    $("#all").css("top", (nCoreHeight - nContentPosition * 0.5) + 'px');
    $("#com_a").css("top", ((nContentPosition * 0.16 - 16) / 2) + 'px');

};

// 子页面事件响应函数封装
function clickmessage() {
    $(window).resize(function () {
        // 调整子页面布局
        adjustSubFrame();
    });

    $(window).unload(function () {
        map && map.unloadDestroy && map.unloadDestroy();
        bFirst = true;
    });

    $("#nav").click(function () {
        if (nNavShow) {
		var offset = nWidthAll;
        $("#description").css("visibility", "hidden");
        $("#all").animate({ left: '-=' + offset + 'px' }, "slow");
        nNavShow = false;
		}
    });


    $("#button3").click(function () {
        var offset = nWidthAll;
        $("#all").animate({ left: '+=' + offset + 'px' }, "slow");
        $("#description").css("visibility", "visible");
        nNavShow = true;
    });
};


/** 
* 此函数实现的是地图全屏的功能，在请求全屏时需要调用全屏的元素调用 requestFullscreen() 方法，在需要退出时对 document 调用 cancelFullscreen()方法 
* API目前支持支持全屏API的浏览器有 FireFox 10+, Chrome 15+, Safari 5.1+ 。
**/
	(function() {
	var fullScreenApi = { 
			supportsFullScreen: false,
			isFullScreen: function() { return false; }, 
			requestFullScreen: function() {}, 
			cancelFullScreen: function() {},
			fullScreenEventName: '',
			prefix: ''
		},
		browserPrefixes = 'webkit moz o ms khtml'.split(' ');
	
		// 检查浏览器是否支持全屏
		if (typeof document.cancelFullScreen != 'undefined') {
			fullScreenApi.supportsFullScreen = true;
		} else {	 
			// check for fullscreen support by vendor prefix
			for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
				fullScreenApi.prefix = browserPrefixes[i];
				
				if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
					fullScreenApi.supportsFullScreen = true;
					
					break;
				}
			}
		}
		
		if (fullScreenApi.supportsFullScreen) {
			fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
			
			fullScreenApi.isFullScreen = function() {
				switch (this.prefix) {	
					case '':
						return document.fullScreen;
					case 'webkit':
						return document.webkitIsFullScreen;
					default:
						return document[this.prefix + 'FullScreen'];
				}
			}
			fullScreenApi.requestFullScreen = function(el) {
				return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
			}
			fullScreenApi.cancelFullScreen = function(el) {
				return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
			}		
		}
		// 输出api
		window.fullScreenApi = fullScreenApi;	
	})();
    function fullScreen(evt) {
	    if (window.fullScreenApi.supportsFullScreen) {
		    // 里面的元素是需要全屏的元素 这里取的整个body
		    window.fullScreenApi.requestFullScreen(document.getElementById("core")); 
			$("#quit").show();
			$("#full").hide();
		}
		else{
			alert("当前浏览器不支持全屏,支持全屏的浏览器有 FireFox 10+, Chrome 15+, Safari 5.1+ 。");
		}
	};
	function cancelFullScreen() {
	        window.fullScreenApi.cancelFullScreen();
			$("#quit").hide();
			$("#full").show();
		}
	$(document).keyup(function(event){   
    //获取当前按键的键值   
    //jQuery的event对象上有一个which的属性可以获得键盘按键的键值   
    var keycode = event.which;  
	//处理esc的情况   
    if(keycode == 27){ 
	        cancelFullScreen(); 
		}   
    });

	
	
/*显示源代码,function:showSource()*/
function showSource() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("msie") > 0)
        Sys.ie = ua.match(/msie ([\d.]+)/)[1]
    else if (ua.indexOf("firefox") > -1)
        Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1]
    else if (ua.indexOf("chrome") > -1)
        Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1]
    else if (ua.indexOf("safari") > -1)
        Sys.safari = ua.match(/version\/([\d.]+)/)[1];

    //以下进行测试
    if (Sys.ie||Sys.safari) {
        showSourceForIE_Safari();
    } else if (Sys.firefox||Sys.chrome) {
        showSourceForFirefox_Chrome();
    } else {
        alert("暂不支持此浏览器显示源码！请使用右键——>查看源文件")
    }
}
//fireFox与Chrome显示源代码方法
function showSourceForFirefox_Chrome() {
    var sourceInFirefox = "view-source:" + window.location.href;
    window.open(sourceInFirefox, "sourceInFirefox", '');
}
//IE与Safari显示源代码方法
function showSourceForIE_Safari() {
    var sourceInIE = window.location.href;
    var newIEPage = window.open(sourceInIE, "sourceInIE", '');
    //var code=newPage.document.documentElement.outerHTML;
    var html = $.ajax({ url: sourceInIE, async: false }).responseText; //获取网页文本内容
    newIEPage.document.write("<body></body>");
    newIEPage.document.body.innerText = html;
}
