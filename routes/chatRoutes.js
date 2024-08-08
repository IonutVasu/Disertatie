const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");

// Endpoint pentru trimiterea unui mesaj
router.post("/sendMessage", async (req, res) => {
  const { chatId, senderId, receiverId, message, imageUrl } = req.body;
  const newMessage = new Message({
    chatId,
    senderId,
    receiverId,
    message,
    imageUrl,
    timestamp: new Date(),
  });
  console.log("Received message request:", req.body); // Log request body

  try {
    // Salvare mesaj nou
    await newMessage.save();
    console.log("Message saved:", newMessage); // Log saved message

    // Adăugare utilizatori în lista de prieteni reciprocă
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (sender && receiver) {
      console.log("Sender and Receiver found:", sender, receiver);
      const senderUpdated = sender.friendList.includes(receiverId);
      const receiverUpdated = receiver.friendList.includes(senderId);

      if (!senderUpdated || !receiverUpdated) {
        if (!senderUpdated) {
          sender.friendList.push(receiverId);
          await sender.save();
          console.log("Receiver added to sender's friend list"); // Log friend addition
        }
        if (!receiverUpdated) {
          receiver.friendList.push(senderId);
          await receiver.save();
          console.log("Sender added to receiver's friend list"); // Log friend addition
        }
      }
    } else {
      console.log("Sender or Receiver not found");
      return res.status(404).json({ error: "Sender or Receiver not found" });
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error); // Log error
    res.status(500).json({ error: "Error sending message" });
  }
});

// Endpoint pentru primirea mesajelor
router.get("/getMessages/:chatId", async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

// Endpoint pentru ștergerea unui mesaj
router.delete("/deleteMessage/:messageId", async (req, res) => {
  const { messageId } = req.params;

  try {
    await Message.findByIdAndDelete(messageId);
    res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting message" });
  }
});

module.exports = router;
