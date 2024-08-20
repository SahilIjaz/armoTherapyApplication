const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pushNotificationSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
    },
    fcm_token: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('PushNotification', pushNotificationSchema);
