package com.humsafar;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.SystemClock;

import androidx.core.app.NotificationCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.wishbirds.humsafar.R;

import java.util.Calendar;

public class NotificationModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    public static final String NOTIFICATION_CHANNEL_ID = "10001" ;
    private final static String default_notification_channel_id = "humsafar" ;
    NotificationModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;

    }
    @Override
    public String getName() {
        return "CustomNotification";
    }



    private void scheduledNotification(Notification notification , int delay) {
        Intent notificationIntent = new Intent( reactContext, NotificationReceiver.class ) ;
        notificationIntent.putExtra(NotificationReceiver. NOTIFICATION_ID , 1 ) ;
        notificationIntent.putExtra(NotificationReceiver. NOTIFICATION , notification) ;
        PendingIntent pendingIntent = PendingIntent. getBroadcast ( reactContext, 0 , notificationIntent , PendingIntent. FLAG_UPDATE_CURRENT ) ;
        long futureInMillis = SystemClock. elapsedRealtime () + 5000 ;
        AlarmManager alarmManager = (AlarmManager) reactContext.getSystemService(Context. ALARM_SERVICE);
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(System.currentTimeMillis());
        calendar.set(Calendar.HOUR_OF_DAY, 12);
        calendar.set(Calendar.MINUTE, 43);
        calendar.set(Calendar.SECOND, 1);
        assert alarmManager != null;
        alarmManager.setRepeating(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(),
                AlarmManager.INTERVAL_DAY, pendingIntent);
    }
    @ReactMethod
    public void notificationInit(String content ,int delay, Promise promise){
        try{
            scheduledNotification(getNotification(content) ,delay );
        }catch(IllegalViewOperationException e){
            promise.reject( e);
        }
    }

    private Notification getNotification (String content) {
            NotificationCompat.Builder builder = new NotificationCompat.Builder( reactContext, default_notification_channel_id ) ;
            builder.setContentTitle( "It's time to add memories" ) ;
            builder.setContentText(content) ;
            builder.setSmallIcon(R.mipmap.ic_launcher) ;
            builder.setAutoCancel( true ) ;
            builder.setChannelId( NOTIFICATION_CHANNEL_ID ) ;
            return builder.build() ;



    }

}
