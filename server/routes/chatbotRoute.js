const express = require("express");
const router = express.Router();
const { handleChatbotSubmission } = require("../controllers/chatbotController");

router.post("/", handleChatbotSubmission);

module.exports = router;
