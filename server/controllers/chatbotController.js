const Chatbot = require("../models/chatbotschema");
const mailSender = require("../utils/mailSender");

exports.handleChatbotSubmission = async (req, res) => {
  try {
    console.log("✅ Chatbot API hit");
    console.log("Received data:", req.body);

    const { name, email, phone, query } = req.body;

    if (!name || !email || !phone || !query) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // ✅ Save to DB
    const newEntry = await Chatbot.create({
      name,
      email,
      PhoneNumber: phone,
      querystring: query,
    });

    // ✅ Email body
    const emailBody = `
      <h2>New Chatbot Query</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Query:</strong> ${query}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    `;

    // ✅ Send email
    await mailSender(process.env.NOTIFICATION_EMAIL, `New Chatbot Query from ${name}`, emailBody);

    res.status(200).json({ message: "Success" });

  } catch (error) {
    console.error("Chatbot Submission Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
