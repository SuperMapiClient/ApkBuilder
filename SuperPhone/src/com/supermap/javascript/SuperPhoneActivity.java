package com.supermap.javascript;

import org.apache.cordova.*;

import android.app.ActivityManager;
import android.os.Bundle;
import android.webkit.WebSettings;

public class SuperPhoneActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.loadUrl("file:///android_asset/www/index.html",5000);
    }
    
    public void onDestroy() { 
        finish(); 
        super.onDestroy(); 
        
        ActivityManager activityManger=(ActivityManager) this.getSystemService(ACTIVITY_SERVICE);
        try{
        	activityManger.restartPackage("com.supermap.javascript");
            activityManger.restartPackage("com.supermap.phonegap");
        }
        catch(Exception e){
        	System.out.println(e.getMessage());
        }
        
        System.exit(0);
    } 
}