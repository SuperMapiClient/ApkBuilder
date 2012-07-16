/* Copyright (c) 2000-2011 by SuperMap Software Co., Ltd.*/

/**
 * Class: SuperMap.MeasureDistanceForCloud
 * 支持云服务量算。
 */
SuperMap.MeasureDistanceForCloud = SuperMap.Class({
    
    /**
     * Constructor: SuperMap.MeasureDistanceForCloud
     * 量算类构造函数。
     *
     * 例如：
     * (start code)	
     * var measureDistance = new SuperMap.MeasureDistanceForCloud();
	measureDistance.measure(geometry);
     * (end)
     */
    initialize: function() {
    },
    /**
     * Method: measure
     * 查询。
     *
     * Parameters:
     * param - {<SuperMap.Geometry>} 被量算的Geometry。
     */
    measure: function(geometry){
        var dis = null,a,b,x,y,c;
	try{
	    c = [];
	    a = geometry.components[0].components;
	    for(var i=0;i<a.length;i++){
		x = parseFloat(a[i].x);
		y = parseFloat(a[i].y);
		c.push({"x":x,"y":y});
	    }
	    dis = calculate(c);
	}
	catch(e){alert("量算失败");}
	return dis;
	function calculate(a) {
	    var b = null;
	    var e = 0;
	    var d = 0;
	    for (var c = 0; c < a.length - 1; c++) {
		e = Math.abs(a[c + 1].x - a[c].x);
		d = Math.abs(a[c + 1].y - a[c].y);
		b += Math.sqrt(e * e + d * d)
	    }
	    b = b.toString().split(".")[0];
	    if (parseFloat(b) / 1000 >= 1) {
		b = (parseFloat(b) / 1000).toFixed(1) + "公里"
	    } else {
		b = b + "米"
	    }
	    return b
	}
    },
    
    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function() {
    },
    
    CLASS_NAME: "SuperMap.MeasureDistanceForCloud"
});