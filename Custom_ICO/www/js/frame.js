/* Copyright (c) 2006-2011 by SuperMap Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.SuperMap.org/trunk/SuperMap/license.txt for the
 * full text of the license. */

/**
 * Class: CloudFrame
 * 支持云服务的demo框架类,实现该demo的一些界面功能
 */
function CloudFrame(params){
    //debugger;
    var t = this;
    t.lastShowListIndex = null;
    t.loading = null;
    t.queryService = null;
    t.keyList = null;
    t.resultList = null;
    t.dialog = null;
    t.markerLayer = null;
    t.map = null;
    t.loadingTimeout = null;
    t.measureAction = null;
    t.mapDiv = null;
    t.win = null;
    t.isApp = true;
    t.init = function(p){
	//debugger;
	t.setParams(p);
	var ge=document.getElementById,doc=document,
	e1=doc.getElementById("menubtn"),
	e2=doc.getElementById("returnbtn"),
	e3=doc.getElementById("seabtn1"),
	e4=doc.getElementById("seabtn2"),
	e5=doc.getElementById("shotscreen"),
	m1=function(event) {
	    t.showDialog("key");
	},
	m2=t.hideDialog
	m3=function(){t.search(1)},
	m4=function(){t.search(2)},
	m5=t.shotScreen;
	if(t.isApp){
	    e1.addEventListener('touchend', m1, false);
	    e2.addEventListener('touchend', m2, false);
	    e3.addEventListener('touchend', m3, false);
	    e4.addEventListener('touchend', m4, false);
	    e5.addEventListener('touchend', m5, false);
	}
	else{
	    e1.onclick = m1;
	    e2.onclick = m2;
	    e3.onclick = m3;
	    e4.onclick = m4;
	    e5.onclick = m5;
	}
	t.keyList = doc.getElementById("keywordList");
	t.resultList = doc.getElementById("resultList");
	t.loading = doc.getElementById("loading");
	t.dialog = doc.getElementById("dialog");
	t.mapDiv = doc.getElementById("map");
	t.win = new InforWindow_z({"map":t.map});
	t.createkeywordList();
	t.queryService = new SuperMap.QueryForCloudService();
	t.measureAction = new MeasureAction({
	    "map":t.map,
	});
    }
    t.shotScreen = function(){
	if(t.shotScreenCtl){
	    t.shotScreenCtl.shot();
	}
	else{
	    t.shotScreenCtl = new SuperMap.ShotScreenControl();
	    t.shotScreenCtl.shot();
	}
    }
    t.setMarkerLayer = function(layer){
	if(layer)t.markerLayer = layer;
    }
    t.setMap = function(map){
	t.map = map;
    }
    t.setMapDiv = function(mapDiv){
	t.mapDiv = mapDiv;
    }
    t.setParams = function(para){
	for(var key in para){
	    t[key] = para[key];
	}
    }
    t.search = function(idx){
	var doc = document,ipt,key;
	//debugger;
	//var t = this;
	ipt = doc.getElementById("ipt"+idx);
	key = ipt.value;
	if(!key||key==""){
	    alert("请输入查询词");
	    return false;
	}
	t.query(key);
    }
    t.query = function(key){
	t.showLoading();
	t.queryService = new SuperMap.QueryForCloudService();
	t.queryService.query({"name":key},function(suc,res){
	    t.searchComplete(suc,res);
	});
    }
    t.searchComplete = function(suc,res){
	t.hideLoading();
	var resData = t.createResultList(suc,res);
	if(resData&&resData.length>0){
	    t.keyList.style.display = "none";
	    //t.drawMarkers(resData);
	    t.resultList.style.display = "block";
	    t.showDialog();
	}
    }
    t.drawMarkers = function(data){
	var a;
	if(data&&data.length>0){
	    t.markerLayer.clearMarkers();
	    t.win.close();
	    for(var i=0;i<data.length;i++){
		a = data[i];
		//alert("x:"+a.x+",y:"+a.y);
		var p = new SuperMap.Geometry.Point(parseFloat(a.x),parseFloat(a.y));
		//var size = new SuperMap.Size(44, 33);
		//var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
		//var icon = new SuperMap.Icon("../resource/controlImages/marker.png", size, offset);
		//t.markerLayer.addMarker(new SuperMap.Marker(new SuperMap.LonLat(p.x, p.y), icon));//.transform(new SuperMap.Projection("EPSG:900913"),new SuperMap.Projection("EPSG:4326"))
		
		var size = new SuperMap.Size(41, 46);
		var offset = new SuperMap.Pixel(-(size.w / 2), -size.h);
		var feature = new SuperMap.Feature(t.markerLayer, new SuperMap.LonLat(p.x, p.y));
		feature.data.icon = new SuperMap.Icon("./images/mark2.png", size, offset);
		
		var marker = feature.createMarker();
		
		var markerClick = function (evt,feature,data) {
			SuperMap.Event.stop(evt);
			//debugger;
			t.win.open(feature,{
			    "name":data.nm,
			    "phone":data.ph,
			    "addr":data.ad
			});
		};
		marker.events.register(t.isApp?"touchend":"click", feature, function(feature,data){//touchend
		    return function(evt){
			markerClick(evt,feature,data);
		    }
		}(feature,data[i]));

		t.markerLayer.addMarker(marker);
		//t.featrues.push(feature);
	    }
	}
    }
    t.drawMarker = function(data){
	a = data;
	var p = new SuperMap.Geometry.Point(parseFloat(a.x),parseFloat(a.y));
	
	var size = new SuperMap.Size(41, 46);
	var offset = new SuperMap.Pixel(-(size.w / 2), -size.h);
	var feature = new SuperMap.Feature(t.markerLayer, new SuperMap.LonLat(p.x, p.y));
	feature.data.icon = new SuperMap.Icon("./images/mark2.png", size, offset);
	
	var marker = feature.createMarker();
	
	var markerClick = function (evt,feature,data) {
		SuperMap.Event.stop(evt);
		//debugger;
		t.win.open(feature,{
		    "name":data.nm,
		    "phone":data.ph,
		    "addr":data.ad
		});
	};
	marker.events.register(t.isApp?"touchend":"click", feature, function(feature,data){//touchend
	    return function(evt){
		markerClick(evt,feature,data);
	    }
	}(feature,data));

	t.markerLayer.addMarker(marker);
	
	return feature;
    }
    t.createResultList = function(suc,res){
	var a,b,c,d,d1,d2,x,y,name,addr,tel,txt,resData;
	resData = null;
	if(suc){
	    if(res&&!res.error){
		try{
		    a = res.result[0].records;
		    t.resultList.innerHTML = "";
		    resData = [];
		    if(a.length>0){
			t.win.close();
			t.markerLayer.clearMarkers();
			for(var i=0;i<a.length;i++){
			    b = a[i].fieldValues;
			    x = b[1];
			    y = b[2];
			    name = b[3];
			    addr = b[7];
			    tel = b[8];
			    c = {
				"idx":i,
				"x":x,
				"y":y,
				"nm":name,
				"ad":addr,
				"ph":tel
			    }
			    resData.push(c);
			    txt = name;
			    if(tel)txt+=" - "+tel;
			    if(addr)txt+=" - "+addr;
			    d = t.credom("div",null,"li li2",null,t.resultList);
			    d1 = t.credom("span",null,"txt",txt,d);
			    d1 = t.credom("span",null,"liicon",null,d);
			    var feature = t.drawMarker(c);
			    var clickMethod = function(x,y,feature,data){
				return function(){
				    //t.changeList(index,count);
				    t.hideDialog();
				    window.setTimeout(function(){
					//debugger;
					t.win.open(feature,{
					    "name":data.nm,
					    "phone":data.ph,
					    "addr":data.ad
					});
					t.map.setCenter(new SuperMap.LonLat(parseFloat(x),parseFloat(y)), 14);
				    },500);
				}
			    }(x,y,feature,c);
			    if(t.isApp){
				d.addEventListener('touchend', clickMethod, false);
			    }
			    else{
				d.onclick = clickMethod;
			    }
			}
		    }
		    else{
			alert("查询到0个结果");
		    }
		}
		catch(e){
		    alert("查询失败");
		}
	    }
	    else{
		if(res.error&&res.error.information){
		    alert("查询失败: "+res.error.information);
		}
		else{
		    alert("查询失败");
		}
	    }
	}
	else{
	    alert("查询失败");
	}
	return resData;
    }
    t.showDialog = function(type){
	    //debugger;
      var dialog = t.dialog;
      var cls = dialog.className;
      if(cls == "diahide"){
	t.keyList.style.display = type=="key"?"block":"none";
	t.resultList.style.display = type=="key"?"none":"block";
	dialog.style.display = "block";
	window.setTimeout(function(dialog){
	  return function(){
	    dialog.className = "diashow";
	  }
	}(dialog),200);
      }
    }
    
    t.hideDialog = function(){
	    //debugger;
      var dialog = t.dialog;
      var cls = dialog.className;
      if(cls == "diashow"){
	    dialog.className = "diahide";
	    window.setTimeout(function(dialog){
		    return function(){
			  dialog.style.display = "none";
		    }
	    }(dialog),500);
      }
    }
    
    t.changeList = function(index,count){
	    var t = this; 
	    if(index==t.lastShowListIndex){
	      t.hideList(index);
	      t.lastShowListIndex=null;
	    }
	    else if(t.lastShowListIndex==null){
	      t.showList(index,count);
	      t.lastShowListIndex=index;
	    }
	    else{
	      t.hideList(t.lastShowListIndex);
	      t.showList(index,count);
	      t.lastShowListIndex=index;
	    }
    }
    
    t.showList = function(index,count){
	    var ul = document.getElementById("list_"+index);
	    var cls = ul.className;
	    if(cls.indexOf("listhide")>-1){
		    cls = cls.replace(/listhide/,"listshow_"+count);
		    ul.className = cls;
	    }
    }
    
    t.hideList = function(index){
	var ul = document.getElementById("list_"+index);
	var cls = ul.className;
	if(cls.indexOf("listshow")>-1){
		cls = cls.replace(/listshow_[0-9]*/,"listhide");
		ul.className = cls;
	}
    }
    
    t.createkeywordList = function(){
	var a,b,b1,b2,c,c1,c2,t=this;
	var keys = [
	    {"n":"餐饮服务","k":["火锅","烧烤","快餐","西餐","中餐","冷饮","咖啡馆","酒吧"]},
	    {"n":"生活便利","k":["银行","ATM","邮局","药店","诊所","医院","超市","商场","市场","眼镜店","电器店","知名大学","中学","小学","幼儿园","书店","公交车站","楼盘","小区"]},
	    {"n":"酒店住宿","k":["4-5星级酒店","其他星级","连锁酒店","度假村"]},
	    {"n":"娱乐健身","k":["知名景点","郊野公园","公园","博物馆","电影院","KTV","歌舞厅","健身场所","游泳馆","羽毛球馆","体育场馆","洗浴","垂钓"]},
	    {"n":"汽车服务","k":["加油站","停车场","修理厂","摄像头","检测场","交通队"]},
	]
	a = t.keyList;
	for(var i=0;i<keys.length;i++){
	    c = keys[i];
	    c1 = c.n;
	    c2 = c.k;
	    
	    b = t.credom("div",null,"li li1",null,a);
	    var clickMethod = function(index,count){
		return function(){
		    t.changeList(index,count);
		}
	    }(i+1,c2.length);
	    if(t.isApp){
		b.addEventListener('touchend', clickMethod, false);
	    }
	    else{
		b.onclick = clickMethod;
	    }
	    b1 = t.credom("span",null,null,c1,b);
	    b1 = t.credom("span",null,"liicon",null,b);
	    
	    b = t.credom("div","list_"+(i+1),"listcon listhide",null,a);
	    for(var j=0;j<c2.length;j++){
		b1 = t.credom("div",null,"li li2",null,b);
		var clickMethod = function(key){
		    return function(){
			t.query(key);
		    }
		}(c2[j]);
		if(t.isApp){
		    b1.addEventListener('touchend', clickMethod, false);
		}
		else{
		    b1.onclick = clickMethod;
		}
		b2 = t.credom("span",null,null,c2[j],b1);
		b2 = t.credom("span",null,"liicon",null,b1);
	    }
	}
    }
    t.showLoading = function(){
	//alert("showloading");
	//var t = this;
	t.loading.style.display = "block";
	window.setTimeout(function(){
	    t.loading.className = "loashow";
	    t.loadingTimeout = window.setTimeout(function(){
		if(t.loadingTimeout){
		    t.loadingTimeout = null;
		    alert("查询超时");
		    t.hideLoading();
		};
	    },15000);
	},200);
    }
    t.hideLoading = function(){
	//alert("hideloading");
	//var t = this;
	if(t.loadingTimeout){
	    window.clearTimeout(t.loadingTimeout);
	    t.loadingTimeout = null;
	}
	t.loading.className = "loahide";
	window.setTimeout(function(){
	    t.loading.style.display = "none";
	},500);
    }
    t.credom = function(tag,id,cls,htm,con){
	var a;
	a = document.createElement(tag);
	if(id)a.id = id;
	if(cls)a.className = cls;
	if(htm)a.innerHTML = htm;
	if(con)con.appendChild(a);
	
	return a;
    }
    t.init(params);
}

