const fs = require("fs").promises;
const path = require('path');
const FCM = require('fcm-node');
const Notification = require('../models/notificationModel'); // Assuming the schema is in a separate file

exports.sendNotification = async (userId, message) => {
    try {
        console.log('User Id:', userId);
        console.log('Message:', message);
        // Read the Firebase config file asynchronously
        const jsonString = await fs.readFile(path.join(__dirname, '../armotherapy-55259-firebase-adminsdk-3ta5v-80f802f43a.json'), "utf8");
        // Parse the Firebase config file to get the server key
        const data = JSON.parse(jsonString);
        const serverKey = data.SERVER_KEY;
        const fcm = new FCM(serverKey);
        // Find all push tokens associated with the userId
        const pushTokens = await Notification.find({ user_id: userId });
        // Collect all fcm_tokens
        const reg_ids = pushTokens.map(token => token.fcm_token);
        if (reg_ids.length > 0) {
            // Prepare the push notification message
            const pushMessage = {
                registration_ids: reg_ids,
                content_available: true,
                mutable_content: true,
                notification: {
                    body: message,
                    icon: 'myicon', // Default Icon
                    sound: 'mySound', // Default sound
                    // badge: badgeCount, // Optional: Example: 1, 2, 3, etc.
                },
            };
            // Send the push notification
            fcm.send(pushMessage, (err, response) => {
                if (err) {
                    console.log("Something has gone wrong!", err);
                } else {
                    console.log("Push notification sent.", response);
                }
            });
        }

    } catch (error) {
        console.log("Error occurred:", error);
    }
};
