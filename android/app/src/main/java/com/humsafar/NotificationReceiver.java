package com.humsafar;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.facebook.react.HeadlessJsTaskService;

import static com.humsafar.NotificationModule.NOTIFICATION_CHANNEL_ID;

public class NotificationReceiver extends BroadcastReceiver {
    public static String NOTIFICATION_ID = "1" ;
    public static String NOTIFICATION = "Humsafar" ;
    public void onReceive (Context context , Intent intent) {
        NotificationManager notificationManager = (NotificationManager)context.getSystemService(Context. NOTIFICATION_SERVICE ) ;
        Notification notification = intent.getParcelableExtra( NOTIFICATION ) ;
        if (android.os.Build.VERSION. SDK_INT >= android.os.Build.VERSION_CODES. O ) {
            int importance = NotificationManager. IMPORTANCE_HIGH ;
            NotificationChannel notificationChannel = new NotificationChannel( NOTIFICATION_CHANNEL_ID , "NOTIFICATION_CHANNEL_NAME" , importance) ;
            assert notificationManager != null;
            notificationManager.createNotificationChannel(notificationChannel) ;
        }
        int id = intent.getIntExtra( NOTIFICATION_ID , 0 ) ;
        assert notificationManager != null;
        notificationManager.notify(id , notification) ;
        Intent serviceIntent = new Intent(context, NotificationEventService.class);
        context.startService(serviceIntent);
        HeadlessJsTaskService.acquireWakeLockNow(context);
    }
}
