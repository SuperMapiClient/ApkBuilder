/* Copyright (c) 2000-2011 by SuperMap Software Co., Ltd.*/

/**
 * Class: SuperMap.LocationControl
 * 支持安卓定位功能。
 */
SuperMap.LocationControl = SuperMap.Class({
    
    /**
     * Constructor: SuperMap.LocationControl
     * 构造函数。
     *
     * 例如：
     * (start code)	
     * var control = new SuperMap.LocationControl();
	control.local();
     * (end)
     */
    initialize: function() {
    },
    /**
     * Method: local
     * 截图。
     * Parameters:
     * onSuccess - {<Function>} 定位成功回调函数。
     * onError - {<Function>} 定位失败回调函数。
     */
    local: function(onSuccess,onError){
        try{
	    navigator.geolocation.getCurrentPosition(function(onSuccess){
		return function(position){
		    position = new SuperMap.LonLat(position.coords.longitude, position.coords.latitude).transform(
				  new SuperMap.Projection("EPSG:4326"),
				  new SuperMap.Projection("EPSG:900913"));
		    onSuccess(position);
		}
	    }(onSuccess), onError, { maximumAge: 5000, timeout: 120000, enableHighAccuracy: true });	
	}
	catch(e){
	    alert("定位失败");
	}
    },
    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function() {
    },
    
    CLASS_NAME: "SuperMap.ShotScreenControl"
});