function MeasureAction(p){
    var t = this;
    t.map = null;
    t.lineLayer = null;
    t.drawLineObj = null;
    t.toolbar = null;
    t.queryToolbar = null;
    t.resultIpt = null;
    t.init = function(p){
	var doc = document;
	t.setParams(p);
	var e1=doc.getElementById("measurebtn"),
	e2=doc.getElementById("measurebtn2"),
	e3=doc.getElementById("rtn_mea"),
	m1=t.measureDistance,
	m2=t.remeasure,
	m3=t.quit;
	for(var i=1;i<=3;i++){
	    if(t.isApp)
		eval("e"+i).addEventListener('touchend', eval("m"+i), false);
	    else
		eval("e"+i).onclick = eval("m"+i);
	}
	//doc.getElementById("clr_mea").onclick = t.clearResult;
	t.toolbar = doc.getElementById("meaTlb");
	t.queryToolbar = doc.getElementById("toolbar");
	t.resultIpt = doc.getElementById("ipt3");
    };
    t.showToolbar = function(){
	var tb=t.toolbar,tb1=t.queryToolbar;
	tb1.style.display = "none";
	tb1.className = tb1.className.replace(/show_bar/,"");
	tb1.className += " hide_bar";
	tb.style.display = "block";
	window.setTimeout(function(){
	    tb.className = tb.className.replace(/hide_bar/,"");
	    tb.className += " show_bar";
	},50);
    }
    t.hideToolbar = function(){
	var tb = t.toolbar,tb1=t.queryToolbar;
	tb.className = tb.className.replace(/show_bar/,"");
	tb.className += " hide_bar";
	tb.style.display = "none";
	tb1.style.display = "block";
	window.setTimeout(function(){
	    tb1.className = tb1.className.replace(/hide_bar/,"");
	    tb1.className += " show_bar";
	},50);
    }
    t.quit = function(){
	t.hideToolbar();
	t.clearResult();
	t.destory();
    }
    t.setParams = function(p){
	for(var k in p){
	    t[k] = p[k];
	}
    }
    t.remeasure = function(){
	t.clearResult();
	t.drawLineObj.activate();
    }
    t.measureDistance = function(){
	var a,b,m = t.map;
	t.showToolbar();
	//t.hideMeasureResult();
	if(t.lineLayer&&t.drawLineObj){
	    t.lineLayer.removeAllFeatures();
	    t.drawLineObj.activate();
	}
	else{
	    //定义样式
	    var style = {
		strokeColor: "#304DBE",
		strokeWidth: 2,
		pointerEvents: "visiblePainted",
		fillColor: "#304DBE",
		fillOpacity: 0.8
	    }
	    //新建线矢量图层
	    a = t.lineLayer = new SuperMap.Layer.Vector("lineLayer");
	    //对线图层应用样式style（前面有定义）
	    a.style = style;
	    //创建画线控制，图层是lineLayer;这里DrawFeature(图层,类型,属性)；multi:true在将要素放入图层之前是否现将其放入几何图层中
	    b = t.drawLineObj = new SuperMap.Control.DrawFeature(a, SuperMap.Handler.Path, { multi: true });
	    b.events.on({"featureadded":t.drawLineCompleted});
	    m.addLayer(a);
	    m.addControl(b);
	    b.activate();
	}
    }
    t.drawLineCompleted = function(drawGeometryArgs){
	t.drawLineObj.deactivate();
	
	var geometryLine = drawGeometryArgs.feature.geometry;
	var dis = t.measure(geometryLine);
	t.showResult(dis);
    }
    t.clearResult = function(){
	if(t.lineLayer){
	    t.lineLayer.removeAllFeatures();
	}
	if(t.drawLineObj)t.drawLineObj.deactivate();
	t.resultIpt.value = "单击绘点，双击完成";
    }
    t.showResult = function(dis){
	t.resultIpt.value = "距离为："+dis;
    }
    t.measure = function(geometry){
	if(t.measureService){
	    return t.measureService.measure(geometry);
	}
	else{
	    t.measureService = new SuperMap.MeasureDistanceForCloud();
	    return t.measureService.measure(geometry);
	}
    }
    t.destory = function(){
	var l1 = t.lineLayer,m = t.map,d1 = t.drawLineObj;
	if(l1){
	    m.removeLayer(l1);
	    l1.destroy();
	    t.lineLayer = null;
	}
	if(d1){
	    m.removeControl(d1);
	    d1.destroy();
	    t.drawLineObj = null;
	}
    }
    t.init(p);
}

