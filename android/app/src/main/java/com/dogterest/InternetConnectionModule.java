package com.dogterest;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.Map;
import java.util.HashMap;

public class InternetConnectionModule extends ReactContextBaseJavaModule {
    InternetConnectionModule(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    private void checkConnection(Promise promise) {
        boolean haveConnectedWifi = false;
        boolean haveConnectedCellular = false;

        ConnectivityManager manager = (ConnectivityManager) getReactApplicationContext().getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo[] netInfo = manager.getAllNetworkInfo();

        for(NetworkInfo n : netInfo) {
            if(n.getTypeName().equalsIgnoreCase("WIFI")) {
                if(n.isConnected()) {
                    haveConnectedWifi = true;
                }
            }

            if(n.getTypeName().equalsIgnoreCase("MOBILE")) {
                if (n.isConnected()) {
                    haveConnectedCellular = true;
                }
            }
        }

        promise.resolve(haveConnectedWifi || haveConnectedCellular);
    }

    @NonNull
    @Override
    public String getName() {
        return "InternetConnectionModule";
    }
}
