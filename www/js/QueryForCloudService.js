/* Copyright (c) 2000-2011 by SuperMap Software Co., Ltd.*/

/**
 * @requires SuperMap/Util.js
 * @requires jquery.js
 */

/**
 * Class: SuperMap.QueryForCloudService
 * Distance支持云服务查询服务类。
 * 
 * Inherits from:
 *  - <SuperMap.ServiceBase> 
 */
SuperMap.QueryForCloudService = SuperMap.Class(SuperMap.ServiceBase, {
    
    /**
     * Property: param
     * {Object} 请求参数。 
     */
    param: {},
    
    /**
     * Constructor: SuperMap.QueryForCloudService
     * Distance查询服务类构造函数。
     *
     * 例如：
     * (start code)	
     * var queryService = new SuperMap.QueryForCloudService();
	queryService.query({"name":key},function(suc,res){
	    
	});
     * (end)
     */
    initialize: function() {
        var url = "http://services.supermapcloud.com/iserver/cloudhandler";
        SuperMap.ServiceBase.prototype.initialize.apply(this, [url]);
        this.isInTheSameDomain = true;
        this.initParam();
    },
    /**
     * Method: query
     * 查询。
     *
     * Parameters:
     * param - {<Object>} 查询参数。
     * cb - {<Fucntion>} 回调函数。
     */
    query: function(param,cb){
        if(param&&param.name){
            var paramstr = this.getSqlParam(param.name);
            //var urlStr = this.getUrlStr(paramstr);
            this.setParam(paramstr);
            jQuery.ajax({
                "success":function(cb){return function(res){cb(1,res);}}(cb),
                "dataType":"jsonp",
                //"dataType":"json",
                "error":function(cb){return function(res){cb(0,res);}}(cb),
                "jsonp":"jsonp",
                "type":"GET",
                "url":this.url,
                //"dataObject":this.param,
                "data":this.param
            });
        }
    },
    
    /**
     * Method: initParam
     * 初始化一些默认参数
     */
    initParam:function(){
        this.param = {
            "servicename":"Search",
            "methodname":"queryByKeywords",
            "parameter":"",
            "sectionCount":1,
            "sectionIndex":0
        };
    },
    
    /**
     * Method: getParam
     * 获取参数字符串
     *
     * Parameters:
     * name - {String} 查询关键字
     */
    getSqlParam:function(name){
        //var paramstr = "{\"dataSourceName\":\"china_poi\"," + 
        //    "\"queryParam\":{\"queryDatasetParams\":[{\"name\":\"PbeijingP\"," +
        //    "\"sqlParam\":{\"groupClause\":null, \"ids\":null," + 
        //    "\"returnFields\":[\"SMID\", \"SMX\", \"SMY\", \"Name\", \"PY\", \"POI_ID\", \"ZipCode\", \"Address\", \"Telephone\", \"Admincode\"]," +
        //    "\"sortClause\":null, \"attributeFilter\":\"Name like '%25" + name + "%25' and admincode >%61'110000'and admincode<'120000'\", \"joinItems\":null, \"linkItems\":null}}], " +  
        //    "\"returnResultSetInfo\":\"ATTRIBUTE\", \"startRecord\":0, \"expectCount\":10, \"sortPriorityType\":-1}," + 
        //    "\"queryType\":0}";
            
        var paramstr = "{\"dataSourceName\":\"china_poi\"," + 
        "\"queryParam\":{\"queryDatasetParams\":[{\"name\":\"PbeijingP\"," +
        "\"sqlParam\":{\"groupClause\":null, \"ids\":null," + 
        "\"returnFields\":[\"SMID\", \"SMX\", \"SMY\", \"Name\", \"PY\", \"POI_ID\", \"ZipCode\", \"Address\", \"Telephone\", \"Admincode\"]," +
        "\"sortClause\":null, \"attributeFilter\":\"Name like '%" + name + "%' and admincode >='110000'and admincode<'120000'\", \"joinItems\":null, \"linkItems\":null}}], " +  
        "\"returnResultSetInfo\":\"ATTRIBUTE\", \"startRecord\":0, \"expectCount\":10, \"sortPriorityType\":-1}," + 
        "\"queryType\":0}";
        
        //var paramstr = "{\"dataSourceName\":\"china_poi\"}";
        
        return paramstr;
    },
    //getSqlParam1:function(name){
    //    var sqlParam = {
    //        "dataSourceName":"china_poi",
    //        "queryParam":{
    //            "queryDatasetParams":[
    //                {
    //                    "name":"PbeijingP",
    //                    "sqlParam":{
    //                        "returnFields":["SMID", "SMX", "SMY", "Name", "PY", "POI_ID", "ZipCode", "Address", "Telephone", "Admincode"],
    //                        "attributeFilter":"Name like '%27" + name + "%27' and admincode >='110000'and admincode<'120000'"
    //                    }
    //                }
    //            ],
    //            "returnResultSetInfo":"ATTRIBUTE",
    //            "startRecord":0,
    //            "expectCount":10,
    //            "sortPriorityType":-1
    //        },
    //        "queryType":0
    //    };
    //    
    //    return sqlParam;
    //},
    /**
     * Method: getParam
     * 获取参数字符串
     *
     * Parameters:
     * name - {String} 查询关键字
     *
     * Returns:
     * {String} 返回组装好的url请求字符串
     */
    setParam:function(paramStr){
        this.param.parameter = paramStr;
    },
    
    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function() {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments); 
    },
    
    CLASS_NAME: "SuperMap.QueryForCloudService"
});