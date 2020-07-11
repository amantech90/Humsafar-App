package com.humsafar;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

public class NotificationEventService  extends HeadlessJsTaskService {
    protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        return new HeadlessJsTaskConfig(
                "Notification",
                extras != null ? Arguments.fromBundle(extras) : null,
                5000,
                true);
    }
}