function InforWindow_z(param){
    var t = this;
    t.infowin = null;
    t.map = null;
    t.init = function(param){
	for(var key in param){
	    t[key] = param[key];
	}
    }
    t.open = function(feature,data){
	t.close();
	t.create(feature,data);
    }
    t.create = function(feature,data){
	var ph = data.phone,ad = data.addr;
	var contentHTML = "<div style='font-size:.8em; opacity: 0.8; overflow-y:hidden;'>" + 
                              "<span style='font-weight: bold; font-size: 18px;'>"+data.name+"</span><br>";
	contentHTML += "<div>电话：" + ((ph&&ph!=""&&ph!="null")?ph:"无") + "</div>";
	contentHTML += "<div>地址：" + ((ad&&ad!=""&&ad!="null")?ad:"无") + "</div></div>";
	//初始化一个弹出窗口，当某个地图要素被选中时会弹出此窗口，用来显示选中地图要素的属性信息
	var size = new SuperMap.Size(6, 46);
	var offset = new SuperMap.Pixel(-10, -size.h);
	var popup = new SuperMap.Popup.FramedCloud("chicken", 
				    feature.marker.lonlat,
				    null,
				    contentHTML,
				    new SuperMap.Icon("./images/mark2.png", size, offset),
				    true);
	feature.popup = popup;
	t.map.addPopup(popup);
	t.infowin = popup;
    }
    t.close = function(){
	if(t.infowin){
	    try{
		t.infowin.hide();
		t.infowin.destroy();
	    }
	    catch(e){}
	}
    }
    t.init(param);
}