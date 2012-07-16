var LocalStorageManager = function() { 

}

LocalStorageManager.prototype.saveurl = function(url,layername,x,y,z,methodName,successCallback, failureCallback) {

	
    return cordova.exec(successCallback,    
    					failureCallback,     
    					'LocalStoragePlugin', 
    					'saveurl',              
    					[url,layername,x,y,z,methodName]); 
};

LocalStorageManager.prototype.savedb = function(url,layername,x,y,z,successCallback, failureCallback) {

	
    return cordova.exec(successCallback,    
    					failureCallback,     
    					'LocalStoragePlugin', 
    					'savedb',              
    					[url,layername,x,y,z]); 
};

LocalStorageManager.prototype.isexist = function(layername,x,y,z,successCallback, failureCallback) {

	
    return cordova.exec(successCallback,    //Callback which will be called when directory listing is successful
    					failureCallback,     //Callback which will be called when directory listing encounters an error
    					'LocalStoragePlugin',  //Telling PhoneGap that we want to run "DirectoryListing" Plugin
    					'isexist',              //Telling the plugin, which action we want to perform
    					[layername,x,y,z]);        //Passing a list of arguments to the plugin, in this case this is the directory path
};

LocalStorageManager.prototype.getsdcard = function(successCallback, failureCallback) {

	
    return cordova.exec(successCallback,    //Callback which will be called when directory listing is successful
    					failureCallback,     //Callback which will be called when directory listing encounters an error
    					'LocalStoragePlugin',  //Telling PhoneGap that we want to run "DirectoryListing" Plugin
    					'getsdcard' ,
    					[]);        //Passing a list of arguments to the plugin, in this case this is the directory path
};

LocalStorageManager.prototype.savaconfig = function(layername,jsonResult,successCallback, failureCallback) {

	
    return cordova.exec(successCallback,    //Callback which will be called when directory listing is successful
    					failureCallback,     //Callback which will be called when directory listing encounters an error
    					'LocalStoragePlugin',  //Telling PhoneGap that we want to run "DirectoryListing" Plugin
    					'savaconfig' ,
    					[layername,jsonResult]);        //Passing a list of arguments to the plugin, in this case this is the directory path
};

LocalStorageManager.prototype.getconfig = function(layername,successCallback, failureCallback) {

	
    return cordova.exec(successCallback,    //Callback which will be called when directory listing is successful
    					failureCallback,     //Callback which will be called when directory listing encounters an error
    					'LocalStoragePlugin',  //Telling PhoneGap that we want to run "DirectoryListing" Plugin
    					'getconfig' ,
    					[layername]);        //Passing a list of arguments to the plugin, in this case this is the directory path
};
LocalStorageManager.prototype.shotScreen = function(n,w,h,successCallback, failureCallback) {

	
    return cordova.exec(successCallback,    //Callback which will be called when directory listing is successful
    					failureCallback,     //Callback which will be called when directory listing encounters an error
    					'LocalStoragePlugin',  //Telling PhoneGap that we want to run "DirectoryListing" Plugin
    					'shotscreen' ,
    					[n,w,h]);        //Passing a list of arguments to the plugin, in this case this is the directory path
};

/**
 * <ul>
 * <li>Register the Directory Listing Javascript plugin.</li>
 * <li>Also register native call which will be called when this plugin runs</li>
 * </ul>
 */
PhoneGap.addConstructor(function() {
	//Register the javascript plugin with PhoneGap
	cordova.addPlugin('localstoragemanager', new LocalStorageManager());
	
	//Register the native class of plugin with PhoneGap
	PluginManager.addService("LocalStoragePlugin","com.supermap.javascript.LocalStoragePlugin");
});