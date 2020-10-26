const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BJeg7EigBUWeY6dUaS5KZwy1ByPbkpLYnO9IC3IdBWDYcn1arJZUQWN7FIvJI1Av6E9Kw7WC1D7WJjng3KRcGu8",
    "privateKey": "hIhX4qlTGwXDJQQj9K79WD4M5kF_6mRnMvtn9Gn2mpA"
};


webPush.setVapidDetails(
    'mailto:agamsantika91@gmal.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dUNncDMlo3I:APA91bECyrmhN2dzmr1ihblwvUmlVM0wnkR1GU8lOorCFEVAtE2oB5FEP0em1-XcY6kuPyD5TTWYmW78zsvfyXPCes8TTSiqCYau24SNx0kF88QINgrigq9kWmLO6V89dY5eHicdyTu2",
    "keys": {
        "p256dh": "BH7DXDOMUNzxqxe2oNM+FH+K2U79fbCFQASCByJfwbSCsqGh1d3+LkqpjdANpf05hr79jPzZ4vx2a5sU0MZpXKo=",
        "auth": "ZSk3LhvgPSdiT7fViWkN1Q=="
    }
};
const payload = 'Holla !!';

const options = {
    gcmAPIKey: '508145014020',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);

