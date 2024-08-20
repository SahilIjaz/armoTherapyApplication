const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastMessageSender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    lastMessage: { type: String, required: true },
    messageTime: { type: Number, required: true }, // Unix timestamp
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
