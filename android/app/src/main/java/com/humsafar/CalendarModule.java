package com.humsafar;

import android.content.ContentResolver;
import android.content.ContentValues;
import android.database.Cursor;
import android.net.Uri;
import android.provider.CalendarContract;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.Calendar;
import java.util.TimeZone;

public class CalendarModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    CalendarModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;

    }
    @Override
    public String getName() {
        return "CustomCalender";
    }
    @ReactMethod
    public void addReminderInCalendar(int startDate, Promise promise){
        try{
           

        }catch(IllegalViewOperationException e){
            promise.reject( e);
        }
    }


}
